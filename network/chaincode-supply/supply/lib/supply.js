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
                name: 'Manufacturer Admin',
                userId: 'admin1',
                email: 'admin@org1.com',
                userType: 'manufacturer',
                role:'admin',
                address: 'Cologne',
                password: 'adminpw',
            },
            {
                name: 'Deliverer Admin',
                userId: 'admin2',
                email: 'admin@org2.com',
                userType: 'deliverer',
                role: 'admin',
                address: 'Berlin',
                password: 'adminpw',
            },
            {
                name: 'Retailer Admin',
                userId: 'admin3',
                email: 'admin@org3.com',
                userType: 'retailer',
                role: 'admin',
                address: 'Munich',
                password: 'adminpw',
            },
            {
                name: 'retailerAdmin',
                userId: 'admin3',
                email: '',
                userType: 'retailer',
                role: 'admin',
                address: '',
                password: 'adminpw',
            },
        ];

        var counter = 
         {
            batchCounter: 0,
            userCounter: 0,
            productCounter: 0,
         };
        for (let i = 0; i < admins.length; i++) {
            admins[i].docType = 'user';
            await ctx.stub.putState('admin' + (i + 1), Buffer.from(JSON.stringify(admins[i])));
            console.info('Added <--> ', admins[i]);
        }

        await ctx.stub.putState('counters', Buffer.from(JSON.stringify(counter)));
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

        const currentCounter = await this.getCounterForRegister(ctx, 'product');

        const product = {
            productId : 'product' + currentCounter,
            docType: 'product',
            name:name,
            manufacturerId: manufacturerId,
            date: await this.getCurrentDate(),
            price:price,
            quantity: quantity,
            status : 'healthy',
            markedFaultBy: '',
        };
        

	    const productAsBytes = await Buffer.from(JSON.stringify(product));
        await ctx.stub.putState('product' + currentCounter, productAsBytes);

        console.info('===============END : Create Product==============');
	    return shim.success(productAsBytes.toString());
    }

    async createUser(ctx, name, email, userType, address, password)
    {
        console.info('============ START : Create User ================');

        const currentCounter =await this.getCounterForRegister(ctx, 'user');

        const user = {
            name: name,
            docType: 'user',
            userId: 'user-' + currentCounter,
            email: email,
            userType: userType,
            role: 'client',
            address: address,
            password: password,
        };

        const userAsBytes = await Buffer.from(JSON.stringify(user));
        await ctx.stub.putState('user-' + currentCounter, userAsBytes);

        console.info('================= END : Create User ===============');
        return shim.success(JSON.stringify(user));
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
    
    const userCounter = await this.getCounter(ctx, 'user');
    //console.log(this.userCounter);
    for(let i=0; i<userCounter; i++)
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

    async queryAllProduct(ctx, manufacturerId)
    {
        let filterFunc;
        if (!manufacturerId) {
            filterFunc = (product) => (product.status !== "fault" && product.quantity != 0);
        } else filterFunc = (product) => (product.manufacturerId === manufacturerId);

        const products = [];
        const productCounter = await this.getCounter(ctx, 'product');

        for(let i=0; i < productCounter; i++) {
            const productAsBytes = await ctx.stub.getState('product' + i);
            // return error if product not exist
            if (!productAsBytes || productAsBytes.length === 0) {
                return shim.error(`${'product' + i} does not exist`);
            }
            // check if product satisfy filter
            const productAsJson = await JSON.parse(productAsBytes.toString());
            if (filterFunc(productAsJson)) {
                products.push(productAsBytes);
            }
        }
        
        return shim.success(`[${products.toString()}]`);
    }

    //modify this to make sure fault product can not be ordered
    //BatchDates will be created after the batch order is approved
    async registerBatchOrder (ctx, productId, retailerId, quantity)
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

        const remainingQuantity = parseInt(productAsJson.quantity);
        if(remainingQuantity === 0 || remainingQuantity < parseInt(quantity))
        {
            return shim.error(`Not enough quantity`);
        }

        const currentCounter = await this.getCounterForRegister(ctx, 'batch');

        const batch = {
            batchId:'batch' + currentCounter,//uuid generator (?)
            productId: productId,
            docType: 'batch',
            manufacturerId: productAsJson.manufacturerId,
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
        await ctx.stub.putState('batch' + currentCounter, batchAsBytes);
        //await ctx.stub.putState('batchDates' + this.batchCounter, Buffer.from(JSON.stringify(batchDates)));
        console.info('================= END : Batch Registration ==============');
	    return shim.success(batchAsBytes.toString());
    }

    //Function to mark batch status = 'fault'
    async markBatchFault(ctx, batchId, markedBy)
    {
        const batchAsBytes = await ctx.stub.getState(batchId);
        if(!batchAsBytes || batchAsBytes.length === 0)
        {
            return shim.error(`${batchId} does not exist`);
        }

        const batchAsJson = await JSON.parse(await batchAsBytes.toString());

        //mark fault
        batchAsJson.status = 'fault';
        batchAsJson.date.markedFaultDate = await this.getCurrentDate();
        batchAsJson.markedFaultBy = markedBy;

        await ctx.stub.putState(batchId, Buffer.from(JSON.stringify(batchAsJson)));
        return shim.success(JSON.stringify(batchAsJson));
    }

    //Function to change status of batch, for testing only, remove in official version
    async markStatus(ctx, batchId, status)
    {
        const batchAsBytes = await ctx.stub.getState(batchId);
        if(!batchAsBytes || batchAsBytes.length === 0)
        {
            return shim.error(`${batchId} does not exist`);
        }

        const batchAsJson = await JSON.parse(await batchAsBytes.toString());

        //mark fault


        batchAsJson.status = status;

        await ctx.stub.putState(batchId, Buffer.from(JSON.stringify(batchAsJson)));
        return shim.success(JSON.stringify(batchAsJson));
    }

    //Function to update batch status = 'transferred-to-deliverer'
    async transferToDeliverer (ctx, batchId)
    {
        const batchAsBytes = await ctx.stub.getState(batchId);
        if (!batchAsBytes || batchAsBytes.length === 0) {
            return shim.error(`${batchId}} does not exist`);
        }
    
        const batchAsJson = await JSON.parse( await batchAsBytes.toString());
        if(batchAsJson.status === 'approve-invitation-by-deliverer')
        {
            batchAsJson.status = 'transferred-to-deliverer';
            batchAsJson.date.sendToDelivererDate = await this.getCurrentDate();
        }
        else
        {
            return shim.error(`Unable to deliver ${batchId} to deliverer`);
        }

        await ctx.stub.putState(batchId, Buffer.from(JSON.stringify(batchAsJson)));
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

    async getCounterForRegister(ctx, counterType)
    {
        var countersAsBytes = await ctx.stub.getState('counters');
        var counterAsJson  = await JSON.parse(await countersAsBytes.toString());
        let currentCounter = 0;

        if(counterType === 'user')
        {
            currentCounter = parseInt(counterAsJson.userCounter);
            counterAsJson.userCounter =  currentCounter + 1;
        }
        else if(counterType === 'batch')
        {
            currentCounter = parseInt(counterAsJson.batchCounter);
            counterAsJson.batchCounter =  currentCounter + 1;
        }
        else if(counterType === 'product')
        {
            currentCounter = parseInt(counterAsJson.productCounter);
            counterAsJson.productCounter =  currentCounter + 1;
        }

        await ctx.stub.putState('counters', Buffer.from(JSON.stringify(counterAsJson)));
        return currentCounter;
    }

    async getCounter(ctx, counterType)
    {
        var countersAsBytes = await ctx.stub.getState('counters');
        var counterAsJson  = await JSON.parse(await countersAsBytes.toString());
        let currentCounter = 0;

        if(counterType === 'user')
        {
            currentCounter = parseInt(counterAsJson.userCounter);
        }
        else if(counterType === 'batch')
        {
            currentCounter = parseInt(counterAsJson.batchCounter);
        }
        else if(counterType === 'product')
        {
            currentCounter = parseInt(counterAsJson.productCounter);
        }

        return currentCounter;
    }


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
    
    //====== END ============================================================================

    //Function to update the status of batch to 'deliverer-confirm-transfer'
    async delivererConfirmTransfer (ctx, batchId)
    {
        var batchAsBytes = await ctx.stub.getState(batchId);
        if (!batchAsBytes || batchAsBytes.length === 0) {
            return shim.error(`${batchId}} does not exist`);
        }

        const batchAsJson = await JSON.parse( await batchAsBytes.toString());
        if(batchAsJson.status === 'transferred-to-deliverer')
        {
            batchAsJson.status = 'deliverer-confirm-transfer';
        }
        else
        {
            return shim.error(`Unable to confirm ${batchId}`)
        }

        await ctx.stub.putState(batchId, Buffer.from(JSON.stringify(batchAsJson)));
        
        //batchAsBytes =await Buffer.from(JSON.stringify(batchAsJson));
        return shim.success(JSON.stringify(batchAsJson));
    }

    //Function to update the status of batch to 'retailer-confirm-transfer'
    async retailerConfirmTransfer (ctx, batchId)
    {
        var batchAsBytes = await ctx.stub.getState(batchId);
        if (!batchAsBytes || batchAsBytes.length === 0) {
            return shim.error(`${batchId}} does not exist`);
        }

        const batchAsJson = await JSON.parse( await batchAsBytes.toString());
        if(batchAsJson.status === 'transferred-to-retailer')
        {
            batchAsJson.status = 'retailer-confirm-transfer';
        }
        else
        {
            return shim.error(`Unable to confirm ${batchId}`)
        }

        await ctx.stub.putState(batchId, Buffer.from(JSON.stringify(batchAsJson)));
        
        //batchAsBytes =await Buffer.from(JSON.stringify(batchAsJson));
        return shim.success(JSON.stringify(batchAsJson));
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

    //========================================================= Chuong's Chaincode (for review and debug) =====================================================================

    async approveBatchOrder (ctx, batchId, userID)
    {
        console.info('=============== Start : Approve Batch =================');
        const batch = await JSON.parse(await (await this.queryBatch(ctx,batchId)).payload);
        if (!batch || batch.length === 0) {
            return shim.error(`${batchId}} does not exist`);
        }
        if (batch.manufacturerId!==userID)
            return shim.error("Wrong manufacturer");
        if (batch.status!=='pending-registration')
            return shim.error('Batch is not registered');
        batch.status = 'approved';
        await ctx.stub.putState(batchId, Buffer.from(JSON.stringify(batch)));
        const product= await JSON.parse(await (await this.queryProduct(ctx,batch.productId)).payload);
        product.quantity-=batch.quantity;
        await ctx.stub.putState(batch.productId, Buffer.from(JSON.stringify(product)));
        console.info('================= END : Batch Approval ==============');
        return shim.success(JSON.stringify(batch));
    }
    
    async inviteDeliverer(ctx, batchId, delivererId, userID)
    {
        console.info('=============== Start : Inviting deliverer =================');
        const batch = await JSON.parse(await (await this.queryBatch(ctx,batchId)).payload);
        if (!batch || batch.length === 0) {
            return shim.error(`${batchId}} does not exist`);
        }
        if (batch.status!=='approved')
            return shim.error('Batch is not approved');
        if (batch.manufacturerId!==userID)
            return shim.error("Wrong manufacturer");
        batch.delivererId = delivererId;
        batch.status = 'pending-invite-to-deliverer'
        await ctx.stub.putState(batchId, Buffer.from(JSON.stringify(batch)));
        console.info('================= END : Inviting deliverer ==============');
        return shim.success(JSON.stringify(batch));
    }

    async approveInvitation (ctx, batchId,action, userID)
    {
        console.info('=============== Start : Approve Invitation =================');
        const batch = await JSON.parse(await (await this.queryBatch(ctx,batchId)).payload);
        if (!batch || batch.length === 0) {
            return shim.error(`${batchId}} does not exist`);
        }
        if (batch.status!=='pending-invite-to-deliverer')
            return shim.error('Deliverer is not invited');
        if (batch.delivererId!==userID)
            return shim.error("Wrong deliverer");
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
        return shim.success(JSON.stringify(batch));    
    }

    async transferToRetailer (ctx, batchId,userID)
    {
        console.info('=============== Start : Transfer to retailer =================');
        const batch = await JSON.parse(await (await this.queryBatch(ctx,batchId)).payload);
        if (!batch || batch.length === 0) {
            return shim.error(`${batchId}} does not exist`);
        }
        if (batch.status!=='deliverer-confirm-transfer')
            return shim.error('Batch is not confirmed by retailer');
        if (batch.delivererId!==userID) 
            return shim.error('Wrong deliverer');
        batch.status = 'transferred-to-retailer';
        batch.date.sendToRetailerDate=await this.getCurrentDate();
        await ctx.stub.putState(batchId, Buffer.from(JSON.stringify(batch)));

        //batch.sendToRetailerDate = this.getCurrentDate();
        //await ctx.stub.putState(batchDateID, Buffer.from(JSON.stringify(batchDates)));
        console.info('================= END : Transfer to retailer ==============');
        return shim.success(JSON.stringify(batch));
    }
    async getAllBatches(ctx,userID='all')
    {
        const allResults = [];
        for await (const { key, value } of ctx.stub.getStateByRange('', '')) {
            const elem=Buffer.from(value);
            const strValue = elem.toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            var flag = false;
            if (userID=='all')
                flag=true;
            else{
                const user= await JSON.parse(await (await this.queryUser(ctx,userID)).payload);
                if (user.userType=='deliverer'&&record.delivererId==userID)
                    flag=true;
                if (user.userType=='retailer'&&record.retailerId==userID)
                    flag=true;
                if (user.userType=='manufacturer'&&record.manufacturerId==userID)
                    flag=true;
            }
            if (record.docType == 'batch'&&flag)
                allResults.push(elem);
        }
        console.info(allResults);
        return shim.success(`[${allResults.toString()}]`);
        // return JSON.stringify(allResults);
    }

    async reportFaultBatch(ctx, batchId, userID)
    {
        const batch = await JSON.parse(await (await this.queryBatch(ctx,batchId)).payload);
        if (!batch || batch.length === 0) {
            return shim.error(`${batchId}} does not exist`);
        }
        // batch.status = 'fault';
        // batch.markedFaultBy = userID;
        // await ctx.stub.putState(batchId, Buffer.from(JSON.stringify(batch)));
        const product = await JSON.parse(await (await this.queryProduct(ctx,batch.productId)).payload);
        product.status = 'fault';
        product.markedFaultBy = userID;
        await ctx.stub.putState(batch.productId, Buffer.from(JSON.stringify(product)));
        const allResults=JSON.parse(JSON.parse(this.getAllBatches(ctx)).payload);
        for (let i in allResults)
        {
            if(allResults[i].productId == batch.productId)
            {
                allResults[i].status = 'fault';
                allResults[i].markedFaultBy = userID;
                await ctx.stub.putState(allResults[i].batchId, Buffer.from(JSON.stringify(allResults[i])));
            }
        }
        console.info('================= END : Report Fault ==============');
        return shim.success(JSON.stringify(batch));
    }

    async queryFaultBatches(ctx)
    {
        const allResults = [];
        for await (const { key, value } of ctx.stub.getStateByRange('', '')) {
            const elem = Buffer.from(value);
            const strValue = elem.toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            if (record.docType == 'batch' && record.status == 'fault')
            allResults.push(elem);
        }
        console.info(allResults);
        return shim.success(`[${allResults.toString()}]`);
        // return JSON.stringify(allResults);
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
