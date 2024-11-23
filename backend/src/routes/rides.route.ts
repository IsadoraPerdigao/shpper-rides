import { Router } from "express";
import { confirmRideHandler, createEstimatedRideHandler, getRidesByUserHandler } from "../handlers/rides.handler";

const router = Router();

// ride/estimate
router.post("/estimate", createEstimatedRideHandler);

// ride/confirm
router.patch("/confirm", confirmRideHandler);

// /ride/123
router.get("/:id", getRidesByUserHandler);

export default router