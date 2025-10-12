import React, { useState } from 'react';
import { MdSearch } from 'react-icons/md';

const Hero = ({
  title,
  description,
  onSearch,
  onFilterChange,
  filters = {},
  projectType = "project-type"
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleQuickFilter = (filterType, value) => {
    onFilterChange(filterType, value);
  };

  return (
    <div className="relative bg-red-600 text-white overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center">
          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-white">
            {title}
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>

          {/* Search Container */}
          <div className="max-w-4xl mx-auto bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
            {/* Search Bar */}
            <div className="mb-4 sm:mb-6">
              <form onSubmit={handleSearch} className="relative">
                <div className="flex bg-gray-50 rounded-lg sm:rounded-xl overflow-hidden border border-gray-200">
                  <div className="flex-1 flex items-center px-3 sm:px-4 py-3 sm:py-4">
                    <MdSearch className="text-blue-500 mr-2 sm:mr-3" size={18} />
                    <input
                      type="text"
                      placeholder="Search Gurgaon, Delhi, Mumbai..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none text-sm sm:text-base"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-red-600 hover:bg-red-700 text-white font-semibold transition-all duration-300 text-sm sm:text-base"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>

            {/* Filter Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {/* All Cities */}
              <div>
                <select
                  onChange={(e) => handleQuickFilter('city', [e.target.value])}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                >
                  <option value="">All Cities</option>
                  <option value="Gurugram">Gurugram</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Noida">Noida</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bangalore">Bangalore</option>
                </select>
              </div>

              {/* All Prices */}
              <div>
                <select
                  onChange={(e) => {
                    const [min, max] = e.target.value.split('-');
                    handleQuickFilter('price', { min, max });
                  }}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                >
                  <option value="">All Prices</option>
                  <option value="50-100">₹50L - ₹1Cr</option>
                  <option value="100-200">₹1Cr - ₹2Cr</option>
                  <option value="200-500">₹2Cr - ₹5Cr</option>
                  <option value="500-1000">₹5Cr - ₹10Cr</option>
                  <option value="1000-">₹10Cr+</option>
                </select>
              </div>

              {/* All Types */}
              <div className="sm:col-span-2 lg:col-span-1">
                <select
                  onChange={(e) => handleQuickFilter('type', [e.target.value])}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                >
                  <option value="">All Types</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="SCO Plots">SCO Plots</option>
                  <option value="Luxury Villas">Luxury Villas</option>
                  <option value="Independent Floors">Independent Floors</option>
                </select>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="flex justify-center">
            <div className="animate-bounce">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
