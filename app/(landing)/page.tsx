"use client";

import {
    ArrowRight,
    Cloud,
    Code,
    Headset,
    ShieldCheck,
    Stack,
    UsersThree,
} from "@phosphor-icons/react";
import { useLandingLayout } from "./layout";

const serviceAreas = [
    {
        name: "Infrastructure",
        icon: Stack,
        detail: "Strong foundations for the systems your business depends on.",
    },
    {
        name: "Cloud",
        icon: Cloud,
        detail: "Specialist support for your platforms and cloud operations.",
    },
    {
        name: "Security",
        icon: ShieldCheck,
        detail: "Focused expertise to help protect what matters.",
    },
    {
        name: "Technical support",
        icon: Headset,
        detail: "Practical help that keeps your people and technology moving.",
    },
    {
        name: "Software delivery",
        icon: Code,
        detail: "Extra capability to turn your next brief into working software.",
    },
];
const processSteps = [
    {
        number: "01",
        title: "Share the challenge.",
        detail: "Tell us the role, skills, timeline, and project context. We start by understanding what your team really needs.",
    },
    {
        number: "02",
        title: "Find your specialist.",
        detail: "We shortlist available IT professionals with the experience that fits your brief, so you can focus on the right people.",
    },
    {
        number: "03",
        title: "Move work forward.",
        detail: "Bring your contractor onboard with clear expectations and practical support from first conversation to start date.",
    },
];
const testimonials = [
    {
        quote: "SignalStack found us a contractor with the right infrastructure experience in days, not weeks.",
        role: "Operations Lead",
        team: "Technology services",
    },
    {
        quote: "The shortlist was focused, practical, and matched the skills we actually needed for the project.",
        role: "Delivery Manager",
        team: "Software team",
    },
    {
        quote: "They helped us add senior cloud support quickly without turning it into a long hiring process.",
        role: "IT Director",
        team: "Cloud operations",
    },
];
const eyebrow =
    "font-mono text-xs font-medium uppercase tracking-[0.2em] text-cyan-300";
const focus =
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300";
const primaryButton = `inline-flex items-center justify-center gap-4 rounded-lg bg-cyan-300 px-5 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 ${focus}`;

export default function Home() {
    const { openRequestModal } = useLandingLayout();

    return (
        <main
            id="main-content"
            className="min-h-screen overflow-hidden bg-slate-950 text-white"
        >
            <div className="relative isolate min-h-screen overflow-hidden bg-slate-950">
                <video
                    className="absolute inset-0 z-0 h-full w-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-hidden="true"
                >
                    <source src="/landingvid-optimized.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 z-10 bg-slate-950/55" />
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-slate-950 via-slate-950/70 to-slate-950/20" />
                <div className="absolute inset-x-0 bottom-0 z-10 h-48 bg-gradient-to-t from-slate-950 to-transparent" />

                <div className="relative z-20">
                    <section className="mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-7xl items-end px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
                        <div className="max-w-3xl">
                            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                                IT contracting made simple
                            </p>
                            <h1 className="max-w-3xl text-5xl font-semibold leading-[0.98] tracking-tight text-balance sm:text-7xl lg:text-8xl">
                                The right people for work that cannot wait.
                            </h1>
                            <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-end">
                                <p className="max-w-xl text-base leading-7 text-slate-200 sm:text-lg">
                                    We connect businesses with experienced IT
                                    contractors across infrastructure, support,
                                    cloud, security, and software delivery.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={openRequestModal}
                                className="mt-8 inline-flex shrink-0 items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-semibold uppercase text-slate-950 shadow-xl shadow-cyan-950/30 transition hover:bg-cyan-100"
                            >
                                Contact an expert
                            </button>
                            <div className="mt-10 flex flex-wrap gap-2 border-t border-white/15 pt-5">
                                <span className="mr-2 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                    Specialist coverage
                                </span>
                                {serviceAreas.map(({ name }) => (
                                    <span
                                        key={name}
                                        className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs text-slate-200"
                                    >
                                        {name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <section
                id="how-it-works"
                className="scroll-mt-20 border-y border-white/10 bg-slate-900/40 px-5 py-20 sm:px-8 lg:px-12 lg:py-24"
            >
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                        <div>
                            <p className={eyebrow}>01 / How it works</p>
                            <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
                                A clear brief. A better fit.
                            </h2>
                        </div>
                        <p className="max-w-sm text-sm leading-7 text-slate-400">
                            The expertise you need, without making the process
                            more complicated than it needs to be.
                        </p>
                    </div>
                    <div className="mt-12 grid gap-4 md:grid-cols-3">
                        {processSteps.map((step) => (
                            <article
                                key={step.number}
                                className="rounded-xl border border-white/10 bg-slate-950/50 p-6 lg:p-8"
                            >
                                <span className="font-mono text-sm text-cyan-300">
                                    {step.number}
                                    <span
                                        className="ml-3 text-slate-600"
                                        aria-hidden="true"
                                    >
                                        —
                                    </span>
                                </span>
                                <h3 className="mt-8 text-xl font-medium tracking-tight">
                                    {step.title}
                                </h3>
                                <p className="mt-3 text-sm leading-7 text-slate-400">
                                    {step.detail}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
            <section
                id="about-us"
                className="scroll-mt-20 px-5 py-20 sm:px-8 lg:px-12 lg:py-24"
            >
                <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                    <div>
                        <p className={eyebrow}>02 / Built around your team</p>
                        <h2 className="mt-5 text-4xl font-medium leading-tight tracking-tight text-balance sm:text-5xl">
                            Big challenges.
                            <br />
                            The right people.
                        </h2>
                        <p className="mt-6 text-base leading-8 text-slate-400">
                            SignalStack helps businesses bring in experienced IT
                            professionals for the work that cannot wait.
                        </p>
                        <p className="mt-4 text-sm leading-7 text-slate-400">
                            From day-to-day support to complex delivery, we
                            match the right contractor to the right brief. So
                            you can add capacity without losing momentum.
                        </p>
                        <button
                            type="button"
                            onClick={openRequestModal}
                            className={`mt-8 inline-flex items-center gap-3 rounded-sm text-sm font-medium text-cyan-300 hover:text-cyan-100 ${focus}`}
                        >
                            Let’s talk about your project{" "}
                            <ArrowRight size={18} aria-hidden="true" />
                        </button>
                        <div className="mt-10 flex items-center gap-3 border-t border-white/10 pt-6 text-xs text-slate-400">
                            <UsersThree
                                size={22}
                                className="text-cyan-300"
                                aria-hidden="true"
                            />
                            Technical people. Practical experience.
                        </div>
                    </div>
                    <div className="divide-y divide-white/10 border-y border-white/10">
                        {serviceAreas.map(
                            ({ name, icon: Icon, detail }, index) => (
                                <article
                                    key={name}
                                    className="flex items-start gap-4 py-6 sm:gap-5"
                                >
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-cyan-300">
                                        <Icon size={22} aria-hidden="true" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-medium tracking-tight">
                                            {name}
                                        </h3>
                                        <p className="mt-1 text-sm leading-6 text-slate-400">
                                            {detail}
                                        </p>
                                    </div>
                                    <span className="hidden pt-2 font-mono text-xs text-slate-400 sm:block">
                                        0{index + 1}
                                    </span>
                                </article>
                            ),
                        )}
                    </div>
                </div>
            </section>
            <section
                id="testimonials"
                className="scroll-mt-20 border-t border-white/10 px-5 py-20 sm:px-8 lg:px-12 lg:py-24"
            >
                <div className="mx-auto max-w-7xl">
                    <p className={eyebrow}>03 / From the teams we support</p>
                    <h2 className="mt-4 max-w-2xl text-3xl font-medium tracking-tight text-balance sm:text-4xl">
                        Good people. Meaningful progress.
                    </h2>
                    <div className="mt-10 grid gap-4 md:grid-cols-3">
                        {testimonials.map((item) => (
                            <figure
                                key={item.role}
                                className="flex flex-col rounded-xl border border-white/10 bg-slate-900/50 p-6 lg:p-8"
                            >
                                <span
                                    className="h-10 text-5xl leading-none text-cyan-300"
                                    aria-hidden="true"
                                >
                                    “
                                </span>
                                <blockquote className="mt-3 flex-1 text-base leading-8 text-slate-200">
                                    {item.quote}
                                </blockquote>
                                <figcaption className="mt-8 border-t border-white/10 pt-5">
                                    <p className="text-sm font-medium">
                                        {item.role}
                                    </p>
                                    <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-slate-400">
                                        {item.team}
                                    </p>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </section>
            <section
                id="contact"
                className="scroll-mt-20 px-5 pb-20 sm:px-8 lg:px-12"
            >
                <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.06] px-6 py-12 sm:p-12 lg:p-16">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-24 -top-36 h-96 w-96 rounded-full border-[48px] border-cyan-300/[0.04]"
                    />
                    <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                        <div>
                            <p className={eyebrow}>Your next step</p>
                            <h2 className="mt-5 max-w-xl text-4xl font-medium leading-tight tracking-tight text-balance sm:text-5xl">
                                Let’s get the right people
                                <br className="hidden sm:block" /> on your next
                                challenge.
                            </h2>
                            <p className="mt-5 max-w-lg text-sm leading-7 text-slate-400">
                                Tell us what needs attention, the expertise
                                you’re missing, and when you need to move. We’ll
                                take it from there.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={openRequestModal}
                            className={`${primaryButton} w-fit`}
                        >
                            Start a request{" "}
                            <ArrowRight size={18} aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}
