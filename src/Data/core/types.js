/**
 * Static Data Management System
 * 
 * This file defines the core types and interfaces for the static data system.
 * All page types should follow these structures.
 */

// SEO Meta Data Structure
export const createMetaData = (data) => ({
  metaTitle: data.metaTitle || '',
  metaDescription: data.metaDescription || '',
  canonical: data.canonical || '',
  keywords: data.keywords || '',
  ogTitle: data.ogTitle || data.metaTitle || '',
  ogDescription: data.ogDescription || data.metaDescription || '',
  ogImage: data.ogImage || '',
  twitterCard: data.twitterCard || 'summary_large_image',
  ...data
});

// Hero Section Structure
export const createHeroData = (data) => ({
  title: data.title || '',
  subtitle: data.subtitle || '',
  description: data.description || '',
  backgroundImage: data.backgroundImage || '',
  ctaText: data.ctaText || 'Explore Projects',
  ctaLink: data.ctaLink || '#projects',
  ...data
});

// FAQ Item Structure
export const createFAQItem = (question, answer) => ({
  question,
  answer,
  id: `faq-${Math.random().toString(36).substr(2, 9)}`
});

// Page Data Structure Template
export const createPageData = (pageType, data) => ({
  pageType,
  urlPattern: data.urlPattern || '',
  
  // SEO
  seo: createMetaData(data.seo || data),
  
  // Hero Section
  hero: createHeroData(data.hero || data),
  
  // Content
  title: data.title || '',
  description: data.description || '',
  h1: data.h1 || '',
  subtitle: data.subtitle || '',
  
  // FAQs
  faqs: (data.faqs || []).map(faq => 
    typeof faq === 'object' && faq.question 
      ? createFAQItem(faq.question, faq.answer)
      : faq
  ),
  
  // Custom Fields
  ...data.customFields,
  
  // Metadata
  lastUpdated: data.lastUpdated || new Date().toISOString(),
  version: data.version || '1.0'
});

// URL Pattern Matcher
export const matchUrlPattern = (url, pattern) => {
  // Convert pattern to regex
  // /projects/:type/ -> matches /projects/upcoming/, /projects/featured/, etc.
  const regexPattern = pattern
    .replace(/:([^/]+)/g, '([^/]+)')
    .replace(/\*/g, '.*');
  
  const regex = new RegExp(`^${regexPattern}$`, 'i');
  const match = url.match(regex);
  
  if (!match) return null;
  
  // Extract named parameters
  const params = {};
  const paramNames = [];
  const paramRegex = /:([^/]+)/g;
  let paramMatch;
  
  while ((paramMatch = paramRegex.exec(pattern)) !== null) {
    paramNames.push(paramMatch[1]);
  }
  
  paramNames.forEach((name, index) => {
    params[name] = match[index + 1];
  });
  
  return params;
};

// Page Type Registry
export const PAGE_TYPES = {
  // Projects
  PROJECT_UPCOMING: 'projects/upcoming',
  PROJECT_FEATURED: 'projects/featured',
  PROJECT_TRENDING: 'projects/trending',
  PROJECT_LUXURY: 'projects/luxury',
  PROJECT_AFFORDABLE: 'projects/affordable-homes',
  PROJECT_COMMERCIAL: 'projects/commercial',
  PROJECT_SCO: 'projects/sco-plots',
  PROJECT_BUDGET: 'projects/budget-homes',
  
  // BHK
  BHK_1: 'bhk/1',
  BHK_2: 'bhk/2',
  BHK_3: 'bhk/3',
  BHK_4: 'bhk/4',
  BHK_5: 'bhk/5',
  
  // Developers
  DEVELOPER_DLF: 'developers/dlf',
  DEVELOPER_M3M: 'developers/m3m',
  DEVELOPER_SIGNATURE: 'developers/signature-global',
  
  // Locations
  LOCATION_GOLF_COURSE: 'locations/golf-course-road',
  LOCATION_Dwarka_EXPRESSWAY: 'locations/dwarka-expressway',
  LOCATION_SOHNA_ROAD: 'locations/sohna-road',
  
  // Property Types
  PROPERTY_APARTMENTS: 'property/apartments',
  PROPERTY_VILLAS: 'property/villas',
  PROPERTY_PLOTS: 'property/plots',
  PROPERTY_FLOORS: 'property/independent-floors',
  
  // Generic
  HOME: 'home',
  ABOUT: 'about',
  CONTACT: 'contact',
  BLOG: 'blog'
};

// Common Data Templates
export const COMMON_TEMPLATES = {
  projectListing: {
    heroTitle: '{type} Projects in Gurgaon',
    heroSubtitle: 'Discover the best {type} projects with modern amenities',
    ctaText: 'View All {type} Projects',
  },
  
  bhkListing: {
    heroTitle: '{bhk} BHK Flats in Gurgaon',
    heroSubtitle: 'Find spacious {bhk} BHK apartments for your family',
    ctaText: 'Explore {bhk} BHK Projects',
  },
  
  locationListing: {
    heroTitle: 'Projects in {location}',
    heroSubtitle: 'Premium residential projects in {location}',
    ctaText: 'View {location} Projects',
  }
};

export const applyTemplate = (template, variables) => {
  let result = { ...template };
  
  Object.keys(result).forEach(key => {
    if (typeof result[key] === 'string') {
      Object.keys(variables).forEach(varName => {
        result[key] = result[key].replace(
          new RegExp(`{${varName}}`, 'g'),
          variables[varName]
        );
      });
    }
  });
  
  return result;
};
