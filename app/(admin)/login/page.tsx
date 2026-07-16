"use client";

import Link from "next/link";

const LoginPage = () => {
    return (
        <main className="grid min-h-screen bg-slate-950 text-white lg:grid-cols-12">
            <section className="relative min-h-[480px] overflow-hidden lg:col-span-5 lg:min-h-screen">
                <video
                    className="absolute inset-0 z-0 h-full w-full object-cover"
                    loop
                    muted
                    autoPlay
                    playsInline
                    aria-hidden="true"
                >
                    <source src="/loginvid-optimized.mp4" type="video/mp4" />
                </video>

                <div className="absolute inset-0 z-10 bg-slate-950/35" />
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-slate-950/70 via-transparent to-slate-950" />

                <div className="relative z-20 flex min-h-[480px] flex-col justify-between p-6 sm:p-10 lg:min-h-screen lg:p-12">
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
                        <span>SignalStack</span>
                    </div>

                    <div className="max-w-sm">
                        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                            Keep the signal moving
                        </p>
                        <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                            Your operations, in focus.
                        </h1>
                        <p className="mt-5 max-w-xs text-sm leading-6 text-slate-200/80">
                            One clear view of the people, projects, and
                            decisions keeping your work moving forward.
                        </p>
                    </div>
                </div>
            </section>

            <section className="flex items-center justify-center px-6 py-14 sm:px-10 lg:col-span-7 lg:px-16">
                <div className="w-full max-w-md">
                    <Link
                        href="/"
                        className="mb-12 inline-flex text-sm text-slate-400 transition hover:text-white"
                    >
                        Back to home
                    </Link>

                    <div className="mb-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
                            Welcome back
                        </p>
                        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                            Sign in to your workspace.
                        </h2>
                        <p className="mt-4 text-sm leading-6 text-slate-400">
                            Access your SignalStack dashboard and keep your team
                            aligned.
                        </p>
                    </div>

                    <form
                        className="space-y-5"
                        onSubmit={(event) => event.preventDefault()}
                    >
                        <label className="block">
                            <span className="mb-2 block text-sm font-medium text-slate-200">
                                Email address
                            </span>
                            <input
                                type="email"
                                name="email"
                                autoComplete="email"
                                placeholder="you@company.com"
                                className="h-12 w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                            />
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-sm font-medium text-slate-200">
                                Password
                            </span>
                            <input
                                type="password"
                                name="password"
                                autoComplete="current-password"
                                placeholder="Enter your password"
                                className="h-12 w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                            />
                        </label>

                        <button
                            type="submit"
                            className="h-12 w-full rounded-lg bg-cyan-300 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
                        >
                            Continue to dashboard
                        </button>
                    </form>

                    <p className="mt-8 border-t border-white/10 pt-6 text-center text-xs leading-5 text-slate-500">
                        Protected workspace access for SignalStack teams.
                    </p>
                </div>
            </section>
        </main>
    );
};

export default LoginPage;
