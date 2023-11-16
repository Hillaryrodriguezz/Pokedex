import express from "express";
const errorRouter = express.Router();
import { Get404 } from "../controllers/errorsController.js";

errorRouter.use("/", Get404);

export default errorRouter;