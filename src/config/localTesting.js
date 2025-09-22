// Local Testing Configuration
// This file helps set up local testing for banner management

export const LOCAL_TESTING_CONFIG = {
  // API Base URLs
  LOCAL_API: 'http://localhost:3500',
  PRODUCTION_API: 'https://api.100acress.com',
  
  // Environment detection
  isLocalhost: () => {
    if (typeof window === 'undefined') return false;
    return window.location.hostname === 'localhost' || 
           window.location.hostname === '127.0.0.1' ||
           window.location.hostname.includes('localhost');
  },
  
  // Get appropriate API base
  getApiBase: () => {
    const isLocal = LOCAL_TESTING_CONFIG.isLocalhost();
    return isLocal ? LOCAL_TESTING_CONFIG.LOCAL_API : LOCAL_TESTING_CONFIG.PRODUCTION_API;
  },
  
  // Banner testing endpoints
  getBannerEndpoints: () => {
    const base = LOCAL_TESTING_CONFIG.getApiBase();
    return {
      getAllBanners: `${base}/api/admin/banners`,
      getActiveBanners: `${base}/api/banners/active`,
      uploadBanner: `${base}/api/admin/banners/upload`,
      updateBanner: (id) => `${base}/api/admin/banners/${id}`,
      deleteBanner: (id) => `${base}/api/admin/banners/${id}`,
      toggleBanner: (id) => `${base}/api/admin/banners/${id}/toggle`,
      getAllSmallBanners: `${base}/api/admin/small-banners`,
      getActiveSmallBanners: `${base}/api/small-banners/active`,
      uploadSmallBanner: `${base}/api/admin/small-banners/upload`,
      updateSmallBanner: (id) => `${base}/api/admin/small-banners/${id}`,
      deleteSmallBanner: (id) => `${base}/api/admin/small-banners/${id}`,
      toggleSmallBanner: (id) => `${base}/api/admin/small-banners/${id}/toggle`
    };
  }
};

// Console helper for testing
export const logTestingInfo = () => {
  console.log('🧪 Local Testing Configuration:');
  console.log('📍 Current hostname:', window.location.hostname);
  console.log('🔗 API Base:', LOCAL_TESTING_CONFIG.getApiBase());
  console.log('🏠 Is localhost:', LOCAL_TESTING_CONFIG.isLocalhost());
  console.log('📡 Banner endpoints:', LOCAL_TESTING_CONFIG.getBannerEndpoints());
};

// Auto-log when in development
if (typeof window !== 'undefined' && LOCAL_TESTING_CONFIG.isLocalhost()) {
  logTestingInfo();
}
