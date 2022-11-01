import { connect, invoke } from '../fabric/network.js';
import { createModelRes } from '../utils/api-response.js';

export async function registerOrder(userType, information) {
    const { productId, loggedUserId, quantity } = information;
    const retailerId = loggedUserId;
    const networkObj = await connect(userType, retailerId);
    const contractRes = await invoke(networkObj, 'registerBatchOrder', productId, retailerId, quantity);
    const error = networkObj.error || contractRes.error;
    if (error) {
        const status = networkObj.status || contractRes.status;
        return createModelRes(status, error);
    }

    contractRes.quantity = Number(contractRes.quantity)

    return createModelRes(200, 'Success', contractRes);
}

export async function approveOrder(userType, information) {
    const { loggedUserId, batchId } = information;
    const networkObj = await connect(userType, loggedUserId);

    const contractRes = await invoke(networkObj, 'approveBatchOrder', batchId, loggedUserId);
    const error = networkObj.error || contractRes.error;
    if (error) {
        const status = networkObj.status || contractRes.status;
        return createModelRes(status, error);
    }

    contractRes.quantity = Number(contractRes.quantity)

    return createModelRes(200, 'Success', contractRes);
}

export async function inviteDeliverer(userType, information) {
    const { loggedUserId, batchId, delivererId } = information;
    const networkObj = await connect(userType, loggedUserId);
    const contractRes = await invoke(networkObj, 'inviteDeliverer', batchId, delivererId, loggedUserId);
    const error = networkObj.error || contractRes.error;
    if (error) {
        const status = networkObj.status || contractRes.status;
        return createModelRes(status, error);
    }

    contractRes.quantity = Number(contractRes.quantity)

    return createModelRes(200, 'Success', contractRes);
}

export async function replyInvitation(userType, information) {
    const { loggedUserId, batchId, action } = information;
    const networkObj = await connect(userType, loggedUserId);
    const contractRes = await invoke(networkObj, 'approveInvitation', batchId, action, loggedUserId);
    const error = networkObj.error || contractRes.error;
    if (error) {
        const status = networkObj.status || contractRes.status;
        return createModelRes(status, error);
    }

    contractRes.quantity = Number(contractRes.quantity)

    return createModelRes(200, 'Success', contractRes);
}

export async function transferToDeliverer(userType, information) {
    const { loggedUserId, batchId } = information;
    const networkObj = await connect(userType, loggedUserId);
    const contractRes = await invoke(networkObj, 'transferToDeliverer', batchId, loggedUserId);
    const error = networkObj.error || contractRes.error;
    if (error) {
        const status = networkObj.status || contractRes.status;
        return createModelRes(status, error);
    }

    contractRes.quantity = Number(contractRes.quantity)

    return createModelRes(200, 'Success', contractRes);
}

export async function confirmTransfer(userType, information) {
    const { loggedUserId, batchId } = information;
    const networkObj = await connect(userType, loggedUserId);
    const contractRes = await invoke(networkObj, 'delivererConfirmTransfer', batchId, loggedUserId);
    const error = networkObj.error || contractRes.error;
    if (error) {
        const status = networkObj.status || contractRes.status;
        return createModelRes(status, error);
    }

    contractRes.quantity = Number(contractRes.quantity)

    return createModelRes(200, 'Success', contractRes);
}


export async function transferToRetailer(userType, information) {
    const { loggedUserId, batchId } = information;
    const networkObj = await connect(userType, loggedUserId);
    const contractRes = await invoke(networkObj, 'transferToRetailer', batchId, loggedUserId);
    const error = networkObj.error || contractRes.error;
    if (error) {
        const status = networkObj.status || contractRes.status;
        return createModelRes(status, error);
    }

    contractRes.quantity = Number(contractRes.quantity)

    return createModelRes(200, 'Success', contractRes);
}

export async function receiveProduct(userType, information) {
    const { loggedUserId, batchId } = information;
    const networkObj = await connect(userType, loggedUserId);
    const contractRes = await invoke(networkObj, 'retailerConfirmTransfer', batchId, loggedUserId);
    const error = networkObj.error || contractRes.error;
    if (error) {
        const status = networkObj.status || contractRes.status;
        return createModelRes(status, error);
    }

    contractRes.quantity = Number(contractRes.quantity)
    
    return createModelRes(200, 'Success', contractRes);
}