import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Footer from "./Footer";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import CustomSkeleton from "../../Utils/CustomSkeleton";
import { FilterIcon, PropertyIcon, RupeeIcon } from "../../Assets/icons";
import { use } from "react";
import { PaginationControls } from "../../Components/Blog_Components/BlogManagement";

// Price formatting function
function formatPrice(price) {
  if (!price || isNaN(price)) return 'Contact for price';
  const num = Number(price);
  if (num < 10) {
    // User probably means crores
    return `${num} Cr`;
  } else if (num < 100) {
    // User probably means lakhs
    return `${num} LAC`;
  } else if (num < 10000000) {
    // Less than 1 crore, treat as rupees and show in LAC
    const lakhs = num / 100000;
    return `${lakhs.toFixed(2)} LAC`;
  } else {
    // 1 crore or more, show in Cr
    const crores = num / 10000000;
    return `${crores.toFixed(1)} Cr`;
  }
}

const BuyPropViewCard = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [drop1, setDrop1] = useState(false);
  const [drop2, setDrop2] = useState(false);
  const [drop5, setDrop5] = useState(false);
  const [drop6, setDrop6] = useState(false);
  const [drop3, setDrop3] = useState(false);
  const [drop4, setDrop4] = useState(false);
  const [drop, setDrop] = useState(false);
  const [drop7, setDrop7] = useState(false);
  const [position, setPosition] = useState("down");
  const [position1, setPosition1] = useState("down");
  const [position2, setPosition2] = useState("down");
  const [position3, setPosition3] = useState("down");
  const [position4, setPosition4] = useState("down");
  const [position5, setPosition5] = useState("down");
  const [position6, setPosition6] = useState("down");
  const [position7, setPosition7] = useState("down");
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

  // Filtered and searched data
  const filteredAndSearchedData = filterData.filter(property =>
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
  const propertyTypes = [
    "Independent/Builder Floor",
    "Flat/Apartment",
    "Plot / Land",
    "Residential",
    "Residential Land",
    "Office",
    "Independent House / Villa",
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
  const toggle5 = () => {
    setDrop5(!drop5);
    setPosition5(position5 === "down" ? "up" : "down");
  };
  const toggle7 = () => {
    setDrop7(!drop7);
    setPosition7(position7 === "down" ? "up" : "down");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleRightbar = () => {
    setIsRightbarOpen(!isRightbarOpen); 
  };


  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://api.100acress.com/property/buy/ViewAll"
      );

      setBuyData(res.data.ResaleData);
      setFilterData(res.data.ResaleData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
    const filteredData = buyData.filter((data) => {
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

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedPropertyTypes, selectedAreas, selectedCities]);

  // Add click outside handler for dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.dropdown-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggle = () => {
    setDrop(!drop);
    setPosition(position === "down" ? "up" : "down");
  };

  const toggle1 = () => {
    setDrop1(!drop1);
    setPosition1(position1 === "down" ? "up" : "down");
  };

  const toggle2 = () => {
    setDrop2(!drop2);
    setPosition2(position2 === "down" ? "up" : "down");
  };
  const toggle6 = () => {
    setDrop6(!drop6);
    setPosition6(position6 === "down" ? "up" : "down");
  };

  const toggle3 = () => {
    setDrop3(!drop3);
    setPosition3(position3 === "down" ? "up" : "down");
  };
  const toggle4 = () => {
    setDrop4(!drop4);
    setPosition4(position4 === "down" ? "up" : "down");
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const openDropdown = () => {
    setToOpen(!toOpen);
  };
  const showDropdown = () => {
    setShow(!show);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const onScroll = () => {
        if (window.scrollY > 200) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  
  
  // Ref for property grid
  const propertyGridRef = React.useRef(null);

  // Scroll to top of grid on page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Dropdown state for filter bar
  const [openFilterDropdown, setOpenFilterDropdown] = useState(null); // 'unitType', 'city', 'priceCriteria', or null

  // Click outside handler for filter bar dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openFilterDropdown &&
        !event.target.closest('.filterbar-dropdown') &&
        !event.target.closest('.filterbar-btn')
      ) {
        setOpenFilterDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openFilterDropdown]);
  
  const quickFilters = [
    { label: 'Gurgaon', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path d="M12 8v4l3 3" strokeWidth="2" /></svg>
    ) },
    { label: 'Plot', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" strokeWidth="2" /></svg>
    ) },
    { label: 'Flat', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="2" strokeWidth="2" /><path d="M9 9h6v6H9z" strokeWidth="2" /></svg>
    ) },
    // Add more as needed
  ];
  const [selectedQuickFilters, setSelectedQuickFilters] = useState([]);

  function handleQuickFilterClick(label) {
    setSelectedQuickFilters((prev) =>
      prev.includes(label)
        ? prev.filter((f) => f !== label)
        : [...prev, label]
    );
  }

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Best Resale Properties in India | 100Acress</title>
        <meta name="description" content="Discover premium resale properties across India. Find verified properties with detailed information, pricing, and location details. Your trusted partner for property investment." />
        <meta name="keywords" content="resale properties, property for sale, real estate, property investment, buy property, residential properties, commercial properties" />
        <link rel="canonical" href="https://www.100acress.com/buy-properties/best-resale-property-in-gurugram/" />
        <meta property="og:title" content="Best Resale Properties in India | 100Acress" />
        <meta property="og:description" content="Discover premium resale properties across India. Find verified properties with detailed information, pricing, and location details." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.100acress.com/buy-properties" />
        <meta property="og:image" content="https://www.100acress.com/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Resale Properties in India | 100Acress" />
        <meta name="twitter:description" content="Discover premium resale properties across India. Find verified properties with detailed information, pricing, and location details." />
      </Helmet>

      {/* Filter Button */}
      {/* Filter Modal */}
      {filterModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-white/60 backdrop-blur-sm transition-all" onClick={() => setFilterModalOpen(false)}>
          <div
            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto relative animate-fade-in"
            onClick={e => e.stopPropagation()}
            tabIndex={-1}
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold"
              onClick={() => setFilterModalOpen(false)}
              aria-label="Close Filters"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">Filters</h2>
            {/* Accordion Sections */}
            <div className="space-y-4">
              {/* Property Type */}
              <div>
                <button className="w-full flex justify-between items-center py-2 font-semibold text-left" onClick={() => toggleAccordion('propertyType')}>
                  Property Type
                  <span>{accordion.propertyType ? '−' : '+'}</span>
                </button>
                {accordion.propertyType && (
                  <div className="pl-2 flex flex-wrap gap-2">
                    {propertyTypes.map((type) => (
                      <label key={type} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          className="accent-red-500"
                          value={type}
                          checked={selectedPropertyTypes.includes(type)}
                          onChange={e => handleCheckboxChange(e, setSelectedPropertyTypes)}
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                )}
              </div>
              {/* Unit Type */}
              <div>
                <button className="w-full flex justify-between items-center py-2 font-semibold text-left" onClick={() => toggleAccordion('unitType')}>
                  Unit Type
                  <span>{accordion.unitType ? '−' : '+'}</span>
                </button>
                {accordion.unitType && (
                  <div className="pl-2 flex flex-wrap gap-2">
                    {areas.map((area) => (
                      <label key={area} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          className="accent-red-500"
                          value={area}
                          checked={selectedAreas.includes(area)}
                          onChange={e => handleCheckboxChange(e, setSelectedAreas)}
                        />
                        {area}
                      </label>
                    ))}
                  </div>
                )}
              </div>
              {/* City */}
              <div>
                <button className="w-full flex justify-between items-center py-2 font-semibold text-left" onClick={() => toggleAccordion('city')}>
                  City
                  <span>{accordion.city ? '−' : '+'}</span>
                </button>
                {accordion.city && (
                  <div className="pl-2 flex flex-wrap gap-2">
                    {cities.map((city) => (
                      <label key={city} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          className="accent-red-500"
                          value={city}
                          checked={selectedCities.includes(city)}
                          onChange={e => handleCheckboxChange(e, setSelectedCities)}
                        />
                        {city}
                      </label>
                    ))}
                  </div>
                )}
              </div>
              {/* Price Criteria */}
              <div>
                <button className="w-full flex justify-between items-center py-2 font-semibold text-left" onClick={() => toggleAccordion('price')}>
                  Price Criteria
                  <span>{accordion.price ? '−' : '+'}</span>
                </button>
                {accordion.price && (
                  <div className="pl-2 flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                      <label className="text-sm">Min Price:</label>
                      <select
                        value={minPrice}
                        onChange={handleMinPriceChange}
                        className="rounded-lg border border-gray-300 px-2 py-1 text-sm"
                      >
                        <option value="">Min Price</option>
                        {minPriceOptions.map((price) => (
                          <option key={price} value={price}>₹{price}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex gap-2 items-center">
                      <label className="text-sm">Max Price:</label>
                      <select
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
                        className="rounded-lg border border-gray-300 px-2 py-1 text-sm"
                      >
                        <option value="">Max Price</option>
                        {maxPriceOptions.map((price) => (
                          <option key={price} value={price}>₹{price}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Modal Actions */}
            <div className="flex justify-between mt-6 gap-2">
              <button
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300 transition"
                onClick={handleClearFilters}
              >
                Clear All
              </button>
              <button
                className="bg-red-500 text-white px-6 py-2 rounded-full shadow hover:bg-red-600 transition"
                onClick={() => setFilterModalOpen(false)}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="min-h-screen bg-gray-50 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="flex flex-col items-center justify-center py-0 mb-3">
            <h2
              className="text-center font-sans font-bold text-3xl md:text-4xl tracking-tight text-[#111827] drop-shadow-sm relative"
              style={{ fontFamily: 'Poppins, Inter, Montserrat, sans-serif' }}
            >
              <span className="inline-block">
                Best Resale Properties
              </span>
              <span className="block mx-auto mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-red-400 via-red-600 to-red-400 opacity-80 transition-all duration-300 group-hover:w-24"></span>
            </h2>
            <div className="text-center mt-2 mb-2 text-base md:text-lg font-medium text-gray-600">
              Premium Resale Properties — Value, Location, and Trust Redefined.
            </div>
          </div>

          {/* New Search Bar Design */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
            {/* Desktop Version */}
            <div className="hidden lg:block">
              <div className="flex flex-col lg:flex-row items-center gap-3">
                {/* Property Type Dropdown */}
                <div className="relative dropdown-container">
                  <button
                    onClick={toggleDropdown}
                    className={`flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2 text-gray-700 hover:border-[#e5652e] focus:ring-2 focus:ring-[#e5652e] transition min-w-[140px] font-medium ${isOpen ? 'border-[#e5652e]' : ''}`}
                    style={{ boxShadow: isOpen ? '0 2px 8px rgba(229,101,46,0.08)' : '' }}
                  >
                    <span>All Residential</span>
                    <svg 
                      className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180 text-[#e5652e]' : 'text-gray-400'}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-10 min-w-[200px] dropdown-container animate-fade-in" style={{boxShadow:'0 4px 24px rgba(229,101,46,0.10)'}}>
                      <div className="p-2">
                        <div className="text-sm font-semibold text-[#e5652e] mb-2">Property Type</div>
                        {propertyTypes.map((type) => (
                          <label key={type} className="flex items-center gap-2 text-sm cursor-pointer px-2 py-1 rounded hover:bg-[#fff3ed]">
                            <input
                              type="checkbox"
                              className="accent-[#e5652e]"
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

                {/* Search Input */}
                <div className="flex-1 relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#e5652e]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Search '3 BHK for sale in Mumbai'"
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e5652e] focus:border-[#e5652e] text-gray-700 bg-white font-medium shadow-sm"
                  />
                </div>

                {/* Search Button */}
                <button className="bg-[#e5652e] text-white px-6 py-2 rounded-xl hover:bg-[#ff3333] transition font-semibold shadow-md focus:ring-2 focus:ring-[#e5652e]">
                  Search
                </button>
              </div>

              {/* Filter Chips Section */}
              {(selectedPropertyTypes.length > 0 || selectedAreas.length > 0 || selectedCities.length > 0 || minPrice || maxPrice) && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-[#e5652e]">Applied Filters:</span>
                    <button 
                      onClick={handleClearFilters}
                      className="text-sm text-[#e5652e] hover:text-[#ff3333] underline font-medium"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedPropertyTypes.map(type => (
                      <span key={type} className="bg-[#fff3ed] text-[#e5652e] px-3 py-1 rounded-full text-xs flex items-center gap-1 border border-[#ffe0d1] font-medium shadow-sm">
                        {type}
                        <button onClick={() => removePropertyType(type)} className="ml-1 text-[#e5652e] hover:text-[#ff3333]">×</button>
                      </span>
                    ))}
                    {selectedAreas.map(area => (
                      <span key={area} className="bg-[#e6f0ff] text-[#1d4ed8] px-3 py-1 rounded-full text-xs flex items-center gap-1 border border-[#bcdcff] font-medium shadow-sm">
                        {area}
                        <button onClick={() => removeArea(area)} className="ml-1 text-[#1d4ed8] hover:text-[#2563eb]">×</button>
                      </span>
                    ))}
                    {selectedCities.map(city => (
                      <span key={city} className="bg-[#e7fbe7] text-[#059669] px-3 py-1 rounded-full text-xs flex items-center gap-1 border border-[#b6f5c6] font-medium shadow-sm">
                        {city}
                        <button onClick={() => removeCity(city)} className="ml-1 text-[#059669] hover:text-[#047857]">×</button>
                      </span>
                    ))}
                    {(minPrice || maxPrice) && (
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs flex items-center gap-1 border border-gray-200 font-medium shadow-sm">
                        ₹{minPrice || '0'} - ₹{maxPrice || 'Any'}
                        <button onClick={removePrice} className="ml-1 text-gray-500 hover:text-gray-700">×</button>
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Additional Filter Options */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex flex-wrap gap-3">
                  {/* Unit Type Dropdown */}
                  <div className="relative">
                    <button
                      className={`flex items-center gap-2 text-sm text-gray-700 hover:text-[#e5652e] filterbar-btn px-3 py-2 rounded-xl border border-gray-200 bg-white font-medium shadow-sm transition ${openFilterDropdown === 'unitType' ? 'border-[#e5652e] text-[#e5652e]' : ''}`}
                      onClick={() => setOpenFilterDropdown(openFilterDropdown === 'unitType' ? null : 'unitType')}
                    >
                      Unit Type
                      <svg className={`w-4 h-4 transition-transform ${openFilterDropdown === 'unitType' ? 'rotate-180 text-[#e5652e]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openFilterDropdown === 'unitType' && (
                      <div className="absolute left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-20 p-3 filterbar-dropdown min-w-[180px] animate-fade-in" style={{boxShadow:'0 4px 24px rgba(229,101,46,0.10)'}}>
                        {areas.map((area) => (
                          <label key={area} className="flex items-center gap-2 text-sm cursor-pointer mb-1 px-2 py-1 rounded hover:bg-[#fff3ed]">
                            <input
                              type="checkbox"
                              className="accent-[#e5652e]"
                              value={area}
                              checked={selectedAreas.includes(area)}
                              onChange={e => handleCheckboxChange(e, setSelectedAreas)}
                            />
                            {area}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* City Dropdown */}
                  <div className="relative">
                    <button
                      className={`flex items-center gap-2 text-sm text-gray-700 hover:text-[#e5652e] filterbar-btn px-3 py-2 rounded-xl border border-gray-200 bg-white font-medium shadow-sm transition ${openFilterDropdown === 'city' ? 'border-[#e5652e] text-[#e5652e]' : ''}`}
                      onClick={() => setOpenFilterDropdown(openFilterDropdown === 'city' ? null : 'city')}
                    >
                      City
                      <svg className={`w-4 h-4 transition-transform ${openFilterDropdown === 'city' ? 'rotate-180 text-[#e5652e]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openFilterDropdown === 'city' && (
                      <div className="absolute left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-20 p-3 filterbar-dropdown min-w-[220px] max-h-60 overflow-y-auto animate-fade-in" style={{boxShadow:'0 4px 24px rgba(229,101,46,0.10)'}}>
                        {cities.map((city) => (
                          <label key={city} className="flex items-center gap-2 text-sm cursor-pointer mb-1 px-2 py-1 rounded hover:bg-[#fff3ed]">
                            <input
                              type="checkbox"
                              className="accent-[#e5652e]"
                              value={city}
                              checked={selectedCities.includes(city)}
                              onChange={e => handleCheckboxChange(e, setSelectedCities)}
                            />
                            {city}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* Price Criteria Dropdown */}
                  <div className="relative">
                    <button
                      className={`flex items-center gap-2 text-sm text-gray-700 hover:text-[#e5652e] filterbar-btn px-3 py-2 rounded-xl border border-gray-200 bg-white font-medium shadow-sm transition ${openFilterDropdown === 'priceCriteria' ? 'border-[#e5652e] text-[#e5652e]' : ''}`}
                      onClick={() => setOpenFilterDropdown(openFilterDropdown === 'priceCriteria' ? null : 'priceCriteria')}
                    >
                      Price Criteria
                      <svg className={`w-4 h-4 transition-transform ${openFilterDropdown === 'priceCriteria' ? 'rotate-180 text-[#e5652e]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openFilterDropdown === 'priceCriteria' && (
                      <div className="absolute left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-20 p-3 filterbar-dropdown min-w-[200px] animate-fade-in" style={{boxShadow:'0 4px 24px rgba(229,101,46,0.10)'}}>
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-2 items-center">
                            <label className="text-sm">Min Price:</label>
                            <select
                              value={minPrice}
                              onChange={handleMinPriceChange}
                              className="rounded-lg border border-gray-300 px-2 py-1 text-sm focus:ring-2 focus:ring-[#e5652e] focus:border-[#e5652e]"
                            >
                              <option value="">Min Price</option>
                              {minPriceOptions.map((price) => (
                                <option key={price} value={price}>₹{price}</option>
                              ))}
                            </select>
                          </div>
                          <div className="flex gap-2 items-center">
                            <label className="text-sm">Max Price:</label>
                            <select
                              value={maxPrice}
                              onChange={handleMaxPriceChange}
                              className="rounded-lg border border-gray-300 px-2 py-1 text-sm focus:ring-2 focus:ring-[#e5652e] focus:border-[#e5652e]"
                            >
                              <option value="">Max Price</option>
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
              </div>
            </div>

            {/* Mobile Version */}
            <div className="lg:hidden sticky top-0 z-30 bg-[#f7f7f7] pb-2" style={{fontFamily: 'Poppins, Inter, sans-serif'}}>
              {/* Sticky Search Bar */}
              <div className="flex items-center px-2 pt-2 pb-1">
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm mr-2">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Search City/Locality/Project"
                    className="w-full rounded-full bg-white shadow px-4 py-3 pr-12 text-gray-700 placeholder-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#e5652e] border border-gray-100"
                    style={{fontFamily: 'Poppins, Inter, sans-serif'}}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                    </svg>
                  </div>
                </div>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm ml-2">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </button>
              </div>
              {/* Filter Row */}
              <div className="flex items-center gap-2 px-2 pt-1 overflow-x-auto scrollbar-hide">
                {/* Animated Filter Icon Button */}
                <button
                  onClick={() => setFilterModalOpen(true)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow border border-gray-100 text-[#e5652e] animate-pulse hover:scale-110 transition-transform duration-150"
                  aria-label="Open Filters"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" /></svg>
                </button>
                {/* Quick Filter Pills */}
                {quickFilters.map((filter) => (
                  <button
                    key={filter.label}
                    onClick={() => handleQuickFilterClick(filter.label)}
                    className={`flex items-center gap-1 px-4 py-2 rounded-full shadow-sm border border-gray-100 font-semibold text-sm transition-all duration-150 mr-1 ${selectedQuickFilters.includes(filter.label) ? 'bg-[#ffe5e0] text-[#e5652e] scale-105' : 'bg-white text-gray-700 hover:bg-[#f7f7f7]'} active:scale-95`}
                    style={{fontFamily: 'Poppins, Inter, sans-serif'}}
                  >
                    <span className="mr-1">{filter.icon}</span>
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Filter Chips - Moved to Main Div */}
            <div className="lg:hidden mb-6">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {/* Unit Type Dropdown */}
                <div className="relative">
                  <button
                    className={`flex items-center gap-1 px-3 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium whitespace-nowrap shadow-sm hover:border-[#e5652e] transition ${openFilterDropdown === 'unitType' ? 'border-[#e5652e] text-[#e5652e]' : ''}`}
                    onClick={() => setOpenFilterDropdown(openFilterDropdown === 'unitType' ? null : 'unitType')}
                  >
                    Unit Type
                    <svg className={`w-4 h-4 transition-transform ${openFilterDropdown === 'unitType' ? 'rotate-180 text-[#e5652e]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFilterDropdown === 'unitType' && (
                    <div className="absolute left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-20 p-3 filterbar-dropdown min-w-[180px] animate-fade-in" style={{boxShadow:'0 4px 24px rgba(229,101,46,0.10)'}}>
                      {areas.map((area) => (
                        <label key={area} className="flex items-center gap-2 text-sm cursor-pointer mb-1 px-2 py-1 rounded hover:bg-[#fff3ed]">
                          <input
                            type="checkbox"
                            className="accent-[#e5652e]"
                            value={area}
                            checked={selectedAreas.includes(area)}
                            onChange={e => handleCheckboxChange(e, setSelectedAreas)}
                          />
                          {area}
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* City Dropdown */}
                <div className="relative">
                  <button
                    className={`flex items-center gap-1 px-3 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium whitespace-nowrap shadow-sm hover:border-[#e5652e] transition ${openFilterDropdown === 'city' ? 'border-[#e5652e] text-[#e5652e]' : ''}`}
                    onClick={() => setOpenFilterDropdown(openFilterDropdown === 'city' ? null : 'city')}
                  >
                    City
                    <svg className={`w-4 h-4 transition-transform ${openFilterDropdown === 'city' ? 'rotate-180 text-[#e5652e]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFilterDropdown === 'city' && (
                    <div className="absolute left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-20 p-3 filterbar-dropdown min-w-[220px] max-h-60 overflow-y-auto animate-fade-in" style={{boxShadow:'0 4px 24px rgba(229,101,46,0.10)'}}>
                      {cities.map((city) => (
                        <label key={city} className="flex items-center gap-2 text-sm cursor-pointer mb-1 px-2 py-1 rounded hover:bg-[#fff3ed]">
                          <input
                            type="checkbox"
                            className="accent-[#e5652e]"
                            value={city}
                            checked={selectedCities.includes(city)}
                            onChange={e => handleCheckboxChange(e, setSelectedCities)}
                          />
                          {city}
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price Criteria Dropdown */}
                <div className="relative">
                  <button
                    className={`flex items-center gap-1 px-3 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium whitespace-nowrap shadow-sm hover:border-[#e5652e] transition ${openFilterDropdown === 'priceCriteria' ? 'border-[#e5652e] text-[#e5652e]' : ''}`}
                    onClick={() => setOpenFilterDropdown(openFilterDropdown === 'priceCriteria' ? null : 'priceCriteria')}
                  >
                    Price
                    <svg className={`w-4 h-4 transition-transform ${openFilterDropdown === 'priceCriteria' ? 'rotate-180 text-[#e5652e]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFilterDropdown === 'priceCriteria' && (
                    <div className="absolute left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-20 p-3 filterbar-dropdown min-w-[200px] animate-fade-in" style={{boxShadow:'0 4px 24px rgba(229,101,46,0.10)'}}>
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2 items-center">
                          <label className="text-sm">Min:</label>
                          <select
                            value={minPrice}
                            onChange={handleMinPriceChange}
                            className="rounded-lg border border-gray-300 px-2 py-1 text-sm focus:ring-2 focus:ring-[#e5652e] focus:border-[#e5652e]"
                          >
                            <option value="">Min</option>
                            {minPriceOptions.map((price) => (
                              <option key={price} value={price}>₹{price}</option>
                            ))}
                          </select>
                        </div>
                        <div className="flex gap-2 items-center">
                          <label className="text-sm">Max:</label>
                          <select
                            value={maxPrice}
                            onChange={handleMaxPriceChange}
                            className="rounded-lg border border-gray-300 px-2 py-1 text-sm focus:ring-2 focus:ring-[#e5652e] focus:border-[#e5652e]"
                          >
                            <option value="">Max</option>
                            {maxPriceOptions.map((price) => (
                              <option key={price} value={price}>₹{price}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Property Type Dropdown */}
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className={`flex items-center gap-1 px-3 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium whitespace-nowrap shadow-sm hover:border-[#e5652e] transition ${isOpen ? 'border-[#e5652e] text-[#e5652e]' : ''}`}
                  >
                    Property
                    <svg 
                      className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180 text-[#e5652e]' : 'text-gray-400'}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="absolute left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-20 p-3 dropdown-container min-w-[200px] animate-fade-in" style={{boxShadow:'0 4px 24px rgba(229,101,46,0.10)'}}>
                      <div className="p-2">
                        <div className="text-sm font-semibold text-[#e5652e] mb-2">Property Type</div>
                        {propertyTypes.map((type) => (
                          <label key={type} className="flex items-center gap-2 text-sm cursor-pointer px-2 py-1 rounded hover:bg-[#fff3ed]">
                            <input
                              type="checkbox"
                              className="accent-[#e5652e]"
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

                {/* Sort Button */}
                <button className="flex items-center gap-1 px-3 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium whitespace-nowrap shadow-sm hover:border-[#e5652e] transition">
                  Sort
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

          <section className="flex flex-col items-center bg-white mb-4 rounded-xl shadow-md p-4">
            {filteredAndSearchedData.length === 0 ? (
              <div><CustomSkeleton /></div>
            ) :  (
              <>
                <div ref={propertyGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                  {paginatedData.map((property, idx) => (
                    <Link
                      key={property._id || idx}
                      to={property.propertyName && property._id
                        ? `/buy-properties/${property.propertyName.replace(/\s+/g, '-')}/${property._id}/`
                        : "#"}
                      target="_top"
                      className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transition hover:shadow-xl hover:scale-105 duration-300 animate-fade-in group cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400"
                      style={{ animationDelay: `${idx * 60}ms` }}
                      tabIndex={0}
                    >
                      <div className="overflow-hidden">
                        <img
                          src={property.frontImage?.url}
                          alt={property.propertyName}
                          className="w-full h-48 object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex flex-col flex-1 p-5 pb-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">{property.propertyName}</h3>
                        <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                          {/* Location pin icon */}
                          <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 10c-4.418 0-8-7.163-8-10a8 8 0 1116 0c0 2.837-3.582 10-8 10z' /></svg>
                          <span className="truncate">{property.city}, {property.state}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                          <PropertyIcon style={{ width: 16, height: 16, minWidth: 16, minHeight: 16 }} />
                          <span className="truncate">{property.propertyType || 'Property'}</span>
                        </div>
                        <div className="mt-auto flex flex-col gap-1 pb-0">
                          <span className="text-red-500 font-bold text-lg flex items-center gap-1">
                            <RupeeIcon /> {(() => {
                              console.log('Property price:', property.propertyName, 'Price:', property.price, 'Type:', typeof property.price);
                              return formatPrice(property.price);
                            })()}
                          </span>
                          <div
                            className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow-md text-base font-semibold text-center transition mt-1 mb-0 cursor-pointer"
                            tabIndex={-1}
                          >
                            View Details
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <PaginationControls
                  currentPage={currentPage}
                  setCurrentPage={handlePageChange}
                  totalPages={totalPages}
                />
              </>
            )}
          </section>
        </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
export default BuyPropViewCard;
const Wrapper = styled.section`
  box-sizing: border-box;
  font-family: DM Sans, sans-serif;

  .li_options {
    padding: 30px 0;
    border-right: 1px solid #d9d9d9;
  }
  .fi_space {
    padding: 0 30px;
    margin-bottom: 20px;
  }
  .theme_btn {
    position: relative;
    font-size: 16px;
    padding: 10px 30px 12px;
    display: inline-block;
    border-radius: 40px;
    border: 0;
    font-weight: 500;
    transition: 0.3s;
    cursor: pointer;
  }
  .li_options .fi_heading {
    font-family: DM Sans;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    color: #959595;
    padding: 0 30px;
    margin-bottom: 15px;
  }
  .li_options .fi_acc {
    padding: 0 30px;
  }
  .fi_head {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding: 15px 0;
    font-weight: 300;
    cursor: pointer;
    font-size: 17px;
    color: #000000;
  }
  .toggleIcon {
    font-size: 19px;
    line-height: 1;
  }
  .fi_options {
    list-style: none;
    padding-bottom: 10px;
  }
  .show {
    display: block;
  }
  .fi_options li {
    margin-right: 6px;
    margin-bottom: 7px;
    display: inline-block;
  }
  .fi_options li input {
    display: none;
  }
  .fi_options .filter {
    border: 1px solid #ccc;
    width: fit-content;
    padding: 8px 15px;
    color: #959595;
    border-radius: 30px;
    font-size: 13px;
    display: inline-block;
    cursor: pointer;
  }
  label {
    margin-bottom: 0rem !important;
  }
  .li_options .fi_acc:not(:last-child) {
    border-bottom: 1px solid #d9d9d9;
  }
  .hide {
    display: none;
  }
  .li_items {
    width: 100%;
  }
  .li_head_row {
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    color: #313131;
    margin-bottom: 30px;
  }
  .li_head_row .title {
    font-size: 20px;
    font-weight: 400;
    margin: 0;
    line-height: 24px;
  }
  .li_head_row .description {
    margin-bottom: 0;
    color: #535353;
    font-size: 16px;
    margin-top: 12px;
    line-height: 24px;
  }
  .li_head_row .sorting-filter select {
    padding: 8px 20px;
    border: 1px solid #d9d9d9;
    border-radius: 35px;
    outline: none;
    color: #828282;
  }
  .filter-choice:checked + label {
    color: #e5652e;
    border-color: #e5652e;
    background: rgba(255, 99, 71, 0.2);
  }

  label {
    font-size: 14px;
  }
  @media only screen and (max-width: 570px) {
    .li_options {
      display: none;
    }
    .li_items {
      width: 100%;
    }
    .sorting-filter {
      display: none;
    }
  }
`;