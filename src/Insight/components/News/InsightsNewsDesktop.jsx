import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Clock, User, TrendingUp, ArrowRight, Flame, Bookmark, Share2, Eye, CheckCircle2 } from 'lucide-react';
import api from '../../../config/apiClient';

const InsightsNewsDesktop = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [news, setNews] = useState([]);

  // Fetch real blog data for news
  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('blog/view');
        if (response.data?.data) {
          // In this implementation, we treat all blogs as potential news/intel
          setNews(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setTimeout(() => setIsLoading(false), 800);
      }
    };
    fetchNews();
  }, []);

  const categories = useMemo(() => [
    { id: 'all', name: 'All Intelligence' },
    { id: 'Market Insight', name: 'Market Trends' },
    { id: 'Infrastructure', name: 'Infrastructure' },
    { id: 'Investment', name: 'Investment' },
    { id: 'Luxury', name: 'Luxury' },
    { id: 'Finance', name: 'Finance' }
  ], []);

  const filteredNews = useMemo(() => {
    return news.filter(item => {
      const matchesSearch = searchQuery === '' ||
        item.blog_Title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.blog_Description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = activeCategory === 'all' || item.blog_Category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [news, searchQuery, activeCategory]);

  const trendingNews = useMemo(() =>
    [...news].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 4)
    , [news]);

  const popularTags = useMemo(() => {
    const allTags = news.flatMap(item => item.tags || []);
    const counts = allTags.reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([tag]) => tag);
  }, [news]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getReadingTime = (description) => {
    const words = description?.replace(/<[^>]*>/g, "").split(" ").length || 0;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min`;
  };

  const blogLink = (id) => `/insights/blog/${id}`;

  const CardSkeleton = () => (
    <div className="bg-white rounded-3xl border border-gray-100 p-5 animate-pulse flex gap-6">
      <div className="w-48 h-36 bg-slate-100 rounded-2xl shrink-0"></div>
      <div className="flex-1 space-y-4 py-2">
        <div className="h-4 bg-slate-100 rounded w-1/4"></div>
        <div className="h-6 bg-slate-100 rounded w-3/4"></div>
        <div className="h-10 bg-slate-100 rounded w-full"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest mb-4 border border-red-100"
            >
              <TrendingUp className="w-3 h-3" />
              Real-time Market Updates
            </motion.div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Market <span className="text-red-600">Intelligence</span> & News
            </h1>
            <p className="mt-4 text-lg text-slate-500 font-medium">
              Data-backed analysis and breaking updates from the heart of Indian real estate.
            </p>
          </div>

          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-red-500 transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search intelligence library..."
              className="w-full pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-semibold outline-none shadow-sm group-focus-within:ring-4 group-focus-within:ring-red-500/5 group-focus-within:border-red-200 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-10">
          {/* Main Feed */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Category Tabs */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`shrink-0 px-5 py-2.5 rounded-xl text-[10px] font-black transition-all border ${activeCategory === cat.id
                      ? 'bg-red-600 text-white border-red-600 shadow-lg shadow-red-200 pointer-events-none'
                      : 'bg-white text-slate-600 border-slate-100 hover:border-slate-300'
                      }`}
                  >
                    {cat.name.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Content List */}
            <div className="space-y-6">
              {isLoading ? (
                Array(4).fill(0).map((_, i) => <CardSkeleton key={i} />)
              ) : filteredNews.length > 0 ? (
                <AnimatePresence mode="popLayout">
                  {filteredNews.map((item, idx) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => navigate(blogLink(item._id))}
                      className="group bg-white rounded-[2rem] border border-slate-100 p-4 flex gap-5 items-center cursor-pointer hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500"
                    >
                      <div className="w-52 h-36 rounded-2xl overflow-hidden shrink-0 relative">
                        <img
                          src={item.blog_Image?.cdn_url || item.blog_Image?.url || item.blog_Image?.Location || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop'}
                          alt={item.blog_Title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-0.5 bg-white/95 backdrop-blur-sm text-red-600 text-[9px] font-black uppercase tracking-widest rounded-lg shadow-sm">
                            {item.blog_Category || 'Update'}
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 py-1">
                        <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                          <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {getReadingTime(item.blog_Description)}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-300" />
                          <span>{formatDate(item.createdAt)}</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-red-600 transition-colors leading-tight mb-2">
                          {item.blog_Title}
                        </h3>
                        <p className="text-sm text-slate-500 font-medium line-clamp-2 leading-relaxed mb-3">
                          {item.metaDescription || item.blog_Description?.replace(/<[^>]*>/g, '').substring(0, 150)}...
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center text-red-600 border border-red-100">
                              <CheckCircle2 className="w-3 h-3" />
                            </div>
                            <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Verified Report</span>
                          </div>
                          <motion.div
                            whileHover={{ x: 5 }}
                            className="flex items-center gap-2 text-red-600 text-[10px] font-black uppercase tracking-widest"
                          >
                            Read More <ArrowRight className="w-3.5 h-3.5" />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              ) : (
                <div className="py-20 text-center bg-white rounded-[3rem] border border-slate-100 shadow-sm px-10">
                  <div className="w-20 h-20 bg-slate-50 text-slate-400 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <Search className="w-8 h-8 opacity-50" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">End of Library</h3>
                  <p className="mt-3 text-slate-500 font-medium max-w-sm mx-auto">
                    We couldn't find any intelligence matching your current filters. Try resetting the search.
                  </p>
                  <button
                    onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                    className="mt-8 px-10 py-4 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-red-600 transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Trending Section */}
            <div className="bg-slate-900 rounded-[2.5rem] p-6 text-white relative overflow-hidden shadow-2xl shadow-slate-200">
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 opacity-20 blur-[100px] -mr-32 -mt-32"></div>

              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
                    <Flame className="w-4 h-4 text-red-500" />
                  </div>
                  <h3 className="text-lg font-black tracking-tight uppercase">High Demand Hits</h3>
                </div>

                <div className="space-y-6">
                  {trendingNews.map((item, idx) => (
                    <div
                      key={item._id}
                      onClick={() => navigate(blogLink(item._id))}
                      className="group cursor-pointer"
                    >
                      <div className="flex gap-4">
                        <span className="text-2xl font-black text-white/10 group-hover:text-red-600/50 transition-colors duration-500">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <h4 className="text-xs font-bold leading-tight group-hover:text-red-400 transition-colors line-clamp-2">
                            {item.blog_Title}
                          </h4>
                          <div className="mt-2 flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-slate-500">
                            <span className="flex items-center gap-1.5"><Eye className="w-3 h-3" /> {(item.views || 0).toLocaleString()}</span>
                            <span>•</span>
                            <span>{item.blog_Category || 'MARKET'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-8 py-4 bg-white text-slate-900 text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-xl shadow-black/20">
                  Join The Inner Circle
                </button>
              </div>
            </div>

            {/* Popular Tags */}
            <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Bookmark className="w-3.5 h-3.5 text-red-600" />
                Focused Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="px-3 py-1.5 bg-slate-50 text-slate-600 text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all border border-transparent"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter Card */}
            <div className="bg-red-600 rounded-[2.5rem] p-6 text-white text-center shadow-xl shadow-red-200">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/20">
                <Share2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black tracking-tight mb-2">Signal Subscription</h3>
              <p className="text-red-50 text-sm font-medium mb-6 leading-relaxed">
                Get the raw market data signals delivered to your terminal every Thursday.
              </p>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="support@100acress.com"
                  className="w-full px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-sm font-bold placeholder:text-red-100 focus:bg-white focus:text-slate-900 outline-none transition-all"
                />
                <button className="w-full py-3.5 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded-xl shadow-lg active:scale-95 transition-all">
                  Initialize Sync
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsNewsDesktop;
