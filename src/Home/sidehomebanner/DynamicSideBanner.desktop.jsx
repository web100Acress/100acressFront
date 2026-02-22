import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchActiveSideBanners } from '../../Redux/slice/SideBannerSlice';

/*
  DynamicSideBanner - Desktop Version
  - Optimized for desktop devices with hover effects
  - Full-height banner for desktop screens
  - Auto-rotating banners with desktop-optimized timing
*/
const DynamicSideBannerDesktop = () => {
  const dispatch = useDispatch();
  const { activeSideBanners, loading } = useSelector(state => state.sideBanner);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchActiveSideBanners());
  }, [dispatch]);

  // Rotate through banners every 5 seconds (standard for desktop)
  useEffect(() => {
    if (activeSideBanners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => 
        prevIndex === activeSideBanners.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [activeSideBanners]);

  if (loading || activeSideBanners.length === 0) {
    // Fallback to default banner for desktop
    return (
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden" style={{ width: '100%', height: 'calc(100vh - 120px)' }}>
        <img 
          src="Images/M3M Elie Saab Banner Vertical Resized copy3 (1).webp" 
          alt="Premium Real Estate Banner" 
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  const currentBanner = activeSideBanners[currentBannerIndex];

  const handleBannerClick = () => {
    if (currentBanner.link) {
      window.open(currentBanner.link, '_blank');
    } else if (currentBanner.slug) {
      window.open(`https://www.100acress.com/${currentBanner.slug}`, '_blank');
    }
  };

  return (
    <div 
      className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-300" 
      style={{ width: '100%', height: currentBanner.visibilitySettings?.height || 'calc(100vh - 120px)' }}
      onClick={handleBannerClick}
    >
      {currentBanner.image?.cdn_url || currentBanner.image?.url ? (
        <img 
          src={currentBanner.image.cdn_url || currentBanner.image.url}
          alt={currentBanner.title || 'Side Banner'}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <p className="text-gray-500">No image available</p>
        </div>
      )}
    </div>
  );
};

export default DynamicSideBannerDesktop;
