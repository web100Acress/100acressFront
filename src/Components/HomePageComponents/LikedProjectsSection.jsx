import React, { useEffect, useState } from 'react';
import { hydrateFavoritesFromServer, subscribe, getFavoritesData, getFavorites } from '../../utils/favorites';

const LikedProjectsSection = () => {
  const [ids, setIds] = useState(() => getFavorites());
  const [data, setData] = useState(() => getFavoritesData());

  useEffect(() => {
    hydrateFavoritesFromServer();
    setData(getFavoritesData());
    const unsub = subscribe((nextIds) => {
      setIds(nextIds || []);
      setData(getFavoritesData());
    });
    return () => unsub();
  }, []);

  if (!ids || ids.length === 0) return null;

  const items = ids
    .map((id) => data[String(id)])
    .filter(Boolean);

  if (items.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
      <div className="mb-4">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">Your Liked Projects</h3>
        <p className="text-gray-600 text-sm">Quick access to your favorites across the site</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((p) => (
          <a
            key={p.id}
            href={p.url || '#'}
            className="block bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden border border-gray-100"
          >
            <div className="relative h-40 overflow-hidden">
              {p.image ? (
                <img src={p.image} alt={p.title || 'Project'} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-100" />
              )}
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-900 truncate mr-2">{p.title || 'Project'}</h4>
                {p.city ? <span className="text-xs text-gray-500">{p.city}</span> : null}
              </div>
              {p.priceText ? (
                <div className="mt-2 inline-block text-xs font-medium text-white bg-red-600 rounded-full px-2 py-1">
                  {p.priceText}
                </div>
              ) : null}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default LikedProjectsSection;
