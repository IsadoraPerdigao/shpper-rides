import { Dispatch, SetStateAction } from "react";

export type GetDriversByCustomer = (customer_id: string) => Promise<void>;

export type GetDrivers = () => Promise<void>;

export interface Driver {
  id: number;
  name: string;
};

export interface Drivers {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    rating: number;
    comment: string;
    tax: number;
    minKm: number;
};

export interface DriverProps  {
    id: number;
    driverImg: string;
    name: string;
    car: string;
    rating: number;
    value: number;
    about: string;
    comment: string;
    distance: number;
    duration: string;
};

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
    },
    value: number;
};

export interface ApiResult {
    destination: object;
    origin: object;
    options: {
      id: number;
      name: string;
      driverImg: string;
      description: string;
      car: string;
      review: {
        comment: string;
        rating: number;
      };
      value: number;
    }[];
    distance: number;
    duration: string;
    routeResponse: object;
};