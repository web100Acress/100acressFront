import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Footer from "../Actual_Components/Footer";
import { useSelector } from "react-redux";
import Api_Service from "../../Redux/utils/Api_Service";
import { Link } from "react-router-dom";
import CustomSkeleton from "../../Utils/CustomSkeleton";
import { PaginationControls } from "../Blog_Components/BlogManagement";

const PlotsInGurugram = () => {
  let query = "plotsingurugram";
  const { getAllProjects } = Api_Service();
  const PlotsInGurugram = useSelector(store => store?.allsectiondata?.plotsingurugram);

  // State management
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedProjectStatus, setSelectedProjectStatus] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const itemsPerPage = 18;

  // Accordion state for modal
  const [accordion, setAccordion] = useState({
    projectStatus: true,
    city: false,
    price: false,
  });
  const toggleAccordion = (key) => setAccordion((prev) => ({ ...prev, [key]: !prev[key] }));

  // Data arrays
  const cities = [
    "Gurugram", "Delhi", "Noida", "Goa", "Ayodhya", "Mumbai", "Panipat", 
    "Panchkula", "Kasauli", "Sonipat", "Karnal", "Jalandhar", "Pushkar"
  ];
  
  const projectStatusOptions = [
    "Upcoming Projects",
    "New Launch",
    "Under Construction",
    "Ready to Move"
  ];

  const priceOptions = [
    "1Cr", "2Cr", "3Cr", "4Cr", "5Cr", "6Cr", "7Cr", "8Cr", "9Cr", "10Cr"
  ];

  // Status mapping for flexible matching
  const statusMapping = {
    "Upcoming Projects": ["upcoming", "comingsoon", "coming_soon"],
    "New Launch": ["newlaunch", "new_launch", "new launch"],
    "Under Construction": ["underconstruction", "under_construction", "under construction"],
    "Ready to Move": ["readytomove", "ready_to_move", "ready to move"]
  };

  useEffect(() => {
    getAllProjects(query, 0);
  }, []);

  useEffect(() => {
    if (PlotsInGurugram) {
      setFilteredData(PlotsInGurugram);
    }
  }, [PlotsInGurugram]);

  // Filtering logic
  const applyFilters = () => {
    if (!PlotsInGurugram) return;

    let filtered = PlotsInGurugram.filter(project => {
      // Plot type filter - ensure only plots are shown
      const isPlot = project.type?.toLowerCase().includes('plot') ||
                    project.projectType?.toLowerCase().includes('plot') ||
                    project.category?.toLowerCase().includes('plot') ||
                    project.propertyType?.toLowerCase().includes('plot') ||
                    project.projectName?.toLowerCase().includes('plot') ||
                    project.description?.toLowerCase().includes('plot');

      if (!isPlot) return false;

      // Search term filter
      const matchesSearch = !searchTerm || 
        project.projectName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.city?.toLowerCase().includes(searchTerm.toLowerCase());

      // City filter
      const matchesCity = selectedCities.length === 0 ||
        selectedCities.some(city => 
          project.city?.toLowerCase().includes(city.toLowerCase())
        );

      // Project status filter
      const matchesStatus = selectedProjectStatus.length === 0 ||
        selectedProjectStatus.some(status => {
          const statusValues = statusMapping[status] || [status];
          return statusValues.some(value => 
            project.projectStatus?.toLowerCase().includes(value.toLowerCase()) ||
            project.status?.toLowerCase().includes(value.toLowerCase()) ||
            project.project_Status?.toLowerCase().includes(value.toLowerCase()) ||
            project.project_status?.toLowerCase().includes(value.toLowerCase())
          );
        });

      // Price filter
      const projectPrice = parseFloat(project.minPrice || project.price || 0);
      const matchesPrice = (!minPrice || projectPrice >= parseFloat(minPrice)) &&
                          (!maxPrice || projectPrice <= parseFloat(maxPrice));

      return matchesSearch && matchesCity && matchesStatus && matchesPrice;
    });

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedCities, selectedProjectStatus, minPrice, maxPrice, PlotsInGurugram]);

  // Handlers
  const handleCheckboxChange = (e, setSelectedState) => {
    const { value, checked } = e.target;
    setSelectedState(prev => 
      checked ? [...prev, value] : prev.filter(v => v !== value)
    );
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCities([]);
    setSelectedProjectStatus([]);
    setMinPrice("");
    setMaxPrice("");
  };

  const removeFilter = (type, value) => {
    switch (type) {
      case 'city':
        setSelectedCities(prev => prev.filter(c => c !== value));
        break;
      case 'status':
        setSelectedProjectStatus(prev => prev.filter(s => s !== value));
        break;
      case 'price':
        setMinPrice("");
        setMaxPrice("");
        break;
      default:
        break;
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Pagination
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Format price helper
  const formatPrice = (price) => {
    if (!price) return '0';
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <>
      <Helmet>
        <title>Plots in Gurugram | 100Acress</title>
        <meta name="description" content="Discover premium plots in Gurugram. Find your dream plot with detailed information, pricing, and location details. Your trusted partner for plot investment." />
        <meta name="keywords" content="plots in gurugram, residential plots, commercial plots, property investment, buy plots, real estate gurugram" />
        <link rel="canonical" href="https://www.100acress.com/projects/plots-in-gurugram/" />
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
                    <span className="text-lg">🏗️</span>
                    Project Status
                  </span>
                  <span className="text-gray-500">{accordion.projectStatus ? '−' : '+'}</span>
                </button>
                {accordion.projectStatus && (
                  <div className="p-4 bg-white">
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
                          onChange={(e) => setMinPrice(e.target.value)}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        >
                          <option value="">Select Min Price</option>
                          {priceOptions.map((price) => (
                            <option key={price} value={price}>₹{price}</option>
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

      <main className="min-h-screen bg-gray-50 pt-8 pb-10">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Enhanced Header Title Section */}
          <div className="relative text-center py-6 mb-4 px-2">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-white to-purple-50/30 rounded-3xl blur-2xl opacity-70"></div>
            
            <div className="relative z-10 max-w-5xl mx-auto pt-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 tracking-wide leading-tight" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                <span className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent drop-shadow-sm">
                  Plots in
                </span>
                <span className="text-gray-900 drop-shadow-sm"> Gurugram</span>
              </h1>
              
              <div className="w-32 h-1.5 bg-gradient-to-r from-red-500 via-red-400 to-orange-500 mx-auto mb-3 rounded-full shadow-lg"></div>
              
              <p className="text-base md:text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium tracking-wide" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Discover Premium Plots in Gurugram – Your Gateway to Prime Real Estate Investment.
              </p>
            </div>
            
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
                <div className="font-semibold text-gray-800 mb-3">Price Range</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                    <span>Min: ₹{minPrice || 'Any'}</span>
                    <span>Max: ₹{maxPrice || 'Any'}</span>
                  </div>
                  <div className="space-y-3">
                    <select
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="">Select Min Price</option>
                      {priceOptions.map((price) => (
                        <option key={price} value={price}>₹{price}</option>
                      ))}
                    </select>
                    <select
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="">Select Max Price</option>
                      {priceOptions.map((price) => (
                        <option key={price} value={price}>₹{price}</option>
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
                    placeholder="Search plots by name or city..."
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
                <div className="text-gray-700 font-semibold flex-shrink-0">Showing Plots</div>
                <div className="flex flex-wrap gap-2">
                  {selectedCities.map(city => (
                    <span key={city} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      {city}
                      <button className="ml-1 hover:text-green-900" onClick={() => removeFilter('city', city)}>×</button>
                    </span>
                  ))}
                  {selectedProjectStatus.map(status => (
                    <span key={status} className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      {status}
                      <button className="ml-1 hover:text-red-900" onClick={() => removeFilter('status', status)}>×</button>
                    </span>
                  ))}
                  {(minPrice || maxPrice) && (
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      ₹{minPrice || '0'} - ₹{maxPrice || 'Any'}
                      <button className="ml-1 hover:text-gray-900" onClick={() => removeFilter('price')}>×</button>
                    </span>
                  )}
                </div>
              </div>

              {/* Plots Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {!PlotsInGurugram || PlotsInGurugram.length === 0 ? (
                  <div className="col-span-full"><CustomSkeleton /></div>
                ) : (
                  paginatedData.map((plot, idx) => {
                    const plotUrl = plot.project_url ? `/${plot.project_url}/` : "#";
                    const imageUrl = plot.frontImage?.cdn_url || plot.frontImage?.url || "https://d16gdc5rm7f21b.cloudfront.net/100acre/no-image.jpg";
                    const location = (plot.city && plot.state) ? `${plot.city}, ${plot.state}` : "Gurugram, Haryana";
                    
                    return (
                      <Link
                        key={plot._id || idx}
                        to={plotUrl}
                        target="_top"
                        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400"
                        style={{ animationDelay: `${idx * 50}ms` }}
                        tabIndex={0}
                      >
                        {/* Plot Image */}
                        <div className="relative overflow-hidden">
                          <img
                            src={imageUrl}
                            alt={plot.projectName}
                            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute top-3 right-3">
                            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                              Plot
                            </span>
                          </div>
                        </div>

                        {/* Plot Details */}
                        <div className="flex flex-col flex-1 p-4">
                          {/* Plot Name */}
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
                            {plot.projectName}
                          </h3>

                          {/* Location */}
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="truncate">{location}</span>
                          </div>

                          {/* Plot Type */}
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                            </svg>
                            <span className="truncate">{plot.type || 'Residential Plot'}</span>
                          </div>

                          {/* Price and CTA */}
                          <div className="mt-auto">
                            <div className="text-red-500 font-bold text-xl mb-3 flex items-center gap-1">
                              ₹
                              {!plot.minPrice && !plot.maxPrice ? (
                                plot.price ? formatPrice(plot.price) : "Reveal Soon"
                              ) : !plot.minPrice || !plot.maxPrice ? (
                                "Reveal Soon"
                              ) : (
                                <>
                                  {plot.minPrice < 1 ? (
                                    <>{(plot.minPrice * 100).toFixed()} L</>
                                  ) : (
                                    <>{formatPrice(plot.minPrice)}</>
                                  )}
                                  {" - "}
                                  {formatPrice(plot.maxPrice)} Cr
                                </>
                              )}
                            </div>
                            <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors text-sm">
                              View Details
                            </button>
                          </div>
                        </div>
                      </Link>
                    );
                  })
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

export default PlotsInGurugram; 