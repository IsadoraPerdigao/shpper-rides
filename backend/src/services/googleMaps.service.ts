import axios from "axios";

const apiKey = "AIzaSyBBKTGBLTwv-0H81vaKx0IKbOaOKA-fz3Y"
const coordinatesUrl = "https://maps.googleapis.com/maps/api/geocode/json"
const distanceUrl = "https://maps.googleapis.com/maps/api/distancematrix/json"
const routeResponseUrl = "https://maps.googleapis.com/maps/api/directions/json"

export async function getCoordinates(address: string) {
    try {
        const response = await axios.get(coordinatesUrl, {
            params: {
                address,
                key: apiKey
            },
        });

        if (response.data.results.length > 0) {
            const location = response.data.results[0].geometry.location;
            return location;
        } else {
            throw new Error("No results found");
        }
    } catch (error) {
        console.error("Error fetching geocode data:", error);
        throw error;        
    }
}

export async function getDistance(originAddress: string, destinationAddress: string) {
    try {
        const response = await axios.get(distanceUrl, {
            params: {
                origins: originAddress,
                destinations: destinationAddress,
                key: apiKey
            },
        });

        const distance = response.data.rows[0].elements[0].distance.text;
        const duration = response.data.rows[0].elements[0].duration.text;

        return {distance, duration};

    } catch (error) {
        console.error("Error fetching distance data:", error);
        throw error;        
    }
}

export async function getRoute(originAddress: string, destinationAddress: string) {
    try {
        const response = await axios.get(routeResponseUrl, {
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

        return response.data.routes[0];
        
    } catch (error) {
        console.error("Error getting directions:", error)
    }
};