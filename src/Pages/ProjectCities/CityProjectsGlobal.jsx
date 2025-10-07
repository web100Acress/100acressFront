import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Api_service from "../../Redux/utils/Api_Service";
import GlobalFilterTemplate from "../../Components/GlobalFilterTemplate/GlobalFilterTemplate";
import { cityConfigs } from "../../Components/GlobalFilterTemplate/config/pageConfigs";

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
  
  function handleDatafromSearch(data){
    setFilteredData(data);
  }

  useEffect(() => {
    if (!Array.isArray(cityData) || cityData.length === 0) {
      setIsLoading(true);
      getProjectbyState(city, 0);
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityKey]);

  useEffect(() => {
    setDatafromsearch({ [cityKey]: cityData });
    if (cityData && cityData.length > 0) {
      setIsLoading(false);
    }
  }, [cityKey, cityData]);

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
      <GlobalFilterTemplate
        pageType="city"
        projects={results || []}
        isLoading={isLoading}
      />
    </>
  );
};

export default CityProjectsGlobal;
