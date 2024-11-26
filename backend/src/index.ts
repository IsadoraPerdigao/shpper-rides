import express from "express";
import ridesRouter from "./routes/rides.route"
import driverRouter from "./routes/drivers.route"
import cors from "cors"


const app = express();

const PORT = 8080;

app.use(express.json())
app.use(cors());
app.use("/ride", ridesRouter)
app.use("/drivers", driverRouter)

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`)
});