"use client";

import { usePathname } from "next/navigation";

export function DashboardHeader() {
    const pathname = usePathname();
    const pageName = pathname.startsWith("/dashboard/my-tasks")
        ? "My tasks"
        : "Home";

    return (
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-white/10 bg-slate-950/90 px-5 backdrop-blur-md sm:px-8 lg:px-10">
            <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_theme(colors.cyan.300)]" />
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
                    {pageName}
                </p>
            </div>
        </header>
    );
}
