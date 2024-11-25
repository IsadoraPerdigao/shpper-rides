"use client"

import { ApiResult } from "@/app/ride/estimate/page";
import car_app from "../assets/car_app.jpeg"
import Image from "next/image";

type DirectionsFormProps = {
    setCustomer_id: React.Dispatch<React.SetStateAction<string>>;
    setOrigin: React.Dispatch<React.SetStateAction<string>>;
    setDestination: React.Dispatch<React.SetStateAction<string>>;
    setRouteUrl: React.Dispatch<React.SetStateAction<string>>;
    customer_id: string;
    origin: string;
    destination: string;
    setApiResult: React.Dispatch<React.SetStateAction<ApiResult>>;
};


export default function DirectionsForm ({ setCustomer_id, setOrigin, setDestination, setRouteUrl, customer_id, origin, destination, setApiResult }: DirectionsFormProps) {
    

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!origin || !destination) return;

        const formData = {
            customer_id,
            origin,
            destination,
        };
        // Saves customer_id to localstorage
        localStorage.setItem("customer_id", customer_id);
        localStorage.setItem("origin_address", origin);
        localStorage.setItem("destination_address", destination);

        try {

            // Send form data to the backend
            const response = await fetch('http://localhost:8080/ride/estimate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json(); 
            setApiResult(result)

            const encodedOrigin = encodeURIComponent(origin);
            const encodedDestination = encodeURIComponent(destination);
        

            const directionsUrl = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyBBKTGBLTwv-0H81vaKx0IKbOaOKA-fz3Y&origin=${encodedOrigin}&destination=${encodedDestination}`;

            setRouteUrl(directionsUrl);
            
        } catch (error) {
            console.error('Error sending data to backend:', error);
        };
    }
    return (
        <>
        <form action="" onSubmit={handleSubmit} className="flex flex-col gap-3 border p-4">
            <h2 className="text-gray-600">Informações de Viagem</h2>
            <input type="text" placeholder="Insira seu cpf" className="border-b" value={customer_id || ""} onChange={(e) => setCustomer_id(e.target.value)}/>
            <input type="text" placeholder="Endereço de origem" className="border-b" value={origin || ""} onChange={(e) => setOrigin(e.target.value)}/>
            <input type="text" placeholder="Endereço de destino" className="border-b" value={destination || ""} onChange={(e) => setDestination(e.target.value)}/>
            <button type="submit" className="rounded bg-green-700 p-1 text-white">Calcular Valor</button>
        </form>
        <Image src={car_app} width={300} alt="Imagem de um carro, um celular e uma pessoa" className="ml-10"/>
        </>
    )
}