// Project Type Routes Configuration - Using Original URLs
export const projectTypeRoutes = {
  "sco-plots": {
    path: "/sco/plots/",
    title: "SCO Plots in Gurugram",
    description: "Discover Premium SCO Plots in Gurugram – Your Gateway to Shop-Cum-Office Investment and Business Growth."
  },
  "luxury-villas": {
    path: "/projects/villas/", 
    title: "India's Luxury Villas for Sale",
    description: "Discover Premium Luxury Villas Across India – Your Gateway to Exquisite Living and Prime Real Estate Investment."
  },
  "plots-in-gurugram": {
    path: "/plots-in-gurugram/",
    title: "Plots in Gurugram", 
    description: "Discover Premium Plots in Gurugram – Your Gateway to Prime Real Estate Investment."
  },
  "residential-projects": {
    path: "/property/residential/",
    title: "Residential Property",
    description: "Residential properties range from homes to apartments, each crafted to match unique lifestyles and comfort needs."
  },
  "independent-floors": {
    path: "/projects/independentfloors/",
    title: "Independent & Builder Floors",
    description: "Discover Premium Independent & Builder Floors – Curated Living Spaces in Top Cities."
  },
  "commercial-projects": {
    path: "/projects/commercial/",
    title: "Commercial Projects",
    description: "Discover Premium Commercial Projects – Your Gateway to Business Investment and Growth."
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
