import "server-only";

import { HttpError } from "@/lib/validation";

export function json(payload: unknown, status = 200) {
    return Response.json(payload, {
        status,
        headers: { "Cache-Control": "no-store" },
    });
}

export async function handleApi(action: () => Promise<Response>) {
    try {
        return await action();
    } catch (error) {
        if (error instanceof HttpError) return json({ error: error.message }, error.status);
        console.error("API request failed", error);
        return json({ error: "Internal Server Error" }, 500);
    }
}
