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
- Body:

```json
{
    "id" : "admin2",
    "password" : "adminpw",
    "userType" : "deliverer"
}
```

- Response: user entity, access token

```json
{
    "message": "Success",
    "data": {
        "id": "admin2",
        "userType": "deliverer",
        "role": "admin",
        "name": "Deliverer Admin",
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluMiIsInVzZXJUeXBlIjoiZGVsaXZlcmVyIiwicm9sZSI6ImFkbWluIiwibmFtZSI6IkRlbGl2ZXJlciBBZG1pbiIsImlhdCI6MTY2Njc1Mzk0MSwiZXhwIjoxNjY3MzU4NzQxfQ.GWwhAvfuEkMVUza7AUvFZy7xrqHwHQh9u67IKIqa-q0"
    }
}
```

### Create user

- Endpoint: `/user/creatUser`
- Method: Post
- Chaincode: `createUser`
- Header `"x-access-token" : "<accessToken>"`
- Body:

```json
{
    "userType": "deliverer",
    "address": "berlin",
    "email": "man1@example.com",
    "name": "Deliverer 3",
    "password": "password123"
}
```

- Response: user entity

```json
{
    "message": "Success",
    "data": {
        "name": "Deliverer 3",
        "docType": "user",
        "userId": "user-3",
        "email": "man1@example.com",
        "userType": "deliverer",
        "role": "client",
        "address": "berlin",
        "password": "password123"
    }
}
```

### Get all user

- Endpoint: `/user`
- Method: Get
- Chaincode: `queryUsers`
- Body: None
- Response: list user entity

```json
{
    "message": "Success",
    "data": [
        {
            "address": "berlin",
            "docType": "user",
            "email": "man1@example.com",
            "name": "Deliverer 3",
            "password": "password123",
            "role": "client",
            "userId": "user-0",
            "userType": "deliverer"
        },
        {
            "address": "berlin",
            "docType": "user",
            "email": "man1@example.com",
            "name": "Manufacturer 1",
            "password": "password123",
            "role": "client",
            "userId": "user-1",
            "userType": "manufacturer"
        }
    ]
}
```

### Get all users of a type

- Endpoint: `/user/:userType`
- Method: Get
- Chaincode: `queryAllUsers`
- Body: None
- Response: list user entity

## Product Management

### Get all products

- Endpoint: `/product`
- Method: Get
- Chaincode: `queryAllProduct`
- Body: none
- Response: list products
  - If user is a `manufacturer`: return list products that belong to that manufacturer
  - If user is a `retailer`: return list all products that are healthy and available

```json
{
    "message": "Success",
    "data": [
        {
            "date": "2022-10-27",
            "docType": "product",
            "manufacturerId": "admin1",
            "markedFaultBy": "",
            "name": "Green Apple - 0312",
            "price": 129000,
            "productId": "product0",
            "quantity": 5000,
            "status": "healthy"
        },
        {
            "date": "2022-10-27",
            "docType": "product",
            "manufacturerId": "user-0",
            "markedFaultBy": "",
            "name": "Red Apple - 1298",
            "price": 110000,
            "productId": "product1",
            "quantity": 6000,
            "status": "healthy"
        }
    ]
}
```

### Get a product by ID

- Endpoint: `/product/:productId`
- Method: Get
- Chaincode: `queryProduct`
- Params: `productId`
- Body: none
- Response: product entity

```json
{
    "message": "Success",
    "data": {
        "date": "2022-10-27",
        "docType": "product",
        "manufacturerId": "admin1",
        "markedFaultBy": "",
        "name": "Green Apple - 0312",
        "price": "129000",
        "productId": "product0",
        "quantity": "5000",
        "status": "healthy"
    }
}
```

### Create a new product

- Endpoint: `/product`
- Method: Post
- Chaincode: `createProduct`
- Body:

```json
{
    "name": "Red Apple - 1298",
    "price": 110000,
    "quantity": 6000
}
```

- Reponse: product entity

```json
{
    "message": "Success",
    "data": {
        "productId": "product1",
        "docType": "product",
        "name": "Red Apple - 1298",
        "manufacturerId": "user-0",
        "date": "2022-10-27",
        "price": 110000,
        "quantity": 6000,
        "status": "healthy",
        "markedFaultBy": ""
    }
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

- Endpoint: `/transact/registerOrder`
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

- Response: batch order entity

### Manufacturer replies the order of the retailer

- Endpoint: `/transact/approveOrder`
- Method: Put
- Chaincode: `approveBatchOrder`
- Params: role
- Body:

```json
{
    "batchID": "batchOne",
}
```

- Response: status (200 for success; otherwise, fail)

### Manufacturer invites/adds the deliverer

- Endpoint: `/transact/inviteDeliverer`
- Method: Put
- Chaincode: `inviteDeliverer`
- Params: role
- Body:

```json
{
    "batchID": "batchOne",
    "delivererID": "delivererOne"
}
```

- Response: status (200 for success; otherwise, fail)

### Deliverer replies the invitation from the manufacturer

- Endpoint: `/transact/replyInvitation`
- Method: Put
- Chaincode: `approveInvitation`
- Params: role
- Body:

```json
{
    "batchID": "batchOne",
    "action" : "approved/disapproved"
}
```

- Response: status (200 for success; otherwise, fail)

### Manufacturer transfers the batch to the deliverer

- Endpoint: `/transact/transferToDeliverer`
- Method: Put
- Chaincode: `transferToDeliverer`
- Params: role
- Body:

```json
{
    "batchID": "batchOne",
}
```

- Response: status (200 for success; otherwise, fail)

### Deliverer confirms that the batch has been received

- Endpoint: `/transact/confirmTransfer`
- Method: Put
- Chaincode: `delivererConfirmTransfer`
- Params: role
- Body:

```json
{
    "batchID": "batchOne",
}
```

- Response: status (200 for success; otherwise, fail)

### Deliverer transfers the batch to the retailer

- Endpoint: `/transact/transferToRetailer`
- Method: Put
- Chaincode: `transferToRetailer`
- Params: role
- Body:

```json
{
    "batchID": "batchOne",
}
```

- Response: status (200 for success; otherwise, fail)

### Retailer confirms that the batch has been received

- Endpoint: `/transact/receiveProduct`
- Method: Put
- Chaincode: `retailerConfirmTransfer`
- Params: role
- Body:

```json
{
    "batchID": "batchOne",
}
```

- Response: status (200 for success; otherwise, fail)
