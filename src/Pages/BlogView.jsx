import React, { useContext, useEffect, useState, useRef } from "react";
import Footer from "../Components/Actual_Components/Footer";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import api from "../config/apiClient";
import { API_ROUTES } from "../Redux/utils/Constant_Service";

import { DataContext } from "../MyContext";
import { Helmet } from "react-helmet";
import DOMPurify from 'dompurify';
import "./BlogView.css";
import useIsMobile from '../hooks/useIsMobile';

const BlogView = () => {
  const { allupcomingProject } = useContext(DataContext);
  const [data, setData] = useState({});
  const [trendingProjects, setTrendingProjects] = useState([]);

  const [loadError, setLoadError] = useState("");
  const { id, slug } = useParams();
  const location = useLocation();

  const [buttonText, setButtonText] = useState("Submit");
  const [responseMessage, setResponseMessage] = useState("");
  const [blogQuery, setBlogQuery] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
    status: "",
  });

  const history = useNavigate();
  const isMobile = useIsMobile ? useIsMobile() : false;
  const [showMobileEnquiry, setShowMobileEnquiry] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Safe image fallback for broken S3 URLs
  const FALLBACK_IMG = "/Images/blog.avif";
  const onImgError = (e) => {
    try {
      const img = e?.target;
      if (!img) return;

      // Prevent infinite loop if fallback also fails
      if (img.dataset.fallback) return;

      const fallbackSrc = FALLBACK_IMG.startsWith('http') 
        ? FALLBACK_IMG 
        : `${window.location.origin}${FALLBACK_IMG}`;

      // If we have an alternate candidate stored on element, try it once
      const alt = img.dataset.altSrc;
      if (alt && img.src !== alt) {
        img.src = alt;
        // Clear alt to ensure only a single retry
        delete img.dataset.altSrc;
        return;
      }

      if (img.src !== fallbackSrc) {
        img.dataset.fallback = "1";
        img.src = fallbackSrc;
      }
    } catch (error) {
      console.error('Error in image fallback:', error);
    }
  };

  // Navigate to project detail from Trending Projects
  const navigateProject = (proj) => {
    try {
      if (!proj) return;
      // Prefer canonical project_url used by NewBanner route
      const raw = proj.project_url || proj.pUrl || proj.slug || proj.url || proj.projectSlug || '';
      let slug = raw;
      // If raw looks like a full URL, extract the last path segment
      if (slug && /^(https?:)?\/\//i.test(slug)) {
        try {
          const u = new URL(slug, window.location.origin);
          const parts = u.pathname.split('/').filter(Boolean);
          slug = parts[parts.length - 1] || '';
        } catch (_) { /* ignore */ }
      }
      if (!slug) {
        const name = proj.projectName || proj.name || proj.title || '';
        slug = name
          ? String(name).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
          : '';
      }
      if (!slug) return;
      const path = `/${slug}/`;
      history(path);
      try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (_) {}
    } catch (_) { /* noop */ }
  };

  const resetData = () => {
    setBlogQuery({
      name: "",
      mobile: "",
      email: "",
      message: "",
      status: "",
    });
  };

  // Read id from query string as fallback when using slug-only route
  const getQueryId = () => {
    try {
      const params = new URLSearchParams(location.search || "");
      return params.get("id") || "";
    } catch (_) {
      return "";
    }
  };

  // Navigate to blog detail (used by Recent Posts)
  const handleBlogView = (title, _id, postSlug) => {
    const createSlug = (t) =>
      t ? t.replace(/\s+/g, "-").replace(/[?!,\.;:\{\}\(\)\$\@]+/g, "").toLowerCase() : "blog";
    const path = postSlug ? `/blog/${postSlug}?id=${_id}` : `/blog/${createSlug(title)}/${_id}`;
    history(path);
    try { window.scrollTo({ top: 0, behavior: "smooth" }); } catch (_) {}
  };

  const handleBlogQueryChange = (e) => {
    const { name, value } = e.target;
    setBlogQuery({ ...blogQuery, [name]: value });
  };

  const handleBlogSubmitQueryData = async (e) => {
    e.preventDefault();
    const { name, mobile } = blogQuery;
    if (!name || !mobile) {
      setResponseMessage("Please enter your name and phone number.");
      return;
    }

    setButtonText("Submitting...");
    try {
      await api.post(
        `contact_Insert`,
        blogQuery
      );
      setResponseMessage("Data submitted successfully");
      resetData();
      setButtonText("Submit");
    } catch (error) {
      if (error.response) {
        console.error("Server error:", error.response.data);
      } else if (error.request) {
        console.error("Request error:", error.request);
      } else {
        console.error("Error:", error.message);
      }
      setButtonText("Submit");
    }
  };

  // Normalize blog object from API
  const normalizeBlog = (b) => {
    if (!b) return {};
    
    const obj = (typeof b === 'object') ? b : {};
    const img = obj.blog_Image;
    const isPlaceholder = (u) => typeof u === 'string' && /^data:image\/svg\+xml/i.test(u);
    let normalizedImage = {
      url: '',
      cdn_url: '',
      public_id: '',
      // computed final display URL
      display: ''
    };

    const toHttps = (u) => {
      if (!u) return '';
      if (/^\/\//.test(u)) return 'https:' + u;
      if (/^http:\/\//i.test(u)) return u.replace(/^http:\/\//i, 'https://');
      return u;
    };

    // Handle different image formats
    if (img) {
      if (typeof img === 'object') {
        const rawUrl = img.url || img.Location || '';
        const rawCdn = img.cdn_url || (img.Key ? `https://d16gdc5rm7f21b.cloudfront.net/${img.Key}` : '');
        const cleanedUrl = isPlaceholder(rawUrl) ? '' : toHttps(rawUrl);
        const cleanedCdn = isPlaceholder(rawCdn) ? '' : toHttps(rawCdn);
        normalizedImage = {
          url: cleanedUrl,
          cdn_url: cleanedCdn,
          public_id: img.public_id || img.Key || '',
        };
      } else if (typeof img === 'string') {
        const cleaned = isPlaceholder(img) ? '' : toHttps(img);
        normalizedImage = {
          url: cleaned,
          cdn_url: cleaned && cleaned.includes('cloudfront.net') ? cleaned : '',
          public_id: ''
        };
      }
    }

    // Choose display URL: prefer CDN, then S3/url; ignore placeholders
    normalizedImage.display = normalizedImage.cdn_url || normalizedImage.url || '';

    return {
      blog_Title: obj.blog_Title || '',
      blog_Description: obj.blog_Description || '',
      author: obj.author || '',
      blog_Category: obj.blog_Category || '',
      published_Date: obj.published_Date || obj.createdAt || '',
      blog_Image: normalizedImage,
      createdAt: obj.createdAt || '',
      slug: obj.slug || '',
      _id: obj._id || '',
      // SEO fields (handle multiple possible keys)
      metaTitle: obj.metaTitle || obj.meta_Title || obj.seoTitle || '',
      metaDescription: obj.metaDescription || obj.meta_Description || obj.seoDescription || obj.meta_desc || ''
    };
  };

  // Fetch blog data when component mounts
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoadError("");

        // Prefer explicit id param or ?id, else resolve from slug
        let effectiveId = id || getQueryId();
        if (!effectiveId && slug) {
          try {
            const slugResp = await api.get(`blog/slug/${encodeURIComponent(slug)}`);
            if (slugResp?.data?.data?.exists && slugResp?.data?.data?.id) {
              effectiveId = slugResp.data.data.id;
              // Update URL to include id param for shareability without reload
              try {
                const params = new URLSearchParams(location.search);
                params.set('id', effectiveId);
                const newUrl = `${location.pathname}?${params.toString()}`;
                window.history.replaceState({}, '', newUrl);
              } catch (_) {}
            } else {
              setLoadError('Blog not found');
              return;
            }
          } catch (e) {
            console.warn('[BlogView] Failed to resolve ID from slug:', e?.message || e);
            setLoadError('Blog not found');
            return;
          }
        }

        if (!effectiveId) {
          setLoadError('Blog not found');
          return;
        }

        const response = await api.get(`blog/view/${effectiveId}`);
        if ((response.status === 200 || response.status === 201) && response.data && response.data.data) {
          const normalized = normalizeBlog(response.data.data);
          // Debug: log image fields to diagnose missing image
          try {
            console.log('[BlogView] Raw blog_Image from API:', response.data.data?.blog_Image);
            console.log('[BlogView] Normalized image:', normalized.blog_Image);
          } catch (_) {}
          setData(normalized);
        } else {
          setLoadError("Blog not found");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        setLoadError("Failed to load blog. Please try again later.");
      }
    };

    // Trigger fetch on id, slug, or query changes
    fetchBlogData();
  }, [id, slug, location.search]);

  // Fetch trending projects for sidebar
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const url = `${API_ROUTES.projectsBase()}/trending`;
        const res = await api.get(url, { timeout: 15000 });
        const list = res?.data?.data || [];
        setTrendingProjects(Array.isArray(list) ? list.slice(0, 5) : []);
      } catch (error) {
        console.error("Error fetching trending projects:", error);
        setTrendingProjects([]);
      }
    };
    fetchTrending();
  }, []);

  const createSanitizedHTML = (dirtyHTML) => ({
    __html: DOMPurify.sanitize(dirtyHTML, {
      ALLOWED_TAGS: ['p', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'ul', 'ol', 'li', 'a', 'img', 'br', 'figure', 'figcaption'],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'class', 'style', 'width', 'height', 'title', 'loading', 'decoding', 'srcset', 'sizes', 'data-src', 'referrerpolicy', 'crossorigin'],
      ADD_ATTR: ['srcset', 'sizes', 'data-src', 'referrerpolicy', 'crossorigin'],
      ADD_URI_SAFE_ATTR: ['src', 'href', 'srcset'],
      ALLOW_DATA_ATTR: true,
      ALLOW_UNKNOWN_PROTOCOLS: true,
    })
  });

  // Destructure data properties first
  const {
    blog_Title,
    blog_Description,
    author,
    blog_Category,
    published_Date,
    blog_Image,
    metaTitle,
    metaDescription,
  } = data;

  // Ref to post-process content images (fix lazy attrs, http->https, fallback on error)
  const contentRef = useRef(null);
  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;
    const imgs = root.querySelectorAll('img');
    imgs.forEach((img) => {
      try {
        // Upgrade lazy-loaded images
        if (img.dataset && img.dataset.src && !img.getAttribute('src')) {
          img.setAttribute('src', img.dataset.src);
        }
        if (!img.getAttribute('loading')) img.setAttribute('loading', 'lazy');
        if (!img.getAttribute('referrerpolicy')) img.setAttribute('referrerpolicy', 'no-referrer');
        if (!img.getAttribute('crossorigin')) img.setAttribute('crossorigin', 'anonymous');
        // Upgrade insecure URLs when possible
        const src = img.getAttribute('src') || '';
        if (/^http:\/\//i.test(src)) {
          img.setAttribute('src', src.replace(/^http:\/\//i, 'https://'));
        }
        if (/^\/\//.test(src)) {
          img.setAttribute('src', 'https:' + src);
        }
        // Attach error fallback
        img.onerror = () => {
          img.src = FALLBACK_IMG;
        };
      } catch (_) { /* ignore */ }
    });
  }, [data.blog_Description]);

  // Brand colors
  const BRAND_RED = '#b8333a';
  const DARK_TEXT = '#333';
  const TAGLINE = "Insights, Updates, and Stories from Gurgaon’s Real Estate World";
  

  // Canonical URL: prefer configured domain; include ?id= when present to avoid empty blog cases
  const preferredDomain = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SITE_URL)
    || (typeof window !== 'undefined' && window.location && window.location.origin)
    || 'https://www.100acress.com';
  const domainNoSlash = String(preferredDomain).replace(/\/$/, '');
  const params = new URLSearchParams(location.search || '');
  const idQuery = params.get('id');
  const canonicalUrl = `${domainNoSlash}${location.pathname}${idQuery ? `?id=${encodeURIComponent(idQuery)}` : ''}`;

  const shareTitle = encodeURIComponent((data.metaTitle || blog_Title || '100acress Blog').trim());
  const shareUrl = encodeURIComponent(canonicalUrl);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(canonicalUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 1500);
    } catch (e) {
      // Fallback
      const input = document.createElement('input');
      input.value = canonicalUrl;
      document.body.appendChild(input);
      input.select();
      try { document.execCommand('copy'); } catch (_) {}
      document.body.removeChild(input);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 1500);
    }
  };

  // Compute title and description
  const fallbackTitle = `${blog_Title || ''} ${blog_Category || ''}`.trim();
  const pageTitle = (metaTitle && metaTitle.trim()) || fallbackTitle || 'Blog | 100acress';
  const toPlainText = (html) => {
    if (!html) return '';
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    const text = tmp.textContent || tmp.innerText || '';
    return text.replace(/\s+/g, ' ').trim();
  };
  const fallbackDesc = toPlainText(blog_Description).slice(0, 157);
  const pageDescription = (metaDescription && metaDescription.trim()) || fallbackDesc || 'Explore real estate insights on 100acress.';
  const publishedISO = (published_Date || data.createdAt) ? new Date(published_Date || data.createdAt).toISOString() : '';

  if (loadError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">{loadError}</h2>
          <Link to="/blog" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  if (!data._id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="blog-view bg-gray-50 min-h-screen">
      <Helmet>
        <title>{data.blog_Title || 'Blog Post'}</title>
        <meta name="description" content={data.metaDescription || data.blog_Description?.substring(0, 160)} />
        <meta property="og:title" content={data.blog_Title || 'Blog Post'} />
        <meta property="og:description" content={data.metaDescription || data.blog_Description?.substring(0, 160)} />
        <meta property="og:image" content={data.blog_Image?.display || FALLBACK_IMG} />
        <meta name="twitter:card" content="summary_large_image" />
        {blog_Image?.url && <meta name="twitter:image" content={blog_Image.url} />}
      </Helmet>

      {/* Modern Brand-Aligned Title */}
      <div className="max-w-4xl mx-auto px-4 pt-12 pb-6 mt-10">
        <div className="flex flex-col items-center justify-center">
          <h1
            className="text-center font-['Poppins','Inter',sans-serif] font-bold md:text-[36px] text-[28px] leading-tight mb-2 tracking-tight animate-fadeIn"
            style={{ letterSpacing: '-0.5px' }}
          >
            <span style={{ color: BRAND_RED, fontWeight: 800 }}>100acress</span>
            <span style={{ color: DARK_TEXT, fontWeight: 500 }}> Blog</span>
          </h1>
          {/* Gradient underline */}
          <div className="w-32 h-1 rounded-full mx-auto mb-2" style={{ background: 'linear-gradient(90deg, #f5e9e0 0%, #e0e7ef 100%)' }} />
          <div className="text-gray-500 text-sm text-center max-w-xl animate-fadeIn delay-100">
            {TAGLINE}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 px-4 pb-12">
        {/* Main Blog Content */}
        <div className="w-full md:w-2/3 bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-4 text-sm text-gray-500">
            <Link to="/blog/" className="text-primaryRed hover:underline">Blogs</Link>
            {' > '} {blog_Category || 'Blog'}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] leading-tight mb-3">{blog_Title}</h1>
          {/* Share bar under title */}
          <div className="flex items-center gap-3 mb-4">
            <a
              href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex w-10 h-10 items-center justify-center rounded-full border border-blue-500 text-[#1e90ff] hover:bg-blue-50"
              aria-label="Share on Twitter"
            >
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a
              href={`https://wa.me/?text=${shareTitle}%20${shareUrl}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex w-10 h-10 items-center justify-center rounded-full border border-green-500 text-green-600 hover:bg-green-50"
              aria-label="Share on WhatsApp"
            >
              <i className="fa-brands fa-whatsapp"></i>
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex w-10 h-10 items-center justify-center rounded-full border border-blue-600 text-blue-700 hover:bg-blue-50"
              aria-label="Share on Facebook"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex w-10 h-10 items-center justify-center rounded-full border border-sky-600 text-sky-700 hover:bg-sky-50"
              aria-label="Share on LinkedIn"
            >
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <button
              type="button"
              onClick={copyLink}
              className="inline-flex w-10 h-10 items-center justify-center rounded-full border border-gray-400 text-gray-700 hover:bg-gray-50"
              title={copiedLink ? 'Copied!' : 'Copy link'}
              aria-label="Copy link"
            >
              <i className="fa-solid fa-link"></i>
            </button>
          </div>
          {(blog_Image?.display || FALLBACK_IMG) && (
            <div className="relative w-full h-[500px] mb-6">
              {blog_Image?.display ? (
                <img
                  src={blog_Image.display}
                  alt={blog_Title || 'Blog post image'}
                  className="w-full h-full object-contain rounded-xl"
                  onError={onImgError}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                  data-alt-src={blog_Image?.cdn_url && blog_Image?.url && blog_Image.cdn_url !== blog_Image.url ? (blog_Image.display === blog_Image.cdn_url ? blog_Image.url : blog_Image.cdn_url) : ''}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
            </div>
          )}
          {/* Date and author moved below the featured image */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-gray-500 text-sm">
              {(published_Date || data.createdAt) ? new Date(published_Date || data.createdAt).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric'
              }) : ''}
            </span>
            {author && (
              <span className="text-gray-700 text-sm">By {author}</span>
            )}
          </div>
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primaryRed prose-a:no-underline hover:prose-a:underline"
            ref={contentRef}
            dangerouslySetInnerHTML={createSanitizedHTML(blog_Description)}
          ></div>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-1/3 flex flex-col gap-8">
          {/* Trending Projects */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Trending Projects</h3>
            <div className="space-y-2">
              {trendingProjects.length > 0 && trendingProjects.map((p, idx) => {
                const name = p?.projectName || p?.name || p?.title || 'Project';
                const category = p?.category || p?.projectType || '';
                const img = (() => {
                  // Prefer explicit thumbnail-like fields first
                  const t1 = p?.thumbnailImage?.url || p?.thumbnail?.url || p?.thumb?.url || '';
                  const t2 = p?.thumbnailImage || p?.thumbnail || p?.thumb || '';
                  const fThumb = p?.frontImage?.thumbnail?.url || p?.frontImage?.thumb?.url || '';
                  const fMain = p?.frontImage?.url || '';
                  const c1 = p?.cardImage?.url || p?.cardImage || '';
                  const b1 = p?.bannerImage?.url || p?.bannerImage || '';
                  const any = p?.image || p?.project_Image || '';
                  const fromArray = Array.isArray(p?.images) && p.images.length ? (p.images[0]?.url || p.images[0]) : '';
                  const u = t1 || t2 || fThumb || c1 || fMain || b1 || fromArray || any || '';
                  return /^data:image\/svg\+xml/i.test(u) ? FALLBACK_IMG : (u || FALLBACK_IMG);
                })();
                return (
                  <div
                    key={idx}
                    className="group p-2 rounded-xl hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200 flex items-center gap-2 cursor-pointer"
                    role="button"
                    tabIndex={0}
                    onClick={() => navigateProject(p)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigateProject(p); } }}
                    title={name}
                  >
                    <img
                      src={img}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                      alt={name}
                      onError={onImgError}
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 group-hover:text-primaryRed transition-colors duration-200 line-clamp-2 text-sm">
                        {name}
                      </h4>
                      {category && (
                        <p className="text-xs text-gray-500 mt-1">{category}</p>
                      )}
                    </div>
                  </div>
                );
              })}
              {trendingProjects.length === 0 && (
                <div className="text-sm text-gray-400">No trending projects found.</div>
              )}
            </div>
          </div>
          {/* Enquiry Form: Desktop/Tablet only */}
          {!isMobile && (
            <div className="bg-gradient-to-br from-[#1E526B] to-[#496573] rounded-2xl shadow-xl p-6 text-white sticky top-24">
              <h3 className="text-xl font-bold mb-6 text-center">Enquire Now</h3>
              <form className="space-y-4">
                <div className="relative mb-2">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <input
                    name="name"
                    onChange={handleBlogQueryChange}
                    value={blogQuery.name}
                    placeholder="Your Name *"
                    className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/40 rounded-xl text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-white/60 transition-all duration-200 shadow-sm"
                    type="text"
                  />
                </div>
                <div className="relative mb-2">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  <input
                    name="mobile"
                    value={blogQuery.mobile}
                    onChange={handleBlogQueryChange}
                    placeholder="Phone Number *"
                    className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/40 rounded-xl text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-white/60 transition-all duration-200 shadow-sm"
                    type="tel"
                  />
                </div>
                {responseMessage && (
                  <div className={`text-sm p-3 rounded-lg ${
                    responseMessage.includes("successfully") 
                      ? "bg-green-500/20 text-green-100" 
                      : "bg-red-500/20 text-red-100"
                  }`}>
                    {responseMessage}
                  </div>
                )}
                <button
                  onClick={handleBlogSubmitQueryData}
                  className="w-full py-3 px-6 bg-primaryRed text-white font-bold rounded-xl shadow-md hover:bg-red-700 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primaryRed/50 text-lg"
                >
                  {buttonText}
                </button>
              </form>
            </div>
          )}
        </div>
       {/* Mobile Enquiry Vertical Tab and Panel */}
       {isMobile && (
         <>
           {/* Vertical Tab */}
           <button
             className="fixed top-1/2 right-0 z-50 bg-primaryRed text-white font-bold text-sm px-2 py-3 rounded-l-xl shadow-lg transform -translate-y-1/2 tracking-widest"
             style={{writingMode: 'vertical-rl', textOrientation: 'mixed', letterSpacing: '0.1em', borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px'}}
             onClick={() => setShowMobileEnquiry(true)}
           >
             ENQUIRE
           </button>
           {/* Slide-in Panel */}
           {showMobileEnquiry && (
             <div className="fixed inset-0 z-50 flex justify-end">
               <div className="fixed inset-0 bg-black bg-opacity-40" onClick={() => setShowMobileEnquiry(false)}></div>
               <div className="relative w-full max-w-sm bg-gradient-to-br from-[#1E526B] to-[#496573] text-white p-6 h-full overflow-y-auto animate-slideInRight">
                 <button
                   className="absolute top-4 right-4 text-white text-2xl"
                   onClick={() => setShowMobileEnquiry(false)}
                   aria-label="Close"
                 >
                   &times;
                 </button>
                 <h3 className="text-xl font-bold mb-6 text-center">Enquire Now</h3>
                 <form className="space-y-4">
                   <div className="relative mb-2">
                     <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80">
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                       </svg>
                     </span>
                     <input
                       name="name"
                       onChange={handleBlogQueryChange}
                       value={blogQuery.name}
                       placeholder="Your Name *"
                       className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/40 rounded-xl text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-white/60 transition-all duration-200 shadow-sm"
                       type="text"
                     />
                   </div>
                   <div className="relative mb-2">
                     <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80">
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                       </svg>
                     </span>
                     <input
                       name="mobile"
                       value={blogQuery.mobile}
                       onChange={handleBlogQueryChange}
                       placeholder="Phone Number *"
                       className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/40 rounded-xl text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-white/60 transition-all duration-200 shadow-sm"
                       type="tel"
                     />
                   </div>
                   {responseMessage && (
                     <div className={`text-sm p-3 rounded-lg ${
                       responseMessage.includes("successfully") 
                         ? "bg-green-500/20 text-green-100" 
                         : "bg-red-500/20 text-red-100"
                     }`}>
                       {responseMessage}
                     </div>
                   )}
                   <button
                     onClick={handleBlogSubmitQueryData}
                     className="w-full py-3 px-6 bg-primaryRed text-white font-bold rounded-xl shadow-md hover:bg-red-700 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primaryRed/50 text-lg"
                   >
                     {buttonText}
                   </button>
                 </form>
               </div>
             </div>
           )}
         </>
       )}
      </div>
      <Footer />
    </div>
  );
};

export default BlogView;