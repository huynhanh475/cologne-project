import { certifyAccessToken } from '../utils/authenticate';
import { unauthorized } from '../utils/api-response';

export default async (req, res, next) => {
    const accessToken = req.headers['x-access-token'];

    if (!accessToken) {
        return unauthorized(res, 'Require access token');
    }

    try {
        const result = await certifyAccessToken(accessToken);
        req.body.id = result.id;
        req.body.loggedUserType = result.UserType;
        req.body.loggedUserName = result.Name;
        return next();
    } catch (err) {
        return unauthorized(res, err.toString());
    }
};
