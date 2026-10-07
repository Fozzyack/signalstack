"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    ArrowRight,
    Check,
    Eye,
    EyeSlash,
    Stack,
} from "@phosphor-icons/react";
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
            <section className="relative flex min-w-0 flex-col overflow-hidden border-b border-white/10 bg-slate-900/40 px-5 py-5 sm:px-10 lg:justify-between lg:border-r lg:border-b-0 lg:p-12 xl:p-16">
                <Link
                    href="/"
                    aria-label="SignalStack home"
                    className="inline-flex w-fit items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
                >
                    <Image src="/logo.png" alt="" width={44} height={44} />
                    <span className="text-lg font-semibold tracking-tight">
                        SignalStack<span className="text-cyan-300">.</span>
                    </span>
                </Link>
                <div className="relative hidden w-full max-w-lg py-16 lg:block">
                    <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">
                        Less noise. More progress.
                    </p>
                    <h2 className="text-5xl leading-[1.08] font-semibold tracking-[-0.045em] xl:text-6xl">
                        Good work starts
                        <br />
                        with a clear signal.
                    </h2>
                    <p className="mt-6 max-w-sm text-base leading-7 text-slate-400">
                        Bring requests, people, and next steps into focus. Your
                        team’s work, all in one place.
                    </p>
                    <div
                        aria-hidden="true"
                        className="relative mt-12 rounded-2xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-cyan-950/20"
                    >
                        <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-5">
                            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                                From request to resolution
                            </span>
                            <Stack
                                size={20}
                                className="shrink-0 text-cyan-300"
                            />
                        </div>
                        <div className="relative mt-6 space-y-4">
                            <div className="absolute top-5 bottom-5 left-5 w-px bg-linear-to-b from-cyan-300/70 to-cyan-300/10" />
                            {[
                                {
                                    number: "01",
                                    title: "Capture the request",
                                    detail: "Give every task a starting point.",
                                },
                                {
                                    number: "02",
                                    title: "Connect the right people",
                                    detail: "Keep ownership clear.",
                                },
                                {
                                    number: "03",
                                    title: "Move work forward",
                                    detail: "Follow progress through to done.",
                                },
                            ].map((step, index) => (
                                <div
                                    key={step.number}
                                    className="relative flex items-center gap-4"
                                >
                                    <span
                                        className={`flex size-10 shrink-0 items-center justify-center rounded-xl border font-mono text-xs ${index === 2 ? "border-cyan-300 bg-cyan-300 text-slate-950" : "border-slate-700 bg-slate-900 text-cyan-300"}`}
                                    >
                                        {index === 2 ? (
                                            <Check size={18} weight="bold" />
                                        ) : (
                                            step.number
                                        )}
                                    </span>
                                    <div className="min-w-0 flex-1 rounded-xl border border-white/5 bg-white/[0.025] px-4 py-3">
                                        <p className="text-sm font-medium text-slate-200">
                                            {step.title}
                                        </p>
                                        <p className="mt-1 text-xs leading-5 text-slate-400">
                                            {step.detail}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <p className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 lg:block">
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
