import express, { NextFunction, Request, Response } from "express";
import ridesRouter from "./routes/rides.route"
import dataRouter from "./routes/data.route"
import cors from "cors"


const app = express();

const PORT = 8080;

app.use(express.json())
app.use(cors());
app.use("/ride", ridesRouter)
app.use("/data", dataRouter)

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`)
});