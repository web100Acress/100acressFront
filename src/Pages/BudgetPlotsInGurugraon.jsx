import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { EyeIcon } from "lucide-react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getBudgetPlots } from "../Utils/ProjectOrderData";

const BudgetPlotsInGurugraon = () => {
  const [budgetPlots, setBudgetPlots] = useState([]);
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
    const loadBudgetPlots = async () => {
      try {
        const plots = await getBudgetPlots();
        console.log('📊 Budget plots loaded:', plots);
        console.log('📸 Image URLs being used:');
        plots.forEach((plot, idx) => {
          console.log(`  ${idx + 1}. ${plot.title}:`, plot.image);
          console.log(`     - Thumbnail: ${plot.thumbnailImage}`);
          console.log(`     - Front: ${plot.frontImage}`);
        });
        setBudgetPlots(plots);
      } catch (error) {
        console.error('❌ Error loading budget plots:', error);
        setBudgetPlots([]);
      }
    };

    loadBudgetPlots();
  }, []);

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

  // Desktop view: show grid layout
  if (!isMobile) {
    return (
      <Wrapper className="section">
        <div data-aos="zoom-in-up" className="container" style={{ boxShadow: "0px 0px 0px 0px #0000001a" }}>
          <div className="relative flex flex-col items-center justify-center text-center mb-4 mt-6 px-4">
            <h2 className="text-3xl xl:text-4xl lg:text-3xl md:text-2xl font-extrabold mb-3 text-neutral-900">
                      <span className="bg-gradient-to-r from-[#f43f5e] to-[#dc2626] bg-clip-text text-transparent">Best Budget</span>
                      <span> Plots in Gurugram</span>
            </h2>
            <div className="h-1.5 w-32 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
          </div>
          <div className="grid  lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 mx-0 gap-3 lg:gap-4 pb-2 pt-3">
            {budgetPlots.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <div className="text-gray-500">Loading budget plots...</div>
              </div>
            ) : (
              budgetPlots.slice(0, 4).map((project, index) => (
                <Link to={project.link} key={index} className="card group" aria-label={project.title}>
                  <div className="card-image-wrapper">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="card-image transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '../../Images/logo.png';
                      }}
                    />
                  </div>
                  <button className="card-button bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-500/30 transition-all duration-300">{project.title}</button>
                </Link>
              ))
            )}
          </div>
        </div>
      </Wrapper>
    );
  }

  // Mobile view: show horizontal scrolling
  return (
    <Wrapper className="section">
      <div data-aos="zoom-in-up" className="container" style={{ boxShadow: "0px 0px 0px 0px #0000001a" }}>
        <div className="relative flex flex-col items-center justify-center text-center mb-4 mt-6 px-4">
          <h2 className="text-3xl xl:text-4xl lg:text-3xl md:text-2xl font-extrabold mb-3 text-neutral-900">
                    <span className="bg-gradient-to-r from-[#f43f5e] to-[#dc2626] bg-clip-text text-transparent">Best Budget</span>
                    <span> Plots in Gurugram</span>
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
            <div className="flex gap-3">
              {budgetPlots.length === 0 ? (
                <div className="text-center py-8 px-4">
                  <div className="text-gray-500">Loading budget plots...</div>
                </div>
              ) : (
                budgetPlots.map((project, index) => (
                  <div key={index} className="flex-shrink-0 w-64">
                    <Link to={project.link} className="card group" aria-label={project.title}>
                      <div className="card-image-wrapper">
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          className="card-image transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '../../Images/logo.png';
                          }}
                        />
                      </div>
                      <button className="card-button bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-500/30 transition-all duration-300">{project.title}</button>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
          
          {/* Right Gradient Overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/50 to-transparent z-[5] pointer-events-none"></div>

          {/* Next Button */}
          {budgetPlots.length > 0 && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-700 rounded-full w-10 h-10 flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all duration-300 z-10 shadow-lg border border-gray-200"
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
          {budgetPlots.length > 0 && showLeftButton && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-700 rounded-full w-10 h-10 flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all duration-300 z-10 shadow-lg border border-gray-200"
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
};

export default BudgetPlotsInGurugraon;

const Wrapper = styled.section`
  .container {
    max-width: 1250px;
    margin: auto;
    padding: 10px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
  }

  .view-all {
    text-decoration: none;
    font-size: 1rem;
    color: #ff0000;
    font-weight: 600;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }

  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #e5e7eb; /* gray-200 */
    border-radius: 12px;
    overflow: hidden;
    text-decoration: none;
    background: #fff;
    padding: 12px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  }

  .card:hover {
    transform: translateY(-3px);
    border-color: #dc2626; /* red-600 */
    box-shadow: 0px 8px 16px rgba(220, 38, 38, 0.18);
  }

  .card-image-wrapper {
    width: 100%;
    overflow: hidden;
    border-radius: 10px;
    display: block;
  }

  .card-image {
    width: 100%;
    height: 176px; /* ~h-44 */
    object-fit: cover;
    border-radius: 10px;
    display: block;
  }

  .card-button {
    width: 100%;
    margin-top: 10px;
    border-radius: 10px;
    padding: 10px 0px; /* ~py-3 */
    color: white;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    cursor: pointer;
    text-transform: capitalize;
    transition: all 0.3s ease;
  }

  .card-button:hover {
    transform: translateY(-2px);
    box-shadow: 0px 4px 12px rgba(255, 153, 51, 0.3);
  }

  @media (max-width: 768px) {
    .title {
      font-size: 1.25rem;
    }

    .card-image-wrapper {
      display: block;
    }

    .card-image {
      height: 160px; /* slightly tighter but keeps aspect */
      display: block;
    }

    .card-button {
      font-size: 0.9rem;
    }
  }
`;
//   <div className="hidden sm:block">
//     <Link to="/plots-in-gurugram/" target="_top">
//     <span className="flex items-center text-white text-sm px-3 py-0 rounded-full bg-red-600">
//       <ScaleLoader color="#FFFFFF" height={20} width={3} />
//       <span className="ml-2">View All</span>
//     </span>
//     </Link>
//   </div>
// </div>

// <div className="grid  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 grid-cols-1 mx-11 gap-3 pb-5 pt-3 ">
//   <Link to={`/signatureglobal-plots-gurugram/`} target="_top">
//     <div className="relative border border-gray-200 rounded-lg dark:border-neutral-700 overflow-hidden group">
//       <img
//         src="../../Images/signatureimge.webp"
//         className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
//       />
//       <div className="absolute inset-0 bg-black opacity-30"></div>
//       <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-2xl text-center whitespace-nowrap">
//         Signature  <br />
//         <span className="block w-full">Sidhrawali Plots</span>
//       </h3>
//     </div>
//   </Link>

//   <Link to={`/bptp-plots-gurugram/`} target="_top">
//     <div className="relative border border-gray-200 rounded-lg dark:border-neutral-700 overflow-hidden group">
//       <img
//         src="../../Images/bptp.webp"
//         className="w-full  h-40 object-cover transition-transform duration-300 group-hover:scale-110"
//       />
//       <div className="absolute inset-0 bg-black opacity-30"></div>
//       <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-center text-2xl">
//         BPTP Limited
//       </h3>
//     </div>
//   </Link>

//   <Link to={`/orris-plots-gurugram/`} target="_top">
//     <div className="relative border border-gray-200 rounded-lg dark:border-neutral-700 overflow-hidden group">
//       <img
//         src="../../Images/Orris.webp"
//         className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
//       />
//       <div className="absolute inset-0 bg-black opacity-30"></div>
//       <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-center text-2xl">
//         ORRIS Group
//       </h3>
//     </div>
//   </Link>

//   <Link to={`/jms-plots-gurugram/`} target="_top">
//     <div className="relative border border-gray-200 rounded-lg dark:border-neutral-700 overflow-hidden group">
//       <img
//         src="../../Images/jms.webp"
//         className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
//       />
//       <div className="absolute inset-0 bg-black opacity-30"></div>
//       <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-center text-2xl">
//         JMS Group
//       </h3>
//     </div>
//   </Link>

//   {/* <Link to={`/rof-plots-gurugram/`} target="_top">
//     <div className="relative border border-gray-200 rounded-lg dark:border-neutral-700 overflow-hidden group">
//       <img
//         src="../../Images/rof.webp"
//         className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
//       />
//       <div className="absolute inset-0 bg-black opacity-30"></div>
//       <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-center text-3xl">
//         ROF Group
//       </h3>
//     </div>
//   </Link> */}
// </div>
// </div>