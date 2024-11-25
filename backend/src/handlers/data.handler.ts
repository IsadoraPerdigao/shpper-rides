import { Request, Response } from "express";
import { getDriversService } from "../services/getDriversServive";

export async function getDriversDataHandler (request: Request, response: Response) {
    const drivers = getDriversService()

    response.status(200).json(drivers)
}