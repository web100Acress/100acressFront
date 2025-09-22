import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const LocationCtx = createContext(null);

export function LocationProvider({ children }) {
  const [consent, setConsent] = useState(() => localStorage.getItem("geoConsent"));
  const [coords, setCoords] = useState(() => {
    try {
      const s = localStorage.getItem("geoCoords");
      return s ? JSON.parse(s) : null;
    } catch {
      return null;
    }
  });

  // Keep localStorage in sync when state changes
  useEffect(() => {
    if (consent) localStorage.setItem("geoConsent", consent);
  }, [consent]);
  useEffect(() => {
    if (coords) localStorage.setItem("geoCoords", JSON.stringify(coords));
  }, [coords]);

  const value = useMemo(() => ({ consent, setConsent, coords, setCoords }), [consent, coords]);
  return <LocationCtx.Provider value={value}>{children}</LocationCtx.Provider>;
}

export function useLocationContext() {
  const ctx = useContext(LocationCtx);
  if (!ctx) throw new Error("useLocationContext must be used within LocationProvider");
  return ctx;
}

// Helper: map coordinates to nearest supported city label
export function mapCoordsToCity({ lat, lng }) {
  if (typeof lat !== "number" || typeof lng !== "number") return null;
  const cities = [
    { name: "Gurgaon", lat: 28.4595, lng: 77.0266 },
    { name: "Noida", lat: 28.5355, lng: 77.3910 },
    { name: "Dwarka Expressway", lat: 28.4880, lng: 76.9980 },
  ];
  const toRad = (d) => (d * Math.PI) / 180;
  const R = 6371; // km
  const dist = (a, b) => {
    const dLat = toRad(b.lat - a.lat);
    const dLng = toRad(b.lng - a.lng);
    const sa = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(sa));
  };
  let best = null;
  for (const c of cities) {
    const d = dist({ lat, lng }, c);
    if (!best || d < best.d) best = { name: c.name, d };
  }
  // Optional radius threshold (km) to avoid wrong picks; keep generous for now
  return best?.name || null;
}