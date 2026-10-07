import { requireUser } from "@/lib/server/auth";
import { handleApi, json } from "@/lib/server/http";

export const runtime = "nodejs";

export async function GET() {
    return handleApi(async () => {
        await requireUser();
        return json({ stat: "Successful Auth" });
    });
}
