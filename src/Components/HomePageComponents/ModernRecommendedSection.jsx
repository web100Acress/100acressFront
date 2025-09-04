import React, { useState, useEffect, useRef, useContext } from "react";
import { useSelector } from "react-redux";
import { Skeleton } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import { 
  MdLocationPin, 
  MdShare,
  MdArrowForward
} from 'react-icons/md';
import styled from 'styled-components';
import Api_Service from "../../Redux/utils/Api_Service";
import { isFavorite as favCheck, toggleFavorite, subscribe, hydrateFavoritesFromServer } from "../../Utils/favorites";
import { AuthContext } from "../../AuthContext";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ModernRecommendedSection = () => {
  const spotlight = useSelector(store => store?.project?.spotlight);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [favTick, setFavTick] = useState(0);
  const swiperRef = useRef(null);
  const { getSpotlight } = Api_Service();
  const { isAuthenticated } = useContext(AuthContext);

  // Fetch spotlight data on component mount
  useEffect(() => {
    getSpotlight();
  }, [getSpotlight]);

  // Keep favorites in sync and hydrated
  useEffect(() => {
    hydrateFavoritesFromServer();
    const unsub = subscribe(() => setFavTick((v) => v + 1));
    return () => { if (typeof unsub === 'function') unsub(); };
  }, []);

  // Autoplay and navigation disabled per request

  // Mock data for testing if no spotlight data
  const mockSpotlightData = [
    // {
    //   _id: 'mock1',
    //   projectName: 'Luxury Villa Complex',
    //   city: 'Gurugram',
    //   sector: 'Sector 102',
    //   area: 'Dwarka Expressway',
    //   projectAddress: 'Near IGI Airport',
    //   minPrice: 2.5,
    //   maxPrice: 5.2,
    //   project_url: 'luxury-villa',
    //   // frontImage: { url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop' },
    //   BhK_Details: [{ bhk_type: '3 BHK' }, { bhk_type: '4 BHK' }],
    //   description: 'Premium luxury villas with world-class amenities and modern architecture in prime location.'
    // },
    // {
    //   _id: 'mock2',
    //   projectName: 'Modern Apartment Tower',
    //   city: 'Gurugram',
    //   sector: 'Sector 43',
    //   area: 'Golf Course Road',
    //   projectAddress: 'Opposite DLF Cyber City',
    //   minPrice: 1.8,
    //   maxPrice: 3.5,
    //   project_url: 'modern-apartment',
    //   // frontImage: { url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop' },
    //   BhK_Details: [{ bhk_type: '2 BHK' }, { bhk_type: '3 BHK' }],
    //   description: 'Contemporary apartments featuring smart home technology and sustainable living solutions.'
    // },
    // {
    //   _id: 'mock3',
    //   projectName: 'Premium Residency',
    //   city: 'Gurugram',
    //   sector: 'Sector 39',
    //   area: 'Sohna Road',
    //   projectAddress: 'Near Medanta Hospital',
    //   minPrice: 3.2,
    //   maxPrice: 6.8,
    //   project_url: 'premium-residency',
    //   // frontImage: { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop' },
    //   BhK_Details: [{ bhk_type: '4 BHK' }, { bhk_type: '5 BHK' }],
    //   description: 'Exclusive residential complex with premium finishes and exceptional lifestyle amenities.'
    // },
    // {
    //   _id: 'mock4',
    //   projectName: 'Elite Gardens',
    //   city: 'Gurugram',
    //   sector: 'Sector 67',
    //   area: 'Golf Course Extension',
    //   projectAddress: 'Near Cyber Hub',
    //   minPrice: 2.1,
    //   maxPrice: 4.5,
    //   project_url: 'elite-gardens',
    //   // frontImage: { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop' },
    //   BhK_Details: [{ bhk_type: '2 BHK' }, { bhk_type: '3 BHK' }, { bhk_type: '4 BHK' }],
    //   description: 'Beautifully landscaped community with green spaces and family-friendly environment.'
    // },
    // {
    //   _id: 'mock5',
    //   projectName: 'Royal Heights',
    //   city: 'Gurugram',
    //   sector: 'Sector 84',
    //   area: 'NH-8',
    //   projectAddress: 'Near Manesar',
    //   minPrice: 4.5,
    //   maxPrice: 8.2,
    //   project_url: 'royal-heights',
    //   // frontImage: { url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop' },
    //   BhK_Details: [{ bhk_type: '3 BHK' }, { bhk_type: '4 BHK' }, { bhk_type: '5 BHK' }],
    //   description: 'Ultra-luxury residences with panoramic city views and bespoke lifestyle services.'
    // }
  ];

  // Use mock data if no spotlight data is available
  const displayData = spotlight && spotlight.length > 0 ? spotlight : mockSpotlightData;

  const truncateText = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  const formatPrice = (price) => {
    if (!price) return "Price on request";
    return `₹${price} Cr`;
  };

  const formatLocation = (project) => {
    const locationParts = [];
    
    // Add sector if available
    if (project?.sector) {
      locationParts.push(project.sector);
    }
    
    // Add area/address if available
    if (project?.area) {
      locationParts.push(project.area);
    } else if (project?.projectAddress) {
      locationParts.push(project.projectAddress);
    }
    
    // Add city if available
    if (project?.city) {
      locationParts.push(project.city);
    }
    
    // If no location data, provide default
    if (locationParts.length === 0) {
      return 'Sector 102 • Dwarka Expressway • Gurugram';
    }
    
    return locationParts.join(' • ');
  };

  // Show loading state if no data
  if (!displayData || displayData.length === 0) {
    return (
      <SectionWrapper>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-600 mb-4">Loading Recommended Properties...</h3>
            <Skeleton active />
          </div>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper>
      <div className="w-full px-4 pt-0 pb-4">
        {/* Header Section */}
        <div className="text-center mb-2 sm:mb-4 px-2 pt-2">
          <div className="inline-flex sm:inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mb-1 sm:mb-0">
            <div className="w-12 h-1 bg-gradient-to-r from-red-400 to-red-600 rounded-full hidden sm:block"></div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              <span className="block sm:inline">100acress</span>
              <span className="text-red-600 sm:ml-2 block sm:inline">Recommended</span>
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-red-600 to-red-400 rounded-full hidden sm:block"></div>
          </div>
          <p className="hidden sm:block text-gray-600 text-lg max-w-2xl mx-auto mb-0 px-1">
            Discover premium properties with luxury, location, and investment potential.
          </p>
        </div>

        {/* Mobile swipe hint */}
        <div className="sm:hidden text-center text-gray-500 text-sm mb-1 swipe-hint" aria-hidden="true">
          Swipe to see more <MdArrowForward className="inline-block align-middle swipe-hint-icon" />
        </div>

        {/* Carousel Container */}
        <div className="carousel-container">
          <Swiper
            ref={swiperRef}
            modules={[Pagination, Autoplay, Navigation]}
            grabCursor={true}
            centeredSlides={false}
            slidesPerView={1}
            slidesPerGroup={1}
            spaceBetween={24}
            loop={true}
            allowTouchMove={true}
            simulateTouch={true}
            autoplay={false}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              el: '.swiper-pagination',
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 20,
                centeredSlides: true,
              },
              640: {
                slidesPerView: 2,
                slidesPerGroup: 1,
                spaceBetween: 24,
                centeredSlides: false,
              },
              768: {
                slidesPerView: 3,
                slidesPerGroup: 1,
                spaceBetween: 20,
                centeredSlides: false,
              },
              1024: {
                slidesPerView: 4,
                slidesPerGroup: 1,
                spaceBetween: 20,
                centeredSlides: false,
              },
              1280: {
                slidesPerView: 4,
                slidesPerGroup: 1,
                spaceBetween: 24,
                centeredSlides: false,
              },
            }}
            className="modern-swiper"
          >
            {displayData.map((project, index) => (
              <SwiperSlide key={project._id || index} className="swiper-slide">
                <PropertyCard
                  project={project}
                  isHovered={hoveredCard === project._id}
                  onHover={() => setHoveredCard(project._id)}
                  onLeave={() => setHoveredCard(null)}
                  truncateText={truncateText}
                  formatPrice={formatPrice}
                  formatLocation={formatLocation}
                  favTick={favTick}
                  isAuthenticated={isAuthenticated}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation arrows removed */}

          {/* Custom Pagination */}
          <div className="swiper-pagination custom-pagination"></div>
        </div>
      </div>
    </SectionWrapper>
  );
};

const PropertyCard = ({ 
  project, 
  isHovered, 
  onHover, 
  onLeave,
  truncateText,
  formatPrice,
  formatLocation,
  favTick,
  isAuthenticated
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const id = project?._id || project?.id || project?.slug;
    const snapshot = {
      title: project?.projectName,
      frontImage: project?.frontImage,
      thumbnailImage: project?.thumbnailImage,
      priceText: formatPrice(project?.minPrice || project?.price),
      url: project?.project_url ? `/${project?.project_url}/` : undefined,
      city: project?.city,
      maxPrice: project?.maxPrice || project?.price,
      minPrice: project?.minPrice,
    };
    toggleFavorite(id, snapshot, isAuthenticated);
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Create share URL
    const shareUrl = `${window.location.origin}/${project?.project_url}/`;
    const shareText = `Check out this amazing property: ${project?.projectName}`;
    
    // Use Web Share API if available, otherwise copy to clipboard
    if (navigator.share) {
      navigator.share({
        title: project?.projectName,
        text: shareText,
        url: shareUrl,
      }).catch((error) => {
        console.log('Error sharing:', error);
        // Fallback to copying URL
        copyToClipboard(shareUrl);
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Link copied to clipboard!');
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Link copied to clipboard!');
    });
  };

  const handleCardClick = (e) => {
    // Don't navigate if clicking on share or view details buttons
    if (e.target.closest('.share-btn') || e.target.closest('.view-details-btn')) {
      e.preventDefault();
      return;
    }
    // Navigate to project page
    window.location.href = `/${project?.project_url}/`;
  };

  const handleViewDetails = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = `/${project?.project_url}/`;
  };

  // Recompute favorite when favTick changes
  const isFav = favCheck(project?._id || project?.id || project?.slug);

  return (
    <CardWrapper
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`property-card ${isHovered ? 'hovered' : ''}`}
      onClick={handleCardClick}
    >
      {/* Image Section */}
      <div className="image-container">
        <img
          src={project?.frontImage?.url || project?.thumbnailImage?.url}
          alt={project?.projectName}
          className={`property-image ${imageLoaded ? 'loaded' : ''}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        
        {/* Overlay with gradient */}
        <div className="image-overlay" />
        
        {/* Share Button */}
        <button
          onClick={handleShare}
          className="share-btn"
        >
          <MdShare />
        </button>

        {/* Wishlist (Heart) Button */}
        <button
          onClick={handleWishlist}
          className="wishlist-btn"
          aria-label="Toggle wishlist"
          title={isFav ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isFav ? <span style={{color:'#ef4444'}}>❤️</span> : <span>🤍</span>}
        </button>

        {/* Price Badge */}
        <div className="price-badge">
          <span className="price-text">
            {formatPrice(project?.minPrice)}
          </span>
        </div>

        {/* Left Side Content Overlay */}
        <div className="left-content-overlay">
          <div className="content-header">
            <h3 className="project-name">
              {truncateText(project?.projectName, 4)}
            </h3>
          </div>

          <div className="location-info">
            <MdLocationPin className="location-icon" />
            <span>
              {formatLocation(project)}
            </span>
          </div>
        </div>

        {/* View Details Button */}
        <button 
          onClick={handleViewDetails}
          className="view-details-btn"
        >
          <span>View Details</span>
          <MdArrowForward />
        </button>
      </div>
    </CardWrapper>
  );
};

// Styled Components
const SectionWrapper = styled.section`
  background: #ffffff; /* Solid white background on all viewports */
  position: relative;
  overflow: hidden;
  margin-top: 0;
  padding-top: 36px; /* desktop/tablet: visible gap from hero */

  /* Ensure inner container also renders on white */
  .container {
    background: #ffffff;
  }

  .carousel-container {
    position: relative;
    overflow: visible;
    width: 100%;
    max-width: none; /* Remove max-width constraint for full width */
    height: 450px;
    margin: 0;
    background: #ffffff; /* Ensure container remains white as well */
    border-radius: 0; /* avoid showing page bg at rounded edges */
  }

  .modern-swiper {
    width: 100%;
    height: 100%;
    
    .swiper-slide {
      height: auto;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .swiper-wrapper {
      align-items: center;
    }
  }

  .custom-nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 60px;
    height: 60px;
    background: rgba(255, 255, 255, 0.95);
    border: 2px solid #dc2626;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 100;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    color: #dc2626;
    font-size: 28px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

    &:hover {
      transform: translateY(-50%) scale(1.1);
      background: #dc2626;
      color: white;
      box-shadow: 0 8px 24px rgba(220, 38, 38, 0.3);
    }

    &.swiper-button-prev {
      left: 20px;
    }
    
    &.swiper-button-next {
      right: 20px;
    }

    &.swiper-button-disabled {
      opacity: 0.3;
      cursor: not-allowed;
      transform: translateY(-50%) scale(0.9);
      
      &:hover {
        transform: translateY(-50%) scale(0.9);
        background: rgba(255, 255, 255, 0.95);
        color: #dc2626;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
      }
    }
  }

  .custom-pagination {
    bottom: 0;
    
    .swiper-pagination-bullet {
      width: 10px;
      height: 10px;
      background: #d1d5db;
      opacity: 0.5;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border-radius: 5px;
      
      &.swiper-pagination-bullet-active {
        background: #dc2626;
        opacity: 1;
        transform: scale(1.2);
        width: 20px;
      }
    }
  }

  @media (max-width: 768px) {
    padding-top: 8px; /* add a bit of breathing space above section on mobile */

    /* Swipe hint styles */
    .swipe-hint {
      color: #6b7280; /* gray-500 */
      font-size: 0.875rem; /* text-sm */
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      .swipe-hint-icon {
        animation: swipeRight 1.2s ease-in-out infinite;
      }
    }

    @keyframes swipeRight {
      0% { transform: translateX(0); opacity: 0.6; }
      50% { transform: translateX(6px); opacity: 1; }
      100% { transform: translateX(0); opacity: 0.6; }
    }

    .carousel-container {
      padding: 8px 0 52px 0; /* reduce top padding to bring cards closer to heading */
      min-height: 400px;
      max-width: none; /* Remove max-width constraint for mobile too */
      overflow: visible;
      position: relative;
    }

    /* Edge fade indicators removed to keep solid white background */

    .modern-swiper {
      padding: 4px 0 32px 0; /* tighten internal spacing */
    }

    .custom-nav-btn {
      width: 50px;
      height: 50px;
      font-size: 24px;
      
      &.swiper-button-prev {
        left: 10px;
      }
      
      &.swiper-button-next {
        right: 10px;
      }
    }
  }

  @media (max-width: 480px) {
    .carousel-container {
      padding: 6px 0 44px 0; /* further reduce gap on small phones */
      min-height: 350px;
      max-width: none; /* Remove max-width constraint for small phones too */
      overflow: visible;
    }

    .modern-swiper {
      padding: 2px 0 24px 0;
    }

    .custom-nav-btn {
      width: 45px;
      height: 45px;
      font-size: 20px;
      
      &.swiper-button-prev {
        left: 5px;
      }
      
      &.swiper-button-next {
        right: 5px;
      }
    }
  }

  /* Extra breathing room on large desktops */
  @media (min-width: 1280px) {
    padding-top: 48px;
  }
`;

const CardWrapper = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  margin: 0 5px;
  position: relative;
  min-height: 400px;
  max-height: 400px;
  height: 100%;
  aspect-ratio: 16/9;
  max-width: 580px;
  width: 100%;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
  }

  &.hovered {
    transform: translateY(-8px);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
  }

  .image-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 16px;

    .card-link {
      display: block;
      width: 100%;
      height: 100%;
      text-decoration: none;
      color: inherit;
    }

    .property-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      opacity: 0;
      
      &.loaded {
        opacity: 1;
      }
    }

    .image-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to bottom,
        transparent 0%,
        transparent 60%,
        rgba(0, 0, 0, 0.3) 100%
      );
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .share-btn {
      position: absolute;
      top: 16px;
      right: 16px;
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.9);
      border: none;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 10;
      color: #6b7280;

      &:hover {
        background: white;
        transform: scale(1.1);
        color: #dc2626;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
      }
    }

    .wishlist-btn {
      position: absolute;
      top: 16px;
      right: 64px; /* to the left of share */
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.9);
      border: none;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 10;
      color: #6b7280;

      &:hover {
        background: white;
        transform: scale(1.1);
        color: #ef4444;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
      }
    }

    .price-badge {
      position: absolute;
      bottom: 16px;
      left: 16px;
      padding: 6px 10px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      z-index: 10;
      overflow: visible;

      .price-text {
        color: white;
        font-weight: 700;
        font-size: 28px;
        text-align: center;
        line-height: 1.2;
        text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.7), 1px 1px 2px rgba(0, 0, 0, 0.4);
        position: relative;
        z-index: 2;
      }
    }

    .left-content-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 20px;
      background: linear-gradient(
        135deg,
        rgba(0, 0, 0, 0.7) 0%,
        rgba(0, 0, 0, 0.4) 50%,
        rgba(0, 0, 0, 0.1) 100%
      );
      color: white;
      z-index: 5;
      pointer-events: none;
    }

    .content-header {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      width: 100%;
      margin-bottom: 12px;
      pointer-events: auto;

      .project-name {
        font-size: 24px;
        font-weight: 700;
        margin: 0;
        text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.8);
        line-height: 1.2;
        width: 100%;
      }
    }

    .location-info {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 16px;
      text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
      pointer-events: auto;

      .location-icon {
        font-size: 16px;
        color: #dc2626;
      }
    }

    .view-details-btn {
      position: absolute;
      bottom: 16px;
      right: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 8px 16px;
      background: transparent;
      color: #dc2626;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 700;
      font-size: 14px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border: none;
      cursor: pointer;
      z-index: 10;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

      &:hover {
        background: rgba(220, 38, 38, 0.1);
        transform: translateY(-2px);
        color: #b91c1c;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
      }
    }
  }

  &:hover .image-container .property-image {
    transform: scale(1.1);
  }

  &:hover .image-container .image-overlay {
    opacity: 1;
  }

  @media (max-width: 768px) {
    min-height: 350px;
    max-height: 350px;

    .left-content-overlay {
      padding: 16px;
    }

    .content-header {
      margin-bottom: 10px;

      .project-name {
        font-size: 20px;
        text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.8);
      }
    }

    .location-info {
      font-size: 13px;
      margin-bottom: 12px;

      .location-icon {
        font-size: 15px;
      }
    }

    .price-badge {
      width: auto;
      height: auto;

      .price-text {
        font-size: 24px;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6), 1px 1px 2px rgba(0, 0, 0, 0.4);
      }
    }

    .view-details-btn {
      font-size: 13px;
      padding: 6px 12px;
    }
  }

  @media (max-width: 480px) {
    min-height: 300px;
    max-height: 300px;

    .left-content-overlay {
      padding: 14px;
    }

    .content-header {
      margin-bottom: 8px;

      .project-name {
        font-size: 18px;
        text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
      }
    }

    .location-info {
      font-size: 12px;
      margin-bottom: 10px;

      .location-icon {
        font-size: 14px;
      }
    }

    .price-badge {
      width: auto;
      height: auto;

      .price-text {
        font-size: 22px;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6), 1px 1px 2px rgba(0, 0, 0, 0.4);
      }
    }

    .view-details-btn {
      font-size: 12px;
      padding: 5px 10px;
    }
  }
`;

export default ModernRecommendedSection;