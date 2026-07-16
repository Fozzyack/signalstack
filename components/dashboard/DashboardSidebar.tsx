"use client";

import {
    CheckCircle,
    Clock,
    GearSix,
    Pulse,
    SignOut,
} from "@phosphor-icons/react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function DashboardSidebar() {
    const pathname = usePathname();
    const isDashboard = pathname === "/dashboard";
    const isMyTasks = pathname.startsWith("/dashboard/my-tasks");

    return (
        <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-slate-950 px-5 py-6 lg:flex lg:flex-col">
            <div className="flex items-center gap-3 px-2">
                <Image
                    src="/logo.png"
                    alt="SignalStack"
                    width={36}
                    height={36}
                    className="rounded-lg"
                />
                <div>
                    <p className="font-semibold tracking-tight">SignalStack</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
                        Operations
                    </p>
                </div>
            </div>
            <div className="mt-14">
                <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-600">
                    Workspace
                </p>
                <nav className="mt-3 space-y-1">
                    <a
                        href="/dashboard"
                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${isDashboard ? "bg-white/[0.08] text-white" : "text-slate-400 hover:bg-white/[0.05] hover:text-white"}`}
                    >
                        <Pulse
                            size={18}
                            weight="bold"
                            className={isDashboard ? "text-cyan-300" : ""}
                        />{" "}
                        Request queue{" "}
                        <span className="ml-auto rounded-full bg-cyan-300 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-950">
                            12
                        </span>
                    </a>
                    <a
                        href="/dashboard/my-tasks"
                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${isMyTasks ? "bg-white/[0.08] text-white" : "text-slate-400 hover:bg-white/[0.05] hover:text-white"}`}
                    >
                        <CheckCircle
                            size={18}
                            className={isMyTasks ? "text-cyan-300" : ""}
                        />{" "}
                        My tasks
                    </a>
                    <a
                        href="#activity"
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
                    >
                        <Clock size={18} /> Activity log
                    </a>
                </nav>
            </div>
            <div className="mt-auto border-t border-white/10 pt-5">
                <a
                    href="#settings"
                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-400 hover:text-white"
                >
                    <GearSix size={18} /> Settings
                </a>
                <button className="mt-5 flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-slate-400 transition hover:border-white/20 hover:text-white">
                    <SignOut size={18} />
                    <span>Log out</span>
                </button>
            </div>
        </aside>
    );
}
