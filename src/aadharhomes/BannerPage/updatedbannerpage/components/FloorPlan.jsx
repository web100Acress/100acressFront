import React, { useState, useRef, useEffect } from 'react';

const FloorPlan = ({ floorPlans = [], bhkDetails = [], onShowCallback = () => {}, projectName = '' }) => {
  const [isImageUnlocked, setIsImageUnlocked] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCurrentIndex((prev) => (prev === 0 ? floorPlans.length - 1 : prev - 1));
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCurrentIndex((prev) => (prev === floorPlans.length - 1 ? 0 : prev + 1));
    }
  };

  // Scroll selected card into view
  const scrollToSelectedCard = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const selectedCard = container.children[currentIndex + 1]; // +1 because first child is the h4
      
      if (selectedCard) {
        const containerHeight = container.clientHeight;
        const cardHeight = selectedCard.offsetHeight;
        const cardTop = selectedCard.offsetTop;
        const cardBottom = cardTop + cardHeight;
        
        // Center the selected card in the container
        const scrollTo = cardTop - (containerHeight / 2) + (cardHeight / 2);
        
        container.scrollTo({
          top: scrollTo,
          behavior: 'smooth'
        });
      }
    }
  };

  // Update scroll when currentIndex changes
  React.useEffect(() => {
    scrollToSelectedCard();
  }, [currentIndex]);

  // Handle mouse wheel events to prevent page scroll
  const handleWheel = (e) => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight;
      
      // Prevent page scroll only when container can scroll in the direction
      if ((e.deltaY < 0 && !isAtTop) || (e.deltaY > 0 && !isAtBottom)) {
        e.preventDefault();
      }
    }
  };

  // Handle arrow button clicks
  const handleArrowUp = () => {
    setCurrentIndex((prev) => (prev === 0 ? floorPlans.length - 1 : prev - 1));
  };

  const handleArrowDown = () => {
    setCurrentIndex((prev) => (prev === floorPlans.length - 1 ? 0 : prev + 1));
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

  // Navigation functions
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? floorPlans.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === floorPlans.length - 1 ? 0 : prev + 1));
  };

  if (!floorPlans || floorPlans.length === 0 || !floorPlans.some(plan => plan && plan.url)) {
    return null; // Don't render if no floor plans are available or no valid URLs
  }

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
        
        /* Additional scrollbar hiding for the gallery */
        #floorplan-gallery::-webkit-scrollbar {
          display: none;
        }
        #floorplan-gallery {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Smooth slide animation for floor plan transitions */
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .floor-plan-slide {
          animation: slideIn 0.5s ease-out;
        }

        /* Mobile swipeable cards */
        @media (max-width: 768px) {
          .mobile-scroll {
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
          }
          
          .mobile-scroll > * {
            scroll-snap-align: center;
          }
        }

        /* Premium glow animation */
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(201, 161, 74, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(201, 161, 74, 0.5);
          }
        }

        .premium-glow {
          animation: glow 2s ease-in-out infinite;
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
        <div className="text-center mb-8">
          <h3 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-3">
            Floor Plan{projectName ? ` of ${projectName}` : ''}
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-amber-500 rounded-full mx-auto mt-4 animate-pulse"></div>
          <p className="text-gray-300 text-sm mt-4 max-w-2xl mx-auto">
            Choose your ideal home configuration & explore detailed layouts
          </p>
        </div>

        <div className="bg-gray-800/30 p-8 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Left Side: Immersive Floor Plan Preview (70% width) */}
            <div className="lg:col-span-4 relative">
              <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 shadow-2xl">
                {/* Floor Plan Image */}
                <div className="relative h-[600px] overflow-hidden">
                  <img 
                    fetchPriority='high'
                    src={floorPlans[currentIndex].url} 
                    alt={`Floor plan ${currentIndex + 1} for ${bhkDetails[currentIndex]?.bhk_type || 'Project'}`}
                    className={`w-full h-full object-contain transition-all duration-1000 transform group-hover:scale-105 ${
                      isImageUnlocked ? '' : 'blur-lg'
                    }`}
                  />
                  
                  {/* Premium Glassmorphism Overlay with Vignette */}
                  {!isImageUnlocked && (
                    <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-black/90 backdrop-blur-md flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50 pointer-events-none"></div>
                      <div className="absolute inset-0 bg-gradient-to-l from-black/30 via-transparent to-black/30 pointer-events-none"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 pointer-events-none"></div>
                      
                      <div className="relative z-10 text-center space-y-8 px-8">
                        <div className="space-y-4">
                          <h4 className="text-white text-3xl md:text-4xl font-bold mb-4 leading-tight">
                            Unlock Detailed Floor Plans
                          </h4>
                          <p className="text-gray-200 text-lg max-w-lg mx-auto">
                            View complete layout, room sizes & utility spaces
                          </p>
                        </div>
                        
                        <button 
                          onClick={handleGetDetails}
                          className="border-2 border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black font-bold px-12 py-4 rounded-2xl transition-all duration-700 transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/50 flex items-center space-x-3 group relative overflow-hidden mx-auto"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <svg className="w-6 h-6 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span className="relative z-10 font-bold text-lg">View Floor Plan</span>
                        </button>
                        
                        <div className="flex items-center justify-center space-x-3 text-sm text-amber-300">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.994 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>No spam • RERA Approved • Instant Access</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side: Vertical List of Floor Plan Configurations (30% width) */}
            <div className="lg:col-span-1 relative">
              {/* Top gradient fade indicator */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-gray-800/30 to-transparent z-10 pointer-events-none"></div>
              
              {/* Bottom gradient fade indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-800/30 to-transparent z-10 pointer-events-none"></div>
              
              {/* Up Arrow Button */}
              <button
                onClick={handleArrowUp}
                className="absolute -top-10 right-16 z-30 hover:bg-amber-500 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-amber-500/40"
                aria-label="Previous configuration"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
              
              {/* Down Arrow Button */}
              <button
                onClick={handleArrowDown}
                className="absolute -bottom-10 right-16 z-30 hover:bg-amber-500 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-amber-500/40"
                aria-label="Next configuration"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div 
                ref={scrollContainerRef}
                className="space-y-4 overflow-hidden max-h-[600px] overflow-y-auto scrollbar-hide scroll-smooth focus:outline-none px-2"
                tabIndex={0}
                onKeyDown={handleKeyDown}
                onWheel={handleWheel}
                style={{ scrollBehavior: 'smooth' }}
              >              
              {floorPlans.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-full text-left transition-all duration-500 transform hover:scale-[1.02] rounded-2xl p-3 border ${
                    index === currentIndex 
                      ? 'bg-gradient-to-r from-gray-900/80 to-gray-800/80 border-2 border-amber-500 shadow-xl shadow-amber-500/30' 
                      : 'bg-gradient-to-r from-gray-800/40 to-gray-900/40 border border-gray-600/50 hover:border-amber-500/50 hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-start space-x-3">
                        {index === currentIndex && (
                          <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className={`font-bold text-sm transition-colors duration-300 ${
                            index === currentIndex ? 'text-white' : 'text-gray-200 group-hover:text-white'
                          }`}>
                            {bhkDetails[index]?.bhk_type || `Configuration ${index + 1}`}
                          </h3>
                          
                          {bhkDetails[index]?.bhk_Area && (
                            <div className="mt-2">
                              <span className={`text-xs font-bold px-3 py-1 rounded-full transition-all duration-300 inline-block ${
                                index === currentIndex 
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50' 
                                  : 'bg-gray-700/50 text-amber-400 group-hover:bg-amber-500/10 group-hover:text-amber-300 border border-amber-500/30'
                              }`}>
                                {bhkDetails[index].bhk_Area}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    
                  </div>
                </button>
              ))}
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
