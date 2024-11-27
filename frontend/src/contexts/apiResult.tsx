"use client";

import { ApiResult } from "@/app/ride/estimate/page";
import axios from "axios";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type SubmitHandler = (event: React.FormEvent) => Promise<void>;
type GetRides = (id: string | null) => Promise<void>;

interface Props {
  children: ReactNode;
}

export interface GetResult {
  id: number;
  date: Date;
  origin: string;
  destination: string;
  duration: string;
  distance: number;
  driver: {
    driverIdBd: number;
    name: string;
  };
  value: number;
}

interface apiResultProvider {
  customer_id: string | null;
  setCustomer_id: Dispatch<SetStateAction<string | null>>;
  setOrigin: Dispatch<SetStateAction<string>>;
  setDestination: Dispatch<SetStateAction<string>>;
  routeUrl: string;
  apiResult: ApiResult;
  handleSubmit: SubmitHandler;
  setRouteUrl: Dispatch<SetStateAction<string>>;
  origin: string;
  destination: string;
  setApiResult: Dispatch<SetStateAction<ApiResult>>;
  setGetResult: Dispatch<SetStateAction<GetResult[]>>;
  result: GetResult[];
  setHasDriver: Dispatch<SetStateAction<boolean>>;
  getRides: GetRides;
  setDriverId: Dispatch<SetStateAction<number>>;
}

const ApiResutContext = createContext({} as apiResultProvider);

export function ApiResultProvider({ children }: Props) {
  const [customer_id, setCustomer_id] = useState<string | null>(null);
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
  const [hasDriver, setHasDriver] = useState(false);
  const [driverId, setDriverId] = useState(0);

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
      const response = await axios.post(
        "http://localhost:8080/ride/estimate",
        formData
      );

      const result = await response;
      setApiResult(result.data);
      setCustomer_id(customer_id)

      const encodedOrigin = encodeURIComponent(origin);
      const encodedDestination = encodeURIComponent(destination);

      const directionsUrl = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyBBKTGBLTwv-0H81vaKx0IKbOaOKA-fz3Y&origin=${encodedOrigin}&destination=${encodedDestination}`;

      setRouteUrl(directionsUrl);
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  const getRides = async (id: string | null) => {
    try {
      const baseUrl = `http://localhost:8080/ride/${id}`;
      const url = hasDriver ? `${baseUrl}?driver_id=${driverId}` : baseUrl;
      const response = await axios.get(url);
      const result = await response;

      setGetResult(result.data);
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }

    return
  };

  return (
    <ApiResutContext.Provider
      value={{
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
        setDriverId,
        setHasDriver,
        getRides,
      }}
    >
      {children}
    </ApiResutContext.Provider>
  );
}

export const useApiResultContext = () => useContext(ApiResutContext);
