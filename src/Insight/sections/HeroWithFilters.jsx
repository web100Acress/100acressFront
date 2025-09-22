import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { mapCoordsToCity } from "../components/LocationContext";
import {
  CATEGORIES,
  PROPERTY_TYPES_BY_CATEGORY,
  CITIES,
  BEDROOMS,
  BATHROOMS,
  FURNISHING,
  RERA,
  QUICK_LINKS,
  buildSearchHref,
  sanitizeSelections,
} from "../config/filters";

export default function HeroWithFilters() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const dialogRef = React.useRef(null);
  const dialogCloseBtnRef = React.useRef(null);

  // Hero banner (purely dynamic from backend)
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [bannerLoading, setBannerLoading] = useState(true);
  const [heroSrc, setHeroSrc] = useState(null);
  const HERO_BANNER_SLUG = import.meta.env.VITE_HERO_BANNER_SLUG || 'home-hero';
  const [bannerRefreshKey, setBannerRefreshKey] = useState(0);

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

  // Dynamic options state with static fallbacks
  const [categoriesOpt, setCategoriesOpt] = useState(CATEGORIES);
  const [ptByCatOpt, setPtByCatOpt] = useState(PROPERTY_TYPES_BY_CATEGORY);
  const [citiesOpt, setCitiesOpt] = useState(CITIES);
  const [bedroomsOpt, setBedroomsOpt] = useState(BEDROOMS);
  const [bathroomsOpt, setBathroomsOpt] = useState(BATHROOMS);
  const [furnishingOpt, setFurnishingOpt] = useState(FURNISHING);
  const [reraOpt, setReraOpt] = useState(RERA);
  const [quickLinksOpt, setQuickLinksOpt] = useState(QUICK_LINKS);

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

  // Fetch hero banner from backend (public) so admin uploads reflect here
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const base = import.meta.env.VITE_API_BASE || '';
        const token = localStorage.getItem('myToken');
        const publicUrl = base ? `${base}/api/banners/active` : `/api/banners/active`;
        const adminUrl  = base ? `${base}/api/admin/banners`  : `/api/admin/banners`;

        // Try public first
        let res = await fetch(publicUrl);
        let data;
        if (res.ok) {
          data = await res.json();
        } else {
          // If public fails, try admin (if accessible) with optional token
          const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
          res = await fetch(adminUrl, { headers });
          if (!res.ok) {
            console.warn('Banner fetch failed at both public and admin endpoints', { publicStatus: res.status });
            throw new Error('Failed');
          }
          data = await res.json();
        }

        const list = (data?.banners || []).filter(b => (b?.slug || '').startsWith(HERO_BANNER_SLUG) && b?.isActive !== false);
        if (list.length) {
          // Sort by order asc if present, else leave as-is
          list.sort((a,b)=> (a?.order ?? 0) - (b?.order ?? 0));
          const top = list[0];
          const img = top?.image?.cdn_url || top?.image?.url;
          if (img && active) {
            // cache-bust to avoid stale image right after upload
            const bust = img.includes('?') ? `${img}&t=${Date.now()}` : `${img}?t=${Date.now()}`;
            setHeroSrc(bust);
          }
        } else {
          // No active banner found with matching slug - clear any existing banner
          if (active) setHeroSrc(null);
        }
      } catch (e) {
        console.warn('Hero banner fetch error:', e);
      }
      if (active) setBannerLoading(false);
    })();
    return () => { active = false; };
  }, [HERO_BANNER_SLUG, bannerRefreshKey]);

  // Listen for cross-tab or in-app uploads to refresh banner
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'banners:updated') {
        // Add a small delay to allow backend processing
        setTimeout(() => {
          setBannerLoading(true);
          setBannerRefreshKey((k) => k + 1);
        }, 1000);
      }
    };
    const onCustom = () => {
      // Add a small delay to allow backend processing
      setTimeout(() => {
        setBannerLoading(true);
        setBannerRefreshKey((k) => k + 1);
      }, 1000);
    };
    window.addEventListener('storage', onStorage);
    window.addEventListener('banners:updated', onCustom);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('banners:updated', onCustom);
    };
  }, []);

  // Ensure propertyType is valid for selected category
  useEffect(() => {
    const next = sanitizeSelections({ category, propertyType });
    if (next.propertyType !== propertyType) {
      setPropertyType('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const propertyTypeOptions = useMemo(() => {
    return ptByCatOpt[category] || [];
  }, [category]);

  // Fetch dynamic options from API with safe fallback
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const base = import.meta.env.VITE_API_BASE || '';
        const url = base ? `${base}/api/filters` : `/api/filters`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to load filters');
        const data = await res.json();
        if (cancelled || !data || typeof data !== 'object') return;

        if (Array.isArray(data.categories) && data.categories.length) setCategoriesOpt(data.categories.map(v => (typeof v === 'string' ? { value: v, label: v } : v)));
        if (data.propertyTypesByCategory && typeof data.propertyTypesByCategory === 'object') {
          const mapped = {};
          Object.entries(data.propertyTypesByCategory).forEach(([k, arr]) => {
            mapped[k] = Array.isArray(arr) ? arr.map(v => (typeof v === 'string' ? { value: v, label: v } : v)) : [];
          });
          setPtByCatOpt(mapped);
        }
        if (Array.isArray(data.cities) && data.cities.length) setCitiesOpt(data.cities.map(v => (typeof v === 'string' ? { value: v, label: v } : v)));
        if (Array.isArray(data.bedrooms) && data.bedrooms.length) setBedroomsOpt(data.bedrooms.map(v => (typeof v === 'string' ? { value: v, label: v } : v)));
        if (Array.isArray(data.bathrooms) && data.bathrooms.length) setBathroomsOpt(data.bathrooms.map(v => (typeof v === 'string' ? { value: v, label: v } : v)));
        if (Array.isArray(data.furnishing) && data.furnishing.length) setFurnishingOpt(data.furnishing.map(v => (typeof v === 'string' ? { value: v, label: v } : v)));
        if (Array.isArray(data.rera) && data.rera.length) setReraOpt(data.rera.map(v => (typeof v === 'string' ? { value: v, label: v } : v)));
        if (Array.isArray(data.quickLinks) && data.quickLinks.length) setQuickLinksOpt(data.quickLinks);
      } catch (e) {
        // Silent fallback to static config
      }
    })();
    return () => { cancelled = true; };
  }, []);

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

  const areaInvalid = !!(areaMin && areaMax && Number(areaMin) > Number(areaMax));

  useEffect(() => {
    try {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      const apply = () => setReducedMotion(!!mq.matches);
      apply();
      mq.addEventListener ? mq.addEventListener('change', apply) : mq.addListener(apply);
      return () => { mq.removeEventListener ? mq.removeEventListener('change', apply) : mq.removeListener(apply); };
    } catch {}
  }, []);

  // Modal: lock scroll + ESC close + focus trap
  useEffect(() => {
    const original = document.body.style.overflow;
    if (advancedOpen) {
      document.body.style.overflow = 'hidden';
      const t = setTimeout(() => dialogCloseBtnRef.current?.focus(), 0);
      const onKey = (e) => {
        if (e.key === 'Escape') setAdvancedOpen(false);
      };
      document.addEventListener('keydown', onKey);
      const getFocusable = () => {
        const root = dialogRef.current;
        if (!root) return [];
        return Array.from(root.querySelectorAll('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'))
          .filter(el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));
      };
      const onTab = (e) => {
        if (e.key !== 'Tab') return;
        const focusables = getFocusable();
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;
        if (e.shiftKey) {
          if (active === first || !dialogRef.current?.contains(active)) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (active === last || !dialogRef.current?.contains(active)) {
            e.preventDefault();
            first.focus();
          }
        }
      };
      document.addEventListener('keydown', onTab, true);
      return () => {
        clearTimeout(t);
        document.body.style.overflow = original || '';
        document.removeEventListener('keydown', onKey);
        document.removeEventListener('keydown', onTab, true);
      };
    } else {
      document.body.style.overflow = original || '';
    }
  }, [advancedOpen]);

  return (
    <section className="max-w-screen-xl mx-auto px-3 sm:px-4 md:px-6 md:pl-[260px] mb-4 md:mb-8" style={{ marginTop: 'calc(var(--nav-h, 64px) + 12px)' }}>
      <div className="relative rounded-2xl sm:rounded-[22px] overflow-hidden shadow-xl min-h-[50svh] sm:min-h-[56svh] lg:min-h-[60svh]">
        {/* skeleton shimmer while fetching banner */}
        {bannerLoading && (
          <div aria-hidden="true" className="absolute inset-0 bg-gray-200">
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
          </div>
        )}
        {/* Render backend banner only (no static fallback) */}
        {heroSrc ? (
          <img
            src={heroSrc}
            alt="Hero banner"
            decoding="async"
            fetchPriority="high"
            loading="eager"
            className={`absolute inset-0 w-full h-full object-cover ${heroLoaded ? 'opacity-100' : 'opacity-0'} ${reducedMotion ? '' : 'transition-opacity duration-500'}`}
            onLoad={() => setHeroLoaded(true)}
          />
        ) : null}
        {/* gradient overlay + vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(12,18,28,0.45)] to-[rgba(12,18,28,0.55)]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.2)_60%,rgba(0,0,0,0.45)_100%)]" aria-hidden="true" />
        <div className={`relative z-10 px-4 sm:px-5 md:px-10 pt-14 md:pt-20 pb-24 md:pb-32 flex flex-col items-center justify-center text-center text-slate-50 ${reducedMotion ? '' : 'transition-[padding] duration-300'} transform translate-y-[8rem] md:translate-y-[11rem]`}>
          <h1 className="text-[clamp(1.75rem,6vw,2.5rem)] md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">Find a home that suits your lifestyle.</h1>
          <p className="max-w-2xl text-sm md:text-base text-slate-50/90">Nec risus quis viverra libero tellus eget. Leo morbi faucibus mattis pharetra tellus velit ultricies duis rhoncus. Porttitor fermentum eu urna eget</p>
        </div>
        {/* Floating filter bar */}
        <div className="relative z-20 -mb-10 sm:-mb-12 md:-mb-16 mx-auto max-w-5xl">
        <div className={`mx-3 sm:mx-4 md:mx-12 mt-10 sm:mt-14 md:mt-20 bg-gray-50/90 supports-[backdrop-filter]:bg-white/80 ${reducedMotion ? '' : 'backdrop-blur-[10px]'} border border-gray-200 rounded-xl sm:rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.18)] p-3 md:p-4 flex flex-wrap gap-3 items-center justify-between ${reducedMotion ? '' : 'transition-transform duration-300'}`}>
            <div className="w-full grid grid-cols-1 sm:flex sm:flex-1 gap-3 items-center">
              <select aria-label="Category" value={category} onChange={(e)=>setCategory(e.target.value)} className="border border-gray-300 bg-white rounded-lg px-3 py-2 text-sm text-gray-800 w-full sm:w-[160px] shadow-sm focus:ring-2 focus:ring-amber-500 focus:outline-none">
                <option value="">Category</option>
                {categoriesOpt.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <select aria-label="Property Type" value={propertyType} onChange={(e)=>setPropertyType(e.target.value)} className="border border-gray-300 bg-white rounded-lg px-3 py-2 text-sm text-gray-800 w-full sm:w-[180px] shadow-sm focus:ring-2 focus:ring-amber-500 focus:outline-none">
                <option value="">Property Type</option>
                {propertyTypeOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <select aria-label="City" value={city} onChange={(e)=>setCity(e.target.value)} className="border border-gray-300 bg-white rounded-lg px-3 py-2 text-sm text-gray-800 w-full sm:w-[200px] shadow-sm focus:ring-2 focus:ring-amber-500 focus:outline-none">
                <option value="">Location</option>
                {citiesOpt.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <button
                type="button"
                aria-label="More filters"
                className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-sm md:hidden"
                onClick={() => setAdvancedOpen(true)}
                title="Open advanced filters"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M3.75 6.75a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-.75.75h-4.5v8.69a.75.75 0 0 1-1.147.636l-3.706-2.224a.75.75 0 0 1-.364-.636V9H4.5a.75.75 0 0 1-.75-.75v-1.5Z"/></svg>
              </button>
            </div>
            {/* Advanced filters */}
            <button type="button" onClick={() => setAdvancedOpen(true)} className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-800 hover:bg-gray-200 shadow-sm">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M4 7h10a1 1 0 0 0 2 0h4v2h-4a1 1 0 0 0-2 0H4V7Zm0 8h6a1 1 0 0 0 2 0h8v2h-8a1 1 0 0 0-2 0H4v-2Z"/></svg>
              Advanced
            </button>
            <Link to={searchHref} onClick={(e)=>{ if (searchHref === '#') { e.preventDefault(); } }} title={areaInvalid ? 'Min area cannot be greater than max area' : undefined} className={`inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-5 py-2.5 rounded-lg shadow-md ${reducedMotion ? '' : 'transition-transform hover:-translate-y-[1px]'} ${areaInvalid ? 'opacity-60 cursor-not-allowed' : ''}`} aria-disabled={areaInvalid}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 5.38 10.84l3.265 3.265a.75.75 0 1 0 1.06-1.06l-3.265-3.266A6.75 6.75 0 0 0 10.5 3.75Zm-5.25 6.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z" clipRule="evenodd"/></svg>
              SEARCH
            </Link>
            {/* Reset filters */}
            {/* <button
              type="button"
              onClick={() => {
                setCategory('');
                setPropertyType('');
                setCity('');
                setBedrooms('');
                setBathrooms('');
                setAreaMin('');
                setAreaMax('');
                setFurnishing('');
                setRera('');
                try { localStorage.removeItem('heroFilters'); } catch {}
              }}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-800 hover:bg-gray-200 shadow-sm"
              aria-label="Reset all filters"
              title="Reset filters"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 6V3L8 7l4 4V8a4 4 0 1 1-4 4H6a6 6 0 1 0 6-6Z"/></svg>
              <span className="hidden sm:inline">Reset</span>
            </button> */}
          </div>
          {/* Quick links */}
          <div className="mx-3 sm:mx-4 md:mx-12 mt-2 flex flex-wrap gap-3 items-center justify-center text-slate-50/90 text-sm">
            {quickLinksOpt.map((q, idx) => {
              const params = {
                category: q.category || 'residential',
                type: q.type || 'apartment',
                city: q.city || '',
              };
              const href = buildSearchHref(q.path, params);

              return (
                <React.Fragment key={q.label}>
                  <Link to={href} className="hover:underline">{q.label}</Link>
                  {idx < quickLinksOpt.length - 1 && <span className="opacity-60 hidden sm:inline">|</span>}
                </React.Fragment>
              );
            })}
          </div>
          {/* spacer to create breathing room below the floating filter */}
          <div className="h-10 md:h-16" />
        </div>

        {/* Advanced Filters Modal */}
        {advancedOpen && (
          <div className="fixed inset-0 z-30" aria-labelledby="advanced-filters-title" role="dialog" aria-modal="true">
            <div onClick={() => setAdvancedOpen(false)} className="absolute inset-0 bg-black/40" aria-hidden="true" />
            <div ref={dialogRef} className={`absolute left-1/2 top-1/2 -translate-x-1/2 w-[92vw] sm:w-[90vw] max-w-xl bg-gray-50 rounded-2xl shadow-2xl border border-gray-200 ${reducedMotion ? '-translate-y-1/2' : '-translate-y-[55%] transition-all duration-300'} p-4 md:p-6`} style={{ transform: 'translate(-50%, -50%)' }}>
              <div className="flex items-center justify-between mb-3">
                <h3 id="advanced-filters-title" className="text-lg md:text-xl font-extrabold text-gray-900">Advanced filters</h3>
                <button ref={dialogCloseBtnRef} onClick={() => setAdvancedOpen(false)} className="w-8 h-8 inline-flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-200" aria-label="Close advanced filters">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M6.225 4.811 4.81 6.225 9.586 11l-4.775 4.775 1.414 1.414L11 12.414l4.775 4.775 1.414-1.414L12.414 11l4.775-4.775-1.414-1.414L11 9.586 6.225 4.811Z"/></svg>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <select aria-label="Bedrooms" value={bedrooms} onChange={(e)=>setBedrooms(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 w-full shadow-sm focus:ring-2 focus:ring-amber-500 focus:outline-none">
                  <option value="">Bedrooms</option>
                  {bedroomsOpt.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <select aria-label="Bathrooms" value={bathrooms} onChange={(e)=>setBathrooms(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 w-full shadow-sm focus:ring-2 focus:ring-amber-500 focus:outline-none">
                  <option value="">Bathrooms</option>
                  {bathroomsOpt.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <div className="flex gap-2">
                  <input aria-label="Minimum area" value={areaMin} onChange={(e)=>setAreaMin(e.target.value)} className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 shadow-sm focus:ring-2 focus:ring-amber-500 focus:outline-none placeholder:text-gray-400" placeholder="Min area (sqft)" aria-invalid={areaInvalid} aria-describedby={areaInvalid ? 'area-error' : undefined} />
                  <input aria-label="Maximum area" value={areaMax} onChange={(e)=>setAreaMax(e.target.value)} className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 shadow-sm focus:ring-2 focus:ring-amber-500 focus:outline-none placeholder:text-gray-400" placeholder="Max area (sqft)" aria-invalid={areaInvalid} aria-describedby={areaInvalid ? 'area-error' : undefined} />
                </div>
                {areaInvalid && (
                  <p id="area-error" className="col-span-2 text-xs text-red-600">Min area cannot be greater than max area.</p>
                )}
                <select aria-label="Furnishing" value={furnishing} onChange={(e)=>setFurnishing(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 w-full shadow-sm focus:ring-2 focus:ring-amber-500 focus:outline-none">
                  <option value="">Furnishing</option>
                  {furnishingOpt.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <select aria-label="RERA" value={rera} onChange={(e)=>setRera(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 w-full shadow-sm focus:ring-2 focus:ring-amber-500 focus:outline-none">
                  <option value="">RERA</option>
                  {reraOpt.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="mt-4 flex items-center justify-end gap-2">
                <button onClick={() => setAdvancedOpen(false)} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200">Cancel</button>
                <Link to={searchHref} onClick={() => setAdvancedOpen(false)} className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold">Apply filters</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
