import { NextFunction, Request, Response } from "express";
import { getDB } from "../database";

export const ensureDriverIdIsValidMiddleware = async (request: Request, response: Response, next: NextFunction) => {
    const driverId = request.query.driver_id;
    const db = getDB();
    
    const drivers = db.prepare(`SELECT * FROM Drivers WHERE id = ?`).all(driverId);

    if (drivers.length === 0) {
        response
        .status(404)
        .json({
            error_code: "INVALID_DRIVER", 
            error_description: "Nenhum motorista encontrado"
        });
    };

    return next();
}