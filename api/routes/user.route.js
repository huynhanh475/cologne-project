import { Router } from "express";
import { roles } from "../utils/constants.js";
import canAccess from "../middlewares/can-access.js"
import * as controller from '../controllers/user.controller.js'

const userRouter = Router();

userRouter.post('/createUser', canAccess([roles.admin]), controller.createUser);
userRouter.get('/all', canAccess([roles.admin]), controller.getAllUser);
userRouter.post('/signin', controller.signIn);

export default userRouter;