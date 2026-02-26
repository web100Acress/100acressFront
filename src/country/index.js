/**
 * 🌍 100acress Country Module - Main Entry Point
 * 
 * This module provides a complete country-based architecture for the 100acress
 * international real estate platform.
 * 
 * @module @100acress/country
 */

// ===== CONFIG =====
export { COUNTRIES, getCountryByCode, getAllCountries, getCountryCodes, isValidCountry, DEFAULT_COUNTRY, GLOBAL_SEO } from './config/countries';

// ===== PROVIDERS =====
export { CountryProvider, useCountry } from './providers/CountryProvider';
export { ThemeProvider, useTheme } from './providers/ThemeProvider';

// ===== PAGES =====
export { GlobalHome, ChooseCountry } from './pages';
export { UKHome, USAHome, SriLankaHome } from './pages';

// ===== MODULES (Components) =====
export { 
  // Global
  GlobalNavbar, 
  GlobalHero, 
  GlobalFooter,
  // UK
  UKNavbar, 
  UKHero, 
  UKFooter,
  // USA
  USANavbar, 
  USAHero, 
  USAFooter,
  // Sri Lanka
  SriLankaNavbar, 
  SriLankaHero, 
  SriLankaFooter
} from './modules';

// Import CSS
try {
  if (typeof document !== 'undefined') {
    import('./themes/countries.css');
  }
} catch (e) {
  // CSS will be loaded by bundler
}
