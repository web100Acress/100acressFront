import React, { useState, useEffect } from "react";
import { format } from 'date-fns';
import ProjectHero from "./ProjectHero";
import AboutSection from "./AboutSection";
import HighlightsSection from './HighlightsSection';
import PricingSection from './PricingSection';
import AboutBuilder from './AboutBuilder';
import Gallery from './Gallery';
import FloorPlan from './FloorPlan';
import LocationSection from './LocationSection';
import MasterPlan from './MasterPlan';
import FAQSection from './FAQSection';
import RelatedProjects from './RelatedProjects';
import { useParams } from "react-router-dom";
import api from "../../../../config/apiClient";


// Skeleton layout for a real estate project detail page
// Tailwind CSS required. All content is placeholder/dummy for later wiring.

const SectionHeading = ({ title, subtitle }) => (
  <div className="mb-6">
    <h2 className="text-2xl font-semibold text-yellow-500">{title}</h2>
    {subtitle ? (
      <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
    ) : null}
  </div>
);

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-11/12 max-w-4xl p-4">
        <button
          className="absolute top-2 right-2 inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-2 py-1 text-sm text-gray-700 hover:bg-gray-50"
          onClick={onClose}
          aria-label="Close"
        >
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

function ProjectLayout2() {
  const [isFloorPlanModalOpen, setIsFloorPlanModalOpen] = useState(false);
  const [projectViewDetails, setProjectViewDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { pUrl } = useParams();

  useEffect(() => {
    let isMounted = true;
    async function fetchProject() {
      try {
        setLoading(true);
        const response = await api.get(`project/View/${pUrl}`);
        const projectData = response?.data?.dataview?.[0] || null;
        if (isMounted) {
          setProjectViewDetails(projectData);
        }
      } catch (err) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    if (pUrl) fetchProject();
    return () => {
      isMounted = false;
    };
  }, [pUrl]);

  const backgroundImage = projectViewDetails?.frontImage?.url || undefined;
  const projectTitle = projectViewDetails?.projectName || "";
  const location = projectViewDetails?.projectAddress
    ? `${projectViewDetails.projectAddress}${projectViewDetails?.city ? ", " + projectViewDetails.city : ""}`
    : projectViewDetails?.city || "";
  const phoneNumber = projectViewDetails?.mobileNumber || "+91 9810982010";
  const companyLogo = projectViewDetails?.logo?.url || null;
  // Format price display based on min/max values
  const formatPrice = () => {
    if (!projectViewDetails?.minPrice && !projectViewDetails?.maxPrice) {
      return 'Call For Price';
    }
    
    if (projectViewDetails.minPrice < 1) {
      return `${(projectViewDetails.minPrice * 100).toFixed()} L`;
    }
    
    if (projectViewDetails.maxPrice) {
      return `${projectViewDetails.minPrice} - ${projectViewDetails.maxPrice} Cr`;
    }
    
    return `${projectViewDetails.minPrice} Cr`;
  };

  const bottomInfo = {
    landArea: projectViewDetails?.totalLandArea ? `${projectViewDetails.totalLandArea} Acres` : "—",
    possession: projectViewDetails?.possessionDate 
      ? format(new Date(projectViewDetails.possessionDate), 'MMM yyyy')
      : projectViewDetails?.project_Status || "—",
    aboutProject: projectViewDetails?.project_discripation 
      ? projectViewDetails.project_discripation.replace(/<[^>]*>/g, '').substring(0, 60) + '...' 
      : projectViewDetails?.projectOverview?.substring(0, 60) + '...' || "—",
    price: formatPrice()
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <ProjectHero
        backgroundImage={backgroundImage}
        projectTitle={projectTitle}
        location={location}
        phoneNumber={phoneNumber}
        companyLogo={companyLogo}
        bottomInfo={bottomInfo}
      />

      {/* About Section */}
      <AboutSection 
        projectName={projectViewDetails?.projectName}
        description={projectViewDetails?.project_discripation}
        imageUrl={projectViewDetails?.projectGallery?.[0]?.url}
      />

      {/* Highlights */}
      <HighlightsSection 
        projectName={projectViewDetails?.projectName}
        highlights={projectViewDetails?.highlight}
        highlightImage={projectViewDetails?.highlightImage?.url}
      />

      {/* Pricing Section */}
      <PricingSection 
        projectName={projectViewDetails?.projectName}
        minPrice={projectViewDetails?.minPrice}
        maxPrice={projectViewDetails?.maxPrice}
        bhkDetails={projectViewDetails?.BhK_Details || []}
      />

      {/* Amenities */}
      <section className="py-16 bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Amenities" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "MULTIPURPOSE COURT", image: "/amenities_image/multipurpose-court-new-img.webp" },
              { name: "TODDLERS' PLAY AREA", image: "/amenities_image/kidsplayarea-img-amenity.webp" },
              { name: "SWIMMING POOL", image: "/amenities_image/swimming-pool-new-img.webp" },
              { name: "BILLIARD ROOM", image: "/amenities_image/billiard_room.webp" },
              { name: "KIDS PLAY AREA", image: "/amenities_image/kids-play-area.webp" },
              { name: "BASKETBALL COURT", image: "/amenities_image/basketball.webp" },
              { name: "SENIOR CITIZEN GARDEN", image: "/amenities_image/senior_citizen.webp" },
              { name: "WATER FEATURE", image: "/amenities_image/water_feature-new-img.webp" },
              { name: "DECK SEATING", image: "/amenities_image/deck_seating.webp" },
              { name: "GREENS", image: "/amenities_image/greens.webp" },
              { name: "GYMNASIUM", image: "/amenities_image/gym-new-img.webp" },
              { name: "LAWN", image: "/amenities_image/lawn.webp" }
            ].map((amenity, idx) => (
              <div key={idx} className="text-center">
                <div className="relative overflow-hidden rounded-lg mb-4 aspect-[4/3]">
                  <img 
                    src={amenity.image} 
                    alt={amenity.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-white text-sm font-medium tracking-wide uppercase">
                  {amenity.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <Gallery galleryImages={projectViewDetails?.projectGallery || []} />

      {/* Floor Plans */}
      <FloorPlan 
        floorPlans={projectViewDetails?.project_floorplan_Image || []} 
        bhkDetails={projectViewDetails?.BhK_Details || []} 
      />

      {/* Location Section */}
      <LocationSection 
        projectName={projectViewDetails?.projectName}
        projectAddress={projectViewDetails?.projectAddress}
        city={projectViewDetails?.city}
        locationImage={projectViewDetails?.project_locationImage}
        connectivityPoints={projectViewDetails?.projectRedefine_Connectivity || []}
        businessPoints={projectViewDetails?.projectRedefine_Business || []}
        educationPoints={projectViewDetails?.projectRedefine_Education || []}
        entertainmentPoints={projectViewDetails?.projectRedefine_Entertainment || []}
      />

      {/* Master Plan */}
      <MasterPlan 
        projectName={projectViewDetails?.projectName}
        masterPlanImage={projectViewDetails?.projectMaster_plan}
      />

      {/* Builder Info */}
      <AboutBuilder 
        builderName={projectViewDetails?.builderName}
        aboutDeveloper={projectViewDetails?.AboutDeveloper}
      />

      {/* FAQs */}
      <FAQSection projectViewDetails={projectViewDetails} />

      {/* Related Projects */}
      <RelatedProjects 
        builderName={projectViewDetails?.builderName}
        currentProjectUrl={pUrl}
      />



    </div>
  );
}

export default ProjectLayout2;
