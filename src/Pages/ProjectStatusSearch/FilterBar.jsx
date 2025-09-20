import React from 'react';
import { gradients } from './DesignTokens';

export default function FilterBar({ 
  view, 
  setView, 
  sort, 
  setSort, 
  mapView, 
  setMapView,
  filters = {},
  onFilterChange,
  onSearch
}) {
  const sorts = [
    { key: 'price', label: 'Price' },
    { key: 'newest', label: 'Newest' },
  ];

  const filterOptions = {
    city: [
      { value: '', label: 'All Cities' },
      { value: 'Gurugram', label: 'Gurugram' },
      { value: 'Noida', label: 'Noida' },
      { value: 'Delhi', label: 'Delhi' },
      { value: 'Goa', label: 'Goa' },
      { value: 'Ayodhya', label: 'Ayodhya' },
      { value: 'Mumbai', label: 'Mumbai' },
      { value: 'Panchkula', label: 'Panchkula' },
      { value: 'Kasauli', label: 'Kasauli' },
      { value: 'Dubai', label: 'Dubai' },
    ],
    projectType: [
      { value: '', label: 'All Types' },
      { value: 'Commercial Property', label: 'Commercial Property' },
      { value: 'Residential Flats', label: 'Residential Flats' },
      { value: 'SCO Plots', label: 'SCO Plots' },
      { value: 'Deen Dayal Plots', label: 'Deen Dayal Plots' },
      { value: 'Residential Plots', label: 'Residential Plots' },
      { value: 'Independent Floors', label: 'Independent Floors' },
      { value: 'Builder Floors', label: 'Builder Floors' },
      { value: 'Affordable Homes', label: 'Affordable Homes' },
      { value: 'Villas', label: 'Villas' },
      { value: 'Farm Houses', label: 'Farm House' },
    ],
    price: [
      { value: '', label: 'All Prices' },
      { value: '0,1', label: 'Under 1 Cr' },
      { value: '1,5', label: '1 to 5 Cr' },
      { value: '5,10', label: '5 to 10 Cr' },
      { value: '10,20', label: '10 to 20 Cr' },
      { value: '20,50', label: '20 to 50 Cr' },
      { value: '50,Infinity', label: 'Above 50 Cr' },
    ]
  };

  return (
    <div className="sticky top-16 z-30 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-3 flex items-center justify-center gap-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Sort Buttons */}
          <div className="flex items-center gap-2">
            {sorts.map(s => (
              <button
                key={s.key}
                onClick={() => setSort?.(s.key)}
                className={`px-3 py-1.5 rounded-full text-sm border ${sort === s.key ? 'bg-gray-900 text-white border-gray-900' : 'bg-white hover:bg-gray-50'}`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Filter Dropdowns */}
          <div className="flex items-center gap-2">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-1.5 pr-8 text-sm font-medium text-gray-700 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 min-w-[120px]"
              value={filters.city || ''}
              onChange={(e) => onFilterChange?.('city', e.target.value)}
            >
              {filterOptions.city.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>

            <select
              className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-1.5 pr-8 text-sm font-medium text-gray-700 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 min-w-[120px]"
              value={filters.location || ''}
              onChange={(e) => onFilterChange?.('location', e.target.value)}
            >
              <option value="">All Locations</option>
            </select>

            <select
              className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-1.5 pr-8 text-sm font-medium text-gray-700 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 min-w-[120px]"
              value={filters.projectType || ''}
              onChange={(e) => onFilterChange?.('projectType', e.target.value)}
            >
              {filterOptions.projectType.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>

            <select
              className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-1.5 pr-8 text-sm font-medium text-gray-700 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 min-w-[120px]"
              value={filters.price || ''}
              onChange={(e) => onFilterChange?.('price', e.target.value)}
            >
              {filterOptions.price.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

        </div>

        <div className="flex items-center gap-2">
          <button title="Grid view" onClick={() => setView?.('grid')} className={`px-3 py-1.5 rounded-lg border ${view === 'grid' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white'}`}>▦</button>
          <button title="List view" onClick={() => setView?.('list')} className={`px-3 py-1.5 rounded-lg border ${view === 'list' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white'}`}>☰</button>
        </div>
      </div>
    </div>
  );
}
