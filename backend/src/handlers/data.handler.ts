import { Request, Response } from "express";
import { getRidesByCustomerService } from "../services/getRides";

export async function getDriversDataHandler (request: Request, response: Response) {
    const rides = getRidesByCustomerService(request.params.customer_id)

    response.status(200).json(rides)
}