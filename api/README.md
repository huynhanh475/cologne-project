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

## Transaction
