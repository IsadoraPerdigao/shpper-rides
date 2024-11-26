"use client";

import { ApiResult } from "@/app/ride/estimate/page";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

export type SubmitHandler = (event: React.FormEvent) => Promise<void>;

interface Props {
  children: ReactNode;
}

interface GetResult {
    
    id: number;
    date: Date;
    origin: string;
    destination: string;
    duration: string;
    driver: {
        driverIdBd: number;
        name: string;
    },
    value: number;
}

interface apiResultProvider {
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
    setGetResult: Dispatch<SetStateAction<GetResult>>
    result: GetResult;
}

const ApiResutContext = createContext({} as apiResultProvider);

export function ApiResultProvider({ children }: Props) {
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
  const [result, setGetResult] = useState<GetResult>({
    id: 0,
    date: new Date(),
    origin: "",
    destination: "",
    duration: "",
    driver: {
        driverIdBd: 0,
        name: ""
    },
    value: 0
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!origin || !destination) return;

    const formData = {
      customer_id,
      origin,
      destination,
    };
    // Saves customer_id to localstorage
    localStorage.setItem("customer_id", customer_id);
    localStorage.setItem("origin_address", origin);
    localStorage.setItem("destination_address", destination);

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

      const encodedOrigin = encodeURIComponent(origin);
      const encodedDestination = encodeURIComponent(destination);

      const directionsUrl = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyBBKTGBLTwv-0H81vaKx0IKbOaOKA-fz3Y&origin=${encodedOrigin}&destination=${encodedDestination}`;

      setRouteUrl(directionsUrl);
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };


  return (
    <ApiResutContext.Provider value={{
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
        result
    }}>{children}</ ApiResutContext.Provider >
  )
}

export const useApiResultContext = () => useContext(ApiResutContext);
