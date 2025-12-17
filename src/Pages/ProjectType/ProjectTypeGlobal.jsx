import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Api_Service from "../../Redux/utils/Api_Service";
import GlobalFilterTemplate from "../../Components/GlobalFilterTemplate/GlobalFilterTemplate";
import { projectTypeConfigs } from "../../Components/GlobalFilterTemplate/config/pageConfigs";

const ProjectTypeGlobal = () => {
  const { type } = useParams();
  const { getAllProjects } = Api_Service();
  const location = useLocation();
  
  // Map current path to project type
  const getProjectTypeFromPath = () => {
    const path = location.pathname;
    
    // Handle new unified projects/{filter} patterns
    if (path === '/projects/sco-plots/') return 'sco-plots';
    if (path === '/projects/villas/') return 'luxury-villas';
    if (path === '/projects/plots/') return 'plots-in-gurugram';
    if (path === '/projects/residential/') return 'residential-projects';
    if (path === '/projects/independent-floors/') return 'independent-floors';
    if (path === '/projects/commercial/') return 'commercial-projects';
    if (path === '/projects/farmhouse/') return 'farmhouse';
    if (path === '/projects/industrial-plots/') return 'industrial-plots';
    if (path === '/projects/industrial-projects/') return 'industrial-projects';
    
    // Keep old patterns for backward compatibility
    if (path === '/sco/plots/') return 'sco-plots';
    if (path === '/projects/villas/') return 'luxury-villas';
    if (path === '/plots-in-gurugram/') return 'plots-in-gurugram';
    if (path === '/property/residential/') return 'residential-projects';
    if (path === '/projects/independent-floors/') return 'independent-floors';
    if (path === '/projects/commercial/') return 'commercial-projects';
    if (path === '/projects/farmhouses/') return 'farmhouse';
    if (path === '/projects/industrial-plots/') return 'industrial-plots';
    if (path === '/projects/industrial-projects/') return 'industrial-projects';
    
    // Fallback to type parameter for /project-type/:type routes
    return type;
  };
  
  const projectType = getProjectTypeFromPath();
  
  // Get configuration for current project type
  const config = projectTypeConfigs[projectType];
  
  // If invalid type, show 404 or redirect
  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Type Not Found</h1>
          <p className="text-gray-600">The requested project type "{projectType}" does not exist.</p>
        </div>
      </div>
    );
  }

  // Get projects from Redux store
  const projects = useSelector(store => store?.allsectiondata?.[config.reduxKey]);
  
  // Debug logging
  console.log('ProjectTypeGlobal - projectType:', projectType);
  console.log('ProjectTypeGlobal - config.reduxKey:', config.reduxKey);
  console.log('ProjectTypeGlobal - config.query:', config.query);
  console.log('ProjectTypeGlobal - projects from Redux:', projects?.length || 0);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const apiCallTimeoutRef = useRef(null);
  
  // Force component re-render when URL changes by updating key
  const [componentKey, setComponentKey] = useState(0);
  
  useEffect(() => {
    // Force component re-render when URL changes
    setComponentKey(prev => prev + 1);
  }, [location.pathname]);

  // Load projects on component mount with debouncing
  useEffect(() => {
    console.log('ProjectTypeGlobal - location changed:', location.pathname);
    console.log('ProjectTypeGlobal - current project type:', projectType);
    
    // Clear any existing timeout
    if (apiCallTimeoutRef.current) {
      clearTimeout(apiCallTimeoutRef.current);
    }

    // Check if we already have projects in Redux store
    if (projects && projects.length > 0) {
      console.log('Projects already loaded from Redux store:', projects.length);
      setIsLoading(false);
      return;
    }

    console.log('Fetching projects with query:', config.query);
    console.log('API call details:', { query: config.query, reduxKey: config.reduxKey });
    setIsLoading(true);
    
    // Debounce the API call
    apiCallTimeoutRef.current = setTimeout(() => {
      getAllProjects(config.query, 0)
        .then((response) => {
          console.log('API response for project type:', response);
          setApiError(null);
        })
        .catch((error) => {
          console.error('API Error for project type:', error);
          setApiError(error.message || 'Failed to load projects');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 500); // 500ms debounce

    // Cleanup timeout on unmount
    return () => {
      if (apiCallTimeoutRef.current) {
        clearTimeout(apiCallTimeoutRef.current);
      }
    };
  }, [config.query, getAllProjects, projects, location.pathname, componentKey]);

  // Handle loading state when projects are loaded
  useEffect(() => {
    if (projects && projects.length > 0) {
      setIsLoading(false);
    }
  }, [projects]);

  // Page configuration for the global template
  const pageConfig = {
    title: config.title,
    description: config.description,
    itemsPerPage: 18,
    badgeColor: config.badgeColor,
    badgeText: config.badgeText,
    typeFilter: config.typeFilter
  };

  // Generate structured data
  const generateStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": config.title,
      "description": config.description,
      "url": config.canonical,
      "numberOfItems": projects?.length || 0,
      "itemListElement": (projects || []).slice(0, 10).map((project, index) => ({
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
        key={`${location.pathname}-${componentKey}`} // Force re-render when route changes
        pageType="type"
        projects={projects || []}
        isLoading={isLoading}
        pageConfig={pageConfig}
      />
    </>
  );
};

export default ProjectTypeGlobal;
