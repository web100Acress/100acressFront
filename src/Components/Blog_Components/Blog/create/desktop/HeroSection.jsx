import React from 'react';
import { Calendar, Clock, Eye, ArrowRight, Heart } from 'lucide-react';

const HeroSection = ({ blog = { blog_Title: "Luxury Waterfront Estate", blog_Category: "Premium Properties", blog_Description: "Discover this exquisite luxury property with modern design and stunning views.", views: 1250, createdAt: new Date().toISOString() }, blogLink = "#", FALLBACK_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect fill='%231e293b' width='400' height='400'/%3E%3C/svg%3E" }) => {
  
  const [isLiked, setIsLiked] = React.useState(false);

  const onImgError = (e) => {
    if (e?.target && !e.target.dataset.fallback) {
      e.target.dataset.fallback = "1";
      e.target.src = FALLBACK_IMG;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const getImageUrl = () => {
    return blog.blog_Image?.cdn_url || blog.blog_Image?.url || blog.blog_Image?.Location || FALLBACK_IMG;
  };

  return (
    <section className="relative w-full min-h-[500px] bg-gradient-to-br from-slate-900 to-blue-900 overflow-hidden">
      {/* Background Image - Fixed for all ratios */}
      <div className="absolute inset-0">
        <img src={getImageUrl()} alt={blog.blog_Title} className="w-full h-full object-cover opacity-20" onError={onImgError} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-gray-900/80 to-black/70" />
      </div>  

      {/* Content - Responsive for all screen ratios */}
      <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 xl:py-20 flex flex-col xl:flex-row items-center justify-center gap-6 lg:gap-8 xl:gap-12">
        
        {/* Left Content - Responsive sizing */}
        <div className="w-full xl:w-1/2 max-w-2xl space-y-4 sm:space-y-6 text-center xl:text-left">
          
          {/* Badges - Responsive */}
          <div className="flex justify-center xl:justify-start gap-2 sm:gap-3 flex-wrap">
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500/30 border border-blue-400/50 rounded-lg text-blue-200 text-xs sm:text-sm font-medium backdrop-blur">Featured</span>
            {blog.blog_Category && <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-emerald-500/30 border border-emerald-400/50 rounded-lg text-emerald-200 text-xs sm:text-sm font-medium backdrop-blur">{blog.blog_Category}</span>}
          </div>

          {/* Title - Responsive font sizes */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-4xl font-semibold text-white leading-tight text-left">{blog.blog_Title}</h1>
          {/* Meta Info - Responsive */}
          <div className="flex justify-center xl:justify-start gap-3 sm:gap-4 lg:gap-6 text-white/70 text-xs sm:text-sm flex-wrap">
            <div className="flex items-center gap-1 sm:gap-2">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{formatDate(blog.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>5 min read</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{(blog.views || 0).toLocaleString()} views</span>
            </div>
          </div>
          
          {/* Buttons - Responsive */}
          <div className="flex flex-col sm:flex-row justify-center xl:justify-start gap-3 sm:gap-4 pt-2 sm:pt-4">
            <button onClick={() => window.location.href = blogLink} className="px-4 sm:px-6 lg:px-8 py-2 sm:py-3 bg-white text-slate-900 font-semibold rounded-lg hover:bg-blue-100 transition-all flex items-center justify-center gap-2 text-sm sm:text-base group">
              <span>Explore Now</span>
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => setIsLiked(!isLiked)} className="p-2 sm:p-3 bg-white/20 hover:bg-white/30 border border-white/30 rounded-lg text-white transition-all backdrop-blur">
              <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${isLiked ? 'fill-red-400 text-red-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Right Image - Responsive and hidden on smaller screens */}
        <div className="w-full xl:w-1/2 hidden lg:block max-w-2xl">
          <div className="relative group">
            <div className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all"></div>
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
              <img src={getImageUrl()} alt={blog.blog_Title} className="w-full h-64 sm:h-80 lg:h-96 object-cover transition-transform duration-500 group-hover:scale-105" onError={onImgError} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;