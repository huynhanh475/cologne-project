import {Router} from "express";
import {roles} from "../utils/constants.js";
import canAccess from "../middlewares/can-access.js"
import * as controller from "../controllers/batch.controller.js";


const batchRouter = Router();

batchRouter.get('/single', canAccess([roles.client]), controller.getSingleBatch);
batchRouter.get('/all', canAccess([roles.client]), controller.getAllBatches);
batchRouter.get('/report', canAccess([roles.client]), controller.reportFaultBatch);
export default batchRouter;