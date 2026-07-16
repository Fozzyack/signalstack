"use client";

import { CaretLeft, CaretRight, MagnifyingGlass } from "@phosphor-icons/react";
import { useState } from "react";
import {
    MyTaskCard,
    type PersonalTask,
} from "@/components/dashboard/MyTaskCard";

const initialTasks: PersonalTask[] = [
    {
        id: "SS-1048",
        title: "VPN access dropping every 20 minutes",
        client: "Northstar Logistics",
        email: "maya.chen@northstar.io",
        status: "In progress",
        due: "2026-07-16",
        detail: "Remote warehouse team is losing access to internal tools during shifts.",
        notes: [
            "Check whether the disconnects correlate with the warehouse handover window.",
        ],
    },
    {
        id: "SS-1045",
        title: "Review permissions for finance shared drive",
        client: "Verity & Co",
        email: "sarah@verityandco.com",
        status: "Waiting",
        due: "2026-07-17",
        detail: "Quarterly access review requested before the external audit begins.",
        notes: [
            "Waiting for Sarah to confirm the list of current finance users.",
        ],
    },
    {
        id: "SS-1043",
        title: "Move production database to managed cloud",
        client: "Kiteworks",
        email: "devops@kiteworks.dev",
        status: "New",
        due: "2026-07-21",
        detail: "Looking for a migration plan and someone to own the first phase.",
        notes: [],
    },
];

export default function MyTasksPage() {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 2;
    const filteredTasks = initialTasks.filter((task) =>
        [task.id, task.title, task.client, task.detail]
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase()),
    );
    const pageCount = Math.max(1, Math.ceil(filteredTasks.length / pageSize));
    const page = Math.min(currentPage, pageCount);
    const visibleTasks = filteredTasks.slice(
        (page - 1) * pageSize,
        page * pageSize,
    );

    return (
        <main className="min-h-full bg-slate-950 text-white">
            <div className="mx-auto max-w-[1480px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                            Personal workspace
                        </p>
                        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                            My tasks
                        </h1>
                        <p className="mt-2 text-sm text-slate-400">
                            Keep your assigned work moving with private context
                            and clear next steps.
                        </p>
                    </div>
                </div>
                <div className="mt-10">
                    <section>
                        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <div>
                                <h2 className="text-xl font-semibold">
                                    Your active work
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Private notes are only visible to you.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-slate-500">
                                <MagnifyingGlass size={16} />
                                <input
                                    value={search}
                                    onChange={(event) => {
                                        setSearch(event.target.value);
                                        setCurrentPage(1);
                                    }}
                                    placeholder="Search my tasks"
                                    className="w-40 bg-transparent text-sm text-white outline-none placeholder:text-slate-600 sm:w-52"
                                />
                            </div>
                        </div>
                        <div className="mt-5 space-y-4">
                            {visibleTasks.map((task) => (
                                <MyTaskCard key={task.id} task={task} />
                            ))}
                            {visibleTasks.length === 0 && (
                                <div className="rounded-xl border border-dashed border-white/10 py-14 text-center text-sm text-slate-500">
                                    No tasks match your search.
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
                                            onClick={() =>
                                                setCurrentPage(pageNumber)
                                            }
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
                </div>
            </div>
        </main>
    );
}
