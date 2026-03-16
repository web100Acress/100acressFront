import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Api_service from "../../Redux/utils/Api_Service";
import GlobalFilterTemplate from "../../Components/GlobalFilterTemplate/GlobalFilterTemplate";
import { cityConfigs } from "../../ProjectTypes//config/pageConfigs";
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
  alwar: "Alwar",
  jalandhar: "Jalandhar",
  karnal: "Karnal",
  goa: "Goa",
  pushkar: "Pushkar",
  dubai: "Dubai",
  pune: "Pune"
};

const CityProjectsGlobal = () => {
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
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreProjects, setHasMoreProjects] = useState(true);
  
  function handleDatafromSearch(data){
    setFilteredData(data);
  }

  useEffect(() => {
    // Always reload with limit to ensure we don't use unlimited cached data
    setIsLoading(true);
    setCurrentPage(1);
    setHasMoreProjects(true);
    // Load initial batch with reasonable limit for fast loading
    const initialLimit = 25; // Universal limit for all cities to ensure fast load
    console.log(`🚀 City Performance fix: Loading ${city} projects with initial limit ${initialLimit} (forcing reload)`);
    
    // Add timeout for very slow responses
    const timeout = setTimeout(() => {
      console.log(`⚠️ Timeout: ${city} projects taking too long to load, showing minimal data`);
      setIsLoading(false);
      setHasMoreProjects(true); // Allow user to try loading more
    }, 5000); // 5 second timeout for faster fallback
    
    getProjectbyState(city, initialLimit).finally(() => {
      clearTimeout(timeout);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityKey]);

  useEffect(() => {
    setDatafromsearch({ [cityKey]: cityData });
    console.log(`📊 City data update for ${city}:`, {
      cityKey,
      dataLength: cityData?.length || 0,
      hasData: cityData && cityData.length > 0,
      sampleData: cityData?.slice(0, 2).map(p => ({ name: p.projectName, id: p._id }))
    });
    if (cityData && cityData.length > 0) {
      setIsLoading(false);
      // Update hasMoreProjects based on data length
      const pageSize = 25;
      setHasMoreProjects(cityData.length === pageSize);
      console.log(`✅ ${city} data loaded successfully, hasMore: ${cityData.length === pageSize}`);
    }
  }, [cityKey, cityData]);

  // Load more projects function
  const loadMoreProjects = useCallback(async () => {
    if (loadingMore || !hasMoreProjects) return;
    
    setLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const pageSize = 25;
      const offset = nextPage * pageSize;
      
      console.log(`🔄 Loading more ${city} projects: page ${nextPage}, offset ${offset}`);
      
      // Call API with offset for next batch
      await getProjectbyState(city, offset);
      setCurrentPage(nextPage);
      
      // Update hasMore based on whether we got a full page
      // This will be updated in the next useEffect cycle
    } catch (error) {
      console.error('Error loading more projects:', error);
      setHasMoreProjects(false);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMoreProjects, city, currentPage, getProjectbyState]);

  // Scroll detection for lazy loading
  useEffect(() => {
    const handleScroll = () => {
      if (!hasMoreProjects || loadingMore) return;
      
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      
      // Load more when user is 500px from bottom
      if (scrollTop + clientHeight >= scrollHeight - 500) {
        loadMoreProjects();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMoreProjects, loadingMore, loadMoreProjects]);

  const pageTitle = `Best Real Estate Projects in ${displayCity} - 100acress`;
  const pageDesc = `Upgrade your lifestyle with best real estate projects in ${displayCity}. Browse modern apartments, villas, and investment-ready properties at 100acress.`;
  const projectsInCities = new Set(["gurugram", "sonipat", "karnal", "jalandhar", "pushkar", "dubai"]);
  const slug = inferredSlug.toLowerCase();
  const canonical = projectsInCities.has(slug)
    ? `https://www.100acress.com/projects-in-${slug}/`
    : `https://www.100acress.com/project-in-${slug}/`;

  const results = filtereddata.length === 0 ? (datafromsearch?.[cityKey] || []) : filtereddata;

  // Page configuration for the global template
  const pageConfig = {
    title: `Best Projects in ${displayCity}`,
    description: `Value, Location, and Comfort — Discover premium projects in prime ${displayCity} locations.`,
    itemsPerPage: 18,
    badgeColor: cityConfigs[cityKey]?.badgeColor || 'bg-blue-500',
    badgeText: cityConfigs[cityKey]?.badgeText || displayCity,
    typeFilter: (project) => true // Show all projects for city pages
  };

  // Generate structured data
  const generateStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": pageConfig.title,
      "description": pageConfig.description,
      "url": canonical,
      "numberOfItems": results?.length || 0,
      "itemListElement": (results || []).slice(0, 10).map((project, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "RealEstateListing",
          "name": project.projectName,
          "description": project.projectAddress || project.description,
          "url": `${window.location.origin}/${project.project_url}/`,
          "image": project.frontImage?.url || project.frontImage?.cdn_url,
          "offers": {
            "@type": "Offer",
            "price": project.minPrice ? `${project.minPrice}Cr` : "Contact for Price",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock"
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": project.city,
            "addressRegion": project.state,
            "addressCountry": "IN"
          }
        }
      }))
    };
  };

  return (
    <>
      <Navbar />
      <GlobalFilterTemplate
        pageType="city"
        projects={results || []}
        isLoading={isLoading}
        loadingMore={loadingMore}
        hasMoreProjects={hasMoreProjects}
        onLoadMore={loadMoreProjects}
        pageConfig={pageConfig}
      />
    </>
  );
};

export default CityProjectsGlobal;
