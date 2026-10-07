import { loadEnvConfig } from "@next/env";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { createPool } from "../lib/db/connection";

loadEnvConfig(process.cwd());
const pool = createPool(process.env.DATABASE_MIGRATION_URL || process.env.DATABASE_URL);
try {
    await migrate(drizzle(pool), { migrationsFolder: "./drizzle" });
    console.log("Database migrations applied.");
} finally {
    await pool.end();
}
