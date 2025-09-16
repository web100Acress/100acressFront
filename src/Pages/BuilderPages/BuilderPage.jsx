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
      "Godrej is one of the most trusted real estate developers in India. With more than 120 years of experience, they build modern apartments, flats, and homes that give comfort, safety, and a better lifestyle. Their projects are in Gurgaon, Delhi NCR, Mumbai, Pune, and other cities. They focus on using good materials and making sure homes are ready on time. Whether it’s affordable housing or luxury homes, Godrej ensures excellent connectivity, world-class amenities, and a clean environment. Choosing Godrej means you get quality homes that are perfect for families and investors looking for residential projects with long-term value.",
    founded: "1990",
    hq: "Mumbai, Maharashtra",
    website: "https://www.godrejproperties.com/",
  },
  "dlf-homes": {
    about:
      "DLF is a well-known real estate developer in India. For more than 70 years, they have built residential projects, apartments, flats, and commercial spaces in big cities like Gurgaon. Their homes are modern and offer luxury living with great amenities like parks, gyms, and swimming pools. DLF focuses on making sure homes are built with good materials and delivered on time. Their projects are in prime locations with good connectivity to offices and markets. Many families and investors trust DLF when looking for affordable housing or luxury apartments, as they offer homes that are safe, comfortable, and add value to life.",
    founded: "1946",
    hq: "Gurugram, Haryana",
    website: "https://www.dlf.in/",
  },
  "m3m-india": {
    about:
      "M3M is a top real estate developer known for creating luxury apartments, flats, and residential projects with modern designs and smart solutions. Their homes in Gurgaon and other cities offer world-class amenities, safe surroundings, and excellent connectivity to schools and offices. M3M focuses on building homes that give families comfort and investors long-term value. Their designs are stylish, functional, and eco-friendly, making them ideal for today’s lifestyle. With a focus on customer satisfaction, timely delivery, and high-quality construction, M3M is trusted by many when looking for affordable housing, luxury living, and residential projects that offer a better future.",
    founded: "2007",
    hq: "Gurugram, Haryana",
    website: "https://www.m3mindia.com/",
  },
  "bptp-limited": {
    about:
      "BPTP is a trusted name in real estate, building modern apartments, flats, and residential projects with great care and high-quality construction. Their homes in Gurgaon and other cities offer world-class amenities, spacious layouts, and excellent connectivity to schools and offices. BPTP focuses on giving families and investors safe, comfortable, and stylish spaces to live in. They use eco-friendly designs and ensure projects are delivered on time. Families looking for affordable housing, luxury living, or residential projects trust BPTP because they offer practical solutions, modern facilities, and a better lifestyle that adds long-term value to their homes.",
    founded: "2003",
    hq: "Gurugram, Haryana",
    website: "https://www.bptp.com/",
  },
  "emaar-india": {
    about:
      "Emaar is a famous real estate company known for building beautiful apartments, flats, and homes that look stylish and are comfortable to live in. Their projects in Gurgaon have green spaces, clean surroundings, and modern amenities like gardens and sports areas. Emaar follows international designs and focuses on quality so that families can enjoy a happy lifestyle. Their homes are in prime locations with good connectivity to schools, hospitals, and offices. People who want luxury homes or residential projects with world-class facilities trust Emaar because they build spaces that are safe, convenient, and perfect for families and investors alike.",
    founded: "2005 (India)",
    hq: "Gurugram, Haryana",
    website: "https://www.emaar-india.com/",
  },
  "birla-estate": {
    about:
      "Birla Estates is part of the famous Aditya Birla Group and is known for building affordable apartments, flats, and homes with great designs. Their projects in Gurgaon and other cities offer modern living, world-class amenities, and safe surroundings for families and working people. They focus on using eco-friendly materials and making homes that are comfortable and stylish. With a strong brand name, Birla Estates ensures timely delivery and good construction. Many families trust them when looking for residential projects, affordable housing, or luxury apartments because their homes give long-term value, comfort, and a better lifestyle in well-connected areas.",
  },
  "adani-realty": {
    about:
      "Adani Realty, part of the Adani Group, is known for creating high-quality apartments, flats, and residential projects that are modern and eco-friendly. Their homes have excellent connectivity, safe surroundings, and world-class amenities like parks, gyms, and swimming pools. They build affordable housing and luxury homes in cities like Gurgaon where families and investors look for safe and comfortable spaces. Adani Realty focuses on timely delivery, good construction, and keeping customers happy. People trust their projects because they offer green living, modern designs, and smart facilities that make everyday life easier and better for families and working professionals.",
  },
  "experion-developers": {
    about:
      "Experion Developers is known for building modern apartments, flats, and residential projects that give comfort and joy. They believe in ‘The Positive Side of Life’ and create homes with open spaces, greenery, and world-class amenities like parks and sports areas. Their projects in Gurgaon are built with good quality materials and smart designs to ensure safety and comfort. Experion focuses on customer satisfaction, timely delivery, and using eco-friendly solutions. Families and investors looking for affordable housing, luxury homes, or residential projects trust Experion because they offer spaces that are perfect for living, working, and growing in well-connected areas.",
  },
  "signature-global": {
    about:
      "Signature Global builds affordable apartments, flats, and homes that are perfect for families, professionals, and first-time buyers. Their projects in Gurgaon and other cities have good connectivity, modern designs, and world-class amenities like parks and gyms. They focus on making homes that are comfortable, safe, and ready on time. Whether you want luxury homes or affordable housing, Signature Global gives you smart solutions that fit your needs. People trust them because they always focus on customer satisfaction, transparency, and long-term value. Their homes are built with eco-friendly materials and offer a better lifestyle for families and investors.",
  },
  "sobha-developers": {
    about:
      "Sobha Developers is a trusted name in real estate for building luxury homes, apartments, and flats with attention to quality and design. Their projects in Gurgaon, Bengaluru, and other cities offer world-class amenities, safe environments, and elegant living spaces. They focus on building homes that give families comfort and a premium lifestyle without any compromise. Their designs are eco-friendly and carefully crafted to give the best experience. Sobha Developers is known for timely delivery, good construction, and customer satisfaction. Families and investors looking for residential projects, luxury apartments, and affordable housing trust Sobha for their excellent service and long-term value.",
  },
  "central-park": {
    about:
      "Central Park is a famous real estate developer that builds modern apartments, flats, and residential projects where families can live in peace. Their homes are located in Gurgaon and other cities with green surroundings, world-class amenities, and safe, clean environments. They focus on giving families a healthy and comfortable lifestyle with parks, walking areas, and excellent connectivity to schools and offices. Central Park ensures homes are built with good materials and delivered on time. People looking for affordable housing, luxury apartments, or residential projects trust Central Park because they offer homes that are perfect for families and give long-term value.",
  },
  "trump-towers": {
    about:
      "Trump Towers is known for building luxury apartments, flats, and homes with beautiful designs and top-quality materials. Their projects in Gurgaon and other cities offer prime locations, lush surroundings, and world-class amenities like gyms, pools, and gardens. They focus on creating spaces that give families comfort, security, and a prestigious lifestyle. Every detail is carefully designed to ensure homes are stylish and functional. Investors and families looking for luxury living, affordable housing, or residential projects trust Trump Towers because they deliver high-quality homes with excellent connectivity and modern facilities.",
  },
  "elan-group": {
    about:
      "Elan Group builds affordable apartments, flats, and residential projects with smart designs and modern facilities. Their homes in Gurgaon and other cities are perfect for families and working people who want comfort and safety. They focus on using good construction materials and eco-friendly designs to ensure a healthy lifestyle. Their projects come with excellent connectivity, parks, gyms, and other world-class amenities. Elan Group emphasizes customer satisfaction, timely delivery, and transparent processes. Families and investors looking for residential projects, affordable housing, or luxury homes trust Elan Group because they offer safe, practical, and stylish living spaces.",
  },
  "puri-developers": {
    about:
      "Puri Developers is a trusted real estate brand known for creating affordable apartments, flats, and homes that are stylish, safe, and comfortable. Their projects in Gurgaon and other cities offer world-class amenities, spacious layouts, and excellent connectivity to schools, hospitals, and offices. They focus on using good quality materials and delivering homes on time. Whether you are looking for luxury living or affordable housing, Puri Developers ensures that families and investors get value for money. Their designs are practical and eco-friendly, making everyday living better. With a focus on customer satisfaction, Puri Developers is a reliable choice for your next residential project.",
  },
  "smartworld-developers": {
    about:
      "Smartworld is a reliable real estate developer known for creating affordable apartments, flats, and residential projects with smart designs and good planning. Their homes in Gurgaon and other cities offer world-class amenities, safe environments, and excellent connectivity to schools, hospitals, and offices. Families and working professionals trust Smartworld because their homes are built with care and delivered on time. They focus on using eco-friendly materials and offering modern facilities like parks and gyms. Whether you are searching for affordable housing, luxury apartments, or residential projects, Smartworld makes living comfortable, safe, and happy for everyone.",
  },
  "whiteland": {
    about:
      "Whiteland is a trusted real estate developer known for creating affordable apartments, flats, and residential projects that offer comfort and convenience. Their homes in Gurgaon and other cities are designed with practical layouts, safe surroundings, and world-class amenities like parks and gyms. Whiteland makes sure homes are built with good materials and delivered on time. Families and investors looking for affordable housing, luxury apartments, or residential projects trust Whiteland because they focus on customer satisfaction, eco-friendly designs, and excellent connectivity. Their homes are perfect for modern living, offering safety, style, and a healthy environment for everyone.",
  },
  "indiabulls-real-estate": {
    about:
      "Indiabulls is a popular real estate developer known for building luxury apartments, flats, and residential projects in cities like Gurgaon. Their homes offer modern designs, world-class amenities, and safe environments with excellent connectivity. Indiabulls focuses on using high-quality materials and ensuring timely delivery so families and investors can move in without worry. Their projects are perfect for people looking for luxury living, affordable housing, or modern apartments with parks, gyms, and entertainment facilities. Indiabulls makes sure every home is comfortable, safe, and stylish, offering long-term value and a better lifestyle for families and working professionals.",
  },
  "aipl": {
    about:
      "AIPL (Asset Infra Projects Ltd) is a trusted real estate company that builds modern apartments, flats, and residential projects with smart designs and good materials. Their homes in Gurgaon and other cities offer world-class amenities, safe surroundings, and excellent connectivity to schools and markets. AIPL focuses on making homes that are stylish, practical, and comfortable for families and investors. They ensure timely delivery, customer satisfaction, and eco-friendly solutions. Whether you are searching for affordable housing, luxury apartments, or residential projects, AIPL offers homes that give comfort, safety, and a better lifestyle in well-connected areas.",
  },
  "trevoc-group": {
    about:
      "Trevoc is a trusted real estate developer known for building modern apartments, flats, and residential projects with smart designs and practical layouts. Their homes in Gurgaon and other cities are built with good materials, safe surroundings, and world-class amenities like parks and gyms. Trevoc focuses on customer satisfaction, timely delivery, and using eco-friendly solutions. Families and investors looking for affordable housing, luxury apartments, or residential projects trust Trevoc because they offer stylish, safe, and comfortable living spaces. Their homes provide excellent connectivity and facilities that make everyday life easier and better for families and working professionals.",
  },
  "aarize-developers": {
    about:
      "Aarize Developers is a trusted real estate company that builds affordable apartments, flats, and residential projects with good designs and layouts. Their homes in Gurgaon and other cities offer world-class amenities, safe environments, and excellent connectivity to schools, offices, and markets. Aarize focuses on making homes that are stylish, comfortable, and eco-friendly. They ensure timely delivery, use good construction materials, and give priority to customer satisfaction. Families and investors searching for affordable housing, luxury apartments, or residential projects trust Aarize Developers because they provide safe, convenient, and modern living spaces that make everyday life better.",
  },
};

// Canonical display names for builder brands (for titles/meta)
const DISPLAY_NAMES = {
  'adani-realty': 'Adani Realty',
  'm3m-india': 'M3M India',
  'emaar-india': 'Emaar India',
  'experion-developers': 'Experion Developers',
  'signature-global': 'Signature Global',
  'dlf-homes': 'DLF Homes',
  'whiteland': 'Whiteland',
  'aipl': 'AIPL',
  'elan-group': 'Elan Group',
  'bptp-limited': 'BPTP Limited',
  'trevoc-group': 'Trevoc Group',
  'indiabulls-real-estate': 'Indiabulls Real Estate',
  'smartworld-developers': 'Smartworld Developers',
  'central-park': 'Central Park',
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
  const displayName = DISPLAY_NAMES[builderName] || formattedBuilderName;
  const heroTitleText = `${displayName} Projects in Gurugram`;
  
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
  // Local search term from Hero
  const [searchTerm, setSearchTerm] = useState('');
  const handleHeroSearch = useCallback((q) => {
    setSearchTerm(q || '');
  }, []);

  // Apply client-side filter by project name, city, or address (must be before any conditional returns)
  const visibleProjects = useMemo(() => {
    const list = orderedProjects || [];
    const q = (searchTerm || '').trim().toLowerCase();
    if (!q) return list;
    return list.filter(p => {
      const name = String(p?.projectName || '').toLowerCase();
      const city = String(p?.city || '').toLowerCase();
      const addr = String(p?.projectAddress || '').toLowerCase();
      return name.includes(q) || city.includes(q) || addr.includes(q);
    });
  }, [orderedProjects, searchTerm]);

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
        <title>{heroTitleText} | 100acress</title>
        <meta name="description" content={`${displayName} projects in Gurugram. Explore premium residential and commercial projects with pricing, photos, and details.`} />
        <link rel="canonical" href={`https://www.100acress.com/developers/${builderName.toLowerCase()}/`} />
      </Helmet>

      {/* Hero */}
      <Hero title={heroTitleText} onExplore={() => {}} onContact={() => {}} onSearch={handleHeroSearch} />
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
                    {visibleProjects?.map((item, index) => (
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
                {visibleProjects?.map((item, index) => (
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
