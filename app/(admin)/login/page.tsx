"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Eye, EyeSlash } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const submitLocked = useRef(false);
    const router = useRouter();

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (submitLocked.current || success) return;
        submitLocked.current = true;
        setError("");
        setSuccess("");
        setIsSubmitting(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json().catch(() => null);
            if (!res.ok) {
                setError(data?.error ?? "Invalid credentials");
                submitLocked.current = false;
                setIsSubmitting(false);
                return;
            }
            setSuccess("Login successful. Redirecting...");
            window.setTimeout(() => {
                window.location.href = "/dashboard";
            }, 600);
        } catch {
            setError("Unable to connect to the server. Please try again.");
            submitLocked.current = false;
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch("/api/auth/check", {
                    cache: "no-store",
                });
                if (res.ok) {
                    router.replace("/dashboard");
                    return;
                }
            } catch {
                setError("Unable to connect to the server. Please try again.");
            }
            setLoading(false);
        };
        checkAuth();
    }, [router]);

    if (loading) {
        return (
            <main className="flex min-h-svh items-center justify-center bg-slate-950 px-6 text-white">
                <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-900/50 p-8 text-center">
                    <Image
                        src="/logo.png"
                        alt="SignalStack"
                        width={56}
                        height={56}
                        className="mx-auto"
                    />
                    <p
                        role="status"
                        className="mt-6 flex items-center justify-center gap-3 text-sm text-slate-300"
                    >
                        <span
                            aria-hidden="true"
                            className="size-4 rounded-full border-2 border-cyan-300/20 border-t-cyan-300 motion-safe:animate-spin"
                        />
                        Checking your session…
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-svh bg-slate-950 text-white lg:grid lg:grid-cols-2">
            <section className="relative flex min-h-64 min-w-0 flex-col justify-between gap-10 overflow-hidden border-b border-white/10 bg-slate-950 p-6 sm:min-h-80 sm:p-10 lg:min-h-0 lg:border-r lg:border-b-0 lg:p-12 xl:p-16">
                <video
                    className="absolute inset-0 z-0 h-full w-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-hidden="true"
                >
                    <source src="/loginvid-optimized.mp4" type="video/mp4" />
                </video>
                <div
                    aria-hidden="true"
                    className="absolute inset-0 z-10 bg-slate-950/50"
                />
                <div
                    aria-hidden="true"
                    className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/70"
                />

                <Link
                    href="/"
                    aria-label="SignalStack home"
                    className="relative z-20 inline-flex w-fit items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
                >
                    <Image src="/logo.png" alt="" width={44} height={44} />
                    <span className="text-lg font-semibold tracking-tight">
                        SignalStack<span className="text-cyan-300">.</span>
                    </span>
                </Link>
                <p className="relative z-20 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-300">
                    A clearer way to work together
                </p>
            </section>

            <section
                aria-labelledby="login-heading"
                className="flex min-w-0 flex-col px-5 py-7 sm:px-10 lg:px-12 lg:py-12 xl:px-20"
            >
                <div className="mx-auto flex w-full max-w-sm flex-1 flex-col">
                    <Link
                        href="/"
                        className="inline-flex min-h-11 w-fit items-center gap-2 rounded-md text-xs text-slate-400 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
                    >
                        <ArrowLeft size={15} aria-hidden="true" /> Back to home
                    </Link>
                    <div className="py-8 sm:py-12 lg:my-auto lg:py-16">
                        <div className="mb-9">
                            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-300">
                                Your workspace awaits
                            </p>
                            <h1
                                id="login-heading"
                                className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl"
                            >
                                Welcome back.
                            </h1>
                            <p className="mt-4 text-sm leading-6 text-slate-400">
                                Sign in to SignalStack and pick up where your
                                team left off.
                            </p>
                        </div>
                        <form
                            className="space-y-5"
                            onSubmit={handleSubmit}
                            aria-busy={isSubmitting}
                        >
                            <label className="block">
                                <span className="mb-2 block text-sm font-medium text-slate-200">
                                    Email address
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    value={email}
                                    autoComplete="email"
                                    placeholder="you@company.com"
                                    disabled={isSubmitting}
                                    className="h-13 w-full min-w-0 rounded-xl border border-slate-700 bg-slate-900/60 px-4 text-base text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20 disabled:opacity-60"
                                />
                            </label>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-medium text-slate-200"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        name="password"
                                        required
                                        onChange={(event) =>
                                            setPassword(event.target.value)
                                        }
                                        value={password}
                                        autoComplete="current-password"
                                        placeholder="Enter your password"
                                        disabled={isSubmitting}
                                        className="h-13 w-full min-w-0 rounded-xl border border-slate-700 bg-slate-900/60 pr-14 pl-4 text-base text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20 disabled:opacity-60"
                                    />
                                    <button
                                        type="button"
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                        aria-controls="password"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute top-1 right-1 flex size-11 items-center justify-center rounded-lg text-slate-400 transition hover:text-cyan-300 focus-visible:outline-2 focus-visible:outline-cyan-300"
                                    >
                                        {showPassword ? (
                                            <EyeSlash
                                                size={20}
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <Eye size={20} aria-hidden="true" />
                                        )}
                                    </button>
                                </div>
                            </div>
                            {error && (
                                <p
                                    role="alert"
                                    className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm wrap-anywhere text-red-200"
                                >
                                    {error}
                                </p>
                            )}
                            <button
                                type="submit"
                                disabled={isSubmitting || Boolean(success)}
                                className="flex min-h-13 w-full items-center justify-center gap-3 rounded-xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {isSubmitting ? (
                                    <>
                                        <span
                                            aria-hidden="true"
                                            className="size-4 shrink-0 rounded-full border-2 border-slate-950/30 border-t-slate-950 motion-safe:animate-spin"
                                        />
                                        {success
                                            ? "Opening your workspace…"
                                            : "Signing in…"}
                                    </>
                                ) : (
                                    <>
                                        Sign in{" "}
                                        <ArrowRight
                                            size={18}
                                            aria-hidden="true"
                                        />
                                    </>
                                )}
                            </button>
                        </form>
                        <p
                            role="status"
                            aria-live="polite"
                            aria-atomic="true"
                            className={
                                success
                                    ? "mt-5 rounded-xl border border-cyan-300/20 bg-cyan-300/5 px-4 py-3 text-sm text-cyan-200"
                                    : "sr-only"
                            }
                        >
                            {success || (isSubmitting ? "Signing in…" : "")}
                        </p>
                        <p className="mt-8 border-t border-white/10 pt-6 text-xs leading-6 text-slate-400">
                            Need access? Contact your team administrator.
                        </p>
                    </div>
                    <p className="pt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
                        SignalStack / Team workspace
                    </p>
                </div>
            </section>
        </main>
    );
};

export default LoginPage;
