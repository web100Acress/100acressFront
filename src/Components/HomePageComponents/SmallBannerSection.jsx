import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActiveSmallBanners } from '../../Redux/slice/SmallBannerSlice';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SmallBannerSection = () => {
  const dispatch = useDispatch();
  const { activeSmallBanners, loading, error } = useSelector(state => state.smallBanner);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchActiveSmallBanners());
  }, [dispatch]);

  // Handle responsive image switching
  useEffect(() => {
    const handleResize = () => {
      const images = document.querySelectorAll('.responsive-banner-img');
      images.forEach(img => {
        const mobileSrc = img.getAttribute('data-mobile-src');
        const desktopSrc = img.getAttribute('data-desktop-src') || img.getAttribute('src');
        
        // Check if we're in mobile view (screen width < 768px OR if parent has mobile classes)
        const isMobileView = window.innerWidth < 768 || 
                            img.closest('.block.sm\\:hidden') !== null ||
                            img.closest('[class*="sm:hidden"]') !== null;
        
        if (isMobileView) {
          // Mobile view - use mobile image
          if (mobileSrc && img.src !== mobileSrc) {
            img.src = mobileSrc;
          }
        } else {
          // Desktop view - use desktop image
          if (desktopSrc && img.src !== desktopSrc) {
            img.src = desktopSrc;
          }
        }
      });
    };

    // Set initial images
    handleResize();
    
    // Listen for resize events
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [activeSmallBanners]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    customPaging: (i) => (
      <button
        className={`rounded-full mt-4 mr-2 ${i === currentImageIndex ? 'bg-gray-800 h-2 w-5' : 'bg-gray-400 h-3 w-3'}`}
      ></button>
    ),
    afterChange: (index) => setCurrentImageIndex(index),
  };

  // Show loading state
  if (loading) {
    return (
      <SmallBannerWrapper>
        <div className="small-banner-loading">
          <div className="loading-spinner"></div>
        </div>
      </SmallBannerWrapper>
    );
  }

  // Show error state or no banners
  if (error || activeSmallBanners.length === 0) {
    return null; // Don't show anything if no small banners
  }

  return (
    <SmallBannerWrapper>
      <Slider {...settings}>
        {activeSmallBanners.map((banner, index) => {
          // Use desktop image by default, mobile image will be handled by CSS
          const desktopImageUrl = banner.desktopImage?.cdn_url || banner.desktopImage?.url;
          const mobileImageUrl = banner.mobileImage?.cdn_url || banner.mobileImage?.url;
          const fallbackImageUrl = banner.image?.cdn_url || banner.image?.url || 
                                  banner.cdn_url || banner.imageUrl;
          
          const targetUrl = banner.slug ? `https://www.100acress.com/${banner.slug}` : (banner.link || '#');
          
          return (
            <div key={banner._id}>
              <img 
                src={desktopImageUrl || fallbackImageUrl || '/Images/placeholder-banner.jpg'} 
                onClick={() => window.open(targetUrl, "_self")} 
                alt={banner.title || `Slide ${index}`}
                className="w-full h-auto cursor-pointer rounded-lg responsive-banner-img" 
                loading="lazy"
                data-mobile-src={mobileImageUrl || fallbackImageUrl || '/Images/placeholder-banner.jpg'}
                data-desktop-src={desktopImageUrl || fallbackImageUrl || '/Images/placeholder-banner.jpg'}
              />
            </div>
          );
        })}
      </Slider>
    </SmallBannerWrapper>
  );
};

export default SmallBannerSection;

const SmallBannerWrapper = styled.div`
  /* Use the same styling as the original slider */
  .slick-slide {
    outline: none;
  }
  
  .slick-slide img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  .small-banner-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 120px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    border-radius: 12px;
    margin: 1rem;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
