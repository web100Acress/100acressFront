import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActiveBanners, setCurrentBanner } from '../../Redux/slice/BannerSlice';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const DynamicHeroBanner = () => {
  const dispatch = useDispatch();
  const { activeBanners, loading, error } = useSelector(state => state.banner);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch active banners on component mount
    console.log('Fetching active banners...');
    dispatch(fetchActiveBanners());
  }, [dispatch]);

  useEffect(() => {
    if (activeBanners.length > 0) {
      // Set the first banner as current
      console.log('Active banners received:', activeBanners);
      dispatch(setCurrentBanner(activeBanners[0]));
    }
  }, [activeBanners, dispatch]);

  // Auto-rotate banners if multiple banners exist
  useEffect(() => {
    if (activeBanners.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === activeBanners.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // Change banner every 5 seconds

      return () => clearInterval(interval);
    }
  }, [activeBanners.length]);

  // Update current banner when index changes
  useEffect(() => {
    if (activeBanners.length > 0) {
      dispatch(setCurrentBanner(activeBanners[currentIndex]));
    }
  }, [currentIndex, activeBanners, dispatch]);

  const handleBannerClick = (banner) => {
    if (banner.link) {
      // Open link in new tab if it's an external URL
      if (banner.link.startsWith('http')) {
        window.open(banner.link, '_blank');
      } else {
        // Use React Router for internal links
        window.location.href = banner.link;
      }
    }
  };

  // Show loading state
  if (loading) {
    return (
      <HeroWrapper>
        <div className="hero-strip-99-loading">
          <div className="loading-spinner"></div>
        </div>
      </HeroWrapper>
    );
  }

  // Show error state with fallback
  if (error || activeBanners.length === 0) {
    console.log('No banners found, showing fallback. Error:', error, 'Banners:', activeBanners);
    return (
      <HeroWrapper>
        <Link to="/developers/signature-global/" className="block relative w-full group" target="_self" aria-label="Signature Global">
          <div className="hero-strip-99-default transform-gpu transform transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02] will-change-transform cursor-pointer" aria-hidden="true" style={{ backfaceVisibility: 'hidden' }} />
        </Link>
      </HeroWrapper>
    );
  }

  console.log('Rendering banners:', activeBanners);
  
  return (
    <HeroWrapper>
      {/* Banner Container */}
      <div className="relative w-full">
        {activeBanners.map((banner, index) => {
          // Try multiple ways to get the image URL
          const imageUrl = banner.image?.cdn_url || banner.image?.url || banner.cdn_url || banner.imageUrl;
          console.log(`Banner ${index} full object:`, banner);
          console.log(`Banner ${index} image object:`, banner.image);
          console.log(`Banner ${index} resolved imageUrl:`, imageUrl);
          
          return (
            <Link
              key={banner._id}
              to={banner.link || "/developers/signature-global/"}
              className={`block relative w-full group ${index === currentIndex ? 'active' : 'hidden'}`}
              target={banner.link?.startsWith('http') ? '_blank' : '_self'}
              aria-label={banner.title}
            >
              <div 
                className="hero-strip-99-dynamic transform-gpu transform transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02] will-change-transform cursor-pointer"
                style={{ 
                  backfaceVisibility: 'hidden',
                  backgroundImage: imageUrl ? `url("${imageUrl}")` : 'url("/Images/Website-Hero-Image.jpg")',
                  backgroundSize: 'auto 100%',
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat'
                }}
                aria-hidden="true"
              />
              {/* Debug overlay to show if image is loading */}
              {!imageUrl && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'red',
                  background: 'white',
                  padding: '10px',
                  borderRadius: '5px'
                }}>
                  No Image URL Found
                </div>
              )}
            </Link>
          );
        })}

        {/* Banner Navigation Dots (if multiple banners) */}
        {activeBanners.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {activeBanners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-white shadow-lg' 
                    : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                }`}
                aria-label={`Go to banner ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </HeroWrapper>
  );
};

export default DynamicHeroBanner;

const HeroWrapper = styled.div`
  .hero-strip-99-loading {
    width: 100%;
    height: 340px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    margin-top: 76px;
    position: relative;
    overflow: hidden;
  }

  .loading-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .hero-strip-99-default {
    width: 100%;
    height: 340px;
    background-image: url("/Images/Website-Hero-Image.jpg");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: auto 100%;
    margin-top: 76px;
    position: relative;
    overflow: hidden;
  }

  .hero-strip-99-dynamic {
    width: 100%;
    height: 340px;
    margin-top: 76px;
    position: relative;
    overflow: hidden;
    transition: opacity 0.5s ease-in-out;
  }

  .hero-strip-99-dynamic.active {
    opacity: 1;
  }

  .hero-strip-99-dynamic.hidden {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
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
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }

  @media (max-width: 640px) {
    .hero-strip-99-loading,
    .hero-strip-99-default,
    .hero-strip-99-dynamic {
      margin-top: 72px;
    }
  }
`;
