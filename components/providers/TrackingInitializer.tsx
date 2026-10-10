"use client";

import { useEffect } from "react";
import { captureTrafficAttribution } from "@/lib/tracking";

export default function TrackingInitializer() {
  useEffect(() => {
    // Capture attribution on client-side initial visit
    captureTrafficAttribution();
  }, []);

  return null;
}
