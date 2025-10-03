import React, { useState } from 'react';
import { MdExpandMore, MdExpandLess, MdClose } from 'react-icons/md';

const FilterSidebar = ({
  filters,
  onFilterChange,
  onClearFilters,
  cities = [],
  projectStatusOptions = [],
  priceOptions = []
}) => {
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    status: true,
    city: true,
    type: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handlePriceChange = (type, value) => {
    onFilterChange('price', { ...filters.price, [type]: value });
  };

  const handleMultiSelect = (filterType, value) => {
    const currentValues = filters[filterType] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value];
    onFilterChange(filterType, newValues);
  };

  const FilterSection = ({ title, children, sectionKey, onClear }) => (
    <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-sm mb-3 sm:mb-4">
      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900 text-xs sm:text-sm">{title}</h3>
        <div className="flex items-center gap-1 sm:gap-2">
          {onClear && (
            <button
              onClick={onClear}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <MdClose size={14} />
            </button>
          )}
          <button
            onClick={() => toggleSection(sectionKey)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            {expandedSections[sectionKey] ? <MdExpandLess size={18} /> : <MdExpandMore size={18} />}
          </button>
        </div>
      </div>
      {expandedSections[sectionKey] && (
        <div className="p-3 sm:p-4">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full lg:w-80 xl:w-96 bg-gray-50 p-3 sm:p-4 lg:p-6">
      <div className="sticky top-20 sm:top-24">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg font-bold text-gray-900">Filters</h2>
          <button
            onClick={onClearFilters}
            className="text-xs sm:text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
          >
            Clear All
          </button>
        </div>

        {/* Price Range Filter */}
        <FilterSection
          title="Property Price"
          sectionKey="price"
          onClear={() => onFilterChange('price', { min: '', max: '' })}
        >
          <div className="space-y-4">
            {/* Quick Price Options */}
            <div className="space-y-2">
              {priceOptions.map((option, index) => (
                <label key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    checked={filters.priceRange?.includes(option) || false}
                    onChange={() => handleMultiSelect('priceRange', option)}
                  />
                  <span className="ml-2 text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
            
            {/* Custom Price Range */}
            <div className="pt-4 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Min Price (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.price?.min || ''}
                    onChange={(e) => handlePriceChange('min', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Max Price (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.price?.max || ''}
                    onChange={(e) => handlePriceChange('max', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </FilterSection>

        {/* Project Status Filter */}
        <FilterSection
          title="Project Status"
          sectionKey="status"
          onClear={() => onFilterChange('status', [])}
        >
          <div className="space-y-2">
            {projectStatusOptions.map((status, index) => (
              <label key={index} className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  checked={filters.status?.includes(status) || false}
                  onChange={() => handleMultiSelect('status', status)}
                />
                <span className="ml-2 text-sm text-gray-700">{status}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* City Filter */}
        <FilterSection
          title="City"
          sectionKey="city"
          onClear={() => onFilterChange('city', [])}
        >
          <div className="space-y-2">
            {cities.map((city, index) => (
              <label key={index} className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  checked={filters.city?.includes(city) || false}
                  onChange={() => handleMultiSelect('city', city)}
                />
                <span className="ml-2 text-sm text-gray-700">{city}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Property Type Filter */}
        <FilterSection
          title="Property Type"
          sectionKey="type"
          onClear={() => onFilterChange('type', [])}
        >
          <div className="space-y-2">
            {['Residential', 'Commercial', 'SCO Plots', 'Luxury Villas', 'Independent Floors', 'Plots'].map((type, index) => (
              <label key={index} className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  checked={filters.type?.includes(type) || false}
                  onChange={() => handleMultiSelect('type', type)}
                />
                <span className="ml-2 text-sm text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Active Filters Display */}
        {(filters.status?.length > 0 || filters.city?.length > 0 || filters.type?.length > 0 || filters.price?.min || filters.price?.max) && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Active Filters:</h4>
            <div className="flex flex-wrap gap-2">
              {filters.status?.map((status, index) => (
                <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {status}
                  <button
                    onClick={() => handleMultiSelect('status', status)}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
              {filters.city?.map((city, index) => (
                <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {city}
                  <button
                    onClick={() => handleMultiSelect('city', city)}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
              {filters.type?.map((type, index) => (
                <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {type}
                  <button
                    onClick={() => handleMultiSelect('type', type)}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;
