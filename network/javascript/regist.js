/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const fs = require('fs');
const path = require('path');

async function createCaClient(ccp, cert)
{
    const caURL = ccp.certificateAuthorities[cert].url;
    const ca = new FabricCAServices(caURL);
    return ca;
}

async function regist(ca, walletId, mspId)
{
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), walletId);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userIdentity = await wallet.get('appUser');
        if (userIdentity) {
            console.log('An identity for the user "appUser" already exists in the wallet');
            return;
        }

        // Check to see if we've already enrolled the admin user.
        const adminIdentity = await wallet.get('admin');
        if (!adminIdentity) {
            console.log('An identity for the admin user "admin" does not exist in the wallet');
            console.log('Run the enrollAdmin.js application before retrying');
            return;
        }

        // build a user object for authenticating with the CA
        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, 'admin');

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({
            //affiliation: 'org3.department1',org3 has no affiliation. If we want to specify this one, go to fabric-ca config file to add
            enrollmentID: 'appUser',
            role: 'client'
        }, adminUser);
        const enrollment = await ca.enroll({
            enrollmentID: 'appUser',
            enrollmentSecret: secret
        });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: mspId,
            type: 'X.509',
        };
        await wallet.put('appUser', x509Identity);
        console.log('Successfully registered and enrolled admin user "appUser" and imported it into the wallet');
}
async function main() {
    try {
        // load the network configuration
        const ccpPathOrg1 = path.resolve(__dirname, '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp1 = JSON.parse(fs.readFileSync(ccpPathOrg1, 'utf8'));

        const ccpPathOrg2 = path.resolve(__dirname, '..', 'test-network', 'organizations', 'peerOrganizations', 'org2.example.com', 'connection-org2.json');
        const ccp2 = JSON.parse(fs.readFileSync(ccpPathOrg2, 'utf8'));

        const ccpPathOrg3 = path.resolve(__dirname, '..', 'test-network', 'organizations', 'peerOrganizations', 'org3.example.com', 'connection-org3.json');
        const ccp3 = JSON.parse(fs.readFileSync(ccpPathOrg3, 'utf8'));

        // Create a new CA client for interacting with the CA.

        const ca1 = await createCaClient(ccp1, 'ca.org1.example.com');
        const ca2 = await createCaClient(ccp2, 'ca.org2.example.com');
        const ca3 = await createCaClient(ccp3, 'ca.org3.example.com');

        await regist(ca1, 'wallet', 'Org1MSP');
        await regist(ca2, 'wallet2', 'Org2MSP');
        await regist(ca3, 'wallet3', 'Org3MSP');

    } catch (error) {
        console.error(`Failed to register user "appUser": ${error}`);
        process.exit(1);
    }
}

main();
