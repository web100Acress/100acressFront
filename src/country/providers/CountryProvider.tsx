import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { COUNTRIES, getCountryByCode, DEFAULT_COUNTRY } from '../config/countries';

export interface Country {
  code: string;
  name: string;
  shortName: string;
  flag: string;
  colors: {
    primary: string;
    secondary: string;
  };
  currency: string;
  currencySymbol: string;
  phoneCode: string;
  domain: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  navigation: Array<{
    name: string;
    path: string;
  }>;
  contact: {
    phone: string;
    email: string;
    address: string;
  };
}

export interface CountryContextType {
  currentCountry: Country | null;
  allCountries: Country[];
  selectCountry: (countryCode: string) => void;
  setGlobalMode: () => void;
  isGlobal: boolean;
  getCountryByCode: (code: string) => Country | undefined;
}

const CountryContext = createContext<CountryContextType | null>(null);

interface CountryProviderProps {
  children: ReactNode;
}

export const CountryProvider: React.FC<CountryProviderProps> = ({ children }) => {
  const [currentCountry, setCurrentCountry] = useState<Country | null>(() => {
    // Check localStorage first
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('selectedCountry');
      if (saved) {
        const country = getCountryByCode(saved);
        if (country) return country;
      }
      
      // Check URL path
      const pathMatch = window.location.pathname.match(/^\/(uk|usa|srilanka)(\/|$)/i);
      if (pathMatch) {
        return getCountryByCode(pathMatch[1]) || COUNTRIES[DEFAULT_COUNTRY];
      }
    }
    
    return COUNTRIES[DEFAULT_COUNTRY];
  });

  const [isGlobal, setIsGlobal] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname;
    return path === '/' || path === '/global' || path === '/country/choose';
  });

  useEffect(() => {
    // Update theme attribute on body
    if (currentCountry && !isGlobal) {
      document.body.setAttribute('data-theme', currentCountry.code);
      document.body.classList.add('country-theme');
    } else {
      document.body.removeAttribute('data-theme');
      document.body.classList.remove('country-theme');
    }
  }, [currentCountry, isGlobal]);

  const selectCountry = useCallback((countryCode: string) => {
    const country = getCountryByCode(countryCode);
    if (country) {
      setCurrentCountry(country);
      setIsGlobal(false);
      if (typeof window !== 'undefined') {
        localStorage.setItem('selectedCountry', countryCode);
      }
    }
  }, []);

  const setGlobalMode = useCallback(() => {
    setIsGlobal(true);
    setCurrentCountry(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('selectedCountry');
    }
  }, []);

  const value: CountryContextType = {
    currentCountry,
    allCountries: Object.values(COUNTRIES),
    selectCountry,
    setGlobalMode,
    isGlobal,
    getCountryByCode
  };

  return (
    <CountryContext.Provider value={value}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = (): CountryContextType => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  return context;
};

export default CountryContext;
