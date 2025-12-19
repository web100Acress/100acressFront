import React, { useState, useEffect } from "react";
import { format } from 'date-fns';
import { getPossessionInfo } from '../../../../Utils/possessionUtils';
import { motion } from 'framer-motion';
import ProjectHero from "./ProjectHero";
import AboutSection from "./AboutSection";
import HighlightsSection from './HighlightsSection';
import PricingSection from './PricingSection';
import AboutBuilder from './AboutBuilder';
import Gallery from './Gallery';
import FloorPlan from './FloorPlan';
import LocationSection from './LocationSection';
import VideoSection from './VideoSection';
import MasterPlan from './MasterPlan';
import FAQSection from './FAQSection';
import RelatedProjects from './RelatedProjects';
import CallbackModal from './CallbackModal';
import FooterForm from './FooterForm';
import StickyBrochureButton from './StickyBrochureButton';
import BrochureDownloadModal from './BrochureDownloadModal';
import SimpleNotification from './SimpleNotification';
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

  const possessionInfo = getPossessionInfo(projectViewDetails);
  
  const bottomInfo = {
    landArea: projectViewDetails?.totalLandArea ? `${projectViewDetails.totalLandArea} Acres` : "—",
    possession: possessionInfo.value,
    possessionLabel: possessionInfo.label,
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
      <SimpleNotification />
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
            className="flex-1 bg-white text-green-600 py-2.5 font-semibold text-sm flex items-center justify-center space-x-1.5 hover:bg-green-50 transition-all duration-300 shadow-md hover:shadow-lg"
            whileHover={{ 
              scale: 1.02
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
        <section className="mt-8 pt-0 pb-12 bg-gradient-to-b from-black via-gray-900 to-black">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title={`Amenities of ${projectViewDetails?.projectName || ''}`} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { name: "Cafeteria / Food Court", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" },
                { name: "Power Backup", icon: "M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4zM13 18h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V8h2v2z" },
                { name: "Lift", icon: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 12H9v-2H7v-2h2V9h2v2h2v2h-2v2zm8-1h-2v-2h-2v2h-2V9h2v2h2V9h2v5z" },
                { name: "Security", icon: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" },
                { name: "Service / Goods Lift", icon: "M19 15h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zM9 19h2v-2H9v2zm0-4h2v-2H9v2zm0-4h2V9H9v2zm0-4h2V5H9v2zM5 19h2v-2H5v2zm0-4h2v-2H5v2zm0-4h2V9H5v2zm0-4h2V5H5v2zm8 12h2v-2h-2v2zm0-4h2v-2h-2v2zm0-4h2V9h-2v2zm0-4h2V5h-2v2z" },
                { name: "Visitor Parking", icon: "M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" },
                { name: "Gymnasium", icon: "M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z" },
                { name: "Rain Water Harvesting", icon: "M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zm0 18c-3.35 0-6-2.57-6-6.2 0-2.34 1.95-5.44 6-9.14 4.05 3.7 6 6.79 6 9.14 0 3.63-2.65 6.2-6 6.2z" },
                { name: "Air Conditioned", icon: "M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22z" },
                { name: "Earthquake Resistant", icon: "M15 3l2.3 2.3-2.89 2.87 1.42 1.42L18.7 6.7 21 9V3h-6zM3 9l2.3-2.3 2.87 2.89 1.42-1.42L6.7 5.3 9 3H3v6zm6 12l-2.3-2.3 2.89-2.87-1.42-1.42L5.3 17.3 3 15v6h6zm12-6l-2.3 2.3-2.87-2.89-1.42 1.42 2.89 2.87L15 21h6v-6z" },
                { name: "Tier 3 Security System", icon: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" },
                { name: "Large Open Space", icon: "M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14z" },
                { name: "Grand Entrance Lobby", icon: "M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" },
                { name: "Kid Play Area", icon: "M7.5 4c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm9 0c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm-9 8c-2.33 0-7 1.17-7 3.5V18h14v-2.5c0-2.33-4.67-3.5-7-3.5zm9 0c-.29 0-.62.02-.97.05.02.01.03.03.04.04 1.14.83 1.93 1.94 1.93 3.41V18h6v-2.5c0-2.33-4.67-3.5-7-3.5z" },
                { name: "Event Space & Amphitheatre", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" },
                { name: "Fire Fighting Equipment", icon: "M19.48 12.35c-.18-.18-.46-.27-.71-.27-.25 0-.53.09-.71.27-.18.18-.27.46-.27.71 0 .25.09.53.27.71.18.18.46.27.71.27.25 0 .53-.09.71-.27.18-.18.27-.46.27-.71 0-.25-.09-.53-.27-.71zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" }
              ].map((amenity, idx) => (
                <div 
                  key={idx} 
                  className="bg-transparent border-2 border-amber-500/60 rounded-lg p-3 flex items-center gap-2.5 hover:border-amber-400 hover:bg-amber-500/5 transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <svg 
                      className="w-5 h-5 text-amber-400" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d={amenity.icon} />
                    </svg>
                  </div>
                  <h3 className="text-white text-sm md:text-base font-medium">
                    {amenity.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      <Gallery 
        galleryImages={projectViewDetails?.projectGallery || []}
        projectName={projectViewDetails?.projectName}
      />

      {/* Video Section - Positioned before Floor Plan */}
      <VideoSection
        projectName={projectViewDetails?.projectName}
        youtubeVideoUrl={projectViewDetails?.youtubeVideoUrl}
        youtubeVideoTitle={projectViewDetails?.youtubeVideoTitle}
        youtubeVideoDescription={projectViewDetails?.youtubeVideoDescription}
        onShowCallback={handleShowCallback}
        backgroundImage={projectViewDetails?.frontImage?.url}
      />

      {/* Brochure Section - Max Antara Luxury Design */}
      <div className="relative bg-gray-900 py-6 overflow-hidden">
        {/* Golden top border accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500"></div>
        {/* Sophisticated Background Elements */}
        <div className="absolute inset-0">
          {/* Primary gradient background */}
          <div className="absolute inset-0 bg-black"></div>

          {/* Subtle accent lighting */}
          <div className="absolute top-0 left-1/3 w-64 h-64 bg-gradient-to-br from-yellow-500/8 to-yellow-400/4 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/3 w-56 h-56 bg-gradient-to-tl from-yellow-400/6 to-yellow-300/3 rounded-full blur-3xl"></div>

          {/* Minimalist geometric accents */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div className="absolute top-6 left-6 w-12 h-12 border border-yellow-400/20 rotate-45"></div>
            <div className="absolute top-12 right-12 w-10 h-10 border border-yellow-300/15 rotate-12"></div>
            <div className="absolute bottom-12 left-12 w-16 h-16 border border-yellow-300/10 -rotate-12"></div>
          </div>
        </div>

        <div className="relative w-full px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Premium Card Container */}
            <div className="relative rounded-xl overflow-hidden">
              {/* Sophisticated card background */}
              <div className="absolute inset-0 bg-gray-900/95 backdrop-blur-sm"></div>

              {/* Subtle border gradient */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/10 via-yellow-400/15 to-yellow-300/10 p-[1px]">
                <div className="absolute inset-0 rounded-xl bg-gray-900/95"></div>
              </div>

              {/* Minimalist corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 bg-gradient-to-br from-yellow-500/5 to-transparent rounded-full blur-sm"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-yellow-400/5 to-transparent rounded-full blur-sm"></div>

              {/* Main Content */}
              <div className="relative p-6 md:p-8 text-center">
                {/* Premium Header Section */}
                <div className="mb-4">
                  {/* Refined Circular Icon */}
                  <div className="inline-flex items-center justify-center mb-3">
                    <div className="relative">
                      {/* Gradient ring */}
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500/20 via-yellow-400/15 to-yellow-300/20 p-[1px]">
                        <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                          {/* Document icon - minimalist line style */}
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-yellow-400"
                          >
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            <polyline points="14,2 14,8 20,8"/>
                            <line x1="16" y1="13" x2="8" y2="13"/>
                            <line x1="16" y1="17" x2="8" y2="17"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Luxury Typography */}
                  <h3 className="text-xl md:text-2xl font-light text-white mb-2 tracking-wide">
                    Download <span className="bg-gradient-to-r from-yellow-400 via-yellow-400 to-yellow-300 bg-clip-text text-transparent font-medium">{projectViewDetails?.projectName || 'Project'}</span> Brochure
                  </h3>

                  {/* Elegant divider */}
                  <div className="w-10 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent mx-auto mb-3"></div>

                  {/* Sophisticated subtext */}
                  <p className="text-gray-300 text-base font-light leading-relaxed max-w-xl mx-auto">
                    Get detailed information on floor plans, pricing, payment options, amenities, and specifications to help you make an informed decision.
                  </p>
                </div>

                {/* Subtle separator */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent mb-4"></div>

                {/* Information Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                  {/* Floor Plans */}
                  <div className="flex flex-col items-center space-y-1.5">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-yellow-400"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <line x1="9" y1="9" x2="15" y2="9"/>
                        <line x1="9" y1="15" x2="15" y2="15"/>
                      </svg>
                    </div>
                    <span className="text-gray-300 text-sm font-medium tracking-wide">Floor Plans</span>
                  </div>

                  {/* Pricing & Payment Plans */}
                  <div className="flex flex-col items-center space-y-1.5">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-yellow-400"
                      >
                        <line x1="12" y1="1" x2="12" y2="23"/>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                      </svg>
                    </div>
                    <span className="text-gray-300 text-sm font-medium tracking-wide">Pricing & Payment Plans</span>
                  </div>

                  {/* Amenities & Specifications */}
                  <div className="flex flex-col items-center space-y-1.5">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-yellow-400"
                      >
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                        <polyline points="9,22 9,12 15,12 15,22"/>
                      </svg>
                    </div>
                    <span className="text-gray-300 text-sm font-medium tracking-wide">Amenities & Specifications</span>
                  </div>
                </div>

                {/* Premium CTA Button */}
                <div className="flex justify-center">
                  <motion.button
                    onClick={handleBrochureDownload}
                    className="group relative bg-gradient-to-r from-yellow-500 via-yellow-500 to-yellow-400 text-black px-6 py-2.5 rounded-full font-medium text-sm flex items-center space-x-2 hover:from-yellow-400 hover:via-yellow-400 hover:to-yellow-300 transition-all duration-300 shadow-lg hover:shadow-yellow-500/20"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 8px 20px rgba(234, 179, 8, 0.2)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>

                    {/* Button content */}
                    <div className="relative flex items-center space-x-2">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-black"
                      >
                        <polyline points="6,9 12,15 18,9"/>
                      </svg>
                      <span className="font-medium tracking-wide">Download Brochure</span>
                    </div>
                  </motion.button>
                </div>
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
        projectName={projectViewDetails?.projectName}
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
