import { getDB } from "../database";

export function getRidesByCustomerService(customer_id: string) {
  const db = getDB();

  const rides = db
    .prepare(`SELECT * FROM Rides WHERE customer_id = ?`)
    .all(customer_id);
  return rides;
}
