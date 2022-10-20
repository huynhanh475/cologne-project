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

    static batchCounter = 0;
    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const products = [
            {
                product_ID: 'product0',
                name: 'Orange0',
                manufacturer_ID: 'manufacturer0',
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

    async queryProduct(ctx, product_ID) {
        const productAsBytes = await ctx.stub.getState(product_ID); // get the car from chaincode state
        if (!productAsBytes || productAsBytes.length === 0) {
            throw new Error(`${product_ID} does not exist`);
        }
        console.log(productAsBytes.toString());
        return productAsBytes.toString();
    }

    async createProduct (ctx, product_ID, name,  manufacturer_ID, date, price, quantity)
    {
        console.info('============= START : Create Product =============');

        const product = {
            product_ID,
            docType: 'product',
            name, 
            manufacturer_ID,
            date, 
            price,
            quantity,
        };

        await ctx.stub.putState(product_ID, Buffer.from(JSON.stringify(product)));
        console.info('===============END : Create Product==============');
    }

    async createUser(name, user_ID, email, user_Type, address, password)
    {
        console.info('============ START : Create User ================');

        const user = {
            name: name,
            docType: 'user',
            user_ID: user_ID,
            email: email,
            user_Type: user_Type,
            address: address,
            password: password,
        };

        await ctx.stub.putState(user_ID, Buffer.from(JSON.stringify(user)));
        console.info('================= END : Create User ===============');
    }


    async registerBatchOrder (ctx, productId, retailerId,  manufacturerId, quantity, batchDay,)
    {
        console.info('=============== Start : Register Batch =================');

        const batch = {
            batchId:'batch' + batchCounter,
            productId: productId,
            manufacturerId:manufacturerId,
            retailerId: retailerId,
            delivererId: '',
            status:'pending-registration',
            date: batchDay,
            quantity: quantity,
        };

        await ctx.stub.putState('batch' + batchCounter, Buffer.from(JSON.stringify(batch)));
        console.info('================= END : Batch Registration ==============');
    }


/*
    async createCar(ctx, carNumber, make, model, color, owner) {
        console.info('============= START : Create Car ===========');

        const car = {
            color,
            docType: 'car',
            make,
            model,
            owner,
        };

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : Create Car ===========');
    }

    async queryAllCars(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async changeCarOwner(ctx, carNumber, newOwner) {
        console.info('============= START : changeCarOwner ===========');

        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.owner = newOwner;

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarOwner ===========');
    }
*/
/*
    async createProduct (ctx,product_ID, name,  manufacturer_ID, date, price, quantity)
    async registerBatchOrder (ctx,product_ID, name,  manufacturer_ID, quantity, BatchDay,) 
    async approveBatchOrder (ctx,Batch_ID,Retailer_ID )
    async inviteDeliverer (ctx,manufacturer_ID, Deliverer_ID )
    async approveInvitation (ctx, Deliverer_ID,manufacturer_ID)
    async transferToDeliverer (ctx, manufacturer_ID,Batch_ID)
    async delivererConfirmTransfer (ctx, Deliverer_ID,Batch_ID)
    async transferToRetailer (ctx, Retailer_ID, Batch_ID)
    async retailerConfirmTransfer (ctx, Retailer_ID, Batch_ID)
*/

}

module.exports = Supply;
