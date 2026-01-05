import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from "../../../../../../aadharhomes/navbar";
import { Search, Clock, User, Flame, Bookmark, Share2, Eye, Home, TrendingUp, Calculator, Hammer, ArrowRight } from 'lucide-react';

const BlogInsights = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  const [dateRange, setDateRange] = useState('all-time');
  const [selectedTags, setSelectedTags] = useState([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [minViews, setMinViews] = useState('');
  const [maxViews, setMaxViews] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [popularOnly, setPopularOnly] = useState(false);

  const [blogs] = useState([
    { 
      id: 1, 
      title: 'Top 10 Real Estate Trends in 2024', 
      date: '2024-09-10', 
      author: 'John Doe',
      category: 'market-analysis',
      summary: 'Discover the most significant real estate trends shaping the market this year and what they mean for buyers and sellers.',
      content: 'Detailed analysis of the top 10 real estate trends in 2024, including market shifts, pricing trends, and investment opportunities...',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop',
      tags: ['trends', '2024', 'market-analysis', 'real-estate'],
      views: 12453,
      likes: 243,
      comments: 34,
      isBreaking: true,
      readTime: 8,
      isTrending: true
    },
    { 
      id: 2, 
      title: 'Sustainable Living: The Future of Housing', 
      date: '2024-09-08', 
      author: 'Sarah Johnson',
      category: 'sustainability',
      summary: 'How sustainable design is revolutionizing the way we think about residential and commercial properties.',
      content: 'Exploring the latest innovations in sustainable housing and how they benefit both homeowners and the environment...',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop',
      tags: ['sustainability', 'green-living', 'eco-friendly', 'design'],
      views: 9876,
      likes: 321,
      comments: 45,
      isBreaking: false,
      readTime: 6,
      isTrending: true
    },
    { 
      id: 3, 
      title: 'The Impact of Remote Work on Housing Markets', 
      date: '2024-09-05', 
      author: 'Michael Chen',
      category: 'market-trends',
      summary: 'How the work-from-anywhere movement is reshaping real estate demand and pricing.',
      content: 'Analysis of how remote work policies are influencing housing preferences and market dynamics...',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
      tags: ['remote-work', 'market-trends', 'housing-demand', 'work-from-home'],
      views: 8765,
      likes: 198,
      comments: 27,
      isBreaking: false,
      readTime: 7,
      isTrending: true
    },
    { 
      id: 4, 
      title: 'Luxury Real Estate: What Buyers Want in 2024', 
      date: '2024-09-15', 
      author: 'Emily Rodriguez',
      category: 'luxury',
      summary: 'The must-have features and amenities in today\'s luxury home market.',
      content: 'Exploring the latest trends in luxury real estate and what discerning buyers are looking for in 2024...',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=400&fit=crop',
      tags: ['luxury', 'high-end', 'real-estate', 'market-trends'],
      views: 7654,
      likes: 176,
      comments: 23,
      isBreaking: true,
      readTime: 5,
      isTrending: false
    },
    { 
      id: 5, 
      title: 'First-Time Homebuyer\'s Guide 2024', 
      date: '2024-09-12', 
      author: 'David Kim',
      category: 'home-buying',
      summary: 'Everything you need to know about buying your first home in the current market.',
      content: 'A comprehensive guide to navigating the home buying process, from pre-approval to closing...',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=400&fit=crop',
      tags: ['first-time-buyer', 'home-buying', 'real-estate-tips', 'mortgage'],
      views: 10987,
      likes: 432,
      comments: 56,
      isBreaking: false,
      readTime: 10,
      isTrending: false
    },
    { 
      id: 6, 
      title: 'The Rise of Smart Homes: What\'s New in 2024', 
      date: '2024-09-18', 
      author: 'Alex Turner',
      category: 'technology',
      summary: 'The latest smart home technologies that are changing how we live.',
      content: 'Exploring cutting-edge smart home innovations and how they\'re being integrated into modern properties...',
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=400&fit=crop',
      tags: ['smart-homes', 'technology', 'home-automation', 'innovation'],
      views: 6543,
      likes: 154,
      comments: 19,
      isBreaking: false,
      readTime: 6,
      isTrending: false,
      status: 'published'
    },
    { 
      id: 7, 
      title: 'How to Choose the Perfect Neighborhood', 
      date: '2024-09-05', 
      author: 'Jane Smith',
      category: 'home-buying',
      summary: 'Expert tips on evaluating and selecting the ideal neighborhood for your lifestyle.',
      content: 'A comprehensive guide to finding the perfect neighborhood that matches your lifestyle and needs...',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop',
      tags: ['neighborhood', 'buying', 'guide', 'location'],
      views: 9876,
      likes: 543,
      comments: 87,
      isBreaking: false,
      readTime: 7,
      isTrending: true,
      status: 'published'
    },
    { 
      id: 8, 
      title: 'Investment Guide: Commercial vs Residential', 
      date: '2024-08-28', 
      author: 'Mike Johnson',
      category: 'investment',
      summary: 'Comparing commercial and residential real estate investments to help you make the right choice.',
      content: 'Detailed comparison of commercial and residential real estate investments, including risks, returns, and strategies...',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop',
      tags: ['investment', 'commercial', 'residential', 'real-estate'],
      views: 8765,
      likes: 432,
      comments: 65,
      isBreaking: false,
      readTime: 9,
      isTrending: true,
      status: 'published'
    }
  ]);

  const [guides] = useState([
    {
      id: 1,
      title: 'First Time Home Buyer Guide',
      description: 'Step-by-step guide to purchasing your first home, from pre-approval to closing.',
      icon: Home,
      iconBgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      readTime: '8 min read',
      isNew: true,
    },
    {
      id: 2,
      title: 'Investment Property Guide',
      description: 'Learn how to identify high-yield properties and build a profitable portfolio.',
      icon: TrendingUp,
      iconBgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      readTime: '12 min read',
    },
    {
      id: 3,
      title: 'Mortgage Calculator',
      description: 'Estimate your monthly payments and explore different loan scenarios.',
      icon: Calculator,
      iconBgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      readTime: '5 min read',
    },
    {
      id: 4,
      title: 'Home Renovation Guide',
      description: 'Maximize your home\'s value with strategic renovation projects.',
      icon: Hammer,
      iconBgColor: 'bg-amber-100',
      iconColor: 'text-amber-600',
      readTime: '10 min read',
      isNew: true,
    },
  ]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Get all unique categories from blogs
  const categories = [
    { id: 'all', name: 'All' },
    ...Array.from(new Set(blogs.map(blog => blog.category)))
      .filter(Boolean)
      .map(category => ({
        id: category,
        name: category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      }))
  ];

  // Get breaking blogs
  const breakingBlogs = blogs.filter(blog => blog.isBreaking);
  
  // Get trending blogs (top 3 most viewed)
  const trendingBlogs = [...blogs]
    .filter(blog => blog.isTrending)
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Skeleton loader for blog cards

  const BlogCard = ({ blog, isSelected, onClick }) => {
    return (
      
      <motion.div
        onClick={() => onClick(blog.id)}
        className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
          isSelected ? 'bg-blue-50 border-r-4 border-blue-600' : ''
        }`}
        whileHover={{ x: 4 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-start space-x-4">
          <div className="w-24 h-20 flex-shrink-0 relative">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover rounded-lg"
            />
            {blog.isBreaking && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                BREAKING
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {categories.find(cat => cat.id === blog.category)?.name || blog.category}
              </span>
              <span className="text-xs text-gray-500">
                {formatDate(blog.date)}
              </span>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-2">
              {blog.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
              {blog.summary}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 text-xs text-gray-500">
                <span className="flex items-center">
                  <User className="h-3 w-3 mr-1" />
                  {blog.author}
                </span>
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {blog.readTime} min read
                </span>
                <span className="flex items-center">
                  <Eye className="h-3 w-3 mr-1" />
                  {blog.views?.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <button className="p-1 text-gray-400 hover:text-blue-500 rounded-full hover:bg-blue-50">
                  <Bookmark className="h-3.5 w-3.5" />
                </button>
                <button className="p-1 text-gray-400 hover:text-blue-500 rounded-full hover:bg-blue-50">
                  <Share2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const filteredBlogs = useMemo(() => {
    return blogs
      .filter(blog => {
        // Advanced filters
        if (minViews && (blog.views || 0) < parseInt(minViews)) return false;
        if (maxViews && (blog.views || 0) > parseInt(maxViews)) return false;
        if (authorFilter && !blog.author.toLowerCase().includes(authorFilter.toLowerCase())) return false;
        if (popularOnly && !(blog.isPopular || (blog.views || 0) > 1000)) return false;
        // Search filter
        const matchesSearch = searchQuery === '' || 
          blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (blog.tags && blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
        
        // Category filter
        const matchesCategory = activeCategory === 'all' || blog.category === activeCategory;
        
        // Tags filter
        const matchesTags = selectedTags.length === 0 || 
          (blog.tags && selectedTags.every(tag => blog.tags.includes(tag)));
        
        // Date range filter
        const blogDate = new Date(blog.date);
        const now = new Date();
        let matchesDate = true;
        
        if (dateRange === 'today') {
          const today = new Date(now.setHours(0, 0, 0, 0));
          matchesDate = blogDate >= today;
        } else if (dateRange === 'this-week') {
          const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
          startOfWeek.setHours(0, 0, 0, 0);
          matchesDate = blogDate >= startOfWeek;
        } else if (dateRange === 'this-month') {
          const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          matchesDate = blogDate >= startOfMonth;
        } else if (dateRange === 'this-year') {
          const startOfYear = new Date(now.getFullYear(), 0, 1);
          matchesDate = blogDate >= startOfYear;
        }
        
        return matchesSearch && matchesCategory && matchesTags && matchesDate;
      })
      .sort((a, b) => {
        // Sorting
        if (sortBy === 'newest') {
          return new Date(b.date) - new Date(a.date);
        } else if (sortBy === 'oldest') {
          return new Date(a.date) - new Date(b.date);
        } else if (sortBy === 'most-views') {
          return (b.views || 0) - (a.views || 0);
        } else if (sortBy === 'most-likes') {
          return (b.likes || 0) - (a.likes || 0);
        }
        return 0;
      });
  }, [blogs, searchQuery, activeCategory, selectedTags, sortBy, dateRange, minViews, maxViews, authorFilter, popularOnly]);

  // Calculate total metrics
  const totalMetrics = blogs.reduce((acc, blog) => ({
    views: acc.views + (blog.views || 0),
    likes: acc.likes + (blog.likes || 0),
    comments: acc.comments + (blog.comments || 0),
    avgTimeOnPage: acc.avgTimeOnPage + (blog.avgTimeOnPage || 0),
  }), { views: 0, likes: 0, comments: 0, avgTimeOnPage: 0 });

  // Calculate averages
  const avgMetrics = {
    views: Math.round(totalMetrics.views / Math.max(blogs.length, 1)),
    likes: Math.round(totalMetrics.likes / Math.max(blogs.length, 1)),
    comments: Math.round(totalMetrics.comments / Math.max(blogs.length, 1)),
    avgTimeOnPage: (totalMetrics.avgTimeOnPage / Math.max(blogs.length, 1)).toFixed(1),
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden pt-16">
                <div className="flex-1 flex overflow-hidden">
          <div className="w-full max-w-5xl mx-auto overflow-y-auto px-4 py-6 pl-4 md:pl-[220px] lg:pl-[260px] xl:pl-[260px]">
            <div className="w-full">
                  <div className="flex items-center justify-between">
                    {/* <h3 className="text-sm font-medium text-blue-800">New Post</h3> */}
                  </div>
                  <div className="mt-1 text-sm text-blue-700">
                    {breakingBlogs[0].title}
                  </div>
                  <div className="mt-2">
                  </div>
                </div>
                
                {/* Enhanced Filter Bar */}
                <div className="bg-white rounded-xl p-4 mb-6 border border-gray-100 shadow-sm">
                  {/* Quick Stats */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                    <div className="text-sm text-gray-600">
                      Showing <span className="font-medium">{filteredBlogs.length}</span> of <span className="font-medium">{blogs.length}</span> articles
                    </div>
                  
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Search */}
                    <div className="relative flex-1 max-w-md">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="Search articles..."
                      />
                    </div>
                    
                    {/* Category Filter */}
                    <div className="flex-1 overflow-x-auto scrollbar-hide">
                      <div className="flex space-x-2 pb-1">
                        <button
                          onClick={() => setActiveCategory('all')}
                          className={`px-3 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                            activeCategory === 'all'
                              ? 'bg-blue-100 text-blue-700'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          All Posts
                        </button>
                        {categories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                              activeCategory === category.id
                                ? 'bg-blue-100 text-blue-700'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            {category.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>    
                  {/* Advanced Filters */}
                  {showAdvancedFilters && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Advanced Filters</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Views Range</label>
                          <div className="flex space-x-2">
                            <input
                              type="number"
                              value={minViews}
                              onChange={(e) => setMinViews(e.target.value)}
                              placeholder="Min"
                              className="block w-1/2 px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                              type="number"
                              value={maxViews}
                              onChange={(e) => setMaxViews(e.target.value)}
                              placeholder="Max"
                              className="block w-1/2 px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                          <input
                            type="text"
                            value={authorFilter}
                            onChange={(e) => setAuthorFilter(e.target.value)}
                            placeholder="Filter by author"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        
                        <div className="flex items-end">
                          <div className="flex items-center">
                            <input
                              id="popular-filter"
                              type="checkbox"
                              checked={popularOnly}
                              onChange={(e) => setPopularOnly(e.target.checked)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="popular-filter" className="ml-2 block text-sm text-gray-700">
                              Popular Posts Only
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Selected Tags */}
                  {selectedTags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedTags.map(tag => (
                        <span 
                          key={tag} 
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {tag}
                          <button 
                            onClick={() => setSelectedTags(selectedTags.filter(t => t !== tag))}
                            className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500"
                          >
                            <span className="sr-only">Remove tag</span>
                            <svg className="h-2 w-2" fill="currentColor" viewBox="0 0 8 8">
                              <path fillRule="evenodd" d="M4 3.293l2.146-2.147a.5.5 0 01.708.708L4.707 4l2.147 2.146a.5.5 0 01-.708.708L4 4.707l-2.146 2.147a.5.5 0 01-.708-.708L3.293 4 1.146 1.854a.5.5 0 01.708-.708L4 3.293z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </span>
                      ))}
                      <button 
                        onClick={() => setSelectedTags([])}
                        className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        Clear all
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Enhanced Guides Section */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6 border border-blue-100 shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Guides & Resources</h3>
                      <p className="text-sm text-gray-600 mt-1">Expert guides to help you make informed decisions</p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {guides.length} Guides Available
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {guides.map((guide) => (
                      <motion.div 
                        key={guide.id}
                        whileHover={{ y: -3, boxShadow: '0 6px 18px -2px rgba(0, 0, 0, 0.08)' }}
                        className="group relative bg-white p-4 rounded-xl border border-gray-100 transition-all duration-200 hover:border-blue-200 overflow-hidden h-full"
                      >
                        <div className="flex flex-col h-full">
                          <div className={`w-10 h-10 ${guide.iconBgColor || 'bg-blue-100'} rounded-lg flex items-center justify-center mb-3`}>
                            <guide.icon className={`h-5 w-5 ${guide.iconColor || 'text-blue-600'}`} />
                          </div>
                          
                          <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1.5 line-clamp-2">
                            {guide.title}
                          </h4>
                          
                          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                            {guide.description}
                          </p>
                          
                          <div className="mt-auto flex items-center justify-between pt-2 border-t border-gray-100">
                            <span className="inline-flex items-center text-[11px] text-gray-500">
                              <Clock className="h-3 w-3 mr-1" />
                              {guide.readTime}
                            </span>
                            <button className="text-[11px] font-medium text-blue-600 hover:text-blue-800 flex items-center transition-colors">
                              View
                              <ArrowRight className="h-3 w-3 ml-0.5" />
                            </button>
                          </div>
                        </div>
                        
                        {guide.isNew && (
                          <div className="absolute top-3 right-3">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              New
                            </span>
                          </div>
                        )}
                        
                        <div className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full bg-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-8 text-center">
                    <button className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                      Explore All Resources
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                {/* Blog List */}
                <div className="overflow-y-auto flex-1">
                  <AnimatePresence>
                    {isLoading ? (
                      // Loading skeleton
                      Array(5).fill(0).map((_, index) => (
                        <div key={index} className="p-4 border-b border-gray-100">
                          <div className="animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                            <div className="h-20 bg-gray-200 rounded-lg mb-2"></div>
                          </div>
                        </div>
                      ))
                    ) : (
                      // Actual blog list
                      <>
                        {filteredBlogs.map((blog) => (
                          <BlogCard
                            key={blog.id}
                            blog={blog}
                            isSelected={selectedBlog === blog.id}
                            onClick={setSelectedBlog}
                          />
                        ))}
                        
                        {filteredBlogs.length === 0 && (
                          <div className="p-12 text-center">
                            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 text-lg">No posts found</p>
                            <p className="text-sm text-gray-400 mt-2">Try adjusting your search query or category filter</p>
                          </div>
                        )}
                      </>
                    )}
                  </AnimatePresence>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredBlogs.length}</span> of{' '}
                    <span className="font-medium">{blogs.length}</span> results
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                      disabled={true}
                    >
                      Previous
                    </button>
                    <button 
                      className="px-3 py-1 border rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                      disabled={true}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Right Sidebar - Enhanced */}
              <div className="hidden lg:block w-96 bg-white border-l border-gray-200 p-6 overflow-y-auto shadow-inner">
                {/* About Card - Enhanced */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 mb-8 border border-blue-100 shadow-sm relative overflow-hidden">
                  <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-200 rounded-full opacity-20"></div>
                  <div className="relative">
                    <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
                      <span className="text-blue-600 mr-2">•</span>
                      Welcome to Our Real Estate Blog
                    </h2>
                    <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                      Discover expert insights, market trends, and essential tips for home buyers, sellers, and real estate investors. Our team of industry professionals shares valuable knowledge to help you make informed decisions in today's dynamic property market.
                    </p>
                    <div className="flex items-center space-x-3">
                      <button className="flex-1 bg-white text-blue-600 text-sm font-semibold py-2.5 px-4 rounded-lg border border-blue-200 hover:bg-blue-50 hover:shadow-sm transition-all duration-200">
                        Explore Articles
                      </button>
                      <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Categories - Enhanced */}
                <div className="mb-8 bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold text-gray-900 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                        <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h6l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                      </svg>
                      Browse Categories
                    </h3>
                    <span className="text-xs font-medium bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                      {categories.length} Total
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`px-3 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                          activeCategory === category.id
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Trending Posts - Enhanced */}
                <div className="mb-8 bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold text-gray-900 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.332-.441-.616-.952.86-2.351 1.226 1.256 2.09 2.217 2.502 3.2.24.56.39 1.093.413 1.592a1 1 0 01-1.008 1.073h-3.5z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M12.5 10a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 010-1h2a.5.5 0 00.5-.5v-2a.5.5 0 01.5-.5z" clipRule="evenodd" />
                      </svg>
                      Trending Now
                    </h3>
                    <span className="text-xs font-medium bg-orange-50 text-orange-600 px-2 py-1 rounded-full">
                      Hot
                    </span>
                  </div>
                  <div className="space-y-4">
                    {trendingBlogs.map((blog) => (
                      <div key={blog.id} className="flex space-x-3 group">
                        <div className="flex-shrink-0 w-16 h-16 relative">
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-gray-500">
                            {categories.find(cat => cat.id === blog.category)?.name || blog.category}
                          </p>
                          <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {blog.title}
                          </h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Popular Tags - Enhanced */}
                <div className="mb-8 bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold text-gray-900 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                      Popular Tags
                    </h3>
                    <span className="text-xs font-medium bg-purple-50 text-purple-600 px-2 py-1 rounded-full">
                      {Array.from(new Set(blogs.flatMap(blog => blog.tags || []))).filter(Boolean).length} Tags
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(
                      new Set(
                        blogs.flatMap(blog => blog.tags || [])
                      )
                    )
                    .filter(Boolean)
                    .slice(0, 10)
                    .map(tag => (
                      <button
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Newsletter Signup - Enhanced */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 shadow-sm relative overflow-hidden">
                  <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-blue-200 rounded-full opacity-10"></div>
                  <div className="relative">
                    <div className="flex items-center mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <h3 className="text-base font-semibold text-gray-900">Weekly Digest</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Get the latest real estate news, market trends, and expert insights delivered straight to your inbox every week.
                    </p>
                  <form className="space-y-3">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold py-2.5 px-4 rounded-lg hover:shadow-md hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:-translate-y-0.5"
                    >
                      Subscribe Now
                    </button>
                  </form>
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 inline-block mr-1 -mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
}

export default BlogInsights;