import { Router } from "express";
import { getDriversDataHandler } from "../handlers/driversNames.handler";

const dataRouter = Router();

dataRouter.get("", getDriversDataHandler)

export default dataRouter;