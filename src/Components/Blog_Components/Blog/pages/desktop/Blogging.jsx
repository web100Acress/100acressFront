import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Actual_Components/Footer";
import { PaginationControls, BlogPaginationControls } from "../Components/Blog_Components/BlogManagement";
import { Helmet } from "react-helmet";
import Free from "./Free";
import api from "../../../../../config/apiClient";

// Brand colors and tagline
const BRAND_RED = '#b8333a';
const DARK_TEXT = '#333';
const TAGLINE = "Insights, Updates, and Stories from the World of Real Estate";
const FEATURED_BLOG_ID = "replace_with_featured_blog_id"; // Set your featured blog _id here

const getMeta = (blog) => {
  let meta = [];
  if (blog.blog_Category) meta.push(blog.blog_Category);
  if (blog.sector) meta.push(blog.sector);
  if (blog.location) meta.push(blog.location);
  return meta.join(" | ");
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

// Prefer slug-based blog link with fallback to legacy title/id route
const blogLink = (blog) => {
  if (blog?.slug) return `/blog/${blog.slug}`;
  return `/blog/${getSlug(blog.blog_Title)}/${blog._id}`;
};

// Funnel SVG icon
const FunnelIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h18m-16.5 0a.75.75 0 01.75-.75h13.5a.75.75 0 01.75.75m-16.5 0v2.25c0 .414.336.75.75.75h15a.75.75 0 00.75-.75V4.5m-16.5 0L9.75 13.5v5.25a.75.75 0 00.75.75h3a.75.75 0 00.75-.75V13.5L20.25 4.5" />
  </svg>
);

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
        // Use backend pagination instead of fetching all blogs
        const params = {
          page: currentPage,
          limit: postsPerPage,
          sortBy: 'createdAt',
          sortOrder: 'desc'
        };

        // Add search parameter if there's a search term
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

  // Featured blog: by ID, then isFeatured, then first
  const featuredBlog = useMemo(() =>
    allBlogs.find((b) => b._id === FEATURED_BLOG_ID) ||
    allBlogs.find((b) => b.isFeatured) ||
    allBlogs[0],
    [allBlogs]
  );
  // Filtered blogs (excluding featured)
  const filteredBlogs = useMemo(() => {
    let blogs = allBlogs.filter((b) => b !== featuredBlog);
    // Sort client-side for now (can be moved to backend later)
    if (sort === "latest")
      blogs = blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (sort === "oldest")
      blogs = blogs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    if (sort === "popular")
      blogs = blogs; // Add your own popularity sort logic if available
    return blogs;
  }, [allBlogs, featuredBlog, sort]);

  // Pagination logic (now handled by backend)
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [totalPages]);

  const paginatedBlogs = useMemo(() => {
    // Since we're using backend pagination, all blogs are already paginated
    return filteredBlogs;
  }, [filteredBlogs]);

  // Fill last row with placeholders if needed
  const columns = 3; // for desktop
  const remainder = paginatedBlogs.length % columns;
  const placeholders = remainder === 0 ? 0 : columns - remainder;

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-white font-['Poppins','Inter',sans-serif]">
      <Helmet>
        <meta
          name="description"
          content="Discover the latest insights, tips, and Expert guidance on real estate trends, investment strategies, and property management on our blog at 100acress.com. Stay informed!"
        />
        <title>Blog | Expert Guidance on Real Estate | 100acress.com</title>
        <link rel="canonical" href="https://www.100acress.com/blog/" />
      </Helmet>
      {/* Modern Brand-Aligned Title */}
      <div className="max-w-7xl mx-auto px-4 pt-12 pb-6 mt-10">
        <div className="flex flex-col items-center justify-center">
          <h1
            className="text-center font-['Poppins','Inter',sans-serif] font-bold md:text-[36px] text-[28px] leading-tight mb-2 tracking-tight animate-fadeIn"
            style={{ letterSpacing: '-0.5px' }}
          >
            <span style={{ color: BRAND_RED, fontWeight: 800 }}>100acress</span>
            <span style={{ color: DARK_TEXT, fontWeight: 500 }}> Blogs</span>
          </h1>
          {/* Gradient underline */}
          <div className="w-32 h-1 rounded-full mx-auto mb-2" style={{ background: 'linear-gradient(90deg, #f5e9e0 0%, #e0e7ef 100%)' }} />
          <div className="text-gray-500 text-sm text-center max-w-xl animate-fadeIn delay-100">
            {TAGLINE}
          </div>
        </div>
      </div>
      {/* Mobile Filter Toggle (Funnel Icon) */}
      <div className="max-w-7xl mx-auto px-4 mb-4 md:hidden flex justify-end">
        <button
          className="bg-primaryRed text-white rounded-full p-3 shadow hover:bg-red-700 transition flex items-center justify-center"
          aria-label="Show search and filter"
          onClick={() => setShowMobileFilters((v) => !v)}
        >
          <FunnelIcon />
        </button>
      </div>
      {/* Modern Search Bar & Sort Dropdown */}
      <div className="max-w-7xl mx-auto px-4 mb-6 w-full">
        {/* Desktop/Tablet: always show search/sort */}
        <div className="w-full hidden md:flex flex-row gap-3 items-center">
          <div className="relative flex-1 w-full">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search blogs..."
              className="w-full pl-12 pr-10 py-3 rounded-full border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-[#999] font-['Poppins','Inter',sans-serif] text-base focus:outline-none focus:ring-2 focus:ring-[#b8333a] focus:border-[#b8333a] transition-all duration-200"
              style={{ fontSize: 16 }}
            />
            {/* Clear button */}
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#b8333a] transition"
                aria-label="Clear search"
              >
                &#10005;
              </button>
            )}
          </div>
          <select
            className="px-4 py-3 rounded-full border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 font-['Poppins','Inter',sans-serif] text-base focus:outline-none focus:ring-2 focus:ring-[#b8333a] focus:border-[#b8333a] transition-all duration-200"
            style={{ fontSize: 16, minWidth: 120 }}
            value={sort}
            onChange={e => setSort(e.target.value)}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="popular">Popular</option>
          </select>
        </div>
        {/* Mobile: show search/sort only if showMobileFilters is true */}
        {showMobileFilters && (
          <div className="flex flex-col gap-3 md:hidden bg-white/90 p-4 rounded-xl shadow-md animate-fadeIn">
            <div className="relative flex-1 w-full">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search blogs..."
                className="w-full pl-12 pr-10 py-3 rounded-full border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-[#999] font-['Poppins','Inter',sans-serif] text-base focus:outline-none focus:ring-2 focus:ring-[#b8333a] focus:border-[#b8333a] transition-all duration-200"
                style={{ fontSize: 16 }}
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#b8333a] transition"
                  aria-label="Clear search"
                >
                  &#10005;
                </button>
              )}
            </div>
            <select
              className="px-4 py-3 rounded-full border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 font-['Poppins','Inter',sans-serif] text-base focus:outline-none focus:ring-2 focus:ring-[#b8333a] focus:border-[#b8333a] transition-all duration-200"
              style={{ fontSize: 16, minWidth: 120 }}
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
      {/* Featured Blog */}
      {featuredBlog && (
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <div className="bg-white rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden group hover:shadow-2xl transition">
            <Link
              to={blogLink(featuredBlog)}
              className="md:w-1/2 w-full h-64 md:h-80 overflow-hidden"
            >
              <img
                src={featuredBlog.blog_Image?.url}
                alt={featuredBlog.blog_Title}
                className="w-full h-full object-cover group-hover:scale-105 transition"
                onError={onImgError}
              />
            </Link>
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <span className="inline-block bg-primaryRed text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
                  Featured
                </span>
                <h2 className="text-2xl font-bold mb-2 line-clamp-2">
                  {featuredBlog.blog_Title}
                </h2>
                <div className="text-xs text-gray-500 mb-2">
                  {getMeta(featuredBlog)}
                  {featuredBlog.createdAt && (
                    <>
                      {getMeta(featuredBlog) && " | "}
                      {new Date(featuredBlog.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </>
                  )}
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {featuredBlog.blog_Description?.replace(/<[^>]+>/g, "").slice(0, 180)}
                  {featuredBlog.blog_Description?.length > 180 ? "..." : ""}
                </p>
              </div>
              <Link
                to={blogLink(featuredBlog)}
              >
                <button className="bg-primaryRed text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-red-700 transition">
                  Read More
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-start auto-rows-auto">
        {loading ? (
          <div className="col-span-full text-center py-10 text-gray-400 text-lg">Loading...</div>
        ) : allBlogs.length === 0 ? (
          <div className="col-span-full text-center py-10 text-gray-400 text-lg">No blogs found.</div>
        ) : paginatedBlogs.length === 0 ? (
          // When there is a featured post but no additional posts to list, do not show an empty message
          null
        ) : (
          <>
            {paginatedBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden hover:shadow-2xl hover:scale-[1.03] transition"
              >
                <Link
                  to={blogLink(blog)}
                  className="block w-full aspect-video overflow-hidden"
                >
                  <img
                    src={blog.blog_Image?.url}
                    alt={blog.blog_Title}
                    className="w-full h-full object-cover"
                    onError={onImgError}
                  />
                </Link>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold mb-1 line-clamp-2">
                    {blog.blog_Title}
                  </h3>
                  <div className="text-xs text-gray-500 mb-2">
                    {getMeta(blog)}
                    {blog.createdAt && (
                      <>
                        {getMeta(blog) && " | "}
                        {new Date(blog.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {blog.blog_Description?.replace(/<[^>]+>/g, "").slice(0, 120)}
                    {blog.blog_Description?.length > 120 ? "..." : ""}
                  </p>
                  <Link
                    to={blogLink(blog)}
                    className="mt-auto"
                  >
                    <button className="w-full bg-primaryRed text-white py-2 rounded-lg font-semibold shadow hover:bg-red-700 transition">
                      Read More
                    </button>
                  </Link>
                </div>
              </div>
            ))}
            {/* Placeholders to fill last row */}
            {Array.from({ length: placeholders }).map((_, i) => (
              <div key={`placeholder-${i}`} className="invisible" />
            ))}
          </>
        )}
      </div>
      {/* Pagination/Load More */}
      <div className="flex justify-center my-8">
        <BlogPaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <Free />
      <Footer />
    </div>
  );
};

export default Blogging;
