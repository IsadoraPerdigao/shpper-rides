import { Request, Response } from "express-serve-static-core";
import { CreateEstimatedRideDto } from "../dtos/createEstimatedRide.dto";
import { GetEstimatedRideQueryParams } from "../types/query-params"
import { ConfirmRideDto } from "../dtos/confirmRideDto";
import { GetRidesResponseDto } from "../dtos/getRidesResponseDto";
import { GetEstimatedRideParams } from "../types/params";
import { CreateRideResponseDto } from "../dtos/createRideResponseDto";
import { createRideService } from "../services/createRide.service";
import { confirmRideService } from "../services/confirmRideService";
import { getRidesService } from "../services/getRidesService";

export async function createEstimatedRideHandler(request: Request, response: Response) {
    try {
        const createResponse: CreateRideResponseDto = await createRideService(request.body);
        
        response.status(200).send(createResponse);
    } catch (error) {
        response.status(404).json(
            {error_code: "INVALID_DATA", error_description: "Endereço não encontrado"});
    }
    
}

export async function confirmRideHandler(request: Request, response: Response) {
    await confirmRideService(request.body);

    response.status(200).send({success: true});
}

export async function getRidesByUserHandler(request: Request, response: Response) {
    const id = request.params.id;
    const driverId = request.query.driver_id
    
    const rides = getRidesService(id, driverId as number | undefined);

    response.status(200).send(rides);
}
