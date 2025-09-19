// Utility to get project order data from localStorage or return default data
export const getProjectOrderData = () => {
  try {
    const saved = localStorage.getItem('projectOrders');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error loading project orders from localStorage:', error);
  }
  
  // Return default data if localStorage is empty or error occurs
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
export const getLuxuryDesiredOrder = () => {
  const data = getProjectOrderData();
  return data.luxury.filter(item => item.isActive).map(item => item.name);
};

export const getTrendingDesiredOrder = () => {
  const data = getProjectOrderData();
  return data.trending.filter(item => item.isActive).map(item => item.name);
};

export const getAffordableDesiredOrder = () => {
  const data = getProjectOrderData();
  return data.affordable.filter(item => item.isActive).map(item => item.name);
};

export const getSCODesiredOrder = () => {
  const data = getProjectOrderData();
  return data.sco.filter(item => item.isActive).map(item => item.name);
};

export const getCommercialDesiredOrder = () => {
  const data = getProjectOrderData();
  return data.commercial.filter(item => item.isActive).map(item => item.name);
};

export const getBudgetDesiredOrder = () => {
  const data = getProjectOrderData();
  return data.budget.filter(item => item.isActive).map(item => item.name);
};

export const getRecommendedDesiredOrder = () => {
  const data = getProjectOrderData();
  return data.recommended.filter(item => item.isActive).map(item => item.name);
};

export const getDesiredLuxuryOrder = () => {
  const data = getProjectOrderData();
  return data.desiredLuxury.filter(item => item.isActive).map(item => item.name);
};

export const getBudgetPlots = () => {
  const data = getProjectOrderData();
  return data.budgetPlots.filter(item => item.isActive).map(item => ({
    title: item.name,
    link: item.link,
    image: item.image
  }));
};

// Export all data for backward compatibility
export const Luxury_Desired_Order = getLuxuryDesiredOrder();
export const Trending_Desired_Order = getTrendingDesiredOrder();
export const Affordable_Desired_Order = getAffordableDesiredOrder();
export const SCO_DESIRED_ORDER = getSCODesiredOrder();
export const COMMERCIAL_DESIRED_ORDER = getCommercialDesiredOrder();
export const BUDGET_DESIRED_ORDER = getBudgetDesiredOrder();
export const Recommendedreordered = getRecommendedDesiredOrder();
export const DesiredLuxuryOrder = getDesiredLuxuryOrder();
export const budgetPlots = getBudgetPlots();
