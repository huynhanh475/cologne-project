export function createModelRes(status, message, data = {}) {
    return { status, message, data };
}

export function send(res, modelRes) {
    return res.status(modelRes.status).json({
        message: modelRes.message,
        data: modelRes.data,
    });
}

export function badRequest(res) {
    return res.status(400).json({
        message: 'This is not valid request',
        data: {},
    });
}

export function unauthorized(res, msg) {
    return res.status(401).json({
        message: msg,
        data: {},
    });
}

export function forbidden(res, msg) {
    return res.status(403).json({
        message: msg,
        data: {},
    });
}

export function notFound(res) {
    return res.status(404).json({
        message: 'API not found',
        data: {},
    });
}
