"use client";

import { useEffect, useState } from "react";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { experts } from "@/components/dashboard/data";
import { RequestQueue } from "@/components/dashboard/RequestQueue";
import { TeamWorkload } from "@/components/dashboard/TeamWorkload";
import type { RequestAssignment } from "@/components/dashboard/types";
import { getBackendURL } from "@/lib/getEnvVars";
import apiFetch from "@/lib/apiFetch";
import type { Request } from "@/types/requests";

export default function DashboardPage() {
    const [requests, setRequests] = useState<Request[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<string>("");
    const [activeFilter, setActiveFilter] = useState("All requests");
    const [claimed, setClaimed] = useState<string[]>([]);
    const [assignments, setAssignments] = useState<RequestAssignment[]>([]);

    useEffect(() => {
        const getDashboardData = async () => {
            const [requestsResponse, userResponse, assignmentsResponse] =
                await Promise.all([
                    apiFetch(`${getBackendURL()}/requests`),
                    apiFetch(`${getBackendURL()}/users/me`),
                    apiFetch(`${getBackendURL()}/request-assignments`),
                ]);
            const [requestsData, userData, assignmentsData] = await Promise.all([
                requestsResponse.json(),
                userResponse.json(),
                assignmentsResponse.json(),
            ]);
            setRequests(requestsData);
            setUser(userData.name.split(" ")[0]);
            setAssignments(assignmentsData);
            setLoading(false);
        };
        getDashboardData();
    }, []);

    const visibleRequests = requests.filter((request) => {
        if (activeFilter === "Unassigned")
            return (request.assignments ?? []).length === 0;
        if (activeFilter === "My tasks") return claimed.includes(request.id);
        if (activeFilter === "In progress")
            return request.status === "in_progress";
        return true;
    });

    const claimRequest = (id: string) => {
        setClaimed((current) =>
            current.includes(id) ? current : [...current, id],
        );
    };

    if (loading)
        return (
            <main
                className="min-h-full bg-slate-950 text-white"
                aria-live="polite"
                aria-busy="true"
            >
                <div className="mx-auto max-w-370 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
                    <div className="relative isolate overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 px-6 py-8 sm:px-8">
                        <div className="absolute -right-16 -top-24 -z-10 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
                        <div className="absolute -bottom-32 left-1/3 -z-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
                        <div className="relative flex items-center gap-4">
                            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10">
                                <div className="absolute inset-1 animate-spin rounded-lg border border-transparent border-t-cyan-300 border-r-cyan-300/40" />
                                <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.9)]" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
                                    Signalstack workspace
                                </p>
                                <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                                    Preparing your dashboard
                                </h1>
                                <p className="mt-2 text-sm text-slate-400">
                                    Gathering the latest requests and team
                                    activity.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {["requests", "progress", "team", "activity"].map(
                            (item) => (
                                <div
                                    key={item}
                                    className="h-32 animate-pulse rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                                >
                                    <div className="h-3 w-24 rounded-full bg-white/10" />
                                    <div className="mt-5 h-8 w-16 rounded-lg bg-white/10" />
                                    <div className="mt-3 h-2 w-32 rounded-full bg-white/[0.06]" />
                                </div>
                            ),
                        )}
                    </div>

                    <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_330px]">
                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div className="h-6 w-40 animate-pulse rounded-lg bg-white/10" />
                                <div className="h-9 w-28 animate-pulse rounded-lg bg-white/[0.06]" />
                            </div>
                            <div className="mt-6 space-y-3">
                                {["one", "two", "three", "four"].map((item) => (
                                    <div
                                        key={item}
                                        className="flex h-20 animate-pulse items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4"
                                    >
                                        <div className="h-10 w-10 rounded-full bg-white/10" />
                                        <div className="flex-1 space-y-2">
                                            <div className="h-3 w-2/5 rounded-full bg-white/10" />
                                            <div className="h-2 w-3/5 rounded-full bg-white/[0.06]" />
                                        </div>
                                        <div className="h-7 w-16 rounded-full bg-cyan-300/10" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <aside className="space-y-8">
                            <div className="h-56 animate-pulse rounded-2xl border border-white/10 bg-white/[0.03]" />
                            <div className="h-48 animate-pulse rounded-2xl border border-white/10 bg-white/[0.03]" />
                        </aside>
                    </div>
                </div>
            </main>
        );

    return (
        <main className="min-h-full bg-slate-950 text-white">
            <div className="mx-auto max-w-[1480px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
                <div className="relative isolate overflow-hidden rounded-2xl border border-white/10 px-6 py-8 sm:px-8">
                    <video
                        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-45"
                        autoPlay
                        loop
                        muted
                        playsInline
                        aria-hidden="true"
                    >
                        <source
                            src="/landingvid-optimized.mp4"
                            type="video/mp4"
                        />
                    </video>
                    <div className="absolute inset-0 -z-10 bg-slate-950/65" />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/35" />
                    <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                                {new Date().toLocaleDateString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>
                            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                                Good morning, {user}.
                            </h1>
                            <p className="mt-2 text-sm text-slate-300">
                                Here is what needs your team&apos;s attention.
                            </p>
                        </div>
                    </div>
                </div>
                <DashboardStats requests={requests} />
                <div className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_330px]">
                    <RequestQueue
                        requests={visibleRequests}
                        activeFilter={activeFilter}
                        claimed={claimed}
                        onFilterChange={setActiveFilter}
                        onClaim={claimRequest}
                    />
                    <aside className="space-y-8">
                        <TeamWorkload experts={experts} assignments={assignments} />
                        <ActivityFeed />
                    </aside>
                </div>
            </div>
        </main>
    );
}
