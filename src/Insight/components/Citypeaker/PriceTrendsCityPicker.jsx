import React, { useState, useEffect } from "react";
import PriceTrendsCityPickerMobile from "./PriceTrendsCityPickermobile";
import PriceTrendsCityPickerDesktop from "./PriceTrendsCityPickerDesktop";

export default function PriceTrendsCityPicker({
  compareMode,
  setCompareMode,
  selectedCities,
  setSelectedCities,
  cityQuery,
  setCityQuery,
  visibleCities,
  cityImages,
  pickerLoading,
  onChooseCity,
  cityCategories = [], // Dynamic city categories from admin API
}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Common props for both components
  const commonProps = {
    compareMode,
    setCompareMode,
    selectedCities,
    setSelectedCities,
    cityQuery,
    setCityQuery,
    visibleCities,
    cityImages,
    pickerLoading,
    onChooseCity,
    cityCategories,
  };

  return (
    <div className="w-full">
      {isMobile ? (
        <PriceTrendsCityPickerMobile {...commonProps} />
      ) : (
        <PriceTrendsCityPickerDesktop {...commonProps} />
      )}
    </div>
  );
}
