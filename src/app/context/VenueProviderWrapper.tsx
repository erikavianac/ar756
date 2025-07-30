"use client";
import { VenueProvider } from "./VenueContext";

export function VenueProviderWrapper({ children }: { children: React.ReactNode }) {
  return <VenueProvider>{children}</VenueProvider>;
}