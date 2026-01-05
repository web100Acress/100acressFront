import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import api from "../../../../../config/apiClient";
import BlogCard from "../../create/desktop/BlogCard";

const AuthorPage = () => {
  const { authorName } = useParams();
  const [author, setAuthor] = useState(null);
  const [authorBlogs, setAuthorBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  // Fallback image
  const FALLBACK_IMG = "/Images/blog.avif";

  // Fetch author details and their blogs
  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        setLoading(true);
        setLoadingBlogs(true);

        // Fetch author's blogs
        const blogsResponse = await api.get(`blog/view`, {
          params: {
            author: decodeURIComponent(authorName),
            sortBy: 'createdAt',
            sortOrder: 'desc',
            limit: 50
          }
        });

        if (blogsResponse?.data?.data) {
          setAuthorBlogs(Array.isArray(blogsResponse.data.data) ? blogsResponse.data.data : []);
          
          // Set author info from first blog (since we don't have separate author API)
          if (blogsResponse.data.data.length > 0) {
            setAuthor({
              name: decodeURIComponent(authorName),
              totalBlogs: blogsResponse.data.data.length,
              avatar: blogsResponse.data.data[0].author || decodeURIComponent(authorName)
            });
          }
        } else {
          setAuthorBlogs([]);
          setAuthor({
            name: decodeURIComponent(authorName),
            totalBlogs: 0,
            avatar: decodeURIComponent(authorName)
          });
        }
      } catch (error) {
        console.error('Error fetching author data:', error);
        setAuthorBlogs([]);
        setAuthor({
          name: decodeURIComponent(authorName),
          totalBlogs: 0,
          avatar: decodeURIComponent(authorName)
        });
      } finally {
        setLoading(false);
        setLoadingBlogs(false);
      }
    };

    if (authorName) {
      fetchAuthorData();
    }
  }, [authorName]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading author details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{author?.name || 'Author'} | 100acress.com</title>
        <meta name="description" content={`Read articles by ${author?.name || 'author'} on 100acress.com blog.`} />
        <link rel="canonical" href={`https://www.100acress.com/author/${encodeURIComponent(author?.name || '')}`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Helmet>

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4">
            <Link to="/blog" className="text-blue-600 hover:text-blue-800 font-medium">
              ← Back to Blog
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar - Author Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              {/* Author Avatar */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white text-2xl font-bold">
                    {author?.avatar?.charAt(0)?.toUpperCase() || "A"}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                  {author?.name}
                </h1>
                <p className="text-gray-600 text-sm mb-4">
                  {author?.totalBlogs || 0} {author?.totalBlogs === 1 ? 'Article' : 'Articles'}
                </p>
              </div>

              {/* Author Stats */}
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                  About the Author
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {author?.name} is a passionate writer sharing insights on real estate, property trends, and market analysis. 
                  With {author?.totalBlogs || 0} published articles, they bring valuable expertise to readers 
                  looking to understand the property market better.
                </p>
              </div>

              {/* Social Links */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                  Connect
                </h3>
                <div className="flex justify-center space-x-3">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${typeof window !== 'undefined' ? window.location.href : ''}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                    title="Share on Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${typeof window !== 'undefined' ? window.location.href : ''}&text=Check out articles by ${author?.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                    title="Share on X"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${typeof window !== 'undefined' ? window.location.href : ''}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
                    title="Share on LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Author's Blogs */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                Articles by {author?.name}
              </h2>
              
              {loadingBlogs ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                </div>
              ) : authorBlogs.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-600 text-lg mb-4">No articles found by this author.</p>
                  <Link 
                    to="/blog" 
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors"
                  >
                    Browse All Articles
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start auto-rows-auto">
                  {authorBlogs.map((blog, index) => (
                    <div key={blog._id}>
                      <BlogCard 
                        blog={blog} 
                        blogLink={blogLink(blog)}
                        FALLBACK_IMG={FALLBACK_IMG}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorPage;
