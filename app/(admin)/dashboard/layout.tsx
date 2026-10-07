import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { getSessionUser } from "@/lib/server/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    if (!await getSessionUser()) redirect("/login");
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
