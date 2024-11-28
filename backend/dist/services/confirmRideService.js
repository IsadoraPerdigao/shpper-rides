"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmRideService = confirmRideService;
const database_1 = require("../database");
function confirmRideService(rideInfo) {
    const db = (0, database_1.getDB)();
    const { customer_id, origin, destination, distance, duration, driver, value } = rideInfo;
    const driverId = driver.id;
    const date = new Date();
    const requestDate = date.toLocaleString("pt-BR");
    try {
        // Insert data into database
        const insertRides = db.prepare(`INSERT INTO Rides (customer_id, driver_id, origin, destination, value, duration, distance_km, date)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);`);
        insertRides.run(customer_id, driverId, origin, destination, value, duration, distance, requestDate);
    }
    catch (error) {
        console.error("Error persisting ride:", error);
    }
}
