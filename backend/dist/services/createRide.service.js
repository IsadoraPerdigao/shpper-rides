"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRideService = createRideService;
const mockDrivers_1 = require("../data/mockDrivers");
const database_1 = require("../database");
const googleMaps_service_1 = require("./googleMaps.service");
function createRideService(rideInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = (0, database_1.getDB)();
        const originCoordinates = yield (0, googleMaps_service_1.getCoordinates)(rideInfo.origin);
        const destinationCoordinates = yield (0, googleMaps_service_1.getCoordinates)(rideInfo.destination);
        const distanceDuration = yield (0, googleMaps_service_1.getDistance)(rideInfo.origin, rideInfo.destination);
        const distance = parseFloat(distanceDuration.distance.split(" ")[0]);
        const driversList = [];
        for (let i = 0; i < mockDrivers_1.mockDrivers.length; i++) {
            let driver = mockDrivers_1.mockDrivers[i];
            let { minKm, tax } = driver, correctDriver = __rest(driver, ["minKm", "tax"]);
            correctDriver["value"] = driver.tax * distance;
            if (distance >= driver.minKm) {
                driversList.push(correctDriver);
            }
        }
        try {
            // Check if the customer is already in Customers table
            const checkCustomerExists = db.prepare(`SELECT * FROM Customers WHERE id = ?`).all(rideInfo.customer_id);
            // Insert data into Customers table if customer doesn't exist
            if (checkCustomerExists.length == 0) {
                const insertCustomer = db.prepare(`INSERT INTO Customers (id)
                VALUES (?)`);
                insertCustomer.run(rideInfo.customer_id);
            }
            // Insert data into Estimates table
            const insertEstimatedRides = db.prepare(`INSERT INTO Estimates (customer_id, origin, origin_lat, origin_lng, destination, destination_lat, destination_lng, estimated_distance_km)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
            insertEstimatedRides.run(rideInfo.customer_id, rideInfo.origin, originCoordinates.lat, originCoordinates.lng, rideInfo.destination, destinationCoordinates.lat, destinationCoordinates.lng, distance);
        }
        catch (error) {
            console.error("Error persisting ride:", error);
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
        };
    });
}
