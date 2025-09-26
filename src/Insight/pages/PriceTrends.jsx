import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InsightsSidebar from "../components/InsightsSidebar";
import LocationPrompt from "../components/LocationPrompt";
import { mapCoordsToCity } from "../components/LocationContext";
import { getApiBase } from "../../config/apiBase";
import PriceTrendsCityPicker from "../components/PriceTrendsCityPicker";
import PriceTrendsCompare from "../components/PriceTrendsCompare";

export default function PriceTrends() {
  const location = useLocation();
  const navigate = useNavigate();
  const qp = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const initialCity = qp.get("city") || "";
  const [city, setCity] = useState(initialCity);
  const [showPicker, setShowPicker] = useState(!initialCity);
  const [duration, setDuration] = useState(qp.get("duration") || "5y");
  const [zone, setZone] = useState(qp.get("zone") || "All Zones");
  const [type, setType] = useState(qp.get("type") || "Apartment");
  const [cityQuery, setCityQuery] = useState("");
  const [sort, setSort] = useState(qp.get("sort") || "recommended");
  const [page, setPage] = useState(Number(qp.get("page") || 1));
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [localities, setLocalities] = useState(null);
  const [totalCount, setTotalCount] = useState(null);
  const [cityCategories, setCityCategories] = useState([]);
  const [citiesLoading, setCitiesLoading] = useState(true);
  const [pickerLoading, setPickerLoading] = useState(true);
  const [compareMode, setCompareMode] = useState(false);
  const [compareFlash, setCompareFlash] = useState(false);
  const [selectedCities, setSelectedCities] = useState([]);
  const [emiPrincipal, setEmiPrincipal] = useState(0);
  const [emiRate, setEmiRate] = useState(8.5);
  const [emiYears, setEmiYears] = useState(20);
  const [seriesMap, setSeriesMap] = useState({}); // { City: [{x,y}, ...] }
  const [Charts, setCharts] = useState(null);
  const [seriesLoading, setSeriesLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerAnimating, setDrawerAnimating] = useState(false); // for slide transitions
  const [drawerData, setDrawerData] = useState(null);
  const [drawerRestored, setDrawerRestored] = useState(false);
  const [activeLocality, setActiveLocality] = useState(null);
  const [alertSubscribed, setAlertSubscribed] = useState(false);
  const [savedLocality, setSavedLocality] = useState(false);
  const [miniName, setMiniName] = useState("");
  const [miniPhone, setMiniPhone] = useState("");
  const [miniSubmitted, setMiniSubmitted] = useState(false);
  const [showShareDropdown, setShowShareDropdown] = useState(false);

  // Persist page size in localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('pt_page_size');
      if (saved) setPageSize(Number(saved) || 10);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try { localStorage.setItem('pt_page_size', String(pageSize)); } catch {}
  }, [pageSize]);

  // Fetch localities from API (no fallback to mock data)
  const fetchLocalities = async () => {
    if (!city) {
      console.log('fetchLocalities: No city selected, returning early');
      return;
    }

    console.log('fetchLocalities: Starting fetch for city:', city);
    setLoading(true);

    try {
      const base = getApiBase();
      const token = localStorage.getItem('myToken');
      const response = await fetch(`${base}/api/admin/cities`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log('fetchLocalities: Response status:', response.status);

      if (!response.ok) {
        console.error('fetchLocalities: API error:', response.status, response.statusText);
        setLocalities([]);
        setTotalCount(0);
        return;
      }

      const result = await response.json();
      console.log('fetchLocalities: Raw API response:', result);

      if (result && result.success && result.data) {
        // Find the city data for the selected city
        let cityData = null;
        Object.values(result.data).forEach(categoryCities => {
          const foundCity = categoryCities.find(c => c.name.toLowerCase() === city.toLowerCase());
          if (foundCity) {
            cityData = foundCity;
          }
        });

        if (cityData && cityData.localities && cityData.localities.length > 0) {
          console.log('fetchLocalities: Found localities for city:', cityData.localities);

          // Transform the localities data to match the expected format
          const transformedLocalities = cityData.localities.map(locality => ({
            locality: locality.locality,
            zone: locality.zone,
            rate: locality.rate,
            change5y: locality.change5y,
            yield: locality.yield,
            projectUrl: locality.projectUrl || '', // Add projectUrl field
            type: 'Apartment', // Default type since not stored in city localities
            city: cityData.name
          }));

          setLocalities(transformedLocalities);
          setTotalCount(transformedLocalities.length);

          console.log('fetchLocalities: Success! Found', transformedLocalities.length, 'localities');
        } else {
          console.warn('fetchLocalities: No localities found for city:', city);
          setLocalities([]);
          setTotalCount(0);
        }
      } else {
        console.warn('fetchLocalities: Invalid response format or no data:', result);
        setLocalities([]);
        setTotalCount(0);
      }
    } catch (error) {
      console.error('fetchLocalities: Error fetching localities:', error);
      setLocalities([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
      console.log('fetchLocalities: Completed');
    }
  };
  const toggleSaveLocality = () => {
    try {
      const key = `pt_save_${city}_${drawerData?.locality || ''}`;
      const next = !savedLocality;
      setSavedLocality(next);
      sessionStorage.setItem(key, next ? '1' : '0');
    } catch {}
  };

  const calcEmi = (P, r, years) => {
    const i = (r/12) / 100;
    const n = years * 12;
    if (!P || !i || !n) return 0;
    const emi = P * i * Math.pow(1+i, n) / (Math.pow(1+i, n) - 1);
    return Math.round(emi);
  };

  const resetFilters = () => {
    setZone('All Zones');
    setType('Apartment');
    setDuration('5y');
    setSort('recommended');
    setPage(1);
  };

  // Sort + filter client-side (when using API data)
  const filtered = useMemo(() => {
    const items = (localities || []).filter((r) => (zone === "All Zones" ? true : r.zone.toLowerCase().includes(zone.toLowerCase())));
    const sorted = [...items].sort((a,b)=>{
      if (sort === 'price_desc') return b.rate - a.rate;
      if (sort === 'price_asc') return a.rate - b.rate;
      if (sort === 'yield_desc') return (b.yield||0) - (a.yield||0);
      return 0; // recommended (as-is)
    });

    console.log('filtered: Localities count:', localities?.length || 0);
    console.log('filtered: Filtered count:', items.length);
    console.log('filtered: Sorted count:', sorted.length);
    console.log('filtered: Zone filter:', zone);
    console.log('filtered: Sort method:', sort);

    return sorted;
  }, [localities, zone, sort]);

  // Summary stats (median price, avg 5Y change, avg yield) from filtered list
  const summary = useMemo(() => {
    const items = filtered;
    if (!items || items.length === 0) return { median: 0, avgChange: 0, avgYield: 0 };
    const rates = items.map(r => r.rate || 0).sort((a,b)=>a-b);
    const mid = Math.floor(rates.length/2);
    const median = rates.length % 2 ? rates[mid] : Math.round((rates[mid-1] + rates[mid]) / 2);
    const avgChange = (items.reduce((s, r)=> s + (r.change5y||0), 0) / items.length).toFixed(1);
    const avgYield = (items.reduce((s, r)=> s + (r.yield||0), 0) / items.length).toFixed(1);
    return { median, avgChange, avgYield };
  }, [filtered]);

  const visibleCities = useMemo(() => {
    const allCities = cityCategories.flatMap(category => category.cities || []);
    return allCities.filter(c => {
      // Handle both string and object formats
      const cityName = typeof c === 'object' ? c.name : c;
      return cityName.toLowerCase().includes(cityQuery.toLowerCase());
    });
  }, [cityCategories, cityQuery]);

  // Tiny sparkline path for locality trend (parameterized for width/height)
  const makeSpark = (rate, changePct, w = 64, h = 24) => {
    const pad = 2, n = 8;
    const start = rate / (1 + (changePct/100));
    const pts = Array.from({length:n}, (_,i)=> start + (i/(n-1))*(rate - start));
    const min = Math.min(...pts), max = Math.max(...pts);
    const scaleX = (i) => pad + (i/(n-1))*(w - pad*2);
    const scaleY = (v) => pad + (h - pad*2) * (1 - (v - min)/(max - min || 1));
    return pts.map((v,i)=> `${i===0? 'M':'L'}${scaleX(i)},${scaleY(v)}`).join(' ');
  };

  useEffect(() => {
    if (!initialCity) {
      // Don't automatically set city based on geolocation
      // Let the user manually select a city instead
      console.log('No initial city provided, user should select manually');
    }
  }, [initialCity]);

  // Fetch cities from API
  const fetchCities = async () => {
    try {
      const token = localStorage.getItem("myToken");
      const base = getApiBase();
      const response = await fetch(`${base}/api/admin/cities`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const result = await response.json();
        // Transform the API response to match the expected format
        const categories = Object.entries(result.data).map(([categoryName, cities]) => ({
          id: categoryName,
          name: categoryName === 'ncr' ? 'Popular in NCR' :
                categoryName === 'metro' ? 'Metro Cities' : 'Other Cities',
          color: categoryName === 'ncr' ? '#3B82F6' :
                 categoryName === 'metro' ? '#10B981' : '#8B5CF6',
          cities: cities // Pass full city objects instead of just names
        }));
        setCityCategories(categories);
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
    } finally {
      setCitiesLoading(false);
    }
  };

  // Simulate picker skeleton for first paint
  useEffect(() => {
    const t = setTimeout(() => setPickerLoading(false), 300);
    return () => clearTimeout(t);
  }, []);

  // Fetch cities on component mount
  useEffect(() => {
    fetchCities();
  }, []);
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const mod = await import('recharts');
        if (mounted) setCharts(mod);
      } catch (_) {
        // Recharts not installed, fallback to SVG
      }
    })();
    return () => { mounted = false; };
  }, []);

  // Update URL on state changes (deep-linking)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (city) params.set('city', city); else params.delete('city');
    if (zone) params.set('zone', zone); else params.delete('zone');
    if (type) params.set('type', type); else params.delete('type');
    if (duration) params.set('duration', duration); else params.delete('duration');
    if (sort) params.set('sort', sort); else params.delete('sort');
    params.set('page', String(page));
    navigate({ search: params.toString() }, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, zone, type, duration, sort, page]);

  // Persist compareMode and selectedCities in sessionStorage and restore
  useEffect(() => {
    try {
      const payload = { compareMode, selectedCities };
      sessionStorage.setItem('pt_compare', JSON.stringify(payload));
    } catch {}
  }, [compareMode, selectedCities]);

  useEffect(() => {
    try {
      const s = sessionStorage.getItem('pt_compare');
      if (!s) return;
      const saved = JSON.parse(s);
      if (saved && typeof saved.compareMode === 'boolean') setCompareMode(saved.compareMode);
      if (saved && Array.isArray(saved.selectedCities)) setSelectedCities(saved.selectedCities);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Refetch when key parameters change
  useEffect(() => {
    if (!showPicker && city) fetchLocalities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, zone, type, duration, sort, page, pageSize, showPicker]);

  const chooseCity = (cname) => {
    console.log('chooseCity: Selecting city:', cname);
    console.log('chooseCity: Previous city:', city);

    setCity(cname);
    setShowPicker(false);

    const params = new URLSearchParams(location.search);
    params.set("city", cname);
    navigate({ search: params.toString() }, { replace: true });

    console.log('chooseCity: City selection completed');
  };

  const toggleCitySelect = (cname) => {
    setSelectedCities((list) => list.includes(cname) ? list.filter(c=>c!==cname) : [...list, cname]);
  };

  const downloadCSV = () => {
    const rows = filtered.map(r => ({
      locality: r.locality || '',
      zone: r.zone || '',
      rate: r.rate || 0,
      change5y: r.change5y || 0,
      yield: r.yield || 0
    }));
    const header = Object.keys(rows[0] || { locality:'', zone:'', rate:0, change5y:0, yield:0 });
    const csv = [header.join(','), ...rows.map(r => header.map(h => String(r[h]).replace(/,/g,'')).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `price-trends-${city || 'all'}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Quick filter chips for popular cities - dynamically generated from visibleCities
  const popularChips = useMemo(
    () => {
      if (!Array.isArray(visibleCities) || visibleCities.length === 0) return [];
      // Get first 12 cities as popular chips, handling both string and object formats
      return visibleCities.slice(0, 12).map(city => {
        return typeof city === 'object' ? city.name : city;
      });
    },
    [visibleCities]
  );

  // Fetch trend series for compare mode
  const fetchSeries = async (cities) => {
    if (!cities || cities.length < 1) return;
    setSeriesLoading(true);
    try {
      const base = getApiBase();
      const results = await Promise.all(cities.map(async (c) => {
        try {
          const qs = new URLSearchParams({ city: c, duration });
          const res = await fetch(`${base}/api/price-trends/city/${c}?duration=${duration}`);
          if (!res.ok) throw new Error('bad');
          const data = await res.json();
          if (data && data.success && Array.isArray(data.data)) {
            // Transform localities data into series data for charts
            const seriesData = data.data.slice(0, 12).map((locality, index) => ({
              x: index,
              y: locality.rate || 10000 + Math.random() * 10000
            }));
            return { city: c, series: seriesData };
          }
        } catch(_) {}
        // fallback fake series
        const pts = Array.from({length: 12}, (_,i)=> ({ x: i, y: 100 + Math.sin(i/2)*10 + Math.random()*4 }));
        return { city: c, series: pts };
      }));
      const map = {};
      results.forEach(r => { map[r.city] = r.series; });
      setSeriesMap(map);
    } finally {
      setSeriesLoading(false);
    }
  };

  useEffect(() => {
    if (compareMode && !showPicker && selectedCities.length >= 1) {
      fetchSeries(selectedCities);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compareMode, selectedCities, duration, showPicker]);

  // Brief highlight when compare is entered
  useEffect(() => {
    if (compareMode) {
      setCompareFlash(true);
      const t = setTimeout(() => setCompareFlash(false), 1200);
      return () => clearTimeout(t);
    }
  }, [compareMode]);

  const handlePriceAlert = () => {
    try {
      const key = `pt_alert_${city}_${drawerData?.locality || ''}`;
      const next = !alertSubscribed;
      setAlertSubscribed(next);
      sessionStorage.setItem(key, next ? '1' : '0');
    } catch {}
  };

  const handleShare = (platform) => {
    const currentUrl = window.location.href;
    const shareText = `Check out property trends in ${city} - ${drawerData?.locality || 'Localities'} | Price: ₹${(drawerData?.rate || 0).toLocaleString()}/sq.ft | 5Y Change: ${drawerData?.change5y || 0}%`;
    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedText = encodeURIComponent(shareText);

    let shareUrl = '';

    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(`Property Trends in ${city}`)}&body=${encodedText}%0A%0A${encodedUrl}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(currentUrl);
        alert('Link copied to clipboard!');
        return;
      default:
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }

    setShowShareDropdown(false);
  };

  // Drawer helpers with animation
  const openDrawer = (data) => {
    setDrawerData(data);
    setActiveLocality(data?.locality || null);
    // restore toggles and set defaults for EMI based on locality price
    try {
      const alertKey = `pt_alert_${city}_${data?.locality || ''}`;
      const saveKey = `pt_save_${city}_${data?.locality || ''}`;
      setAlertSubscribed(sessionStorage.getItem(alertKey) === '1');
      setSavedLocality(sessionStorage.getItem(saveKey) === '1');
    } catch {}
    // estimate principal as 1000 sq.ft * rate
    const est = (data?.rate || 10000) * 1000;
    setEmiPrincipal(est);
    setMiniName(""); setMiniPhone(""); setMiniSubmitted(false);
    setDrawerOpen(true);
    // next frame to allow transition from translate to 0
    requestAnimationFrame(() => setDrawerAnimating(true));
  };
  const closeDrawer = () => {
    setDrawerAnimating(false);
    setTimeout(() => setDrawerOpen(false), 200);
    // keep highlight briefly after close
    setTimeout(() => setActiveLocality(null), 900);
  };

  // Persist drawer state
  useEffect(() => {
    try {
      const payload = {
        open: drawerOpen,
        locality: drawerData?.locality || null,
        city,
      };
      sessionStorage.setItem('pt_drawer', JSON.stringify(payload));
    } catch {}
  }, [drawerOpen, drawerData, city]);

  // Restore drawer once localities are present
  useEffect(() => {
    if (drawerRestored) return;
    try {
      const s = sessionStorage.getItem('pt_drawer');
      if (!s) return;
      const saved = JSON.parse(s);
      if (saved && saved.open && saved.city === city) {
        const items = (localities || []) || [];
        const found = items.find(r => r.locality === saved.locality);
        if (found) openDrawer(found);
      }
    } catch {}
    setDrawerRestored(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localities, city]);

  // Close share dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showShareDropdown && !event.target.closest('.share-dropdown')) {
        setShowShareDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showShareDropdown]);

  // Click outside to close (backdrop handles this now)
  // Removed desktop-specific click outside handler since we're using backdrop for all screen sizes

  return (
    <React.Fragment>
      {/* Local styles for small animations */}
      <style>{`
        @keyframes pt-slide-in { from { transform: translateX(6px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .pt-slide-in { animation: pt-slide-in 0.3s ease-out; }
      `}</style>
      <InsightsSidebar />
      <LocationPrompt />
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 md:pl-[260px]" style={{ marginTop: "calc(var(--nav-h, 64px) + 16px)" }}>
        {showPicker ? (
          <PriceTrendsCityPicker
            compareMode={compareMode}
            setCompareMode={setCompareMode}
            selectedCities={selectedCities}
            setSelectedCities={setSelectedCities}
            cityQuery={cityQuery}
            setCityQuery={setCityQuery}
            visibleCities={visibleCities}
            pickerLoading={pickerLoading || citiesLoading}
            cityCategories={cityCategories}
            onChooseCity={(cname, isCompare) => {
              if (isCompare) { setShowPicker(false); }
              else if (cname) { chooseCity(cname); }
            }}
          />
        ) : (
          <>
            {compareMode && selectedCities.length>=2 ? (
              <div className={`rounded-xl ${compareFlash ? 'ring-2 ring-amber-400 shadow-[0_0_0_4px_rgba(251,191,36,0.35)]' : ''} transition-all duration-500`}>
                <PriceTrendsCompare
                  duration={duration}
                  Charts={Charts}
                  seriesMap={seriesMap}
                  seriesLoading={seriesLoading}
                  selectedCities={selectedCities}
                  setCompareMode={setCompareMode}
                />
              </div>
            ) : (
              <>
                {/* Hero Banner for City Data */}
                <div className="relative w-full h-[25vh] sm:h-[30vh] md:h-[35vh] lg:h-[50vh] overflow-hidden mb-8 rounded-2xl">
                  {/* Enhanced Background with Darker Overlay */}
                  <img
                    src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2000&q=80"
                    alt="Property Trends Background"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>

                  {/* Content */}
                  <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto -mt-2 sm:-mt-4 md:-mt-6">
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight drop-shadow-[0_3px_10px_rgba(0,0,0,0.7)]">
                        Property Trends in
                        <span className="block bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300 bg-clip-text text-transparent drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
                          {city}
                        </span>
                      </h1>
                      <p className="text-lg sm:text-xl md:text-2xl text-gray-100 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
                        Discover real-time property price trends, rental yields, and market insights for {city}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                        <button onClick={()=>{ setShowPicker(true); setCompareMode(false); }} className="px-8 py-4 bg-white/95 backdrop-blur-sm text-gray-900 font-bold rounded-2xl hover:bg-white transition-all duration-200 border-2 border-white/50 shadow-2xl hover:shadow-3xl text-lg">
                          Change City
                        </button>
                        <button onClick={downloadCSV} className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-2xl hover:shadow-3xl text-lg">
                          Download Data
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <header className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-600" fill="currentColor"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5s2.5 1.1 2.5 2.5S13.4 11.5 12 11.5z"/></svg>
                    </span>
                    <div>
                      <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">Top Localities</h2>
                      <div className="text-sm text-gray-600">Price trends and rental yields by area</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={()=>{ setShowPicker(true); setCompareMode(false); }} className="px-3 py-2 rounded-lg border hover:bg-gray-50 text-sm">Change city</button>
                    <button onClick={downloadCSV} className="px-3 py-2 rounded-lg border hover:bg-gray-50 text-sm">Download CSV</button>
                  </div>
                </header>
              </>
            )}

            {/* Drawer for locality details: mobile bottom sheet + desktop side drawer */}
            {drawerOpen && (
              <>
                {/* Backdrop for all screen sizes */}
                <div className={`fixed inset-0 z-40 transition-opacity duration-300 ease-out ${drawerAnimating ? 'opacity-100' : 'opacity-0'}`} style={{ backgroundColor: 'rgba(0,0,0,0.3)' }} onClick={closeDrawer} />
                {/* Mobile-style bottom sheet for all screen sizes */}
                <aside className={`fixed bottom-0 left-0 right-0 h-[70vh] sm:h-[75vh] md:h-[80vh] lg:h-[85vh] bg-transparent z-50 overflow-hidden transform transition-transform duration-300 ease-out ${drawerAnimating ? 'translate-y-0' : 'translate-y-full'}`}>
                  <div className="mx-auto w-full h-full max-w-xl sm:max-w-1xl lg:max-w-2xl bg-white shadow-2xl rounded-t-2xl overflow-hidden flex flex-col">
                  <div className="p-4 border-b flex items-center justify-between relative">
                    <span className="absolute left-1/2 -top-2 -translate-x-1/2 w-12 h-1.5 bg-gray-300 rounded-full" aria-hidden="true" />
                    <div>
                      <div className="text-xs uppercase tracking-wide text-gray-500">Locality</div>
                      <h3 className="text-lg font-bold text-gray-900">{drawerData?.locality}</h3>
                      <div className="text-xs text-gray-500">{drawerData?.zone} • {type}</div>
                    </div>
                    <button onClick={closeDrawer} className="px-3 py-1.5 rounded-md border text-sm hover:bg-gray-50 inline-flex items-center gap-2" aria-label="Close details">
                      <svg viewBox="0 0 24 24" className="w-4 h-4" stroke="currentColor" strokeWidth="2" fill="none"><path d="M6 6l12 12M18 6L6 18"/></svg>
                      Close
                    </button>
                  </div>
                  <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-auto">
                    <div className="grid grid-cols-3 gap-3 sm:gap-4">
                      <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                        <div className="text-xs text-gray-500">Price</div>
                        <div className="text-base sm:text-lg font-semibold">₹{(drawerData?.rate || 0).toLocaleString()}/ sq.ft</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                        <div className="text-xs text-gray-500">5Y Change</div>
                        <div className="text-base sm:text-lg font-semibold text-emerald-600">▲ {drawerData?.change5y || 0}%</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                        <div className="text-xs text-gray-500">Yield</div>
                        <div className="text-base sm:text-lg font-semibold">{drawerData?.yield || 0}%</div>
                      </div>
                    </div>
                    <div className="border rounded-xl p-3">
                      <div className="text-sm font-semibold mb-2">Trend</div>
                      <svg viewBox="0 0 240 80" className="w-full h-20">
                        <path d={makeSpark(drawerData?.rate || 0, drawerData?.change5y || 0, 240, 80)} fill="none" stroke="#2563eb" strokeWidth="2" />
                      </svg>
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                      <button onClick={()=>{
                        // Check if there's a project URL in the data
                        if (drawerData?.projectUrl) {
                          window.open(drawerData.projectUrl, '_blank');
                          closeDrawer();
                        } else {
                          // Fallback to listings if no project URL
                          const u = `/listings?city=${encodeURIComponent(city)}&locality=${encodeURIComponent(drawerData?.locality||'')}&zone=${encodeURIComponent(zone)}&type=${encodeURIComponent(type)}`;
                          navigate(u);
                          closeDrawer();
                        }
                      }} className="flex-1 px-4 py-3 rounded-lg border hover:bg-gray-50 text-sm font-medium">View listings</button>
                      <button onClick={()=>{
                        // Enable compare mode and add current city to selection
                        setCompareMode(true);
                        setSelectedCities((list)=> list.includes(city) ? list : [...list, city]);
                        closeDrawer();

                        // Navigate to city picker with compare mode
                        setShowPicker(true);
                        setCompareMode(true);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }} className="flex-1 px-4 py-3 rounded-lg border hover:bg-gray-50 text-sm font-medium">Compare this city</button>
                      <div className="relative">
                        <button
                          onClick={() => setShowShareDropdown(!showShareDropdown)}
                          className="flex-1 px-4 py-3 rounded-lg border hover:bg-gray-50 text-sm font-medium flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                          </svg>
                          Share
                        </button>

                        {showShareDropdown && (
                          <div className="share-dropdown absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[200px]">
                            <div className="py-2">
                              <button
                                onClick={() => handleShare('whatsapp')}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                              >
                                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
                                </svg>
                                WhatsApp
                              </button>
                              <button
                                onClick={() => handleShare('facebook')}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                              >
                                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                                Facebook
                              </button>
                              <button
                                onClick={() => handleShare('twitter')}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                              >
                                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                </svg>
                                Twitter
                              </button>
                              <button
                                onClick={() => handleShare('linkedin')}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                              >
                                <svg className="w-5 h-5 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                                LinkedIn
                              </button>
                              <button
                                onClick={() => handleShare('email')}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                              >
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Email
                              </button>
                              <button
                                onClick={() => handleShare('copy')}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                              >
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                Copy Link
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Engagement extras */}
                    <div className="mt-2 grid grid-cols-1 gap-3">
                      <div className="flex items-center gap-2 text-xs text-gray-700 bg-gray-50 border rounded-lg px-3 py-2">
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                        <span><strong>214 buyers</strong> viewed {drawerData?.locality} this week</span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">Great connectivity</span>
                        <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">High ROI micro-market</span>
                        <span className="px-2 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100">Popular rental hub</span>
                      </div>
                      <div className="flex items-center justify-between gap-3 border rounded-lg p-3">
                        <div>
                          <div className="text-sm font-semibold">Price alerts</div>
                          <div className="text-xs text-gray-600">Get notified if rates change in {drawerData?.locality}</div>
                        </div>
                        <button onClick={handlePriceAlert} className={`px-3 py-1.5 rounded-lg text-sm border ${alertSubscribed ? 'bg-gray-900 text-white border-gray-900' : 'bg-white hover:bg-gray-50'}`}>{alertSubscribed ? 'Subscribed' : 'Notify me'}</button>
                      </div>
                      <button onClick={()=>{
                        const u = `/projects?city=${encodeURIComponent(city)}&locality=${encodeURIComponent(drawerData?.locality||'')}`;
                        navigate(u);
                        closeDrawer();
                      }} className="w-full px-4 py-3 rounded-lg border bg-gray-900 text-white text-sm font-medium hover:bg-gray-800">Explore projects in {drawerData?.locality}</button>
                      {/* Limited-time nudge */}
                      <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 8v5h5v2h-7V8z"/></svg>
                        <span><strong>2 price drops</strong> reported this week in {drawerData?.locality}</span>
                      </div>
                      {/* Save locality */}
                      <button onClick={toggleSaveLocality} className={`w-full px-3 py-2 rounded-lg border text-sm ${savedLocality ? 'bg-blue-600 text-white border-blue-600' : 'bg-white hover:bg-gray-50'}`}>{savedLocality ? 'Saved to watchlist' : 'Save this locality'}</button>
                      {/* Nearby highlights */}
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 border">5 mins to Metro</span>
                        <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 border">10 mins to Mall</span>
                        <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 border">15 mins to IT Park</span>
                      </div>
                      {/* Quick callback mini-form */}
                      <div className="border rounded-xl p-3">
                        <div className="text-sm font-semibold mb-2">Request a quick callback</div>
                        <div className="grid grid-cols-1 gap-2">
                          <input value={miniName} onChange={(e)=>setMiniName(e.target.value)} placeholder="Your name" className="px-3 py-2 rounded-lg border" />
                          <input value={miniPhone} onChange={(e)=>setMiniPhone(e.target.value)} placeholder="Phone number" className="px-3 py-2 rounded-lg border" />
                          <button onClick={()=>{ setMiniSubmitted(true); }} className="px-3 py-2 rounded-lg border bg-gray-900 text-white text-sm hover:bg-gray-800">{miniSubmitted? 'We\'ll call you shortly' : 'Request callback'}</button>
                        </div>
                      </div>
                      {/* EMI mini widget */}
                      <div className="border rounded-xl p-3">
                        <div className="text-sm font-semibold mb-2">Estimate EMI</div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="col-span-3">
                            <label className="block text-gray-600 mb-1">Principal (₹)</label>
                            <input type="number" value={emiPrincipal} onChange={(e)=>setEmiPrincipal(Number(e.target.value)||0)} className="w-full px-2 py-1.5 rounded border" />
                          </div>
                          <div>
                            <label className="block text-gray-600 mb-1">Rate %</label>
                            <input type="number" step="0.1" value={emiRate} onChange={(e)=>setEmiRate(Number(e.target.value)||0)} className="w-full px-2 py-1.5 rounded border" />
                          </div>
                          <div>
                            <label className="block text-gray-600 mb-1">Years</label>
                            <input type="number" value={emiYears} onChange={(e)=>setEmiYears(Number(e.target.value)||0)} className="w-full px-2 py-1.5 rounded border" />
                          </div>
                          <div className="flex items-end">
                            <div className="text-gray-600">/mo</div>
                          </div>
                        </div>
                        <div className="mt-2 text-lg font-bold">₹{calcEmi(emiPrincipal, emiRate, emiYears).toLocaleString()}</div>
                      </div>
                      {/* Testimonials */}
                      <div className="border rounded-xl p-3">
                        <div className="text-sm font-semibold mb-2">What buyers say</div>
                        <div className="space-y-2 text-xs text-gray-700">
                          <div className="p-2 rounded bg-gray-50 border">“Good rental demand and clean surroundings.” — Raj, {city}</div>
                          <div className="p-2 rounded bg-gray-50 border">“Connectivity is great, prices trending up.” — Asha, {city}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                </aside>
              </>
            )}

            {/* Localities list */}
            <section className="bg-white border rounded-xl p-4 shadow-sm">
              {(!loading && (filtered.length===0)) ? (
                <div className="py-12 text-center">
                  <div className="mx-auto w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-gray-500" fill="currentColor"><path d="M10 18h4v-2h-4v2zm-7 4h18v-2H3v2zM3 2v2h18V2H3zm3 7h12v2H6V9zm0 4h12v2H6v-2z"/></svg>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-gray-900">No localities found</h3>
                  <p className="mt-1 text-sm text-gray-600">Try changing filters or reset to default.</p>
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <button onClick={resetFilters} className="px-4 py-2 rounded-lg border hover:bg-gray-50 text-sm">Reset filters</button>
                    <button onClick={()=>setShowPicker(true)} className="px-4 py-2 rounded-lg border hover:bg-gray-50 text-sm">Change city</button>
                  </div>
                </div>
              ) : (
                <>
                  <ul className="divide-y">
                    {loading
                      ? Array.from({length: pageSize}).map((_,i)=> (
                          <li key={i} className="py-4 flex items-center gap-4 animate-pulse">
                            <span className="inline-flex w-10 h-10 rounded-full bg-gray-200" />
                            <div className="flex-1">
                              <div className="h-3 bg-gray-200 rounded w-48" />
                              <div className="mt-2 h-2 bg-gray-200 rounded w-28" />
                            </div>
                            <div className="w-28">
                              <div className="h-3 bg-gray-200 rounded" />
                              <div className="mt-2 h-2 bg-gray-200 rounded" />
                            </div>
                            <div className="w-24 h-4 bg-gray-200 rounded" />
                            <div className="ml-3 w-14 h-7 bg-gray-200 rounded" />
                          </li>
                        ))
                      : filtered.slice((page-1)*pageSize, (page)*pageSize).map((r, index)=> {
                          console.log(`Rendering locality ${index}:`, r);
                          return (
                            <li key={r.locality} className={`py-4 flex flex-wrap md:flex-nowrap items-center gap-3 md:gap-4 ${activeLocality===r.locality ? 'pt-slide-in' : ''}`}>
                              <span className={`inline-flex w-9 h-9 md:w-10 md:h-10 rounded-full items-center justify-center ${activeLocality===r.locality ? 'bg-blue-50 text-blue-600 ring-2 ring-blue-200' : 'bg-gray-100'}`}>
                                <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-600" fill="currentColor"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5s2.5 1.1 2.5 2.5S13.4 11.5 12 11.5z"/></svg>
                              </span>
                              <div className={`min-w-0 flex-1 ${activeLocality===r.locality ? 'text-blue-700' : ''}`}>
                                <div className={`font-semibold ${activeLocality===r.locality ? 'text-blue-700' : 'text-gray-900'}`}>{r.locality}</div>
                                <div className="text-xs text-gray-500">{r.zone} • {type}</div>
                              </div>
                              <div className="ml-auto text-right w-full sm:w-auto">
                                <div className="font-extrabold text-gray-900">₹{(r.rate || 0).toLocaleString()}/ sq.ft</div>
                                <div className="text-xs text-emerald-600">▲ {r.change5y || 0}% in 5Y</div>
                              </div>
                              <div className="w-full sm:w-28 text-left sm:text-right text-xs text-gray-600">Rental Yield {r.yield || 0}%</div>
                              <svg viewBox="0 0 64 24" className="ml-2 hidden md:block" width="64" height="24">
                                <path d={makeSpark(r.rate || 0, r.change5y || 0)} fill="none" stroke="#22c55e" strokeWidth="2" />
                              </svg>
                              <button data-pt-more onClick={()=> openDrawer(r)} className={`ml-2 w-full xs:w-auto sm:w-auto px-3 py-1.5 rounded-md border text-xs ${activeLocality===r.locality ? 'bg-blue-600 text-white border-blue-600' : 'hover:bg-gray-50'}`}>More</button>
                            </li>
                          );
                        })
                    }
                  </ul>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
                    <div className="text-gray-600 w-full sm:w-auto">Page {page}{typeof totalCount==='number' ? ` • ${Math.min(page*pageSize, totalCount)} of ${totalCount}` : ''}</div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button disabled={page===1} onClick={()=>setPage(p=>Math.max(1,p-1))} className={`flex-1 sm:flex-none px-3 py-1.5 rounded border ${page===1? 'opacity-50 cursor-not-allowed':'hover:bg-gray-50'}`}>Prev</button>
                      <button disabled={typeof totalCount==='number' ? (page*pageSize)>=totalCount : (page*pageSize)>=filtered.length} onClick={()=>setPage(p=>p+1)} className={`flex-1 sm:flex-none px-3 py-1.5 rounded border ${ (typeof totalCount==='number' ? (page*pageSize)>=totalCount : (page*pageSize)>=filtered.length)? 'opacity-50 cursor-not-allowed':'hover:bg-gray-50'}`}>Next</button>
                    </div>
                  </div>
                </>
              )}
            </section>
          </>
        )}
      </div>
    </React.Fragment>
  );
}