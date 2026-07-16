import { CheckCircle, Pulse, UserPlus, Warning } from "@phosphor-icons/react";

const stats = [
    {
        label: "Open requests",
        value: "12",
        detail: "+2 since yesterday",
        icon: Pulse,
        tone: "text-cyan-300",
    },
    {
        label: "Unassigned",
        value: "04",
        detail: "Needs an owner",
        icon: UserPlus,
        tone: "text-amber-200",
    },
    {
        label: "Due today",
        value: "03",
        detail: "Across 2 experts",
        icon: Warning,
        tone: "text-rose-200",
    },
    {
        label: "Resolved this week",
        value: "18",
        detail: "+24% vs last week",
        icon: CheckCircle,
        tone: "text-emerald-300",
    },
];

export function DashboardStats() {
    return (
        <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="rounded-xl border border-white/10 bg-white/[0.04] p-5"
                >
                    <div className="flex items-center justify-between">
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                            {stat.label}
                        </p>
                        <stat.icon size={18} className={stat.tone} />
                    </div>
                    <p className="mt-5 font-mono text-3xl font-medium tracking-tight">
                        {stat.value}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">{stat.detail}</p>
                </div>
            ))}
        </div>
    );
}
