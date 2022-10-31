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

- Enpoint: `/batch/all`
- Method: Get
- Chaincode: `getAllBatches`
- Body: None
- Response: all batches' entities

```json
{
  "message": "Success",
  "data": {
    "batchId": "batch0",
    "date": {
      "markedFaultDate": "",
      "orderedDate": "2022-10-28",
      "sendToDelivererDate": "",
      "sendToRetailerDate": ""
    },
    "delivererId": "",
    "docType": "batch",
    "manufacturerId": "admin1",
    "markedFaultBy": "",
    "productId": "product0",
    "quantity": "1000",
    "retailerId": "user-0",
    "status": "pending-registration"
  }
}
```

### Users can query their single batch order

- Endpoint: `/batch/single`
- Method: Get
- Chaincode: `queryBatch`
- Body: 

```json
{
    "batchId": "batch0"
}
```
- Response: a batch's entity


### Users can report if a batch is fault

- Endpoint: `/batch/report`
- Method: Post
- Chaincode: `reportBatchFault`
- Body:

```json
{
    "batchId": "batch0"
}
```

### Users can query all fault batches

- Endpoint: `/batch/query`
- Method: Get
- Chaincode: `queryFaultBatches`
- Body: None


## Transaction

### Retailer creates a batch order

- Endpoint: `/transact/registerOrder`
- Method: Post
- Chaincode: `registerBatchOrder`
- Body:

```json
{
    "productId": "product0",
    "quantity": 1000
}
```

- Response: a batch's entity

```json
{
  "message": "Success",
  "data": {
    "batchId": "batch0",
    "productId": "product0",
    "docType": "batch",
    "manufacturerId": "admin1",
    "retailerId": "user-0",
    "delivererId": "",
    "status": "pending-registration",
    "markedFaultBy": "",
    "date": {
      "orderedDate": "2022-10-28",
      "sendToDelivererDate": "",
      "sendToRetailerDate": "",
      "markedFaultDate": ""
    },
    "quantity": "1000"
  }
}
```

### Manufacturer replies the order of the retailer

- Endpoint: `/transact/approveOrder`
- Method: Post
- Chaincode: `approveBatchOrder`
- Body:

```json
{
    "batchId": "batch0",
}
```

- Response: a batch's entity
  
```json
{
  "message": "Success",
  "data": {
    "batchId": "batch0",
    "date": {
      "markedFaultDate": "",
      "orderedDate": "2022-10-28",
      "sendToDelivererDate": "",
      "sendToRetailerDate": ""
    },
    "delivererId": "",
    "docType": "batch",
    "manufacturerId": "admin1",
    "markedFaultBy": "",
    "productId": "product0",
    "quantity": "1000",
    "retailerId": "user-0",
    "status": "approved"
  }
}
```

### Manufacturer invites/adds the deliverer

- Endpoint: `/transact/inviteDeliverer`
- Method: Post
- Chaincode: `inviteDeliverer`
- Body:

```json
{
    "batchId": "batch0",
    "delivererId": "user-2"
}
```

- Response: a batch's entity

```json
{
  "message": "Success",
  "data": {
    "batchId": "batch0",
    "date": {
      "markedFaultDate": "",
      "orderedDate": "2022-10-28",
      "sendToDelivererDate": "",
      "sendToRetailerDate": ""
    },
    "delivererId": "user-2",
    "docType": "batch",
    "manufacturerId": "admin1",
    "markedFaultBy": "",
    "productId": "product0",
    "quantity": "1000",
    "retailerId": "user-0",
    "status": "pending-invite-to-deliverer"
  }
}
```

### Deliverer replies the invitation from the manufacturer

- Endpoint: `/transact/replyInvitation`
- Method: Post
- Chaincode: `approveInvitation`
- Body:

```json
{
    "batchId": "batch0",
    "action" : "approved/disapproved"
}
```

- Response: a batch's entity

```json
{
  "message": "Success",
  "data": {
    "batchId": "batch0",
    "date": {
      "markedFaultDate": "",
      "orderedDate": "2022-10-28",
      "sendToDelivererDate": "",
      "sendToRetailerDate": ""
    },
    "delivererId": "user-2",
    "docType": "batch",
    "manufacturerId": "admin1",
    "markedFaultBy": "",
    "productId": "product0",
    "quantity": "1000",
    "retailerId": "user-0",
    "status": "approve-invitation-by-deliverer"
  }
}
```

### Manufacturer transfers the batch to the deliverer

- Endpoint: `/transact/transferToDeliverer`
- Method: Post
- Chaincode: `transferToDeliverer`
- Body:

```json
{
    "batchId": "batch0",
}
```

- Response: a batch's entity

```json

```

### Deliverer confirms that the batch has been received

- Endpoint: `/transact/confirmTransfer`
- Method: Post
- Chaincode: `delivererConfirmTransfer`
- Body:

```json
{
    "batchId": "batch0",
}
```

- Response: a batch's entity

```json
{
  "message": "Success",
  "data": {
    "batchId": "batch0",
    "date": {
      "markedFaultDate": "",
      "orderedDate": "2022-10-28",
      "sendToDelivererDate": "",
      "sendToRetailerDate": ""
    },
    "delivererId": "user-2",
    "docType": "batch",
    "manufacturerId": "admin1",
    "markedFaultBy": "",
    "productId": "product0",
    "quantity": "1000",
    "retailerId": "user-0",
    "status": "deliverer-confirm-transfer"
  }
```

### Deliverer transfers the batch to the retailer

- Endpoint: `/transact/transferToRetailer`
- Method: Post
- Chaincode: `transferToRetailer`
- Body:

```json
{
    "batchId": "batch0",
}
```

- Response: a batch's entity
  
```json
{
}
```

### Retailer confirms that the batch has been received

- Endpoint: `/transact/receiveProduct`
- Method: Post
- Chaincode: `retailerConfirmTransfer`
- Body:

```json
{
    "batchId": "batch0",
}
```

- Response: a batch's entity

```json
{
  "message": "Success",
  "data": {
    "batchId": "batch0",
    "date": {
      "markedFaultDate": "",
      "orderedDate": "2022-10-28",
      "sendToDelivererDate": "",
      "sendToRetailerDate": ""
    },
    "delivererId": "user-2",
    "docType": "batch",
    "manufacturerId": "admin1",
    "markedFaultBy": "",
    "productId": "product0",
    "quantity": "1000",
    "retailerId": "user-0",
    "status": "retailer-confirm-transfer"
  }
}
```
