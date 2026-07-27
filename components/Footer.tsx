"use client";

import Image from "next/image";

const serviceAreas = [
    "Infrastructure",
    "Cloud",
    "Security",
    "Technical support",
];

type FooterProps = {
    onRequestClick: () => void;
};

const Footer = ({ onRequestClick }: FooterProps) => {
    return (
        <footer className="border-t border-white/10 bg-slate-950 px-6 py-16 text-white sm:px-8 lg:px-12 lg:py-20">
            <div className="mx-auto w-full max-w-7xl">
                <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-8">
                    <div>
                        <a
                            href="#"
                            className="inline-flex items-center gap-3 text-lg font-semibold tracking-tight"
                        >
                            <Image
                                src="/logo.png"
                                alt="SignalStack logo"
                                width={40}
                                height={40}
                            />
                            SignalStack
                        </a>
                        <p className="mt-6 max-w-xs text-sm leading-6 text-slate-400">
                            Experienced IT specialists for the work that cannot
                            wait.
                        </p>
                    </div>

                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                            Explore
                        </p>
                        <nav className="mt-5 flex flex-col items-start gap-3 text-sm text-slate-300">
                            <a className="transition hover:text-cyan-300" href="#how-it-works">
                                How it works
                            </a>
                            <a className="transition hover:text-cyan-300" href="#about-us">
                                Expert network
                            </a>
                            <a className="transition hover:text-cyan-300" href="#testimonials">
                                Testimonials
                            </a>
                        </nav>
                    </div>

                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                            Coverage
                        </p>
                        <div className="mt-5 flex flex-col gap-3 text-sm text-slate-300">
                            {serviceAreas.map((area) => (
                                <span key={area}>{area}</span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                            Start here
                        </p>
                        <p className="mt-5 max-w-xs text-sm leading-6 text-slate-400">
                            Have a technical gap to fill? Tell us what needs
                            attention.
                        </p>
                        <button
                            type="button"
                            onClick={onRequestClick}
                            className="mt-5 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
                        >
                            Contact an expert
                        </button>
                    </div>
                </div>

                <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                    <p>SignalStack. Keep the signal moving.</p>
                    <p>© SignalStack</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
