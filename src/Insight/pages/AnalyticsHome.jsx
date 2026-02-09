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
