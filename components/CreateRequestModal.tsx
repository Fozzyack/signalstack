"use client";

import { X } from "@phosphor-icons/react";
import { createPortal } from "react-dom";
import { FormEvent, useEffect, useState } from "react";

export type CreateRequestData = {
    title: string;
    description: string;
    clientName: string;
    clientEmail: string;
};

type CreateRequestModalProps = {
    isOpen?: boolean;
    onClose?: () => void;
    onSubmit?: (data: CreateRequestData) => void | Promise<void>;
};

const initialForm: CreateRequestData = {
    title: "",
    description: "",
    clientName: "",
    clientEmail: "",
};

const CreateRequestModal = ({
    isOpen,
    onClose,
    onSubmit,
}: CreateRequestModalProps) => {
    const [internalOpen, setInternalOpen] = useState(true);
    const [form, setForm] = useState(initialForm);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const open = isOpen ?? internalOpen;

    const handleClose = () => {
        setInternalOpen(false);
        onClose?.();
    };

    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && !isSubmitting) {
                setInternalOpen(false);
                onClose?.();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [open, isSubmitting, onClose]);

    if (!open || typeof document === "undefined") return null;

    const updateField = (field: keyof CreateRequestData, value: string) =>
        setForm((current) => ({ ...current, [field]: value }));

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            await onSubmit?.(form);
            setForm(initialForm);
            handleClose();
        } finally {
            setIsSubmitting(false);
        }
    };

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/75 p-4 backdrop-blur-sm sm:p-6"
            role="presentation"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget && !isSubmitting)
                    handleClose();
            }}
        >
            <section
                className="my-auto grid w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-slate-900 text-white shadow-2xl shadow-black/40 lg:grid-cols-[1.15fr_0.85fr]"
                role="dialog"
                aria-modal="true"
                aria-labelledby="create-request-title"
            >
                <div>
                    <div className="flex items-start justify-between border-white/10 px-5 py-5 sm:px-7">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
                                New request
                            </p>
                            <h2
                                id="create-request-title"
                                className="mt-2 text-2xl font-semibold tracking-tight"
                            >
                                Tell us what needs attention
                            </h2>
                            <p className="mt-1 text-sm text-slate-400">
                                Include enough detail for an expert to get
                                started.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={isSubmitting}
                            aria-label="Close request form"
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5 px-5 py-6 sm:px-7"
                    >
                        <div>
                            <label
                                htmlFor="request-title"
                                className="mb-2 block text-sm font-medium text-slate-200"
                            >
                                Request title
                            </label>
                            <input
                                id="request-title"
                                name="title"
                                value={form.title}
                                onChange={(event) =>
                                    updateField("title", event.target.value)
                                }
                                placeholder="e.g. Cannot access the shared drive"
                                required
                                className="w-full rounded-lg border border-white/10 bg-slate-950/70 px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/20"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="request-description"
                                className="mb-2 block text-sm font-medium text-slate-200"
                            >
                                Description
                            </label>
                            <textarea
                                id="request-description"
                                name="description"
                                value={form.description}
                                onChange={(event) =>
                                    updateField(
                                        "description",
                                        event.target.value,
                                    )
                                }
                                placeholder="What is happening, when did it start, and what have you tried?"
                                required
                                rows={5}
                                className="w-full rounded-lg border border-white/10 bg-slate-950/70 px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/20 resize-y"
                            />
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="client-name"
                                    className="mb-2 block text-sm font-medium text-slate-200"
                                >
                                    Your name
                                </label>
                                <input
                                    id="client-name"
                                    name="clientName"
                                    value={form.clientName}
                                    onChange={(event) =>
                                        updateField(
                                            "clientName",
                                            event.target.value,
                                        )
                                    }
                                    placeholder="Alex Morgan"
                                    required
                                    className="w-full rounded-lg border border-white/10 bg-slate-950/70 px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/20"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="client-email"
                                    className="mb-2 block text-sm font-medium text-slate-200"
                                >
                                    Email address
                                </label>
                                <input
                                    id="client-email"
                                    name="clientEmail"
                                    type="email"
                                    value={form.clientEmail}
                                    onChange={(event) =>
                                        updateField(
                                            "clientEmail",
                                            event.target.value,
                                        )
                                    }
                                    placeholder="alex@company.com"
                                    required
                                    className="w-full rounded-lg border border-white/10 bg-slate-950/70 px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/20"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col-reverse gap-3 pt-5 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={handleClose}
                                disabled={isSubmitting}
                                className="rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="rounded-lg bg-cyan-300 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isSubmitting
                                    ? "Submitting..."
                                    : "Submit request"}
                            </button>
                        </div>
                    </form>
                </div>

                <aside className="relative flex min-h-64 flex-col justify-between overflow-hidden border-t border-white/10 bg-slate-800 p-6 text-white sm:p-8 lg:border-l lg:border-t-0">
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[32px] border-cyan-300/10" />
                    <div className="relative">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
                            SignalStack
                        </p>
                        <p className="mt-12 max-w-xs text-5xl font-semibold uppercase leading-[0.9] tracking-tight text-white sm:text-6xl">
                            Contact us
                        </p>
                    </div>
                    <div className="relative mt-10 border-t border-white/10 pt-4">
                        <p className="max-w-xs text-sm leading-6 text-slate-300">
                            Tell us what is blocking your team. We will connect
                            you with the right technical expertise.
                        </p>
                    </div>
                </aside>
            </section>
        </div>,
        document.body,
    );
};

export default CreateRequestModal;
