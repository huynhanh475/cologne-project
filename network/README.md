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
- Params: batchID, manufacturerID
  
## Invite Deliver
- Method: inviteDeliver
- Params: manufacturerID, delivererID, batchID

## Approve Invitation
- Method: approveInvitation
- Params: manufacturerID, delivererID, batchID
# Setup the network (go to network folder)
## Start network: 
- ./startNetwork.sh
## Stop network
-  ./networkDown.sh

