import express, { NextFunction, Request, Response } from 'express';

import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { createTables } from './createsDB';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import ridesRouter from './routes/rides.route';
import dataRouter from './routes/drivers.route';

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(cors());
app.use('/ride', ridesRouter);
app.use('/drivers', dataRouter);

createTables();
app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
