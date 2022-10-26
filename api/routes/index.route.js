import { Router } from 'express';
import productRouter from './product.route.js';
import userRouter from './user.route.js';
import auth from "../middlewares/auth.js";

const router = Router();

router.use("/", auth);

router.use("/user", userRouter);
router.use("/product", productRouter);

export default router;
