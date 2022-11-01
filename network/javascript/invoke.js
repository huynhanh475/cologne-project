/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

async function main() {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('supply');

        // Submit the specified transaction.
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR12', 'Dave')
        //await contract.submitTransaction('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom');
        //ctx, product_ID, name,  manufacturer_ID, date, price, quantity
        //await contract.submitTransaction('createProduct', 'Orange1', 'manufacturer1', '20', '500');
        //const result = await contract.submitTransaction('registerBatchOrder', 'product0', 'retailer1', 'manufacturer3','11');

        /*
        await contract.submitTransaction('createUser', 'Minh', 'minhdinh@gmail.com', 'manufacturer', 'no address', '12345');
        await contract.submitTransaction('createUser', 'Minh1', 'minhdinh@gmail.com', 'retailer', 'no address', '12345');
        await contract.submitTransaction('createUser', 'Minh2', 'minhdinh@gmail.com', 'deliverer', 'no address', '12345');
        await contract.submitTransaction('createUser', 'Minh3', 'minhdinh@gmail.com', 'deliverer', 'no address', '12345');
*/
        

/* test mark product fault        
        await contract.submitTransaction('createProduct', 'Orange1', 'manufacturer1', '20', '500');
        await contract.submitTransaction('createProduct', 'Orange2', 'manufacturer1', '20', '500');
        await contract.submitTransaction('createProduct', 'Orange3', 'manufacturer1', '20', '500');
        await contract.submitTransaction('createProduct', 'Orange4', 'manufacturer1', '20', '500');
        


        await contract.submitTransaction('registerBatchOrder', 'product0', 'retailer1', '400');
        await contract.submitTransaction('registerBatchOrder', 'product0', 'retailer1', '400');

        await contract.submitTransaction('registerBatchOrder', 'product1', 'retailer1', '400');
        await contract.submitTransaction('registerBatchOrder', 'product1', 'retailer1', '400');


        const result = await contract.submitTransaction('markProductFault', 'product0', 'manufacturer1');
 */

        //const result = await contract.submitTransaction('queryBatch', 'batch2');
        // const result = await contract.submitTransaction('markProductFault', 'batch0', 'manufacturer1');
        //const result = await contract.submitTransaction('queryProduct', 'product0');
        
        //const result = await contract.submitTransaction('markStatus', 'batch0', 'approve-invitation-by-deliverer');
        //const result = await contract.submitTransaction('transferToDeliverer', 'batch0');
        //const result = await contract.submitTransaction('createUser', 'Minh', 'minhdinh@gmail.com', 'manufacturer', 'no address', '12345');
        //const result = await contract.submitTransaction('createUser');
        //awai conttract.submitTransaction('registerBatchOrder', 'product0', 'retailer1', 'manufacturer3','11');
        //const result = await contract.submitTransaction('transferToDeliverer', 'batch0', 'manufacturer1');
       // const result = await contract.submitTransaction('markBatchFault', 'batch0', 'retailer1');
        //await contract.submitTransaction('registerBatchOrder', 'product0', 'retailer1', 'manufacturer3','11');
        //await contract.submitTransaction('registerBatchOrder', 'product1', 'retailer1', 'manufacturer3','11');
        //await contract.submitTransaction('registerBatchOrder', 'product2', 'retailer1', 'manufacturer3','11');
        //await contract.submitTransaction('registerBatchOrder', 'product3', 'retailer1', 'manufacturer3','11');
        //await contract.submitTransaction('transferToDeliverer', 'batch0');
        //const user = await contract.submitTransaction('createUser', 'MinhDinh', 'minhdinh@gmail.com', 'retailer', 'no address', '12345');
        //console.log(JSON.stringify(user));
        //await contract.submitTransaction('delivererConfirmTransfer', 'batch0');
        //const result =await contract.submitTransaction('signIn', 'user0', '12345');

        //await contract.submitTransaction('createProduct', 'Orange1', 'manufacturer1', '20', '500');
        await contract.submitTransaction('registerBatchOrder', 'product0', 'retailer1','11');
        //await contract.submitTransaction('markStatus', 'batch0', 'fault');
        //const result = await contract.submitTransaction('queryFaultBatches');

        // await contract.submitTransaction('registerBatchOrder', 'product3', 'user-4','11');
        // await contract.submitTransaction('registerBatchOrder', 'product3', 'user-4','11');
        // await contract.submitTransaction('registerBatchOrder', 'product3', 'user-4','11');
        // await contract.submitTransaction('registerBatchOrder', 'product3', 'user-4','11');
        // await contract.submitTransaction('registerBatchOrder', 'product3', 'user-4','11');
        // await contract.submitTransaction('registerBatchOrder', 'product3', 'user-4','11');

        // await contract.submitTransaction('registerBatchOrder', 'product3', 'user-4', '20');
        // await contract.submitTransaction('registerBatchOrder', 'product3', 'user-4', '20');
        // await contract.submitTransaction('registerBatchOrder', 'product3', 'user-4', '20');
        // await contract.submitTransaction('registerBatchOrder', 'product3', 'user-4', '30');
        // await contract.submitTransaction('registerBatchOrder', 'product4', 'user-4', '30');
        // await contract.submitTransaction('registerBatchOrder', 'product5', 'user-4', '30');
        // await contract.submitTransaction('registerBatchOrder', 'product3', 'user-4', '40');
        // await contract.submitTransaction('registerBatchOrder', 'product4', 'user-4', '40');
        // await contract.submitTransaction('registerBatchOrder', 'product3', 'user-4', '40');
        //console.log(result.toString());
        //const result = await contract.submitTransaction('queryProduct', 'product0');
        //const result = await contract.submitTransaction('createUser', 'MinhDinh', 'minhdinh@gmail.com', 'retailer', 'no address', '12345');
        //console.log(result.toString());
        //await contract.submitTransaction('delivererConfirmTransfer', 'batch0');
        console.log('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

main();
