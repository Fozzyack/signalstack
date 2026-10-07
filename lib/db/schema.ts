import { sql } from "drizzle-orm";
import {
    check,
    index,
    jsonb,
    pgSequence,
    pgTable,
    text,
    timestamp,
    uniqueIndex,
    uuid,
} from "drizzle-orm/pg-core";

const timestamptz = (name: string) => timestamp(name, { withTimezone: true, mode: "date" });

export const requestReferenceSequence = pgSequence("request_reference_seq", { startWith: 1000 });

export const users = pgTable("users", {
    id: uuid().defaultRandom().primaryKey(),
    email: text().notNull().unique(),
    name: text().notNull(),
    password_hash: text().notNull(),
    created_at: timestamptz("created_at").defaultNow().notNull(),
    updated_at: timestamptz("updated_at").defaultNow().notNull(),
});

export const sessions = pgTable("sessions", {
    id: uuid().defaultRandom().primaryKey(),
    user_id: uuid().notNull().references(() => users.id, { onDelete: "cascade" }),
    token: text().notNull().unique(),
    expires_at: timestamptz("expires_at").notNull(),
    created_at: timestamptz("created_at").defaultNow().notNull(),
}, (table) => [
    index("sessions_user_id_idx").on(table.user_id),
    index("sessions_expires_at_idx").on(table.expires_at),
]);

export const requests = pgTable("requests", {
    id: uuid().defaultRandom().primaryKey(),
    reference: text().default(sql`'SS-' || nextval('request_reference_seq')::text`).notNull().unique(),
    title: text().notNull(),
    description: text().notNull(),
    client_name: text().notNull(),
    client_email: text().notNull(),
    status: text().default("new").notNull(),
    created_at: timestamptz("created_at").defaultNow().notNull(),
    updated_at: timestamptz("updated_at").defaultNow().notNull(),
    resolved_at: timestamptz("resolved_at"),
}, (table) => [
    index("requests_status_idx").on(table.status),
    index("requests_created_at_idx").on(table.created_at),
    index("requests_client_email_idx").on(table.client_email),
]);

export const requestAssignments = pgTable("request_assignments", {
    id: uuid().defaultRandom().primaryKey(),
    request_id: uuid().notNull().references(() => requests.id, { onDelete: "cascade" }),
    user_id: uuid().notNull().references(() => users.id, { onDelete: "cascade" }),
    role: text().$type<"lead" | "contributor">().notNull(),
    assigned_at: timestamptz("assigned_at").defaultNow().notNull(),
    unassigned_at: timestamptz("unassigned_at"),
    personal_deadline: timestamptz("personal_deadline"),
    completed_at: timestamptz("completed_at"),
}, (table) => [
    check("request_assignments_role_check", sql`${table.role} IN ('lead', 'contributor')`),
    uniqueIndex("request_assignments_active_user_request_idx")
        .on(table.request_id, table.user_id).where(sql`${table.unassigned_at} IS NULL`),
    index("request_assignments_request_id_idx").on(table.request_id),
    index("request_assignments_user_id_idx").on(table.user_id),
]);

export const requestEvents = pgTable("request_events", {
    id: uuid().defaultRandom().primaryKey(),
    request_id: uuid().notNull().references(() => requests.id, { onDelete: "cascade" }),
    actor_id: uuid().references(() => users.id),
    event_type: text().notNull(),
    metadata: jsonb(),
    created_at: timestamptz("created_at").defaultNow().notNull(),
}, (table) => [index("request_events_request_id_created_at_idx").on(table.request_id, table.created_at)]);
