"use client"

import { RidesForm } from "@/components/ridesForm";
import { useApiResultContext } from "@/contexts/apiResult";

export default function GetRidesPage () {
    const { result } = useApiResultContext()
    return (
        <div className="">
            <RidesForm />
            <ul>
                <li>{result.driver.name}</li>
            </ul>
        </div>
    )
}