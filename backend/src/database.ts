import Database from 'better-sqlite3';

// Initialize the database connection
const db = new Database('./database.db', { verbose: console.log });

export const getDB = () => db;
