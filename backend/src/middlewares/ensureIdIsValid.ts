import { NextFunction, Request, Response } from "express";
import { getDB } from "../database";

export const ensureIdIsValidMiddleware = async (request: Request, response: Response, next: NextFunction) => {
    const customerId = request.params.id;
    const db = getDB();
    
    const rides = db.prepare(`SELECT * FROM Rides WHERE customer_id = ?`).all(customerId);

    if (rides.length === 0) {
        response
        .status(404)
        .json({
            error_code: "NO_RIDES_FOUND", 
            error_description: "Nenhum registro de viagem encontrado para esse usuário"
        });
    };

    return next();
}