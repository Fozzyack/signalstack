import { requireUser } from "@/lib/server/auth";
import { handleApi, json } from "@/lib/server/http";
import { updateRequestStatus } from "@/lib/server/requests";
import {
    HttpError,
    readJson,
    requestStatusField,
    requireSameOrigin,
} from "@/lib/validation";

export const runtime = "nodejs";

const UUID_PATTERN =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function PATCH(
    request: Request,
    context: RouteContext<"/api/requests/[id]">,
) {
    return handleApi(async () => {
        requireSameOrigin(request);
        const user = await requireUser();
        const { id } = await context.params;
        if (!UUID_PATTERN.test(id)) {
            throw new HttpError(400, "Invalid request id");
        }
        const status = requestStatusField(await readJson(request));
        return json(await updateRequestStatus(id, status, user.id));
    });
}
