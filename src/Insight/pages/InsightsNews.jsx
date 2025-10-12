import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from "../../aadharhomes/navbar/Navbar";
import InsightsSidebar from "../components/InsightsSidebar";
import { Search, Clock, User, TrendingUp, ArrowRight, Flame, Bookmark, Share2, MessageSquare, Eye } from 'lucide-react';

const InsightsNews = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNews, setSelectedNews] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Sample news data with more items and categories
  const [news, setNews] = useState([
    {
      id: 1,
      title: 'Real Estate Market Shows Strong Recovery in Q2 2024',
      date: '2024-09-10',
      author: 'Market Watch',
      category: 'market-trends',
      summary: 'The real estate market has shown a significant recovery with a 15% increase in transactions compared to last quarter.',
      content: 'Detailed analysis of the Q2 2024 real estate market trends, including price movements and inventory levels across major cities. The recovery has been particularly strong in the residential sector, with luxury properties leading the way.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop',
      tags: ['market', 'trends', '2024', 'recovery'],
      views: 12453,
      likes: 243,
      comments: 34,
      isBreaking: true,
      readTime: 5,
      isTrending: true
    },
    {
      id: 2,
      title: 'New Infrastructure Projects to Boost Property Values in Suburban Areas',
      date: '2024-09-08',
      author: 'Urban Development',
      category: 'infrastructure',
      summary: 'Government announces $2B investment in suburban infrastructure, expected to drive property values up by 20%.',
      content: 'The government has unveiled a comprehensive infrastructure plan focusing on suburban areas. The plan includes new highways, public transport links, and community facilities that are expected to significantly enhance property values in these regions.',
      image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&h=400&fit=crop',
      tags: ['infrastructure', 'suburban', 'investment', 'growth'],
      views: 8765,
      likes: 189,
      comments: 27,
      isBreaking: false,
      readTime: 4,
      isTrending: true
    },
    {
      id: 3,
      title: 'Sustainable Housing: The Future of Real Estate Development',
      date: '2024-09-05',
      author: 'Eco Living',
      category: 'sustainability',
      summary: 'Developers are increasingly focusing on eco-friendly construction methods and sustainable materials.',
      content: 'As environmental concerns grow, the real estate industry is shifting towards more sustainable practices. This article explores the latest trends in green building technologies and how they\'re shaping the future of housing.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop',
      tags: ['sustainability', 'green-building', 'eco-friendly', 'innovation'],
      views: 5432,
      likes: 321,
      comments: 45,
      isBreaking: false,
      readTime: 6,
      isTrending: false
    },
    {
      id: 4,
      title: 'Interest Rate Cuts Expected to Stimulate Housing Market',
      date: '2024-09-12',
      author: 'Finance Today',
      category: 'finance',
      summary: 'Central bank signals potential rate cuts, which could lead to increased mortgage applications.',
      content: 'With the central bank hinting at possible interest rate cuts in the coming months, analysts predict a surge in mortgage applications and home purchases. This article breaks down what this means for buyers and sellers.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop',
      tags: ['finance', 'interest-rates', 'mortgage', 'market-trends'],
      views: 9876,
      likes: 432,
      comments: 56,
      isBreaking: true,
      readTime: 5,
      isTrending: true
    },
    {
      id: 5,
      title: 'Luxury Real Estate Market Reaches All-Time High',
      date: '2024-09-15',
      author: 'Luxury Living',
      category: 'luxury',
      summary: 'Demand for high-end properties surges as wealthy buyers look for safe investments.',
      content: 'The luxury real estate market is experiencing unprecedented growth, with prices reaching record highs. This article explores the factors driving this trend and which markets are seeing the most activity.',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=400&fit=crop',
      tags: ['luxury', 'high-end', 'investment', 'market-trends'],
      views: 7654,
      likes: 298,
      comments: 32,
      isBreaking: false,
      readTime: 4,
      isTrending: false
    },
    {
      id: 6,
      title: 'Remote Work Continues to Reshape Housing Preferences',
      date: '2024-09-14',
      author: 'Work From Home',
      category: 'lifestyle',
      summary: 'The work-from-home trend is leading to increased demand for home offices and larger living spaces.',
      content: 'As remote work becomes the norm for many professionals, homebuyers are prioritizing properties with dedicated workspaces and larger square footage. This shift is having a significant impact on the real estate market.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
      tags: ['remote-work', 'lifestyle', 'home-office', 'trends'],
      views: 6543,
      likes: 187,
      comments: 23,
      isBreaking: false,
      readTime: 5,
      isTrending: true
    }
  ]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Categories derived from news data
  const categories = [
    { id: 'all', name: 'All News' },
    { id: 'market-trends', name: 'Market Trends' },
    { id: 'infrastructure', name: 'Infrastructure' },
    { id: 'sustainability', name: 'Sustainability' },
    { id: 'finance', name: 'Finance' },
    { id: 'luxury', name: 'Luxury' },
    { id: 'lifestyle', name: 'Lifestyle' }
  ];

  // Get trending news (top 3 most viewed)
  const trendingNews = [...news]
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);

  // Get breaking news
  const breakingNews = news.filter(item => item.isBreaking);

  // Get popular tags (appearing in multiple articles)
  const allTags = news.flatMap(item => item.tags);
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {});
  const popularTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([tag]) => tag);

  const filteredNews = news.filter(item => {
    const matchesSearch = searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Skeleton loader for news cards
  const NewsCardSkeleton = () => (
    <div className="animate-pulse">
      <div className="h-48 bg-gray-200 rounded-lg mb-3"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
    </div>
  );

  const NewsCard = ({ item, isSelected, onClick, variant = 'default' }) => {
    const cardClasses = {
      default: `p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
        isSelected ? 'bg-blue-50 border-r-4 border-blue-600' : ''
      }`,
      featured: 'bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md',
      trending: 'flex flex-col md:flex-row gap-4 p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-all'
    };

    if (variant === 'featured') {
      return (
        <motion.div
          className={cardClasses.featured}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative h-48 overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            {item.isBreaking && (
              <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md">
                BREAKING
              </span>
            )}
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {categories.find(cat => cat.id === item.category)?.name || item.category}
              </span>
              <span className="text-xs text-gray-500">
                {formatDate(item.date)}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
              {item.title}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-2">
              {item.summary}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {item.author}
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {item.readTime} min read
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1.5 text-gray-400 hover:text-blue-500 rounded-full hover:bg-blue-50">
                  <Bookmark className="h-4 w-4" />
                </button>
                <button className="p-1.5 text-gray-400 hover:text-blue-500 rounded-full hover:bg-blue-50">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      );
    }

    if (variant === 'trending') {
      return (
        <motion.div
          className={cardClasses.trending}
          whileHover={{ x: 4 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full md:w-32 flex-shrink-0">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-24 md:h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-blue-600">
                {categories.find(cat => cat.id === item.category)?.name || item.category}
              </span>
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="h-3 w-3 mr-1" />
                {item.readTime} min
              </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
              {item.title}
            </h3>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center text-xs text-gray-500">
                <Eye className="h-3 w-3 mr-1" />
                {item.views?.toLocaleString()}
              </div>
              <div className="flex items-center space-x-1">
                <button className="p-1 text-gray-400 hover:text-blue-500 rounded-full hover:bg-blue-50">
                  <Bookmark className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        onClick={() => onClick(item.id)}
        className={cardClasses.default}
        whileHover={{ x: 4 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-start space-x-4">
          <div className="w-24 h-20 flex-shrink-0 relative">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover rounded-lg"
            />
            {item.isBreaking && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                BREAKING
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {categories.find(cat => cat.id === item.category)?.name || item.category}
              </span>
              <span className="text-xs text-gray-500">
                {formatDate(item.date)}
              </span>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-2">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
              {item.summary}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 text-xs text-gray-500">
                <span className="flex items-center">
                  <User className="h-3 w-3 mr-1" />
                  {item.author}
                </span>
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {item.readTime} min
                </span>
                <span className="flex items-center">
                  <Eye className="h-3 w-3 mr-1" />
                  {item.views?.toLocaleString()}
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden pt-16">
        <InsightsSidebar />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <div className="max-w-7xl mx-auto w-full space-y-6">
            {/* Header with Search */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">News & Updates</h1>
                <p className="text-sm text-gray-500">Stay informed with the latest real estate news and market insights</p>
              </div>
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search news, tags, or categories..."
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Breaking News Banner */}
            {breakingNews.length > 0 && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-red-800">Breaking News</h3>
                      <span className="text-xs text-red-600 font-medium">LIVE</span>
                    </div>
                    <div className="mt-1 text-sm text-red-700">
                      {breakingNews[0].title}
                    </div>
                    <div className="mt-2">
                      <button
                        type="button"
                        onClick={() => setSelectedNews(breakingNews[0].id)}
                        className="inline-flex items-center text-xs font-medium text-red-700 hover:text-red-600"
                      >
                        Read more
                        <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Category Tabs */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-4 pt-4 pb-2 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-gray-900">Latest News</h2>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="mr-2">Sort by:</span>
                        <select className="bg-transparent border-0 text-sm text-blue-600 focus:ring-0 focus:ring-offset-0 p-0">
                          <option>Latest</option>
                          <option>Most Viewed</option>
                          <option>Trending</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-4 flex space-x-1 overflow-x-auto pb-2 scrollbar-hide">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setActiveCategory(category.id)}
                          className={`px-3 py-1.5 text-sm font-medium rounded-full whitespace-nowrap ${
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

                  {/* News List */}
                  <div className="divide-y divide-gray-100">
                    {isLoading ? (
                      // Skeleton loaders while loading
                      Array(3).fill(0).map((_, index) => (
                        <div key={index} className="p-4">
                          <NewsCardSkeleton />
                        </div>
                      ))
                    ) : (
                      <AnimatePresence>
                        {filteredNews.length > 0 ? (
                          filteredNews.map((item) => (
                            <NewsCard
                              key={item.id}
                              item={item}
                              isSelected={selectedNews === item.id}
                              onClick={setSelectedNews}
                            />
                          ))
                        ) : (
                          <div className="p-12 text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                vectorEffect="non-scaling-stroke"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No news found</h3>
                            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
                            <div className="mt-6">
                              <button
                                type="button"
                                onClick={() => {
                                  setSearchQuery('');
                                  setActiveCategory('all');
                                }}
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                                </svg>
                                Reset filters
                              </button>
                            </div>
                          </div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Trending Now */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center">
                      <Flame className="h-5 w-5 text-orange-500" />
                      <h3 className="ml-2 text-lg font-semibold text-gray-900">Trending Now</h3>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {trendingNews.map((item, index) => (
                      <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start">
                          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-medium text-sm">
                            {index + 1}
                          </span>
                          <div className="ml-3">
                            <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                              {item.title}
                            </h4>
                            <div className="mt-1 flex items-center text-xs text-gray-500">
                              <span>{formatDate(item.date)}</span>
                              <span className="mx-2">•</span>
                              <span>{item.views?.toLocaleString()} views</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Popular Tags */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Popular Tags</h3>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {popularTags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setSearchQuery(tag)}
                          className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          {tag.charAt(0).toUpperCase() + tag.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Newsletter Signup */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white">Get the latest news</h3>
                    <p className="mt-2 text-sm text-blue-100">Subscribe to our newsletter for weekly updates and insights.</p>
                    <form className="mt-4">
                      <div className="flex">
                        <input
                          type="email"
                          placeholder="Your email address"
                          className="flex-1 min-w-0 px-4 py-2 text-sm text-gray-900 placeholder-gray-500 bg-white border border-r-0 border-gray-300 rounded-l-lg focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition-all"
                        />
                        <button
                          type="submit"
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-800 border border-transparent rounded-r-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Subscribe
                        </button>
                      </div>
                    </form>
                    <p className="mt-3 text-xs text-blue-100">
                      We care about your data. Read our{' '}
                      <a href="/privacy" className="font-medium text-white underline hover:text-blue-50">
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InsightsNews;
