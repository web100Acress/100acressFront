import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isFavorite, toggleFavorite } from "../../Utils/favorites";
import { AuthContext } from "../../AuthContext";
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import Api_Service from "../../Redux/utils/Api_Service";

export default function FeaturedGrid() {
  const { isAuthenticated } = React.useContext(AuthContext);

  // Get project data from Redux store (same as home page)
  const TrendingProjects = useSelector(store => store?.project?.trending) || [];
  const FeaturedProjects = useSelector(store => store?.project?.featured) || [];
  const UpcomingProjects = useSelector(store => store?.project?.upcoming) || [];
  const CommercialProjects = useSelector(store => store?.project?.commercial) || [];
  const SCOProjects = useSelector(store => store?.project?.scoplots) || [];
  const AffordableProjects = useSelector(store => store?.project?.affordable) || [];
  const LuxuryProjects = useSelector(store => store?.project?.luxury) || [];
  const BudgetHomesProjects = useSelector(store => store?.project?.budget) || [];
  const ProjectinDelhi = useSelector(store => store?.project?.projectindelhi) || [];
  const DubaiProjects = useSelector(store => store?.stateproject?.dubai) || [];
  const LuxuryAllProject = useSelector(store => store?.allsectiondata?.luxuryAll) || [];

  const [filteredProjects, setFilteredProjects] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [activeFilter, setActiveFilter] = useState("Trending");
  const [showAllSections, setShowAllSections] = useState(false);
  const [dataLoaded, setDataLoaded] = useState({
    trending: false,
    featured: false,
    upcoming: false,
    commercial: false,
    sco: false,
    affordable: false,
    luxury: false,
    luxuryAll: false,
    budget: false,
    delhi: false,
    dubai: false,
  });

  // API service functions (same as home page)
  const { getTrending, getFeatured, getUpcoming, getCommercial, getAffordable, getLuxury, getScoplots, getBudgetHomes, getProjectIndelhi, getAllProjects, getProjectbyState } = Api_Service();

  // Load data from API (same logic as home page)
  useEffect(() => {
    const loadData = (filter) => {
      if (dataLoaded[filter]) return;

      switch (filter) {
        case "Trending":
          getTrending();
          break;
        case "Featured":
          getFeatured();
          break;
        case "Upcoming":
          getUpcoming();
          break;
        case "Commercial":
          getCommercial();
          break;
        case "SCO":
          getScoplots();
          break;
        case "Affordable":
          getAffordable();
          break;
        case "Luxury":
          getLuxury();
          if (!dataLoaded.luxuryAll) {
            getAllProjects("luxury"); // Add this to populate LuxuryAllProject
          }
          break;
        case "Budget":
          getBudgetHomes();
          break;
        case "Delhi":
          getProjectIndelhi();
          break;
        case "Dubai":
          getProjectbyState("dubai");
          break;
        default:
          break;
      }
      setDataLoaded((prevData) => ({
        ...prevData,
        [filter]: true,
        ...(filter === "Luxury" ? { luxuryAll: true } : {})
      }));
    };

    // Load all project types
    loadData("Trending");
    loadData("Featured");
    loadData("Upcoming");
    loadData("Commercial");
    loadData("SCO");
    loadData("Affordable");
    loadData("Luxury");
    loadData("Budget");
    loadData("Delhi");
    loadData("Dubai");
  }, [dataLoaded, getTrending, getFeatured, getUpcoming, getCommercial, getAffordable, getLuxury, getScoplots, getBudgetHomes, getProjectIndelhi, getProjectbyState, getAllProjects]);

  // Filter projects based on active filter
  useEffect(() => {
    let projectsToShow = [];

    if (showAllSections) {
      // Show all sections like in Home.jsx
      setFilteredProjects([]);
      return;
    }

    switch (activeFilter) {
      case "Trending":
        projectsToShow = TrendingProjects || [];
        break;
      case "Featured":
        projectsToShow = FeaturedProjects || [];
        break;
      case "Upcoming":
        projectsToShow = UpcomingProjects || [];
        break;
      case "Commercial":
        projectsToShow = CommercialProjects || [];
        break;
      case "Affordable":
        projectsToShow = AffordableProjects || [];
        break;
      case "Budget":
        projectsToShow = BudgetHomesProjects || [];
        break;
      case "SCO":
        projectsToShow = SCOProjects || [];
        break;
      case "Luxury":
        projectsToShow = LuxuryAllProject || [];
        break;
      default:
        projectsToShow = TrendingProjects || [];
    }

    // Shuffle and limit to 18 projects
    const shuffled = [...projectsToShow].sort(() => 0.5 - Math.random());
    const finalProjects = shuffled.slice(0, 18);
    setFilteredProjects(finalProjects);
  }, [activeFilter, TrendingProjects, FeaturedProjects, UpcomingProjects, CommercialProjects, AffordableProjects, BudgetHomesProjects, SCOProjects, LuxuryAllProject]);

  // Update favorites state
  useEffect(() => {
    const favoriteIds = new Set();
    filteredProjects.forEach(project => {
      const id = project._id || project.id;
      if (isFavorite(id)) {
        favoriteIds.add(id);
      }
    });
    setFavorites(favoriteIds);
  }, [filteredProjects]);

  const handleFavoriteClick = (e, project) => {
    e.preventDefault();
    e.stopPropagation();

    const id = project._id || project.id;
    if (!id) return;

    const snapshot = {
      title: project.projectName,
      frontImage: project.frontImage,
      thumbnailImage: project.thumbnailImage,
      priceText: (() => {
        try {
          const min = project.minPrice;
          if (!min) return "Price on request";
          return min < 1 ? `₹${(min * 100).toFixed(0)} L` : `₹${min} Cr`;
        } catch { return "Price on request"; }
      })(),
      url: project.project_url ? `/${project.project_url}/` : undefined,
      city: project.city,
      maxPrice: project.maxPrice,
      minPrice: project.minPrice,
    };

    toggleFavorite(id, snapshot, isAuthenticated);
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleWhatsAppClick = (e, project) => {
    e.preventDefault();
    e.stopPropagation();
    
    const message = `Hi, I'm interested in ${project.projectName} located in ${project.city}. Could you please provide more details?`;
    const whatsappUrl = `https://wa.me/918500900100?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const formatPrice = (project) => {
    if (!project.minPrice) return "Price on request";
    const price = project.minPrice;

    // Convert AED to INR (approximate rate: 1 AED ≈ 22.5 INR)
    const priceInINR = price * 22.5;

    if (priceInINR >= 100) {
      return `₹${(priceInINR / 100).toFixed(1)}Cr`;
    } else if (priceInINR >= 1) {
      return `₹${priceInINR.toFixed(0)}L`;
    } else {
      return `₹${(priceInINR * 100).toFixed(0)}K`;
    }
  };

  const getPropertyType = (project) => {
    if (project.type) return project.type;
    if (project.category) return project.category;
    if (activeFilter === "Commercial") return "Commercial";
    if (activeFilter === "SCO") return "SCO Plots";
    return "Apartments";
  };

  const ProjectCard = ({ project }) => {
    const id = project._id || project.id;
    const isFav = favorites.has(id);

    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
        <Link to={`/${project.project_url}/`} target="_top" className="block">
          <div className="relative">
            <div className="w-full h-28 lg:h-32">
              <img
                src={project.thumbnailImage?.public_id
                  ? `https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/${project.thumbnailImage.public_id}`
                  : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1400&auto=format&fit=crop'
                }
                alt={project.projectName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <button
              type="button"
              onClick={(e) => handleFavoriteClick(e, project)}
              className="absolute top-3 right-3 w-5 h-5 rounded-full bg-white/100 hover:bg-white/90 shadow-md flex items-center justify-center transition-all duration-200 z-10"
            >
              {isFav ? (
                <MdFavorite className="w-4 h-4 text-red-500" />
              ) : (
                <MdFavoriteBorder className="w-4 h-4 text-gray-600" />
              )}
            </button>
          </div>

          <div className="p-2">
            <h3 className="font-semibold text-sm text-gray-900 mb-0 line-clamp-1">
              {project.projectName}
            </h3>
            
            <p className="text-xs text-gray-600 mb-1">
              {getPropertyType(project)}
            </p>

            <div className="flex items-start mb-1">
              <svg className="w-4 h-4 text-gray-400 mt-0.5 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-gray-500 line-clamp-2">
                {project.projectAddress || `${project.city}, ${project.state}`}
              </p>
            </div>

            <div className="bg-[#f5f5f5] rounded-lg py-0 px-4 mt-2 min-h-[24px] flex items-center">
              <div className="flex justify-between items-center w-full">
                <div className="text-center flex-1">
                  <p className="text-xs text-[#222] mb-0 font-medium">Launch Price</p>
                  <p className="font-bold text-[#006169] text-sm">
                    {formatPrice(project)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>

        <div className="px-2 pb-2">
          <button
            onClick={(e) => handleWhatsAppClick(e, project)}
            className="w-full bg-[#e9f7f0]  text-[#249f62] py-2.5 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors duration-200"
          >
            <svg className="w-5 h-5 fill-[#249f62]" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.690"/>
            </svg>
            WhatsApp
          </button>
        </div>
      </div>
    );
  };

  const AllSectionsProjectCard = ({ project }) => {
    const id = project._id || project.id;
    const isFav = favorites.has(id);

    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
        <Link to={`/${project.project_url}/`} target="_top" className="block">
          <div className="relative">
            <div className="w-full h-28 lg:h-32">
              <img
                src={project.thumbnailImage?.public_id
                  ? `https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/${project.thumbnailImage.public_id}`
                  : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1400&auto=format&fit=crop'
                }
                alt={project.projectName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <button
              type="button"
              onClick={(e) => handleFavoriteClick(e, project)}
              className="absolute top-3 right-3 w-5 h-5 rounded-full bg-white/70 hover:bg-white/90 shadow-md flex items-center justify-center transition-all duration-200 z-10"
            >
              {isFav ? (
                <MdFavorite className="w-4 h-4 text-red-500" />
              ) : (
                <MdFavoriteBorder className="w-4 h-4 text-gray-600" />
              )}
            </button>
          </div>

          <div className="p-2">
            <h3 className="font-semibold text-sm text-gray-900 mb-0 line-clamp-1">
              {project.projectName}
            </h3>
            
            <p className="text-xs text-gray-600 mb-1">
              {getPropertyType(project)}
            </p>

            <div className="flex items-start mb-1">
              <svg className="w-4 h-4 text-gray-400 mt-0.5 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-gray-500 line-clamp-2">
                {project.projectAddress || `${project.city}, ${project.state}`}
              </p>
            </div>

            <div className="bg-[#f5f5f5] rounded-lg py-0 px-4 mt-2 min-h-[24px] flex items-center">
              <div className="flex justify-between items-center w-full">
                <div className="text-center flex-1">
                  <p className="text-xs text-[#222] mb-0 font-medium">Launch Price</p>
                  <p className="font-bold text-[#006169] text-sm">
                    {formatPrice(project)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#249f62] mb-0 font-medium">Handover</p>
                  <p className="font-bold text-[#249f62] text-xs">
                    Q{Math.ceil(Math.random() * 4)} {new Date().getFullYear() + Math.ceil(Math.random() * 3)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>

        <div className="px-2 pb-2">
          <button
            onClick={(e) => handleWhatsAppClick(e, project)}
            className="w-full bg-[#e9f7f0] hover:bg-green-600 text-[#249f62] py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors duration-200"
          >
            <svg className="w-5 h-5 fill-[#249f62]" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.690"/>
            </svg>
            WhatsApp
          </button>
        </div>
      </div>
    );
  };

  // Show loading state if no projects and not showing all sections
  if (filteredProjects.length === 0 && !showAllSections) {
    return (
      <section className="max-w-screen-xl mx-auto px-4 md:px-6 md:pl-[260px] mt-12 md:mt-20">
        <div className="mx-auto max-w-5xl text-center mb-3 md:mb-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0c0a09] tracking-tight">Discover your featured property</h2>
          <p className="text-gray-500 text-sm md:text-base mt-1">Loading projects...</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-gray-200 rounded-xl h-96 animate-pulse"></div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-screen-xl mx-auto px-4 md:px-6 md:pl-[260px] mt-12 md:mt-20">
      <div className="mx-auto max-w-5xl text-center mb-3 md:mb-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#0c0a09] tracking-tight">
          Premium {activeFilter} Properties in Delhi NCR
        </h2>
        <p className="text-gray-500 text-sm md:text-base mt-1">Discover handpicked properties that match your lifestyle and investment goals</p>
      </div>

      {/* Filter Buttons */}
      <div className="flex items-center justify-start gap-2 sm:gap-3 mx-2 sm:mx-3 md:mx-6 xl:ml-14 pt-2 overflow-x-auto no-scrollbar whitespace-nowrap snap-x snap-mandatory scroll-px-3">
        <button
          onClick={() => {
            setActiveFilter("Trending");
            setShowAllSections(false);
          }}
          className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-sm sm:text-xs font-medium transition-all duration-300 flex-shrink-0 snap-start ${
            activeFilter === "Trending" && !showAllSections
              ? "bg-black text-white shadow-lg"
              : "bg-white border-2 border-gray-200 text-gray-800 hover:bg-gray-100 hover:border-gray-300"
          }`}
        >
          Trending
        </button>
        <button
          onClick={() => {
            setActiveFilter("Featured");
            setShowAllSections(false);
          }}
          className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-sm sm:text-xs font-medium transition-all duration-300 flex-shrink-0 snap-start ${
            activeFilter === "Featured" && !showAllSections
              ? "bg-black text-white shadow-lg"
              : "bg-white border-2 border-gray-200 text-gray-800 hover:bg-gray-100 hover:border-gray-300"
          }`}
        >
          Featured
        </button>
        <button
          onClick={() => {
            setActiveFilter("Upcoming");
            setShowAllSections(false);
          }}
          className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-sm sm:text-xs font-medium transition-all duration-300 flex-shrink-0 snap-start ${
            activeFilter === "Upcoming" && !showAllSections
              ? "bg-black text-white shadow-lg"
              : "bg-white border-2 border-gray-200 text-gray-800 hover:bg-gray-100 hover:border-gray-300"
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => {
            setActiveFilter("Commercial");
            setShowAllSections(false);
          }}
          className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-sm sm:text-xs font-medium transition-all duration-300 flex-shrink-0 snap-start ${
            activeFilter === "Commercial" && !showAllSections
              ? "bg-black text-white shadow-lg"
              : "bg-white border-2 border-gray-200 text-gray-800 hover:bg-gray-100 hover:border-gray-300"
          }`}
        >
          Commercial
        </button>
        <button
          onClick={() => {
            setActiveFilter("Affordable");
            setShowAllSections(false);
          }}
          className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-sm sm:text-xs font-medium transition-all duration-300 flex-shrink-0 snap-start ${
            activeFilter === "Affordable" && !showAllSections
              ? "bg-black text-white shadow-lg"
              : "bg-white border-2 border-gray-200 text-gray-800 hover:bg-gray-100 hover:border-gray-300"
          }`}
        >
          Affordable
        </button>
        <button
          onClick={() => {
            setActiveFilter("Budget");
            setShowAllSections(false);
          }}
          className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-sm sm:text-xs font-medium transition-all duration-300 flex-shrink-0 snap-start ${
            activeFilter === "Budget" && !showAllSections
              ? "bg-black text-white shadow-lg"
              : "bg-white border-2 border-gray-200 text-gray-800 hover:bg-gray-100 hover:border-gray-300"
          }`}
        >
          Budget
        </button>
        <button
          onClick={() => {
            setActiveFilter("SCO");
            setShowAllSections(false);
          }}
          className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-sm sm:text-xs font-medium transition-all duration-300 flex-shrink-0 snap-start ${
            activeFilter === "SCO" && !showAllSections
              ? "bg-black text-white shadow-lg"
              : "bg-white border-2 border-gray-200 text-gray-800 hover:bg-gray-100 hover:border-gray-300"
          }`}
        >
          SCO
        </button>
        <button
          onClick={() => {
            setActiveFilter("Luxury");
            setShowAllSections(false);
          }}
          className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-sm sm:text-xs font-medium transition-all duration-300 flex-shrink-0 snap-start ${
            activeFilter === "Luxury" && !showAllSections
              ? "bg-black text-white shadow-lg"
              : "bg-white border-2 border-gray-200 text-gray-800 hover:bg-gray-100 hover:border-gray-300"
          }`}
        >
          Luxury
        </button>
        {/* <button
          onClick={() => {
            setShowAllSections(true);
            setActiveFilter("All");
          }}
          className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-sm sm:text-xs font-medium transition-all duration-300 flex-shrink-0 snap-start ${
            showAllSections
              ? "bg-black text-white shadow-lg"
              : "bg-white border-2 border-gray-200 text-gray-800 hover:bg-gray-100 hover:border-gray-300"
          }`}
        >
          All Sections
        </button> */}
      </div>

      {/* Show All Sections */}
      {showAllSections && (
        <div className="space-y-8 mt-8">
          {/* Upcoming Projects */}
          <div>
            <div className="mx-auto max-w-5xl text-center mb-3 md:mb-4">
              <h3 className="text-xl md:text-2xl font-extrabold text-[#0c0a09] tracking-tight">
                New Upcoming Housing Projects in Gurgaon 2025
              </h3>
            </div>
            {UpcomingProjects.length === 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-gray-200 rounded-xl h-96 animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[...UpcomingProjects].sort(() => 0.5 - Math.random()).slice(0, 6).map((project, index) => (
                  <AllSectionsProjectCard key={project._id || index} project={project} />
                ))}
              </div>
            )}
          </div>

          {/* Luxury Projects */}
          <div>
            <div className="mx-auto max-w-5xl text-center mb-3 md:mb-4">
              <h3 className="text-xl md:text-2xl font-extrabold text-[#0c0a09] tracking-tight">
                Top Luxury Apartments For You
              </h3>
            </div>
            {LuxuryAllProject.length === 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-gray-200 rounded-xl h-96 animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[...LuxuryAllProject].sort(() => 0.5 - Math.random()).slice(0, 4).map((project, index) => (
                  <AllSectionsProjectCard key={project._id || index} project={project} />
                ))}
              </div>
            )}
          </div>

          {/* Budget Projects */}
          <div>
            <div className="mx-auto max-w-5xl text-center mb-3 md:mb-4">
              <h3 className="text-xl md:text-2xl font-extrabold text-[#0c0a09] tracking-tight">
                Best Budget Projects in Gurugram
              </h3>
            </div>
            {BudgetHomesProjects.length === 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-gray-200 rounded-xl h-96 animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[...BudgetHomesProjects].sort(() => 0.5 - Math.random()).slice(0, 6).map((project, index) => (
                  <AllSectionsProjectCard key={project._id || index} project={project} />
                ))}
              </div>
            )}
          </div>

          {/* SCO Projects */}
          <div>
            <div className="mx-auto max-w-5xl text-center mb-3 md:mb-4">
              <h3 className="text-xl md:text-2xl font-extrabold text-[#0c0a09] tracking-tight">
                SCO Projects in Gurugram
              </h3>
            </div>
            {SCOProjects.length === 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-gray-200 rounded-xl h-96 animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[...SCOProjects].sort(() => 0.5 - Math.random()).slice(0, 4).map((project, index) => (
                  <AllSectionsProjectCard key={project._id || index} project={project} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Single Category View */}
      {!showAllSections && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project._id || index} project={project} />
          ))}
        </div>
      )}

    </section>
  );
}