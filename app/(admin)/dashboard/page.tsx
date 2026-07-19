"use client";

import { useEffect, useState } from "react";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { experts } from "@/components/dashboard/data";
import { RequestQueue } from "@/components/dashboard/RequestQueue";
import { TeamWorkload } from "@/components/dashboard/TeamWorkload";
import { getBackendURL } from "@/lib/getEnvVars";
import apiFetch from "@/lib/apiFetch";
import { Request } from "@/types/requests";

export default function DashboardPage() {
    const [requests, setRequests] = useState<Request[]>([]);
    const [activeFilter, setActiveFilter] = useState("All requests");
    const [claimed, setClaimed] = useState<string[]>([]);

    useEffect(() => {
        const getRequests = async () => {
            const response = await apiFetch(`${getBackendURL()}/requests`);
            const data = await response.json();
            setRequests(data);
        };
        getRequests();
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
                                Thursday, 16 July 2026
                            </p>
                            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                                Good morning, Maya.
                            </h1>
                            <p className="mt-2 text-sm text-slate-300">
                                Here is what needs your team&apos;s attention.
                            </p>
                        </div>
                    </div>
                </div>
                <DashboardStats />
                <div className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_330px]">
                    <RequestQueue
                        requests={visibleRequests}
                        activeFilter={activeFilter}
                        claimed={claimed}
                        onFilterChange={setActiveFilter}
                        onClaim={claimRequest}
                    />
                    <aside className="space-y-8">
                        <TeamWorkload experts={experts} />
                        <ActivityFeed />
                    </aside>
                </div>
            </div>
        </main>
    );
}
