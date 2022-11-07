import { certifyAccessToken } from '../utils/authenticate.js';
import { unauthorized } from '../utils/api-response.js';

export default async (req, res, next) => {

    if ( req.path == '/user/signin') return next();

    const accessToken = req.headers['x-access-token'];

    if (!accessToken) {
        return unauthorized(res, 'Require access token');
    }

    try {
        const result = await certifyAccessToken(accessToken);
        req.body.loggedUserId = result.id;
        req.body.loggedUserType = result.userType;
        req.body.loggedUserRole = result.role;
        req.body.loggedUserName = result.name;
        return next();
    } catch (err) {
        return unauthorized(res, err.toString());
    }
};
