import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { MdArrowForward, MdArrowBack } from 'react-icons/md';
import styled from "styled-components";
import { isFavorite as favCheck, toggleFavorite, subscribe, hydrateFavoritesFromServer } from "../../Utils/favorites";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

function ModernCarousel({ AllProjects = [] }) {
  const [number, setNumber] = useState(4);

  const updateNumber = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 480) {
      setNumber(1);
    } else if (screenWidth < 768) {
      setNumber(2);
    } else if (screenWidth < 992) {
      setNumber(3);
    } else {
      setNumber(4);
    }
  };

  useEffect(() => {
    updateNumber();
    window.addEventListener('resize', updateNumber);
    // Ensure initial server state is reflected in hearts
    hydrateFavoritesFromServer();

    return () => {
      window.removeEventListener('resize', updateNumber);
    };
  }, []);

  return (
    <Wrapper className="section">
      <div className="carousel-container">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={number}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            480: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          className="modern-swiper"
        >
          {AllProjects && AllProjects.length > 0 ? (
            AllProjects.slice(0, 8).map((property, idx) => (
              <SwiperSlide key={property._id || idx}>
                <PropertyCard property={property} />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className="no-properties">
                <p>No similar properties found.</p>
              </div>
            </SwiperSlide>
          )}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <div className="swiper-button-prev custom-nav-btn">
          <MdArrowBack />
        </div>
        <div className="swiper-button-next custom-nav-btn">
          <MdArrowForward />
        </div>
      </div>
    </Wrapper>
  );
}

const PropertyCard = ({ property }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(() => favCheck(property?._id || property?.id || property?.slug));

  useEffect(() => {
    // Cross-tab + in-process updates for this card's heart
    const unsub = subscribe(() => {
      const id = property?._id || property?.id || property?.slug;
      setIsFavorite(favCheck(id));
    });
    return () => { if (typeof unsub === 'function') unsub(); };
  }, [property?._id, property?.id, property?.slug]);

  const formatPrice = (price) => {
    if (!price) return "Price on request";
    return `₹${price} Cr`;
  };

  const truncateText = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  return (
    <CardWrapper
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`property-card ${isHovered ? 'hovered' : ''}`}
    >
      {/* Image Section */}
      <div className="image-container">
        <img
          src={property?.frontImage?.url || property?.thumbnailImage?.url}
          alt={property?.projectName}
          className="property-image"
          loading="lazy"
          decoding="async"
        />
        
        {/* Image Overlay */}
        <div className="image-overlay" />
        
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const id = property?._id || property?.id || property?.slug;
            const snapshot = {
              title: property?.projectName,
              frontImage: property?.frontImage,
              thumbnailImage: property?.thumbnailImage,
              priceText: formatPrice(property?.minPrice || property?.price),
              url: property?.project_url ? `/${property?.project_url}/` : undefined,
              city: property?.city,
              maxPrice: property?.maxPrice || property?.price,
              minPrice: property?.minPrice,
            };
            toggleFavorite(id, snapshot);
            // Immediate update; subscription will keep it consistent across tabs as well
            setIsFavorite((v) => !v);
          }}
          className="favorite-btn"
        >
          {isFavorite ? 
            <span className="heart-filled">❤️</span> : 
            <span className="heart-outline">🤍</span>
          }
        </button>

        {/* Price Badge */}
        <div className="price-badge">
          <span className="price-text">
            {formatPrice(property?.minPrice || property?.price)}
          </span>
        </div>

        {/* Quick Info Overlay */}
        <div className={`quick-info ${isHovered ? 'visible' : ''}`}>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-icon">📍</span>
              <span>{property?.city || 'Location'}</span>
            </div>
            <div className="info-item">
              <span className="info-icon">🏠</span>
              <span>
                {property?.BhK_Details?.length === 1
                  ? property?.BhK_Details[0]?.bhk_type
                  : `${property?.BhK_Details?.[property?.BhK_Details?.length - 1]?.bhk_type}`}
              </span>
            </div>
            <div className="info-item">
              <span className="info-icon">💰</span>
              <span>{formatPrice(property?.maxPrice || property?.price)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="content">
        <div className="content-header">
          <h3 className="project-name">
            {truncateText(property?.projectName, 4)}
          </h3>
          <div className="rating">
            <span className="star">⭐</span>
            <span>4.8</span>
          </div>
        </div>

        <p className="description">
          {truncateText(property?.project_discripation, 12)}
        </p>

        <div className="property-details">
          <div className="detail-item">
            <span className="detail-icon">📍</span>
            <span>{property?.city || 'N/A'}</span>
          </div>
          <div className="detail-item">
            <span className="detail-icon">📐</span>
            <span>{property?.BhK_Details?.length || 0} Types</span>
          </div>
        </div>

        <a href={`/${property?.project_url}/`} className="view-details-btn">
          <span>View Details</span>
          <MdArrowForward />
        </a>
      </div>
    </CardWrapper>
  );
};

const Wrapper = styled.section`
  .carousel-container {
    position: relative;
    width: 90vw;
    margin: 2% auto 5% auto;
    
    .modern-swiper {
      padding: 20px 0 60px 0;
      
      .swiper-slide {
        height: auto;
      }
    }

    .modern-swiper .swiper-slide {
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .modern-swiper .swiper-slide-active {
      width: 480px !important;
      height: 320px !important;
      max-width: 90vw;
      max-height: 60vw;
      border-radius: 32px;
      box-shadow: 0 8px 32px rgba(230,82,31,0.18), 0 2px 8px rgba(0,0,0,0.10);
      z-index: 2;
    }
    .modern-swiper .swiper-slide:not(.swiper-slide-active) {
      width: 340px !important;
      height: 420px !important;
      opacity: 0.85;
      filter: blur(0.5px) grayscale(10%);
      border-radius: 20px;
    }

    .custom-nav-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 50px;
      height: 50px;
      background: white;
      border-radius: 50%;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      z-index: 10;
      color: #E6521F;

      &:hover {
        background: #E6521F;
        color: white;
        transform: translateY(-50%) scale(1.1);
      }

      &.swiper-button-prev {
        left: -25px;
      }

      &.swiper-button-next {
        right: -25px;
      }
    }

    .swiper-pagination {
      bottom: 0;
      
      .swiper-pagination-bullet {
        background: #E6521F;
        opacity: 0.5;
        transition: all 0.3s ease;
        
        &.swiper-pagination-bullet-active {
          background: #E6521F;
          opacity: 1;
          transform: scale(1.2);
        }
      }
    }

    .no-properties {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 300px;
      background: #f8fafc;
      border-radius: 20px;
      color: #6b7280;
      font-size: 18px;
    }
  }

  @media (max-width: 768px) {
    .carousel-container {
      width: 95vw;
      
      .custom-nav-btn {
        width: 40px;
        height: 40px;
        
        &.swiper-button-prev {
          left: 10px;
        }
        
        &.swiper-button-next {
          right: 10px;
        }
      }
    }
  }
`;

const CardWrapper = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  position: relative;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  .image-container {
    position: relative;
    height: 280px;
    overflow: hidden;

    .property-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
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

    .favorite-btn {
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
      transition: all 0.3s ease;
      z-index: 10;
      font-size: 18px;

      &:hover {
        background: white;
        transform: scale(1.1);
      }

      .heart-filled {
        color: #ef4444;
      }

      .heart-outline {
        color: #6b7280;
      }
    }

    .price-badge {
      position: absolute;
      bottom: 16px;
      left: 16px;
      background: #E6521F;
      color: #fff;
      padding: 8px 16px;
      border-radius: 20px;
      font-weight: 600;
      font-size: 14px;
      backdrop-filter: blur(10px);
    }

    .quick-info {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(10px);
      padding: 16px;
      transform: translateY(100%);
      transition: transform 0.3s ease;

      &.visible {
        transform: translateY(0);
      }

      .info-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;

        .info-item {
          display: flex;
          align-items: center;
          gap: 6px;
          color: white;
          font-size: 12px;

          .info-icon {
            color: #f97316;
          }
        }
      }
    }
  }

  .content {
    padding: 24px;

    .content-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;

      .project-name {
        font-size: 18px;
        font-weight: 700;
        color: #1f2937;
        line-height: 1.3;
        flex: 1;
        margin-right: 12px;
      }

      .rating {
        display: flex;
        align-items: center;
        gap: 4px;
        color: #f59e0b;
        font-weight: 600;
        font-size: 14px;

        .star {
          font-size: 16px;
        }
      }
    }

    .description {
      color: #6b7280;
      font-size: 14px;
      line-height: 1.5;
      margin-bottom: 16px;
    }

    .property-details {
      display: flex;
      gap: 16px;
      margin-bottom: 20px;

      .detail-item {
        display: flex;
        align-items: center;
        gap: 6px;
        color: #4b5563;
        font-size: 13px;

        .detail-icon {
          color: #f97316;
          font-size: 16px;
        }
      }
    }

    .view-details-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      padding: 12px 24px;
      background: #E6521F;
      color: #fff;
      text-decoration: none;
      border-radius: 12px;
      font-weight: 600;
      transition: all 0.3s ease;
      border: none;
      cursor: pointer;

      &:hover {
        background: #b33e16;
        color: #fff;
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(249, 115, 22, 0.3);
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
    .image-container {
      height: 240px;
    }

    .content {
      padding: 20px;

      .content-header .project-name {
        font-size: 16px;
      }

      .property-details {
        flex-direction: column;
        gap: 8px;
      }
    }
  }
`;

export default ModernCarousel;