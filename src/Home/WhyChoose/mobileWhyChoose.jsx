import React, { useState, useEffect, useRef } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import CountUp from "react-countup";

import {
  MonthlyVisitIcon,
  AwardsIcon,
  ResidentialProjectIcon,
  CommercialProjectIcon,
  ScoPlotsIcon,
  PlotnFloorIcon,
} from "../../Assets/icons";

function MobileWhyChoose() {
  const [expanded, setExpanded] = useState(false);
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollIntervalRef = useRef(null);

  const toggleParagraph = () => {
    setExpanded(!expanded);
  };

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
      const scrollAmount = 200; // Card width + gap
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
        
        if (container.scrollLeft >= maxScroll - 10) {
          // Reached the end, scroll back to start
          container.scrollTo({
            left: 0,
            behavior: 'smooth'
          });
        } else {
          // Scroll to next card
          container.scrollBy({
            left: 200,
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
    AOS.init({ duration: 1000, once: true });
    
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      checkScrollButtons(); // Initial check
      
      // Start auto-scroll
      startAutoScroll();
      
      return () => {
        container.removeEventListener('scroll', checkScrollButtons);
        stopAutoScroll();
      };
    }
  }, []);

  const monthlydata = [
    {
      title: "Residential Projects",
      count: 1600,
      suffix: "+",
      icon: <ResidentialProjectIcon />,
    },
    {
      title: "Commercial Projects",
      count: 900,
      suffix: "+",
      icon: <CommercialProjectIcon />,
    },
    { title: "SCO Plots", count: 90, suffix: "+", icon: <ScoPlotsIcon /> },
    {
      title: "Plots & Floors",
      count: 400,
      suffix: "+",
      icon: <PlotnFloorIcon />,
    },
    {
      title: "Monthly Visitors",
      count: 2.45,
      suffix: "L+",
      decimals: 2,
      icon: <MonthlyVisitIcon />,
    },
    { title: "Awards", count: 1000, suffix: "+", icon: <AwardsIcon /> },
  ];

  const paragraphText = `Why Choose 100acress.com for Real Estate in Gurgaon & Delhi NCR?
100acress is transforming property buying, selling, and renting by offering verified property listings for flats, villas, apartments, SCO plots, commercial spaces, and budget-friendly homes. Whether you're looking for affordable housing projects, under-construction apartments, ready-to-move flats, or investment properties, 100acress makes your journey simple, safe, and transparent. With a huge database of residential and commercial real estate projects in India, the platform ensures trusted builders, genuine deals, and expert guidance every step of the way.
`;

  const truncateText = (text, limit) => {
    const words = text.split(" ");
    return words.length > limit
      ? words.slice(0, limit).join(" ") + "..."
      : text;
  };

  return (
    <section className="font-sans py-2 w-full">
      <div className="flex flex-col">
        {/* Header Section */}
        <div className="p-6 flex flex-col justify-center">
          <div className="flex flex-col items-center mb-4 mx-auto" data-aos="fade-up">
            <h2 className="text-2xl font-extrabold mb-3 leading-tight text-black text-center">
              Why 100acress.com?
            </h2>
            <div className="h-1.5 w-32 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
          </div>

          <div className="text-justify text-gray-700 leading-relaxed text-sm">
            <p className="mb-4">
              {expanded
                ? paragraphText
                : truncateText(paragraphText, 25)}
            </p>
            <button
              className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-full shadow-lg text-white
                         bg-gradient-to-r from-[#FF9933] to-[#138808] hover:from-[#e67e22] hover:to-[#107c07]
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF9933] transition duration-300 ease-in-out transform hover:scale-105"
              onClick={toggleParagraph}
            >
              {expanded ? "Read less" : "Read more"}
            </button>
            <div className="mt-6 space-y-1">
              <h3 className="text-lg font-semibold text-gray-800">
                Rajesh Aggarwal
              </h3>
              <p className="text-base text-gray-600">
                Founder & CEO
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="p-6 bg-white">
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
            {monthlydata.map((data, index) => (
              <div
                data-aos="zoom-in"
                data-aos-delay={index * 150 + 200}
                key={index}
                className="flex-none w-[180px] bg-white p-4 rounded-2xl shadow-lg flex flex-col items-start justify-center
                           hover:shadow-2xl hover:shadow-[#FF9933]/40 border border-gray-100 hover:border-[#FF9933]/50
                           transition-all duration-300 ease-in-out transform hover:-translate-y-2"
              >
                
                <div className="mt-6 text-gray-900 font-extrabold text-2xl leading-none tracking-tight">
                  <CountUp
                    end={data.count}
                    duration={3}
                    decimals={data.decimals || 0}
                    suffix={data.suffix}
                    enableScrollSpy={true}
                    scrollSpyOnce={true}
                  />
                </div>
                <p className="mt-2 text-gray-600 text-xs font-medium">
                  {data.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MobileWhyChoose;