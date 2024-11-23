import { getDB } from "../database";
import { ConfirmRideDto } from "../dtos/confirmRideDto";

export function confirmRideService (rideInfo: ConfirmRideDto) {
    const db = getDB()

    const { customerId, origin, destination, distance, duration, driver, value } = rideInfo
    const driverId = driver.id
    const driverName = driver.name
    const date = new Date()
    const requestYear = date.getFullYear()
    const requestMonth = date.getMonth() + 1
    const requestDay = date.getDate()
    const requestHour = date.getHours()
    const requestMinutes = date.getMinutes()
    const requestDate = `${requestDay}/${requestMonth}/${requestYear} ${requestHour}:${requestMinutes}`

    try {

        // Insert data into database
        const insertRides = db.prepare(`INSERT INTO Rides (customer_id, driver_id, origin, destination, value, duration, distance_km, date)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
            insertRides.run(customerId, driverId, origin, destination, value, duration, distance, requestDate)
    } catch (error) {
        console.error("Error persisting ride:", error)
    }

}