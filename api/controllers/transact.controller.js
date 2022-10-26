import * as model from '../models/transact.model';
import { badRequest, send } from '../utils/api-response.js';
import { roles } from '../utils/constants.js';

export async function registerOrder(req, res) {
    const { userType, productID, manufacturerID, retailerID, quantity } = req.body;

    if (!productID || !manufacturerID || !retailerID || !quantity)
        return badRequest(res);

    const modelRes = await model.registerOrder(userType, { productID, manufacturerID, retailerID, quantity });
    return send(res, modelRes);
}

export async function approveOrder(req, res) {
    const { userType, userID, batchID } = req.body;

    if (!batchID)
        return badRequest(res);

    const modelRes = await model.approveOrder(userType, { userID, batchID });
    return send(res, modelRes);
}

export async function inviteDeliverer(req, res) {
    const { userType, userID, batchID, delivererID } = req.body;

    if (!batchID || !delivererID)
        return badRequest(res);

    const modelRes = await model.inviteDeliverer(userType, { userID, batchID, delivererID });
    return send(res, modelRes);
}

export async function replyInvitation(req, res) {
    const { userType, userID,  batchID, action } = req.body;

    if (!batchID || !action)
        return badRequest(res);

    const modelRes = await model.replyInvitation(userType, { userID, batchID, action });
    return send(res, modelRes);
}

export async function transferToDeliverer(req, res) {
    const { userType, userID, batchID } = req.body;

    if (!batchID)
        return badRequest(res);

    const modelRes = await model.transferToDeliverer(userType, { userID, batchID });
    return send(res, modelRes);
}

export async function confirmTransfer(req, res) {
    const { userType, userID, batchID } = req.body;

    if (!batchID)
        return badRequest(res);

    const modelRes = await model.confirmTransfer(userType, { userID, batchID });
    return send(res, modelRes);
}

export async function transferToRetailer(req, res) {
    const { userType, userID, batchID } = req.body;

    if (!batchID)
        return badRequest(res);

    const modelRes = await model.transferToRetailer(userType, { userID, batchID });
    return send(res, modelRes);
}

export async function receiveProduct(req, res) {
    const { userType, userID, batchID } = req.body;

    if (!batchID)
        return badRequest(res);

    const modelRes = await model.receiveProduct(userType, { userID, batchID });
    return send(res, modelRes);
}