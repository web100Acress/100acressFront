import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
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

interface DesktopChooseHeroProps {
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
  { id: 'prices', label: 'House prices', icon: TrendingUp },
  { id: 'valuation', label: 'Instant valuation', icon: Calculator },
];

const SORT_OPTIONS = ['Default', 'Name A–Z', 'Most Listings', 'Highest Growth', 'Highest ROI', 'Most Popular'];

const DesktopChooseHero: React.FC<DesktopChooseHeroProps> = ({
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
    <Fragment>
      {/* Background Image Hero Section */}
      <section className="relative h-[520px] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/aaaa/c17cffe9-a330-4e52-895c-e86c011679d8.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>
      </section>

      {/* Search Card Section */}
      <section className="relative -mt-16 z-20 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id 
                      ? 'text-slate-900 border-b-2 border-amber-500 bg-gray-50' 
                      : 'text-gray-500 hover:text-slate-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Form */}
          <div className="p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {activeTab === 'buy' && 'Find properties for sale'}
                {activeTab === 'rent' && 'Find properties to rent'}
                {activeTab === 'prices' && 'Check property prices'}
                {activeTab === 'valuation' && 'Get instant valuation'}
              </label>
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search for a country, city, or location..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-slate-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                  />
                  {search && (
                    <button 
                      onClick={() => setSearch('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  )}
                </div>
                
                {/* Sort Dropdown */}
                <div className="relative">
                  {showSort && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50">
                      {SORT_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => {
                            setSortBy(opt);
                            setShowSort(false);
                          }}
                          className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-gray-50 ${
                            sortBy === opt ? 'text-amber-600 font-semibold bg-amber-50' : 'text-gray-700'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button className="px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-all flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Search
                </button>
              </div>
            </div>

            {/* Quick Countries */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* <span className="text-xs text-gray-500">Popular:</span> */}
              {countries.filter(c => !['au', 'sg', 'ca', 'de'].includes(c.code.toLowerCase())).slice(0, 6).map((c) => (
                <button
                  key={c.code}
                  onClick={() => setSearch(c.name)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-amber-100 rounded-full text-xs text-gray-600 hover:text-amber-700 transition-all"
                >
                  <span>{c.flag}</span>
                  <span>{c.shortName}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
    </Fragment>
  );
};

export default DesktopChooseHero;
