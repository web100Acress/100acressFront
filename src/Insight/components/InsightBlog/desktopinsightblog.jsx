import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Clock, Eye, ArrowRight, Flame, Tag, TrendingUp, BarChart3, MapPin, Download, ChevronDown } from 'lucide-react';

const DesktopInsightBlog = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCity, setSelectedCity] = useState('gurgaon');

  const posts = useMemo(
    () => [
      {
        id: 1,
        title: 'Delhi NCR Real Estate Outlook 2026: Where the Demand is Moving',
        excerpt:
          'A data-backed view of micro-markets, buyer preferences, and the impact of new connectivity projects across Gurgaon, Noida, and Faridabad.',
        category: 'market',
        date: '2026-02-01',
        author: '100acress Insights',
        readTime: 6,
        views: 18450,
        image:
          'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&h=900&fit=crop',
        tags: ['delhi ncr', 'demand', 'outlook']
      },
      {
        id: 2,
        title: 'Sector-by-Sector Price Trend: Gurgaon (2024–2026)',
        excerpt:
          'Understand what is driving price movement with a sector-wise breakdown, buyer segments, and inventory signals.',
        category: 'price-trends',
        date: '2026-01-18',
        author: 'Research Desk',
        readTime: 5,
        views: 12310,
        image:
          'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1600&h=900&fit=crop',
        tags: ['gurgaon', 'price', 'sector']
      },
      {
        id: 3,
        title: 'How Infrastructure is Reshaping New Gurgaon Corridors',
        excerpt:
          'From expressways to metro extensions—see which pockets gain the most and why early movers benefit.',
        category: 'infrastructure',
        date: '2026-01-05',
        author: 'Urban Analysis',
        readTime: 7,
        views: 9750,
        image:
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&h=900&fit=crop',
        tags: ['infra', 'corridors', 'connectivity']
      },
      {
        id: 4,
        title: 'Investor Playbook: Rental Yield vs Capital Appreciation',
        excerpt:
          'A practical guide to choosing between yield-focused assets and appreciation bets based on your horizon.',
        category: 'investment',
        date: '2025-12-22',
        author: 'Investment Team',
        readTime: 8,
        views: 14220,
        image:
          'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&h=900&fit=crop',
        tags: ['yield', 'investment', 'strategy']
      },
      {
        id: 5,
        title: 'Luxury Demand Signals: What Buyers Want in 2026',
        excerpt:
          'Amenity expectations, smart-home adoption, and why low-density living is commanding a premium.',
        category: 'luxury',
        date: '2025-12-09',
        author: 'Luxury Desk',
        readTime: 6,
        views: 11040,
        image:
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&h=900&fit=crop',
        tags: ['luxury', 'amenities', 'buyers']
      },
      {
        id: 6,
        title: 'Home Loan Rate Cycles: When to Lock vs Float',
        excerpt:
          'How rate cycles impact EMI and what a smart borrower should do when macro signals shift.',
        category: 'finance',
        date: '2025-11-28',
        author: 'Finance Desk',
        readTime: 5,
        views: 8850,
        image:
          'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1600&h=900&fit=crop',
        tags: ['home loan', 'rates', 'emi']
      },
      {
        id: 6,
        title: 'Home Loan Rate Cycles: When to Lock vs Float',
        excerpt:
          'How rate cycles impact EMI and what a smart borrower should do when macro signals shift.',
        category: 'finance',
        date: '2025-11-28',
        author: 'Finance Desk',
        readTime: 5,
        views: 8850,
        image:
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&h=900&fit=crop',
        tags: ['home loan', 'rates', 'emi']
      }
    ],
    []
  );

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
          { label: 'Weekly Price Move', value: '+1.2%', sub: 'Weighted avg • Gurgaon', icon: <TrendingUp className="w-5 h-5 text-emerald-600" />, tone: 'emerald' },
          { label: 'Demand Index', value: '78/100', sub: 'Search + enquiries', icon: <BarChart3 className="w-5 h-5 text-blue-600" />, tone: 'blue' },
          { label: 'Hot Micro‑Markets', value: '4', sub: 'Momentum pockets', icon: <MapPin className="w-5 h-5 text-violet-600" />, tone: 'violet' }
        ],
        noida: [
          { label: 'Weekly Price Move', value: '+0.9%', sub: 'Weighted avg • Noida', icon: <TrendingUp className="w-5 h-5 text-emerald-600" />, tone: 'emerald' },
          { label: 'Demand Index', value: '71/100', sub: 'Search + enquiries', icon: <BarChart3 className="w-5 h-5 text-blue-600" />, tone: 'blue' },
          { label: 'Hot Micro‑Markets', value: '3', sub: 'Momentum pockets', icon: <MapPin className="w-5 h-5 text-violet-600" />, tone: 'violet' }
        ],
        delhi: [
          { label: 'Weekly Price Move', value: '+0.6%', sub: 'Weighted avg • Delhi', icon: <TrendingUp className="w-5 h-5 text-emerald-600" />, tone: 'emerald' },
          { label: 'Demand Index', value: '68/100', sub: 'Search + enquiries', icon: <BarChart3 className="w-5 h-5 text-blue-600" />, tone: 'blue' },
          { label: 'Hot Micro‑Markets', value: '2', sub: 'Momentum pockets', icon: <MapPin className="w-5 h-5 text-violet-600" />, tone: 'violet' }
        ],
        faridabad: [
          { label: 'Weekly Price Move', value: '+0.4%', sub: 'Weighted avg • Faridabad', icon: <TrendingUp className="w-5 h-5 text-emerald-600" />, tone: 'emerald' },
          { label: 'Demand Index', value: '62/100', sub: 'Search + enquiries', icon: <BarChart3 className="w-5 h-5 text-blue-600" />, tone: 'blue' },
          { label: 'Hot Micro‑Markets', value: '1', sub: 'Momentum pockets', icon: <MapPin className="w-5 h-5 text-violet-600" />, tone: 'violet' }
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
      { id: 'market', name: 'Market' },
      { id: 'price-trends', name: 'Price Trends' },
      { id: 'infrastructure', name: 'Infrastructure' },
      { id: 'investment', name: 'Investment' },
      { id: 'luxury', name: 'Luxury' },
      { id: 'finance', name: 'Finance' }
    ],
    []
  );

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return posts.filter((p) => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      if (!matchesCategory) return false;
      if (!q) return true;

      const hay = [p.title, p.excerpt, p.author, p.category, ...(p.tags || [])]
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [activeCategory, posts, searchQuery]);

  const featured = filteredPosts[0] || posts[0];
  const rest = filteredPosts.filter((p) => p.id !== featured?.id);
  const trending = [...posts].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 4);

  const tagCounts = useMemo(() => {
    const map = new Map();
    posts.forEach((p) => {
      (p.tags || []).forEach((t) => {
        map.set(t, (map.get(t) || 0) + 1);
      });
    });
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, [posts]);

  const popularTags = tagCounts.slice(0, 10).map(([t]) => t);

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    if (Number.isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Insight Blog</h1>
            <p className="mt-1 text-sm text-gray-500 max-w-2xl">
              Research-driven articles on market movements, price trends, infrastructure, and investment strategy.
            </p>
          </div>

          <div className="w-full max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, tags, authors..."
                className="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-300"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${
                  activeCategory === c.id
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="relative">
            <button
              onClick={() => {
                const dropdown = document.getElementById('city-dropdown');
                dropdown.classList.toggle('hidden');
              }}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <MapPin className="w-4 h-4 text-red-600" />
              <span className="text-sm font-semibold text-gray-900">
                {cities.find(c => c.id === selectedCity)?.name}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            
            <div id="city-dropdown" className="hidden absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
              {cities.map((city) => (
                <button
                  key={city.id}
                  onClick={() => {
                    setSelectedCity(city.id);
                    document.getElementById('city-dropdown').classList.add('hidden');
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                    selectedCity === city.id ? 'bg-red-50 text-red-600 font-semibold' : 'text-gray-700'
                  } ${city.id === 'gurgaon' ? 'rounded-t-xl' : ''} ${city.id === 'faridabad' ? 'rounded-b-xl' : ''}`}
                >
                  {city.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          {marketPulse.map((m) => (
            <div
              key={m.label}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-extrabold text-gray-500 uppercase tracking-widest">{m.label}</div>
                  <div className="mt-2 text-2xl font-extrabold text-gray-900">{m.value}</div>
                  <div className="mt-1 text-xs text-gray-500">{m.sub}</div>
                </div>
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${
                    m.tone === 'emerald'
                      ? 'bg-emerald-50 border-emerald-200'
                      : m.tone === 'blue'
                        ? 'bg-blue-50 border-blue-200'
                        : 'bg-violet-50 border-violet-200'
                  }`}
                >
                  {m.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-12 gap-6">
          <div className="col-span-8">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="relative h-[340px]">
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-white/15 text-white border border-white/20">
                      {categories.find((c) => c.id === featured.category)?.name || featured.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-white/85">
                      <Clock className="w-3.5 h-3.5" />
                      {featured.readTime} min
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-white/85">
                      <Eye className="w-3.5 h-3.5" />
                      {(featured.views || 0).toLocaleString()}
                    </span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-white leading-snug max-w-3xl">
                    {featured.title}
                  </h2>
                  <p className="mt-2 text-sm text-white/85 max-w-3xl line-clamp-2">{featured.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-xs text-white/80">
                      <span className="font-semibold">{featured.author}</span>
                      <span className="mx-2">•</span>
                      <span>{formatDate(featured.date)}</span>
                    </div>
                    <button 
                      onClick={() => navigate(`/insights/blog/${featured.id}`)}
                      className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-white/90"
                    >
                      Read article
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-6">
              {rest.map((p) => (
                <button
                  key={p.id}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="h-44 bg-gray-100">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-extrabold text-gray-500 uppercase tracking-widest">{p.category}</div>
                        <div className="mt-2 text-base font-extrabold text-gray-900 leading-snug line-clamp-2">{p.title}</div>
                        <div className="mt-1 text-xs text-gray-500 line-clamp-2">{p.excerpt}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-extrabold text-gray-500">{formatDate(p.date)}</div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {p.readTime} min
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          {(p.views || 0).toLocaleString()}
                        </span>
                      </div>
                      <button 
                        onClick={() => navigate(`/insights/blog/${p.id}`)}
                        className="inline-flex items-center gap-1 text-sm font-bold text-gray-900 hover:text-red-600"
                      >
                        Read
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-red-600" />
                  <h4 className="text-base font-extrabold text-gray-900">Micro‑Markets to Watch</h4>
                </div>
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  {cities.find(c => c.id === selectedCity)?.name}
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {microMarkets.map((mm) => (
                  <div key={mm.name} className="p-4">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="min-w-0">
                        <div className="text-sm font-extrabold text-gray-900 truncate">{mm.name}</div>
                        <div className="mt-1 text-xs text-gray-500 line-clamp-1">{mm.reason}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-extrabold text-gray-900">{mm.change}</div>
                        <div
                          className={`mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                            mm.signal === 'Hot'
                              ? 'bg-red-50 text-red-700 border-red-200'
                              : mm.signal === 'Rising'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}
                        >
                          {mm.signal}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-500 ${
                              mm.strength >= 80 ? 'bg-red-500' :
                              mm.strength >= 65 ? 'bg-amber-500' :
                              mm.strength >= 50 ? 'bg-emerald-500' : 'bg-gray-400'
                            }`}
                            style={{ width: `${mm.strength}%` }}
                          />
                        </div>
                        <span className="text-xs font-black text-gray-600 w-10 text-right">{mm.strength}%</span>
                      </div>
                    </div>
                    <button className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700 transition-colors">
                      View details
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-200 flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" />
                <h4 className="text-base font-extrabold text-gray-900">Trending</h4>
              </div>
              <div className="divide-y divide-gray-100">
                {trending.map((p, idx) => (
                  <button key={p.id} className="w-full text-left p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 font-extrabold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-extrabold text-gray-900 line-clamp-2">{p.title}</div>
                        <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                          <span className="inline-flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" />
                            {(p.views || 0).toLocaleString()}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {p.readTime} min
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-sm overflow-hidden border border-slate-700/40">
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-black uppercase tracking-widest text-slate-300">Research Pack</div>
                    <div className="mt-2 text-lg font-extrabold text-white leading-snug">
                      Download: Weekly NCR Snapshot
                    </div>
                    <div className="mt-1 text-sm text-slate-300">
                      Micro‑market momentum, price map, and key launch tracker.
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center">
                    <Download className="w-5 h-5 text-white" />
                  </div>
                </div>
                <button className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-900 text-sm font-extrabold hover:bg-slate-100">
                  Download PDF
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="mt-2 text-xs text-slate-400">Updated every Monday • Free</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="text-base font-extrabold text-white">Weekly insights in your inbox</div>
                <div className="mt-1 text-sm text-white/80">
                  Subscribe for market notes, price trend highlights, and new research.
                </div>
                <form className="mt-4">
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="flex-1 min-w-0 px-4 py-2 text-sm text-gray-900 placeholder-gray-500 bg-white border border-r-0 border-white/20 rounded-l-xl focus:ring-2 focus:ring-white/60 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-extrabold text-red-700 bg-white rounded-r-xl hover:bg-gray-100"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
                <div className="mt-3 text-xs text-white/75">No spam. Unsubscribe anytime.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopInsightBlog;