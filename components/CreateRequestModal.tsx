"use client";

import { X } from "@phosphor-icons/react";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { getBackendURL } from "@/lib/getEnvVars";

const REQUEST_COOLDOWN_MS = 3000;

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
    const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const open = isOpen ?? internalOpen;
    const isCoolingDown = cooldownUntil !== null;
    const isBusy = isSubmitting || isCoolingDown;

    useEffect(() => {
        if (cooldownUntil === null) return;

        const timeout = window.setTimeout(
            () => setCooldownUntil(null),
            Math.max(0, cooldownUntil - Date.now()),
        );

        return () => window.clearTimeout(timeout);
    }, [cooldownUntil]);

    const handleClose = () => {
        if (isBusy) return;

        setInternalOpen(false);
        onClose?.();
    };

    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && !isBusy) {
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
    }, [open, isBusy, onClose]);

    if (!open || typeof document === "undefined") return null;

    const updateField = (field: keyof CreateRequestData, value: string) => {
        setForm((current) => ({ ...current, [field]: value }));
        setError("");
        setSuccess("");
    };

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isBusy) return;

        setError("");
        setSuccess("");
        setIsSubmitting(true);
        let requestSucceeded = false;

        try {
            const res = await fetch(`${getBackendURL()}/requests`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });
            if (!res.ok) {
                const data = await res.json().catch(() => null);
                throw new Error(data?.error ?? "Failed to create request.");
            }

            await res.json();
            await onSubmit?.(form);
            setForm(initialForm);
            requestSucceeded = true;
        } catch (requestError) {
            setError(
                requestError instanceof Error
                    ? requestError.message
                    : "Unable to submit your request. Please try again.",
            );
        } finally {
            setIsSubmitting(false);
            setCooldownUntil(Date.now() + REQUEST_COOLDOWN_MS);
            await new Promise<void>((resolve) =>
                window.setTimeout(resolve, REQUEST_COOLDOWN_MS),
            );
            if (requestSucceeded) {
                setSuccess(
                    "Your request has been submitted successfully. We will be in touch soon.",
                );
            }
        }
    };

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/75 p-4 backdrop-blur-sm sm:p-6"
            role="presentation"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget && !isBusy)
                    handleClose();
            }}
        >
            <section
                className="my-auto grid w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-slate-900 text-white shadow-2xl shadow-black/40 lg:grid-cols-[1.15fr_0.85fr]"
                role="dialog"
                aria-modal="true"
                aria-labelledby="create-request-title"
                aria-busy={isBusy}
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
                            disabled={isBusy}
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
                                disabled={isBusy}
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
                                disabled={isBusy}
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
                                    disabled={isBusy}
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
                                    disabled={isBusy}
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
                                disabled={isBusy}
                                className="rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isBusy}
                                className="rounded-lg bg-cyan-300 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isBusy ? (
                                    <span className="inline-flex items-center gap-2">
                                        <span
                                            className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950"
                                            aria-hidden="true"
                                        />
                                        {isSubmitting
                                            ? "Submitting..."
                                            : "Please wait..."}
                                    </span>
                                ) : (
                                    "Submit request"
                                )}
                            </button>
                        </div>

                        {error && (
                            <p
                                className="rounded-lg border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200"
                                role="alert"
                            >
                                {error}
                            </p>
                        )}
                        {success && (
                            <p
                                className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200"
                                role="status"
                            >
                                {success}
                            </p>
                        )}
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
