import { connect, invoke } from '../fabric/network.js';
import { createModelRes } from '../utils/api-response.js';

export async function createProduct(loggedUserType, information) {
    const { loggedUserId ,name, price, quantity} = information;

    const networkObj = await connect(loggedUserType, loggedUserId);
    if (networkObj.error) {
        return createModelRes(networkObj.status, networkObj.error);
    }

    const contractRes = await invoke(networkObj, 'createProduct', name, loggedUserId, price, quantity);
    console.log(contractRes);
    if (contractRes.error) {
        return createModelRes(contractRes.status, contractRes.error);
    }

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
    const { loggedUserId } = information;

    const networkObj = await connect(loggedUserType, loggedUserId);
    if (networkObj.error) {
        return createModelRes(networkObj.status, networkObj.error);
    }
    
    const contractRes = await invoke(networkObj, 'queryAll', 'Product');
    if (contractRes.error) {
        return createModelRes(contractRes.status, contractRes.error);
    }

    return createModelRes(200, 'Success', contractRes);
}
