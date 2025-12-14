import React, { useContext, useState, useEffect, useRef, useCallback } from "react";
import { DataContext } from "../../MyContext";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Api_Service from "../../Redux/utils/Api_Service";
import GlobalFilterTemplate from "../../Components/GlobalFilterTemplate/GlobalFilterTemplate";
import { statusConfigs } from "../../Components/GlobalFilterTemplate/config/pageConfigs";

const ProjectStatusSearchGlobal = () => {
  const { allProjectData } = useContext(DataContext);
  const location = useLocation();
  
  // Request throttling
  const requestThrottle = useRef(new Map());
  const isRequestInProgress = useRef(false);
  const lastRequestTime = useRef(0);
  
  // Force component re-render when URL changes by updating key
  const [componentKey, setComponentKey] = useState(0);
  
  useEffect(() => {
    // Force component re-render when URL changes
    setComponentKey(prev => prev + 1);
  }, [location.pathname]);
  
  // Get project status from URL or props
  const getProjectStatus = () => {
    const path = location.pathname;
    console.log('Current path:', path);
    
    // Check for new unified status URLs: projects/{status}
    if (path.includes('/projects/') && !path.includes('/projects-in-')) {
      const filter = path.split('/projects/')[1]?.replace('/', '');
      console.log('Detected unified projects filter:', filter);
      
      const statusMap = {
        'upcoming': 'upcoming',
        'newlaunch': 'newlaunch',
        'underconstruction': 'underconstruction',
        'ready-to-move': 'readytomove'
      };
      
      if (statusMap[filter]) {
        console.log('Detected status from unified URL:', statusMap[filter]);
        return statusMap[filter];
      }
    }
    
`    return 'upcoming'; // default fallback`
  };

  const projectStatus = getProjectStatus();
  console.log('Detected project status:', projectStatus);
  
  // Project status configurations with enhanced SEO
  const statusConfig = {
    upcoming: {
      title: "UpComing Projects in Gurgaon",
      description: "Explore best upcoming projects in Gurgaon with modern amenities. Find residential & commercial spaces customized to your lifestyle. Visit 100acress today!",
      metaTitle: "Discover Upcoming Projects in Gurgaon - 100acress",
      canonical: "https://www.100acress.com/projects/upcoming/",
      query: "allupcomingproject",
      keywords: "upcoming projects gurgaon, new residential projects gurgaon, commercial projects gurgaon, gurgaon real estate, property investment gurgaon",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "name": "100acress",
        "description": "Leading real estate platform for upcoming projects in Gurgaon",
        "url": "https://www.100acress.com",
        "areaServed": "Gurgaon, Haryana, India"
      }
    },
    underconstruction: {
      title: "Under Construction Projects in Gurgaon",
      description: "Under Construction Properties in Gurgaon include commercial and residential projects that will meet various requirements. These developments are equipped with modern amenities, great places close to business areas, as well as extensive green spaces. They're designed to meet the ever-changing demands of urban dwellers who want peace, convenience, and a vibrant lifestyle.",
      metaTitle: "Property in UnderConstruction - Flats, Villas, House in gurugram.",
      canonical: "https://www.100acress.com/projects/underconstruction/",
      query: "underconstruction",
      keywords: "under construction projects gurgaon, ongoing projects gurgaon, construction status gurgaon, gurgaon property development",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "name": "100acress",
        "description": "Comprehensive guide to under construction projects in Gurgaon",
        "url": "https://www.100acress.com",
        "areaServed": "Gurgaon, Haryana, India"
      }
    },
    readytomove: {
      title: "Ready To Move Projects",
      description: "Explore ready to move properties in Gurgaon with modern amenities. Find residential & commercial spaces ready for immediate possession.",
      metaTitle: "Ready To Move Properties in Gurgaon - 100acress",
      canonical: "https://www.100acress.com/projects/ready-to-move/",
      query: "readytomove",
      keywords: "ready to move properties gurgaon, immediate possession gurgaon, completed projects gurgaon, gurgaon ready homes",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "name": "100acress",
        "description": "Ready to move properties in Gurgaon with immediate possession",
        "url": "https://www.100acress.com",
        "areaServed": "Gurgaon, Haryana, India"
      }
    },
    newlaunch: {
      title: "Projects in New Launch",
      description: "Explore new launch projects in Gurgaon with modern amenities. Find the latest residential & commercial spaces.",
      metaTitle: "New Launch Projects in Gurgaon - 100acress",
      canonical: "https://www.100acress.com/projects/newlaunch/",
      query: "newlaunch",
      keywords: "new launch projects gurgaon, latest projects gurgaon, new residential projects gurgaon, gurgaon property launches",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "name": "100acress",
        "description": "Latest new launch projects in Gurgaon",
        "url": "https://www.100acress.com",
        "areaServed": "Gurgaon, Haryana, India"
      }
    }
  };

  const currentConfig = statusConfig[projectStatus];
  const { getAllProjects } = Api_Service();
  
  // Debounce timer ref
  const debounceTimer = useRef(null);
  
  // Throttled API call function
  const throttledGetAllProjects = useCallback(async (query, limit) => {
    const now = Date.now();
    const throttleKey = `${query}-${limit}`;
    const lastCall = requestThrottle.current.get(throttleKey) || 0;
    
    // Throttle requests - minimum 3 seconds between calls for same query
    if (now - lastCall < 3000) {
      console.log(`Request throttled for ${query}, skipping...`);
      return;
    }
    
    // Prevent concurrent requests
    if (isRequestInProgress.current) {
      console.log('Request already in progress, skipping...');
      return;
    }
    
    // Clear existing debounce timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    
    // Debounce the API call by 500ms
    debounceTimer.current = setTimeout(async () => {
      try {
        isRequestInProgress.current = true;
        lastRequestTime.current = now;
        requestThrottle.current.set(throttleKey, now);
        
        console.log(`Making API call for ${query} with limit ${limit}`);
        await getAllProjects(query, limit);
      } catch (error) {
        console.error(`Error in throttled API call for ${query}:`, error);
      } finally {
        isRequestInProgress.current = false;
      }
    }, 500);
  }, [getAllProjects]);
  
  // Redux selectors for different project types
  const upcomingProjects = useSelector(store => store?.allsectiondata?.allupcomingproject);
  const underConstructionProjects = useSelector(store => store?.allsectiondata?.underconstruction);
  const readyToMoveProjects = useSelector(store => store?.allsectiondata?.readytomove);
  const newLaunchProjects = useSelector(store => store?.allsectiondata?.newlaunch);

  // Get the appropriate project data based on status
  const getProjectData = () => {
    console.log('Getting project data for status:', projectStatus);
    console.log('Available data:', {
      upcoming: upcomingProjects?.length || 0,
      underconstruction: underConstructionProjects?.length || 0,
      readytomove: readyToMoveProjects?.length || 0,
      newlaunch: newLaunchProjects?.length || 0
    });
    
    switch (projectStatus) {
      case 'upcoming':
        console.log('Returning upcoming projects:', upcomingProjects?.length || 0);
        return upcomingProjects;
      case 'underconstruction':
        console.log('Returning underconstruction projects:', underConstructionProjects?.length || 0);
        return underConstructionProjects;
      case 'readytomove':
        console.log('Returning readytomove projects:', readyToMoveProjects?.length || 0);
        return readyToMoveProjects;
      case 'newlaunch':
        console.log('Returning newlaunch projects:', newLaunchProjects?.length || 0);
        return newLaunchProjects;
      default:
        console.log('No matching status, returning empty array');
        return [];
    }
  };

  const projectData = getProjectData();
  
  // Memoize project data to prevent unnecessary re-renders
  const memoizedProjectData = React.useMemo(() => {
    return projectData;
  }, [projectData]);

  useEffect(() => {
    console.log('ProjectStatusSearchGlobal - location changed:', location.pathname);
    console.log('Loading projects for status:', projectStatus, 'with query:', currentConfig.query);
    throttledGetAllProjects(currentConfig.query, 0);
  }, [projectStatus, currentConfig.query, throttledGetAllProjects, location.pathname, componentKey]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Clear throttle map and reset flags on unmount
      requestThrottle.current.clear();
      isRequestInProgress.current = false;
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  // Generate dynamic structured data for projects
  const generateProjectStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": currentConfig.title,
      "description": currentConfig.description,
      "url": currentConfig.canonical,
      "numberOfItems": memoizedProjectData?.length || 0,
      "itemListElement": (memoizedProjectData || []).slice(0, 10).map((project, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "RealEstateListing",
          "name": project.projectName,
          "description": project.projectAddress,
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

  // Page configuration for the global template
  const pageConfig = {
    title: currentConfig.title,
    description: currentConfig.description,
    itemsPerPage: 40,
    badgeColor: statusConfigs[projectStatus]?.badgeColor || 'bg-blue-500',
    badgeText: statusConfigs[projectStatus]?.badgeText || 'Featured',
    typeFilter: (project) => true // Show all projects for status pages
  };

  return (
    <>
      <GlobalFilterTemplate
        key={`${location.pathname}-${componentKey}`} // Force re-render when route changes
        pageType="status"
        projects={memoizedProjectData || []}
        isLoading={false}
      />
    </>
  );
};

export default ProjectStatusSearchGlobal;
