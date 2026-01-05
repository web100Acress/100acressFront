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
    <section className="relative h-[65vh] min-h-[500px] bg-gradient-to-br from-slate-900 to-blue-900 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={getImageUrl()} alt={blog.blog_Title} className="w-full h-full object-contain opacity-20" onError={onImgError} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-gray-900/80 to-black/70" />
      </div>  

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 flex flex-col lg:flex-row items-center gap-12">
        
        {/* Left Content */}
        <div className="lg:w-1/2 space-y-6">
          
          {/* Badges */}
          <div className="flex gap-3 flex-wrap">
            <span className="px-4 py-2 bg-blue-500/30 border border-blue-400/50 rounded-lg text-blue-200 text-sm font-medium backdrop-blur">Featured</span>
            {blog.blog_Category && <span className="px-4 py-2 bg-emerald-500/30 border border-emerald-400/50 rounded-lg text-emerald-200 text-sm font-medium backdrop-blur">{blog.blog_Category}</span>}
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-4xl font-semibold text-white leading-tight">{blog.blog_Title}</h1>

          {/* Meta Info */}
          <div className="flex gap-6 text-white/70 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(blog.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>5 min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>{(blog.views || 0).toLocaleString()} views</span>
            </div>
          </div>
          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button onClick={() => window.location.href = blogLink} className="px-8 py-3 bg-white text-slate-900 font-semibold rounded-lg hover:bg-blue-100 transition-all flex items-center gap-2 group">
              <span>Explore Now</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => setIsLiked(!isLiked)} className="p-3 bg-white/20 hover:bg-white/30 border border-white/30 rounded-lg text-white transition-all backdrop-blur">
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-400 text-red-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="lg:w-1/2 hidden lg:block">
          <div className="relative group">
            <div className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all"></div>
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
              <img src={getImageUrl()} alt={blog.blog_Title} className="w-full h-96 object-fill transition-transform duration-500 group-hover:scale-105" onError={onImgError} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;