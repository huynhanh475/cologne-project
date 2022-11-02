# Cologne Project - Application of Hyperledger Fabric on Food Supply Chain

Cologne Project is a Food Supply Chain solution to traditional supply chain industries. It can help to build an effective supply chain system by improving the following areas:

- Tracking the products in the entire chain
- Verifying and authenticating the products in the chain
- Sharing the entire chain information between supply chain actors
- Providing better auditability

## Steps to run the app

### Prerequisites

- [Docker](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [NodeJs and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Run the network

- Go to network directory:

```bash
cd network
```

- Start the network:

```bash
./startNetwork.sh
```

- To stop the network:

```bash
./networkDown.sh
```

### Run the API server

Go to API directory and start the server:

```bash
cd api
npm install
npm run start
```

For more detail: [See API docs](api/README.md)

### Run the Web application

- Go to frontend directory:

```bash
cd frontend
```

- Create .env file:

```bash
cp env.example .env
```

- Start the application:

```bash
npm install
npm start
```

For more detail: [See Frontend docs](frontend/README.md)
