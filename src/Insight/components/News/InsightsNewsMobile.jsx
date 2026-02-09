import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Clock, User, TrendingUp, ArrowRight, Flame, Bookmark, Share2, MessageSquare, Eye, Filter, X } from 'lucide-react';

const InsightsNewsMobile = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNews, setSelectedNews] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);

  // Sample news data
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
      title: 'New Infrastructure Projects to Boost Property Values',
      date: '2024-09-08',
      author: 'Urban Development',
      category: 'infrastructure',
      summary: 'Government announces $2B investment in suburban infrastructure, expected to drive property values up by 20%.',
      content: 'The government has unveiled a comprehensive infrastructure plan focusing on suburban areas. The plan includes new highways, public transport links, and community facilities.',
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
      title: 'Sustainable Housing: The Future of Real Estate',
      date: '2024-09-05',
      author: 'Eco Living',
      category: 'sustainability',
      summary: 'Developers are increasingly focusing on eco-friendly construction methods and sustainable materials.',
      content: 'As environmental concerns grow, the real estate industry is shifting towards more sustainable practices. This article explores the latest trends in green building technologies.',
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
      content: 'With the central bank hinting at possible interest rate cuts in the coming months, analysts predict a surge in mortgage applications and home purchases.',
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
      content: 'The luxury real estate market is experiencing unprecedented growth, with prices reaching record highs. This article explores the factors driving this trend.',
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
      title: 'Remote Work Reshapes Housing Preferences',
      date: '2024-09-14',
      author: 'Work From Home',
      category: 'lifestyle',
      summary: 'Work-from-home trend leads to increased demand for home offices and larger living spaces.',
      content: 'As remote work becomes the norm, homebuyers are prioritizing properties with dedicated workspaces and larger square footage.',
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

  // Categories
  const categories = [
    { id: 'all', name: 'All News' },
    { id: 'market-trends', name: 'Market Trends' },
    { id: 'infrastructure', name: 'Infrastructure' },
    { id: 'sustainability', name: 'Sustainability' },
    { id: 'finance', name: 'Finance' },
    { id: 'luxury', name: 'Luxury' },
    { id: 'lifestyle', name: 'Lifestyle' }
  ];

  // Get trending news
  const trendingNews = [...news]
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);

  // Get breaking news
  const breakingNews = news.filter(item => item.isBreaking);

  // Get popular tags
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

  // Mobile News Card
  const MobileNewsCard = ({ item, onClick }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-4 cursor-pointer" onClick={onClick}>
      <div className="relative h-40 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
        />
        {item.isBreaking && (
          <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
            <Flame className="w-3 h-3" />
            Breaking
          </div>
        )}
        {item.isTrending && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Trending
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-sm">
          {item.title}
        </h3>
        <p className="text-gray-600 text-xs mb-3 line-clamp-2">
          {item.summary}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {item.author}
            </span>
            <span>{item.readTime} min</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {item.views > 1000 ? `${(item.views / 1000).toFixed(1)}k` : item.views}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {item.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-bold text-gray-900">Real Estate News</h1>
            <button
              onClick={() => setShowCategoryFilter(!showCategoryFilter)}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full text-sm"
            />
          </div>
        </div>

        {/* Category Filter */}
        <AnimatePresence>
          {showCategoryFilter && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-gray-200 overflow-hidden"
            >
              <div className="px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setActiveCategory(category.id);
                        setShowCategoryFilter(false);
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        activeCategory === category.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Breaking News Alert */}
      {breakingNews.length > 0 && (
        <div className="bg-red-50 border-b border-red-200 px-4 py-3">
          <div className="flex items-center gap-2 mb-1">
            <Flame className="w-4 h-4 text-red-600" />
            <span className="font-semibold text-red-900 text-sm">Breaking News</span>
          </div>
          <div className="text-sm text-red-800">
            {breakingNews[0].title}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="px-4 py-4">
        {/* Trending Section */}
        {trendingNews.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h2 className="font-bold text-gray-900">Trending Now</h2>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {trendingNews.map((item, index) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 w-64 bg-white rounded-lg border border-gray-200 p-3 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedNews(item)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-xs">
                      {index + 1}
                    </div>
                    <span className="text-xs text-gray-500">{formatDate(item.date)}</span>
                  </div>
                  <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {item.views > 1000 ? `${(item.views / 1000).toFixed(1)}k` : item.views}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* News List */}
        <div className="space-y-4">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-40 bg-gray-200 rounded-lg mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
            ))
          ) : (
            <AnimatePresence>
              {filteredNews.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <MobileNewsCard
                    item={item}
                    onClick={() => setSelectedNews(item)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Popular Tags */}
        {popularTags.length > 0 && (
          <div className="mt-8 mb-4">
            <h3 className="font-bold text-gray-900 mb-3">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* News Detail Modal */}
      <AnimatePresence>
        {selectedNews && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end"
            onClick={() => setSelectedNews(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-white rounded-t-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedNews.image}
                  alt={selectedNews.title}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => setSelectedNews(null)}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2"
                >
                  <X className="w-5 h-5" />
                </button>
                {selectedNews.isBreaking && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Flame className="w-3 h-3" />
                    Breaking
                  </div>
                )}
                {selectedNews.isTrending && (
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Trending
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{selectedNews.title}</h1>
                
                <div className="flex items-center gap-4 text-gray-600 mb-4 text-sm">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {selectedNews.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {formatDate(selectedNews.date)}
                  </span>
                  <span>{selectedNews.readTime} min read</span>
                </div>

                <div className="text-gray-700 leading-relaxed mb-6">
                  {selectedNews.content}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedNews.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-gray-600">
                      <Bookmark className="w-5 h-5" />
                      <span className="text-sm">Save</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600">
                      <Share2 className="w-5 h-5" />
                      <span className="text-sm">Share</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-4 text-gray-600 text-sm">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {selectedNews.views.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      {selectedNews.comments}
                    </span>
                    <span className="flex items-center gap-1">
                      <Bookmark className="w-4 h-4" />
                      {selectedNews.likes}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InsightsNewsMobile;
