import "dotenv/config";
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import router from "./routes/index.route.js";
import * as network from "./fabric/network.js";

async function main() {
    await network.enrollAdmin(true, false, false, "admin0");
    await network.enrollAdmin(false, true, false, "admin1");
    await network.enrollAdmin(false, false, true, "admin2");

    // testing connection with the network
    // const networkObj = await network.connect("manufacturer", 'admi0');
    // await network.query(networkObj, 'queryUser', 'admin0')

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
