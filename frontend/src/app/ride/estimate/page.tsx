"use client";

import DirectionsForm from "@/components/directionsForm";
import DriversList from "@/components/driverList";
import { useResultContext } from "@/contexts/result.context";
import Image from "next/image";

export default function EstimateRidePage() {

  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=São+Paulo,SP&zoom=10&size=600x400&key=AIzaSyBBKTGBLTwv-0H81vaKx0IKbOaOKA-fz3Y`;

  const {
    apiResult,
    routeUrl
  } = useResultContext();

  return (
    <div className="flex">
      <div className="flex flex-col w-2/5 h-full">
        {routeUrl ? (
          <DriversList  />
        ) : (
          <DirectionsForm/>
        )}
      </div>
      {routeUrl ? (
        <>
          <iframe
            title="Rota"
            width="700"
            height="525"
            style={{ border: 0, position: "sticky" }}
            src={routeUrl}
            allowFullScreen
            className="sticky top-5"
          ></iframe>
        </>
      ) : (
        <Image
          src={staticMapUrl}
          alt="Mapa Estático"
          height={250}
          width={500}
        />
      )}
    </div>
  );
}
