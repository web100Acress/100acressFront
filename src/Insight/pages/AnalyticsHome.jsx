import React from "react";
import Navbar from "../../aadharhomes/navbar/Navbar";
import InsightsSidebar from "../components/InsightsSidebar";
import LocationPrompt from "../components/LocationPrompt";
import { LocationProvider } from "../components/LocationContext";
import HeroWithFilters from "../sections/HeroWithFilters";
import FeaturedGrid from "../sections/FeaturedGrid";
import TestimonialsSlider from "../sections/TestimonialsSlider";
import CommercialCarousel from "../sections/CommercialCarousel";
import DarkCTA from "../sections/DarkCTA";
// import GetInTouch from "../sections/GetInTouch";
import CitiesGrid from "../sections/CitiesGrid";
import LuxuryFooter from "../../Components/Actual_Components/LuxuryFooter";
export default function AnalyticsHome() {
  return (
    <LocationProvider>
      <div className="w-full">
        <Navbar />
        <InsightsSidebar />
        <LocationPrompt />
        <HeroWithFilters />
        <FeaturedGrid />
        <DarkCTA />
        <TestimonialsSlider />
        <CommercialCarousel />
        {/* <GetInTouch /> */}
        <CitiesGrid />
        <LuxuryFooter />
      </div>
    </LocationProvider>
  );
}
