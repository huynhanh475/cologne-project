/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');


async function main() {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', 'test-network', 'organizations', 'peerOrganizations', 'org3.example.com', 'connection-org3.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet3');
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

        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        //const result = await contract.evaluateTransaction('queryBatch', 'batch0');
        //const result = await contract.evaluateTransaction('queryUser', 'counters');
        //const result = await contract.evaluateTransaction('signIn', 'user1', '12345');
        //const user = await contract.evaluateTransaction('createUser', 'Minh', 'minhdinh@gmail.com', 'retailer', 'no address', '12345');
        
        //const result = await contract.evaluateTransaction('queryAllUser');
        //const result = await contract.evaluateTransaction('queryProduct', 'product0');
        //const result = await contract.evaluateTransaction('getBatchDatesId', 'batch123');
        //const result =await contract.submitTransaction('signIn', 'user0', '12345');
        //const result = await contract.submitTransaction('retailerConfirmTransfer', 'batch0');

        const result = await contract.evaluateTransaction('queryAllProduct');
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        //console.log(users.toString());
        // Disconnect from the gateway.
        //testing
        //await contract.evaluateTransaction('registerBatchOrder', 'product1','r1','m1','1','temp');
        //await contract.evaluateTransaction('approveBatchOrder', 'batch0');
        //await contract.evaluateTransaction('inviteDeliverer', 'batch0','d1');
        //await contract.evaluateTransaction('approveInvitation', 'batch0','accept');
        await gateway.disconnect();
        
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

main();
