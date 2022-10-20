import json from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export function generateAccessToken(information) {
    return json.sign(information, secret, { expiresIn: '7d' });
}

export function generateRefreshToken(information) {
    const { id, hashedPw } = information;
    return json.sign({ id }, secret + hashedPw, { expiresIn: '7d' });
}

export function certifyAccessToken(token) {
    return new Promise((resolve, reject) => {
        json.verify(token, secret, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
}

export function certifyRefreshToken(token, hashedPw) {
    return new Promise((resolve, reject) => {
        json.verify(token, secret + hashedPw, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
}

export function decodedRefreshToken(token) {
    return new Promise((resolve, reject) => {
        try {
            const decoded = json.decode(token);
            resolve(decoded);
        } catch (err) {
            reject(err);
        }
    });
}

// TODO: Add hash password