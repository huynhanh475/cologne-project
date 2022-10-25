import {Router} from "express";
import {roles} from "../utils/constants.js";
import canAccess from "../middlewares/can-access.js"
import auth from "../middlewares/auth.js";
import * as controller from "../controllers/transact.controller.js";

const transactRouter = Router();
transactRouter.use("/", auth);

transactRouter.post('/registerOrder', canAccess([roles.retailer]), controller.registerOrder);
transactRouter.post('/approveOrder', canAccess([roles.manufacturer]), controller.approveOrder);
transactRouter.post('/inviteDeliverer', canAccess([roles.manufacturer]), controller.inviteDeliverer);
transactRouter.post('/replyInvitation', canAccess([roles.deliverer]), controller.replyInvitation);
transactRouter.post('/transferToDeliverer', canAccess([roles.manufacturer]), controller.transferToDeliverer);
transactRouter.post('/confirmTransfer', canAccess([roles.deliverer]), controller.confirmTransfer);
transactRouter.post('/transferToRetailer', canAccess([roles.deliverer]), controller.transferToRetailer);
transactRouter.post('/receiveProduct', canAccess([roles.retailer]), controller.receiveProduct);

export default transactRouter;