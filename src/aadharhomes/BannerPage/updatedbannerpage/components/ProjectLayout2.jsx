import React, { useState, useEffect } from "react";
import { format } from 'date-fns';
import { motion } from 'framer-motion';
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
import CallbackModal from './CallbackModal';
import FooterForm from './FooterForm';
import StickyBrochureButton from './StickyBrochureButton';
import BrochureDownloadModal from './BrochureDownloadModal';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../../config/apiClient";


// Skeleton layout for a real estate project detail page
// Tailwind CSS required. All content is placeholder/dummy for later wiring.

const SectionHeading = ({ title, subtitle }) => (
  <div className="text-center mb-4">
    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide">{title}</h2>
    <div className="w-16 h-0.5 bg-gradient-to-r from-amber-600 to-amber-500 rounded-full mx-auto mt-2"></div>
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
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);
  const [callbackSuccessHandler, setCallbackSuccessHandler] = useState(null);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const { pUrl } = useParams();
  const navigate = useNavigate();

  const handleShowCallback = (successCallback = null) => {
    setCallbackSuccessHandler(() => successCallback);
    setIsCallbackModalOpen(true);
  };

  const handleCloseCallback = () => {
    setIsCallbackModalOpen(false);
    setCallbackSuccessHandler(null);
  };

  const handleBrochureDownload = () => {
    setIsBrochureModalOpen(true);
  };

  const handleCloseBrochureModal = () => {
    setIsBrochureModalOpen(false);
  };

  useEffect(() => {
    let isMounted = true;
    async function fetchProject() {
      try {
        setLoading(true);
        const response = await api.get(`project/View/${pUrl}`);
        console.log('Full API Response:', response); // Debug log
        const projectData = response?.data?.dataview?.[0] || null;
        console.log('Project Data:', projectData);
        if (projectData) {
          console.log('Payment Plan Data:', projectData.paymentPlan);
          console.log('BHK Details:', projectData.BhK_Details);
        }
        if (!projectData) {
          // If no project found for this slug, redirect to home
          navigate('/', { replace: true });
          return;
        }
        if (isMounted) setProjectViewDetails(projectData);
      } catch (err) {
        if (isMounted) setError(err);
        // On error (e.g., 404), redirect to home
        navigate('/', { replace: true });
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
  const phoneNumber = projectViewDetails?.mobileNumber || "9811750130";
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

  // Helper function to determine if property is residential
  const isResidentialProperty = () => {
    if (!projectViewDetails?.type) return false;
    
    const residentialTypes = [
      "Residential Flats",
      "Residential",
      "Apartment",
      "Villa",
      "Independent House",
      "Builder Floor",
      "Residential Plot"
    ];
    
    return residentialTypes.some(type => 
      projectViewDetails.type.toLowerCase().includes(type.toLowerCase())
    );
  };

  // Safe summary for About section to avoid showing "undefined..."
  const getAboutSummary = () => {
    if (projectViewDetails?.totalUnit) {
      const towerPrefix = projectViewDetails.type === "Residential Flats" && projectViewDetails.towerNumber
        ? `${projectViewDetails.towerNumber} Tower - `
        : "";
      return `${towerPrefix}${projectViewDetails.totalUnit} Unit`;
    }
    if (projectViewDetails?.project_discripation) {
      return projectViewDetails.project_discripation
        .replace(/<[^>]*>/g, '')
        .substring(0, 60) + '...';
    }
    if (projectViewDetails?.projectOverview) {
      return projectViewDetails.projectOverview.substring(0, 60) + '...';
    }
    return '—';
  };

  const bottomInfo = {
    landArea: projectViewDetails?.totalLandArea ? `${projectViewDetails.totalLandArea} Acres` : "—",
    possession: projectViewDetails?.possessionDate 
      ? format(new Date(projectViewDetails.possessionDate), 'MMM yyyy')
      : projectViewDetails?.project_Status || "—",
    aboutProject: getAboutSummary(),
    price: formatPrice()
  };

  // Only render meta tags when project data is loaded
  const renderMetaTags = () => {
    if (!projectViewDetails) return null;
    
    return (
      <Helmet>
        <title>{projectViewDetails?.meta_title}</title>
        <meta
          name="description"
          content={projectViewDetails.meta_description}
        />
        <meta property="og:title" content={projectViewDetails?.meta_title} />
        <meta property="og:site_name" content="100acress.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={projectViewDetails?.frontImage?.url} />
        <meta property="og:url" content="https://www.100acress.com/" />
        <meta property="og:description" content={projectViewDetails.meta_description} />
        <meta name="twitter:title" content={projectViewDetails?.meta_title} />
        <meta name="twitter:description" content={projectViewDetails.meta_description} />
        <meta property="twitter:url" content="https://www.100acress.com/" />
        <meta property="twitter:image" content={projectViewDetails?.frontImage?.url} />
        <meta name="twitter:card" content="summary" />
        <link
          rel="canonical"
          href={`https://www.100acress.com/${projectViewDetails.project_url}/`}
        />
        <meta name="robots" content="index, follow" />
        {projectViewDetails?.keywords && (
          <meta name="keywords" content={projectViewDetails.keywords} />
        )}
      </Helmet>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-amber-500 mb-2">Error Loading Project</h2>
          <p className="text-gray-300">Sorry, we couldn't load the project details. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {renderMetaTags()}
      {/* Hero Section */}
      <ProjectHero
        backgroundImage={backgroundImage}
        projectTitle={projectTitle}
        location={location}
        phoneNumber={phoneNumber}
        companyLogo={companyLogo}
        bottomInfo={bottomInfo}
        onShowCallback={handleShowCallback}
      />

      {/* About Section */}
      <AboutSection 
        projectName={projectViewDetails?.projectName}
        description={projectViewDetails?.project_discripation}
        imageUrl={projectViewDetails?.projectGallery?.[0]?.url}
        onShowCallback={handleShowCallback}
      />

      {/* Mobile Sticky Footer - Bottom of Screen */}
      <div className="block md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
        {/* Viewing Notification Banner */}
        <div className="bg-pink-100 text-pink-800 text-center py-1.5 px-3 text-xs font-medium">
          <span className="inline-flex items-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
            </svg>
            {Math.floor(Math.random() * 50) + 20}+ people are viewing this property
          </span>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2 p-2">
          {/* WhatsApp Button */}
          <motion.button
            onClick={() => {
              const phoneNumber = projectViewDetails?.mobileNumber || "9811750130";
              const message = `Hi, I'm interested in ${projectTitle} property. Can you provide more details?`;
              const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
              window.open(whatsappUrl, '_blank');
            }}
            className="flex-1 bg-white border-2 border-green-500 text-green-600 py-2.5 rounded-full font-semibold text-sm flex items-center justify-center space-x-1.5 hover:bg-green-50 hover:border-green-600 transition-all duration-300 shadow-md hover:shadow-lg"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 8px 20px rgba(34, 197, 94, 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              className="text-green-600"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            <span>WhatsApp</span>
          </motion.button>

          {/* Brochure Button */}
          <motion.button
            onClick={handleBrochureDownload}
            className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white py-2.5 rounded-full font-semibold text-sm flex items-center justify-center space-x-1.5 hover:from-amber-600 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-lg"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 8px 20px rgba(245, 158, 11, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            <span>Brochure</span>
          </motion.button>
        </div>
      </div>

      {/* Add bottom padding to prevent content from being hidden behind sticky footer */}
      <div className="block md:hidden h-16"></div>

      {/* Highlights */}
      <HighlightsSection 
        projectName={projectViewDetails?.projectName}
        highlights={projectViewDetails?.highlight}
        highlightImage={projectViewDetails?.highlightImage?.url}
        onShowCallback={handleShowCallback}
      />

      {/* Debug: Log projectViewDetails structure */}
      {console.log('projectViewDetails:', JSON.stringify(projectViewDetails, null, 2))}
      
      {/* Pricing Section */}
      <PricingSection 
        projectName={projectViewDetails?.projectName}
        minPrice={projectViewDetails?.minPrice}
        maxPrice={projectViewDetails?.maxPrice}
        bhkDetails={projectViewDetails?.BhK_Details || []}
        paymentPlan={projectViewDetails?.paymentPlan || []}
        onShowCallback={handleShowCallback}
        projectViewDetails={projectViewDetails}
      />

      {/* Amenities - Only show for residential properties */}
      {isResidentialProperty() && (
        <section className="pt-0 pb-4 bg-black">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <SectionHeading title="Amenities" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
      )}

      {/* Gallery */}
      <Gallery galleryImages={projectViewDetails?.projectGallery || []} />

      {/* Brochure Section */}
      <div className="bg-black py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/30 shadow-2xl">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                  Download Project Brochure
                </h3>
                <p className="text-gray-300 text-base font-light leading-relaxed">
                  Get complete details, floor plans, amenities & pricing
                </p>
              </div>

              {/* Download Button */}
              <div className="flex-shrink-0">
                <motion.button
                  onClick={handleBrochureDownload}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-3 rounded-full font-semibold text-base flex items-center space-x-2 hover:from-amber-600 hover:to-orange-700 transition-all duration-300 shadow-xl hover:shadow-2xl"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(245, 158, 11, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7,10 12,15 17,10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  <span>Brochure</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floor Plans */}
      <FloorPlan 
        floorPlans={projectViewDetails?.project_floorplan_Image || []} 
        bhkDetails={projectViewDetails?.BhK_Details || []}
        onShowCallback={handleShowCallback}
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
        projectViewDetails={projectViewDetails}
        onShowCallback={handleShowCallback}
      />

      {/* Master Plan */}
      <MasterPlan 
        projectName={projectViewDetails?.projectName}
        masterPlanImage={projectViewDetails?.projectMaster_plan}
        onShowCallback={handleShowCallback}
      />

      {/* Builder Info */}
      <AboutBuilder 
        builderName={projectViewDetails?.builderName}
        aboutDeveloper={projectViewDetails?.AboutDeveloper}
      />

      

      {/* Related Projects */}
      <RelatedProjects 
        builderName={projectViewDetails?.builderName}
        currentProjectUrl={pUrl}
        onShowCallback={handleShowCallback}
      />
      
      {/* FAQs */}
      <FAQSection 
        projectViewDetails={projectViewDetails} 
        onShowCallback={handleShowCallback}
      />

      {/* Footer Form */}
      <FooterForm 
        builderName={projectViewDetails?.builderName}
        projectViewDetails={projectViewDetails}
        projectTitle={projectTitle}
        location={location}
      />
      
      

      {/* Sticky Brochure Download Button */}
      <StickyBrochureButton onDownloadClick={handleBrochureDownload} />

      {/* Brochure Download Modal */}
      <BrochureDownloadModal
        isOpen={isBrochureModalOpen}
        onClose={handleCloseBrochureModal}
        projectViewDetails={projectViewDetails}
        projectTitle={projectTitle}
        location={location}
      />

      {/* Global Callback Modal */}
      <CallbackModal 
        isOpen={isCallbackModalOpen}
        onClose={handleCloseCallback}
        projectViewDetails={projectViewDetails}
        projectTitle={projectTitle}
        location={location}
        onSuccess={callbackSuccessHandler}
      />
    </div>
  );
}

export default ProjectLayout2;
