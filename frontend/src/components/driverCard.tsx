"use client"

import { useDriversContext } from "@/contexts/drivers.context";
import { useResultContext } from "@/contexts/result.context";
import { DriverProps } from "@/interfaces/interfaces";
import Image from "next/image"
import { useRouter } from "next/navigation";

export default function DriverCard ({ id, driverImg, car, rating, value, about, comment, name, distance, duration }: DriverProps) {
    const router = useRouter();
    const { customer_id, setCustomer_id } = useResultContext()
    const { setDriver } = useDriversContext()

    const handleClick = async (event: React.FormEvent) => {
        event.preventDefault();

        const origin = localStorage.getItem("origin_address");
        const destination = localStorage.getItem("destination_address");
        const requestBody = {
            customer_id,
            origin,
            destination,
            distance,
            duration,
            driver: {
                id,
                name
            },
            value
        };

        try {

            // Send data to the backend
            const response = await fetch('http://localhost:8080/ride/confirm', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
        } catch (error) {
            console.error('Error sending data to backend:', error);
        }; 

        router.replace(`http://localhost:3000/ride/${customer_id}`);
        
        setDriver({id, name});
    }


    return (
        <div className="p-6 rounded bg-green-100 text-green-900 w-[90%] shadow-md">
            <div className="flex items-center justify-between flex-col text-center mb-2">
                <Image src={driverImg} alt="Foto do motorista" height={80} width={80} className="rounded-full object-cover w-20 h-20"/>
                <div className="mt-3">
                    <p className="font-bold">{name}</p>
                    <p className="italic">{car}</p>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="flex items-center justify-between">
                    <div className="flex gap-1 mb-4">
                        <p className="font-bold text-sm">Nota:</p>
                        <p className=" text-sm">{rating}</p>
                    </div>
                    <div className="flex gap-1 mb-4">
                        <p className="font-bold text-sm">Valor da Corrida:</p>
                        <p className=" text-sm">R$ {value}</p>
                    </div>
                </div>
                <h3 className="underline">Sobre</h3>
                <p className="mb-3 text-justify">{about}</p>
                <h3 className="underline">Avaliações</h3>
                <p className="mb-3 text-justify">{comment}</p>
                <button type="button" onClick={handleClick} className="bg-green-700 rounded p-1 text-slate-50">Escolher</button>
            </div>
        </div>
    )
}