import { getDB } from "../database";
import { Drivers } from "../types/drivers";
import { Ride } from "../types/ride";

export function getRidesService (customerId: string) {
    const db = getDB()
    const ridesDb = db.prepare(`SELECT * FROM Rides WHERE customer_id = ?`).all(customerId) as Ride[];
    
    const ridesResponse = [];

    for (let i = 0; i < ridesDb.length; i++) {
        let ride = ridesDb[i];
        let rideId = ride.id;
        let date = ride.date;
        let origin = ride.origin;
        let destination = ride.destination;
        let duration = ride.duration;
        let value = ride.value;
        let driverId = ride.driver_id;

        const driversDb = db.prepare(`SELECT * FROM Drivers WHERE id = ?`).all(driverId) as Drivers[];
        
        for (let index =0; index < driversDb.length; index++) {
            let driver = {
                driverId,
                name: driversDb[index].name
            };

            ridesResponse.push({
                id: rideId,
                date,
                origin,
                destination,
                duration,
                driver,
                value
            });
        };
    };
    
    return ridesResponse;

} 