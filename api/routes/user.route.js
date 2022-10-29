import { Router } from "express";
import { roles, userTypes } from "../utils/constants.js";
import canAccess from "../middlewares/can-access.js"
import * as controller from '../controllers/user.controller.js'

const userRouter = Router();

userRouter.get('/', canAccess([roles.admin]), controller.getAllUser);
userRouter.get('/deliverer', canAccess([userTypes.manufacturer]), controller.getDeliverer); //This is special use for Manufacturers only
userRouter.post('/createUser', canAccess([roles.admin]), controller.createUser);
userRouter.post('/signin', controller.signIn);

export default userRouter;