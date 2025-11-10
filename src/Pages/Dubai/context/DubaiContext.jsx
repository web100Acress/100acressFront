import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const DubaiContext = createContext();

// Emirate-specific configuration
const emiratesConfig = {
  "Dubai": {
    route: "/dubai/",
    headline: "Discover Luxury Living in Dubai",
    subheadline: "Your Gateway to Premium Properties",
    description: "Explore exclusive properties in the world's most dynamic city",
    heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80", // Dubai skyline
    tagline: "The City of Gold",
  },
  "Abu Dhabi": {
    route: "/abu-dhabi/",
    headline: "Luxury Properties in Abu Dhabi",
    subheadline: "Capital of Elegance",
    description: "Find your dream home in UAE's sophisticated capital city",
    heroImage: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1920&q=80", // Abu Dhabi
    tagline: "Capital of the UAE",
  },
  "Sharjah": {
    route: "/sharjah/",
    headline: "Premium Real Estate in Sharjah",
    subheadline: "Cultural Heart of UAE",
    description: "Discover affordable luxury in the cultural capital",
    heroImage: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=1920&q=80", // Sharjah
    tagline: "The Cultural Capital",
  },
  "Ajman": {
    route: "/ajman/",
    headline: "Affordable Luxury in Ajman",
    subheadline: "Hidden Gem of UAE",
    description: "Explore value-driven properties with modern amenities",
    heroImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80", // Ajman
    tagline: "The Pearl of the Gulf",
  },
  "Ras Al Khaimah": {
    route: "/ras-al-khaimah/",
    headline: "Scenic Properties in Ras Al Khaimah",
    subheadline: "Nature Meets Luxury",
    description: "Mountain views and beachfront living combined",
    heroImage: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=1920&q=80", // RAK
    tagline: "Adventure & Serenity",
  },
  "Fujairah": {
    route: "/fujairah/",
    headline: "Coastal Living in Fujairah",
    subheadline: "East Coast Paradise",
    description: "Beachfront properties with stunning mountain backdrops",
    heroImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80", // Fujairah
    tagline: "The Hidden Treasure",
  },
  "Umm Al Quwain": {
    route: "/umm-al-quwain/",
    headline: "Tranquil Properties in Umm Al Quwain",
    subheadline: "Peaceful Living",
    description: "Serene waterfront properties away from the hustle",
    heroImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80", // UAQ
    tagline: "The Quiet Emirate",
  },
};

export const useDubai = () => {
  const context = useContext(DubaiContext);
  if (!context) {
    throw new Error("useDubai must be used within DubaiProvider");
  }
  return context;
};

export const DubaiProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedEmirate, setSelectedEmirateState] = useState("Dubai");
  const [selectedPropertyType, setSelectedPropertyType] = useState("All Properties");

  // Get current emirate config
  const currentEmirateConfig = emiratesConfig[selectedEmirate] || emiratesConfig["Dubai"];

  // Custom setter that also updates the route
  const setSelectedEmirate = (emirate) => {
    setSelectedEmirateState(emirate);
    const config = emiratesConfig[emirate];
    if (config && config.route !== location.pathname) {
      navigate(config.route, { replace: true });
    }
  };

  // Sync emirate with current route on mount and route change
  useEffect(() => {
    const currentPath = location.pathname;
    const matchedEmirate = Object.entries(emiratesConfig).find(
      ([_, config]) => config.route === currentPath
    );
    
    if (matchedEmirate && matchedEmirate[0] !== selectedEmirate) {
      setSelectedEmirateState(matchedEmirate[0]);
    }
  }, [location.pathname]);

  const value = {
    selectedEmirate,
    setSelectedEmirate,
    selectedPropertyType,
    setSelectedPropertyType,
    emirateConfig: currentEmirateConfig,
    emiratesConfig,
  };

  return <DubaiContext.Provider value={value}>{children}</DubaiContext.Provider>;
};
