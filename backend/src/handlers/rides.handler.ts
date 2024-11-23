import { Request, Response } from "express-serve-static-core";
import { CreateEstimatedRideDto } from "../dtos/createEstimatedRide.dto";
import { GetEstimatedRideQueryParams } from "../types/query-params"
import { ConfirmRideDto } from "../dtos/confirmRideDto";
import { GetRidesResponseDto } from "../dtos/getRidesResponseDto";
import { GetEstimatedRideParams } from "../types/params";
import { CreateRideResponseDto } from "../dtos/createRideResponseDto";

export async function createEstimatedRideHandler(request: Request<{}, {}, CreateEstimatedRideDto>, response: Response<CreateRideResponseDto>) {
    response.status(200).send({
        origin: {
           latitude: 123,
            longitude: 123
        },
        destination: {
            latitude: 456,
            longitude: 456
        },
        distance: 125,
        duration: "string",
        options: [
            {
            id: 1235,
            name: "string",
            description: "string",
            vehicle: "string",
            review: {
                rating: 1235,
                comment: "string"
            },
            value: 1235
            }
        ],
        routeResponse: {}
       })
}

export async function confirmRideHandler(request: Request<{}, {}, {}, ConfirmRideDto>, response: Response) {
    response.status(200).send({success: true})
}

export async function getRidesByUserHandler(request: Request<GetEstimatedRideParams, {}, {}, GetEstimatedRideQueryParams>, response: Response<GetRidesResponseDto>) {
    console.log(request)
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
