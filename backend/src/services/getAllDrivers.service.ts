import { getDB } from "../database";

export function getDriversService() {
  const db = getDB();

  const drivers = db
    .prepare(`SELECT * FROM Drivers`).all()
  return drivers;
}