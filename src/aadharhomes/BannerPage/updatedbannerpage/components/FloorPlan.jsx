import React, { useState, useEffect } from 'react';

const FloorPlan = ({ floorPlans = [], bhkDetails = [], onShowCallback = () => {}, projectName = '' }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isImageUnlocked, setIsImageUnlocked] = useState(false);

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Handle scroll position and arrow visibility
  useEffect(() => {
    const container = document.getElementById('tab-container');
    if (!container || bhkDetails.length <= 4) return;

    const updateArrows = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    };

    updateArrows();
    container.addEventListener('scroll', updateArrows);
    window.addEventListener('resize', updateArrows);

    return () => {
      container.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [bhkDetails.length]);

  // Mouse wheel scrolling
  const handleWheel = (e) => {
    const container = document.getElementById('tab-container');
    if (container && bhkDetails.length > 4) {
      e.preventDefault();
      container.scrollBy({ left: e.deltaY > 0 ? 100 : -100, behavior: 'smooth' });
    }
  };

  // Mouse drag scrolling
  const handleMouseDown = (e) => {
    const container = document.getElementById('tab-container');
    if (container && bhkDetails.length > 4) {
      setIsDragging(true);
      setStartX(e.pageX - container.offsetLeft);
      setScrollLeft(container.scrollLeft);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const container = document.getElementById('tab-container');
    if (container) {
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch scrolling for mobile
  const handleTouchStart = (e) => {
    const container = document.getElementById('tab-container');
    if (container && bhkDetails.length > 4) {
      setStartX(e.touches[0].pageX - container.offsetLeft);
      setScrollLeft(container.scrollLeft);
    }
  };

  const handleTouchMove = (e) => {
    if (!startX) return;
    const container = document.getElementById('tab-container');
    if (container) {
      const x = e.touches[0].pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchEnd = () => {
    setStartX(0);
  };

  // Handle form submission success - unlock images
  const handleFormSuccess = () => {
    const unlockKey = `floorplan_unlocked_${bhkDetails[0]?.bhk_type || 'default'}`;
    localStorage.setItem(unlockKey, 'true');
    setIsImageUnlocked(true);
  };

  // Handle get details button click
  const handleGetDetails = () => {
    onShowCallback(handleFormSuccess);
  };

  if (!floorPlans || floorPlans.length === 0 || !floorPlans.some(plan => plan && plan.url)) {
    return null; // Don't render if no floor plans are available or no valid URLs
  }

  const activePlan = floorPlans[activeTab];
  const activeBhkDetails = bhkDetails[activeTab];

  return (
    <>
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <section className="py-10 bg-black text-white relative overflow-hidden">
      {/* Background decorative lines */}
      <div className="absolute top-0 right-0 -z-0 opacity-20">
        <svg width="800" height="600" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M800 0C700 150 600 200 400 200S100 250 0 400V600h800V0z" fill="url(#grad)"/>
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#373737', stopOpacity: 0.5}} />
              <stop offset="100%" style={{stopColor: '#000000', stopOpacity: 0}} />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 relative">
        <div className="text-center mb-6">
          <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight mb-2">
            Floor Plan{projectName ? ` of ${projectName}` : ''}
          </h3>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-600 to-amber-500 rounded-full mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left Side: Image and Super Area */}
          <div className="lg:col-span-2">
            {/* Horizontal Scrollable Tab Bar */}
            <div className="relative mb-3 flex items-center">
              {/* Left Navigation Arrow */}
              <button
                onClick={() => {
                  const container = document.getElementById('tab-container');
                  if (container) {
                    container.scrollBy({ left: -200, behavior: 'smooth' });
                  }
                }}
                className={`flex-shrink-0 z-20 group ${
                  !showLeftArrow ? 'opacity-0 pointer-events-none scale-75' : 'opacity-100 scale-100'
                } transition-all duration-300`}
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full blur opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
                  <div className="relative  group-hover:bg-gray-800/95 text-amber-400 group-hover:text-amber-300 border-2 border-amber-500/40 group-hover:border-amber-400/60 rounded-full p-3 shadow-xl group-hover:shadow-amber-500/25 transition-all duration-300 backdrop-blur-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </div>
                </div>
              </button>

              {/* Scrollable Tab Container */}
              <div
                id="tab-container"
                className="flex items-center gap-3 overflow-x-auto scrollbar-hide flex-1 mx-4 rounded-full shadow-2xl backdrop-blur-md py-3"
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {bhkDetails.map((bhk, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`relative whitespace-nowrap px-7 py-3.5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                      activeTab === index
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xl shadow-amber-500/40 ring-2 ring-amber-400/50'
                        : 'bg-white/10 text-amber-300 border-2 border-amber-400/50 hover:border-amber-300 hover:bg-white/20 hover:text-amber-200 hover:shadow-lg hover:shadow-amber-400/20'
                    }`}
                    style={{
                      fontSize: 'clamp(0.875rem, 1vw, 1rem)',
                      minWidth: 'fit-content'
                    }}
                  >
                    {bhk.bhk_type}
                  </button>
                ))}
              </div>

              {/* Right Navigation Arrow */}
              <button
                onClick={() => {
                  const container = document.getElementById('tab-container');
                  if (container) {
                    container.scrollBy({ left: 200, behavior: 'smooth' });
                  }
                }}
                className={`flex-shrink-0 z-20 group ${
                  !showRightArrow ? 'opacity-0 pointer-events-none scale-75' : 'opacity-100 scale-100'
                } transition-all duration-300`}
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full blur opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
                  <div className="relative bg-gray-900/90 group-hover:bg-gray-800/95 text-amber-400 group-hover:text-amber-300 border-2 border-amber-500/40 group-hover:border-amber-400/60 rounded-full p-3 shadow-xl group-hover:shadow-amber-500/25 transition-all duration-300 backdrop-blur-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            </div>

            <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700 relative">
              {activePlan && (
                <>
                  <img 
                    src={activePlan.url} 
                    alt={`Floor plan for ${activeBhkDetails?.bhk_type}`}
                    className={`w-full h-auto object-contain rounded-md max-h-[400px] transition-all duration-500 ${
                      isImageUnlocked ? '' : 'blur-md'
                    }`}
                  />
                  
                  {/* Blur Overlay with Get Details Button */}
                  {!isImageUnlocked && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-md p-4">
                      <p className="text-white text-center text-sm sm:text-base md:text-lg font-medium">
                        To access the master layout, kindly{' '}
                        <button 
                          onClick={handleGetDetails}
                          className="text-blue-400 hover:text-blue-300 underline underline-offset-2 sm:underline-offset-4 decoration-1 sm:decoration-2 decoration-blue-400/80 hover:decoration-blue-300 transition-colors duration-200 font-medium text-sm sm:text-base md:text-lg whitespace-nowrap"
                        >
                          share your details
                        </button>
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>

            
          </div>

          {/* Right Side: CTA Block */}
          <div className="flex flex-col items-center lg:items-end">
            <div className="relative group w-full lg:w-80">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-amber-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-all duration-700"></div>
              
              <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
                {/* Header */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-2 4h2" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-amber-400 font-bold text-lg">Floor Plan Details</h4>
                    <p className="text-gray-400 text-sm">Get comprehensive information</p>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-300 text-sm">High-resolution floor plans</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-300 text-sm">Detailed room dimensions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-300 text-sm">3D visualization available</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-300 text-sm">Customization options</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button 
                  onClick={handleGetDetails}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/25 flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>Get Detailed Plans</span>
                </button>

                {/* Additional Info */}
                <p className="text-xs text-gray-400 text-center mt-3 leading-relaxed">
                  Unlock detailed floor plans and get personalized assistance from our experts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default FloorPlan;
