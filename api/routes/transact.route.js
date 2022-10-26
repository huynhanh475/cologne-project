import { Router } from "express";
import { roles } from "../utils/constants.js";
import canAccess from "../middlewares/can-access.js"
import * as controller from "../controllers/transact.controller.js";

const transactRouter = Router();

transactRouter.post('/registerOrder', canAccess([roles.client]), controller.registerOrder);
transactRouter.post('/approveOrder', canAccess([roles.client]), controller.approveOrder);
transactRouter.post('/inviteDeliverer', canAccess([roles.client]), controller.inviteDeliverer);
transactRouter.post('/replyInvitation', canAccess([roles.client]), controller.replyInvitation);
transactRouter.post('/transferToDeliverer', canAccess([roles.client]), controller.transferToDeliverer);
transactRouter.post('/confirmTransfer', canAccess([roles.client]), controller.confirmTransfer);
transactRouter.post('/transferToRetailer', canAccess([roles.client]), controller.transferToRetailer);
transactRouter.post('/receiveProduct', canAccess([roles.client]), controller.receiveProduct);

export default transactRouter;