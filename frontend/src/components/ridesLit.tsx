import { useApiResultContext } from "@/contexts/apiResult";
import { RideCard } from "./rideCard";

export function RidesList() {
  const { result } = useApiResultContext();

  return (
    <ul className="flex flex-col gap-3">
      {result.map((ride) => (
        <RideCard
          key={ride.id}
          date={ride.date}
          destination={ride.destination}
          distance={ride.distance}
          driver={ride.driver}
          duration={ride.duration}
          id={ride.id}
          origin={ride.origin}
          value={ride.value}
        />
      ))}
    </ul>
  );
}
