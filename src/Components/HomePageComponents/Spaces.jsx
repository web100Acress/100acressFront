import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FireExtinguisher } from "lucide-react";

function SpacesAvailable() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const scrollRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollIntervalRef = useRef(null);

  // Check screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      setShowLeftButton(scrollRef.current.scrollLeft > 0);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 286; // Card width + gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      // Pause auto-scroll when user manually scrolls
      setIsAutoScrolling(false);
      setTimeout(() => setIsAutoScrolling(true), 5000);
    }
  };

  const startAutoScroll = () => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }
    
    autoScrollIntervalRef.current = setInterval(() => {
      if (scrollRef.current && isAutoScrolling && isMobile) {
        const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
        const currentScroll = scrollRef.current.scrollLeft;
        
        if (currentScroll >= maxScroll - 10) {
          // Reached the end, scroll back to start
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll to next card
          scrollRef.current.scrollBy({ left: 286, behavior: 'smooth' });
        }
      }
    }, 3000); // Auto-scroll every 3 seconds
  };

  const stopAutoScroll = () => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }
  };

  useEffect(() => { 
    AOS.init(); 
    
    const container = scrollRef.current;
    if (container && isMobile) {
      container.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
      
      // Start auto-scroll
      startAutoScroll();
      
      return () => {
        container.removeEventListener('scroll', handleScroll);
        stopAutoScroll();
      };
    }
  }, [isMobile]);

  const projects = [
    {
      title: "Residential Projects",
      link: "/projects/residential/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/spaces/7a536a4b-51f5-4785-97d4-749e9ac68470.webp",
      description: "Luxury apartments and homes in prime locations",
      badge: "Popular"
    },
    {
      title: "Commercial Projects",
      link: "/projects/commercial/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/spaces/f54d86d9-45dc-437d-9fae-d0d01d65205e.webp",
      description: "Premium office spaces and retail properties",
      badge: "Hot"
    },
    {
      title: "SCO Plots",
      link: "/projects/sco-plots/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/spaces/2f7b73d1-379e-4db0-bc17-7ea668165e27.webp",
      description: "Shop-cum-office plots for business growth",
      badge: "New"
    },
    {
      title: "Builder & Independent Floor",
      link: "/projects/independent-floors/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/spaces/28b918b3-0393-471a-b5ab-75af2633a501.webp",
      description: "Independent floors and builder floors",
      badge: "Featured"
    },
    {
      title: "Plots In Gurugram",
      link: "/projects/plots/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/spaces/93756186-da48-4385-95a9-63fdeaa831ec.webp",
      description: "Investment-ready plots in prime locations",
      badge: "Best Value"
    },
    {
      title: "Luxury Villas",
      link: "/projects/villas/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/spaces/59f64851-2928-4da6-b754-9f4dd39b14fa.webp",
      description: "Ultra-luxury villas with world-class amenities",
      badge: "Premium"
    },
    {
      title: "Industrial Plots",
      link: "/projects/industrial-plots/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/spaces/c69f77ee-92b2-4480-8cb4-b15135e7a161.webp",
      description: "Industrial plots for manufacturing and warehousing",
      badge: "Investment"
    },
  ];

  // Desktop view: show grid layout
  if (!isMobile) {
    return (
      <Wrapper className="section">
        <div className="container">
          {/* Header Section */}
          <div className="flex flex-col items-center justify-center text-center mb-4 px-4" data-aos="fade-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111] mb-3 leading-tight">
              <span className="text-red-600">Dream</span> Properties In The Heart of{" "}
              <span className="text-red-600">Gurugram</span>
            </h2>
            <div className="h-1.5 w-32 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
          </div>

          {/* Cards Grid */}
          <div className="cards-grid">
            {/* First Row - 3 Cards */}
            <div className="first-row">
              {projects.slice(0, 3).map((project, index) => (
                <div
                  key={index}
                  className="card-wrapper"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <Link to={project.link} className="card">
                    <div className="card-image-container">
                      <img
                        src={project.image}
                        alt={project.title}
                        fetchPriority="high"
                        className="card-image"
                        loading="lazy"
                      />
                      <div className="badge">{project.badge}</div>
                      <div className="title-overlay">
                        <h2 className="project-title">{project.title}</h2>
                      </div>
                      <div className="description-overlay">
                        <span className="project-description">{project.description}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Second Row - 4 Cards */}
            <div className="second-row">
              {projects.slice(3).map((project, index) => (
                <div
                  key={index + 3}
                  className="card-wrapper"
                  data-aos="fade-up"
                  data-aos-delay={(index + 3) * 100}
                >
                  <Link to={project.link} className="card">
                    <div className="card-image-container">
                      <img
                        src={project.image}
                        alt={project.title}
                        fetchPriority="high"
                        className="card-image"
                        loading="lazy"
                      />
                      <div className="badge">{project.badge}</div>
                      <div className="title-overlay">
                        <h2 className="project-title">{project.title}</h2>
                      </div>
                      <div className="description-overlay">
                        <span className="project-description">{project.description}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }

  // Mobile view: show horizontal scrolling
  return (
    <Wrapper className="section">
      <div className="container">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center text-center mb-4 px-4" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111] mb-3 leading-tight">
            <span className="text-red-600">Dream</span> Properties In The Heart of{" "}
            <span className="text-red-600">Gurugram</span>
          </h2>
          <div className="h-1.5 w-32 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
        </div>

        {/* Scrollable Content */}
        <div className="relative group">
          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide py-4"
            style={{ width: '100%', scrollBehavior: 'smooth' }}
          >
            <div className="flex gap-4">
              {projects.map((project, index) => (
                <div key={index} className="flex-shrink-0 w-72">
                  <div
                    className="card-wrapper"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <Link to={project.link} className="card">
                      <div className="card-image-container">
                        <img
                          src={project.image}
                          alt={project.title}
                          fetchPriority="high"
                          className="card-image"
                          loading="lazy"
                        />
                        <div className="badge">{project.badge}</div>
                        <div className="title-overlay">
                          <h2 className="project-title">{project.title}</h2>
                        </div>
                        <div className="description-overlay">
                          <span className="project-description">{project.description}</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Gradient Overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/50 to-transparent z-[5] pointer-events-none"></div>

          {/* Next Button */}
          {projects.length > 0 && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-800 transition-colors duration-300 z-10 shadow-lg"
              aria-label="Next projects"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          )}
          
          {/* Previous Button */}
          {projects.length > 0 && showLeftButton && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-800 transition-colors duration-300 z-10 shadow-lg"
              aria-label="Previous projects"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
          )}
        </div>
      </div>
    </Wrapper>
  );
}

export default SpacesAvailable;

const Wrapper = styled.section`
  .container {
    max-width: 1250px;
    margin: auto;
    padding: 40px 20px;
  }

  .header-section {
    text-align: center;
    margin-bottom: 50px;
  }

  .main-heading {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 20px;
    line-height: 1.2;
    
    @media (min-width: 768px) {
      font-size: 3rem;
    }
    
    @media (min-width: 1024px) {
      font-size: 3.5rem;
    }
  }

  .dream-text {
    /* Unified brand color */
    color: #e53e3e;
  }

  .gurugram-text {
    /* Use same unified brand color */
    color: #e53e3e;
  }

  .subheading {
    font-size: 1.1rem;
    color: #666;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
    
    @media (min-width: 768px) {
      font-size: 1.2rem;
    }
  }

  .cards-grid {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .first-row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    
    @media (min-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
      gap: 25px;
    }
    
    @media (min-width: 1024px) {
      gap: 30px;
    }
  }

  .second-row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    
    @media (min-width: 768px) {
      grid-template-columns: repeat(4, 1fr);
      gap: 25px;
    }
    
    @media (min-width: 1024px) {
      gap: 30px;
    }
  }

  .card-wrapper {
    perspective: 1000px;
  }

  .card {
    display: block;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    overflow: hidden;
    text-decoration: none;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
  }

  .card:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 165, 0, 0.3);
  }

  .card-image-container {
    position: relative;
    height: 280px;
    overflow: hidden;
    
    @media (min-width: 768px) {
      height: 320px;
    }
  }

  .card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: none;
  }

  .card:hover .card-image {
    transform: none;
  }

  .badge {
    position: absolute;
    top: 15px;
    right: 15px;
    background: #e53e3e; /* unified brand color */
    color: white;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    box-shadow: 0 4px 12px rgba(229, 62, 62, 0.3);
  }

  .description-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.95));
    color: white;
    padding: 20px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 80px;
    box-sizing: border-box;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .card:hover .description-overlay {
    opacity: 1;
  }

  .card:hover .title-overlay {
    opacity: 0;
  }

  .title-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
    color: white;
    padding: 20px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 80px;
    box-sizing: border-box;
    transition: opacity 0.3s ease;
  }

  .project-title {
    font-size: 1.1rem;
    font-weight: 700;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9);
    color: white;
    margin: 0;
    line-height: 1.3;
    
    @media (min-width: 768px) {
      font-size: 1.2rem;
    }
  }

  .project-description {
    font-size: 0.9rem;
    font-weight: 300;
    color: white;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
    line-height: 1.5;
    max-width: 90%;
    margin: 0;
    
    @media (min-width: 768px) {
      font-size: 1rem;
    }
  }

  /* Mobile Responsive */
  @media (max-width: 767px) {
    .container {
      padding: 30px 15px;
    }
    
    .main-heading {
      font-size: 2rem;
    }
    
    .subheading {
      font-size: 1rem;
    }
    
    .first-row,
    .second-row {
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
    }
    
    .card-image-container {
      height: 220px;
    }
    
    .title-overlay {
      padding: 15px;
      min-height: 70px;
    }
    
    .project-title {
      font-size: 1rem;
    }

    .description-overlay {
      padding: 15px;
      min-height: 70px;
    }

    .project-description {
      font-size: 0.7rem;
    }
  }

  @media (max-width: 480px) {
    .first-row,
    .second-row {
      grid-template-columns: 1fr;
      gap: 20px;
    }
    
    .main-heading {
      font-size: 1.8rem;
    }
    
    .card-image-container {
      height: 250px;
    }
    
    .title-overlay {
      min-height: 80px;
    }

    .description-overlay {
      min-height: 80px;
    }
  }
`;
