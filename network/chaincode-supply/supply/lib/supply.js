root@DESKTOP-MN0JR6V:~/cologne-project/network# cat chaincode-supply/supply/
lib/supply.js
/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * Add an object to the database: ctx.stub.putState(key, value)
 * Query an object from the database: ctx.stub.getState(key, value)
*/
'use strict';

const { Contract } = require('fabric-contract-api');

/*Data models
 * User{Name, User_ID, Email, User_Type, Address, Password}
 * BatchDates{ManufactureDate, OrderedDate, SendToDelivererDate, SendToRetailerDate}
 * Product{Product_ID, Name, Manufacturer_ID, Status, Date, Price, Quantity}
 * Batch{Batch_ID, Product_ID, Manufacturer_ID, Retailer_ID, Deliverer_ID, Status, Date, Quantity}
*/

class Supply extends Contract {



    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const products = [
            {
                productId: 'product0',
                name: 'Orange0',
                manufacturerId: 'manufacturer0',
                status: 'good',
                date: '20/10/2022',
                price: 10,
                quantity: 1000,
            },
        ];

        for (let i = 0; i < products.length; i++) {
            products[i].docType = 'product';
            await ctx.stub.putState('product' + i, Buffer.from(JSON.stringify(products[i])));
            console.info('Added <--> ', products[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async signIn(userId, password)
    {
        const userEntity = ctx.stub.getState(userId);
        if(!userEntity || userEntity.length === 0)
        {
            throw new Error(`${userId} does not exist`);
        }

        //need hash password before
        // if hashed(password) == password
        if(userEntity.password !== password)
        {
            throw new Error(`Wrong password provided`);
        }
        else{
            return userEntity;
        }
    }

    async queryProduct(ctx, productId) {
        const productAsBytes = await ctx.stub.getState(productId); // get the car from chaincode state
        if (!productAsBytes || productAsBytes.length === 0) {
            throw new Error(`${productId} does not exist`);
        }
        console.log(productAsBytes.toString());
        return productAsBytes.toString();
    }

    async createProduct (ctx, productId, name,  manufacturerId, date, price, quantity)
    {
        console.info('============= START : Create Product =============');

        const product = {
            productId,
            docType: 'product',
            name,
            manufacturerId,
            date,
            price,
            quantity,
        };
        await ctx.stub.putState(productId, Buffer.from(JSON.stringify(product)));
        console.info('===============END : Create Product==============');
    }

    async createUser(name, userId, email, userType, address, password)
    {
        console.info('============ START : Create User ================');

        const user = {
            name: name,
            docType: 'user',
            userId: userId,
            email: email,
            userType: userType,
            address: address,
            password: password,
        };

        await ctx.stub.putState(userId, Buffer.from(JSON.stringify(user)));
        console.info('================= END : Create User ===============');
    }

    async registerBatchOrder (ctx, productId, retailerId,  manufacturerId, quantity, batchDay)
    {
        console.info('=============== Start : Register Batch =================');

        const batch = {
            batchId:'batch0',//uuid generator (?)
            productId: productId,
            docType: 'batch',
            manufacturerId:manufacturerId,
            retailerId: retailerId,
            delivererId: '',
            status:'pending-registration',
            date: batchDay,
            quantity: quantity,
        };

        await ctx.stub.putState('batch0', Buffer.from(JSON.stringify(batch)));

        console.info('================= END : Batch Registration ==============');
    }

    async transferToDeliverer (ctx, batchId)
    {
        var batchAsBytes = await ctx.stub.getState(batchId);
        if (!batchAsBytes || batchAsBytes.length === 0) {
            throw new Error(`${batchId}} does not exist`);
        }

        batchAsBytes.status = 'transfered-to-deliverer';
        await ctx.stub.putState(batchId, batchAsBytes);
    }

    async delivererConfirmTransfer (ctx, batchId)
    {
        var batchAsBytes = await ctx.stub.getState(batchId);
        if (!batchAsBytes || batchAsBytes.length === 0) {
            throw new Error(`${batchId}} does not exist`);
        }

        batchAsBytes.status = 'deliverer-confirm-transfer';
        await ctx.stub.putState(batchId, batchAsBytes);
    }

    async retailerConfirmTransfer (ctx, batchId)
    {
        var batchAsBytes = await ctx.stub.getState(batchId);
        if (!batchAsBytes || batchAsBytes.length === 0) {
            throw new Error(`${batchId}} does not exist`);
        }

        batchAsBytes.status = 'retailer-confirm-transfer';
        await ctx.stub.putState(batchId, batchAsBytes);
    }
    async queryBatch(ctx, batchId)
    {
        const batchAsBytes = await ctx.stub.getState(batchId); // get the car from chaincode state
        if (!batchAsBytes || batchAsBytes.length === 0) {
            throw new Error(`${batchId} does not exist`);
        }
        console.log(batchAsBytes.toString());
        return batchAsBytes.toString();
    }
    async approveBatchOrder (ctx, batchId)
    {
        console.info('=============== Start : Approve Batch =================');
        const batch = await JSON.parse(await this.queryBatch(ctx,batchId));
        batch.status = 'approved';
        await ctx.stub.putState(batchId, Buffer.from(JSON.stringify(batch)));
        console.info('================= END : Batch Approval ==============');
    }
    async inviteDeliverer(ctx, batchId, delivererId)
    {
        console.info('=============== Start : Inviting deliverer =================');
        const batch = await JSON.parse(await this.queryBatch(ctx,batchId));
        batch.delivererId = delivererId;
        batch.status = 'pending-invite-to-deliverer'
        await ctx.stub.putState(batchId, Buffer.from(JSON.stringify(batch)));
        console.info('================= END : Inviting deliverer ==============');
    }
    async approveInvitation (ctx, batchId,action)
    {
        console.info('=============== Start : Approve Invitation =================');
        const batch = await JSON.parse(await this.queryBatch(ctx,batchId));
        if(action == 'approved')
        {
            batch.status = 'approve-invitation-by-deliverer';
            console.log('Invitation approved');
        }
        else
        {
            batch.status='reject-invitation-by-deliverer'
            console.log('Invitation rejected');
        }
        await ctx.stub.putState(batchId, Buffer.from(JSON.stringify(batch)));
        console.info('================= END : Approve Invitation ==============');
    }
    async transferToRetailer (ctx, retailerId, batchId)
    {
        console.info('=============== Start : Transfer to retailer =================');
        const batch = await JSON.parse(await this.queryBatch(ctx,batchId));
        batch.status = 'transfered-to-retailer';
        await ctx.stub.putState(batchId, Buffer.from(JSON.stringify(batch)));
        console.info('================= END : Transfer to retailer ==============');
    }
    async getAllBatches(ctx)
    {
        const allResults = [];
        for await (const { key, value } of ctx.stub.getStateByRange('', '')) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            if (record.docType == 'batch')
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }
}