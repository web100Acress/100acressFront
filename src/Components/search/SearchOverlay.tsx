'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { useFilters } from '@/hooks/useFilters';
import { useOverlayKeyboard } from '@/hooks/useOverlay';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile?: boolean;
}

// Mock search suggestions - in real app, this would come from API
const SEARCH_SUGGESTIONS = [
  'luxury apartments london',
  'villas in manchester',
  '3 bedroom house birmingham',
  'penthouse for sale',
  'new build properties',
  'investment properties uk',
  'city centre apartments',
  'family homes with garden',
];

const TRENDING_SEARCHES = [
  'london properties',
  'manchester city centre',
  'birmingham new builds',
  'bristol harbourside',
];

export default function SearchOverlay({ isOpen, onClose, isMobile = false }: SearchOverlayProps) {
  const { filters, updateFilter } = useFilters();
  const [searchQuery, setSearchQuery] = useState(filters.search || '');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useOverlayKeyboard(onClose);

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Generate suggestions based on query
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filtered = SEARCH_SUGGESTIONS.filter(suggestion =>
        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      updateFilter('search', query.trim());
      onClose();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(searchQuery);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      // Navigate suggestions (implementation would go here)
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  if (!isOpen) return null;

  const overlayContent = (
    <div className="fixed inset-0 z-50 flex items-start justify-center">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Search Content */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-2xl mt-20 mx-4"
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center p-4 border-b border-gray-200">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search properties, locations, keywords..."
              className="flex-1 text-lg outline-none placeholder-gray-500"
            />
            {searchQuery && (
              <button
                onClick={handleClear}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            )}
            <button
              onClick={() => handleSearch(searchQuery)}
              className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </div>

          {/* Suggestions & Trending */}
          <div className="max-h-96 overflow-y-auto">
            {/* Search Suggestions */}
            <AnimatePresence>
              {showSuggestions && suggestions.length > 0 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-b border-gray-200"
                >
                  <div className="p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Recent Searches</span>
                    </div>
                    <div className="space-y-2">
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors flex items-center space-x-2"
                        >
                          <Search className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">{suggestion}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Trending Searches */}
            {!showSuggestions && (
              <div className="p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Trending Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {TRENDING_SEARCHES.map((trending, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(trending)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                      {trending}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Categories */}
            <div className="p-4 border-t border-gray-200">
              <div className="text-sm font-medium text-gray-700 mb-3">Quick Categories</div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Luxury Properties', query: 'luxury' },
                  { label: 'New Builds', query: 'new build' },
                  { label: 'City Centre', query: 'city centre' },
                  { label: 'Family Homes', query: 'family home' },
                  { label: 'Investment', query: 'investment' },
                  { label: 'Apartments', query: 'apartment' },
                ].map((category, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(category.query)}
                    className="flex items-center space-x-2 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Search className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-700">{category.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return overlayContent;
}

// Search Input Component (for inline search)
export function SearchInput({ 
  placeholder = 'Search properties...',
  className = '',
  onSearch 
}: {
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
}) {
  const { filters, updateFilter } = useFilters();
  const [query, setQuery] = useState(filters.search || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchQuery = query.trim();
    if (searchQuery) {
      updateFilter('search', searchQuery);
      onSearch?.(searchQuery);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery('')}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </form>
  );
}
