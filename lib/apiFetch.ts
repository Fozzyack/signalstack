const apiFetch = async (url: string, options: RequestInit = {}) => {
    const headers = new Headers(options.headers);
    if (options.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");

    const response = await fetch(url, {
        ...options,
        headers,
        credentials: "same-origin",
        cache: "no-store",
    });

    if (response.status === 401) {
        window.location.href = "/login";
        throw new Error("Unauthorized");
    }

    return response;
};

export default apiFetch;
