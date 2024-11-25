"use client"

import DirectionsForm from "@/components/directionsForm";
import DriversList from "@/components/driverList";
import Image from "next/image";
import { useState } from "react";

export interface ApiResult {
    destination: object;
    origin: object;
    options: {
        id: number;
        name: string;
        driverImg: string;
        description: string;
        car: string;
        review: {
            comment: string;
            rating: number;
        };
        value: number;
    }[];
    distance: number;
    duration: string;
    routeResponse: object
}

export default function EstimateRidePage () {
    const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=São+Paulo,SP&zoom=10&size=600x400&key=AIzaSyBBKTGBLTwv-0H81vaKx0IKbOaOKA-fz3Y`;
    const [customer_id, setCustomer_id] = useState('')
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [routeUrl, setRouteUrl] = useState('');
    const [apiResult, setApiResult] = useState<ApiResult>({
        options: [],          
        destination: {},     
        origin: {},           
        distance: 0,          
        duration:"",          
        routeResponse: {}});

    return (
        <div className="flex justify-around">
            <div className="flex flex-col gap-5 w-2/5 h-full">
            {routeUrl ? (
                <DriversList apiResult={apiResult}/>)
            : 
            (<DirectionsForm 
            setCustomer_id={setCustomer_id} 
            setOrigin={setOrigin} 
            setDestination={setDestination} 
            setRouteUrl={setRouteUrl} 
            customer_id={customer_id}
            origin={origin}
            destination={destination}
            setApiResult={setApiResult} />   )             
            }
            </div>
                {routeUrl ? (
                    <>
                    <iframe
                    title="Rota"
                    width="700"
                    height="525"
                    style={{ border: 0 , position: "sticky"}}
                    src={routeUrl}
                    allowFullScreen
                    className="sticky top-5"
                    ></iframe>
                    </>
                ) : (
                    <Image src={staticMapUrl} alt="Mapa Estático" height={350} width={600}/>
                )}
        </div>
    )
}