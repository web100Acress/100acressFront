import React, { useContext, useState, useEffect, useRef, useCallback } from "react";
import { DataContext } from "../MyContext";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import Api_Service from "../Redux/utils/Api_Service";
import ProjectSearching from "./ProjectSearching";
import CommonProject from "../Utils/CommonProject";
import Footer from "../Components/Actual_Components/Footer";

// Import modular components
import Hero from "./ProjectStatusSearch/Hero";
import FilterBar from "./ProjectStatusSearch/FilterBar";
import ProjectCard from "./ProjectStatusSearch/ProjectCard";
import CompareBar from "./ProjectStatusSearch/CompareBar";

const ProjectStatusSearch = () => {
  const { allProjectData } = useContext(DataContext);
  const location = useLocation();
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [datafromsearch, setDatafromsearch] = useState({});
  
  // Modern UI state
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [savedProjects, setSavedProjects] = useState(new Set());
  const [compareProjects, setCompareProjects] = useState(new Set());
  const [isFilterSticky, setIsFilterSticky] = useState(false);
  const [sort, setSort] = useState('newest');
  const [filters, setFilters] = useState({
    city: '',
    location: '',
    projectType: '',
    price: ''
  });
  
  // Request throttling
  const requestThrottle = useRef(new Map());
  const isRequestInProgress = useRef(false);
  const lastRequestTime = useRef(0);
  
  // Get project status from URL or props
  const getProjectStatus = () => {
    const path = location.pathname;
    console.log('Current path:', path);
    if (path.includes('upcoming-projects-in-gurgaon')) return 'upcoming';
    if (path.includes('project-in-underconstruction')) return 'underconstruction';
    if (path.includes('property-ready-to-move')) return 'readytomove';
    if (path.includes('projects-in-newlaunch')) return 'newlaunch';
    return 'upcoming'; // default
  };

  const projectStatus = getProjectStatus();
  console.log('Detected project status:', projectStatus);
  
  // Project status configurations
  const statusConfig = {
    upcoming: {
      title: "UpComing Projects in Gurgaon",
      description: "Explore best upcoming projects in Gurgaon with modern amenities. Find residential & commercial spaces customized to your lifestyle. Visit 100acress today!",
      metaTitle: "Discover Upcoming Projects in Gurgaon - 100acress",
      canonical: "https://www.100acress.com/projects/upcoming-projects-in-gurgaon/",
      query: "allupcomingproject"
    },
    underconstruction: {
      title: "Under Construction Projects in Gurgaon",
      description: "Under Construction Properties in Gurgaon include commercial and residential projects that will meet various requirements. These developments are equipped with modern amenities, great places close to business areas, as well as extensive green spaces. They're designed to meet the ever-changing demands of urban dwellers who want peace, convenience, and a vibrant lifestyle.",
      metaTitle: "Property in UnderConstruction - Flats, Villas, House in gurugram.",
      canonical: "https://www.100acress.com/under-construction-projects-in-gurgaon/",
      query: "underconstruction"
    },
    readytomove: {
      title: "Ready To Move Projects",
      description: "Explore ready to move properties in Gurgaon with modern amenities. Find residential & commercial spaces ready for immediate possession.",
      metaTitle: "Ready To Move Properties in Gurgaon - 100acress",
      canonical: "https://www.100acress.com/projects-in-gurugram/property-ready-to-move/",
      query: "readytomove"
    },
    newlaunch: {
      title: "Projects in New Launch",
      description: "Explore new launch projects in Gurgaon with modern amenities. Find the latest residential & commercial spaces.",
      metaTitle: "New Launch Projects in Gurgaon - 100acress",
      canonical: "https://www.100acress.com/projects-in-newlaunch/",
      query: "newlaunch"
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
  };

  const handleSearch = () => {
    const filtered = allProjectData.filter((item) => {
      return (
        (filters.city === "" || item.city.toLowerCase().includes(filters.city.toLowerCase())) &&
        (filters.location === "" || item.projectAddress.toLowerCase().includes(filters.location.toLowerCase())) &&
        (filters.projectType === "" || item.type.toLowerCase().includes(filters.projectType.toLowerCase())) &&
        (filters.price === "" || (() => {
          if (filters.price === "") return true;
          const [min, max] = filters.price.split(",").map(v => v === "Infinity" ? Infinity : parseFloat(v));
          return item.minPrice >= min && item.maxPrice <= max;
        })())
      );
    });
    setFilteredProjects(filtered);
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

  // Sticky filter effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsFilterSticky(scrollTop > 200);
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

  return (
    <>
      <Helmet>
        <meta name="description" content={currentConfig.description} />
        <meta property="og:title" content={currentConfig.metaTitle} />
        <meta property="og:site_name" content="100acress" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/logo.webp" />
        <meta property="og:url" content={currentConfig.canonical} />
        <meta property="og:description" content={currentConfig.description} />
        <meta property="og:keywords" content={currentConfig.title} />
        <meta name="twitter:title" content={currentConfig.metaTitle} />
        <meta name="twitter:description" content={currentConfig.description} />
        <meta name="twitter:url" content="https://twitter.com/100acressdotcom" />
        <meta name="twitter:card" content="summary" />
        <title>{currentConfig.metaTitle}</title>
        <link rel="canonical" href={currentConfig.canonical} />
      </Helmet>

      {/* Hero Section */}
      <Hero 
        title={currentConfig.title}
        subtitle={projectStatus === 'underconstruction' ? currentConfig.description : 'Premium projects crafted with quality, sustainability, and exceptional after‑sales service.'}
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        filters={filters}
      />

      {/* Filter Bar */}
      {(projectStatus === 'upcoming' || projectStatus === 'readytomove' || projectStatus === 'newlaunch') && (
        <FilterBar 
          view={viewMode}
          setView={setViewMode}
          sort={sort}
          setSort={setSort}
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
        />
      )}

      {/* Main Content Area */}
      <div className="min-h-screen">

          {/* ProjectSearching component for underconstruction */}
          {projectStatus === 'underconstruction' && (
            <div className="mt-auto">
              <ProjectSearching 
                searchdata={memoizedProjectData} 
                sendDatatoparent={handleDatafromSearch}
              />
            </div>
          )}

        {/* Project Grid */}
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-8">

          {/* Project Cards */}
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
              {(filteredProjects.length > 0 ? filteredProjects : memoizedProjectData || []).map((item, index) => {
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

          {/* Empty State */}
          {(!filteredProjects.length && !memoizedProjectData?.length) && (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-4xl">🏠</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Properties Found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria to find more properties.</p>
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

      {/* Compare Bar */}
      <CompareBar 
        items={Array.from(compareProjects).map(id => 
          (filteredProjects.length > 0 ? filteredProjects : memoizedProjectData || []).find(p => (p._id || p.id) === id)
        ).filter(Boolean)}
        onOpen={() => console.log('Open comparison')}
        onRemove={(project) => toggleCompareProject(project)}
      />

       {/* CommonProject component for underconstruction */}
       {projectStatus === 'underconstruction' && (
         <CommonProject
           data={filteredProjects.length === 0 ? memoizedProjectData : filteredProjects}
           animation="fade-up"
         />
       )}

      {/* Footer for underconstruction */}
      {projectStatus === 'underconstruction' && <Footer />}
    </>
  );
};

export default ProjectStatusSearch;
