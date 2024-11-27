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
exports.ensureDataIsValidMiddleware = void 0;
const ensureDataIsValidMiddleware = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!request.body.customer_id) {
        response.status(400).json({
            error_code: "INVALID_DATA",
            error_description: "Preencha o campo de id de usuário"
        });
    }
    ;
    if (!request.body.origin) {
        response.status(400).json({
            error_code: "INVALID_DATA",
            error_description: "Preencha o campo de endereço de origem"
        });
    }
    ;
    if (!request.body.destination) {
        response.status(400).json({
            error_code: "INVALID_DATA",
            error_description: "Preencha o campo de endereço de destino"
        });
    }
    ;
    if (request.body.origin === request.body.destination) {
        response.status(400).json({
            error_code: "INVALID_DATA",
            error_description: "Endereços de origem e destino iguais"
        });
    }
    ;
    return next();
});
exports.ensureDataIsValidMiddleware = ensureDataIsValidMiddleware;
