export type Request = {
    id: string;
    reference: string;
    title: string;
    description: string;
    client_name: string;
    client_email: string;
    status: string;
    created_at: string;
    updated_at: string;
    resolved_at?: string;
    assignments: RequestAssignment[];
};

export type RequestAssignment = {
    id: string;
    request_id: string;
    user_id: string;
    role: "lead" | "contributor";
    assigned_at: string;
    unassigned_at?: string;
    personal_deadline?: string;
    completed_at?: string;
};
