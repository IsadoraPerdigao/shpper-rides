"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDriversDataService = getDriversDataService;
const database_1 = require("../database");
function getDriversDataService(customer_id) {
    const db = (0, database_1.getDB)();
    const rides = db.prepare(`SELECT name, id FROM Drivers`).all();
    return rides;
}
