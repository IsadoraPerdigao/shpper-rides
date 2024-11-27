import { Request, Response } from "express-serve-static-core";
import { CreateEstimatedRideDto } from "../dtos/createEstimatedRide.dto";
import { GetEstimatedRideQueryParams } from "../types/query-params";
import { ConfirmRideDto } from "../dtos/confirmRideDto";
import { GetRidesResponseDto } from "../dtos/getRidesResponseDto";
import { GetEstimatedRideParams } from "../types/params";
import { CreateRideResponseDto } from "../dtos/createRideResponseDto";
import { createRideService } from "../services/createRide.service";
import { confirmRideService } from "../services/confirmRideService";
import {
  getCustomerById,
  getDriverById,
  getRidesService,
} from "../services/getRidesService";

export async function createEstimatedRideHandler(
  request: Request,
  response: Response
) {
  try {
    const createResponse: CreateRideResponseDto = await createRideService(
      request.body
    );

    response.status(200).send(createResponse);
  } catch (error) {
    response.status(404).json({
      error_code: "INVALID_DATA",
      error_description: "Endereço não encontrado",
    });
  }
}

export async function confirmRideHandler(request: Request, response: Response) {
  await confirmRideService(request.body);

  response.status(200).send({ success: true });
}

export async function getRidesByUserHandler(
  request: Request,
  response: Response
) {
  const id = request.params.id;
  const driverId = request.query.driver_id as string;

  try {
    // Add validations
    // User exists on db
    // driver exists on db
    const customer = getCustomerById(id);
    const driver = getDriverById(driverId);

    if (!customer) {
      response.status(404).json({
        error_code: "NO_RIDES_FOUND",
        error_description: "Nenhum registro de viagem encontrado para esse usuário",
      });
    }

    if (!driver) {
      response
        .status(404)
        .json({
          error_code: "INVALID_DRIVER",
          error_description: "Nenhum motorista encontrado",
        });
    }

    const rides = getRidesService(id, driverId);

    response.status(200).send(rides);
  } catch {}
}
