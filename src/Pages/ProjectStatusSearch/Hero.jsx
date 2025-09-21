import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { gradients, tokens } from './DesignTokens';

export default function Hero({ 
  onExplore, 
  onContact, 
  onSearch, 
  title = 'Project Status Search', 
  subtitle = 'Premium projects crafted with quality, sustainability, and exceptional after‑sales service.',
  onFilterChange,
  filters = {},
  projectStatus = 'upcoming'
}) {
  // Enhanced background with city skyline and gradient overlay
  const bgStyle = useMemo(() => ({
    background: `linear-gradient(135deg, rgba(211, 47, 47, 0.9) 0%, rgba(183, 28, 28, 0.8) 50%, rgba(139, 69, 19, 0.7) 100%), url('/Images/mainbg.webp') center/cover no-repeat`,
    position: 'relative'
  }), []);
  
  const [text, setText] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  
  // Animated placeholder text
  const placeholderTexts = [
    "Search Gurgaon, Delhi, Mumbai...",
    "Find properties in Noida, Bangalore...",
    "Discover homes in Pune, Chennai...",
    "Explore projects in Hyderabad, Kolkata..."
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholderTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex <= placeholderTexts[placeholderIndex].length) {
        setPlaceholder(placeholderTexts[placeholderIndex].slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 50);
    return () => clearInterval(typeInterval);
  }, [placeholderIndex]);
  
  const handleSearch = useCallback(() => {
    const q = (text || '').trim();
    if (onSearch && q) onSearch(q);
  }, [text, onSearch]);
  
  // Dynamic headlines based on project status
  const getDynamicTitle = () => {
    switch(projectStatus) {
      case 'upcoming': return 'Discover Upcoming Projects Across India';
      case 'newlaunch': return 'Find Premium Homes Designed for Your Lifestyle';
      case 'underconstruction': return 'Explore Under Construction Properties';
      case 'readytomove': return 'Ready to Move Properties Available Now';
      default: return title;
    }
  };
  
  const getDynamicSubtitle = () => {
    switch(projectStatus) {
      case 'upcoming': return 'Be the first to invest in tomorrow\'s most promising developments';
      case 'newlaunch': return 'Experience luxury living with modern amenities and prime locations';
      case 'underconstruction': return 'Track progress and secure your dream home as it\'s being built';
      case 'readytomove': return 'Move in immediately and start living your dream lifestyle';
      default: return subtitle;
    }
  };

  return (
    <section className="relative w-full min-h-[30vh] flex items-center mt-16" style={bgStyle}>
      {/* Animated particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-white/30 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-white/15 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 right-1/4 w-0.5 h-0.5 bg-white/25 rounded-full animate-pulse"></div>
      </div>
      
      <div className="absolute inset-0" style={{backdropFilter: 'blur(1px)'}} />
              <div className="relative max-w-screen-xl mx-auto px-3 sm:px-4 md:px-6 py-3 md:py-4 text-white w-full">
                <div className="mx-auto text-center">
                  <h1
                    className="mt-2 md:mt-4 font-extrabold leading-tight font-['Poppins','Inter',sans-serif] mb-2 md:mb-3 px-2"
                    style={{ fontSize: 'clamp(18px, 4vw, 36px)' }}
                  >
                    {getDynamicTitle()}
                  </h1>
                  <p className="mt-2 text-white/90 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2">
                    {getDynamicSubtitle()}
                  </p>
                </div>

                {/* Enhanced Search Bar with Filters */}
                <div className="mt-3 md:mt-4 max-w-4xl mx-auto px-2">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/30 shadow-lg">
                    <div className="flex flex-col gap-3">
                      {/* Main Search Input */}
                      <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-gray-200 shadow-sm">
                        <span className="text-gray-400 text-lg mr-2">🔎</span>
                        <input
                          placeholder={placeholder}
                          className="flex-1 outline-none text-gray-800 placeholder-gray-400 text-sm sm:text-base"
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
                        />
                        <button 
                          onClick={handleSearch} 
                          className="ml-2 px-3 sm:px-4 py-2 rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                          style={{background: 'linear-gradient(135deg, #D32F2F 0%, #B71C1C 100%)'}}
                        >
                          Search
                        </button>
                      </div>
                      
                      {/* Quick Filters - Mobile Responsive */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        <select
                          className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 font-medium shadow-sm hover:shadow-md transition-all duration-200 text-sm"
                          value={filters.city || ''}
                          onChange={(e) => onFilterChange?.('city', e.target.value)}
                        >
                          <option value="">All Cities</option>
                          <option value="Gurugram">Gurugram</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Mumbai">Mumbai</option>
                          <option value="Bangalore">Bangalore</option>
                          <option value="Pune">Pune</option>
                        </select>
                        
                        <select
                          className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 font-medium shadow-sm hover:shadow-md transition-all duration-200 text-sm"
                          value={filters.price || ''}
                          onChange={(e) => onFilterChange?.('price', e.target.value)}
                        >
                          <option value="">All Prices</option>
                          <option value="0,1">Under 1 Cr</option>
                          <option value="1,5">1-5 Cr</option>
                          <option value="5,10">5-10 Cr</option>
                          <option value="10,20">10-20 Cr</option>
                          <option value="20,Infinity">Above 20 Cr</option>
                        </select>
                        
                        <select
                          className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 font-medium shadow-sm hover:shadow-md transition-all duration-200 text-sm sm:col-span-2 lg:col-span-1"
                          value={filters.projectType || ''}
                          onChange={(e) => onFilterChange?.('projectType', e.target.value)}
                        >
                          <option value="">All Types</option>
                          <option value="Residential Flats">Residential Flats</option>
                          <option value="Villas">Villas</option>
                          <option value="Commercial Property">Commercial</option>
                          <option value="Builder Floors">Builder Floors</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
        
        
        {/* Scroll Down Arrow */}
        <div className="mt-1 flex justify-center">
          <div className="animate-bounce">
            <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
