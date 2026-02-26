// Country Registry Configuration
// All countries data and metadata

export const COUNTRIES = {
  uk: {
    code: 'uk',
    name: 'United Kingdom',
    shortName: 'UK',
    flag: '🇬🇧',
    currency: 'GBP',
    currencySymbol: '£',
    language: 'en',
    timezone: 'Europe/London',
    domain: 'uk.100acress.com',
    phoneCode: '+44',
    theme: 'uk',
    colors: {
      primary: '#1e3a5f',
      secondary: '#c8102e',
      accent: '#ffffff',
      background: '#f8fafc',
      text: '#1a202c'
    },
    seo: {
      title: '100acress UK - Premium Real Estate',
      description: 'Discover luxury properties across the United Kingdom. Find your dream home in London, Manchester, Birmingham and more.',
      keywords: ['UK real estate', 'London property', 'UK homes for sale', 'British real estate']
    },
    navigation: {
      home: 'Home',
      projects: 'Projects',
      about: 'About',
      contact: 'Contact',
      blogs: 'Blogs'
    },
    contact: {
      email: 'uk@100acress.com',
      phone: '+44 20 7123 4567',
      address: '123 Oxford Street, London W1D 2HS'
    }
  },
  
  usa: {
    code: 'usa',
    name: 'United States',
    shortName: 'USA',
    flag: '🇺🇸',
    currency: 'USD',
    currencySymbol: '$',
    language: 'en',
    timezone: 'America/New_York',
    domain: 'usa.100acress.com',
    phoneCode: '+1',
    theme: 'usa',
    colors: {
      primary: '#1e40af',
      secondary: '#b91c1c',
      accent: '#ffffff',
      background: '#fafafa',
      text: '#111827'
    },
    seo: {
      title: '100acress USA - Premium Real Estate',
      description: 'Discover luxury properties across the United States. Find your dream home in New York, Los Angeles, Miami and more.',
      keywords: ['USA real estate', 'American property', 'US homes for sale', 'luxury homes USA']
    },
    navigation: {
      home: 'Home',
      projects: 'Projects',
      about: 'About',
      contact: 'Contact',
      blogs: 'Blogs'
    },
    contact: {
      email: 'usa@100acress.com',
      phone: '+1 (555) 123-4567',
      address: '456 Madison Avenue, New York, NY 10022'
    }
  },
  
  srilanka: {
    code: 'srilanka',
    name: 'Sri Lanka',
    shortName: 'SL',
    flag: '🇱🇰',
    currency: 'LKR',
    currencySymbol: 'Rs',
    language: 'en',
    timezone: 'Asia/Colombo',
    domain: 'srilanka.100acress.com',
    phoneCode: '+94',
    theme: 'srilanka',
    colors: {
      primary: '#8b5a2b',
      secondary: '#ff9933',
      accent: '#128807',
      background: '#fffbf5',
      text: '#2d3748'
    },
    seo: {
      title: '100acress Sri Lanka - Premium Real Estate',
      description: 'Discover luxury properties across Sri Lanka. Find your dream home in Colombo, Galle, Kandy and more.',
      keywords: ['Sri Lanka real estate', 'Colombo property', 'Sri Lanka homes', 'luxury villas Sri Lanka']
    },
    navigation: {
      home: 'Home',
      projects: 'Projects',
      about: 'About',
      contact: 'Contact',
      blogs: 'Blogs'
    },
    contact: {
      email: 'srilanka@100acress.com',
      phone: '+94 11 234 5678',
      address: '789 Galle Road, Colombo 03'
    }
  }
};

// Helper functions
export const getCountryByCode = (code) => COUNTRIES[code.toLowerCase()] || null;

export const getAllCountries = () => Object.values(COUNTRIES);

export const getCountryCodes = () => Object.keys(COUNTRIES);

export const isValidCountry = (code) => COUNTRIES.hasOwnProperty(code.toLowerCase());

export const DEFAULT_COUNTRY = 'uk';

export const GLOBAL_SEO = {
  title: '100acress Global - International Real Estate',
  description: 'Discover premium real estate across the globe. UK, USA, Sri Lanka and more countries. Find your dream property worldwide.',
  keywords: ['global real estate', 'international property', 'luxury homes worldwide', '100acress global']
};
