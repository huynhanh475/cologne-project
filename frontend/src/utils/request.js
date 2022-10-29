/**
 * Default request method used across the entire app.
 * Redirects to /login if 403 (forbidden) or 401 (missing credentials) codes are received.
 */
export const request = async (params) => {
    try {
        const { method = "GET", url, body, headers } = params;
        const defaultHeaders = {
            "Content-Type": "application/json",
        };
        const resp = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
            method,
            headers: headers ? headers : defaultHeaders,
            body: JSON.stringify(body),
        });

        /* Handle unauthenticated requests */
        if (resp.status === 401) {
            window.location.href = "/login";
        }

        return resp;
    } catch (err) {
        console.log("Error: --- request.js ---- ");
        console.error(err);
    }
};