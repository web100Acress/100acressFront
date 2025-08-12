import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Skeleton } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { 
  MdLocationPin, 
  MdAttachMoney, 
  MdStar, 
  MdShare,
  MdArrowForward,
  MdArrowBack
} from 'react-icons/md';
import { FaBed } from 'react-icons/fa';
import styled from 'styled-components';
import Api_Service from "../../Redux/utils/Api_Service";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ModernRecommendedSection = () => {
  const spotlight = useSelector(store => store?.project?.spotlight);
  const [hoveredCard, setHoveredCard] = useState(null);
  const swiperRef = useRef(null);
  const { getSpotlight } = Api_Service();

  // Fetch spotlight data on component mount
  useEffect(() => {
    getSpotlight();
  }, [getSpotlight]);

  // Mock data for testing if no spotlight data
  const mockSpotlightData = [
    {
      _id: 'mock1',
      projectName: 'Luxury Villa Complex',
      city: 'Gurugram',
      sector: 'Sector 102',
      area: 'Dwarka Expressway',
      projectAddress: 'Near IGI Airport',
      minPrice: 2.5,
      maxPrice: 5.2,
      project_url: 'luxury-villa',
      frontImage: { url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop' },
      BhK_Details: [{ bhk_type: '3 BHK' }, { bhk_type: '4 BHK' }],
      description: 'Premium luxury villas with world-class amenities and modern architecture in prime location.'
    },
    {
      _id: 'mock2',
      projectName: 'Modern Apartment Tower',
      city: 'Gurugram',
      sector: 'Sector 43',
      area: 'Golf Course Road',
      projectAddress: 'Opposite DLF Cyber City',
      minPrice: 1.8,
      maxPrice: 3.5,
      project_url: 'modern-apartment',
      frontImage: { url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop' },
      BhK_Details: [{ bhk_type: '2 BHK' }, { bhk_type: '3 BHK' }],
      description: 'Contemporary apartments featuring smart home technology and sustainable living solutions.'
    },
    {
      _id: 'mock3',
      projectName: 'Premium Residency',
      city: 'Gurugram',
      sector: 'Sector 39',
      area: 'Sohna Road',
      projectAddress: 'Near Medanta Hospital',
      minPrice: 3.2,
      maxPrice: 6.8,
      project_url: 'premium-residency',
      frontImage: { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop' },
      BhK_Details: [{ bhk_type: '4 BHK' }, { bhk_type: '5 BHK' }],
      description: 'Exclusive residential complex with premium finishes and exceptional lifestyle amenities.'
    },
    {
      _id: 'mock4',
      projectName: 'Elite Gardens',
      city: 'Gurugram',
      sector: 'Sector 67',
      area: 'Golf Course Extension',
      projectAddress: 'Near Cyber Hub',
      minPrice: 2.1,
      maxPrice: 4.5,
      project_url: 'elite-gardens',
      frontImage: { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop' },
      BhK_Details: [{ bhk_type: '2 BHK' }, { bhk_type: '3 BHK' }, { bhk_type: '4 BHK' }],
      description: 'Beautifully landscaped community with green spaces and family-friendly environment.'
    },
    {
      _id: 'mock5',
      projectName: 'Royal Heights',
      city: 'Gurugram',
      sector: 'Sector 84',
      area: 'NH-8',
      projectAddress: 'Near Manesar',
      minPrice: 4.5,
      maxPrice: 8.2,
      project_url: 'royal-heights',
      frontImage: { url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop' },
      BhK_Details: [{ bhk_type: '3 BHK' }, { bhk_type: '4 BHK' }, { bhk_type: '5 BHK' }],
      description: 'Ultra-luxury residences with panoramic city views and bespoke lifestyle services.'
    }
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
      <div className="container mx-auto px-4 py-4">
        {/* Header Section */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-3 mb-0">
            <div className="w-12 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              100acress
              <span className="text-orange-500 ml-2">Recommended</span>
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full"></div>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-0">
            Discover premium properties with luxury, location, and investment potential.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="carousel-container">
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, Autoplay]}
            grabCursor={true}
            centeredSlides={false}
            slidesPerView={2}
            spaceBetween={24}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              el: '.swiper-pagination',
            }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
                centeredSlides: true,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 24,
                centeredSlides: false,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
                centeredSlides: false,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 20,
                centeredSlides: false,
              },
              1280: {
                slidesPerView: 2,
                spaceBetween: 20,
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
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="swiper-button-prev custom-nav-btn">
            <MdArrowBack />
          </div>
          <div className="swiper-button-next custom-nav-btn">
            <MdArrowForward />
          </div>

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
  formatLocation
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

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

  return (
    <CardWrapper
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`property-card ${isHovered ? 'hovered' : ''}`}
    >
      <Link 
        to={`/${project?.project_url}/`}
        className="card-link"
        onClick={(e) => {
          // Don't navigate if clicking on share or view details buttons
          if (e.target.closest('.share-btn') || e.target.closest('.view-details-btn')) {
            e.preventDefault();
          }
        }}
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
          <Link 
            to={`/${project?.project_url}/`}
            className="view-details-btn"
            onClick={(e) => e.stopPropagation()}
          >
            <span>View Details</span>
            <MdArrowForward />
          </Link>
        </div>
      </Link>
    </CardWrapper>
  );
};

// Styled Components
const SectionWrapper = styled.section`
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  position: relative;
  overflow: hidden;

  .carousel-container {
    position: relative;
    overflow: visible;
    width: 100%;
    max-width: 1200px;
    height: 450px;
    margin: 0 auto;
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
    background: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 100;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    color: white;
    font-size: 32px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

    &:hover {
      transform: translateY(-50%) scale(1.2);
      color: white;
      text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7);
    }

    &.swiper-button-prev {
      left: -80px;
    }
    
    &.swiper-button-next {
      right: -80px;
    }

    &.swiper-button-disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: translateY(-50%) scale(0.9);
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
        background: #f97316;
        opacity: 1;
        transform: scale(1.2);
        width: 20px;
      }
    }
  }

  @media (max-width: 768px) {
    .carousel-container {
      padding: 20px 0 60px 0;
      min-height: 400px;
      max-width: 900px;
      overflow: visible;
    }

    .modern-swiper {
      padding: 10px 0 40px 0;
    }

    .custom-nav-btn {
      width: 50px;
      height: 50px;
      font-size: 28px;
      
      &.swiper-button-prev {
        left: -70px;
      }
      
      &.swiper-button-next {
        right: -70px;
      }
    }
  }

  @media (max-width: 480px) {
    .carousel-container {
      padding: 15px 0 50px 0;
      min-height: 350px;
      max-width: 700px;
      overflow: visible;
    }

    .modern-swiper {
      padding: 5px 0 30px 0;
    }

    .custom-nav-btn {
      width: 45px;
      height: 45px;
      font-size: 24px;
      
      &.swiper-button-prev {
        left: -60px;
      }
      
      &.swiper-button-next {
        right: -60px;
      }
    }
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
        color: #f97316;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
      }
    }

    .price-badge {
      position: absolute;
      bottom: 16px;
      left: 16px;
      width: 180px;
      height: 180px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #FF9933, #FFFFFF, #138808);
      background-image: url('https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/independencekjshdvjkvl-removebg-preview.webp');
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 4px 16px rgba(0, 0, 0, 0.2);
      border: none;
      z-index: 10;
      overflow: hidden;
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));

      .price-text {
        color: white;
        font-weight: 700;
        font-size: 22px;
        text-align: center;
        line-height: 1.2;
        text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.9), 1px 1px 3px rgba(0, 0, 0, 0.7);
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
        color: #f97316;
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
      color: #f97316;
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
        background: rgba(249, 115, 22, 0.1);
        transform: translateY(-2px);
        color: #ea580c;
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
      width: 160px;
      height: 160px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.2);
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));

      .price-text {
        font-size: 20px;
        text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.9), 1px 1px 2px rgba(0, 0, 0, 0.7);
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
      width: 140px;
      height: 140px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.2);
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));

      .price-text {
        font-size: 18px;
        text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.9), 1px 1px 2px rgba(0, 0, 0, 0.7);
      }
    }

    .view-details-btn {
      font-size: 12px;
      padding: 5px 10px;
    }
  }
`;

export default ModernRecommendedSection; 