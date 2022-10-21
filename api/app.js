import "dotenv/config";
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import router from "./routes/index.route.js";


async function main() {
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
