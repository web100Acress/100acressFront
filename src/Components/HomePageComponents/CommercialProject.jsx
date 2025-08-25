import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../MyContext";
import { Helmet } from "react-helmet";
import CommonInside from "../../Utils/CommonInside";
import { useSelector } from "react-redux";
import Api_Service from "../../Redux/utils/Api_Service";
import Footer from "../Actual_Components/Footer";
import { PaginationControls } from "../../Components/Blog_Components/BlogManagement";
import styled from "styled-components";
import { MdFavoriteBorder } from "react-icons/md";
import { LOGIN } from "../../lib/route";

const CommercialProject = () => {
  const {getCommercial} = Api_Service();
  const commercialProjectAll = useSelector(store => store?.project?.commercial);
  
  // State for filtering and pagination
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedProjectStatus, setSelectedProjectStatus] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  
  const itemsPerPage = 12;

  // Accordion state for modal
  const [accordion, setAccordion] = useState({
    projectStatus: false,
    city: false,
    price: false,
  });
  const toggleAccordion = (key) => setAccordion((prev) => ({ ...prev, [key]: !prev[key] }));

  useEffect(()=>{
    getCommercial();
  },[]);

  // Update filtered data when commercialProjectAll changes
  useEffect(() => {
    if (commercialProjectAll && commercialProjectAll.length > 0) {
      setFilteredData(commercialProjectAll);
      // Debug: Log first few projects to see their structure
      console.log('Commercial Projects Data Sample:', commercialProjectAll.slice(0, 3));
    }
  }, [commercialProjectAll]);

  // Filter data based on search and filters
  const applyFilters = () => {
    if (!commercialProjectAll) return;

    let filtered = commercialProjectAll.filter(project => {
      // Search filter
      const matchesSearch = !searchTerm || 
        project.projectName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.city?.toLowerCase().includes(searchTerm.toLowerCase());

      // City filter
      const matchesCity = selectedCities.length === 0 || 
        selectedCities.some(city => 
          project.city?.toLowerCase().includes(city.toLowerCase())
        );

      // Project Status filter
      const matchesStatus = selectedProjectStatus.length === 0 || 
        selectedProjectStatus.some(selectedStatus => {
          // Check multiple possible field names for project status
          const projectStatus = project.projectStatus || project.status || project.project_Status || project.project_status;
          if (!projectStatus) return false;
          
          // Normalize the project status
          const normalizedProjectStatus = projectStatus.toLowerCase().trim();
          
          // Get all possible variations for the selected status
          const statusVariations = statusMapping[selectedStatus] || [selectedStatus.toLowerCase()];
          
          // Check if any variation matches
          const matches = statusVariations.some(variation => 
            normalizedProjectStatus.includes(variation) || 
            variation.includes(normalizedProjectStatus)
          );
          
          // Debug: Log status comparison
          if (selectedProjectStatus.length > 0) {
            console.log('Status Comparison:', {
              projectName: project.projectName,
              projectStatus: projectStatus,
              normalizedProjectStatus,
              selectedStatus,
              statusVariations,
              matches
            });
          }
          
          return matches;
        });

      // Price filter
      let matchesPrice = true;
      if (minPrice || maxPrice) {
        const projectPrice = project.minPrice || project.price;
        if (projectPrice) {
          const price = typeof projectPrice === 'string' ? parseFloat(projectPrice) : projectPrice;
          if (minPrice && price < parseFloat(minPrice)) matchesPrice = false;
          if (maxPrice && price > parseFloat(maxPrice)) matchesPrice = false;
        }
      }

      return matchesSearch && matchesCity && matchesStatus && matchesPrice;
    });

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Apply filters when any filter changes
  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedCities, selectedProjectStatus, minPrice, maxPrice, commercialProjectAll]);

  // Pagination
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter options
  const cities = [
    "Gurugram", "Delhi", "Noida", "Jalandhar"
  ];

  const projectStatusOptions = [
    "Upcoming Projects",
    "New Launch Projects", 
    "Under Constructions",
    "Ready To Move"
  ];

  // Status mapping for flexible matching
  const statusMapping = {
    "Upcoming Projects": ["comingsoon", "upcoming", "upcoming projects", "upcoming project"],
    "New Launch Projects": ["newlaunch", "new launch", "new launch projects", "new launch project", "launch"],
    "Under Constructions": ["underconstruction", "under construction", "under constructions", "construction", "under-construction"],
    "Ready To Move": ["readytomove", "ready to move", "ready to move projects", "ready", "possession", "ready possession"]
  };

  const priceOptions = [
    "0.5", "1", "2", "3", "4", "5", "10", "15", "20", "25", "30", "50", "100"
  ];

  const handleCheckboxChange = (e, setSelectedState) => {
    const { value, checked } = e.target;
    setSelectedState((prevState) =>
      checked ? [...prevState, value] : prevState.filter((v) => v !== value)
    );
  };

  const handleClearFilters = () => {
    setSelectedCities([]);
    setSelectedProjectStatus([]);
    setMinPrice("");
    setMaxPrice("");
    setSearchTerm("");
  };

  const removeFilter = (type, value) => {
    switch (type) {
      case 'city':
        setSelectedCities(selectedCities.filter(c => c !== value));
        break;
      case 'projectStatus':
        setSelectedProjectStatus(selectedProjectStatus.filter(s => s !== value));
        break;
      case 'price':
        setMinPrice("");
        setMaxPrice("");
        break;
      default:
        break;
    }
  };

  // Wishlist handler: redirect to login for now
  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = LOGIN;
  };

  const {  } = useContext(DataContext);
  
  return (
    <div>
      <Helmet>
        <title>
        Explore Commercial Properties in India - 100acress
        </title>
        <meta
          name="description"
          content="Unlock growth with 100acress's commercial projects. Modern spaces, strategic locations, and excellent connectivity await. Call now!"
        />
        <meta property="og:title" content="Explore Commercial Properties in India - 100acress" />
        <meta property="og:site_name" content="100acress" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/logo.webp" />
        <meta property="og:url" content="https://www.100acress.com/projects/commercial/" />
        <meta property="og:description" content="Unlock growth with 100acress's commercial projects. Modern spaces, strategic locations, and excellent connectivity await. Call now!" />
        <meta property="og:keywords" content="Commercial Projects in Gurgaon" />

        Twitter Tags:
        <meta name="twitter:title" content="Explore Commercial Properties in India - 100acress" />
        <meta name="twitter:description" content="Unlock growth with 100acress's commercial projects. Modern spaces, strategic locations, and excellent connectivity await. Call now!" />
        <meta name="twitter:url" content="https://twitter.com/100acressdotcom" />
        <meta name="twitter:card" content="summary" />

          <link rel="canonical" href="https://www.100acress.com/projects/commercial/" />
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
              {/* Project Status */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button className="w-full flex justify-between items-center py-4 px-4 font-semibold text-left bg-gray-50" onClick={() => toggleAccordion('projectStatus')}>
                  <span className="flex items-center gap-2">
                    <span className="text-lg">📊</span>
                    Project Status
                  </span>
                  <span className="text-gray-500">{accordion.projectStatus ? '−' : '+'}</span>
                </button>
                {accordion.projectStatus && (
                  <div className="p-4 bg-white max-h-60 overflow-y-auto">
                    <div className="grid grid-cols-1 gap-3">
                      {projectStatusOptions.map((status) => (
                        <label key={status} className="flex items-center gap-3 text-sm cursor-pointer p-2 rounded-lg hover:bg-gray-50">
                          <input
                            type="checkbox"
                            className="accent-red-500 w-4 h-4"
                            value={status}
                            checked={selectedProjectStatus.includes(status)}
                            onChange={e => handleCheckboxChange(e, setSelectedProjectStatus)}
                          />
                          <span className="text-gray-700">{status}</span>
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

              {/* Price Range */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button className="w-full flex justify-between items-center py-4 px-4 font-semibold text-left bg-gray-50" onClick={() => toggleAccordion('price')}>
                  <span className="flex items-center gap-2">
                    <span className="text-lg">💰</span>
                    Price Range (Cr)
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
                          onChange={(e) => setMinPrice(e.target.value)}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        >
                          <option value="">Select Min Price</option>
                          {priceOptions.map((price) => (
                            <option key={price} value={price}>₹{price} Cr</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Maximum Price</label>
                        <select
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        >
                          <option value="">Select Max Price</option>
                          {priceOptions.map((price) => (
                            <option key={price} value={price}>₹{price} Cr</option>
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
      <main className="min-h-screen bg-gray-50 pt-8 pb-10">
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
                  Commercial
                </span>
                <span className="text-gray-900 drop-shadow-sm"> Projects</span>
              </h1>
              
              {/* Decorative underline */}
              <div className="w-32 h-1.5 bg-gradient-to-r from-red-500 via-red-400 to-orange-500 mx-auto mb-3 rounded-full shadow-lg"></div>
              
              {/* Subtitle with reduced size */}
              <p className="text-base md:text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium tracking-wide" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Commercial projects span offices, retail, industrial, and hospitality spaces—each with unique needs for location, design, zoning, and clientele.

              </p>
            </div>
            
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-orange-500/10 rounded-3xl blur-3xl"></div>
          </div>

          {/* Responsive 2-Column Layout */}
          <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto px-2 md:px-4">
            {/* Filter Sidebar (Desktop) */}
            <aside className="hidden lg:block w-[280px] bg-gray-50 rounded-2xl shadow border border-gray-100 px-5 py-6 sticky top-20 self-start" style={{ maxHeight: 'calc(100vh - 2rem)', overflowY: 'auto' }}>
              {/* Project Status */}
              <div className="mb-3">
                <div className="font-semibold text-gray-800 mb-3">Project Status</div>
                <div className="flex flex-wrap gap-2 items-start">
                  {projectStatusOptions.map(status => (
                    <label
                      key={status}
                      className="flex items-start gap-2 text-sm min-w-0 whitespace-nowrap"
                    >
                      <input
                        type="checkbox"
                        className="accent-red-500 w-4 h-4 mt-0.5 flex-shrink-0"
                        value={status}
                        checked={selectedProjectStatus.includes(status)}
                        onChange={e => handleCheckboxChange(e, setSelectedProjectStatus)}
                      />
                      <span className="whitespace-nowrap">{status}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* City */}
              <div className="mb-3">
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
              
              {/* Price Range */}
              <div>
                <div className="font-semibold text-gray-800 mb-3">Price Range (Cr)</div>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Minimum Price</label>
                    <select
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="">Select Min Price</option>
                      {priceOptions.map((price) => (
                        <option key={price} value={price}>₹{price} Cr</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Maximum Price</label>
                    <select
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="">Select Max Price</option>
                      {priceOptions.map((price) => (
                        <option key={price} value={price}>₹{price} Cr</option>
                      ))}
                    </select>
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
                    placeholder="Search commercial projects by name or city..."
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
                    Showing {filteredData.length} results for "{searchTerm}"
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

              {/* Filter Tags */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                <div className="text-gray-700 font-semibold flex-shrink-0">Showing {filteredData.length} Commercial Projects</div>
                                 <div className="flex flex-wrap gap-2">
                   {selectedProjectStatus.map(status => (
                     <span key={status} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                       {status}
                       <button className="ml-1 hover:text-blue-900" onClick={() => removeFilter('projectStatus', status)}>×</button>
                     </span>
                   ))}
                   {selectedCities.map(city => (
                     <span key={city} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                       {city}
                       <button className="ml-1 hover:text-green-900" onClick={() => removeFilter('city', city)}>×</button>
                     </span>
                   ))}
                   {(minPrice || maxPrice) && (
                     <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                       ₹{minPrice || '0'} - ₹{maxPrice || 'Any'} Cr
                       <button className="ml-1 hover:text-gray-900" onClick={() => removeFilter('price')}>×</button>
                     </span>
                   )}
                 </div>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredData.length === 0 ? (
                  <div className="col-span-full text-center py-10">
                    <h2 className="text-xl font-semibold text-gray-600">No commercial projects found</h2>
                    <p className="text-gray-500 mt-2">Try modifying your search criteria</p>
                  </div>
                ) : (
                  paginatedData.map((project, idx) => (
                    <div
                      key={project._id || idx}
                      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400"
                      style={{ animationDelay: `${idx * 50}ms` }}
                      tabIndex={0}
                    >
                      {/* Project Image */}
                      <div className="relative overflow-hidden">
                        <img
                          src={project.frontImage?.cdn_url || project.frontImage?.url || "https://d16gdc5rm7f21b.cloudfront.net/100acre/no-image.jpg"}
                          alt={project.projectName}
                          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        {/* Top-right controls: wishlist + badge */}
                        <div className="absolute top-3 right-3 flex items-center gap-2">
                          <button
                            onClick={handleWishlist}
                            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/90 text-gray-700 hover:text-red-600 shadow-md hover:shadow-lg hover:bg-white transition"
                            aria-label="Add to wishlist (login required)"
                            title="Login to add to wishlist"
                          >
                            <MdFavoriteBorder size={20} />
                          </button>
                          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            Commercial
                          </span>
                        </div>
                      </div>

                      {/* Project Details */}
                      <div className="flex flex-col flex-1 p-4">
                        {/* Project Name */}
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
                          {project.projectName}
                        </h3>

                        {/* Location */}
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="truncate">{project.city}, {project.state}</span>
                        </div>

                        {/* Property Type */}
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                          <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span className="truncate">{project.type || project.propertyType || 'Commercial Property'}</span>
                        </div>

                        {/* Price and CTA */}
                        <div className="mt-auto">
                          <div className="text-red-500 font-bold text-xl mb-3 flex items-center gap-1">
                            ₹
                            {!project.minPrice && !project.maxPrice ? (
                              project.price ? (
                                project.price
                              ) : (
                                "Reveal Soon"
                              )
                            ) : !project.minPrice || !project.maxPrice ? (
                              "Reveal Soon"
                            ) : (
                              <>
                                {project.minPrice < 1 ? (
                                  <>{(project.minPrice * 100).toFixed()} L</>
                                ) : (
                                  <>{project.minPrice}</>
                                )}
                                {" - "}
                                {project.maxPrice} Cr
                              </>
                            )}
                          </div>
                          <a
                            href={`/${project.project_url}/`}
                            target="_top"
                            className="block w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors text-sm text-center"
                          >
                            View Details
                          </a>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <PaginationControls
                    currentPage={currentPage}
                    setCurrentPage={handlePageChange}
                    totalPages={totalPages}
                  />
                </div>
              )}
            </main>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

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

export default CommercialProject;
