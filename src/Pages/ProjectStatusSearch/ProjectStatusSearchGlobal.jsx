import React, { useContext, useState, useEffect, useRef, useCallback } from "react";
import { DataContext } from "../../MyContext";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Api_Service from "../../Redux/utils/Api_Service";
import GlobalFilterTemplate from "../../Components/GlobalFilterTemplate/GlobalFilterTemplate";
import { staticData } from "../../ProjectTypes/config/staticData.jsx";
import { statusConfigs } from "../../ProjectTypes/config/pageConfigs.js";
import { getBrandedResidencesDesiredOrder, getBrandedResidences } from "../../Utils/ProjectOrderData.js";

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

  // State for branded residences
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreProjects, setHasMoreProjects] = useState(true);
  const [brandedResidencesOrder, setBrandedResidencesOrder] = useState([]);
  const [brandedResidencesProjects, setBrandedResidencesProjects] = useState([]);

  // Get project status from URL or props
  const getProjectStatus = () => {
    const path = location.pathname;
    console.log('Current path:', path);

    // Check for branded-residences URL
    if (path.includes('/branded-residences')) {
      console.log('Detected branded residences URL');
      return 'brandedresidences';
    }

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

    return 'upcoming'; // default fallback
  };

  const projectStatus = getProjectStatus();
  console.log('Detected project status:', projectStatus);

  // Redux selectors for different project types
  const upcomingProjects = useSelector(store => store?.allsectiondata?.allupcomingproject);
  const underConstructionProjects = useSelector(store => store?.allsectiondata?.underconstruction);
  const readyToMoveProjects = useSelector(store => store?.allsectiondata?.readytomove);
  const newLaunchProjects = useSelector(store => store?.allsectiondata?.newlaunch);

  // Get the appropriate project data based on status
  const getProjectData = () => {
    console.log('Getting project data for status:', projectStatus);
    switch (projectStatus) {
      case 'upcoming': return upcomingProjects;
      case 'underconstruction': return underConstructionProjects;
      case 'readytomove': return readyToMoveProjects;
      case 'newlaunch': return newLaunchProjects;
      case 'brandedresidences': return brandedResidencesProjects.length > 0 ? brandedResidencesProjects : allProjectData;
      default: return [];
    }
  };

  const projectData = getProjectData();

  // Memoize project data to prevent unnecessary re-renders
  const memoizedProjectData = React.useMemo(() => {
    return projectData;
  }, [projectData]);

  // Project status configurations from staticData
  const statusConfig = {
    upcoming: {
      ...staticData.status.upcoming,
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
      ...staticData.status.underconstruction,
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
      ...staticData.status.readytomove,
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
      ...staticData.status.newlaunch,
      structuredData: {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "name": "100acress",
        "description": "Latest new launch projects in Gurgaon",
        "url": "https://www.100acress.com",
        "areaServed": "Gurgaon, Haryana, India"
      }
    },
    brandedresidences: {
      ...staticData.status.brandedresidences,
      structuredData: {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "name": "100acress",
        "description": "Branded residences represent a new chapter in modern luxury living. These homes are created when experienced real estate developers collaborate with globally recognized design and lifestyle partners. The result is a residence where architecture, interiors, and everyday comfort are thoughtfully planned together. From carefully selected materials to elegant layouts, every detail reflects a refined standard of living. Compared to conventional housing, branded homes are aimed at design consistency, high-quality construction, and well curated lifestyle experience. Premium services, caring services and serene living conditions are usually taken by residents to enable them to live in comfort and privacy. These residences are being developed in Gurugram and Noida, cities known for their modern skyline and growing demand for premium residential living.",
        "url": "https://www.100acress.com",
        "areaServed": "India"
      },
    }
  };

  const currentConfig = statusConfig[projectStatus];
  const { getAllProjects } = Api_Service();

  // Debounce timer ref
  const debounceTimer = useRef(null);

  // Load branded residences data
  useEffect(() => {
    if (projectStatus === 'brandedresidences') {
      setIsLoading(true);
      
      // Load order data
      getBrandedResidencesDesiredOrder().then(order => {
        console.log('🏠 ProjectStatusSearch: Branded residences order:', order);
        setBrandedResidencesOrder(order);
      });
      
      // Load actual project data
      getBrandedResidences().then(projects => {
        console.log('🏠 ProjectStatusSearch: Branded residences projects loaded:', projects);
        setBrandedResidencesProjects(projects);
        setIsLoading(false);
      }).catch(error => {
        console.error('🏠 ProjectStatusSearch: Error loading branded residences:', error);
        setIsLoading(false);
      });
    }
  }, [projectStatus]);

  // Log when project data changes
  useEffect(() => {
    console.log('🏠 ProjectStatusSearch: Project data changed:', {
      projectStatus,
      dataLength: projectData?.length,
      dataSample: projectData?.slice(0, 3).map(p => ({ name: p.projectName || p.title, city: p.city }))
    });
  }, [projectData, projectStatus]);

  // Throttled API call function
  const throttledGetAllProjects = useCallback(async (query, limit) => {
    const now = Date.now();
    const throttleKey = `${query}-${limit}`;
    const lastCall = requestThrottle.current.get(throttleKey) || 0;

    // Throttle requests - minimum 3 seconds between calls for same query
    if (now - lastCall < 3000) {
      console.log(`Request throttled for ${query}, skipping...`);
      // If we have data, stop loading
      if (memoizedProjectData && memoizedProjectData.length > 0) {
        setIsLoading(false);
      }
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

    // Set loading true when we plan to fetch
    setIsLoading(true);

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
        setIsLoading(false);
      }
    }, 500);
  }, [getAllProjects, memoizedProjectData]);

  useEffect(() => {
    console.log('ProjectStatusSearchGlobal - location changed:', location.pathname);
    console.log('Loading projects for status:', projectStatus, 'with query:', currentConfig?.query);

    // Set loading to true initially when status/query changes
    setIsLoading(true);
    setCurrentPage(1);
    setHasMoreProjects(true);
    if (currentConfig?.query) {
      // Load initial batch with reasonable limit for fast loading
      const initialLimit = (projectStatus === 'upcoming' || projectStatus === 'newlaunch' || projectStatus === 'underconstruction' || projectStatus === 'readytomove') ? 50 : 30; // Higher limit for popular pages
      console.log(`🚀 Performance fix: Loading ${projectStatus} projects with initial limit ${initialLimit}`);
      throttledGetAllProjects(currentConfig.query, initialLimit);
    }
  }, [projectStatus, currentConfig?.query, throttledGetAllProjects, location.pathname, componentKey]);

  // Update loading state when data is received
  useEffect(() => {
    if (memoizedProjectData && memoizedProjectData.length > 0) {
      setIsLoading(false);
      // Check if there might be more data
      const pageSize = (projectStatus === 'upcoming' || projectStatus === 'newlaunch' || projectStatus === 'underconstruction' || projectStatus === 'readytomove') ? 50 : 30;
      setHasMoreProjects(memoizedProjectData.length === pageSize);
    }
  }, [memoizedProjectData, projectStatus]);

  // Load more projects function
  const loadMoreProjects = useCallback(async () => {
    if (loadingMore || !hasMoreProjects || !currentConfig?.query) return;
    
    setLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const pageSize = (projectStatus === 'upcoming' || projectStatus === 'newlaunch' || projectStatus === 'underconstruction' || projectStatus === 'readytomove') ? 50 : 30;
      const offset = nextPage * pageSize;
      
      console.log(`🔄 Loading more ${projectStatus} projects: page ${nextPage}, offset ${offset}`);
      
      // Call API with offset for next batch
      await getAllProjects(currentConfig.query, offset);
      setCurrentPage(nextPage);
      
      // Update hasMore based on whether we got a full page
      // This will be updated in the next useEffect cycle
    } catch (error) {
      console.error('Error loading more projects:', error);
      setHasMoreProjects(false);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMoreProjects, currentConfig, currentPage, projectStatus, getAllProjects]);

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
    typeFilter: projectStatus === 'brandedresidences' ? (project) => {
      console.log('🔍 ProjectStatusSearch: Filtering branded residences project:', {
        name: project.projectName || project.title,
        city: project.city,
        hasBrandedProjects: brandedResidencesProjects.length > 0
      });
      
      // If we have branded residences projects from Project Order Management, show only those
      if (brandedResidencesProjects.length > 0) {
        const shouldShow = true; // Show all projects from the branded residences array
        console.log('🔍 ProjectStatusSearch: Branded residences mode - showing project:', shouldShow);
        return shouldShow;
      }
      
      // Fallback filtering for all projects
      const projectName = project.projectName || '';
      const description = project.project_discripation?.toLowerCase() || project.description?.toLowerCase() || '';
      const type = project.type?.toLowerCase() || '';
      const projectType = project.projectType?.toLowerCase() || '';
      
      // Keywords that indicate branded residences
      const brandedKeywords = [
        'branded', 'luxury', 'premium', 'exclusive', 'signature', 'ultra luxury',
        'ultra-luxury', 'high-end', 'bespoke', 'designer', 'collection', 'estate',
        'residence', 'tower', 'grand', 'imperial', 'royal', 'platinum', 'gold',
        'diamond', 'emerald', 'pearl', 'crystal', 'marble', 'penthouse'
      ];
      
      const hasKeyword = brandedKeywords.some(keyword => 
        projectName.toLowerCase().includes(keyword) || 
        description.includes(keyword) ||
        type.includes(keyword) ||
        projectType.includes(keyword)
      );
      
      console.log('🔍 ProjectStatusSearch: Keyword filtering result:', {
        projectName,
        hasKeyword,
        keywords: brandedKeywords.filter(k => 
          projectName.toLowerCase().includes(k) || 
          description.includes(k) ||
          type.includes(k) ||
          projectType.includes(k)
        )
      });
      
      return hasKeyword;
    } : (project) => true // Show all projects for other status pages
  };

  return (
    <>
      <GlobalFilterTemplate
        key={`${location.pathname}-${componentKey}`} // Force re-render when route changes
        pageType="status"
        projects={memoizedProjectData || []}
        isLoading={isLoading}
        loadingMore={loadingMore}
        hasMoreProjects={hasMoreProjects}
        onLoadMore={loadMoreProjects}
        pageConfig={currentConfig}
      />
    </>
  );
};

export default ProjectStatusSearchGlobal;
