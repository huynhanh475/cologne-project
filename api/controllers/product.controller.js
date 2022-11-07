import * as model from '../models/product.model.js';
import { unauthorized, badRequest, send } from '../utils/api-response.js';
import { userTypes } from '../utils/constants.js';

export async function createProduct(req, res) {
    const { name, price, quantity , loggedUserType, loggedUserId } = req.body;

    if (!name || !price || !quantity  || !loggedUserType || !loggedUserId) {
        return badRequest(res);
    }

    const modelRes = await model.createProduct(loggedUserType, { loggedUserId, name, price, quantity });

    return send(res, modelRes);
}

export async function getProductbyId(req, res) {
    const { loggedUserId, loggedUserType } = req.body;
    const { productId } = req.params

    if (!productId || !loggedUserId || !loggedUserType ) {
        return badRequest(res);
    }

    const modelRes = await model.getProductById(loggedUserType, { loggedUserId, productId });

    return send(res, modelRes);
}

export async function getAllProducts(req, res) {
    const { loggedUserId, loggedUserType } = req.body;

    if (!loggedUserId || !loggedUserType ) {
        return unauthorized(res);
    }

    const manufacturerId = loggedUserType === userTypes.manufacturer ? loggedUserId : "";
    const modelRes = await model.getAllProducts(loggedUserType, { loggedUserId, manufacturerId });

    return send(res, modelRes);
}

export async function reportFaultProduct(req, res) {
    const { loggedUserId, loggedUserType } = req.body;
    const { productId } = req.params;

    if (!loggedUserId || !loggedUserType || !productId ) {
        return badRequest(res);
    }

    const modelRes = await model.reportFaultProduct(loggedUserType, { loggedUserId, productId });

    return send(res, modelRes);
}