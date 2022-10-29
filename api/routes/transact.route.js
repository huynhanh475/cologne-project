import { Router } from "express";
import { roles, userTypes } from "../utils/constants.js";
import canAccess from "../middlewares/can-access.js"
import * as controller from "../controllers/transact.controller.js";

const transactRouter = Router();

transactRouter.post('/registerOrder', canAccess([userTypes.retailer]), controller.registerOrder);
transactRouter.post('/approveOrder', canAccess([userTypes.manufacturer]), controller.approveOrder);
transactRouter.post('/inviteDeliverer', canAccess([userTypes.manufacturer]), controller.inviteDeliverer);
transactRouter.post('/replyInvitation', canAccess([userTypes.deliverer]), controller.replyInvitation);
transactRouter.post('/transferToDeliverer', canAccess([userTypes.manufacturer]), controller.transferToDeliverer);
transactRouter.post('/confirmTransfer', canAccess([userTypes.deliverer]), controller.confirmTransfer);
transactRouter.post('/transferToRetailer', canAccess([userTypes.deliverer]), controller.transferToRetailer);
transactRouter.post('/receiveProduct', canAccess([userTypes.retailer]), controller.receiveProduct);

export default transactRouter;