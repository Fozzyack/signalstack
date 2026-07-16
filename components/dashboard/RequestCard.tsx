import { Check, EnvelopeSimple, UserPlus } from "@phosphor-icons/react";
import type { Request } from "./types";

type RequestCardProps = {
    request: Request;
    isClaimed: boolean;
    onClaim: (id: string) => void;
};

export function RequestCard({ request, isClaimed, onClaim }: RequestCardProps) {
    return (
        <article className="rounded-xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-cyan-300/30 hover:bg-white/[0.05]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[11px] text-slate-600">
                            {request.id}
                        </span>
                        <span className="text-xs text-slate-600">
                            {request.age}
                        </span>
                    </div>
                    <h3 className="mt-3 text-base font-medium text-slate-100">
                        {request.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                        {request.description}
                    </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                    {request.assignees.map((person) => (
                        <div
                            key={person}
                            className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-950 bg-violet-300 text-[10px] font-bold text-slate-950"
                            title={person}
                        >
                            {person}
                        </div>
                    ))}
                    {request.assignees.length > 0 && (
                        <span className="text-xs text-slate-500">
                            {request.assignees.length} assigned
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
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-4">
                <a
                    href={`mailto:${request.email}`}
                    className="flex items-center gap-2 text-xs text-slate-400 transition hover:text-cyan-300"
                >
                    <EnvelopeSimple size={15} /> {request.client}{" "}
                    <span className="hidden text-slate-600 sm:inline">
                        {request.email}
                    </span>
                </a>
            </div>
        </article>
    );
}
