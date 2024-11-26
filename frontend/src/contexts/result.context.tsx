"use client";

import { ApiResult } from "@/interfaces/interfaces";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

export type SubmitHandler = (event: React.FormEvent) => Promise<void>;

type GetRides = (customer_id: string, driver_id?: number) => Promise<void>

interface Props {
  children: ReactNode;
}

interface GetResult {
    
    id: number;
    date: Date;
    origin: string;
    destination: string;
    duration: string;
    distance: number;
    driver: {
        driverIdBd: number;
        name: string;
    },
    value: number;
}

interface ResultProvider {
    customer_id: string;
    setCustomer_id: Dispatch<SetStateAction<string>>;
    setOrigin: Dispatch<SetStateAction<string>>;
    setDestination: Dispatch<SetStateAction<string>>;
    routeUrl: string;
    apiResult: ApiResult;
    handleSubmit: SubmitHandler;
    setRouteUrl: Dispatch<SetStateAction<string>>;
    origin: string;
    destination: string;
    setApiResult: Dispatch<SetStateAction<ApiResult>>;
    setGetResult: Dispatch<SetStateAction<GetResult[]>>
    result: GetResult[];
    getRides: GetRides;
}

const ResutContext = createContext({} as ResultProvider);

export function ResultProvider({ children }: Props) {
  const [customer_id, setCustomer_id] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [routeUrl, setRouteUrl] = useState("");
  const [apiResult, setApiResult] = useState<ApiResult>({
    options: [],
    destination: {},
    origin: {},
    distance: 0,
    duration: "",
    routeResponse: {},
  });
  const [result, setGetResult] = useState<GetResult[]>([]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!origin || !destination) return;

    const formData = {
      customer_id,
      origin,
      destination,
    };

    try {
      // Send form data to the backend
      const response = await fetch("http://localhost:8080/ride/estimate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setApiResult(result);
      setCustomer_id(customer_id)

      const encodedOrigin = encodeURIComponent(origin);
      const encodedDestination = encodeURIComponent(destination);

      const directionsUrl = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyBBKTGBLTwv-0H81vaKx0IKbOaOKA-fz3Y&origin=${encodedOrigin}&destination=${encodedDestination}`;

      setRouteUrl(directionsUrl);
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  const getRides = async (customer_id: string, driver_id?: number) => {
    try {
      const response = await fetch(
        `http://localhost:8080/ride/${customer_id}${driver_id ? `?driver_id=${driver_id}` : ''}`,
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
      setGetResult(result);
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  }


  return (
    <ResutContext.Provider value={{
        customer_id,
        setCustomer_id,
        setOrigin,
        setDestination,
        routeUrl,
        apiResult, 
        handleSubmit,
        setRouteUrl,
        origin,
        destination,
        setApiResult,
        setGetResult,
        result, 
        getRides
    }}>{children}</ ResutContext.Provider >
  )
}

export const useResultContext = () => useContext(ResutContext);
