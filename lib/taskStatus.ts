export const TASK_STATUS_VALUES = ["new", "in_progress", "waiting"] as const;

export type TaskStatus = (typeof TASK_STATUS_VALUES)[number];

export const TASK_STATUS_OPTIONS: ReadonlyArray<{
    value: TaskStatus;
    label: string;
}> = [
    { value: "new", label: "New" },
    { value: "in_progress", label: "In progress" },
    { value: "waiting", label: "Waiting" },
];

export function isTaskStatus(value: unknown): value is TaskStatus {
    return (
        typeof value === "string" &&
        (TASK_STATUS_VALUES as readonly string[]).includes(value)
    );
}

export function toTaskStatus(value: string): TaskStatus {
    return isTaskStatus(value) ? value : "new";
}

export function taskStatusLabel(value: TaskStatus): string {
    return (
        TASK_STATUS_OPTIONS.find((option) => option.value === value)?.label ??
        "New"
    );
}
