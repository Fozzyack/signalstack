"use client";

import { useEffect, useState } from "react";
import apiFetch from "@/lib/apiFetch";
import { getBackendURL } from "@/lib/getEnvVars";

type User = {
    name: string;
    email: string;
};

const inputClassName =
    "mt-2 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-cyan-300/10";

const SettingsPage = () => {
    const [user, setUser] = useState<User>({ name: "", email: "" });
    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await apiFetch(`${getBackendURL()}/users/me`);
                if (!response.ok)
                    throw new Error("Unable to load your settings.");
                const data = (await response.json()) as User;
                setUser({ name: data.name ?? "", email: data.email ?? "" });
            } catch (requestError) {
                setError(
                    requestError instanceof Error
                        ? requestError.message
                        : "Unable to load your settings.",
                );
            } finally {
                setLoading(false);
            }
        };

        getUser();
    }, []);

    const saveSettings = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSaving(true);
        setSaved(false);
        setError("");

        try {
            const response = await apiFetch(`${getBackendURL()}/users/me`, {
                method: "PUT",
                body: JSON.stringify({
                    name: user.name,
                    email: user.email,
                    password,
                    currentPassword,
                }),
            });

            if (!response.ok) {
                const data = (await response.json().catch(() => null)) as {
                    error?: string;
                } | null;
                throw new Error(data?.error ?? "Unable to save your settings.");
            }

            setSaved(true);
            setCurrentPassword("");
            setPassword("");
        } catch (requestError) {
            setError(
                requestError instanceof Error
                    ? requestError.message
                    : "Unable to save your settings.",
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <main
            className="min-h-full bg-slate-950 text-white"
            aria-live="polite"
            aria-busy={loading}
        >
            <div className="mx-auto max-w-[1480px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                        Account
                    </p>
                    <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                        Settings
                    </h1>
                    <p className="mt-2 text-sm text-slate-400">
                        Manage your profile details and account password.
                    </p>
                </div>

                <form
                    onSubmit={saveSettings}
                    className="mt-10 max-w-3xl space-y-6"
                >
                    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-7">
                        <div className="border-b border-white/10 pb-5">
                            <h2 className="text-lg font-semibold">
                                Profile details
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Update the information used across your
                                workspace.
                            </p>
                        </div>
                        <div className="mt-6 grid gap-5 sm:grid-cols-2">
                            <label className="text-sm font-medium text-slate-300">
                                Name
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    value={user.name}
                                    readOnly
                                    disabled={loading}
                                    className={`${inputClassName} read-only:cursor-default read-only:text-slate-400`}
                                    placeholder="Your name"
                                    autoComplete="name"
                                />
                            </label>
                            <label className="text-sm font-medium text-slate-300">
                                Email
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    readOnly
                                    disabled={loading}
                                    className={`${inputClassName} read-only:cursor-default read-only:text-slate-400`}
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                />
                            </label>
                        </div>
                    </section>

                    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-7">
                        <div className="border-b border-white/10 pb-5">
                            <h2 className="text-lg font-semibold">Password</h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Confirm your identity to save account changes.
                            </p>
                        </div>
                        <div className="mt-6 space-y-5">
                            <label className="block text-sm font-medium text-slate-300">
                                Current password
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={currentPassword}
                                    required
                                    onChange={(event) => {
                                        setCurrentPassword(event.target.value);
                                        setSaved(false);
                                    }}
                                    disabled={loading}
                                    className={inputClassName}
                                    placeholder="Enter your current password"
                                    autoComplete="current-password"
                                />
                            </label>
                            <label className="block text-sm font-medium text-slate-300">
                                New password
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(event) => {
                                        setPassword(event.target.value);
                                        setSaved(false);
                                    }}
                                    disabled={loading}
                                    className={inputClassName}
                                    placeholder="Enter a new password"
                                    autoComplete="new-password"
                                />
                            </label>
                        </div>
                    </section>

                    {error && <p className="text-sm text-rose-300">{error}</p>}
                    {saved && (
                        <p className="text-sm text-emerald-300" role="status">
                            Settings saved.
                        </p>
                    )}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loading || saving}
                            className="rounded-lg bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {saving ? "Saving..." : "Save changes"}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default SettingsPage;
