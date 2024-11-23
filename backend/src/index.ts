import express, { NextFunction, Request, Response } from "express";
import ridesRouter from "./routes/rides.route"
const app = express();

const PORT = 8080;

app.use("/ride", ridesRouter)

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`)
});