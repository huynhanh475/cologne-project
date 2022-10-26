import * as model from '../models/transact.model.js';
import { badRequest, send } from '../utils/api-response.js';

export async function registerOrder(req, res) {
    const { loggedUserType, loggedUserID, productID, manufacturerID, quantity } = req.body;

    if (!productID || !manufacturerID || !quantity)
        return badRequest(res);

    if(loggedUserType=='retailer'){
        const modelRes = await model.registerOrder(loggedUserType, { productID, manufacturerID, loggedUserID, quantity });
        return send(res, modelRes);
    }
    return badRequest(res);
}

export async function approveOrder(req, res) {
    const { loggedUserType, loggedUserID, batchID } = req.body;

    if (!batchID)
        return badRequest(res);

    if(loggedUserType==='manufacturer'){
        const modelRes = await model.approveOrder(loggedUserType, { loggedUserID, batchID });
        return send(res, modelRes);
    }
    return badRequest(res);
}

export async function inviteDeliverer(req, res) {
    const { loggedUserType, loggedUserID, batchID, delivererID } = req.body;

    if (!batchID || !delivererID)
        return badRequest(res);

    if(loggedUserType==='manufacturer'){
        const modelRes = await model.inviteDeliverer(loggedUserType, { loggedUserID, batchID, delivererID });
        return send(res, modelRes);
    }
    return badRequest(res);
}

export async function replyInvitation(req, res) {
    const { loggedUserType, loggedUserID,  batchID, action } = req.body;

    if (!batchID || !action)
        return badRequest(res);

    if(loggedUserType==='deliverer'){
        const modelRes = await model.replyInvitation(loggedUserType, { loggedUserID, batchID, action });
        return send(res, modelRes);
    }
    return badRequest(res);
}

export async function transferToDeliverer(req, res) {
    const { loggedUserType, loggedUserID, batchID } = req.body;

    if (!batchID)
        return badRequest(res);

    if(loggedUserType==='manufacturer'){
        const modelRes = await model.transferToDeliverer(loggedUserType, { loggedUserID, batchID });
        return send(res, modelRes);
    }
    return badRequest(res);
}

export async function confirmTransfer(req, res) {
    const { loggedUserType, loggedUserID, batchID } = req.body;

    if (!batchID)
        return badRequest(res);

    if(loggedUserType==='deliverer'){
        const modelRes = await model.confirmTransfer(loggedUserType, { loggedUserID, batchID });
        return send(res, modelRes);
    }
    return badRequest(res);
}

export async function transferToRetailer(req, res) {
    const { loggedUserType, loggedUserID, batchID } = req.body;

    if (!batchID)
        return badRequest(res);

    if(loggedUserType==='deliverer'){
        const modelRes = await model.transferToRetailer(loggedUserType, { loggedUserID, batchID });
        return send(res, modelRes);
    }
    return badRequest(res);
}

export async function receiveProduct(req, res) {
    const { loggedUserType, loggedUserID, batchID } = req.body;

    if (!batchID)
        return badRequest(res);

    if(loggedUserType==='retailer'){
        const modelRes = await model.receiveProduct(loggedUserType, { loggedUserID, batchID });
        return send(res, modelRes);
    }
    return badRequest(res);
}