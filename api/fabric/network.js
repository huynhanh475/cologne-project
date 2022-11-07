import { readFileSync } from 'fs';
import { join } from 'path';
import FabricCAServices from 'fabric-ca-client';
import { Gateway, Wallets } from 'fabric-network';
import dotenv from 'dotenv'
import { userTypes } from '../utils/constants.js';
dotenv.config()

const manufacturerCcpPath = join(process.cwd(), process.env.MANUFACTURER_CONN);
const manufacturerCcp = JSON.parse(readFileSync(manufacturerCcpPath, 'utf8'));

const delivererCcpPath = join(process.cwd(), process.env.DELIVERER_CONN);
const delivererCcp = JSON.parse(readFileSync(delivererCcpPath, 'utf8'));

const retailerCcpPath = join(process.cwd(), process.env.RETAILER_CONN);
const retailerCcp = JSON.parse(readFileSync(retailerCcpPath, 'utf8'));

function getConnectionMaterial(isManufacturer, isDeliverer, isRetailer) {
    const connectionMaterial = {};
    if (isManufacturer) {
        connectionMaterial.walletPath = join(process.cwd(), process.env.MANUFACTURER_WALLET);
        connectionMaterial.connection = manufacturerCcp;
        connectionMaterial.orgMSPID = process.env.MANUFACTURER_MSP;
        connectionMaterial.caURL = process.env.MANUFACTURER_CA_ADDR;
    }

    if (isDeliverer) {
        connectionMaterial.walletPath = join(process.cwd(), process.env.DELIVERER_WALLET);
        connectionMaterial.connection = delivererCcp;
        connectionMaterial.orgMSPID = process.env.DELIVERER_MSP;
        connectionMaterial.caURL = process.env.DELIVERER_CA_ADDR;
    }

    if (isRetailer) {
        connectionMaterial.walletPath = join(process.cwd(), process.env.RETAILER_WALLET);
        connectionMaterial.connection = retailerCcp;
        connectionMaterial.orgMSPID = process.env.RETAILER_MSP;
        connectionMaterial.caURL = process.env.RETAILER_CA_ADDR;
    }

    return connectionMaterial;
}

export async function connect(userType, userID) {

    const isManufacturer = userType === userTypes.manufacturer;
    const isDeliverer = userType === userTypes.deliverer;
    const isRetailer = userType === userTypes.retailer;

    if (!isManufacturer && !isDeliverer && !isRetailer) {
        return { status: 403, error: `User type ${userType} unknown.` };
    }

    const gateway = new Gateway();
    try {
        const { walletPath, connection } = getConnectionMaterial(isManufacturer, isDeliverer, isRetailer);
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        const identity = await wallet.get(userID);
        if (!identity) {
            console.error(`An identity for the user ${userID} does not exist in the wallet. Register ${userID} first`);
            return { status: 401, error: 'User identity does not exist in the wallet.' };
        }

        await gateway.connect(connection, {
            wallet,
            identity: userID,
            discovery: { enabled: true, asLocalhost: Boolean(process.env.AS_LOCALHOST) }
        });
        const network = await gateway.getNetwork(process.env.CHANNEL);
        const contract = network.getContract(process.env.CONTRACT);
        const networkObj = { gateway, network, contract };

        console.log('Connected to fabric network successly.');
        return networkObj;
    }
    catch (error) {
        console.error(`Fail to connect network: ${error}`);
        gateway.disconnect();
        return { status: 500, error: error.toString() };
    }
};

export async function enrollAdmin(isManufacturer, isDeliverer, isRetailer, adminId) {
    try {
        const { walletPath, connection, orgMSPID, caURL } = getConnectionMaterial(isManufacturer, isDeliverer, isRetailer);

        const caInfo = connection.certificateAuthorities[caURL];
        const ca = new FabricCAServices(caInfo.url);

        const wallet = await Wallets.newFileSystemWallet(walletPath);

        const identity = await wallet.get(adminId);
        if (identity) {
            console.log('An identity for the admin user "admin" already exists in the wallet');
            return;
        }

        const enrollment = await ca.enroll({
            enrollmentID: adminId,
            enrollmentSecret: process.env.ADMIN_SECRET
        });

        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes()
            },
            mspId: orgMSPID,
            type: 'X.509'
        }
        await wallet.put(adminId, x509Identity);
        console.log('Successfully enrolled admin user "admin" and imported it into the wallet');
    }
    catch (error) {
        console.error(`Failed to enroll admin user "admin": ${error}`);
        process.exit(1);
    }
};

export async function registerUser(loggedUserType, userID) {
    const isManufacturer = loggedUserType === userTypes.manufacturer;
    const isDeliverer = loggedUserType === userTypes.deliverer;
    const isRetailer = loggedUserType === userTypes.retailer;

    if (!isManufacturer && !isDeliverer && !isRetailer) {
        return { status: 400, error: `User type ${loggedUserType} unknown.` };
    }
    
    try {
        const { walletPath, connection, orgMSPID, caURL } = getConnectionMaterial(isManufacturer, isDeliverer, isRetailer);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        const caInfo = connection.certificateAuthorities[caURL];
        const ca = new FabricCAServices(caInfo.url);

        const identity = await wallet.get(userID);
        if (identity) {
            console.error(`An identity for the user "${userID}" already exists in the wallet`);
            return { status: 400, error: 'User identity already exists in the wallet.' };
        }

        const adminIdentity = await wallet.get("admin");
        if (!adminIdentity) {
            console.log('An identity for the admin user "admin" does not exist in the wallet');
            console.log('Enrolls an admin before retrying');
            return { status : 500, error: "An identity for the admin user 'admin' does not exist in the wallet"};
        }

        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, "admin");

        const secret = await ca.register({
            enrollmentID: userID,
            role: 'client'
        }, adminUser);

        const enrollment = await ca.enroll({
            enrollmentID: userID,
            enrollmentSecret: secret
        });

        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes()
            },
            mspId: orgMSPID,
            type: 'X.509'
        }
        await wallet.put(userID, x509Identity);
        console.log(`Successfully registered and enrolled user ${userID} and imported it into the wallet`);

    }
    catch (error) {
        console.error(`Failed to register user ${userID}: ${error}`);
        process.exit(1);
    }
};

export async function query(networkObj, ...funcAndArgs) {
    try {
        console.log(`Query parameter: ${funcAndArgs}`);
        const funcAndArgsStrings = funcAndArgs.map(elem => String(elem));

        const result = await networkObj.contract.evaluateTransaction(...funcAndArgsStrings);
        console.log("Transaction has been evaluated");
        networkObj.gateway.disconnect();

        const jsonResult = JSON.parse(result);
        if (jsonResult.status === 200) {
            return JSON.parse(jsonResult.payload);
        }
        return { status: 400, error: jsonResult.message };
    }
    catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);

        if (networkObj.gateway) {
            networkObj.gateway.disconnect();
        }
        return { status: 500, error: error.toString() };
    }
};

export async function invoke(networkObj, ...funcAndArgs) {
    try {
        console.log(`Invoke parameter: ${funcAndArgs}`);
        const funcAndArgsStrings = funcAndArgs.map(elem => String(elem));

        const result = await networkObj.contract.submitTransaction(...funcAndArgsStrings);
        console.log('Transaction has been submitted');
        networkObj.gateway.disconnect();

        const jsonResult = JSON.parse(result);
        if (jsonResult.status === 200) {
            return JSON.parse(jsonResult.payload);
        }
        return { status: 400, error: jsonResult.message };
    }
    catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        if (networkObj.gateway) {
            networkObj.gateway.disconnect();
        }
        return { status: 500, error: error.toString() };
    }
};
 
