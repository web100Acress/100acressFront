import React, { useEffect, useRef, useState, useCallback } from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Builder = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    AOS.init();
  }, []);

  // Auto-scroll animation
  const startAutoScroll = useCallback(() => {
    if (isHovered || isDragging || !scrollContainerRef.current) return;

    const scrollContainer = scrollContainerRef.current;
    const scrollWidth = scrollContainer.scrollWidth;
    const clientWidth = scrollContainer.clientWidth;
    const maxScroll = scrollWidth - clientWidth;

    if (maxScroll <= 0) return;

    let currentScroll = scrollContainer.scrollLeft;
    
    const animate = () => {
      if (isHovered || isDragging) return;
      
      currentScroll += 0.5; // Smooth, moderate speed
      
      if (currentScroll >= maxScroll) {
        currentScroll = 0; // Reset to start for infinite loop
      }
      
      scrollContainer.scrollLeft = currentScroll;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
  }, [isHovered, isDragging]);

  // Mouse event handlers
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!isDragging) {
      startAutoScroll();
    }
  };

  // Touch/Drag event handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (!isHovered) {
      startAutoScroll();
    }
  };

  // Touch event handlers for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (!isHovered) {
      startAutoScroll();
    }
  };

  // Start auto-scroll on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isHovered && !isDragging) {
        startAutoScroll();
      }
    }, 1000);
    
    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered, isDragging, startAutoScroll]);

  const Builder = [
    {
      title: "Godrej Properties",
      link: "/developers/godrej-properties/",
      image: "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/godrej.jpg",
    },
    {
      title: "DLF Homes",
      link: "/developers/dlf-homes/",
      image: "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/dlf.png",
    },
    {
      title: "Emaar India",
      link: "/developers/emaar-india/",
      image:
        "https://cdn.in.emaar.com/wp-content/themes/emaar/inc/assets/images/emaar-india-logo-en.svg",
    },
    {
      title: "Birla Estates",
      link: "/developers/birla-estate/",
      image: "https://www.birlaestates.com/images/birla-estate-logo.webp",
    },
    {
      title: "Adani Realty",
      link: "/developers/adani-realty/",
      image:
        "https://www.adanirealty.com/-/media/project/realty/header/logo.ashx",
    },
    {
      title: "Experion",
      link: "/developers/experion-developers/",
      image: "https://www.experion.co/img/logo/experion-logo.png",
    },
    {
      title: "Signature Global",
      link: "/developers/signature-global/",
      image:
        "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/signature.webp",
    },
    {
      title: "sobha",
      link: "/developers/sobha-developers/",
      image:
        "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/banner/sobha.webp",
    },
    {
      title: "Central Park",
      link: "/developers/central-park/",
      image:
        "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/centralpark.jpg",
    },
    {
      title: "Trump Towers",
      link: "/developers/trump-towers/",
      image:
        "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/banner/Trump-Tower.webp",
    },
    {
      title: "ELAN Group",
      link: "/developers/elan-group/",
      image:
        "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/elan-logo.webp",
    },
    {
      title: "Puri Constructions",
      link: "/developers/puri-developers/",
      image:
        "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/banner/puri+(1).webp",
    },
    {
      title: "M3M India",
      link: "/developers/m3m-india/",
      image: "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/m3m.webp",
    },
    {
      title: "SmartWorld Developers",
      link: "/developers/smartworld-developers/",
      image:
        "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/smartworld.webp",
    },
    {
      title: "BPTP Limited",
      link: "/developers/bptp-limited/",
      image: "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/bptp.webp",
    },
    {
      title: "Whiteland Corporation",
      link: "/developers/whiteland/",
      image:
        "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/whiteland.jpg",
    },
    {
      title: "Indiabulls Real Estate",
      link: "/developers/indiabulls-real-estate/",
      image:
        "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/indiabulls.webp",
    },
    {
      title: "AIPL",
      link: "/developers/aipl/",
      image: "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/aipl.png",
    },
    {
      title: "Trevoc Group",
      link: "/developers/trevoc-group/",
      image:
        "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/trevoc.webp",
    },
    {
      title: "Aarize",
      link: "/developers/aarize-developers/",
      image:
        "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/project/tmfm0mywshnqqnmz7j9x",
    },
  ];

  return (
    <Wrapper className="section">
      <div className="container">
        <div className="flex items-center justify-between mx-3 lg:mx-3 xl:mx-14 md:mx-6 py-2">
          <div className="flex items-center">
            <h2 className="text-2xl xl:text-4xl lg:text-3xl md:text-2xl text-center sm:text-left">
              Top Developers in Gurugram
            </h2>
          </div>
        </div>
        
        {/* Horizontal Scrolling Carousel */}
        {/* <div className="text-center mb-2 text-sm text-gray-600">
          Developer Logos Carousel ({Builder.length} developers)
        </div> */}
        <div 
          style={{
            padding: '20px',
            margin: '20px 0',
            minHeight: '160px'
          }}
        >
          <div
            ref={scrollContainerRef}
            className="carousel-scroll-container"
            style={{
              display: 'flex',
              gap: '20px',
              overflowX: 'auto',
              padding: '10px',
              minHeight: '140px',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {Builder.map((project, index) => (
              <div
                key={index}
                style={{
                  flex: '0 0 180px',
                  height: '120px',
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    transition: 'transform 0.3s ease-in-out'
                  }}
                  onError={(e) => {
                    console.log('Image failed to load:', project.title);
                    e.target.style.display = 'none';
                  }}
                  onLoad={() => console.log('Image loaded:', project.title)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Builder;

const Wrapper = styled.section`
  .container {
    max-width: 1250px;
    margin: auto;
    padding: 20px 10px;
  }

  /* Carousel Wrapper */
  .carousel-wrapper {
    position: relative;
    width: 100%;
    max-width: 1250px;
    margin: 0 auto;
    overflow: hidden;
    padding: 20px 0;
  }

  /* Carousel Container */
  .carousel-container {
    display: flex;
    gap: 20px;
    overflow-x: auto;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
    cursor: grab;
    padding: 10px 20px;
    
    /* Hide scrollbar */
    &::-webkit-scrollbar {
      display: none;
    }
    
    /* Prevent text selection during drag */
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    
    /* Active dragging state */
    &:active {
      cursor: grabbing;
    }
  }

  /* Carousel Item */
  .carousel-item {
    flex: 0 0 180px;
    height: 120px;
    text-decoration: none;
    transition: transform 0.2s ease;
    
    &:hover {
      transform: translateY(-2px);
    }
  }

  /* Developer Card */
  .developer-card {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border: 1px solid #f1f5f9;
    padding: 15px;
    transition: all 0.3s ease;
    
    &:hover {
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      transform: scale(1.02);
    }
  }

  /* Developer Logo */
  .developer-logo {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 8px;
    transition: transform 0.3s ease;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .carousel-item {
      flex: 0 0 140px;
      height: 100px;
    }
    
    .carousel-container {
      gap: 15px;
      padding: 10px 15px;
    }
    
    .developer-card {
      padding: 12px;
    }
  }

  @media (max-width: 480px) {
    .carousel-item {
      flex: 0 0 120px;
      height: 80px;
    }
    
    .carousel-container {
      gap: 12px;
      padding: 8px 12px;
    }
    
    .developer-card {
      padding: 10px;
    }
  }

  /* Hide scrollbar for all browsers */
  .carousel-scroll-container::-webkit-scrollbar {
    display: none;
  }
  
  .carousel-scroll-container {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  /* Touch-friendly improvements */
  @media (hover: none) and (pointer: coarse) {
    .carousel-container {
      scroll-snap-type: x mandatory;
    }
    
    .carousel-item {
      scroll-snap-align: start;
    }
  }
`;

