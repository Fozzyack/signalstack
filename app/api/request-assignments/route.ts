import { requireUser } from "@/lib/server/auth";
import { handleApi, json } from "@/lib/server/http";
import { claimRequest, listAssignments } from "@/lib/server/requests";
import { assignmentInput, HttpError, readJson, requireSameOrigin } from "@/lib/validation";

export const runtime = "nodejs";

export async function GET() {
    return handleApi(async () => {
        await requireUser();
        return json(await listAssignments());
    });
}

export async function POST(request: Request) {
    return handleApi(async () => {
        requireSameOrigin(request);
        const user = await requireUser();
        const { requestId, role } = assignmentInput(await readJson(request));
        try {
            return json(await claimRequest(requestId, user.id, role));
        } catch (error) {
            // Drizzle wraps driver errors in a cause.
            if (error instanceof Error && (error.cause as { code?: string })?.code === "23503") {
                throw new HttpError(404, "Request not found");
            }
            throw error;
        }
    });
}
