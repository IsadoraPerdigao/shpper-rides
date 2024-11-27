"use client";

import { RidesForm } from "@/components/ridesForm";
import { RidesList } from "@/components/ridesLit";
import { useApiResultContext } from "@/contexts/apiResult";
import { useCallback, useEffect, useState } from "react";

export default function GetRidesPage() {
  return (
    <div className="">
      <RidesForm />
      <RidesList />
    </div>
  );
}
