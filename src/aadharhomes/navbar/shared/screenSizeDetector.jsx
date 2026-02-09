import { useState, useEffect } from 'react';

export const SCREEN_SIZES = {
  XS: '320px',      // Extra Small Mobile
  SM: '375px',      // Small Mobile
  MD: '768px',      // Tablet
  LG: '1024px',     // iPad/Tablet Large
  XL: '1280px',     // Small Desktop
  XXL: '1440px',    // MacBook/Desktop
  XXXL: '1920px',   // Large Desktop
  ULTRA: '2560px'   // 4K Displays
};

export const DEVICE_NAMES = {
  XS: 'Extra Small Mobile',
  SM: 'Small Mobile',
  MD: 'Tablet',
  LG: 'iPad/Large Tablet',
  XL: 'Small Desktop',
  XXL: 'MacBook/Desktop',
  XXXL: 'Large Desktop',
  ULTRA: '4K Display'
};

export const SCREEN_SIZE_RANGES = {
  XS: { min: 0, max: 374 },
  SM: { min: 375, max: 767 },
  MD: { min: 768, max: 1023 },
  LG: { min: 1024, max: 1279 },
  XL: { min: 1280, max: 1439 },
  XXL: { min: 1440, max: 1919 },
  XXXL: { min: 1920, max: 2559 },
  ULTRA: { min: 2560, max: Infinity }
};

export const NAVIGATION_CONFIG = {
  XS: {
    showHamburger: true,
    showCityDropdown: false,
    showBudgetDropdown: false,
    showProjectStatus: false,
    showProjectType: false,
    showRental: false,
    showResale: false,
    showDubaiButton: false,
    maxCities: 0,
    gridColumns: 1,
    layout: 'mobile'
  },
  SM: {
    showHamburger: true,
    showCityDropdown: false,
    showBudgetDropdown: false,
    showProjectStatus: false,
    showProjectType: false,
    showRental: false,
    showResale: false,
    showDubaiButton: false,
    maxCities: 0,
    gridColumns: 1,
    layout: 'mobile'
  },
  MD: {
    showHamburger: true,
    showCityDropdown: true,
    showBudgetDropdown: false,
    showProjectStatus: false,
    showProjectType: false,
    showRental: false,
    showResale: false,
    showDubaiButton: false,
    maxCities: 0,
    gridColumns: 1,
    layout: 'tablet'
  },
  LG: {
    showHamburger: true,
    showCityDropdown: true,
    showBudgetDropdown: true,
    showProjectStatus: true, // Show at exactly 1024px
    showProjectType: false, // Hide property type below 1200
    showRental: false,
    showResale: false,
    showDubaiButton: true,
    maxCities: 6,
    gridColumns: 2,
    layout: 'ipad'
  },
  LG_COMPACT: {
    showHamburger: true,
    showCityDropdown: true,
    showBudgetDropdown: true,
    showProjectStatus: false, // Hide below 1025px, show in hamburger
    showProjectType: false, // Hide property type below 1200
    showRental: false,
    showResale: false,
    showDubaiButton: true,
    maxCities: 6,
    gridColumns: 2,
    layout: 'ipad'
  },
  XL: {
    showHamburger: true,
    showCityDropdown: true,
    showBudgetDropdown: true,
    showProjectStatus: true,
    showProjectType: false, // Hide property type below 1200
    showRental: false,
    showResale: false,
    showDubaiButton: true,
    maxCities: 8,
    gridColumns: 2,
    layout: 'small-desktop'
  },
  XXL: {
    showHamburger: false, // No full hamburger, use compact hamburger next to City
    showCityDropdown: true,
    showBudgetDropdown: true,
    showProjectStatus: true,
    showProjectType: true, // Show property type above 1200
    showRental: false,
    showResale: false, // Hidden - should be in compact hamburger
    showDubaiButton: true,
    maxCities: 10,
    gridColumns: 3,
    layout: 'desktop'
  },
  XXXL: {
    showHamburger: false,
    showCityDropdown: true,
    showBudgetDropdown: true,
    showProjectStatus: true,
    showProjectType: true,
    showRental: true,
    showResale: false,
    showDubaiButton: true,
    maxCities: 12,
    gridColumns: 4,
    layout: 'large-desktop'
  },
  ULTRA: {
    showHamburger: false,
    showCityDropdown: true,
    showBudgetDropdown: true,
    showProjectStatus: true,
    showProjectType: true,
    showRental: true,
    showResale: true,
    showDubaiButton: true,
    maxCities: 15,
    gridColumns: 5,
    layout: 'ultra-wide'
  }
};

export const CITY_SELECTION_BY_SIZE = {
  XS: [], // No cities shown
  SM: [
    { name: "Gurugram", path: "/projects-in-gurugram/" },
    { name: "Delhi", path: "/projects-in-delhi/" },
    { name: "Noida", path: "/projects-in-noida/" },
    // { name: "Dubai", path: "/united-arab-emirates/" }
  ],
  MD: [
    { name: "Gurugram", path: "/projects-in-gurugram/" },
    { name: "Delhi", path: "/projects-in-delhi/" },
    { name: "Noida", path: "/projects-in-noida/" },
    { name: "Goa", path: "/projects-in-goa/" },
    { name: "Mumbai", path: "/projects-in-mumbai/" },
    // { name: "Dubai", path: "/united-arab-emirates/" }
  ],
  LG: [
    { name: "Gurugram", path: "/projects-in-gurugram/" },
    { name: "Delhi", path: "/projects-in-delhi/" },
    { name: "Noida", path: "/projects-in-noida/" },
    { name: "Goa", path: "/projects-in-goa/" },
    { name: "Ayodhya", path: "/projects-in-ayodhya/" },
    { name: "Mumbai", path: "/projects-in-mumbai/" },
    { name: "Panipat", path: "/projects-in-panipat/" },
    { name: "Pune", path: "/projects-in-pune/" },
    // { name: "Dubai", path: "/united-arab-emirates/" }
  ],
  XL: [
    { name: "Gurugram", path: "/projects-in-gurugram/" },
    { name: "Delhi", path: "/projects-in-delhi/" },
    { name: "Noida", path: "/projects-in-noida/" },
    { name: "Goa", path: "/projects-in-goa/" },
    { name: "Ayodhya", path: "/projects-in-ayodhya/" },
    { name: "Mumbai", path: "/projects-in-mumbai/" },
    { name: "Panipat", path: "/projects-in-panipat/" },
    { name: "Panchkula", path: "/projects-in-panchkula/" },
    { name: "Kasauli", path: "/projects-in-kasauli/" },
    { name: "Sonipat", path: "/projects-in-sonipat/" },
    { name: "Pune", path: "/projects-in-pune/" },
    // { name: "Dubai", path: "/united-arab-emirates/" }
  ],
  XXL: [
    { name: "Gurugram", path: "/projects-in-gurugram/" },
    { name: "Delhi", path: "/projects-in-delhi/" },
    { name: "Noida", path: "/projects-in-noida/" },
    { name: "Goa", path: "/projects-in-goa/" },
    { name: "Ayodhya", path: "/projects-in-ayodhya/" },
    { name: "Mumbai", path: "/projects-in-mumbai/" },
    { name: "Panipat", path: "/projects-in-panipat/" },
    { name: "Panchkula", path: "/projects-in-panchkula/" },
    { name: "Kasauli", path: "/projects-in-kasauli/" },
    { name: "Sonipat", path: "/projects-in-sonipat/" },
    // { name: "Alwar", path: "/projects-in-alwar/" },
    { name: "Karnal", path: "/projects-in-karnal/" },
    { name: "Pune", path: "/projects-in-pune/" },
    // { name: "Dubai", path: "/united-arab-emirates/" }
  ],
  XXXL: [
    { name: "Gurugram", path: "/projects-in-gurugram/" },
    { name: "Delhi", path: "/projects-in-delhi/" },
    { name: "Noida", path: "/projects-in-noida/" },
    { name: "Goa", path: "/projects-in-goa/" },
    { name: "Ayodhya", path: "/projects-in-ayodhya/" },
    { name: "Mumbai", path: "/projects-in-mumbai/" },
    { name: "Panipat", path: "/projects-in-panipat/" },
    { name: "Panchkula", path: "/projects-in-panchkula/" },
    { name: "Kasauli", path: "/projects-in-kasauli/" },
    { name: "Sonipat", path: "/projects-in-sonipat/" },
    // { name: "Alwar", path: "/projects-in-alwar/" },
    { name: "Karnal", path: "/projects-in-karnal/" },
    { name: "Pune", path: "/projects-in-pune/" },
    // { name: "Dubai", path: "/united-arab-emirates/" }
  ],
  ULTRA: [
    { name: "Gurugram", path: "/projects-in-gurugram/" },
    { name: "Delhi", path: "/projects-in-delhi/" },
    { name: "Noida", path: "/projects-in-noida/" },
    { name: "Goa", path: "/projects-in-goa/" },
    { name: "Ayodhya", path: "/projects-in-ayodhya/" },
    { name: "Mumbai", path: "/projects-in-mumbai/" },
    { name: "Panipat", path: "/projects-in-panipat/" },
    { name: "Panchkula", path: "/projects-in-panchkula/" },
    { name: "Kasauli", path: "/projects-in-kasauli/" },
    { name: "Sonipat", path: "/projects-in-sonipat/" },
    // { name: "Alwar", path: "/projects-in-alwar/" },
    { name: "Karnal", path: "/projects-in-karnal/" },
    { name: "Pune", path: "/projects-in-pune/" },
    // { name: "Dubai", path: "/united-arab-emirates/" }
  ],
  // NEW: Compact desktop cities for 800-1300px range
  COMPACT_DESKTOP: [
    { name: "Gurugram", path: "/projects-in-gurugram/" },
    { name: "Delhi", path: "/projects-in-delhi/" },
    { name: "Noida", path: "/projects-in-noida/" },
    { name: "Goa", path: "/projects-in-goa/" },
    { name: "Mumbai", path: "/projects-in-mumbai/" },
    { name: "Ayodhya", path: "/projects-in-ayodhya/" },
    // { name: "Dubai", path: "/united-arab-emirates/" },
    { name: "Pune", path: "/projects-in-pune/" }
  ]
};

// Hook to detect screen size and return configuration
export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState('COMPACT_DESKTOP'); // Start with desktop to avoid flash
  const [windowWidth, setWindowWidth] = useState(1280); // Start with desktop width
  const [isClient, setIsClient] = useState(false); // Track if we're on client

  useEffect(() => {
    setIsClient(true); // We're now on client side

    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);

      // Progressive hiding system - items move to hamburger as screen gets smaller
      if (width < 768) setScreenSize('SM'); // Mobile - hamburger only
      else if (width >= 768 && width < 1024) setScreenSize('MD'); // Tablet - hamburger only
      else if (width >= 1024 && width < 1025) setScreenSize('LG'); // 1024-1024: Show Project Status
      // else if (width >= 1025 && width < 1100) setScreenSize('LG_COMPACT'); // 1025-1099: Hide Project Status
      else if (width >= 1100 && width < 1200) setScreenSize('XL'); // 1100-1200: City, Budget, Status, Dubai + hamburger
      else if (width >= 1200 && width < 1300) setScreenSize('XXL'); // 1200-1300: City, Budget, Status, Type, Dubai + hamburger
      else if (width >= 1300 && width < 1500) setScreenSize('XXXL'); // 1300-1500: + Rental, no hamburger
      else if (width >= 1500) setScreenSize('ULTRA'); // 1500+: Everything including Resale
    };

    // Initial detection
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    screenSize,
    windowWidth,
    config: NAVIGATION_CONFIG[screenSize] || NAVIGATION_CONFIG.XL, // Fallback to XL if undefined
    cities: CITY_SELECTION_BY_SIZE[screenSize] || [],
    deviceName: DEVICE_NAMES[screenSize] || 'Unknown',
    isMobile: ['XS', 'SM'].includes(screenSize),
    isTablet: ['MD', 'LG'].includes(screenSize),
    isDesktop: ['XL', 'XXL', 'XXXL', 'ULTRA'].includes(screenSize),
    isLargeScreen: ['XXL', 'XXXL', 'ULTRA'].includes(screenSize),
    isClient // Add this to track client-side rendering
  };
};

// Utility function to get screen size without hook
export const getCurrentScreenSize = () => {
  const width = window.innerWidth;

  if (width < 375) return 'XS';
  else if (width >= 375 && width < 768) return 'SM';
  else if (width >= 768 && width < 800) return 'MD';
  else if (width >= 800 && width < 1300) return 'COMPACT_DESKTOP'; // NEW RANGE
  else if (width >= 1300 && width < 1440) return 'LG';
  else if (width >= 1440 && width < 1920) return 'XXL';
  else if (width >= 1920 && width < 2560) return 'XXXL';
  else if (width >= 2560) return 'ULTRA';
};

// Get navigation configuration for current screen size
export const getNavigationConfig = () => {
  const size = getCurrentScreenSize();
  return NAVIGATION_CONFIG[size];
};

// Get cities for current screen size
export const getCitiesForScreenSize = () => {
  const size = getCurrentScreenSize();
  return CITY_SELECTION_BY_SIZE[size];
};

// Check if component should be shown
export const shouldShowComponent = (componentName) => {
  const config = getNavigationConfig();
  return config[componentName] || false;
};

// Get grid columns for current screen size
export const getGridColumns = () => {
  const config = getNavigationConfig();
  return config.gridColumns || 1;
};
