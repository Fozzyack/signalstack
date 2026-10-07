import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";
import { users } from "@/lib/db/schema";
import { getDatabase } from "@/lib/server/db";
import { createSession, publicUser } from "@/lib/server/auth";
import { handleApi, json } from "@/lib/server/http";
import { emailField, HttpError, passwordField, readJson, requireSameOrigin } from "@/lib/validation";

export const runtime = "nodejs";

// A valid hash keeps unknown-account requests on the same password-check path.
const DUMMY_HASH = "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy";

export async function POST(request: Request) {
    return handleApi(async () => {
        requireSameOrigin(request);
        const body = await readJson(request);
        const email = emailField(body, "email");
        const password = passwordField(body, "password");
        const [user] = await getDatabase().select().from(users).where(eq(users.email, email)).limit(1);
        const valid = await compare(password, user?.password_hash ?? DUMMY_HASH);
        if (!user || !valid) throw new HttpError(401, "Incorrect email or password");
        await createSession(user.id);
        return json(publicUser(user));
    });
}
