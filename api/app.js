import "dotenv/config";
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import router from "./routes/index.route.js";
import * as network from "./fabric/network.js";

async function main() {
    await network.enrollAdmin(true, false, false);
    await network.enrollAdmin(false, true, false);
    await network.enrollAdmin(false, false, true);

    // testing connection with the network
    await network.registerUser(true, false, false, 'appUser');
    const networkObj = await network.connect(true, false, false, 'appUser');
    await network.query(networkObj, 'queryProduct', 'product0');

    const app = express();
    app.use(morgan('combined'));
    app.use(bodyParser.json());
    app.use(cors());

    app.use('/', router);

    app.listen(process.env.PORT, console.log(
        `🚀 Server listening on : http://localhost:${process.env.PORT}`
    ));
    
}

main();
