// Example of how to use static data in GlobalFilterTemplate
import { getStaticData, getFAQData, getTrustBoosters, getBudgetPageData } from './staticData.jsx';

// Example usage for different page types:

// 1. City Pages
export const getCityPageData = (cityName) => {
  const cityData = getStaticData('city', cityName);
  return {
    title: cityData?.title || "Secure Your Future with Top Under-Construction Projects.",
    description: cityData?.description || " Experience modern living with new launch projects in Gurgaon crafted for your lifestyle and future growth.",
    metaTitle: cityData?.metaTitle || "Explore the Latest New Launch Projects in Gurgaon",
    canonical: cityData?.canonical || "https://www.100acress.com/",
    keywords: cityData?.keywords || "real estate, properties, homes",
    heroTitle: cityData?.heroTitle || "Discover Premium Projects",
    heroSubtitle: cityData?.heroSubtitle || "Discover the latest new launch projects in Gurgaon with modern apartments, villas, and premium amenities for a luxurious lifestyle.",
    faqs: getFAQData('city', cityName),
    trustBoosters: getTrustBoosters('city', cityName)
  };
};

// 2. Project Status Pages
export const getStatusPageData = (status) => {
  console.log('getStatusPageData called with status:', status);
  const statusData = getStaticData('status', status);
  console.log('Status data retrieved:', statusData);
  return {
    title: statusData?.title || "Discover Projects",
    description: statusData?.description || "Explore the best properties",
    metaTitle: statusData?.metaTitle || "Best Properties - 100acress",
    canonical: statusData?.canonical || "https://www.100acress.com/",
    keywords: statusData?.keywords || "real estate, properties",
    heroTitle: statusData?.heroTitle || "Discover Projects",
    heroSubtitle: statusData?.heroSubtitle || "Find your perfect home",
    faqs: getFAQData('status', status),
    trustBoosters: getTrustBoosters('status', status)
  };
};

// 3. Project Type Pages
export const getTypePageData = (type) => {
  // console.log('getTypePageData called with type:', type);
  const typeData = getStaticData('type', type);
  // console.log('Type data retrieved:', typeData);
  return {
    title: typeData?.title || "Discover Properties",
    description: typeData?.description || "Explore the best properties",
    metaTitle: typeData?.metaTitle || "Best Properties - 100acress",
    canonical: typeData?.canonical || "https://www.100acress.com/",
    keywords: typeData?.keywords || "real estate, properties",
    heroTitle: typeData?.heroTitle || "Discover Properties",
    heroSubtitle: typeData?.heroSubtitle || "Find your perfect property",
    faqs: getFAQData('type', type),
    trustBoosters: getTrustBoosters('type', type)
  };
};

// 4. Budget Pages
// Note: getBudgetPageData is imported from staticData.js

// 5. Dynamic page data based on URL
export const getPageDataFromURL = (pathname, searchParams = {}) => {
  console.log('getPageDataFromURL called with pathname:', pathname);
  console.log('Search params:', searchParams);
  
  // Handle new unified projects/{filter} pattern
  if (pathname.includes('/projects/') && !pathname.includes('/projects-in-')) {
    const filter = pathname.split('/projects/')[1]?.replace('/', '');
    console.log('Detected unified projects filter page:', filter);
    
    // Check if it's a status filter
    if (filter.includes('-projects')) {
      const status = filter.split('-projects')[0];
      
      const statusMap = {
        'upcoming': 'upcoming',
        'underconstruction': 'underconstruction',
        'readytomove': 'readytomove',
        'ready-to-move': 'readytomove',
        'newlaunch': 'newlaunch'
      };
      
      if (statusMap[status]) {
        return getStatusPageData(statusMap[status]);
      }
    }
    
    // Check for direct status patterns (like 'upcoming')
    const directStatusMap = {
      'upcoming': 'upcoming',
      'underconstruction': 'underconstruction',
      'ready-to-move': 'readytomove',
      'newlaunch': 'newlaunch'
    };
    
    if (directStatusMap[filter]) {
      return getStatusPageData(directStatusMap[filter]);
    }
    
    // Check if it's a budget filter
    if (filter.includes('cr') || filter.includes('under-') || filter.includes('above-')) {
      // Convert URL format to data format
      const budgetMap = {
        'under-1-cr': 'under1cr',
        '1-5-cr': '1to5cr',
        '5-10-cr': '5to10cr',
        '10-20-cr': '10to20cr',
        '20-50-cr': '20to50cr',
        'above-50-cr': 'above50cr'
      };
      
      const budgetKey = budgetMap[filter] || 'under1cr';
      console.log('Budget filter detected - URL format:', filter, '-> Data format:', budgetKey);
      return getBudgetPageData(budgetKey);
    }
    
    // Otherwise, treat as project type
    
    // Map type to existing type keys
    const typeMap = {
      'farmhouse': 'farmhouse',
      'commercial': 'commercial',
      'residential': 'residential',
      'villas': 'luxury-villas',
      'plots': 'plots-in-gurugram',
      'industrial-plots': 'industrial-plots',
      'industrial-projects': 'industrial-projects',
      'sco-plots': 'sco',
      'sco': 'sco',
      'independent-floors': 'independentfloors'
    };
    
    if (typeMap[filter]) {
      return getTypePageData(typeMap[filter]);
    }
  }
  
  // Keep existing patterns for backward compatibility
  if (pathname.includes('/projects-status/')) {
    const status = pathname.split('/projects-status/')[1]?.split('-projects')[0];
    console.log('Detected status page:', status);
    
    // Map status to existing status types
    const statusMap = {
      'upcoming': 'upcoming',
      'underconstruction': 'underconstruction',
      'readytomove': 'readytomove',
      'newlaunch': 'newlaunch'
    };
    
    if (statusMap[status]) {
      return getStatusPageData(statusMap[status]);
    }
  }
  
  if (pathname.includes('/projects-type/')) {
    const type = pathname.split('/projects-type/')[1]?.split('/')[0];
    console.log('Detected type page:', type);
    
    // Map type to existing type keys
    const typeMap = {
      'farmhouse': 'farmhouse',
      'commercial': 'commercial',
      'residential': 'residential',
      'villas': 'luxury-villas',
      'plots': 'plots-in-gurugram',
      'industrial-plots': 'industrial-plots',
      'industrial-projects': 'industrial-projects',
      'sco': 'sco',
      'independent-floors': 'independentfloors'
    };
    
    if (typeMap[type]) {
      return getTypePageData(typeMap[type]);
    }
  }
  
  // Extract page type and specific key from URL (city pages)
  if (pathname.includes('/projects-in-')) {
    const city = pathname.split('/projects-in-')[1]?.split('/')[0];
    console.log('Detected city page:', city);
    return getCityPageData(city);
  }
  
  if (pathname.includes('/projects-type/')) {
    const type = pathname.split('/projects-type/')[1]?.split('/')[0];
    console.log('Detected type page:', type);
    
    // Map type to existing type keys
    const typeMap = {
      'farmhouse': 'farmhouse',
      'commercial': 'commercial',
      'residential': 'residential',
      'villas': 'luxury-villas',
      'plots': 'plots-in-gurugram',
      'industrial-plots': 'industrial-plots',
      'industrial-projects': 'industrial-projects',
      'sco': 'sco',
      'independent-floors': 'independentfloors'
    };
    
    if (typeMap[type]) {
      return getTypePageData(typeMap[type]);
    }
  }
  
  // Keep existing type patterns for backward compatibility
  if (pathname.includes('/property/residential')) {
    // console.log('Detected residential type page');
    return getTypePageData('residential');
  }
  
  if (pathname.includes('/projects/farmhouse')) {
    return getTypePageData('farmhouse');
  }

  if (pathname.includes('/projects/commercial')) {
    return getTypePageData('commercial');
  }

  // Plots in Gurugram type page
  if (pathname.includes('/plots-in-gurugram')) {
    return getTypePageData('plots-in-gurugram');
  }
  
  if (pathname.includes('/projects/industrial-plots')) {
    return getTypePageData('industrial-plots');
  }
  
  if (pathname.includes('/projects/industrial-projects')) {
    return getTypePageData('industrial-projects');
  }
  
  if (pathname.includes('/sco/plots')) {
    return getTypePageData('sco');
  }
  
  if (pathname.includes('/projects/independentfloors')) {
    return getTypePageData('independentfloors');
  }
  
  if (pathname.includes('/projects/villas')) {
    return getTypePageData('luxury-villas');
  }
  
  if (pathname.includes('/projects-budget/')) {
    console.log('Detected budget page:', pathname);
    
    // Extract budget range from URL
    const budgetRange = pathname.split('/projects-budget/')[1]?.split('/')[0];
    console.log('Budget range from URL:', budgetRange);
    
    // Check for budget range in query parameters first
    if (searchParams.budget) {
      console.log('Budget range from query param:', searchParams.budget);
      return getBudgetPageData(searchParams.budget);
    }
    
    // Check for specific budget ranges in URL
    if (pathname.includes('under-1-cr') || pathname.includes('under1cr') || budgetRange === 'under-1-cr') {
      console.log('Detected under1cr budget range');
      return getBudgetPageData('under1cr');
    }
    if (pathname.includes('1-5-cr') || pathname.includes('1to5cr') || budgetRange === '1-5-cr') {
      console.log('Detected 1to5cr budget range');
      return getBudgetPageData('1to5cr');
    }
    if (pathname.includes('5-10-cr') || pathname.includes('5to10cr') || budgetRange === '5-10-cr') {
      console.log('Detected 5to10cr budget range');
      return getBudgetPageData('5to10cr');
    }
    if (pathname.includes('10-20-cr') || pathname.includes('10to20cr') || budgetRange === '10-20-cr') {
      console.log('Detected 10to20cr budget range');
      return getBudgetPageData('10to20cr');
    }
    if (pathname.includes('20-50-cr') || pathname.includes('20to50cr') || budgetRange === '20-50-cr') {
      console.log('Detected 20to50cr budget range');
      return getBudgetPageData('20to50cr');
    }
    if (pathname.includes('above-50-cr') || pathname.includes('above50cr') || budgetRange === 'above-50-cr') {
      console.log('Detected above50cr budget range');
      return getBudgetPageData('above50cr');
    }
    
    // Check for price range in query parameters
    if (searchParams.price) {
      console.log('Price range from query param:', searchParams.price);
      // Map price ranges to budget ranges
      const priceToBudgetMap = {
        'under-1-cr': 'under1cr',
        '1-5-cr': '1to5cr',
        '5-10-cr': '5to10cr',
        '10-20-cr': '10to20cr',
        '20-50-cr': '20to50cr',
        'above-50-cr': 'above50cr'
      };
      const budgetRange = priceToBudgetMap[searchParams.price];
      if (budgetRange) {
        console.log('Mapped to budget range:', budgetRange);
        return getBudgetPageData(budgetRange);
      }
    }
    
    // Default to under1cr if no specific range is mentioned
    console.log('Using default under1cr budget range');
    return getBudgetPageData('under1cr');
  }
  
  // Default fallback
  return {
    title: "Discover Premium Projects",
    description: "Explore the best properties with modern amenities",
    metaTitle: "Best Properties - 100acress",
    canonical: "https://www.100acress.com/",
    keywords: "real estate, properties, homes",
    heroTitle: "Discover Premium Projects",
    heroSubtitle: "Find your perfect home with modern amenities",
    faqs: getFAQData(),
    trustBoosters: getTrustBoosters()
  };
};

export default {
  getCityPageData,
  getStatusPageData,
  getTypePageData,
  getBudgetPageData,
  getPageDataFromURL
};
