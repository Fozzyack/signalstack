import { compare, hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { users } from "@/lib/db/schema";
import { publicUser, requireUser } from "@/lib/server/auth";
import { getDatabase } from "@/lib/server/db";
import { handleApi, json } from "@/lib/server/http";
import { emailField, HttpError, passwordField, readJson, requireSameOrigin, stringField } from "@/lib/validation";

export const runtime = "nodejs";

export async function GET() {
    return handleApi(async () => json(publicUser(await requireUser())));
}

export async function PUT(request: Request) {
    return handleApi(async () => {
        requireSameOrigin(request);
        const user = await requireUser();
        const body = await readJson(request);
        const name = stringField(body, "name", 200);
        const email = emailField(body, "email");
        const currentPassword = passwordField(body, "currentPassword");
        if (!await compare(currentPassword, user.password_hash)) throw new HttpError(400, "Incorrect password");
        let passwordHash = user.password_hash;
        if (body.password !== undefined && body.password !== "") {
            passwordHash = await hash(passwordField(body, "password"), 10);
        }
        try {
            const [updated] = await getDatabase().update(users).set({
                name, email, password_hash: passwordHash, updated_at: new Date(),
            }).where(eq(users.id, user.id)).returning();
            return json(publicUser(updated));
        } catch (error) {
            if (error instanceof Error && (error.cause as { code?: string })?.code === "23505") {
                throw new HttpError(409, "Email is already in use");
            }
            throw error;
        }
    });
}
