import { Country } from '../providers/CountryProvider';

export const COUNTRIES: Record<string, Country> = {
  uk: {
    code: 'uk',
    name: 'United Kingdom',
    shortName: 'UK',
    flag: '🇬🇧',
    colors: {
      primary: '#1e40af',
      secondary: '#3b82f6'
    },
    currency: 'GBP',
    currencySymbol: '£',
    phoneCode: '+44',
    domain: '100acress.co.uk',
    seo: {
      title: 'UK Real Estate & Properties | 100acress United Kingdom',
      description: 'Discover premium properties across the United Kingdom. From London apartments to countryside homes, find your dream property with 100acress UK.',
      keywords: ['UK real estate', 'London properties', 'UK homes', 'British property', 'United Kingdom real estate', '100acress UK']
    },
    navigation: [
      { name: 'Home', path: '/' },
      { name: 'Properties', path: '/properties' },
      { name: 'About', path: '/about' },
      { name: 'Contact', path: '/contact' }
    ],
    contact: {
      phone: '+44 20 7123 4567',
      email: 'uk@100acress.com',
      address: '100acress UK, 123 London Street, London, UK, SW1A 1AA'
    }
  },
  usa: {
    code: 'usa',
    name: 'United States',
    shortName: 'USA',
    flag: '🇺🇸',
    colors: {
      primary: '#dc2626',
      secondary: '#ef4444'
    },
    currency: 'USD',
    currencySymbol: '$',
    phoneCode: '+1',
    domain: '100acress.com',
    seo: {
      title: 'USA Real Estate & Properties | 100acress United States',
      description: 'Find your dream home in the United States. From New York condos to California beach houses, explore premium properties with 100acress USA.',
      keywords: ['USA real estate', 'American properties', 'US homes', 'United States property', '100acress USA', 'real estate USA']
    },
    navigation: [
      { name: 'Home', path: '/' },
      { name: 'Properties', path: '/properties' },
      { name: 'About', path: '/about' },
      { name: 'Contact', path: '/contact' }
    ],
    contact: {
      phone: '+1 (555) 123-4567',
      email: 'usa@100acress.com',
      address: '100acress USA, 456 Park Avenue, New York, NY 10022, USA'
    }
  },
  srilanka: {
    code: 'srilanka',
    name: 'Sri Lanka',
    shortName: 'SL',
    flag: '🇱🇰',
    colors: {
      primary: '#ea580c',
      secondary: '#f97316'
    },
    currency: 'LKR',
    currencySymbol: 'රු',
    phoneCode: '+94',
    domain: '100acress.lk',
    seo: {
      title: 'Sri Lanka Real Estate & Properties | 100acress Sri Lanka',
      description: 'Explore beautiful properties in Sri Lanka. From Colombo apartments to beach villas, find your perfect property with 100acress Sri Lanka.',
      keywords: ['Sri Lanka real estate', 'Colombo properties', 'Sri Lankan homes', 'Island property', '100acress Sri Lanka', 'property Sri Lanka']
    },
    navigation: [
      { name: 'Home', path: '/' },
      { name: 'Properties', path: '/properties' },
      { name: 'About', path: '/about' },
      { name: 'Contact', path: '/contact' }
    ],
    contact: {
      phone: '+94 11 234 5678',
      email: 'srilanka@100acress.com',
      address: '100acress Sri Lanka, 789 Galle Road, Colombo 03, Sri Lanka'
    }
  }
};

export const DEFAULT_COUNTRY = 'uk';

export const getCountryByCode = (code: string): Country | undefined => {
  return COUNTRIES[code.toLowerCase()];
};

export const getAllCountries = (): Country[] => {
  return Object.values(COUNTRIES);
};

export default COUNTRIES;
