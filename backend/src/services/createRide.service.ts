import { mockDrivers } from "../data/mockDrivers";
import { getDB } from "../database";
import { CreateEstimatedRideDto } from "../dtos/createEstimatedRide.dto";
import { CreateRideResponseDto } from "../dtos/createRideResponseDto";
import { Drivers } from "../types/drivers";
import { getCoordinates, getDistance } from "./googleMaps.service";

export async function createRideService (rideInfo: CreateEstimatedRideDto): Promise<CreateRideResponseDto> {
    const db = getDB()

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

    try {
        // Check if the customer is already in Customers table
        const checkCustomerExists = db.prepare(`SELECT * FROM Customers WHERE id = ?`).all(rideInfo.customer_id);

        // Insert data into Customers table if customer doesn't exist
        if (checkCustomerExists.length == 0) {
            const insertCustomer = db.prepare(`INSERT INTO Customers (id)
                VALUES (?)`)
                insertCustomer.run(rideInfo.customer_id)
        }

        // Insert data into Estimates table
        const insertEstimatedRides = db.prepare(`INSERT INTO Estimates (customer_id, origin, origin_lat, origin_lng, destination, destination_lat, destination_lng, estimated_distance_km)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
            insertEstimatedRides.run(rideInfo.customer_id, rideInfo.origin, originCoordinates.lat, originCoordinates.lng, rideInfo.destination, destinationCoordinates.lat, destinationCoordinates.lng, distance )
    } catch (error) {
        console.error("Error persisting ride:", error)
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