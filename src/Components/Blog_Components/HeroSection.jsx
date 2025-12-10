import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Eye, Heart } from 'lucide-react';

const HeroSection = ({ blog, blogLink, FALLBACK_IMG }) => {
  // Image error handler
  const onImgError = (e) => {
    if (e?.target && e.target.src !== window.location.origin + FALLBACK_IMG && !e.target.dataset.fallback) {
      e.target.dataset.fallback = "1";
      e.target.src = FALLBACK_IMG;
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric", 
      year: "numeric",
    });
  };

  // Calculate reading time
  const getReadingTime = (description) => {
    const words = description?.replace(/<[^>]*>/g, "").split(" ").length || 0;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  // Get blog image URL
  const getImageUrl = () => {
    return blog.blog_Image?.cdn_url || 
           blog.blog_Image?.url || 
           blog.blog_Image?.Location || 
           FALLBACK_IMG;
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,theme(colors.gray.200/20),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,theme(colors.white/3),transparent_50%)]" />

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Text Content */}
          <div className="space-y-8 text-left">
            {/* Featured Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-blue-700 font-sans text-sm font-semibold">Featured Story</span>
            </div>

            {/* Category */}
            {blog.blog_Category && (
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg border border-gray-300">
                  {blog.blog_Category}
                </span>
              </div>
            )}

            {/* Blog Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-gray-900 leading-tight" style={{ fontFamily: "'Open Sans', sans-serif" }}>
              {blog.blog_Title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(blog.createdAt || blog.published_Date)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{getReadingTime(blog.blog_Description)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4" />
                <span>{blog.views || 0} views</span>
              </div>
            </div>

            {/* Blog Excerpt */}
            <p className="text-lg text-gray-600 font-sans leading-relaxed max-w-lg">
              {blog.blog_Description?.replace(/<[^>]*>/g, "").slice(0, 150)}...
            </p>

            {/* CTA Button */}
            <Link
              to={blogLink}
              className="inline-flex items-center space-x-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-sans font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <span>Read Full Story</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="relative w-full h-96 lg:h-full min-h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={getImageUrl()}
                alt={blog.blog_Title || 'Featured blog post'}
                className="w-full h-full object-cover transition-all duration-700 filter grayscale hover:grayscale-0 hover:scale-110"
                onError={(e) => {
                  e.target.src = FALLBACK_IMG;
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent" />
    </section>
  );
};

export default HeroSection;
