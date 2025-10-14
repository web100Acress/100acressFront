import React, { useContext, useState, useEffect, useRef, useCallback } from "react";
import { DataContext } from "../../MyContext";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import Api_Service from "../../Redux/utils/Api_Service";
import Footer from "../Actual_Components/Footer";

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
  
  // Pagination state
  const [displayedProjects, setDisplayedProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(40);
  const [totalPages, setTotalPages] = useState(0);
  
  // Request throttling
  const requestThrottle = useRef(new Map());
  const isRequestInProgress = useRef(false);
  const lastRequestTime = useRef(0);
  
  // Get project status from URL or props
  const getProjectStatus = () => {
    const path = location.pathname;
    console.log('Current path:', path);
    
    // Only return status for status pages, not for type/city/budget pages
    if (path.includes('upcoming-projects-in-gurgaon')) return 'upcoming';
    if (path.includes('project-in-underconstruction')) return 'underconstruction';
    if (path.includes('property-ready-to-move')) return 'readytomove';
    if (path.includes('projects-in-newlaunch')) return 'newlaunch';
    
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
  
  // Use static page data directly - filtering will be handled by existing handleSearch function
  const finalStaticPageData = staticPageData;
  
  // Use static data first, then pageConfig, then fallback to default config
  const currentConfig = finalStaticPageData || pageConfig || {
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
    
    // If no project status (for type/city/budget pages), return empty array
    if (!projectStatus) {
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

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    // Auto-filter when filter changes
    setTimeout(() => {
      handleSearch();
    }, 100);
  };

  const handleSearch = (resetPagination = true) => {
    const dataToFilter = memoizedProjectData || [];
    console.log('handleSearch - dataToFilter length:', dataToFilter.length);
    console.log('handleSearch - current filters:', filters);
    
    let filtered = dataToFilter.filter((item) => {
      return (
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

    // Apply sorting
    if (sort === 'price') {
      filtered = filtered.sort((a, b) => (a.minPrice || 0) - (b.minPrice || 0));
    } else if (sort === 'newest') {
      filtered = filtered.sort((a, b) => new Date(b.createdAt || b.updatedAt || 0) - new Date(a.createdAt || a.updatedAt || 0));
    }

    setFilteredProjects(filtered);
    
    // Only reset pagination when explicitly requested (not from auto-filter)
    if (resetPagination) {
      setCurrentPage(1);
      updateDisplayedProjects(filtered, 1);
    } else {
      // Always update displayed projects when filtering, but keep current page
      updateDisplayedProjects(filtered, currentPage);
    }
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

  // Update displayed projects based on pagination
  const updateDisplayedProjects = (projectsToDisplay, page) => {
    console.log('updateDisplayedProjects - projectsToDisplay length:', projectsToDisplay.length);
    console.log('updateDisplayedProjects - page:', page);
    
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const projectsToShow = projectsToDisplay.slice(startIndex, endIndex);
    
    console.log('updateDisplayedProjects - projectsToShow length:', projectsToShow.length);
    console.log('updateDisplayedProjects - startIndex:', startIndex, 'endIndex:', endIndex);
    
    setDisplayedProjects(projectsToShow);
    setTotalPages(Math.ceil(projectsToDisplay.length / itemsPerPage));
    
    // If current page has no projects to show, go to last available page
    if (projectsToShow.length === 0 && projectsToDisplay.length > 0) {
      const lastPage = Math.ceil(projectsToDisplay.length / itemsPerPage);
      if (lastPage > 0 && page !== lastPage) {
        console.log('Current page empty, moving to last page:', lastPage);
        setCurrentPage(lastPage);
        const lastStartIndex = (lastPage - 1) * itemsPerPage;
        const lastEndIndex = lastStartIndex + itemsPerPage;
        const lastProjectsToShow = projectsToDisplay.slice(lastStartIndex, lastEndIndex);
        setDisplayedProjects(lastProjectsToShow);
      }
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const allProjects = filteredProjects.length > 0 ? filteredProjects : memoizedProjectData || [];
      updateDisplayedProjects(allProjects, page);
    }
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
    console.log('Loading projects for status:', projectStatus, 'with query:', currentConfig.query);
    throttledGetAllProjects(currentConfig.query, 0);
  }, [projectStatus, currentConfig.query, throttledGetAllProjects]);

  useEffect(() => {
    console.log('Project data updated:', projectData, 'for status:', projectStatus);
    setDatafromsearch({ [projectStatus]: projectData });
  }, [projectData, projectStatus]);

  // Force re-render when project status changes
  useEffect(() => {
    console.log('Project status changed to:', projectStatus);
    setFilteredProjects([]); // Clear any filtered results when status changes
  }, [projectStatus]);

  // Handle location changes
  useEffect(() => {
    console.log('Location changed to:', location.pathname);
    setFilteredProjects([]); // Clear filtered results when route changes
  }, [location.pathname]);

  // Auto-filter when filters or sort change (but not when data loads)
  useEffect(() => {
    if (memoizedProjectData && memoizedProjectData.length > 0) {
      // Only auto-filter if filters or sort have been set (not on initial data load)
      if (Object.keys(filters).some(key => filters[key] !== '') || sort) {
        handleSearch(false); // Don't reset pagination for auto-filter
      }
    }
  }, [filters, sort]);

  // Initialize displayed projects when data loads
  useEffect(() => {
    if (memoizedProjectData && memoizedProjectData.length > 0) {
      setCurrentPage(1);
      updateDisplayedProjects(memoizedProjectData, 1);
      setFilteredProjects(memoizedProjectData);
    } else {
      // Reset displayed projects when no data
      setDisplayedProjects([]);
      setTotalPages(0);
      setFilteredProjects([]);
    }
  }, [memoizedProjectData]);

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
                "item": "https://www.100acress.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Projects",
                "item": "https://www.100acress.com/projects"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": currentConfig.title,
                "item": canonical || currentConfig.canonical
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <Hero 
        title={currentConfig.title}
        subtitle={currentConfig.description}
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        filters={filters}
        projectStatus={projectStatus}
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
      <div className={`min-h-screen bg-gray-50 transition-all duration-500 ease-in-out ${showFilterBar ? 'lg:pt-32' : 'pt-0'}`}>

        {/* Main Content with Sidebar */}
        <div className="max-w-screen-xl mx-auto px-2 sm:px-4 md:px-6 py-4 sm:py-8 lg:pt-0">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-8 min-h-screen">
            
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

              {/* Pagination Controls */}
              {totalPages > 1 && displayedProjects.length > 0 && (
                <div className="flex justify-center items-center mt-6 sm:mt-8 px-2 sm:px-4">
                  <div className="flex items-center gap-2 sm:gap-4">
                    {/* Previous Button */}
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                        currentPage === 1
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      Previous
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1 sm:gap-2">
                      {/* First page */}
                      {currentPage > 3 && (
                        <>
                          <button
                            onClick={() => handlePageChange(1)}
                            className="px-3 py-2 rounded-lg font-medium bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 hover:border-gray-400 transition-all duration-300"
                          >
                            1
                          </button>
                          {currentPage > 4 && <span className="text-gray-400">...</span>}
                        </>
                      )}

                      {/* Current page and surrounding pages */}
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const startPage = Math.max(1, currentPage - 2);
                        const pageNum = startPage + i;
                        if (pageNum > totalPages) return null;
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                              pageNum === currentPage
                                ? 'bg-red-600 text-white border border-red-600'
                                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}

                      {/* Last page */}
                      {currentPage < totalPages - 2 && (
                        <>
                          {currentPage < totalPages - 3 && <span className="text-gray-400">...</span>}
                          <button
                            onClick={() => handlePageChange(totalPages)}
                            className="px-3 py-2 rounded-lg font-medium bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 hover:border-gray-400 transition-all duration-300"
                          >
                            {totalPages}
                          </button>
                        </>
                      )}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                        currentPage === totalPages
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      Next
                    </button>
                  </div>
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

          {/* Trust Boosters Section */}
          <div className="mt-12 sm:mt-16 py-8 sm:py-12">
            <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
                Why Choose 100acress?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                <div className="text-center group hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
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
                <FAQAccordion projectStatus={projectStatus} />
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
