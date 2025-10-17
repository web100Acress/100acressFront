import React, { useState, useEffect, useRef, useContext } from "react";
import { useSelector } from "react-redux";
import { Skeleton } from 'antd';
import { format } from 'date-fns';
import { getPossessionInfo } from '../../Utils/possessionUtils';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import { 
  MdLocationPin, 
  MdArrowForward,
  MdFavoriteBorder,
  MdFavorite,
  MdBed,
  MdSquareFoot,
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
      // Remove Gurugram/Gurgaon from area
      const area = project.area.replace(/,?\s*(Gurugram|Gurgaon)\s*/gi, '').trim();
      if (area) locationParts.push(area);
    } else if (project?.projectAddress) {
      // Remove Gurugram/Gurgaon from address
      const address = project.projectAddress.replace(/,?\s*(Gurugram|Gurgaon)\s*/gi, '').trim();
      if (address) locationParts.push(address);
    }
    
    if (project?.city && project?.city.toLowerCase() !== 'gurugram' && project?.city.toLowerCase() !== 'gurgaon') {
      locationParts.push(project.city);
    }
    
    if (locationParts.length === 0) {
      return 'Spain, Costa del Sol';
    }
    
    return locationParts.join(', ');
  };

  const formatPossession = (project) => {
    const possessionInfo = getPossessionInfo(project);
    return possessionInfo.value;
  };

  const getPossessionLabel = (project) => {
    const possessionInfo = getPossessionInfo(project);
    return possessionInfo.label;
  };

  const parsePaymentPlan = (paymentPlan) => {
    if (!paymentPlan) return null;

    // Handle string format (e.g., "20:40:30:10" or "20-40-30-10")
    if (typeof paymentPlan === 'string') {
      const parts = paymentPlan.split(/[:-]/).map(p => p.trim()).filter(Boolean);
      if (parts.length >= 3) {
        return parts.slice(0, 4).map((part) => ({
          percentage: part + '%'
        }));
      }
      // If it's a descriptive string, show it as-is
      return [{ percentage: paymentPlan }];
    }

    // Handle array format
    if (Array.isArray(paymentPlan) && paymentPlan.length > 0) {
      return paymentPlan.slice(0, 4).map((plan) => ({
        percentage: plan.includes('%') ? plan : plan + '%'
      }));
    }

    return null;
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
      <div className="w-full px-4 pt-12 pb-4">
        <div className="text-center mb-0 px-2 pt-0">
          <div className="inline-flex items-center gap-4 mb-0">
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
            spaceBetween={12}
            loop={displayData.length > 4}
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
                spaceBetween: 12,
                centeredSlides: true,
              },
              640: {
                slidesPerView: 2,
                slidesPerGroup: 1,
                spaceBetween: 12,
                centeredSlides: false,
              },
              768: {
                slidesPerView: 3,
                slidesPerGroup: 1,
                spaceBetween: 12,
                centeredSlides: false,
              },
              1024: {
                slidesPerView: 4,
                slidesPerGroup: 1,
                spaceBetween: 12,
                centeredSlides: false,
              },
              1280: {
                slidesPerView: 4,
                slidesPerGroup: 1,
                spaceBetween: 12,
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
                  getPossessionLabel={getPossessionLabel}
                  parsePaymentPlan={parsePaymentPlan}
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
  getPossessionLabel,
  parsePaymentPlan,
  favTick,
  isAuthenticated,
  onShowAuth
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Parse payment plan for this project
  const paymentPlanData = parsePaymentPlan(project?.paymentPlan);

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
          onClick={handleWishlist}
          className="action-btn wishlist-btn"
          aria-label="Toggle wishlist"
          title={isFav ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isFav ? (
            <MdFavorite size={16} />
          ) : (
            <MdFavoriteBorder size={16} />
          )}
        </button>
        <button
          onClick={handleShare}
          className="action-btn whatsapp-btn"
          aria-label="Share on WhatsApp"
          title="Share on WhatsApp"
        >
          <FaWhatsapp size={16} />
        </button>
      </div>

      <div className="image-container">
        <div className="image-overlay"></div>
        <img
          src={project?.thumbnailImage?.url || project?.frontImage?.url}
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
              <span className="info-value">{project?.totalLandArea || project?.projectArea || project?.landArea || '5 Acres'} Acres</span>
              <span className="info-label">Land Area</span>
            </div>
          </div>
          <div className="info-item">
            <MdBed className="info-icon" />
            <div className="info-content">
              <span className="info-value">{formatPossession(project)}</span>
              <span className="info-label">{getPossessionLabel(project)}</span>
            </div>
          </div>
        </div>

        {paymentPlanData && paymentPlanData.length > 0 && (
          <div className="payment-plan-section">
            <div className="payment-header">
              <span className="payment-title">Payment Plan</span>
            </div>
            <div className="payment-options">
              {paymentPlanData.map((plan, index) => (
                <React.Fragment key={index}>
                  <div className="payment-option">
                    <div className="payment-percentage">{plan.percentage}</div>
                  </div>
                  {index < paymentPlanData.length - 1 && (
                    <div className="payment-divider">→</div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

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
  background: #ffffff; // Pure white background like the rest of the website
  position: relative;
  overflow: hidden;
  margin-top: 0;
  padding: 40px 0 0; // Removed bottom padding to eliminate gap

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
    min-height: 400px;
    margin: 0;
    margin-bottom: 0;
    background: transparent;
  }

  .modern-swiper {
    width: 100%;
    height: 100%;
    padding-bottom: 0;
    
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
    padding: 16px 0 0; // Minimal top padding, no bottom padding for mobile

    .carousel-container {
      min-height: 400px;
    }

    .modern-swiper {
      padding-bottom: 35px;
    }
  }
`;

const CardWrapper = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
  margin: 0 2px;
  height: 380px;
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
      transform: translateY(-20px);
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .bottom-info {
      opacity: 1;
      transform: translateY(0);
    }

    .property-image {
      transform: scale(1.08);
    }

    .image-overlay {
      opacity: 0.2;
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
    flex-direction: column;
    gap: 10px;
    z-index: 20;

    .action-btn {
      width: 36px;
      height: 36px;
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
        svg {
          transition: all 0.3s ease;
        }

        &:hover svg {
          color: #25D366;
          transform: scale(1.1);
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
      bottom: 0;
      left: 0;
      right: 0;
      height: 220px;
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.95) 0%,
        rgba(0, 0, 0, 0.88) 15%,
        rgba(0, 0, 0, 0.75) 30%,
        rgba(0, 0, 0, 0.6) 45%,
        rgba(0, 0, 0, 0.4) 60%,
        rgba(0, 0, 0, 0.2) 75%,
        rgba(0, 0, 0, 0) 100%
      );
      z-index: 2;
      transition: opacity 0.5s ease;
      pointer-events: none;
      opacity: 1;
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
      z-index: 1;
      
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
    opacity: 1;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.85) 0%,
      rgba(0, 0, 0, 0.7) 40%,
      rgba(0, 0, 0, 0.6) 70%,
      rgba(0, 0, 0, 0) 100%
    );

    .property-title {
      font-size: 18px;
      font-weight: 700;
      margin: 0 0 8px 0;
      line-height: 1.2;
      text-shadow: 0 3px 12px rgba(0, 0, 0, 0.9), 0 1px 3px rgba(0, 0, 0, 1);
      letter-spacing: -0.5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      // background: rgba(0, 0, 0, 0.4);
      // padding: 6px 12px;
      // border-radius: 6px;
      // backdrop-filter: blur(8px);
    }

    .property-location {
      font-size: 14px;
      font-weight: 500;
      opacity: 0.98;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.9), 0 1px 3px rgba(0, 0, 0, 1);
      display: flex;
      align-items: center;
      gap: 6px;
      // background: rgba(0, 0, 0, 0.35);
      // padding: 4px 12px;
      // border-radius: 6px;
      // backdrop-filter: blur(8px);
      // width: fit-content;
    }
  }

  .bottom-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    padding: 14px 16px;
    opacity: 0;
    transform: translateY(100%);
    transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    z-index: 15;
    box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.08);
    border-top: 1px solid rgba(220, 38, 38, 0.1);

    .info-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      margin-bottom: 12px;
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(226, 232, 240, 0.8);

      .info-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        padding: 8px;
        border-radius: 10px;
        background: linear-gradient(135deg, #f8fafc, #f1f5f9);
        transition: all 0.3s ease;

        &:hover {
          background: linear-gradient(135deg, #fef2f2, #fee2e2);
          transform: translateY(-1px);
        }

        .info-icon {
          font-size: 18px;
          color: #dc2626;
        }

        .info-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;

          .info-value {
            font-size: 13px;
            font-weight: 700;
            color: #111827;
          }

          .info-label {
            font-size: 9px;
            color: #6b7280;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.4px;
          }
        }
      }
    }

    .payment-plan-section {
      margin-bottom: 12px;
      padding: 10px 12px;
      background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
      border-radius: 10px;
      border: 1px solid rgba(16, 185, 129, 0.2);

      .payment-header {
        text-align: center;
        margin-bottom: 8px;

        .payment-title {
          font-size: 10px;
          font-weight: 700;
          color: #059669;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }
      }

      .payment-options {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 6px;

        .payment-option {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          padding: 8px 4px;
          background: white;
          border-radius: 8px;
          border: 1.5px solid rgba(16, 185, 129, 0.3);
          transition: all 0.3s ease;

          &:hover {
            transform: translateY(-1px);
            border-color: rgba(16, 185, 129, 0.6);
            box-shadow: 0 2px 8px rgba(16, 185, 129, 0.15);
          }

          .payment-percentage {
            font-size: 16px;
            font-weight: 800;
            color: #059669;
            line-height: 1;
          }
        }

        .payment-divider {
          font-size: 12px;
          font-weight: 700;
          color: #10b981;
          flex-shrink: 0;
        }
      }
    }

    .price-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      padding: 10px 16px;
      background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
      border-radius: 10px;
      border: 1px solid rgba(220, 38, 38, 0.2);

      .price-label {
        font-size: 9px;
        color: #6b7280;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.8px;
      }

      .price {
        font-size: 24px;
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
    height: 340px;
    border-radius: 16px;
    margin: 0 2px;

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
        width: 32px;
        height: 32px;
      }
    }

    .image-container {
      .image-overlay {
        height: 200px;
        background: linear-gradient(
          to top,
          rgba(0, 0, 0, 0.95) 0%,
          rgba(0, 0, 0, 0.85) 20%,
          rgba(0, 0, 0, 0.7) 40%,
          rgba(0, 0, 0, 0.5) 60%,
          rgba(0, 0, 0, 0.25) 80%,
          rgba(0, 0, 0, 0) 100%
        );
      }
    }

    .content-overlay {
      padding: 20px;
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.9) 0%,
        rgba(0, 0, 0, 0.75) 40%,
        rgba(0, 0, 0, 0.45) 70%,
        rgba(0, 0, 0, 0) 100%
      );

      .property-title {
        font-size: 16px;
        // background: rgba(0, 0, 0, 0.45);
        // padding: 5px 10px;
        // border-radius: 5px;
      }

      .property-location {
        font-size: 13px;
        // background: rgba(0, 0, 0, 0.4);
        // padding: 3px 10px;
        // border-radius: 5px;
      }
    }

    .bottom-info {
      padding: 12px 14px;

      .info-grid {
        gap: 8px;
        margin-bottom: 10px;
        padding-bottom: 10px;

        .info-item {
          padding: 6px;

          .info-icon {
            font-size: 16px;
          }

          .info-content {
            .info-value {
              font-size: 12px;
            }

            .info-label {
              font-size: 8px;
            }
          }
        }
      }

      .payment-plan-section {
        margin-bottom: 10px;
        padding: 8px 10px;

        .payment-header {
          margin-bottom: 6px;

          .payment-title {
            font-size: 9px;
          }
        }

        .payment-options {
          gap: 4px;

          .payment-option {
            padding: 6px 4px;

            .payment-percentage {
              font-size: 14px;
            }
          }

          .payment-divider {
            font-size: 10px;
          }
        }
      }

      .price-section {
        padding: 8px 12px;

        .price-label {
          font-size: 8px;
        }

        .price {
          font-size: 20px;
        }
      }
    }
  }

  @media (max-width: 480px) {
    height: 320px;
  }
`;

export default ModernRecommendedSection;