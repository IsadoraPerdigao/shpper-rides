import { Request, Response } from "express";
import { getDriversNamesService } from "../services/getRides";

export async function getDriversDataHandler (request: Request, response: Response) {
    const drivers = getDriversNamesService(request.params.customer_id)

    response.status(200).json(drivers)
}