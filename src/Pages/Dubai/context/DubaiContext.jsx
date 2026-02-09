import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const DubaiContext = createContext();
const emiratesConfig = {
  "Dubai": {
    route: "/united-arab-emirates",
    headline: "New & Upcoming Projects in Dubai",
    subheadline: "Your Gateway to Premium Properties",
    description: "Explore Premium Projects in Dubai",
    heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80", // Dubai skyline
    tagline: "The City of Gold"
  },
  "Abu Dhabi": {
    route: "/united-arab-emirates",
    headline: "Luxury Properties in Abu Dhabi",
    subheadline: "Capital of Elegance",
    description: "Find your dream home in UAE's sophisticated capital city",
    heroImage: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1920&q=80", // Abu Dhabi
    tagline: "Capital of the UAE"
  },
  "Sharjah": {
    route: "/united-arab-emirates",
    headline: "Premium Real Estate in Sharjah",
    subheadline: "Cultural Heart of UAE",
    description: "Discover affordable luxury in the cultural capital",
    heroImage: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=1920&q=80", // Sharjah
    tagline: "The Cultural Capital"
  },
  "Ajman": {
    route: "/united-arab-emirates",
    headline: "Affordable Luxury in Ajman",
    subheadline: "Hidden Gem of UAE",
    description: "Explore value-driven properties with modern amenities",
    heroImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80", // Ajman
    tagline: "The Pearl of the Gulf"
  },
  "Ras Al Khaimah": {
    route: "/united-arab-emirates",
    headline: "Scenic Properties in Ras Al Khaimah",
    subheadline: "Nature Meets Luxury",
    description: "Mountain views and beachfront living combined",
    heroImage: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=1920&q=80", // RAK
    tagline: "Adventure & Serenity"
  },
  "Fujairah": {
    route: "/united-arab-emirates",
    headline: "Coastal Living in Fujairah",
    subheadline: "East Coast Paradise",
    description: "Beachfront properties with stunning mountain backdrops",
    heroImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80", // Fujairah
    tagline: "The Hidden Treasure"
  },
  "Umm Al Quwain": {
    route: "/united-arab-emirates",
    headline: "Tranquil Properties in Umm Al Quwain",
    subheadline: "Peaceful Living",
    description: "Serene waterfront properties away from the hustle",
    heroImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80", // UAQ
    tagline: "The Quiet Emirate"
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
  const [currency, setCurrency] = useState("INR"); // INR, AED, USD

  // Get current emirate config
  const currentEmirateConfig = emiratesConfig[selectedEmirate] || emiratesConfig["Dubai"];

  // Custom setter that does NOT change the route
  // All emirates stay on /united-arab-emirates route
  const setSelectedEmirate = (emirate) => {
    setSelectedEmirateState(emirate);
    // No route navigation - all emirates use /united-arab-emirates
  };

  // Initialize to Dubai as default emirate when on /united-arab-emirates route
  useEffect(() => {
    const currentPath = location.pathname;
    // Only set default emirate if we're on the UAE page and haven't selected one yet
    if ((currentPath === '/united-arab-emirates' || currentPath === '/united-arab-emirates/') && !selectedEmirate) {
      setSelectedEmirateState('Dubai');
    }
  }, [location.pathname]);

  const value = {
    selectedEmirate,
    setSelectedEmirate,
    selectedPropertyType,
    setSelectedPropertyType,
    currency,
    setCurrency,
    emirateConfig: currentEmirateConfig,
    emiratesConfig,
  };

  return <DubaiContext.Provider value={value}>{children}</DubaiContext.Provider>;
};
