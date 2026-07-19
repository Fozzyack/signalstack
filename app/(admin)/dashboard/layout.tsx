"use client";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import apiFetch from "@/lib/apiFetch";
import { getBackendURL } from "@/lib/getEnvVars";
import { useEffect } from "react";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    useEffect(() => {
        const checkAuth = async () => {
            await apiFetch(`${getBackendURL()}/auth/check`);
        };
        checkAuth();
    }, []);
    return (
        <div className="flex h-screen overflow-hidden bg-slate-950 text-white">
            <DashboardSidebar />
            <section className="min-h-0 min-w-0 flex-1 overflow-y-auto">
                <DashboardHeader />
                {children}
            </section>
        </div>
    );
}
