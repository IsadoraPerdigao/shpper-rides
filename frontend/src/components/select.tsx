import { useApiResultContext } from "@/contexts/apiResult";

export function Select () {
    const { apiResult } = useApiResultContext()
    
    const drivers = apiResult.options

    return (
        <>
        {drivers? <select name="drivers" id="drivers">
            {drivers.map((driver, index) => (<option value="driverName" key={index}>{driver.name}</option>))}
        </select> : "Panana"}
        </>
    )
}