import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchActiveBanners,
  setCurrentBanner,
} from "../../Redux/slice/BannerSlice";
import { Link } from "react-router-dom";
import styled from "styled-components";

const DynamicHeroBanner = () => {
  const dispatch = useDispatch();
  const { activeBanners, loading, error } = useSelector(
    (state) => state.banner
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  // Helper function to filter hero banners
  const filterHeroBanners = (banners) => {
    return banners.filter((banner) => {
      const hasSmallBannerProperties =
        banner.size ||
        banner.position ||
        banner.desktopImage ||
        banner.type === "small" ||
        banner.bannerType === "small";

      const hasHeroBannerStructure =
        banner.image && (banner.image.url || banner.image.cdn_url);

      console.log('Banner check:', {
        bannerId: banner._id,
        title: banner.title,
        hasImage: !!banner.image,
        imageUrl: banner.image?.url || banner.image?.cdn_url,
        hasMobileImage: !!banner.mobileImage,
        hasSmallBannerProperties,
        hasHeroBannerStructure,
        willShow: hasHeroBannerStructure && !hasSmallBannerProperties
      });

      return hasHeroBannerStructure && !hasSmallBannerProperties;
    });
  };

  useEffect(() => {
    // Fetch active banners on component mount
    console.log("Fetching active banners...");
    dispatch(fetchActiveBanners());
  }, [dispatch]);

  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Filter to ensure only hero banners are shown (not small banners)
  const heroBanners = filterHeroBanners(activeBanners);

  useEffect(() => {
    if (activeBanners.length > 0) {
      // Set the first banner as current
      console.log("Active banners received:", activeBanners);
      dispatch(setCurrentBanner(activeBanners[0]));
    }
  }, [activeBanners, dispatch]);

  // Auto-rotate carousel
  useEffect(() => {
    if (heroBanners.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % heroBanners.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [heroBanners.length]);

  // Update current banner when index changes
  useEffect(() => {
    const heroBanners = filterHeroBanners(activeBanners);

    if (heroBanners.length > 0) {
      dispatch(setCurrentBanner(heroBanners[currentIndex]));
    }
  }, [currentIndex, activeBanners, dispatch]);

  const handleBannerClick = (banner) => {
    // Use slug to generate https://www.100acress.com/slug format
    const targetUrl = banner.slug
      ? `https://www.100acress.com/${banner.slug}`
      : banner.link;

    if (targetUrl) {
      // Open link in new tab if it's an external URL
      if (targetUrl.startsWith("http")) {
        window.open(targetUrl, "_blank");
      } else {
        // Use React Router for internal links
        // If it's a slug, prepend with / for internal routing
        const internalUrl = targetUrl.startsWith("/")
          ? targetUrl
          : `/${targetUrl}/`;
        window.location.href = internalUrl;
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
    console.log(
      "No banners found, showing fallback. Error:",
      error,
      "Banners:",
      activeBanners
    );
    console.log("API Base URL:", import.meta.env.VITE_API_BASE);
    console.log(
      "Full API URL:",
      `${import.meta.env.VITE_API_BASE}/api/banners/active`
    );
    return (
      <HeroWrapper>
        <Link
          to="/developers/signature-global/"
          className="block relative w-full group"
          target="_self"
          aria-label="Signature Global"
        >
          <div
            className="hero-strip-99-default"
            aria-hidden="true"
            style={{
              backfaceVisibility: "hidden",
              backgroundImage: windowWidth <= 768 
                ? 'url("/Images/m3m-jacob-noida-mobile.webp")' 
                : 'url("/Images/Website-Hero-Image.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "400px",
              width: "100%",
            }}
          />
        </Link>
      </HeroWrapper>
    );
  }

  // Carousel navigation functions
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % heroBanners.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + heroBanners.length) % heroBanners.length);
  };

  console.log("Rendering banners:", activeBanners);
  console.log("Filtered hero banners:", heroBanners);
  console.log("Banner count (all):", activeBanners.length);
  console.log("Hero banner count:", heroBanners.length);
  console.log("Loading state:", loading);
  console.log("Error state:", error);

  return (
    <HeroWrapper>
      {/* Banner Carousel Container */}
      <div className="relative w-full">
        {heroBanners.length > 0 ? (
          <div 
            id="carouselExampleFade" 
            className="carousel slide carousel-fade" 
            data-ride="carousel"
          >
            <div className="carousel-inner">
              {heroBanners.map((banner, index) => {
                // Resolve desktop and mobile image URLs from hero banner shape
                const desktopUrl =
                  banner.image?.cdn_url ||
                  banner.image?.url ||
                  banner.cdn_url ||
                  banner.imageUrl;
                const mobileUrl =
                  banner.mobileImage?.cdn_url ||
                  banner.mobileImage?.url ||
                  null;

                const isMobile = windowWidth <= 768;

                // Enhanced mobile image logic with fallback
                let imageUrl;
                if (isMobile) {
                  // For mobile view:
                  // 1. Use mobile image if available
                  // 2. Fall back to default mobile image if no mobile image set
                  // 3. Fall back to desktop image as last resort
                  imageUrl = mobileUrl || "/Images/m3m-jacob-noida-mobile.webp" || desktopUrl;
                } else {
                  // For desktop view: use desktop image
                  imageUrl = desktopUrl;
                }

                console.log(`Banner ${index} mobile logic:`, {
                  isMobile,
                  hasMobileUrl: !!mobileUrl,
                  desktopUrl,
                  mobileUrl,
                  finalImageUrl: imageUrl
                });
                console.log(`Banner ${index} full object:`, banner);
                console.log(`Banner ${index} image object:`, banner.image);
                console.log(`Banner ${index} mobileImage object:`, banner.mobileImage);
                console.log(`Banner ${index} resolved imageUrl:`, imageUrl);
                console.log(`Banner ${index} slug:`, banner.slug);
                console.log(`Banner ${index} link:`, banner.link);

                return (
                  <div 
                    key={banner._id} 
                    className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
                  >
                    <Link
                      to={
                        banner.slug
                          ? `https://www.100acress.com/${banner.slug}`
                          : banner.link || "/developers/signature-global/"
                      }
                      className="block relative w-full group"
                      target={
                        (banner.slug || banner.link)?.startsWith("http")
                          ? "_blank"
                          : "_self"
                      }
                      aria-label={banner.title}
                    >
                      <div
                        className="hero-strip-99-dynamic"
                        style={{
                          backfaceVisibility: "hidden",
                          backgroundImage: imageUrl
                            ? `url("${imageUrl}")`
                            : 'url("/Images/m3m-jacob-noida-mobile.webp")',
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                          height: "400px",
                          width: "100%",
                        }}
                        aria-hidden="true"
                      />
                      {/* Banner Content Overlay - Removed title and description */}
                      {/* Debug overlay to show if image is loading */}
                      {!imageUrl && (
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            color: "red",
                            background: "white",
                            padding: "10px",
                            borderRadius: "5px",
                          }}
                        >
                          No Image URL Found
                        </div>
                      )}
                    </Link>
                  </div>
                );
              })}
            </div>
            
            {/* Carousel Controls */}
            {heroBanners.length > 1 && (
              <>
                <a 
                  className="carousel-control-prev" 
                  href="#carouselExampleFade" 
                  role="button" 
                  data-slide="prev"
                  onClick={(e) => {
                    e.preventDefault();
                    prevSlide();
                  }}
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a 
                  className="carousel-control-next" 
                  href="#carouselExampleFade" 
                  role="button" 
                  data-slide="next"
                  onClick={(e) => {
                    e.preventDefault();
                    nextSlide();
                  }}
                >
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="sr-only">Next</span>
                </a>
                
                {/* Carousel Indicators */}
                <ol className="carousel-indicators">
                  {heroBanners.map((_, index) => (
                    <li
                      key={index}
                      data-target="#carouselExampleFade"
                      data-slide-to={index}
                      className={index === currentIndex ? 'active' : ''}
                      onClick={() => goToSlide(index)}
                    ></li>
                  ))}
                </ol>
              </>
            )}
          </div>
        ) : null}
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
    animation: none;
    margin-top: 64px;
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
    animation: none;
  }

  .hero-strip-99-dynamic,
  .hero-strip-99-default {
    width: 100%;
    height: 340px;
    margin-top: 64px;
    position: relative;
    overflow: hidden;
    transition: none;
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

  /* Bootstrap Carousel Styles */
  .carousel {
    position: relative;
  }

  .carousel-inner {
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  .carousel-item {
    position: relative;
    display: none;
    align-items: center;
    width: 100%;
    backface-visibility: hidden;
    perspective: 1000px;
  }

  .carousel-item.active {
    display: block;
  }

  /* Enhanced Fade Effect */
  .carousel-fade .carousel-item {
    opacity: 0;
    transition-duration: 2s;
    transition-property: opacity;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  .carousel-fade .carousel-item.active {
    opacity: 1;
    position: relative;
  }

  .carousel-fade .carousel-item-next,
  .carousel-fade .carousel-item-prev {
    opacity: 0;
  }

  .carousel-fade .carousel-item-next.active,
  .carousel-fade .carousel-item-prev.active {
    opacity: 1;
  }

  .carousel-control-prev,
  .carousel-control-next {
    position: absolute;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15%;
    color: #fff;
    text-align: center;
    opacity: 0.5;
    transition: opacity 0.15s ease;
  }

  .carousel-control-prev:hover,
  .carousel-control-next:hover {
    opacity: 0.9;
  }

  .carousel-control-prev {
    left: 0;
  }

  .carousel-control-next {
    right: 0;
  }

  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: transparent no-repeat center center;
    background-size: 100% 100%;
  }

  .carousel-control-prev-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3e%3cpath d='M5.25 0l-4 4 4 4 1.5-1.5L4.25 4l2.5-2.5L5.25 0z'/%3e%3c/svg%3e");
  }

  .carousel-control-next-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3e%3cpath d='M2.75 0l-1.5 1.5L3.75 4l-2.5 2.5L2.75 8l4-4-4-4z'/%3e%3c/svg%3e");
  }

  .carousel-indicators {
    position: absolute;
    right: 0;
    bottom: 10px;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    padding-left: 0;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
  }

  .carousel-indicators li {
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 3px;
    margin-right: 3px;
    margin-left: 3px;
    text-indent: -999px;
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.5);
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease;
  }

  .carousel-indicators li.active {
    opacity: 1;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
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
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  @media (max-width: 640px) {
    .hero-strip-99-loading,
    .hero-strip-99-dynamic {
      margin-top: 52px;
    }
    
    .carousel-control-prev,
    .carousel-control-next {
      width: 20%;
    }
    
    .carousel-indicators {
      bottom: 5px;
    }
  }
`;
