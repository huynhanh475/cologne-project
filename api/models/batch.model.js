import { connect, invoke } from '../fabric/network.js';
import { createModelRes } from '../utils/api-response.js';

export async function getSingleBatch(userType, information) {
    const { loggedUserId, batchID } = information;
    const networkObj = await connect(userType, loggedUserId);

    const contractRes = await invoke(networkObj, 'queryBatch', batchID);
    const error = networkObj.error || contractRes.error;
    if (error) {
        const status = networkObj.status || contractRes.status;
        return createModelRes(status, error);
    }
    return createModelRes(200, 'Success', contractRes);
}

export async function getAllBatches(userType, information) {
    const { loggedUserId } = information;
    const networkObj = await connect(userType, loggedUserId);

    const contractRes = await invoke(networkObj, 'getAllBatches', loggedUserId);
    const error = networkObj.error || contractRes.error;
    if (error) {
        const status = networkObj.status || contractRes.status;
        return createModelRes(status, error);
    }
    return createModelRes(200, 'Success', contractRes);
}

export async function reportFaultBatch(userType, information) {
    const { loggedUserId, batchID } = information;
    const networkObj = await connect(userType, loggedUserId);

    const contractRes = await invoke(networkObj, 'reportFaultBatch', batchID, loggedUserId);
    const error = networkObj.error || contractRes.error;
    if(error){
        const status = networkObj.status || contractRes.status;
        return createModelRes(status, error);
    }
    return createModelRes(200, 'Success', contractRes);
}

export async function queryFaultBatches(userType, information) {
    const { loggedUserId } = information;
    const networkObj = await connect(userType, loggedUserId);

    const contractRes = await invoke(networkObj, 'queryFaultBatches');
    const error = networkObj.error || contractRes.error;
    if(error){
        const status = networkObj.status || contractRes.status;
        return createModelRes(status, error);
    }
}