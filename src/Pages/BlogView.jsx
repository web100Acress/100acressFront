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
  // Cache for related project thumbnails and meta resolved from project details
  const [relatedThumbs, setRelatedThumbs] = useState({});
  const [relatedMeta, setRelatedMeta] = useState({}); // key: project_url -> { location, minPrice, maxPrice }

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
  // Sidebar sticky
  const containerRef = useRef(null);
  const sidebarRef = useRef(null);
  // People are searching (unique phrasing and links)
  const peopleSearch = [
    { label: 'Projects in Gurugram', url: '/projects-in-gurugram' },
    { label: 'Projects in Delhi', url: '/project-in-delhi' },
    { label: 'Projects in Noida', url: '/project-in-noida' },
    { label: 'Property under 1 Cr', url: '/budget-properties' },
    { label: 'Upcoming Projects', url: '/upcoming-projects-in-gurgaon' },
    { label: 'New Launch Projects', url: '/projects-in-newlaunch' },
    { label: 'SEO Plots', url: '/sco/plots' },
    { label: 'Commercial Projects', url: '/projects/commercial/' },
  ];
  const popularTools = [
    { label: 'Post Property', url: '/postproperty' },
    { label: 'EMI Calculator', url: '/emi-calculator/' },
    { label: 'Rent Property', url: '/rental-properties/best-rental-property-in-gurugram' },
    { label: 'Resale Property', url: '/buy-properties/best-resale-property-in-gurugram' },
  ];
  // Lead capture popup modal
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [leadProjectInfo, setLeadProjectInfo] = useState({
    name: '',
    thumbnail: '',
    minPrice: null,
    maxPrice: null,
  });

  // Floating enquiry (bottom-right) collapsible
  const [showFloatingEnquiry, setShowFloatingEnquiry] = useState(true);

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

  // Helper to pick best image from a project payload (same strategy as Trending)
  const pickProjectImage = (p) => {
    try {
      if (!p || typeof p !== 'object') return '';
      const t1 = p?.thumbnailImage?.cdn_url || p?.thumbnailImage?.url || '';
      const t2 = p?.thumbnail?.cdn_url || p?.thumbnail?.url || p?.thumb?.url || '';
      const fThumb = p?.frontImage?.thumbnail?.url || p?.frontImage?.thumb?.url || '';
      const fMain = p?.frontImage?.url || '';
      const c1 = p?.cardImage?.url || p?.cardImage || '';
      const b1 = p?.bannerImage?.url || p?.bannerImage || '';
      const any = p?.image || p?.project_Image || '';
      const fromArray = Array.isArray(p?.images) && p.images.length ? (p.images[0]?.url || p.images[0]) : '';
      const u = t1 || t2 || fThumb || c1 || fMain || b1 || fromArray || any || '';
      return /^data:image\/svg\+xml/i.test(u) ? '' : (u || '');
    } catch (_) {
      return '';
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
      // Build payload with blog and related project context
      const firstProject = Array.isArray(relatedProjects) && relatedProjects.length > 0 ? relatedProjects[0] : null;
      const payload = {
        ...blogQuery,
        blogId: data?._id,
        blogTitle: data?.blog_Title,
        blogSlug: data?.slug,
        source: 'blog-modal',
        project: firstProject ? {
          project_url: firstProject.project_url || '',
          projectName: firstProject.projectName || '',
          thumbnail: firstProject.thumbnail || ''
        } : undefined
      };
      await api.post(`blog/enquiry`, payload);
      setResponseMessage("Enquiry submitted successfully");
      resetData();
      setButtonText("Submit");
      try { setShowLeadModal(false); } catch (_) {}
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
        metaDescription: obj.metaDescription || obj.meta_Description || obj.seoDescription || obj.meta_desc || '',
        // Related projects
        relatedProjects: Array.isArray(obj.relatedProjects) ? obj.relatedProjects : [],
        // FAQs
        enableFAQ: !!obj.enableFAQ,
        faqs: Array.isArray(obj.faqs) ? obj.faqs : []
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
            console.log('[BlogView] Raw relatedProjects from API:', response.data.data?.relatedProjects);
            console.log('[BlogView] Normalized relatedProjects:', normalized.relatedProjects);
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

  // Preload thumbnails for related projects (if missing)
  useEffect(() => {
    const loadThumbs = async () => {
      try {
        const list = Array.isArray(data?.relatedProjects) ? data.relatedProjects : [];
        if (list.length === 0) return;
        const updates = {};
        const metaUpdates = {};
        await Promise.all(
          list.map(async (rp) => {
            try {
              const url = rp?.project_url || '';
              if (!url) return;
              // Determine if we need to fetch details (for image and/or meta)
              const hasThumbInCache = !!relatedThumbs[url];
              const hasThumbInline = !!(rp?.thumbnail && typeof rp.thumbnail === 'string' && rp.thumbnail.trim());
              const hasMetaInCache = !!relatedMeta[url];
              if (hasThumbInCache && hasThumbInline && hasMetaInCache) {
                // Nothing to fetch
                return;
              }
              const apiUrl = `${API_ROUTES.projectsBase()}/View/${encodeURIComponent(url)}`;
              const res = await api.get(apiUrl, { timeout: 15000 });
              const p = res?.data?.data || {};
              const picked = pickProjectImage(p);
              const thumb = picked || (typeof rp?.thumbnail === 'string' ? rp.thumbnail : '');
              if (!hasThumbInCache && thumb && !/^data:image\/svg\+xml/i.test(thumb)) {
                updates[url] = thumb;
              }
              // Capture location and price meta (cover more field variants)
              const loc = p?.location || p?.city || p?.projectLocation || p?.project_location || p?.address || p?.projectAddress || p?.area || p?.sector || '';
              const minP = typeof p?.minPrice === 'number' ? p.minPrice
                           : typeof p?.price?.min === 'number' ? p.price.min
                           : typeof p?.startingPrice === 'number' ? p.startingPrice
                           : null;
              const maxP = typeof p?.maxPrice === 'number' ? p.maxPrice
                           : typeof p?.price?.max === 'number' ? p.price.max
                           : null;
              if (!hasMetaInCache) {
                metaUpdates[url] = { location: loc, minPrice: minP, maxPrice: maxP };
              }
            } catch (_) { /* ignore per-item error */ }
          })
        );
        if (Object.keys(updates).length) {
          setRelatedThumbs((prev) => ({ ...prev, ...updates }));
        }
        if (Object.keys(metaUpdates).length) {
          setRelatedMeta((prev) => ({ ...prev, ...metaUpdates }));
        }
      } catch (_) { /* ignore */ }
    };
    loadThumbs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.relatedProjects]);

  // Timed popup disabled as requested
  // useEffect(() => {
  //   if (!data || !data._id) return; // wait until blog is loaded
  //   const t = setTimeout(() => {
  //     setShowLeadModal(true);
  //   }, 3000);
  //   return () => clearTimeout(t);
  // }, [data?._id]);

  // When modal opens, fetch price/details for the first related project (if available)
  useEffect(() => {
    const loadLeadProject = async () => {
      try {
        if (!showLeadModal) return;
        const rp = Array.isArray(relatedProjects) && relatedProjects.length > 0 ? relatedProjects[0] : null;
        if (!rp || !rp.project_url) return;
        const url = `${API_ROUTES.projectsBase()}/View/${encodeURIComponent(rp.project_url)}`;
        const res = await api.get(url);
        const p = res?.data?.data || {};
        const thumb = p?.thumbnailImage?.cdn_url || p?.thumbnailImage?.url || rp.thumbnail || FALLBACK_IMG;
        setLeadProjectInfo({
          name: p?.projectName || rp.projectName || 'Project',
          thumbnail: /^data:image\/svg\+xml/i.test(thumb) ? FALLBACK_IMG : (thumb || FALLBACK_IMG),
          minPrice: typeof p?.minPrice === 'number' ? p.minPrice : null,
          maxPrice: typeof p?.maxPrice === 'number' ? p.maxPrice : null,
        });
      } catch (e) {
        // fallback to existing rp data
        const rp = Array.isArray(relatedProjects) && relatedProjects.length > 0 ? relatedProjects[0] : null;
        if (rp) {
          setLeadProjectInfo({
            name: rp.projectName || 'Project',
            thumbnail: rp.thumbnail || FALLBACK_IMG,
            minPrice: null,
            maxPrice: null,
          });
        }
      }
    };
    loadLeadProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showLeadModal]);

  // Removed bottom-pinning behavior; using pure CSS sticky instead

  const formatINRShort = (n) => {
    if (typeof n !== 'number' || isNaN(n)) return null;
    // Convert to Lakhs/Crores simple formatter
    if (n >= 10000000) {
      return `₹ ${(n / 10000000).toFixed(2)} Cr`;
    }
    if (n >= 100000) {
      return `₹ ${(n / 100000).toFixed(2)} Lakh`;
    }
    return `₹ ${n.toLocaleString('en-IN')}`;
  };

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
    relatedProjects,
    enableFAQ,
    faqs,
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

      <div ref={containerRef} className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 px-4 pb-12 relative">
        {/* Left Sidebar: show Related Projects first, then Trending */}
        <aside className="w-full md:col-span-3 md:col-start-1">
          <div className="mt-0 p-0 md:sticky md:top-24">
            {/* Related Projects moved to the left sidebar (TOP) */}
            {relatedProjects && relatedProjects.length > 0 && (
              <div className="mb-3">
                <h3 className="text-xl font-bold mb-3 px-3 py-2 rounded-lg text-white bg-gradient-to-r from-red-500 to-red-600 shadow-sm">Related Projects</h3>
                <div className="space-y-2">
                  {relatedProjects.map((project, idx) => {
                    const name = project?.projectName || 'Project';
                    const url = project?.project_url || '';
                    const thumbnail = project?.thumbnail || '';
                    const img = (relatedThumbs[url] || thumbnail || FALLBACK_IMG);

                    const handleProjectClick = () => {
                      try {
                        if (!url) return;
                        let slug = url;
                        if (slug && /^(https?:)?\/\//i.test(slug)) {
                          try {
                            const u = new URL(slug, window.location.origin);
                            const parts = u.pathname.split('/').filter(Boolean);
                            slug = parts[parts.length - 1] || '';
                          } catch (_) { /* ignore */ }
                        }
                        if (!slug) return;
                        const path = `/${slug}/`;
                        history(path);
                        try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (_) {}
                      } catch (_) { /* noop */ }
                    };

                    // compose meta
                    const meta = relatedMeta[url] || {};
                    const priceLine = (() => {
                      const a = typeof meta.minPrice === 'number' ? formatINRShort(meta.minPrice) : null;
                      const b = typeof meta.maxPrice === 'number' ? formatINRShort(meta.maxPrice) : null;
                      if (a && b) return `${a} - ${b} Cr`;
                      if (a || b) return `${a || b} Cr`;
                      return '';
                    })();

                    return (
                      <div
                        key={idx}
                        className="group p-2 flex items-center gap-2 cursor-pointer hover:text-primaryRed border border-red-500 rounded-lg hover:border-red-600 bg-white shadow-sm transition duration-300 hover:[box-shadow:0_4px_12px_rgba(239,68,68,0.4)] hover:-translate-y-0.5"
                        role="button"
                        tabIndex={0}
                        onClick={handleProjectClick}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleProjectClick(); } }}
                        title={name}
                      >
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-200 flex-shrink-0 flex items-center justify-center overflow-hidden">
                          <img
                            src={img}
                            className="w-12 h-12 rounded-lg object-cover"
                            alt={name}
                            onError={onImgError}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 group-hover:text-primaryRed transition-colors duration-200 line-clamp-2 text-sm">
                            {name}
                          </h4>
                          {(() => {
                            // Fallback location from project if meta not loaded yet
                            const fallbackLoc = project?.location || project?.city || '';
                            const showLoc = meta?.location || fallbackLoc || '';
                            return (showLoc || priceLine) ? (
                            <div className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">
                              {showLoc && <span>{showLoc}</span>}
                              {showLoc && priceLine ? <span> • </span> : null}
                              {priceLine && <span>{priceLine}</span>}
                            </div>
                            ) : null;
                          })()}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Trending Projects below Related (hidden on mobile; shown in its own section under content) */}
            <div className="hidden md:block">
            <h3 className="text-xl font-bold mb-3 px-3 py-2 rounded-lg text-white bg-gradient-to-r from-red-500 to-red-600 shadow-sm">Trending Projects</h3>
            <div className="space-y-2">
              {trendingProjects.length > 0 && trendingProjects.map((p, idx) => {
                const name = p?.projectName || p?.name || p?.title || 'Project';
                const category = p?.category || p?.projectType || '';
                const img = (() => {
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
                    className="group p-2 flex items-center gap-2 cursor-pointer hover:text-primaryRed border border-red-500 rounded-lg hover:border-red-600 bg-white shadow-sm transition duration-300 hover:[box-shadow:0_4px_12px_rgba(239,68,68,0.4)] hover:-translate-y-0.5"
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
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 group-hover:text-primaryRed transition-colors duration-200 line-clamp-2 text-sm">
                        {name}
                      </h4>
                      <div className="text-xs text-gray-500 mt-1 line-clamp-1">
                        {/* Prefer location if available */}
                        {p?.location || p?.city ? (
                          <span>{p.location || p.city}</span>
                        ) : (
                          category ? <span>{category}</span> : null
                        )}
                        {/* Price */}
                        {(() => {
                          const a = typeof p?.minPrice === 'number' ? formatINRShort(p.minPrice) : null;
                          const b = typeof p?.maxPrice === 'number' ? formatINRShort(p.maxPrice) : null;
                          const price = a && b ? `${a} - ${b} Cr` : (a || b ? `${a || b} Cr` : '');
                          return price ? <span>{(p?.location || p?.city || category) ? ' • ' : ''}{price}</span> : null;
                        })()}
                      </div>
                    </div>
                  </div>
                );
              })}
              {trendingProjects.length === 0 && (
                <div className="text-sm text-gray-400">No trending projects found.</div>
              )}
            </div>
            </div>
          </div>
        </aside>

        {/* Center: Main Blog Content */}
        <div className="w-full md:col-span-6 md:col-start-4 bg-white rounded-2xl shadow-xl p-8">
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
            <div className="relative w-full mb-2 overflow-hidden">
              {blog_Image?.display ? (
                <img
                  src={blog_Image.display}
                  alt={blog_Title || 'Blog post image'}
                  className="w-full h-auto block rounded-xl"
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
          {/* FAQ Section inside main blog card */}
          {enableFAQ && Array.isArray(faqs) && faqs.length > 0 && (
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
              <div className="divide-y divide-gray-200 rounded-2xl bg-white shadow-sm">
                {faqs.map((f, idx) => (
                  <details key={idx} className="group p-4 open:bg-gray-50">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                      <span className="font-medium text-gray-900">Q. {f?.question || ''}</span>
                      <span className="text-gray-500 group-open:rotate-180 transition-transform">▾</span>
                    </summary>
                    <div
                      className="mt-3 prose max-w-none prose-p:my-2 prose-a:text-primaryRed prose-img:rounded"
                      dangerouslySetInnerHTML={createSanitizedHTML(f?.answer || '')}
                    ></div>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mobile-only Trending below blog content */}
        <div className="md:hidden w-full mt-6">
          <h3 className="text-xl font-bold mb-3 px-3 py-2 rounded-lg text-white bg-gradient-to-r from-red-500 to-red-600 shadow-sm">Trending Projects</h3>
          <div className="space-y-2">
            {trendingProjects.length > 0 && trendingProjects.map((p, idx) => {
              const name = p?.projectName || p?.name || p?.title || 'Project';
              const category = p?.category || p?.projectType || '';
              const img = (() => {
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
                  className="group p-2 flex items-center gap-2 cursor-pointer hover:text-primaryRed border border-red-500 rounded-lg hover:border-red-600 bg-white shadow-sm transition duration-300 hover:[box-shadow:0_4px_12px_rgba(239,68,68,0.4)] hover:-translate-y-0.5"
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
                    <div className="text-xs text-gray-500 mt-1 line-clamp-1">
                      {(p?.location || p?.city) ? (
                        <span>{p.location || p.city}</span>
                      ) : (
                        category ? <span>{category}</span> : null
                      )}
                      {(() => {
                        const a = typeof p?.minPrice === 'number' ? formatINRShort(p.minPrice) : null;
                        const b = typeof p?.maxPrice === 'number' ? formatINRShort(p.maxPrice) : null;
                        const price = a && b ? `${a} - ${b}` : (a || b || '');
                        return price ? <span>{(p?.location || p?.city || category) ? ' • ' : ''}{price}</span> : null;
                      })()}
                    </div>
                  </div>
                </div>
              );
            })}
            {trendingProjects.length === 0 && (
              <div className="text-sm text-gray-400">No trending projects found.</div>
            )}
          </div>
        </div>

        {/* Right Sidebar (hidden on mobile for cleaner layout) */}
        <div ref={sidebarRef} className="hidden md:block w-full md:col-span-3 md:col-start-10 md:sticky md:top-24 self-start">
          <div className="flex flex-col gap-8">
          {/* Trending moved to left column */}

          {/* Right sidebar sections */}
        <div className="space-y-8">
          {/* People are searching */}
          <div className="p-0">
            <h3 className="text-xl font-bold text-gray-900 mb-3">What people are exploring</h3>
            <ul className="space-y-2">
              {peopleSearch.map((item, idx) => (
                <li key={idx}>
                  <Link to={item.url} className="text-sm text-gray-700 hover:text-primaryRed hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular tools */}
          <div className="p-0">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Popular on our site</h3>
            <ul className="space-y-2">
              {popularTools.map((item, idx) => (
                <li key={idx}>
                  <Link to={item.url} className="text-sm text-gray-700 hover:text-primaryRed hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          </div>
        </div>
        </div>
        {/* End Sidebar */}
      </div>

      {/* Lead capture modal disabled */}
      {false && showLeadModal && (<></>)}

      {/* Floating Enquiry Widget (bottom-right) */}
      <div className="fixed right-3 bottom-20 md:bottom-4 z-[10050]">
        {/* Panel */}
        {showFloatingEnquiry && (
          <div className="w-[260px] xs:w-[280px] sm:w-[300px] md:w-[320px] rounded-2xl shadow-2xl border border-gray-200 bg-white overflow-hidden mb-3">
            <div className="px-4 py-3 flex items-center justify-between bg-gray-50 border-b">
              <div className="font-semibold text-gray-900">Enquire Now</div>
              <button
                type="button"
                onClick={() => setShowFloatingEnquiry(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Collapse enquiry"
              >
                <span aria-hidden>▾</span>
              </button>
            </div>
            <form onSubmit={handleBlogSubmitQueryData} className="p-4 space-y-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={blogQuery.name}
                  onChange={handleBlogQueryChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Mobile</label>
                <input
                  type="tel"
                  name="mobile"
                  value={blogQuery.mobile}
                  onChange={handleBlogQueryChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Phone Number"
                />
              </div>
              {responseMessage && (
                <p className="text-xs text-red-600">{responseMessage}</p>
              )}
              <button
                type="submit"
                className="w-full rounded-lg bg-red-600 text-white font-semibold py-2 hover:bg-red-700 transition"
                disabled={buttonText !== 'Submit'}
              >
                {buttonText}
              </button>
            </form>
          </div>
        )}

        {/* Toggle Button (hidden when panel is open) */}
        {!showFloatingEnquiry && (
          <button
            type="button"
            onClick={() => setShowFloatingEnquiry(true)}
            className="flex items-center gap-2 rounded-full bg-red-600 text-white shadow-lg px-4 py-2 hover:bg-red-700"
            aria-expanded={showFloatingEnquiry}
          >
            <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse"></span>
            <span>Enquire now</span>
          </button>
        )}
      </div>

      {/* Page Footer */}
      <Footer />
    </div>
  );
};

export default BlogView;