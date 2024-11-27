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
exports.getDriversDataHandler = getDriversDataHandler;
const getRides_1 = require("../services/getRides");
function getDriversDataHandler(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const drivers = (0, getRides_1.getDriversDataService)(request.params.customer_id);
        response.status(200).json(drivers);
    });
}
