import { getDB } from "../database";

export function getDriversNamesService(customer_id: string) {
  const db = getDB();

  const rides = db.prepare(`SELECT name FROM Drivers`).all();
  return rides;
}
