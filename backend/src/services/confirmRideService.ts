import { getDB } from "../database";
import { ConfirmRideDto } from "../dtos/confirmRideDto";

export function confirmRideService (rideInfo: ConfirmRideDto) {
    const db = getDB()

    const { customerId, origin, destination, distance, duration, driver, value } = rideInfo;
    const driverId = driver.id;
    const date = new Date();
    const requestDate = date.toLocaleString("pt-BR");

    try {

        // Insert data into database
        const insertRides = db.prepare(`INSERT INTO Rides (customer_id, driver_id, origin, destination, value, duration, distance_km, date)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);`);
            insertRides.run(customerId, driverId, origin, destination, value, duration, distance, requestDate);
    } catch (error) {
        console.error("Error persisting ride:", error);
    }

}