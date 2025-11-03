import React, { useContext, useEffect, useState, useRef } from "react";
import Footer from "../Components/Actual_Components/Footer";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import api from "../config/apiClient";
import { API_ROUTES } from "../Redux/utils/Constant_Service";
import { useSelector } from "react-redux";
import Api_Service from "../Redux/utils/Api_Service";

import { DataContext } from "../MyContext";
import { Helmet } from "react-helmet";
import DOMPurify from 'dompurify';
import "./BlogView.css";
import useIsMobile from '../hooks/useIsMobile';
import { ThumbsUp, Share2, MessageCircle, List } from 'lucide-react';
import { 
  FALLBACK_IMG, 
  getBestImageUrl, 
  createSafeImageProps, 
  convertS3ToProxyUrl,
  isS3Url 
} from '../Utils/imageUtils';

const BlogView = () => {
  const { allupcomingProject } = useContext(DataContext);
  const TrendingProjects = useSelector(store => store?.project?.trending) || [];
  const SpotlightProjects = useSelector(store => store?.project?.spotlight) || [];
  const { getTrending, getSpotlight } = Api_Service();
  const [data, setData] = useState({});
  const [trendingProjects, setTrendingProjects] = useState([]);
  const [spotlightProjects, setSpotlightProjects] = useState([]);
  // Cache for related project thumbnails and meta resolved from project details
  const [relatedThumbs, setRelatedThumbs] = useState({});
  const [relatedMeta, setRelatedMeta] = useState({}); // key: project_url -> { location, minPrice, maxPrice }
  
  // Blog cache to prevent repeated API calls for same blog
  const [blogCache] = useState(new Map());

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
  // Table of Contents state
  const [tocItems, setTocItems] = useState([]);
  const [activeTocId, setActiveTocId] = useState('');
  const [showToc, setShowToc] = useState(true);
  // Sidebar collapsible sections
  const [sidebarSections, setSidebarSections] = useState({
    enquiry: true,
    popularProjects: true,
    peopleExploring: true,
    popularSite: true
  });
  // Scroll progress
  const [scrollProgress, setScrollProgress] = useState(0);
  // Category filter state
  const [activeCategory, setActiveCategory] = useState('all');
  // Sidebar sticky
  const containerRef = useRef(null);
  const sidebarRef = useRef(null);
  // Sliding trending projects sidebar
  const [showTrendingSidebar, setShowTrendingSidebar] = useState(false);
  // People are searching (unique phrasing and links)
  const peopleSearch = [
    { label: 'Projects in Gurugram', url: '/projects-in-gurugram' },
    { label: 'Projects in Delhi', url: '/project-in-delhi' },
    { label: 'Projects in Noida', url: '/project-in-noida' },
    { label: 'Property under 1 Cr', url: '/budget-properties' },
    { label: 'Upcoming Projects', url: '/upcoming-projects-in-gurgaon' },
    { label: 'New Launch Projects', url: '/projects-in-newlaunch' },
    { label: 'SCO Plots', url: '/sco/plots' },
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
  const [showFloatingEnquiry, setShowFloatingEnquiry] = useState(false);
  // Engagement state
  const [likes, setLikes] = useState(0);
  const [shares, setShares] = useState(0);
  const [views, setViews] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentName, setCommentName] = useState('');
  const [commentMsg, setCommentMsg] = useState('');
  const [tocItems, setTocItems] = useState([]);
  const [activeId, setActiveId] = useState('');
  const [likeLoading, setLikeLoading] = useState(false);
  const [liked, setLiked] = useState(false);
  const [shareLoading, setShareLoading] = useState(false);

  // Resolve current user identity for like key scoping
  const getUserIdentity = () => {
    try {
      const raw = window.localStorage.getItem('agentData');
      if (!raw) return 'anon';
      const obj = JSON.parse(raw);
      const id = (obj?._id || '').toString().trim();
      const email = (obj?.email || '').toString().trim().toLowerCase();
      return id || email || 'anon';
    } catch (_) { return 'anon'; }
  };
  const likeKeyFor = (blogId) => `blog_like_${blogId}_${getUserIdentity()}`;
  const getUserIdentityDetails = () => {
    try {
      const raw = window.localStorage.getItem('agentData');
      if (!raw) return { userId: '', email: '' };
      const obj = JSON.parse(raw);
      return {
        userId: (obj?._id || '').toString(),
        email: (obj?.email || '').toString().toLowerCase()
      };
    } catch (_) { return { userId: '', email: '' }; }
  };

  // Enhanced image error handler with S3 proxy support
  const onImgError = (e) => {
    try {
      const img = e?.target;
      if (!img) return;

      // Prevent infinite loop if fallback also fails
      if (img.dataset.fallback) return;

      // If we have an alternate candidate stored on element, try it once
      const alt = img.dataset.altSrc;
      if (alt && img.src !== alt) {
        img.src = alt;
        // Clear alt to ensure only a single retry
        delete img.dataset.altSrc;
        return;
      }

      // Try to convert S3 URL to proxy URL if it's an S3 URL
      if (isS3Url(img.src)) {
        const proxyUrl = convertS3ToProxyUrl(img.src);
        if (proxyUrl !== img.src) {
          img.src = proxyUrl;
          return;
        }
      }

      // Final fallback to default image
      const fallbackSrc = FALLBACK_IMG.startsWith('http') 
        ? FALLBACK_IMG 
        : `${window.location.origin}${FALLBACK_IMG}`;

      if (img.src !== fallbackSrc) {
        img.dataset.fallback = "1";
        img.src = fallbackSrc;
      }
    } catch (error) {
      console.error('Error in image fallback:', error);
    }
  };

  // Helper to pick best image from a project payload with S3 proxy support
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
      
      if (!u || /^data:image\/svg\+xml/i.test(u)) return '';
      
      // Convert S3 URLs to proxy URLs
      return convertS3ToProxyUrl(u);
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
    let rawDisplay = normalizedImage.cdn_url || normalizedImage.url || '';
    
    // Fix double-encoded URLs
    if (rawDisplay && rawDisplay.includes('%2520')) {
      rawDisplay = rawDisplay.replace(/%2520/g, '%20').replace(/%2525/g, '%25');
    }
    
    normalizedImage.display = convertS3ToProxyUrl(rawDisplay);
    

      return {
        blog_Title: obj.blog_Title || '',
        blog_Description: obj.blog_Description || '',
        author: obj.author || '',
        blog_Category: obj.blog_Category || '',
        published_Date: obj.published_Date || obj.createdAt || '',
        blog_Image: normalizedImage,
        views: typeof obj.views === 'number' ? obj.views : 0,
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
        
        console.log('[BlogView] === STARTING BLOG FETCH ===');
        console.log('[BlogView] URL params:', { slug, id });
        console.log('[BlogView] Location:', { pathname: location.pathname, search: location.search });
        console.log('[BlogView] Current URL:', window.location.href);

        // Handle different URL patterns:
        // 1. /blog/slug/id - both slug and id in URL params
        // 2. /blog/slug?id=xxx - slug in URL, id in query
        // 3. /blog/slug - only slug, need to resolve ID
        // 4. /blog/id - legacy direct ID access
        
        let effectiveId = null;
        let effectiveSlug = null;
        
        // Check if we have both slug and id from URL params (pattern: /blog/slug/id)
        if (slug && id) {
          // URL pattern: /blog/a-dream-address-awaits-at-dlf-the-arbour-sector-63/67f7bd08edb6d0442ad0012e
          effectiveSlug = slug;
          effectiveId = id;
          console.log('[BlogView] Using slug/id pattern:', { slug: effectiveSlug, id: effectiveId });
        }
        // Check if we have slug and id from query params
        else if (slug && getQueryId()) {
          effectiveSlug = slug;
          effectiveId = getQueryId();
          console.log('[BlogView] Using slug with query id:', { slug: effectiveSlug, id: effectiveId });
        }
        // Check if we have only slug, need to resolve ID
        else if (slug && !id) {
          effectiveSlug = slug;
          try {
            const slugResp = await api.get(`blog/slug/${encodeURIComponent(slug)}`);
            if (slugResp?.data?.data?.exists && slugResp?.data?.data?.id) {
              effectiveId = slugResp.data.data.id;
              console.log('[BlogView] Resolved ID from slug:', { slug: effectiveSlug, id: effectiveId });
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
        // Legacy: direct ID access (check if it's actually an ID, not a slug)
        else if (id && !slug) {
          // Check if 'id' is actually a MongoDB ObjectId (24 hex chars) or looks like an ID
          if (/^[0-9a-fA-F]{24}$/.test(id)) {
            effectiveId = id;
            console.log('[BlogView] Using direct ID access:', { id: effectiveId });
          } else if (id.length === 24) {
            // Sometimes IDs might have mixed case or special chars, try anyway
            effectiveId = id;
            console.log('[BlogView] Using direct ID access (24 chars):', { id: effectiveId });
          } else {
            // 'id' might actually be a slug, treat it as such
            effectiveSlug = id;
            try {
              const slugResp = await api.get(`blog/slug/${encodeURIComponent(id)}`);
              if (slugResp?.data?.data?.exists && slugResp?.data?.data?.id) {
                effectiveId = slugResp.data.data.id;
                console.log('[BlogView] Resolved ID from slug (in id param):', { slug: effectiveSlug, id: effectiveId });
              } else {
                // Fallback: try direct search by title/content
                try {
                  const searchResp = await api.get(`blog/view?search=${encodeURIComponent(id)}&limit=1`);
                  if (searchResp?.data?.data?.length > 0) {
                    effectiveId = searchResp.data.data[0]._id;
                    console.log('[BlogView] Found blog via search fallback:', { searchTerm: id, id: effectiveId });
                  } else {
                    setLoadError('Blog not found');
                    return;
                  }
                } catch (searchError) {
                  console.warn('[BlogView] Search fallback also failed:', searchError);
                  setLoadError('Blog not found');
                  return;
                }
              }
            } catch (e) {
              console.warn('[BlogView] Failed to resolve ID from slug (in id param):', e?.message || e);
              setLoadError('Blog not found');
              return;
            }
          }
        }

        if (!effectiveId) {
          setLoadError('Blog not found');
          return;
        }

        // Check cache first
        const cacheKey = `blog_${effectiveId}`;
        const cachedBlog = blogCache.get(cacheKey);
        if (cachedBlog && Date.now() - cachedBlog.timestamp < 5 * 60 * 1000) { // 5 minutes cache
          console.log('[BlogView] Using cached blog data:', effectiveId);
          setData(cachedBlog.data);
          setViews(cachedBlog.data.views || 0);
          return;
        }

        // Fetch the blog data directly using the resolved effectiveId with retry mechanism
        let blogResponse;
        let retryCount = 0;
        const maxRetries = 3;
        
        while (retryCount < maxRetries) {
          try {
            console.log(`[BlogView] Fetching blog attempt ${retryCount + 1}/${maxRetries} for ID:`, effectiveId);
            
            // Try multiple API endpoints in sequence
            const endpoints = [
              `blog/view/${effectiveId}`,
              `blog/${effectiveId}`,
              `blog/view?id=${effectiveId}`,
              `blog/details/${effectiveId}`
            ];
            
            let success = false;
            for (const endpoint of endpoints) {
              try {
                console.log(`[BlogView] Trying endpoint: ${endpoint}`);
                blogResponse = await api.get(endpoint);
                
                if (blogResponse?.data?.data || blogResponse?.data) {
                  // Handle different response structures
                  if (!blogResponse.data.data && blogResponse.data._id) {
                    blogResponse.data = { data: blogResponse.data };
                  }
                  console.log(`[BlogView] Success with endpoint: ${endpoint}`);
                  success = true;
                  break;
                }
              } catch (endpointError) {
                console.warn(`[BlogView] Endpoint ${endpoint} failed:`, endpointError.message);
                continue;
              }
            }
            
            if (!success) {
              console.error('All endpoints failed for blog ID:', effectiveId);
              
              if (retryCount === maxRetries - 1) {
                setLoadError('Blog not found');
                return;
              }
            } else {
              // Success - break out of retry loop
              break;
            }
          } catch (error) {
            console.error(`[BlogView] Attempt ${retryCount + 1} failed:`, {
              error: error.response?.data || error.message,
              status: error.response?.status,
              url: error.config?.url
            });
            
            if (retryCount === maxRetries - 1) {
              setLoadError('Failed to load blog. Please try refreshing the page.');
              return;
            }
            
            // Wait before retry (exponential backoff)
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
          }
          
          retryCount++;
        }
        
        if ((blogResponse.status === 200 || blogResponse.status === 201) && blogResponse.data && blogResponse.data.data) {
          const normalized = normalizeBlog(blogResponse.data.data);
          setData(normalized);
          
          // Cache the blog data
          blogCache.set(cacheKey, {
            data: normalized,
            timestamp: Date.now()
          });
          
          // Set initial views from blog data
          setViews(normalized.views || 0);
          
          // Now increment view count in background
          try {
            const viewResponse = await api.get(`blog/view/${effectiveId}?countView=1`);
            if (viewResponse.data?.data?.views) {
              setViews(viewResponse.data.data.views);
            }
          } catch (viewErr) {
            console.warn('[BlogView] View count increment failed:', viewErr);
          }
          
          // Fetch engagement data
          try {
            const eg = await api.get(`blog/${normalized._id}/engagement`);
            const e = eg?.data?.data || {};
            setLikes(e.likes || 0);
            setShares(e.shares || 0);
            setCommentsCount(e.commentsCount || 0);
            setComments(Array.isArray(e.comments) ? e.comments.slice(-5).reverse() : []);
            // Update views from engagement if available
            if (typeof e.views === 'number') {
              setViews(e.views);
            }
            // Initialize liked state from localStorage (scoped per-user)
            try {
              const key = likeKeyFor(normalized._id);
              const flag = window.localStorage.getItem(key);
              setLiked(flag === '1');
            } catch (_) {}
          } catch (_) {}
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

  // Fetch trending projects from Redux store (same as home page)
  useEffect(() => {
    // Fetch trending projects if not already loaded
    if (!TrendingProjects || TrendingProjects.length === 0) {
      console.log("Fetching trending projects from Redux...");
      getTrending();
    }
    // Fetch spotlight/recommended projects
    if (!SpotlightProjects || SpotlightProjects.length === 0) {
      console.log("Fetching spotlight projects from Redux...");
      getSpotlight();
    }
  }, []);

  // Update local state when Redux store updates
  useEffect(() => {
    console.log("TrendingProjects from Redux:", TrendingProjects?.length || 0);
    if (TrendingProjects && Array.isArray(TrendingProjects) && TrendingProjects.length > 0) {
      console.log("Setting trending projects from Redux store:", TrendingProjects.length);
      setTrendingProjects(TrendingProjects.slice(0, 10));
    }
  }, [TrendingProjects]);

  // Update spotlight projects when Redux store updates
  useEffect(() => {
    console.log("SpotlightProjects from Redux:", SpotlightProjects?.length || 0);
    if (SpotlightProjects && Array.isArray(SpotlightProjects) && SpotlightProjects.length > 0) {
      console.log("Setting spotlight projects:", SpotlightProjects.length);
      setSpotlightProjects(SpotlightProjects.slice(0, 5));
    }
  }, [SpotlightProjects]);

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

  // Show trending sidebar after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTrendingSidebar(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Ref to post-process content images and generate TOC
  const contentRef = useRef(null);
  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;
    
    // Process images
    const imgs = root.querySelectorAll('img');
    imgs.forEach((img) => {
      try {
        if (img.dataset && img.dataset.src && !img.getAttribute('src')) {
          img.setAttribute('src', img.dataset.src);
        }
        if (!img.getAttribute('loading')) img.setAttribute('loading', 'lazy');
        if (!img.getAttribute('referrerpolicy')) img.setAttribute('referrerpolicy', 'no-referrer');
        const src = img.getAttribute('src') || '';
        if (/^http:\/\//i.test(src)) {
          img.setAttribute('src', src.replace(/^http:\/\//i, 'https://'));
        }
        if (/^\/\//.test(src)) {
          img.setAttribute('src', 'https:' + src);
        }
        img.onerror = () => {
          img.src = FALLBACK_IMG;
        };
      } catch (_) { /* ignore */ }
    });

    // Generate Table of Contents from h2 and h3 elements
    const headings = root.querySelectorAll('h2, h3');
    const items = [];
    headings.forEach((heading, index) => {
      const id = `heading-${index}`;
      heading.id = id;
      items.push({
        id,
        text: heading.textContent,
        level: heading.tagName.toLowerCase()
      });
    });
    setTocItems(items);

    // Intersection Observer for active TOC highlighting
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTocId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -66%' }
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
    };
  }, [data.blog_Description]);

  // Scroll progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to TOC item
  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Toggle sidebar sections
  const toggleSidebarSection = (section) => {
    setSidebarSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

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

  // Generate table of contents from headings
  useEffect(() => {
    if (!contentRef.current) return;
    
    const headings = Array.from(contentRef.current.querySelectorAll('h2, h3, h4'));
    const items = headings.map((heading) => {
      const id = heading.textContent.toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special chars
        .replace(/\s+/g, '-')      // Replace spaces with -
        .replace(/-+/g, '-');       // Replace multiple - with single -
      
      // Add ID to heading for anchor links
      if (!heading.id) {
        heading.id = id;
      }
      
      return {
        id: heading.id || id,
        title: heading.textContent,
        level: parseInt(heading.tagName.substring(1)), // h2 -> 2, h3 -> 3, etc.
        element: heading
      };
    });
    
    setTocItems(items);
    
    // Set up intersection observer for active TOC highlighting
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -80% 0px',
        threshold: 0.1
      }
    );
    
    headings.forEach((heading) => observer.observe(heading));
    
    return () => {
      observer.disconnect();
    };
  }, [blog_Description]); // Re-run when blog content changes
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
    <div className="blog-view bg-white min-h-screen" style={{ fontFamily: "'Lato', 'Inter', sans-serif" }}>
      <Helmet>
        <title>{data.blog_Title || 'Blog Post'}</title>
        <meta name="description" content={data.metaDescription || data.blog_Description?.substring(0, 160)} />
        <meta property="og:title" content={data.blog_Title || 'Blog Post'} />
        <meta property="og:description" content={data.metaDescription || data.blog_Description?.substring(0, 160)} />
        <meta property="og:image" content={data.blog_Image?.display || FALLBACK_IMG} />
        <meta name="twitter:card" content="summary_large_image" />
        {blog_Image?.url && <meta name="twitter:image" content={blog_Image.url} />}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Lato:wght@300;400;700&display=swap" rel="stylesheet" />
      </Helmet>

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-[9999]">
        <div 
          className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Sticky Category Navigation Bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <Link to="/blog" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <span style={{ color: BRAND_RED, fontWeight: 700, fontFamily: "'Poppins', sans-serif", fontSize: '18px' }}>100acress</span>
              <span style={{ color: DARK_TEXT, fontWeight: 500, fontFamily: "'Poppins', sans-serif", fontSize: '18px' }}>Blog</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {['News', 'Market Trends', 'Insights', 'Property Tips'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat.toLowerCase().replace(' ', '-'))}
                  className={`text-sm font-medium transition-all pb-1 ${
                    activeCategory === cat.toLowerCase().replace(' ', '-')
                      ? 'text-red-600 border-b-2 border-red-600'
                      : 'text-gray-600 hover:text-red-600'
                  }`}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {cat}
                </button>
              ))}
            </nav>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-gray-600 hover:text-red-600 transition-colors"
              aria-label="Scroll to top"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
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
                    const rawImg = (relatedThumbs[url] || thumbnail || FALLBACK_IMG);
                    const img = getBestImageUrl(rawImg);

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
                  return getBestImageUrl(u);
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

        {/* Top Performing Blog */}
        <div className="w-full md:col-span-6 lg:col-span-6 lg:col-start-4 bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-4 text-sm text-gray-500">
            <Link to="/blog/" className="text-primaryRed hover:underline">Blogs</Link>
            {' > '} {blog_Category || 'Blog'}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] leading-tight mb-3">{blog_Title}</h1>
          {/* Share bar under title */}
          <div className="share-bar flex items-center gap-3 mb-4">
            {/* Like button (toggle) */}
            {data?._id && (
              <button
                type="button"
                disabled={likeLoading}
                onClick={async () => {
                  if (!data?._id) return;
                  try {
                    setLikeLoading(true);
                    const key = `blog_like_${data._id}`;
                    const ident = getUserIdentityDetails();
                    if (!liked) {
                      const r = await api.post(`blog/${data._id}/like`, ident);
                      const d = r?.data?.data || {};
                      setLikes(typeof d.likes === 'number' ? d.likes : (likes + 1));
                      setLiked(true);
                      try { window.localStorage.setItem(key, '1'); } catch (_) {}
                    } else {
                      const r = await api.post(`blog/${data._id}/unlike`, ident);
                      const d = r?.data?.data || {};
                      setLikes(typeof d.likes === 'number' ? d.likes : Math.max(0, likes - 1));
                      setLiked(false);
                      try { window.localStorage.setItem(key, '0'); } catch (_) {}
                    }
                  } catch (_) {}
                  finally { setLikeLoading(false); }
                }}
                className={`inline-flex items-center px-3 h-10 rounded-full disabled:opacity-50 ${liked ? 'bg-green-600 text-white border border-green-600' : 'border border-green-500 text-green-600 hover:bg-green-50'}`}
                aria-label={liked ? 'Unlike this blog' : 'Like this blog'}
                title={liked ? 'Unlike' : 'Like'}
              >
                <ThumbsUp size={18} />
              </button>
            )}
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
            <div className="relative flex items-center gap-2">
              <button
                type="button"
                onClick={copyLink}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); copyLink(); } }}
                className="inline-flex w-10 h-10 items-center justify-center rounded-full border border-gray-400 text-gray-700 hover:bg-gray-50 cursor-pointer"
                title={copiedLink ? 'Copied!' : 'Copy link'}
                aria-label="Copy link"
              >
                <i className="fa-solid fa-link"></i>
              </button>
              {copiedLink && (
                <span className="copy-toast">Link copied</span>
              )}
            </div>
          </div>
          {(blog_Image?.display || FALLBACK_IMG) && (
            <div className="relative w-full mb-2 overflow-hidden">
              {blog_Image?.display ? (
                <img
                  {...createSafeImageProps(blog_Image.display, blog_Title || 'Blog post image', {
                    className: "w-full h-auto block rounded-xl",
                    'data-alt-src': blog_Image?.cdn_url && blog_Image?.url && blog_Image.cdn_url !== blog_Image.url ? (blog_Image.display === blog_Image.cdn_url ? blog_Image.url : blog_Image.cdn_url) : ''
                  })}
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

            {/* FAQ Section */}
            {enableFAQ && Array.isArray(faqs) && faqs.length > 0 && (
              <div className="mt-8 bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-lg">
                <h3 
                  className="text-2xl font-bold mb-6"
                  style={{ color: DARK_TEXT, fontFamily: "'Poppins', sans-serif" }}
                >
                  Frequently Asked Questions
                </h3>
                <div className="divide-y divide-gray-200">
                  {faqs.map((f, idx) => (
                    <details key={idx} className="group py-4">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-gray-900 hover:text-red-600 transition-colors">
                        <span className="text-lg">Q. {f?.question || ''}</span>
                        <span className="text-gray-500 group-open:rotate-180 transition-transform duration-300">
                          <ChevronDown size={20} />
                        </span>
                      </summary>
                      <div
                        className="mt-4 prose max-w-none prose-p:my-2 prose-a:text-red-600 prose-img:rounded text-gray-700"
                        dangerouslySetInnerHTML={createSanitizedHTML(f?.answer || '')}
                      />
                    </details>
                  ))}
                </div>
              </div>
            )}

            {/* Phase 6: Related Projects Card Section */}
            {relatedProjects && relatedProjects.length > 0 && (
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-lg">
                <h3 
                  className="text-2xl font-bold mb-6 flex items-center gap-2"
                  style={{ color: DARK_TEXT, fontFamily: "'Poppins', sans-serif" }}
                >
                  <span className="text-2xl">🏗️</span>
                  RELATED PROJECTS
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedProjects.map((project, idx) => {
                    const name = project?.projectName || 'Project';
                    const url = project?.project_url || '';
                    const thumbnail = project?.thumbnail || '';
                    const rawImg = (relatedThumbs[url] || thumbnail || FALLBACK_IMG);
                    const img = getBestImageUrl(rawImg);

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

                    const meta = relatedMeta[url] || {};
                    const fallbackLoc = project?.location || project?.city || '';
                    const showLoc = meta?.location || fallbackLoc || '';
                    const priceLine = (() => {
                      const a = typeof meta.minPrice === 'number' ? formatINRShort(meta.minPrice) : null;
                      const b = typeof meta.maxPrice === 'number' ? formatINRShort(meta.maxPrice) : null;
                      if (a && b) return `${a} - ${b}`;
                      if (a || b) return `${a || b}`;
                      return '';
                    })();

                    return (
                      <div
                        key={idx}
                        className="group bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                        role="button"
                        tabIndex={0}
                        onClick={handleProjectClick}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleProjectClick(); } }}
                        title={name}
                      >
                        <div className="relative h-40 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                          <img
                            src={img}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            alt={name}
                            onError={onImgError}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="p-4">
                          <h4 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-200 line-clamp-2 mb-2 text-base">
                            {name}
                          </h4>
                          {(showLoc || priceLine) && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              {showLoc && (
                                <span className="flex items-center gap-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>
                                  {showLoc}
                                </span>
                              )}
                              {priceLine && (
                                <span className="font-semibold text-red-600">{priceLine}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </main>

          {/* Phase 5: Right Sidebar (30%) - Clean Modern Design */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="lg:sticky lg:top-24 space-y-6 animate-fadeIn">

              {/* 100acress Recommended Projects Section */}
              {spotlightProjects.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => toggleSidebarSection('popularProjects')}
                    className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-red-500 to-red-600 text-white font-bold hover:from-red-600 hover:to-red-700 transition-all"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    <span>100acress Recommended</span>
                    {sidebarSections.popularProjects ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  {sidebarSections.popularProjects && (
                    <div className="p-4 space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                      {spotlightProjects.map((p, idx) => {
                        const name = p?.projectName || p?.name || p?.title || 'Project';
                        const img = pickProjectImage(p);
                        return (
                          <div
                            key={idx}
                            className="group flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-red-50 hover:shadow-md transition-all duration-300"
                            onClick={() => navigateProject(p)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigateProject(p); } }}
                          >
                            <img
                              src={img || FALLBACK_IMG}
                              className="w-16 h-16 rounded-lg object-cover flex-shrink-0 shadow-sm"
                              alt={name}
                              onError={onImgError}
                              referrerPolicy="no-referrer"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 text-sm">
                                {name}
                              </h4>
                              {(p?.location || p?.city) && (
                                <p className="text-xs text-gray-500 mt-1">{p.location || p.city}</p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* What People Are Exploring Section - Modern Clean Design */}
              <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-5 bg-red-600 rounded-full"></div>
                    <h3 className="text-base font-bold text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      What People Are Exploring
                    </h3>
                  </div>
                </div>
                <div className="px-4 py-3">
                  <ul className="space-y-2">
                    <li>
                      <Link to="/projects-in-gurugram/" className="flex items-center gap-3 text-gray-700 hover:text-red-600 transition-all duration-200 text-sm group">
                        <svg className="w-4 h-4 text-red-600 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="group-hover:underline">Projects in Gurugram</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/projects-in-delhi/" className="flex items-center gap-3 text-gray-700 hover:text-red-600 transition-all duration-200 text-sm group">
                        <svg className="w-4 h-4 text-red-600 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="group-hover:underline">Projects in Delhi</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/projects-in-noida/" className="flex items-center gap-3 text-gray-700 hover:text-red-600 transition-all duration-200 text-sm group">
                        <svg className="w-4 h-4 text-red-600 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="group-hover:underline">Projects in Noida</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/property-under-1-crore/" className="flex items-center gap-3 text-gray-700 hover:text-red-600 transition-all duration-200 text-sm group">
                        <svg className="w-4 h-4 text-red-600 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="group-hover:underline">Property under 1 Cr</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/upcoming-projects/" className="flex items-center gap-3 text-gray-700 hover:text-red-600 transition-all duration-200 text-sm group">
                        <svg className="w-4 h-4 text-red-600 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        <span className="group-hover:underline">Upcoming Projects</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/new-launch-projects/" className="flex items-center gap-3 text-gray-700 hover:text-red-600 transition-all duration-200 text-sm group">
                        <svg className="w-4 h-4 text-red-600 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        <span className="group-hover:underline">New Launch Projects</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/sco-plots/" className="flex items-center gap-3 text-gray-700 hover:text-red-600 transition-all duration-200 text-sm group">
                        <svg className="w-4 h-4 text-red-600 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className="group-hover:underline">SCO Plots</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/commercial-projects/" className="flex items-center gap-3 text-gray-700 hover:text-red-600 transition-all duration-200 text-sm group">
                        <svg className="w-4 h-4 text-red-600 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="group-hover:underline">Commercial Projects</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Popular on Our Site Section - Modern Clean Design */}
              <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-5 bg-red-600 rounded-full"></div>
                    <h3 className="text-base font-bold text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Popular on Our Site
                    </h3>
                  </div>
                </div>
                <div className="px-4 py-3">
                  <ul className="space-y-2">
                    <li>
                      <Link to="/post-property/" className="flex items-center gap-3 text-gray-700 hover:text-red-600 transition-all duration-200 text-sm group">
                        <svg className="w-4 h-4 text-red-600 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="group-hover:underline">Post Property</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/emi-calculator/" className="flex items-center gap-3 text-gray-700 hover:text-red-600 transition-all duration-200 text-sm group">
                        <svg className="w-4 h-4 text-red-600 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <span className="group-hover:underline">EMI Calculator</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/rent-property/" className="flex items-center gap-3 text-gray-700 hover:text-red-600 transition-all duration-200 text-sm group">
                        <svg className="w-4 h-4 text-red-600 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span className="group-hover:underline">Rent Property</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/resale-property/" className="flex items-center gap-3 text-gray-700 hover:text-red-600 transition-all duration-200 text-sm group">
                        <svg className="w-4 h-4 text-red-600 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                        <span className="group-hover:underline">Resale Property</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </aside>

        </div>
      </div>

      {/* Floating Chat Bubble Enquiry Form */}
      <div className="fixed bottom-6 right-6 z-[60]">
        {/* Enquiry Form Popup */}
        {showFloatingEnquiry && (
          <div className="mb-4 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-slideUp">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <h3 className="text-white font-bold text-base" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Quick Enquiry
                </h3>
              </div>
              <button
                onClick={() => setShowFloatingEnquiry(false)}
                className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
                aria-label="Close enquiry form"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Form */}
            <form onSubmit={handleBlogSubmitQueryData} className="p-5 space-y-3">
              <input
                type="text"
                name="name"
                value={blogQuery.name}
                onChange={handleBlogQueryChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm"
                placeholder="Your Name *"
                required
              />
              <input
                type="email"
                name="email"
                value={blogQuery.email}
                onChange={handleBlogQueryChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm"
                placeholder="Email Address"
              />
              <input
                type="tel"
                name="mobile"
                value={blogQuery.mobile}
                onChange={handleBlogQueryChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm"
                placeholder="Phone Number *"
                required
              />
              <textarea
                name="message"
                value={blogQuery.message}
                onChange={handleBlogQueryChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none text-sm"
                placeholder="Your Message"
                rows={3}
              />
              {responseMessage && (
                <p className="text-xs text-green-600 font-medium">{responseMessage}</p>
              )}
              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-[1.02] shadow-md"
                disabled={buttonText !== 'Submit'}
              >
                {buttonText}
              </button>
            </form>
          </div>
        )}

        {/* Floating Enquire Now Button */}
        {!showFloatingEnquiry && (
          <button
            onClick={() => setShowFloatingEnquiry(true)}
            className="relative bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-3.5 rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center gap-3 group overflow-hidden"
            aria-label="Open enquiry form"
            style={{ 
              boxShadow: '0 10px 40px rgba(211, 47, 47, 0.4)',
            }}
          >
            {/* Animated background shine effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-shimmer"></span>
            
            {/* Icon with background */}
            <span className="relative flex items-center justify-center w-8 h-8 bg-white/20 rounded-full backdrop-blur-sm">
              <svg className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </span>
            
            {/* Text */}
            <span className="font-bold text-base tracking-wide" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Enquire Now
            </span>
            
            {/* Arrow icon */}
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
            
            {/* Pulse ring animation */}
            <span className="absolute -inset-1 rounded-full bg-red-400 opacity-30 animate-ping"></span>
          </button>
        )}
      </div>

      {/* Sliding Trending Projects Sidebar */}
      <>
        {/* Overlay - only show when sidebar is open */}
        {showTrendingSidebar && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
            onClick={() => setShowTrendingSidebar(false)}
          ></div>
        )}
        
        {/* Sidebar Container */}
        <div className={`fixed top-20 h-[calc(100vh-10rem)] z-40 transition-all duration-500 ease-out ${showTrendingSidebar ? 'right-0' : 'right-0'}`}>
          {/* Visible Tab (always visible on right edge) */}
          <button
            onClick={() => setShowTrendingSidebar(!showTrendingSidebar)}
            className={`absolute top-1/3 -translate-y-1/2 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-8 rounded-l-xl shadow-lg hover:from-red-600 hover:to-red-700 transition-all z-10 flex flex-col items-center gap-2 ${showTrendingSidebar ? '-left-12' : 'right-0'}`}
            aria-label={showTrendingSidebar ? "Close trending projects" : "Open trending projects"}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="text-xs font-bold" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
              TRENDING
            </span>
          </button>

          {/* Sidebar Panel */}
          <div className={`h-full w-80 md:w-96 bg-white shadow-2xl overflow-hidden transition-all duration-500 ease-out ${showTrendingSidebar ? 'translate-x-0' : 'translate-x-full'}`}>

          {/* Scrollable Content */}
          <div className="h-full overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-red-500 to-red-600 px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <h3 className="text-white font-bold text-lg" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Trending Projects
                </h3>
              </div>
              <button
                onClick={() => setShowTrendingSidebar(false)}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                aria-label="Close sidebar"
              >
                <X size={24} />
              </button>
            </div>

            {/* Projects List */}
            <div className="p-6 space-y-4">
              {trendingProjects.length > 0 ? (
                trendingProjects.map((project, idx) => {
                  const name = project?.projectName || project?.name || project?.title || 'Project';
                  const category = project?.category || project?.projectType || '';
                  const location = project?.location || project?.city || '';
                  
                  const img = (() => {
                    const t1 = project?.thumbnailImage?.url || project?.thumbnail?.url || project?.thumb?.url || '';
                    const t2 = project?.thumbnailImage || project?.thumbnail || project?.thumb || '';
                    const fThumb = project?.frontImage?.thumbnail?.url || project?.frontImage?.thumb?.url || '';
                    const fMain = project?.frontImage?.url || '';
                    const c1 = project?.cardImage?.url || project?.cardImage || '';
                    const b1 = project?.bannerImage?.url || project?.bannerImage || '';
                    const any = project?.image || project?.project_Image || '';
                    const fromArray = Array.isArray(project?.images) && project.images.length ? (project.images[0]?.url || project.images[0]) : '';
                    const u = t1 || t2 || fThumb || c1 || fMain || b1 || fromArray || any || '';
                    return getBestImageUrl(u);
                  })();

                  const formatINRShort = (val) => {
                    if (typeof val !== 'number') return '';
                    if (val >= 10000000) return `${(val / 10000000).toFixed(2)} Cr`;
                    if (val >= 100000) return `${(val / 100000).toFixed(2)} Lac`;
                    return val.toLocaleString('en-IN');
                  };

                  const minPrice = typeof project?.minPrice === 'number' ? formatINRShort(project.minPrice) : null;
                  const maxPrice = typeof project?.maxPrice === 'number' ? formatINRShort(project.maxPrice) : null;
                  const priceRange = minPrice && maxPrice ? `${minPrice} - ${maxPrice}` : (minPrice || maxPrice || '');

                  const navigateToProject = (p) => {
                    const pUrl = p?.project_url || p?.projectUrl || p?.url || '';
                    if (pUrl) {
                      history(`/${pUrl}/`);
                    }
                  };

                  return (
                    <div
                      key={idx}
                      onClick={() => navigateToProject(project)}
                      className="group bg-white rounded-xl border border-gray-200 hover:border-red-500 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg"
                    >
                      {/* Project Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={img}
                          alt={name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            if (e?.target && e.target.src !== window.location.origin + FALLBACK_IMG && !e.target.dataset.fallback) {
                              e.target.dataset.fallback = "1";
                              e.target.src = FALLBACK_IMG;
                            }
                          }}
                          referrerPolicy="no-referrer"
                          crossOrigin="anonymous"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        {category && (
                          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                            {category}
                          </div>
                        )}
                      </div>

                      {/* Project Details */}
                      <div className="p-4">
                        <h4 className="font-bold text-gray-900 text-base mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                          {name}
                        </h4>
                        
                        {location && (
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{location}</span>
                          </div>
                        )}

                        {priceRange && (
                          <div className="flex items-center gap-2 text-sm font-semibold text-red-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>₹ {priceRange}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <p className="text-gray-500 text-sm">No trending projects available</p>
                </div>
              )}
            </div>
          </div>
          </div>
        </div>
      </>

      {/* Page Footer */}
      <Footer />
    </div>
  );
};

export default BlogView;
