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
exports.ensureIdIsValidMiddleware = void 0;
const database_1 = require("../database");
const ensureIdIsValidMiddleware = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customerId = request.params.id;
    const db = (0, database_1.getDB)();
    const rides = db.prepare(`SELECT * FROM Rides WHERE customer_id = ?`).all(customerId);
    if (rides.length === 0) {
        response
            .status(404)
            .json({
            error_code: "NO_RIDES_FOUND",
            error_description: "Nenhum registro de viagem encontrado para esse usuário"
        });
    }
    ;
    return next();
});
exports.ensureIdIsValidMiddleware = ensureIdIsValidMiddleware;
