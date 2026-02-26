'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Filter, Search } from 'lucide-react';
import { useFilters } from '@/hooks/useFilters';

interface FilterButtonProps {
  onClick: () => void;
  variant?: 'filters' | 'search';
  isMobile?: boolean;
  className?: string;
}

export default function FilterButton({ 
  onClick, 
  variant = 'filters', 
  isMobile = false,
  className = ''
}: FilterButtonProps) {
  const { activeFiltersCount } = useFilters();

  const showBadge = variant === 'filters' && activeFiltersCount > 0;

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative flex items-center space-x-2 px-4 py-2 
        ${isMobile 
          ? 'bg-white border border-gray-300 rounded-lg shadow-sm' 
          : 'bg-blue-600 text-white rounded-lg hover:bg-blue-700'
        }
        transition-colors duration-200
        ${className}
      `}
    >
      {variant === 'filters' ? (
        <Filter className={`w-4 h-4 ${isMobile ? 'text-gray-600' : 'text-white'}`} />
      ) : (
        <Search className={`w-4 h-4 ${isMobile ? 'text-gray-600' : 'text-white'}`} />
      )}
      
      <span className={`text-sm font-medium ${isMobile ? 'text-gray-700' : 'text-white'}`}>
        {variant === 'filters' ? 'Filters' : 'Search'}
      </span>

      {/* Active filters badge */}
      {showBadge && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
        >
          {activeFiltersCount}
        </motion.span>
      )}
    </motion.button>
  );
}

// Mobile Filter Pills Component
export function MobileFilterPills({ onFilterClick, onSearchClick }: {
  onFilterClick: () => void;
  onSearchClick: () => void;
}) {
  const { filters, hasActiveFilters } = useFilters();

  return (
    <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center space-x-3">
        <FilterButton onClick={onFilterClick} isMobile={true} />
        <FilterButton onClick={onSearchClick} variant="search" isMobile={true} />
        
        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex-1 overflow-x-auto">
            <div className="flex space-x-2">
              {Object.entries(filters).map(([key, value]) => {
                if (!value || key === 'page' || key === 'sort') return null;
                
                return (
                  <span
                    key={key}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 whitespace-nowrap"
                  >
                    {key}: {value}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Desktop Filter Bar Component
export function DesktopFilterBar({ onFilterClick, onSearchClick }: {
  onFilterClick: () => void;
  onSearchClick: () => void;
}) {
  const { filters, hasActiveFilters } = useFilters();

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <FilterButton onClick={onFilterClick} />
          <FilterButton onClick={onSearchClick} variant="search" />
          
          {/* Quick Filter Pills */}
          <div className="flex items-center space-x-2">
            {filters.city && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                City: {filters.city}
              </span>
            )}
            {filters.type && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Type: {filters.type}
              </span>
            )}
            {filters.price && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                Price: {filters.price}
              </span>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-600">
          {hasActiveFilters ? 'Filtered results' : 'All properties'}
        </div>
      </div>
    </div>
  );
}
