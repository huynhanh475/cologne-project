import { connect, invoke } from '../fabric/network.js';
import { createModelRes } from '../utils/api-response.js';

export async function createProduct(loggedUserType, information) {
    const { loggedUserId ,name, price, quantity} = information;

    const networkObj = await connect(loggedUserType, loggedUserId);
    if (networkObj.error) {
        return createModelRes(networkObj.status, networkObj.error);
    }

    const contractRes = await invoke(networkObj, 'createProduct', name, loggedUserId, price, quantity);
    if (contractRes.error) {
        return createModelRes(contractRes.status, contractRes.error);
    }

    contractRes.quantity = Number(contractRes.quantity);
    contractRes.price = Number(contractRes.price);

    return createModelRes(200, 'Success', contractRes);
}

export async function getProductById( loggedUserType, information ) {
    const { loggedUserId, productId } = information;

    const networkObj = await connect(loggedUserType, loggedUserId);
    if (networkObj.error) {
        return createModelRes(networkObj.status, networkObj.error);
    }
    
    const contractRes = await invoke(networkObj, 'queryProduct', productId);
    if (contractRes.error) {
        return createModelRes(contractRes.status, contractRes.error);
    }

    return createModelRes(200, 'Success', contractRes);
}

export async function getAllProducts( loggedUserType, information ) {
    const { loggedUserId, manufacturerId } = information;

    const networkObj = await connect(loggedUserType, loggedUserId);
    if (networkObj.error) {
        return createModelRes(networkObj.status, networkObj.error);
    }
    
    const contractRes = await invoke(networkObj, 'queryAllProduct', manufacturerId);
    if (contractRes.error) {
        return createModelRes(contractRes.status, contractRes.error);
    }

    for (let i=0; i < contractRes.length; i++) {
        contractRes[i].quantity = Number(contractRes[i].quantity);
        contractRes[i].price = Number(contractRes[i].price);
    }

    return createModelRes(200, 'Success', contractRes);
}

export async function reportFaultProduct( loggedUserType, information ) {
    const { loggedUserId, productId } = information;

    const networkObj = await connect(loggedUserType, loggedUserId);
    if (networkObj.error) {
        return createModelRes(networkObj.status, networkObj.error);
    }
    
    const contractRes = await invoke(networkObj, 'markProductFault', productId, loggedUserId);
    if (contractRes.error) {
        return createModelRes(contractRes.status, contractRes.error);
    }

    contractRes.quantity = Number(contractRes.quantity);
    contractRes.price = Number(contractRes.price);

    return createModelRes(200, 'Success', contractRes);
}