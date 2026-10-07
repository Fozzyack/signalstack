import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { hash } from "bcryptjs";
import { eq, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { createPool } from "../../lib/db/connection";
import { requestAssignments, requests, sessions, users } from "../../lib/db/schema";

// This suite writes to a dedicated test database, never the development database.
const databaseUrl = process.env.TEST_DATABASE_URL;
const baseUrl = process.env.TEST_BASE_URL;
const enabled = Boolean(databaseUrl && baseUrl);

describe.skipIf(!enabled)("full-stack API", () => {
    let pool: ReturnType<typeof createPool>;
    let db: ReturnType<typeof drizzle>;
    let userId: string;
    let otherUserId: string;
    let createdRequestId: string;
    let cookie = "";
    const email = `migration-${Date.now()}@signalstack.test`;
    const otherEmail = `other-${Date.now()}@signalstack.test`;
    const password = "migration-test-password";

    async function call(path: string, options: RequestInit = {}, auth = true) {
        const headers = new Headers(options.headers);
        if (!headers.has("Origin")) headers.set("Origin", new URL(baseUrl!).origin);
        if (options.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
        if (auth && cookie) headers.set("Cookie", cookie);
        return fetch(`${baseUrl}${path}`, { ...options, headers, redirect: "manual" });
    }

    async function login(passwordInput = password) {
        const response = await call("/api/auth/login", {
            method: "POST", body: JSON.stringify({ email, password: passwordInput }),
        });
        if (response.ok) cookie = response.headers.get("set-cookie")!.split(";")[0];
        return response;
    }

    beforeAll(async () => {
        if (!new URL(databaseUrl!).pathname.endsWith("_test")) {
            throw new Error("TEST_DATABASE_URL must refer to a dedicated database ending in _test");
        }
        pool = createPool(databaseUrl);
        db = drizzle(pool);
        const passwordHash = await hash(password, 10);
        const [user, other] = await db.insert(users).values([
            { email, name: "Migration Tester", password_hash: passwordHash },
            { email: otherEmail, name: "Other Tester", password_hash: passwordHash },
        ]).returning();
        userId = user.id;
        otherUserId = other.id;
    });

    afterAll(async () => {
        if (!db) return;
        try {
            if (createdRequestId) await db.delete(requests).where(eq(requests.id, createdRequestId));
            if (userId && otherUserId) await db.delete(users).where(inArray(users.id, [userId, otherUserId]));
        } finally {
            await pool.end();
        }
    });

    test("request submission, auth, assignments, profile, expiry and logout", async () => {
        expect((await call("/api/health")).status).toBe(200);
        for (const path of ["/api/auth/check", "/api/requests", "/api/request-assignments", "/api/users/me", "/api/users/me/requests"]) {
            expect((await call(path, {}, false)).status).toBe(401);
        }
        const dashboard = await call("/dashboard", {}, false);
        expect(dashboard.status).toBe(307);
        expect(dashboard.headers.get("location")).toBe("/login");
        expect((await call("/api/auth/login", {
            method: "POST", headers: { Origin: "https://attacker.example" }, body: "{}",
        })).status).toBe(403);
        expect((await login("wrong-password")).status).toBe(401);
        const loggedIn = await login();
        expect(loggedIn.status).toBe(200);
        expect(loggedIn.headers.get("set-cookie")).toContain("HttpOnly");
        expect(loggedIn.headers.get("set-cookie")).toContain("SameSite=lax");
        expect(await loggedIn.json()).not.toHaveProperty("token");
        expect((await call("/api/auth/check")).status).toBe(200);
        const me = await call("/api/users/me");
        expect(me.headers.get("cache-control")).toBe("no-store");
        expect(await me.json()).toEqual({ id: userId, name: "Migration Tester", email });
        expect((await call("/api/requests", { method: "POST", body: "{" })).status).toBe(400);
        expect((await call("/api/requests", { method: "POST", body: "{}" })).status).toBe(400);
        const submitted = await call("/api/requests", {
            method: "POST", body: JSON.stringify({
                title: "Migration smoke test", description: "Test request", clientName: "Test Client", clientEmail: email,
            }),
        }, false);
        expect(submitted.status).toBe(201);
        const created = await submitted.json();
        createdRequestId = created.id;
        expect(created.reference).toMatch(/^SS-\d+$/);
        expect(created.assignments).toEqual([]);
        expect(created.status).toBe("new");
        expect(created.created_at).toMatch(/^\d{4}-\d{2}-\d{2}T.*Z$/);
        expect((await call("/api/request-assignments", {
            method: "POST", body: JSON.stringify({ request_id: created.id }),
        }, false)).status).toBe(401);
        expect((await call("/api/request-assignments", {
            method: "POST", body: JSON.stringify({ request_id: "invalid" }),
        })).status).toBe(400);
        expect((await call("/api/request-assignments", {
            method: "POST", body: JSON.stringify({ request_id: "11111111-1111-4111-8111-111111111111" }),
        })).status).toBe(404);
        const claims = await Promise.all(Array.from({ length: 3 }, () => call("/api/request-assignments", {
            method: "POST", body: JSON.stringify({ request_id: created.id, role: "lead" }),
        })));
        for (const claim of claims) expect(claim.status).toBe(200);
        const assignments = await db.select().from(requestAssignments).where(eq(requestAssignments.request_id, created.id));
        expect(assignments).toHaveLength(1);
        expect(assignments[0].user_id).toBe(userId);
        const allAssignments = await (await call("/api/request-assignments")).json();
        expect(allAssignments.find((assignment: { request_id: string }) => assignment.request_id === created.id).user_name).toBe("Migration Tester");
        const myRequests = await (await call("/api/users/me/requests")).json();
        expect(myRequests.find((row: { id: string }) => row.id === created.id).assignments).toHaveLength(1);
        await db.update(requestAssignments).set({ unassigned_at: new Date() }).where(eq(requestAssignments.id, assignments[0].id));
        expect((await (await call("/api/users/me/requests")).json()).some((row: { id: string }) => row.id === created.id)).toBe(false);
        expect((await call("/api/users/me", {
            method: "PUT", body: JSON.stringify({ name: "Updated Tester", email, currentPassword: "wrong", password: "" }),
        })).status).toBe(400);
        expect((await call("/api/users/me", {
            method: "PUT", body: JSON.stringify({ name: "Updated Tester", email: otherEmail, currentPassword: password, password: "" }),
        })).status).toBe(409);
        const updated = await call("/api/users/me", {
            method: "PUT", body: JSON.stringify({ name: "Updated Tester", email, currentPassword: password, password: "new-test-password" }),
        });
        expect(updated.status).toBe(200);
        expect(await updated.json()).toEqual({ id: userId, name: "Updated Tester", email });
        expect((await login()).status).toBe(401);
        const oldCookie = cookie;
        expect((await login("new-test-password")).status).toBe(200);
        expect((await call("/api/auth/check", { headers: { Cookie: oldCookie } }, false)).status).toBe(401);
        await db.update(sessions).set({ expires_at: new Date(Date.now() - 1000) }).where(eq(sessions.token, cookie.split("=")[1]));
        expect((await call("/api/auth/check")).status).toBe(401);
        expect((await login("new-test-password")).status).toBe(200);
        expect((await call("/api/auth/logout", { method: "POST", headers: { Origin: "https://attacker.example" } })).status).toBe(403);
        const logout = await call("/api/auth/logout", { method: "POST" });
        expect(logout.status).toBe(200);
        expect(logout.headers.get("set-cookie")).toContain("Max-Age=0");
        expect((await call("/api/auth/check")).status).toBe(401);
    }, 60000);
});
