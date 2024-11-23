import { Request, Response } from "express-serve-static-core";
import { CreateEstimatedRideDto } from "../dtos/createEstimatedRide.dto";
import { GetEstimatedRideQueryParams } from "../types/query-params"
import { ConfirmRideDto } from "../dtos/confirmRideDto";
import { GetRidesResponseDto } from "../dtos/getRidesResponseDto";
import { GetEstimatedRideParams } from "../types/params";
import { CreateRideResponseDto } from "../dtos/createRideResponseDto";
import { createRideService } from "../services/createRide.service";
import { confirmRideService } from "../services/confirmRideService";

export async function createEstimatedRideHandler(request: Request<{}, {}, CreateEstimatedRideDto>, response: Response) {

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

    const createResponse: CreateRideResponseDto = await createRideService(request.body);

    response.status(200).send(createResponse);
}

export async function confirmRideHandler(request: Request<{}, {}, ConfirmRideDto>, response: Response) {
    confirmRideService(request.body)
    response.status(200).send({success: true});
}

export async function getRidesByUserHandler(request: Request<GetEstimatedRideParams, {}, {}, GetEstimatedRideQueryParams>, response: Response<GetRidesResponseDto>) {
    response.status(200).send({
        customer_id: request.params.id,
        rides: [
        {
            id: 1234,
            date: new Date(),
            origin: "string",
            destination: "string",
            distance: 25,
            duration: "string",
            driver: {
                id: 123,
                name: "string"
            },
            value: 123
        }
        ]
    })
}
