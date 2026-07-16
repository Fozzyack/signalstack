import { Clock } from "@phosphor-icons/react";

const activity = [
    {
        text: "Rina assigned herself",
        sub: "SS-1045 · 12 min ago",
        color: "bg-amber-200",
    },
    {
        text: "James changed status to In progress",
        sub: "SS-1045 · 28 min ago",
        color: "bg-violet-300",
    },
    {
        text: "New request received",
        sub: "SS-1048 · 42 min ago",
        color: "bg-cyan-300",
    },
    {
        text: "Alex added an internal note",
        sub: "SS-1043 · 1 hr ago",
        color: "bg-rose-200",
    },
];

export function ActivityFeed() {
    return (
        <section id="activity">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold">Recent activity</h2>
                    <p className="mt-1 text-sm text-slate-500">
                        A live audit trail.
                    </p>
                </div>
                <Clock size={18} className="text-slate-500" />
            </div>
            <div className="mt-5 space-y-5 border-l border-white/10 pl-5">
                {activity.map((item) => (
                    <div key={item.text} className="relative">
                        <span
                            className={`absolute -left-[25px] top-1 h-2.5 w-2.5 rounded-full border-2 border-slate-950 ${item.color}`}
                        />
                        <p className="text-xs leading-5 text-slate-300">
                            {item.text}
                        </p>
                        <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-slate-600">
                            {item.sub}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
