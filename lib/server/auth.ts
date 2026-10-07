import "server-only";

import { randomBytes } from "node:crypto";
import { and, eq, gt, sql } from "drizzle-orm";
import { cookies } from "next/headers";
import { sessions, users } from "@/lib/db/schema";
import { getDatabase } from "./db";
import { HttpError } from "@/lib/validation";

const SESSION_COOKIE = "signalstack_session";
const SESSION_DURATION = 24 * 60 * 60;
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
};

export async function getSessionUser() {
    const token = (await cookies()).get(SESSION_COOKIE)?.value;
    if (!token || !/^[a-f0-9]{256}$/.test(token)) return null;
    const [result] = await getDatabase().select({ user: users }).from(sessions)
        .innerJoin(users, eq(users.id, sessions.user_id))
        .where(and(eq(sessions.token, token), gt(sessions.expires_at, sql`now()`))).limit(1);
    return result?.user ?? null;
}

export async function requireUser() {
    const user = await getSessionUser();
    if (!user) throw new HttpError(401, "Unauthorized");
    return user;
}

export async function createSession(userId: string) {
    const db = getDatabase();
    const cookieStore = await cookies();
    const oldToken = cookieStore.get(SESSION_COOKIE)?.value;
    const token = randomBytes(128).toString("hex");
    const expires = new Date(Date.now() + SESSION_DURATION * 1000);
    await db.transaction(async (tx) => {
        if (oldToken) await tx.delete(sessions).where(eq(sessions.token, oldToken));
        await tx.insert(sessions).values({ user_id: userId, token, expires_at: expires });
    });
    cookieStore.set(SESSION_COOKIE, token, { ...cookieOptions, expires, maxAge: SESSION_DURATION });
}

export async function deleteSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    if (token) await getDatabase().delete(sessions).where(eq(sessions.token, token));
    cookieStore.set(SESSION_COOKIE, "", { ...cookieOptions, maxAge: 0 });
}

export function publicUser(user: typeof users.$inferSelect) {
    return { id: user.id, name: user.name, email: user.email };
}
