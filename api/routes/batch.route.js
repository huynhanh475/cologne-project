import { Router } from "express";
import { roles, userTypes } from "../utils/constants.js";
import canAccess from "../middlewares/can-access.js"
import * as controller from "../controllers/batch.controller.js";


const batchRouter = Router();

batchRouter.get('/single', controller.getSingleBatch);
batchRouter.get('/all', controller.getAllBatches);
batchRouter.post('/report', controller.reportBatchFault);
batchRouter.get('/query', controller.queryFaultBatches);
export default batchRouter;