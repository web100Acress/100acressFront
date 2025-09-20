import React, { useState } from 'react';
import { gradients, tokens } from './DesignTokens';

export default function ProjectCard({ 
  project, 
  view = 'grid', 
  onExplore, 
  onFavorite, 
  onShare, 
  isFav = false, 
  onCompareToggle, 
  compared, 
  onPhone, 
  onWhatsApp,
  projectStatus = 'upcoming'
}) {
  const [hovered, setHovered] = useState(false);
  const image = project?.frontImage?.url || project?.frontImage?.cdn_url || '/Images/dummy.webp';
  
  const priceText = (() => {
    const min = project?.minPrice;
    const max = project?.maxPrice;
    if (typeof min !== 'undefined' && typeof max !== 'undefined') {
      if (min < 1) {
        return `₹${(min * 100).toFixed(0)}L - ₹${(max * 100).toFixed(0)}L`;
      }
      return `₹${min}Cr - ₹${max}Cr`;
    }
    if (typeof min !== 'undefined') {
      if (min < 1) {
        return `₹${(min * 100).toFixed(0)}L`;
      }
      return `₹${min}Cr`;
    }
    return '';
  })();

  const cardClass = view === 'list'
    ? 'flex gap-4 items-stretch'
    : '';

  // Try to use the same primary phone number used on the project page
  const resolvePhone = (p) => {
    const keys = [
      'primaryPhone', 'primaryNo', 'primary_number', 'primary_phone',
      'salesPhone', 'sales_number', 'contactPhone', 'contact_number',
      'phone1', 'phone', 'mobile', 'projectContact', 'leadPhone'
    ];
    for (const k of keys) {
      const v = p?.[k];
      if (typeof v === 'string' && v.trim()) return v.trim();
    }
    return '';
  };

  const handlePhone = () => {
    if (typeof onPhone === 'function') return onPhone(project);
    const phone = resolvePhone(project) || '+918500900100';
    try { window.location.href = `tel:${phone}`; } catch {}
  };

  const handleWhatsApp = () => {
    if (typeof onWhatsApp === 'function') return onWhatsApp(project);
    const phone = '918500900100'; // +91 85009 00100
    const text = encodeURIComponent(`Hi, I'm interested in ${project?.projectName || 'this project'}`);
    const url = `https://wa.me/${phone}?text=${text}`;
    try { window.open(url, '_blank', 'noopener,noreferrer'); } catch {}
  };

  const openProject = () => onExplore?.(project);

  return (
    <article
      className={`rounded-xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden ${cardClass} cursor-pointer group h-[360px]`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={openProject}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') openProject(); }}
    >
      {/* Image Section - 50% height (180px) */}
      <div className={`${view === 'list' ? 'w-2/5' : ''} relative h-[180px] overflow-hidden`}>
        <img 
          src={image} 
          alt={project?.projectName} 
          className={`${view === 'list' ? 'h-full w-full object-cover' : 'w-full h-full object-cover'} transition-transform duration-300 group-hover:scale-105`} 
          loading="lazy" 
        />
        
        {/* RERA Approved Badge - Top Left */}
        <div className="absolute top-2 left-2">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-green-600 text-white shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            RERA
          </span>
        </div>
        
        {/* Heart and Share - Top Right */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onFavorite?.(project); }}
            className="w-6 h-6 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
            aria-label={isFav ? 'Unsave' : 'Save'}
          >
            {isFav ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="#E53935" aria-hidden="true">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.188 3 12.9 3 10.25 3 7.902 4.902 6 7.25 6c1.273 0 2.49.495 3.39 1.384L12 8.743l1.36-1.36A4.75 4.75 0 0116.75 6C19.098 6 21 7.902 21 10.25c0 2.65-1.688 4.938-3.989 7.257a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.218l-.022.012-.007.003a.75.75 0 01-.666 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#6B7280" strokeWidth="1.5" aria-hidden="true">
                <path d="M21 10.25c0 2.65-1.688 4.938-3.989 7.257a25.175 25.175 0 01-4.244 3.17l-.383.218-.022.012-.007.003-.007-.003-.022-.012-.383-.218a25.18 25.18 0 01-4.244-3.17C4.688 15.188 3 12.9 3 10.25 3 7.902 4.902 6 7.25 6c1.273 0 2.49.495 3.39 1.384L12 8.743l1.36-1.36A4.75 4.75 0 0116.75 6C19.098 6 21 7.902 21 10.25z" />
              </svg>
            )}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onShare?.(project); }}
            className="w-6 h-6 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
            aria-label="Share"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <path d="M8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.49" />
            </svg>
          </button>
        </div>
        
        {/* Project Type Badge - Bottom Left of Image */}
        {project?.type && (
          <div className="absolute bottom-2 left-2">
            <span className="inline-block px-1.5 py-0.5 rounded text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-700 shadow-sm">
              {project.type}
            </span>
          </div>
        )}
      </div>

      {/* Content Section - 50% height (180px) */}
      <div className={`${view === 'list' ? 'flex-1 p-3' : 'p-3'} flex flex-col justify-between h-[180px]`}>
        {/* Project Info */}
        <div className="mb-1">
          <h3 className="font-bold text-base text-gray-900 line-clamp-1 mb-0.5">{project?.projectName}</h3>
          <div className="text-xs text-gray-600 mb-1">
            <p className="line-clamp-1 mb-0">
              {project?.projectAddress || project?.address || project?.location}
            </p>
            <p className="line-clamp-1">
              {project?.city}{project?.state ? `, ${project.state}` : ''}
            </p>
          </div>
          
          {/* Price Display */}
          {priceText && (
            <div className="text-sm font-bold text-gray-800 mb-1">
              {priceText}
            </div>
          )}
        </div>

        {/* Actions - Fixed at bottom */}
        <div className="flex items-center justify-between mt-auto">
          <button
            onClick={(e) => { e.stopPropagation(); onExplore?.(project); }}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-white text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
            style={{ 
              background: 'linear-gradient(180deg, #ff6b6b 0%, #E53935 100%)',
              boxShadow: '0 2px 8px rgba(229, 57, 53, 0.3)'
            }}
          >
            Explore
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => { e.stopPropagation(); handlePhone(); }}
              title="Call"
              aria-label="Call"
              className="w-6 h-6 rounded-full bg-white border border-gray-300 shadow-sm flex items-center justify-center hover:shadow-md hover:border-gray-400 hover:scale-110 transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); handleWhatsApp(); }}
              title="WhatsApp"
              aria-label="WhatsApp"
              className="w-6 h-6 rounded-full bg-white border border-gray-300 shadow-sm flex items-center justify-center hover:shadow-md hover:border-gray-400 hover:scale-110 transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" fill="#25D366" aria-hidden="true">
                <path d="M20.52 3.48A11.78 11.78 0 0 0 12.06 0C5.46 0 .1 5.36.1 11.96c0 2.1.55 4.15 1.6 5.97L0 24l6.25-1.64c1.76.96 3.75 1.47 5.8 1.47h.01c6.6 0 11.96-5.36 11.96-11.96 0-3.2-1.25-6.2-3.5-8.39Zm-8.46 18.4h-.01c-1.76 0-3.48-.47-4.98-1.35l-.36-.21-3.71.97.99-3.62-.23-.37a9.93 9.93 0 0 1-1.52-5.28C2.24 6.5 6.7 2.04 12.06 2.04c2.64 0 5.13 1.03 7 2.9a9.82 9.82 0 0 1 2.9 6.99c0 5.36-4.46 9.92-9.9 9.92ZM17.6 14.2c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.62.14-.18.27-.71.88-.87 1.06-.16.18-.32.2-.6.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.6-1.5-1.87-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.49.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.49-.07-.14-.62-1.49-.85-2.04-.22-.53-.45-.46-.62-.46h-.53c-.18 0-.49.07-.74.34-.25.27-.97.95-.97 2.31 0 1.36.99 2.67 1.14 2.85.14.18 1.95 2.98 4.73 4.06.66.29 1.18.46 1.58.59.66.21 1.26.18 1.74.11.53-.08 1.6-.65 1.83-1.28.23-.63.23-1.18.16-1.28-.07-.11-.25-.18-.52-.32Z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
