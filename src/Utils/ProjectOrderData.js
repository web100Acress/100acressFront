import api from '../config/apiClient';

// Utility to get project order data from backend API or localStorage fallback
export const getProjectOrderData = async () => {
  try {
    console.log('🌐 Fetching project orders from API...');
    // Use the configured api client which has proper CORS and auth setup
    const response = await api.get('/api/project-orders');
    console.log('📡 API Response status:', response.status);
    
    if (response.data && response.data.success && response.data.data) {
      // Cache the data in localStorage for offline use
      localStorage.setItem('projectOrders', JSON.stringify(response.data.data));
      console.log('✅ Project orders fetched from API and cached');
      return response.data.data;
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
      { id: 33, name: "Reliance Met City", link: "/reliance-met-city/", image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/banner/reliance-met-city.webp", order: 1, isActive: true },
      { id: 34, name: "Signature Sidhrawali", link: "/signature-global-plots/", image: "https://d16gdc5rm7f21b.cloudfront.net/100acre/budgetplots/colors.jpg", order: 2, isActive: true },
      { id: 35, name: "BPTP Limited", link: "/bptp-plots-gurugram/", image: "https://d16gdc5rm7f21b.cloudfront.net/100acre/budgetplots/bptp.webp", order: 3, isActive: true },
      { id: 36, name: "ORRIS Group", link: "/orris-plots-gurugram/", image: "https://d16gdc5rm7f21b.cloudfront.net/100acre/budgetplots/Orris.jpg", order: 4, isActive: true }
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

export const getBudgetPlots = async () => {
  const data = await getProjectOrderData();
  return data.budgetPlots.filter(item => item.isActive).map(item => ({
    title: item.name,
    link: item.link,
    image: item.image
  }));
};

// Note: All functions are now async and should be called with await
// For backward compatibility, you can create wrapper functions if needed
