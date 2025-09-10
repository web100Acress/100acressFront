import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function PriceTrendsCityPicker({
  compareMode,
  setCompareMode,
  selectedCities,
  setSelectedCities,
  cityQuery,
  setCityQuery,
  visibleCities,
  cityImages,
  pickerLoading,
  onChooseCity,
}) {
  const toggleCitySelect = (cname) => {
    setSelectedCities((list) => list.includes(cname) ? list.filter(c=>c!==cname) : [...list, cname]);
  };

  // Landmark images per city (fallbacks if cityImages does not contain the entry)
  const landmarkImages = useMemo(() => ({
    // Gurgaon / Gurugram - Cyber City skyline
    Gurugram: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/GURGAON.webp",
    Gurgaon: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/GURGAON.webp",
    // Noida - Sector 18 skyline
    Noida: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/NOIDA.webp",
    // Delhi - India Gate
    Delhi: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/DELHI.webp",
    // Dwarka Expressway - Generic expressway representation
    "Dwarka Expressway": "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/DWARKA_EXPRESSWAY.webp",
    // Ghaziabad - Hindon River Metro Station
    Ghaziabad: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/GHAZIABAD.webp",
    // Faridabad - Badkhal Lake
    Faridabad: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/FARIDABAD.webp",
    // Popular metros with Wikimedia Commons
    Mumbai: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/MUMBAI.webp",
    "Navi Mumbai": "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/NAVI_MUMBAI.webp",
    Bengaluru: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/BENGALURU.webp",
    Bangalore: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/BENGALURU.webp",
    Pune: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/PUNE.webp",
    Chennai: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Marina_Beach_Chennai.jpg",
    Hyderabad: "https://upload.wikimedia.org/wikipedia/commons/5/50/Charminar_Hyderabad.jpg",
    Kolkata: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Howrah_Bridge_at_night.jpg",
    Ahmedabad: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Sabarmati_Riverfront%2C_Ahmedabad.jpg",
    Jaipur: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Hawa_Mahal_2011.jpg",
    Chandigarh: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Chandigarh_Capitol_Complex.jpg",
    Lucknow: "https://upload.wikimedia.org/wikipedia/commons/1/10/Rumi_Darwaza_Lucknow.jpg",
    Indore: "https://upload.wikimedia.org/wikipedia/commons/8/82/Rajwada_Indore.jpg",
    Surat: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Surat_City.jpg",
    Thane: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Upvan_Lake%2C_Thane.jpg",
    "New Delhi": "https://upload.wikimedia.org/wikipedia/commons/5/5b/India_Gate_in_New_Delhi_03-2016.jpg",
    Dwarka: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/DWARKA.webp",
    "Greater Noida": "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/GREATER_NOIDA.webp",
  }), []);

  // Single stable fallback image (Wikimedia Commons generic skyline)
  const fallbackImage = "https://upload.wikimedia.org/wikipedia/commons/5/5e/City_skyline_generic.jpg";

  // Prefer S3 city image by convention if not explicitly mapped: CITY_NAME in upper snake case
  const buildS3Image = (name) => {
    const slug = String(name)
      .trim()
      .replace(/\s+/g, '_')
      .replace(/[^A-Za-z0-9_]/g, '')
      .toUpperCase();
    return `https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/${slug}.webp`;
  };

  const getCityImage = (cname) => {
    // Normalize keys to match common names
    const key = cname in cityImages ? cname : (landmarkImages[cname] ? cname : null);
    if (key) return cityImages[key] || landmarkImages[key] || buildS3Image(cname) || fallbackImage;
    // Try loose matches
    const lc = String(cname).toLowerCase();
    if (lc.includes('gurugram') || lc.includes('gurgaon')) return cityImages[cname] || landmarkImages.Gurgaon || buildS3Image(cname) || fallbackImage;
    if (lc.includes('noida')) return cityImages[cname] || landmarkImages.Noida || buildS3Image(cname) || fallbackImage;
    if (lc.includes('delhi')) return cityImages[cname] || landmarkImages.Delhi || buildS3Image(cname) || fallbackImage;
    if (lc.includes('dwarka')) return cityImages[cname] || landmarkImages["Dwarka Expressway"] || buildS3Image(cname) || fallbackImage;
    if (lc.includes('ghaziabad')) return cityImages[cname] || landmarkImages.Ghaziabad || buildS3Image(cname) || fallbackImage;
    if (lc.includes('faridabad')) return cityImages[cname] || landmarkImages.Faridabad || buildS3Image(cname) || fallbackImage;
    return cityImages[cname] || buildS3Image(cname) || fallbackImage;
  };

  // Responsive "two rows" limit: 4 (2 cols), 6 (3 cols), 10 (5 cols on md), 12 (6 cols on lg)
  const [perPage, setPerPage] = useState(10);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    try {
      const m2 = window.matchMedia('(max-width: 639px)'); // base: 2 cols
      const m3 = window.matchMedia('(min-width: 640px) and (max-width: 767px)'); // sm: 3 cols
      const m5 = window.matchMedia('(min-width: 768px) and (max-width: 1023px)'); // md: 5 cols
      const m6 = window.matchMedia('(min-width: 1024px)'); // lg+: 6 cols
      const apply = () => {
        if (m6.matches) setPerPage(12); else if (m5.matches) setPerPage(10); else if (m3.matches) setPerPage(6); else setPerPage(4);
      };
      apply();
      m2.addEventListener ? (m2.addEventListener('change', apply), m3.addEventListener('change', apply), m5.addEventListener('change', apply), m6.addEventListener('change', apply))
                       : (m2.addListener(apply), m3.addListener(apply), m5.addListener(apply), m6.addListener(apply));
      return () => {
        m2.removeEventListener ? (m2.removeEventListener('change', apply), m3.removeEventListener('change', apply), m5.removeEventListener('change', apply), m6.removeEventListener('change', apply))
                               : (m2.removeListener(apply), m3.removeListener(apply), m5.removeListener(apply), m6.removeListener(apply));
      };
    } catch {}
  }, []);

  const displayedCities = useMemo(() => {
    if (expanded) return visibleCities;
    return Array.isArray(visibleCities) ? visibleCities.slice(0, perPage) : [];
  }, [expanded, perPage, visibleCities]);

  // Quick filter chips for popular cities
  const popularChips = useMemo(() => (
    [
      'Gurgaon', 'Noida', 'Delhi', 'Mumbai', 'Pune', 'Bengaluru', 'Hyderabad', 'Chennai', 'Kolkata', 'Ghaziabad', 'Faridabad', 'Dwarka Expressway'
    ]
  ), []);

  // Sections: NCR vs Metros
  const ncrNames = useMemo(() => (
    [
      'Gurgaon','Gurugram','Noida','Greater Noida','Delhi','New Delhi','Ghaziabad','Faridabad','Dwarka','Dwarka Expressway'
    ]
  ), []);
  const metroNames = useMemo(() => (
    ['Mumbai','Navi Mumbai','Pune','Bengaluru','Bangalore','Chennai','Hyderabad','Kolkata','Ahmedabad','Jaipur','Chandigarh','Lucknow','Indore','Surat','Thane']
  ), []);

  const inList = (name, list) => list.some(n => n.toLowerCase() === String(name).toLowerCase());

  const ncrCities = useMemo(() => (displayedCities || []).filter(c => inList(c, ncrNames)), [displayedCities, ncrNames]);
  const metroCities = useMemo(() => (displayedCities || []).filter(c => inList(c, metroNames)), [displayedCities, metroNames]);
  const otherCities = useMemo(() => (displayedCities || []).filter(c => !inList(c, ncrNames) && !inList(c, metroNames)), [displayedCities, ncrNames, metroNames]);

  // Badges for some cities
  const cityBadges = useMemo(() => ({
    'Gurgaon': { label: 'Hot', color: 'bg-amber-500' },
    'Gurugram': { label: 'Hot', color: 'bg-amber-500' },
    'Noida': { label: 'Hot', color: 'bg-amber-500' },
    'Greater Noida': { label: 'Hot', color: 'bg-amber-500' },
    'Delhi': { label: 'Prime', color: 'bg-rose-600' },
    'New Delhi': { label: 'Prime', color: 'bg-rose-600' },
    'Mumbai': { label: 'New', color: 'bg-blue-600' },
    'Navi Mumbai': { label: 'Hot', color: 'bg-amber-500' },
    'Pune': { label: 'Trending', color: 'bg-emerald-600' },
    'Bengaluru': { label: 'IT Hub', color: 'bg-purple-600' },
    'Bangalore': { label: 'IT Hub', color: 'bg-purple-600' },
    'Hyderabad': { label: 'Hot', color: 'bg-amber-500' },
    'Chennai': { label: 'Coastal', color: 'bg-cyan-600' },
    'Kolkata': { label: 'Cultural', color: 'bg-indigo-600' },
  }), []);

  const renderCard = (cname) => (
    <button key={cname} onClick={() => compareMode ? toggleCitySelect(cname) : onChooseCity(cname, false)} className={`relative bg-white border border-gray-200 rounded-2xl p-4 text-left shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col items-center gap-3 ${compareMode && selectedCities.includes(cname) ? 'ring-2 ring-blue-500' : ''}`} aria-label={`Select ${cname}`} title={`Property Rates in ${cname}`}>
      <span className="relative inline-flex w-24 h-24 rounded-full overflow-hidden bg-gray-100 shadow-inner">
        <img
          alt={cname}
          loading="lazy"
          src={getCityImage(cname)}
          onError={(e) => { e.currentTarget.src = fallbackImage; }}
          className="w-full h-full object-cover"
        />
        {/* subtle gradient ring when selected */}
        {compareMode && selectedCities.includes(cname) && (
          <span className="absolute inset-0 ring-2 ring-blue-500 rounded-full pointer-events-none" />
        )}
      </span>
      {cityBadges[cname] && (
        <span className={`absolute top-3 left-3 text-[10px] px-2 py-0.5 rounded-full text-white font-semibold ${cityBadges[cname].color}`}>{cityBadges[cname].label}</span>
      )}
      <span className="font-semibold text-lg text-gray-900 w-full max-w-[160px] truncate text-center">Property Rates in {cname}</span>
      {compareMode && (
        <label className="inline-flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" readOnly checked={selectedCities.includes(cname)} className="rounded text-blue-600 focus:ring-blue-500" /> Select
        </label>
      )}
      {compareMode && selectedCities.includes(cname) && (
        <span className="absolute top-3 right-3 inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-sm">✓</span>
      )}
    </button>
  );

  return (
    <>
      <header className="mb-6 md:mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Select a city</h1>
          <p className="text-gray-600 mt-1 text-base">To check property rates & price trends</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="inline-flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={compareMode} onChange={(e)=>{ setCompareMode(e.target.checked); setSelectedCities([]); }} className="rounded-sm text-blue-600 focus:ring-blue-500 h-4 w-4" /> Compare cities
          </label>
          {compareMode && (
            <>
              <span className="text-sm text-gray-500">Selected: <span className="font-semibold">{selectedCities.length}</span></span>
              <button disabled={selectedCities.length<2} onClick={()=>{ onChooseCity(null, true); }} className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${selectedCities.length<2 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-900 text-white border-gray-900 hover:bg-gray-700'}`}>Compare</button>
            </>
          )}
        </div>
      </header>
      <div className="mb-4 flex flex-col md:flex-row items-start md:items-center gap-2">
        <input value={cityQuery} onChange={(e)=>setCityQuery(e.target.value)} className="border border-gray-300 rounded-xl px-4 py-2.5 text-base w-full max-w-lg bg-white shadow-sm focus:ring-2 focus:ring-amber-500 focus:outline-none" placeholder="Search city..." aria-label="Search city" />
      </div>
      <div className="mb-6 flex flex-wrap gap-2">
        {popularChips.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => setCityQuery(chip)}
            className="px-4 py-2 rounded-full border border-gray-300 bg-gray-100 text-sm text-gray-700 hover:bg-gray-200 transition-colors"
            aria-label={`Filter by ${chip}`}
          >
            {chip}
          </button>
        ))}
      </div>
      {pickerLoading ? (
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6 md:gap-8 mb-6 md:mb-8">
          {Array.from({length:10}).map((_,i)=> (
            <div key={i} className="bg-gray-50 border border-gray-200 rounded-2xl p-4 animate-pulse shadow-sm">
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto" />
              <div className="mt-4 h-5 bg-gray-200 rounded w-3/4 mx-auto" />
            </div>
          ))}
        </section>
      ) : (
        <>
          {ncrCities.length > 0 && (
            <>
              <h2 className="mt-4 mb-3 text-lg font-bold text-gray-800 uppercase tracking-wider">Popular in NCR</h2>
              <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6 md:gap-8 mb-6 md:mb-8">
                {ncrCities.map(renderCard)}
              </section>
            </>
          )}
          {metroCities.length > 0 && (
            <>
              <h2 className="mt-4 mb-3 text-lg font-bold text-gray-800 uppercase tracking-wider">Metros</h2>
              <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6 md:gap-8 mb-6 md:mb-8">
                {metroCities.map(renderCard)}
              </section>
            </>
          )}
          {otherCities.length > 0 && (
            <>
              <h2 className="mt-4 mb-3 text-lg font-bold text-gray-800 uppercase tracking-wider">Other cities</h2>
              <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6 md:gap-8 mb-6 md:mb-8">
                {otherCities.map(renderCard)}
              </section>
            </>
          )}
        </>
      )}
      {!pickerLoading && visibleCities && visibleCities.length > displayedCities.length && !expanded && (
        <div className="flex items-center justify-center mb-8">
          <button onClick={() => setExpanded(true)} className="px-6 py-3 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 text-base font-semibold transition-colors shadow-sm">View More</button>
        </div>
      )}
      {!pickerLoading && expanded && visibleCities && visibleCities.length > perPage && (
        <div className="flex items-center justify-center mb-8">
          <button onClick={() => setExpanded(false)} className="px-6 py-3 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 text-base font-semibold transition-colors shadow-sm">View Less</button>
        </div>
      )}

      {/* Sticky compare action on mobile */}
      {compareMode && (
        <>
          {/* Mobile sticky bottom bar */}
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92vw] max-w-md md:hidden z-30">
            <div className="flex items-center justify-between gap-3 bg-white border border-gray-200 shadow-2xl rounded-full px-5 py-3">
              <span className="text-sm text-gray-700">Selected: <span className="font-bold text-gray-900">{selectedCities.length}</span></span>
              <button
                disabled={selectedCities.length < 2}
                onClick={() => { onChooseCity(null, true); }}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${selectedCities.length < 2 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-900 text-white hover:bg-gray-700'}`}
              >
                Compare
              </button>
            </div>
          </div>
          {/* Tablet/Desktop floating panel */}
          <div className="hidden md:flex fixed bottom-6 right-6 z-30">
            <div className="flex items-center gap-4 bg-white border border-gray-200 shadow-2xl rounded-full pl-6 pr-3 py-3">
              <span className="text-sm text-gray-700">Selected: <span className="font-bold text-gray-900">{selectedCities.length}</span></span>
              <button
                disabled={selectedCities.length < 2}
                onClick={() => { onChooseCity(null, true); }}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-colors duration-200 ${selectedCities.length < 2 ? 'bg-gray-200 text-gray-500' : 'bg-gray-900 text-white hover:bg-gray-700'}`}
              >
                Compare
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}