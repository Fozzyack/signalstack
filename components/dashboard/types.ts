export type Request = {
    id: string;
    title: string;
    client: string;
    email: string;
    description: string;
    age: string;
    assignees: string[];
    status: string;
};

export type Expert = {
    initials: string;
    name: string;
    role: string;
    count: number;
    color: string;
};

export type RequestAssignment = {
    id: string;
    request_id: string;
    user_id: string;
    user_name: string;
    role: string;
    assigned_at: string;
    unassigned_at?: string;
    personal_deadline?: string;
    completed_at?: string;
};
