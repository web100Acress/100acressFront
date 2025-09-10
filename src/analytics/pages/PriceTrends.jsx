import React, { useEffect, useMemo, useState } from "react";
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
  const [pickerLoading, setPickerLoading] = useState(true);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedCities, setSelectedCities] = useState([]);
  const [Charts, setCharts] = useState(null);
  const [seriesMap, setSeriesMap] = useState({}); // { City: [{x,y}, ...] }
  const [seriesLoading, setSeriesLoading] = useState(false);

  // Real-estate themed city images
  const cityImages = useMemo(() => ({
    Bangalore: "/assets/cities/bangalore.jpg",
    Mumbai: "/assets/cities/mumbai.jpg",
    Delhi: "/assets/cities/delhi.jpg",
    Pune: "/assets/cities/pune.jpg",
    Chennai: "/assets/cities/chennai.jpg",
    Hyderabad: "/assets/cities/hyderabad.jpg",
    Kolkata: "/assets/cities/kolkata.jpg",
    "Navi Mumbai": "/assets/cities/navi-mumbai.jpg",
    Gurgaon: "/assets/cities/gurgaon.jpg",
    Noida: "/assets/cities/noida.jpg",
  }), []);

  // Mock city-locality list with rates
  const mockLocalities = useMemo(() => {
    const base = [
      { locality: "Sector 65", zone: "East", rate: 15500, change5y: 194.9, yield: 2 },
      { locality: "Sector 79", zone: "North", rate: 13600, change5y: 182.3, yield: 3 },
      { locality: "Golf Course Ext.", zone: "South", rate: 17500, change5y: 158.3, yield: 4 },
      { locality: "Dwarka Expressway", zone: "West", rate: 14500, change5y: 154.3, yield: 3 },
      { locality: "Nirvana Country", zone: "East", rate: 13300, change5y: 151.9, yield: 1 },
    ];
    return base;
  }, []);

  // Fetch localities from API (fallback to mock)
  const fetchLocalities = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const base = getApiBase();
      const qs = new URLSearchParams({
        city,
        zone: zone === 'All Zones' ? '' : zone,
        type,
        duration,
        sort,
        page: String(page),
        limit: String(pageSize)
      }).toString();
      const res = await fetch(`${base}/analytics/price-trends/localities?${qs}`);
      if (!res.ok) throw new Error('bad');
      const data = await res.json();
      if (data && data.success && Array.isArray(data.data)) {
        setLocalities(data.data);
        if (typeof data.total === 'number') setTotalCount(data.total);
      } else {
        setLocalities(mockLocalities);
        setTotalCount(mockLocalities.length);
      }
    } catch (_) {
      setLocalities(mockLocalities);
      setTotalCount(mockLocalities.length);
    } finally {
      setLoading(false);
    }
  };

  // Sort + filter client-side (when using mock or when API has no sorting)
  const filtered = useMemo(() => {
    const items = (localities || mockLocalities).filter((r) => (zone === "All Zones" ? true : r.zone.toLowerCase().includes(zone.toLowerCase())));
    const sorted = [...items].sort((a,b)=>{
      if (sort === 'price_desc') return b.rate - a.rate;
      if (sort === 'price_asc') return a.rate - b.rate;
      if (sort === 'yield_desc') return (b.yield||0) - (a.yield||0);
      return 0; // recommended (as-is)
    });
    return sorted;
  }, [localities, mockLocalities, zone, sort]);

  const allCities = useMemo(() => [
    "Bangalore","Mumbai","Delhi","Pune","Chennai","Hyderabad","Kolkata","Navi Mumbai","Gurgaon","Noida",
    "Ahmedabad","Jaipur","Lucknow","Surat","Indore","Nagpur","Thane","Vadodara","Ghaziabad","Faridabad"
  ], []);
  const visibleCities = useMemo(() => allCities.filter(c => c.toLowerCase().includes(cityQuery.toLowerCase())), [allCities, cityQuery]);

  // Tiny sparkline path for locality trend
  const makeSpark = (rate, changePct) => {
    const w = 64, h = 24, pad = 2, n = 8;
    const start = rate / (1 + (changePct/100));
    const pts = Array.from({length:n}, (_,i)=> start + (i/(n-1))*(rate - start));
    const min = Math.min(...pts), max = Math.max(...pts);
    const scaleX = (i) => pad + (i/(n-1))*(w - pad*2);
    const scaleY = (v) => pad + (h - pad*2) * (1 - (v - min)/(max - min || 1));
    return pts.map((v,i)=> `${i===0? 'M':'L'}${scaleX(i)},${scaleY(v)}`).join(' ');
  };

  useEffect(() => {
    if (!initialCity) {
      try {
        const s = localStorage.getItem("geoCoords");
        if (s) {
          const c = JSON.parse(s);
          if (c && typeof c.lat === "number" && typeof c.lng === "number") {
            const mapped = mapCoordsToCity(c);
            if (mapped) {
              setCity(mapped);
            }
          }
        }
      } catch {}
    }
  }, [initialCity]);

  // Simulate picker skeleton for first paint
  useEffect(() => {
    const t = setTimeout(()=> setPickerLoading(false), 300);
    return () => clearTimeout(t);
  }, []);

  // Lazy-load Recharts (optional)
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

  // Refetch when key parameters change
  useEffect(() => {
    if (!showPicker && city) fetchLocalities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, zone, type, duration, sort, page, pageSize, showPicker]);

  const chooseCity = (cname) => {
    setCity(cname);
    setShowPicker(false);
    const params = new URLSearchParams(location.search);
    params.set("city", cname);
    navigate({ search: params.toString() }, { replace: true });
  };

  const toggleCitySelect = (cname) => {
    setSelectedCities((list) => list.includes(cname) ? list.filter(c=>c!==cname) : [...list, cname]);
  };

  const downloadCSV = () => {
    const rows = filtered.map(r => ({ locality: r.locality, zone: r.zone, rate: r.rate, change5y: r.change5y, yield: r.yield }));
    const header = Object.keys(rows[0] || { locality:'', zone:'', rate:'', change5y:'', yield:'' });
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

  // Fetch trend series for compare mode
  const fetchSeries = async (cities) => {
    if (!cities || cities.length < 1) return;
    setSeriesLoading(true);
    try {
      const base = getApiBase();
      const results = await Promise.all(cities.map(async (c) => {
        try {
          const qs = new URLSearchParams({ city: c, duration });
          const res = await fetch(`${base}/analytics/price-trends/series?${qs.toString()}`);
          if (!res.ok) throw new Error('bad');
          const data = await res.json();
          if (data && data.success && Array.isArray(data.data)) return { city: c, series: data.data };
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

  return (
    <React.Fragment>
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
            cityImages={cityImages}
            pickerLoading={pickerLoading}
            onChooseCity={(cname, isCompare) => {
              if (isCompare) { setShowPicker(false); }
              else if (cname) { chooseCity(cname); }
            }}
          />
        ) : (
          <>
            {compareMode && selectedCities.length>=2 ? (
              <PriceTrendsCompare
                duration={duration}
                Charts={Charts}
                seriesMap={seriesMap}
                seriesLoading={seriesLoading}
                selectedCities={selectedCities}
                setCompareMode={setCompareMode}
                cityImages={cityImages}
              />
            ) : (
              <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Property Rates in {city}</h1>
                <div className="text-sm text-gray-600">Top localities, price trends and rental yields</div>
              </header>
            )}

            {/* Filters row */}
            <section className="flex flex-wrap gap-3 items-center bg-white border rounded-xl p-4 shadow-sm mb-6">
              <div className="font-semibold text-gray-800">Select Zone</div>
              <select value={zone} onChange={(e)=>{ setZone(e.target.value); setPage(1); }} className="border rounded-lg px-3 py-2">
                <option>All Zones</option>
                <option>South</option>
                <option>East</option>
                <option>North</option>
                <option>West</option>
              </select>
              <div className="font-semibold text-gray-800 ml-4">Property Type</div>
              <select value={type} onChange={(e)=>{ setType(e.target.value); setPage(1); }} className="border rounded-lg px-3 py-2">
                <option>Apartment</option>
                <option>Plots/Land</option>
                <option>Builder Floor</option>
              </select>
              <div className="font-semibold text-gray-800 ml-4">Duration</div>
              <div className="inline-flex gap-1">
                {["1y","3y","5y","Max"].map((d)=>(
                  <button key={d} onClick={()=>{ setDuration(d); setPage(1); }} className={`px-3 py-1.5 rounded-full border ${duration===d?"bg-gray-900 text-white border-gray-900":"bg-white text-gray-700"}`}>{d === "1y"?"1 year":d === "3y"?"3 years":d === "5y"?"5 years":"Max"}</button>
                ))}
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-sm text-gray-700">Sort:</span>
                <select value={sort} onChange={(e)=>{ setSort(e.target.value); setPage(1); }} className="border rounded-lg px-3 py-2">
                  <option value="recommended">Recommended</option>
                  <option value="price_desc">Price High</option>
                  <option value="price_asc">Price Low</option>
                  <option value="yield_desc">Yield High</option>
                </select>
                <button onClick={downloadCSV} className="px-3 py-2 rounded-lg border hover:bg-gray-50 text-sm">Download CSV</button>
              </div>
            </section>

            {/* Localities list */}
            <section className="bg-white border rounded-xl p-4 shadow-sm">
              <ul className="divide-y">
                {loading
                  ? Array.from({length: pageSize}).map((_,i)=> (
                      <li key={i} className="py-3 flex items-center gap-3 animate-pulse">
                        <span className="inline-flex w-10 h-10 rounded-full bg-gray-200" />
                        <div className="flex-1">
                          <div className="h-3 bg-gray-200 rounded w-40" />
                          <div className="mt-1 h-2 bg-gray-200 rounded w-24" />
                        </div>
                        <div className="w-24">
                          <div className="h-3 bg-gray-200 rounded" />
                          <div className="mt-1 h-2 bg-gray-200 rounded" />
                        </div>
                        <div className="w-24 h-4 bg-gray-200 rounded" />
                        <div className="ml-2 w-12 h-6 bg-gray-200 rounded" />
                      </li>
                    ))
                  : filtered.slice((page-1)*pageSize, (page)*pageSize).map((r)=> (
                  <li key={r.locality} className="py-3 flex items-center gap-3">
                    <span className="inline-flex w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-600" fill="currentColor"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5s2.5 1.1 2.5 2.5S13.4 11.5 12 11.5z"/></svg>
                    </span>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{r.locality}</div>
                      <div className="text-xs text-gray-500">{r.zone} • {type}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-extrabold text-gray-900">₹{r.rate.toLocaleString()}/ sq.ft</div>
                      <div className="text-xs text-emerald-600">▲ {r.change5y}% in 5Y</div>
                    </div>
                    <div className="w-24 text-right text-xs text-gray-600">Rental Yield {r.yield}%</div>
                    <svg viewBox="0 0 64 24" className="ml-2" width="64" height="24">
                      <path d={makeSpark(r.rate, r.change5y)} fill="none" stroke="#22c55e" strokeWidth="2" />
                    </svg>
                    <button className="ml-2 px-2 py-1 rounded-md border text-xs">More</button>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center justify-between text-sm">
                <div className="text-gray-600">Page {page}{typeof totalCount==='number' ? ` • ${Math.min(page*pageSize, totalCount)} of ${totalCount}` : ''}</div>
                <div className="flex items-center gap-2">
                  <button disabled={page===1} onClick={()=>setPage(p=>Math.max(1,p-1))} className={`px-3 py-1 rounded border ${page===1? 'opacity-50 cursor-not-allowed':'hover:bg-gray-50'}`}>Prev</button>
                  <button disabled={typeof totalCount==='number' ? (page*pageSize)>=totalCount : (page*pageSize)>=filtered.length} onClick={()=>setPage(p=>p+1)} className={`px-3 py-1 rounded border ${ (typeof totalCount==='number' ? (page*pageSize)>=totalCount : (page*pageSize)>=filtered.length)? 'opacity-50 cursor-not-allowed':'hover:bg-gray-50'}`}>Next</button>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </React.Fragment>
  );
}
