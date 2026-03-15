/**
 * Static Data Registry
 * 
 * Central registry that aggregates all page-specific static data.
 * Import all page data files here and export as a unified collection.
 */

// Import all project page data
import upcomingData from './pages/projects/upcoming.js';
import featuredData from './pages/projects/featured.js';
import trendingData from './pages/projects/trending.js';
import luxuryData from './pages/projects/luxury.js';
import affordableData from './pages/projects/affordable-homes.js';
import commercialData from './pages/projects/commercial.js';
import scoPlotsData from './pages/projects/sco-plots.js';
import budgetHomesData from './pages/projects/budget-homes.js';

// Import all BHK page data
import bhk1Data from './pages/bhk/bhk1.js';
import bhk2Data from './pages/bhk/bhk2.js';
import bhk3Data from './pages/bhk/bhk3.js';
import bhk4Data from './pages/bhk/bhk4.js';
import bhk5Data from './pages/bhk/bhk5.js';

// Registry mapping page types to their data
export const staticDataRegistry = {
  // Projects
  'projects/upcoming': upcomingData,
  'projects/featured': featuredData,
  'projects/trending': trendingData,
  'projects/luxury': luxuryData,
  'projects/affordable-homes': affordableData,
  'projects/commercial': commercialData,
  'projects/sco-plots': scoPlotsData,
  'projects/budget-homes': budgetHomesData,
  
  // BHK
  'bhk/1': bhk1Data,
  'bhk/2': bhk2Data,
  'bhk/3': bhk3Data,
  'bhk/4': bhk4Data,
  'bhk/5': bhk5Data,
  
  // URL-friendly aliases for easy access
  'upcoming': upcomingData,
  'featured': featuredData,
  'trending': trendingData,
  'luxury': luxuryData,
  'affordable-homes': affordableData,
  'commercial': commercialData,
  'sco-plots': scoPlotsData,
  'budget-homes': budgetHomesData,
  '1bhk': bhk1Data,
  '2bhk': bhk2Data,
  '3bhk': bhk3Data,
  '4bhk': bhk4Data,
  '5bhk': bhk5Data,
};

// URL Pattern Registry for dynamic matching
export const urlPatternRegistry = [
  { pattern: '/projects/upcoming', key: 'projects/upcoming' },
  { pattern: '/projects/featured', key: 'projects/featured' },
  { pattern: '/projects/trending', key: 'projects/trending' },
  { pattern: '/projects/luxury', key: 'projects/luxury' },
  { pattern: '/projects/affordable-homes', key: 'projects/affordable-homes' },
  { pattern: '/projects/commercial', key: 'projects/commercial' },
  { pattern: '/projects/sco-plots', key: 'projects/sco-plots' },
  { pattern: '/projects/budget-homes', key: 'projects/budget-homes' },
  { pattern: '/1-bhk-flats-in-gurgaon', key: 'bhk/1' },
  { pattern: '/2-bhk-flats-in-gurgaon', key: 'bhk/2' },
  { pattern: '/3-bhk-flats-in-gurgaon', key: 'bhk/3' },
  { pattern: '/4-bhk-flats-in-gurgaon', key: 'bhk/4' },
  { pattern: '/5-bhk-flats-in-gurgaon', key: 'bhk/5' },
  // Pattern variations
  { pattern: '/projects/upcoming/', key: 'projects/upcoming' },
  { pattern: '/projects/featured/', key: 'projects/featured' },
  { pattern: '/projects/trending/', key: 'projects/trending' },
  { pattern: '/projects/luxury/', key: 'projects/luxury' },
  { pattern: '/projects/affordable-homes/', key: 'projects/affordable-homes' },
  { pattern: '/projects/commercial/', key: 'projects/commercial' },
  { pattern: '/projects/sco-plots/', key: 'projects/sco-plots' },
  { pattern: '/projects/budget-homes/', key: 'projects/budget-homes' },
];

// Get all registered page keys
export const getAllPageKeys = () => Object.keys(staticDataRegistry);

// Get all project page keys
export const getProjectPageKeys = () => 
  Object.keys(staticDataRegistry).filter(key => key.startsWith('projects/'));

// Get all BHK page keys
export const getBHKPageKeys = () => 
  Object.keys(staticDataRegistry).filter(key => key.startsWith('bhk/'));

// Check if a page key exists
export const hasPageData = (key) => staticDataRegistry.hasOwnProperty(key);

// Export all data as a combined object
export const allStaticData = staticDataRegistry;

// Default export
export default staticDataRegistry;
