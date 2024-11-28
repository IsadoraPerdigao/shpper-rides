import express, { NextFunction, Request, Response } from 'express';

import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
console.log('diiiiiir ', path.resolve(__dirname, '../../.env'));
// console.log('Environment Variables:', process.env);
import ridesRouter from './routes/rides.route';
import dataRouter from './routes/drivers.route';

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(cors());
app.use('/ride', ridesRouter);
app.use('/drivers', dataRouter);

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
