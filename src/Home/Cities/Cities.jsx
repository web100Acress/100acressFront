import React, { useState, useEffect, useMemo } from 'react';
import MobileCities from "./mobilecities";
import DesktopCities from "./desktopcities";

const Cities = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return isMobile ? <MobileCities /> : <DesktopCities />;
};

export default Cities;

