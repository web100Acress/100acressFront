import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { mapCoordsToCity } from "../components/LocationContext";

export default function HeroWithFilters() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  // Primary filters
  const [category, setCategory] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [city, setCity] = useState('');

  // Advanced filters
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [areaMin, setAreaMin] = useState('');
  const [areaMax, setAreaMax] = useState('');
  const [furnishing, setFurnishing] = useState('');
  const [rera, setRera] = useState('');

  // Load persisted filters
  useEffect(() => {
    try {
      const raw = localStorage.getItem('heroFilters');
      if (raw) {
        const f = JSON.parse(raw);
        setCategory(f.category || '');
        setPropertyType(f.propertyType || '');
        setCity(f.city || '');
        setBedrooms(f.bedrooms || '');
        setBathrooms(f.bathrooms || '');
        setAreaMin(f.areaMin || '');
        setAreaMax(f.areaMax || '');
        setFurnishing(f.furnishing || '');
        setRera(f.rera || '');
      }
    } catch {}
  }, []);

  // Prefill city from saved geo coords (LocationContext mapping) if empty
  useEffect(() => {
    if (city) return;
    try {
      const s = localStorage.getItem('geoCoords');
      if (s) {
        const c = JSON.parse(s);
        if (c && typeof c.lat === 'number' && typeof c.lng === 'number') {
          const mapped = mapCoordsToCity(c);
          if (mapped) setCity(mapped.toLowerCase().replace(/\s+/g, '-'));
        }
      }
    } catch {}
  }, [city]);

  // Persist on changes (debounced-ish)
  useEffect(() => {
    const data = { category, propertyType, city, bedrooms, bathrooms, areaMin, areaMax, furnishing, rera };
    try { localStorage.setItem('heroFilters', JSON.stringify(data)); } catch {}
  }, [category, propertyType, city, bedrooms, bathrooms, areaMin, areaMax, furnishing, rera]);

  // Build query string for search
  const searchHref = useMemo(() => {
    const invalid = areaMin && areaMax && Number(areaMin) > Number(areaMax);
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (propertyType) params.set('type', propertyType);
    if (city) params.set('city', city);
    if (bedrooms) params.set('bedrooms', bedrooms);
    if (bathrooms) params.set('bathrooms', bathrooms);
    if (areaMin) params.set('areaMin', areaMin);
    if (areaMax) params.set('areaMax', areaMax);
    if (furnishing) params.set('furnishing', furnishing);
    if (rera) params.set('rera', rera);
    return invalid ? '#' : `/analytics/market?${params.toString()}`;
  }, [category, propertyType, city, bedrooms, bathrooms, areaMin, areaMax, furnishing, rera]);
  useEffect(() => {
    try {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      const apply = () => setReducedMotion(!!mq.matches);
      apply();
      mq.addEventListener ? mq.addEventListener('change', apply) : mq.addListener(apply);
      return () => { mq.removeEventListener ? mq.removeEventListener('change', apply) : mq.removeListener(apply); };
    } catch {}
  }, []);
  return (
    <section className="max-w-screen-xl mx-auto px-4 md:px-6 md:pl-[260px] mb-4 md:mb-8" style={{ marginTop: 'calc(var(--nav-h, 64px) + 16px)' }}>
      <div className="relative rounded-[22px] overflow-hidden shadow-xl" style={{ minHeight: 380, background: 'linear-gradient(180deg, rgba(12,18,28,0.45) 0%, rgba(12,18,28,0.55) 100%), url(https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80) center/cover' }}>
        {/* vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.2)_60%,rgba(0,0,0,0.45)_100%)]" />
        <div className="relative z-10 px-5 md:px-10 pt-16 md:pt-20 pb-28 md:pb-32 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">Find a home that suits your lifestyle.</h1>
          <p className="max-w-2xl text-sm md:text-base text-white/90">Nec risus quis viverra libero tellus eget. Leo morbi faucibus mattis pharetra tellus velit ultricies duis rhoncus. Porttitor fermentum eu urna eget</p>
        </div>
        {/* Floating filter bar */}
        <div className="relative z-20 -mb-12 md:-mb-16 mx-auto max-w-5xl">
          <div className="mx-4 md:mx-12 -mt-14 md:-mt-20 bg-white/70 supports-[backdrop-filter]:bg-white/60 backdrop-blur-[10px] border border-white/30 rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.18)] p-3 md:p-4 flex flex-wrap gap-3 items-center justify-between">
            <div className="flex gap-3 flex-1 min-w-[260px] items-center">
              <select value={category} onChange={(e)=>setCategory(e.target.value)} className="border border-white/40 bg-white/90 rounded-lg px-3 py-2 text-sm text-gray-800 w-[160px] shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="">Category</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
              </select>
              <select value={propertyType} onChange={(e)=>setPropertyType(e.target.value)} className="border border-white/40 bg-white/90 rounded-lg px-3 py-2 text-sm text-gray-800 w-[180px] shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="">Property Type</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Plot">Plot</option>
                <option value="Office">Office</option>
              </select>
              <select value={city} onChange={(e)=>setCity(e.target.value)} className="border border-white/40 bg-white/90 rounded-lg px-3 py-2 text-sm text-gray-800 w-[200px] shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="">Location</option>
                <option value="gurgaon">Gurgaon</option>
                <option value="noida">Noida</option>
                <option value="dwarka-expressway">Dwarka Expressway</option>
              </select>
              <button type="button" className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-white/40 bg-white/90 text-gray-700 hover:bg-white shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M3.75 6.75a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-.75.75h-4.5v8.69a.75.75 0 0 1-1.147.636l-3.706-2.224a.75.75 0 0 1-.364-.636V9H4.5a.75.75 0 0 1-.75-.75v-1.5Z"/></svg>
              </button>
            </div>
            {/* Advanced filters */}
            <button type="button" onClick={() => setAdvancedOpen(true)} className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/40 bg-white/80 text-gray-800 hover:bg-white shadow-sm">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M4 7h10a1 1 0 0 0 2 0h4v2h-4a1 1 0 0 0-2 0H4V7Zm0 8h6a1 1 0 0 0 2 0h8v2h-8a1 1 0 0 0-2 0H4v-2Z"/></svg>
              Advanced
            </button>
            <Link to={searchHref} onClick={(e)=>{ if (searchHref === '#') { e.preventDefault(); } }} title={(areaMin && areaMax && Number(areaMin) > Number(areaMax)) ? 'Min area cannot be greater than max area' : undefined} className={`inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold px-5 py-2.5 rounded-lg shadow-md ${reducedMotion ? '' : 'transition-transform hover:-translate-y-[1px]'} ${(areaMin && areaMax && Number(areaMin) > Number(areaMax)) ? 'opacity-60 cursor-not-allowed' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 5.38 10.84l3.265 3.265a.75.75 0 1 0 1.06-1.06l-3.265-3.266A6.75 6.75 0 0 0 10.5 3.75Zm-5.25 6.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z" clipRule="evenodd"/></svg>
              SEARCH
            </Link>
          </div>
          {/* Quick links */}
          <div className="mx-4 md:mx-12 mt-2 flex items-center justify-center gap-4 text-white/90 text-sm">
            <Link to={`/buy?category=${encodeURIComponent(category || 'Residential')}&type=${encodeURIComponent(propertyType || 'Apartment')}&city=${encodeURIComponent(city || 'gurgaon')}`} className="hover:underline">Buy</Link>
            <span className="opacity-60">|</span>
            <Link to={`/rent?category=${encodeURIComponent(category || 'Residential')}&type=${encodeURIComponent(propertyType || 'Apartment')}&city=${encodeURIComponent(city || 'noida')}`} className="hover:underline">Rent</Link>
            <span className="opacity-60">|</span>
            <Link to={`/commercial?category=${encodeURIComponent(category || 'Commercial')}&type=${encodeURIComponent(propertyType || 'Office')}&city=${encodeURIComponent(city || 'gurugram')}`} className="hover:underline">Commercial</Link>
          </div>
          {/* spacer to create breathing room below the floating filter */}
          <div className="h-10 md:h-16" />
        </div>
        
        {/* Advanced Filters Modal */}
        {advancedOpen && (
          <div className="fixed inset-0 z-30">
            <div onClick={() => setAdvancedOpen(false)} className="absolute inset-0 bg-black/40" />
            <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 ${reducedMotion ? '-translate-y-1/2' : '-translate-y-[55%]'} w-[90vw] max-w-xl bg-white rounded-2xl shadow-2xl border border-gray-200 ${reducedMotion ? '' : 'transition-all duration-300'} p-4 md:p-6`} style={{ transform: 'translate(-50%, -50%)' }}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg md:text-xl font-extrabold text-gray-900">Advanced filters</h3>
                <button onClick={() => setAdvancedOpen(false)} className="w-8 h-8 inline-flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M6.225 4.811 4.81 6.225 9.586 11l-4.775 4.775 1.414 1.414L11 12.414l4.775 4.775 1.414-1.414L12.414 11l4.775-4.775-1.414-1.414L11 9.586 6.225 4.811Z"/></svg>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <select value={bedrooms} onChange={(e)=>setBedrooms(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 w-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option value="">Bedrooms</option>
                  <option value="1+">1+</option>
                  <option value="2+">2+</option>
                  <option value="3+">3+</option>
                </select>
                <select value={bathrooms} onChange={(e)=>setBathrooms(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 w-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option value="">Bathrooms</option>
                  <option value="1+">1+</option>
                  <option value="2+">2+</option>
                  <option value="3+">3+</option>
                </select>
                <div className="flex gap-2">
                  <input value={areaMin} onChange={(e)=>setAreaMin(e.target.value)} className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Min area (sqft)" />
                  <input value={areaMax} onChange={(e)=>setAreaMax(e.target.value)} className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Max area (sqft)" />
                </div>
                {(areaMin && areaMax && Number(areaMin) > Number(areaMax)) && (
                  <p className="col-span-2 text-xs text-red-600">Min area cannot be greater than max area.</p>
                )}
                <select value={furnishing} onChange={(e)=>setFurnishing(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 w-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option value="">Furnishing</option>
                  <option value="Unfurnished">Unfurnished</option>
                  <option value="Semi-furnished">Semi-furnished</option>
                  <option value="Furnished">Furnished</option>
                </select>
                <select value={rera} onChange={(e)=>setRera(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 w-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option value="">RERA</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="mt-4 flex items-center justify-end gap-2">
                <button onClick={() => setAdvancedOpen(false)} className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50">Cancel</button>
                <Link to={searchHref} onClick={() => setAdvancedOpen(false)} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold">Apply filters</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
