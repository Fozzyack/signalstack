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
