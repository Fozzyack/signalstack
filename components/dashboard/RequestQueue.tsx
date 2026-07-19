import {
    CaretLeft,
    CaretRight,
    MagnifyingGlass,
} from "@phosphor-icons/react";
import { RequestCard } from "./RequestCard";
import { useState } from "react";
import { Request } from "@/types/requests";

type RequestQueueProps = {
    requests: Request[];
    activeFilter: string;
    claimed: string[];
    onFilterChange: (filter: string) => void;
    onClaim: (id: string) => void;
};

export function RequestQueue({
    requests,
    activeFilter,
    claimed,
    onFilterChange,
    onClaim,
}: RequestQueueProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const filters = ["All requests", "Unassigned", "My tasks", "In progress"];
    const pageSize = 3;
    const pageCount = Math.max(1, Math.ceil(requests.length / pageSize));
    const page = Math.min(currentPage, pageCount);
    const visibleRequests = requests.slice(
        (page - 1) * pageSize,
        page * pageSize,
    );

    const changeFilter = (filter: string) => {
        setCurrentPage(1);
        onFilterChange(filter);
    };

    return (
        <section id="queue" className="min-w-0">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-xl font-semibold">Request queue</h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Review incoming work and claim a request.
                    </p>
                </div>
                <div className="flex gap-2">
                    <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-slate-500">
                        <MagnifyingGlass size={16} />
                        <span className="hidden sm:inline">
                            Search requests
                        </span>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex gap-1 overflow-x-auto border-b border-white/10">
                <div className="flex min-w-max gap-1">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => changeFilter(filter)}
                            className={`border-b-2 px-3 pb-3 text-xs font-medium transition ${activeFilter === filter ? "border-cyan-300 text-cyan-300" : "border-transparent text-slate-500 hover:text-slate-300"}`}
                        >
                            {filter}
                            {filter === "Unassigned" && (
                                <span className="ml-2 rounded-full bg-amber-200/15 px-1.5 py-0.5 text-[10px] text-amber-200">
                                    4
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
            <div className="mt-3 space-y-3">
                {visibleRequests.map((request) => (
                    <RequestCard
                        key={request.id}
                        request={request}
                        isClaimed={claimed.includes(request.id)}
                        onClaim={onClaim}
                    />
                ))}
                {requests.length === 0 && (
                    <div className="rounded-xl border border-dashed border-white/10 py-14 text-center text-sm text-slate-500">
                        No requests match this view.
                    </div>
                )}
            </div>
            {pageCount > 1 && (
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                    <button
                        onClick={() =>
                            setCurrentPage((current) =>
                                Math.max(1, current - 1),
                            )
                        }
                        disabled={page === 1}
                        className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-400 transition hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                    >
                        <CaretLeft size={14} /> Previous
                    </button>
                    <div className="flex items-center gap-1">
                        {Array.from(
                            { length: pageCount },
                            (_, index) => index + 1,
                        ).map((pageNumber) => (
                            <button
                                key={pageNumber}
                                onClick={() => setCurrentPage(pageNumber)}
                                className={`h-8 w-8 rounded-lg text-xs font-medium transition ${page === pageNumber ? "bg-cyan-300 text-slate-950" : "text-slate-500 hover:bg-white/[0.06] hover:text-white"}`}
                            >
                                {pageNumber}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() =>
                            setCurrentPage((current) =>
                                Math.min(pageCount, current + 1),
                            )
                        }
                        disabled={page === pageCount}
                        className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-400 transition hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                    >
                        Next <CaretRight size={14} />
                    </button>
                </div>
            )}
        </section>
    );
}
