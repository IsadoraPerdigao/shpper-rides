import { Router } from "express";
import { confirmRideHandler, createEstimatedRideHandler, getRidesByUserHandler } from "../handlers/rides.handler";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid";

const router = Router();

// ride/estimate
router.post("/estimate", ensureDataIsValidMiddleware, createEstimatedRideHandler);

// ride/confirm
router.patch("/confirm", ensureDataIsValidMiddleware, confirmRideHandler);

// /ride/123
router.get("/:id", getRidesByUserHandler);

export default router;