import "server-only";

import { drizzle } from "drizzle-orm/node-postgres";
import { createPool } from "@/lib/db/connection";
import * as schema from "@/lib/db/schema";

function createDatabase() {
    const pool = createPool();
    pool.on("error", (error) => console.error("Idle database connection error", error));
    return drizzle(pool, { schema });
}

const globalDatabase = globalThis as typeof globalThis & {
    signalstackDatabase?: ReturnType<typeof createDatabase>;
};

// Lazy initialization lets next build run without database credentials.
export function getDatabase() {
    return globalDatabase.signalstackDatabase ??= createDatabase();
}
