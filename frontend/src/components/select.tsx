import { useApiResultContext } from "@/contexts/apiResult";
import { useEffect, useState } from "react";

interface DriverName {
  name: string;
  id: string;
}

export function Select() {
  const { apiResult, setHasDriver, setDriverId, customer_id } =
    useApiResultContext();
  const [driversNames, setDriversNames] = useState<DriverName[]>([]);

  const drivers = apiResult.options;

  const getAllDrivers = async () => {
    try {
      const response = await fetch("http://localhost:8080/drivers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setDriversNames(result);
      console.log(result)
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  useEffect(() => {
    getAllDrivers();
  }, []);

  return (
    <select
      name="drivers"
      id="drivers"
      className="p-2 rounded text-gray-500"
      onChange={(e) => {
        console.log(e.target.value)
        const drivers = driversNames.find(
          (driver) => driver.id == e.target.value
        );
        
        setHasDriver(true);
        setDriverId(drivers!.id);
      }}
    >
      <option value="">Selecione um motorista</option>
      {driversNames.map((driver, index) => (
        <option key={index} value={driver.id}>
          {driver.name}
        </option>
      ))}
    </select>
  );
}
