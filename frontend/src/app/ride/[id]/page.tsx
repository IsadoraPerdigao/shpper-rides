"use client"

import { RideCard } from "@/components/rideCard";
import { RidesForm } from "@/components/ridesForm";
import { useResultContext } from "@/contexts/result.context";

export default function GetRidesPage () {
    const { result, customer_id } = useResultContext();

    return (
        <div className="">
            <RidesForm />
            <ul>
                {result.map(result => <RideCard key={result.id} date={result.date} destination={result.destination} distance={result.distance} driver={result.driver} duration={result.duration} id={result.id} origin={result.origin} value={result.value}/>)}
            </ul>
        </div>
    )
}