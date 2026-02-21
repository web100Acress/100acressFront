import React, { useState, useRef, useEffect } from 'react';

const DesktopFloorPlan = ({ floorPlans = [], bhkDetails = [], onShowCallback = () => {}, projectName = '' }) => {
  const [isImageUnlocked, setIsImageUnlocked] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const scrollContainerRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCurrentIndex((prev) => (prev === 0 ? floorPlans.length - 1 : prev - 1));
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCurrentIndex((prev) => (prev === floorPlans.length - 1 ? 0 : prev + 1));
    }
  };

  const scrollToSelectedCard = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const selectedCard = container.children[currentIndex + 1];
      if (selectedCard) {
        const containerHeight = container.clientHeight;
        const cardHeight = selectedCard.offsetHeight;
        const cardTop = selectedCard.offsetTop;
        const scrollTo = cardTop - (containerHeight / 2) + (cardHeight / 2);
        container.scrollTo({ top: scrollTo, behavior: 'smooth' });
      }
    }
  };

  React.useEffect(() => {
    scrollToSelectedCard();
  }, [currentIndex]);

  const handleFormSuccess = () => {
    const unlockKey = `floorplan_unlocked_${bhkDetails[0]?.bhk_type || 'default'}`;
    localStorage.setItem(unlockKey, 'true');
    setIsImageUnlocked(true);
  };

  const handleGetDetails = () => {
    onShowCallback(handleFormSuccess);
  };

  const goToPrevious = () => {
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 400);
    setCurrentIndex((prev) => (prev === 0 ? floorPlans.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 400);
    setCurrentIndex((prev) => (prev === floorPlans.length - 1 ? 0 : prev + 1));
  };

  if (!floorPlans || floorPlans.length === 0 || !floorPlans.some(plan => plan && plan.url)) {
    return null;
  }

  return (
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
                    src={floorPlans[currentIndex]?.url} 
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
                            Get exclusive access to detailed layouts, dimensions & specifications
                          </p>
                        </div>
                        
                        <button
                          onClick={handleGetDetails}
                          className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-black font-bold py-4 px-8 rounded-full shadow-2xl hover:shadow-amber-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 mx-auto"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Get Instant Access
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation Controls */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/60 backdrop-blur-md rounded-full px-4 py-2">
                  <button
                    onClick={goToPrevious}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-300"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <span className="text-white text-sm font-medium mx-3">
                    {currentIndex + 1} / {floorPlans.length}
                  </span>
                  <button
                    onClick={goToNext}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-300"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side: BHK Configuration Cards (30% width) */}
            <div className="lg:col-span-1">
              <div className="space-y-4">
                <h4 className="text-white font-bold text-lg mb-4">Available Configurations</h4>
                
                <div 
                  ref={scrollContainerRef}
                  className="space-y-3 max-h-[500px] overflow-y-auto scrollbar-hide"
                  onKeyDown={handleKeyDown}
                  tabIndex={0}
                >
                  {bhkDetails.map((bhk, index) => (
                    <div
                      key={index}
                      onClick={() => { setCurrentIndex(index); setIsTransitioning(true); setTimeout(() => setIsTransitioning(false), 400); }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                        index === currentIndex
                          ? 'bg-gradient-to-r from-amber-600/20 to-amber-700/20 border-amber-500/50 shadow-lg shadow-amber-500/20 scale-105'
                          : 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-700/70 hover:border-gray-600/50 hover:scale-102'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-white font-bold text-lg mb-2">
                          {bhk.bhk_type}
                        </div>
                        <div className="text-gray-300 text-sm mb-3">
                          {bhk.bhk_Area && (
                            <span>
                              {bhk.bhk_Area}
                            </span>
                          )}
                        </div>
                        <div className={`text-xs font-medium px-3 py-1 rounded-full inline-block ${
                          index === currentIndex
                            ? 'bg-amber-500 text-black'
                            : 'bg-gray-700 text-gray-300'
                        }`}>
                          {index === currentIndex ? 'SELECTED' : 'SELECT'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default DesktopFloorPlan;