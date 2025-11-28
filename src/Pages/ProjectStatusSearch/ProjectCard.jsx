import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../AuthContext';
import AuthModal from '../../Resister/AuthModal';
import {
  isFavorite as favCheck,
  toggleFavorite,
  subscribe,
  hydrateFavoritesFromServer,
} from '../../Utils/favorites';

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
  const { isAuthenticated } = useContext(AuthContext);
  const [showAuth, setShowAuth] = useState(false);
  const [favTick, setFavTick] = useState(0);
  const image = project?.thumbnailImage?.url || project?.frontImage?.url || project?.frontImage?.cdn_url || '/Images/dummy.webp';
  
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

  // Hydrate favorites once and subscribe for cross-component updates
  useEffect(() => {
    try {
      hydrateFavoritesFromServer();
    } catch (_) {}
    const unsub = subscribe(() => setFavTick((v) => v + 1));
    return () => {
      if (typeof unsub === "function") unsub();
    };
  }, []);

  const handleFavoriteClick = (e, id, project) => {
    e.preventDefault();
    e.stopPropagation();

    const snapshot = {
      title: project?.projectName,
      frontImage: project?.frontImage,
      thumbnailImage: project?.thumbnailImage,
      priceText: (() => {
        try {
          const min = project?.minPrice ?? project?.price;
          if (!min) return "Price on request";
          return `₹${min} Cr`;
        } catch {
          return undefined;
        }
      })(),
      url: project.project_url ? `/${project.project_url}/` : undefined,
      city: project?.city,
      maxPrice: project?.maxPrice || project?.price,
      minPrice: project?.minPrice,
    };

    if (!isAuthenticated) {
      // Show login modal
      setShowAuth(true);
      // Show toast notification
      if (typeof window.toast === "function") {
        window.toast.info("Please login to save properties to your favorites");
      }
      return;
    }
    toggleFavorite(id, snapshot, isAuthenticated);
    setFavTick((v) => v + 1);
  };

  // Calculate project ID for favorites
  const id = project?._id || project?.id || project?.slug || project?.project_url;

  return (
    <>
      <article
        className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden ${cardClass} cursor-pointer group`}
        onClick={openProject}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter') openProject(); }}
      >
      {/* Image Section */}
      <div className={`${view === 'list' ? 'w-1/3' : ''} relative h-40 sm:h-48 overflow-hidden`}>
        <img 
          src={image} 
          alt={project?.projectName} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
          loading="lazy" 
        />
        
        {/* RERA Badge */}
        <div className="absolute top-3 left-3 z-[3]">
          <div className="bg-white/95 backdrop-blur-sm rounded-full px-2 py-1 shadow-md border border-gray-200 flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="#dc2626" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
            </svg>
            <span className="text-[9px] font-bold text-red-600 tracking-wide">RERA</span>
          </div>
        </div>
        
        {/* Heart and Share */}
        <div className="absolute top-0 right-0 flex gap-1">
          <button
            type="button"
            aria-label={
              favCheck(id)
                ? "Remove from wishlist"
                : isAuthenticated
                ? "Add to wishlist"
                : "Login to add to wishlist"
            }
            title={
              favCheck(id)
                ? "Remove from wishlist"
                : isAuthenticated
                ? "Add to wishlist"
                : "Login to add to wishlist"
            }
            className={`inline-flex items-center justify-center w-6 h-6 rounded-full transition-all duration-200 ${
              favCheck(id) ? "" : "bg-transparent"
            }border-white transition`}
            onClick={(e) => handleFavoriteClick(e, id, project)}
          >
            {favCheck(id) ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="red"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#d1d5db"
                strokeWidth="2"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-100"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            )}
          </button>
          {/* <button
            onClick={(e) => { e.stopPropagation(); onShare?.(project); }}
            className="w-6 h-6 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200"
            aria-label="Share"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#D32F2F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <path d="M8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.49" />
            </svg>
          </button> */}
        </div>
      </div>

      {/* Content Section */}
      <div className={`${view === 'list' ? 'flex-1 p-3 sm:p-4' : 'p-3 sm:p-4'}`}>
        {/* Project Info */}
        <div className="mb-3">
          <h3 className="font-semibold text-base sm:text-lg text-gray-900 line-clamp-1 mb-2">
            {project?.projectName}
          </h3>
          
          {priceText && (
            <div className="text-sm sm:text-lg font-bold text-red-600 mb-2">
              {priceText}
            </div>
          )}
          
          <div className="text-xs sm:text-sm text-gray-600">
            <p className="line-clamp-1 mb-1">
              {project?.projectAddress || project?.address || project?.location}
            </p>
            <p className="line-clamp-1">
              {project?.city}{project?.state ? `, ${project.state}` : ''}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={(e) => { e.stopPropagation(); onExplore?.(project); }}
            className="px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-red-700 transition-colors duration-200"
          >
            Explore
          </button>
          
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); handlePhone(); }}
              title="Call"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#D32F2F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); handleWhatsApp(); }}
              title="WhatsApp"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="#D32F2F">
                <path d="M20.52 3.48A11.78 11.78 0 0 0 12.06 0C5.46 0 .1 5.36.1 11.96c0 2.1.55 4.15 1.6 5.97L0 24l6.25-1.64c1.76.96 3.75 1.47 5.8 1.47h.01c6.60 0 11.96-5.36 11.96-11.96 0-3.2-1.25-6.2-3.5-8.39Zm-8.46 18.4h-.01c-1.76 0-3.48-.47-4.98-1.35l-.36-.21-3.71.97.99-3.62-.23-.37a9.93 9.93 0 0 1-1.52-5.28C2.24 6.5 6.7 2.04 12.06 2.04c2.64 0 5.13 1.03 7 2.9a9.82 9.82 0 0 1 2.9 6.99c0 5.36-4.46 9.92-9.9 9.92ZM17.6 14.2c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.62.14-.18.27-.71.88-.87 1.06-.16.18-.32.2-.6.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.6-1.5-1.87-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.49.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.49-.07-.14-.62-1.49-.85-2.04-.22-.53-.45-.46-.62-.46h-.53c-.18 0-.49.07-.74.34-.25.27-.97.95-.97 2.31 0 1.36.99 2.67 1.14 2.85.14.18 1.95 2.98 4.73 4.06.66.29 1.18.46 1.58.59.66.21 1.26.18 1.74.11.53-.08 1.6-.65 1.83-1.28.23-.63.23-1.18.16-1.28-.07-.11-.25-.18-.52-.32Z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>

    {/* Auth Modal for Login/Register */}
    <AuthModal
      open={showAuth}
      onClose={() => setShowAuth(false)}
      defaultView="Login"
    />
    </>
  );
}