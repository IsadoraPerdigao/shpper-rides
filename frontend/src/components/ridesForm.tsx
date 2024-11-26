"use client";

import car_app from "../assets/car_app.jpeg";
import Image from "next/image";
import { Select } from "./select";
import { useApiResultContext } from "@/contexts/apiResult";

export function RidesForm() {
  const { setCustomer_id, setGetResult, customer_id } = useApiResultContext();

  const handleGetSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/ride/${customer_id}`,
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
  };

  return (
    <div className="items-center justify-center flex flex-col gap-3">
      <form
        action=""
        onSubmit={handleGetSubmit}
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
