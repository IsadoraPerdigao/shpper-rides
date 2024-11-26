import { Router } from "express";
import { getDriversByCustomerHandler, getDriversHandler } from "../handlers/data.handler";

const driverRouter = Router();

driverRouter.get("/[customer_id]", getDriversByCustomerHandler)

driverRouter.get("/", getDriversHandler)

export default driverRouter;