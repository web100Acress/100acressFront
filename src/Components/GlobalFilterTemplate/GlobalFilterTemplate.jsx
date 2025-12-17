import React, { useContext, useEffect, useState, useCallback, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { allupcomingproject, newlaunch, underconstruction, readytomove } from "../../Redux/slice/AllSectionData.jsx";
import Api_Service from "../../Redux/utils/Api_Service.jsx";
import { getProjectOrderData } from "../../Utils/ProjectOrderData";
import Footer from "../Actual_Components/Footer";
import { DataContext } from "../../MyContext.jsx";
import { Helmet } from "react-helmet";

// Import modular components from ProjectStatusSearch
import Hero from "../../Pages/ProjectStatusSearch/Hero";
import FilterBar from "../../Pages/ProjectStatusSearch/FilterBar";
import ProjectCard from "../../Pages/ProjectStatusSearch/ProjectCard";
import CompareBar from "../../Pages/ProjectStatusSearch/CompareBar";
import FAQAccordion from "../../Pages/ProjectStatusSearch/FAQAccordion";
import { getPageDataFromURL } from './config/staticDataExample';

const GlobalFilterTemplate = ({
  // Page Configuration
  pageType, // 'city', 'budget', 'status', 'type'
  pageConfig,
  
  // Data
  projects = [],
  isLoading = false,
  
  // SEO Data (preserved exactly as provided)
  metaTitle,
  metaDescription,
  canonical,
  keywords,
  structuredData,
  
  // Additional Props
  children,
  ...additionalProps
}) => {
  const { allProjectData } = useContext(DataContext);
  const location = useLocation();
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [datafromsearch, setDatafromsearch] = useState({});
  
  // Modern UI state
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [savedProjects, setSavedProjects] = useState(new Set());
  const [compareProjects, setCompareProjects] = useState(new Set());
  const [sort, setSort] = useState('newest');
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [filters, setFilters] = useState({
    city: '',
    location: '',
    projectType: '',
    price: ''
  });
  
  
  // Displayed projects state (no pagination)
  const [displayedProjects, setDisplayedProjects] = useState([]);
  
  // Request throttling
  const requestThrottle = useRef(new Map());
  const isRequestInProgress = useRef(false);
  const lastRequestTime = useRef(0);
  
  // Project order state
  const [projectOrders, setProjectOrders] = useState(null);
  const [projectOrdersLoading, setProjectOrdersLoading] = useState(true);
  
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
    
    // For project type, city, and budget pages, return null
    if (pageType === 'type' || pageType === 'city' || pageType === 'budget') {
      return null;
    }
    
    return 'upcoming'; // default for status pages only
  };

  const projectStatus = getProjectStatus();
  console.log('Detected project status:', projectStatus);
  
  // Get page data from static data based on URL
  const searchParams = new URLSearchParams(location.search);
  const searchParamsObj = Object.fromEntries(searchParams.entries());
  
  
  
  const staticPageData = getPageDataFromURL(location.pathname, searchParamsObj);
  
  // Debug logging (can be removed in production)
  console.log('Current pathname:', location.pathname);
  console.log('Static page data:', staticPageData);
  console.log('Page config:', pageConfig);
  console.log('Budget page loaded successfully - no custom filtering needed');
  
  // Use pageConfig first, then static data, then fallback to default config
  const currentConfig = pageConfig || staticPageData || {
    title: "Discover Projects",
    description: "Premium projects crafted with quality, sustainability, and exceptional after‑sales service.",
    metaTitle: "Discover Projects - 100acress",
    canonical: "https://www.100acress.com/",
    query: "allupcomingproject",
    keywords: "real estate projects, property investment, luxury homes",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "name": "100acress",
      "description": "Leading real estate platform",
      "url": "https://www.100acress.com",
      "areaServed": "India"
    }
  };
  
  console.log('Final currentConfig:', currentConfig);

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
  const allSectionData = useSelector(store => store?.allsectiondata);
  const upcomingProjects = allSectionData?.allupcomingproject || [];
  const underConstructionProjects = allSectionData?.underconstruction || [];
  const readyToMoveProjects = allSectionData?.readytomove || [];
  const newLaunchProjects = allSectionData?.newlaunch || [];

  // Selector for project type pages - also responds to filter changes
  const [activeQuery, setActiveQuery] = useState(currentConfig.query || '');
  
  // Update activeQuery when currentConfig.query changes (e.g., when URL changes)
  useEffect(() => {
    if (currentConfig.query && currentConfig.query !== activeQuery) {
      console.log('Updating activeQuery from currentConfig:', currentConfig.query);
      setActiveQuery(currentConfig.query);
    }
  }, [currentConfig.query]);
  
  const typeProjects = useSelector(store => {
    // Use activeQuery which can be updated by filter changes
    if (activeQuery) {
      return store?.allsectiondata?.[activeQuery] || [];
    }
    if (currentConfig.query) {
      return store?.allsectiondata?.[currentConfig.query] || [];
    }
    return [];
  }, (left, right) => JSON.stringify(left) === JSON.stringify(right));

  // Get the appropriate project data based on status
  const getProjectData = () => {
    console.log('Getting project data for status:', projectStatus);
    console.log('Page type:', pageType);
    console.log('Available data:', {
      upcoming: upcomingProjects?.length || 0,
      underconstruction: underConstructionProjects?.length || 0,
      readytomove: readyToMoveProjects?.length || 0,
      newlaunch: newLaunchProjects?.length || 0
    });
    
    // For budget pages, always use the projects prop (pre-filtered by GlobalBudgetPrice)
    if (pageType === 'budget') {
      console.log('Budget page - using projects from props:', projects?.length || 0);
      return projects || [];
    }
    
    // If projects are passed as props, use them first
    if (projects && projects.length > 0) {
      console.log('Using projects from props:', projects.length);
      
      // Apply project type filtering if we have a typeFilter function
      if (pageType === 'type' && pageConfig?.typeFilter) {
        console.log('Applying project type filtering');
        console.log('Total projects before filtering:', projects.length);
        console.log('Sample project data:', projects.slice(0, 3).map(p => ({
          name: p.projectName,
          type: p.type,
          projectType: p.projectType,
          category: p.category,
          propertyType: p.propertyType
        })));
        const filteredProjects = projects.filter(pageConfig.typeFilter);
        console.log('Filtered projects by type:', filteredProjects.length);
        console.log('Sample filtered projects:', filteredProjects.slice(0, 3).map(p => p.projectName));
        return filteredProjects;
      }
      
      return projects;
    }
    
    // If activeQuery is set (from filter change), use typeProjects
    if (activeQuery && typeProjects && typeProjects.length > 0) {
      console.log('Using typeProjects from activeQuery:', activeQuery, 'count:', typeProjects.length);
      return typeProjects;
    }
    
    // If no project status (for type/city/budget pages), use typeProjects if available
    if (!projectStatus) {
      if (typeProjects && typeProjects.length > 0) {
        console.log('Using typeProjects for project type page:', typeProjects.length);
        return typeProjects;
      }
      console.log('No project status detected, returning empty array');
      return [];
    }
    
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

  // Use the original project data - filtering will be handled by handleSearch
  const filteredProjectData = memoizedProjectData;

  // Load project orders
  useEffect(() => {
    const loadProjectOrders = async () => {
      try {
        setProjectOrdersLoading(true);
        const orders = await getProjectOrderData();
        console.log('Project orders loaded in GlobalFilterTemplate:', orders);
        setProjectOrders(orders);
      } catch (error) {
        console.error('Error loading project orders:', error);
      } finally {
        setProjectOrdersLoading(false);
      }
    };
    
    loadProjectOrders();
    
    // Removed auto-refresh interval to prevent unnecessary API calls
    // Project orders will only be loaded once when component mounts
    // Users can manually refresh if needed
  }, []);

  function handleDatafromSearch(data) {
    setFilteredProjects(data);
  }


  // Modern UI utility functions
  const toggleSaveProject = (project) => {
    const projectId = project._id || project.id;
    setSavedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  const toggleCompareProject = (project) => {
    const projectId = project._id || project.id;
    setCompareProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  // Enhanced filter change handler that detects when data refetch is needed
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };

    // Check if this filter change requires different data fetching
    const requiresDataRefetch = shouldRefetchData(key, value, newFilters);

    setFilters(newFilters);

    if (requiresDataRefetch) {
      console.log(`Filter change requires data refetch for ${key}: ${value}`);
      // Update the query based on the new filter context
      updateQueryForFilters(newFilters);
    } else {
      // Auto-filter when filter changes (client-side filtering only)
      setTimeout(() => {
        handleSearch();
      }, 100);
    }
  };

  // Determine if a filter change requires data refetch
  const shouldRefetchData = (key, value, newFilters) => {
    // If we're on a status page and user changes project type, we need to refetch
    if (projectStatus && (key === 'projectType' && value !== filters.projectType)) {
      return true;
    }

    // If we're on a project type page and user changes status-like filters, we need to refetch
    if (pageType === 'type' && (key === 'projectType' && value !== filters.projectType)) {
      return true;
    }

    // If switching from one major filter context to another
    if (key === 'projectType' && value !== '' && filters.projectType === '') {
      return true; // First time selecting a project type
    }

    return false;
  };

  // Update query and refetch data based on new filter context
  const updateQueryForFilters = (newFilters) => {
    let newQuery = currentConfig.query;

    // If user selected a specific project type, use the corresponding query
    if (newFilters.projectType && newFilters.projectType !== '') {
      // Map project types to their corresponding queries
      const projectTypeToQuery = {
        'Farm Houses': 'farmhouse',
        'Commercial Property': 'commercial',
        'Residential Flats': 'residentiaProject',
        'SCO Plots': 'scoplots',
        'Villas': 'villas',
        'Independent Floors': 'builderindepedentfloor',
        'Residential Plots': 'plotsingurugram',
        'Industrial Projects': 'industrialprojects',
        'Industrial Plots': 'industrialplots'
      };

      if (projectTypeToQuery[newFilters.projectType]) {
        newQuery = projectTypeToQuery[newFilters.projectType];
      }
    } else if (projectStatus) {
      // Fall back to status-based queries
      const statusToQuery = {
        'upcoming': 'allupcomingproject',
        'underconstruction': 'underconstruction',
        'readytomove': 'readytomove',
        'newlaunch': 'newlaunch'
      };
      newQuery = statusToQuery[projectStatus] || 'allupcomingproject';
    }

    if (newQuery) {
      console.log(`Updating query from ${activeQuery} to ${newQuery}`);
      // Update the active query so the selector picks up the new data
      setActiveQuery(newQuery);
      // Trigger new data fetch with updated query
      throttledGetAllProjects(newQuery, 0);
    } else {
      // Fallback to client-side filtering
      setTimeout(() => {
        handleSearch();
      }, 100);
    }
  };

  const handleSearch = (searchQueryOrResetPagination = true) => {
    // Handle both search query string and resetPagination boolean
    let searchQuery = '';
    let resetPagination = true;
    
    if (typeof searchQueryOrResetPagination === 'string') {
      searchQuery = searchQueryOrResetPagination.trim();
      resetPagination = true; // Always reset pagination when searching
    } else if (typeof searchQueryOrResetPagination === 'boolean') {
      resetPagination = searchQueryOrResetPagination;
    }
    
    const dataToFilter = memoizedProjectData || [];
    console.log('handleSearch - dataToFilter length:', dataToFilter.length);
    console.log('handleSearch - current filters:', filters);
    console.log('handleSearch - search query:', searchQuery);
    
    let filtered = dataToFilter.filter((item) => {
      // Text search filter - searches across multiple fields
      const matchesSearchQuery = searchQuery === '' || (
        (item.projectName && item.projectName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.city && item.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.projectAddress && item.projectAddress.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.type && item.type.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.builder_name && item.builder_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.project_discripation && item.project_discripation.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      
      return matchesSearchQuery && (
        (filters.city === "" || (item.city && item.city.toLowerCase().includes(filters.city.toLowerCase()))) &&
        (filters.location === "" || (item.projectAddress && item.projectAddress.toLowerCase().includes(filters.location.toLowerCase()))) &&
        (filters.projectType === "" || (item.type && item.type.toLowerCase().includes(filters.projectType.toLowerCase()))) &&
        (filters.price === "" || (() => {
          if (filters.price === "") return true;
          const [min, max] = filters.price.split(",").map(v => v === "Infinity" ? Infinity : parseFloat(v));
          return item.minPrice >= min && item.maxPrice <= max;
        })())
      );
    });

    console.log('handleSearch - filtered length:', filtered.length);

    // Apply custom project order if available and no explicit sort is selected
    if (sort === 'newest' && projectOrders && !projectOrdersLoading) {
      // Determine which city to use based on filters or page type
      let orderCity = null;
      
      // Check if city filter is applied
      if (filters.city) {
        orderCity = filters.city;
        console.log('Using city from filters:', filters.city);
      } else if (pageType === 'city') {
        // Extract city from URL for city pages
        const path = location.pathname;
        console.log('Checking path for city:', path);
        if (path.includes('/projects-in-')) {
          const cityFromPath = path.split('/projects-in-')[1]?.replace('/', '');
          if (cityFromPath) {
            // Capitalize first letter to match projectOrders keys
            orderCity = cityFromPath.charAt(0).toUpperCase() + cityFromPath.slice(1);
            console.log('Extracted city from path:', cityFromPath, '-> normalized:', orderCity);
          }
        }
      }
      
      console.log('Final orderCity:', orderCity);
      console.log('Available project orders:', Object.keys(projectOrders || {}));
      console.log('Full projectOrders structure:', projectOrders);
      
      // Apply custom ordering if city is found
      if (orderCity && projectOrders && projectOrders[orderCity]) {
        const cityOrders = projectOrders[orderCity];
        console.log(`City orders for ${orderCity}:`, cityOrders);
        
        const desiredOrder = Array.isArray(cityOrders) 
          ? cityOrders.filter(item => item.isActive).map(item => item.name.toLowerCase())
          : [];
        
        console.log(`Applying custom order for city: ${orderCity}`, desiredOrder);
        console.log('Projects to sort:', filtered.slice(0, 3).map(p => p.projectName));
        
        if (desiredOrder.length > 0) {
          filtered = filtered.sort((a, b) => {
            const aName = (a.projectName || '').toLowerCase();
            const bName = (b.projectName || '').toLowerCase();
            
            const aIndex = desiredOrder.indexOf(aName);
            const bIndex = desiredOrder.indexOf(bName);
            
            console.log(`Comparing: "${aName}" (index: ${aIndex}) vs "${bName}" (index: ${bIndex})`);
            
            // If both projects are in the desired order, sort by that order
            if (aIndex !== -1 && bIndex !== -1) {
              return aIndex - bIndex;
            }
            
            // If only one project is in the desired order, prioritize it
            if (aIndex !== -1) return -1;
            if (bIndex !== -1) return 1;
            
            // If neither is in the desired order, maintain original order
            return 0;
          });
          
          console.log('Applied custom order, first 5 projects:', filtered.slice(0, 5).map(p => p.projectName));
        }
      } else {
        console.log('No custom order applied - city not found or no orders for city');
        console.log('orderCity:', orderCity);
        console.log('projectOrders[orderCity]:', projectOrders ? projectOrders[orderCity] : 'projectOrders is null');
      }
      
      // Apply status-based ordering for status pages
      let orderStatus = null;
      if (typeof window !== 'undefined') {
        const path = window.location.pathname;
        console.log('Checking path for status:', path);
        
        if (path.includes('/projects/upcoming')) {
          orderStatus = 'upcoming';
        } else if (path.includes('/projects/newlaunch')) {
          orderStatus = 'newlaunch';
        } else if (path.includes('/projects/comingsoon')) {
          orderStatus = 'comingsoon';
        } else if (path.includes('/projects/underconstruction')) {
          orderStatus = 'underconstruction';
        } else if (path.includes('/projects/readytomove')) {
          orderStatus = 'readytomove';
        }
      }
      
      console.log('Final orderStatus:', orderStatus);
      
      // Apply custom ordering if status is found
      if (orderStatus && projectOrders && projectOrders[orderStatus]) {
        const statusOrders = projectOrders[orderStatus];
        console.log(`Status orders for ${orderStatus}:`, statusOrders);
        
        const desiredOrder = Array.isArray(statusOrders) 
          ? statusOrders.filter(item => item.isActive).map(item => item.name.toLowerCase())
          : [];
        
        console.log(`Applying custom order for status: ${orderStatus}`, desiredOrder);
        
        if (desiredOrder.length > 0) {
          // First, separate projects into ordered and unordered
          const orderedProjects = [];
          const unorderedProjects = [];
          
          filtered.forEach(project => {
            const projectName = (project.projectName || '').toLowerCase();
            const orderIndex = desiredOrder.indexOf(projectName);
            
            if (orderIndex !== -1) {
              orderedProjects[orderIndex] = project;
            } else {
              unorderedProjects.push(project);
            }
          });
          
          // Combine: ordered projects first (in exact order), then unordered
          filtered = [...orderedProjects.filter(Boolean), ...unorderedProjects];
          
          console.log('Applied status custom order, first 5 projects:', filtered.slice(0, 5).map(p => p.projectName));
        }
      }
    } else if (sort === 'price') {
      filtered = filtered.sort((a, b) => (a.minPrice || 0) - (b.minPrice || 0));
    } else if (sort === 'newest') {
      filtered = filtered.sort((a, b) => new Date(b.createdAt || b.updatedAt || 0) - new Date(a.createdAt || a.updatedAt || 0));
    }

    setFilteredProjects(filtered);
    updateDisplayedProjects(filtered);
  };

  const handleExplore = (project) => {
    const pUrl = project.project_url;
    window.open(`/${pUrl}/`, '_blank');
  };

  const handleShare = (project) => {
    if (navigator.share) {
      navigator.share({
        title: project.projectName,
        text: `Check out this property: ${project.projectName}`,
        url: `${window.location.origin}/${project.project_url}/`
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(`${window.location.origin}/${project.project_url}/`);
    }
  };

  // Update displayed projects (now just shows all projects)
  const updateDisplayedProjects = (projectsToDisplay) => {
    console.log('updateDisplayedProjects - projectsToDisplay length:', projectsToDisplay.length);
    setDisplayedProjects(projectsToDisplay);
  };


  // Scroll detection for filter bar visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const navHeight = 64; // 16 * 4 = 64px (mt-16)
      const heroHeight = window.innerHeight * 0.3; // 30vh hero height
      setShowFilterBar(scrollTop > (heroHeight + navHeight));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (currentConfig.query) {
      console.log('Loading projects for query:', currentConfig.query);
      throttledGetAllProjects(currentConfig.query, 0);
    }
  }, [currentConfig.query, throttledGetAllProjects]);

  useEffect(() => {
    console.log('Project data updated:', projectData?.length, 'for status:', projectStatus, 'pageType:', pageType);
    setDatafromsearch({ [projectStatus]: projectData });
    // Clear filtered results when underlying data changes (from refetch)
    // But don't clear for budget pages as they handle their own filtering
    if (pageType !== 'budget') {
      setFilteredProjects([]);
    }
  }, [projectData, projectStatus, pageType]);

  // Force re-render when project status changes
  useEffect(() => {
    console.log('Project status changed to:', projectStatus);
    setFilteredProjects([]); // Clear any filtered results when status changes
  }, [projectStatus]);

  // Handle location changes
  useEffect(() => {
    console.log('Location changed to:', location.pathname);
    // Reset activeQuery to the current config's query when location changes
    setActiveQuery(currentConfig.query || '');
    // Reset filters when location changes
    setFilters({
      city: '',
      location: '',
      projectType: '',
      price: ''
    });
    // Don't clear for budget pages as they handle their own filtering
    if (pageType !== 'budget') {
      setFilteredProjects([]); // Clear filtered results when route changes
    }
  }, [location.pathname, pageType, currentConfig.query]);

  // Auto-filter when filters, sort, or project orders change (but not when data loads)
  useEffect(() => {
    if (memoizedProjectData && memoizedProjectData.length > 0 && !projectOrdersLoading) {
      // Only auto-filter if filters or sort have been set (not on initial data load)
      if (Object.keys(filters).some(key => filters[key] !== '') || sort) {
        handleSearch(false); // Don't reset pagination for auto-filter
      }
    }
  }, [filters, sort, projectOrders, projectOrdersLoading]);

  // Initialize displayed projects when data loads
  useEffect(() => {
    console.log('Initialize displayed projects effect - memoizedProjectData:', memoizedProjectData?.length, 'pageType:', pageType, 'isLoading:', isLoading);
    if (memoizedProjectData && memoizedProjectData.length > 0) {
      console.log('Setting displayed projects from memoizedProjectData:', memoizedProjectData.length);
      updateDisplayedProjects(memoizedProjectData);
      setFilteredProjects(memoizedProjectData);
    } else if (!isLoading) {
      // Only reset displayed projects when no data AND not loading
      // This prevents clearing during initial load
      console.log('Resetting displayed projects - no data and not loading');
      setDisplayedProjects([]);
      setFilteredProjects([]);
    }
  }, [memoizedProjectData, isLoading, pageType]);

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
    const projects = filteredProjects.length > 0 ? filteredProjects : memoizedProjectData || [];
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": currentConfig.title,
      "description": currentConfig.description,
      "url": currentConfig.canonical,
      "numberOfItems": projects.length,
      "itemListElement": projects.slice(0, 10).map((project, index) => ({
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

  return (
    <>
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{metaTitle || currentConfig.metaTitle}</title>
        <meta name="description" content={metaDescription || currentConfig.description} />
        <meta name="keywords" content={keywords || currentConfig.keywords} />
        <link rel="canonical" href={canonical || currentConfig.canonical} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={metaTitle || currentConfig.metaTitle} />
        <meta property="og:description" content={metaDescription || currentConfig.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical || currentConfig.canonical} />
        <meta property="og:image" content="https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/logo.webp" />
        <meta property="og:site_name" content="100acress" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle || currentConfig.metaTitle} />
        <meta name="twitter:description" content={metaDescription || currentConfig.description} />
        <meta name="twitter:image" content="https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/logo.webp" />
        <meta name="twitter:site" content="@100acressdotcom" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <meta name="author" content="100acress" />
        <meta name="publisher" content="100acress" />
        <meta name="copyright" content="100acress" />
        <meta name="language" content="en" />
        <meta name="geo.region" content="IN-HR" />
        <meta name="geo.placename" content="Gurgaon" />
        <meta name="geo.position" content="28.4595;77.0266" />
        <meta name="ICBM" content="28.4595, 77.0266" />
        
        {/* Mobile Optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#D32F2F" />
        <meta name="msapplication-TileColor" content="#D32F2F" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData || currentConfig.structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(generateProjectStructuredData())}
        </script>
        
        {/* FAQ Schema */}
        {projectStatus && (
          <script type="application/ld+json">
            {JSON.stringify(
              projectStatus === 'upcoming' ? {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [{
                  "@type": "Question",
                  "name": "What are the top upcoming projects in Gurgaon?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Some of the most sought-after upcoming projects in Gurgaon include Trident Realty 104, Satya Group 104, Central Park 104, AIPL Lake City, ArtTech The Story House, Max Estate 361, and Elan Sohna Road."
                  }
                },{
                  "@type": "Question",
                  "name": "Which locations in Gurgaon are best for upcoming residential projects?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Prime locations for upcoming projects include Dwarka Expressway, Southern Peripheral Road (SPR), Golf Course Extension Road, Sohna Road, and New Gurgaon, all offering strong connectivity and growth potential."
                  }
                },{
                  "@type": "Question",
                  "name": "Are there affordable options among Gurgaon's upcoming projects?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, projects like Satya Group 104, ArtTech The Story House, and Wal Pravah Senior Living provide budget-friendly housing options while maintaining modern amenities."
                  }
                },{
                  "@type": "Question",
                  "name": "What amenities do upcoming projects in Gurgaon usually offer?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Most new launches come with swimming pools, clubhouses, gyms, landscaped gardens, sports courts, children's play areas, 24x7 security, and parking facilities, ensuring a premium lifestyle."
                  }
                },{
                  "@type": "Question",
                  "name": "Which upcoming projects in Gurgaon offer luxury living?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Luxury options include Trident Realty 104, Central Park 104, Elan Sohna Road, and Oberoi Realty Gurgaon, featuring spacious layouts, high-end amenities, and premium architecture."
                  }
                },{
                  "@type": "Question",
                  "name": "What is the typical possession timeline for upcoming projects in Gurgaon?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Most projects aim for possession within 3–4 years of launch. Buyers should always check the RERA-approved completion date before investing."
                  }
                },{
                  "@type": "Question",
                  "name": "Why invest in upcoming projects in Gurgaon?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Investing in upcoming projects in Gurgaon offers pre-launch pricing, modern amenities, strong connectivity, and excellent long-term appreciation, making them ideal for both homebuyers and investors."
                  }
                }]
              } : projectStatus === 'newlaunch' ? {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [{
                  "@type": "Question",
                  "name": "What makes new launch projects in Gurgaon a good investment?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "They offer lower prices, modern features, and great value growth thanks to Gurgaon's rapid development and strong business presence."
                  }
                },{
                  "@type": "Question",
                  "name": "Which are the best areas to buy new launch projects in Gurgaon?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Top localities include Dwarka Expressway, Golf Course Extension Road, Sohna Road, and New Gurgaon, known for premium developments and excellent connectivity."
                  }
                },{
                  "@type": "Question",
                  "name": "How can I find RERA-approved new launch projects in Gurgaon?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You can visit trusted real estate platforms like 100acress.com to explore verified, RERA-registered new launch projects with complete details."
                  }
                },{
                  "@type": "Question",
                  "name": "What are the typical payment plans for new launch projects in Gurgaon?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Most developers offer construction-linked plans or flexible installment options, letting you pay in stages as the project progresses, making it easier to manage finances."
                  }
                },{
                  "@type": "Question",
                  "name": "Are new launch projects in Gurgaon suitable for end-users or investors?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Both! End-users get modern, comfortable homes, while investors benefit from high ROI and rental demand in Gurgaon's fast-developing areas."
                  }
                },{
                  "@type": "Question",
                  "name": "What amenities can I expect in Gurgaon's new launch projects?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Most projects offer clubhouses, swimming pools, gyms, landscaped gardens, and smart home features, ensuring a premium living experience."
                  }
                },{
                  "@type": "Question",
                  "name": "How do I choose the right new launch project in Gurgaon?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Check the builder's reputation, location, RERA status, amenities, and future development plans around the area before investing."
                  }
                }]
              } : projectStatus === 'underconstruction' ? {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [{
                  "@type": "Question",
                  "name": "Which are the top under-construction projects in Gurgaon?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Leading projects include DLF Privana South, Godrej Miraya, Elan The Presidential, M3M Mansion, Krisumi Waterfall, Signature Global Twin Tower, and Keystone Seasons."
                  }
                },{
                  "@type": "Question",
                  "name": "What are the top luxury under-construction properties?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Luxury projects feature smart layouts, wellness amenities, and include developments on Golf Course Road, Southern Peripheral Road, and Dwarka Expressway."
                  }
                },{
                  "@type": "Question",
                  "name": "Is it cheaper to buy an under-construction property in Gurgaon?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, early-phase properties are more economical with lower prices, flexible payment plans, and potential capital appreciation."
                  }
                },{
                  "@type": "Question",
                  "name": "What legal checks should I do before booking?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Verify RERA registration, clear land titles, approved plans, commencement certificate, and the developer's track record."
                  }
                },{
                  "@type": "Question",
                  "name": "Why is RERA registration important?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "RERA ensures legal transparency, protects buyer investments, and enforces builder commitments on delivery and amenities."
                  }
                },{
                  "@type": "Question",
                  "name": "How do under-construction projects offer high ROI?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Projects on key corridors like Dwarka Expressway and Golf Course Road have strong appreciation potential due to infrastructure growth."
                  }
                },{
                  "@type": "Question",
                  "name": "Can buyers customize units in under-construction projects?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, many luxury projects allow customization of layouts, interiors, and finishes during early development."
                  }
                }]
              } : projectStatus === 'readytomove' ? {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [{
                  "@type": "Question",
                  "name": "Which are the best ready-to-move projects in Gurugram?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Top projects include M3M St Andrews, Greenopolis, AMB Selfie Street, and Raheja Sampada offering premium amenities and immediate possession."
                  }
                },{
                  "@type": "Question",
                  "name": "Where can I find affordable ready-to-move flats in Gurugram?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Affordable options are available in sectors like Dwarka Expressway, New Gurgaon, and Sohna Road with good amenities and prices under ₹2 Cr."
                  }
                },{
                  "@type": "Question",
                  "name": "What benefits come with buying ready-to-move properties?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Immediate possession, no construction delays, GST savings on property price, and potential for instant rental income."
                  }
                },{
                  "@type": "Question",
                  "name": "Are ready-to-move commercial properties available in Gurugram?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, projects like AIPL Joy Street and Trehan IRIS Broadway provide ready shops and office spaces for business use."
                  }
                },{
                  "@type": "Question",
                  "name": "How do I verify the legal status of ready-to-move projects?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Check the project's RERA registration and possession certificate on official state RERA websites for secure purchases."
                  }
                },{
                  "@type": "Question",
                  "name": "Can I get home loans on ready-to-move properties?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, legally clear ready-to-move properties are eligible for home loans from banks and financial institutions."
                  }
                },{
                  "@type": "Question",
                  "name": "What amenities are commonly included in ready-to-move projects?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Swimming pools, gyms, parks, clubhouse, 24/7 security, and landscaped gardens are standard features in premium ready-to-move projects."
                  }
                }]
              } : {}
            )}
          </script>
        )}
        
        {/* Breadcrumb Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.100acress.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Projects",
                "item": "https://www.100acress.com/projects/"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": projectStatus === 'upcoming' ? 'Upcoming Projects' : 
                       projectStatus === 'newlaunch' ? 'New Launch Projects' : 
                       projectStatus === 'underconstruction' ? 'Under Construction Projects' : 
                       projectStatus === 'readytomove' ? 'Ready To Move Projects' : currentConfig.title,
                "item": canonical || currentConfig.canonical
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <Hero 
        title={currentConfig.title}
        subtitle={currentConfig.subtitle || currentConfig.description}
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        filters={filters}
        projectStatus={projectStatus}
        pageType={pageType}
      />

      {/* Section Separator */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 h-1"></div>

      {/* Filter Bar - Show only after scrolling past hero (Desktop only) */}
      <div className={`hidden lg:block fixed top-16 left-0 right-0 z-40 transition-all duration-500 ease-in-out ${
        showFilterBar 
          ? 'transform translate-y-0 opacity-100 scale-100 animate-in slide-in-from-top-4' 
          : 'transform -translate-y-full opacity-0 scale-95 pointer-events-none'
      }`}>
        <FilterBar 
          view={viewMode}
          setView={setViewMode}
          sort={sort}
          setSort={setSort}
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
        />
      </div>

      {/* Section Separator */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-50 h-1"></div>

      {/* Main Content Area */}
      <div className={`bg-gray-50 transition-all duration-500 ease-in-out ${showFilterBar ? 'lg:pt-32' : 'pt-0'}`}>

        {/* Main Content with Sidebar */}
        <div className="max-w-screen-xl mx-auto px-2 sm:px-4 md:px-6 py-4 sm:py-8 lg:pt-0">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
            
            {/* Sidebar - Enhanced SEO Content */}
            <div className="lg:w-1/3 xl:w-1/4 hidden">
              <div className="sticky top-32 max-h-[calc(100vh-8rem)] overflow-y-auto pb-6 pt-4">
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🏠</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      {currentConfig.title}
                    </h2>
                    <div className="w-12 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto rounded-full"></div>
                  </div>
                  
                  <div className="text-gray-700">
                    <p className="text-sm leading-relaxed mb-4 text-gray-600">
                      {currentConfig.description}
                    </p>
                    <p className="text-sm leading-relaxed mb-6 text-gray-600">
                      Browse through our curated collection of {projectStatus === 'upcoming' ? 'upcoming' : projectStatus === 'underconstruction' ? 'under construction' : projectStatus === 'readytomove' ? 'ready to move' : 'new launch'} properties in Gurgaon. 
                      Each project is carefully selected to meet modern living standards.
                    </p>
                    
                    {/* Enhanced Feature Cards */}
                    <div className="space-y-4 mb-6">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-sm">🏢</span>
                          </div>
                          <h3 className="font-bold text-gray-900 text-sm">Premium Amenities</h3>
                        </div>
                        <p className="text-xs text-gray-600">✅ Gym, ✅ Swimming Pool, ✅ Clubhouse, ✅ 24/7 Security</p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-sm">📍</span>
                          </div>
                          <h3 className="font-bold text-gray-900 text-sm">Strategic Location</h3>
                        </div>
                        <p className="text-xs text-gray-600">✅ Business Hubs, ✅ Schools, ✅ Hospitals, ✅ Entertainment Zones</p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-xl border border-orange-100 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-sm">💰</span>
                          </div>
                          <h3 className="font-bold text-gray-900 text-sm">Best Prices</h3>
                        </div>
                        <p className="text-xs text-gray-600">✅ Competitive Pricing, ✅ Flexible Payment Plans, ✅ Attractive Offers</p>
                      </div>
                    </div>

                    {/* Expert CTA Button */}
                    <div className="text-center">
                      <a
                        href={`https://wa.me/918500900100?text=${encodeURIComponent(`Hi, I'm interested in ${projectStatus} properties in Gurgaon. Can you help me find the best options?`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full hover:scale-105 transition-all duration-300 hover:-translate-y-1"
                      >
                        <img 
                          src="https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/icons/Untitled+design+(1).png" 
                          alt="Talk to an Expert" 
                          className="w-full h-auto rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        />
                      </a>
                      
                      <p className="text-xs text-gray-500 mt-2">
                        Get personalized recommendations from our real estate experts
                      </p>
                    </div>
                    
                    {/* Trust Indicators */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <span>🛡️</span>
                          <span>RERA Approved</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>⭐</span>
                          <span>4.8/5 Rating</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>🏆</span>
                          <span>Trusted</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content - Project Cards */}
            <div className="w-full">
              
              {/* Loading State */}
              {isLoading && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mb-4"></div>
                  <p className="text-gray-600">Loading properties...</p>
                </div>
              )}
              
              {/* No Projects State */}
              {!isLoading && displayedProjects.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="text-6xl mb-4">🏠</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Finding a Perfect Match for you</h3>
                  <p className="text-gray-600 text-center max-w-md">
                  Homes that get you - because perfect matches aren’t just for people.
                  </p>
                </div>
              )}
              
              {/* Project Cards Grid */}
              {!isLoading && displayedProjects.length > 0 && (
                <div className={`grid gap-3 sm:gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                    : 'grid-cols-1'
                }`}>
                  {displayedProjects.map((item, index) => {
                  const projectId = item._id || index;
                  const isSaved = savedProjects.has(projectId);
                  const isComparing = compareProjects.has(projectId);

                  return (
                    <ProjectCard
                      key={index}
                      project={item}
                      view={viewMode}
                      onExplore={handleExplore}
                      onFavorite={toggleSaveProject}
                      onShare={handleShare}
                      isFav={isSaved}
                      onCompareToggle={toggleCompareProject}
                      compared={isComparing}
                      projectStatus={projectStatus}
                    />
                  );
                })}
                </div>
              )}


              {/* Empty State */}
              {(!filteredProjects.length && !memoizedProjectData?.length) && (
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-4xl">🏠</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading...</h3>
                  <p className="text-gray-600 mb-6">Please wait while we load the properties.</p>
                  <button
                    onClick={() => {
                      setFilteredProjects([]);
                      setFilters({
                        city: '',
                        location: '',
                        projectType: '',
                        price: ''
                      });
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Section Separator */}
          <div className="mt-16 bg-gradient-to-r from-gray-50 to-gray-100 h-1"></div>
          {/* Knowledge Center - Only for Pune */}
      {currentConfig.hiddenContent && (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Discover <span className="text-red-600 text-4xl sm:text-5xl">{currentConfig.title?.split(' in ')?.[1] || 'PUNE'}</span>'s Real Estate
              </h2>
              <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {currentConfig.hiddenContent.description}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {currentConfig.hiddenContent.sections.map((section, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                    {section.title}
                  </h3>
                  <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
          {/* Know More About Upcoming Projects Section */}
          {projectStatus === 'upcoming' && (
            <div className="mt-12 sm:mt-16 bg-gradient-to-br from-blue-50 to-indigo-50 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8 sm:mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                    Know More About <span className="text-blue-600 text-4xl sm:text-5xl">Upcoming Projects</span>
                  </h2>
                  <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
                  <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                    <a href="https://www.100acress.com/projects/upcoming/" className="text-blue-600 hover:underline font-medium">Upcoming projects in Gurgaon</a>: Explore verified upcoming projects in Gurgaon featuring luxury apartments, modern residences, and affordable housing options across Dwarka Expressway and New Gurgaon. These upcoming residential projects in Gurgaon 2025 are designed with world-class amenities, excellent road and metro connectivity, and strong future appreciation potential. Filter projects by location, price, and property type to find your ideal home.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
                  <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-blue-600">
                      Why Is the Gurgaon Real Estate Market Booming?
                    </h3>
                    <div className="text-gray-600 leading-relaxed">
                      <p className="mb-4">
                        Over the last decade, Gurgaon has transformed into one of India's fastest-growing real estate destinations. With the presence of leading MNCs, IT hubs, and commercial corridors, the demand for quality housing has increased significantly. This rapid urban growth has led to a surge in upcoming projects in Gurgaon, offering buyers modern homes with better layouts and infrastructure.
                      </p>
                      <p>
                        Key developments such as the Dwarka Expressway, Delhi-Mumbai Expressway, Metro expansion, and upcoming business districts are reshaping the city. These factors make upcoming projects in Gurgaon 2025 highly attractive for professionals, families, and long-term investors.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-blue-600">
                      Why Invest in Upcoming Projects in Gurgaon?
                    </h3>
                    <div className="text-gray-600 leading-relaxed">
                      <p className="mb-4">
                        Investing in upcoming projects provides multiple advantages, especially in a high-growth market like Gurgaon:
                      </p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Wide Property Choices:</strong> Upcoming projects in Gurgaon offer a diverse range of housing options, including smartly designed 2 BHK homes and expansive 3 & 4 BHK luxury residences, ensuring choices for different budgets and lifestyle needs.</li>
                        <li><strong>Infrastructure Growth:</strong> Improved road networks, metro connectivity, and new commercial hubs are driving property appreciation.</li>
                        <li><strong>High Appreciation Potential:</strong> Early investment in upcoming projects in 2025 often results in better price appreciation by possession.</li>
                        <li><strong>Strong Rental Demand:</strong> Gurgaon's corporate ecosystem ensures consistent rental demand across major locations.</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-blue-600">
                      Top Locations for Upcoming Projects in Gurgaon
                    </h3>
                    <div className="text-gray-600 leading-relaxed">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Dwarka Expressway</h4>
                          <p className="text-sm">One of the most promising real estate corridors, Dwarka Expressway offers excellent connectivity to Delhi and IGI Airport. Many luxury upcoming projects in Gurgaon are launching here with premium amenities.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">New Gurgaon</h4>
                          <p className="text-sm">Known for planned infrastructure and peaceful surroundings, New Gurgaon is ideal for families seeking value-driven upcoming residential projects.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Golf Course Extension Road</h4>
                          <p className="text-sm">This location is preferred for premium living, offering upscale apartments, social infrastructure, and strong appreciation prospects.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Southern Peripheral Road (SPR)</h4>
                          <p className="text-sm">SPR connects key sectors of Gurgaon and hosts several upcoming projects in 2025 with a balance of lifestyle and investment benefits.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
                  <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-blue-600">
                      Amenities Offered in Upcoming Projects 2025
                    </h3>
                    <div className="text-gray-600 leading-relaxed">
                      <p className="mb-4">
                        Most upcoming projects in Gurgaon are designed to deliver a modern lifestyle, featuring:
                      </p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Clubhouse and swimming pool</li>
                        <li>Gymnasium and wellness zones</li>
                        <li>Landscaped gardens and jogging tracks</li>
                        <li>Children's play areas and sports facilities</li>
                        <li>24×7 security and smart access systems</li>
                      </ul>
                      <p className="mt-4">
                        These amenities enhance both living comfort and property value.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-blue-600">
                      Investment Tips for Upcoming Projects in Gurgaon
                    </h3>
                    <div className="text-gray-600 leading-relaxed">
                      <ul className="list-disc pl-5 space-y-3">
                        <li><strong>Check RERA Registration:</strong> Always verify that the upcoming project is RERA-approved for transparency and legal safety.</li>
                        <li><strong>Understand the Offering:</strong> Review carpet area, project density, and amenities rather than relying only on brochures.</li>
                        <li><strong>Site Visit Matters:</strong> Visiting the project location helps evaluate connectivity, surroundings, and future growth.</li>
                        <li><strong>Choose the Right Timing:</strong> Pre-launch and early-stage upcoming projects in 2025 usually offer better pricing, while near-possession projects suit buyers needing immediate occupancy.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 sm:p-8 text-white text-center">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                    Why Choose 100acress?
                  </h3>
                  <p className="text-lg mb-6 max-w-3xl mx-auto">
                    100acress is a trusted real estate platform showcasing verified and RERA-approved upcoming projects in Gurgaon. We work with reputed developers and provide accurate project details, expert guidance, and personalized support to help you make confident property decisions.
                  </p>
                  <a
                    href="https://www.100acress.com/projects/upcoming/"
                    className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
                  >
                    Explore Upcoming Projects
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Know More About New Launch Projects Section */}
          {projectStatus === 'newlaunch' && (
            <div className="mt-12 sm:mt-16 bg-gradient-to-br from-green-50 to-emerald-50 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8 sm:mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                    Discover <span className="text-green-600 text-4xl sm:text-5xl">New Launch Projects</span>
                  </h2>
                  <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
                  <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                    <a href="https://www.100acress.com/projects/newlaunch/" className="text-green-600 hover:underline font-medium">New launch projects in Gurgaon</a>: Discover the latest new launch projects in Gurgaon that combine smart planning, modern architecture, and excellent connectivity. These new launch residential projects are well-suited for buyers seeking contemporary homes and investors looking to benefit from early-stage pricing advantages. From premium apartments to value-driven housing options, new launch projects in Gurgaon 2025 offer choices for different budgets and lifestyle needs.
                  </p>
                  <p className="text-lg text-gray-600 max-w-4xl mx-auto mt-4">
                    With ongoing infrastructure upgrades, improved metro access, and a strong corporate ecosystem, Gurgaon continues to witness consistent demand for new residential developments. Investing in new launch projects allows buyers to enjoy flexible payment plans, wider unit selection, and promising long-term appreciation.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
                  <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-green-600">
                      Why Invest in New Launch Projects in Gurgaon?
                    </h3>
                    <div className="text-gray-600 leading-relaxed">
                      <p className="mb-4">
                        Gurgaon remains one of the most attractive real estate markets in NCR. Opting for new launch projects in Gurgaon comes with multiple benefits:
                      </p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Attractive Launch Pricing:</strong> Properties launched in 2025 are often available at lower prices compared to ready-to-move options.</li>
                        <li><strong>Contemporary Design:</strong> New developments feature efficient layouts, sustainable construction, and upgraded lifestyle features.</li>
                        <li><strong>Growth Potential:</strong> Early investments generally experience strong appreciation by the time of possession.</li>
                        <li><strong>Rental Demand:</strong> Proximity to IT parks, commercial hubs, and business districts ensures steady rental returns.</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-green-600">
                      Prime Locations for New Launch Projects in Gurgaon
                    </h3>
                    <div className="text-gray-600 leading-relaxed">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Dwarka Expressway</h4>
                          <p className="text-sm">A rapidly developing corridor, Dwarka Expressway offers excellent access to Delhi and IGI Airport and hosts several premium new launch residential projects.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">New Gurgaon</h4>
                          <p className="text-sm">With planned sectors and relatively low congestion, New Gurgaon is suitable for families looking for future-ready and budget-friendly new launch projects.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Golf Course Extension Road</h4>
                          <p className="text-sm">Known for upscale developments, this area offers luxury living, strong social infrastructure, and high appreciation potential.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Southern Peripheral Road (SPR)</h4>
                          <p className="text-sm">SPR connects key parts of the city and features multiple new launch projects in 2025 that balance lifestyle comfort with investment growth.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-green-600">
                      Lifestyle Amenities in New Launch Projects 2025
                    </h3>
                    <div className="text-gray-600 leading-relaxed">
                      <p className="mb-4">
                        Most new launch projects in Gurgaon are designed to enhance everyday living and typically include:
                      </p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Modern clubhouse and swimming pool</li>
                        <li>Fitness centers and wellness facilities</li>
                        <li>Landscaped green areas and walking tracks</li>
                        <li>Dedicated play zones and sports amenities</li>
                        <li>Round-the-clock security with smart systems</li>
                      </ul>
                      <p className="mt-4">
                        These features improve quality of life while also contributing to long-term property value.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
                  <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-green-600">
                      Key Factors to Consider Before Buying
                    </h3>
                    <div className="text-gray-600 leading-relaxed">
                      <ul className="list-disc pl-5 space-y-3">
                        <li><strong>RERA Registration:</strong> Confirm the project is registered under RERA to ensure legal safety.</li>
                        <li><strong>Builder Credibility:</strong> Check the developer's track record and past project deliveries.</li>
                        <li><strong>Connectivity & Location:</strong> Evaluate road access, public transport, and nearby infrastructure.</li>
                        <li><strong>Delivery Schedule:</strong> Review possession timelines mentioned in official approvals.</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-green-600">
                      Why Choose 100acress for New Launch Projects?
                    </h3>
                    <div className="text-gray-600 leading-relaxed">
                      <p className="mb-4">
                        100acress provides access to verified and RERA-approved new launch projects in Gurgaon, backed by trusted developers. With accurate information, professional insights, and personalized support, we simplify the property search process.
                      </p>
                      <p>
                        Whether you are purchasing your first home or investing in new launch projects 2025, our platform helps you make confident and informed decisions.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 sm:p-8 text-white text-center">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                    Explore New Launch Projects Today
                  </h3>
                  <p className="text-lg mb-6 max-w-3xl mx-auto">
                    Discover the best new launch projects in Gurgaon with competitive pricing, modern amenities, and excellent growth potential.
                  </p>
                  <a
                    href="https://www.100acress.com/projects/newlaunch/"
                    className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
                  >
                    View New Launch Projects
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Know More About Under Construction Projects Section */}
          {projectStatus === 'underconstruction' && (
            <div className="mt-12 sm:mt-16 bg-gradient-to-br from-orange-50 to-amber-50 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8 sm:mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                    Explore <span className="text-orange-600 text-4xl sm:text-5xl">Under Construction Projects</span>
                  </h2>
                  <div className="w-24 h-1 bg-orange-600 mx-auto mb-6"></div>
                  <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                    <a href="https://www.100acress.com/projects/underconstruction/" className="text-orange-600 hover:underline font-medium">Under construction projects in Gurgaon</a>: Explore the best under construction projects in Gurgaon designed for modern living and long-term investment. Under construction residential projects offer an ideal opportunity to purchase properties at early-stage prices while benefiting from future appreciation. These projects feature contemporary layouts, advanced amenities, and are located across well-connected sectors of Gurgaon.
                  </p>
                  <p className="text-lg text-gray-600 max-w-4xl mx-auto mt-4">
                    With strong infrastructure growth and expanding commercial hubs, under construction projects in Gurgaon 2025 continue to attract both end-users and investors. Buyers can choose from a wide range of apartments and residential developments that align with different budgets and lifestyle requirements.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
                  <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-orange-600">
                      Why Invest in Under Construction Projects in Gurgaon?
                    </h3>
                    <div className="text-gray-600 leading-relaxed">
                      <p className="mb-4">
                        Gurgaon remains one of the most promising real estate markets in NCR. Investing in under construction projects in Gurgaon offers several advantages:
                      </p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Lower Entry Cost:</strong> Under construction properties are generally priced lower than ready-to-move homes.</li>
                        <li><strong>Flexible Payment Plans:</strong> Construction-linked payment plans reduce financial pressure on buyers.</li>
                        <li><strong>High Appreciation Potential:</strong> Early-stage investments often see significant value growth by possession.</li>
                        <li><strong>Modern Construction Standards:</strong> New projects follow updated building norms, safety standards, and sustainable practices.</li>
                        <li><strong>Strong Rental Demand:</strong> Proximity to IT parks, business centers, and metro routes ensures future rental income.</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-orange-600">
                      Top Locations for Under Construction Projects in Gurgaon
                    </h3>
                    <div className="text-gray-600 leading-relaxed">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Dwarka Expressway</h4>
                          <p className="text-sm">Dwarka Expressway is a rapidly developing corridor offering excellent connectivity to Delhi and IGI Airport. Many premium under construction residential projects are located here with modern amenities and strong appreciation prospects.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">New Gurgaon</h4>
                          <p className="text-sm">New Gurgaon offers planned sectors, wider roads, and lower congestion, making it ideal for families and buyers seeking affordable under construction projects with future growth potential.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Golf Course Extension Road</h4>
                          <p className="text-sm">This area is known for luxury developments and high-end residential projects. Under construction projects here provide upscale living with easy access to schools, hospitals, and commercial hubs.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Southern Peripheral Road (SPR)</h4>
                          <p className="text-sm">SPR connects major residential and commercial zones of Gurgaon and features several under construction projects in 2025 that balance lifestyle convenience and investment returns.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-orange-600">
                      Amenities Offered in Under Construction Projects 2025
                    </h3>
                    <div className="text-gray-600 leading-relaxed">
                      <p className="mb-4">
                        Most under construction residential projects in Gurgaon are designed to deliver a premium living experience and typically include:
                      </p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Clubhouse and swimming pool</li>
                        <li>Fully equipped gym and wellness areas</li>
                        <li>Landscaped gardens and open green spaces</li>
                        <li>Children's play areas and sports facilities</li>
                        <li>24×7 security with CCTV surveillance</li>
                        <li>Power backup and ample parking</li>
                      </ul>
                      <p className="mt-4">
                        These features enhance comfort, safety, and long-term property value.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
                  <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-orange-600">
                      Things to Check Before Buying Under Construction Projects
                    </h3>
                    <div className="text-gray-600 leading-relaxed">
                      <ul className="list-disc pl-5 space-y-3">
                        <li><strong>RERA Registration:</strong> Always verify that the under construction project is registered under RERA for transparency and legal protection.</li>
                        <li><strong>Developer Reputation:</strong> Review the builder's past projects, delivery timelines, and construction quality.</li>
                        <li><strong>Location & Connectivity:</strong> Assess road access, metro connectivity, and nearby social infrastructure.</li>
                        <li><strong>Construction Progress:</strong> Monitor site development and adherence to the promised schedule.</li>
                        <li><strong>Possession Timeline:</strong> Check the RERA-approved completion date before finalizing your purchase.</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-orange-600">
                      Why Choose 100acress for Under Construction Projects?
                    </h3>
                    <div className="text-gray-600 leading-relaxed">
                      <p className="mb-4">
                        100acress is a trusted real estate platform offering verified and RERA-approved under construction projects in Gurgaon. We collaborate with reputed developers and provide accurate project information, expert insights, and personalized assistance.
                      </p>
                      <p>
                        Whether you are buying your first home or investing in under construction projects 2025, our platform helps you make confident and informed property decisions.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl p-6 sm:p-8 text-white text-center">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                    Discover Under Construction Projects Today
                  </h3>
                  <p className="text-lg mb-6 max-w-3xl mx-auto">
                    Find the best under construction projects in Gurgaon with competitive pricing, modern amenities, and excellent investment potential.
                  </p>
                  <a
                    href="https://www.100acress.com/projects/underconstruction/"
                    className="inline-block bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
                  >
                    View Under Construction Projects
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Know More About Ready to Move Projects Section */}
          {projectStatus === 'readytomove' && (
            <div className="mt-12 sm:mt-16 bg-gradient-to-br from-purple-50 to-pink-50 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8 sm:mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                    Discover <span className="text-purple-600 text-4xl sm:text-5xl">Ready to Move Projects</span>
                  </h2>
                  <div className="w-24 h-1 bg-purple-600 mx-auto mb-6"></div>
                  <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                    <a href="https://www.100acress.com/projects/ready-to-move/" className="text-purple-600 hover:underline font-medium">Ready to move projects in Gurgaon</a>: Introduce Ready to Move Projects in Gurgaon - Gurgaon is growing very fast and has become one of the top real estate cities in India. It is no longer just a corporate hub; today, many people want to live here because of good jobs, modern lifestyle, and strong infrastructure. Due to this growth, ready to move projects in Gurgaon are in very high demand.
                  </p>
                  <p className="text-lg text-gray-600 max-w-4xl mx-auto mt-4">
                    Whether you want to buy a home for your family or invest your money safely, ready to move properties are a smart choice. These homes are already completed, so there is no waiting time. In this page, we will explain why ready to move projects in Gurugram are popular and how you can choose the best one.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
                  <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-purple-600">
                      Why Is the Demand Increasing for Ready to Move Projects in Gurgaon?
                    </h3>
                    <div className="text-gray-600 leading-relaxed">
                      <p className="mb-4">
                        Many people ask, "Why should we buy a ready to move home?" The answer is simple—comfort, safety, and instant possession.
                      </p>
                      <p className="mb-4">
                        Gurgaon has many IT companies, MNCs, and business parks in areas like Cyber City, Golf Course Road, and Dwarka Expressway. Professionals working here want homes where they can shift immediately. Ready to move flats in Gurgaon solve this problem.
                      </p>
                      <p>
                        These projects already have: Completed buildings, Proper security, Parks, gyms, and clubhouse, Roads, water, and electricity. Also, metro connectivity and wide roads make daily travel easy. Because of all these reasons, ready to move projects in Gurgaon are becoming the first choice for buyers.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-purple-600">
                      Why Invest in Ready to Move Projects in Gurugram?
                    </h3>
                    <div className="text-gray-600 leading-relaxed">
                      <p className="mb-4">
                        If you are thinking about investment, ready to move properties are a safe option. Here's why:
                      </p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Immediate Rental Income:</strong> You don't have to wait for construction. You can rent the flat immediately and earn monthly income.</li>
                        <li><strong>No Construction Risk:</strong> There is no delay or uncertainty. What you see is what you buy.</li>
                        <li><strong>Price Growth:</strong> Property prices in Gurgaon are increasing, especially near Dwarka Expressway and Golf Course Road. Buying now can give good returns later.</li>
                        <li><strong>No GST:</strong> One big benefit is that GST is not applicable on ready to move properties, which saves money.</li>
                      </ul>
                      <p className="mt-4">
                        Because of these reasons, investing in ready to move projects in Gurugram is a wise decision.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-purple-600">
                      Types of Ready to Move Properties Available in Gurgaon
                    </h3>
                    <div className="text-gray-600 leading-relaxed">
                      <p className="mb-4">
                        Buyers can find many options according to their budget and lifestyle:
                      </p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Ready to move apartments in Gurgaon</li>
                        <li>Luxury flats and penthouses</li>
                        <li>Builder floors</li>
                        <li>Independent houses and villas</li>
                        <li>Gated societies with modern amenities</li>
                      </ul>
                      <p className="mt-4">
                        From affordable homes to luxury living, ready to move properties in Gurgaon offer something for everyone.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
                  <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-purple-600">
                      Best Locations for Ready to Move Projects in Gurgaon
                    </h3>
                    <div className="text-gray-600 leading-relaxed">
                      <p className="mb-4">
                        Location is very important while buying a home. Some of the best areas to find ready to move projects are:
                      </p>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Dwarka Expressway</h4>
                          <p className="text-sm">Fast developing area with luxury projects and great connectivity to Delhi and IGI Airport.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Golf Course Road & Extension Road</h4>
                          <p className="text-sm">Premium locations with high-end ready to move luxury projects in Gurgaon.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Sohna Road</h4>
                          <p className="text-sm">Good for families and investors looking for modern homes at reasonable prices.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">New Gurgaon (Sectors 82–95)</h4>
                          <p className="text-sm">Well-planned area with schools, hospitals, and upcoming infrastructure.</p>
                        </div>
                      </div>
                      <p className="mt-4">
                        These areas offer strong growth and better lifestyle.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-purple-600">
                      Important Tips Before Buying Ready to Move Projects in Gurgaon
                    </h3>
                    <div className="text-gray-600 leading-relaxed">
                      <p className="mb-4">
                        Buying a home is a big decision. Keep these points in mind:
                      </p>
                      <ul className="list-disc pl-5 space-y-3">
                        <li><strong>Check RERA Registration:</strong> Always make sure the project is RERA approved.</li>
                        <li><strong>Visit the Site:</strong> Don't rely only on photos. Visit the property and check surroundings.</li>
                        <li><strong>Check Amenities:</strong> Confirm amenities like parking, power backup, security, and open spaces.</li>
                        <li><strong>Compare Prices:</strong> Check multiple ready to move projects in Gurugram to get the best deal.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
                  <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-purple-600">
                      Why Buy Ready to Move Properties from 100acress.com?
                    </h3>
                    <div className="text-gray-600 leading-relaxed">
                      <p className="mb-4">
                        At 100acress.com, we help you find the best ready to move projects in Gurgaon without any confusion.
                      </p>
                      <p className="mb-4">
                        <strong>What We Offer:</strong>
                      </p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Verified and RERA-approved projects</li>
                        <li>Best price deals</li>
                        <li>Expert property guidance</li>
                        <li>Site visit support</li>
                        <li>Complete help till possession</li>
                      </ul>
                      <p>
                        We make property buying simple, safe, and transparent.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-purple-600">
                      Why Choose 100acress for Ready to Move Projects?
                    </h3>
                    <div className="text-gray-600 leading-relaxed">
                      <p className="mb-4">
                        100acress is a trusted real estate platform offering verified and RERA-approved ready to move projects in Gurgaon. We work with reputed developers and provide accurate property details, real site information, and expert guidance.
                      </p>
                      <p>
                        Whether you are buying a home for immediate possession or investing in ready to move properties, our platform helps you choose the right project with confidence and complete transparency.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 sm:p-8 text-white text-center">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                    Find Your Ready to Move Home Today
                  </h3>
                  <p className="text-lg mb-6 max-w-3xl mx-auto">
                    Discover the best ready to move projects in Gurgaon with instant possession, modern amenities, and excellent investment potential.
                  </p>
                  <a
                    href="https://www.100acress.com/projects/ready-to-move/"
                    className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
                  >
                    View Ready to Move Projects
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Trust Boosters Section */}
          <div className="mt-12 sm:mt-16 py-8 sm:py-12">
            <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
                Why Choose 100acress?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                <div className="text-center group hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">🛡️</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">RERA Approved</h3>
                  <p className="text-gray-600 text-sm">All our projects are RERA registered ensuring legal compliance and transparency</p>
                </div>
                
                <div className="text-center group hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Trusted Partners</h3>
                  <p className="text-gray-600 text-sm">Working with top developers like DLF, M3M, Sobha, and Signature Global</p>
                </div>
                
                <div className="text-center group hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                    <span className="text-2xl">🏠</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Properties</h3>
                  <p className="text-gray-600 text-sm">Handpicked luxury properties with modern amenities and prime locations</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section for SEO - Full Width */}
          <div className="mt-12 sm:mt-16">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center px-3">
              Frequently Asked Questions
            </h2>
            <div className="max-w-4xl mx-auto px-3 sm:px-4">
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <FAQAccordion 
                  projectStatus={projectStatus}
                  customFAQs={currentConfig.faqs}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compare Bar */}
      <CompareBar 
        items={Array.from(compareProjects).map(id => 
          displayedProjects.find(p => (p._id || p.id) === id)
        ).filter(Boolean)}
        onOpen={() => console.log('Open comparison')}
        onRemove={(project) => toggleCompareProject(project)}
      />

      

      {/* Footer */}
      <Footer />
    </>
  );
};

export default GlobalFilterTemplate;
