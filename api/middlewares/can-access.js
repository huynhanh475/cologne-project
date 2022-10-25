import { forbidden, unauthorized } from '../utils/api-response.js';

export default function canAccess (allowedRoles) {
    return (req,res,next) => {
        const {loggedUserType, loggedUserRole} = req.body;

        if (!loggedUserType || !loggedUserRole) {
            return unauthorized(res, 'Unauthorised user');
        }

        for (let i=0; i < allowedRoles.length; i++) {
            let allowedRole = allowedRoles[i];
            if (allowedRole === loggedUserType || allowedRole === loggedUserRole) {
                return next();
            }
        }

        return forbidden(res, "User type or role forbidden");
    }
}