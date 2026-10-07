import "server-only";

import { and, desc, eq, exists, getTableColumns, inArray, isNull, sql } from "drizzle-orm";
import { requestAssignments, requests, users } from "@/lib/db/schema";
import { getDatabase } from "./db";

export async function listRequests(userId?: string) {
    const db = getDatabase();
    const rows = await db.select().from(requests).where(userId ? exists(
        db.select({ id: requestAssignments.id }).from(requestAssignments).where(and(
            eq(requestAssignments.request_id, requests.id),
            eq(requestAssignments.user_id, userId),
            isNull(requestAssignments.unassigned_at),
        )),
    ) : undefined).orderBy(desc(requests.created_at));
    if (!rows.length) return [];
    const assignments = await db.select().from(requestAssignments)
        .where(inArray(requestAssignments.request_id, rows.map((row) => row.id)))
        .orderBy(desc(requestAssignments.assigned_at));
    const byRequest = new Map<string, typeof assignments>();
    for (const assignment of assignments) {
        const group = byRequest.get(assignment.request_id) ?? [];
        group.push(assignment);
        byRequest.set(assignment.request_id, group);
    }
    return rows.map((row) => ({ ...row, assignments: byRequest.get(row.id) ?? [] }));
}

export async function listAssignments() {
    return getDatabase().select({ ...getTableColumns(requestAssignments), user_name: users.name })
        .from(requestAssignments).innerJoin(users, eq(users.id, requestAssignments.user_id));
}

export async function claimRequest(requestId: string, userId: string, role: "lead" | "contributor") {
    const [assignment] = await getDatabase().insert(requestAssignments)
        .values({ request_id: requestId, user_id: userId, role })
        .onConflictDoUpdate({
            target: [requestAssignments.request_id, requestAssignments.user_id],
            targetWhere: sql`${requestAssignments.unassigned_at} IS NULL`,
            set: { role },
        }).returning();
    return assignment;
}
