import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

const MobileCities = () => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollIntervalRef = useRef(null);

  useEffect(() => { AOS.init(); }, []);

  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth);
    }
  };

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 100; // Card width + gap
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      
      // Pause auto-scroll when user manually scrolls
      setIsAutoScrolling(false);
      setTimeout(() => setIsAutoScrolling(true), 5000); // Resume after 5 seconds
    }
  };

  const startAutoScroll = () => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }
    
    autoScrollIntervalRef.current = setInterval(() => {
      const container = scrollContainerRef.current;
      if (container && isAutoScrolling) {
        const maxScroll = container.scrollWidth - container.clientWidth;
        const currentScroll = container.scrollLeft;
        
        console.log('Auto-scroll:', { currentScroll, maxScroll, isAutoScrolling });
        
        if (currentScroll >= maxScroll - 10) {
          // Reached the end, scroll back to start
          console.log('Scrolling to start');
          container.scrollTo({
            left: 0,
            behavior: 'smooth'
          });
        } else {
          // Scroll to next card
          console.log('Scrolling to next card');
          container.scrollBy({
            left: 220,
            behavior: 'smooth'
          });
        }
      }
    }, 3000); // Auto-scroll every 3 seconds
  };

  const stopAutoScroll = () => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }
  };

  // Pause auto-scroll on hover
  const handleMouseEnter = () => {
    setIsAutoScrolling(false);
  };

  const handleMouseLeave = () => {
    setIsAutoScrolling(true);
  };

  useEffect(() => {
    AOS.init();
    
    const container = scrollContainerRef.current;
    console.log('Container ref:', container);
    
    if (container) {
      console.log('Setting up scroll listeners');
      container.addEventListener('scroll', checkScrollButtons);
      checkScrollButtons(); // Initial check
      
      // Start auto-scroll
      console.log('Starting auto-scroll');
      startAutoScroll();
      
      return () => {
        console.log('Cleaning up scroll listeners');
        container.removeEventListener('scroll', checkScrollButtons);
        stopAutoScroll();
      };
    } else {
      console.log('Container not found, retrying...');
      // Retry after a short delay
      const retryTimer = setTimeout(() => {
        const retryContainer = scrollContainerRef.current;
        if (retryContainer) {
          console.log('Retry successful, setting up scroll');
          retryContainer.addEventListener('scroll', checkScrollButtons);
          checkScrollButtons();
          startAutoScroll();
        }
      }, 100);
      
      return () => clearTimeout(retryTimer);
    }
  }, []);

  const cities = [
    {
      title: "Gurugram",
      link: "/projects-in-gurugram/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/GURGAON.webp",
      state: "Haryana"
    },
    {
      title: "Delhi",
      link: "/projects-in-delhi/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/DELHI.webp",
      state: "Delhi"
    },
    {
      title: "Noida",
      link: "/projects-in-noida/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/NOIDA.webp",
      state: "Uttar Pradesh"
    },
    {
      title: "Goa",
      link: "/projects-in-goa/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/GOA.webp",
      state: "Goa"
    },
    {
      title: "Ayodhya",
      link: "/projects-in-ayodhya/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/AYODHYA.webp",
      state: "Uttar Pradesh"
    },
    {
      title: "Mumbai",
      link: "/projects-in-mumbai/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/MUMBAI.webp",
      state: "Maharashtra"
    },
    {
      title: "Panipat",
      link: "/projects-in-panipat/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/panipat.webp",
      state: "Haryana"
    },
    {
      title: "Panchkula",
      link: "/projects-in-panchkula/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/PANCHKULA.webp",
      state: "Haryana"
    },
    {
      title: "Kasauli",
      link: "/projects-in-kasauli/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/KASULI.webp",
      state: "Himachal Pradesh"
    },
    {
      title: "Sonipat",
      link: "/projects-in-sonipat/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/sonipat-final.webp",
      state: "Haryana"
    },
    {
      title: "Karnal",
      link: "/projects-in-karnal/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/KARNAL.webp",
      state: "Haryana"
    },
    {
      title: "Jalandhar",
      link: "/projects-in-jalandhar/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/JALANDHAR.webp",
      state: "Punjab"
    },
    {
      title: "Pushkar",
      link: "/projects-in-pushkar/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/PUSHKAR.webp",
      state: "Rajasthan"
    },
    {
      title: "Dubai",
      link: "/united-arab-emirates/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/DUBAI.webp",
      state: "UAE"
    },
    {
      title: "See All",
      link: "/all-cities/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/DUBAI.webp",
      state: "Explore More"
    }
  ];

  return (
    <Wrapper className="section">
      <div className="container">
        <div className="flex flex-col items-center justify-center text-center mx-auto mb-4 mt-6 px-4">
          <h2 className="text-2xl md:text-3xl text-[#111] font-bold mb-3">
            Prime Cities for Real Estate Investment
          </h2>
          <div className="h-1.5 w-32 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
        </div>

        {/* City Cards Grid */}
        <div className="city-cards-container">
          {/* Mobile Navigation Buttons */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`p-2 rounded-full transition-all ${
                canScrollLeft 
                  ? 'bg-[#0A2647] text-white shadow-lg' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-sm text-gray-600 font-medium">
              Swipe to see more
            </span>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`p-2 rounded-full transition-all ${
                canScrollRight 
                  ? 'bg-[#0A2647] text-white shadow-lg' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Scrollable Container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scroll-smooth"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              backgroundColor: 'white'
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {cities.map((city, index) => (
              <div key={index} className={`city-card ${city.title === "See All" ? "see-all-card" : ""}`}>
                <Link to={city.link} className="card-link">
                  <div className="card-image-container">
                    {city.title === "See All" ? (
                      <div className="see-all-content">
                        <div className="see-all-icon">→</div>
                        <h3 className="see-all-title">{city.title}</h3>
                        <p className="see-all-subtitle">{city.state}</p>
                      </div>
                    ) : (
                      <>
                        <img
                          src={city.image}
                          alt={city.title}
                          className="card-image"
                          fetchPriority="high"
                          loading="lazy"
                        />
                        <div className="card-overlay">
                          <div className="city-info">
                            <h3 className="city-name">{city.title}</h3>
                            <p className="city-state">{city.state}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default MobileCities;

const Wrapper = styled.section`
  .container {
    max-width: 100%;
    margin: auto;
    padding: 10px;
  }

  .city-cards-container {
    margin: 20px auto 0;
    padding: 10px;
  }

  .city-cards-grid {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .city-cards-grid::-webkit-scrollbar {
    display: none;
  }

  .city-card {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;
    border: 1px solid rgba(255, 255, 255, 0.2);
    height: 140px;
    width: 200px;
    flex: none;
    scroll-snap-align: start;
  }

  .city-card:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 12px 30px rgba(229, 62, 62, 0.3);
    border-color: #e53e3e;
  }

  .see-all-card {
    background: #f8f9fa;
    border: 2px solid #e9ecef;
  }

  .see-all-card:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 12px 30px rgba(229, 62, 62, 0.2);
    border-color: #e53e3e;
    background: #ffffff;
  }

  .see-all-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #333;
    text-align: center;
    padding: 15px;
  }

  .see-all-icon {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 8px;
    color: #e53e3e;
  }

  .see-all-title {
    font-size: 16px;
    font-weight: bold;
    margin: 0 0 4px 0;
    color: #333;
  }

  .see-all-subtitle {
    font-size: 12px;
    margin: 0;
    color: #666;
    font-weight: 500;
  }

  .card-link {
    text-decoration: none;
    color: inherit;
    display: block;
    height: 100%;
  }

  .card-image-container {
    position: relative;
    height: 100%;
    overflow: hidden;
  }

  .card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .city-card:hover .card-image {
    transform: scale(1.1);
  }

  .card-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
    padding: 15px 10px 10px;
    transform: translateY(0);
    transition: transform 0.3s ease;
  }

  .city-card:hover .card-overlay {
    transform: translateY(0);
  }

  .city-info {
    text-align: center;
  }

  .city-name {
    color: white;
    font-size: 14px;
    font-weight: bold;
    margin: 0 0 4px 0;
  }

  .city-state {
    color: #e53e3e;
    font-size: 11px;
    margin: 0;
    font-weight: 500;
  }
`;