import { connect, invoke } from '../fabric/network.js';
import { createModelRes } from '../utils/api-response.js';

export async function registerOrder(isManufacturer, isDeliverer, isRetailer, information) {
    const { productID, manufacturerID, retailerID, quantity } = information;
    const batchDate = new Date();
    const networkObj = await connect(isManufacturer, isDeliverer, isRetailer);
    const contractRes = await invoke(networkObj, 'registerBatchOrder', productID, retailerID, manufacturerID, quantity, batchDate);
    const error = networkObj.error || contractRes.error;
    if (error) {
        const status = networkObj.status || contractRes.status;
        return createModelRes(status, error);
    }
    return createModelRes(200, 'Success', { productID, manufacturerID, retailerID, quantity, batchDate });
}

export async function approveOrder(isManufacturer, isDeliverer, isRetailer, information) {
    const { batchID } = information;
    const networkObj = await connect(isManufacturer, isDeliverer, isRetailer);
    const contractRes = await invoke(networkObj, 'approveBatchOrder', batchID);
    const error = networkObj.error || contractRes.error;
    if (error) {
        const status = networkObj.status || contractRes.status;
        return createModelRes(status, error);
    }
    return createModelRes(200, 'Success');
}

export async function inviteDeliverer(isManufacturer, isDeliverer, isRetailer, information) {
    const { batchID, delivererID } = information;
    const networkObj = await connect(isManufacturer, isDeliverer, isRetailer);
    const contractRes = await invoke(networkObj, 'inviteDeliverer', batchID, delivererID);
    const error = networkObj.error || contractRes.error;
    if (error) {
        const status = networkObj.status || contractRes.status;
        return createModelRes(status, error);
    }
    return createModelRes(200, 'Success');
}

export async function replyInvitation(isManufacturer, isDeliverer, isRetailer, information) {
    const { batchID, action } = information;
    const networkObj = await connect(isManufacturer, isDeliverer, isRetailer);
    const contractRes = await invoke(networkObj, 'approveInvitation', batchID, action);
    const error = networkObj.error || contractRes.error;
    if (error) {
        const status = networkObj.status || contractRes.status;
        return createModelRes(status, error);
    }
    return createModelRes(200, 'Success');
}

export async function transferToDeliverer(isManufacturer, isDeliverer, isRetailer, information) {
    const { batchID } = information;
    const networkObj = await connect(isManufacturer, isDeliverer, isRetailer);
    const contractRes = await invoke(networkObj, 'transferToDeliverer', batchID);
    const error = networkObj.error || contractRes.error;
    if (error) {
        const status = networkObj.status || contractRes.status;
        return createModelRes(status, error);
    }
    return createModelRes(200, 'Success');
}

export async function confirmTransfer(isManufacturer, isDeliverer, isRetailer, information) {
    const { batchID } = information;
    const networkObj = await connect(isManufacturer, isDeliverer, isRetailer);
    const contractRes = await invoke(networkObj, 'delivererConfirmTransfer', batchID);
    const error = networkObj.error || contractRes.error;
    if (error) {
        const status = networkObj.status || contractRes.status;
        return createModelRes(status, error);
    }
    return createModelRes(200, 'Success');
}


export async function transferToRetailer(isManufacturer, isDeliverer, isRetailer, information) {
    const { batchID } = information;
    const networkObj = await connect(isManufacturer, isDeliverer, isRetailer);
    const contractRes = await invoke(networkObj, 'transferToRetailer', batchID);
    const error = networkObj.error || contractRes.error;
    if (error) {
        const status = networkObj.status || contractRes.status;
        return createModelRes(status, error);
    }
    return createModelRes(200, 'Success');
}

export async function receiveProduct(isManufacturer, isDeliverer, isRetailer, information) {
    const { batchID } = information;
    const networkObj = await connect(isManufacturer, isDeliverer, isRetailer);
    const contractRes = await invoke(networkObj, 'retailerConfirmTransfer', batchID);
    const error = networkObj.error || contractRes.error;
    if (error) {
        const status = networkObj.status || contractRes.status;
        return createModelRes(status, error);
    }
    return createModelRes(200, 'Success');
}