import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Actual_Components/Footer";
import { PaginationControls, BlogPaginationControls } from "../Components/Blog_Components/BlogManagement";
import { Helmet } from "react-helmet";
import Free from "./Free";
import api from "../config/apiClient";

// Brand colors and design tokens
const COLORS = {
  primary: '#C62828',
  primaryDark: '#B71C1C',
  textDark: '#1A1A1A',
  textLight: '#4B5563',
  bgLight: '#F8F8F8',
  accentBeige: '#f3f1ef',
  white: '#FFFFFF',
  border: '#E5E7EB',
  success: '#10B981',
  warning: '#F59E0B'
};

const TAGLINE = "Insights, Updates, and Stories from the World of Real Estate";
const FEATURED_BLOG_ID = "replace_with_featured_blog_id";

// Architectural line art SVG for header background
const HeaderPattern = () => (
  <svg 
    className="absolute inset-0 w-full h-full text-gray-100 opacity-50" 
    preserveAspectRatio="none" 
    viewBox="0 0 1200 120" 
    fill="currentColor"
  >
    <path d="M0 0v46.29c7 1.4 13.5 4.1 19.4 8.2 11.9 8.4 19.4 22.3 19.4 38.3 0 16.1-7.5 29.9-19.4 38.3-5.9 4.1-12.4 6.8-19.4 8.2V120h120v-9.6c-7-1.4-13.5-4.1-19.4-8.2-11.9-8.4-19.4-22.3-19.4-38.3 0-16.1 7.5-29.9 19.4-38.3 5.9-4.1 12.4-6.8 19.4-8.2V0H0zm240 0v46.29c7 1.4 13.5 4.1 19.4 8.2 11.9 8.4 19.4 22.3 19.4 38.3 0 16.1-7.5 29.9-19.4 38.3-5.9 4.1-12.4 6.8-19.4 8.2V120h120v-9.6c-7-1.4-13.5-4.1-19.4-8.2-11.9-8.4-19.4-22.3-19.4-38.3 0-16.1 7.5-29.9 19.4-38.3 5.9-4.1 12.4-6.8 19.4-8.2V0H240zm240 0v46.29c7 1.4 13.5 4.1 19.4 8.2 11.9 8.4 19.4 22.3 19.4 38.3 0 16.1-7.5 29.9-19.4 38.3-5.9 4.1-12.4 6.8-19.4 8.2V120h120v-9.6c-7-1.4-13.5-4.1-19.4-8.2-11.9-8.4-19.4-22.3-19.4-38.3 0-16.1 7.5-29.9 19.4-38.3 5.9-4.1 12.4-6.8 19.4-8.2V0H480z"></path>
  </svg>
);

// Search icon component
const SearchIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

// Funnel icon component
const FunnelIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
);

const getMeta = (blog) => {
  let meta = [];
  if (blog.blog_Category) meta.push(blog.blog_Category);
  if (blog.sector) meta.push(blog.sector);
  if (blog.location) meta.push(blog.location);
  return meta.join(" | ");
};

const getSlug = (title) =>
  title.replace(/\s+/g, "-").replace(/[?!,\.;:\{\}\(\)\$\@]+/g, "").toLowerCase();

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const BlogCard = ({ blog, isFeatured = false, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => setImageError(true);

  const authorInitials = blog.author?.name 
    ? blog.author.name.split(' ').map(n => n[0]).join('').toUpperCase()
    : 'AU';

  // Generate a consistent color based on author name for avatar
  const getAuthorColor = (name) => {
    if (!name) return 'bg-rose-500';
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500',
      'bg-indigo-500', 'bg-teal-500', 'bg-orange-500', 'bg-amber-500'
    ];
    const hash = name.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    return colors[hash % colors.length];
  };

  const authorColor = getAuthorColor(blog.author?.name || blog.author);
  
  // Use a consistent color scheme for all cards
  const cardColors = {
    gradient: 'from-rose-500 via-red-500 to-orange-500',
    solid: 'bg-rose-500'
  };

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 0.08}s both`
      }}
    >
      {/* Main Card with Glass Effect */}
      <div className={`relative h-full bg-white rounded-3xl overflow-hidden transition-all duration-500 ${
        isHovered ? 'shadow-2xl -translate-y-2' : 'shadow-lg'
      }`}>
        
        {/* Animated Gradient Border */}
        <div className={`absolute inset-0 bg-gradient-to-r ${cardColors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} 
             style={{ padding: '2px' }}>
          <div className="h-full w-full bg-white rounded-3xl"></div>
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10">
          {/* Image Container with Overlay Effects */}
          <div className="relative overflow-hidden aspect-[16/10]">
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${cardColors.gradient} opacity-20`}></div>
            
            {!imageError ? (
              <>
                <img
                  src={blog.blog_Image?.url || '/images/placeholder-blog.jpg'}
                  alt={blog.blog_Title}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    isHovered ? 'scale-110 blur-[2px]' : 'scale-100'
                  }`}
                  onError={handleImageError}
                  loading="lazy"
                />
                
                {/* Animated Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500 ${
                  isHovered ? 'opacity-100' : 'opacity-70'
                }`}></div>
              </>
            ) : (
              <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${cardColors.gradient}`}>
                <div className="text-center p-6">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center bg-white/20 backdrop-blur-sm">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-white text-sm font-medium">Image not available</span>
                </div>
              </div>
            )}
            
            {/* Category Badge - Floating */}
            {getMeta(blog) && (
              <div className="absolute top-4 left-4 z-30">
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r ${cardColors.gradient} backdrop-blur-md shadow-lg transform transition-all duration-300 ${
                  isHovered ? 'scale-110 shadow-2xl' : ''
                }`}>
                  {getMeta(blog).split(' | ')[0]}
                </div>
              </div>
            )}
            
            {/* Featured Badge */}
            {isFeatured && (
              <div className="absolute top-4 right-4 z-30">
                <div className="inline-flex items-center px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 text-gray-900 backdrop-blur-md shadow-lg transform transition-all duration-300 hover:scale-110">
                  <svg className="w-3.5 h-3.5 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Featured
                </div>
              </div>
            )}
            
            {/* Bottom Overlay Info */}
            <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
              <div className={`flex items-center justify-between text-white text-xs transition-all duration-500 ${
                isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <div className="flex items-center space-x-4">
                  <span className="flex items-center bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full">
                    <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {Math.ceil((blog.blog_Description || '').length / 200) || 5} min
                  </span>
                  <span className="flex items-center bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full">
                    <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {Math.floor(Math.random() * 500) + 100}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="p-6">
            {/* Title with Gradient on Hover */}
            <h3 className={`text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight transition-all duration-300 ${
              isHovered ? `bg-gradient-to-r ${cardColors.gradient} bg-clip-text text-transparent` : ''
            }`}>
              {blog.blog_Title}
            </h3>
            
            {/* Author Info - Simplified */}
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span className="font-medium text-gray-700">{blog.author?.name || blog.author || 'Author'}</span>
              <span className="mx-2">•</span>
              <span>{formatDate(blog.createdAt)}</span>
              <span className="mx-2">•</span>
              <span>{Math.floor(Math.random() * 5) + 5} min read</span>
            </div>
            
            {/* Footer with Icons and CTA */}
            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
              <div className="flex items-center space-x-3 text-xs text-gray-500">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  {Math.floor(Math.random() * 3) + 2} tags
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  {Math.floor(Math.random() * 20) + 5}
                </span>
              </div>
              
              <Link 
                to={blogLink(blog)}
                className={`group/btn inline-flex items-center px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-md hover:shadow-lg hover:scale-105`}
              >
                Read More
                <svg 
                  className={`w-4 h-4 ml-2 transition-transform duration-300 ${
                    isHovered ? 'translate-x-1' : ''
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Shine Effect on Hover */}
        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none`}
             style={{
               transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
               transition: 'transform 0.7s ease-in-out'
             }}></div>
      </div>
    </div>
  );
};

// Prefer slug-based blog link with fallback to legacy title/id route
const blogLink = (blog) => {
  if (blog?.slug) return `/blog/${blog.slug}?id=${blog._id}`;
  return `/blog/${getSlug(blog.blog_Title)}/${blog._id}`;
};

const Blogging = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(100);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const [loading, setLoading] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Safe image fallback
  const FALLBACK_IMG = "/Images/blog.avif";
  const onImgError = (e) => {
    if (e?.target && e.target.src !== window.location.origin + FALLBACK_IMG && !e.target.dataset.fallback) {
      e.target.dataset.fallback = "1";
      e.target.src = FALLBACK_IMG;
    }
  };

  // Fetch blogs with proper pagination
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const params = {
          page: currentPage,
          limit: postsPerPage,
          sortBy: 'createdAt',
          sortOrder: 'desc'
        };

        if (search && search.trim()) {
          params.search = search.trim();
        }

        const response = await api.get(`blog/view`, { params });

        if (response?.data) {
          const { data: blogs, totalPages: total } = response.data;
          setAllBlogs(Array.isArray(blogs) ? blogs : []);
          setTotalPages(total || 1);
        } else {
          setAllBlogs([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setAllBlogs([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [currentPage, postsPerPage, search]);

  // Featured blog
  const featuredBlog = useMemo(() =>
    allBlogs.find((b) => b._id === FEATURED_BLOG_ID) ||
    allBlogs.find((b) => b.isFeatured) ||
    allBlogs[0],
    [allBlogs]
  );

  // Filtered blogs
  const filteredBlogs = useMemo(() => {
    let blogs = allBlogs.filter((b) => b !== featuredBlog);
    if (sort === "latest")
      blogs = blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (sort === "oldest")
      blogs = blogs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    if (sort === "popular")
      blogs = blogs;
    return blogs;
  }, [allBlogs, featuredBlog, sort]);

  // Pagination logic
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [totalPages]);

  const paginatedBlogs = useMemo(() => {
    return filteredBlogs;
  }, [filteredBlogs]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 font-sans text-gray-800 pt-24 md:pt-28">
      <Helmet>
        <meta
          name="description"
          content="Discover the latest insights, tips, and expert guidance on real estate trends, investment strategies, and property management on our blog at 100acress.com. Stay informed!"
        />
        <title>Blog | Expert Guidance on Real Estate | 100acress.com</title>
        <link rel="canonical" href="https://www.100acress.com/blog/" />
      </Helmet>
      
      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #C62828 0%, #B71C1C 100%);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #B71C1C 0%, #8B0000 100%);
        }
      `}</style>

      {/* Simple Header Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            100 Acres Blog
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Insights, stories, and updates from the 100 Acres team
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        {/* Desktop Search and Filter */}
        <div className="hidden md:block">
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-orange-400 to-amber-400 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search articles, guides, and more..."
                  className="block w-full pl-16 pr-12 py-4 border-0 rounded-full bg-white/95 backdrop-blur-md shadow-2xl focus:ring-2 focus:ring-orange-400 focus:bg-white text-gray-800 placeholder-gray-400 transition-all duration-300 text-base"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap justify-center gap-2">
            {['All', 'Residential', 'Commercial', 'Investment', 'Guides'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearch(tag === 'All' ? '' : tag)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  (search === tag || (tag === 'All' && !search))
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-xl'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Search and Filter */}
        <div className="md:hidden">
          {/* Mobile Filter Toggle */}
          <div className="flex justify-end mb-4">
            <button
              className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center transform hover:scale-110"
              onClick={() => setShowMobileFilters(v => !v)}
              aria-label="Toggle filters"
            >
              <FunnelIcon />
            </button>
          </div>

          {/* Mobile Search Panel */}
          {showMobileFilters && (
            <div className="bg-white p-4 rounded-xl shadow-lg mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search articles..."
                  className="block w-full pl-12 pr-10 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600 transition-colors"
                    aria-label="Clear search"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {['All', 'Residential', 'Commercial', 'Investment', 'Guides'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSearch(tag === 'All' ? '' : tag)}
                    className={`px-4 py-2 rounded-full text-xs font-medium ${
                      (search === tag || (tag === 'All' && !search))
                        ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <select
                className="w-full mt-4 px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={sort}
                onChange={e => setSort(e.target.value)}
              >
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
                <option value="popular">Popular</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Featured Blog with Modern Design */}
      {featuredBlog && (
        <div className="max-w-7xl mx-auto px-4 mb-6">
          <div className="relative bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden group hover:shadow-3xl transition-all duration-500">
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" 
                 style={{ padding: '3px' }}>
              <div className="h-full w-full bg-white rounded-3xl"></div>
            </div>

            <div className="relative z-10 w-full flex flex-col md:flex-row">
              <Link
                to={blogLink(featuredBlog)}
                className="md:w-1/2 w-full h-80 md:h-96 overflow-hidden relative group/img"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 z-10"></div>
                <img
                  src={featuredBlog.blog_Image?.url}
                  alt={featuredBlog.blog_Title}
                  className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700"
                  onError={onImgError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20"></div>
                
                {/* Featured Badge on Image */}
                <div className="absolute top-6 left-6 z-30">
                  <div className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-bold bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 text-gray-900 shadow-xl">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Featured Story
                  </div>
                </div>
              </Link>

              <div className="flex-1 p-8 md:p-10 flex flex-col justify-between">
                <div>
                  {/* Category and Meta */}
                  <div className="flex items-center space-x-3 mb-4">
                    {getMeta(featuredBlog) && (
                      <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-red-500 to-orange-500">
                        {getMeta(featuredBlog).split(' | ')[0]}
                      </span>
                    )}
                    {featuredBlog.createdAt && (
                      <span className="text-sm text-gray-500 font-medium">
                        {new Date(featuredBlog.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    )}
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                    {featuredBlog.blog_Title}
                  </h2>

                  {/* Author and Date */}
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <span className="font-medium text-gray-700">{featuredBlog.author?.name || featuredBlog.author || 'Author'}</span>
                    <span className="mx-2">•</span>
                    <span>
                      {featuredBlog.createdAt && new Date(featuredBlog.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-6 text-base leading-relaxed">
                    {featuredBlog.blog_Description?.replace(/<[^>]+>/g, "").slice(0, 250)}
                    {featuredBlog.blog_Description?.length > 250 ? "..." : ""}
                  </p>
                </div>

                <Link to={blogLink(featuredBlog)}>
                  <button className="group/btn bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center transform hover:scale-105">
                    Read Full Story
                    <svg className="w-5 h-5 ml-2 group-hover/btn:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Blog Grid with Enhanced Cards */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        {loading ? (
          <div className="col-span-full text-center py-20">
            <div className="inline-block w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500 text-lg">Loading amazing content...</p>
          </div>
        ) : allBlogs.length === 0 ? (
          <div className="col-span-full text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-500 text-xl font-medium">No blogs found</p>
            <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
          </div>
        ) : paginatedBlogs.length === 0 ? (
          null
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedBlogs.map((blog, index) => (
              <BlogCard key={blog._id} blog={blog} index={index} />
            ))}
          </div>
        )}
      </div>

      {/* Pagination with Enhanced Design */}
      {!loading && paginatedBlogs.length > 0 && totalPages > 1 && (
        <div className="flex justify-center mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-2">
            <BlogPaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      )}

      <Free />
      <Footer />
    </div>
  );
};

export default Blogging;