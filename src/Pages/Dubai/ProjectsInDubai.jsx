import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { PropertyCard } from "./components/PropertyCard";
import { Header } from "./components/Header";
import { Copyright } from "./components/Copyright";
import { Button } from "../../Components/ui/button";
import { Filter, X, ChevronDown, Search } from "lucide-react";
import Api_service from "../../Redux/utils/Api_Service";
import { useDubai } from "./context/DubaiContext";
import { DubaiProvider } from "./context/DubaiContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./i18n/config";
import "./styles/theme.css";

const ProjectsInDubaiContent = () => {
  const { t } = useTranslation();
  const { getProjectbyState } = Api_service();
  const dubaiProjects = useSelector(store => store?.stateproject?.dubai || []);
  const { selectedEmirate } = useDubai();
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    emirate: "All",
    priceRange: "All",
    propertyType: "All",
    bedrooms: "All",
    status: "All",
    searchQuery: ""
  });

  useEffect(() => {
    if (!Array.isArray(dubaiProjects) || dubaiProjects.length === 0) {
      setIsLoading(true);
      getProjectbyState("Dubai", 0);
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (dubaiProjects && dubaiProjects.length > 0) {
      setIsLoading(false);
    }
  }, [dubaiProjects]);

  // Filter options
  const emirates = ["All", "Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain"];
  const priceRanges = [
    { label: "All", value: "All" },
    { label: "Under 1 Cr", value: "0-1" },
    { label: "1-5 Cr", value: "1-5" },
    { label: "5-10 Cr", value: "5-10" },
    { label: "10-20 Cr", value: "10-20" },
    { label: "Above 20 Cr", value: "20+" }
  ];
  const propertyTypes = ["All", "Residential", "Commercial", "Villa", "Apartment", "Penthouse", "Townhouse"];
  const bedroomOptions = ["All", "Studio", "1", "2", "3", "4", "5+"];
  const statusOptions = ["All", "Ready to Move", "Under Construction", "New Launch"];

  // Apply filters
  const filteredProjects = dubaiProjects.filter((project) => {
    // Emirate filter
    if (filters.emirate !== "All") {
      const projectLocation = (project.city || project.location || "").toLowerCase();
      if (!projectLocation.includes(filters.emirate.toLowerCase())) {
        return false;
      }
    }

    // Price range filter
    if (filters.priceRange !== "All") {
      const price = project.minPrice || project.price || project.startingPrice || 0;
      const numericPrice = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.]/g, '')) : price;
      
      const [min, max] = filters.priceRange.split('-').map(v => v === '+' ? Infinity : parseFloat(v));
      if (numericPrice < min || (max && numericPrice > max)) {
        return false;
      }
    }

    // Property type filter
    if (filters.propertyType !== "All") {
      const projectType = (project.projectType || project.type || "").toLowerCase();
      if (!projectType.includes(filters.propertyType.toLowerCase())) {
        return false;
      }
    }

    // Bedrooms filter
    if (filters.bedrooms !== "All") {
      const beds = project.bedrooms || project.BhK_Details?.[0]?.bedrooms || 0;
      if (filters.bedrooms === "5+") {
        if (beds < 5) return false;
      } else if (filters.bedrooms === "Studio") {
        if (beds !== 0) return false;
      } else {
        if (beds !== parseInt(filters.bedrooms)) return false;
      }
    }

    // Status filter
    if (filters.status !== "All") {
      const projectStatus = (project.projectStatus || "").toLowerCase();
      if (!projectStatus.includes(filters.status.toLowerCase())) {
        return false;
      }
    }

    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const searchableText = `${project.projectName} ${project.city} ${project.location} ${project.builder}`.toLowerCase();
      if (!searchableText.includes(query)) {
        return false;
      }
    }

    return true;
  });

  // Map projects to PropertyCard format
  const properties = filteredProjects.map((project) => {
    const nameSlug = project.projectName
      ?.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    
    const slug = project.slugURL || project.pUrl || project.slug || nameSlug || project._id;
    
    let priceValue = null;
    if (project.minPrice) priceValue = project.minPrice;
    else if (project.price) priceValue = project.price;
    else if (project.startingPrice) priceValue = project.startingPrice;
    else if (project.basePrice) priceValue = project.basePrice;
    else if (project.priceRange?.min) priceValue = project.priceRange.min;
    else if (project.priceRange?.start) priceValue = project.priceRange.start;
    else if (project.BhK_Details && project.BhK_Details.length > 0) {
      const bhkPrice = project.BhK_Details[0]?.price || 
                      project.BhK_Details[0]?.minPrice ||
                      project.BhK_Details[0]?.startingPrice;
      if (bhkPrice) priceValue = bhkPrice;
    }
    
    if (priceValue && typeof priceValue === 'string') {
      priceValue = parseFloat(priceValue.replace(/[^0-9.]/g, ''));
    }
    
    return {
      id: project._id,
      image: project.frontImage?.url || project.images?.[0]?.url || "/Images/logo.png",
      title: project.projectName || "Luxury Property",
      location: project.city || "Dubai",
      price: priceValue,
      beds: project.bedrooms || project.BhK_Details?.[0]?.bedrooms || 3,
      baths: project.bathrooms || project.BhK_Details?.[0]?.bathrooms || 2,
      sqft: project.projectArea || project.size || project.BhK_Details?.[0]?.area || 2000,
      tag: project.projectStatus === "New Launch" ? "New" : project.rera ? "Featured" : undefined,
      projectSlug: slug,
    };
  });

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const clearFilters = () => {
    setFilters({
      emirate: "All",
      priceRange: "All",
      propertyType: "All",
      bedrooms: "All",
      status: "All",
      searchQuery: ""
    });
  };

  const activeFiltersCount = Object.values(filters).filter(v => v !== "All" && v !== "").length;

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-24 pb-6 sm:pb-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z' fill='%23d4af37' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container relative px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4 sm:mb-6">
            <span className="text-gold text-xs sm:text-sm font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase">
              All Properties
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mt-2 sm:mt-3">
              Projects in <span className="text-gold">Dubai</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mt-2 sm:mt-3 px-4">
              Discover {filteredProjects.length} premium properties in the UAE
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-3 sm:mb-4 px-4">
            <div className="relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by project name, location, or builder..."
                value={filters.searchQuery}
                onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>
          </div>

          {/* Filter Toggle Button */}
          <div className="flex justify-center mb-3 sm:mb-4 px-4">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              className="gradient-gold text-black hover:shadow-gold group relative text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
            >
              <Filter className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="ml-2 bg-black text-gold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs font-bold">
                  {activeFiltersCount}
                </span>
              )}
              <ChevronDown className={`ml-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="glass-effect border border-white/10 rounded-xl p-4 sm:p-6 mb-3 sm:mb-4 animate-fade-in mx-4">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-semibold text-white">Filter Properties</h3>
                <div className="flex gap-2">
                  {activeFiltersCount > 0 && (
                    <Button
                      onClick={clearFilters}
                      variant="outline"
                      size="sm"
                      className="border-gold text-gold hover:bg-gold hover:text-black text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
                    >
                      <X className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="hidden sm:inline">Clear All</span>
                      <span className="sm:hidden">Clear</span>
                    </Button>
                  )}
                  <Button
                    onClick={() => setShowFilters(false)}
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-white hover:bg-white/10 px-2 sm:px-3 py-1 sm:py-2"
                  >
                    <X className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Emirate Filter */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-muted-foreground mb-1.5 sm:mb-2">Emirate</label>
                  <select
                    value={filters.emirate}
                    onChange={(e) => handleFilterChange("emirate", e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-gold/50 transition-colors"
                  >
                    {emirates.map(emirate => (
                      <option key={emirate} value={emirate} className="bg-black">{emirate}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-muted-foreground mb-1.5 sm:mb-2">Price Range</label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => handleFilterChange("priceRange", e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-gold/50 transition-colors"
                  >
                    {priceRanges.map(range => (
                      <option key={range.value} value={range.value} className="bg-black">{range.label}</option>
                    ))}
                  </select>
                </div>

                {/* Property Type Filter */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-muted-foreground mb-1.5 sm:mb-2">Property Type</label>
                  <select
                    value={filters.propertyType}
                    onChange={(e) => handleFilterChange("propertyType", e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-gold/50 transition-colors"
                  >
                    {propertyTypes.map(type => (
                      <option key={type} value={type} className="bg-black">{type}</option>
                    ))}
                  </select>
                </div>

                {/* Bedrooms Filter */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-muted-foreground mb-1.5 sm:mb-2">Bedrooms</label>
                  <select
                    value={filters.bedrooms}
                    onChange={(e) => handleFilterChange("bedrooms", e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-gold/50 transition-colors"
                  >
                    {bedroomOptions.map(option => (
                      <option key={option} value={option} className="bg-black">{option}</option>
                    ))}
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-muted-foreground mb-1.5 sm:mb-2">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange("status", e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-gold/50 transition-colors"
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status} className="bg-black">{status}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && !showFilters && (
            <div className="flex flex-wrap gap-2 mb-3 sm:mb-4 justify-center px-4">
              {Object.entries(filters).map(([key, value]) => {
                if (value !== "All" && value !== "") {
                  return (
                    <span
                      key={key}
                      className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 bg-gold/20 border border-gold/30 rounded-full text-xs sm:text-sm text-gold"
                    >
                      {key === "searchQuery" ? `Search: ${value}` : value}
                      <button
                        onClick={() => handleFilterChange(key, key === "searchQuery" ? "" : "All")}
                        className="hover:bg-gold/30 rounded-full p-0.5"
                      >
                        <X className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      </button>
                    </span>
                  );
                }
                return null;
              })}
            </div>
          )}
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-4 sm:py-6 relative">
        <div className="container px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-gold"></div>
              <p className="text-white mt-4 text-sm sm:text-base">Loading properties...</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-12 px-4">
              <p className="text-white text-lg sm:text-xl">No properties found matching your filters</p>
              <p className="text-muted-foreground mt-2 text-sm sm:text-base">Try adjusting your search criteria</p>
              <Button
                onClick={clearFilters}
                className="mt-4 gradient-gold text-black hover:shadow-gold text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="text-center mb-4 sm:mb-6">
                <p className="text-muted-foreground text-sm sm:text-base">
                  Showing <span className="text-gold font-semibold">{properties.length}</span> of <span className="text-gold font-semibold">{dubaiProjects.length}</span> properties
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {properties.map((property, index) => (
                  <div
                    key={property.id || index}
                    className="animate-fade-in-scale"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <PropertyCard {...property} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Copyright />
    </div>
  );
};

const ProjectsInDubai = () => {
  return (
    <ThemeProvider>
      <DubaiProvider>
        <ProjectsInDubaiContent />
      </DubaiProvider>
    </ThemeProvider>
  );
};

export default ProjectsInDubai;
