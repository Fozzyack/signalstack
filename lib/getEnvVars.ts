


const getTokenName = () => {
    const tokenName = process.env.NEXT_PUBLIC_TOKEN_NAME;
    if (!tokenName) {
        throw new Error("NEXT_PUBLIC_TOKEN_NAME is not set");
    }
    return tokenName;
};

const getBackendURL = () => {
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendURL) {
        throw new Error("NEXT_PUBLIC_BACKEND_URL is not set");
    }
    return backendURL;
};

export {
    getTokenName,
    getBackendURL,
}
