'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFilters, UK_FILTER_OPTIONS } from '@/hooks/useFilters';
import { useOverlay, useOverlayKeyboard } from '@/hooks/useOverlay';
import { X, Filter, Search, ChevronDown } from 'lucide-react';

interface FilterOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile?: boolean;
}

export default function FilterOverlay({ isOpen, onClose, isMobile = false }: FilterOverlayProps) {
  const { filters, updateFilter, clearFilters, activeFiltersCount } = useFilters();
  const [expandedSections, setExpandedSections] = useState<string[]>(['city', 'price']);
  
  useOverlayKeyboard(onClose);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleClearAll = () => {
    clearFilters();
    onClose();
  };

  const handleApply = () => {
    onClose();
  };

  if (!isOpen) return null;

  const overlayContent = (
    <div className={`${isMobile ? 'fixed inset-x-0 bottom-0' : 'fixed inset-0'} z-50 flex ${isMobile ? 'flex-col' : 'items-center justify-center'}`}>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Content */}
      <motion.div
        initial={isMobile ? { y: '100%' } : { scale: 0.95, opacity: 0 }}
        animate={isMobile ? { y: 0 } : { scale: 1, opacity: 1 }}
        exit={isMobile ? { y: '100%' } : { scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className={`relative ${isMobile ? 'w-full max-h-[80vh]' : 'w-full max-w-2xl max-h-[80vh]'} bg-white rounded-t-2xl ${!isMobile && 'rounded-2xl mx-4'} shadow-2xl overflow-hidden`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              Filters {activeFiltersCount > 0 && <span className="text-sm text-blue-600">({activeFiltersCount})</span>}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Filter Content */}
        <div className={`${isMobile ? 'max-h-[60vh]' : 'max-h-[60vh]'} overflow-y-auto p-4 space-y-4`}>
          
          {/* City Filter */}
          <FilterSection
            title="City"
            isExpanded={expandedSections.includes('city')}
            onToggle={() => toggleSection('city')}
            current={filters.city}
            options={UK_FILTER_OPTIONS.city || []}
            onSelect={(value) => updateFilter('city', value)}
          />

          {/* Property Type */}
          <FilterSection
            title="Property Type"
            isExpanded={expandedSections.includes('type')}
            onToggle={() => toggleSection('type')}
            current={filters.type}
            options={UK_FILTER_OPTIONS.type || []}
            onSelect={(value) => updateFilter('type', value)}
          />

          {/* Price Range */}
          <PriceRangeSection
            title="Price Range"
            isExpanded={expandedSections.includes('price')}
            onToggle={() => toggleSection('price')}
            current={filters.price}
            options={UK_FILTER_OPTIONS.price || []}
            onSelect={(value) => updateFilter('price', value)}
          />

          {/* Bedrooms */}
          <FilterSection
            title="Bedrooms"
            isExpanded={expandedSections.includes('bedrooms')}
            onToggle={() => toggleSection('bedrooms')}
            current={filters.bedrooms}
            options={UK_FILTER_OPTIONS.bedrooms || []}
            onSelect={(value) => updateFilter('bedrooms', value)}
          />

          {/* Status */}
          <FilterSection
            title="Status"
            isExpanded={expandedSections.includes('status')}
            onToggle={() => toggleSection('status')}
            current={filters.status}
            options={UK_FILTER_OPTIONS.status || []}
            onSelect={(value) => updateFilter('status', value)}
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleClearAll}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={handleApply}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </motion.div>
    </div>
  );
}

interface FilterSectionProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  current?: string;
  options: string[];
  onSelect: (value: string) => void;
}

function FilterSection({ title, isExpanded, onToggle, current, options, onSelect }: FilterSectionProps) {
  return (
    <div className="border border-gray-200 rounded-lg">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-gray-900">{title}</span>
        <ChevronDown 
          className={`w-4 h-4 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
        />
      </button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-3 pt-0 space-y-2">
              {options.map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <input
                    type="radio"
                    name={title}
                    value={option}
                    checked={current === option}
                    onChange={() => onSelect(option)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 capitalize">{option.replace('-', ' ')}</span>
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PriceRangeSection({ isExpanded, onToggle, current, options, onSelect }: FilterSectionProps) {
  return (
    <div className="border border-gray-200 rounded-lg">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-gray-900">Price Range</span>
        <ChevronDown 
          className={`w-4 h-4 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
        />
      </button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-3 pt-0 space-y-2">
              {options.map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <input
                    type="radio"
                    name="price"
                    value={option}
                    checked={current === option}
                    onChange={() => onSelect(option)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">
                    {option === '0-250000' && 'Under £250,000'}
                    {option === '250000-500000' && '£250,000 - £500,000'}
                    {option === '500000-750000' && '£500,000 - £750,000'}
                    {option === '750000-1000000' && '£750,000 - £1,000,000'}
                    {option === '1000000-1500000' && '£1,000,000 - £1,500,000'}
                    {option === '1500000-2000000' && '£1,500,000 - £2,000,000'}
                    {option === '2000000+' && '£2,000,000+'}
                  </span>
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
