import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Clock, User, TrendingUp, ArrowRight, Flame, Bookmark, Share2, Eye, Filter, CheckCircle2 } from 'lucide-react';
import api from '../../../config/apiClient';

const InsightsNewsMobile = () => {
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
          setNews(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setTimeout(() => setIsLoading(false), 600);
      }
    };
    fetchNews();
  }, []);

  const categories = useMemo(() => [
    { id: 'all', name: 'All News' },
    { id: 'Market Insight', name: 'Market' },
    { id: 'Infrastructure', name: 'Infra' },
    { id: 'Investment', name: 'Invest' },
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
    [...news].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 3)
    , [news]);

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getReadingTime = (description) => {
    const words = description?.replace(/<[^>]*>/g, "").split(" ").length || 0;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min`;
  };

  const blogLink = (id) => `/insights/blog/${id}`;

  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl border border-slate-100 p-4 animate-pulse mb-4">
      <div className="h-40 bg-slate-100 rounded-xl mb-4"></div>
      <div className="h-4 bg-slate-100 rounded w-1/4 mb-3"></div>
      <div className="h-5 bg-slate-100 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-slate-100 rounded w-full"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-4 pt-6 pb-3 sticky top-0 z-40">
        <h1 className="text-xl font-black text-slate-900 tracking-tight">Market News</h1>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Daily Intelligence Report</p>

        <div className="mt-3 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-red-500 transition-colors" />
          <input
            type="text"
            placeholder="Search news library..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-semibold outline-none focus:bg-white focus:ring-2 focus:ring-red-500/10 focus:border-red-200 transition-all"
          />
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all border ${activeCategory === c.id
                ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-100'
                : 'bg-white text-slate-600 border-slate-100'
                }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-5">
        {/* Trending Strip */}
        {trendingNews.length > 0 && !searchQuery && activeCategory === 'all' && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-3.5 h-3.5 text-red-600" />
              <h2 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Trending Insights</h2>
            </div>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              {trendingNews.map((item, idx) => (
                <div
                  key={item._id}
                  onClick={() => navigate(blogLink(item._id))}
                  className="shrink-0 w-64 bg-slate-900 rounded-2xl p-4 text-white relative overflow-hidden active:scale-95 transition-transform"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-red-600 opacity-20 blur-2xl -mr-12 -mt-12"></div>
                  <div className="relative">
                    <span className="text-[9px] font-black text-red-500 uppercase tracking-widest mb-1.5 block">Top Pick {idx + 1}</span>
                    <h3 className="text-xs font-bold leading-tight line-clamp-2 mb-2.5">
                      {item.blog_Title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                        {(item.views || 0).toLocaleString()} Views
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-red-500" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content Feed */}
        <div className="space-y-4">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => <SkeletonCard key={i} />)
          ) : filteredNews.length > 0 ? (
            <AnimatePresence>
              {filteredNews.map((item, idx) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => navigate(blogLink(item._id))}
                  className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm active:scale-[0.98] transition-all"
                >
                  <div className="relative h-36">
                    <img
                      src={item.blog_Image?.cdn_url || item.blog_Image?.url || item.blog_Image?.Location || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop'}
                      alt={item.blog_Title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 bg-white/95 backdrop-blur-sm text-red-600 text-[8px] font-black uppercase tracking-widest rounded-md shadow-sm">
                        {item.blog_Category || 'Update'}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-3 text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                      <span className="flex items-center gap-1"><Clock className="w-2.5 h-2.5" /> {getReadingTime(item.blog_Description)}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-200" />
                      <span>{formatDate(item.createdAt)}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 leading-tight mb-1.5">
                      {item.blog_Title}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium line-clamp-2 leading-relaxed mb-3">
                      {item.metaDescription || item.blog_Description?.replace(/<[^>]*>/g, '').substring(0, 100)}...
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                        </div>
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Verified Signal</span>
                      </div>
                      <span className="text-[8px] font-black text-red-600 uppercase tracking-widest">Explore Intel →</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <div className="bg-white rounded-[2rem] border border-slate-100 p-10 text-center">
              <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900">No News Found</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">Try resetting your search query.</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="mt-6 px-6 py-3 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-red-100"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Newsletter Mobile */}
        <div className="mt-8 bg-slate-900 rounded-2xl p-5 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-600 opacity-20 blur-2xl -mr-12 -mt-12"></div>
          <div className="relative">
            <Flame className="w-6 h-6 text-red-500 mx-auto mb-3" />
            <h3 className="text-base font-black tracking-tight mb-1.5">Weekly NCR Sync</h3>
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed mb-5">
              Get the raw data highlights delivered to your inbox every Thursday.
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="support@100acress.com"
                className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-[11px] font-bold placeholder:text-slate-500 focus:bg-white focus:text-slate-900 outline-none transition-all"
              />
              <button className="w-full py-2.5 bg-white text-slate-900 text-[9px] font-black uppercase tracking-widest rounded-xl shadow-lg active:scale-95 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsNewsMobile;
