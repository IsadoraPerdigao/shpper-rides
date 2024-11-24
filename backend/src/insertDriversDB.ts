import { mockDrivers } from './data/mockDrivers';
import { getDB } from './database';

const db = getDB();

const insertDrivers = () => {
    for (let i = 0; i < mockDrivers.length; i++ ){
        let driver = mockDrivers[i]
        
        const insertDrivers = db.prepare(`INSERT INTO Drivers (id, name, description, vehicle, raiting, comment, tax, minKm)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);`)
    
        insertDrivers.run(driver.id, driver.name, driver.description, driver.car, driver.review.rating, driver.review.comment, driver.tax, driver.minKm)
    
    }
}

insertDrivers()

