import React, { useMemo, useState, useCallback } from 'react';
import { gradients, tokens } from './DesignTokens';

const chips = [
  { key: 'price', label: 'Price' },
  { key: 'location', label: 'Location' },
  { key: 'type', label: 'Project Type' },
  { key: 'possession', label: 'Possession' },
];

export default function Hero({ onExplore, onContact, onSearch, title = 'Developer Page', subtitle = 'Premium projects crafted with quality, sustainability, and exceptional after‑sales service.' }) {
  const bgStyle = useMemo(() => ({
    background: `${gradients.darkOverlay}, url('/Images/mainbg.webp') center/cover no-repeat`,
  }), []);
  const [text, setText] = useState('');
  const handleSearch = useCallback(() => {
    const q = (text || '').trim();
    if (onSearch && q) onSearch(q);
  }, [text, onSearch]);

  return (
    <section className="relative w-full" style={bgStyle}>
      <div className="absolute inset-0" style={{backdropFilter: 'blur(2px)'}} />
      <div className="relative max-w-screen-xl mx-auto px-4 md:px-6 pt-14 md:pt-20 pb-8 md:pb-10 text-white">
        <div className="mx-auto text-center">
          <h1
            className="mt-4 md:mt-6 font-extrabold leading-tight font-['Poppins','Inter',sans-serif] whitespace-nowrap overflow-hidden text-ellipsis"
            style={{ fontSize: 'clamp(14px, 3vw, 30px)' }}
          >
            {title}
          </h1>
          <p className="mt-3 text-white/85 text-base md:text-lg">{subtitle}</p>
        </div>

        {/* Search + chips */}
        <div className="mt-6 md:mt-8 bg-white/10 rounded-2xl p-3 md:p-4 border border-white/20 backdrop-blur max-w-3xl mx-auto">
          <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2">
            <span className="text-gray-400">🔎</span>
            <input
              placeholder="Search by city, locality or project"
              className="flex-1 outline-none py-2 text-gray-800"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
            />
            <button onClick={handleSearch} className="px-3 py-1.5 rounded-lg text-white" style={{background: gradients.primary}}>Search</button>
          </div>
        </div>

        {/* CTAs removed per request */}
      </div>
    </section>
  );
}
