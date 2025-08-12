import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { 
  MdLocationPin, 
  MdSearch, 
  MdTrendingUp, 
  MdStar,
  MdVerified,
  MdArrowForward,
  MdHome,
  MdBusiness,
  MdApartment,
  MdVilla,
  MdLandscape
} from 'react-icons/md';
import { FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';
import Typewriter from "typewriter-effect";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Use video from public folder to avoid bundling issues with large media
const videoBg = "/videos/shot_3.mp4";

// Banner image arrays
const imageSrc = [
  { image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/banner/m3mfreedomsellmobile.jpg", link: "/developers/m3m-india/" },
  { image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/banner/gaia-desktop.webp", link: "/bptp-gaia-residences/" },
  { image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/banner/spr-web.jpg", link: "/signature-global-cloverdale-spr/" },
  { image: "https://d16gdc5rm7f21b.cloudfront.net/100acre/banner/experionlaptop.jpeg", link: "/experion-the-trillion/" },
  { image: "https://d16gdc5rm7f21b.cloudfront.net/100acre/banner/windchant-laptop.jpeg", link: "/experion-nova-at-windchants/" },
  { image: "https://d16gdc5rm7f21b.cloudfront.net/100acre/banner/bazaria-laptop.jpeg", link: "/reach-the-bazaria/" },
  { image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/banner/turban-desktop.webp", link: "/the-turban-resort/" },
];
const phoneSrc = [
  { image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/banner/m3mfreedomsellweb.jpg", link: "/developers/m3m-india/" },
  { image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/banner/gaia-mobile.webp", link: "/bptp-gaia-residences/" },
  { image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/banner/spr-mob.jpg", link: "/signature-global-cloverdale-spr/" },
  { image: "https://d16gdc5rm7f21b.cloudfront.net/100acre/banner/experionphone.jpeg", link: "/experion-the-trillion/" },
  { image: "https://d16gdc5rm7f21b.cloudfront.net/100acre/banner/windchant-phone.jpeg", link: "/experion-nova-at-windchants/" },
  { image: "https://d16gdc5rm7f21b.cloudfront.net/100acre/banner/bazaria-phone.jpeg", link: "/reach-the-bazaria/" },
  { image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/banner/turban-mobile.webp", link: "/the-turban-resort/" },
];

const ModernHeroSection = () => {
  const [activeTab, setActiveTab] = useState("Buy");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [budgetRange, setBudgetRange] = useState([1, 10]);
  const [propertyType, setPropertyType] = useState("All");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);

  // Trending locations data
  const trendingLocations = [
    { name: "Dwarka Expressway", count: "2,847", trend: "+12%" },
    { name: "Golf Course Road", count: "1,923", trend: "+8%" },
    { name: "Sohna Road", count: "1,456", trend: "+15%" },
    { name: "MG Road", count: "1,234", trend: "+6%" },
    { name: "NH-48", count: "987", trend: "+18%" },
    { name: "Golf Course Extn", count: "756", trend: "+22%" }
  ];

  // Hero search categories with icons
  const categories = [
    { id: "Buy", label: "Buy", icon: MdHome },
    { id: "Rent", label: "Rent", icon: MdApartment },
    { id: "New Launch", label: "New Launch", icon: MdStar },
    { id: "Commercial", label: "Commercial", icon: MdBusiness },
    { id: "Plots", label: "Plots", icon: MdLandscape },
    { id: "SCO", label: "SCO", icon: MdBusiness },
  ];

  // Property types
  const propertyTypes = [
    { id: "All", label: "All Types", icon: MdHome },
    { id: "Apartment", label: "Apartments", icon: MdApartment },
    { id: "Villa", label: "Villas", icon: MdVilla },
    { id: "Commercial", label: "Commercial", icon: MdBusiness },
    { id: "Plot", label: "Plots", icon: MdLandscape }
  ];

  // Trust metrics
  const trustMetrics = [
    { label: "Properties", value: "50,000+", icon: MdHome },
    { label: "Happy Clients", value: "25,000+", icon: MdStar },
    { label: "Cities", value: "15+", icon: MdLocationPin },
    { label: "Years", value: "8+", icon: MdVerified }
  ];

  // Market insights
  const marketInsights = [
    { metric: "Avg. Price", value: "₹1.2 Cr", change: "+5.2%", trend: "up" },
    { metric: "Properties", value: "2,847", change: "+12%", trend: "up" },
    { metric: "ROI", value: "8.5%", change: "+2.1%", trend: "up" }
  ];

  const handleSearch = () => {
    const searchData = {
      location: selectedLocation,
      query: searchQuery,
      budget: budgetRange,
      propertyType: propertyType,
      collectionName: activeTab
    };
    
    // Navigate to search results
    window.location.href = `/searchdata/${encodeURIComponent(JSON.stringify(searchData))}`;
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const formatPrice = (price) => {
    if (price >= 100) {
      return `₹${price/100} Cr`;
    }
    return `₹${price} L`;
  };

  return (
    <HeroWrapper>
      {/* Background simplified to white (video removed) */}
      <div className="hero-background" />

      <div className="hero-content">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="hero-header fade-up-enter">
            <div className="brand-text">
              <h1 className="main-headline">
                <Typewriter
                  options={{
                    strings: [
                      'Welcome to Your Perfect Home',
                      'Welcome to Your Perfect Haven',
                      'Welcome to Your Perfect Sanctuary',      
                    ],
                    autoStart: true,
                    loop: true,
                    deleteSpeed: 50,
                    pauseFor: 3000,
                    cursor: "|",
                  }}
                />
              </h1>
              <p className="sub-headline">
                India's fastest-growing property platform with 50,000+ verified properties
              </p>
            </div>
            {/* Trust Metrics */}
            {/* Removed trust-metrics section as per user request */}
          </div>

          {/* Main Search Section */}
          <div className="search-section modern-search-section">
            <div className="modern-search-tabs">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    className={`modern-tab-button ${activeTab === cat.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(cat.id)}
                    type="button"
                  >
                    <span className="pill-inner">
                      <Icon className="pill-icon" />
                      <span className="pill-label">{cat.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            <form className="modern-search-bar floating-pill" onSubmit={e => { e.preventDefault(); handleSearch(); }}>
              <input
                type="text"
                className="modern-search-input"
                placeholder='Search "3 BHK Ready To Move Flat For Sale In Gurgaon"'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button type="submit" className="modern-search-btn gradient-anim">
                <MdSearch />
                <span>Search</span>
              </button>
            </form>
            {/* Removed modern-search-stats section as per user request */}
          </div>

          {/* Trending Locations */}
          <div className="trending-section">
            <div className="trending-header">
              <MdTrendingUp className="trending-icon" />
              <h3>Trending Locations</h3>
            </div>
            <div className="trending-locations">
              {trendingLocations.map((location, index) => (
                <div key={index} className="location-chip">
                  {location.name}
                </div>
              ))}
            </div>
          </div>

          {/* Banner Slider Section */}
          <div className="banner-slider-section" style={{ margin: '2rem 0' }}>
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              loop={true}
              slidesPerView={1}
              className="banner-swiper"
            >
              {(window.innerWidth < 768 ? phoneSrc : imageSrc).map((item, idx) => (
                <SwiperSlide key={idx}>
                  <a href={item.link} style={{ display: 'block', width: '100%' }}>
                    <img
                      src={item.image}
                      alt={`Banner ${idx + 1}`}
                      style={{ width: '100%', height: 'auto', borderRadius: '16px', objectFit: 'cover', maxHeight: '340px', margin: '0 auto' }}
                    />
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </HeroWrapper>
  );
};

// Styled Components
const HeroWrapper = styled.section`
  position: relative;
  min-height: 100vh;
  background: #ffffff;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  .hero-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background:
      linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 35%, rgba(0,0,0,0.2) 65%, rgba(0,0,0,0) 100%),
      url('/Images/Gemini_Generated_Image_l0bbg6l0bbg6l0bb.png') center/cover no-repeat;
  }

  .hero-content {
    position: relative;
    z-index: 10;
    width: 100%;
    padding: 2rem 0;
  }

  .hero-header {
    text-align: center;
    margin-bottom: 3rem;

    .brand-text {
      position: relative;
      z-index: 25; /* ensure above overlays/video */
      .main-headline {
        font-size: 3.5rem;
        font-weight: 800;
        color: #111111;
        margin-bottom: 1rem;
        line-height: 1.2;
        text-shadow: none;
        position: relative;

        /* Ensure Typewriter text is visible */
        .Typewriter__wrapper {
          color: #111111 !important;
          font-weight: 800;
          text-shadow: none;
          display: inline-block;
          position: relative;
          z-index: 1;
        }
        .Typewriter__cursor {
          color: #111111 !important;
          text-shadow: none;
          font-weight: 800;
          opacity: 1 !important;
          position: relative;
          z-index: 1;
        }

        @media (max-width: 768px) {
          font-size: 2.5rem;
        }

        @media (max-width: 480px) {
          font-size: 2rem;
        }
      }

      .sub-headline {
        font-size: 1.125rem;
        color: #555;
        max-width: 700px;
        margin: 0 auto;
        line-height: 1.6;
      }
    }

    .trust-metrics {
      display: flex;
      justify-content: center;
      gap: 3rem;
      flex-wrap: wrap;

      .metric-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        background: rgba(255, 255, 255, 0.13);
        padding: 1rem 1.5rem;
        border-radius: 12px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);

        .metric-icon {
          font-size: 1.5rem;
          color: #ff512f;
        }

        .metric-content {
          display: flex;
          flex-direction: column;

          .metric-value {
            font-size: 1.25rem;
            font-weight: 700;
            color: white;
          }

          .metric-label {
            font-size: 0.875rem;
            color: rgba(255, 255, 255, 0.8);
          }
        }
      }
    }
  }

  .search-section {
    margin-bottom: 0;

    .search-container {
      max-width: 900px;
      margin: 0 auto;
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(255, 81, 47, 0.10);
      overflow: hidden;
    }

    .search-tabs {
      display: flex;
      background: #fff5f5;
      border-bottom: 1px solid #ffe0e0;

      .tab-button {
        flex: 1;
        padding: 1rem;
        border: none;
        background: none;
        font-size: 0.875rem;
        font-weight: 600;
        color: #ff512f;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          background: #fff0e0;
          color: #dd2476;
        }

        &.active {
          background: white;
          color: #ff512f;
          border-bottom: 3px solid #ff512f;
        }
      }
    }

    .search-form {
      padding: 2rem;

      .search-inputs {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr auto;
        gap: 1rem;
        align-items: end;

        @media (max-width: 768px) {
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        .input-group {
          position: relative;

          &.location-input {
            .input-icon {
              position: absolute;
              left: 1rem;
              top: 50%;
              transform: translateY(-50%);
              color: #ff512f;
              font-size: 1.25rem;
            }

            input {
              width: 100%;
              padding: 1rem 1rem 1rem 3rem;
              border: 2px solid #ffe0e0;
              border-radius: 12px;
              font-size: 1rem;
              transition: all 0.3s ease;

              &:focus {
                outline: none;
                border-color: #ff512f;
                box-shadow: 0 0 0 3px rgba(255, 81, 47, 0.1);
              }
            }

            .location-suggestions {
              position: absolute;
              top: 100%;
              left: 0;
              right: 0;
              background: white;
              border: 1px solid #ffe0e0;
              border-radius: 12px;
              box-shadow: 0 10px 30px rgba(255, 81, 47, 0.08);
              z-index: 1000;
              margin-top: 0.5rem;

              .suggestion-header {
                padding: 1rem;
                background: #fff5f5;
                border-bottom: 1px solid #ffe0e0;
                font-weight: 600;
                color: #ff512f;
              }

              .suggestion-item {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                padding: 1rem;
                cursor: pointer;
                transition: background 0.2s ease;

                &:hover {
                  background: #fff0e0;
                }

                .property-count {
                  margin-left: auto;
                  font-size: 0.875rem;
                  color: #ff512f;
                }
              }
            }
          }

          &.property-type {
            select {
              width: 100%;
              padding: 1rem;
              border: 2px solid #ffe0e0;
              border-radius: 12px;
              font-size: 1rem;
              background: white;
              cursor: pointer;

              &:focus {
                outline: none;
                border-color: #ff512f;
              }
            }
          }

          &.budget-range {
            .budget-label {
              display: block;
              font-size: 0.875rem;
              font-weight: 600;
              color: #ff512f;
              margin-bottom: 0.5rem;
            }

            .range-container {
              position: relative;
              height: 40px;
              margin-bottom: 0.5rem;

              .range-slider {
                position: absolute;
                width: 100%;
                height: 6px;
                background: #ffe0e0;
                border-radius: 3px;
                outline: none;
                pointer-events: none;
                appearance: none;

                &::-webkit-slider-thumb {
                  appearance: none;
                  width: 20px;
                  height: 20px;
                  background: #ff512f;
                  border-radius: 50%;
                  cursor: pointer;
                  pointer-events: auto;
                }

                &::-moz-range-thumb {
                  width: 20px;
                  height: 20px;
                  background: #ff512f;
                  border-radius: 50%;
                  cursor: pointer;
                  border: none;
                }
              }
            }

            .budget-display {
              font-size: 0.875rem;
              color: #ff512f;
              font-weight: 500;
            }
          }
        }

        .search-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #ff512f 0%, #dd2476 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(255, 81, 47, 0.18);
          }

          @media (max-width: 768px) {
            width: 100%;
            justify-content: center;
          }
        }
      }
    }
  }

  .trending-section {
    margin-top: 0.5rem;
    margin-bottom: 0.75rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 0.5rem;
    .trending-header {
      display: flex;
      align-items: center;
      gap: 0.3rem;
      margin-bottom: 0;
      .trending-icon {
        color: #FF9933;
        font-size: 0.95rem;
      }
      h3 {
        color: white;
        font-size: 0.92rem;
        font-weight: 600;
      }
    }
    .trending-locations {
      display: flex;
      flex-direction: row;
      overflow-x: auto;
      overflow-y: hidden;
      white-space: nowrap;
      gap: 0.25rem;
      padding-bottom: 0.1rem;
      scrollbar-width: none;
      -ms-overflow-style: none;
      max-width: 900px;
      margin: 0;
      &::-webkit-scrollbar {
        display: none;
      }
      .location-chip {
        display: inline-flex;
        align-items: center;
        background: rgba(255,255,255,0.16);
        border: 1px solid #bfc9d1;
        color: #fff;
        font-size: 0.82em;
        font-weight: 500;
        border-radius: 999px;
        padding: 0.18rem 0.7rem;
        margin: 0;
        cursor: pointer;
        transition: background 0.2s, color 0.2s;
        white-space: nowrap;
        min-width: 80px;
        max-width: 150px;
        &:hover {
          background: #fff;
          color: #222;
        }
      }
    }
    .trending-scroll-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: rgba(255,255,255,0.7);
      color: #333;
      border: 1px solid #bfc9d1;
      margin: 0 0.2rem;
      cursor: pointer;
      font-size: 1.1rem;
      transition: background 0.2s;
      &:hover {
        background: #eee;
      }
    }
  }

  .market-intelligence {
    background: rgba(255, 255, 255, 0.13);
    border-radius: 16px;
    padding: 1.5rem;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);

    .market-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;

      h3 {
        color: white;
        font-size: 1.125rem;
        font-weight: 600;
      }

      .update-time {
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.875rem;
      }
    }

    .market-metrics {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;

      .market-metric {
        text-align: center;
        padding: 1rem;
        background: rgba(255, 255, 255, 0.08);
        border-radius: 12px;

        .metric-name {
          display: block;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }

        .metric-value {
          display: block;
          color: #ff512f;
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .metric-change {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.5rem;
          border-radius: 8px;

          &.up {
            background: rgba(255, 153, 51, 0.18);
            color: #FF9933;
          }

          &.down {
            background: rgba(221, 36, 118, 0.18);
            color: #dd2476;
          }
        }
      }
    }
  }

  .modern-search-section {
    background: rgba(255, 255, 255, 0.30);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.45);
    border-radius: 20px;
    padding: 2rem 2rem 1.5rem 2rem;
    margin: 2rem auto 0 auto;
    max-width: 900px;
    box-shadow: 0 10px 35px rgba(0, 0, 0, 0.18), inset 0 1px 14px rgba(255,255,255,0.25);
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 20;
  }
  .modern-search-tabs {
    display: flex;
    gap: 0.6rem;
    margin-bottom: 1.2rem;
  }
  .modern-tab-button {
    border: 1px solid rgba(255,255,255,0.6);
    background: rgba(255,255,255,0.12);
    color: #fff;
    border-radius: 999px;
    padding: 0.45rem 1.1rem;
    font-size: 0.95rem;
    font-weight: 600;
    transition: all 0.25s ease;
    cursor: pointer;
    min-width: 96px;
    min-height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-shadow: 0 2px 8px rgba(0,0,0,0.25), 0 1px 2px rgba(0,0,0,0.15);
    position: relative;
    overflow: hidden;
  }
  .modern-tab-button.active {
    background: rgba(255,255,255,0.2);
    color: #fff;
    border-color: rgba(255,255,255,0.9);
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.35), 0 6px 16px rgba(0,0,0,0.18);
  }
  .modern-tab-button:hover {
    transform: translateY(-1px);
    background: rgba(255,255,255,0.18);
  }
  .modern-tab-button .pill-inner {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
  }
  .modern-tab-button .pill-icon {
    font-size: 1.05rem;
    filter: drop-shadow(0 2px 6px rgba(0,0,0,0.25));
  }
  .modern-search-bar {
    display: flex;
    align-items: center;
    width: 100%;
    background: rgba(255, 255, 255, 0.30);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.45);
    border-radius: 999px;
    box-shadow: 0 14px 38px rgba(0,0,0,0.18), inset 0 1px 10px rgba(255,255,255,0.22);
    padding: 0.5rem;
    gap: 0.5rem;
    margin-bottom: 1.2rem;
    overflow: hidden;
  }
  .floating-pill { position: relative; }
  .floating-pill::after {
    content: "";
    position: absolute;
    inset: -2px;
    border-radius: 999px;
    pointer-events: none;
    background: radial-gradient(70% 100% at 50% 0%, rgba(255,255,255,0.35), rgba(255,255,255,0) 60%);
    opacity: 0.6;
  }
  .modern-search-icon {
    color: #ff512f;
    font-size: 1.5rem;
    margin-right: 0.5rem;
  }
  .modern-search-input {
    border: none;
    outline: none;
    font-size: 1.1rem;
    flex: 1;
    padding: 0.8rem 1.5rem;
    background: transparent;
    color: #222;
  }
  .modern-search-input::placeholder {
    color: #666;
    font-style: normal;
  }
  .modern-search-dropdown {
    border: none;
    outline: none;
    background: #f5f5f5;
    border-radius: 8px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    margin-left: 0.5rem;
  }
  .modern-search-btn {
    background: linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%);
    color: #fff;
    border: none;
    border-radius: 999px;
    padding: 0.8rem 2rem;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    white-space: nowrap;
    box-shadow: 0 8px 22px rgba(255, 65, 108, 0.35);
  }
  .modern-search-btn:hover {
    transform: translateY(-2px);
    filter: brightness(1.04);
    box-shadow: 0 14px 30px rgba(255, 65, 108, 0.5), 0 0 18px rgba(255, 65, 108, 0.45);
  }
  .gradient-anim {
    background-size: 200% 200%;
    animation: gradientShift 6s ease infinite;
  }
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  /* Fade-in + slide-up animation */
  .fade-up-enter {
    opacity: 0;
    transform: translateY(14px);
    animation: fadeUp 700ms ease forwards;
  }
  .fade-up-enter.delay-1 { animation-delay: 120ms; }
  .fade-up-enter.delay-2 { animation-delay: 240ms; }
  @keyframes fadeUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  }
  .modern-search-stats {
    color: #fff;
    font-size: 1rem;
    margin-top: 0.5rem;
    opacity: 0.85;
    letter-spacing: 0.01em;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  @media (max-width: 768px) {
    min-height: auto;
    padding: 2rem 0;

    .hero-header {
      .trust-metrics {
        gap: 1rem;

        .metric-item {
          padding: 0.75rem 1rem;

          .metric-content {
            .metric-value {
              font-size: 1rem;
            }

            .metric-label {
              font-size: 0.75rem;
            }
          }
        }
      }
    }

    .trending-locations {
      .location-chip {
        padding: 0.5rem 0.75rem;
        font-size: 0.875rem;
      }
    }

    .market-intelligence {
      .market-metrics {
        grid-template-columns: 1fr;
      }
    }
  }
`;

export default ModernHeroSection;