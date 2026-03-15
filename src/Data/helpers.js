/**
 * Static Data Helpers
 * 
 * Utility functions for accessing and manipulating static data.
 * Use these functions in your components and pages to get the right data.
 */

import { 
  staticDataRegistry, 
  urlPatternRegistry,
  getAllPageKeys,
  getProjectPageKeys,
  getBHKPageKeys,
  hasPageData
} from './index.js';

/**
 * Get static data by page key
 * @param {string} key - The page key (e.g., 'projects/upcoming', 'bhk/1')
 * @returns {object|null} The page data or null if not found
 */
export const getStaticData = (key) => {
  if (!key) return null;
  return staticDataRegistry[key] || null;
};

/**
 * Get static data by URL path
 * @param {string} urlPath - The URL path (e.g., '/projects/upcoming', '/1-bhk-flats-in-gurgaon')
 * @returns {object|null} The page data or null if not found
 */
export const getStaticDataByUrl = (urlPath) => {
  if (!urlPath) return null;
  
  // Normalize URL path
  const normalized = urlPath.toLowerCase().replace(/\/$/, '');
  
  // Find matching pattern
  const match = urlPatternRegistry.find(item => 
    item.pattern.toLowerCase() === normalized ||
    item.pattern.toLowerCase() === normalized + '/'
  );
  
  if (match) {
    return getStaticData(match.key);
  }
  
  return null;
};

/**
 * Get SEO data for a page
 * @param {string} key - The page key
 * @returns {object} SEO data object with metaTitle, metaDescription, etc.
 */
export const getSEOData = (key) => {
  const data = getStaticData(key);
  if (!data) return {};
  
  return {
    title: data.seo?.metaTitle || data.title || '',
    description: data.seo?.metaDescription || data.description || '',
    canonical: data.seo?.canonical || '',
    keywords: data.seo?.keywords || '',
    ogTitle: data.seo?.ogTitle || data.seo?.metaTitle || '',
    ogDescription: data.seo?.ogDescription || data.seo?.metaDescription || '',
    ogImage: data.seo?.ogImage || '',
    ...data.seo
  };
};

/**
 * Get Hero section data for a page
 * @param {string} key - The page key
 * @returns {object} Hero data object
 */
export const getHeroData = (key) => {
  const data = getStaticData(key);
  if (!data) return {};
  
  return data.hero || {
    title: data.h1 || data.title || '',
    subtitle: data.subtitle || '',
    description: data.description || ''
  };
};

/**
 * Get FAQs for a page
 * @param {string} key - The page key
 * @returns {array} Array of FAQ objects
 */
export const getFAQs = (key) => {
  const data = getStaticData(key);
  return data?.faqs || [];
};

/**
 * Get filters configuration for a page
 * @param {string} key - The page key
 * @returns {object} Filters configuration
 */
export const getFilters = (key) => {
  const data = getStaticData(key);
  return data?.filters || {};
};

/**
 * Get sort options for a page
 * @param {string} key - The page key
 * @returns {array} Array of sort options
 */
export const getSortOptions = (key) => {
  const data = getStaticData(key);
  return data?.sortOptions || [];
};

/**
 * Get custom fields for a page
 * @param {string} key - The page key
 * @returns {object} Custom fields object
 */
export const getCustomFields = (key) => {
  const data = getStaticData(key);
  return data?.customFields || {};
};

/**
 * Get page title and H1
 * @param {string} key - The page key
 * @returns {object} Object with title and h1
 */
export const getPageTitles = (key) => {
  const data = getStaticData(key);
  return {
    title: data?.title || '',
    h1: data?.h1 || data?.title || '',
    subtitle: data?.subtitle || ''
  };
};

/**
 * Get intro text for a page
 * @param {string} key - The page key
 * @returns {string} Intro text
 */
export const getIntroText = (key) => {
  const data = getStaticData(key);
  return data?.introText || data?.description || '';
};

/**
 * Get highlights for a page
 * @param {string} key - The page key
 * @returns {array} Array of highlight strings
 */
export const getHighlights = (key) => {
  const data = getStaticData(key);
  return data?.highlights || [];
};

/**
 * Get all data for a page in one call
 * @param {string} key - The page key
 * @returns {object} Complete page data
 */
export const getAllPageData = (key) => {
  return getStaticData(key);
};

/**
 * Check if page is a project listing page
 * @param {string} key - The page key
 * @returns {boolean}
 */
export const isProjectPage = (key) => {
  return key?.startsWith('projects/');
};

/**
 * Check if page is a BHK listing page
 * @param {string} key - The page key
 * @returns {boolean}
 */
export const isBHKPage = (key) => {
  return key?.startsWith('bhk/');
};

/**
 * Check if page is a city page
 * @param {string} key - The page key
 * @returns {boolean}
 */
export const isCityPage = (key) => {
  return key?.startsWith('city/');
};

/**
 * Check if page is a status page
 * @param {string} key - The page key
 * @returns {boolean}
 */
export const isStatusPage = (key) => {
  return key?.startsWith('status/');
};

/**
 * Check if page is a budget page
 * @param {string} key - The page key
 * @returns {boolean}
 */
export const isBudgetPage = (key) => {
  return key?.startsWith('budget/');
};

/**
 * Check if page is a type page
 * @param {string} key - The page key
 * @returns {boolean}
 */
export const isTypePage = (key) => {
  return key?.startsWith('type/');
};

/**
 * Get badge info for a page
 * @param {string} key - The page key
 * @returns {object} Badge info with text and color
 */
export const getPageBadge = (key) => {
  const customFields = getCustomFields(key);
  return {
    text: customFields?.badge || '',
    color: customFields?.badgeColor || '#3B82F6'
  };
};

/**
 * Search pages by keyword
 * @param {string} keyword - Search keyword
 * @returns {array} Array of matching page keys
 */
export const searchPages = (keyword) => {
  if (!keyword) return [];
  
  const searchTerm = keyword.toLowerCase();
  return getAllPageKeys().filter(key => {
    const data = getStaticData(key);
    if (!data) return false;
    
    const searchable = [
      data.title,
      data.h1,
      data.description,
      data.seo?.metaTitle,
      data.seo?.metaDescription,
      data.seo?.keywords
    ].join(' ').toLowerCase();
    
    return searchable.includes(searchTerm);
  });
};

/**
 * Get related pages
 * @param {string} currentKey - Current page key
 * @param {number} limit - Maximum number of related pages
 * @returns {array} Array of related page data
 */
export const getRelatedPages = (currentKey, limit = 3) => {
  const allKeys = getAllPageKeys().filter(k => k !== currentKey);
  
  // Get keys from same category
  const isProject = isProjectPage(currentKey);
  const isBHK = isBHKPage(currentKey);
  const isCity = isCityPage(currentKey);
  const isStatus = isStatusPage(currentKey);
  const isBudget = isBudgetPage(currentKey);
  const isType = isTypePage(currentKey);
  
  const relatedKeys = allKeys.filter(key => {
    if (isProject) return isProjectPage(key);
    if (isBHK) return isBHKPage(key);
    if (isCity) return isCityPage(key);
    if (isStatus) return isStatusPage(key);
    if (isBudget) return isBudgetPage(key);
    if (isType) return isTypePage(key);
    return false;
  });
  
  return relatedKeys
    .slice(0, limit)
    .map(key => ({
      key,
      ...getPageTitles(key)
    }));
};

/**
 * Hook for using static data in React components
 * Usage: const pageData = useStaticData('projects/upcoming');
 */
export const useStaticData = (key) => {
  return getAllPageData(key);
};

/**
 * Hook for using SEO data in React components
 * Usage: const seo = useSEOData('projects/upcoming');
 */
export const useSEOData = (key) => {
  return getSEOData(key);
};

// Export all helper functions
export default {
  getStaticData,
  getStaticDataByUrl,
  getSEOData,
  getHeroData,
  getFAQs,
  getFilters,
  getSortOptions,
  getCustomFields,
  getPageTitles,
  getIntroText,
  getHighlights,
  getAllPageData,
  isProjectPage,
  isBHKPage,
  isCityPage,
  isStatusPage,
  isBudgetPage,
  isTypePage,
  getPageBadge,
  searchPages,
  getRelatedPages,
  useStaticData,
  useSEOData
};
