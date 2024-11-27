"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const driversNames_handler_1 = require("../handlers/driversNames.handler");
const dataRouter = (0, express_1.Router)();
dataRouter.get("", driversNames_handler_1.getDriversDataHandler);
exports.default = dataRouter;
