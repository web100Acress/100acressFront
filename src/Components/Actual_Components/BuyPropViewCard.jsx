import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Footer from "./Footer";
import api from "../../config/apiClient";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import CustomSkeleton from "../../Utils/CustomSkeleton";
import { FilterIcon, PropertyIcon, RupeeIcon } from "../../Assets/icons";
import { use } from "react";
import { PaginationControls } from "../../Components/Blog_Components/BlogManagement";
import { MdFavoriteBorder } from "react-icons/md";
import { LOGIN } from "../../lib/route";

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
    // Also remove from quick filters if it exists
    setSelectedQuickFilters(prev => 
      prev.filter(filter => {
        const quickFilter = quickFilters.find(qf => qf.value === propertyType && qf.type === 'property');
        return !quickFilter || filter !== quickFilter.label;
      })
    );
  };

  const removeArea = (area) => {
    setSelectedAreas(selectedAreas.filter((item) => item !== area));
    // Also remove from quick filters if it exists
    setSelectedQuickFilters(prev => 
      prev.filter(filter => {
        const quickFilter = quickFilters.find(qf => qf.value === area && qf.type === 'unit');
        return !quickFilter || filter !== quickFilter.label;
      })
    );
  };

  const removeCity = (city) => {
    setSelectedCities(selectedCities.filter((item) => item !== city));
    // Also remove from quick filters if it exists
    setSelectedQuickFilters(prev => 
      prev.filter(filter => {
        const quickFilter = quickFilters.find(qf => qf.value === city && qf.type === 'city');
        return !quickFilter || filter !== quickFilter.label;
      })
    );
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
      const res = await api.get("/property/buy/ViewAll");
      const list = Array.isArray(res?.data?.ResaleData) ? res.data.ResaleData : [];
      setBuyData(list);
      setFilterData(list);
    } catch (error) {
      console.error("Error fetching data:", error);
      setBuyData([]);
      setFilterData([]);
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
  const [openFilterDropdown, setOpenFilterDropdown] = useState(null);

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
    { label: 'Gurgaon', icon: '🏢', type: 'city', value: 'Gurugram' },
    { label: 'Delhi', icon: '🏛️', type: 'city', value: 'Delhi' },
    { label: 'Noida', icon: '🏙️', type: 'city', value: 'Noida' },
    { label: 'Plot', icon: '🏞️', type: 'property', value: 'Plot / Land' },
    { label: 'Flat', icon: '🏠', type: 'property', value: 'Flat/Apartment' },
    { label: 'Villa', icon: '🏡', type: 'property', value: 'Independent House / Villa' },
    { label: '3 BHK', icon: '🏘️', type: 'unit', value: '3 BHK' },
    { label: '2 BHK', icon: '🏘️', type: 'unit', value: '2 BHK' },
    { label: '4 BHK', icon: '🏘️', type: 'unit', value: '4 BHK' },
  ];
  const [selectedQuickFilters, setSelectedQuickFilters] = useState([]);

  function handleQuickFilterClick(filter) {
    // Toggle quick filter selection
    setSelectedQuickFilters((prev) =>
      prev.includes(filter.label)
        ? prev.filter((f) => f !== filter.label)
        : [...prev, filter.label]
    );

    // Apply the actual filter based on type
    if (filter.type === 'city') {
      setSelectedCities((prev) =>
        prev.includes(filter.value)
          ? prev.filter((city) => city !== filter.value)
          : [...prev, filter.value]
      );
    } else if (filter.type === 'property') {
      setSelectedPropertyTypes((prev) =>
        prev.includes(filter.value)
          ? prev.filter((type) => type !== filter.value)
          : [...prev, filter.value]
      );
    } else if (filter.type === 'unit') {
      setSelectedAreas((prev) =>
        prev.includes(filter.value)
          ? prev.filter((area) => area !== filter.value)
          : [...prev, filter.value]
      );
    }
  }

  // Collapsible filter panel state
  const [filterSections, setFilterSections] = useState({
    city: true,
    propertyType: true,
    budget: true,
    area: false,
    bedrooms: false,
    amenities: false,
    verified: false,
  });

  const toggleSection = (key) => {
    setFilterSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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
                <span className="text-gray-900 drop-shadow-sm"> Resale Properties</span>
              </h1>
              
              {/* Decorative underline */}
              <div className="w-32 h-1.5 bg-gradient-to-r from-red-500 via-red-400 to-orange-500 mx-auto mb-3 rounded-full shadow-lg"></div>
              
              {/* Subtitle with reduced size */}
              <p className="text-base md:text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium tracking-wide" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Premium Resale Properties — Value, Location, and Trust Redefined.
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
              <div className="mb-3">
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
              <div className="mb-3">
                <div className="font-semibold text-gray-800 mb-3">Unit Type</div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 items-start">
                  {areas.map(area => (
                    <label
                      key={area}
                      className="flex items-start gap-2 text-sm min-w-0 whitespace-normal break-words"
                    >
                      <input
                        type="checkbox"
                        className="accent-red-500 w-4 h-4 mt-0.5 flex-shrink-0"
                        value={area}
                        checked={selectedAreas.includes(area)}
                        onChange={e => handleCheckboxChange(e, setSelectedAreas)}
                      />
                      <span className="break-words whitespace-normal">{area}</span>
                    </label>
                  ))}
                </div>
              </div>
              {/* City */}
              <div className="mb-3">
                <div className="font-semibold text-gray-800 mb-3">City</div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 items-start">
                  {cities.map(city => (
                    <label
                      key={city}
                      className="flex items-start gap-2 text-sm min-w-0 whitespace-normal break-words"
                    >
                      <input
                        type="checkbox"
                        className="accent-red-500 w-4 h-4 mt-0.5 flex-shrink-0"
                        value={city}
                        checked={selectedCities.includes(city)}
                        onChange={e => handleCheckboxChange(e, setSelectedCities)}
                      />
                      <span className="break-words whitespace-normal">{city}</span>
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


            {/* TODO: Implement mobile filter drawer/modal here if needed */}

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
                        ? `/buy-properties/${property.propertyName.replace(/\s+/g, '-')}/${property._id}/`
                        : "#"}
                      target="_top"
                      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400"
                      style={{ animationDelay: `${idx * 50}ms` }}
                      tabIndex={0}
                    >
                      {/* Property Image */}
                      <div className="relative overflow-hidden">
                        <img
                          src={property.frontImage?.url}
                          alt={property.propertyName}
                          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        {/* Heart/Wishlist Button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            navigate(LOGIN);
                          }}
                          className="absolute top-3 right-3 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition"
                          aria-label="Add to wishlist (login required)"
                          title="Login to add to wishlist"
                        >
                          <MdFavoriteBorder className="text-gray-600 hover:text-red-500 text-xl" />
                        </button>
                        <div className="absolute top-3 right-3">
                          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            Resale
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
    font-family: DM Sans, sans-serif;
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
  
  /* Custom scrollbar styles */
  .scrollbar-thin {
    scrollbar-width: thin;
  }
  
  .scrollbar-thin::-webkit-scrollbar {
    height: 6px;
  }
  
  .scrollbar-thumb-gray-300::-webkit-scrollbar-thumb {
    background-color: #d1d5db;
    border-radius: 3px;
  }
  
  .scrollbar-track-gray-100::-webkit-scrollbar-track {
    background-color: #f3f4f6;
    border-radius: 3px;
  }
  
  .scrollbar-thumb-gray-400::-webkit-scrollbar-thumb {
    background-color: #9ca3af;
  }
  
  /* Hide scrollbar for mobile when needed */
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  /* Line clamp utility */
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Animation for fade in */
  .animate-fade-in {
    animation: fadeIn 0.3s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Enhanced search bar animations */
  .search-input:focus {
    transform: scale(1.02);
  }

  /* Filter chip animations */
  .filter-chip {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .filter-chip:hover {
    transform: translateY(-2px);
  }

  .filter-chip.active {
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% {
      box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
    }
    50% {
      box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
    }
  }

  /* Smooth transitions for all interactive elements */
  * {
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  /* Mobile-specific improvements */
  @media (max-width: 768px) {
    /* Touch-friendly button sizes */
    .filter-chip {
      min-height: 44px; /* iOS recommended touch target */
      min-width: 44px;
    }
    
    /* Improved scroll experience on mobile */
    .mobile-scroll {
      -webkit-overflow-scrolling: touch;
      scroll-behavior: smooth;
    }
    
    /* Better focus states for mobile */
    .mobile-focus:focus {
      outline: 2px solid #ef4444;
      outline-offset: 2px;
    }
    
    /* Active state for touch feedback */
    .filter-chip:active {
      transform: scale(0.95);
    }
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