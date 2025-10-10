import React, { useState, useEffect, useRef, useContext } from "react";
import { useSelector } from "react-redux";
import { Skeleton } from 'antd';
import { format } from 'date-fns';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import { 
  MdLocationPin, 
  MdArrowForward,
  MdFavoriteBorder,
  MdFavorite,
  MdBed,
  MdBathtub,
  MdSquareFoot,
  MdDirectionsCar,
  MdVerifiedUser
} from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import styled from 'styled-components';
import Api_Service from "../../Redux/utils/Api_Service";
import { isFavorite as favCheck, toggleFavorite, subscribe, hydrateFavoritesFromServer } from "../../Utils/favorites";
import { AuthContext } from "../../AuthContext";
import AuthModal from "../../Components/AuthModal";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ModernRecommendedSection = () => {
  const [showAuth, setShowAuth] = useState(false);
  const spotlight = useSelector(store => store?.project?.spotlight);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [favTick, setFavTick] = useState(0);
  const swiperRef = useRef(null);
  const { getSpotlight } = Api_Service();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    getSpotlight();
  }, [getSpotlight]);

  useEffect(() => {
    hydrateFavoritesFromServer();
    const unsub = subscribe(() => setFavTick((v) => v + 1));
    return () => { if (typeof unsub === 'function') unsub(); };
  }, []);

  const mockSpotlightData = [];
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
    
    if (project?.sector) {
      locationParts.push(project.sector);
    }
    
    if (project?.area) {
      locationParts.push(project.area);
    } else if (project?.projectAddress) {
      locationParts.push(project.projectAddress);
    }
    
    if (project?.city) {
      locationParts.push(project.city);
    }
    
    if (locationParts.length === 0) {
      return 'Spain, Costa del Sol';
    }
    
    return locationParts.join(', ');
  };

  const formatPossession = (project) => {
    if (project?.possessionDate) {
      try {
        return format(new Date(project.possessionDate), 'MMM yyyy');
      } catch (error) {
        console.error('Error formatting possession date:', error);
        return project?.project_Status || 'Ready to Move';
      }
    }
    return project?.project_Status || project?.possession || 'Ready to Move';
  };

  if (!displayData || displayData.length === 0) {
    return (
      <SectionWrapper>
        <div className="container mx-auto px-4 py-4">
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
      <AuthModal 
        open={showAuth} 
        onClose={() => setShowAuth(false)} 
        defaultView="Login" 
      />
      <div className="w-full px-4 pt-0 pb-4">
        <div className="text-center mb-8 px-2 pt-2">
          <div className="inline-flex items-center gap-4 mb-3">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-red-600 hidden sm:block"></div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent leading-tight">
              <span className="text-red-600">100acress</span> Recommended
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-red-600 to-transparent hidden sm:block"></div>
          </div>
          <p className="hidden sm:block text-gray-600 text-base max-w-2xl mx-auto">
            Discover premium properties handpicked for luxury living and exceptional investment returns
          </p>
        </div>

        <div className="sm:hidden text-center text-gray-500 text-sm mb-3 flex items-center justify-center gap-2">
          Swipe to explore <MdArrowForward className="animate-pulse" />
        </div>

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
                  formatPossession={formatPossession}
                  favTick={favTick}
                  isAuthenticated={isAuthenticated}
                  onShowAuth={() => setShowAuth(true)}
                />
              </SwiperSlide>
            ))}
          </Swiper>

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
  formatPossession,
  favTick,
  isAuthenticated,
  onShowAuth
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      onShowAuth();
      return;
    }
    
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
    
    const shareText = `Check out this amazing property: ${project?.projectName}`;
    const shareUrl = `${window.location.origin}/${project?.project_url}/`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const handleCardClick = (e) => {
    if (e.target.closest('.share-btn') || e.target.closest('.view-details-btn')) {
      e.preventDefault();
      return;
    }
    window.location.href = `/${project?.project_url}/`;
  };

  const handleViewDetails = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = `/${project?.project_url}/`;
  };

  const isFav = favCheck(project?._id || project?.id || project?.slug);

  return (
    <CardWrapper
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`property-card ${isHovered ? 'hovered' : ''}`}
      onClick={handleCardClick}
    >
      <div className="rera-badge">
        <MdVerifiedUser className="rera-icon" />
        <span>RERA</span>
      </div>

      <div className="action-buttons">
        <button
          onClick={handleShare}
          className="action-btn whatsapp-btn"
          aria-label="Share on WhatsApp"
          title="Share on WhatsApp"
        >
          <FaWhatsapp size={18} />
        </button>
        <button
          onClick={handleWishlist}
          className="action-btn wishlist-btn"
          aria-label="Toggle wishlist"
          title={isFav ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isFav ? (
            <MdFavorite size={18} />
          ) : (
            <MdFavoriteBorder size={18} />
          )}
        </button>
      </div>

      <div className="image-container">
        <div className="image-overlay"></div>
        <img
          src={project?.frontImage?.url}
          alt={project?.projectName}
          className={`property-image ${imageLoaded ? 'loaded' : ''}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
      </div>

      <div className="content-overlay">
        <h3 className="property-title">
          {truncateText(project?.projectName, 5)}
        </h3>
        <div className="property-location">
          <span>{formatLocation(project)}</span>
        </div>
      </div>

      <div className="bottom-info">
        <div className="info-grid">
          <div className="info-item">
            <MdSquareFoot className="info-icon" />
            <div className="info-content">
              <span className="info-value">{project?.totalLandArea || project?.projectArea || project?.landArea || '5 Acres'}</span>
              <span className="info-label">Land Area</span>
            </div>
          </div>
          <div className="info-item">
            <MdBed className="info-icon" />
            <div className="info-content">
              <span className="info-value">{formatPossession(project)}</span>
              <span className="info-label">Possession</span>
            </div>
          </div>
          <div className="info-item">
            <MdBathtub className="info-icon" />
            <div className="info-content">
              <span className="info-value">{project?.bathrooms || 2}</span>
              <span className="info-label">Baths</span>
            </div>
          </div>
          <div className="info-item">
            <MdDirectionsCar className="info-icon" />
            <div className="info-content">
              <span className="info-value">{project?.parking || 2}</span>
              <span className="info-label">Parks</span>
            </div>
          </div>
        </div>

        <div className="metrics-section">
          <div className="metric-card">
            <span className="metric-label">Token Price</span>
            <span className="metric-value">{project?.tokenPrice || '$50'}</span>
          </div>
          <div className="metric-card">
            <span className="metric-label">Projected IRR</span>
            <span className="metric-value highlight">{project?.irr || '18.9%'}</span>
          </div>
          <div className="metric-card">
            <span className="metric-label">Projected APR</span>
            <span className="metric-value highlight">{project?.apr || '15.2%'}</span>
          </div>
        </div>

        <div className="price-section">
          <div className="price-label">Starting From</div>
          <div className="price">
            {formatPrice(project?.minPrice || project?.price)}
          </div>
        </div>
      </div>
    </CardWrapper>
  );
};

const SectionWrapper = styled.section`
  background: linear-gradient(to bottom, #ffffff 0%, #f9fafb 100%);
  position: relative;
  overflow: hidden;
  margin-top: 0;
  padding: 60px 0 80px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(220, 38, 38, 0.1), transparent);
  }

  .carousel-container {
    position: relative;
    overflow: visible;
    width: 100%;
    max-width: none;
    min-height: 460px;
    margin: 0;
    background: transparent;
  }

  .modern-swiper {
    width: 100%;
    height: 100%;
    padding-bottom: 50px;
    
    .swiper-slide {
      height: auto;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .swiper-wrapper {
      align-items: stretch;
    }
  }

  .custom-pagination {
    bottom: 10px;
    
    .swiper-pagination-bullet {
      width: 8px;
      height: 8px;
      background: #cbd5e1;
      opacity: 1;
      transition: all 0.3s ease;
      margin: 0 6px;
      
      &.swiper-pagination-bullet-active {
        background: linear-gradient(135deg, #dc2626, #ef4444);
        width: 24px;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(220, 38, 38, 0.4);
      }
    }
  }

  @media (max-width: 768px) {
    padding: 40px 0 60px;

    .carousel-container {
      min-height: 440px;
    }

    .modern-swiper {
      padding-bottom: 45px;
    }
  }
`;

const CardWrapper = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
  margin: 0 4px;
  height: 420px;
  width: 100%;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06), 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(226, 232, 240, 0.8);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    padding: 2px;
    background: linear-gradient(135deg, rgba(220, 38, 38, 0.1), rgba(239, 68, 68, 0.05));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover, &.hovered {
    transform: translateY(-12px) scale(1.02);
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(220, 38, 38, 0.08);
    border-color: rgba(220, 38, 38, 0.2);

    &::before {
      opacity: 1;
    }
    
    .content-overlay {
      opacity: 0;
      transform: translateY(-30px);
    }

    .bottom-info {
      opacity: 1;
      transform: translateY(0);
    }

    .property-image {
      transform: scale(1.08);
    }

    .image-overlay {
      opacity: 0.3;
    }

    .rera-badge {
      background: rgba(255, 255, 255, 0.98);
      box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3);
    }

    .action-btn {
      background: rgba(255, 255, 255, 0.98);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
    }
  }

  .rera-badge {
    position: absolute;
    top: 16px;
    left: 16px;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(12px);
    padding: 8px 16px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 700;
    color: #1f2937;
    z-index: 20;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: all 0.4s ease;
    border: 1px solid rgba(255, 255, 255, 0.5);

    .rera-icon {
      font-size: 16px;
      color: #10b981;
      filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.5));
    }
  }

  .action-buttons {
    position: absolute;
    top: 16px;
    right: 16px;
    display: flex;
    gap: 10px;
    z-index: 20;

    .action-btn {
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.92);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      color: #374151;

      &:hover {
        transform: scale(1.15) translateY(-2px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      }

      &:active {
        transform: scale(0.95);
      }

      &.whatsapp-btn {
        color: #25D366;
        
        &:hover {
          background: linear-gradient(135deg, #25D366, #20BA5A);
          color: white;
          box-shadow: 0 8px 20px rgba(37, 211, 102, 0.4);
        }
      }

      &.wishlist-btn {
        svg {
          transition: all 0.3s ease;
        }

        &:hover svg {
          color: #dc2626;
          transform: scale(1.1);
        }
      }
    }
  }

  .image-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: linear-gradient(135deg, #1f2937 0%, #111827 100%);

    .image-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.4) 70%,
        rgba(0, 0, 0, 0.8) 100%
      );
      z-index: 2;
      transition: opacity 0.5s ease;
      pointer-events: none;
    }

    .property-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      opacity: 0;
      
      &.loaded {
        opacity: 1;
      }
    }
  }

  .content-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 24px;
    color: white;
    z-index: 10;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);

    .property-title {
      font-size: 22px;
      font-weight: 700;
      margin: 0 0 8px 0;
      line-height: 1.3;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
      letter-spacing: -0.5px;
    }

    .property-location {
      font-size: 14px;
      font-weight: 500;
      opacity: 0.95;
      text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      gap: 6px;
    }
  }

  .bottom-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    padding: 20px;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 15;
    box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.08);
    border-top: 1px solid rgba(220, 38, 38, 0.1);

    .info-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-bottom: 16px;
      padding-bottom: 16px;
      border-bottom: 1px solid rgba(226, 232, 240, 0.8);

      .info-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        padding: 10px;
        border-radius: 12px;
        background: linear-gradient(135deg, #f8fafc, #f1f5f9);
        transition: all 0.3s ease;

        &:hover {
          background: linear-gradient(135deg, #fef2f2, #fee2e2);
          transform: translateY(-2px);
        }

        .info-icon {
          font-size: 20px;
          color: #dc2626;
        }

        .info-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;

          .info-value {
            font-size: 14px;
            font-weight: 700;
            color: #111827;
          }

          .info-label {
            font-size: 10px;
            color: #6b7280;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
        }
      }
    }

    .metrics-section {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-bottom: 16px;

      .metric-card {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 10px;
        border-radius: 10px;
        background: linear-gradient(135deg, #f8fafc, #ffffff);
        border: 1px solid rgba(226, 232, 240, 0.6);
        transition: all 0.3s ease;

        &:hover {
          border-color: rgba(220, 38, 38, 0.3);
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.1);
        }

        .metric-label {
          font-size: 9px;
          color: #6b7280;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .metric-value {
          font-size: 13px;
          font-weight: 700;
          color: #111827;

          &.highlight {
            color: #10b981;
          }
        }
      }
    }

    .price-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 16px;
      background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
      border-radius: 12px;
      border: 1px solid rgba(220, 38, 38, 0.2);

      .price-label {
        font-size: 11px;
        color: #6b7280;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .price {
        font-size: 28px;
        font-weight: 800;
        background: linear-gradient(135deg, #dc2626, #ef4444);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        letter-spacing: -0.5px;
      }
    }
  }

  @media (max-width: 768px) {
    height: 380px;
    border-radius: 16px;

    .rera-badge {
      top: 12px;
      left: 12px;
      padding: 6px 12px;
      font-size: 11px;

      .rera-icon {
        font-size: 14px;
      }
    }

    .action-buttons {
      top: 12px;
      right: 12px;
      gap: 8px;

      .action-btn {
        width: 36px;
        height: 36px;
      }
    }

    .content-overlay {
      padding: 20px;

      .property-title {
        font-size: 18px;
      }

      .property-location {
        font-size: 13px;
      }
    }

    .bottom-info {
      padding: 16px;

      .info-grid {
        gap: 8px;
        margin-bottom: 12px;
        padding-bottom: 12px;

        .info-item {
          padding: 8px;

          .info-icon {
            font-size: 18px;
          }

          .info-content {
            .info-value {
              font-size: 13px;
            }

            .info-label {
              font-size: 9px;
            }
          }
        }
      }

      .metrics-section {
        gap: 8px;
        margin-bottom: 12px;

        .metric-card {
          padding: 8px;

          .metric-label {
            font-size: 8px;
          }

          .metric-value {
            font-size: 12px;
          }
        }
      }

      .price-section {
        padding: 12px;

        .price {
          font-size: 24px;
        }
      }
    }
  }

  @media (max-width: 480px) {
    height: 360px;
  }
`;

export default ModernRecommendedSection;