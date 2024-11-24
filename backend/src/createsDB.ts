import { getDB } from './database';

const db = getDB();

// Create tables
const createTables = () => {
  // Create the Customers table
  db.exec(`
    CREATE TABLE IF NOT EXISTS Customers (
      id TEXT PRIMARY KEY
    );
  `);

  // Create the Drivers table
  db.exec(`
    CREATE TABLE IF NOT EXISTS Drivers (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      vehicle TEXT NOT NULL,
      raiting INTEGER,
      comment TEXT NOT NULL,
      tax FLOAT,
      minKm INTEGER
    );
  `);

  // Create the Rides table
  db.exec(`
    CREATE TABLE IF NOT EXISTS Rides (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id TEXT NOT NULL,
      driver_id INTEGER,
      origin TEXT NOT NULL,
      destination TEXT NOT NULL,
      price FLOAT,
      distance_km FLOAT,
      duration TEXT,
      date TEXT,
      value FLOAT,
      FOREIGN KEY (customer_id) REFERENCES Customers(id),
      FOREIGN KEY (driver_id) REFERENCES Drivers(id)
    );
  `);
  

  // Create the Estimates table
  db.exec(`
    CREATE TABLE IF NOT EXISTS Estimates (
      customer_id TEXT NOT NULL,
      origin TEXT NOT NULL,
      origin_lat TEXT,
      origin_lng TEXT,
      destination TEXT NOT NULL,
      destination_lat TEXT,
      destination_lng TEXT,
      estimated_distance_km REAL NOT NULL,
      FOREIGN KEY (customer_id) REFERENCES Customers(id)
    );
`);

  console.log("Tables created successfully!");
};

createTables();