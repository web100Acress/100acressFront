import React, { useState, useEffect } from "react";
import { format } from 'date-fns';
import ProjectHero from "./ProjectHero";
import AboutSection from "./AboutSection";
import HighlightsSection from './HighlightsSection';
import PricingSection from './PricingSection';
import AboutBuilder from './AboutBuilder'
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
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
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
      <section className="py-12 ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Gallery" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="bg-gray-700 h-28 rounded" />
            ))}
          </div>
          <div className="mt-4">
            <button
              className="rounded-md border border-gray-600 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
              onClick={() => setIsGalleryModalOpen(true)}
            >
              Open Gallery Modal
            </button>
          </div>
        </div>
      </section>

      {/* Floor Plans */}
      <section className="py-12 ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Floor Plans" />
          {/* Carousel Placeholder */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            <div className="bg-gray-700 h-48 w-64 rounded shrink-0" />
            <div className="bg-gray-700 h-48 w-64 rounded shrink-0" />
            <div className="bg-gray-700 h-48 w-64 rounded shrink-0" />
          </div>
          <div className="mt-4">
            <button
              className="rounded-md border border-gray-600 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
              onClick={() => setIsFloorPlanModalOpen(true)}
            >
              Open Floor Plan Modal
            </button>
          </div>
        </div>
      </section>

      {/* Location Map & Connectivity Info */}
      <section className="py-12 ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Location Map & Connectivity" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-700 h-64 w-full rounded" />
            <div>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>Connectivity point one (e.g., Metro Station - X km)</li>
                <li>Business hub nearby (e.g., IT Park - X km)</li>
                <li>Education institute (e.g., School/College - X km)</li>
                <li>Entertainment (e.g., Mall/Cinema - X km)</li>
                <li>Healthcare (e.g., Hospital - X km)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Master Plan */}
      <section className="py-12 ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Master Plan" />
          <div className="bg-gray-700 h-96 w-full rounded" />
        </div>
      </section>

      {/* Builder Info */}
      <AboutBuilder />

      {/* FAQs */}
      <section className="py-12 ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="FAQs" />
          <div className="divide-y divide-gray-800 rounded border border-gray-700">
            {[
              "What is the project possession date?",
              "What configurations are available?",
              "Is financing available?",
              "What are the maintenance charges?",
            ].map((q, idx) => (
              <details key={idx} className="group bg-gray-900">
                <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium text-gray-200">
                  {q}
                  <span className="text-gray-400 group-open:hidden">+</span>
                  <span className="text-gray-400 hidden group-open:inline">-</span>
                </summary>
                <div className="px-4 pb-4 text-sm text-gray-300">
                  Placeholder answer text. Replace with the actual answer later.
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="py-12 ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Related Projects" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="rounded border border-gray-700 p-4 bg-gray-900">
                <div className="bg-gray-700 h-32 w-full rounded mb-3" />
                <div className="h-4 bg-gray-600 rounded w-2/3 mb-2" />
                <div className="h-3 bg-gray-600 rounded w-1/2" />
              </div>
            ))}
          </div>
          <div className="mt-6">
            <button className="rounded-md border border-gray-600 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">
              View More
            </button>
          </div>
        </div>
      </section>


      {/* Floor Plan Modal Placeholder */}
      <Modal isOpen={isFloorPlanModalOpen} onClose={() => setIsFloorPlanModalOpen(false)}>
        <div className="bg-gray-200 h-96 w-full rounded" />
        <p className="mt-4 text-sm text-gray-700">Enlarged floor plan placeholder.</p>
      </Modal>

      {/* Gallery Modal Placeholder */}
      <Modal isOpen={isGalleryModalOpen} onClose={() => setIsGalleryModalOpen(false)}>
        <div className="bg-gray-200 h-96 w-full rounded" />
        <p className="mt-4 text-sm text-gray-700">Enlarged gallery image placeholder.</p>
      </Modal>
    </div>
  );
}

export default ProjectLayout2;
