import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import api from "../../config/apiClient";

const HomeDesktopBlog = () => {
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

  // Slugify function matching backend model's pre-save hook
  const getSlug = (title) =>
    (title || '')
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')  // Remove special chars except spaces and hyphens
      .replace(/\s+/g, '-')           // Replace spaces with hyphens
      .replace(/-+/g, '-')            // Collapse multiple hyphens
      .replace(/^-+|-+$/g, '');       // Trim leading/trailing hyphens

  const blogLink = (blog) => {
    if (blog?.slug) return `/blog/${blog.slug}`;
    return `/blog/${getSlug(blog.blog_Title)}/${blog._id}`;
  };

  useEffect(() => {
    const fetchTopBlogs = async () => {
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
        console.error('Error fetching top blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopBlogs();
  }, []);

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
  const sideBlogs = blogs.slice(1, 3); // Get up to 2 side blogs

  return (
    <section className="from-gray-50 via-white to-gray-50 py-14 font-['Poppins','Inter',sans-serif] relative overflow-hidden w-full">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-red-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-[1440px] mx-auto w-full relative z-10 px-4 md:px-8 lg:px-16 xl:px-20">
        {/* Section Header */}
        <motion.div
          className="flex flex-col items-center justify-center text-center mb-4 px-4 pt-0"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent leading-tight mb-3">
            <span className="text-red-600">Our </span> Latest Blogs
          </h2>
          <div className="h-1.5 w-32 bg-gradient-to-r from-red-500 to-red-600 rounded-full mb-4"></div>

          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto mb-4 leading-relaxed">
            Stay updated with latest insights, trends, and expert advice in real estate. Discover valuable tips and market analysis from our industry experts.
          </p>
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
                <div className="bg-white rounded-4xl shadow-lg hover:shadow-2xl overflow-hidden h-full transition-all duration-500 border border-gray-100/50 hover:border-red-100 relative flex flex-col">
                  {/* Featured Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    {/* <div className="bg-gradient-to-r from-red-600 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                      FEATURED
                    </div> */}

                  </div>

                  {/* Image Section */}
                  <div className="relative w-full h-[450px] overflow-hidden">
                    <img
                      src={featuredBlog.blog_Image?.url || FALLBACK_IMG}
                      alt={featuredBlog.blog_Image?.alt || featuredBlog.blog_Title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      onError={onImgError}
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60"></div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 bg-white flex-1 flex flex-col justify-between">
                    <div>
                      {/* Category */}
                      {featuredBlog.blog_Category && (
                        <span
                          className="px-4 py-1.5 bg-red-50 text-red-600 rounded-full font-bold text-xs mb-4 inline-block uppercase tracking-wider border border-red-100"
                        >
                          {featuredBlog.blog_Category}
                        </span>
                      )}

                      {/* Title and Description */}
                      <div className="mb-6">
                        <h3 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 leading-tight group-hover:text-red-600 transition-colors">
                          {featuredBlog.blog_Title}
                        </h3>
                        <p className="text-gray-600 text-sm md:text-base line-clamp-3 leading-relaxed">
                          {featuredBlog.blog_Description}
                        </p>
                      </div>
                    </div>

                    {/* Date and Read More */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                      {featuredBlog.createdAt && (
                        <div className="flex items-center gap-2 text-gray-500">
                          <Calendar size={16} />
                          <span className="font-medium text-sm">
                            {new Date(featuredBlog.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      )}

                      {/* Read More Link */}
                      <div className="flex items-center gap-2 text-red-600 font-bold text-sm">
                        <span>Read More</span>
                        <ArrowRight size={16} />
                      </div>
                    </div>
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
                className="flex-1"
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
                  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden h-full transition-all duration-500 border border-gray-100/50 hover:border-red-100 relative flex flex-col">
                    {/* Blog Number Badge */}
                    <div className="absolute top-3 left-3 z-20">
                      <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 2}
                      </div>
                    </div>

                    {/* Image Section */}
                    <div className="relative w-full h-[160px] overflow-hidden">
                      <img
                        src={blog.blog_Image?.url || FALLBACK_IMG}
                        alt={blog.blog_Title}
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        onError={onImgError}
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-40"></div>
                    </div>

                    {/* Content Section */}
                    <div className="p-4 bg-white flex-1 flex flex-col justify-between">
                      <div>
                        {/* Category */}
                        {blog.blog_Category && (
                          <span
                            className="px-3 py-1 bg-red-50 text-red-600 rounded-full font-bold text-[10px] mb-3 inline-block uppercase tracking-wider border border-red-500/10"
                          >
                            {blog.blog_Category}
                          </span>
                        )}

                        {/* Title */}
                        <div className="mb-4">
                          <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-red-600 transition-colors line-clamp-2">
                            {blog.blog_Title}
                          </h3>
                        </div>
                      </div>

                      {/* Date and Read More */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        {blog.createdAt && (
                          <div className="flex items-center gap-2 text-gray-500">
                            <Calendar size={14} />
                            <span className="font-medium text-[11px]">
                              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                        )}

                        {/* Read More Link */}
                        <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-wider">
                          <ArrowRight size={16} />
                        </div>
                      </div>
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

export default HomeDesktopBlog;
