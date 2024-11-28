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

export function RideCard({
  driver,
  date,
  value,
  origin,
  destination,
  distance,
  duration,
}: GetResult) {
  const cardDate = new Date(date);
  const formattedDate = cardDate.toLocaleString("pt-BR");

  return (
    <div className="border rounded p-2 bg-gray-200 shadow-lg">
      <h3 className="mb-4 text-center font-bold">{driver.name}</h3>
      <div className="flex flex-col justify-around">
        <div className="grid grid-flow-col">
          <div>
            <p className="font-bold">Data</p>
            <p>{formattedDate}</p>
          </div>
          <div>
            <p className="font-bold">Valor da corrida</p>
            <p>{value}</p>
          </div>
        </div>
        <div className="grid grid-flow-col">
          <div>
            <p className="font-bold">Origem</p>
            <p>{origin}</p>
          </div>
          <div>
            <p className="font-bold">Destino</p>
            <p>{destination}</p>
          </div>
        </div>
        <div className="grid grid-flow-col">
          <div>
            <p className="font-bold">Distância</p>
            <p>{distance}</p>
          </div>
          <div>
            <p className="font-bold">Duração da Viagem</p>
            <p>{duration}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
