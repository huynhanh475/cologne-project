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
 * 
*/

class Supply extends Contract {

    batchCounter = 0;
    productCounter = 0;
    userCounter = 0;

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

    async signIn(ctx, userId, password)
    {
        const userEntity = await ctx.stub.getState(userId);
        if(!userEntity || userEntity.length === 0)
        {
            throw new Error(`${userId} does not exist`);
        }

        //need hash password before
        // if hashed(password) == password
        const userJson = await JSON.parse(await userEntity.toString());
        if(userJson.password !== password)
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

    async createProduct (ctx, name,  manufacturerId, date, price, quantity)
    {
        console.info('============= START : Create Product =============');

        const product = {
            productId = 'product' + this.productCounter,
            docType: 'product',
            name,
            manufacturerId,
            date,
            price,
            quantity,
        };

	const productAsBytes = await Buffer.from(JSON.stringify(product));
        await ctx.stub.putState('product' + this.productCounter, productAsBytes);
        this.productCounter++;
        console.info('===============END : Create Product==============');
	return productAsBytes;
    }

    async createUser(ctx, name, email, userType, address, password)
    {
        console.info('============ START : Create User ================');

        const user = {
            name: name,
            docType: 'user',
            userId: 'user' + this.userCounter,
            email: email,
            userType: userType,
            address: address,
            password: password,
        };
        const userAsBytes = await Buffer.from(JSON.stringify(user));
        await ctx.stub.putState('user' + this.userCounter, userAsBytes);
        this.userCounter++;
        console.info('================= END : Create User ===============');
        return userAsBytes;
    }

    async queryUser(ctx, userId)
    {
        const userAsBytes = await ctx.stub.getState(userId);
        if(!userAsBytes || userAsBytes.length === 0)
        {
            throw new Error(`${userId} does not exist`);
        }
        console.log(userAsBytes.toString());
        return userAsBytes.toString();
    }

    async queryAllUser(ctx)
    {
	const users = [];
        for(let i=0; i<this.userCounter; i++)
	{
	    const userAsBytes = await ctx.stub.getState('user' + i);
            if(!userAsBytes || userAsBytes.length ===0)
	    {
		throw new Error(`No user registered`);
	    }
	    await users.push(userAsBytes);
	}
        return users;
    }
    async registerBatchOrder (ctx, productId, retailerId,  manufacturerId, quantity, batchDay)
    {
        console.info('=============== Start : Register Batch =================');

        const batch = {
            batchId:'batch' + this.batchCounter,//uuid generator (?)
            productId: productId,
            manufacturerId:manufacturerId,
            retailerId: retailerId,
            delivererId: '',
            status:'pending-registration',
            date: batchDay,
            quantity: quantity,
        };

        const batchAsBytes = await Buffer.from(JSON.stringify(batch));
        await ctx.stub.putState('batch' + this.batchCounter, batchAsBytes);
        this.batchCounter++;
        console.info('================= END : Batch Registration ==============');
	return batchAsBytes;
    }


/*
    async registerBatchOrder (ctx, productId, retailerId,  manufacturerId, quantity, batchDay)
    {
        console.info('=============== Start : Register Batch =================');

        const batch = {
            batchId:'batch' + 0,//uuid generator (?)
            productId: productId,
            manufacturerId:manufacturerId,
            retailerId: retailerId,
            delivererId: '',
            status:'pending-registration',
            date: batchDay,
            quantity: quantity,
        };

        await ctx.stub.putState('batch' + 0, Buffer.from(JSON.stringify(batch)));
        console.info('================= END : Batch Registration ==============');
    }
*/
    async transferToDeliverer (ctx, batchId)
    {
        var batchAsBytes = await ctx.stub.getState(batchId);
        if (!batchAsBytes || batchAsBytes.length === 0) {
            throw new Error(`${batchId}} does not exist`);
        }

        const batchAsJson = await JSON.parse( await batchAsBytes.toString())
        batchAsJson.status = 'transfered-to-deliverer';
        await ctx.stub.putState(batchId, Buffer.from(JSON.stringify(batchAsJson)));
    }

    async delivererConfirmTransfer (ctx, batchId)
    {
        var batchAsBytes = await ctx.stub.getState(batchId);
        if (!batchAsBytes || batchAsBytes.length === 0) {
            throw new Error(`${batchId}} does not exist`);
        }

        const batchAsJson = await JSON.parse( await batchAsBytes.toString())
        batchAsJson.status = 'deliverer-confirm-transfer';
        await ctx.stub.putState(batchId, Buffer.from(JSON.stringify(batchAsJson)));
    }

    async retailerConfirmTransfer (ctx, batchId)
    {
        var batchAsBytes = await ctx.stub.getState(batchId);
        if (!batchAsBytes || batchAsBytes.length === 0) {
            throw new Error(`${batchId}} does not exist`);
        }

        const batchAsJson = await JSON.parse( await batchAsBytes.toString())
        batchAsJson.status = 'retailer-confirm-transfer';
        await ctx.stub.putState(batchId, Buffer.from(JSON.stringify(batchAsJson)));
    }


    async queryBatch(ctx, batchId)
    {
        var batchAsBytes = await ctx.stub.getState(batchId);
        if (!batchAsBytes || batchAsBytes.length === 0) {
            throw new Error(`${batchId}} does not exist`);
        }
        console.log(batchAsBytes.toString());
        return batchAsBytes.toString();
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
