import * as model from '../models/transact.model';
import { badRequest, send } from '../utils/api-response.js';
import { roles } from '../utils/constants.js';

export async function registerOrder(req, res) {
    const { productID, manufacturerID, retailerID, quantity } = req.body;
    const { role } = req.params;

    if (!productID || !manufacturerID || !retailerID || !quantity || !role)
        return badRequest(res);

    const isManufacturer = role === roles.manufacturer;
    const isDeliverer = role === roles.deliverer;
    const isRetailer = role === roles.retailer;

    if (!isManufacturer && !isDeliverer && !isRetailer)
        return badRequest(res);

    const modelRes = await model.registerOrder(isManufacturer, isDeliverer, isRetailer, { productID, manufacturerID, retailerID, quantity });
    return send(res, modelRes);
}

export async function approveOrder(req, res) {
    const { batchID } = req.body;
    const { role } = req.params;

    if (!batchID || !role)
        return badRequest(res);

    const isManufacturer = role === roles.manufacturer;
    const isDeliverer = role === roles.deliverer;
    const isRetailer = role === roles.retailer;

    if (!isManufacturer && !isDeliverer && !isRetailer)
        return badRequest(res);

    const modelRes = await model.approveOrder(isManufacturer, isDeliverer, isRetailer, { batchID });
    return send(res, modelRes);
}

export async function inviteDeliverer(req, res) {
    const { batchID, delivererID } = req.body;
    const { role } = req.params;

    if (!batchID || !delivererID || !role)
        return badRequest(res);

    const isManufacturer = role === roles.manufacturer;
    const isDeliverer = role === roles.deliverer;
    const isRetailer = role === roles.retailer;

    if (!isManufacturer && !isDeliverer && !isRetailer)
        return badRequest(res);

    const modelRes = await model.inviteDeliverer(isManufacturer, isDeliverer, isRetailer, { batchID, delivererID });
    return send(res, modelRes);
}

export async function replyInvitation(req, res) {
    const { batchID, action } = req.body;
    const { role } = req.params;

    if (!batchID || !action || !role)
        return badRequest(res);

    const isManufacturer = role === roles.manufacturer;
    const isDeliverer = role === roles.deliverer;
    const isRetailer = role === roles.retailer;

    if (!isManufacturer && !isDeliverer && !isRetailer)
        return badRequest(res);

    const modelRes = await model.replyInvitation(isManufacturer, isDeliverer, isRetailer, { batchID, action });
    return send(res, modelRes);
}

export async function transferToDeliverer(req, res) {
    const { batchID } = req.body;
    const { role } = req.params;

    if (!batchID || !role)
        return badRequest(res);

    const isManufacturer = role === roles.manufacturer;
    const isDeliverer = role === roles.deliverer;
    const isRetailer = role === roles.retailer;

    if (!isManufacturer && !isDeliverer && !isRetailer)
        return badRequest(res);

    const modelRes = await model.transferToDeliverer(isManufacturer, isDeliverer, isRetailer, { batchID });
    return send(res, modelRes);
}

export async function confirmTransfer(req, res) {
    const { batchID } = req.body;
    const { role } = req.params;

    if (!batchID || !role)
        return badRequest(res);

    const isManufacturer = role === roles.manufacturer;
    const isDeliverer = role === roles.deliverer;
    const isRetailer = role === roles.retailer;

    if (!isManufacturer && !isDeliverer && !isRetailer)
        return badRequest(res);

    const modelRes = await model.confirmTransfer(isManufacturer, isDeliverer, isRetailer, { batchID });
    return send(res, modelRes);
}

export async function transferToRetailer(req, res) {
    const { batchID } = req.body;
    const { role } = req.params;

    if (!batchID || !role)
        return badRequest(res);

    const isManufacturer = role === roles.manufacturer;
    const isDeliverer = role === roles.deliverer;
    const isRetailer = role === roles.retailer;

    if (!isManufacturer && !isDeliverer && !isRetailer)
        return badRequest(res);

    const modelRes = await model.transferToRetailer(isManufacturer, isDeliverer, isRetailer, { batchID });
    return send(res, modelRes);
}

export async function receiveProduct(req, res) {
    const { batchID } = req.body;
    const { role } = req.params;

    if (!batchID || !role)
        return badRequest(res);

    const isManufacturer = role === roles.manufacturer;
    const isDeliverer = role === roles.deliverer;
    const isRetailer = role === roles.retailer;

    if (!isManufacturer && !isDeliverer && !isRetailer)
        return badRequest(res);

    const modelRes = await model.receiveProduct(isManufacturer, isDeliverer, isRetailer, { batchID });
    return send(res, modelRes);
}