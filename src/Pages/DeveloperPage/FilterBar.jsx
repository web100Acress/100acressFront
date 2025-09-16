import React from 'react';
import { gradients } from './DesignTokens';

export default function FilterBar({ view, setView, sort, setSort, mapView, setMapView }) {
  const sorts = [
    { key: 'price', label: 'Price' },
    { key: 'rating', label: 'Rating' },
    { key: 'newest', label: 'Newest' },
    { key: 'nearest', label: 'Nearest' },
  ];

  return (
    <div className="sticky top-16 z-30 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {sorts.map(s => (
            <button
              key={s.key}
              onClick={() => setSort?.(s.key)}
              className={`px-3 py-1.5 rounded-full text-sm border ${sort === s.key ? 'bg-gray-900 text-white border-gray-900' : 'bg-white hover:bg-gray-50'}`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button title="Grid view" onClick={() => setView?.('grid')} className={`px-3 py-1.5 rounded-lg border ${view === 'grid' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white'}`}>▦</button>
          <button title="List view" onClick={() => setView?.('list')} className={`px-3 py-1.5 rounded-lg border ${view === 'list' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white'}`}>☰</button>
          <button onClick={() => setMapView?.(!mapView)} className="px-3 py-1.5 rounded-lg text-white" style={{background: gradients.primary}}>
            {mapView ? 'Hide Map' : 'Map View'}
          </button>
        </div>
      </div>
    </div>
  );
}
