import { CheckCircle, Pulse, UserPlus, Warning } from "@phosphor-icons/react";
import { Request } from "@/types/requests";

export function DashboardStats({ requests }: { requests: Request[] }) {
    const today = new Date();
    const todayKey = today.toISOString().slice(0, 10);
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - 7);

    const isResolved = (request: Request) =>
        ["resolved", "closed", "complete", "completed"].includes(
            request.status.toLowerCase(),
        );
    const openRequests = requests.filter((request) => !isResolved(request));
    const unassignedRequests = openRequests.filter(
        (request) => (request.assignments ?? []).length === 0,
    );
    const dueToday = openRequests.filter((request) =>
        (request.assignments ?? []).some(
            (assignment) =>
                !assignment.unassigned_at &&
                assignment.personal_deadline?.slice(0, 10) === todayKey,
        ),
    );
    const resolvedThisWeek = requests.filter((request) => {
        if (!request.resolved_at) return false;
        const resolvedAt = new Date(request.resolved_at);
        return resolvedAt >= weekStart && resolvedAt <= today;
    });

    const stats = [
        {
            label: "Open requests",
            value: openRequests.length,
            detail: "Across all queues",
            icon: Pulse,
            tone: "text-cyan-300",
        },
        {
            label: "Unassigned",
            value: unassignedRequests.length,
            detail: "Needs an owner",
            icon: UserPlus,
            tone: "text-amber-200",
        },
        {
            label: "Due today",
            value: dueToday.length,
            detail: "Assigned deadlines",
            icon: Warning,
            tone: "text-rose-200",
        },
        {
            label: "Resolved this week",
            value: resolvedThisWeek.length,
            detail: "Last 7 days",
            icon: CheckCircle,
            tone: "text-emerald-300",
        },
    ];

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
                         {String(stat.value).padStart(2, "0")}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">{stat.detail}</p>
                </div>
            ))}
        </div>
    );
}
