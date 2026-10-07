"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";

const serviceAreas = [
    "Infrastructure",
    "Cloud",
    "Security",
    "Technical support",
    "Software delivery",
];
const focus =
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300";

type FooterProps = { onRequestClick: () => void };

const Footer = ({ onRequestClick }: FooterProps) => {
    return (
        <footer className="border-t border-white/10 bg-slate-950 px-5 py-14 text-white sm:px-8 lg:px-12">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
                    <div>
                        <Link
                            href="/"
                            className={`inline-flex items-center gap-2.5 rounded-sm text-lg font-semibold tracking-tight ${focus}`}
                        >
                            <Image
                                src="/logo.png"
                                alt=""
                                width={36}
                                height={36}
                            />
                            <span>
                                SignalStack
                                <span
                                    className="text-cyan-300"
                                    aria-hidden="true"
                                >
                                    .
                                </span>
                            </span>
                        </Link>
                        <p className="mt-5 max-w-60 text-sm leading-7 text-slate-400">
                            Experienced IT specialists.
                            <br />
                            Less noise. More progress.
                        </p>
                    </div>
                    <div>
                        <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-slate-400">
                            Explore
                        </h2>
                        <nav
                            aria-label="Footer navigation"
                            className="mt-5 flex flex-col items-start gap-3 text-sm text-slate-300"
                        >
                            {[
                                ["How it works", "/#how-it-works"],
                                ["About us", "/#about-us"],
                                ["Testimonials", "/#testimonials"],
                                ["Contact", "/#contact"],
                            ].map(([label, href]) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className={`rounded-sm transition hover:text-cyan-300 ${focus}`}
                                >
                                    {label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    <div>
                        <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-slate-400">
                            Expertise
                        </h2>
                        <ul className="mt-5 space-y-3 text-sm text-slate-300">
                            {serviceAreas.map((area) => (
                                <li key={area}>{area}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-slate-400">
                            Let’s get to work
                        </h2>
                        <button
                            type="button"
                            onClick={onRequestClick}
                            className={`mt-5 inline-flex items-center gap-2 rounded-sm text-sm font-medium text-cyan-300 transition hover:text-cyan-100 ${focus}`}
                        >
                            Start a request{" "}
                            <ArrowUpRight size={18} aria-hidden="true" />
                        </button>
                        <Link
                            href="/login"
                            className={`mt-4 block w-fit rounded-sm text-sm text-slate-300 hover:text-cyan-300 ${focus}`}
                        >
                            Team login
                        </Link>
                    </div>
                </div>
                <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 font-mono text-xs text-slate-400 sm:flex-row sm:justify-between">
                    <p>© SignalStack. All rights reserved.</p>
                    <p>Keep the signal moving.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
