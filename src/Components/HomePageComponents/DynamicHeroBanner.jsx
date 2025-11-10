import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchActiveBanners,
  setCurrentBanner,
} from "../../Redux/slice/BannerSlice";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

  useEffect(() => {
    if (activeBanners.length > 0) {
      // Set the first banner as current
      console.log("Active banners received:", activeBanners);
      dispatch(setCurrentBanner(activeBanners[0]));
    }
  }, [activeBanners, dispatch]);

  // Auto-rotate disabled to remove animations
  useEffect(() => {
    // no-op: keep first banner static
  }, [activeBanners]);

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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 0,
    fade: false,
    cssEase: "linear",
    arrows: true,
    pauseOnHover: false,
    beforeChange: (oldIndex, newIndex) => {
      setCurrentIndex(newIndex);
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true,
          autoplay: false,
          autoplaySpeed: 0,
          fade: false,
          cssEase: "linear",
        },
      },
    ],
  };

  // Filter to ensure only hero banners are shown (not small banners)
  const heroBanners = filterHeroBanners(activeBanners);

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
          <Slider {...sliderSettings}>
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
                <div key={banner._id}>
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
          </Slider>
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
  }
`;
