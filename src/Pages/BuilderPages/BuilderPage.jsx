import React, {useEffect, useState, useMemo, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../../Components/Actual_Components/Footer";
import { Helmet } from "react-helmet";
import { LocationRedIcon, PropertyIcon, RupeeIcon, ShareFrameIcon } from "../../Assets/icons";
import { useSelector, useDispatch } from "react-redux";
import Api_Service from "../../Redux/utils/Api_Service";
import { orderProjects, hasCustomOrder, getCustomOrder, getRandomSeed } from "../../Utils/ProjectOrderUtils";
import { syncProjectOrdersFromServer } from "../../Redux/slice/ProjectOrderSlice";
import { isFavorite, toggleFavorite, subscribe, hydrateFavoritesFromServer } from "../../Utils/favorites";
// New modern Developer Page components
import Hero from "../DeveloperPage/Hero";
import FilterBar from "../DeveloperPage/FilterBar";
import ProjectCard from "../DeveloperPage/ProjectCard";
import CompareBar from "../DeveloperPage/CompareBar";

// Lightweight builder information for sidebar display
// Extend freely as needed; safe fallbacks are provided if a builder key is missing
const BUILDER_INFO = {
  "godrej-properties": {
    about:
      "Godrej Properties brings the legacy of Godrej Group to the real estate industry with a strong focus on design, sustainability, and customer trust. They develop residential and commercial landmarks across major Indian cities.",
    founded: "1990",
    hq: "Mumbai, Maharashtra",
    website: "https://www.godrejproperties.com/",
  },
  "dlf-homes": {
    about:
      "DLF is one of India's largest real estate developers, known for large-scale integrated townships, commercial complexes, and premium residences across the country.",
    founded: "1946",
    hq: "Gurugram, Haryana",
    website: "https://www.dlf.in/",
  },
  "m3m-india": {
    about:
      "M3M India is recognized for innovative concepts and premium developments in the luxury real estate segment with strong presence in Gurugram.",
    founded: "2007",
    hq: "Gurugram, Haryana",
    website: "https://www.m3mindia.com/",
  },
  "bptp-limited": {
    about:
      "BPTP develops residential and commercial projects with a focus on quality construction and practical designs in NCR and beyond.",
    founded: "2003",
    hq: "Gurugram, Haryana",
    website: "https://www.bptp.com/",
  },
  "emaar-india": {
    about:
      "Emaar India, part of Emaar Properties, creates premium residential and commercial spaces known for international-quality design and execution.",
    founded: "2005 (India)",
    hq: "Gurugram, Haryana",
    website: "https://www.emaar-india.com/",
  },
};

// Builder logos aligned with the grid in Builder.jsx
const BUILDER_LOGOS = {
  'godrej-properties': 'https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/godrej.jpg',
  'dlf-homes': 'https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/dlf.png',
  'emaar-india': 'https://cdn.in.emaar.com/wp-content/themes/emaar/inc/assets/images/emaar-india-logo-en.svg',
  'birla-estate': 'https://www.birlaestates.com/images/birla-estate-logo.webp',
  'adani-realty': 'https://www.adanirealty.com/-/media/project/realty/header/logo.ashx',
  'experion-developers': 'https://www.experion.co/img/logo/experion-logo.png',
  'signature-global': 'https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/signature.webp',
  'sobha-developers': 'https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/banner/sobha.webp',
  'central-park': 'https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/centralpark.jpg',
  'trump-towers': 'https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/banner/Trump-Tower.webp',
  'elan-group': 'https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/elan-logo.webp',
  'puri-developers': 'https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/banner/puri+(1).webp',
  'm3m-india': 'https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/m3m.webp',
  'smartworld-developers': 'https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/smartworld.webp',
  'bptp-limited': 'https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/bptp.webp',
  'whiteland': 'https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/whiteland.jpg',
  'indiabulls-real-estate': 'https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/indiabulls.webp',
  'aipl': 'https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/aipl.png',
  'trevoc-group': 'https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/trevoc.webp',
  'aarize-developers': 'https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/project/tmfm0mywshnqqnmz7j9x',
};

// Sidebar component that stays fixed (sticky) on large screens
const DeveloperSidebar = ({ builderKey, builderName }) => {
  const info = BUILDER_INFO[builderKey] || {};
  const aboutText =
    info.about || `${builderName} is a reputed real estate developer with projects known for location, quality, and amenities.`;
  const logoSrc = BUILDER_LOGOS[builderKey] || '/Images/100acresslogo.png';

  return (
    <aside className="hidden lg:block lg:col-span-3">
      <div className="sticky top-24">
        <div className="rounded-xl border shadow-sm bg-white">
          <div className="p-5 border-b">
            <img
              src={logoSrc}
              alt={`${builderName} logo`}
              className="w-20 h-20 object-contain bg-white rounded mb-2 mx-auto"
              loading="lazy"
            />
            <h2 className="text-xl font-semibold text-gray-800">About {builderName}</h2>
          </div>
          <div className="p-5 space-y-4 text-sm leading-6 text-gray-700">
            <p className="text-gray-700">{aboutText}</p>
            <ul className="space-y-2">
              {info.founded && (
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-red-500">•</span>
                  <span><span className="font-medium">Founded:</span> {info.founded}</span>
                </li>
              )}
              {info.hq && (
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-red-500">•</span>
                  <span><span className="font-medium">Headquarters:</span> {info.hq}</span>
                </li>
              )}
              <li className="flex items-start gap-2">
                <span className="mt-1 text-red-500">•</span>
                <span><span className="font-medium">Focus:</span> Residential and mixed-use developments</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};

const BuilderPage = React.memo(() => {
    const { builderName } = useParams(); 
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [isSynced, setIsSynced] = useState(false);
    const [favoriteIds, setFavoriteIds] = useState([]);
    const {getProjectbyBuilder, getPropertyOrder} = Api_Service();
    
    // Memoize sync function to prevent infinite re-renders
    const memoizedSyncProjectOrders = useCallback(() => {
      return dispatch(syncProjectOrdersFromServer());
    }, [dispatch]);
    
    // Subscribe to favorites to trigger re-render on updates
    useEffect(() => {
      hydrateFavoritesFromServer();
      const unsub = subscribe((ids) => setFavoriteIds(ids || []));
      return () => { if (typeof unsub === 'function') unsub(); };
    }, []);

    // Get builder projects from Redux store
    const SignatureBuilder = useSelector(store => store?.builder?.signatureglobal);
    const M3M = useSelector(store => store?.builder?.m3m);
    const dlfAllProjects= useSelector(store => store?.builder?.dlf);
    const Experion = useSelector(store => store?.builder?.experion);
    const Elan = useSelector(store => store?.builder?.elan);
    const BPTP = useSelector(store => store?.builder?.bptp);
    const Adani = useSelector(store => store?.builder?.adani);
    const SmartWorld = useSelector(store => store?.builder?.smartworld);
    const Trevoc = useSelector(store => store?.builder?.trevoc);
    const IndiaBulls = useSelector(store => store?.builder?.indiabulls);
    const centralpark = useSelector(store => store?.builder?.centralpark);
    const emaarindia = useSelector(store => store?.builder?.emaarindia);
    const godrej = useSelector(store => store?.builder?.godrej);
    const whiteland = useSelector(store => store?.builder?.whiteland);
    const aipl = useSelector(store => store?.builder?.aipl);
    const birla = useSelector(store => store?.builder?.birla);
    const sobha = useSelector(store => store?.builder?.sobha);
    const trump = useSelector(store => store?.builder?.trump);
    const puri = useSelector(store => store?.builder?.puri);
    const aarize = useSelector(store => store?.builder?.aarize);
    
    // Get project order state from Redux store
    const customOrders = useSelector(store => store?.projectOrder?.customOrders);
    const buildersWithCustomOrder = useSelector(store => store?.projectOrder?.buildersWithCustomOrder);
    const randomSeeds = useSelector(store => store?.projectOrder?.randomSeeds);

  const buildersData = {
    'signature-global': SignatureBuilder,
    'm3m-india': M3M,
    'dlf-homes': dlfAllProjects,
    'experion-developers': Experion,
    'elan-group': Elan,
    'bptp-limited':BPTP,
    'adani-realty':Adani,
    'smartworld-developers':SmartWorld, 
    'trevoc-group':Trevoc,
    'indiabulls-real-estate':IndiaBulls ,
    'central-park':centralpark,
    'emaar-india' : emaarindia,
    'godrej-properties' : godrej,
    'whiteland' : whiteland,
    'aipl' : aipl,
    'birla-estate': birla,
    'sobha-developers': sobha,
    'trump-towers': trump,
    'puri-developers': puri,
    'aarize-developers': aarize
  };
  const builderProjects = buildersData[builderName] || [];

  const filteredBuilderProjects = builderName === 'birla-estate'
    ? (builderProjects || []).filter(
        p => p.builderName && p.builderName.trim().toLowerCase().includes('birla estate') &&
             (!p.type || p.type.toLowerCase() !== 'rental') &&
             (!p.project_Status || p.project_Status.toLowerCase() !== 'rental')
      )
    : builderProjects;

  // Fetch Property Order for this builder's query name and cache IDs for ordering
  const [propOrderIds, setPropOrderIds] = useState([]);
  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      if (!query) { setPropOrderIds([]); return; }
      try {
        const orderDoc = await getPropertyOrder(query);
        const ids = Array.isArray(orderDoc?.customOrder) ? orderDoc.customOrder : [];
        if (!cancelled) setPropOrderIds(ids);
      } catch (e) {
        if (!cancelled) setPropOrderIds([]);
      }
    };
    run();
    return () => { cancelled = true; };
  }, [query, getPropertyOrder]);

  // Apply Property Order if available, otherwise Project Order/Random
  const orderedProjects = useMemo(() => {
    // Important: use canonical query (e.g., 'Godrej Properties') as key for Redux order
    const keyForOrder = query || builderName;
    const hasCustomOrderDefined = hasCustomOrder(keyForOrder, buildersWithCustomOrder);
    const customOrder = getCustomOrder(keyForOrder, customOrders);
    const randomSeed = getRandomSeed(keyForOrder, randomSeeds);
    
    console.log('🔍 BuilderPage - hasCustomOrderDefined:', hasCustomOrderDefined);
    console.log('🔍 BuilderPage - customOrder:', customOrder);
    console.log('🔍 BuilderPage - randomSeed:', randomSeed);
    console.log('🔍 BuilderPage - filteredBuilderProjects length:', filteredBuilderProjects.length);
    
    // First, try to apply Property Order if we've fetched it (stored in state below)
    // We'll use a closure-captured variable propOrderIds if defined via effect
    if (Array.isArray(propOrderIds) && propOrderIds.length > 0) {
      const byId = new Map((filteredBuilderProjects || []).map(p => [String(p._id || p.id), p]));
      const idsStr = propOrderIds.map(String);
      const ordered = [
        ...idsStr.filter(id => byId.has(id)).map(id => byId.get(id)),
        ...(filteredBuilderProjects || []).filter(p => !idsStr.includes(String(p._id || p.id)))
      ];
      return ordered;
    }

    // Otherwise, use Project Order/Random logic
    return orderProjects(
      filteredBuilderProjects,
      keyForOrder,
      customOrder,
      hasCustomOrderDefined,
      randomSeed
    );
  }, [filteredBuilderProjects, builderName, query, buildersWithCustomOrder, customOrders, randomSeeds, propOrderIds]);
  

  const handleShare = (project) => {
    if (navigator.share) {
      navigator
        .share({
          title: project?.projectName,
          text: `Check out this project: ${project.projectName}`,
          url: `${window.location.origin}/${project.project_url}`,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      alert("Share functionality is not supported on this device/browser.");
    }
  };

  const onToggleFavorite = (project) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const snapshot = {
      title: project.projectName,
      image: project.frontImage?.url || project.frontImage?.cdn_url,
      priceText:
        typeof project.minPrice !== 'undefined' && typeof project.maxPrice !== 'undefined'
          ? `${project.minPrice} - ${project.maxPrice} Cr`
          : '',
      url: `/${project.project_url}/`,
      city: project.city,
      maxPrice: project.maxPrice,
      minPrice: project.minPrice,
    };
    
    // Get authentication state from localStorage since we don't have access to AuthContext here
    const isAuthenticated = !!localStorage.getItem('myToken');
    
    if (!isAuthenticated) {
      if (typeof window.showAuthModal === 'function') {
        window.showAuthModal();
      }
      if (window.toast) {
        window.toast.error('Please login to save properties');
      }
      return;
    }
    
    toggleFavorite(project._id || project.id || project.slug, snapshot, isAuthenticated);
  };

  const formatBuilderName = (name) => {
    return name
      .split('-') 
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
      .join(' '); 
  };
  
  const formattedBuilderName = formatBuilderName(builderName);
  
  useEffect(() => {
    if (builderName) {
      const builderQueries = {
        'signature-global': 'Signature Global',
        'm3m-india': 'M3M India',
        'dlf-homes': 'DLF Homes',
        'experion-developers': 'Experion Developers',
        'elan-group': 'Elan Group',
        'bptp-limited' : 'BPTP LTD',
        'adani-realty': 'Adani Realty',
        'trevoc-group' : 'Trevoc Group',
        'indiabulls-real-estate' : 'Indiabulls',
        'smartworld-developers' : 'Smartworld',
        'central-park' : 'Central Park',
        'emaar-india' : 'Emaar India',
        'godrej-properties' : 'Godrej Properties',
        'whiteland' : 'Whiteland Corporation',
        'aipl' : 'AIPL',
        'birla-estate': 'Birla Estates',
        'sobha-developers': 'Sobha',
        'trump-towers': 'Trump Towers',
        'puri-developers': 'Puri Constructions',
        'aarize-developers': 'Aarize Group'
      };

      const queryValue = builderQueries[builderName.toLowerCase()];
      if (queryValue) {
        setQuery(queryValue);
      }
    }
  }, [builderName, query]);

  useEffect(() => {
    if (query) {
      console.log('🔍 Fetching projects for builder:', query);
      setLoading(true);
      Promise.resolve(getProjectbyBuilder(query, 0)).finally(() => setLoading(false));
    }
  }, [query, getProjectbyBuilder]);

  

  // Sync project orders from server on component mount
  useEffect(() => {
    console.log('🔍 BuilderPage - Syncing project orders from server...');
    setIsSynced(false);
    
    memoizedSyncProjectOrders()
      .then((result) => {
        console.log('🔍 BuilderPage - Sync result:', result);
        setIsSynced(true);
        console.log('🔍 BuilderPage - Project orders synced successfully');
      })
      .catch((error) => {
        console.error('🔍 BuilderPage - Error syncing project orders:', error);
        setIsSynced(false);
      });
  }, [memoizedSyncProjectOrders]);

  // Auto-sync every 30 seconds to keep updated
  useEffect(() => {
    const syncInterval = setInterval(() => {
      console.log('🔍 BuilderPage - Auto-syncing project orders...');
      memoizedSyncProjectOrders()
        .then((result) => {
          console.log('🔍 BuilderPage - Auto-sync result:', result);
          setIsSynced(true);
        })
        .catch((error) => {
          console.error('🔍 BuilderPage - Auto-sync failed:', error);
          setIsSynced(false);
        });
    }, 30000); // Sync every 30 seconds

    return () => clearInterval(syncInterval);
  }, [memoizedSyncProjectOrders]);

  // Force re-render when Redux state changes
  useEffect(() => {
    console.log('🔍 BuilderPage re-rendering due to Redux state change');
  }, [customOrders, buildersWithCustomOrder, randomSeeds]);

  // UI states for new page (must be declared before any conditional return to keep hooks order stable)
  const [view, setView] = useState('grid');
  const [sort, setSort] = useState('newest');
  const [mapView, setMapView] = useState(false);
  const [compare, setCompare] = useState([]);

  // Render loading state if data is not yet available
  if (loading) {
    return <div className="flex justify-center items-center min-h-[40vh] text-xl font-semibold text-red-600">Loading projects...</div>;
  }

  const toggleCompare = (p) => {
    setCompare((prev) => {
      const exists = prev.find(x => (x._id || x.id) === (p._id || p.id));
      if (exists) return prev.filter(x => (x._id || x.id) !== (p._id || p.id));
      const next = [...prev, p];
      return next.slice(-3); // cap to 3
    });
  };

  const onExplore = (project) => {
    try {
      // analytics hook
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'developer_explore_click', project: project?.projectName });
    } catch {}
    const pUrl = project?.project_url;
    if (pUrl) window.location.href = `/${pUrl}/`;
  };

  const onFavorite = (project) => {
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'developer_favorite_click', project: project?.projectName });
    } catch {}
    return onToggleFavorite(project)({ preventDefault: () => {}, stopPropagation: () => {} });
  };

  return (
    <div>
      <Helmet>
        <title>Developer Page | {formattedBuilderName}</title>
        <meta name="description" content={`Developer Page for ${formattedBuilderName}. Explore premium projects with filters, map view, and comparisons.`} />
        <link rel="canonical" href={`https://www.100acress.com/developers/${builderName.toLowerCase()}/`} />
      </Helmet>

      {/* Hero */}
      <Hero title={formattedBuilderName} onExplore={() => {}} onContact={() => {}} />
      {/* Sticky Filters */}
      <FilterBar view={view} setView={setView} sort={sort} setSort={setSort} mapView={mapView} setMapView={setMapView} />

      {/* Main two-column layout */}
      <section className="w-full flex flex-col items-center px-4 md:px-6 py-6">
        <h1 className="sr-only">Developer Page</h1>
        <div className="w-full max-w-screen-xl grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Developer info */}
          <DeveloperSidebar builderKey={builderName} builderName={formattedBuilderName} />

          {/* Right: Content with optional map split */}
          <div className="lg:col-span-9 space-y-4">
            {mapView ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-5 rounded-xl border bg-white/70 h-[420px] flex items-center justify-center text-gray-500">
                  Map coming soon
                </div>
                <div className="lg:col-span-7">
                  <div className={`${view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4' : 'space-y-3'}`}>
                    {orderedProjects?.map((item, index) => (
                      <ProjectCard
                        key={item._id || item.id || index}
                        project={item}
                        view={view}
                        onExplore={onExplore}
                        onFavorite={onFavorite}
                        onShare={handleShare}
                        isFav={isFavorite(item._id || item.id || item.slug)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className={`${view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}`}>
                {orderedProjects?.map((item, index) => (
                  <ProjectCard
                    key={item._id || item.id || index}
                    project={item}
                    view={view}
                    onExplore={onExplore}
                    onFavorite={onFavorite}
                    onShare={handleShare}
                    isFav={isFavorite(item._id || item.id || item.slug)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Compare Bar */}
      <CompareBar items={compare} onOpen={() => { /* TODO: open compare page */ }} onRemove={(p) => setCompare(prev => prev.filter(x => (x._id || x.id) !== (p._id || p.id)))} />

      <Footer />
    </div>
  );
});

export default BuilderPage;
