"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rides_route_1 = __importDefault(require("./routes/rides.route"));
const drivers_route_1 = __importDefault(require("./routes/drivers.route"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 8080;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/ride", rides_route_1.default);
app.use("/drivers", drivers_route_1.default);
app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
});
