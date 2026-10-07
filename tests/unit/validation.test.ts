import { describe, expect, test } from "bun:test";
import {
    assignmentInput,
    emailField,
    HttpError,
    passwordField,
    readJson,
    requestStatusField,
    requireSameOrigin,
    stringField,
} from "../../lib/validation";

function request(body: string, headers: Record<string, string> = {}) {
    return new Request("http://localhost:3000/api/requests", {
        method: "POST",
        body,
        headers: { "Content-Type": "application/json", ...headers },
    });
}

describe("API validation", () => {
    test("accepts a JSON object and rejects malformed/non-object payloads", async () => {
        expect(await readJson(request('{"title":"Example"}'))).toEqual({
            title: "Example",
        });
        for (const body of ["{", "[]", "null", '"text"', "1"]) {
            await expect(readJson(request(body))).rejects.toBeInstanceOf(
                HttpError,
            );
        }
    });

    test("requires JSON content type and limits body size", async () => {
        await expect(
            readJson(request("{}", { "Content-Type": "text/plain" })),
        ).rejects.toMatchObject({ status: 415 });
        await expect(
            readJson(request(JSON.stringify({ body: "a".repeat(65536) }))),
        ).rejects.toMatchObject({ status: 413 });
    });

    test("requires non-empty bounded strings and valid emails", () => {
        expect(stringField({ title: " Example " }, "title", 200)).toBe(
            "Example",
        );
        for (const title of ["", " ", 42, "a".repeat(201)]) {
            expect(() => stringField({ title }, "title", 200)).toThrow(
                HttpError,
            );
        }
        expect(emailField({ email: "maya@signalstack.test" }, "email")).toBe(
            "maya@signalstack.test",
        );
        expect(() => emailField({ email: "not an email" }, "email")).toThrow(
            HttpError,
        );
    });

    test("preserves password whitespace and enforces bcrypt byte limits", () => {
        expect(passwordField({ password: " secret " }, "password")).toBe(
            " secret ",
        );
        expect(
            passwordField({ password: "a".repeat(72) }, "password"),
        ).toHaveLength(72);
        expect(() =>
            passwordField({ password: "é".repeat(37) }, "password"),
        ).toThrow(HttpError);
    });

    test("accepts only the known task statuses", () => {
        expect(requestStatusField({ status: "in_progress" })).toBe(
            "in_progress",
        );
        expect(requestStatusField({ status: "waiting" })).toBe("waiting");
        for (const status of [
            "done",
            "",
            "New",
            "in progress",
            5,
            null,
            undefined,
        ]) {
            expect(() => requestStatusField({ status })).toThrow(HttpError);
        }
    });

    test("validates assignment IDs and roles", () => {
        const request_id = "11111111-1111-4111-8111-111111111111";
        expect(assignmentInput({ request_id })).toEqual({
            requestId: request_id,
            role: "lead",
        });
        expect(assignmentInput({ request_id, role: "contributor" }).role).toBe(
            "contributor",
        );
        expect(() => assignmentInput({ request_id: "invalid" })).toThrow(
            HttpError,
        );
        expect(() => assignmentInput({ request_id, role: "admin" })).toThrow(
            HttpError,
        );
    });

    test("enforces same-origin mutations, including login and logout", () => {
        const previousOrigin = process.env.APP_URL;
        delete process.env.APP_URL;
        try {
            expect(() =>
                requireSameOrigin(
                    request("{}", { Origin: "http://localhost:3000" }),
                ),
            ).not.toThrow();
            expect(() => requireSameOrigin(request("{}"))).toThrow(HttpError);
            expect(() =>
                requireSameOrigin(
                    request("{}", { Origin: "https://attacker.example" }),
                ),
            ).toThrow(HttpError);
            expect(() =>
                requireSameOrigin(
                    request("{}", {
                        Origin: "http://localhost:3000",
                        "Sec-Fetch-Site": "cross-site",
                    }),
                ),
            ).toThrow(HttpError);
            process.env.APP_URL = "https://signalstack.example";
            expect(() =>
                requireSameOrigin(
                    request("{}", { Origin: "https://signalstack.example" }),
                ),
            ).not.toThrow();
        } finally {
            if (previousOrigin === undefined) delete process.env.APP_URL;
            else process.env.APP_URL = previousOrigin;
        }
    });
});
