import { mockDrivers } from "../data/mockDrivers";
import { CreateEstimatedRideDto } from "../dtos/createEstimatedRide.dto";
import { CreateRideResponseDto } from "../dtos/createRideResponseDto";
import { Drivers } from "../types/drivers";
import { getCoordinates, getDistance } from "./googleMaps.service";

export async function createRideService (rideInfo: CreateEstimatedRideDto): Promise<CreateRideResponseDto> {
    const originCoordinates = await getCoordinates(rideInfo.origin);
    const destinationCoordinates = await getCoordinates(rideInfo.destination);
    const distanceDuration = await getDistance(rideInfo.origin, rideInfo.destination);

    const distance = parseFloat(distanceDuration.distance.split(" ")[0])
    const driversList = []

    for (let i = 0; i < mockDrivers.length; i++) {
        let driver = mockDrivers[i]
        let {minKm, tax, ...correctDriver} : Drivers = driver
        
        correctDriver["value"] = driver.tax * distance; 

        if (distance >= driver.minKm) {
            driversList.push(correctDriver)
        } 
    }

    return {
        origin: {
            latitude: originCoordinates.lat,
             longitude: originCoordinates.lng
         },
         destination: {
             latitude: destinationCoordinates.lat,
             longitude: destinationCoordinates.lng
         },
         distance: distance,
         duration: distanceDuration.duration,
         options: driversList,
         routeResponse: {}
    }
}