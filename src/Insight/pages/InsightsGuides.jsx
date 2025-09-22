import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from "../../aadharhomes/navbar/Navbar";
import InsightsSidebar from "../components/InsightsSidebar";
import {
  Search, BookOpen, Clock, User, ArrowRight, Bookmark, Share2, Flame,
  Home, TrendingUp, Calculator, Hammer, Star, Download, Printer, Moon, Sun,
  BookmarkCheck, BookmarkPlus, ChevronLeft, ChevronRight, Filter, X
} from 'lucide-react';

const InsightsGuides = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [savedGuides, setSavedGuides] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    level: [],
    readTime: 'any',
    sortBy: 'newest'
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const guidesPerPage = 6; // Number of guides to show per page

  // Sample guides data with enhanced structure
  const [guides] = useState([
    {
      id: 1,
      title: 'First-Time Home Buyer\'s Guide',
      date: '2024-09-05',
      author: 'Home Buying Experts',
      category: 'Buying',
      readTime: '8 min',
      level: 'Beginner',
      summary: 'A comprehensive guide for first-time home buyers covering everything from budgeting to closing.',
      content: 'Detailed guide on the home buying process, including how to get pre-approved, working with agents, and understanding closing costs.',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=400&fit=crop',
      tags: ['buying', 'first-time', 'guide'],
      views: 8765,
      icon: Home,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
      isBookmarked: false,
      isFeatured: true
    },
    {
      id: 2,
      title: 'Investment Property Guide',
      date: '2024-09-10',
      author: 'Real Estate Investors',
      category: 'Investing',
      readTime: '12 min',
      level: 'Intermediate',
      summary: 'Learn how to identify profitable investment properties and build a successful portfolio.',
      content: 'Comprehensive guide on real estate investment strategies, market analysis, and property evaluation techniques.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop',
      tags: ['investing', 'properties', 'market'],
      views: 6543,
      icon: TrendingUp,
      iconColor: 'text-green-600',
      iconBg: 'bg-green-100',
      isBookmarked: false,
      isFeatured: true
    },
    {
      id: 3,
      title: 'Mortgage Calculator Guide',
      date: '2024-09-12',
      author: 'Financial Advisors',
      category: 'Financing',
      readTime: '6 min',
      level: 'Beginner',
      summary: 'Understand how to use our mortgage calculator to estimate your payments.',
      content: 'Step-by-step guide on using mortgage calculators to plan your home financing options.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=400&fit=crop',
      tags: ['mortgage', 'calculator', 'financing'],
      views: 4321,
      icon: Calculator,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-100',
      isBookmarked: false
    },
    {
      id: 4,
      title: 'Home Renovation Guide',
      date: '2024-09-08',
      author: 'Renovation Experts',
      category: 'Improvement',
      readTime: '10 min',
      level: 'Intermediate',
      summary: 'Maximize your home\'s value with strategic renovation projects.',
      content: 'Complete guide to planning and executing home renovations that add value to your property.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=400&fit=crop',
      tags: ['renovation', 'home-improvement', 'diy'],
      views: 5678,
      icon: Hammer,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-100',
      isBookmarked: false
    }
  ]);

  // Get all unique categories
  const categories = ['all', ...new Set(guides.map(guide => guide.category))];

  // Filter and sort guides based on search and filters
  const filteredGuides = guides.filter(guide => {
    const matchesSearch = searchQuery === '' ||
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = activeCategory === 'all' || guide.category === activeCategory;

    const matchesLevel = filters.level.length === 0 ||
      filters.level.includes(guide.level.toLowerCase());

    const matchesReadTime = filters.readTime === 'any' ||
      (filters.readTime === 'short' && parseInt(guide.readTime) <= 5) ||
      (filters.readTime === 'medium' && parseInt(guide.readTime) > 5 && parseInt(guide.readTime) <= 10) ||
      (filters.readTime === 'long' && parseInt(guide.readTime) > 10);

    return matchesSearch && matchesCategory && matchesLevel && matchesReadTime;
  }).sort((a, b) => {
    if (filters.sortBy === 'newest') {
      return new Date(b.date) - new Date(a.date);
    } else if (filters.sortBy === 'popular') {
      return b.views - a.views;
    } else if (filters.sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  // Get current guides for pagination
  const indexOfLastGuide = currentPage * guidesPerPage;
  const indexOfFirstGuide = indexOfLastGuide - guidesPerPage;
  const currentGuides = filteredGuides.slice(indexOfFirstGuide, indexOfLastGuide);
  const totalPages = Math.ceil(filteredGuides.length / guidesPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory, filters]);

  // Get related guides (excluding current guide and limiting to 3)
  const getRelatedGuides = (currentGuide) => {
    return guides
      .filter(g =>
        g.id !== currentGuide.id &&
        (g.category === currentGuide.category ||
         g.tags.some(tag => currentGuide.tags.includes(tag)))
      )
      .slice(0, 3);
  };

  const toggleBookmark = (id, e) => {
    e.stopPropagation();
    // Update the guides array to toggle bookmark status
    const updatedGuides = guides.map(guide =>
      guide.id === id ? { ...guide, isBookmarked: !guide.isBookmarked } : guide
    );

    // Update the saved guides list
    setSavedGuides(prev => {
      if (savedGuides.includes(id)) {
        return prev.filter(guideId => guideId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const shareGuide = (e, guide) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: guide.title,
        text: guide.summary,
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const downloadGuide = (e, guide) => {
    e.stopPropagation();
    // In a real app, this would generate/download a PDF
    console.log(`Downloading guide: ${guide.title}`);
  };

  const printGuide = (e, guide) => {
    e.stopPropagation();
    window.print();
  };

  const GuideCard = ({ guide, isSelected, onClick, showActions = true }) => {
    const Icon = guide.icon || BookOpen;
    const [isHovered, setIsHovered] = useState(false);
    const [isSaved, setIsSaved] = useState(savedGuides.includes(guide.id));
    const relatedGuides = getRelatedGuides(guide);

    // Calculate reading progress (simulated)
    const readingProgress = Math.min(100, Math.floor(Math.random() * 100));

    return (
      <motion.div
        onClick={() => onClick(guide.id)}
        className={`group relative bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md ${
          isSelected ? 'ring-2 ring-blue-500' : 'hover:border-blue-200'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -2 }}
      >
        <div className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 ${guide.iconBg} rounded-xl flex items-center justify-center`}>
              <Icon className={`h-6 w-6 ${guide.iconColor}`} />
            </div>
            <div className="flex space-x-1">
              <button
                onClick={(e) => toggleBookmark(guide.id, e)}
                className="p-1.5 text-gray-400 hover:text-yellow-500 transition-colors group relative"
                aria-label={isSaved ? 'Remove from saved' : 'Save for later'}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {isSaved || guide.isBookmarked ? (
                  <BookmarkCheck className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ) : (
                  <BookmarkPlus className="h-5 w-5" />
                )}
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  {isSaved || guide.isBookmarked ? 'Saved' : 'Save for later'}
                </span>
              </button>

              <button
                onClick={(e) => downloadGuide(e, guide)}
                className="p-1.5 text-gray-400 hover:text-green-500 transition-colors group relative"
                aria-label="Download"
              >
                <Download className="h-5 w-5" />
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  Download PDF
                </span>
              </button>

              <button
                onClick={(e) => printGuide(e, guide)}
                className="p-1.5 text-gray-400 hover:text-purple-500 transition-colors group relative"
                aria-label="Print"
              >
                <Printer className="h-5 w-5" />
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  Print Guide
                </span>
              </button>

              <button
                onClick={(e) => shareGuide(e, guide)}
                className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors group relative"
                aria-label="Share"
              >
                <Share2 className="h-5 w-5" />
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  Share Guide
                </span>
              </button>
            </div>
          </div>

          {/* Reading Progress */}
          {readingProgress > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
              <div
                className="bg-blue-600 h-1.5 rounded-full"
                style={{ width: `${readingProgress}%` }}
              ></div>
            </div>
          )}

          <div className="mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {guide.category}
              </span>
              {guide.isFeatured && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                  <Flame className="h-3 w-3 mr-1" />
                  Featured
                </span>
              )}
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
              {guide.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2 mb-4">
              {guide.summary}
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              <span className="flex items-center text-xs text-gray-500">
                <Clock className="h-3.5 w-3.5 mr-1" />
                {guide.readTime}
              </span>
              <span className="text-xs text-gray-500">
                {guide.views?.toLocaleString()} views
              </span>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-3.5 w-3.5 ${star <= Math.ceil(guide.rating || 4) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 w-full justify-between items-center pt-3">
              <button
                className="flex-shrink-0 inline-flex items-center text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors px-2.5 py-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  // Show related guides or details
                }}
              >
                <span className="hidden sm:inline">Related</span> Guides
              </button>
              <motion.button
                className="flex-shrink-0 inline-flex items-center justify-center text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 dark:from-blue-700 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-500 transition-all duration-300 px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md active:scale-95 whitespace-nowrap"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onClick(guide.id);
                }}
              >
                <span>Read more</span>
                <motion.span
                  className="ml-1.5 flex items-center"
                  initial={{ x: 0 }}
                  animate={{ x: [0, 2, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut"
                  }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Add dark mode styles to the document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-200">
      <Navbar />
      <div className="flex flex-1 overflow-hidden pt-16">
        <InsightsSidebar />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <div className="max-w-7xl mx-auto w-full">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 rounded-2xl p-8 text-white mb-4 overflow-hidden relative">
              <div className="relative z-10 max-w-2xl">
                <h1 className="text-3xl md:text-4xl font-bold mb-3">Expert Guides & Resources</h1>
                <p className="text-blue-100 text-lg mb-6">Everything you need to know about real estate, from buying your first home to advanced investment strategies.</p>
                <div className="relative max-w-xl">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search guides by topic, keyword, or category..."
                    className="w-full pl-12 pr-4 py-3 text-gray-800 rounded-lg focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition-all"
                  />
                </div>
              </div>
              <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-blue-700 to-transparent opacity-50"></div>
            </div>

            {/* Featured Guides */}
            {filteredGuides.some(g => g.isFeatured) && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Featured Guides</h2>
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center">
                    View all
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <AnimatePresence>
                    {filteredGuides
                      .filter(guide => guide.isFeatured)
                      .map((guide) => (
                        <GuideCard
                          key={guide.id}
                          guide={guide}
                          isSelected={selectedGuide === guide.id}
                          onClick={setSelectedGuide}
                        />
                      ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* Categories Filter */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by Category</h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                >
                  <Filter className="h-3.5 w-3.5 mr-1" />
                  {showFilters ? 'Hide Filters' : 'More Filters'}
                </button>
              </div>

              <div className="relative">
                <div className="flex space-x-2 pb-2 overflow-x-auto scrollbar-hide">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                        activeCategory === category
                          ? 'bg-blue-600 text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Scroll indicators */}
                <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent pointer-events-none"></div>
              </div>

              {/* Advanced Filters */}
              {showFilters && (
                <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Level</label>
                      <div className="space-y-2">
                        {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                          <label key={level} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={filters.level.includes(level)}
                              onChange={(e) => {
                                setFilters(prev => ({
                                  ...prev,
                                  level: e.target.checked
                                    ? [...prev.level, level]
                                    : prev.level.filter(l => l !== level)
                                }));
                              }}
                              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{level}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Read Time</label>
                      <select
                        value={filters.readTime}
                        onChange={(e) => setFilters(prev => ({ ...prev, readTime: e.target.value }))}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      >
                        <option value="any">Any Length</option>
                        <option value="short">Quick Read (Under 5 min)</option>
                        <option value="medium">Medium (5-15 min)</option>
                        <option value="long">Long Read (15+ min)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sort By</label>
                      <select
                        value={filters.sortBy}
                        onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      >
                        <option value="newest">Newest First</option>
                        <option value="popular">Most Popular</option>
                        <option value="title">Title (A-Z)</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => {
                        setFilters({
                          level: [],
                          readTime: 'any',
                          sortBy: 'newest'
                        });
                        setActiveCategory('all');
                      }}
                      className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white mr-4"
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* All Guides */}
            <div className="mt-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">All Guides</h2>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select
                    className="text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    value={filters.sortBy}
                    onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                  >
                    <option value="newest">Newest First</option>
                    <option value="popular">Most Popular</option>
                    <option value="title">Title (A-Z)</option>
                  </select>
                </div>
              </div>

              {filteredGuides.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentGuides.map((guide) => (
                      <GuideCard
                        key={guide.id}
                        guide={guide}
                        isSelected={selectedGuide?.id === guide.id}
                        onClick={setSelectedGuide}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-10 flex justify-center">
                      <nav className="flex items-center gap-1" aria-label="Pagination">
                        <button
                          onClick={() => paginate(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className={`px-3 py-1.5 rounded-md ${
                            currentPage === 1
                              ? 'text-gray-400 cursor-not-allowed'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>

                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          // Show first 2 pages, current page with neighbors, and last 2 pages
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }

                          return (
                            <button
                              key={pageNum}
                              onClick={() => paginate(pageNum)}
                              className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                                currentPage === pageNum
                                  ? 'bg-blue-600 text-white'
                                  : 'text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}

                        {totalPages > 5 && currentPage < totalPages - 2 && (
                          <span className="px-2 py-1.5 text-gray-500">...</span>
                        )}

                        {totalPages > 5 && currentPage < totalPages - 2 && (
                          <button
                            onClick={() => paginate(totalPages)}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                              currentPage === totalPages
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            {totalPages}
                          </button>
                        )}

                        <button
                          onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                          className={`px-3 py-1.5 rounded-md ${
                            currentPage === totalPages
                              ? 'text-gray-400 cursor-not-allowed'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </nav>

                      <div className="mt-4 text-center text-sm text-gray-500">
                        Showing {indexOfFirstGuide + 1}-{Math.min(indexOfLastGuide, filteredGuides.length)} of {filteredGuides.length} guides
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto h-16 w-16 text-gray-400 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InsightsGuides;
