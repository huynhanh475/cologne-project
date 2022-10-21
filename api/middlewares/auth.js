import { certifyAccessToken } from '../utils/authenticate.js';
import { unauthorized } from '../utils/api-response.js';

export default async (req, res, next) => {
    const accessToken = req.headers['x-access-token'];
    console.log(accessToken);

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
