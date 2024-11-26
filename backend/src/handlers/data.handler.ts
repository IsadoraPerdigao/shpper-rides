import { Request, Response } from "express";
import { getDriversByCustomerService } from "../services/getDriversByCustomer.service";
import { getDriversService } from "../services/getAllDrivers.service";

export async function getDriversByCustomerHandler (request: Request, response: Response) {
    const drivers = getDriversByCustomerService(request.params.id)

    response.status(200).json(drivers)
}

export async function getDriversHandler (request: Request, response: Response) {
    const drivers = getDriversService()

    response.status(200).json(drivers)
}