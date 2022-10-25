import {Router} from "express";
import {send} from "../utils/api-response.js";
import {roles} from "../utils/constants.js";
import canAccess from "../middlewares/can-access.js"
import auth from "../middlewares/auth.js";

const batchRouter = Router();
batchRouter.use("/", auth);

