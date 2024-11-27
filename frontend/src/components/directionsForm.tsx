"use client";

import car_app from "../assets/car_app.jpeg";
import Image from "next/image";
import { useApiResultContext } from "@/contexts/apiResult";

export default function DirectionsForm() {
  const {
    setCustomer_id,
    setOrigin,
    setDestination,
    setRouteUrl,
    customer_id,
    origin,
    destination,
    setApiResult,
    handleSubmit,
  } = useApiResultContext();

  return (
    <div className="items-center justify-center flex flex-col gap-3">
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 border p-4"
      >
        <h2 className="text-gray-600">Informações de Viagem</h2>
        <input
          type="text"
          placeholder="Insira seu cpf"
          className="border-b"
          value={customer_id || ""}
          onChange={(e) => setCustomer_id(e.target.value)}
        />
        <input
          type="text"
          placeholder="Endereço de origem"
          className="border-b"
          value={origin || ""}
          onChange={(e) => setOrigin(e.target.value)}
        />
        <input
          type="text"
          placeholder="Endereço de destino"
          className="border-b"
          value={destination || ""}
          onChange={(e) => setDestination(e.target.value)}
        />
        <button type="submit" className="rounded bg-green-700 p-1 text-white">
          Calcular Valor
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
