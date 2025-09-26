import React from "react";
import Navbar from "../../aadharhomes/navbar/Navbar";
import InsightsSidebar from "../components/InsightsSidebar";
import LocationPrompt from "../components/LocationPrompt";
import { LocationProvider } from "../components/LocationContext";
import HeroWithFilters from "../sections/HeroWithFilters";
import FeaturedGrid from "../sections/FeaturedGrid";
import TestimonialsSlider from "../sections/TestimonialsSlider";
// import CommercialCarousel from "../sections/CommercialCarousel";
import DarkCTA from "../sections/DarkCTA";
// import GetInTouch from "../sections/GetInTouch";
// import CitiesGrid from "../sections/CitiesGrid";
// import FooterInfo from "../sections/FooterInfo";
import LuxuryFooter from "../../Components/Actual_Components/LuxuryFooter";
// import PriceTrendsCityPicker from "../components/PriceTrendsCityPicker";

export default function AnalyticsHome() {
  return (
    <LocationProvider>
      <div className="w-full">
        <Navbar />
        {/* Fixed Insights sidebar (desktop) */}
        <InsightsSidebar />
        {/* Location prompt (shows until granted) */}
        <LocationPrompt />
        {/* Hero */}
        <HeroWithFilters />
        <FeaturedGrid />
        <DarkCTA />
        <TestimonialsSlider />
        {/* <CommercialCarousel /> */}
        {/* <GetInTouch /> */}
        {/* <CitiesGrid /> */}
        {/* <FooterInfo /> */}
        <LuxuryFooter />
        {/* <PriceTrendsCityPicker /> */}
      </div>
    </LocationProvider>
  );
}
