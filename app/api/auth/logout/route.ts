import { deleteSession } from "@/lib/server/auth";
import { handleApi, json } from "@/lib/server/http";
import { requireSameOrigin } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
    return handleApi(async () => {
        requireSameOrigin(request);
        await deleteSession();
        return json({ success: true });
    });
}
