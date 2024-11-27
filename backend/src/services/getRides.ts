import { getDB } from "../database";

export function getDriversDataService(customer_id: string) {
  const db = getDB();

  const rides = db.prepare(`SELECT name, id FROM Drivers`).all();
  return rides;
}
