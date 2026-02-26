import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

export interface FilterState {
  city?: string;
  type?: string;
  price?: string;
  bedrooms?: string;
  status?: string;
  search?: string;
  page?: string;
  sort?: string;
}

export interface FilterOptions {
  city?: string[];
  type?: string[];
  price?: string[];
  bedrooms?: string[];
  status?: string[];
  sort?: string[];
}

export function useFilters() {
  const router = useRouter();

  // Get current filters from URL query params
  const filters = useMemo<FilterState>(() => {
    const query = router.query;
    return {
      city: query.city as string,
      type: query.type as string,
      price: query.price as string,
      bedrooms: query.bedrooms as string,
      status: query.status as string,
      search: query.search as string,
      page: query.page as string || '1',
      sort: query.sort as string || 'featured',
    };
  }, [router.query]);

  // Update a single filter
  const updateFilter = useCallback((key: keyof FilterState, value: string | undefined) => {
    const newQuery = { ...router.query };
    
    if (value && value !== '') {
      newQuery[key] = value;
    } else {
      delete newQuery[key];
    }

    // Reset to page 1 when filters change (except pagination)
    if (key !== 'page') {
      newQuery.page = '1';
    }

    router.push(
      {
        pathname: router.pathname,
        query: newQuery,
      },
      undefined,
      { shallow: true } // 🚀 No page reload
    );
  }, [router]);

  // Update multiple filters at once
  const updateFilters = useCallback((newFilters: Partial<FilterState>) => {
    const newQuery = { ...router.query };
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== '') {
        newQuery[key] = value;
      } else {
        delete newQuery[key];
      }
    });

    // Reset to page 1 when filters change
    newQuery.page = '1';

    router.push(
      {
        pathname: router.pathname,
        query: newQuery,
      },
      undefined,
      { shallow: true }
    );
  }, [router]);

  // Clear all filters
  const clearFilters = useCallback(() => {
    const { pathname } = router;
    router.push(
      {
        pathname,
        query: {},
      },
      undefined,
      { shallow: true }
    );
  }, [router]);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return Object.entries(filters).some(([key, value]) => 
      key !== 'page' && key !== 'sort' && value && value !== ''
    );
  }, [filters]);

  // Get active filters count
  const activeFiltersCount = useMemo(() => {
    return Object.entries(filters).filter(([key, value]) => 
      key !== 'page' && key !== 'sort' && value && value !== ''
    ).length;
  }, [filters]);

  // Generate SEO-friendly URL
  const generateSeoUrl = useCallback((basePath: string = '') => {
    const queryString = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '' && key !== 'page') {
        queryString.append(key, value);
      }
    });

    const queryStringStr = queryString.toString();
    return queryStringStr ? `${basePath}?${queryStringStr}` : basePath;
  }, [filters]);

  // Parse price range
  const priceRange = useMemo(() => {
    if (!filters.price) return { min: undefined, max: undefined };
    
    const [min, max] = filters.price.split('-');
    return {
      min: min ? parseInt(min) : undefined,
      max: max ? parseInt(max) : undefined,
    };
  }, [filters.price]);

  return {
    filters,
    updateFilter,
    updateFilters,
    clearFilters,
    hasActiveFilters,
    activeFiltersCount,
    generateSeoUrl,
    priceRange,
  };
}

// Helper function to build API query from filters
export function buildApiQuery(filters: FilterState) {
  const query: any = {};
  
  if (filters.city) query.city = filters.city;
  if (filters.type) query.type = filters.type;
  if (filters.bedrooms) query.bedrooms = filters.bedrooms;
  if (filters.status) query.status = filters.status;
  if (filters.search) query.search = filters.search;
  if (filters.sort) query.sort = filters.sort;
  if (filters.page) query.page = parseInt(filters.page);
  if (filters.price) {
    const { min, max } = filters.price.split('-').reduce((acc, val, idx) => {
      if (idx === 0) acc.min = val;
      if (idx === 1) acc.max = val;
      return acc;
    }, {} as { min?: string; max?: string });
    
    if (min) query.minPrice = parseInt(min);
    if (max) query.maxPrice = parseInt(max);
  }
  
  return query;
}

// Filter options for UK
export const UK_FILTER_OPTIONS: FilterOptions = {
  city: ['london', 'manchester', 'birmingham', 'bristol', 'glasgow', 'edinburgh'],
  type: ['apartment', 'house', 'villa', 'penthouse', 'studio', 'bungalow'],
  price: [
    '0-250000',
    '250000-500000', 
    '500000-750000',
    '750000-1000000',
    '1000000-1500000',
    '1500000-2000000',
    '2000000+'
  ],
  bedrooms: ['1', '2', '3', '4', '5+'],
  status: ['sale', 'rent', 'new-build', 'off-plan'],
  sort: ['featured', 'price-low', 'price-high', 'newest', 'popular']
};
