import { Request } from "@/types/requests";
import { CalendarBlank, Check, UserPlus } from "@phosphor-icons/react";

type RequestCardProps = {
    request: Request;
    isClaimed: boolean;
    onClaim: (id: string) => void;
};

export function RequestCard({ request, isClaimed, onClaim }: RequestCardProps) {
    return (
        <article className="rounded-xl border border-white/10 bg-white/[0.035] px-4 py-4 transition hover:border-cyan-300/30 hover:bg-white/[0.05] sm:px-5">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_150px_160px_auto] lg:items-center">
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[11px] text-slate-500">{request.reference}</span>
                        <span className="rounded-full bg-cyan-300/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cyan-200">
                            {request.status.replace("_", " ")}
                        </span>
                    </div>
                    <h3 className="mt-2 truncate text-base font-medium text-slate-100">{request.title}</h3>
                    <p className="mt-1 truncate text-sm text-slate-500">{request.description}</p>
                </div>
                <div className="text-sm">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">Client</p>
                    <a href={`mailto:${request.client_email}`} className="mt-1 block truncate text-slate-300 hover:text-cyan-300">
                        {request.client_name}
                    </a>
                </div>
                <div className="text-sm">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">Received</p>
                    <p className="mt-1 flex items-center gap-1.5 text-slate-400">
                        <CalendarBlank size={14} /> {new Date(request.created_at).toLocaleDateString()}
                    </p>
                </div>
                <div className="flex shrink-0 items-center gap-2 lg:justify-end">
                    {(request.assignments ?? []).map((assignment) => (
                        <div
                            key={assignment.id}
                            className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-950 bg-violet-300 text-[10px] font-bold text-slate-950"
                            title={assignment.user_name ?? assignment.user_id}
                        >
                            {(assignment.user_name ?? assignment.user_id)
                                .split(" ")
                                .map((part) => part[0])
                                .join("")
                                .slice(0, 2)
                                .toUpperCase()}
                        </div>
                    ))}
                    {(request.assignments ?? []).length > 0 && (
                        <span className="text-xs text-slate-500">
                            {request.assignments?.length} assigned
                        </span>
                    )}
                    {!isClaimed && (
                        <button
                            onClick={() => onClaim(request.id)}
                            className="flex items-center gap-1.5 rounded-lg border border-cyan-300/30 px-3 py-2 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-300 hover:text-slate-950"
                        >
                            <UserPlus size={15} /> Assign to me
                        </button>
                    )}
                    {isClaimed && (
                        <span className="flex items-center gap-1.5 rounded-lg bg-emerald-300/10 px-3 py-2 text-xs font-semibold text-emerald-300">
                            <Check size={15} /> Assigned to you
                        </span>
                    )}
                </div>
            </div>
        </article>
    );
}
