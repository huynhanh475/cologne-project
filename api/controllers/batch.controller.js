import * as model from '../models/batch.model.js';
import { badRequest, send } from '../utils/api-response.js';

export async function getSingleBatch(req, res){
    const { loggedUserType, loggedUserId, batchID } = req.body;
    if (!batchID)
        return badRequest(res);

    if(loggedUserType==='manufacturer'){
        const modelRes = await model.getSingleBatch(loggedUserType, { loggedUserId, batchID });
        return send(res, modelRes);
    }
    return badRequest(res);
}

export async function getAllBatches(req, res){
    const { loggedUserType, loggedUserId } = req.body;
    const modelRes = await model.getAllBatches(loggedUserType, { loggedUserId });
    return send(res, modelRes);
}