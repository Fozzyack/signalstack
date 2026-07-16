import type { Expert, Request } from "./types";

export const requests: Request[] = [
    {
        id: "SS-1048",
        title: "VPN access dropping every 20 minutes",
        client: "Northstar Logistics",
        email: "maya.chen@northstar.io",
        description:
            "Remote warehouse team is losing access to internal tools during shifts.",
        age: "18 min ago",
        assignees: ["MC"],
        status: "New",
    },
    {
        id: "SS-1047",
        title: "New starter account and laptop setup",
        client: "Arc & Field Studio",
        email: "oliver@arcandfield.co",
        description:
            "Three designers joining Monday need accounts, devices, and shared drive access.",
        age: "46 min ago",
        assignees: [],
        status: "New",
    },
    {
        id: "SS-1045",
        title: "Review permissions for finance shared drive",
        client: "Verity & Co",
        email: "sarah@verityandco.com",
        description:
            "Quarterly access review requested before the external audit begins.",
        age: "2 hr ago",
        assignees: ["JD", "RK"],
        status: "In progress",
    },
    {
        id: "SS-1043",
        title: "Move production database to managed cloud",
        client: "Kiteworks",
        email: "devops@kiteworks.dev",
        description:
            "Looking for a migration plan and someone to own the first phase.",
        age: "Yesterday",
        assignees: ["AL"],
        status: "Waiting",
    },
];

export const experts: Expert[] = [
    {
        initials: "MC",
        name: "Maya Chen",
        role: "Networking · Security",
        count: 4,
        color: "bg-cyan-300 text-slate-950",
    },
    {
        initials: "JD",
        name: "James Doyle",
        role: "Cloud · Infrastructure",
        count: 3,
        color: "bg-violet-300 text-slate-950",
    },
    {
        initials: "RK",
        name: "Rina Kapoor",
        role: "Microsoft 365 · Accounts",
        count: 6,
        color: "bg-amber-200 text-slate-950",
    },
    {
        initials: "AL",
        name: "Alex Lee",
        role: "Hardware · Support",
        count: 2,
        color: "bg-rose-200 text-slate-950",
    },
];
