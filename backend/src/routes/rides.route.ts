import { Router } from "express";
import { confirmRideHandler, createEstimatedRideHandler, getRidesByUserHandler } from "../handlers/rides.handler";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid";
import { ensureIdIsValidMiddleware } from "../middlewares/ensureIdIsValid";

const router = Router();

// ride/estimate
router.post("/estimate", ensureDataIsValidMiddleware, createEstimatedRideHandler);

// ride/confirm
router.patch("/confirm", ensureDataIsValidMiddleware, confirmRideHandler);

// /ride/123
router.get("/:id", ensureIdIsValidMiddleware, getRidesByUserHandler);

export default router