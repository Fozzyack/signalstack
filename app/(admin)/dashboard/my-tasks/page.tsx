"use client";

import {
    Calendar,
    CaretLeft,
    CaretRight,
    CheckCircle,
    Clock,
    MagnifyingGlass,
    NotePencil,
} from "@phosphor-icons/react";
import { useEffect, useState, type ReactNode } from "react";
import {
    MyTaskCard,
    type PersonalTask,
} from "@/components/dashboard/MyTaskCard";
import type { Request } from "@/types/requests";
import apiFetch from "@/lib/apiFetch";
import { getBackendURL } from "@/lib/getEnvVars";

const filterOptions = ["All tasks", "In progress", "Waiting", "New"];

function toPersonalTask(request: Request): PersonalTask {
    const assignment = request.assignments?.[0];

    return {
        id: request.reference,
        title: request.title,
        client: request.client_name,
        email: request.client_email,
        status:
            request.status === "in_progress"
                ? "In progress"
                : request.status === "waiting"
                  ? "Waiting"
                  : "New",
        due: assignment?.personal_deadline?.slice(0, 10) ?? "",
        detail: request.description,
        notes: [],
    };
}

export default function MyTasksPage() {
    const [tasks, setTasks] = useState<PersonalTask[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState("All tasks");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 3;

    useEffect(() => {
        const getTasks = async () => {
            try {
                const response = await apiFetch(
                    `${getBackendURL()}/users/me/requests`,
                );
                if (!response.ok) {
                    throw new Error("Unable to load your tasks.");
                }
                const data = (await response.json()) as Request[];
                setTasks(data.map(toPersonalTask));
            } catch (requestError) {
                setError(
                    requestError instanceof Error
                        ? requestError.message
                        : "Unable to load your tasks.",
                );
            } finally {
                setLoading(false);
            }
        };

        getTasks();
    }, []);

    const filteredTasks = tasks.filter((task) =>
        (activeFilter === "All tasks" || task.status === activeFilter) &&
        [task.id, task.title, task.client, task.email, task.detail]
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
        <main
            className="min-h-full bg-slate-950 text-white"
            aria-live="polite"
            aria-busy={loading}
        >
            <div className="mx-auto max-w-[1480px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
                <div className="relative isolate overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 px-6 py-7 sm:px-8">
                    <div className="absolute -right-24 -top-32 -z-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
                    <div className="absolute -bottom-40 left-1/3 -z-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
                            Monday, July 27, 2026
                        </p>
                        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                            Your work, in focus
                        </h1>
                        <p className="mt-2 max-w-xl text-sm text-slate-400">
                            A private queue for the requests you own and the next
                            action each one needs.
                        </p>
                    </div>
                    <div className="mt-7 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
                        <SummaryMetric label="Open tasks" value={tasks.length} icon={<CheckCircle size={17} />} />
                        <SummaryMetric label="In progress" value={tasks.filter((task) => task.status === "In progress").length} icon={<Clock size={17} />} />
                        <SummaryMetric label="With deadlines" value={tasks.filter((task) => task.due.length > 0).length} icon={<Calendar size={17} />} />
                        <SummaryMetric label="Private notes" value={tasks.reduce((total, task) => total + task.notes.length, 0)} icon={<NotePencil size={17} />} />
                    </div>
                </div>
                <div className="mt-8">
                    <section>
                        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
                            <div>
                                <div className="flex items-center gap-3">
                                    <h2 className="text-xl font-semibold">Focus queue</h2>
                                    <span className="rounded-full bg-white/[0.08] px-2 py-0.5 text-xs text-slate-400">{filteredTasks.length}</span>
                                </div>
                                <p className="mt-1 text-sm text-slate-500">
                                    Sort by status to see what needs attention next.
                                </p>
                            </div>
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-slate-500">
                                    <MagnifyingGlass size={16} />
                                    <input
                                        value={search}
                                        onChange={(event) => {
                                            setSearch(event.target.value);
                                            setCurrentPage(1);
                                        }}
                                        placeholder="Search tasks"
                                        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600 sm:w-44"
                                    />
                                </div>
                                <div className="flex rounded-lg border border-white/10 bg-white/[0.04] p-1">
                                    {filterOptions.map((filter) => (
                                        <button
                                            key={filter}
                                            onClick={() => {
                                                setActiveFilter(filter);
                                                setCurrentPage(1);
                                            }}
                                            className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${activeFilter === filter ? "bg-cyan-300 text-slate-950" : "text-slate-500 hover:text-white"}`}
                                        >
                                            {filter === "All tasks" ? "All" : filter}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 space-y-4">
                            {loading && <TaskListSkeleton />}
                            {!loading && error && (
                                <div className="rounded-xl border border-rose-300/20 bg-rose-300/[0.05] px-5 py-10 text-center text-sm text-rose-200">
                                    {error}
                                </div>
                            )}
                            {!loading && !error && visibleTasks.map((task) => (
                                <MyTaskCard key={task.id} task={task} />
                            ))}
                            {!loading && !error && visibleTasks.length === 0 && (
                                <div className="rounded-xl border border-dashed border-white/10 py-14 text-center text-sm text-slate-500">
                                    {tasks.length === 0
                                        ? "No tasks have been assigned to you yet."
                                        : "No tasks match your search."}
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

function SummaryMetric({
    label,
    value,
    icon,
}: {
    label: string;
    value: number;
    icon: ReactNode;
}) {
    return (
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-3">
            <div className="flex items-center gap-2 text-cyan-300">{icon}<span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">{label}</span></div>
            <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
        </div>
    );
}

function TaskListSkeleton() {
    return (
        <div className="space-y-4" aria-label="Loading tasks">
            {["one", "two"].map((item) => (
                <div
                    key={item}
                    className="h-64 animate-pulse rounded-xl border border-white/10 bg-white/[0.035] p-5"
                >
                    <div className="h-3 w-32 rounded-full bg-white/10" />
                    <div className="mt-5 h-5 w-2/3 rounded-full bg-white/10" />
                    <div className="mt-3 h-3 w-1/2 rounded-full bg-white/[0.06]" />
                    <div className="mt-12 border-t border-white/[0.07] pt-5">
                        <div className="h-3 w-28 rounded-full bg-white/10" />
                    </div>
                </div>
            ))}
        </div>
    );
}
