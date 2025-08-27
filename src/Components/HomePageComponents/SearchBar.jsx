import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { FiSearch, FiMic, FiMapPin, FiChevronRight } from 'react-icons/fi';
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
      setActiveLink(linkName);
      setData(`${linkName}`);
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

    const itemsPerPage = 7;
    const nextpage = 1;

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

    // useEffect(() => {
    //   const updateImageSrc = () => {
    //     if (window.innerWidth <= 600) {
    //       setImageSrc(['../../Imgaes/mobile.png']);
    //     } else if (window.innerWidth <= 1024) {
    //       setImageSrc(['https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/banner/t1.webp']);
    //     } else {
    //       setImageSrc(['https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/banner/t1.webp']);
    //     }
    //   };

    //   updateImageSrc();
    //   window.addEventListener('resize', updateImageSrc);

    //   return () => {
    //     window.removeEventListener('resize', updateImageSrc);
    //   };
    // }, []);


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
          className={`rounded-full mt-4 mr-2 ${i === currentindeximgae ? 'bg-gray-800 h-2 w-5' : 'bg-gray-400 h-3 w-3'}`}
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
        className={`rounded-full mt-4 mr-2 ${i === currentindeximgae ? 'bg-gray-800 h-2 w-5' : 'bg-gray-400 h-3 w-3'}`}
      ></button>
    ),
    afterChange: (index) => setCurrentImageIndex(index),
  };

  const [flickerIndex, setFlickerIndex] = useState(0);

  return (
    <Wrapper>
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Search Container */}
        <div className="glass-container w-full mx-auto p-6 rounded-2xl shadow-2xl backdrop-blur-lg bg-gradient-to-r from-red-400/20 via-orange-400/20 to-pink-400/20 border border-white/10">
        {/* Category Tabs */}
        <div className="tabs-container flex justify-center mb-6">
          <div className="inline-flex p-1 bg-black/10 rounded-xl backdrop-blur-sm">
            {["Buy", "Rent", "New Launch", "Commercial", "Plots", "SCO"].map((linkName) => (
              <button
                key={linkName}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  activeLink === linkName
                    ? "bg-white text-black shadow-md"
                    : "text-white hover:bg-white/20"
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
          className={`search-bar flex items-center bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-lg transition-all duration-300 ${
            isFocused ? 'ring-2 ring-white/50' : ''
          }`}
        >
          <div className="flex items-center px-4 text-gray-500">
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
            className="flex-1 py-4 px-2 bg-transparent outline-none text-gray-800 placeholder-gray-500"
          />
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="search-btn flex items-center bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full font-medium ml-2 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30"
          >
            <FiSearch className="mr-2" /> Search
          </motion.button>
          <button className="p-2 mx-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
            <FiMic className="w-5 h-5" />
          </button>
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

        {/* Trending Searches */}
        <div className="trending-searches mt-6">
          <div className="text-sm text-white/80 mb-2">Trending Searches:</div>
          <div className="flex flex-wrap gap-2">
            {trendingSearches.map((search, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -2 }}
                className="px-3 py-1.5 bg-white/10 backdrop-blur-sm text-white text-sm rounded-full cursor-pointer hover:bg-white/20 transition-colors border border-white/5"
              >
                {search}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center text-white/80 mb-2">
          <FiMapPin className="mr-2" />
          <span className="text-sm">Top Localities:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { name: "Gurgaon", link: "/gurgaon" },
            { name: "Noida", link: "/noida" },
            { name: "Mumbai", link: "/mumbai" },
            { name: "Bangalore", link: "/bangalore" },
            { name: "Pune", link: "/pune" },
            { name: "Hyderabad", link: "/hyderabad" },
          ].map((locality, index) => (
            <Link 
              to={locality.link} 
              key={index} 
              className="inline-block"
              target="_blank"
            >
              <motion.span
                whileHover={{ y: -2 }}
                className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm rounded-full cursor-pointer hover:bg-white/20 transition-colors border border-white/5"
              >
                {locality.name}
              </motion.span>
            </Link>
          ))}
        </div>
        <button 
          onClick={handleNext} 
          disabled={currentIndex + itemsPerPage >= localities.length} 
          className={`cursor-pointer mt-2 ${currentIndex + itemsPerPage >= localities.length ? 'opacity-50 pointer-events-none' : ''}`}
        >
          <FiChevronRight />
        </button>
      </div>
    </div>

    <div className="hidden md:block mt-2 lg:w-[750px] lg:h-[132px] md:h-[132px] md:w-[650px] mx-auto">
      <div className="section">
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

    <div className="block sm:hidden w-[360px] h-[198px] mt-8">
      <div className="section">
        <Slider {...phonesettings}>
          {phoneSrc.map((src, index) => (
            <div key={index}>
              <img
                src={src.image}
                alt={`Slide ${index}`}
                onClick={() => window.open(src.link, "_self")}
                className="w-full h-full object-cover rounded-lg cursor-pointer"
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
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
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
    
    .tabs-container {
      overflow-x: auto;
      padding-bottom: 0.5rem;
      -webkit-overflow-scrolling: touch;
      
      &::-webkit-scrollbar {
        display: none;
      }
    }
    
    .search-bar {
      flex-direction: column;
      padding: 0.5rem;
      
      input {
        width: 100%;
        margin: 0.5rem 0;
      }
      
      button {
        width: 100%;
        margin: 0.5rem 0 0;
      }
    }
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

