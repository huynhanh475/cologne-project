<<<<<<< HEAD
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
=======
# This is network
# How to run network:
./startNetwork.sh
# How to bring down network
./networkDown.sh
# How to bring down network
>>>>>>> 9bd88c2020a85c487a8f377448ca102c96e250d1

