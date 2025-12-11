import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import api from "../../config/apiClient";
import HeroSection from "./HeroSection";
import BlogCard from "./BlogCard";
import Header from "./Header";
import CrimsonEleganceFooter from "../Footer/CrimsonEleganceFooter";

const ModernBlogPage = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");

  // Fallback image
  const FALLBACK_IMG = "/Images/blog.avif";

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const params = {
          limit: 50, // Get more blogs for bento grid
          sortBy: 'createdAt',
          sortOrder: 'desc'
        };

        if (search && search.trim()) {
          params.search = search.trim();
        }

        const response = await api.get(`blog/view`, { params });

        if (response?.data?.data) {
          setAllBlogs(Array.isArray(response.data.data) ? response.data.data : []);
        } else {
          setAllBlogs([]);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setAllBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [search]);

  // Get featured blog (first one or marked as featured)
  const featuredBlog = useMemo(() => 
    allBlogs.find((b) => b.isFeatured) || allBlogs[0],
    [allBlogs]
  );

  // Filter and sort blogs
  const filteredBlogs = useMemo(() => {
    let blogs = allBlogs.filter((b) => b !== featuredBlog);
    
    if (sort === "latest")
      blogs = blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (sort === "oldest")
      blogs = blogs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    
    return blogs;
  }, [allBlogs, featuredBlog, sort]);

  // Blog link helper
  const blogLink = (blog) => {
    if (blog?.slug) return `/blog/${blog.slug}`;
    const slug = (blog.blog_Title || '')
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
    return `/blog/${slug}/${blog._id}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Helmet>
        <meta
          name="description"
          content="Discover the latest insights, tips, and expert guidance on real estate trends, investment strategies, and property management on our blog at 100acress.com. Stay informed!"
        />
        <title>Blog | Expert Guidance on Real Estate | 100acress.com</title>
        <link rel="canonical" href="https://www.100acress.com/blog/" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Helmet>

      {/* Header */}
      <Header search={search} setSearch={setSearch} sort={sort} setSort={setSort} />

      {/* Hero Section */}
      {featuredBlog && (
        <HeroSection 
          blog={featuredBlog} 
          blogLink={blogLink(featuredBlog)}
          FALLBACK_IMG={FALLBACK_IMG}
        />
      )}

      {/* Bento Grid Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>
            Explore More Stories
          </h2>
          <p className="text-gray-600 text-lg font-sans max-w-2xl mx-auto">
            Dive deeper into the world of real estate with our curated collection of insights, trends, and expert advice.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-600"></div>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No blogs found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredBlogs.slice(0, 12).map((blog, index) => (
              <div
                key={blog._id}
                className="h-[400px]"
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

        {/* Load More Button */}
        {filteredBlogs.length > 12 && (
          <div className="flex justify-center mt-12">
            <button className="px-8 py-3 bg-white border border-gray-300 rounded-full text-gray-900 font-sans font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 hover:scale-105 shadow-sm">
              Load More Stories
            </button>
          </div>
        )}
      </section>

      {/* Footer */}
      <CrimsonEleganceFooter />
    </div>
  );
};

export default ModernBlogPage;