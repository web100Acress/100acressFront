import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Home, TrendingUp, Calculator, ChevronDown } from 'lucide-react';

interface CountryData {
  code: string;
  name: string;
  shortName: string;
  flag: string;
  colors: { primary: string; secondary: string };
  currency: string;
  currencySymbol: string;
  phoneCode: string;
  domain: string;
  seo: { title: string; description: string; keywords: string[] };
}

interface MobileChooseHeroProps {
  countries: CountryData[];
  search: string;
  setSearch: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  showSort: boolean;
  setShowSort: (value: boolean) => void;
  filteredCount: number;
}

const TABS = [
  { id: 'buy', label: 'Buy', icon: Home },
  { id: 'rent', label: 'Rent', icon: Search },
  { id: 'prices', label: 'Prices', icon: TrendingUp },
  { id: 'valuation', label: 'Value', icon: Calculator },
];

const SORT_OPTIONS = ['Default', 'Name A–Z', 'Most Listings', 'Highest Growth', 'Highest ROI', 'Most Popular'];

const MobileChooseHero: React.FC<MobileChooseHeroProps> = ({
  countries,
  search,
  setSearch,
  sortBy,
  setSortBy,
  showSort,
  setShowSort,
  filteredCount
}) => {
  const [activeTab, setActiveTab] = useState('buy');

  return (
    <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('https://images.ctfassets.net/02vwvgr6spsr/2DHTekDMLq8cGl0MzwPiUt/704d8937e692328c758627d2a98306b6/homepage-hero-crop.jpg?w=1440&fm=avif&q=65')`,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-lg mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Just ask <span className="text-amber-400">100acress</span>
          </h1>
          <p className="text-sm text-white/70 max-w-sm mx-auto">
            Find premium properties worldwide
          </p>
        </motion.div>

        {/* Search Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl shadow-xl overflow-hidden"
        >
          {/* Tabs - Scrollable on mobile */}
          <div className="flex overflow-x-auto border-b border-gray-200 scrollbar-hide">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-[80px] flex flex-col items-center justify-center gap-1 py-3 px-2 text-xs font-medium transition-all duration-200 ${
                    activeTab === tab.id 
                      ? 'text-slate-900 border-b-2 border-amber-500 bg-gray-50' 
                      : 'text-gray-500 hover:text-slate-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Form */}
          <div className="p-4">
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-700 mb-2">
                {activeTab === 'buy' && 'Find properties for sale'}
                {activeTab === 'rent' && 'Find properties to rent'}
                {activeTab === 'prices' && 'Check property prices'}
                {activeTab === 'valuation' && 'Get instant valuation'}
              </label>
              
              {/* Search Input */}
              <div className="relative mb-3">
                <input
                  type="text"
                  placeholder="Search country or city..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-3 py-3 pl-10 bg-gray-50 border border-gray-200 rounded-lg text-slate-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                {search && (
                  <button 
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Sort & Search Row */}
              <div className="flex gap-2">
                {/* Sort Dropdown */}
                <div className="relative flex-shrink-0">
                  <button
                    onClick={() => setShowSort(!showSort)}
                    className="flex items-center gap-1 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 hover:bg-gray-100 transition-all"
                  >
                    {sortBy}
                    <ChevronDown className={`w-3 h-3 transition-transform ${showSort ? 'rotate-180' : ''}`} />
                  </button>
                  {showSort && (
                    <div className="absolute left-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
                      {SORT_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => {
                            setSortBy(opt);
                            setShowSort(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-xs transition-colors hover:bg-gray-50 ${
                            sortBy === opt ? 'text-amber-600 font-semibold bg-amber-50' : 'text-gray-700'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Search Button */}
                <button className="flex-1 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-1 text-sm">
                  <Search className="w-4 h-4" />
                  Search
                </button>
              </div>
            </div>

            {/* Quick Countries - Horizontal Scroll */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <span className="text-xs text-gray-500 flex-shrink-0">Popular:</span>
              {countries.filter(c => !['au', 'sg', 'ca', 'de'].includes(c.code.toLowerCase())).slice(0, 6).map((c) => (
                <button
                  key={c.code}
                  onClick={() => setSearch(c.name)}
                  className="flex items-center gap-1 px-2.5 py-1.5 bg-gray-100 hover:bg-amber-100 rounded-full text-xs text-gray-600 hover:text-amber-700 transition-all flex-shrink-0"
                >
                  <span>{c.flag}</span>
                  <span>{c.shortName}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Valuation Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 bg-slate-900/90 backdrop-blur-sm rounded-xl p-4 border border-white/10"
        >
          <div className="flex flex-col gap-3">
            <div>
              <h3 className="text-sm font-bold text-white mb-1">
                Want to know your property's value?
              </h3>
              <p className="text-xs text-gray-400">
                Get your 100acress price estimate in just a few clicks.
              </p>
            </div>
            <button className="w-full px-4 py-2.5 bg-white hover:bg-gray-100 text-slate-900 font-semibold rounded-lg text-xs transition-all">
              Get an instant valuation
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-center"
        >
          <p className="text-xs text-white/60">
            Showing <span className="text-amber-400 font-semibold">{filteredCount}</span> countries
            {search && <> for "<span className="text-white">{search}</span>"</>}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MobileChooseHero;
