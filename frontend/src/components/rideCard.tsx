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
    <div>
      <h3>{driver.name}</h3>
      <div>
        <div className="flex"
        >
          <p>{formattedDate}</p>
          <p>{value}</p>
        </div>
        <div>
          <p>{origin}</p>
          <p>{destination}</p>
        </div>
        <div>
          <p>{distance}</p>
          <p>{duration}</p>
        </div>
      </div>
    </div>
  );
}
