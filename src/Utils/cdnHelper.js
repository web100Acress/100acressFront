// CDN Helper Utility
// For future CloudFront implementation

const CDN_CONFIG = {
  // Current: No CDN (localhost/production)
  // Future: Replace with CloudFront URL
  CDN_URL: process.env.REACT_APP_CDN_URL || '',
  
  // Image optimization settings
  IMAGE_QUALITY: {
    thumbnail: 80,
    medium: 85,
    large: 90
  },
  
  // Supported formats
  SUPPORTED_FORMATS: ['webp', 'avif', 'jpg', 'png']
};

/**
 * CDN-FIRST image URL strategy (FIXED - as recommended)
 * Priority: cdn_url → url → path + CDN → fallback
 * @param {object} project - Project object with image data
 * @returns {string} - Optimized CDN URL
 */
export const getProjectImageUrl = (project) => {
  // Priority 1: Database CDN URL (highest priority)
  if (project?.frontImage?.cdn_url) {
    return project.frontImage.cdn_url;
  }

  // Priority 2: Original URL (fallback)
  if (project?.frontImage?.url) {
    return project.frontImage.url;
  }

  // Priority 3: Path + CDN URL (if CDN is configured)
  if (project?.frontImage?.path && CDN_CONFIG.CDN_URL) {
    return `${CDN_CONFIG.CDN_URL}${project.frontImage.path}`;
  }

  // Priority 4: CDN dummy image (if CDN is configured)
  if (CDN_CONFIG.CDN_URL) {
    return `${CDN_CONFIG.CDN_URL}/Images/dummy.webp`;
  }
  
  // Final fallback: local dummy image
  return '/Images/dummy.webp';
};

/**
 * Get optimized image URL with CDN
 * @param {string} imagePath - Original image path
 * @param {object} options - Optimization options
 * @returns {string} - CDN optimized URL
 */
export const getOptimizedImageUrl = (imagePath, options = {}) => {
  if (!imagePath) return '/Images/dummy.webp';
  
  // If CDN is not configured, return original path
  if (!CDN_CONFIG.CDN_URL) {
    return imagePath;
  }
  
  const { quality = 'medium', format = 'webp', width, height } = options;
  
  // Future CDN URL structure with dynamic resizing
  let cdnUrl = `${CDN_CONFIG.CDN_URL}${imagePath}`;
  
  // Add query parameters for optimization
  const params = new URLSearchParams();
  params.set('quality', CDN_CONFIG.IMAGE_QUALITY[quality]);
  params.set('format', format);
  
  if (width) params.set('width', width);
  if (height) params.set('height', height);
  
  return `${cdnUrl}?${params.toString()}`;
};

/**
 * Get image with lazy loading attributes
 * @param {string} src - Image source
 * @param {object} options - Image options
 * @returns {object} - Props for img tag
 */
export const getImageProps = (src, options = {}) => {
  const { 
    alt = '', 
    loading = 'lazy', 
    decoding = 'async',
    className = '',
    sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  } = options;
  
  return {
    src: getOptimizedImageUrl(src, options),
    alt,
    loading,
    decoding,
    className,
    sizes
  };
};

/**
 * Check if CDN is available
 * @returns {boolean}
 */
export const isCdnAvailable = () => {
  return Boolean(CDN_CONFIG.CDN_URL);
};

export default CDN_CONFIG;
