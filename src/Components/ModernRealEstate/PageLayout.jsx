import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Hero from './Hero';
import FilterSidebar from './FilterSidebar';
import ProjectCard from './ProjectCard';
import ProjectDetails from './ProjectDetails';

const PageLayout = ({
  title,
  description,
  projects = [],
  isLoading = false,
  projectType = "project-type",
  metaTitle,
  metaDescription,
  canonical,
  keywords
}) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filters, setFilters] = useState({
    price: { min: '', max: '' },
    status: [],
    city: [],
    type: [],
    priceRange: []
  });
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [viewMode, setViewMode] = useState('grid');
  const [favoriteProjects, setFavoriteProjects] = useState(new Set());
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter options
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
    "₹50L - ₹1Cr",
    "₹1Cr - ₹2Cr", 
    "₹2Cr - ₹5Cr",
    "₹5Cr - ₹10Cr",
    "₹10Cr+"
  ];

  // Filter projects based on current filters
  useEffect(() => {
    let filtered = projects.filter(project => {
      // Price filter
      if (filters.price.min && project.minPrice && project.minPrice < parseFloat(filters.price.min) * 100000) {
        return false;
      }
      if (filters.price.max && project.minPrice && project.minPrice > parseFloat(filters.price.max) * 100000) {
        return false;
      }

      // Status filter
      if (filters.status.length > 0) {
        const projectStatus = project.projectStatus || project.status || '';
        const statusMatch = filters.status.some(status => 
          projectStatus.toLowerCase().includes(status.toLowerCase())
        );
        if (!statusMatch) return false;
      }

      // City filter
      if (filters.city.length > 0) {
        const cityMatch = filters.city.some(city => 
          project.city?.toLowerCase().includes(city.toLowerCase())
        );
        if (!cityMatch) return false;
      }

      // Type filter
      if (filters.type.length > 0) {
        const typeMatch = filters.type.some(type => 
          project.type?.toLowerCase().includes(type.toLowerCase())
        );
        if (!typeMatch) return false;
      }

      return true;
    });

    setFilteredProjects(filtered);
  }, [projects, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      price: { min: '', max: '' },
      status: [],
      city: [],
      type: [],
      priceRange: []
    });
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  const handleProjectClose = () => {
    setSelectedProject(null);
  };

  const handleFavorite = (project) => {
    const projectId = project._id || project.id;
    setFavoriteProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  const handleShare = (project) => {
    if (navigator.share) {
      navigator.share({
        title: project.projectName,
        text: `Check out this property: ${project.projectName}`,
        url: `${window.location.origin}/${project.project_url}/`
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/${project.project_url}/`);
    }
  };

  const handleSearch = (query) => {
    // Implement search functionality
    console.log('Searching for:', query);
    // You can add search logic here
  };

  return (
    <>
      <Helmet>
        <title>{metaTitle || title}</title>
        <meta name="description" content={metaDescription || description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={canonical} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={metaTitle || title} />
        <meta property="og:description" content={metaDescription || description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content="https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/logo.webp" />
        <meta property="og:site_name" content="100acress" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle || title} />
        <meta name="twitter:description" content={metaDescription || description} />
        <meta name="twitter:image" content="https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/logo.webp" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <Hero
          title={title}
          description={description}
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          filters={filters}
          projectType={projectType}
        />

        {/* Header with Controls */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14 sm:h-16">
              <div className="flex items-center gap-2 sm:gap-4">
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900">Browse Properties</h2>
                  <p className="text-xs sm:text-sm text-gray-600">{filteredProjects.length} properties found</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-4">
                {/* View Mode Toggle - Hidden on mobile */}
                <div className="hidden md:flex items-center bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    List
                  </button>
                </div>

                {/* Mobile Filter Button */}
                <button
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block lg:w-80 xl:w-96">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              cities={cities}
              projectStatusOptions={projectStatusOptions}
              priceOptions={priceOptions}
            />
          </div>

          {/* Mobile Sidebar Overlay */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowMobileFilters(false)} />
              <div className="relative bg-white h-full w-80 max-w-sm overflow-y-auto">
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <FilterSidebar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                  cities={cities}
                  projectStatusOptions={projectStatusOptions}
                  priceOptions={priceOptions}
                />
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col lg:flex-row">
            {/* Projects Grid */}
            <div className="flex-1 p-3 sm:p-4 lg:p-6">
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mb-4"></div>
                    <div className="text-gray-500">Loading projects...</div>
                  </div>
                </div>
              ) : filteredProjects.length === 0 ? (
                <div className="text-center py-12 sm:py-16">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-3xl sm:text-4xl">🏠</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Try adjusting your filters to see more results.</p>
                  <button
                    onClick={handleClearFilters}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className={`grid gap-4 sm:gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
                  {filteredProjects.map((project, index) => (
                    <ProjectCard
                      key={project._id || index}
                      project={project}
                      onFavorite={handleFavorite}
                      onShare={handleShare}
                      onSelect={handleProjectSelect}
                      isSelected={selectedProject?._id === project._id}
                      isFavorited={favoriteProjects.has(project._id || project.id)}
                      viewMode={viewMode}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right Panel - Project Details - Hidden on mobile when no project selected */}
            {selectedProject && (
              <div className="hidden lg:block lg:w-80 xl:w-96">
                <ProjectDetails
                  project={selectedProject}
                  onClose={handleProjectClose}
                  onFavorite={handleFavorite}
                  onShare={handleShare}
                  isFavorited={favoriteProjects.has(selectedProject._id || selectedProject.id)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PageLayout;
