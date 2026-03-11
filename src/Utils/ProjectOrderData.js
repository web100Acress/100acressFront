import api from '../config/apiClient';

// Utility to get project order data from backend API or localStorage fallback
export const getProjectOrderData = async () => {
  try {
    console.log('🌐 Fetching project orders from API...');
    // Use the configured api client which has proper CORS and auth setup
    const response = await api.get(`/api/project-orders?_t=${Date.now()}`);
    console.log('📡 API Response:', response.data);

    // Handle different response formats
    let orderData = null;

    if (response.data && response.data.data) {
      // Format: { data: { customOrders: { ... } } }
      if (response.data.data.customOrders) {
        orderData = response.data.data.customOrders;
      } else {
        orderData = response.data.data;
      }
    } else if (response.data && typeof response.data === 'object') {
      // Format: { luxury: [...], trending: [...], ... }
      orderData = response.data;
    }

    if (orderData && (orderData.luxury || orderData.farm)) {
      // Cache the data in localStorage for offline use
      localStorage.setItem('projectOrders', JSON.stringify(orderData));
      console.log('✅ Project orders fetched from API and cached');
      return orderData;
    }
  } catch (error) {
    console.error('❌ Error fetching project orders from API:', error);
  }

  // Fallback to localStorage if API fails
  try {
    console.log('📦 Trying localStorage fallback...');
    const saved = localStorage.getItem('projectOrders');
    if (saved) {
      console.log('✅ Project orders loaded from localStorage');
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('❌ Error loading project orders from localStorage:', error);
  }

  // Return default data if both API and localStorage fail
  console.log('📋 Using default project order data');
  return {
    luxury: [
      { id: 1, name: "Elan The Emperor", order: 1, isActive: true },
      { id: 2, name: "Experion The Trillion", order: 2, isActive: true },
      { id: 3, name: "Birla Arika", order: 3, isActive: true },
      { id: 4, name: "DLF Privana North", order: 4, isActive: true }
    ],
    trending: [
      { id: 5, name: "Indiabulls Estate Club", order: 1, isActive: true },
      { id: 6, name: "Signature Global Twin Tower DXP", order: 2, isActive: true },
      { id: 7, name: "Tarc Ishva", order: 3, isActive: true }
    ],
    affordable: [
      { id: 8, name: "Wal 92", order: 1, isActive: true },
      { id: 9, name: "TLC The First Acre", order: 2, isActive: true }
    ],
    sco: [
      { id: 10, name: "Reach The Bazaria", order: 1, isActive: true },
      { id: 11, name: "BPTP The Oval", order: 2, isActive: true },
      { id: 12, name: "Aarize South Drive", order: 3, isActive: true },
      { id: 13, name: "Adani Downtown Avenue", order: 4, isActive: true }
    ],
    commercial: [
      { id: 14, name: "Elan Imperial", order: 1, isActive: true },
      { id: 15, name: "Trehan IRIS Broadway", order: 2, isActive: true },
      { id: 16, name: "Aarize The Tessoro", order: 3, isActive: true },
      { id: 17, name: "Omaxe State Dwarka", order: 4, isActive: true }
    ],
    budget: [
      { id: 18, name: "Signature Global City 81", order: 1, isActive: true },
      { id: 19, name: "adore-the-select-premia", order: 2, isActive: true },
      { id: 20, name: "M3M Soulitude", order: 3, isActive: true },
      { id: 21, name: "ROF Pravasa", order: 4, isActive: true }
    ],
    recommended: [
      { id: 22, name: "ROF Pravasa", order: 1, isActive: true },
      { id: 23, name: "Signature Global Cloverdale SPR", order: 2, isActive: true },
      { id: 24, name: "Experion One 42", order: 3, isActive: true },
      { id: 25, name: "Experion The Trillion", order: 4, isActive: true }
    ],
    desiredLuxury: [
      { id: 26, name: "Experion One 42", order: 1, isActive: true },
      { id: 27, name: "Trump Towers Delhi NCR", order: 2, isActive: true },
      { id: 28, name: "Godrej Miraya", order: 3, isActive: true },
      { id: 29, name: "Birla Arika", order: 4, isActive: true },
      { id: 30, name: "Shapoorji Pallonji Dualis", order: 5, isActive: true },
      { id: 31, name: "Trevoc Royal Residences", order: 6, isActive: true },
      { id: 32, name: "Experion Windchants Nova", order: 7, isActive: true }
    ],
    budgetPlots: [
      {
        id: 33, name: "Reliance Met City", link: "/reliance-met-city/",
        frontImage: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/banner/reliance-met-city.webp",
        thumbnailImage: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/thumbnails/reliance-met-city-thumb.webp",
        order: 1, isActive: true
      },
      {
        id: 34, name: "Signature City Of Colours", link: "/signature-global-plots/",
        frontImage: "https://d16gdc5rm7f21b.cloudfront.net/100acre/budgetplots/colors.jpg",
        thumbnailImage: "https://d16gdc5rm7f21b.cloudfront.net/100acre/thumbnails/signature-colors-thumb.jpg",
        order: 2, isActive: true
      },
      {
        id: 35, name: "Trevoc Plots Sonipat", link: "/bptp-plots-gurugram/",
        frontImage: "https://d16gdc5rm7f21b.cloudfront.net/100acre/budgetplots/bptp.webp",
        thumbnailImage: "https://d16gdc5rm7f21b.cloudfront.net/100acre/thumbnails/trevoc-sonipat-thumb.webp",
        order: 3, isActive: true
      },
      {
        id: 36, name: "JMS The Pearl", link: "/jms-the-pearl/",
        frontImage: "https://d16gdc5rm7f21b.cloudfront.net/100acre/budgetplots/Orris.jpg",
        thumbnailImage: "https://d16gdc5rm7f21b.cloudfront.net/100acre/thumbnails/jms-pearl-thumb.jpg",
        order: 4, isActive: true
      }
    ],
    farm: [
      { id: 37, name: "Raheja Riyasat Hills", order: 1, isActive: true },
      { id: 38, name: "Central Park Farmhouse", order: 2, isActive: true },
      { id: 39, name: "Ram Rattan Aravali Retreat", order: 3, isActive: true },
      { id: 40, name: "Ram Rattan Green Step Farms", order: 4, isActive: true },
      { id: 41, name: "Naugaon Farm Houses", order: 5, isActive: true }
    ],
    brandedresidences: [
      { id: 42, name: "Elan The Emperor", order: 1, isActive: true },
      { id: 43, name: "Experion The Trillion", order: 2, isActive: true },
      { id: 44, name: "Trump Towers Delhi NCR", order: 3, isActive: true },
      { id: 45, name: "Birla Arika", order: 4, isActive: true },
      { id: 46, name: "SmartWorld Elie Saab Residences", order: 5, isActive: true }
    ]
  };
};

// Get specific category data
export const getLuxuryDesiredOrder = async () => {
  const data = await getProjectOrderData();
  return data.luxury.filter(item => item.isActive).map(item => item.name);
};

export const getTrendingDesiredOrder = async () => {
  const data = await getProjectOrderData();
  const trendingOrder = data.trending.filter(item => item.isActive).map(item => item.name);
  console.log('getTrendingDesiredOrder - Raw data:', data.trending);
  console.log('getTrendingDesiredOrder - Filtered order:', trendingOrder);
  return trendingOrder;
};

export const getAffordableDesiredOrder = async () => {
  const data = await getProjectOrderData();
  return data.affordable.filter(item => item.isActive).map(item => item.name);
};

export const getSCODesiredOrder = async () => {
  const data = await getProjectOrderData();
  return data.sco.filter(item => item.isActive).map(item => item.name);
};

export const getCommercialDesiredOrder = async () => {
  const data = await getProjectOrderData();
  return data.commercial.filter(item => item.isActive).map(item => item.name);
};

export const getBudgetDesiredOrder = async () => {
  const data = await getProjectOrderData();
  return data.budget.filter(item => item.isActive).map(item => item.name);
};

export const getRecommendedDesiredOrder = async () => {
  console.log('📋 getRecommendedDesiredOrder called');
  const data = await getProjectOrderData();
  console.log('📋 Project order data:', data);
  let recommended = data.recommended.filter(item => item.isActive).map(item => item.name);

  // If we get generic names from the API, use the correct project names
  if (recommended.includes("Recommended Project 1") || recommended.includes("Recommended Project 2")) {
    console.log('🔄 Using fallback project names for recommended');
    recommended = [
      "ROF Pravasa",
      "Signature Global Cloverdale SPR",
      "Experion One 42",
      "Experion The Trillion"
    ];
  }

  console.log('📋 Recommended order result:', recommended);
  return recommended;
};

export const getDesiredLuxuryOrder = async () => {
  const data = await getProjectOrderData();
  return data.desiredLuxury.filter(item => item.isActive).map(item => item.name);
};

export const getFarmDesiredOrder = async () => {
  const data = await getProjectOrderData();
  return data.farm.filter(item => item.isActive).map(item => item.name);
};

export const getBrandedResidencesDesiredOrder = async () => {
  const data = await getProjectOrderData();
  return data.brandedresidences.filter(item => item.isActive).map(item => item.name);
};

let cachedProjectData = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const fetchProjectData = async () => {
  const now = Date.now();
  if (cachedProjectData && (now - lastFetchTime < CACHE_DURATION)) {
    return cachedProjectData;
  }

  const api = (await import('../config/apiClient')).default;
  const response = await api.get('/project/viewAll/data');
  
  if (response.data && response.data.data) {
    cachedProjectData = response.data.data;
    lastFetchTime = now;
    return cachedProjectData;
  }
  return [];
};

export const getBrandedResidences = async () => {
  console.log('🏢 getBrandedResidences: Function called');
  try {
    const allProjects = await fetchProjectData();
    const orderData = await getProjectOrderData();
    
    // Ensure we have a valid order list, fallback to hardcoded defaults if API returns empty
    let brandedResidencesOrder = orderData.brandedresidences?.filter(item => item.isActive) || [];
    
    if (brandedResidencesOrder.length === 0) {
      console.log('🏢 getBrandedResidences: No order data from API, using defaults');
      brandedResidencesOrder = [
        { id: 42, name: "Elan The Emperor", order: 1, isActive: true },
        { id: 43, name: "Experion The Trillion", order: 2, isActive: true },
        { id: 44, name: "Trump Towers Delhi NCR", order: 3, isActive: true },
        { id: 45, name: "Birla Arika", order: 4, isActive: true },
        { id: 46, name: "SmartWorld Elie Saab Residences", order: 5, isActive: true }
      ];
    }

    const orderedProjects = brandedResidencesOrder.map(orderItem => {
      // Try to find matching project in the fetched data
      const project = (allProjects || []).find(p => {
        const normalizedName = p.projectName?.toLowerCase().replace(/\s+/g, '') || '';
        const normalizedOrderName = orderItem.name.toLowerCase().replace(/\s+/g, '');
        return normalizedName === normalizedOrderName;
      });

      if (project) {
        return {
          ...project,
          projectName: project.projectName,
          title: project.projectName,
          link: orderItem.link || `/${project.project_url}/`,
          thumbnailImage: project.thumbnailImage,
          frontImage: project.frontImage,
          image: project.thumbnailImage?.url || project.frontImage?.url || `https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/${project.thumbnailImage?.public_id}`
        };
      }
      // Fallback to static info if project not in database
      return {
        projectName: orderItem.name,
        title: orderItem.name,
        link: orderItem.link || '#',
        image: orderItem.thumbnailImage || orderItem.frontImage || orderItem.image || '/Images/dummy.webp',
        frontImage: orderItem.frontImage,
        thumbnailImage: orderItem.thumbnailImage
      };
    });

    console.log('🏢 getBrandedResidences: Final projects:', orderedProjects);
    return orderedProjects;
  } catch (error) {
    console.error('❌ Error fetching branded residences:', error);
    // Ultimate fallback if everything fails
    return [
      { projectName: "Elan The Emperor", title: "Elan The Emperor", link: "/elan-the-emperor/", image: "/Images/dummy.webp" },
      { projectName: "Experion The Trillion", title: "Experion The Trillion", link: "/experion-the-trillion/", image: "/Images/dummy.webp" }
    ];
  }
};

export const getBudgetPlots = async () => {
  try {
    const allProjects = await fetchProjectData();
    
    if (allProjects && allProjects.length > 0) {
      const orderData = await getProjectOrderData();
      const budgetPlotsOrder = orderData.budgetPlots.filter(item => item.isActive);

      const orderedProjects = budgetPlotsOrder.map(orderItem => {
        const project = allProjects.find(p =>
          p.projectName &&
          p.projectName.toLowerCase().replace(/\s+/g, '') === orderItem.name.toLowerCase().replace(/\s+/g, '')
        );

        if (project) {
          return {
            ...project,
            projectName: project.projectName,
            title: project.projectName,
            link: orderItem.link || `/${project.project_url}/`,
            thumbnailImage: project.thumbnailImage,
            frontImage: project.frontImage,
            image: project.thumbnailImage?.url || project.frontImage?.url || `https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/${project.thumbnailImage?.public_id}`
          };
        }
        return {
          title: orderItem.name,
          link: orderItem.link,
          image: orderItem.thumbnailImage || orderItem.frontImage,
          thumbnailImage: orderItem.thumbnailImage,
          frontImage: orderItem.frontImage
        };
      });

      return orderedProjects;
    }
  } catch (error) {
    console.error('Error fetching budget plots from API:', error);
  }

  // Fallback to static data
  const data = await getProjectOrderData();
  return data.budgetPlots.filter(item => item.isActive).map(item => ({
    title: item.name,
    link: item.link,
    image: item.thumbnailImage || item.frontImage || item.image,
    frontImage: item.frontImage,
    thumbnailImage: item.thumbnailImage
  }));
};

// Note: All functions are now async and should be called with await
// For backward compatibility, you can create wrapper functions if needed
