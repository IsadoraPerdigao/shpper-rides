import { getDB } from "../database";

export function getDriversByCustomerService(customer_id: string) {
  const db = getDB();

  const drivers = db
    .prepare(`SELECT * FROM Drivers WHERE customer_id = ?`)
    .all(customer_id);
  return drivers;
}
