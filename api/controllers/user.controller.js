import * as model from '../models/user.model.js';
import { badRequest, send } from '../utils/api-response.js';
import { roles } from '../utils/constants.js';

export async function createUser(req, res) {
    const { loggedUserId, userType, address, name, email, password } = req.body;
    const { role } = req.params;

    console.log(req.body);
    console.log(role);

    if ((!loggedUserId || !userType || !address || !name  || !email || !password )) {
        console.log('1');
        return badRequest(res);
    }

    let modelRes;

    const isManufacturer = role === roles.manufacturer;
    const isDeliverer = role === roles.deliverer;
    const isRetailer = role === roles.retailer;

    if (!isManufacturer && !isDeliverer && !isRetailer) {
        return badRequest(res);
    }

    modelRes = await model.createUser(isManufacturer, isDeliverer, isRetailer, {  loggedUserId, userType, address, name, email, password });
    
    return send(res, modelRes);
}

export async function signIn(req, res) {
    const { id, password, role } = req.body;
    console.log(req.body);
    if (!id || !password || !role) {
        return badRequest(res);
    }

    let modelRes;
    if (role === roles.manufacturer) {
        modelRes = await model.signIn(true, false, false, { id, password });
    } else if (role === roles.deliverer) {
        modelRes = await model.signIn(false, true, false, { id, password });
    } else if (role === roles.retailer) {
        modelRes = await model.signIn(false, false, true, { id, password });
    } else {
        return badRequest(res);
    }

    return send(res, modelRes);
}


export async function getAllUser(req, res) {
    const { id } = req.body;
    const { role } = req.params;

    let modelRes;
    if (role === roles.manufacturer) {
        modelRes = await model.getAllUser(true, false, false, {id});
    } else if (role === roles.deliverer) {
        modelRes = await model.getAllUser(false, true, false, {id});
    } else if (role === roles.retailer) {
        modelRes = await model.getAllUser(false, false, true, {id});
    } else {
        return badRequest(res);
    }
    return send(res, modelRes);
}