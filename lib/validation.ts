import { isTaskStatus, type TaskStatus } from "./taskStatus";

export class HttpError extends Error {
    constructor(
        public status: number,
        message: string,
    ) {
        super(message);
    }
}

export function requireSameOrigin(request: Request) {
    const origin = request.headers.get("origin");
    const expectedOrigin = new URL(process.env.APP_URL || request.url).origin;
    if (
        origin !== expectedOrigin ||
        request.headers.get("sec-fetch-site") === "cross-site"
    ) {
        throw new HttpError(403, "Cross-origin requests are not allowed");
    }
}

export async function readJson(
    request: Request,
): Promise<Record<string, unknown>> {
    if (
        request.headers.get("content-type")?.split(";")[0].trim() !==
        "application/json"
    ) {
        throw new HttpError(415, "Content-Type must be application/json");
    }
    const reader = request.body?.getReader();
    if (!reader) throw new HttpError(400, "Invalid JSON");
    const chunks: Uint8Array[] = [];
    let size = 0;
    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            size += value.byteLength;
            if (size > 65536) {
                await reader.cancel();
                throw new HttpError(413, "Request body is too large");
            }
            chunks.push(value);
        }
    } finally {
        reader.releaseLock();
    }
    const body = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
        body.set(chunk, offset);
        offset += chunk.byteLength;
    }
    let value: unknown;
    try {
        value = JSON.parse(new TextDecoder().decode(body));
    } catch {
        throw new HttpError(400, "Invalid JSON");
    }
    if (!value || typeof value !== "object" || Array.isArray(value)) {
        throw new HttpError(400, "JSON body must be an object");
    }
    return value as Record<string, unknown>;
}

export function stringField(
    body: Record<string, unknown>,
    field: string,
    maxLength: number,
    trim = true,
) {
    const value = body[field];
    if (
        typeof value !== "string" ||
        !value.trim() ||
        value.length > maxLength
    ) {
        throw new HttpError(400, `Invalid ${field}`);
    }
    return trim ? value.trim() : value;
}

export function emailField(body: Record<string, unknown>, field: string) {
    const email = stringField(body, field, 254);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        throw new HttpError(400, `Invalid ${field}`);
    return email;
}

export function passwordField(body: Record<string, unknown>, field: string) {
    const password = stringField(body, field, 72, false);
    // bcrypt operates on bytes, not characters; never silently truncate passwords.
    if (Buffer.byteLength(password, "utf8") > 72)
        throw new HttpError(400, `Invalid ${field}`);
    return password;
}

export function assignmentInput(body: Record<string, unknown>): {
    requestId: string;
    role: "lead" | "contributor";
} {
    const requestId = stringField(body, "request_id", 36);
    if (
        !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
            requestId,
        )
    ) {
        throw new HttpError(400, "Invalid request_id");
    }
    const role = body.role ?? "lead";
    if (role !== "lead" && role !== "contributor")
        throw new HttpError(400, "Invalid assignment role");
    return { requestId, role };
}

export function requestStatusField(
    body: Record<string, unknown>,
    field = "status",
): TaskStatus {
    const value = body[field];
    if (!isTaskStatus(value)) throw new HttpError(400, `Invalid ${field}`);
    return value;
}
