"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEstimatedRideHandler = createEstimatedRideHandler;
exports.confirmRideHandler = confirmRideHandler;
exports.getRidesByUserHandler = getRidesByUserHandler;
const createRide_service_1 = require("../services/createRide.service");
const confirmRideService_1 = require("../services/confirmRideService");
const getRidesService_1 = require("../services/getRidesService");
function createEstimatedRideHandler(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const createResponse = yield (0, createRide_service_1.createRideService)(request.body);
            response.status(200).send(createResponse);
        }
        catch (error) {
            response.status(404).json({
                error_code: "INVALID_DATA",
                error_description: "Endereço não encontrado",
            });
        }
    });
}
function confirmRideHandler(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, confirmRideService_1.confirmRideService)(request.body);
        response.status(200).send({ success: true });
    });
}
function getRidesByUserHandler(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = request.params.id;
        const driverId = request.query.driver_id;
        try {
            // Add validations
            // User exists on db
            // driver exists on db
            const customer = (0, getRidesService_1.getCustomerById)(id);
            const driver = (0, getRidesService_1.getDriverById)(driverId);
            if (!customer) {
                response.status(404).json({
                    error_code: "NO_RIDES_FOUND",
                    error_description: "Nenhum registro de viagem encontrado para esse usuário",
                });
            }
            if (!driver) {
                response
                    .status(404)
                    .json({
                    error_code: "INVALID_DRIVER",
                    error_description: "Nenhum motorista encontrado",
                });
            }
            const rides = (0, getRidesService_1.getRidesService)(id, driverId);
            response.status(200).send(rides);
        }
        catch (_a) { }
    });
}
