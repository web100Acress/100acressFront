// Cache invalidation utilities for banner management

import { clearBannerCache, clearSettingsCache, invalidateCache } from './apiCache';

// Invalidate cache when banners are updated
export const invalidateBannerCache = () => {
  console.log('Invalidating banner cache...');
  clearBannerCache();
  invalidateCache('banners');
  invalidateCache('small-banners');
};

// Invalidate cache when settings are updated
export const invalidateSettingsCache = () => {
  console.log('Invalidating settings cache...');
  clearSettingsCache();
  invalidateCache('settings');
};

// Invalidate all cache
export const invalidateAllCache = () => {
  console.log('Invalidating all cache...');
  clearBannerCache();
  clearSettingsCache();
  invalidateCache('');
};

// Cache invalidation for specific operations
export const cacheInvalidationMap = {
  // Banner operations
  'banner-upload': invalidateBannerCache,
  'banner-update': invalidateBannerCache,
  'banner-delete': invalidateBannerCache,
  'banner-toggle': invalidateBannerCache,
  
  // Small banner operations
  'small-banner-upload': invalidateBannerCache,
  'small-banner-update': invalidateBannerCache,
  'small-banner-delete': invalidateBannerCache,
  'small-banner-toggle': invalidateBannerCache,
  
  // Settings operations
  'settings-update': invalidateSettingsCache,
  'shorts-settings-update': invalidateSettingsCache,
  
  // Global operations
  'admin-login': invalidateAllCache,
  'admin-logout': invalidateAllCache,
};

// Auto-invalidate cache based on operation type
export const autoInvalidateCache = (operationType) => {
  const invalidateFn = cacheInvalidationMap[operationType];
  if (invalidateFn) {
    invalidateFn();
  } else {
    console.warn(`No cache invalidation strategy for operation: ${operationType}`);
  }
};

// Hook for cache invalidation in React components
export const useCacheInvalidation = () => {
  return {
    invalidateBannerCache,
    invalidateSettingsCache,
    invalidateAllCache,
    autoInvalidateCache
  };
};
