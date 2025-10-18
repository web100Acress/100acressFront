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
  
  // Check for status pages FIRST (before city pages)
  if (pathname.includes('/project-in-underconstruction')) {
    console.log('Detected underconstruction status page');
    return getStatusPageData('underconstruction');
  }
  
  if (pathname.includes('/projects-in-newlaunch')) {
    console.log('Detected newlaunch status page');
    return getStatusPageData('newlaunch');
  }
  
  if (pathname.includes('/projects/upcoming-projects-in-gurgaon')) {
    return getStatusPageData('upcoming');
  }
  
  if (pathname.includes('/property-ready-to-move')) {
    return getStatusPageData('readytomove');
  }
  
  // Extract page type and specific key from URL (city pages)
  if (pathname.includes('/projects-in-') || pathname.includes('/project-in-')) {
    const city = pathname.split('/projects-in-')[1]?.split('/')[0] || 
                 pathname.split('/project-in-')[1]?.split('/')[0];
    console.log('Detected city page:', city);
    return getCityPageData(city);
  }
  
  if (pathname.includes('/property/residential')) {
    // console.log('Detected residential type page');
    return getTypePageData('residential');
  }
  
  if (pathname.includes('/projects/farmhouse')) {
    return getTypePageData('farmhouse');
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
  
  if (pathname.includes('/budget-properties')) {
    console.log('Detected budget page:', pathname);
    
    // Check for budget range in query parameters first
    if (searchParams.budget) {
      console.log('Budget range from query param:', searchParams.budget);
      return getBudgetPageData(searchParams.budget);
    }
    
    // Check for specific budget ranges in URL
    if (pathname.includes('under-1-cr') || pathname.includes('under1cr')) {
      console.log('Detected under1cr budget range');
      return getBudgetPageData('under1cr');
    }
    if (pathname.includes('1-5-cr') || pathname.includes('1to5cr')) {
      console.log('Detected 1to5cr budget range');
      return getBudgetPageData('1to5cr');
    }
    if (pathname.includes('5-10-cr') || pathname.includes('5to10cr')) {
      console.log('Detected 5to10cr budget range');
      return getBudgetPageData('5to10cr');
    }
    if (pathname.includes('10-20-cr') || pathname.includes('10to20cr')) {
      console.log('Detected 10to20cr budget range');
      return getBudgetPageData('10to20cr');
    }
    if (pathname.includes('20-50-cr') || pathname.includes('20to50cr')) {
      console.log('Detected 20to50cr budget range');
      return getBudgetPageData('20to50cr');
    }
    if (pathname.includes('above-50-cr') || pathname.includes('above50cr')) {
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
