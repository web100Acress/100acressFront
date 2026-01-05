import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Eye } from 'lucide-react';

const BlogCard = ({ blog, blogLink, FALLBACK_IMG }) => {
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
    <Link to={blogLink} className="block">
      <div className="relative bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group cursor-pointer">
        
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <img
            src={getImageUrl()}
            alt={blog.blog_Title || 'Blog post'}
            className="w-full h-auto object-contain transition-all duration-500 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
            onError={(e) => {
              e.target.src = FALLBACK_IMG;
            }}
          />  
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          
          {/* Category Badge */}
          {blog.blog_Category && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-white/20 backdrop-blur-md text-white rounded-full border border-white/10">
                {blog.blog_Category}
              </span>
            </div>
          )}

          {/* Views Counter */}
          {blog.views > 0 && (
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs">
                <Eye className="h-3 w-3" />
                <span>{blog.views}</span>
              </div>
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="p-6 flex flex-col">
          
          {/* Meta Information */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(blog.createdAt || blog.published_Date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{getReadingTime(blog.blog_Description)}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-serif font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors" style={{ fontFamily: "'Open Sans', sans-serif" }}>
            {blog.blog_Title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 text-sm line-clamp-3 mb-0.5 flex-grow">
            {blog.blog_Description?.replace(/<[^>]*>/g, "").slice(0, 120)}...
          </p>

          {/* Read More Indicator */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-gray-500 font-sans">Read story</span>
            <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
          </div>
        </div>

        {/* Subtle Border Animation */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </Link>
  );
};

export default BlogCard;
