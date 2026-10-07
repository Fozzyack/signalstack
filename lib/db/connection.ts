import { Pool } from "pg";

// Shared by the server and CLI. The server entry point is marked server-only.
export function createPool(connectionString = process.env.DATABASE_URL) {
    if (!connectionString) throw new Error("DATABASE_URL is not set");
    return new Pool({
        connectionString,
        max: 5,
        idleTimeoutMillis: 1000,
        connectionTimeoutMillis: 10000,
        allowExitOnIdle: true,
    });
}
