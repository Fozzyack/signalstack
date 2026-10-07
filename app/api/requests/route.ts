import { requests } from "@/lib/db/schema";
import { requireUser } from "@/lib/server/auth";
import { getDatabase } from "@/lib/server/db";
import { handleApi, json } from "@/lib/server/http";
import { listRequests } from "@/lib/server/requests";
import { emailField, readJson, requireSameOrigin, stringField } from "@/lib/validation";

export const runtime = "nodejs";

export async function GET() {
    return handleApi(async () => {
        await requireUser();
        return json(await listRequests());
    });
}

export async function POST(request: Request) {
    return handleApi(async () => {
        requireSameOrigin(request);
        const body = await readJson(request);
        const [created] = await getDatabase().insert(requests).values({
            title: stringField(body, "title", 200),
            description: stringField(body, "description", 10000),
            client_name: stringField(body, "clientName", 200),
            client_email: emailField(body, "clientEmail"),
        }).returning();
        return json({ ...created, assignments: [] }, 201);
    });
}
