"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rides_handler_1 = require("../handlers/rides.handler");
const ensureDataIsValid_1 = require("../middlewares/ensureDataIsValid");
const router = (0, express_1.Router)();
// ride/estimate
router.post("/estimate", ensureDataIsValid_1.ensureDataIsValidMiddleware, rides_handler_1.createEstimatedRideHandler);
// ride/confirm
router.patch("/confirm", ensureDataIsValid_1.ensureDataIsValidMiddleware, rides_handler_1.confirmRideHandler);
// /ride/123
router.get("/:id", rides_handler_1.getRidesByUserHandler);
exports.default = router;
