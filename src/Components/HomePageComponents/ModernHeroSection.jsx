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
  MdLandscape,
  MdArrowDropDown
} from 'react-icons/md';
import { FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';
import Typewriter from "typewriter-effect";
import { imageSrc as bannerDesktop, phoneSrc as bannerPhone } from "../../Pages/datafeed/Desiredorder";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import api from "../../config/apiClient";

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
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const searchRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [swiperReady, setSwiperReady] = useState(false);
  const [bannerLoaded, setBannerLoaded] = useState(false);
  
  // Search suggestions states
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const debounceTimer = useRef(null);

  // Animated placeholder texts
  const placeholderTexts = [
    "Search luxury apartments in Gurgaon...",
    "Find your dream villa in Delhi NCR...",
    "Discover premium plots in Noida...",
    "Explore commercial spaces in Mumbai...",
    "Browse ready-to-move flats in Bangalore..."
  ];

  // Cycle through placeholder texts
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholderTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Detect mobile width for selecting phone vs desktop banners
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Debug: log banner availability
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('ModernHeroSection banners', {
      isMobile,
      desktopLen: (bannerDesktop || []).length,
      phoneLen: (bannerPhone || []).length,
      firstDesktop: (bannerDesktop || [])[0]?.image,
      firstPhone: (bannerPhone || [])[0]?.image,
    });
  }, [isMobile]);

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

  // Fetch search suggestions
  const fetchSuggestions = async (query) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoadingSuggestions(true);
    try {
      const response = await api.get(`/search/suggestions/${encodeURIComponent(query)}`);
      console.log('🔍 Hero Search Debug - Response:', response.data);
      
      if (response.data && response.data.suggestions) {
        setSuggestions(response.data.suggestions);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error('🔍 Hero Search Debug - Error:', error);
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  // Debounced search suggestions
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      if (searchQuery.trim()) {
        fetchSuggestions(searchQuery.trim());
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [searchQuery]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
      {/* Fixed-height top hero background like 99acres */}
      <div className="top-hero-bg" aria-hidden="true" />
      <div className="hero-content">
        <div className="skyline-overlay" />
        <div className="clouds">
          <span className="cloud c1" />
          <span className="cloud c2" />
          <span className="cloud c3" />
        </div>
        <div className="raindrops" />

        <div className="hero-inner container">
          {/* Left: Headline, tabs, search, localities, featured banners */}
          <div className="left">
            <h1 className="headline">Discover Your Ideal Property in Gurugram</h1>
            <p className="subtitle">Explore curated homes, commercial spaces, and plots across premium localities.</p>

            <div className="tabs" role="tablist">
              {[
                { id: "Buy", label: "Buy" },
                { id: "Rent", label: "Rent" },
                { id: "New Launch", label: "New Launch" },
                { id: "Commercial", label: "Commercial" },
                { id: "Plots", label: "Plots" },
                { id: "SCO", label: "SCO" },
              ].map(tab => (
                <button
                  key={tab.id}
                  className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                  type="button"
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="searchbar" ref={searchRef}>
              <MdLocationPin className="s-icon" />
              <input
                type="text"
                placeholder={`Search \"3 BHK Flats in Gurugram\"`}
                value={searchQuery}
                onChange={(e)=>setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onKeyPress={handleKeyPress}
              />
              <button className="search-btn" onClick={handleSearch} type="button">
                <MdSearch />
                <span>Search</span>
              </button>
              
              {/* Search Suggestions Dropdown */}
              {showSuggestions && (
                <div className="location-suggestions">
                  {isLoadingSuggestions ? (
                    <div className="suggestion-item loading">
                      <span>Loading...</span>
                    </div>
                  ) : suggestions.length > 0 ? (
                    suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="suggestion-item"
                        onClick={() => {
                          setSearchQuery(suggestion.text);
                          setShowSuggestions(false);
                          handleSearch();
                        }}
                      >
                        <MdLocationPin className="suggestion-icon" />
                        <div className="suggestion-content">
                          <div className="suggestion-text">{suggestion.text}</div>
                          {suggestion.type && (
                            <div className="suggestion-type">{suggestion.type}</div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="suggestion-item no-results">
                      <span>No suggestions found</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="localities">
              <span className="loc-title">Top Localities:</span>
              <div className="loc-scroll">
                {trendingLocations.map((l, i)=> (
                  <Link key={i} to={`/projects-in-${l.name.toLowerCase().replace(/\s+/g,'-')}/`} className="pill">
                    {l.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Featured banners below search */}
            <div
              className="featured-wide-card"
              style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="banner-debug-badge">
                {(isMobile ? bannerPhone : bannerDesktop)?.length ? `Banners: ${(isMobile ? bannerPhone : bannerDesktop).length}` : 'No banners'}
              </div>
              {(isMobile ? bannerPhone : bannerDesktop) && (isMobile ? bannerPhone : bannerDesktop)[0] && (
                <a
                  href={(isMobile ? bannerPhone : bannerDesktop)[0].image}
                  target="_blank"
                  rel="noreferrer"
                  style={{ position:'absolute', right:6, top:6, fontSize:10, background:'rgba(34,197,94,0.85)', color:'#fff', padding:'2px 6px', borderRadius:8, zIndex:3, textDecoration:'none' }}
                >open 1st</a>
              )}
              {/* TEMP: static test image to verify visibility */}
              {(isMobile ? bannerPhone : bannerDesktop) && (isMobile ? bannerPhone : bannerDesktop)[0] && (
                <img
                  src={(isMobile ? bannerPhone : bannerDesktop)[0].image}
                  alt="Banner test"
                  loading="eager"
                  decoding="async"
                  style={{ display:'block', width:'100%', height:'170px', objectFit:'cover', border:'2px solid #22c55e', marginBottom: 8 }}
                />
              )}
              <Swiper
                className="featured-swiper"
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop
                onSwiper={() => setSwiperReady(true)}
              >
                {((isMobile ? bannerPhone : bannerDesktop) || []).map((b, idx) => (
                  <SwiperSlide key={idx}>
                    <Link to={b.link} aria-label={`Banner ${idx + 1}`}>
                      <img
                        src={b.image}
                        alt={`Banner ${idx + 1}`}
                        onLoad={() => idx === 0 && setBannerLoaded(true)}
                        onError={(e)=>{ try{console.error('Hero banner img failed', { idx, url:b.image });}catch(_){} }}
                      />
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
              {(isMobile ? bannerPhone : bannerDesktop) && (isMobile ? bannerPhone : bannerDesktop)[0] && (
                <img
                  className="fallback-img"
                  src={(isMobile ? bannerPhone : bannerDesktop)[0].image}
                  alt="Featured banner"
                  style={{ opacity: swiperReady && bannerLoaded ? 0 : 1, transition: 'opacity 300ms ease' }}
                />
              )}
              {(!isMobile && (!bannerDesktop || bannerDesktop.length === 0)) && (
                <img className="fallback-img" src="https://via.placeholder.com/1200x400?text=No+desktop+banners" alt="No banners" />
              )}
              {(isMobile && (!bannerPhone || bannerPhone.length === 0)) && (
                <img className="fallback-img" src="https://via.placeholder.com/800x300?text=No+mobile+banners" alt="No banners" />
              )}
            </div>
          </div>
        </div>
      </div>
    </HeroWrapper>
  );
};

// Styled Components
const HeroWrapper = styled.section`
  position: relative;
  background: linear-gradient(180deg, #e9f1ff 0%, #f5f7ff 60%, #ffffff 100%);
  min-height: 56vh; /* half-ish page */
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;
  padding-top: 0; /* Remove padding to eliminate gap */
  margin-top: 64px; /* Space for the fixed navbar */

  /* New: top hero background image strip (340px tall) */
  .top-hero-bg {
    width: 100%;
    height: 340px;
{{ ... }}
    background-image: url("/Images/experion-the-trillion-banner.png");
    background-repeat: no-repeat;
    background-position: center center; /* keep image centered */
    background-size: auto 100%; /* fit height exactly; crop left/right on small screens */
  }

  .hero-content { width: 100%; position: relative; }

  /* Subtle skyline abstract overlay (soft shapes) */
  .skyline-overlay {
    position: absolute; inset: 0; pointer-events: none; opacity: 0.28;
    background: linear-gradient( to top, rgba(120,150,200,0.20), rgba(120,150,200,0) 60% ),
      repeating-linear-gradient(
        to right,
        rgba(100,130,180,0.18) 0 2px,
        transparent 2px 80px
      );
    mix-blend-mode: multiply;
    z-index: 0;
  }

  /* Floating clouds */
  .clouds { position:absolute; inset:0; pointer-events:none; z-index:0; }
  .cloud {
    position:absolute; width:220px; height:68px; border-radius:999px; filter: blur(6px);
    background: radial-gradient(circle at 30% 40%, rgba(255,255,255,0.95), rgba(255,255,255,0.6) 60%, transparent 61%),
                radial-gradient(circle at 60% 50%, rgba(255,255,255,0.95), rgba(255,255,255,0.6) 60%, transparent 61%),
                radial-gradient(circle at 45% 60%, rgba(255,255,255,0.95), rgba(255,255,255,0.6) 60%, transparent 61%);
    animation: float 28s linear infinite;
  }
  .c1 { top: 10%; left: -10%; animation-delay: 0s; }
  .c2 { top: 18%; left: 20%; animation-delay: 6s; transform: scale(1.1); }
  .c3 { top: 8%; left: 60%; animation-delay: 12s; transform: scale(0.9); }

  @keyframes float { 0% { transform: translateX(0); } 100% { transform: translateX(40vw); } }

  /* Light raindrop effect */
  .raindrops { position:absolute; inset:0; pointer-events:none; opacity:0.18; z-index:0; }
  .raindrops::before {
    content:""; position:absolute; inset: -20% 0 0 0;
    background-image: linear-gradient(180deg, rgba(130,150,180,0.35) 20%, rgba(130,150,180,0) 70%);
    -webkit-mask-image: radial-gradient(2px 16px at 50% 0, #000 49%, transparent 50%);
    mask-image: radial-gradient(2px 16px at 50% 0, #000 49%, transparent 50%);
    background-size: 2px 40px; /* streak */
    animation: rain 7s linear infinite;
  }
  @keyframes rain { 0% { transform: translateY(-10%); } 100% { transform: translateY(28%); } }

  /* Layout */
  .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
  .hero-inner { position: relative; z-index: 2; display: grid; grid-template-columns: 1fr; gap: 16px; align-items: start; }
  @media (max-width: 992px) { .hero-inner { grid-template-columns: 1fr; gap: 16px; padding: 24px 0; } }

  /* Left side */
  .left { position: relative; z-index: 20; }
  .headline { font-size: 42px; line-height: 1.15; font-weight: 800; color: #0f172a; margin: 0 0 8px; }
  .subtitle { font-size: 16px; color: #475569; margin: 0 0 18px; }

  .tabs { display:flex; gap: 8px; flex-wrap: wrap; margin: 10px 0 16px; }
  .tab { 
    border: 1px solid rgba(15,23,42,0.08);
    background: rgba(255,255,255,0.8);
    backdrop-filter: blur(8px);
    color: #0f172a; font-weight: 600; font-size: 14px;
    border-radius: 999px; padding: 9px 14px; cursor: pointer;
    transition: all .25s ease; box-shadow: 0 6px 20px rgba(2,6,23,0.06);
  }
  .tab:hover { background:#ffffff; transform: translateY(-1px); box-shadow: 0 10px 24px rgba(2,6,23,0.10); }
  .tab.active { border-color: rgba(239,68,68,0.45); background: rgba(239,68,68,0.08); color: #b91c1c; }

  .searchbar { display:flex; align-items:center; gap: 10px; background:#fff; border:1px solid #e2e8f0; border-radius: 999px; padding: 10px 12px; box-shadow: 0 10px 28px rgba(15,23,42,0.08); position: relative; }
  .s-icon { color:#e53e3e; font-size: 20px; }
  .searchbar input { border:none; outline:none; flex:1; font-size:16px; padding: 6px 6px; background: transparent; color:#0f172a; }
  .search-btn { display:inline-flex; align-items:center; gap:8px; background:#e53e3e; color:#fff; border:none; border-radius:999px; padding:10px 16px; font-weight:700; cursor:pointer; box-shadow: 0 12px 30px rgba(229,62,62,0.35); transition: transform .15s ease, box-shadow .2s ease, background-color .15s ease; }
  .search-btn:hover { transform: translateY(-1px); background:#cc2f3b; box-shadow: 0 16px 34px rgba(229,62,62,0.45); }

  .localities { margin-top: 14px; }
  .loc-title { display:block; font-size:12px; color:#64748b; margin-bottom:6px; font-weight:700; letter-spacing: .04em; text-transform: uppercase; }
  .loc-scroll { display:flex; gap:8px; overflow-x:auto; padding-bottom:4px; }
  .loc-scroll::-webkit-scrollbar { height:6px; }
  .loc-scroll::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 999px; }
  .pill { background:#fff; border:1px solid #e2e8f0; color:#0f172a; padding:8px 12px; border-radius:999px; text-decoration:none; font-size:13px; box-shadow: 0 6px 16px rgba(2,6,23,0.06); white-space: nowrap; }
  .pill:hover { background:#f8fafc; }

  /* Featured wide banner below search */
  .featured-wide-card {
    margin-top: 14px;
    background: #ffffffee;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 12px 32px rgba(2,6,23,0.12);
    position: relative;
    z-index: 10; /* above skyline and raindrops */
    min-height: 170px;
  }
  .featured-wide-card .featured-swiper { width: 100%; height: 170px; }
  .featured-wide-card .featured-swiper { position: relative; z-index: 1; }
  .featured-wide-card .featured-swiper .swiper-wrapper { height: 100%; }
  .featured-wide-card .featured-swiper .swiper-slide { height: 100%; }
  .featured-wide-card .featured-swiper .swiper-slide a { display:block; height:100%; }
  /* Only Swiper images should stretch to container height */
  .featured-wide-card .featured-swiper img { width: 100%; height: 100%; object-fit: cover; display: block; position: relative; z-index: 2; }
  /* Non-swiper images (like debug test) should size naturally */
  .featured-wide-card > img { width: 100%; height: auto; display: block; position: relative; z-index: 2; }
  .featured-wide-card .fallback-img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; z-index: 0; }
  .featured-wide-card .banner-debug-badge { position:absolute; top:6px; left:6px; padding:2px 6px; font-size:10px; background:rgba(15,23,42,0.7); color:#fff; border-radius:8px; z-index:3; }
  @media (min-width: 768px) { .featured-wide-card .featured-swiper { height: 200px; } }

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

  /* Premium Search Section Styles */
  .premium-search-section {
    position: relative;
    z-index: 20;
    max-width: 1000px;
    margin: 0 auto 4rem;
    padding: 0 1rem;
    /* Debugging: Ensure visibility */
    min-height: 200px;
    border: 2px solid rgba(255, 255, 255, 0.5);
  }

  /* Category Pills Container */
  .category-pills-container {
    display: flex;
    justify-content: center;
    gap: 0.75rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }

  /* Premium Pill Buttons */
  .premium-pill-button {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 50px;
    color: #fff;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .pill-glow {
      position: absolute;
      inset: -2px;
      background: linear-gradient(45deg, #ff416c, #ff4b2b, #ff6b35, #f7931e);
      background-size: 400% 400%;
      border-radius: 50px;
      opacity: 0;
      z-index: -1; 
      animation: gradientShift 3s ease infinite;
      transition: opacity 0.3s ease;
    }

    .pill-icon {
      font-size: 1.1rem;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
    }

    .pill-text {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      letter-spacing: 0.02em;
    }

    &:hover {
      transform: translateY(-2px);
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.3);
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.15);

      &::before {
        opacity: 1;
      }
    }

    &.active {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.4);
      color: #fff;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3);

      .pill-glow {
        opacity: 1;
      }

      &::before {
        opacity: 1;
      }
    }
  }

  /* Glassmorphism Search Container */
  .glass-search-container {
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 24px;
    padding: 2rem;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5);
    margin-bottom: 1.5rem;
  }

  /* Premium Search Form */
  .premium-search-form {
    display: grid;
    grid-template-columns: 2fr auto auto auto;
    gap: 1rem;
    align-items: center;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }

  /* Search Input Wrapper */
  .search-input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 16px;
    padding: 0 1rem;
    box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;

    .search-location-icon {
      color: #ff512f;
      font-size: 1.3rem;
      margin-right: 0.75rem;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
    }

    .input-shimmer {
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
      animation: shimmer 2s infinite;
    }
  }

  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }

  /* Premium Search Input */
  .premium-search-input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    padding: 1.2rem 0;
    font-size: 1.1rem;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #333;
    font-weight: 500;

    &::placeholder {
      color: #666;
      transition: color 0.3s ease;
    }

    &:focus::placeholder {
      color: #999;
    }
  }

  /* Premium Select Dropdowns */
  .premium-select {
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    padding: 1rem 1.2rem;
    font-size: 1rem;
    font-weight: 500;
    color: #333;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    &:hover {
      background: rgba(255, 255, 255, 0.95);
      border-color: rgba(255, 81, 47, 0.3);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    }

    &:focus {
      outline: none;
      border-color: #ff512f;
      box-shadow: 0 0 0 3px rgba(255, 81, 47, 0.1);
    }
  }

  /* Premium Search Button */
  .premium-search-button {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1.2rem 2rem;
    background: linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%);
    border: none;
    border-radius: 16px;
    color: #fff;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 12px 32px rgba(255, 65, 108, 0.4);
    overflow: hidden;

    .button-gradient {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .search-btn-icon {
      font-size: 1.2rem;
      z-index: 1;
    }

    span {
      z-index: 1;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      letter-spacing: 0.02em;
    }

    .button-shine {
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      transition: left 0.6s ease;
    }

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 16px 40px rgba(255, 65, 108, 0.5);

      .button-gradient {
        opacity: 1;
      }

      .button-shine {
        left: 100%;
      }
    }

    &:active {
      transform: translateY(-1px);
    }
  }

  /* Search Stats Container */
  .search-stats-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin-top: 1rem;

    @media (max-width: 768px) {
      gap: 1rem;
      flex-wrap: wrap;
    }

    .stat-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: rgba(255, 255, 255, 0.9);
      font-size: 0.9rem;
      font-weight: 500;

      .stat-icon {
        font-size: 1.1rem;
        color: #4ade80;
        filter: drop-shadow(0 2px 4px rgba(74, 222, 128, 0.3));
      }
    }

    .stat-divider {
      width: 1px;
      height: 20px;
      background: rgba(255, 255, 255, 0.3);
    }
  }

  /* Premium Trending Locations */
  .premium-trending-section {
    position: relative;
    z-index: 20;
    max-width: 1000px;
    margin: 0 auto 3rem;
    padding: 0 1rem;

    .trending-header {
      text-align: center;
      margin-bottom: 2rem;

      .trending-title-wrapper {
        position: relative;
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem 2rem;
        background: rgba(255, 255, 255, 0.25);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.4);
        border-radius: 50px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);

        .trending-icon {
          font-size: 1.5rem;
          color: #4ade80;
          filter: drop-shadow(0 2px 4px rgba(74, 222, 128, 0.3));
        }

        .trending-title {
          color: #fff;
          font-size: 1.3rem;
          font-weight: 700;
          margin: 0;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          letter-spacing: 0.02em;
        }

        .trending-pulse {
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, #4ade80, #22c55e, #16a34a);
          background-size: 400% 400%;
          border-radius: 50px;
          opacity: 0.3;
          z-index: -1;
          animation: gradientShift 3s ease infinite;
        }
      }
    }

    .premium-trending-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1rem;
      
      @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 0.75rem;
      }
    }

    .premium-location-chip {
      position: relative;
      display: block;
      text-decoration: none;
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.4);
      border-radius: 16px;
      padding: 1.5rem;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
      animation: fadeInUp 0.6s ease forwards;
      opacity: 0;
      transform: translateY(20px);

      .chip-gradient-border {
        position: absolute;
        inset: -1px;
        background: linear-gradient(135deg, #ff416c, #ff4b2b, #ff6b35, #f7931e);
        background-size: 400% 400%;
        border-radius: 16px;
        opacity: 0;
        z-index: -1;
        animation: gradientShift 4s ease infinite;
        transition: opacity 0.3s ease;
      }

      .chip-content {
        position: relative;
        z-index: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;

        .location-info {
          flex: 1;

          .location-name {
            display: block;
            color: #fff;
            font-size: 1.1rem;
            font-weight: 700;
            margin-bottom: 0.25rem;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          }

          .location-count {
            color: rgba(255, 255, 255, 0.8);
            font-size: 0.9rem;
            font-weight: 500;
          }
        }

        .location-trend-badge {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background: rgba(74, 222, 128, 0.2);
          border: 1px solid rgba(74, 222, 128, 0.3);
          border-radius: 20px;
          padding: 0.5rem 0.75rem;
          backdrop-filter: blur(10px);

          .trend-icon {
            font-size: 0.9rem;
            color: #4ade80;
          }

          .trend-value {
            color: #4ade80;
            font-size: 0.85rem;
            font-weight: 700;
          }
        }
      }

      .chip-hover-glow {
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at center, rgba(255, 255, 255, 0.1), transparent 70%);
        opacity: 0;
        transition: opacity 0.3s ease;
        border-radius: 16px;
      }

      &:hover {
        transform: translateY(-4px);
        background: rgba(255, 255, 255, 0.15);
        border-color: rgba(255, 255, 255, 0.3);
        box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);

        .chip-gradient-border {
          opacity: 1;
        }

        .chip-hover-glow {
          opacity: 1;
        }

        .location-trend-badge {
          background: rgba(74, 222, 128, 0.3);
          border-color: rgba(74, 222, 128, 0.5);
        }
      }
    }
  }

  /* Essential Keyframe Animations */
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
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

                &.loading {
                  justify-content: center;
                  color: #64748b;
                  font-style: italic;
                }

                &.no-results {
                  justify-content: center;
                  color: #64748b;
                  font-style: italic;
                }

                .suggestion-icon {
                  color: #ff512f;
                  font-size: 1.1rem;
                  flex-shrink: 0;
                }

                .suggestion-content {
                  flex: 1;
                  min-width: 0;

                  .suggestion-text {
                    font-weight: 500;
                    color: #1e293b;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  }

                  .suggestion-type {
                    font-size: 0.75rem;
                    color: #64748b;
                    margin-top: 0.25rem;
                    text-transform: capitalize;
                  }
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