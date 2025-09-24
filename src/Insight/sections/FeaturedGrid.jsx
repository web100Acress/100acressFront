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
        [filter]: true
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
  }, [dataLoaded, getTrending, getFeatured, getUpcoming, getCommercial, getAffordable, getLuxury, getScoplots, getBudgetHomes, getProjectIndelhi, getProjectbyState]);

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
  }, [activeFilter, showAllSections, TrendingProjects, FeaturedProjects, UpcomingProjects, CommercialProjects, AffordableProjects, BudgetHomesProjects, SCOProjects, LuxuryAllProject]);

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

  const Icon = ({ path }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d={path}/></svg>
  );

  // Transform project data to match the card format
  const transformedCards = filteredProjects.map((project, index) => ({
    id: project._id || project.id || index + 1,
    status: project.status || 'For sale',
    statusColor: project.status === 'For rent' ? 'bg-purple-500' : 'bg-green-500',
    title: project.projectName || 'Project Name',
    address: project.projectAddress || `${project.city}, ${project.state}`,
    price: project.minPrice || 0,
    beds: project.beds || project.bedrooms || 2,
    baths: project.baths || project.bathrooms || 2,
    area: project.area || project.size || 1200,
    garages: project.garages || 1,
    img: project.thumbnailImage?.public_id
      ? `https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/${project.thumbnailImage.public_id}`
      : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1400&auto=format&fit=crop',
    project_url: project.project_url
  }));

  const ProjectCard = ({ project }) => {
    const id = project._id || project.id;
    const isFav = favorites.has(id);

    return (
      <Link
        to={`/${project.project_url}/`}
        target="_top"
        className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-[0_12px_28px_rgba(0,0,0,0.12)] transition-all duration-200 hover:-translate-y-0.5 block"
      >
        <div className="relative">
          <div className="w-full h-48 md:h-56 lg:h-60">
            <img
              src={project.thumbnailImage?.public_id
                ? `https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/${project.thumbnailImage.public_id}`
                : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1400&auto=format&fit=crop'
              }
              alt={project.projectName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-3 left-3">
            <span className={`inline-flex text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow ${project.status === 'For rent' ? 'bg-purple-500' : 'bg-green-500'}`}>
              {project.status || 'For sale'}
            </span>
          </div>
          <button
            type="button"
            onClick={(e) => handleFavoriteClick(e, project)}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow flex items-center justify-center transition-colors z-10"
          >
            {isFav ? (
              <MdFavorite className="w-5 h-5 text-red-500" />
            ) : (
              <MdFavoriteBorder className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>
        <div className="p-4 md:p-5">
          <h3 className="font-semibold text-[15px] md:text-[16px] text-gray-900 line-clamp-1">{project.projectName}</h3>
          <p className="text-gray-500 text-xs md:text-[13px] mt-1 line-clamp-2">{project.projectAddress || `${project.city}, ${project.state}`}</p>
          <div className="mt-3 text-gray-900 font-extrabold text-[16px] md:text-[17px]">
            {project.status === 'For rent' ? `₹${project.minPrice?.toLocaleString()}/mo` : `₹${project.minPrice} Cr`}
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-4 gap-2 text-[11px] md:text-[12px] text-gray-600">
            <div className="flex items-center gap-1"><Icon path="M3 10h18M7 10v10m10-10v10M7 15h10" />{project.beds || project.bedrooms || 2}<span className="hidden sm:inline">Beds</span></div>
            <div className="flex items-center gap-1"><Icon path="M3 20h18M7 20V8h10v12M9 11h2m4 0h2" />{project.baths || project.bathrooms || 2}<span className="hidden sm:inline">Baths</span></div>
            <div className="flex items-center gap-1"><Icon path="M4 4h16v16H4z" />{project.area || project.size || 1200}<span className="hidden sm:inline">sqft</span></div>
            <div className="flex items-center gap-1"><Icon path="M3 20h18M6 20V10h12v10M8 14h2m4 0h2" />{project.garages || 1}<span className="hidden sm:inline">Garages</span></div>
          </div>
        </div>
      </Link>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-7">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-gray-200 rounded-2xl h-80 animate-pulse"></div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-screen-xl mx-auto px-4 md:px-6 md:pl-[260px] mt-12 md:mt-20">
      <div className="mx-auto max-w-5xl text-center mb-3 md:mb-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#0c0a09] tracking-tight">
          {activeFilter} Properties in Gurugram and Delhi NCR
        </h2>
        <p className="text-gray-500 text-sm md:text-base mt-1">Leo morbi faucibus mattis pharetra tellus velit ultricies duis rhoncus</p>
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
        <button
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
        </button>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-7">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-gray-200 rounded-2xl h-80 animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-7">
                {[...UpcomingProjects].sort(() => 0.5 - Math.random()).slice(0, 6).map((project, index) => (
                  <ProjectCard key={project._id || index} project={project} />
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-7">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-gray-200 rounded-2xl h-80 animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-7">
                {[...LuxuryAllProject].sort(() => 0.5 - Math.random()).slice(0, 4).map((project, index) => (
                  <ProjectCard key={project._id || index} project={project} />
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-7">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-gray-200 rounded-2xl h-80 animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-7">
                {[...BudgetHomesProjects].sort(() => 0.5 - Math.random()).slice(0, 6).map((project, index) => (
                  <ProjectCard key={project._id || index} project={project} />
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-7">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-gray-200 rounded-2xl h-80 animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-7">
                {[...SCOProjects].sort(() => 0.5 - Math.random()).slice(0, 4).map((project, index) => (
                  <ProjectCard key={project._id || index} project={project} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Single Category View */}
      {!showAllSections && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-7 mt-4">
        {transformedCards.map((c) => (
          <Link
            key={c.id}
            to={`/${c.project_url}/`}
            target="_top"
            className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-[0_12px_28px_rgba(0,0,0,0.12)] transition-all duration-200 hover:-translate-y-0.5 block"
          >
            <div className="relative">
              <div className="w-full h-48 md:h-56 lg:h-60">
                <img src={c.img} alt={c.title} className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-3 left-3">
                <span className={`inline-flex text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow ${c.statusColor}`}>{c.status}</span>
              </div>
              {/* Wishlist/Favorites */}
              <button
                type="button"
                onClick={(e) => handleFavoriteClick(e, filteredProjects.find(p => (p._id || p.id) === c.id))}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow flex items-center justify-center transition-colors z-10"
              >
                {favorites.has(c.id) ? (
                  <MdFavorite className="w-5 h-5 text-red-500" />
                ) : (
                  <MdFavoriteBorder className="w-5 h-5 text-gray-700" />
                )}
              </button>
            </div>
            <div className="p-4 md:p-5">
              <h3 className="font-semibold text-[15px] md:text-[16px] text-gray-900 line-clamp-1">{c.title}</h3>
              <p className="text-gray-500 text-xs md:text-[13px] mt-1 line-clamp-2">{c.address}</p>
              <div className="mt-3 text-gray-900 font-extrabold text-[16px] md:text-[17px]">
                {c.status === 'For rent' ? `₹${c.price.toLocaleString()}/mo` : `₹${c.price} Cr`}
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-4 gap-2 text-[11px] md:text-[12px] text-gray-600">
                <div className="flex items-center gap-1"><Icon path="M3 10h18M7 10v10m10-10v10M7 15h10" />{c.beds}<span className="hidden sm:inline">Beds</span></div>
                <div className="flex items-center gap-1"><Icon path="M3 20h18M7 20V8h10v12M9 11h2m4 0h2" />{c.baths}<span className="hidden sm:inline">Baths</span></div>
                <div className="flex items-center gap-1"><Icon path="M4 4h16v16H4z" />{c.area}<span className="hidden sm:inline">sqft</span></div>
                <div className="flex items-center gap-1"><Icon path="M3 20h18M6 20V10h12v10M8 14h2m4 0h2" />{c.garages}<span className="hidden sm:inline">Garages</span></div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      )}

    </section>
  );
}
