import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingSpinner from '../Components/LoadingSpinner';

// Lazy load global country-specific pages
const GlobalHome = lazy(() => import('../pages/global/Home'));
const GlobalProjectsDubai = lazy(() => import('../pages/global/projects-in-dubai-uae'));
const GlobalProjectsLondon = lazy(() => import('../pages/global/projects-in-london-uk'));
const GlobalProjectsSriLanka = lazy(() => import('../pages/global/projects-in-shrilanka'));

// Types for country-specific routing
// @ts-ignore
const CountryRouteConfig = {
  country: '',
  path: '',
  component: null,
  seo: {
    title: '',
    description: '',
    keywords: []
  }
};

// Country-specific route configurations
const COUNTRY_ROUTES = [
  {
    country: 'uae',
    path: '/global/projects-in-dubai-uae/',
    component: GlobalProjectsDubai,
    seo: {
      title: 'Projects in Dubai, UAE | 100acress Global',
      description: 'Discover premium real estate projects in Dubai, UAE. Luxury apartments, villas, and commercial properties with 100acress.',
      keywords: ['Dubai projects', 'UAE real estate', 'Dubai properties', 'luxury Dubai homes', '100acress Dubai']
    }
  },
  {
    country: 'uk',
    path: '/global/projects-in-london-uk/',
    component: GlobalProjectsLondon,
    seo: {
      title: 'Projects in London, UK | 100acress Global',
      description: 'Explore premium properties in London, UK. From apartments to houses, find your dream property with 100acress UK.',
      keywords: ['London projects', 'UK real estate', 'London properties', 'British homes', '100acress London']
    }
  },
  {
    country: 'srilanka',
    path: '/global/projects-in-shrilanka/',
    component: GlobalProjectsSriLanka,
    seo: {
      title: 'Projects in Sri Lanka | 100acress Global',
      description: 'Find beautiful properties in Sri Lanka. From Colombo apartments to beach villas, discover your perfect property with 100acress Sri Lanka.',
      keywords: ['Sri Lanka projects', 'Colombo properties', 'Sri Lankan homes', 'island property', '100acress Sri Lanka']
    }
  }
];

// Helper to get route config by country
const getCountryRoute = (country) => {
  return COUNTRY_ROUTES.find(route => route.country === country.toLowerCase());
};

// Helper to get all country routes
const getAllCountryRoutes = () => {
  return COUNTRY_ROUTES;
};

// Country-specific routing component
const CountryApp = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Global home page */}
        <Route path="/global/" element={<GlobalHome />} />
        
        {/* Country-specific project routes */}
        {COUNTRY_ROUTES.map(({ path, component: Component, seo }) => (
          <Route
            key={path}
            path={path}
            element={
              <Component 
                title={seo.title}
                description={seo.description}
                keywords={seo.keywords}
              />
            }
          />
        ))}
      </Routes>
    </Suspense>
  );
};

export default CountryApp;
