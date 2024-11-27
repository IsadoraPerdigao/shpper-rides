"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomerById = getCustomerById;
exports.getDriverById = getDriverById;
exports.getRidesService = getRidesService;
const database_1 = require("../database");
function getCustomerById(customerId) {
    const db = (0, database_1.getDB)();
    const customer = db
        .prepare(`SELECT * FROM Rides WHERE customer_id = ?`)
        .get(customerId);
    return customer;
}
function getDriverById(driverId) {
    const db = (0, database_1.getDB)();
    const customer = db
        .prepare(`SELECT * FROM Drivers WHERE id = ?`)
        .get(driverId);
    return customer;
}
function getRidesService(customerId, driverId) {
    const db = (0, database_1.getDB)();
    let ridesDb = db
        .prepare(`SELECT * FROM Rides WHERE customer_id = ?`)
        .all(customerId);
    if (driverId) {
        ridesDb = db
            .prepare(`SELECT * FROM Rides WHERE customer_id = ? AND driver_id = ?`)
            .all(customerId, driverId);
    }
    const ridesResponse = [];
    for (let i = 0; i < ridesDb.length; i++) {
        let ride = ridesDb[i];
        let rideId = ride.id;
        let origin = ride.origin;
        let destination = ride.destination;
        let duration = ride.duration;
        let value = ride.value;
        let driverIdBd = ride.driver_id;
        let distance = ride.distance_km;
        const [dateStr, timeStr] = ride.date.toLocaleString().split(", ");
        const [day, month, year] = dateStr.split("/");
        const [hours, minutes, seconds] = timeStr.split(":");
        // Convert to date format
        let date = new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}`);
        console.log(ride.date);
        const driversDb = db
            .prepare(`SELECT * FROM Drivers WHERE id = ?`)
            .all(driverIdBd);
        for (let index = 0; index < driversDb.length; index++) {
            let driver = {
                driverIdBd,
                name: driversDb[index].name,
            };
            ridesResponse.push({
                id: rideId,
                date,
                origin,
                destination,
                duration,
                distance,
                driver,
                value,
            });
        }
    }
    return ridesResponse.sort((a, b) => b.date.getTime() - a.date.getTime());
}
