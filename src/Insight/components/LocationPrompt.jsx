import React, { useEffect, useState } from "react";
export default function LocationPrompt() {
  const [status, setStatus] = useState(() => localStorage.getItem("geoConsent"));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Normalize any unexpected values
    if (status !== "granted" && status !== "denied" && status !== null) {
      localStorage.removeItem("geoConsent");
      setStatus(null);
    }
  }, [status]);

  const ask = () => {
    if (!("geolocation" in navigator)) {
      setError("Geolocation not supported in this browser.");
      setStatus("denied");
      localStorage.setItem("geoConsent", "denied");
      return;
    }
    setBusy(true);
    setError("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        try {
          const { latitude, longitude } = pos.coords || {};
          localStorage.setItem("geoConsent", "granted");
          if (latitude && longitude) {
            localStorage.setItem("geoCoords", JSON.stringify({ lat: latitude, lng: longitude }));
          }
          setStatus("granted");
        } finally {
          setBusy(false);
        }
      },
      (err) => {
        setBusy(false);
        setStatus("denied");
        localStorage.setItem("geoConsent", "denied");
        setError(err?.message || "Permission denied");
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
    );
  };

  if (status === "granted") return null;

  return (
    <div className="sticky top-[calc(var(--nav-h,64px)+8px)] z-[9995]">
      <div className="mx-auto max-w-screen-xl md:pl-[260px] px-4 md:px-6">
        <div className="rounded-lg border border-blue-200 bg-blue-50 text-blue-900 px-4 py-3 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div className="text-sm">
            <div className="font-semibold">Allow location for better insights</div>
            <div className="opacity-90">We use your location to personalize nearby projects, price trends and demand data.</div>
            {status === "denied" && (
              <div className="text-red-700 mt-1">{error || "Permission denied. Please allow to continue."}</div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={ask}
              disabled={busy}
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold px-3 py-2 rounded-md shadow"
            >
              {busy ? "Requesting..." : "Allow location"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}