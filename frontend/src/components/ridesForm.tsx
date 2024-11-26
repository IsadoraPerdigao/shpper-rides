"use client";

import car_app from "../assets/car_app.jpeg";
import Image from "next/image";
import { Select } from "./select";
import { useResultContext } from "@/contexts/result.context";
import { useEffect, useState } from "react";
import { useDriversContext } from "@/contexts/drivers.context";

export function RidesForm() {
  const { setCustomer_id, customer_id, getRides } = useResultContext();
  const { driver } = useDriversContext()

  return (
    <div className="items-center justify-center flex flex-col gap-3">
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          getRides(customer_id, driver.id);
        }}
        className="flex flex-col gap-3 border p-4"
      >
        <h2 className="text-gray-600">Viagens realizadas</h2>
        <input
          type="text"
          placeholder="Insira seu cpf"
          className="border-b"
          value={customer_id || ""}
          onChange={(e) => setCustomer_id(e.target.value)}
        />
        <Select />
        <button type="submit">Buscar</button>
      </form>
      <Image
        src={car_app}
        width={200}
        alt="Imagem de um carro, um celular e uma pessoa"
      />
    </div>
  );
}
