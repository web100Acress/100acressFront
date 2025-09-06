import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getFavoritesData, subscribe as favSubscribe } from "../Utils/favorites";

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (_) {
    return fallback;
  }
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
  const trending = useSelector((s) => s?.project?.trending) || [];
  const [viewed, setViewed] = useState(() => readJSON('viewed_projects', []));
  const [favData, setFavData] = useState(() => getFavoritesData());

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
    if (Array.isArray(trending) && trending.length > 0) {
      // Map to the lightweight shape that Card expects
      return trending.slice(0, 8).map((p) => ({
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
            if (min && max) return `${min} - ${max} Cr`;
            return min ? `${min} Cr` : '';
          } catch { return ''; }
        })(),
      }));
    }
    return [];
  }, [trending]);

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
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900">Your Activity</h1>
      <p className="text-gray-600">Recent viewed, liked, and recommended properties</p>

      <Section title="Recently Viewed" items={viewedItems} />
      <Section title="Liked Properties" items={likedList} />
      <Section title="Recommended for You" items={recommended} />
    </div>
  );
}
