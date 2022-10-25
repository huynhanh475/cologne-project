import * as model from '../models/user.model.js';
import { badRequest, send } from '../utils/api-response.js';
import { roles } from '../utils/constants.js';

export async function createUser(req, res) {
    const {loggedUserType, loggedUserId, userType, address, name, email, password } = req.body;
    const { role } = req.params;

    console.log(req.body);
    console.log(role);

    if ((!loggedUserType || !loggedUserId || !userType || !address || !name  || !email || !password )) {
        console.log('1');
        return badRequest(res);
    }

    const isManufacturer = role === roles.manufacturer;
    const isDeliverer = role === roles.deliverer;
    const isRetailer = role === roles.retailer;

    if (!isManufacturer && !isDeliverer && !isRetailer) {
        return badRequest(res);
    }

    let modelRes = await model.createUser(loggedUserType, {  loggedUserId, userType, address, name, email, password });
    
    return send(res, modelRes);
}

export async function signIn(req, res) {
    const { id, password, userType } = req.body;
    console.log(req.body);
    if (!id || !password || !userType) {
        return badRequest(res);
    }

    let modelRes = await model.signIn({userType, id, password });

    return send(res, modelRes);
}


export async function getAllUser(req, res) {
    const { loggedUserType, loggedUserId } = req.body;

    let modelRes = await model.getAllUser(loggedUserType, {loggedUserId});

    return send(res, modelRes);
}