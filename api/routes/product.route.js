import { Router } from "express";
import { send } from "../utils/api-response.js";
import { roles } from "../utils/constants.js";
import canAccess from "../middlewares/can-access.js"

const productRouter = Router();

productRouter.post('/', canAccess([roles.admin, roles.manufacturer]), (req, res) => {
    
    return send(res, {
        status: 200,
        message: "Hello world from product",
        data: "No data yet"
    })
})

export default productRouter;