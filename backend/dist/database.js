"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDB = void 0;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
// Initialize the database connection
const db = new better_sqlite3_1.default('./database.db', { verbose: console.log });
const getDB = () => db;
exports.getDB = getDB;
