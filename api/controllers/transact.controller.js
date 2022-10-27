import * as model from '../models/transact.model.js';
import { badRequest, send } from '../utils/api-response.js';

export async function registerOrder(req, res) {
    const { loggedUserType, loggedUserId, productID, manufacturerID, quantity } = req.body;

    if (!productID || !manufacturerID || !quantity)
        return badRequest(res);

    const modelRes = await model.registerOrder(loggedUserType, { productID, manufacturerID, loggedUserId, quantity });
    return send(res, modelRes);
}

export async function approveOrder(req, res) {
    const { loggedUserType, loggedUserId, batchID } = req.body;
    if (!batchID)
        return badRequest(res);

    const modelRes = await model.approveOrder(loggedUserType, { loggedUserId, batchID });
    return send(res, modelRes);
}

export async function inviteDeliverer(req, res) {
    const { loggedUserType, loggedUserId, batchID, delivererID } = req.body;

    if (!batchID || !delivererID)
        return badRequest(res);

    const modelRes = await model.inviteDeliverer(loggedUserType, { loggedUserId, batchID, delivererID });
    return send(res, modelRes);
}

export async function replyInvitation(req, res) {
    const { loggedUserType, loggedUserId, batchID, action } = req.body;

    if (!batchID || !action)
        return badRequest(res);

    const modelRes = await model.replyInvitation(loggedUserType, { loggedUserId, batchID, action });
    return send(res, modelRes);
}

export async function transferToDeliverer(req, res) {
    const { loggedUserType, loggedUserId, batchID } = req.body;

    if (!batchID)
        return badRequest(res);

    const modelRes = await model.transferToDeliverer(loggedUserType, { loggedUserId, batchID });
    return send(res, modelRes);
}

export async function confirmTransfer(req, res) {
    const { loggedUserType, loggedUserId, batchID } = req.body;

    if (!batchID)
        return badRequest(res);

    const modelRes = await model.confirmTransfer(loggedUserType, { loggedUserId, batchID });
    return send(res, modelRes);
}

export async function transferToRetailer(req, res) {
    const { loggedUserType, loggedUserId, batchID } = req.body;

    if (!batchID)
        return badRequest(res);

    const modelRes = await model.transferToRetailer(loggedUserType, { loggedUserId, batchID });
    return send(res, modelRes);
}

export async function receiveProduct(req, res) {
    const { loggedUserType, loggedUserId, batchID } = req.body;

    if (!batchID)
        return badRequest(res);

    const modelRes = await model.receiveProduct(loggedUserType, { loggedUserId, batchID });
    return send(res, modelRes);
}