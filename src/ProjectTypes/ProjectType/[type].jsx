import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import Api_Service from "../../Redux/utils/Api_Service";
import ProjectTypeTemplate from "./ProjectTypeTemplate";
import Footer from "../../Components/Footer/CrimsonEleganceFooter";

// Project type configurations - using original URLs
const projectTypeConfigs = {
  "sco-plots": {
    title: "SCO Plots in Gurugram",
    description: "Discover Premium SCO Plots in Gurugram – Your Gateway to Shop-Cum-Office Investment and Business Growth.",
    metaTitle: "SCO Plots in Gurugram | 100Acress",
    metaDescription: "Discover premium SCO plots in Gurugram. Find your dream Shop-Cum-Office plot with detailed information, pricing, and location details. Your trusted partner for SCO plot investment.",
    keywords: "sco plots gurugram, shop cum office plots, commercial plots gurugram, sco investment, business plots, commercial real estate",
    canonical: "https://www.100acress.com/sco/plots/",
    query: "scoplots",
    reduxKey: "scoplotsall",
    badgeColor: "bg-blue-500",
    badgeText: "SCO Plot",
    typeFilter: (project) => {
      return project.type?.toLowerCase().includes('sco') ||
             project.projectType?.toLowerCase().includes('sco') ||
             project.category?.toLowerCase().includes('sco') ||
             project.propertyType?.toLowerCase().includes('sco') ||
             project.projectName?.toLowerCase().includes('sco') ||
             project.description?.toLowerCase().includes('sco') ||
             project.projectName?.toLowerCase().includes('shop-cum-office') ||
             project.description?.toLowerCase().includes('shop-cum-office') ||
             project.projectName?.toLowerCase().includes('shop cum office') ||
             project.description?.toLowerCase().includes('shop cum office') ||
             project.projectName?.toLowerCase().includes('commercial') ||
             project.description?.toLowerCase().includes('commercial') ||
             true; // Show all for debugging
    }
  },
  "luxury-villas": {
    title: "India's Luxury Villas for Sale",
    description: "Discover Premium Luxury Villas Across India – Your Gateway to Exquisite Living and Prime Real Estate Investment.",
    metaTitle: "India's Luxury Villas for Sale | 100Acress",
    metaDescription: "Discover premium luxury villas across India. Find your dream villa with detailed information, pricing, and location details. Your trusted partner for luxury villa investment.",
    keywords: "luxury villas india, premium villas, villa for sale, luxury real estate, villa investment, buy villa, residential villas",
    canonical: "https://www.100acress.com/projects/villas/",
    query: "villas",
    reduxKey: "luxuryvillas",
    badgeColor: "bg-purple-500",
    badgeText: "Luxury Villa",
    typeFilter: (project) => {
      return project.type?.toLowerCase().includes('villa') ||
             project.projectType?.toLowerCase().includes('villa') ||
             project.category?.toLowerCase().includes('villa') ||
             project.propertyType?.toLowerCase().includes('villa') ||
             project.projectName?.toLowerCase().includes('villa') ||
             project.description?.toLowerCase().includes('villa');
    }
  },
  "plots-in-gurugram": {
    title: "Plots in Gurugram",
    description: "Discover Premium Plots in Gurugram – Your Gateway to Prime Real Estate Investment.",
    metaTitle: "Plots in Gurugram | 100Acress",
    metaDescription: "Discover premium plots in Gurugram. Find your dream plot with detailed information, pricing, and location details. Your trusted partner for plot investment.",
    keywords: "plots in gurugram, residential plots, commercial plots, property investment, buy plots, real estate gurugram",
    canonical: "https://www.100acress.com/projects/plots/",
    query: "plotsingurugram",
    reduxKey: "plotsingurugram",
    badgeColor: "bg-green-500",
    badgeText: "Plot",
    typeFilter: (project) => {
      return project.type?.toLowerCase().includes('plot') ||
             project.projectType?.toLowerCase().includes('plot') ||
             project.category?.toLowerCase().includes('plot') ||
             project.propertyType?.toLowerCase().includes('plot') ||
             project.projectName?.toLowerCase().includes('plot') ||
             project.description?.toLowerCase().includes('plot');
    }
  },
  "residential-projects": {
    title: "Residential Property",
    description: "Residential properties range from homes to apartments, each crafted to match unique lifestyles and comfort needs.",
    metaTitle: "Explore Residential Property in Prime Locations",
    metaDescription: "Discover top Residential Property for sale or rent in the best locations. Find your dream home today at 100acress.",
    keywords: "residential property, apartments, homes, residential real estate, property investment",
    canonical: "https://www.100acress.com/projects/residential/",
    query: "residentiaProject",
    reduxKey: "residential",
    badgeColor: "bg-red-500",
    badgeText: "Residential",
    typeFilter: (project) => {
      return true; // Show all residential projects
    }
  },
  "independent-floors": {
    title: "Independent & Builder Floors",
    description: "Discover Premium Independent & Builder Floors – Curated Living Spaces in Top Cities.",
    metaTitle: "Independent & Builder Floors | 100Acress",
    metaDescription: "Discover premium independent and builder floors in Gurugram. Find your dream property with detailed information, pricing, and location details. Your trusted partner for property investment.",
    keywords: "independent floors, builder floors, property in gurugram, real estate, property investment, buy property, residential properties",
    canonical: "https://www.100acress.com/projects/independent-floors/",
    query: "builderindepedentfloor",
    reduxKey: "builderindependentfloor",
    badgeColor: "bg-red-500",
    badgeText: "Independent Floor",
    typeFilter: (project) => {
      return true; // Show all independent floor projects
    }
  },
  "commercial-projects": {
    title: "Commercial Projects",
    description: "Discover Premium Commercial Projects – Your Gateway to Business Investment and Growth.",
    metaTitle: "Commercial Projects | 100Acress",
    metaDescription: "Discover premium commercial projects across India. Find your dream commercial space with detailed information, pricing, and location details. Your trusted partner for commercial real estate investment.",
    keywords: "commercial projects, commercial real estate, office spaces, retail spaces, commercial investment, business properties",
    canonical: "https://www.100acress.com/projects/commercial/",
    query: "commercial",
    reduxKey: "commercial",
    badgeColor: "bg-orange-500",
    badgeText: "Commercial",
    typeFilter: (project) => {
      return project.type?.toLowerCase().includes('commercial') ||
             project.projectType?.toLowerCase().includes('commercial') ||
             project.category?.toLowerCase().includes('commercial') ||
             project.propertyType?.toLowerCase().includes('commercial') ||
             project.projectName?.toLowerCase().includes('commercial') ||
             project.description?.toLowerCase().includes('commercial');
    }
  },
  "senior-living": {
    title: "Seniar living in Gurgaon",
    description: "Explore seniar living communities in Gurgaon with tailored amenities, comfort, and care-focused living.",
    metaTitle: "Seniar living in Gurgaon | 100Acress",
    metaDescription: "Discover premium seniar living communities in Gurgaon. Find your dream senior living home with detailed information, pricing, and location details. Your trusted partner for senior living investment.",
    keywords: "seniar living gurgaon, senior living communities, retirement homes, care living, senior apartments, elderly care, assisted living",
    canonical: "https://www.100acress.com/projects/senior-living/",
    query: "seniorliving",
    reduxKey: "seniorliving",
    badgeColor: "bg-indigo-500",
    badgeText: "Senior Living",
    typeFilter: (project) => {
      return project.type?.toLowerCase().includes('senior') ||
             project.projectType?.toLowerCase().includes('senior') ||
             project.category?.toLowerCase().includes('senior') ||
             project.propertyType?.toLowerCase().includes('senior') ||
             project.projectName?.toLowerCase().includes('senior') ||
             project.description?.toLowerCase().includes('senior') ||
             project.type?.toLowerCase().includes('retirement') ||
             project.projectType?.toLowerCase().includes('retirement') ||
             project.category?.toLowerCase().includes('retirement') ||
             project.projectName?.toLowerCase().includes('retirement') ||
             project.description?.toLowerCase().includes('retirement');
    }
  }
};

const ProjectTypePage = () => {
  const { type } = useParams();
  const { getAllProjects } = Api_Service();
  const location = useLocation();
  
  // Map current path to project type
  const getProjectTypeFromPath = () => {
    const path = location.pathname;
    
    if (path === '/sco/plots/') return 'sco-plots';
    if (path === '/projects/villas/') return 'luxury-villas';
    if (path === '/plots-in-gurugram/') return 'plots-in-gurugram';
    if (path === '/property/residential/') return 'residential-projects';
    if (path === '/projects/independent-floors/') return 'independent-floors';
    if (path === '/projects/commercial/') return 'commercial-projects';
    if (path === '/projects/senior-living/') return 'senior-living';
    
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

  // State management
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedProjectStatus, setSelectedProjectStatus] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sort, setSort] = useState('newest');
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [savedProjects, setSavedProjects] = useState(new Set());
  const [compareProjects, setCompareProjects] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const apiCallTimeoutRef = useRef(null);
  const hasCalledApiRef = useRef(false);
  
  const itemsPerPage = 18;

  // Data arrays
  const cities = [
    "Gurugram", "Delhi", "Noida", "Goa", "Ayodhya", "Mumbai", "Panipat", 
    "Panchkula", "Kasauli", "Sonipat", "Karnal", "Jalandhar", "Pushkar"
  ];
  
  const projectStatusOptions = [
    "Upcoming Projects",
    "New Launch",
    "Under Construction",
    "Ready to Move"
  ];

  const priceOptions = [
    "1Cr", "2Cr", "3Cr", "4Cr", "5Cr", "6Cr", "7Cr", "8Cr", "9Cr", "10Cr", "15Cr", "20Cr", "25Cr", "30Cr"
  ];

  // Status mapping for flexible matching
  const statusMapping = {
    "Upcoming Projects": ["upcoming", "comingsoon", "coming_soon"],
    "New Launch": ["newlaunch", "new_launch", "new launch"],
    "Under Construction": ["underconstruction", "under_construction", "under construction"],
    "Ready to Move": ["readytomove", "ready_to_move", "ready to move"]
  };

  // Load projects on component mount with debouncing
  useEffect(() => {
    // Clear any existing timeout
    if (apiCallTimeoutRef.current) {
      clearTimeout(apiCallTimeoutRef.current);
    }

    // Only make API call if we haven't already called it for this project type
    if (!hasCalledApiRef.current) {
      console.log('Fetching projects with query:', config.query);
      setIsLoading(true);
      
      // Debounce the API call
      apiCallTimeoutRef.current = setTimeout(() => {
        getAllProjects(config.query, 100)
          .then(() => {
            setApiError(null);
          })
          .catch((error) => {
            console.error('API Error:', error);
            setApiError(error.message || 'Failed to load projects');
          })
          .finally(() => {
            setIsLoading(false);
            hasCalledApiRef.current = true;
          });
      }, 500); // 500ms debounce
    }

    // Cleanup timeout on unmount
    return () => {
      if (apiCallTimeoutRef.current) {
        clearTimeout(apiCallTimeoutRef.current);
      }
    };
  }, [config.query, getAllProjects]);

  // Update filtered data when projects change
  useEffect(() => {
    if (projects) {
      console.log('Projects data:', projects);
      setFilteredData(projects);
    }
  }, [projects]);

  // Filtering logic
  const applyFilters = () => {
    if (!projects) return;

    let filtered = projects.filter(project => {
      // Apply type-specific filter
      if (!config.typeFilter(project)) return false;

      // Search term filter
      const matchesSearch = !searchTerm || 
        project.projectName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.city?.toLowerCase().includes(searchTerm.toLowerCase());

      // City filter
      const matchesCity = selectedCities.length === 0 ||
        selectedCities.some(city => 
          project.city?.toLowerCase().includes(city.toLowerCase())
        );

      // Project status filter
      const matchesStatus = selectedProjectStatus.length === 0 ||
        selectedProjectStatus.some(status => {
          const statusValues = statusMapping[status] || [status];
          return statusValues.some(value => 
            project.projectStatus?.toLowerCase().includes(value.toLowerCase()) ||
            project.status?.toLowerCase().includes(value.toLowerCase()) ||
            project.project_Status?.toLowerCase().includes(value.toLowerCase()) ||
            project.project_status?.toLowerCase().includes(value.toLowerCase())
          );
        });

      // Price filter
      const projectPrice = parseFloat(project.minPrice || project.price || 0);
      const matchesPrice = (!minPrice || projectPrice >= parseFloat(minPrice)) &&
                          (!maxPrice || projectPrice <= parseFloat(maxPrice));

      return matchesSearch && matchesCity && matchesStatus && matchesPrice;
    });

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedCities, selectedProjectStatus, minPrice, maxPrice, projects]);

  // Handlers
  const handleCheckboxChange = (e, setSelectedState) => {
    const { value, checked } = e.target;
    setSelectedState(prev => 
      checked ? [...prev, value] : prev.filter(v => v !== value)
    );
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCities([]);
    setSelectedProjectStatus([]);
    setMinPrice("");
    setMaxPrice("");
  };

  const removeFilter = (type, value) => {
    switch (type) {
      case 'city':
        setSelectedCities(prev => prev.filter(c => c !== value));
        break;
      case 'status':
        setSelectedProjectStatus(prev => prev.filter(s => s !== value));
        break;
      case 'price':
        setMinPrice("");
        setMaxPrice("");
        break;
      default:
        break;
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Pagination
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Format price helper
  const formatPrice = (price) => {
    if (!price) return '0';
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Scroll detection for filter bar visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const navHeight = 64;
      const heroHeight = window.innerHeight * 0.3;
      setShowFilterBar(scrollTop > (heroHeight + navHeight));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate structured data
  const generateProjectStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": config.title,
      "description": config.description,
      "url": config.canonical,
      "numberOfItems": filteredData.length,
      "itemListElement": filteredData.slice(0, 10).map((project, index) => ({
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
      <Helmet>
        <title>{config.metaTitle}</title>
        <meta name="description" content={config.metaDescription} />
        <meta name="keywords" content={config.keywords} />
        <link rel="canonical" href={config.canonical} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={config.metaTitle} />
        <meta property="og:description" content={config.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={config.canonical} />
        <meta property="og:image" content="https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/logo.webp" />
        <meta property="og:site_name" content="100acress" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={config.metaTitle} />
        <meta name="twitter:description" content={config.metaDescription} />
        <meta name="twitter:image" content="https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/logo.webp" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(generateProjectStructuredData())}
        </script>
      </Helmet>

      <ProjectTypeTemplate
        title={config.title}
        description={config.description}
        projects={paginatedData}
        filteredData={filteredData}
        currentPage={currentPage}
        totalPages={totalPages}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCities={selectedCities}
        setSelectedCities={setSelectedCities}
        selectedProjectStatus={selectedProjectStatus}
        setSelectedProjectStatus={setSelectedProjectStatus}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        filterModalOpen={filterModalOpen}
        setFilterModalOpen={setFilterModalOpen}
        viewMode={viewMode}
        setViewMode={setViewMode}
        sort={sort}
        setSort={setSort}
        showFilterBar={showFilterBar}
        savedProjects={savedProjects}
        setSavedProjects={setSavedProjects}
        compareProjects={compareProjects}
        setCompareProjects={setCompareProjects}
        handlePageChange={handlePageChange}
        handleCheckboxChange={handleCheckboxChange}
        handleClearFilters={handleClearFilters}
        removeFilter={removeFilter}
        formatPrice={formatPrice}
        cities={cities}
        projectStatusOptions={projectStatusOptions}
        priceOptions={priceOptions}
        statusMapping={statusMapping}
        badgeColor={config.badgeColor}
        badgeText={config.badgeText}
        typeFilter={config.typeFilter}
        isLoading={isLoading}
        apiError={apiError}
        projectType={projectType}
        metaTitle={config.metaTitle}
        metaDescription={config.metaDescription}
        canonical={config.canonical}
        keywords={config.keywords}
      />
      
      <Footer />
    </>
  );
};

export default ProjectTypePage;
