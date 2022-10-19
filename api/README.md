# Food Supply Chain API documentation

## Operations

- [Authentication](#authentication)
- [Product Management](#product-management)
- [Batch Management](#batch-management)
- [Transaction](#transaction)

## Authentication

### User sign in

- Endpoint: `/user/signin`
- Method: Post
- Chaincode: `signIn`
- Params: role
- Body:

```json
{
    "id" : "user-id",
    "password" : "user-password",
}
```

- Response: user entity, access token

### Create user

- Endpoint: `/user/register`
- Method: Post
- Chaincode: `registerUser`
- Params: role
- Body:

```json
{
    name: "name",
    email: "email",
    userType: "role (manufacturer, deliverer, retailer)",
    address: "address",
    password: "password",
}
```

- Response: user entity

### Get all user

- Endpoint: `/user/all`
- Method: Get
- Chaincode: `queryUsers`
- Params: role
- Body: None
- Response: list user entity

### Get all users of a type

- Endpoint: `/user/:userType`
- Method: Get
- Chaincode: `queryUsers`
- Body: None
- Response: list user entity

## Product Management

### Get all products

- Endpoint: `/product`
- Method: Get
- Chaincode: `queryProducts`
- Params: role

### Create a new product

- Endpoint: `/product`
- Method: Post
- Chaincode: `createProduct`
- Params: role
- Body:

```json
{
    name: "name",
    price: 200000,
    quantity: 1000
}
```

## Batch Management

### Users can query all  of their current orders
- Enpoint: `/batch`
- Method: Get
- Chaincode: `queryBatches`
- Params: role
- Body:
  
```json
{
    "productID": "productOne",
    "manufacturerID": "manufacturerOne",
    "retailerID": "retailerOne",
    "delivererID": "delivererOne"
}
```

## Transaction

### Retailer creates a batch order
- Endpoint: `/batch`
- Method: Post
- Chaincode: `registerBatchOrder`
- Params: role
- Body:

```json
{
    "productID": "productOne",
    "manufacturerID": "manufacturerOne",
    "retailerID": "retailerOne",
    "quantity": 1000
}
```

### Manufacturer replies the order of the retailer
- Endpoint: `/transact/order`
- Method: Put
- Chaincode: `approveBatchOrder`
- Params: role
- Body:

```json
{
    "batchID": "batchOne",
    "manufacturerID": "manufacturerOne",
    "retailerID": "retailerID",
    "status": "acceptManu/declineManu"
}
```

### Manufacturer invites/adds the deliverer
- Endpoint: `/transact/invite`
- Method: Put
- Chaincode: `inviteDeliverer`
- Params: role
- Body:

```json
{
    "batchID": "batchOne",
    "manufacturerID": "manufacturerOne",
    "retailerID": "retailerOne",
    "delivererID": "delivererOne"
}
```

### Deliverer replies the invitation from the manufacturer
- Endpoint: `/transact/reply`
- Method: Put
- Chaincode: `approveInvitation`
- Params: role
- Body:

```json
{
    "batchID": "batchOne",
    "manufacturerID": "manufacturerOne",
    "retailerID": "retailerOne",
    "delivererID": "delivererOne",
    "status": "acceptDeli/declineDeli"
}
```

### Manufacturer transfers the batch to the deliverer
- Endpoint: `/transact/confirm`
- Method: Put
- Chaincode: `transferToDeliverer`
- Params: role
- Body:

```json
{
    "batchID": "batchOne",
    "manufacturerID": "manufacturerOne",
    "retailerID": "retailerOne",
    "delivererID": "delivererOne",
    "status": "unblock"
}
```

### Deliverer confirms that the batch has been received
- Endpoint: `/transact/receive`
- Method: Put
- Chaincode: `delivererConfirmTransfer`
- Params: role
- Body:

```json
{
    "batchID": "batchOne",
    "manufacturerID": "manufacturerOne",
    "retailerID": "retailerOne",
    "delivererID": "delivererOne",
    "status": "delivering"
}
```

### Deliverer transfers the batch to the retailer
- Endpoint: `/transact/arrive`
- Method: Put
- Chaincode: `transferToRetailer`
- Params: role
- Body:
```json
{
    "batchID": "batchOne",
    "manufacturerID": "manufacturerOne",
    "retailerID": "retailerOne",
    "delivererID": "delivererOne",
    "status": "delivered"
}
```

### Retailer confirms that the batch has been received
- Endpoint: `/transact/done`
- Method: Put
- Chaincode: `retailerConfirmTransfer`
- Params: role
- Body:
```json
{
    "batchID": "batchOne",
    "manufacturerID": "manufacturerOne",
    "retailerID": "retailerOne",
    "delivererID": "delivererOne",
    "status": "done"
}
```