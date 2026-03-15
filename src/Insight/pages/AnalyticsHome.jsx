import React, { useMemo } from 'react';
import { Helmet } from "react-helmet";
import HeroWithFilters from "../sections/HeroWithFilters";
import FeaturedGrid from "../sections/FeaturedGrid";
import TestimonialsSlider from "../sections/TestimonialsSlider";
import CommercialCarousel from "../sections/CommercialCarousel";
import DarkCTA from "../sections/DarkCTA";
import GetInTouch from "../sections/GetInTouch";
import CitiesGrid from "../sections/CitiesGrid";

export default function AnalyticsHome() {
  return (
    <>
      <Helmet>
        <title>Real Estate Insights | Property News, Market Trends & Investment Tips</title>
        <meta 
          name="description" 
          content="Read the latest real estate insights, Gurgaon property market trends, buying guides, and investment tips on 100acress to stay informed before investing in property." 
        />
        <link rel="canonical" href="https://www.100acress.com/real-estate-insights/" />
      </Helmet>
      
      <HeroWithFilters />
      <FeaturedGrid />
      <DarkCTA />
      <TestimonialsSlider />
      <CommercialCarousel />
      <GetInTouch />
      <CitiesGrid />
    </>
  );
}
