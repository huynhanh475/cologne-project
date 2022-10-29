import * as model from '../models/transact.model.js';
import { badRequest, send } from '../utils/api-response.js';

export async function registerOrder(req, res) {
    const { loggedUserType, loggedUserId, productId, quantity } = req.body;

    if (!productId || !quantity)
        return badRequest(res);

    const modelRes = await model.registerOrder(loggedUserType, { productId, loggedUserId, quantity });
    return send(res, modelRes);
}

export async function approveOrder(req, res) {
    const { loggedUserType, loggedUserId, batchId } = req.body;
    if (!batchId)
        return badRequest(res);

    const modelRes = await model.approveOrder(loggedUserType, { loggedUserId, batchId });
    return send(res, modelRes);
}

export async function inviteDeliverer(req, res) {
    const { loggedUserType, loggedUserId, batchId, delivererId } = req.body;

    if (!batchId || !delivererId)
        return badRequest(res);

    const modelRes = await model.inviteDeliverer(loggedUserType, { loggedUserId, batchId, delivererId });
    return send(res, modelRes);
}

export async function replyInvitation(req, res) {
    const { loggedUserType, loggedUserId, batchId, action } = req.body;

    if (!batchId || !action)
        return badRequest(res);

    const modelRes = await model.replyInvitation(loggedUserType, { loggedUserId, batchId, action });
    return send(res, modelRes);
}

export async function transferToDeliverer(req, res) {
    const { loggedUserType, loggedUserId, batchId } = req.body;

    if (!batchId)
        return badRequest(res);

    const modelRes = await model.transferToDeliverer(loggedUserType, { loggedUserId, batchId });
    return send(res, modelRes);
}

export async function confirmTransfer(req, res) {
    const { loggedUserType, loggedUserId, batchId } = req.body;

    if (!batchId)
        return badRequest(res);

    const modelRes = await model.confirmTransfer(loggedUserType, { loggedUserId, batchId });
    return send(res, modelRes);
}

export async function transferToRetailer(req, res) {
    const { loggedUserType, loggedUserId, batchId } = req.body;

    if (!batchId)
        return badRequest(res);

    const modelRes = await model.transferToRetailer(loggedUserType, { loggedUserId, batchId });
    return send(res, modelRes);
}

export async function receiveProduct(req, res) {
    const { loggedUserType, loggedUserId, batchId } = req.body;

    if (!batchId)
        return badRequest(res);

    const modelRes = await model.receiveProduct(loggedUserType, { loggedUserId, batchId });
    return send(res, modelRes);
}