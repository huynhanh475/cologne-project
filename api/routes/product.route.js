import { Router } from "express";
import { roles, userTypes } from "../utils/constants.js";
import canAccess from "../middlewares/can-access.js"
import { createProduct, getProductbyId, getAllProducts } from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.post('/', canAccess([userTypes.manufacturer]), createProduct);
productRouter.get('/:productId', getProductbyId);
productRouter.get('/', canAccess([userTypes.manufacturer, userTypes.retailer]), getAllProducts);

export default productRouter;