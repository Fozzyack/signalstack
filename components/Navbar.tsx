"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowUpRight, List, X } from "@phosphor-icons/react";

const links = [
    ["How it works", "/#how-it-works"],
    ["About us", "/#about-us"],
    ["Testimonials", "/#testimonials"],
    ["Contact", "/#contact"],
];
const focus =
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuButton = useRef<HTMLButtonElement>(null);

    return (
        <header
            className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-slate-950/95 text-white backdrop-blur-xl"
            onKeyDown={(event) => {
                if (event.key === "Escape" && isOpen) {
                    setIsOpen(false);
                    menuButton.current?.focus();
                }
            }}
        >
            <nav
                aria-label="Main navigation"
                className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-12"
            >
                <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className={`flex shrink-0 items-center gap-2.5 rounded-sm text-lg font-semibold tracking-tight ${focus}`}
                >
                    <Image src="/logo.png" alt="" width={36} height={36} />
                    <span>
                        SignalStack
                        <span className="text-cyan-300" aria-hidden="true">
                            .
                        </span>
                    </span>
                </Link>
                <div className="hidden items-center gap-7 lg:flex">
                    {links.map(([label, href]) => (
                        <Link
                            key={href}
                            href={href}
                            className={`rounded-sm text-sm text-slate-300 transition hover:text-cyan-300 ${focus}`}
                        >
                            {label}
                        </Link>
                    ))}
                </div>
                <Link
                    href="/login"
                    className={`hidden items-center gap-3 rounded-lg border border-white/20 px-4 py-2.5 text-sm font-medium transition hover:border-cyan-300 hover:text-cyan-300 lg:inline-flex ${focus}`}
                >
                    Log in <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
                <button
                    ref={menuButton}
                    type="button"
                    aria-label={isOpen ? "Close navigation" : "Open navigation"}
                    aria-expanded={isOpen}
                    aria-controls="mobile-navigation"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`rounded-lg border border-white/15 p-2.5 lg:hidden ${focus}`}
                >
                    {isOpen ? (
                        <X size={22} aria-hidden="true" />
                    ) : (
                        <List size={22} aria-hidden="true" />
                    )}
                </button>
            </nav>
            <nav
                id="mobile-navigation"
                aria-label="Mobile navigation"
                hidden={!isOpen}
                className="border-t border-white/10 bg-slate-950 px-5 py-5 lg:hidden"
            >
                <div className="flex flex-col gap-1">
                    {[...links, ["Log in", "/login"]].map(([label, href]) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setIsOpen(false)}
                            className={`rounded-lg px-3 py-3 text-sm text-slate-200 hover:bg-white/5 hover:text-cyan-300 ${focus}`}
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
