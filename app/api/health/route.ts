import { sql } from "drizzle-orm";
import { getDatabase } from "@/lib/server/db";
import { json } from "@/lib/server/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
    try {
        await getDatabase().execute(sql`SELECT 1`);
        return json({ status: "ok" });
    } catch {
        return json({ status: "unavailable" }, 503);
    }
}
