import { connect, invoke, query, registerUser } from '../fabric/network.js';
import { createModelRes } from '../utils/api-response.js';
import { generateAccessToken } from '../utils/authenticate.js';


export async function createUser(loggedUserType, information) {
    const {loggedUserId, userType, address, name, email, password } = information;

    let networkObj;
    networkObj = await connect(loggedUserType, loggedUserId);
    if (networkObj.error) {
        const status = networkObj.status;
        return createModelRes(status, error);
    }

    let contractRes;
    contractRes = await invoke(networkObj, 'createUser', name, email, userType, address, password);
    console.log('5');
    if (contractRes.error) {
        const status = contractRes.status;
        return createModelRes(status, error);
    }

    const walletRes = await registerUser(loggedUserType, loggedUserId, contractRes.userID);
    if (walletRes.error) {
        const status = walletRes.status;
        return createModelRes(status, error);
    }

    return createModelRes(200, 'Success', contractRes);
}

export async function signIn(loggedUserType, information) {
    const { id, password } = information;
    
    const networkObj = await connect(loggedUserType, id);
    if (networkObj.error) {
        const status = networkObj.status;
        return createModelRes(status, error);
    }

    let contractRes;
    contractRes = await invoke(networkObj, 'signIn', id, password);
    if (contractRes.error) {
        const status = contractRes.status;
        return createModelRes(status, error);
    }
    console.log(`Contract res: ${contractRes}`);
    const { name, userType, role } = contractRes;
    const accessToken = generateAccessToken({ id, userType, role, name });
    return createModelRes(200, 'Success', { id, userType, role, name, accessToken });
}

export async function getAllUser(loggedUserType, information) {
    const { loggedUserId } = information;

    const networkObj = await connect(loggedUserType, loggedUserId);
    if (networkObj.error) {
        const status = networkObj.status;
        return createModelRes(status, error);
    }

    const contractRes = await query(networkObj, 'queryAllUser');
    if (contractRes.error) {
        const status = contractRes.status;
        return createModelRes(status, error);
    }

    return createModelRes(200, 'Success', contractRes);
}