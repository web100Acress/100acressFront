// Project Type Routes Configuration - Using Unified URL Structure
export const projectTypeRoutes = {
  "sco-plots": {
    path: "/projects/sco-plots/",
    title: "SCO Plots in Gurugram",
    description: "Discover Premium SCO Plots in Gurugram – Your Gateway to Shop-Cum-Office Investment and Business Growth."
  },
  "luxury-villas": {
    path: "/projects/villas/", 
    title: "India's Luxury Villas for Sale",
    description: "Discover Premium Luxury Villas Across India – Your Gateway to Exquisite Living and Prime Real Estate Investment."
  },
  "plots-in-gurugram": {
    path: "/projects/plots/",
    title: "Plots in Gurugram", 
    description: "Discover Premium Plots in Gurugram – Your Gateway to Prime Real Estate Investment."
  },
  "residential-projects": {
    path: "/projects/residential/",
    title: "Residential Property",
    description: "Residential properties range from homes to apartments, each crafted to match unique lifestyles and comfort needs."
  },
  "independent-floors": {
    path: "/projects/independent-floors/",
    title: "Independent & Builder Floors",
    description: "Discover Premium Independent & Builder Floors – Curated Living Spaces in Top Cities."
  },
  "commercial-projects": {
    path: "/projects/commercial/",
    title: "Commercial Projects",
    description: "Discover Premium Commercial Projects – Your Gateway to Business Investment and Growth."
  },
  "farmhouse": {
    path: "/projects/farmhouse/",
    title: "Farm Houses Projects",
    description: "Discover Premium Farm House Projects – Your Gateway to Serene Living and Agricultural Investment."
  },
  "industrial-plots": {
    path: "/projects/industrial-plots/",
    title: "Industrial Plots",
    description: "Discover Premium Industrial Plots – Your Gateway to Industrial Investment and Business Expansion."
  },
  "industrial-projects": {
    path: "/projects/industrial-projects/",
    title: "Industrial Projects",
    description: "Discover Premium Industrial Projects – Your Gateway to Industrial Investment and Business Expansion."
  }
};

// Helper function to get route by type
export const getRouteByType = (type) => {
  return projectTypeRoutes[type] || null;
};

// Helper function to get all available routes
export const getAllRoutes = () => {
  return Object.values(projectTypeRoutes);
};

// Helper function to check if a route exists
export const routeExists = (type) => {
  return projectTypeRoutes.hasOwnProperty(type);
};
