"use client";

import { experts } from "@/components/dashboard/data";
import { useLandingLayout } from "./layout";

const serviceAreas = [
    "Infrastructure",
    "Cloud",
    "Security",
    "Technical support",
    "Software delivery",
];

const processSteps = [
    {
        number: "01",
        title: "Tell us what needs attention",
        detail: "Share the role, skills, timeline, and project context so we can understand the gap you need to fill.",
    },
    {
        number: "02",
        title: "Meet the right specialists",
        detail: "We shortlist available IT professionals across support, infrastructure, cloud, security, and software delivery.",
    },
    {
        number: "03",
        title: "Start with confidence",
        detail: "Bring the contractor onboard quickly, with clear expectations and practical support from first conversation to start date.",
    },
];

export default function Home() {
    const { openRequestModal } = useLandingLayout();

    return (
        <main className="min-h-screen bg-slate-950 text-white">
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
                                className="inline-flex shrink-0 items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-semibold uppercase text-slate-950 shadow-xl shadow-cyan-950/30 transition hover:bg-cyan-100 mt-8"
                            >
                                Contact an expert
                            </button>
                            <div className="mt-10 flex flex-wrap gap-2 border-t border-white/15 pt-5">
                                <span className="mr-2 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                    Specialist coverage
                                </span>
                                {serviceAreas.map((area) => (
                                    <span
                                        key={area}
                                        className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs text-slate-200"
                                    >
                                        {area}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <section
                id="how-it-works"
                className="pointer-events-auto border-t border-slate-200 bg-white px-6 py-20 text-slate-950 sm:px-8 lg:px-12"
            >
                <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                            How SignalStack works
                        </p>
                        <h2 className="mt-5 max-w-md text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                            From urgent brief to useful expertise.
                        </h2>
                        <p className="mt-5 max-w-sm text-lg leading-8 text-slate-600">
                            A straightforward path for finding proven IT
                            professionals, confirming fit, and getting them
                            productive quickly.
                        </p>
                    </div>

                    <div className="border-t border-slate-300">
                        {processSteps.map((step) => (
                            <article
                                key={step.number}
                                className="grid gap-5 border-b border-slate-300 py-7 sm:grid-cols-[5rem_1fr_0.8fr] sm:items-start sm:gap-7 sm:py-9"
                            >
                                <p className="text-4xl font-semibold tracking-tight text-cyan-600 sm:text-5xl">
                                    {step.number}
                                </p>
                                <h3 className="text-2xl font-semibold tracking-tight">
                                    {step.title}
                                </h3>
                                <p className="text-sm leading-7 text-slate-600">
                                    {step.detail}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section
                id="about-us"
                className="pointer-events-auto border-t border-white/10 bg-slate-950 px-6 py-20 text-white sm:px-8 lg:px-12"
            >
                <div className="mx-auto w-full max-w-7xl">
                    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                        <div className="space-y-5 text-lg leading-8 text-slate-300">
                            <p>
                                SignalStack helps businesses bring in
                                experienced IT professionals for the work that
                                cannot wait, from infrastructure and support to
                                cloud, security, and software delivery.
                            </p>
                            <p>
                                We focus on matching the right contractor to the
                                right brief, keeping the process straightforward
                                so teams can add capacity without slowing down.
                            </p>
                        </div>

                        <div className="lg:text-right">
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                                About us
                            </p>
                            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                                Practical IT contracting for teams that need
                                reliable help.
                            </h2>
                        </div>
                    </div>

                    <div className="mt-20 border-t border-white/10 pt-16">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                            Meet the expert network
                        </p>
                        <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                            <h3 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                                Technical people for the problems that need
                                more than a quick fix.
                            </h3>
                            <p className="max-w-sm text-sm leading-6 text-slate-400">
                                Our specialists bring focused experience across
                                the systems, platforms, and delivery work that
                                keeps teams moving.
                            </p>
                        </div>
                        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
                            {experts.map((expert, index) => (
                                <article
                                    key={expert.initials}
                                    className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.07]"
                                >
                                    <div className="flex items-start justify-between">
                                        <div
                                            className={`flex h-14 w-14 items-center justify-center rounded-full text-sm font-bold ${expert.color}`}
                                        >
                                            {expert.initials}
                                        </div>
                                        <span className="text-xs font-semibold tracking-[0.2em] text-slate-500">
                                            0{index + 1}
                                        </span>
                                    </div>
                                    <h3 className="mt-8 font-semibold text-white">
                                        {expert.name}
                                    </h3>
                                    <p className="mt-2 text-xs uppercase leading-5 tracking-[0.16em] text-slate-400">
                                        {expert.role}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section
                id="testimonials"
                className="pointer-events-auto border-t border-white/10 bg-slate-950 px-6 py-20 text-white sm:px-8 lg:px-12"
            >
                <div className="mx-auto w-full max-w-7xl">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                            Testimonials
                        </p>
                        <h2 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                            Trusted support when delivery cannot wait.
                        </h2>
                        <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
                            SignalStack helps teams bring in practical IT
                            expertise without adding unnecessary complexity to
                            the hiring process.
                        </p>
                    </div>

                    <div className="mt-10 grid gap-5 md:grid-cols-3">
                        <figure className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-cyan-950/10">
                            <blockquote className="text-sm leading-7 text-slate-200">
                                “SignalStack found us a contractor with the
                                right infrastructure experience in days, not
                                weeks.”
                            </blockquote>
                            <figcaption className="mt-6 border-t border-white/10 pt-5">
                                <p className="font-semibold text-white">
                                    Operations Lead
                                </p>
                                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                                    Technology services
                                </p>
                            </figcaption>
                        </figure>

                        <figure className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-cyan-950/10">
                            <blockquote className="text-sm leading-7 text-slate-200">
                                “The shortlist was focused, practical, and
                                matched the skills we actually needed for the
                                project.”
                            </blockquote>
                            <figcaption className="mt-6 border-t border-white/10 pt-5">
                                <p className="font-semibold text-white">
                                    Delivery Manager
                                </p>
                                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                                    Software team
                                </p>
                            </figcaption>
                        </figure>

                        <figure className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-cyan-950/10">
                            <blockquote className="text-sm leading-7 text-slate-200">
                                “They helped us add senior cloud support quickly
                                without turning it into a long hiring process.”
                            </blockquote>
                            <figcaption className="mt-6 border-t border-white/10 pt-5">
                                <p className="font-semibold text-white">
                                    IT Director
                                </p>
                                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                                    Cloud operations
                                </p>
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </section>

            <section
                id="contact"
                className="pointer-events-auto relative isolate overflow-hidden border-t border-slate-200 bg-white px-6 py-24 text-slate-950 sm:px-8 lg:px-12 lg:py-32"
            >
                <div className="absolute -right-28 -top-32 -z-10 h-96 w-96 rounded-full border-[48px] border-cyan-300/20" />
                <div className="absolute -bottom-52 -left-24 -z-10 h-96 w-96 rounded-full border-[48px] border-slate-950/[0.04]" />
                <div className="mx-auto w-full max-w-7xl">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">
                            Contact us
                        </p>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                            SignalStack / 05
                        </p>
                    </div>

                    <h2 className="mt-12 max-w-5xl text-5xl font-semibold leading-[0.95] tracking-tight text-balance sm:text-7xl lg:text-8xl">
                        Bring the right signal to your next deadline.
                    </h2>

                    <div className="mt-16 grid gap-8 border-t border-slate-200 pt-7 lg:grid-cols-[1fr_auto] lg:items-end">
                        <p className="max-w-xl text-lg leading-8 text-slate-600">
                            Tell us what is blocking your team, what expertise
                            you need, and when the work needs to move. We will
                            help you find the right technical specialist.
                        </p>
                        <button
                            type="button"
                            onClick={openRequestModal}
                            className="inline-flex items-center justify-center rounded-lg bg-slate-950 px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-slate-800"
                        >
                            Start a request
                        </button>
                    </div>
                </div>
            </section>

        </main>
    );
}
