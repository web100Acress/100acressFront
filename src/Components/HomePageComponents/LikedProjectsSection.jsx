import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  hydrateFavoritesFromServer,
  subscribe,
  getFavoritesData,
  getFavorites,
  toggleFavorite,
} from "../../utils/favorites";
import { MdOutlineDelete, MdLocationOn } from "react-icons/md";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const LikedProjectsSection = () => {
  const [ids, setIds] = useState(() => getFavorites());
  const [data, setData] = useState(() => getFavoritesData());
  const [suggestedProjects, setSuggestedProjects] = useState([]);
  const [showMoreLiked, setShowMoreLiked] = useState(false);
  const [showMoreSuggested, setShowMoreSuggested] = useState(false);

  useEffect(() => {
    hydrateFavoritesFromServer().then(() => {
      setData(getFavoritesData());
      setIds(getFavorites());
    });

    const unsub = subscribe((nextIds) => {
      setIds(nextIds || []);
      setData(getFavoritesData());
    });

    // Simulate suggested projects (replace with actual API call)
    const fetchSuggested = async () => {
      const suggested = await fetch("/api/projects/suggested").then((res) =>
        res.json()
      );
      setSuggestedProjects(suggested);
    };
    fetchSuggested();

    return () => unsub();
  }, []);

  const handleRemove = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(id);
    toast.success("Removed from favorites");
  };

  if (!ids || ids.length === 0) return null;

  const items = ids
    .map((id) => data[String(id)])
    .filter(Boolean)
    .reverse(); // Show newest first

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Liked Projects */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mb-18"
      >
        <div className="mb-6 text-center">
          <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            ❤️ Your Liked Projects
          </h3>
          <p className="mt-2 text-lg text-gray-600">
            Quick access to your saved favorites across the site
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {(showMoreLiked ? items : items.slice(0, 8)).map((p, index) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={p.url || "#"}
                className="group block bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-red-100"
              >
                <div className="relative h-48 overflow-hidden">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.title || "Project"}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100" />
                  )}
                  <button
                    onClick={(e) => handleRemove(e, p.id)}
                    className="absolute top-2 right-2 bg-white/90 p-2 rounded-full shadow-md hover:bg-red-50 hover:text-red-600 transition-colors"
                    title="Remove from favorites"
                  >
                    <MdOutlineDelete className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4
                      className="font-bold text-gray-900 line-clamp-2"
                      title={p.title}
                    >
                      {p.title || "Project"}
                    </h4>
                    {p.priceText && (
                      <span className="text-sm font-semibold text-red-600 whitespace-nowrap ml-2">
                        {p.priceText}
                      </span>
                    )}
                  </div>

                  {p.city && (
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MdLocationOn className="mr-1 text-red-500" />
                      <span>{p.city}</span>
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        {items.length > 8 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowMoreLiked(!showMoreLiked)}
              className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
            >
              {showMoreLiked ? "View Less" : "View More"}
            </button>
          </div>
        )}
      </motion.section>

      {/* Suggested Projects */}
      {suggestedProjects.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 text-center">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              🔥 Suggested For You
            </h3>
            <p className="mt-2 text-lg text-gray-600">
              Projects you might be interested in
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {(showMoreSuggested
              ? suggestedProjects
              : suggestedProjects.slice(0, 8)
            ).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={project.url || "#"}
                  className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-red-100"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    {project.tag && (
                      <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                        {project.tag}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-gray-900 line-clamp-2 mb-1">
                      {project.title}
                    </h4>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        {project.location}
                      </span>
                      <span className="text-sm font-semibold text-red-600">
                        {project.price}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* View More Button */}
          {suggestedProjects.length > 8 && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setShowMoreSuggested(!showMoreSuggested)}
                className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
              >
                {showMoreSuggested ? "View Less" : "View More"}
              </button>
            </div>
          )}
        </motion.section>
      )}
    </div>
  );
};

export default LikedProjectsSection;
