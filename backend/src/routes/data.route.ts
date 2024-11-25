import { Router } from "express";
import { getDriversDataHandler } from "../handlers/data.handler";

const dataRouter = Router();

dataRouter.get("", getDriversDataHandler)

export default dataRouter;