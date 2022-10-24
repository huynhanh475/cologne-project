import { forbidden, unauthorized } from '../utils/api-response.js';

export default function canAccess (roles) {
    return (req,res,next) => {
        const {loggedUserType} = req.body;

        if (!loggedUserType) {
            return unauthorized(res, 'Unauthorised user');
        }

        if (roles.includes(loggedUserType)) {
            return next();
        }
        return forbidden(res, "User type forbidden");
    }
}