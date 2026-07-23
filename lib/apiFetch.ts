import { getTokenName } from "./getEnvVars";

const apiFetch = async (url: string, options: RequestInit = {}) => {
    const headers = new Headers();
    headers.set(
        "Authorization",
        `Bearer ${localStorage.getItem(getTokenName())}`,
    );
    if (options.body) headers.set("Content-Type", "application/json");

    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        localStorage.removeItem(getTokenName());
        window.location.href = "/login";
        throw new Error("Unauthorized");
    }

    return response;
};

export default apiFetch;
