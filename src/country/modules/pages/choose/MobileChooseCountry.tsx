import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Search, Globe, Shield, TrendingUp, Star, ArrowRight,
  MapPin, Filter, ChevronDown, Award, Zap
} from 'lucide-react';

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

interface MobileChooseCountryProps {
  countries: CountryData[];
  search: string;
  setSearch: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  showSort: boolean;
  setShowSort: (value: boolean) => void;
  filteredCount: number;
}

const MARKET_META: Record<string, { growth: string; listings: string; tag?: string; tagColor?: string }> = {
  gb: { growth: '+5.2%', listings: '18,300+', tag: 'Trending', tagColor: '#EF4444' },
  us: { growth: '+8.4%', listings: '24,500+', tag: 'Most Popular', tagColor: '#3B82F6' },
  lk: { growth: '+11.3%', listings: '4,200+', tag: 'Emerging', tagColor: '#10B981' },
  ae: { growth: '+14.7%', listings: '12,800+', tag: 'Hot Market', tagColor: '#F59E0B' },
  sg: { growth: '+6.8%', listings: '8,900+', tag: 'Premium', tagColor: '#8B5CF6' },
  au: { growth: '+7.1%', listings: '15,600+', tag: 'High Demand', tagColor: '#EAB308' },
};

const SORT_OPTIONS = ['Default', 'Name A–Z', 'Most Listings', 'Highest Growth'];

const WHY_US = [
  {
    icon: MapPin,
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.1)',
    title: 'Local Expertise',
    desc: 'Deep market knowledge in every country.',
  },
  {
    icon: Globe,
    color: '#3B82F6',
    bg: 'rgba(59,130,246,0.1)',
    title: 'Global Reach',
    desc: '50+ markets with verified listings.',
  },
  {
    icon: Shield,
    color: '#10B981',
    bg: 'rgba(16,185,129,0.1)',
    title: 'Trusted & Secure',
    desc: 'ISO certified, fully protected.',
  },
  {
    icon: Zap,
    color: '#8B5CF6',
    bg: 'rgba(139,92,246,0.1)',
    title: '24/7 Support',
    desc: 'Expert advisors ready to help.',
  },
];

const MobileCountryCard: React.FC<{ country: CountryData }> = ({ country }) => {
  const meta = MARKET_META[country.code.toLowerCase()] || { growth: '+4.5%', listings: '1,000+' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Link to={`/country/${country.code}`}>
        <div className="group relative bg-[#0F1520] border border-white/[0.07] hover:border-amber-500/30 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 cursor-pointer">
          {/* Header with flag */}
          <div
            className="relative h-24 flex items-center justify-center overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${country.colors.primary}22 0%, ${country.colors.secondary}33 100%)` }}
          >
            <span className="text-5xl drop-shadow-lg select-none">{country.flag}</span>
            
            {/* Tag badge */}
            {meta.tag && (
              <div
                className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-bold text-white"
                style={{ background: `${meta.tagColor}CC` }}
              >
                {meta.tag}
              </div>
            )}

            {/* Growth badge */}
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/10">
              <TrendingUp className="w-2.5 h-2.5 text-emerald-400" />
              <span className="text-xs font-bold text-emerald-400">{meta.growth}</span>
            </div>
          </div>

          {/* Body */}
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors leading-tight">
                  {country.name}
                </h3>
                <span className="text-xs text-gray-500">{country.shortName}</span>
              </div>
              <div className="text-right ml-2">
                <div className="text-xs text-gray-500">Listings</div>
                <div className="text-sm font-bold text-amber-400">{meta.listings}</div>
              </div>
            </div>

            <p className="text-xs text-gray-400 line-clamp-2 mb-3 leading-relaxed">
              {country.seo.description}
            </p>

            {/* Mini stats */}
            <div className="flex items-center gap-1.5 mb-3">
              <div className="flex-1 bg-white/[0.04] rounded-lg p-2 text-center border border-white/[0.05]">
                <div className="text-[9px] text-gray-500 uppercase tracking-wider mb-0.5">Currency</div>
                <div className="text-xs font-bold text-white">{country.currencySymbol}</div>
              </div>
              <div className="flex-1 bg-white/[0.04] rounded-lg p-2 text-center border border-white/[0.05]">
                <div className="text-[9px] text-gray-500 uppercase tracking-wider mb-0.5">Phone</div>
                <div className="text-xs font-bold text-white">{country.phoneCode}</div>
              </div>
              <div className="flex-1 bg-white/[0.04] rounded-lg p-2 text-center border border-white/[0.05]">
                <div className="text-[9px] text-gray-500 uppercase tracking-wider mb-0.5">Growth</div>
                <div className="text-xs font-bold text-emerald-400">{meta.growth}</div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center justify-between py-2 px-3 rounded-lg text-xs font-semibold bg-white/[0.03] border border-white/[0.06] group-hover:bg-[rgba(255,255,255,0.06)] transition-all duration-200">
              <span className="text-white/70 group-hover:text-white">Explore</span>
              <ArrowRight className="w-3 h-3 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const MobileChooseCountry: React.FC<MobileChooseCountryProps> = ({
  countries,
  search,
  setSearch,
  sortBy,
  setSortBy,
  showSort,
  setShowSort,
  filteredCount
}) => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  return (
    <div className="min-h-screen bg-[#080C14]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-64 h-64 bg-amber-500/8 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-blue-600/8 rounded-full blur-[80px]" />
        </div>

        <div className="relative z-10 px-4 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-400 text-xs font-semibold">50+ Countries</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-black text-white leading-tight mb-4"
          >
            Choose Your{' '}
            <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
              Market
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-gray-400 mb-6 leading-relaxed"
          >
            Select a country to explore premium properties.
          </motion.p>

          {/* Quick-pick flags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-2 flex-wrap mb-6"
          >
            {countries.slice(0, 6).map((c) => (
              <Link
                key={c.code}
                to={`/country/${c.code}`}
                className="group flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] hover:border-amber-500/30 rounded-full text-xs text-gray-300 hover:text-white transition-all duration-200"
              >
                <span>{c.flag}</span>
                <span className="text-xs font-medium">{c.shortName}</span>
              </Link>
            ))}
          </motion.div>

          {/* Search + Sort */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="space-y-3 max-w-md mx-auto"
          >
            <div className="flex items-center bg-white/[0.05] border border-white/[0.1] focus-within:border-amber-500/40 rounded-lg px-3 py-2.5 gap-2">
              <Search className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search country..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="bg-transparent flex-1 text-white placeholder-gray-500 text-sm outline-none"
              />
              {search && (
                <button onClick={() => setSearch('')} className="text-gray-500 hover:text-white text-xs">✕</button>
              )}
            </div>

            {/* Sort dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSort(!showSort)}
                className="flex items-center gap-2 px-3 py-2.5 bg-white/[0.05] border border-white/[0.1] hover:border-white/20 rounded-lg text-sm text-gray-300 hover:text-white transition-all duration-200 w-full"
              >
                <Filter className="w-3.5 h-3.5" />
                {sortBy}
                <ChevronDown className={`w-3 h-3 ml-auto transition-transform ${showSort ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {showSort && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-full bg-[#131B2A] border border-white/10 rounded-lg shadow-xl overflow-hidden z-50"
                  >
                    {SORT_OPTIONS.map(opt => (
                      <button
                        key={opt}
                        onClick={() => { setSortBy(opt); setShowSort(false); }}
                        className={`w-full text-left px-3 py-2 text-sm transition-colors hover:bg-white/[0.06] ${sortBy === opt ? 'text-amber-400 font-semibold' : 'text-gray-300'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Result count */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-gray-500 text-center"
            >
              <span className="text-amber-400 font-semibold">{countries.length}</span> markets found
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Countries Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-lg mx-auto">
          <AnimatePresence mode="wait">
            {countries.length > 0 ? (
              <motion.div
                key={search + sortBy}
                className="space-y-3"
              >
                {countries.map((country: CountryData) => (
                  <MobileCountryCard key={country.code} country={country} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="text-4xl mb-3">🌍</div>
                <h3 className="text-lg font-bold text-white mb-2">No countries found</h3>
                <p className="text-gray-400 mb-4 text-sm">Try a different search term</p>
                <button
                  onClick={() => setSearch('')}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-lg text-sm transition-colors"
                >
                  Clear Search
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0A1018]" />
        <div className="relative z-10 max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full mb-4">
              <Star className="w-3 h-3 text-amber-400" />
              <span className="text-amber-400 text-xs font-semibold uppercase">Why 100acress</span>
            </div>
            <h2 className="text-2xl font-black text-white mb-3">
              Built for Global{' '}
              <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                Investors
              </span>
            </h2>
            <p className="text-gray-400 text-sm">
              Everything you need to invest in international real estate.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-3">
            {WHY_US.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="bg-[#0F1520] border border-white/[0.07] rounded-xl p-4 h-full">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                      style={{ background: item.bg }}
                    >
                      <Icon className="w-4 h-4" style={{ color: item.color }} />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 gap-3 mt-8"
          >
            {[
              { value: '50+', label: 'Countries', icon: Globe },
              { value: '10K+', label: 'Properties', icon: MapPin },
              { value: '98%', label: 'Satisfaction', icon: Star },
              { value: '15yr', label: 'Experience', icon: Award },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-center">
                  <Icon className="w-4 h-4 text-amber-400/60 mx-auto mb-2" />
                  <div className="text-2xl font-black text-amber-400 mb-1">{s.value}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">{s.label}</div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto relative overflow-hidden rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, #1a1200 0%, #0F1520 100%)',
            border: '1px solid rgba(245,158,11,0.15)',
          }}
        >
          <div className="absolute top-0 left-1/3 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 text-center p-8">
            <div className="text-4xl mb-4">🌍</div>
            <h2 className="text-xl font-black text-white mb-3">
              Not sure where to invest?
            </h2>
            <p className="text-gray-400 mb-6 text-sm">
              Get a free consultation with our global property advisors.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                to="/contact"
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-lg transition-all duration-200 text-sm"
              >
                Get Free Consultation
              </Link>
              <Link
                to="/global/projects"
                className="px-6 py-3 bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-white font-semibold rounded-lg transition-all duration-200 text-sm flex items-center justify-center gap-2"
              >
                Browse Projects
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default MobileChooseCountry;
