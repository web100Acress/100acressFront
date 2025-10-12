/**
 * Utility functions for handling S3 images and CORS issues
 */

import { getApiBase } from '../config/apiBase';

// Fallback image for when all else fails
export const FALLBACK_IMG = "/Images/blog.avif";

/**
 * Convert S3 URL to proxy URL to bypass CORS issues
 * @param {string} s3Url - The original S3 URL
 * @returns {string} - Proxy URL or original URL if not S3
 */
export const convertS3ToProxyUrl = (s3Url) => {
  if (!s3Url || typeof s3Url !== 'string') return '';
  
  // Check if it's an S3 URL that needs proxying
  const s3UrlPattern = /https:\/\/100acress-media-bucket\.s3\.ap-south-1\.amazonaws\.com\/(.+)/;
  const match = s3Url.match(s3UrlPattern);
  
  if (!match) {
    // Not an S3 URL, return as-is
    return s3Url;
  }
  
  const objectKey = match[1];
  
  // Decode the object key if it's already encoded to avoid double-encoding
  const decodedKey = decodeURIComponent(objectKey);
  
  // Use API base URL instead of window.location.origin
  const baseUrl = getApiBase();
  const proxyUrl = `${baseUrl}/api/s3-image/${encodeURIComponent(decodedKey)}`;
  
  
  return proxyUrl;
};

/**
 * Get the best available image URL with fallbacks
 * @param {Object} imageObj - Image object with multiple URL options
 * @returns {string} - Best available image URL
 */
export const getBestImageUrl = (imageObj) => {
  if (!imageObj) return FALLBACK_IMG;
  
  // Handle different image formats
  let bestUrl = '';
  
  if (typeof imageObj === 'string') {
    bestUrl = imageObj;
  } else if (typeof imageObj === 'object') {
    // Prefer CDN URL, then regular URL
    bestUrl = imageObj.cdn_url || imageObj.url || imageObj.Location || '';
  }
  
  // Check if it's a placeholder or invalid URL
  if (!bestUrl || /^data:image\/svg\+xml/i.test(bestUrl)) {
    return FALLBACK_IMG;
  }
  
  // Check if it's a valid S3 URL before converting
  if (isS3Url(bestUrl)) {
    // Test if the URL is likely to work by checking for common issues
    if (bestUrl.includes('%2520') || bestUrl.includes('%2525')) {
      return FALLBACK_IMG;
    }
    
    const proxyUrl = convertS3ToProxyUrl(bestUrl);
    return proxyUrl;
  }
  
  // For non-S3 URLs, return as-is
  return bestUrl;
};

/**
 * Create a safe image element with error handling
 * @param {string} src - Image source URL (should already be converted to proxy URL)
 * @param {string} alt - Alt text
 * @param {Object} options - Additional options
 * @returns {Object} - Image element props
 */
export const createSafeImageProps = (src, alt = '', options = {}) => {
  // If src is already a proxy URL, use it directly
  // Otherwise, convert it using getBestImageUrl
  const safeSrc = src && src.includes('/api/s3-image/') ? src : getBestImageUrl(src);
  
  
  return {
    src: safeSrc,
    alt: alt || 'Image',
    loading: 'lazy',
    referrerPolicy: 'no-referrer',
    crossOrigin: 'anonymous',
    onError: (e) => {
      const img = e?.target;
      if (!img || img.dataset.fallback) return;
      
      // Try alternative image sources first
      if (img.dataset.altSrc && img.src !== img.dataset.altSrc) {
        img.src = img.dataset.altSrc;
        return;
      }
      
      // Final fallback to default image
      if (img.src !== FALLBACK_IMG) {
        img.dataset.fallback = '1';
        img.src = FALLBACK_IMG;
      }
    },
    ...options
  };
};

/**
 * Preload an image and return a promise
 * @param {string} src - Image source URL
 * @returns {Promise<boolean>} - Whether image loaded successfully
 */
export const preloadImage = (src) => {
  return new Promise((resolve) => {
    if (!src) {
      resolve(false);
      return;
    }
    
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = getBestImageUrl(src);
  });
};

/**
 * Batch preload multiple images
 * @param {Array<string>} srcs - Array of image sources
 * @returns {Promise<Array<boolean>>} - Array of success statuses
 */
export const preloadImages = async (srcs) => {
  if (!Array.isArray(srcs)) return [];
  
  const promises = srcs.map(src => preloadImage(src));
  return Promise.all(promises);
};

/**
 * Check if an image URL is from S3
 * @param {string} url - Image URL to check
 * @returns {boolean} - Whether URL is from S3
 */
export const isS3Url = (url) => {
  if (!url || typeof url !== 'string') return false;
  return /100acress-media-bucket\.s3\.ap-south-1\.amazonaws\.com/.test(url);
};

/**
 * Get image dimensions from URL (if available in metadata)
 * @param {string} src - Image source URL
 * @returns {Promise<{width: number, height: number} | null>}
 */
export const getImageDimensions = (src) => {
  return new Promise((resolve) => {
    if (!src) {
      resolve(null);
      return;
    }
    
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };
    img.onerror = () => resolve(null);
    img.src = getBestImageUrl(src);
  });
};
