"use client"

import { Driver, Drivers, GetDrivers, GetDriversByCustomer } from "@/interfaces/interfaces";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

interface Props {
    children: ReactNode;
}

interface DriverProvider {
  drivers: Drivers[];
  setDrivers: Dispatch<SetStateAction<Drivers[]>>;
  driversByCustomer: Drivers[];
  setDriversByCustomer: Dispatch<SetStateAction<Drivers[]>>;
  getDriversByCustomer: GetDriversByCustomer;
  getDrivers: GetDrivers;
  driver: Driver;
  setDriver: Dispatch<SetStateAction<Driver>>;
}

const DriverContext = createContext({} as DriverProvider);

export function DriverProvider({ children }: Props) {
    const [ drivers, setDrivers] = useState<Drivers[]>([])
    const [driver, setDriver] = useState<Driver>({
      id: 0,
      name: ""
    })
    const [driversByCustomer, setDriversByCustomer] = useState<Drivers[]>([])

    const getDriversByCustomer = async (customer_id: string) => {
        try {
            const response = await fetch(
              `http://localhost:8080/drivers/${customer_id}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
      
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
      
            const result = await response.json();
            setDriversByCustomer(result);
          } catch (error) {
            console.error("Error sending data to backend:", error);
          }
    }

    const getDrivers = async () => {
        try {
            const response = await fetch(
              `http://localhost:8080/drivers/`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
      
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
      
            const result = await response.json();
            setDrivers(result);
          } catch (error) {
            console.error("Error sending data to backend:", error);
          }
    }

  
  return (
    <DriverContext.Provider value={{
        drivers,
        setDrivers,
        driversByCustomer,
        setDriversByCustomer,
        getDriversByCustomer,
        getDrivers,
        driver,
        setDriver
    }}>{children}</ DriverContext.Provider >
  )
}

export const useDriversContext = () => useContext(DriverContext);