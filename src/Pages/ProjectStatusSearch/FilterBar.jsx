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
    <div className="bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl transition-all duration-300 ease-in-out rounded-full mx-2 sm:mx-6 md:mx-12 my-1">
      <div className="w-full px-2 sm:px-4 py-1.5 sm:py-2">
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {/* Sort Buttons */}
          <div className="flex items-center gap-1">
            {sorts.map(s => (
              <button
                key={s.key}
                onClick={() => setSort?.(s.key)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border border-white/30 transition-all duration-300 ease-in-out flex items-center gap-1 backdrop-blur-sm ${
                  sort === s.key 
                    ? 'bg-red-500/80 text-white shadow-lg transform scale-105' 
                    : 'bg-white/20 text-gray-800 hover:bg-white/30 hover:scale-105'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Filter Dropdowns */}
          <div className="flex items-center gap-1">
            <div className="relative">
              <select
                className="appearance-none bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-3 py-1.5 pr-6 text-xs font-medium text-gray-800 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300 ease-in-out min-w-[90px] hover:scale-105"
                value={filters.city || ''}
                onChange={(e) => onFilterChange?.('city', e.target.value)}
              >
                {filterOptions.city.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <select
                className="appearance-none bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-3 py-1.5 pr-6 text-xs font-medium text-gray-800 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300 ease-in-out min-w-[90px] hover:scale-105"
                value={filters.location || ''}
                onChange={(e) => onFilterChange?.('location', e.target.value)}
              >
                <option value="">All Locations</option>
              </select>
            </div>

            <div className="relative">
              <select
                className="appearance-none bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-3 py-1.5 pr-6 text-xs font-medium text-gray-800 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300 ease-in-out min-w-[90px] hover:scale-105"
                value={filters.projectType || ''}
                onChange={(e) => onFilterChange?.('projectType', e.target.value)}
              >
                {filterOptions.projectType.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <select
                className="appearance-none bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-3 py-1.5 pr-6 text-xs font-medium text-gray-800 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300 ease-in-out min-w-[90px] hover:scale-105"
                value={filters.price || ''}
                onChange={(e) => onFilterChange?.('price', e.target.value)}
              >
                {filterOptions.price.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1">
            <button 
              title="Grid view" 
              onClick={() => setView?.('grid')} 
              className={`px-3 py-1.5 rounded-xl border border-white/30 transition-all duration-300 ease-in-out flex items-center gap-1 backdrop-blur-sm text-xs ${
                view === 'grid' 
                  ? 'bg-red-500/80 text-white shadow-lg transform scale-105' 
                  : 'bg-white/20 text-gray-800 hover:bg-white/30 hover:scale-105'
              }`}
            >
              Grid
            </button>
            <button 
              title="List view" 
              onClick={() => setView?.('list')} 
              className={`px-3 py-1.5 rounded-xl border border-white/30 transition-all duration-300 ease-in-out flex items-center gap-1 backdrop-blur-sm text-xs ${
                view === 'list' 
                  ? 'bg-red-500/80 text-white shadow-lg transform scale-105' 
                  : 'bg-white/20 text-gray-800 hover:bg-white/30 hover:scale-105'
              }`}
            >
              List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}