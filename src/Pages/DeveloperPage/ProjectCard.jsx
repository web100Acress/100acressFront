import React, { useState } from 'react';
import { gradients, tokens } from './DesignTokens';

export default function ProjectCard({ project, view = 'grid', onExplore, onFavorite, onShare, isFav = false, onCompareToggle, compared, onPhone, onWhatsApp }) {
  const [hovered, setHovered] = useState(false);
  const image = project?.frontImage?.url || project?.frontImage?.cdn_url || '/Images/dummy.webp';
  const priceText = (() => {
    const min = project?.minPrice;
    const max = project?.maxPrice;
    if (typeof min !== 'undefined' && typeof max !== 'undefined') return `${min} - ${max} Cr`;
    if (typeof min !== 'undefined') return `${min} Cr`;
    return '';
  })();

  const cardClass = view === 'list'
    ? 'flex gap-4 items-stretch'
    : '';

  const handlePhone = () => {
    if (typeof onPhone === 'function') return onPhone(project);
    const phone = project?.contactPhone || '+919999999999';
    try { window.location.href = `tel:${phone}`; } catch {}
  };

  const handleWhatsApp = () => {
    if (typeof onWhatsApp === 'function') return onWhatsApp(project);
    const phone = (project?.whatsapp || project?.contactPhone || '919999999999').replace(/\D/g, '');
    const text = encodeURIComponent(`Hi, I'm interested in ${project?.projectName || 'this project'}`);
    const url = `https://wa.me/${phone}?text=${text}`;
    try { window.open(url, '_blank', 'noopener,noreferrer'); } catch {}
  };

  return (
    <article
      className={`rounded-xl border border-gray-200 bg-white/60 backdrop-blur-md shadow-sm hover:shadow-lg transition-all overflow-hidden ${cardClass}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className={`${view === 'list' ? 'w-2/5' : ''} relative`}>
        <img src={image} alt={project?.projectName} className={`${view === 'list' ? 'h-full w-full object-cover' : 'w-full aspect-video object-cover'}`} loading="lazy" />
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={() => onFavorite?.(project)}
            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow border hover:scale-105 transition-transform"
            aria-label={isFav ? 'Unsave' : 'Save'}
          >
            {isFav ? (
              // Filled heart
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="#ef4444" aria-hidden="true">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.188 3 12.9 3 10.25 3 7.902 4.902 6 7.25 6c1.273 0 2.49.495 3.39 1.384L12 8.743l1.36-1.36A4.75 4.75 0 0116.75 6C19.098 6 21 7.902 21 10.25c0 2.65-1.688 4.938-3.989 7.257a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.218l-.022.012-.007.003a.75.75 0 01-.666 0z" />
              </svg>
            ) : (
              // Outline heart
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#ef4444" strokeWidth="1.8" aria-hidden="true">
                <path d="M21 10.25c0 2.65-1.688 4.938-3.989 7.257a25.175 25.175 0 01-4.244 3.17l-.383.218-.022.012-.007.003-.007-.003-.022-.012-.383-.218a25.18 25.18 0 01-4.244-3.17C4.688 15.188 3 12.9 3 10.25 3 7.902 4.902 6 7.25 6c1.273 0 2.49.495 3.39 1.384L12 8.743l1.36-1.36A4.75 4.75 0 0116.75 6C19.098 6 21 7.902 21 10.25z" />
              </svg>
            )}
          </button>
          <button
            onClick={() => onShare?.(project)}
            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow border hover:scale-105 transition-transform"
            aria-label="Share"
          >
            {/* Share icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#111827" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <path d="M8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.49" />
            </svg>
          </button>
        </div>
        {hovered && (
          <div className="absolute inset-0 bg-black/35 text-white p-3 md:p-4 flex items-end pointer-events-none">
            <div className="space-y-1 text-sm">
              {project?.bhk && <div>• {project.bhk}</div>}
              {project?.nearby && <div>• {project.nearby}</div>}
              {project?.usp && <div>• {project.usp}</div>}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`${view === 'list' ? 'flex-1 p-4' : 'p-3 md:p-4'}`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-gray-800 line-clamp-1">{project?.projectName}</h3>
            <div className="text-sm text-gray-500 line-clamp-1">{project?.city}{project?.state ? `, ${project.state}` : ''}</div>
          </div>
          {/* Removed price next to name as requested */}
        </div>

        {/* Pills */}
        <div className="mt-2 flex flex-wrap gap-1.5">
          {priceText && <span className="px-2 py-0.5 rounded-full text-xs bg-red-50 text-red-700 border border-red-100">{priceText}</span>}
          {project?.type && <span className="px-2 py-0.5 rounded-full text-xs bg-gray-50 text-gray-700 border">{project.type}</span>}
          {project?.possessiondate && <span className="px-2 py-0.5 rounded-full text-xs bg-gray-50 text-gray-700 border">Possession {project.possessiondate}</span>}
          {project?.projectAddress && <span className="px-2 py-0.5 rounded-full text-xs bg-gray-50 text-gray-700 border">{project.projectAddress}</span>}
        </div>

        {/* Amenities row removed as requested */}

        {/* Actions */}
        <div className="mt-3 flex items-center justify-between">
          <button
            onClick={() => onExplore?.(project)}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-white text-sm shadow"
            style={{ background: gradients.primary }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            Explore
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePhone}
              title="Call"
              aria-label="Call"
              className="w-9 h-9 rounded-full bg-white/90 border shadow flex items-center justify-center hover:bg-white"
            >
              📞
            </button>
            <button
              onClick={handleWhatsApp}
              title="WhatsApp"
              aria-label="WhatsApp"
              className="w-9 h-9 rounded-full bg-[#25D366] text-white shadow hover:bg-[#1EBE59] flex items-center justify-center"
            >
              {/* WhatsApp SVG icon */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M20.52 3.48A11.78 11.78 0 0 0 12.06 0C5.46 0 .1 5.36.1 11.96c0 2.1.55 4.15 1.6 5.97L0 24l6.25-1.64c1.76.96 3.75 1.47 5.8 1.47h.01c6.6 0 11.96-5.36 11.96-11.96 0-3.2-1.25-6.2-3.5-8.39Zm-8.46 18.4h-.01c-1.76 0-3.48-.47-4.98-1.35l-.36-.21-3.71.97.99-3.62-.23-.37a9.93 9.93 0 0 1-1.52-5.28C2.24 6.5 6.7 2.04 12.06 2.04c2.64 0 5.13 1.03 7 2.9a9.82 9.82 0 0 1 2.9 6.99c0 5.36-4.46 9.92-9.9 9.92ZM17.6 14.2c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.62.14-.18.27-.71.88-.87 1.06-.16.18-.32.2-.6.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.6-1.5-1.87-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.49.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.49-.07-.14-.62-1.49-.85-2.04-.22-.53-.45-.46-.62-.46h-.53c-.18 0-.49.07-.74.34-.25.27-.97.95-.97 2.31 0 1.36.99 2.67 1.14 2.85.14.18 1.95 2.98 4.73 4.06.66.29 1.18.46 1.58.59.66.21 1.26.18 1.74.11.53-.08 1.6-.65 1.83-1.28.23-.63.23-1.18.16-1.28-.07-.11-.25-.18-.52-.32Z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
