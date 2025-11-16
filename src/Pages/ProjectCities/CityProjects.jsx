import React, { useEffect, useState, useMemo } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import ProjectSearching from "../ProjectSearching";
import CommonInside from "../../Utils/CommonInside";
import { useSelector } from "react-redux";
import Api_service from "../../Redux/utils/Api_Service";
import Footer from "../../Components/Actual_Components/Footer";
import Navbar from "../../aadharhomes/navbar/Navbar";

// Utility: title case a slug or plain string
const toTitle = (str = "") => str
  .replace(/[-_]+/g, " ")
  .toLowerCase()
  .split(" ")
  .filter(Boolean)
  .map(w => w.charAt(0).toUpperCase() + w.slice(1))
  .join(" ");

// Map common slugs to canonical city names used by API if needed
const CITY_ALIASES = {
  gurugram: "Gurugram",
  gurgaon: "Gurugram",
  delhi: "Delhi",
  noida: "Noida",
  mumbai: "Mumbai",
  panipat: "Panipat",
  panchkula: "Panchkula",
  kasauli: "Kasauli",
  sonipat: "Sonipat",
  jalandhar: "Jalandhar",
  karnal: "Karnal",
  goa: "Goa",
  pushkar: "Pushkar",
  dubai: "Dubai"
};

const CityProjects = () => {
  const { citySlug } = useParams();
  // Fallback: infer slug from pathname if param is not present (works for static routes like '/project-in-delhi/')
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const pathMatch = pathname.match(/project[s]?-in-([^/]+)/i);
  const inferredSlug = citySlug || (pathMatch ? pathMatch[1] : undefined) || 'gurugram';
  const city = CITY_ALIASES[inferredSlug.toLowerCase()] || toTitle(inferredSlug);
  const displayCity = city; // for headings

  const { getProjectbyState } = Api_service();
  // We keep a single slice per city in Redux under `stateproject`
  const allStateProjects = useSelector(store => store?.stateproject || {});
  const cityKey = city.toLowerCase();
  const cityData = allStateProjects[cityKey] || [];

  const [filtereddata, setFilteredData] = useState([]);
  const [datafromsearch, setDatafromsearch] = useState({});
  function handleDatafromSearch(data){
    setFilteredData(data);
  }

  useEffect(() => {
    if (!Array.isArray(cityData) || cityData.length === 0) {
      getProjectbyState(city, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityKey]);

  useEffect(() => {
    setDatafromsearch({ [cityKey]: cityData });
  }, [cityKey, cityData]);

  const pageTitle = `Best Real Estate Projects in ${displayCity} - 100acress`;
  const pageDesc = `Upgrade your lifestyle with best real estate projects in ${displayCity}. Browse modern apartments, villas, and investment-ready properties at 100acress.`;
  const projectsInCities = new Set(["gurugram", "sonipat", "karnal", "jalandhar", "pushkar", "dubai"]);
  const slug = inferredSlug.toLowerCase();
  const canonical = projectsInCities.has(slug)
    ? `https://www.100acress.com/projects-in-${slug}/`
    : `https://www.100acress.com/project-in-${slug}/`;

  const results = filtereddata.length === 0 ? (datafromsearch?.[cityKey] || []) : filtereddata;
  // Sidebar filters (client-side)
  const [sideFilters, setSideFilters] = useState({
    type: [], // matches item.type or postProperty?.propertyType
    status: [], // matches item.projectStatus or item.status if present
    priceRanges: [], // strings: '<1', '1-5', '5-10', '10-20', '20-50', '>50'
  });

  const toggleFilter = (key, val) => {
    setSideFilters(prev => {
      const arr = new Set(prev[key]);
      if (arr.has(val)) arr.delete(val); else arr.add(val);
      return { ...prev, [key]: Array.from(arr) };
    });
  };

  const clearAll = () => setSideFilters({ type: [], status: [], priceRanges: [] });

  const matchesPrice = (min, max, code) => {
    const mm = [Number(min), Number(max)].map(v => (isNaN(v) ? undefined : v));
    const [a, b] = mm;
    switch (code) {
      case '<1': return (a !== undefined && a < 1) || (b !== undefined && b < 1);
      case '1-5': return (a !== undefined && a < 5 && a >= 1) || (b !== undefined && b <= 5 && b >= 1) || (a <= 1 && b >= 5);
      case '5-10': return (a !== undefined && a < 10 && a >= 5) || (b !== undefined && b <= 10 && b >= 5) || (a <= 5 && b >= 10);
      case '10-20': return (a !== undefined && a < 20 && a >= 10) || (b !== undefined && b <= 20 && b >= 10) || (a <= 10 && b >= 20);
      case '20-50': return (a !== undefined && a < 50 && a >= 20) || (b !== undefined && b <= 50 && b >= 20) || (a <= 20 && b >= 50);
      case '>50': return (a !== undefined && a > 50) || (b !== undefined && b > 50);
      default: return true;
    }
  };

  const filteredBySidebar = useMemo(() => {
    const base = results || [];
    const { type, status, priceRanges } = sideFilters;
    return base.filter(item => {
      // type
      if (type.length) {
        const v = item.type || item.postProperty?.propertyType || item.postProperty?.type;
        if (!v || !type.includes(v)) return false;
      }
      // status
      if (status.length) {
        const s = item.projectStatus || item.status;
        if (!s || !status.includes(s)) return false;
      }
      // price
      if (priceRanges.length) {
        const min = item.minPrice;
        const max = item.maxPrice;
        let ok = false;
        for (const code of priceRanges) {
          if (matchesPrice(min, max, code)) { ok = true; break; }
        }
        if (!ok) return false;
      }
      return true;
    });
  }, [results, sideFilters]);

  return (
    <div>
      <Helmet>
        <meta name="description" content={pageDesc} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:site_name" content="100acress" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/logo.webp" />
        <meta property="og:url" content={canonical} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:keywords" content={`Projects in ${displayCity}`} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        <meta name="twitter:url" content="https://twitter.com/100acressdotcom" />
        <meta name="twitter:card" content="summary" />
        <title>{pageTitle}</title>
        <link rel="canonical" href={canonical} />
      </Helmet>

      <Navbar />
      <main className="mt-14">
        {/* Header */}
        <section className="flex flex-col items-center pt-10 md:pt-14 px-4 mt-2 md:mt-4">
          <div className="text-center max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold text-[#D32F2F] mb-2">Best Projects in {displayCity}</h1>
            <div className="w-16 h-1 mx-auto bg-[#D32F2F] rounded mb-2"></div>
            <p className="text-gray-500 text-base md:text-lg">
              Value, Location, and Comfort — Discover premium projects in prime {displayCity} locations.
            </p>
          </div>
        </section>

        {/* Filter ribbon (sticky) */}
        <section className="max-w-7xl mx-auto w-full">
          {slug === 'gurugram' ? (
            <ProjectSearching
              searchdata={cityData}
              sendDatatoparent={handleDatafromSearch}
              city={city}
              showPrimeOnly={true}
            />
          ) : (
            <ProjectSearching
              searchdata={cityData}
              sendDatatoparent={handleDatafromSearch}
              city={city}
            />
          )}
        </section>

        {/* Sidebar + Results */}
        <section className="max-w-7xl mx-auto w-full px-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Sidebar (desktop) */}
            <aside className="hidden md:block md:col-span-3">
              <div className="sticky top-28 lg:top-32 bg-white/80 backdrop-blur rounded-2xl border border-gray-200 shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-gray-800">Filter Options</h3>
                  <button className="text-xs text-red-600 font-semibold" onClick={clearAll} type="button">Clear All</button>
                </div>

                {/* Project Type */}
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Project Type</div>
                  <div className="space-y-2 text-sm text-gray-600">
                    {['Commercial Property','Residential Flats','SCO Plots','Deen Dayal Plots','Residential Plots','Independent Floors','Builder Floors','Affordable Homes','Villas','Farm Houses'].map(opt => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-gray-300" checked={sideFilters.type.includes(opt)} onChange={() => toggleFilter('type', opt)} />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Project Status */}
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Project Status</div>
                  <div className="space-y-2 text-sm text-gray-600">
                    {[{k:'comingsoon',l:'Upcoming Projects'},{k:'newlaunch',l:'New Launch Projects'},{k:'underconstruction',l:'Under Constructions'},{k:'readytomove',l:'Ready To Move'}].map(({k,l}) => (
                      <label key={k} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-gray-300" checked={sideFilters.status.includes(k)} onChange={() => toggleFilter('status', k)} />
                        {l}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-2">
                  <div className="text-sm font-medium text-gray-700 mb-2">Price Range</div>
                  <div className="space-y-2 text-sm text-gray-600">
                    {[{k:'<1',l:'Under 1 Cr'},{k:'1-5',l:'1–5 Cr'},{k:'5-10',l:'5–10 Cr'},{k:'10-20',l:'10–20 Cr'},{k:'20-50',l:'20–50 Cr'},{k:'>50',l:'Above 50 Cr'}].map(({k,l}) => (
                      <label key={k} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-gray-300" checked={sideFilters.priceRanges.includes(k)} onChange={() => toggleFilter('priceRanges', k)} />
                        {l}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Results */}
            <div className="md:col-span-9">
              <CommonInside Actualdata={filteredBySidebar} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CityProjects;
