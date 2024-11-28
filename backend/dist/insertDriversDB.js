"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mockDrivers_1 = require("./data/mockDrivers");
const database_1 = require("./database");
const db = (0, database_1.getDB)();
const insertDrivers = () => {
    for (let i = 0; i < mockDrivers_1.mockDrivers.length; i++) {
        let driver = mockDrivers_1.mockDrivers[i];
        const insertDrivers = db.prepare(`INSERT INTO Drivers (id, name, description, vehicle, raiting, comment, tax, minKm)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);`);
        insertDrivers.run(driver.id, driver.name, driver.description, driver.car, driver.review.rating, driver.review.comment, driver.tax, driver.minKm);
    }
};
insertDrivers();
