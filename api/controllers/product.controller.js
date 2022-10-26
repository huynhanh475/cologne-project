import * as model from '../models/product.model.js';
import { unauthorized } from '../utils/api-response.js';
import { badRequest, send } from '../utils/apiResponse.js';

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

    console.log('1');

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

    const modelRes = await model.getAllProducts(loggedUserId, { loggedUserId });

    return send(res, modelRes);
}

