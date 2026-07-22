import type { Expert, RequestAssignment } from "./types";

export function TeamWorkload({
    experts,
    assignments,
}: {
    experts: Expert[];
    assignments: RequestAssignment[];
}) {
    const workloadByName = assignments.reduce<Record<string, number>>(
        (workload, assignment) => {
            if (!assignment.unassigned_at && !assignment.completed_at) {
                workload[assignment.user_name] =
                    (workload[assignment.user_name] ?? 0) + 1;
            }
            return workload;
        },
        {},
    );

    return (
        <section id="team">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold">Team workload</h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Active requests by expert.
                    </p>
                </div>
            </div>
            <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.035] p-4">
                {experts.map((expert, index) => {
                    const count = workloadByName[expert.name] ?? 0;

                    return (
                        <div
                            key={expert.initials}
                            className={`flex items-center gap-3 py-3 ${index !== experts.length - 1 ? "border-b border-white/[0.07]" : ""}`}
                        >
                            <div
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${expert.color}`}
                            >
                                {expert.initials}
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-2">
                                    <p className="truncate text-sm font-medium">
                                        {expert.name}
                                    </p>
                                    <span className="font-mono text-xs text-slate-300">
                                        {count}
                                    </span>
                                </div>
                                <p className="mt-1 truncate text-[11px] text-slate-500">
                                    {expert.role}
                                </p>
                                <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
                                    <div
                                        className={`h-full rounded-full ${count > 5 ? "w-[88%] bg-amber-200" : count > 3 ? "w-[62%] bg-cyan-300" : count > 0 ? "w-[38%] bg-emerald-300" : "w-0"}`}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
