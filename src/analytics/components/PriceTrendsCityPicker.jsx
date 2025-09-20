import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function PriceTrendsCityPicker({
  compareMode,
  setCompareMode,
  selectedCities,
  setSelectedCities,
  cityQuery,
  setCityQuery,
  visibleCities,
  cityImages,
  pickerLoading,
  onChooseCity,
}) {
  const toggleCitySelect = (cname) => {
    setSelectedCities((list) => list.includes(cname) ? list.filter(c=>c!==cname) : [...list, cname]);
  };

  // Landmark images per city with famous landmarks
  const landmarkImages = useMemo(() => ({
    // Delhi NCR Region
    Gurugram: "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    Gurgaon: "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    Noida: "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    Delhi: "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    "Dwarka Expressway": "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    Ghaziabad: "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    Faridabad: "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    "New Delhi": "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    Dwarka: "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    "Greater Noida": "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    
    // Mumbai Region
    Mumbai: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    "Navi Mumbai": "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    Thane: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    
    // South India
    Bengaluru: "https://images.unsplash.com/photo-1529074963764-98f45c47344b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    Bangalore: "https://images.unsplash.com/photo-1529074963764-98f45c47344b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    Chennai: "https://images.unsplash.com/photo-1581532760111-12d3e1b5e1b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    Hyderabad: "https://images.unsplash.com/photo-1581852053321-8f2b309a52cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    
    // West India
    Pune: "https://images.unsplash.com/photo-1608248543803-ba780c3a218d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    Ahmedabad: "https://images.unsplash.com/photo-1608248543803-ba780c3a218d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    Surat: "https://images.unsplash.com/photo-1608248543803-ba780c3a218d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    
    // North India
    Jaipur: "https://images.unsplash.com/photo-1608248543803-ba780c3a218d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    Chandigarh: "https://images.unsplash.com/photo-1608248543803-ba780c3a218d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    Lucknow: "https://images.unsplash.com/photo-1608248543803-ba780c3a218d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    
    // Central India
    Indore: "https://images.unsplash.com/photo-1608248543803-ba780c3a218d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    
    // East India
    Kolkata: "https://images.unsplash.com/photo-1608248543803-ba780c3a218d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  }), []);

  // Fallback city image
  const fallbackImage = "https://images.unsplash.com/photo-1480714378408-67c1b0e28bf0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80";

  // Generate a city image URL based on the city name
  const buildS3Image = (name) => {
    const cityName = String(name).trim().toLowerCase();
    
    // Return appropriate image based on city region
    if (cityName.includes('gurugram') || cityName.includes('gurgaon') || 
        cityName.includes('noida') || cityName.includes('delhi') || 
        cityName.includes('ghaziabad') || cityName.includes('faridabad') ||
        cityName.includes('dwarka') || cityName.includes('greater noida')) {
      return "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80";
    }
    
    if (cityName.includes('mumbai') || cityName.includes('thane') || cityName.includes('navi mumbai')) {
      return "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80";
    }
    
    if (cityName.includes('bengaluru') || cityName.includes('bangalore') || 
        cityName.includes('chennai') || cityName.includes('hyderabad')) {
      return "https://images.unsplash.com/photo-1529074963764-98f45c47344b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80";
    }
    
    // Default fallback
    return fallbackImage;
  };

  const getCityImage = (cname) => {
    // Normalize keys to match common names
    const key = cname in cityImages ? cname : (landmarkImages[cname] ? cname : null);
    if (key) return cityImages[key] || landmarkImages[key] || buildS3Image(cname) || fallbackImage;
    // Try loose matches
    const lc = String(cname).toLowerCase();
    if (lc.includes('gurugram') || lc.includes('gurgaon')) return cityImages[cname] || landmarkImages.Gurgaon || buildS3Image(cname) || fallbackImage;
    if (lc.includes('noida')) return cityImages[cname] || landmarkImages.Noida || buildS3Image(cname) || fallbackImage;
    if (lc.includes('delhi')) return cityImages[cname] || landmarkImages.Delhi || buildS3Image(cname) || fallbackImage;
    if (lc.includes('dwarka')) return cityImages[cname] || landmarkImages["Dwarka Expressway"] || buildS3Image(cname) || fallbackImage;
    if (lc.includes('ghaziabad')) return cityImages[cname] || landmarkImages.Ghaziabad || buildS3Image(cname) || fallbackImage;
    if (lc.includes('faridabad')) return cityImages[cname] || landmarkImages.Faridabad || buildS3Image(cname) || fallbackImage;
    return cityImages[cname] || buildS3Image(cname) || fallbackImage;
  };

  // Enhanced responsive breakpoints for better screen ratio support
  const [perPage, setPerPage] = useState(12);
  const [expanded, setExpanded] = useState(false);
  const [screenSize, setScreenSize] = useState('lg');
  const [gridCols, setGridCols] = useState(6);

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      // Account for sidebar width (260px) on larger screens
      const availableWidth = width >= 768 ? width - 260 : width;
      
      if (availableWidth < 320) {
        setScreenSize('xs');
        setPerPage(4); // 1x4 grid
        setGridCols(1);
      } else if (availableWidth < 480) {
        setScreenSize('xs');
        setPerPage(6); // 2x3 grid
        setGridCols(2);
      } else if (availableWidth < 640) {
        setScreenSize('sm');
        setPerPage(9); // 3x3 grid
        setGridCols(3);
      } else if (availableWidth < 768) {
        setScreenSize('md');
        setPerPage(12); // 4x3 grid
        setGridCols(4);
      } else if (availableWidth < 1024) {
        setScreenSize('lg');
        setPerPage(15); // 5x3 grid
        setGridCols(5);
      } else if (availableWidth < 1280) {
        setScreenSize('xl');
        setPerPage(18); // 6x3 grid
        setGridCols(6);
      } else {
        setScreenSize('2xl');
        setPerPage(24); // 6x4 grid
        setGridCols(6);
      }
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  const displayedCities = useMemo(() => {
    if (expanded) return visibleCities;
    return Array.isArray(visibleCities) ? visibleCities.slice(0, perPage) : [];
  }, [expanded, perPage, visibleCities]);

  // Quick filter chips for popular cities
  const popularChips = useMemo(() => (
    [
      'Gurgaon', 'Noida', 'Delhi', 'Mumbai', 'Pune', 'Bengaluru', 'Hyderabad', 'Chennai', 'Kolkata', 'Ghaziabad', 'Faridabad', 'Dwarka Expressway'
    ]
  ), []);

  // Sections: NCR vs Metros
  const ncrNames = useMemo(() => (
    [
      'Gurgaon','Gurugram','Noida','Greater Noida','Delhi','New Delhi','Ghaziabad','Faridabad','Dwarka','Dwarka Expressway'
    ]
  ), []);
  const metroNames = useMemo(() => (
    ['Mumbai','Navi Mumbai','Pune','Bengaluru','Bangalore','Chennai','Hyderabad','Kolkata','Ahmedabad','Jaipur','Chandigarh','Lucknow','Indore','Surat','Thane']
  ), []);

  const inList = (name, list) => list.some(n => n.toLowerCase() === String(name).toLowerCase());

  const ncrCities = useMemo(() => (displayedCities || []).filter(c => inList(c, ncrNames)), [displayedCities, ncrNames]);
  const metroCities = useMemo(() => (displayedCities || []).filter(c => inList(c, metroNames)), [displayedCities, metroNames]);
  const otherCities = useMemo(() => (displayedCities || []).filter(c => !inList(c, ncrNames) && !inList(c, metroNames)), [displayedCities, ncrNames, metroNames]);

  // Enhanced badges with better colors and styling
  const cityBadges = useMemo(() => ({
    'Gurgaon': { label: 'Hot', color: 'bg-gradient-to-r from-amber-500 to-orange-500', textColor: 'text-white' },
    'Gurugram': { label: 'Hot', color: 'bg-gradient-to-r from-amber-500 to-orange-500', textColor: 'text-white' },
    'Noida': { label: 'Hot', color: 'bg-gradient-to-r from-amber-500 to-orange-500', textColor: 'text-white' },
    'Greater Noida': { label: 'Hot', color: 'bg-gradient-to-r from-amber-500 to-orange-500', textColor: 'text-white' },
    'Delhi': { label: 'Prime', color: 'bg-gradient-to-r from-rose-600 to-pink-600', textColor: 'text-white' },
    'New Delhi': { label: 'Prime', color: 'bg-gradient-to-r from-rose-600 to-pink-600', textColor: 'text-white' },
    'Mumbai': { label: 'New', color: 'bg-gradient-to-r from-blue-600 to-cyan-600', textColor: 'text-white' },
    'Navi Mumbai': { label: 'Hot', color: 'bg-gradient-to-r from-amber-500 to-orange-500', textColor: 'text-white' },
    'Pune': { label: 'Trending', color: 'bg-gradient-to-r from-emerald-600 to-green-600', textColor: 'text-white' },
    'Bengaluru': { label: 'IT Hub', color: 'bg-gradient-to-r from-purple-600 to-indigo-600', textColor: 'text-white' },
    'Bangalore': { label: 'IT Hub', color: 'bg-gradient-to-r from-purple-600 to-indigo-600', textColor: 'text-white' },
    'Hyderabad': { label: 'Hot', color: 'bg-gradient-to-r from-amber-500 to-orange-500', textColor: 'text-white' },
    'Chennai': { label: 'Coastal', color: 'bg-gradient-to-r from-cyan-600 to-blue-600', textColor: 'text-white' },
    'Kolkata': { label: 'Cultural', color: 'bg-gradient-to-r from-indigo-600 to-purple-600', textColor: 'text-white' },
  }), []);

  const [imageErrors, setImageErrors] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);

  const renderCard = (cname) => {
    const imageUrl = getCityImage(cname);
    const hasError = imageErrors[cname];
    const isSelected = compareMode && selectedCities.includes(cname);
    const isHovered = hoveredCard === cname;
    
    return (
      <div
        key={cname}
        className={`group relative transition-all duration-300 ease-out transform ${
          isHovered ? 'scale-105' : 'scale-100'
        }`}
        onMouseEnter={() => setHoveredCard(cname)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <button 
          onClick={() => compareMode ? toggleCitySelect(cname) : onChooseCity(cname, false)} 
          className={`relative w-full bg-white border-2 rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-6 text-left shadow-lg hover:shadow-2xl transition-all duration-300 ease-out flex flex-col items-center gap-2 sm:gap-3 lg:gap-4 group-hover:border-blue-300 ${
            isSelected 
              ? 'border-blue-500 ring-2 sm:ring-4 ring-blue-100 shadow-blue-200' 
              : 'border-gray-200 hover:border-gray-300'
          }`} 
          aria-label={`Select ${cname}`} 
          title={`Property Rates in ${cname}`}
        >
          {/* Enhanced image container with better styling */}
          <div className="relative inline-flex w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28 rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-inner ring-2 sm:ring-4 ring-white">
            {!hasError ? (
              <img
                key={imageUrl}
                alt={cname}
                loading="lazy"
                src={imageUrl}
                onError={() => setImageErrors(prev => ({ ...prev, [cname]: true }))}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 text-gray-600">
                <span className="text-sm text-center p-2 font-medium">{cname}</span>
              </div>
            )}
            
            {/* Enhanced selection indicator */}
            {isSelected && (
              <div className="absolute inset-0 bg-blue-500 bg-opacity-20 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced badge styling */}
          {cityBadges[cname] && (
            <div className={`absolute top-2 left-2 sm:top-3 sm:left-3 lg:top-4 lg:left-4 ${cityBadges[cname].color} ${cityBadges[cname].textColor} text-[10px] sm:text-xs px-2 py-1 sm:px-3 sm:py-1.5 rounded-full font-bold shadow-lg backdrop-blur-sm`}>
              {cityBadges[cname].label}
            </div>
          )}

          {/* Enhanced text content */}
          <div className="text-center space-y-1 sm:space-y-2">
            <h3 className="font-bold text-sm sm:text-lg lg:text-xl text-gray-900 group-hover:text-blue-700 transition-colors duration-200">
              {cname}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 font-medium">
              Property Rates & Trends
            </p>
          </div>

          {/* Enhanced compare mode UI */}
          {compareMode && (
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700 bg-gray-50 px-2 py-1 sm:px-3 sm:py-2 rounded-full">
              <input 
                type="checkbox" 
                readOnly 
                checked={isSelected} 
                className="w-3 h-3 sm:w-4 sm:h-4 rounded text-blue-600 focus:ring-blue-500 focus:ring-2" 
              /> 
              <span className="font-medium text-[10px] sm:text-xs">Select for comparison</span>
            </div>
          )}

          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Hero Banner Section */}
      <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[75vh] lg:h-[80vh] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80"
            alt="Real Estate Analytics"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-6 leading-tight">
              Find Property Trends That
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Match Your Investment Goals
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
              Discover real-time property price trends, rental yields, and market insights across India's top cities
            </p>
            
            {/* Search Bar */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-2xl max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input 
                    value={cityQuery} 
                    onChange={(e)=>setCityQuery(e.target.value)} 
                    className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl bg-white shadow-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:outline-none transition-all duration-200" 
                    placeholder="Search for your city..." 
                    aria-label="Search city" 
                  />
                </div>
                <button 
                  onClick={() => {
                    if (cityQuery.trim()) {
                      onChooseCity(cityQuery.trim(), false);
                    }
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Analyze Trends
                </button>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">50+</div>
                <div className="text-sm sm:text-base text-gray-200">Cities Covered</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">10K+</div>
                <div className="text-sm sm:text-base text-gray-200">Localities Analyzed</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">Real-time</div>
                <div className="text-sm sm:text-base text-gray-200">Price Updates</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">5Y</div>
                <div className="text-sm sm:text-base text-gray-200">Trend Analysis</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 pl-4 md:pl-[276px] lg:pl-[276px] xl:pl-[276px]">
        {/* Enhanced Header */}
        <header className="mb-6 sm:mb-8 lg:mb-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6">
            <div className="space-y-2 sm:space-y-3">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-gray-900 tracking-tight bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                Select a city
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 font-medium">
                Discover property rates & price trends across India
              </p>
            </div>
            
            {/* Enhanced Compare Mode Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full lg:w-auto">
              <label className="inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium text-gray-700 bg-white px-3 py-2 sm:px-4 sm:py-3 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-colors cursor-pointer w-full sm:w-auto">
                <input 
                  type="checkbox" 
                  checked={compareMode} 
                  onChange={(e)=>{ setCompareMode(e.target.checked); setSelectedCities([]); }} 
                  className="w-4 h-4 sm:w-5 sm:h-5 rounded text-blue-600 focus:ring-blue-500 focus:ring-2" 
                /> 
                <span>Compare cities</span>
              </label>
              
              {compareMode && (
                <div className="flex items-center gap-2 sm:gap-3 bg-white px-3 py-2 sm:px-4 sm:py-3 rounded-xl border-2 border-blue-200 shadow-lg w-full sm:w-auto">
                  <span className="text-xs sm:text-sm text-gray-700 font-medium">
                    Selected: <span className="font-bold text-blue-600 text-sm sm:text-lg">{selectedCities.length}</span>
                  </span>
                  <button 
                    disabled={selectedCities.length<2} 
                    onClick={()=>{ onChooseCity(null, true); }} 
                    className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                      selectedCities.length<2 
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                    }`}
                  >
                    <span className="hidden sm:inline">Compare Now</span>
                    <span className="sm:hidden">Compare</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Enhanced Search Section */}
        <div className="mb-6 sm:mb-8">
          <div className="relative w-full max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
              <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              value={cityQuery} 
              onChange={(e)=>setCityQuery(e.target.value)} 
              className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 text-sm sm:text-base lg:text-lg border-2 border-gray-200 rounded-xl sm:rounded-2xl bg-white shadow-lg focus:ring-2 sm:focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:outline-none transition-all duration-200" 
              placeholder="Search for your city..." 
              aria-label="Search city" 
            />
          </div>
        </div>

        {/* Enhanced Popular Cities Chips */}
        <div className="mb-6 sm:mb-8">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Popular Cities</h3>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {popularChips.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => setCityQuery(chip)}
                className="px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full border-2 border-gray-200 bg-white text-xs sm:text-sm font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                aria-label={`Filter by ${chip}`}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Loading State */}
        {pickerLoading ? (
          <div className="space-y-8">
            <div className={`grid gap-4 sm:gap-6 ${
              gridCols === 1 ? 'grid-cols-1' :
              gridCols === 2 ? 'grid-cols-2' :
              gridCols === 3 ? 'grid-cols-3' :
              gridCols === 4 ? 'grid-cols-4' :
              gridCols === 5 ? 'grid-cols-5' :
              'grid-cols-6'
            }`}>
              {Array.from({length: perPage}).map((_,i)=> (
                <div key={i} className="bg-white border-2 border-gray-200 rounded-3xl p-4 sm:p-6 shadow-lg animate-pulse">
                  <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gray-200 mx-auto mb-4" />
                  <div className="h-4 sm:h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
                  <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/2 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-8 sm:space-y-12">
            {/* NCR Cities Section */}
            {ncrCities.length > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-4 sm:mb-6">
                  <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-800 uppercase tracking-wider">
                    Popular in NCR
                  </h2>
                </div>
                <div className={`grid gap-4 sm:gap-6 ${
                  gridCols === 1 ? 'grid-cols-1' :
                  gridCols === 2 ? 'grid-cols-2' :
                  gridCols === 3 ? 'grid-cols-3' :
                  gridCols === 4 ? 'grid-cols-4' :
                  gridCols === 5 ? 'grid-cols-5' :
                  'grid-cols-6'
                }`}>
                  {ncrCities.map(renderCard)}
                </div>
              </section>
            )}

            {/* Metro Cities Section */}
            {metroCities.length > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-4 sm:mb-6">
                  <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-emerald-600 to-green-600 rounded-full"></div>
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-800 uppercase tracking-wider">
                    Metro Cities
                  </h2>
                </div>
                <div className={`grid gap-4 sm:gap-6 ${
                  gridCols === 1 ? 'grid-cols-1' :
                  gridCols === 2 ? 'grid-cols-2' :
                  gridCols === 3 ? 'grid-cols-3' :
                  gridCols === 4 ? 'grid-cols-4' :
                  gridCols === 5 ? 'grid-cols-5' :
                  'grid-cols-6'
                }`}>
                  {metroCities.map(renderCard)}
                </div>
              </section>
            )}

            {/* Other Cities Section */}
            {otherCities.length > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-4 sm:mb-6">
                  <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-purple-600 to-indigo-600 rounded-full"></div>
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-800 uppercase tracking-wider">
                    Other Cities
                  </h2>
                </div>
                <div className={`grid gap-4 sm:gap-6 ${
                  gridCols === 1 ? 'grid-cols-1' :
                  gridCols === 2 ? 'grid-cols-2' :
                  gridCols === 3 ? 'grid-cols-3' :
                  gridCols === 4 ? 'grid-cols-4' :
                  gridCols === 5 ? 'grid-cols-5' :
                  'grid-cols-6'
                }`}>
                  {otherCities.map(renderCard)}
                </div>
              </section>
            )}
          </div>
        )}

        {/* Enhanced View More/Less Buttons */}
        {!pickerLoading && visibleCities && visibleCities.length > displayedCities.length && !expanded && (
          <div className="flex items-center justify-center mt-12">
            <button 
              onClick={() => setExpanded(true)} 
              className="px-8 py-4 rounded-2xl border-2 border-gray-300 bg-white hover:bg-gray-50 text-lg font-semibold text-gray-700 hover:text-gray-900 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              View More Cities
            </button>
          </div>
        )}
        
        {!pickerLoading && expanded && visibleCities && visibleCities.length > perPage && (
          <div className="flex items-center justify-center mt-12">
            <button 
              onClick={() => setExpanded(false)} 
              className="px-8 py-4 rounded-2xl border-2 border-gray-300 bg-white hover:bg-gray-50 text-lg font-semibold text-gray-700 hover:text-gray-900 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Show Less
            </button>
          </div>
        )}

        {/* Enhanced Sticky Compare Action */}
        {compareMode && (
          <>
            {/* Mobile sticky bottom bar */}
            <div className="fixed bottom-4 left-2 right-2 sm:left-4 sm:right-4 md:hidden z-50">
              <div className="flex items-center justify-between gap-3 bg-white border-2 border-gray-200 shadow-2xl rounded-2xl px-4 py-3 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm font-medium text-gray-700">
                    Selected: <span className="font-bold text-blue-600 text-sm sm:text-lg">{selectedCities.length}</span>
                  </span>
                </div>
                <button
                  disabled={selectedCities.length < 2}
                  onClick={() => { onChooseCity(null, true); }}
                  className={`px-4 py-2 sm:px-6 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                    selectedCities.length < 2 
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                  }`}
                >
                  Compare
                </button>
              </div>
            </div>
            
            {/* Tablet/Desktop floating panel */}
            <div className="hidden md:flex fixed bottom-6 right-4 lg:right-8 z-50">
              <div className="flex items-center gap-4 lg:gap-6 bg-white border-2 border-gray-200 shadow-2xl rounded-2xl pl-6 lg:pl-8 pr-3 lg:pr-4 py-3 lg:py-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 lg:gap-3">
                  <div className="w-2 lg:w-3 h-2 lg:h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-xs lg:text-sm font-medium text-gray-700">
                    Selected: <span className="font-bold text-blue-600 text-sm lg:text-lg">{selectedCities.length}</span>
                  </span>
                </div>
                <button
                  disabled={selectedCities.length < 2}
                  onClick={() => { onChooseCity(null, true); }}
                  className={`px-4 py-2 lg:px-6 lg:py-3 rounded-xl text-xs lg:text-sm font-bold transition-all duration-200 ${
                    selectedCities.length < 2 
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                  }`}
                >
                  <span className="hidden lg:inline">Compare Cities</span>
                  <span className="lg:hidden">Compare</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}