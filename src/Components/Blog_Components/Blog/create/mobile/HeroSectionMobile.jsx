import React from 'react';
import { Calendar, Clock, Eye, ArrowRight, Heart, Share2 } from 'lucide-react';

const HeroSection = ({ blog = { blog_Title: "Luxury Waterfront Estate", blog_Category: "Premium Properties", blog_Description: "Discover this exquisite luxury property with modern design and stunning views.", views: 1250, createdAt: new Date().toISOString() }, blogLink = "#", FALLBACK_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect fill='%231e293b' width='400' height='400'/%3E%3C/svg%3E" }) => {
  
  const [isLiked, setIsLiked] = React.useState(false);
  const [isShared, setIsShared] = React.useState(false);

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

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: blog.blog_Title,
          text: blog.blog_Description?.replace(/<[^>]*>/g, "").slice(0, 100),
          url: window.location.href
        });
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.log('Share failed:', err);
    }
  };

  return (
    <section className="relative h-[40vh] min-h-[500px] bg-gradient-to-br from-slate-900 to-blue-900 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={getImageUrl()} alt={blog.blog_Title} className="w-full h-full object-cover object-center opacity-20" onError={onImgError} />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-blue-900/70 opacity-20" />
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex relative z-10 max-w-6xl mx-auto px-6 py-32 items-center gap-12">
        
        {/* Left Content */}
        <div className="lg:w-1/2 space-y-6">
          
          {/* Badges */}
          <div className="flex gap-3 flex-wrap">
            <span className="px-4 py-2 bg-blue-500/30 border border-blue-400/50 rounded-lg text-blue-200 text-sm font-medium backdrop-blur">Featured</span>
            {blog.blog_Category && <span className="px-4 py-2 bg-emerald-500/30 border border-emerald-400/50 rounded-lg text-emerald-200 text-sm font-medium backdrop-blur">{blog.blog_Category}</span>}
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">{blog.blog_Title}</h1>

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
            <button onClick={handleShare} className="p-3 bg-white/20 hover:bg-white/30 border border-white/30 rounded-lg text-white transition-all backdrop-blur">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="lg:w-1/2">
          <div className="relative group">
            <div className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all"></div>
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
              <img src={getImageUrl()} alt={blog.blog_Title} className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105" onError={onImgError} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden relative z-10 h-full flex flex-col justify-center px-6 pt-2 pb-2">
        
        <div className="space-y-4 text-center">
          
          {/* Badges */}
          <div className="flex justify-center gap-2 flex-wrap">
            <span className="px-3 py-1.5 bg-blue-500/40 backdrop-blur-lg border border-blue-400/50 rounded-full text-blue-100 text-xs font-semibold">Featured</span>
            {blog.blog_Category && (
              <span className="px-3 py-1.5 bg-emerald-500/40 backdrop-blur-lg border border-emerald-400/50 rounded-full text-emerald-100 text-xs font-semibold">
                {blog.blog_Category}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl font-semibold text-white leading-tight px-1">
            {blog.blog_Title}
          </h1> 

          {/* Meta Info */}
          <div className="flex justify-center gap-6 text-white/70 text-xs overflow-x-auto pb-2">
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(blog.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <Clock className="h-4 w-4" />
              <span>5 min</span>
            </div>
            <div className="flex items-center gap-1 whitespace-nowrap">
              <Eye className="h-4 w-4" />
              <span>{(blog.views || 0).toLocaleString()}</span>
            </div>
          </div>

          {/* Mobile Buttons */}
          <div className="flex flex-col gap-2 pt-1">
            <button 
              onClick={() => window.location.href = blogLink} 
              className="w-full px-6 py-3.5 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-all flex items-center justify-center gap-2 text-base group active:scale-95"
            >
              <span>Read Story</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setIsLiked(!isLiked)} 
                className={`flex-1 p-3.5 backdrop-blur-xl border-2 rounded-full transition-all duration-300 transform active:scale-95 hover:scale-105 shadow-lg hover:shadow-xl ${
                  isLiked 
                    ? 'bg-gradient-to-r from-red-500/30 to-pink-500/30 border-red-400/60 text-red-200 shadow-red-500/25' 
                    : 'bg-white/15 border-white/40 text-white hover:bg-white/25 hover:border-white/60 shadow-white/10'
                }`}
              >
                <Heart className={`h-5 w-5 transition-all duration-300 ${isLiked ? 'fill-red-400 scale-110' : 'hover:scale-110'}`} />
              </button>
              
              <button 
                onClick={handleShare}
                className={`flex-1 p-3.5 backdrop-blur-xl border-2 rounded-full transition-all duration-300 transform active:scale-95 hover:scale-105 shadow-lg hover:shadow-xl ${
                  isShared 
                    ? 'bg-gradient-to-r from-green-500/30 to-emerald-500/30 border-green-400/60 text-green-200 shadow-green-500/25' 
                    : 'bg-white/15 border-white/40 text-white hover:bg-white/25 hover:border-white/60 shadow-white/10'
                }`}
              >
                <Share2 className={`h-5 w-5 transition-all duration-300 ${isShared ? 'fill-green-400 scale-110' : 'hover:scale-110'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;