import { connect, invoke } from '../fabric/network.js';
import { createModelRes } from '../utils/api-response.js';

export async function registerOrder(userType, information) {
    const { productId, manufacturerId, loggedUserId, quantity } = information;
    const retailerId = loggedUserId;
    const networkObj = await connect(userType, retailerId);
    const contractRes = await invoke(networkObj, 'registerBatchOrder', productId, retailerId, manufacturerId, quantity);
    const error = networkObj.error || contractRes.error;
    if (error) {
        const status = networkObj.status || contractRes.status;
        return createModelRes(status, error);
    }
    return createModelRes(200, 'Success', contractRes);
}

export async function approveOrder(userType, information) {
    const { loggedUserId, batchId } = information;
    const networkObj = await connect(userType, loggedUserId);

    const contractRes = await invoke(networkObj, 'approveBatchOrder', batchId);
    const error = networkObj.error || contractRes.error;
    if (error) {
        const status = networkObj.status || contractRes.status;
        return createModelRes(status, error);
    }
    return createModelRes(200, 'Success', contractRes);
}

export async function inviteDeliverer(userType, information) {
    const { loggedUserId, batchId, delivererId } = information;
    const networkObj = await connect(userType, loggedUserId);
    const contractRes = await invoke(networkObj, 'inviteDeliverer', batchId, delivererId);
    const error = networkObj.error || contractRes.error;
    if (error) {
        const status = networkObj.status || contractRes.status;
        return createModelRes(status, error);
    }
    return createModelRes(200, 'Success', contractRes);
}

export async function replyInvitation(userType, information) {
    const { loggedUserId, batchId, action } = information;
    const networkObj = await connect(userType, loggedUserId);
    const contractRes = await invoke(networkObj, 'approveInvitation', batchId, action);
    const error = networkObj.error || contractRes.error;
    if (error) {
        const status = networkObj.status || contractRes.status;
        return createModelRes(status, error);
    }
    return createModelRes(200, 'Success', contractRes);
}

export async function transferToDeliverer(userType, information) {
    const { loggedUserId, batchId } = information;
    const networkObj = await connect(userType, loggedUserId);
    const contractRes = await invoke(networkObj, 'transferToDeliverer', batchId);
    const error = networkObj.error || contractRes.error;
    if (error) {
        const status = networkObj.status || contractRes.status;
        return createModelRes(status, error);
    }
    return createModelRes(200, 'Success', contractRes);
}

export async function confirmTransfer(userType, information) {
    const { loggedUserId, batchId } = information;
    const networkObj = await connect(userType, loggedUserId);
    const contractRes = await invoke(networkObj, 'delivererConfirmTransfer', batchId);
    const error = networkObj.error || contractRes.error;
    if (error) {
        const status = networkObj.status || contractRes.status;
        return createModelRes(status, error);
    }
    return createModelRes(200, 'Success', contractRes);
}


export async function transferToRetailer(userType, information) {
    const { loggedUserId, batchId } = information;
    const networkObj = await connect(userType, loggedUserId);
    const contractRes = await invoke(networkObj, 'transferToRetailer', batchId);
    const error = networkObj.error || contractRes.error;
    if (error) {
        const status = networkObj.status || contractRes.status;
        return createModelRes(status, error);
    }
    return createModelRes(200, 'Success', contractRes);
}

export async function receiveProduct(userType, information) {
    const { loggedUserId, batchId } = information;
    const networkObj = await connect(userType, loggedUserId);
    const contractRes = await invoke(networkObj, 'retailerConfirmTransfer', batchId);
    const error = networkObj.error || contractRes.error;
    if (error) {
        const status = networkObj.status || contractRes.status;
        return createModelRes(status, error);
    }
    return createModelRes(200, 'Success', contractRes);
}