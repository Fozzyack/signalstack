import { requireUser } from "@/lib/server/auth";
import { handleApi, json } from "@/lib/server/http";
import { listRequests } from "@/lib/server/requests";

export const runtime = "nodejs";

export async function GET() {
    return handleApi(async () => {
        const user = await requireUser();
        return json(await listRequests(user.id));
    });
}
