import { Router } from "express";
import { roles, userTypes } from "../utils/constants.js";
import canAccess from "../middlewares/can-access.js"
import { createProduct, getProductbyId, getAllProducts, reportFaultProduct } from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.post('/', canAccess([userTypes.manufacturer]), createProduct);
productRouter.get('/:productId', getProductbyId);
productRouter.get('/', canAccess([userTypes.manufacturer, userTypes.retailer]), getAllProducts);
productRouter.post('/report/:productId', canAccess([userTypes.manufacturer]), reportFaultProduct);

export default productRouter;