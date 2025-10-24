import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Footer from "./Footer";
import api from "../../config/apiClient";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN } from "../../lib/route";
import { Helmet } from "react-helmet";
import CustomSkeleton from "../../Utils/CustomSkeleton";
import { FilterIcon, PropertyIcon, RupeeIcon } from "../../Assets/icons";
import { PaginationControls } from "../../Components/Blog_Components/BlogManagement";
import AuthModal from "../../Resister/AuthModal";
import { AuthContext } from "../../AuthContext";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

const RentPropViewCard = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [showAuth, setShowAuth] = useState(false);
  const [buyData, setBuyData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRightbarOpen, setIsRightbarOpen] = useState(false);
  const [minRangeValue, setMinRangeValue] = useState("1Cr");
  const [maxRangeValue, setMaxRangeValue] = useState("8Cr");
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [activeIndex, setActiveIndex] = useState('propertyType');
  const [selectedValues, setSelectedValues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // Check and redirect if URL is missing trailing slash
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (!currentPath.endsWith('/')) {
      const newPath = currentPath + '/';
      navigate(newPath, { replace: true });
    }
  }, [navigate]);

  // Accordion state for modal
  const [accordion, setAccordion] = useState({
    propertyType: true,
    unitType: false,
    city: false,
    price: false,
  });
  const toggleAccordion = (key) => setAccordion((prev) => ({ ...prev, [key]: !prev[key] }));

  // Add search state
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered and searched data (guard against undefined)
  const filteredAndSearchedData = (Array.isArray(filterData) ? filterData : []).filter(property =>
    property.propertyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const paginatedData = filteredAndSearchedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredAndSearchedData.length / itemsPerPage);

  const minPriceOptions = [
    "1Cr",
    "2Cr",
    "3Cr",
    "4Cr",
    "5Cr",
    "6Cr",
    "7Cr",
    "8Cr",
  ];
  const maxPriceOptions = [
    "1Cr",
    "2Cr",
    "3Cr",
    "4Cr",
    "5Cr",
    "6Cr",
    "7Cr",
    "8Cr",
  ];

  const handleMinRangeChange = (e) => {
    const value = `${e.target.value}Cr`;
    setMinPrice(value);
  };

  const handleMaxRangeChange = (e) => {
    const value = `${e.target.value}Cr`;
    setMaxPrice(value);
  };

  const handleMinPriceChange = (e) => {
    const value = e.target.value;
    setMinPrice(value);
  };

  const handleMaxPriceChange = (e) => {
    const value = e.target.value;
    setMaxPrice(value);
  };

  const handleCheckboxChange = (e, setSelectedState) => {
    const { value, checked } = e.target;

    setSelectedState((prevState) =>
      checked ? [...prevState, value] : prevState.filter((v) => v !== value)
    );

    setSelectedValues((prevState) =>
      checked ? [...prevState, value] : prevState.filter((v) => v !== value)
    );
  };

  const handleClearFilters = () => {
    setSelectedPropertyTypes([]);
    setSelectedAreas([]);
    setSelectedCities([]);
    setSelectedQuickFilters([]);
    setMinPrice("");
    setMaxPrice("");
    setMinRangeValue("1Cr");
    setMaxRangeValue("8Cr");
  };
  
  const removePropertyType = (propertyType) => {
    setSelectedPropertyTypes(
      selectedPropertyTypes.filter((item) => item !== propertyType)
    );
  };

  const removeArea = (area) => {
    setSelectedAreas(selectedAreas.filter((item) => item !== area));
  };

  const removeCity = (city) => {
    setSelectedCities(selectedCities.filter((item) => item !== city));
  };

  const removePrice = () => {
    setMinPrice(null);
    setMaxPrice(null);
  };

  const fetchData = async () => {
    try {
      const res = await api.get("/property/rent/viewAll");
      const list = Array.isArray(res?.data?.rentaldata) ? res.data.rentaldata : [];
      setBuyData(list);
      setFilterData(list);
    } catch (error) {
      console.error("Error fetching data:", error);
      setBuyData([]);
      setFilterData([]);
    }
  };

  // Scroll to top of grid on page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
      
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    updateFilteredData();
  }, [selectedPropertyTypes, selectedAreas, selectedCities]);
  
  function normalize(str) {
    return str.toLowerCase().replace(/\s+/g, "");
  }
  
  function updateFilteredData() {
    const source = Array.isArray(buyData) ? buyData : [];
    const filteredData = source.filter((data) => {
      const matchPropertyType =
        selectedPropertyTypes.length === 0 ||
        selectedPropertyTypes.some(
          (type) => normalize(type) === normalize(data.propertyType)
        );
  
      const matchArea =
        selectedAreas.length === 0 ||
        selectedAreas.some(
          (area) => normalize(area) === normalize(data.type)
        );
  
      const matchCity =
        selectedCities.length === 0 ||
        selectedCities.some(
          (city) => normalize(city) === normalize(data.city)
        );
  
      return matchPropertyType && matchArea && matchCity;
    });
  
    setFilterData(filteredData);
  }

  // Add missing functions
  const formatPrice = (price) => {
    if (!price) return '0';
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleFavorite = (propertyId) => {
    if (!isAuthenticated) {
      setShowAuth(true);
      return;
    }
    setFavorites((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const propertyTypes = [
    "Residential",
    "Commercial",
    "Retail",
    "Farmhouse",
  ];
  const areas = [
    "4 BHK",
    "3 BHK",
    "2 BHK",
    "1 BHK"
  ];
  const cities = [
    "Gurugram",
    "Gurgaon",
    "Delhi",
    "Noida",
    "Sohna",
    "Alwar",
    "Gorakhpur",
    "Naini Tal",
    "Ghaziabad",
    "Bahadurgarh",
    "Faridabad",
    "Sonipat",
    "South Delhi",
    "Jaipur",
    "Vadodara"
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Best Rental Properties in India | 100Acress</title>
        <meta name="description" content="Discover premium rental properties across India. Find verified properties with detailed information, pricing, and location details. Your trusted partner for rental properties." />
        <meta name="keywords" content="rental properties, property for rent, real estate, rental investment, rent property, residential rentals, commercial rentals" />
        <link rel="canonical" href="https://www.100acress.com/rental-properties/best-rental-property-in-gurugram/" />
        <meta property="og:title" content="Best Rental Properties in India | 100Acress" />
        <meta property="og:description" content="Discover premium rental properties across India. Find verified properties with detailed information, pricing, and location details." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.100acress.com/rental-properties" />
        <meta property="og:image" content="https://www.100acress.com/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Rental Properties in India | 100Acress" />
        <meta name="twitter:description" content="Discover premium rental properties across India. Find verified properties with detailed information, pricing, and location details." />
      </Helmet>

      {/* Filter Modal */}
      {filterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setFilterModalOpen(false)}>
          <div
            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto relative animate-fade-in mx-4"
            onClick={e => e.stopPropagation()}
            tabIndex={-1}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold"
              onClick={() => setFilterModalOpen(false)}
              aria-label="Close Filters"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-6 text-center text-gray-900">Filters</h2>
            
            {/* Accordion Sections */}
            <div className="space-y-4">
              {/* Property Type */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button className="w-full flex justify-between items-center py-4 px-4 font-semibold text-left bg-gray-50" onClick={() => toggleAccordion('propertyType')}>
                  <span className="flex items-center gap-2">
                    <span className="text-lg">🏠</span>
                    Property Type
                  </span>
                  <span className="text-gray-500">{accordion.propertyType ? '−' : '+'}</span>
                </button>
                {accordion.propertyType && (
                  <div className="p-4 bg-white">
                    <div className="grid grid-cols-1 gap-3">
                      {propertyTypes.map((type) => (
                        <label key={type} className="flex items-center gap-3 text-sm cursor-pointer p-2 rounded-lg hover:bg-gray-50">
                          <input
                            type="checkbox"
                            className="accent-red-500 w-4 h-4"
                            value={type}
                            checked={selectedPropertyTypes.includes(type)}
                            onChange={e => handleCheckboxChange(e, setSelectedPropertyTypes)}
                          />
                          <span className="text-gray-700">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Unit Type */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button className="w-full flex justify-between items-center py-4 px-4 font-semibold text-left bg-gray-50" onClick={() => toggleAccordion('unitType')}>
                  <span className="flex items-center gap-2">
                    <span className="text-lg">🏡</span>
                    Unit Type
                  </span>
                  <span className="text-gray-500">{accordion.unitType ? '−' : '+'}</span>
                </button>
                {accordion.unitType && (
                  <div className="p-4 bg-white">
                    <div className="grid grid-cols-1 gap-3">
                      {areas.map((area) => (
                        <label key={area} className="flex items-center gap-3 text-sm cursor-pointer p-2 rounded-lg hover:bg-gray-50">
                          <input
                            type="checkbox"
                            className="accent-red-500 w-4 h-4"
                            value={area}
                            checked={selectedAreas.includes(area)}
                            onChange={e => handleCheckboxChange(e, setSelectedAreas)}
                          />
                          <span className="text-gray-700">{area}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* City */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button className="w-full flex justify-between items-center py-4 px-4 font-semibold text-left bg-gray-50" onClick={() => toggleAccordion('city')}>
                  <span className="flex items-center gap-2">
                    <span className="text-lg">📍</span>
                    City
                  </span>
                  <span className="text-gray-500">{accordion.city ? '−' : '+'}</span>
                </button>
                {accordion.city && (
                  <div className="p-4 bg-white max-h-60 overflow-y-auto">
                    <div className="grid grid-cols-1 gap-3">
                      {cities.map((city) => (
                        <label key={city} className="flex items-center gap-3 text-sm cursor-pointer p-2 rounded-lg hover:bg-gray-50">
                          <input
                            type="checkbox"
                            className="accent-red-500 w-4 h-4"
                            value={city}
                            checked={selectedCities.includes(city)}
                            onChange={e => handleCheckboxChange(e, setSelectedCities)}
                          />
                          <span className="text-gray-700">{city}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Price Criteria */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button className="w-full flex justify-between items-center py-4 px-4 font-semibold text-left bg-gray-50" onClick={() => toggleAccordion('price')}>
                  <span className="flex items-center gap-2">
                    <span className="text-lg">💰</span>
                    Price Range
                  </span>
                  <span className="text-gray-500">{accordion.price ? '−' : '+'}</span>
                </button>
                {accordion.price && (
                  <div className="p-4 bg-white">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Minimum Price</label>
                        <select
                          value={minPrice}
                          onChange={handleMinPriceChange}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        >
                          <option value="">Select Min Price</option>
                          {minPriceOptions.map((price) => (
                            <option key={price} value={price}>₹{price}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Maximum Price</label>
                        <select
                          value={maxPrice}
                          onChange={handleMaxPriceChange}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        >
                          <option value="">Select Max Price</option>
                          {maxPriceOptions.map((price) => (
                            <option key={price} value={price}>₹{price}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-between mt-8 gap-3">
              <button
                className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-200 transition font-medium"
                onClick={handleClearFilters}
              >
                Clear All
              </button>
              <button
                className="flex-1 bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-red-600 transition font-semibold"
                onClick={() => setFilterModalOpen(false)}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="min-h-screen bg-gray-50 pt-24 pb-10">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Enhanced Header Title Section */}
          <div className="relative text-center py-6 mb-4 px-2">
            {/* Background blur/gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-white to-purple-50/30 rounded-3xl blur-2xl opacity-70"></div>
            
            {/* Content container */}
            <div className="relative z-10 max-w-5xl mx-auto pt-4">
              {/* Main Title with gradient effect and enhanced styling */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 tracking-wide leading-tight" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                <span className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent drop-shadow-sm">
                  Best
                </span>
                <span className="text-gray-900 drop-shadow-sm"> Rental Properties</span>
              </h1>
              
              {/* Decorative underline */}
              <div className="w-32 h-1.5 bg-gradient-to-r from-red-500 via-red-400 to-orange-500 mx-auto mb-3 rounded-full shadow-lg"></div>
              
              {/* Subtitle with reduced size */}
              <p className="text-base md:text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium tracking-wide" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Premium Rental Properties — Value, Location, and Trust Redefined.
              </p>
            </div>
            
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-orange-500/10 rounded-3xl blur-3xl"></div>
          </div>

          {/* Responsive 2-Column Layout */}
          <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto px-2 md:px-4">
            {/* Filter Sidebar (Desktop) */}
            <aside className="hidden lg:block w-[280px] bg-gray-50 rounded-2xl shadow border border-gray-100 px-5 py-6 sticky top-20 self-start">
              {/* Property Type */}
              <div className="mb-6">
                <div className="font-semibold text-gray-800 mb-3">Property Type</div>
                <div className="flex flex-wrap gap-2 items-start">
                  {propertyTypes.map(type => (
                    <label
                      key={type}
                      className="flex items-start gap-2 text-sm min-w-0 whitespace-nowrap"
                    >
                      <input
                        type="checkbox"
                        className="accent-red-500 w-4 h-4 mt-0.5 flex-shrink-0"
                        value={type}
                        checked={selectedPropertyTypes.includes(type)}
                        onChange={e => handleCheckboxChange(e, setSelectedPropertyTypes)}
                      />
                      <span className="whitespace-nowrap">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Unit Type */}
              <div className="mb-6">
                <div className="font-semibold text-gray-800 mb-3">Unit Type</div>
                <div className="flex flex-wrap gap-2 items-start">
                  {areas.map(area => (
                    <label
                      key={area}
                      className="flex items-start gap-2 text-sm min-w-0 whitespace-nowrap"
                    >
                      <input
                        type="checkbox"
                        className="accent-red-500 w-4 h-4 mt-0.5 flex-shrink-0"
                        value={area}
                        checked={selectedAreas.includes(area)}
                        onChange={e => handleCheckboxChange(e, setSelectedAreas)}
                      />
                      <span className="whitespace-nowrap">{area}</span>
                    </label>
                  ))}
                </div>
              </div>
              {/* City */}
              <div className="mb-6">
                <div className="font-semibold text-gray-800 mb-3">City</div>
                <div className="flex flex-wrap gap-2 items-start">
                  {cities.map(city => (
                    <label
                      key={city}
                      className="flex items-start gap-2 text-sm min-w-0 whitespace-nowrap"
                    >
                      <input
                        type="checkbox"
                        className="accent-red-500 w-4 h-4 mt-0.5 flex-shrink-0"
                        value={city}
                        checked={selectedCities.includes(city)}
                        onChange={e => handleCheckboxChange(e, setSelectedCities)}
                      />
                      <span className="whitespace-nowrap">{city}</span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Price Criteria */}
              <div>
                <div className="font-semibold text-gray-800 mb-3">Price Criteria</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                    <span>Min: ₹{minPrice || minPriceOptions[0]} Cr</span>
                    <span>Max: ₹{maxPrice || maxPriceOptions[maxPriceOptions.length - 1]} Cr</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min={minPriceOptions[0]}
                      max={maxPriceOptions[maxPriceOptions.length - 1]}
                      step={1}
                      value={minPrice || minPriceOptions[0]}
                      onChange={e => {
                        const value = e.target.value;
                        setMinPrice(value);
                        if (!maxPrice || parseInt(value) > parseInt(maxPrice)) setMaxPrice(value);
                      }}
                      className="w-full accent-red-500"
                    />
                    <input
                      type="range"
                      min={minPriceOptions[0]}
                      max={maxPriceOptions[maxPriceOptions.length - 1]}
                      step={1}
                      value={maxPrice || maxPriceOptions[maxPriceOptions.length - 1]}
                      onChange={e => {
                        const value = e.target.value;
                        setMaxPrice(value);
                        if (!minPrice || parseInt(value) < parseInt(minPrice)) setMinPrice(value);
                      }}
                      className="w-full accent-red-500"
                    />
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content Area (Listings) */}
            <main className="flex-1 min-w-0">
              {/* Search Bar */}
              <div className="mb-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search properties by name or city..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 shadow-sm hover:shadow-md"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                {searchTerm && (
                  <div className="mt-2 text-sm text-gray-600">
                    Showing {filteredAndSearchedData.length} results for "{searchTerm}"
                  </div>
                )}
              </div>

              {/* Mobile Filter Button */}
              <div className="lg:hidden flex justify-end mb-4">
                <button 
                  onClick={() => setFilterModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-medium shadow hover:bg-gray-200 border border-gray-200 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                  Filters
                </button>
              </div>

              {/* Grid/List Toggle Placeholder */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                <div className="text-gray-700 font-semibold flex-shrink-0">Showing Properties</div>
                <div className="flex flex-wrap gap-2">
                  {selectedCities.map(city => (
                    <span key={city} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      {city}
                      <button className="ml-1 hover:text-green-900" onClick={() => setSelectedCities(selectedCities.filter(c => c !== city))}>×</button>
                    </span>
                  ))}
                  {selectedPropertyTypes.map(type => (
                    <span key={type} className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      {type}
                      <button className="ml-1 hover:text-red-900" onClick={() => setSelectedPropertyTypes(selectedPropertyTypes.filter(t => t !== type))}>×</button>
                    </span>
                  ))}
                  {selectedAreas.map(area => (
                    <span key={area} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      {area}
                      <button className="ml-1 hover:text-blue-900" onClick={() => setSelectedAreas(selectedAreas.filter(a => a !== area))}>×</button>
                    </span>
                  ))}
                  {(minPrice || maxPrice) && (
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      ₹{minPrice || '0'} - ₹{maxPrice || 'Any'}
                      <button className="ml-1 hover:text-gray-900" onClick={() => { setMinPrice(''); setMaxPrice(''); }}>×</button>
                    </span>
                  )}
                </div>
              </div>
              {/* Property Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAndSearchedData.length === 0 ? (
                  <div className="col-span-full"><CustomSkeleton /></div>
                ) : (
                  paginatedData.map((property, idx) => (
                    <Link
                      key={property._id || idx}
                      to={property.propertyName && property._id
                        ? `/rental-properties/${property.propertyName.replace(/\s+/g, '-')}/${property._id}/`
                        : "#"}
                      target="_top"
                      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400"
                      style={{ animationDelay: `${idx * 50}ms` }}
                      tabIndex={0}
                    >
                      {/* Property Image */}
                      <div className="relative overflow-hidden">
                        <img
                          src={property.thumbnailImage?.url || property.frontImage?.url}
                          alt={property.propertyName}
                          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        {/* Heart/Wishlist Button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleFavorite(property._id);
                          }}
                          className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition"
                          aria-label={favorites.includes(property._id) ? "Remove from wishlist" : "Add to wishlist"}
                          title={favorites.includes(property._id) ? "Remove from wishlist" : "Add to wishlist"}
                        >
                          {favorites.includes(property._id) ? (
                            <MdFavorite className="text-red-500 text-xl" />
                          ) : (
                            <MdFavoriteBorder className="text-gray-600 hover:text-red-500 text-xl" />
                          )}
                        </button>
                        <div className="absolute top-3 right-96">
                          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            Rental
                          </span>
                        </div>
                      </div>

                      {/* Property Details */}
                      <div className="flex flex-col flex-1 p-4">
                        {/* Property Name */}
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
                          {property.propertyName}
                        </h3>

                        {/* Location */}
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="truncate">{property.city}, {property.state}</span>
                        </div>

                        {/* Property Type */}
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                          <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span className="truncate">{property.propertyType || 'Property'}</span>
                        </div>

                        {/* Price and CTA */}
                        <div className="mt-auto">
                          <div className="text-red-500 font-bold text-xl mb-3 flex items-center gap-1">
                            ₹
                            {formatPrice(property.price)}
                          </div>
                          <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors text-sm">
                            View Details
                          </button>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
              {/* Pagination */}
              <div className="mt-8 flex justify-center">
                <PaginationControls
                  currentPage={currentPage}
                  setCurrentPage={handlePageChange}
                  totalPages={totalPages}
                />
              </div>
            </main>
          </div>
        </div>
      </main>
      <Footer />
      {/* Auth Modal for Login/Register */}
      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} defaultView="login" />
    </>
  );
}

const Wrapper = styled.section`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
  
  /* Animation for modal */
  @keyframes fade-in {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  
  .animate-fade-in {
    animation: fade-in 0.2s ease-out;
  }
  
  /* Line clamp utility */
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

export default RentPropViewCard;
