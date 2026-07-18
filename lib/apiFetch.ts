import { getTokenName } from "./getEnvVars";

const apiFetch = async (url: string, options: RequestInit) => {

    const headers = new Headers;
    headers.set("Authorization", `Bearer ${localStorage.getItem(getTokenName())}`);

    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        localStorage.removeItem(getTokenName());
        window.location.href = "/login";
    }

    return response;
};

export default apiFetch;
