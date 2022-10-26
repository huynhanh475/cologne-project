import { connect, invoke } from '../fabric/network.js';
import { createModelRes } from '../utils/api-response.js';

export async function registerOrder(userType, information) {
    const { productID, manufacturerID, loggedUserId, quantity } = information;
    const retailerID = loggedUserId;
    const networkObj = await connect(userType, retailerID);
    const contractRes = await invoke(networkObj, 'registerBatchOrder', productID, retailerID, manufacturerID, quantity);
    const error = networkObj.error || contractRes.error;
    if (error) {
        const status = networkObj.status || contractRes.status;
        return createModelRes(status, error);
    }
    return createModelRes(200, 'Success', contractRes);
}

export async function approveOrder(userType, information) {
    const { loggedUserId, batchID } = information;
    const networkObj = await connect(userType, loggedUserId);

    const contractRes = await invoke(networkObj, 'approveBatchOrder', batchID);
    const error = networkObj.error || contractRes.error;
    if (error) {
        const status = networkObj.status || contractRes.status;
        return createModelRes(status, error);
    }
    return createModelRes(200, 'Success', contractRes);
}

export async function inviteDeliverer(userType, information) {
    const { loggedUserId, batchID, delivererID } = information;
    const networkObj = await connect(userType, loggedUserId);
    const contractRes = await invoke(networkObj, 'inviteDeliverer', batchID, delivererID);
    const error = networkObj.error || contractRes.error;
    if (error) {
        const status = networkObj.status || contractRes.status;
        return createModelRes(status, error);
    }
    return createModelRes(200, 'Success', contractRes);
}

export async function replyInvitation(userType, information) {
    const { loggedUserId, batchID, action } = information;
    const networkObj = await connect(userType, loggedUserId);
    const contractRes = await invoke(networkObj, 'approveInvitation', batchID, action);
    const error = networkObj.error || contractRes.error;
    if (error) {
        const status = networkObj.status || contractRes.status;
        return createModelRes(status, error);
    }
    return createModelRes(200, 'Success', contractRes);
}

export async function transferToDeliverer(userType, information) {
    const { loggedUserId, batchID } = information;
    const networkObj = await connect(userType, loggedUserId);
    const contractRes = await invoke(networkObj, 'transferToDeliverer', batchID);
    const error = networkObj.error || contractRes.error;
    if (error) {
        const status = networkObj.status || contractRes.status;
        return createModelRes(status, error);
    }
    return createModelRes(200, 'Success', contractRes);
}

export async function confirmTransfer(userType, information) {
    const { loggedUserId, batchID } = information;
    const networkObj = await connect(userType, loggedUserId);
    const contractRes = await invoke(networkObj, 'delivererConfirmTransfer', batchID);
    const error = networkObj.error || contractRes.error;
    if (error) {
        const status = networkObj.status || contractRes.status;
        return createModelRes(status, error);
    }
    return createModelRes(200, 'Success', contractRes);
}


export async function transferToRetailer(userType, information) {
    const { loggedUserId, batchID } = information;
    const networkObj = await connect(userType, loggedUserId);
    const contractRes = await invoke(networkObj, 'transferToRetailer', batchID);
    const error = networkObj.error || contractRes.error;
    if (error) {
        const status = networkObj.status || contractRes.status;
        return createModelRes(status, error);
    }
    return createModelRes(200, 'Success', contractRes);
}

export async function receiveProduct(userType, information) {
    const { loggedUserId, batchID } = information;
    const networkObj = await connect(userType, loggedUserId);
    const contractRes = await invoke(networkObj, 'retailerConfirmTransfer', batchID);
    const error = networkObj.error || contractRes.error;
    if (error) {
        const status = networkObj.status || contractRes.status;
        return createModelRes(status, error);
    }
    return createModelRes(200, 'Success', contractRes);
}