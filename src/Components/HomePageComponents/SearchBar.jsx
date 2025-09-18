import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { FiSearch, FiMic, FiMapPin, FiChevronRight, FiChevronLeft, FiCrosshair } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Slider from 'react-slick';
import { imageSrc, phoneSrc } from '../../Pages/datafeed/Desiredorder';
import { useMediaQuery } from '@chakra-ui/react';

function SearchBar() {
  const [activeLink, setActiveLink] = useState("Buy");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const searchRef = useRef(null);

  const trendingSearches = [
    "Luxury Apartments in Mumbai",
    "Villas in Bangalore",
    "Plots in Hyderabad",
    "Commercial Space in Delhi",
    "New Launch in Pune"
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [isSmallerThan500] = useMediaQuery("(max-width: 500px)");

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
    switch (linkName) {
      case "Rent":
        window.open(window.location.origin + "/buy-properties/best-resale-property-in-gurugram/", '_blank');
        break;

        case "New Launch":
          window.open(window.location.origin + "/projects-in-newlaunch/", '_blank',);
          break;

        case "Commercial":
          window.open(window.location.origin + "/projects/commercial/", '_blank',);
          break;

        case "Plots":
          window.open(window.location.origin + "/plots-in-gurugram/", '_blank',);
          break;

        case "SCO":
          window.open(window.location.origin + "/sco/plots/", '_blank',);
          break;

    }
  };

  const handleSearch = () => {
    const searchData = {
      query: searchQuery,
      collectionName: activeLink,
    };
    const key = encodeURIComponent(JSON.stringify(searchData));
    window.location.href = `/searchdata/${key}`;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      console.warn('Geolocation is not supported by this browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Optional: show coords in the input briefly
        setSearchQuery(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);

        // Navigate directly to results with current location so nearby properties show
        const searchData = {
          location: { lat: latitude, lng: longitude },
          query: "",
          collectionName: activeLink,
          nearby: true,
        };
        const key = encodeURIComponent(JSON.stringify(searchData));
        window.location.href = `/searchdata/${key}`;
      },
      (error) => {
        console.warn('Unable to retrieve location:', error?.message || error);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const localities = [
    { name: "Sohna Road", link: "/property-in-gurugram/sohna-road/" },
    { name: "Golf Course Road", link: "/property-in-gurugram/golf-course/" },
    { name: "MG Road", link: "/property-in-gurugram/mg-road/" },
    { name: "Northern Peripheral Road", link: "/property-in-gurugram/northern-peripheral-road/" },
    { name: "Dwarka Expressway", link: "/property-in-gurugram/dwarka-expressway/" },
    { name: "New Gurgaon", link: "/property-in-gurugram/new-gurgaon/" },
    { name: "Sohna", link: "/property-in-gurugram/sohna/" },
    { name: "Southern Peripheral Road", link: "/property-in-gurugram/southern-peripheral-road/" },
    { name: "NH-48", link: "/property-in-gurugram/nh-48/" },
    { name: "Golf Course Extn Road", link: "/property-in-gurugram/golf-course-extn-road/" },
  ];

  // Responsive items per page: 3 on mobile (<=640px), 7 on larger screens
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const nextpage = 1;

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (typeof window !== 'undefined') {
        setItemsPerPage(window.innerWidth <= 640 ? 3 : 6);
      }
    };
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const visibleLocalities = localities.slice(currentIndex, currentIndex + itemsPerPage);

  const handleNext = () => {
    if (currentIndex + itemsPerPage < localities.length) {
      setCurrentIndex((prev) => prev + nextpage);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - nextpage);
    }
  };
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

    const phonesettings = {
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

  const [flickerIndex, setFlickerIndex] = useState(0);

  return (
    <Wrapper>
      <div className="w-full max-w-6xl mx-auto px-1 mt-2">
        {/* Main Search Container */}
        <div className="glass-container group w-full mx-auto p-6 rounded-3xl overflow-hidden border border-gray-100 -mt-4 sm:-mt-6 md:-mt-14 bg-white shadow-2xl">
        {/* Category Tabs */}
        <div className="tabs-container flex justify-center mb-1">
          <div className="inline-flex p-1 bg-gray-100 rounded-xl">
            {["Buy", "Rent", "New Launch", "Commercial", "Plots", "SCO"].map((linkName) => (
              <button
                key={linkName}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  activeLink === linkName
                    ? "bg-white text-black shadow-md"
                    : "text-gray-600 hover:bg-white/50"
                }`}
                onClick={() => handleLinkClick(linkName)}
              >
                {linkName}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div 
          ref={searchRef}
          className={`search-bar flex items-center bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-full p-1 sm:p-0.5 shadow-lg transition-all duration-300 ${
            isFocused ? 'ring-2 ring-white/50' : ''
          }`}
        >
          <div className="flex items-center px-3 text-gray-500">
            <FiMapPin className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              setIsFocused(true);
              setShowSuggestions(true);
            }}
            onBlur={() => setIsFocused(false)}
            placeholder="Search by City, Locality, or Project"
            className="flex-1 py-2 sm:py-3 px-2 bg-transparent outline-none text-gray-800 placeholder-gray-500"
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            onClick={handleUseCurrentLocation}
            className="mobile-hidden p-2 mr-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Use current location"
            title="Use current location"
          >
            <FiCrosshair className="w-5 h-5" />
          </button>
          <button className="mobile-hidden p-2 mr-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
            <FiMic className="w-5 h-5" />
          </button>
          <div className="relative">
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="search-btn flex items-center justify-center bg-[#e53e3e] hover:bg-[#cc2f3b] text-white px-4 py-3 sm:px-5 md:px-6 rounded-full font-medium transition-all duration-200 hover:shadow-lg text-sm sm:text-base min-w-[50px] h-[50px] sm:h-12 md:h-14 sm:min-w-[120px]"
              onClick={handleSearch}
              aria-label="Search"
            >
              <FiSearch className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="search-btn-text hidden sm:inline ml-2">Search</span>
            </motion.button>
          </div>
        </div>

        {/* Suggestions Dropdown */}
        <AnimatePresence>
          {showSuggestions && searchQuery && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="suggestions mt-2 bg-white bg-opacity-90 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden"
            >
              {Array(5).fill(0).map((_, i) => (
                <div key={i} className="p-3 hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex items-center">
                    <FiMapPin className="text-gray-400 mr-2" />
                    <span>{searchQuery} Suggestion {i + 1}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Localities (single row, overflow hidden, arrow navigation) */}
        <div className="trending-searches mt-6 relative">
          <div className="flex items-center gap-2">
            {/* Prev */}
            <button
              type="button"
              onClick={handlePrev}
              className="nav-btn h-9 w-9 md:h-10 md:w-10 flex items-center justify-center shrink-0 rounded-full bg-white shadow-sm hover:shadow border border-gray-200 text-gray-700 transition active:scale-[0.98]"
              aria-label="Previous"
            >
              <FiChevronLeft />
            </button>
            {/* Viewport */}
            <div className="relative flex-1 overflow-hidden">
              <div className="flex flex-nowrap gap-2 sm:gap-3 whitespace-nowrap">
                {visibleLocalities.map((loc) => (
                  <a
                    key={loc.name}
                    href={loc.link}
                    className="inline-flex items-center px-3 py-1.5 rounded-full border border-gray-200 bg-white text-gray-800 text-xs sm:text-sm hover:bg-gray-50 transition shadow-sm max-w-[160px] sm:max-w-[220px] truncate"
                    title={loc.name}
                  >
                    {loc.name}
                  </a>
                ))}
              </div>
            </div>
            {/* Next */}
            <button
              type="button"
              onClick={handleNext}
              className="nav-btn h-9 w-9 md:h-10 md:w-10 flex items-center justify-center shrink-0 rounded-full bg-white shadow-sm hover:shadow border border-gray-200 text-gray-700 transition active:scale-[0.98]"
              aria-label="Next"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* Removed bottom Top Localities chips section as requested */}
    </div>

    <div className="hidden md:block mt-2 lg:w-[750px] lg:h-[132px] md:h-[132px] md:w-[650px] mx-auto">
      <div className="section pt-4 md:pt-6">
        <Slider {...settings}>
          {imageSrc.map((src, index) => (
            <div key={index}>
              <img 
                src={src.image} 
                onClick={() => window.open(src.link, "_self")} 
                alt={`Slide ${index}`} 
                className="w-full h-auto cursor-pointer rounded-lg" 
                loading="lazy"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>

    <div className="block sm:hidden w-full max-w-[360px] h-[198px] mt-6 mx-auto">
      <div className="section">
        <Slider {...phonesettings}>
          {phoneSrc.map((src, index) => (
            <div key={index}>
              <img
                src={src.image}
                alt={`Slide ${index}`}
                onClick={() => window.open(src.link, "_self")}
                className="w-full h-full object-contain rounded-lg cursor-pointer bg-white"
                loading="lazy"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  </Wrapper>
  );
}

export default SearchBar;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
  }
`;

const Wrapper = styled.section`
  position: relative;
  z-index: 10;
  padding: 2rem 1rem;
  /* Removed section-level background and blur to avoid outer glass effect */
  width: 100%;
  box-sizing: border-box;
  
  .glass-container {
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 60%);
      transform: rotate(30deg);
      pointer-events: none;
    }
  }
  
  .search-btn {
    box-shadow: 0 4px 15px -5px rgba(239, 68, 68, 0.4);
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px -5px rgba(239, 68, 68, 0.6);
    }
    
    &.pulse {
      animation: ${pulse} 2s infinite;
    }
  }
  
  .suggestions {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 50;
    margin-top: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
    
    /* Hide category tabs on mobile */
    .tabs-container {
      display: none;
    }

    /* Remove card look so it blends with background */
    .glass-container {
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      padding: 0 !important;
      border-radius: 0 !important;
      overflow: visible !important;
      margin-top: 0 !important;
    }
    
    .search-bar {
      /* Keep row layout on mobile to avoid tall circular block */
      flex-direction: row;
      padding: 0.25rem 0.5rem;
      border-radius: 1rem;
      
      input {
        width: 100%;
        margin: 0; /* no extra vertical spacing */
      }
    }

    /* Hide non-essential controls on small screens */
    .mobile-hidden {
      display: none;
    }

    /* Ensure at least 2–3 chips fit on one line */
    .flex-nowrap { flex-wrap: nowrap !important; }
    .nav-btn { width: 28px; height: 28px; }
    .trending-searches .flex { gap: 0.5rem; }
    .trending-searches .text-sm { font-size: 12px; }
    .top-localities-label { display: none; }

    /* Icon-only search button style on mobile */
    .search-btn {
      width: 48px;
      height: 48px;
      padding: 0 !important;
      background: transparent !important;
      background-image: none !important;
      color: inherit;
      box-shadow: none !important;
    }
    .search-btn:hover { box-shadow: none !important; background: transparent !important; }
    .search-btn svg { color: #e53e3e !important; } /* unified red */
    .search-btn:hover svg { color: #cc2f3b !important; }
  }
  
  @media (max-width: 480px) {
    .tabs-container button {
      padding: 0.5rem 0.75rem;
      font-size: 0.75rem;
    }
  }
  line-height: 1.5;
  font-weight: 400;

  div {
    box-sizing: border-box;
  }

  .qsbWrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  /* Tablet screens */
  @media screen and (max-width: 1024px) {
      .SJDMls {
        width: 80%; /* Adjust width for tablet */
      }
    }

    /* Medium screens */
    @media screen and (max-width: 900px) {
      .SJDMls {
        width: 90%; /* Adjust width for medium screens */
      }
    }

    /* Small screens and mobile */
    @media screen and (max-width: 770px) {
      .SJDMls {
        width: 100%;
        flex-wrap: wrap; /* Allow wrapping for better alignment */
        justify-content: center; /* Center the options */
        margin-bottom: 10px; /* Add margin at the bottom */
      }

      .options {
        padding: 9px 15px; /* Reduce padding on smaller screens */
        font-size: 14px; /* Smaller font size for better fit */
      }
    }

    /* Extra small screens (mobile) */
    @media screen and (max-width: 500px) {
      .SJDMls {
        display: flex; /* Show SJDMls on small screens */
        flex-wrap: wrap; /* Allow wrapping */
        justify-content: center; /* Center the options */

      }

      .options {
        font-size: 12px; /* Further reduce font size for extra small screens */
        padding: 8px 12px; /* Reduce padding for extra small screens */
      }

      .flex-nowrap {
        flex-wrap: wrap; /* Allow wrapping on smaller screens */
      }
    }

    .SJDMls {
      display: flex;
      box-shadow: 0 25px 60px rgba(255, 153, 51, 0.3);
      width: auto;
      border-radius: 20px 20px 0px 0px;
      background: linear-gradient(135deg, rgba(255, 153, 51, 0.1) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(19, 136, 8, 0.1) 100%);
      margin-left: 30px;
      margin-right: 30px;
      border: 1px solid rgba(255, 153, 51, 0.2);
    }
    
    .sjdmkls{
    font-family: 'Playfair Display', serif;
    font-weight: 600;
    letter-spacing: 0.5px;
    line-height: 1.4;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    }

    .SDFEDVx {
      background: linear-gradient(135deg, rgba(255, 153, 51, 0.1) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(19, 136, 8, 0.1) 100%);
      border: 1px solid rgba(255, 153, 51, 0.3);
    }

    .options {
      padding: 9px 30px;
      font-size: 16px;
      transition: color 0.3s ease;
    }

    .options:hover {
      color: #FF9933;
      background: linear-gradient(135deg, rgba(255, 153, 51, 0.1) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(19, 136, 8, 0.1) 100%);
    }

    .options.active {
      font-size: 18px;
      color: #FF9933;
      background: linear-gradient(135deg, rgba(255, 153, 51, 0.2) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(19, 136, 8, 0.2) 100%);
    }

    .suggestor-wrapper {
      width: 90%;
    }
  `;
