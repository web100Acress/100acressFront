import React, { useState, useEffect } from "react";
import { usePriceTrends } from "./usePriceTrends";
import PriceTrendDesktop from "./pricetrenddesktop";
import PriceTrendMobile from "./pricetrendmobile";

export default function PriceTrends() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const priceTrendsProps = usePriceTrends();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <React.Fragment>
      {isMobile ? (
        <PriceTrendMobile props={priceTrendsProps} />
      ) : (
        <PriceTrendDesktop props={priceTrendsProps} />
      )}
    </React.Fragment>
  );
}