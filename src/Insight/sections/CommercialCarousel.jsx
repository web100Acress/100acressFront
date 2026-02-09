import React, { useMemo, useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { isFavorite, toggleFavorite } from "../../Utils/favorites";
import { AuthContext } from "../../AuthContext";

export default function CommercialCarousel({
  title = "Commercial property",
  subtitle = "Explore premium office & retail spaces curated for modern businesses",
}) {
  const { isAuthenticated } = React.useContext(AuthContext);

  // Get commercial projects data from Redux store (same as Home.jsx)
  const CommercialProjects = useSelector(store => store?.project?.commercial) || [];

  // Enrich with categories (same logic as original)
  const itemsWithCat = useMemo(() => {
    const infer = (t = "") => {
      const s = t.toLowerCase();
      if (s.includes("retail")) return "Retail";
      if (s.includes("it") || s.includes("it park")) return "IT Park";
      if (s.includes("office")) return "Office";
      return "Commercial";
    };
    return (CommercialProjects || []).map((it) => ({ ...it, category: it.category || infer(it.projectName || it.title) }));
  }, [CommercialProjects]);

  // Filters
  const categories = useMemo(() => ["All", ...Array.from(new Set(itemsWithCat.map(i => i.category)))], [itemsWithCat]);
  const [selected, setSelected] = useState("All");
  const filtered = useMemo(() => selected === "All" ? itemsWithCat : itemsWithCat.filter(i => i.category === selected), [selected, itemsWithCat]);

  // Scroll-snap carousel
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const cardWidth = 300; // approximate incl. gap
  const scrollByCards = (n) => {
    const el = trackRef.current; if (!el) return;
    el.scrollBy({ left: n * cardWidth, behavior: 'smooth' });
  };
  useEffect(() => {
    const el = trackRef.current; if (!el) return;
    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / cardWidth);
      setActiveIndex(idx);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [cardWidth, filtered]);

  const handleFavoriteClick = (e, project) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      alert('Please login to add favorites');
      return;
    }

    const projectId = project._id || project.id;
    toggleFavorite(projectId);
    // Force re-render to update favorite state
    setActiveIndex(prev => prev);
  };

  const handleWhatsAppClick = (e, project) => {
    e.preventDefault();
    e.stopPropagation();

    const message = `Hi, I'm interested in ${project.projectName} located in ${project.city}. Could you please provide more details?`;
    const whatsappUrl = `https://wa.me/918500900100?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const formatPrice = (project) => {
    if (!project.minPrice && !project.maxPrice) return "Reveal Soon";

    const formatPriceValue = (price) => {
      if (price < 1) {
        return `${(price * 100).toFixed(2)} L`;
      } else {
        return `${price} Cr`;
      }
    };

    if (project.minPrice && project.maxPrice) {
      return `${formatPriceValue(project.minPrice)} - ${formatPriceValue(project.maxPrice)}`;
    }

    if (project.minPrice) {
      return formatPriceValue(project.minPrice);
    }

    if (project.maxPrice) {
      return formatPriceValue(project.maxPrice);
    }

    return "Reveal Soon";
  };

  const getPropertyType = (project) => {
    if (project.type) return project.type;
    if (project.category) return project.category;
    return "Commercial";
  };

  const ProjectCard = ({ project }) => {
    const id = project._id || project.id;
    const isFav = isFavorite(id);

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
            <h3 className="font-bold text-sm text-gray-900 mb-0 line-clamp-1">
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

            <div className="bg-[#f5f5f5] rounded-lg py-0 px-0 mt-0 min-h-[24px] flex items-center">
              <div className="flex justify-between items-center w-full">
                <div className="text-center flex mt-0  items-center justify-center flex-1 flex-col">
                  <p className="text-xs text-[#222] mb-0 pt-2 font-bold">Launch Price</p>
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
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.690" />
            </svg>
            WhatsApp
          </button>
        </div>
      </div>
    );
  };

  return (
    <section className="pb-14">
      {/* Desktop Layout with Sidebar Space */}
      <div className="flex justify-center">
        <div className="w-full max-w-screen-xl px-3 sm:px-4 md:px-6">
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0c0a09] tracking-tight">
              {title}
            </h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">{subtitle}</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex justify-center mb-6">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelected(cat)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${selected === cat
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Carousel */}
          <div className="relative">
            <div
              ref={trackRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {filtered.slice(0, 8).map((item, idx) => (
                <div key={item._id || idx} className="flex-none w-72 snap-center">
                  <ProjectCard project={item} />
                </div>
              ))}
            </div>

            {/* Navigation Dots */}
            {filtered.length > 4 && (
              <div className="flex justify-center space-x-2 mt-6">
                {Array.from({ length: Math.ceil(filtered.length / 4) }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollByCards(i * 4 - activeIndex)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${i === Math.floor(activeIndex / 4) ? "bg-gray-900" : "bg-gray-300"
                      }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
