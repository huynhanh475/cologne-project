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
const shim = require('fabric-shim');

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
        const admins = [
            {
                name: 'manufacturerAdmin',
                userId: 'admin0',
                email: '',
                userType: 'manufacturer',
                role:'admin',
                address: '',
                password: 'adminpw',
            },
            {
                name: 'retailerAdmin',
                userId: 'admin1',
                email: '',
                userType: 'retailer',
                role: 'admin',
                address: '',
                password: 'adminpw',
            },
            {
                name: 'delivererAdmin',
                userId: 'admin2',
                email: '',
                userType: 'deliverer',
                role: 'admin',
                address: '',
                password: 'adminpw',
            },
        ];

        for (let i = 0; i < admins.length; i++) {
            admins[i].docType = 'user';
            await ctx.stub.putState('admin' + i, Buffer.from(JSON.stringify(admins[i])));
            console.info('Added <--> ', admins[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async signIn(ctx, userId, password)
    {
        const userEntity = await ctx.stub.getState(userId);
        if(!userEntity || userEntity.length === 0)
        {
            return shim.error(`${userId} does not exist`);
        }

        //need hash password before
        // if hashed(password) == password
        const userJson = await JSON.parse(await userEntity.toString());
        if(userJson.password !== password)
        {
            return shim.error(`Wrong Password Provided`);
        }
        else{
            return shim.success(userEntity.toString());
        }
    }

    async queryProduct(ctx, productId) {
        const productAsBytes = await ctx.stub.getState(productId); // get the car from chaincode state
        if (!productAsBytes || productAsBytes.length === 0) {
            return shim.error(`${productId} does not exist`);
        }
        console.log(productAsBytes.toString());
        return shim.success(productAsBytes.toString());
    }

    async createProduct (ctx, name,  manufacturerId, price, quantity)
    {
        console.info('============= START : Create Product =============');

        const product = {
            productId : 'product' + this.productCounter,
            docType: 'product',
            name,
            manufacturerId,
            date: await this.getCurrentDate(),
            price,
            quantity,
            status : 'healthy',
            markedFaultBy: '',
        };

	    const productAsBytes = await Buffer.from(JSON.stringify(product));
        await ctx.stub.putState('product' + this.productCounter, productAsBytes);
        this.productCounter++;
        console.info('===============END : Create Product==============');
	    return shim.success(productAsBytes.toString());
    }

    async createUser(ctx, name, email, userType, address, password)
    {
        console.info('============ START : Create User ================');

        const user = {
            name: name,
            docType: 'user',
            userId: 'user-' + this.userCounter,
            email: email,
            userType: userType,
            role: 'client',
            address: address,
            password: password,
        };
        const userAsBytes = await Buffer.from(JSON.stringify(user));
        await ctx.stub.putState('user-' + this.userCounter, userAsBytes);
        this.userCounter++;
        console.info('================= END : Create User ===============');
        return shim.success(userAsBytes.toString());
    }

    async queryUser(ctx, userId)
    {
        const userAsBytes = await ctx.stub.getState(userId);
        if(!userAsBytes || userAsBytes.length === 0)
        {
            return shim.error(`${userId} does not exist`);
        }
        console.log(userAsBytes.toString());
        return shim.success(userAsBytes.toString());
    }

    async queryAllUser(ctx)
    {
	const users = [];
    for(let i=0; i<this.userCounter; i++)
	{
	    const userAsBytes = await ctx.stub.getState('user-' + i);
        if(!userAsBytes || userAsBytes.length ===0)
        {
            return shim.error(`${'user-' + i} does not exist`);
        }
        users.push(userAsBytes);
	}
    return shim.success(`[${users.toString()}]`);

    }

    //modify this to make sure fault product can not be ordered
    //BatchDates will be created after the batch order is approved
    async registerBatchOrder (ctx, productId, retailerId,  manufacturerId, quantity)
    {
        console.info('=============== Start : Register Batch =================');

        const productAsBytes = await ctx.stub.getState(productId);
        if(!productAsBytes || productAsBytes.length ===0)
        {
            return shim.error(`Product ${productId} does not exist`);
        }
        const productAsJson = await JSON.parse(productAsBytes.toString());
        if(productAsJson.status === 'fault')
        {
            return shim.error(`Product ${productId} could not be ordered as it is fault`);
        }
        const batch = {
            batchId:'batch' + this.batchCounter,//uuid generator (?)
            productId: productId,
            manufacturerId:manufacturerId,
            retailerId: retailerId,
            delivererId: '',
            status:'pending-registration',
            markedFaultBy: '',
            date: {
                orderedDate:await this.getCurrentDate(),
                sendToDelivererDate: '',
                sendToRetailerDate: '',
                markedFaultDate: '',
            },
            quantity: quantity,
        };


        const batchAsBytes = await Buffer.from(JSON.stringify(batch));
        await ctx.stub.putState('batch' + this.batchCounter, batchAsBytes);
        //await ctx.stub.putState('batchDates' + this.batchCounter, Buffer.from(JSON.stringify(batchDates)));
        this.batchCounter++;
        console.info('================= END : Batch Registration ==============');
	    return shim.success(batchAsBytes.toString());
    }

    async transferToDeliverer (ctx, batchId)
    {
        const batchAsBytes = await ctx.stub.getState(batchId);
        if (!batchAsBytes || batchAsBytes.length === 0) {
            return shim.error(`${batchId}} does not exist`);
        }
    
        const batchAsJson = await JSON.parse( await batchAsBytes.toString());
        batchAsJson.status = 'transfered-to-deliverer';
        await ctx.stub.putState(batchId, Buffer.from(JSON.stringify(batchAsJson)));

        //batchAsBytes =await Buffer.from(JSON.stringify(batchAsJson));
        return shim.success(JSON.stringify(batchAsJson));    
    }

    //Utils function for updating batch=====================================================
    async getCurrentDate()
    {
        let ts = Date.now();

        let date_ob = new Date(ts);
        let date = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();

        // prints date & time in YYYY-MM-DD format
        return (year + "-" + month + "-" + date);
    }
/*
    async getBatchDatesId(batchId)
    {
        //interpolate batch dates id
        var batchDatesId = 'batchDates';
        for(let i=5; i< batchId.length; i++)
        {
            batchDatesId = await batchDatesId + batchId[i];
        }
        return batchDatesId;
    }
    */
    //====== END ============================================================================

    async delivererConfirmTransfer (ctx, batchId)
    {
        var batchAsBytes = await ctx.stub.getState(batchId);
        if (!batchAsBytes || batchAsBytes.length === 0) {
            return shim.error(`${batchId}} does not exist`);
        }

        const batchAsJson = await JSON.parse( await batchAsBytes.toString());
        batchAsJson.status = 'deliverer-confirm-transfer';
        await ctx.stub.putState(batchId, Buffer.from(JSON.stringify(batchAsJson)));
        
        //batchAsBytes =await Buffer.from(JSON.stringify(batchAsJson));
        return shim.success(JSON.stringify(batchAsJson));
        /*
        //interpolate batch dates id
        var batchDatesId = 'batchDates';
        for(let i=5; i< batchId.length; i++)
        {
            batchDatesId+= batchId[i];
        }
        */
        //update batchdates
        /* 
        const batchDatesId = this.getBatchDatesId(batchId);
        const batchDatesAsBytes = await ctx.stub.getState(batchDatesId);
        if (!batchDatesAsBytes || batchDatesAsBytes.length === 0) {
            throw new Error(`${batchDatesId}} does not exist`);
        }

        const batchDatesAsJson = await JSON.parse(await batchDatesAsBytes.toString());
        batchDatesAsJson.sendToDelivererDate = this.getCurrentDate();
        await ctx.stub.putState(batchDatesId, Buffer.from(JSON.stringify(batchDatesAsJson)));
        */
    }

    async retailerConfirmTransfer (ctx, batchId)
    {
        var batchAsBytes = await ctx.stub.getState(batchId);
        if (!batchAsBytes || batchAsBytes.length === 0) {
            return shim.error(`${batchId}} does not exist`);
        }

        const batchAsJson = await JSON.parse( await batchAsBytes.toString());
        batchAsJson.status = 'retailer-confirm-transfer';
        await ctx.stub.putState(batchId, Buffer.from(JSON.stringify(batchAsJson)));

        //batchAsBytes =await Buffer.from(JSON.stringify(batchAsJson));
        return shim.success(JSON.stringify(batchAsJson));
        //update batch dates
        /*
        const batchDatesId = this.getBatchDatesId(batchId);
        const batchDatesAsBytes = await ctx.stub.getState(batchDatesId);
        if (!batchDatesAsBytes || batchDatesAsBytes.length === 0) {
            throw new Error(`${batchDatesId}} does not exist`);
        }

        const batchDatesAsJson = await JSON.parse(await batchDatesAsBytes.toString());
        batchDatesAsJson.sendToRetailerDate = this.getCurrentDate();
        await ctx.stub.putState(batchDatesId, Buffer.from(JSON.stringify(batchDatesAsJson)));
        */
    }


    async queryBatch(ctx, batchId)
    {
        var batchAsBytes = await ctx.stub.getState(batchId);
        if (!batchAsBytes || batchAsBytes.length === 0) {
            return shim.error(`${batchId}} does not exist`);
        }
        console.log(batchAsBytes.toString());
        return shim.success(batchAsBytes.toString());
    }

    
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
