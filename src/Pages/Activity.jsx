import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaHeart, FaEye, FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, FaShare, FaPhone } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../Redux/slice/FavoritesSlice';
import { addToViewed } from '../Redux/slice/ViewedSlice';
import { Link } from 'react-router-dom';
import Navbar from '../aadharhomes/navbar/Navbar';
import LuxuryFooter from '../Components/Actual_Components/LuxuryFooter';
import Api_Service from '../Redux/utils/Api_Service';

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (_) {
    return fallback;
  }
}

function getFavoritesData() {
  try {
    return readJSON('favoriteProjects', {});
  } catch (_) {
    return {};
  }
}

function favSubscribe(callback) {
  const handler = () => callback();
  window.addEventListener('storage', handler);
  window.addEventListener('favorites-changed', handler);
  return () => {
    window.removeEventListener('storage', handler);
    window.removeEventListener('favorites-changed', handler);
  };
}

const Card = ({ item }) => {
  // Normalize incoming shapes from favorites/viewed/spotlight
  const title = item?.title || item?.projectName || "Property";
  const url = item?.url || (item?.project_url ? `/${item.project_url}/` : "#");
  // Build ordered image candidate list (thumbnail first)
  const buildCandidates = (it) => {
    const raw = [
      // Prefer explicit thumbnail fields
      it?.thumbnailImage?.cdn_url, it?.thumbnailImage?.url,
      it?.thumbnail?.cdn_url, it?.thumbnail?.url,
      it?.thumbnail, it?.thumbnailUrl, it?.thumbnailURL,
      it?.thumbnailImageUrl, it?.thumbnailImageURL,
      // Then front/card/banner
      it?.frontImage?.thumbnail?.cdn_url, it?.frontImage?.thumbnail?.url,
      it?.frontImage?.cdn_url, it?.frontImage?.url,
      typeof it?.frontImage === 'string' ? it.frontImage : undefined,
      it?.front_image, it?.frontImageUrl, it?.frontImageURL,
      it?.cardImage?.cdn_url, it?.cardImage?.url, it?.cardImage,
      it?.bannerImage?.cdn_url, it?.bannerImage?.url, it?.bannerImage,
      // Generic image fields
      it?.image?.cdn_url, it?.image?.url, it?.image,
      it?.img,
      it?.image_url, it?.imageUrl,
      it?.cover, it?.coverImage, it?.cover_image,
      it?.photo, it?.picture,
      ...(Array.isArray(it?.images) ? it.images.map((img) => (typeof img === 'string' ? img : (img?.cdn_url || img?.url))) : []),
      ...(Array.isArray(it?.gallery) ? it.gallery.map((img) => (typeof img === 'string' ? img : (img?.cdn_url || img?.url))) : []),
    ];
    // Normalize, filter blanks/placeholders, de-duplicate
    const seen = new Set();
    const list = raw
      .map((u) => (typeof u === 'string' ? u.trim() : ''))
      .filter((u) => u && !/^data:image\/svg\+xml/i.test(u))
      .filter((u) => { if (seen.has(u)) return false; seen.add(u); return true; });
    
    // Debug: log if no candidates found
    if (list.length === 0) {
      console.warn('No image candidates found for item:', it);
    }
    
    return list;
  };
  const imageCandidates = buildCandidates(item);
  const city = item?.city || item?.location || "";
  const priceText =
    item?.priceText ||
    (() => {
      const min = item?.minPrice ?? item?.price;
      const max = item?.maxPrice ?? null;
      if (!min && !max) return "";
      if (min && max) return `₹${min} - ${max} Cr`;
      return min ? `₹${min} Cr` : "";
    })();
  const beds = item?.beds || item?.bedrooms || item?.bhk || null;
  const baths = item?.baths || item?.bathrooms || null;
  const area = item?.area || item?.size || item?.superArea || null;

  // Helper function to get the correct image URL
  const getImageUrl = (img) => {
    if (!img) return null;
    
    // If it's an object with a url property
    if (img && typeof img === 'object') {
      if (img.cdn_url) return getImageUrl(img.cdn_url);
      if (img.url) return getImageUrl(img.url);
      return null;
    }
    
    // If it's a string
    if (typeof img === 'string') {
      // If it's already a full URL or data URL, return as is
      if (img.startsWith('http') || img.startsWith('data:image') || img.startsWith('blob:')) {
        // Upgrade to https if http
        return img.startsWith('http://') ? img.replace(/^http:\/\//i, 'https://') : img;
      }
      // Protocol-relative URLs
      if (img.startsWith('//')) {
        return `https:${img}`;
      }
      // Handle relative paths
      if (img.startsWith('/')) {
        return `${window.location.origin}${img}`;
      }
      // If it's a relative path without leading slash
      return `${window.location.origin}/${img}`;
    }
    
    return null;
  };

  const imageUrl = getImageUrl(imageCandidates[0]);
  const FALLBACK_IMG = '/Images/blog.avif';
  const [imgIndex, setImgIndex] = useState(0);
  const [imgSrc, setImgSrc] = useState(imageUrl || FALLBACK_IMG);
  const [imgError, setImgError] = useState(false);

  // Handle image loading errors
  const handleImageError = () => {
    try {
      const nextIdx = imgIndex + 1;
      if (nextIdx < imageCandidates.length) {
        setImgIndex(nextIdx);
        const nextUrl = getImageUrl(imageCandidates[nextIdx]) || FALLBACK_IMG;
        setImgSrc(nextUrl);
        return;
      }
      if (!imgError && imgSrc !== FALLBACK_IMG) {
        setImgError(true);
        setImgSrc(FALLBACK_IMG);
      }
    } catch (_) {}
  };
  
  // Log image URL for debugging and fetch full project data if needed
  useEffect(() => {
    // When item changes, reset to first candidate
    setImgIndex(0);
    const first = getImageUrl(imageCandidates[0]) || FALLBACK_IMG;
    setImgSrc(first);
    
    // If no image candidates and item needs fetching, fetch from API
    if (imageCandidates.length === 0 && item?._needsImageFetch && item?.id) {
      console.warn('Fetching full project data for:', item.title);
      // Fetch project details from API
      import('../Redux/utils/Api_Service').then(module => {
        const Api_Service = module.default;
        const { getProjectDetails } = Api_Service();
        if (getProjectDetails) {
          getProjectDetails(item.id).then(fullProject => {
            if (fullProject) {
              // Update item with full project data
              const fullCandidates = buildCandidates(fullProject);
              if (fullCandidates.length > 0) {
                setImgIndex(0);
                const fullFirst = getImageUrl(fullCandidates[0]) || FALLBACK_IMG;
                setImgSrc(fullFirst);
                console.log('Fetched image for', item.title, ':', fullFirst);
              }
            }
          }).catch(err => {
            console.error('Error fetching project details:', err);
          });
        }
      });
    } else if (imageCandidates.length === 0) {
      console.warn('No image candidates for item:', {
        title,
        itemKeys: Object.keys(item || {}),
        item
      });
    } else {
      console.log('Image candidates found:', imageCandidates.slice(0, 3), 'Using:', first);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-100 text-black shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.10)] transition-all duration-300 ease-out h-full flex flex-col bg-white">
      <Link to={url} target="_top" className="block relative">
        <div className="overflow-hidden rounded-t-2xl bg-gray-50">
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={title}
              className="w-full aspect-[4/3] object-cover group-hover:scale-[1.03] transition-transform"
              loading="lazy"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center text-gray-400 p-4 text-center">
              <svg className="w-12 h-12 mb-2 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span className="text-sm">No image available</span>
            </div>
          )}
        </div>
        {priceText ? (
          <div className="absolute bottom-2 left-2 bg-orange-500/95 text-white text-[12px] font-semibold px-3 py-1 rounded-full backdrop-blur">
            {priceText}
          </div>
        ) : null}
      </Link>

      <div className="p-4 flex-1 flex flex-col gap-2">
        <h3 className="text-[15px] font-semibold text-gray-900 line-clamp-2" title={title}>{title}</h3>
        {city ? <div className="text-[12px] text-gray-600 truncate flex items-center gap-1"><FaMapMarkerAlt className="text-orange-500" />{city}</div> : null}

        {(beds || baths || area) ? (
          <div className="mt-1 grid grid-cols-3 gap-2 text-[11px] text-gray-700">
            {beds ? (
              <div className="flex items-center gap-1"><FaBed className="text-gray-500" />{beds} Beds</div>
            ) : <span />}
            {baths ? (
              <div className="flex items-center gap-1"><FaBath className="text-gray-500" />{baths} Baths</div>
            ) : <span />}
            {area ? (
              <div className="flex items-center gap-1 justify-end sm:justify-start"><FaRulerCombined className="text-gray-500" />{area}</div>
            ) : <span />}
          </div>
        ) : null}

        <div className="mt-auto pt-2 flex items-center gap-2">
          <Link to={url} target="_top" className="inline-flex flex-1 items-center justify-center rounded-full bg-red-600 text-white text-[12px] px-4 py-2 hover:bg-red-700 transition">View</Link>
        </div>
      </div>
    </article>
  );
};

const Section = ({ title, items }) => (
  <section className="mt-6">
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      <div className="text-sm text-gray-500">{items.length} items</div>
    </div>
    {items.length === 0 ? (
      <div className="p-6 rounded-xl border border-gray-100 bg-white text-gray-500">Nothing here yet.</div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((it, idx) => (<Card key={(it.id || it.url || idx) + "-a"} item={it} />))}
      </div>
    )}
  </section>
);

export default function Activity() {
  const spotlight = useSelector((s) => s?.project?.spotlight) || [];
  const [viewed, setViewed] = useState(() => readJSON('viewed_projects', []));
  const [favData, setFavData] = useState(() => getFavoritesData());
  const [activeTab, setActiveTab] = useState('viewed');
  const { getSpotlight } = Api_Service();

  // Fetch spotlight data on component mount
  useEffect(() => {
    getSpotlight();
  }, [getSpotlight]);

  useEffect(() => {
    const updateViewed = () => setViewed(readJSON('viewed_projects', []));
    const onViewed = () => updateViewed();
    window.addEventListener('viewed-projects-changed', onViewed);
    window.addEventListener('storage', onViewed);
    return () => {
      window.removeEventListener('viewed-projects-changed', onViewed);
      window.removeEventListener('storage', onViewed);
    };
  }, []);

  useEffect(() => {
    const unsub = favSubscribe(() => setFavData(getFavoritesData()));
    return () => { try { unsub(); } catch {} };
  }, []);

  const likedList = useMemo(() => {
    const data = favData || {};
    return Object.values(data);
  }, [favData]);

  const recommended = useMemo(() => {
    if (Array.isArray(spotlight) && spotlight.length > 0) {
      // Pass the entire object to Card component so it can extract images properly
      return spotlight.slice(0, 8).map((p) => ({
        ...p, // Spread all original fields
        id: p?._id || p?.id || p?.slug,
        title: p?.projectName,
        url: p?.project_url ? `/${p.project_url}/` : '#',
        city: p?.city,
        priceText: (() => {
          try {
            const min = p?.minPrice ?? p?.price;
            const max = p?.maxPrice ?? null;
            if (!min && !max) return '';
            if (min && max) return `₹${min} - ${max} Cr`;
            return min ? `₹${min} Cr` : '';
          } catch { return ''; }
        })(),
      }));
    }
    return [];
  }, [spotlight]);

  // Normalize viewed list into Card shape, with robust image fallbacks
  const viewedItems = useMemo(() => {
    return (viewed || []).map((v) => {
      // Check if this item has image data, if not we'll fetch it
      const hasImageData = !!(
        v?.thumbnailImage || v?.thumbnail || v?.frontImage || 
        v?.image || v?.images || v?.gallery || v?.cardImage
      );
      
      // Pass the entire object to Card component so it can extract images properly
      return {
        ...v, // Spread all original fields
        id: v.id || v._id || v.slug,
        title: v.title || v.projectName,
        url: v.url || (v.project_url ? `/${v.project_url}/` : '#'),
        city: v.city || v.location || '',
        priceText: v.priceText || (() => {
          const min = v?.minPrice ?? v?.price;
          const max = v?.maxPrice ?? null;
          if (!min && !max) return '';
          if (min && max) return `₹${min} - ${max} Cr`;
          return min ? `₹${min} Cr` : '';
        })(),
        beds: v.beds || v.bedrooms || v.bhk,
        baths: v.baths || v.bathrooms,
        area: v.area || v.size || v.superArea,
        _needsImageFetch: !hasImageData // Flag to fetch full project data
      };
    });
  }, [viewed]);

  return (
    <ActivityWrapper>
      <Navbar />
      <div className="mt-20">
        <h1>My Activity</h1>
        <div className="tabs">
          <button 
            className={activeTab === 'viewed' ? 'active' : ''} 
            onClick={() => setActiveTab('viewed')}
          >
            Recently Viewed ({viewedItems.length})
          </button>
          <button 
            className={activeTab === 'liked' ? 'active' : ''} 
            onClick={() => setActiveTab('liked')}
          >
            Liked Properties ({likedList.length})
          </button>
          <button 
            className={activeTab === 'recommended' ? 'active' : ''} 
            onClick={() => setActiveTab('recommended')}
          >
            Recommended ({recommended.length})
          </button>
        </div>

        <div className="content">
          {activeTab === 'viewed' && (
            <Section title="Recently Viewed Properties" items={viewedItems} />
          )}
          {activeTab === 'liked' && (
            <Section title="Liked Properties" items={likedList} />
          )}
          {activeTab === 'recommended' && (
            <Section title="Recommended Properties" items={recommended} />
          )}
        </div>
      </div>
      <LuxuryFooter />
    </ActivityWrapper>
  );
}

const ActivityWrapper = styled.div`
  min-height: 100vh;
  background-color: #f8fafc;
  
  .mt-20 {
    margin-top: 5rem;
    padding: 2rem;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
  
  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: #1a202c;
    margin-bottom: 2rem;
  }
  
  .tabs {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .tabs button {
    padding: 0.75rem 1.5rem;
    background: none;
    border: none;
    color: #64748b;
    font-weight: 500;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: all 0.2s;
  }
  
  .tabs button:hover {
    color: #e53e3e;
  }
  
  .tabs button.active {
    color: #e53e3e;
    border-bottom-color: #e53e3e;
  }
  
  .content {
    margin-top: 1rem;
  }
`;
