import { loadEnvConfig } from "@next/env";
import { hash } from "bcryptjs";
import { and, eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { createPool } from "../lib/db/connection";
import { requestAssignments, requests, users } from "../lib/db/schema";

loadEnvConfig(process.cwd());
if (process.env.NODE_ENV === "production") throw new Error("Demo seeding is disabled in production");
const password = process.env.SEED_PASSWORD || "signalstack-dev";
if (Buffer.byteLength(password, "utf8") > 72) throw new Error("SEED_PASSWORD must be at most 72 bytes");
const pool = createPool(process.env.DATABASE_MIGRATION_URL || process.env.DATABASE_URL);
const db = drizzle(pool);

try {
    const passwordHash = await hash(password, 10);
    await db.transaction(async (tx) => {
        const userIds: string[] = [];
        const demoUsers = [
            ["maya.chen@signalstack.test", "Maya Chen"],
            ["james.doyle@signalstack.test", "James Doyle"],
            ["rina.kapoor@signalstack.test", "Rina Kapoor"],
            ["alex.lee@signalstack.test", "Alex Lee"],
            ["priya.shah@signalstack.test", "Priya Shah"],
        ];
        for (const [email, name] of demoUsers) {
            const [user] = await tx.insert(users).values({ email, name, password_hash: passwordHash })
                .onConflictDoUpdate({ target: users.email, set: { name } }).returning({ id: users.id });
            userIds.push(user.id);
        }
        const demoRequests = [
            ["VPN access dropping every 20 minutes", "Remote warehouse team is losing access to internal tools during shifts.", "Northstar Logistics", "maya.chen@northstar.io", "new"],
            ["New starter account and laptop setup", "Three designers joining Monday need accounts, devices, and shared drive access.", "Arc & Field Studio", "oliver@arcandfield.co", "new"],
            ["Review permissions for finance shared drive", "Quarterly access review requested before the external audit begins.", "Verity & Co", "sarah@verityandco.com", "in_progress"],
            ["Move production database to managed cloud", "Looking for a migration plan and someone to own the first phase.", "Kiteworks", "devops@kiteworks.dev", "waiting"],
            ["Harden administrator accounts with MFA", "The operations team needs help rolling out stronger sign-in controls for privileged accounts.", "Granite Health", "it@granitehealth.example", "in_progress"],
            ["Investigate suspicious mailbox forwarding rule", "A mailbox has an unexpected forwarding rule and needs an incident review.", "Brightwell Partners", "security@brightwell.example", "new"],
        ];
        const requestIds: string[] = [];
        for (const [title, description, client_name, client_email, status] of demoRequests) {
            const values = { title, description, client_name, client_email, status };
            const [existing] = await tx.select({ id: requests.id }).from(requests)
                .where(and(eq(requests.title, title), eq(requests.client_email, client_email))).limit(1);
            if (existing) {
                await tx.update(requests).set({ ...values, updated_at: new Date() }).where(eq(requests.id, existing.id));
                requestIds.push(existing.id);
            } else {
                const [created] = await tx.insert(requests).values(values).returning({ id: requests.id });
                requestIds.push(created.id);
            }
        }
        const demoAssignments = [
            [0, 0, "lead"], [2, 1, "lead"], [2, 2, "contributor"],
            [3, 3, "lead"], [4, 4, "lead"], [5, 4, "contributor"],
        ] as const;
        for (const [requestIndex, userIndex, role] of demoAssignments) {
            await tx.insert(requestAssignments).values({
                request_id: requestIds[requestIndex], user_id: userIds[userIndex], role,
            }).onConflictDoUpdate({
                target: [requestAssignments.request_id, requestAssignments.user_id],
                targetWhere: sql`${requestAssignments.unassigned_at} IS NULL`, set: { role },
            });
        }
    });
    console.log("Demo database seeded. Login: maya.chen@signalstack.test");
    console.log("Password: SEED_PASSWORD, or signalstack-dev by default. Existing passwords are not reset.");
} finally {
    await pool.end();
}
