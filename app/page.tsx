import Navbar from "@/components/Navbar";
import { Boxes } from "@/components/ui/background-boxes";
import { Terminal } from "@/components/ui/terminal";

export default function Home() {
    return (
        <main className="min-h-screen bg-slate-950 text-white">
            <div className="relative overflow-hidden bg-slate-950">
                <Boxes className="opacity-20" />

                <div className="pointer-events-none relative z-10">
                <div className="pointer-events-auto">
                    <Navbar />
                </div>

                <section className="mx-auto grid min-h-[calc(100vh-88px)] w-full max-w-7xl items-center gap-12 px-6 py-16 sm:px-8 lg:grid-cols-2 lg:px-12">
                    <div className="pointer-events-auto max-w-2xl">
                        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                            IT contracting made simple
                        </p>
                        <h1 className="text-lg font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
                            Hire trusted IT professionals without the hiring
                            drag.
                        </h1>
                        <p className="mt-6 max-w-xl text-md leading-8 text-slate-300 sm:text-xl">
                            We connect businesses with experienced contractors
                            for infrastructure, support, cloud, security, and
                            software delivery, ready to step in when you need
                            extra capacity.
                        </p>
                        <div className="mt-10">
                            <a
                                href="mailto:hello@signalstack.com"
                                className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-sm uppercase text-slate-950 shadow-lg shadow-cyan-950/30 transition"
                            >
                                Contact an expert
                            </a>
                        </div>
                    </div>

                    <Terminal
                        username="signalstack"
                        enableSound={false}
                        typingSpeed={35}
                        delayBetweenCommands={700}
                        className="pointer-events-auto max-w-none px-0"
                        commands={[
                            "find-contractors --skill cloud --available now",
                            "match-brief --role 'senior infrastructure engineer'",
                            "deploy-expert --start monday",
                        ]}
                        outputs={{
                            0: [
                                "Searching vetted IT professionals...",
                                "12 available contractors found",
                            ],
                            1: [
                                "Checking experience, availability, and fit...",
                                "Best match: 8+ years infrastructure and cloud delivery",
                            ],
                            2: [
                                "Contractor shortlist ready",
                                "Your project can start without the hiring drag",
                            ],
                        }}
                    />
                </section>
                </div>
            </div>

                <section
                    id="how-it-works"
                    className="pointer-events-auto border-t border-slate-200 bg-white px-6 py-20 text-slate-950 sm:px-8 lg:px-12"
                >
                    <div className="mx-auto w-full max-w-7xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                            How SignalStack works
                        </p>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                            A straightforward process for finding proven IT
                            professionals, confirming fit, and getting them
                            productive quickly.
                        </p>
                        <div className="mt-6 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                            <h2 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                                Get the right IT contractor into your team
                                without slowing the project down.
                            </h2>

                            <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
                                <div className="rounded-2xl border border-slate-200 p-6">
                                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                                        01
                                    </p>
                                    <h3 className="mt-4 text-xl font-semibold">
                                        Tell us what you need
                                    </h3>
                                    <p className="mt-3 leading-7 text-slate-600">
                                        Share the role, skills, timeline, and
                                        project context so we can understand the
                                        gap you need to fill.
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-slate-200 p-6">
                                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                                        02
                                    </p>
                                    <h3 className="mt-4 text-xl font-semibold">
                                        We shortlist suitable experts
                                    </h3>
                                    <p className="mt-3 leading-7 text-slate-600">
                                        We match you with available IT
                                        professionals across support,
                                        infrastructure, cloud, security, and
                                        software delivery.
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-slate-200 p-6">
                                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                                        03
                                    </p>
                                    <h3 className="mt-4 text-xl font-semibold">
                                        Start with confidence
                                    </h3>
                                    <p className="mt-3 leading-7 text-slate-600">
                                        Bring the contractor onboard quickly,
                                        with clear expectations and practical
                                        support from first conversation to start
                                        date.
                                    </p>
                                </div>
                            </div>
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
                                    experienced IT professionals for the work
                                    that cannot wait, from infrastructure and
                                    support to cloud, security, and software
                                    delivery.
                                </p>
                                <p>
                                    We focus on matching the right contractor to
                                    the right brief, keeping the process
                                    straightforward so teams can add capacity
                                    without slowing down.
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

                        <div className="mt-16">
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                                Meet the team
                            </p>
                            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                                    <div className="mb-5 aspect-square rounded-xl border border-dashed border-white/15 bg-slate-900" />
                                    <h3 className="font-semibold text-white">
                                        Team member
                                    </h3>
                                    <p className="mt-1 text-sm uppercase tracking-[0.18em] text-slate-400">
                                        Contractor matching
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                                    <div className="mb-5 aspect-square rounded-xl border border-dashed border-white/15 bg-slate-900" />
                                    <h3 className="font-semibold text-white">
                                        Team member
                                    </h3>
                                    <p className="mt-1 text-sm uppercase tracking-[0.18em] text-slate-400">
                                        Technical screening
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                                    <div className="mb-5 aspect-square rounded-xl border border-dashed border-white/15 bg-slate-900" />
                                    <h3 className="font-semibold text-white">
                                        Team member
                                    </h3>
                                    <p className="mt-1 text-sm uppercase tracking-[0.18em] text-slate-400">
                                        Client support
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                                    <div className="mb-5 aspect-square rounded-xl border border-dashed border-white/15 bg-slate-900" />
                                    <h3 className="font-semibold text-white">
                                        Team member
                                    </h3>
                                    <p className="mt-1 text-sm uppercase tracking-[0.18em] text-slate-400">
                                        Delivery coordination
                                    </p>
                                </div>
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
                                expertise without adding unnecessary complexity
                                to the hiring process.
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
                                    matched the skills we actually needed for
                                    the project.”
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
                                    “They helped us add senior cloud support
                                    quickly without turning it into a long hiring
                                    process.”
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
                    className="pointer-events-auto border-t border-white/10 bg-slate-950 px-6 py-20 text-white sm:px-8 lg:px-12"
                >
                    <div className="mx-auto grid w-full max-w-7xl gap-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-cyan-950/20 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                                Contact us
                            </p>
                            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                                Need an IT professional for your next project?
                            </h2>
                            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                                Tell us what skills you need, when you need
                                support, and what you are trying to deliver. We
                                will help you find the right contractor.
                            </p>
                        </div>

                        <a
                            href="mailto:hello@signalstack.com"
                            className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-sm uppercase text-slate-950 transition hover:bg-slate-200"
                        >
                            Contact an expert
                        </a>
                    </div>
                </section>
        </main>
    );
}
