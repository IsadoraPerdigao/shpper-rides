import { getDB } from "../database";
import { Drivers } from "../types/drivers";
import { Ride } from "../types/ride";

export function getCustomerById(customerId: string) {
  const db = getDB();
  const customer = db
    .prepare(`SELECT * FROM Rides WHERE customer_id = ?`)
    .get(customerId);

  return customer;
}

export function getDriverById(driverId: string) {
    const db = getDB();
    const customer = db
      .prepare(`SELECT * FROM Drivers WHERE id = ?`)
      .get(driverId);
  
    return customer;
  }

export function getRidesService(customerId: string, driverId?: string) {
  const db = getDB();
  let ridesDb = db
    .prepare(`SELECT * FROM Rides WHERE customer_id = ?`)
    .all(customerId) as Ride[];

  if (driverId) {
    ridesDb = db
      .prepare(`SELECT * FROM Rides WHERE customer_id = ? AND driver_id = ?`)
      .all(customerId, driverId) as Ride[];
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
    let date = new Date(
      `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
    );

    console.log(ride.date);

    const driversDb = db
      .prepare(`SELECT * FROM Drivers WHERE id = ?`)
      .all(driverIdBd) as Drivers[];

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
