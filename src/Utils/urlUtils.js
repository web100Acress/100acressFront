/**
 * Utility functions for URL generation
 * Works in both development (localhost) and production environments
 */

/**
 * Get the base URL for the application
 * @returns {string} Base URL (localhost in dev, 100acress.com in production)
 */
export const getBaseUrl = () => {
  // Check for environment variable first (Vite uses import.meta.env)
  if (import.meta.env.VITE_BASE_URL) {
    return import.meta.env.VITE_BASE_URL;
  }
  
  // Check if we're in browser environment
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    // Check if it's localhost or local IP
    const isLocalhost = hostname === 'localhost' || 
                       hostname === '127.0.0.1' ||
                       hostname.includes('192.168') ||
                       hostname.includes('10.') ||
                       hostname.includes('172.');
    
    if (isLocalhost) {
      return window.location.origin; // Use current localhost URL with port
    } else {
      return 'https://100acress.com'; // Production URL
    }
  }
  
  // Fallback for server-side rendering or Node.js environment
  const isProduction = import.meta.env.MODE === 'production';
  return isProduction ? 'https://100acress.com' : 'http://localhost:3000';
};

/**
 * Generate contact card URL
 * @param {string} slug - Contact card slug
 * @returns {string} Full contact card URL
 */
export const getContactCardUrl = (slug) => {
  return `${getBaseUrl()}/hi/${slug}`;
};

/**
 * Generate QR code URL for contact card
 * @param {string} slug - Contact card slug
 * @returns {string} QR code image URL
 */
export const getQRCodeUrl = (slug) => {
  // Always use production URL for QR codes
  const productionUrl = `https://100acress.com/hi/${slug}`;
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(productionUrl)}`;
};

/**
 * Check if current environment is localhost
 * @returns {boolean} True if localhost, false if production
 */
export const isLocalhost = () => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    return hostname === 'localhost' || 
           hostname === '127.0.0.1' ||
           hostname.includes('192.168') ||
           hostname.includes('10.') ||
           hostname.includes('172.');
  }
  return process.env.NODE_ENV !== 'production';
};
