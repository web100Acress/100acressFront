import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import api from "../../config/apiClient";

const FeaturedBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const FALLBACK_IMG = "/Images/blog.avif";
  const BRAND_RED = "#E63946";
  
  const onImgError = (e) => {
    if (e?.target && e.target.src !== window.location.origin + FALLBACK_IMG && !e.target.dataset.fallback) {
      e.target.dataset.fallback = "1";
      e.target.src = FALLBACK_IMG;
    }
  };

  const getSlug = (title) =>
    title.replace(/\s+/g, "-").replace(/[?!,\.;:\{\}\(\)\$\@]+/g, "").toLowerCase();

  const blogLink = (blog) => {
    if (blog?.slug) return `/blog/${blog.slug}`;
    return `/blog/${getSlug(blog.blog_Title)}/${blog._id}`;
  };

  useEffect(() => {
    const fetchFeaturedBlogs = async () => {
      try {
        setLoading(true);
        const response = await api.get(`blog/view`, {
          params: {
            page: 1,
            limit: 3,
            sortBy: 'createdAt',
            sortOrder: 'desc'
          }
        });

        if (response?.data?.data) {
          setBlogs(response.data.data.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching featured blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedBlogs();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  if (loading) {
    return (
      <section className="bg-white py-16 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-gray-400 font-['Poppins',sans-serif]">Loading blogs...</div>
        </div>
      </section>
    );
  }

  if (!blogs || blogs.length === 0) {
    return null;
  }

  // Separate featured blog (first one) and side blogs (remaining)
  const featuredBlog = blogs[0];
  const sideBlogs = blogs.slice(1, 4); // Get up to 3 side blogs

  return (
    <section className="bg-white py-16 px-6 md:px-20 font-['Poppins','Inter',sans-serif]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-2">
            <span className="text-black">Featured </span>
            <span style={{ color: BRAND_RED }}>Blogs</span>
          </h2>
          
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto mb-3">
            Stay updated with the latest insights, trends, and expert advice in real estate
          </p>
          
          {/* Animated Red Underline */}
          <motion.div 
            className="w-24 h-1 mx-auto rounded-full"
            style={{ background: `linear-gradient(90deg, ${BRAND_RED} 0%, #DC2626 100%)` }}
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Main Layout: Featured Blog (Left) + Side Blogs (Right) */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Large Featured Blog - Left Side (2 columns) */}
          {featuredBlog && (
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <Link to={blogLink(featuredBlog)} className="block h-full group">
                <div className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden h-full flex flex-col md:flex-row transition-all duration-300 border border-gray-100">
                  {/* Content - Left Side */}
                  <div className="p-6 md:p-8 flex flex-col flex-1 justify-between">
                    {/* Category & Date */}
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      {featuredBlog.blog_Category && (
                        <span 
                          className="px-4 py-1.5 text-white rounded-full font-medium text-sm"
                          style={{ backgroundColor: BRAND_RED }}
                        >
                          {featuredBlog.blog_Category}
                        </span>
                      )}
                      {featuredBlog.createdAt && (
                        <div className="flex items-center gap-1 text-gray-500">
                          <Calendar size={16} />
                          <span className="text-sm">
                            {new Date(featuredBlog.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Heading */}
                    <h3 className="text-2xl md:text-3xl font-bold text-black mb-4 line-clamp-2 group-hover:text-[#E63946] transition-colors duration-300">
                      {featuredBlog.blog_Title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-base mb-6 line-clamp-4 flex-1">
                      {featuredBlog.blog_Description?.replace(/<[^>]+>/g, "").slice(0, 250)}
                      {featuredBlog.blog_Description?.length > 250 ? "..." : ""}
                    </p>

                    {/* Read More Button */}
                    <div 
                      className="inline-flex items-center gap-2 font-bold text-base group-hover:gap-3 transition-all duration-300 self-start"
                      style={{ color: BRAND_RED }}
                    >
                      <span className="group-hover:underline">READ MORE</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Large Image - Right Side */}
                  <div className="relative overflow-hidden w-full md:w-1/2 h-64 md:h-auto md:rounded-r-2xl flex-shrink-0">
                    <img
                      src={featuredBlog.blog_Image?.url || FALLBACK_IMG}
                      alt={featuredBlog.blog_Title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={onImgError}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Side Blogs - Right Side (1 column, stacked vertically) */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            {sideBlogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -3,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                <Link to={blogLink(blog)} className="block h-full group">
                  <div className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden h-full flex flex-row transition-all duration-300 border border-gray-100">
                    {/* Small Image - Left */}
                    <div className="relative overflow-hidden w-32 md:w-40 flex-shrink-0">
                      <img
                        src={blog.blog_Image?.url || FALLBACK_IMG}
                        alt={blog.blog_Title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={onImgError}
                      />
                    </div>

                    {/* Content - Right */}
                    <div className="p-4 flex flex-col flex-1">
                      {/* Category */}
                      {blog.blog_Category && (
                        <span 
                          className="px-2 py-1 text-white rounded-full font-medium text-xs mb-2 inline-block self-start"
                          style={{ backgroundColor: BRAND_RED }}
                        >
                          {blog.blog_Category}
                        </span>
                      )}

                      {/* Title */}
                      <h4 className="text-sm md:text-base font-bold text-black mb-2 line-clamp-2 group-hover:text-[#E63946] transition-colors duration-300">
                        {blog.blog_Title}
                      </h4>

                      {/* Date */}
                      {blog.createdAt && (
                        <div className="flex items-center gap-1 text-gray-500 text-xs mt-auto">
                          <Calendar size={12} />
                          <span>
                            {new Date(blog.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* View All Blogs Button */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link to="/blog/">
            <motion.button 
              className="inline-flex items-center gap-3 px-8 py-4 text-white font-bold rounded-full shadow-lg transition-all duration-300"
              style={{ backgroundColor: BRAND_RED }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(230, 57, 70, 0.3), 0 10px 10px -5px rgba(230, 57, 70, 0.2)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span>View All Blogs</span>
              <ArrowRight size={20} />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedBlogs;
