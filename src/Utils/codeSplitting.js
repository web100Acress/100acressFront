// Code splitting utilities for heavy components
import { lazy } from 'react';

// Heavy components that should be code-split
export const ModernRecommendedSection = lazy(() => 
  import('../Components/HomePageComponents/ModernRecommendedSection')
);

export const LuxuryFooter = lazy(() => 
  import('../Components/Actual_Components/LuxuryFooter')
);

export const Chatbot = lazy(() => 
  import('../Components/Chatbot').catch(() => ({
    default: () => null // Fallback if Chatbot doesn't exist
  }))
);

export const FloatingShorts = lazy(() => 
  import('../Components/FloatingShorts')
);

export const DynamicHeroBanner = lazy(() => 
  import('../Components/HomePageComponents/DynamicHeroBanner')
);

export const SmallBannerSection = lazy(() => 
  import('../Components/HomePageComponents/SmallBannerSection')
);

// Admin components that are heavy
export const BlogWriteModal = lazy(() => 
  import('../AdminPage/BlogWriteModal')
);

export const UnifiedBannerManagement = lazy(() => 
  import('../AdminPage/UnifiedBannerManagement')
);

export const AdminDashboard = lazy(() => 
  import('../AdminPage/AdminDashboard')
);

// Analytics components
export const MarketAnalytics = lazy(() => 
  import('../analytics/pages/MarketAnalytics')
);

export const PriceTrends = lazy(() => 
  import('../analytics/pages/PriceTrends')
);

// Utility function to create lazy components with error boundaries
export const createLazyComponent = (importFn, fallback = null) => {
  return lazy(() => 
    importFn().catch(() => ({
      default: fallback || (() => <div>Component failed to load</div>)
    }))
  );
};
