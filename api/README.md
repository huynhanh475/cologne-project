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

### Create a batch order
- Endpoint: `\batch`
- Method: Post
- Chaincode: `registerBatchOrder`
- Params: role
- Body:

```json
{
    "productID": "productOne",
    "manufacturerID": "manufacturerOne",
    "retailerID": "retailerOne",
    "date": 
    {
        "manufacturedDate": "2022-10-15",
        "orderedDate": "2022-10-18",
    },
    "quantity": 1000
}
```

### Update a batch order
- Endpoint: `\batch`
- Method: Put
- Chaincode: `updateBatchOrder`
- Params: role
- Body:

```json
{
    "productID": "productOne",
    "batchID": "batchOne",
    "manufacturerID": "manufacturerOne",
    "delivererID": "delivererOne",
    "retailerID": "retailerOne",
    "date":
    {
        "orderedDate": "2022-10-18",
        "toDelivererDate": "2022-10-19",
        "toRetailerDate": "2022-10-20",
        "deliveredDate": "2022-10-21"
    },
    "status": "good/bad",
}
```

### Query all batch orders
- Enpoint: `\batch`
- Method: Get
- Chaincode: `queryBatches`
- Params: role
- Body:
  
```json
{
    "batchID": "batchOne",
    "productID": "productOne",
    "retailerID": "retailerOne",
    "delivererID": "delivererOne"
}
```

## Transaction

### Transact the batch
- Endpoint: `\transact`
- Method: Post
- Chaincode: `transferToDeliverer`, `transferToRetailer`
- Params: role
- Body:

```json
{
    "productID": "productOne",
    "batchID": "batchOne",
    "status": "block/unblock"
}
```