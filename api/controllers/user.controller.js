import * as model from '../models/user.model.js';
import { badRequest, createModelRes, send } from '../utils/api-response.js';
import { roles, userTypes } from '../utils/constants.js';

export async function createUser(req, res) {
    const {loggedUserType, loggedUserId, address, name, email, password } = req.body;

    if ((!loggedUserType || !loggedUserId || !address || !name  || !email || !password )) {
        return badRequest(res);
    }

    const modelRes = await model.createUser(loggedUserType, {  loggedUserId, address, name, email, password });

    return send(res, modelRes);
}

export async function signIn(req, res) {
    const { id, password, userType } = req.body;

    if (!id || !password || !userType) {
        return badRequest(res);
    }

    const modelRes = await model.signIn(userType, {userType, id, password });

    return send(res, modelRes);
}


export async function getAllUser(req, res) {
    const { loggedUserType, loggedUserId } = req.body;

    const modelRes = await model.getAllUser(loggedUserType, {loggedUserId, userType : loggedUserType});

    return send(res, modelRes);
}

export async function getDeliverer(req, res) {
    const { loggedUserType, loggedUserId } = req.body;

    const modelRes = await model.getAllUser(loggedUserType, {loggedUserId, userType : userTypes.deliverer});

    return send(res, modelRes);
}