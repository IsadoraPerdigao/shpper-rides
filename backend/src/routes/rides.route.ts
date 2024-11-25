import { Router } from "express";
import { confirmRideHandler, createEstimatedRideHandler, getRidesByUserHandler } from "../handlers/rides.handler";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid";
import { ensureIdIsValidMiddleware } from "../middlewares/ensureIdIsValid";
import { ensureDriverIdIsValidMiddleware } from "../middlewares/ensureDriverIdIsValid";

const router = Router();

// ride/estimate
router.post("/estimate", ensureDataIsValidMiddleware, createEstimatedRideHandler);

// ride/confirm
router.patch("/confirm", ensureDataIsValidMiddleware, confirmRideHandler);

// /ride/123
router.get("/:id", ensureIdIsValidMiddleware, ensureDriverIdIsValidMiddleware, getRidesByUserHandler);

export default router;