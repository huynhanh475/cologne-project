import { connect, invoke, registerUser } from '../fabric/network.js';
import { createModelRes } from '../utils/api-response.js';
import { generateAccessToken } from '../utils/authenticate.js';


export async function createUser(isManufacturer, isMiddlemen, isConsumer, information) {
    const { id, userType, address, name, email, password } = information;

    let networkObj;
    networkObj = await connect(isManufacturer, isMiddlemen, isConsumer, id);
    
    let contractRes;
    contractRes = await invoke(networkObj, 'createUser', name, email, userType, address, password);
    console.log('5');
    const walletRes = await registerUser(isManufacturer, isMiddlemen, isConsumer, contractRes.UserID);

    const error = walletRes.error || networkObj.error || contractRes.error;
    if (error) {
        const status = walletRes.status || networkObj.status || contractRes.status;
        return createModelRes(status, error);
    }

    return createModelRes(200, 'Success', contractRes);
}

export async function signIn(isManufacturer, isMiddlemen, isConsumer, information) {
    const { id, password } = information;

    const networkObj = await connect(isManufacturer, isMiddlemen, isConsumer, id);
    let contractRes;
    contractRes = await invoke(networkObj, 'signIn', id, password);
    const error = networkObj.error || contractRes.error;
    if (error) {
        const status = networkObj.status || contractRes.status;
        return createModelRes(status, error);
    }
    console.log(contractRes);
    const { Name, UserType } = contractRes;
    const accessToken = generateAccessToken({ id, UserType, Name });
    return createModelRes(200, 'Success', { id, UserType, Name, accessToken });
}

export async function getAllUser(isManufacturer, isMiddlemen, isConsumer, information) {
    const { id } = information;

    const networkObj = await connect(true, false, false, 'admin');

    const contractRes = await invoke(networkObj, 'queryAll', 'User');

    const error = networkObj.error || contractRes.error;
    if (error) {
        const status = networkObj.status || contractRes.status;
        return createModelRes(status, error);
    }

    return createModelRes(200, 'Success', contractRes);
}