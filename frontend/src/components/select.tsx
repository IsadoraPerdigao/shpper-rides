import { useApiResultContext } from "@/contexts/apiResult";
import { useState } from "react";

interface DriverName {
    name: string;
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
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  getAllDrivers();

  return (
    <select
      name="drivers"
      id="drivers"
      className="p-2 rounded text-gray-500"
      onChange={(e) => {
        const selectedDriver = drivers.find(
          (driver) => driver.id === Number(e.target.value)
        );
        setHasDriver(true);
        setDriverId(selectedDriver!.id);
      }}
    >
      <option value="">Selecione um motorista</option>
      {customer_id
        ? drivers.map((driver) => (
            <option key={driver.id} value={driver.id}>
              {driver.name}
            </option>
          ))
        : driversNames.map((driver, index) => (
            <option key={index} value={driver.name}>
              {driver.name}
            </option>
          ))}
    </select>
  );
}
