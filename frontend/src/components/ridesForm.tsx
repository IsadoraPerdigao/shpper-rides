"use client";

import car_app from "../assets/car_app.jpeg";
import Image from "next/image";
import { Select } from "./select";
import { useApiResultContext } from "@/contexts/apiResult";

export function RidesForm() {
  const { setCustomer_id, customer_id, getRides } = useApiResultContext();

  return (
    <div className="items-center justify-center flex flex-col gap-3">
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          getRides(customer_id);
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
        <button
          type="submit"
          disabled={customer_id ? false : true}
          className="bg-green-700 p-1 rounded text-white disabled:bg-gray-300"
        >
          Buscar
        </button>
      </form>
      <Image
        src={car_app}
        width={200}
        alt="Imagem de um carro, um celular e uma pessoa"
      />
    </div>
  );
}
