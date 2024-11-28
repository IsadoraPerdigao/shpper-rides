import { Request, Response } from "express";
import { getDriversDataService } from "../services/getRides";

export async function getDriversDataHandler (request: Request, response: Response) {
    const drivers = getDriversDataService(request.params.customer_id)

    response.status(200).json(drivers)
}