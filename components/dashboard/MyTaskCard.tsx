"use client";

import {
    Calendar,
    Check,
    Clock,
    NotePencil,
    Plus,
} from "@phosphor-icons/react";
import { useState } from "react";

export type PersonalTask = {
    id: string;
    title: string;
    client: string;
    email: string;
    status: "In progress" | "Waiting" | "New";
    due: string;
    detail: string;
    notes: string[];
};

export function MyTaskCard({ task }: { task: PersonalTask }) {
    const [notes, setNotes] = useState(task.notes);
    const [note, setNote] = useState("");
    const [deadline, setDeadline] = useState(task.due);

    const addNote = () => {
        const trimmedNote = note.trim();
        if (!trimmedNote) return;
        setNotes((current) => [...current, trimmedNote]);
        setNote("");
    };

    return (
        <article className="rounded-xl border border-white/10 bg-white/[0.035] p-5">
            <div className="flex flex-col justify-between gap-5 sm:flex-row">
                <div>
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[11px] text-slate-600">
                            {task.id}
                        </span>
                        <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cyan-200">
                            {task.status}
                        </span>
                    </div>
                    <h2 className="mt-3 text-lg font-medium text-slate-100">
                        {task.title}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">{task.detail}</p>
                    <a
                        href={`mailto:${task.email}`}
                        className="mt-4 inline-block text-xs text-slate-400 transition hover:text-cyan-300"
                    >
                        {task.client} · {task.email}
                    </a>
                </div>
                <label className="flex shrink-0 flex-col gap-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5 uppercase tracking-[0.16em]">
                        <Calendar size={14} /> Deadline
                    </span>
                    <input
                        type="date"
                        value={deadline}
                        onChange={(event) => setDeadline(event.target.value)}
                        className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-200 outline-none focus:border-cyan-300"
                    />
                </label>
            </div>

            <div className="mt-6 grid gap-5 border-t border-white/[0.07] pt-5 lg:grid-cols-[1fr_1.15fr]">
                <div>
                    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        <Clock size={15} /> Task context
                    </p>
                    <div className="mt-3 space-y-2 text-sm text-slate-400">
                        <p>Assigned to you</p>
                        <p>Client response pending: no</p>
                        <p>Last activity: 28 min ago</p>
                    </div>
                </div>
                <div>
                    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        <NotePencil size={15} /> Personal notes
                    </p>
                    <div className="mt-3 space-y-2">
                        {notes.map((item, index) => (
                            <p
                                key={`${item}-${index}`}
                                className="rounded-lg bg-white/[0.05] px-3 py-2 text-sm leading-5 text-slate-300"
                            >
                                {item}
                            </p>
                        ))}
                    </div>
                    <div className="mt-3 flex gap-2">
                        <input
                            value={note}
                            onChange={(event) => setNote(event.target.value)}
                            onKeyDown={(event) =>
                                event.key === "Enter" && addNote()
                            }
                            placeholder="Add a private note..."
                            className="min-w-0 flex-1 rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-300"
                        />
                        <button
                            onClick={addNote}
                            className="flex items-center gap-1.5 rounded-lg bg-cyan-300 px-3 py-2 text-xs font-semibold text-slate-950 transition hover:bg-cyan-200"
                        >
                            <Plus size={15} /> Add
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4">
                <span className="text-xs text-slate-600">
                    Deadline updates save automatically
                </span>
                <button className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300 transition hover:text-emerald-200">
                    <Check size={15} /> Mark complete
                </button>
            </div>
        </article>
    );
}
