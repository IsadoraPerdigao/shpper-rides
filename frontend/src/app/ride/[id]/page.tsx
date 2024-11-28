"use client";

import { RidesForm } from "@/components/ridesForm";
import { RidesList } from "@/components/ridesLit";

export default function GetRidesPage() {
  return (
    <div className="flex justify-around h-full">
      <RidesForm />
      <RidesList />
    </div>
  );
}
