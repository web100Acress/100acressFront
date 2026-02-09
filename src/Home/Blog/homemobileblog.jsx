import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import api from "../../config/apiClient";

const HomeMobileBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);
  const autoScrollRef = useRef(null);

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

  // Auto-scroll functionality
  useEffect(() => {
    if (blogs.length === 0) return;

    autoScrollRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % blogs.length;
        
        // Scroll to the next blog
        if (scrollRef.current) {
          const scrollAmount = nextIndex * (window.innerWidth * 0.85 + 16); // 85vw + gap
          scrollRef.current.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
          });
        }
        
        return nextIndex;
      });
    }, 4000); // Change blog every 4 seconds

    // Cleanup on unmount
    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [blogs.length]);

  // Pause auto-scroll on user interaction
  const handleUserInteraction = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }
    
    // Resume auto-scroll after 5 seconds of inactivity
    setTimeout(() => {
      autoScrollRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % blogs.length;
          
          if (scrollRef.current) {
            const scrollAmount = nextIndex * (window.innerWidth * 0.85 + 16);
            scrollRef.current.scrollTo({
              left: scrollAmount,
              behavior: 'smooth'
            });
          }
          
          return nextIndex;
        });
      }, 4000);
    }, 5000);
  };

  const handleManualScroll = (direction) => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }

    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % blogs.length 
      : (currentIndex - 1 + blogs.length) % blogs.length;
    
    setCurrentIndex(newIndex);
    
    if (scrollRef.current) {
      const scrollAmount = newIndex * (window.innerWidth * 0.85 + 16);
      scrollRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }

    // Resume auto-scroll after 5 seconds
    setTimeout(() => {
      autoScrollRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % blogs.length;
          
          if (scrollRef.current) {
            const scrollAmount = nextIndex * (window.innerWidth * 0.85 + 16);
            scrollRef.current.scrollTo({
              left: scrollAmount,
              behavior: 'smooth'
            });
          }
          
          return nextIndex;
        });
      }, 4000);
    }, 5000);
  };

  if (loading) {
    return (
      <section className="bg-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-gray-400 font-['Poppins',sans-serif]">Loading blogs...</div>
        </div>
      </section>
    );
  }

  if (!blogs || blogs.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-12 px-4 font-['Poppins','Inter',sans-serif]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            <span className="text-black">Latest </span>
            <span style={{ color: BRAND_RED }}>Blogs</span>
          </h2>
          
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto mb-3">
            Stay updated with latest insights, trends, and expert advice in real estate
          </p>
          
          {/* Animated Red Underline */}
          <motion.div 
            className="w-20 h-1 mx-auto rounded-full"
            style={{ background: `linear-gradient(90deg, ${BRAND_RED} 0%, #DC2626 100%)` }}
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Blog Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          {blogs.length > 1 && (
            <>
              <button
                onClick={() => handleManualScroll('prev')}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur p-2 rounded-full shadow-lg hover:bg-white transition-all duration-300"
                aria-label="Previous blog"
              >
                <ChevronLeft size={20} className="text-gray-700" />
              </button>
              <button
                onClick={() => handleManualScroll('next')}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur p-2 rounded-full shadow-lg hover:bg-white transition-all duration-300"
                aria-label="Next blog"
              >
                <ChevronRight size={20} className="text-gray-700" />
              </button>
            </>
          )}

          {/* Horizontal Scroll Container */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 pb-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4"
            style={{ scrollBehavior: 'smooth' }}
            onTouchStart={handleUserInteraction}
            onMouseDown={handleUserInteraction}
          >
            {blogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                className="min-w-[85vw] bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden snap-center relative"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -3,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                <Link to={blogLink(blog)} className="block h-full group">
                  {/* Blog Image */}
                  <div className="relative overflow-hidden h-48 w-full">
                    <img
                      src={blog.blog_Image?.url || FALLBACK_IMG}
                      alt={blog.blog_Title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={onImgError}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Category Badge */}
                    {blog.blog_Category && (
                      <span 
                        className="absolute top-3 left-3 px-3 py-1 text-white rounded-full font-medium text-xs"
                        style={{ backgroundColor: BRAND_RED }}
                      >
                        {blog.blog_Category}
                      </span>
                    )}
                  </div>

                  {/* Blog Content */}
                  <div className="p-4">
                    {/* Date */}
                    {blog.createdAt && (
                      <div className="flex items-center gap-1 text-gray-500 text-xs mb-2">
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

                    {/* Title */}
                    <h3 className="text-base md:text-lg font-bold text-black mb-2 line-clamp-2 group-hover:text-[#E63946] transition-colors duration-300">
                      {blog.blog_Title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {blog.blog_Description?.replace(/<[^>]+>/g, "").slice(0, 120)}
                      {blog.blog_Description?.length > 120 ? "..." : ""}
                    </p>

                    {/* Read More Button */}
                    <div 
                      className="inline-flex items-center gap-2 font-bold text-sm group-hover:gap-3 transition-all duration-300"
                      style={{ color: BRAND_RED }}
                    >
                      <span className="group-hover:underline">READ MORE</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* Spacer for right padding */}
            <div className="min-w-[4vw]"></div>
          </div>

          {/* Scroll Indicators (Dots) */}
          <div className="flex justify-center gap-1.5 mt-4">
            {blogs.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-red-600 w-6' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>

        {/* View All Blogs Button */}
        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link to="/blog/">
            <motion.button 
              className="inline-flex items-center gap-3 px-6 py-3 text-white font-bold rounded-full shadow-lg transition-all duration-300 text-sm"
              style={{ backgroundColor: BRAND_RED }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(230, 57, 70, 0.3), 0 10px 10px -5px rgba(230, 57, 70, 0.2)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span>View All Blogs</span>
              <ArrowRight size={16} />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeMobileBlog;