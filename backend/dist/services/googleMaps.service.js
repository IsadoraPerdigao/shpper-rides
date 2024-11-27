"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoordinates = getCoordinates;
exports.getDistance = getDistance;
exports.getRoute = getRoute;
const axios_1 = __importDefault(require("axios"));
const apiKey = "AIzaSyBBKTGBLTwv-0H81vaKx0IKbOaOKA-fz3Y";
const coordinatesUrl = "https://maps.googleapis.com/maps/api/geocode/json";
const distanceUrl = "https://maps.googleapis.com/maps/api/distancematrix/json";
const routeResponseUrl = "https://maps.googleapis.com/maps/api/directions/json";
function getCoordinates(address) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(coordinatesUrl, {
                params: {
                    address,
                    key: apiKey
                },
            });
            if (response.data.results.length > 0) {
                const location = response.data.results[0].geometry.location;
                return location;
            }
            else {
                throw new Error("No results found");
            }
        }
        catch (error) {
            console.error("Error fetching geocode data:", error);
            throw error;
        }
    });
}
function getDistance(originAddress, destinationAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(distanceUrl, {
                params: {
                    origins: originAddress,
                    destinations: destinationAddress,
                    key: apiKey
                },
            });
            const distance = response.data.rows[0].elements[0].distance.text;
            const duration = response.data.rows[0].elements[0].duration.text;
            return { distance, duration };
        }
        catch (error) {
            console.error("Error fetching distance data:", error);
            throw error;
        }
    });
}
function getRoute(originAddress, destinationAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(routeResponseUrl, {
                params: {
                    origin: originAddress,
                    destination: destinationAddress,
                    key: apiKey
                }
            });
            // If no routes are found
            if (response.data.routes.length === 0) {
                throw new Error("No route found between origin and destination");
            }
            const route = response.data.routes[0];
            return {
                distance: route.legs[0].distance.text,
                duration: route.legs[0].duration.text,
                steps: route.legs[0].steps,
                teste: route.legs
            };
        }
        catch (error) {
            console.error("Error getting directions:", error);
        }
    });
}
;
