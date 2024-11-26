"use client"

import { useDriversContext } from "@/contexts/drivers.context";
import { useResultContext } from "@/contexts/result.context";
import { ChangeEvent, useEffect, useState } from "react";

export function Select () {
    const { customer_id } = useResultContext();
    const {drivers, driversByCustomer, getDriversByCustomer, getDrivers, setDriver } = useDriversContext()

    useEffect(() => {
        console.log("olar")
        if (customer_id) {
            getDriversByCustomer(customer_id)
        } else {
            getDrivers()
        }
    }, [])
    


    const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const driver = driversByCustomer.filter((driver) => driver.name == e.target.value)[0];
        setDriver(driver)
    } 

    return (
        <>
        {customer_id ? <select name="drivers" id="drivers" onChange={handleOnChange}>
            {driversByCustomer.map((driver, index) => (<option value="driverName" key={index}>{driver.name}</option>))}
        </select> : <select name="drivers" id="drivers" onChange={handleOnChange}>
            {drivers.map((driver, index) => (<option value="driverName" key={index}>{driver.name}</option>))}
        </select>}
        </>
    )
}