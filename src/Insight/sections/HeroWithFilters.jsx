import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { getApiBase } from '../../config/apiBase';
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
  // UI State
  const [reducedMotion, setReducedMotion] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const dialogRef = React.useRef(null);
  const dialogCloseBtnRef = React.useRef(null);
  
  // Categories & Filters State
  const [categoriesOpt, setCategoriesOpt] = useState([{ value: "", label: "All Types" }]);
  const [ptByCatOpt, setPtByCatOpt] = useState(PROPERTY_TYPES_BY_CATEGORY);
  const [citiesOpt, setCitiesOpt] = useState(CITIES);
  const [bedroomsOpt, setBedroomsOpt] = useState(BEDROOMS);
  const [bathroomsOpt, setBathroomsOpt] = useState(BATHROOMS);
  const [furnishingOpt, setFurnishingOpt] = useState(FURNISHING);
  const [reraOpt, setReraOpt] = useState(RERA);
  const [quickLinksOpt, setQuickLinksOpt] = useState(QUICK_LINKS);
  const [category, setCategory] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [city, setCity] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [areaMin, setAreaMin] = useState("");
  const [areaMax, setAreaMax] = useState("");
  const [furnishing, setFurnishing] = useState("");
  const [rera, setRera] = useState("");
  
  // Banner State
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [bannerLoading, setBannerLoading] = useState(true);
  const [heroSrc, setHeroSrc] = useState(null);
  const HERO_BANNER_SLUG = import.meta.env.VITE_HERO_BANNER_SLUG || 'home-hero';
  const [bannerRefreshKey, setBannerRefreshKey] = useState(0);
  
  // Poster Management State
  const [showPosterForm, setShowPosterForm] = useState(false);
  const [posterFile, setPosterFile] = useState(null);
  const [posterPreview, setPosterPreview] = useState(null);
  const [posterTitle, setPosterTitle] = useState('');
  const [posterDescription, setPosterDescription] = useState('');
  const [uploadingPoster, setUploadingPoster] = useState(false);
  const [posters, setPosters] = useState([]);
  const [loadingPosters, setLoadingPosters] = useState(false);
  
  // Fetch project types for categories dropdown
  useEffect(() => {
    const fetchProjectTypes = async () => {
      try {
        const base = getApiBase();
        const tokenRaw = localStorage.getItem("myToken") || "";
        const token = tokenRaw.replace(/^\"|\"$/g, "").replace(/^Bearer\\s+/i, "");
        const res = await axios.get(
          `${base}/project/viewAll/data?sort=-createdAt`,
          {
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            }
          }
        );
        
        const payload = res.data;
        const rows = Array.isArray(payload?.data) ? payload.data : (Array.isArray(payload) ? payload : []);
        
        // Get unique project types
        const uniqueTypes = [...new Set(rows.map(project => project.type).filter(Boolean))];
        
        // Update categories with unique project types
        const typeOptions = uniqueTypes.map(type => ({
          value: type,
          label: type
        }));
        
        setCategoriesOpt([{ value: "", label: "All Types" }, ...typeOptions]);
        
        // Get unique cities
        const uniqueCities = [...new Set(rows.map(project => project.city).filter(Boolean))];
        
        // Update cities with unique cities
        const cityOptions = uniqueCities.map(city => ({
          value: city,
          label: city
        }));
        
        setCitiesOpt([{ value: "", label: "All Locations" }, ...cityOptions]);
      } catch (error) {
        console.error("Error fetching project types:", error);
        // Fallback to default categories if API fails
        setCategoriesOpt([{ value: "", label: "All Types" }]);
      }
    };
    
    fetchProjectTypes();
  }, []);

  const isAdmin = useMemo(() => {
    try {
      const token = localStorage.getItem('myToken');
      if (!token) return false;
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role === 'admin' || payload.isAdmin === true;
    } catch {
      return false;
    }
  }, []);

  // Restore filters from localStorage
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
        setAreaMax(f.areaMax || '');
        setFurnishing(f.furnishing || '');
        setRera(f.rera || '');
      }
    } catch (error) {
      console.error('Error restoring filters:', error);
    }
  }, []);

// … later …

// Listen for cross-tab or in-app uploads to refresh banner
useEffect(() => {
  const onStorage = (e) => {
    if (e.key === 'banners:updated') {
      setTimeout(() => {
        setBannerLoading(true);
        setBannerRefreshKey((k) => k + 1);
      }, 1000);
    }
  };
  const onCustom = () => {
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
}, []); // ✅ this was missing earlier

// Fetch posters from backend
useEffect(() => {
  const fetchPosters = async () => {
    try {
      setLoadingPosters(true);
      const base = import.meta.env.VITE_API_BASE || '';
      const token = localStorage.getItem('myToken');
      const url = base ? `${base}/api/admin/posters` : '/api/admin/posters';
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const res = await fetch(url, { headers });
      if (res.ok) {
        const data = await res.json();
        setPosters(data.posters || []);
      }
    } catch (error) {
      console.error('Error fetching posters:', error);
    } finally {
      setLoadingPosters(false);
    }
  };

  if (isAdmin) {
    fetchPosters();
  }
}, [isAdmin]); // ✅ properly closed


  // Handle poster file selection
  const handlePosterFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPosterFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPosterPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle poster upload
  const handlePosterUpload = async (e) => {
    e.preventDefault();
    if (!posterFile || !posterTitle) return;

    try {
      setUploadingPoster(true);
      const base = import.meta.env.VITE_API_BASE || '';
      const token = localStorage.getItem('myToken');
      const url = base ? `${base}/api/admin/posters/upload` : '/api/admin/posters/upload';

      const formData = new FormData();
      formData.append('poster', posterFile);
      formData.append('title', posterTitle);
      formData.append('description', posterDescription);
      formData.append('section', 'hero-section');

      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const res = await fetch(url, {
        method: 'POST',
        headers,
        body: formData
      });

      if (res.ok) {
        const data = await res.json();
        setPosters(prev => [data.poster, ...prev]);
        setShowPosterForm(false);
        setPosterFile(null);
        setPosterPreview(null);
        setPosterTitle('');
        setPosterDescription('');
        alert('Poster uploaded successfully!');
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading poster:', error);
      alert('Error uploading poster. Please try again.');
    } finally {
      setUploadingPoster(false);
    }
  };

  // Delete poster
  const deletePoster = async (posterId) => {
    if (!confirm('Are you sure you want to delete this poster?')) return;

    try {
      const base = import.meta.env.VITE_API_BASE || '';
      const token = localStorage.getItem('myToken');
      const url = base ? `${base}/api/admin/posters/${posterId}` : `/api/admin/posters/${posterId}`;

      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const res = await fetch(url, {
        method: 'DELETE',
        headers
      });

      if (res.ok) {
        setPosters(prev => prev.filter(p => p._id !== posterId));
        alert('Poster deleted successfully!');
      } else {
        throw new Error('Delete failed');
      }
    } catch (error) {
      console.error('Error deleting poster:', error);
      alert('Error deleting poster. Please try again.');
    }
  };
  useEffect(() => {
    const next = sanitizeSelections({ category, propertyType });
    if (next.propertyType !== propertyType) {
      setPropertyType('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const propertyTypeOptions = useMemo(() => {
    if (!ptByCatOpt || !category) return [];
    return ptByCatOpt[category] || [];
  }, [category, ptByCatOpt]);

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
        {/* Static Hero Banner */}
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80"
          alt="Luxury Properties Hero Banner"
          decoding="async"
          fetchPriority="high"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Thin Black Overlay for Better Text Contrast */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Dynamic banner overlay (if available) */}
        {heroSrc && heroLoaded && (
          <img
            src={heroSrc}
            alt="Hero banner"
            decoding="async"
            fetchPriority="high"
            loading="eager"
            className={`absolute inset-0 w-full h-full object-cover ${heroLoaded ? 'opacity-100' : 'opacity-0'} ${reducedMotion ? '' : 'transition-opacity duration-500'}`}
            onLoad={() => setHeroLoaded(true)}
          />
        )}
        {/* gradient overlay + vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(12,18,28,0.45)] to-[rgba(12,18,28,0.55)]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.2)_60%,rgba(0,0,0,0.45)_100%)]" aria-hidden="true" />
        <div className={`relative z-10 px-4 sm:px-5 md:px-10 pt-14 md:pt-20 pb-24 md:pb-32 flex flex-col items-center justify-center text-center text-slate-50 ${reducedMotion ? '' : 'transition-[padding] duration-300'} transform translate-y-[8rem] md:translate-y-[11rem]`}>
          <h1 className="text-[clamp(1.75rem,6vw,2.5rem)] md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">Finding homes made easy for you</h1>
          <p className="max-w-2xl text-sm md:text-base text-slate-50/90">Discover your dream property with our expert real estate guidance. Find luxury apartments and spacious villas that match your lifestyle and budget.</p>
        </div>  
        {/* Floating filter bar */}
        <div className="relative z-20 -mb-10 sm:-mb-12 md:-mb-16 mx-auto max-w-5xl">
        <div className={`mx-3 sm:mx-4 md:mx-12 mt-10 sm:mt-14 md:mt-20 bg-gray-50/90 supports-[backdrop-filter]:bg-white/80 ${reducedMotion ? '' : 'backdrop-blur-[10px]'} border border-gray-200 rounded-xl sm:rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.18)] p-3 md:p-4 flex flex-wrap gap-3 items-center justify-between ${reducedMotion ? '' : 'transition-transform duration-300'}`}>
            <div className="w-full grid grid-cols-1 sm:flex sm:flex-1 gap-3 items-center">
              <select aria-label="Category" value={category} onChange={(e)=>setCategory(e.target.value)} className="border border-gray-300 bg-white rounded-lg px-3 py-2 text-sm text-gray-800 w-full sm:w-[160px] shadow-sm focus:ring-2 focus:ring-amber-500 focus:outline-none">
                <option value="">Property Types </option>
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
                <option value="">All Cities</option>
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

      {/* Admin Poster Management */}
      {isAdmin && (
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Poster Management</h3>
            <button
              onClick={() => setShowPosterForm(!showPosterForm)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              {showPosterForm ? 'Cancel' : 'Add New Poster'}
            </button>
          </div>

          {/* Poster Upload Form */}
          {showPosterForm && (
            <form onSubmit={handlePosterUpload} className="mb-8 border border-gray-200 rounded-lg p-6 bg-gray-50">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Upload New Poster</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Poster Title *</label>
                  <input
                    type="text"
                    value={posterTitle}
                    onChange={(e) => setPosterTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter poster title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Poster Image *</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePosterFileChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
                <textarea
                  value={posterDescription}
                  onChange={(e) => setPosterDescription(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter poster description"
                  rows="3"
                />
              </div>

              {/* Preview */}
              {posterPreview && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
                  <img
                    src={posterPreview}
                    alt="Poster preview"
                    className="w-full max-w-md h-48 object-cover rounded-lg border border-gray-300"
                  />
                </div>
              )}

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={uploadingPoster || !posterFile || !posterTitle}
                  className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  {uploadingPoster ? 'Uploading...' : 'Upload Poster'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPosterForm(false);
                    setPosterFile(null);
                    setPosterPreview(null);
                    setPosterTitle('');
                    setPosterDescription('');
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Posters List */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Existing Posters</h4>
            {loadingPosters ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                <p className="text-gray-500 mt-2">Loading posters...</p>
              </div>
            ) : posters.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No posters found. Upload your first poster!</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {posters.map((poster) => (
                  <div key={poster._id} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                    <img
                      src={poster.image?.cdn_url || poster.image?.url}
                      alt={poster.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h5 className="font-semibold text-gray-900 mb-2">{poster.title}</h5>
                      {poster.description && (
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{poster.description}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {new Date(poster.createdAt).toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => deletePoster(poster._id)}
                          className="text-red-500 hover:text-red-700 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
