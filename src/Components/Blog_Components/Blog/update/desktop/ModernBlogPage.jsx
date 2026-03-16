import React, { useEffect, useState, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import api from "../../../../../config/apiClient";
import HeroSection from "../../create/HeroSectionContainer";
import BlogCard from "../../create/desktop/BlogCard";
import Footer from "../../../../../Home/Footer/CrimsonEleganceFooter";
import GlobalLoadingButton from "../../../../GlobalLoadingButton";

const ModernBlogPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [allBlogs, setAllBlogs] = useState([]);
  const [totalBlogCount, setTotalBlogCount] = useState(0); // Separate state for total count
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreBlogs, setHasMoreBlogs] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const [activeCategory, setActiveCategory] = useState(null);
  const [blogCategories, setBlogCategories] = useState([]);

  // Fallback image
  const FALLBACK_IMG = "/Images/blog.avif";

  // Handle category parameter from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    setActiveCategory(categoryParam);
  }, [location.search]);

  // Load blog categories with counts from database
  useEffect(() => {
    const loadBlogCategories = async () => {
      try {
        // Fetch ALL blogs for accurate category counting
        let allBlogs = [];
        let page = 1;
        let hasMoreData = true;

        while (hasMoreData) {
          const response = await api.get(`blog/view`, {
            params: { limit: 100, page, sortBy: 'createdAt', sortOrder: 'desc' }
          });

          if (response?.data?.data && Array.isArray(response.data.data)) {
            allBlogs = [...allBlogs, ...response.data.data];
            hasMoreData = response.data.data.length === 100;
            page++;
          } else {
            hasMoreData = false;
          }
        }

        // Count blogs per category
        const categoryCounts = {};
        allBlogs.forEach(blog => {
          const category = blog.blog_Category || 'Uncategorized';
          // Only count specified categories
          if (['News', 'Lifestyle', 'Finance', 'Policies'].includes(category)) {
            categoryCounts[category] = (categoryCounts[category] || 0) + 1;
          }
        });

        // Convert to array format
        const categoriesWithCounts = Object.entries(categoryCounts)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count); // Sort by count descending

        setBlogCategories(categoriesWithCounts);
        setTotalBlogCount(allBlogs.length); // Set total count for "All Categories"
        console.log(`📊 Category counts loaded: Total blogs: ${allBlogs.length}, Categories:`, categoriesWithCounts);
      } catch (error) {
        console.error('Failed to load blog categories:', error);
      }
    };
    loadBlogCategories();
  }, []);

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setCurrentPage(1);
      setAllBlogs([]);
      try {
        // Fetch first page for faster loading
        const params = {
          limit: 50, // Increased from 20 for better display while maintaining performance
          page: 1,
          sortBy: 'createdAt',
          sortOrder: 'desc'
        };

        // Add category parameter if there's an active category
        if (activeCategory && activeCategory.trim()) {
          params.category = activeCategory.trim();
        }

        const response = await api.get(`blog/view`, { params });

        if (response?.data?.data && Array.isArray(response.data.data)) {
          const blogs = response.data.data;

          // If API doesn't support category filtering, filter manually
          let filteredBlogs = blogs;
          if (activeCategory && activeCategory.trim()) {
            filteredBlogs = blogs.filter(blog => blog.blog_Category === activeCategory);
          }

          setAllBlogs(filteredBlogs);
          setHasMoreBlogs(blogs.length === 50); // Check if there might be more blogs
        } else {
          setAllBlogs([]);
          setHasMoreBlogs(false);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setAllBlogs([]);
        setHasMoreBlogs(false);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [activeCategory]);

  // Load more blogs function
  const loadMoreBlogs = async () => {
    if (loadingMore || !hasMoreBlogs) return;
    
    setLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const params = {
        limit: 50,
        page: nextPage,
        sortBy: 'createdAt',
        sortOrder: 'desc'
      };

      if (activeCategory && activeCategory.trim()) {
        params.category = activeCategory.trim();
      }

      const response = await api.get(`blog/view`, { params });

      if (response?.data?.data && Array.isArray(response.data.data)) {
        const blogs = response.data.data;
        
        let filteredBlogs = blogs;
        if (activeCategory && activeCategory.trim()) {
          filteredBlogs = blogs.filter(blog => blog.blog_Category === activeCategory);
        }

        setAllBlogs(prev => [...prev, ...filteredBlogs]);
        setCurrentPage(nextPage);
        setHasMoreBlogs(blogs.length === 50);
      } else {
        setHasMoreBlogs(false);
      }
    } catch (error) {
      console.error('Error loading more blogs:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  // Get featured blog (first one or marked as featured) - only when no category filter
  const featuredBlog = useMemo(() => {
    if (activeCategory && activeCategory.trim()) {
      return null; // No featured blog when category is filtered
    }
    return allBlogs.find((b) => b.isFeatured) || allBlogs[0];
  }, [allBlogs, activeCategory]);

  // Filter and sort blogs
  const filteredBlogs = useMemo(() => {
    let blogs = allBlogs;

    // Apply search filter
    if (search && search.trim()) {
      const searchTerm = search.toLowerCase().trim();
      blogs = blogs.filter(blog =>
        (blog.blog_Title && blog.blog_Title.toLowerCase().includes(searchTerm)) ||
        (blog.blog_Content && blog.blog_Content.toLowerCase().includes(searchTerm)) ||
        (blog.blog_Description && blog.blog_Description.toLowerCase().includes(searchTerm)) ||
        (blog.blog_Category && blog.blog_Category.toLowerCase().includes(searchTerm))
      );
    }

    // Only remove featured blog when no category filter is active and no search
    if (!activeCategory && !search && featuredBlog) {
      blogs = blogs.filter((b) => b !== featuredBlog);
    }

    if (sort === "latest")
      blogs = blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (sort === "oldest")
      blogs = blogs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    return blogs;
  }, [allBlogs, featuredBlog, sort, activeCategory, search]);

  // Blog link helper
  const blogLink = (blog) => {
    if (blog?.slug) return `/blog/${blog.slug}/`;
    const slug = (blog.blog_Title || '')
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
    return `/blog/${slug}/${blog._id}/`;
  };


  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Helmet>
        <meta
          name="description"
          content="Read the latest real estate blogs on 100acress.com covering property news, Gurgaon market trends, investment tips, and expert guides for buying and investing in property."
        />
        <title>Real Estate Blog | Property News, Market Trends & Investment Guides</title>
        <link rel="canonical" href="https://www.100acress.com/blog/" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Helmet>

      {/* Hero Section */}
      {featuredBlog && (
        <HeroSection
          blog={featuredBlog}
          blogLink={blogLink(featuredBlog)}
          FALLBACK_IMG={FALLBACK_IMG}
        />
      )}

      {/* Bento Grid Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>
            Explore More Stories
          </h2>
          <p className="text-gray-600 text-lg font-sans max-w-2xl mx-auto">
            Dive deeper into the world of real estate with our curated collection of insights, trends, and expert advice.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Blog Categories - Left Side */}
          <div className="lg:w-1/5">
            <div className="mb-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg
                  className="absolute right-3 top-2.5 h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              {/* Search Box */}


              <div className="mb-4 text-center">
                <h3
                  className="text-xl font-bold text-blue-600 mb-2"
                  style={{ fontFamily: "'Open Sans', sans-serif" }}
                >
                  Blog Categories
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full"></div>
              </div>

              <div className="flex flex-col gap-3 justify-center">
                {/* All Categories Button */}
                <button
                  onClick={() => {
                    setActiveCategory(null);
                    navigate('/blog');
                  }}
                  className={`flex items-center justify-between w-full px-3 py-2 rounded-full border-2 transition-all duration-300 transform hover:scale-105 shadow-sm ${!activeCategory
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                      : 'border-blue-400 bg-blue-50 hover:bg-blue-500 hover:text-white hover:shadow-md'
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full transition-all duration-300 ${!activeCategory
                        ? 'bg-white border-2 border-white'
                        : 'border-2 border-blue-400 group-hover:bg-white'
                      }`}></span>
                    <span className={`text-xs font-medium transition-colors duration-300 ${!activeCategory ? 'text-white' : 'text-gray-700 group-hover:text-white'
                      }`}>
                      All Categories
                    </span>
                  </div>

                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold transition-all duration-300 ${!activeCategory
                      ? 'bg-white text-blue-600'
                      : 'bg-blue-100 text-blue-600'
                    }`}>
                    {totalBlogCount}
                  </span>
                </button>

                {blogCategories.length > 0 ? (
                  blogCategories.map((category) => {
                    const isActive = activeCategory === category.name;
                    return (
                      <button
                        key={category.name || category}
                        onClick={() => {
                          // Filter blogs by category and navigate with filter
                          const categoryName = category.name || category;
                          setActiveCategory(categoryName);
                          navigate(`/blog?category=${encodeURIComponent(categoryName)}`);
                        }}
                        className={`flex items-center justify-between w-full px-3 py-2 rounded-full border-2 transition-all duration-300 transform hover:scale-105 shadow-sm ${isActive
                            ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                            : 'border-blue-400 bg-blue-50 hover:bg-blue-500 hover:text-white hover:shadow-md'
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full transition-all duration-300 ${isActive
                              ? 'bg-white border-2 border-white'
                              : 'border-2 border-blue-400 group-hover:bg-white'
                            }`}></span>
                          <span className={`text-xs font-medium transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-700 group-hover:text-white'
                            }`}>
                            {category.name || category}
                          </span>
                        </div>

                        <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold transition-all duration-300 ${isActive
                            ? 'bg-white text-blue-600'
                            : 'bg-blue-100 text-blue-600'
                          }`}>
                          {category.count}
                        </span>
                      </button>
                    );
                  })
                ) : (
                  <div className="flex justify-center items-center py-6">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500"></div>
                      <p className="text-xs text-gray-500">Loading categories...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* {activeCategory && (
                <div className="mt-4 text-center">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs">
                    <span>Active Filter:</span>
                    <span className="font-semibold">{activeCategory}</span>
                    <button
                      onClick={() => {
                        setActiveCategory(null);
                        navigate('/blog');
                      }}
                      className="ml-2 text-blue-500 hover:text-blue-700 underline text-xs"
                    >
                      Clear
                    </button>
                  </span>
                </div>
              )} */}
            </div>
          </div>

          {/* Blog Cards - Right Side */}
          <div className="lg:w-4/5">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-600"></div>
              </div>
            ) : filteredBlogs.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-600 text-lg">No blogs found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start auto-rows-auto">
                {filteredBlogs.map((blog, index) => (
                  <div
                    key={blog._id}
                  >
                    <BlogCard
                      blog={blog}
                      blogLink={blogLink(blog)}
                      FALLBACK_IMG={FALLBACK_IMG}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Load More Button - Global Component */}
            <GlobalLoadingButton
              isLoading={loadingMore}
              hasMore={hasMoreBlogs}
              onLoadMore={loadMoreBlogs}
              loadedCount={filteredBlogs.length}
              totalCount={totalBlogCount}
              loadingText="Loading more blogs..."
              loadMoreText="Load More Blogs"
              variant="primary"
              size="medium"
              showProgress={true}
            />

          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ModernBlogPage;