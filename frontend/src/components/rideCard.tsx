"use client"

import { GetResult } from "@/interfaces/interfaces"

export function RideCard (result : GetResult ) {
    return (
        <div>
            <h3>{result.driver.name}</h3>
            <div>
                <p>{(result.date).toLocaleString()}</p>
                <p>R$ {result.value}</p>
            </div>
            <div>
                <p>{result.origin}</p>
                <p>{result.destination}</p>
            </div>
            <div>
                <p>{result.duration}</p>
                <p>{result.distance} km</p>
            </div>
        </div>
    )
}