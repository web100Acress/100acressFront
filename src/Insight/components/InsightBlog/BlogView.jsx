import React, { useMemo, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  Eye,
  Calendar,
  User,
  Tag,
  Share2,
  Bookmark,
  CheckCircle2,
  MessageSquare,
  Heart,
  Zap,
  TrendingUp,
  Copy,
  Check
} from 'lucide-react';
import api from '../../../config/apiClient';
import DOMPurify from 'dompurify';

const BlogView = () => {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Scroll Progress Logic
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true);
      try {
        let response;
        if (slug) {
          response = await api.get(`blog/by-slug/${encodeURIComponent(slug)}`);
        } else if (id) {
          response = await api.get(`blog/view/${encodeURIComponent(id)}`);
        }

        if (response.data?.data) {
          setData(response.data.data);
        } else {
          setLoadError("Blog post not found");
        }
      } catch (error) {
        setLoadError("Failed to load blog post");
      } finally {
        setTimeout(() => setIsLoading(false), 800);
      }
    };

    if (id || slug) {
      fetchBlog();
    }
  }, [id, slug]);

  // Fetch related blogs
  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const response = await api.get('blog/view', {
          params: { limit: 4, sortBy: 'createdAt', sortOrder: 'desc' }
        });
        if (response?.data?.data) {
          const filtered = response.data.data.filter(b => b._id !== (data?._id || id)).slice(0, 3);
          setRelatedBlogs(filtered);
        }
      } catch (error) {
        console.error('Error fetching related blogs:', error);
      }
    };
    if (data?._id || id) fetchRelated();
  }, [data?._id, id]);

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    if (Number.isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: data?.blog_Title,
        text: data?.metaDescription || data?.blog_Description?.substring(0, 160),
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    }
  };

  const getReadingTime = (description) => {
    const words = description?.replace(/<[^>]*>/g, "").split(" ").length || 0;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min`;
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  // Enhanced Skeleton Loader
  const Skeleton = () => (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        {/* Back Button Skeleton */}
        <div className="w-32 h-8 bg-slate-200 rounded-xl animate-pulse mb-10"></div>

        {/* Title Skeleton */}
        <div className="space-y-4 mb-12">
          <div className="w-full h-14 bg-slate-200 rounded-2xl animate-pulse"></div>
          <div className="w-5/6 h-14 bg-slate-200 rounded-2xl animate-pulse"></div>
        </div>

        {/* Meta Info Skeleton */}
        <div className="flex gap-4 mb-16 flex-wrap">
          <div className="w-32 h-6 bg-slate-200 rounded-lg animate-pulse"></div>
          <div className="w-32 h-6 bg-slate-200 rounded-lg animate-pulse"></div>
          <div className="w-32 h-6 bg-slate-200 rounded-lg animate-pulse"></div>
        </div>

        {/* Featured Image Skeleton */}
        <div className="w-full h-96 bg-slate-200 rounded-3xl animate-pulse mb-12"></div>

        {/* Content Skeleton */}
        <div className="space-y-3">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`h-4 bg-slate-100 rounded animate-pulse ${i === 7 ? 'w-5/6' : 'w-full'}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );

  if (isLoading) return <Skeleton />;

  if (loadError || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-red-100 text-red-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
            <ArrowLeft className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Article Not Found</h1>
          <p className="text-slate-600 mb-10 leading-relaxed">
            {loadError || "We couldn't find the article you're looking for. It may have been removed or moved."}
          </p>
          <button
            onClick={() => navigate('/insights/blog')}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-red-200 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Explore Our Library
          </button>
        </div>
      </div>
    );
  }

  const blogImage = data.blog_Image?.cdn_url || data.blog_Image?.url || data.blog_Image?.Location || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&h=900&fit=crop';

  return (
    <div className="min-h-screen bg-white selection:bg-red-100 selection:text-red-900">
      {/* Animated Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-slate-100">
        <div
          className="h-full bg-gradient-to-r from-red-500 via-red-600 to-red-700 transition-all duration-300 ease-out shadow-lg"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Back Button */}
          <button
            onClick={() => navigate('/insights/blog')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 font-semibold transition-all duration-300 group active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="hidden sm:inline text-sm">Back</span>
          </button>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {copyFeedback ? (
              <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 text-emerald-700 rounded-xl font-medium text-sm">
                <Check className="w-4 h-4" />
                <span className="hidden sm:inline">Copied!</span>
              </div>
            ) : (
              <button
                onClick={handleShare}
                className="p-2.5 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 active:scale-95"
                title="Share Article"
              >
                <Share2 className="w-5 h-5" />
              </button>
            )}

            <button
              onClick={toggleBookmark}
              className={`p-2.5 rounded-xl transition-all duration-300 active:scale-95 ${isBookmarked
                ? 'bg-red-100 text-red-600'
                : 'text-slate-600 hover:text-red-600 hover:bg-red-50'
                }`}
              title="Save Article"
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="space-y-8">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-red-200">
              {data.blog_Category || 'Research'}
            </span>
            <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200/50 font-semibold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              Verified
            </div>
          </div>

          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight max-w-4xl">
              {data.blog_Title}
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
              {data.metaDescription || data.blog_Description?.replace(/<[^>]*>/g, '').substring(0, 150)}
            </p>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-slate-200">
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white shadow-lg">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">By</p>
                <p className="text-slate-900 font-bold">{data.author || '100acres Insights'}</p>
              </div>
            </div>

            <div className="hidden sm:block w-px h-8 bg-slate-200"></div>

            {/* Published Date */}
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-1">Published</p>
              <div className="flex items-center gap-2 text-slate-900 font-semibold">
                <Calendar className="w-4 h-4 text-red-600" />
                <span>{formatDate(data.createdAt)}</span>
              </div>
            </div>

            {/* Reading Time */}
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-1">Reading Time</p>
              <div className="flex items-center gap-2 text-slate-900 font-semibold">
                <Clock className="w-4 h-4 text-red-600" />
                <span>{getReadingTime(data.blog_Description)} read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
          <img
            src={blogImage}
            alt={data.blog_Title}
            className="w-full aspect-[2/1] object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <article
          className="prose prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-slate-900 prose-headings:tracking-tight
            prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b prose-h2:border-slate-200
            prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-4
            prose-p:text-slate-700 prose-p:leading-[1.8] prose-p:mb-8 prose-p:text-lg
            prose-a:text-red-600 prose-a:font-semibold hover:prose-a:text-red-700
            prose-ul:bg-gradient-to-b prose-ul:from-slate-50 prose-ul:to-slate-100/50 prose-ul:p-8 prose-ul:rounded-2xl prose-ul:my-10 prose-ul:list-none prose-ul:border prose-ul:border-slate-200
            prose-li:text-slate-700 prose-li:font-medium prose-li:mb-3 prose-li:before:content-['→'] prose-li:before:text-red-600 prose-li:before:mr-4 prose-li:before:font-bold
            prose-blockquote:border-l-4 prose-blockquote:border-red-600 prose-blockquote:bg-red-50 prose-blockquote:p-8 prose-blockquote:rounded-r-2xl prose-blockquote:italic prose-blockquote:text-red-900 prose-blockquote:text-lg prose-blockquote:my-10
            prose-strong:text-slate-900 prose-strong:font-bold
            prose-code:bg-slate-900 prose-code:text-slate-100 prose-code:px-3 prose-code:py-1 prose-code:rounded-lg prose-code:font-mono prose-code:text-sm
            prose-img:rounded-2xl prose-img:shadow-xl prose-img:my-10"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.blog_Content || data.blog_Description) }}
        />

        {/* Tags Section */}
        {data.tags && data.tags.length > 0 && (
          <div className="mt-20 pt-12 border-t border-slate-200">
            <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
              Tags
            </h3>
            <div className="flex flex-wrap gap-3">
              {data.tags.map((tag) => (
                <button
                  key={tag}
                  className="px-5 py-2.5 bg-white border border-slate-200 hover:border-red-300 text-slate-700 hover:text-red-600 rounded-xl text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-300 active:scale-95 hover:bg-red-50"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Engagement Section */}
        <div className="mt-16 p-8 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="flex flex-wrap gap-8 justify-center sm:justify-start">
            <button className="flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 rounded-xl hover:border-red-300 hover:text-red-600 font-semibold transition-all active:scale-95">
              <Heart className="w-5 h-5" />
              <span className="hidden sm:inline">Like</span>
            </button>
            <button className="flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 rounded-xl hover:border-red-300 hover:text-red-600 font-semibold transition-all active:scale-95">
              <MessageSquare className="w-5 h-5" />
              <span className="hidden sm:inline">Comment</span>
            </button>
            <button className="flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 rounded-xl hover:border-red-300 hover:text-red-600 font-semibold transition-all active:scale-95">
              <Share2 className="w-5 h-5" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>

        {/* Author Card */}
        <section className="mt-20 p-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600 opacity-5 blur-[120px] -mr-40 -mt-40 group-hover:opacity-10 transition-opacity duration-500"></div>

          <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <div className="w-28 h-28 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center shadow-2xl flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300">
              <User className="w-14 h-14 text-white" />
            </div>

            {/* Content */}
            <div className="text-center md:text-left space-y-4 flex-1">
              <div>
                <p className="text-red-400 text-xs font-bold uppercase tracking-widest mb-2">Content Creator</p>
                <h3 className="text-3xl font-bold tracking-tight">{data.author || '100acres Insights'}</h3>
              </div>
              <p className="text-slate-300 leading-relaxed max-w-xl">
                Our research team specializes in market intelligence and data-driven perspectives to help you make informed decisions.
              </p>
              <button className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-semibold transition-all active:scale-95 text-white">
                <span>View Profile</span>
                <ArrowLeft className="w-4 h-4 rotate-180 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Related Articles */}
      {relatedBlogs.length > 0 && (
        <section className="bg-gradient-to-b from-slate-50 to-white py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="mb-16">
              <h2 className="text-sm font-bold text-red-600 uppercase tracking-widest mb-3">Read Next</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-8">
                Keep learning.
              </h3>
              <p className="text-lg text-slate-600 max-w-2xl">
                Explore more articles and insights to stay ahead of market trends.
              </p>
            </div>

            {/* Related Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedBlogs.map((blog) => (
                <article
                  key={blog._id}
                  onClick={() => {
                    navigate(`/insights/blog/${blog._id}`);
                    window.scrollTo(0, 0);
                  }}
                  className="group cursor-pointer flex flex-col h-full rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                    <img
                      src={blog.blog_Image?.cdn_url || blog.blog_Image?.url || blog.blog_Image?.Location || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=450&fit=crop'}
                      alt={blog.blog_Title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="absolute top-4 right-4 px-3 py-1.5 bg-white/95 backdrop-blur text-xs font-bold text-slate-900 rounded-lg shadow-md">
                      {blog.blog_Category || 'Market'}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h4 className="text-xl font-bold text-slate-900 group-hover:text-red-600 transition-colors mb-3 leading-tight line-clamp-2">
                      {blog.blog_Title}
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-4 flex-grow">
                      {(blog.blog_Description || blog.metaDescription)?.replace(/<[^>]*>/g, '').substring(0, 100)}...
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" />
                        {getReadingTime(blog.blog_Description)}
                      </span>
                      <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all transform group-hover:translate-x-1 font-bold">
                        →
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* View All Button */}
            <div className="mt-16 flex justify-center">
              <button
                onClick={() => navigate('/insights/blog')}
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-red-200 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 text-lg"
              >
                Explore Full Library
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogView;