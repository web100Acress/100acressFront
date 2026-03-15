/**
 * Static Data Registry
 * 
 * Central registry that aggregates all page-specific static data.
 * Import all page data files here and export as a unified collection.
 */

// ==========================================
// Import all Project page data
// ==========================================
import upcomingData from './pages/projects/upcoming.js';
import featuredData from './pages/projects/featured.js';
import trendingData from './pages/projects/trending.js';
import luxuryData from './pages/projects/luxury.js';
import affordableData from './pages/projects/affordable-homes.js';
import commercialData from './pages/projects/commercial.js';
import scoPlotsData from './pages/projects/sco-plots.js';
import budgetHomesData from './pages/projects/budget-homes.js';

// ==========================================
// Import all BHK page data
// ==========================================
import bhk1Data from './pages/bhk/bhk1.js';
import bhk2Data from './pages/bhk/bhk2.js';
import bhk3Data from './pages/bhk/bhk3.js';
import bhk4Data from './pages/bhk/bhk4.js';
import bhk5Data from './pages/bhk/bhk5.js';

// ==========================================
// Import all City page data
// ==========================================
import gurugramData from './pages/cities/gurugram.js';
import delhiData from './pages/cities/delhi.js';
import noidaData from './pages/cities/noida.js';
import puneData from './pages/cities/pune.js';
import mumbaiData from './pages/cities/mumbai.js';
import goaData from './pages/cities/goa.js';
import dubaiData from './pages/cities/dubai.js';
import alwarData from './pages/cities/alwar.js';
import sonipatData from './pages/cities/sonipat.js';
import karnalData from './pages/cities/karnal.js';
import jalandharData from './pages/cities/jalandhar.js';
import pushkarData from './pages/cities/pushkar.js';
import ayodhyaData from './pages/cities/ayodhya.js';
import panipatData from './pages/cities/panipat.js';
import panchkulaData from './pages/cities/panchkula.js';
import kasauliData from './pages/cities/kasauli.js';
import ludhianaData from './pages/cities/ludhiana.js';

// ==========================================
// Import all Status page data
// ==========================================
import statusUpcomingData from './pages/status/upcoming.js';
import statusUnderConstructionData from './pages/status/underconstruction.js';
import statusReadyToMoveData from './pages/status/readytomove.js';
import statusNewLaunchData from './pages/status/newlaunch.js';
import statusBrandedResidencesData from './pages/status/brandedresidences.js';

// ==========================================
// Import all Budget page data
// ==========================================
import budgetUnder1CrData from './pages/budget/under1cr.js';
import budget1To5CrData from './pages/budget/1to5cr.js';
import budget5To10CrData from './pages/budget/5to10cr.js';
import budget10To20CrData from './pages/budget/10to20cr.js';
import budget20To50CrData from './pages/budget/20to50cr.js';
import budgetAbove50CrData from './pages/budget/above50cr.js';

// ==========================================
// Import all Type page data
// ==========================================
import typeResidentialData from './pages/types/residential.js';
import typeCommercialData from './pages/types/commercial.js';
import typePlotsData from './pages/types/plots.js';
import typeSCOData from './pages/types/sco.js';
import typeIndependentFloorsData from './pages/types/independentfloors.js';
import typeLuxuryVillasData from './pages/types/luxury-villas.js';
import typeFarmhouseData from './pages/types/farmhouse.js';
import typeIndustrialPlotsData from './pages/types/industrial-plots.js';
import typePlotsGurugramData from './pages/types/plots-gurugram.js';

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
  
  // Cities
  'city/gurugram': gurugramData,
  'city/delhi': delhiData,
  'city/noida': noidaData,
  'city/pune': puneData,
  'city/mumbai': mumbaiData,
  'city/goa': goaData,
  'city/dubai': dubaiData,
  'city/alwar': alwarData,
  'city/sonipat': sonipatData,
  'city/karnal': karnalData,
  'city/jalandhar': jalandharData,
  'city/pushkar': pushkarData,
  'city/ayodhya': ayodhyaData,
  'city/panipat': panipatData,
  'city/panchkula': panchkulaData,
  'city/kasauli': kasauliData,
  'city/ludhiana': ludhianaData,
  
  // Status
  'status/upcoming': statusUpcomingData,
  'status/underconstruction': statusUnderConstructionData,
  'status/readytomove': statusReadyToMoveData,
  'status/newlaunch': statusNewLaunchData,
  'status/brandedresidences': statusBrandedResidencesData,
  
  // Budget
  'budget/under1cr': budgetUnder1CrData,
  'budget/1to5cr': budget1To5CrData,
  'budget/5to10cr': budget5To10CrData,
  'budget/10to20cr': budget10To20CrData,
  'budget/20to50cr': budget20To50CrData,
  'budget/above50cr': budgetAbove50CrData,
  
  // Types
  'type/residential': typeResidentialData,
  'type/commercial': typeCommercialData,
  'type/plots': typePlotsData,
  'type/sco': typeSCOData,
  'type/independentfloors': typeIndependentFloorsData,
  'type/luxury-villas': typeLuxuryVillasData,
  'type/farmhouse': typeFarmhouseData,
  'type/industrial-plots': typeIndustrialPlotsData,
  'type/plots-in-gurugram': typePlotsGurugramData,
  
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
  'gurugram': gurugramData,
  'delhi': delhiData,
  'noida': noidaData,
  'pune': puneData,
  'mumbai': mumbaiData,
  'goa': goaData,
  'dubai': dubaiData,
  'under1cr': budgetUnder1CrData,
  '1to5cr': budget1To5CrData,
  '5to10cr': budget5To10CrData,
  '10to20cr': budget10To20CrData,
  '20to50cr': budget20To50CrData,
  'above50cr': budgetAbove50CrData,
  'residential': typeResidentialData,
  'villas': typeLuxuryVillasData,
  'farmhouse': typeFarmhouseData,
  'industrial': typeIndustrialPlotsData,
};

// URL Pattern Registry for dynamic matching
export const urlPatternRegistry = [
  // Projects
  { pattern: '/projects/upcoming', key: 'projects/upcoming' },
  { pattern: '/projects/featured', key: 'projects/featured' },
  { pattern: '/projects/trending', key: 'projects/trending' },
  { pattern: '/projects/luxury', key: 'projects/luxury' },
  { pattern: '/projects/affordable-homes', key: 'projects/affordable-homes' },
  { pattern: '/projects/commercial', key: 'projects/commercial' },
  { pattern: '/projects/sco-plots', key: 'projects/sco-plots' },
  { pattern: '/projects/budget-homes', key: 'projects/budget-homes' },
  
  // BHK
  { pattern: '/1-bhk-flats-in-gurgaon', key: 'bhk/1' },
  { pattern: '/2-bhk-flats-in-gurgaon', key: 'bhk/2' },
  { pattern: '/3-bhk-flats-in-gurgaon', key: 'bhk/3' },
  { pattern: '/4-bhk-flats-in-gurgaon', key: 'bhk/4' },
  { pattern: '/5-bhk-flats-in-gurgaon', key: 'bhk/5' },
  
  // Cities
  { pattern: '/projects-in-gurugram', key: 'city/gurugram' },
  { pattern: '/projects-in-delhi', key: 'city/delhi' },
  { pattern: '/projects-in-noida', key: 'city/noida' },
  { pattern: '/projects-in-pune', key: 'city/pune' },
  { pattern: '/projects-in-mumbai', key: 'city/mumbai' },
  { pattern: '/projects-in-goa', key: 'city/goa' },
  { pattern: '/united-arab-emirates', key: 'city/dubai' },
  { pattern: '/projects-in-alwar', key: 'city/alwar' },
  { pattern: '/projects-in-sonipat', key: 'city/sonipat' },
  { pattern: '/projects-in-karnal', key: 'city/karnal' },
  { pattern: '/projects-in-jalandhar', key: 'city/jalandhar' },
  { pattern: '/projects-in-pushkar', key: 'city/pushkar' },
  { pattern: '/projects-in-ayodhya', key: 'city/ayodhya' },
  { pattern: '/projects-in-panipat', key: 'city/panipat' },
  { pattern: '/projects-in-panchkula', key: 'city/panchkula' },
  { pattern: '/projects-in-kasauli', key: 'city/kasauli' },
  { pattern: '/projects-in-ludhiana', key: 'city/ludhiana' },
  
  // Status
  { pattern: '/projects/upcoming', key: 'status/upcoming' },
  { pattern: '/projects/underconstruction', key: 'status/underconstruction' },
  { pattern: '/projects/ready-to-move', key: 'status/readytomove' },
  { pattern: '/projects/newlaunch', key: 'status/newlaunch' },
  { pattern: '/branded-residences', key: 'status/brandedresidences' },
  
  // Budget
  { pattern: '/projects/under-1-cr', key: 'budget/under1cr' },
  { pattern: '/projects/1-5-cr', key: 'budget/1to5cr' },
  { pattern: '/projects/5-10-cr', key: 'budget/5to10cr' },
  { pattern: '/projects/10-20-cr', key: 'budget/10to20cr' },
  { pattern: '/projects/20-50-cr', key: 'budget/20to50cr' },
  { pattern: '/projects/above-50-cr', key: 'budget/above50cr' },
  
  // Types
  { pattern: '/projects/residential', key: 'type/residential' },
  { pattern: '/projects-type/commercial', key: 'type/commercial' },
  { pattern: '/projects/plots', key: 'type/plots' },
  { pattern: '/sco/plots', key: 'type/sco' },
  { pattern: '/projects/independent-floors', key: 'type/independentfloors' },
  { pattern: '/projects/villas', key: 'type/luxury-villas' },
  { pattern: '/projects/farmhouse', key: 'type/farmhouse' },
  { pattern: '/projects/industrial-plots', key: 'type/industrial-plots' },
];

// Get all registered page keys
export const getAllPageKeys = () => Object.keys(staticDataRegistry);

// Get all project page keys
export const getProjectPageKeys = () => 
  Object.keys(staticDataRegistry).filter(key => key.startsWith('projects/'));

// Get all BHK page keys
export const getBHKPageKeys = () => 
  Object.keys(staticDataRegistry).filter(key => key.startsWith('bhk/'));

// Get all city page keys
export const getCityPageKeys = () => 
  Object.keys(staticDataRegistry).filter(key => key.startsWith('city/'));

// Get all status page keys
export const getStatusPageKeys = () => 
  Object.keys(staticDataRegistry).filter(key => key.startsWith('status/'));

// Get all budget page keys
export const getBudgetPageKeys = () => 
  Object.keys(staticDataRegistry).filter(key => key.startsWith('budget/'));

// Get all type page keys
export const getTypePageKeys = () => 
  Object.keys(staticDataRegistry).filter(key => key.startsWith('type/'));

// Check if a page key exists
export const hasPageData = (key) => staticDataRegistry.hasOwnProperty(key);

// Export all data as a combined object
export const allStaticData = staticDataRegistry;

// Default export
export default staticDataRegistry;
