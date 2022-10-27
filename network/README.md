# Chaincodes

## Create Product
- Method: createProduct
- Params: productID, productName,  manufacturerID, date, price, quantity 
## Query Product
- Method: queryProduct
- Params: productID

## Create User
- Method: createUser
- Params: userName, userID, email, userType, address, password
## Register batch order
- Method: registerBatchOrder
- Params: productID, retailerID, manufacturerID, quantity, date
## Approve Batch Order
- Method: approveBatchOrder 
- Params: batchID
  
## Invite Deliver
- Method: inviteDeliver
- Params: manufacturerID, delivererID, batchID

## Approve Invitation
- Method: approveInvitation
- Params: batchID, action

## Transfer to Deliverer
- Method: transferToDeliverer
- Params: batchID
## Deliverer confirm transfer
- Method: delivererConfirmTransfer
- Params: batchID
## Transfer to Retailer
- Method: transferToRetailer
- Params: retailerID, batchID


## Retailer confirm Transfer
- Method: retailerConfirmTransfer
- Params: batchID

## reportFaultBatch(batchID, userID)
# Setup the network (go to network folder)
## Start network: 
- ./startNetwork.sh
## Stop network
-  ./networkDown.sh

