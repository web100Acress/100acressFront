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
  const title = item?.title || "Property";
  const url = item?.url || "#";
  const image = item?.image || item?.thumbnail || "";
  const city = item?.city || "";
  const priceText = item?.priceText || "";
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-100 text-black shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.10)] transition-all duration-300 ease-out h-full flex flex-col bg-white">
      <Link to={url} target="_top" className="block">
        <div className="overflow-hidden rounded-t-2xl">
          {image ? (
            <img src={image} alt={title} className="w-full aspect-[4/3] object-cover group-hover:scale-[1.03] transition-transform" loading="lazy" />
          ) : (
            <div className="w-full aspect-[4/3] bg-gray-100 flex items-center justify-center text-gray-400">No Image</div>
          )}
        </div>
      </Link>
      <div className="p-3 flex-1 flex flex-col gap-2">
        <h3 className="text-[15px] font-semibold text-gray-900 truncate" title={title}>{title}</h3>
        {city ? <div className="text-[12px] text-gray-600 truncate">{city}</div> : null}
        {priceText ? <div className="text-[13px] font-medium text-gray-800">{priceText}</div> : null}
        <div className="mt-auto">
          <Link to={url} target="_top" className="inline-flex items-center justify-center rounded-full bg-red-600 text-white text-[12px] px-4 py-2 hover:bg-red-700 transition">View</Link>
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
      // Map to the lightweight shape that Card expects
      return spotlight.slice(0, 8).map((p) => ({
        id: p?._id || p?.id || p?.slug,
        title: p?.projectName,
        image: p?.frontImage?.url || p?.thumbnailImage?.url,
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

  // Normalize viewed list into Card shape (may not have images)
  const viewedItems = useMemo(() => {
    return (viewed || []).map((v) => ({
      id: v.id,
      title: v.title,
      url: v.url || '#',
      image: v.image || '',
      city: v.city || '',
      priceText: v.priceText || ''
    }));
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
