import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, Eye, Flame, Search, Tag, TrendingUp, BarChart3, MapPin, Download, ChevronDown, CheckCircle2 } from 'lucide-react';
import api from '../../../config/apiClient';

const MobileInsightBlog = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCity, setSelectedCity] = useState('gurgaon');
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch real blog data
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('blog/view');
        if (response.data?.data) {
          setPosts(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setTimeout(() => setIsLoading(false), 600);
      }
    };
    fetchPosts();
  }, []);

  const cities = useMemo(
    () => [
      { id: 'gurgaon', name: 'Gurgaon' },
      { id: 'noida', name: 'Noida' },
      { id: 'delhi', name: 'Delhi' },
      { id: 'faridabad', name: 'Faridabad' }
    ],
    []
  );

  const marketPulse = useMemo(
    () => {
      const cityData = {
        gurgaon: [
          { label: 'Price', value: '+1.2%', sub: 'Weekly • Gurgaon', icon: <TrendingUp className="w-4 h-4 text-emerald-600" />, tone: 'emerald' },
          { label: 'Demand', value: '78/100', sub: 'Search + leads', icon: <BarChart3 className="w-4 h-4 text-blue-600" />, tone: 'blue' },
          { label: 'Hot', value: '4', sub: 'Micro‑markets', icon: <MapPin className="w-4 h-4 text-violet-600" />, tone: 'violet' }
        ],
        noida: [
          { label: 'Price', value: '+0.9%', sub: 'Weekly • Noida', icon: <TrendingUp className="w-4 h-4 text-emerald-600" />, tone: 'emerald' },
          { label: 'Demand', value: '71/100', sub: 'Search + leads', icon: <BarChart3 className="w-4 h-4 text-blue-600" />, tone: 'blue' },
          { label: 'Hot', value: '3', sub: 'Micro‑markets', icon: <MapPin className="w-4 h-4 text-violet-600" />, tone: 'violet' }
        ],
        delhi: [
          { label: 'Price', value: '+0.6%', sub: 'Weekly • Delhi', icon: <TrendingUp className="w-4 h-4 text-emerald-600" />, tone: 'emerald' },
          { label: 'Demand', value: '68/100', sub: 'Search + leads', icon: <BarChart3 className="w-4 h-4 text-blue-600" />, tone: 'blue' },
          { label: 'Hot', value: '2', sub: 'Micro‑markets', icon: <MapPin className="w-4 h-4 text-violet-600" />, tone: 'violet' }
        ],
        faridabad: [
          { label: 'Price', value: '+0.4%', sub: 'Weekly • Faridabad', icon: <TrendingUp className="w-4 h-4 text-emerald-600" />, tone: 'emerald' },
          { label: 'Demand', value: '62/100', sub: 'Search + leads', icon: <BarChart3 className="w-4 h-4 text-blue-600" />, tone: 'blue' },
          { label: 'Hot', value: '1', sub: 'Micro‑markets', icon: <MapPin className="w-4 h-4 text-violet-600" />, tone: 'violet' }
        ]
      };
      return cityData[selectedCity] || cityData.gurgaon;
    },
    [selectedCity]
  );

  const microMarkets = useMemo(
    () => {
      const cityMicroMarkets = {
        gurgaon: [
          { name: 'New Gurgaon', signal: 'Hot', change: '+1.4%', strength: 85, reason: 'Dwarka Expwy absorption' },
          { name: 'Golf Course Extn', signal: 'Rising', change: '+0.9%', strength: 72, reason: 'Luxury inventory tightening' },
          { name: 'Sector 65-67', signal: 'Stable', change: '+0.3%', strength: 58, reason: 'End‑user driven' },
          { name: 'Sohna Corridor', signal: 'Rising', change: '+0.7%', strength: 68, reason: 'Infra + new launches' }
        ],
        noida: [
          { name: 'Sector 150', signal: 'Hot', change: '+1.2%', strength: 82, reason: 'Expressway connectivity' },
          { name: 'Sector 128', signal: 'Rising', change: '+0.8%', strength: 65, reason: 'Metro corridor development' },
          { name: 'Sector 75-79', signal: 'Stable', change: '+0.4%', strength: 55, reason: 'Established residential' },
          { name: 'Yamuna Expressway', signal: 'Rising', change: '+0.6%', strength: 62, reason: 'Industrial growth' }
        ],
        delhi: [
          { name: 'South Delhi', signal: 'Hot', change: '+1.0%', strength: 78, reason: 'Premium demand' },
          { name: 'Dwarka', signal: 'Rising', change: '+0.7%', strength: 64, reason: 'Airport connectivity' },
          { name: 'Lutyens Zone', signal: 'Stable', change: '+0.2%', strength: 52, reason: 'Luxury segment' },
          { name: 'East Delhi', signal: 'Stable', change: '+0.3%', strength: 48, reason: 'Affordable housing' }
        ],
        faridabad: [
          { name: 'Sector 21C', signal: 'Rising', change: '+0.8%', strength: 70, reason: 'Metro connectivity' },
          { name: 'Neharpar Area', signal: 'Stable', change: '+0.4%', strength: 56, reason: 'Developing infrastructure' },
          { name: 'Sector 15', signal: 'Stable', change: '+0.2%', strength: 45, reason: 'Old established area' },
          { name: 'Greater Faridabad', signal: 'Rising', change: '+0.5%', strength: 60, reason: 'New launches' }
        ]
      };
      return cityMicroMarkets[selectedCity] || cityMicroMarkets.gurgaon;
    },
    [selectedCity]
  );

  const categories = useMemo(
    () => [
      { id: 'all', name: 'All' },
      { id: 'Market Insight', name: 'Market' },
      { id: 'price-trends', name: 'Price Trends' },
      { id: 'infrastructure', name: 'Infrastructure' },
      { id: 'Investment', name: 'Investment' },
      { id: 'luxury', name: 'Luxury' },
      { id: 'finance', name: 'Finance' }
    ],
    []
  );

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return posts.filter((p) => {
      const matchesCategory = activeCategory === 'all' || p.blog_Category === activeCategory;
      if (!matchesCategory) return false;
      if (!q) return true;

      const hay = [p.blog_Title, p.blog_Description, p.author, p.blog_Category, ...(p.tags || [])]
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [activeCategory, posts, searchQuery]);

  const featured = filteredPosts[0];
  const list = filteredPosts.slice(1);
  const trending = [...posts].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 3);

  const tagCounts = useMemo(() => {
    const map = new Map();
    posts.forEach((p) => {
      (p.tags || []).forEach((t) => {
        map.set(t, (map.get(t) || 0) + 1);
      });
    });
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, [posts]);

  const popularTags = tagCounts.slice(0, 8).map(([t]) => t);

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    if (Number.isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getReadingTime = (description) => {
    const words = description?.replace(/<[^>]*>/g, "").split(" ").length || 0;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min`;
  };

  const blogLink = (post) => `/insights/blog/${post._id}`;

  // Shimmering Skeletons
  const BlogSkeleton = () => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-pulse mb-4">
      <div className="h-52 bg-gray-100"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-100 rounded w-1/4"></div>
        <div className="h-6 bg-gray-100 rounded w-3/4"></div>
        <div className="h-4 bg-gray-100 rounded w-full"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Market Intelligence</h1>
          <p className="mt-2 text-sm text-slate-500 font-medium">
            Real-time data-backed real estate analysis.
          </p>
        </header>

        {/* Market Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {marketPulse.map((m) => (
            <div key={m.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
              <div
                className={`w-9 h-9 mx-auto mb-3 rounded-2xl flex items-center justify-center border shadow-sm ${m.tone === 'emerald'
                  ? 'bg-emerald-50 border-emerald-100'
                  : m.tone === 'blue'
                    ? 'bg-blue-50 border-blue-100'
                    : 'bg-violet-50 border-violet-100'
                  }`}
              >
                {m.icon}
              </div>
              <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{m.label}</div>
              <div className="mt-1 text-base font-black text-slate-900">{m.value}</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-red-500 transition-colors" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search intelligence library..."
              className="w-full rounded-2xl border border-gray-100 bg-white pl-11 pr-4 py-4 text-sm font-medium outline-none shadow-sm focus:ring-2 focus:ring-red-500/10 focus:border-red-200 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Filter & City Picker */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`shrink-0 px-5 py-2.5 rounded-xl text-xs font-black transition-all border shadow-sm ${activeCategory === c.id
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-white text-slate-600 border-gray-100 hover:border-gray-200'
                  }`}
              >
                {c.name.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="relative">
            <button
              onClick={() => {
                const dropdown = document.getElementById('mobile-city-dropdown');
                dropdown.classList.toggle('hidden');
              }}
              className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-100 rounded-xl shadow-sm active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-red-600" />
                <span className="text-sm font-bold text-slate-900">
                  {cities.find(c => c.id === selectedCity)?.name} Market
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            <div id="mobile-city-dropdown" className="hidden absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-20 overflow-hidden">
              {cities.map((city) => (
                <button
                  key={city.id}
                  onClick={() => {
                    setSelectedCity(city.id);
                    document.getElementById('mobile-city-dropdown').classList.add('hidden');
                  }}
                  className={`w-full text-left px-5 py-3 text-sm font-bold transition-colors ${selectedCity === city.id ? 'bg-red-50 text-red-600' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                >
                  {city.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Post List */}
        <div className="space-y-6">
          {isLoading ? (
            <>
              <BlogSkeleton />
              <BlogSkeleton />
              <div className="flex gap-4 bg-white p-4 rounded-2xl border border-gray-100 animate-pulse">
                <div className="w-24 h-20 bg-gray-100 rounded-xl"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-100 rounded w-1/4"></div>
                  <div className="h-5 bg-gray-100 rounded w-full"></div>
                </div>
              </div>
            </>
          ) : filteredPosts.length > 0 ? (
            <>
              {/* Featured Post */}
              {featured && (
                <div
                  onClick={() => navigate(blogLink(featured))}
                  className="bg-white rounded-3xl border border-gray-100 shadow-md overflow-hidden active:scale-[0.98] transition-all"
                >
                  <div className="relative h-60">
                    <img
                      src={featured.blog_Image?.cdn_url || featured.blog_Image?.url || featured.blog_Image?.Location || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=700&fit=crop'}
                      alt={featured.blog_Title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg">
                        {featured.blog_Category || 'INSIGHT'}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h2 className="text-xl font-bold text-white leading-tight line-clamp-2">
                        {featured.blog_Title}
                      </h2>
                      <div className="mt-3 flex items-center gap-4 text-[10px] text-white/80 font-bold uppercase tracking-widest">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {getReadingTime(featured.blog_Description)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {(featured.views || 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2">
                      {featured.metaDescription || featured.blog_Description?.replace(/<[^>]*>/g, '').substring(0, 120)}...
                    </p>
                    <div className="mt-5 flex items-center justify-between pt-4 border-t border-slate-50">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                          <CheckCircle2 className="w-3 h-3" />
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verified Report</span>
                      </div>
                      <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">Read Now →</span>
                    </div>
                  </div>
                </div>
              )}

              {/* List Posts */}
              <div className="space-y-4">
                {list.map((p) => (
                  <div
                    key={p._id}
                    onClick={() => navigate(blogLink(p))}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 flex gap-4 active:scale-[0.98] transition-all"
                  >
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                      <img
                        src={p.blog_Image?.cdn_url || p.blog_Image?.url || p.blog_Image?.Location || 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400&h=400&fit=crop'}
                        alt={p.blog_Title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 py-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[9px] font-black text-red-600 uppercase tracking-widest">
                            {p.blog_Category || 'TREND'}
                          </span>
                          <span className="text-[9px] font-bold text-slate-400">{formatDate(p.createdAt)}</span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 line-clamp-2 leading-tight">
                          {p.blog_Title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {getReadingTime(p.blog_Description)}
                        </span>
                        <span className="flex items-center gap-1 text-red-600/80">
                          READ REPORT →
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="bg-white border border-gray-100 rounded-3xl p-10 text-center shadow-sm">
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black text-slate-900">No Intelligence Found</h3>
              <p className="mt-2 text-sm text-slate-500 font-medium">Try refining your search or city selection.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="mt-8 px-8 py-3 bg-red-600 text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-lg shadow-red-100 active:scale-95 transition-all"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Micro-markets Widget */}
        <div className="mt-10 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black text-white rounded-xl flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-base font-black text-slate-900 tracking-tight">Market Momentum</div>
            </div>
            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
              {cities.find(c => c.id === selectedCity)?.name}
            </div>
          </div>
          <div className="divide-y divide-slate-50">
            {microMarkets.map((mm) => (
              <div key={mm.name} className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="min-w-0">
                    <div className="text-sm font-black text-slate-900 truncate">{mm.name}</div>
                    <div className="mt-1 text-[10px] font-medium text-slate-500 leading-relaxed">{mm.reason}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-black text-emerald-600">{mm.change}</div>
                    <div
                      className={`mt-1 inline-flex items-center px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border ${mm.signal === 'Hot'
                        ? 'bg-red-50 text-red-600 border-red-100'
                        : mm.signal === 'Rising'
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                          : 'bg-slate-50 text-slate-600 border-slate-100'
                        }`}
                    >
                      {mm.signal}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-1000 ${mm.strength >= 80 ? 'bg-red-600' :
                        mm.strength >= 65 ? 'bg-emerald-500' : 'bg-slate-400'
                        }`}
                      style={{ width: `${mm.strength}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-black text-slate-400 w-8 text-right">{mm.strength}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter / Download */}
        <div className="mt-6 space-y-4">
          <div className="bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 opacity-20 blur-3xl -mr-16 -mt-16 transition-opacity group-hover:opacity-30"></div>
            <div className="relative">
              <Download className="w-8 h-8 text-red-500 mb-4" />
              <h3 className="text-lg font-black tracking-tight mb-2">Weekly Market Snapshot</h3>
              <p className="text-xs text-slate-400 font-medium leading-relaxed mb-6">
                Download the latest research on NCR price trends and infra updates.
              </p>
              <button className="w-full py-3.5 bg-white text-slate-900 text-xs font-black uppercase tracking-widest rounded-xl active:scale-95 transition-all">
                Download PDF Analysis
              </button>
            </div>
          </div>

          <div className="bg-red-600 rounded-3xl p-6 text-white text-center">
            <h3 className="text-lg font-black tracking-tight mb-4">Subscribe to Intel</h3>
            <p className="text-xs text-red-100 font-medium leading-relaxed mb-6">
              Get raw market signals delivered to your inbox every Thursday.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-xs font-bold focus:bg-white focus:text-slate-900 outline-none transition-all placeholder:text-white/60"
              />
              <button className="px-5 py-3 bg-white text-red-600 text-xs font-black uppercase tracking-widest rounded-xl active:scale-95 transition-all shadow-lg shadow-black/10">
                Join
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileInsightBlog;
