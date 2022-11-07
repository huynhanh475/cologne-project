import "dotenv/config";
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import router from "./routes/index.route.js";
import * as network from "./fabric/network.js";
import { userTypes } from "./utils/constants.js";

async function main() {
    Promise.all([
        network.enrollAdmin(true, false, false, "admin"),
        network.enrollAdmin(false, true, false, "admin"),
        network.enrollAdmin(false, false, true, "admin"),
    ])
    .then(() => Promise.all([
        network.registerUser(userTypes.manufacturer, "admin1"),
        network.registerUser(userTypes.deliverer, "admin2"),
        network.registerUser(userTypes.retailer, "admin3"),
    ])
        // .then( async () => { //for testing connection
        //     const networkObj = await network.connect(userTypes.retailer, 'admin')
        //     const users = await network.query(networkObj, 'queryUser', "admin1")
        //     console.log(users)
        // })
    )

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
