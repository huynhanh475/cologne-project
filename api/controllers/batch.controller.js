import * as model from '../models/batch.model.js';
import { badRequest, send } from '../utils/api-response.js';

export async function getSingleBatch(req, res) {
    const { loggedUserType, loggedUserId, batchId } = req.body;
    if (!batchId)
        return badRequest(res);

    const modelRes = await model.getSingleBatch(loggedUserType, { loggedUserId, batchId });
    return send(res, modelRes);
}

export async function getAllBatches(req, res) {
    const { loggedUserType, loggedUserId } = req.body;
    const modelRes = await model.getAllBatches(loggedUserType, { loggedUserId });
    return send(res, modelRes);
}

export async function reportBatchFault(req, res) {
    const { loggedUserType, loggedUserId, batchId } = req.body;
    if (!batchId || !loggedUserType || !loggedUserId) {
        return badRequest(res);
    }
    const modelRes = await model.reportBatchFault(loggedUserType, { loggedUserId, batchId });
    return send(res, modelRes);
}

export async function queryFaultBatches(req, res) {
    const { loggedUserType, loggedUserId } = req.body;
    const modelRes = await model.queryFaultBatches(loggedUserType, { loggedUserId });
    return send(res, modelRes);
}