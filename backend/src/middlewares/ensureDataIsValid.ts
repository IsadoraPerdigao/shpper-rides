import { NextFunction, Request, Response } from "express";

export const ensureDataIsValidMiddleware = async (request: Request, response: Response, next: NextFunction) => {
    if (!request.body.customer_id) {
        response.status(400).json({
            error_code: "INVALID_DATA",
            error_description: "Preencha o campo de id de usuário"
        });
    };

    if (!request.body.origin) {
        response.status(400).json({
            error_code: "INVALID_DATA",
            error_description: "Preencha o campo de endereço de origem"
        });
    };

    if (!request.body.destination) {
        response.status(400).json({
            error_code: "INVALID_DATA",
            error_description: "Preencha o campo de endereço de destino"
        });
    };

    if (request.body.origin === request.body.destination) {
        response.status(400).json({
            error_code: "INVALID_DATA",
            error_description: "Endereços de origem e destino iguais"
        });
    };

    return next();
}