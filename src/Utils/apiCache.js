// API Caching utilities for performance optimization

class APICache {
  constructor() {
    this.cache = new Map();
    this.timestamps = new Map();
    this.defaultTTL = 5 * 60 * 1000; // 5 minutes default TTL
  }

  // Generate cache key from URL and options
  generateKey(url, options = {}) {
    const method = options.method || 'GET';
    const body = options.body ? JSON.stringify(options.body) : '';
    return `${method}:${url}:${body}`;
  }

  // Check if cache entry is valid
  isValid(key, ttl = this.defaultTTL) {
    const timestamp = this.timestamps.get(key);
    if (!timestamp) return false;
    return Date.now() - timestamp < ttl;
  }

  // Get cached response
  get(key) {
    if (this.isValid(key)) {
      return this.cache.get(key);
    }
    return null;
  }

  // Set cached response
  set(key, data, ttl = this.defaultTTL) {
    this.cache.set(key, data);
    this.timestamps.set(key, Date.now());
    
    // Auto-cleanup expired entries
    setTimeout(() => {
      this.cache.delete(key);
      this.timestamps.delete(key);
    }, ttl);
  }

  // Clear specific cache entry
  clear(key) {
    this.cache.delete(key);
    this.timestamps.delete(key);
  }

  // Clear all cache
  clearAll() {
    this.cache.clear();
    this.timestamps.clear();
  }

  // Get cache stats
  getStats() {
    return {
      size: this.cache.size,
      entries: Array.from(this.cache.keys())
    };
  }
}

// Create global cache instance
const apiCache = new APICache();

// Enhanced fetch with caching
export const cachedFetch = async (url, options = {}, ttl = 5 * 60 * 1000) => {
  const key = apiCache.generateKey(url, options);
  
  // Check cache first
  const cached = apiCache.get(key);
  if (cached) {
    console.log(`Cache hit for: ${url}`);
    return cached;
  }

  try {
    console.log(`Cache miss for: ${url}, fetching...`);
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Cache successful responses
    apiCache.set(key, data, ttl);
    
    return data;
  } catch (error) {
    console.error(`Fetch error for ${url}:`, error);
    throw error;
  }
};

// Specialized cache for settings API
export const cachedSettingsFetch = async (endpoint, ttl = 10 * 60 * 1000) => {
  const url = `${import.meta.env.VITE_API_BASE || 'http://localhost:3500'}/settings/${endpoint}`;
  return cachedFetch(url, {}, ttl);
};

// Specialized cache for banner APIs
export const cachedBannerFetch = async (endpoint, ttl = 2 * 60 * 1000) => {
  const url = `${import.meta.env.VITE_API_BASE || 'http://localhost:3500'}/api/${endpoint}`;
  return cachedFetch(url, {}, ttl);
};

// Cache invalidation utilities
export const invalidateCache = (pattern) => {
  const stats = apiCache.getStats();
  stats.entries.forEach(key => {
    if (key.includes(pattern)) {
      apiCache.clear(key);
    }
  });
};

// Clear all banner-related cache
export const clearBannerCache = () => {
  invalidateCache('banners');
  invalidateCache('small-banners');
};

// Clear all settings cache
export const clearSettingsCache = () => {
  invalidateCache('settings');
};

// Optimized API client with automatic caching
export class OptimizedAPIClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async get(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const cacheKey = `GET:${url}`;
    
    // Check cache first
    const cached = apiCache.get(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const response = await fetch(url, {
        method: 'GET',
        ...options
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Cache the response
      apiCache.set(cacheKey, data, options.ttl || 5 * 60 * 1000);
      
      return data;
    } catch (error) {
      console.error(`API GET error for ${url}:`, error);
      throw error;
    }
  }

  async post(endpoint, data, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        body: JSON.stringify(data),
        ...options
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Invalidate related cache entries
      if (endpoint.includes('banners')) {
        clearBannerCache();
      }
      
      return result;
    } catch (error) {
      console.error(`API POST error for ${url}:`, error);
      throw error;
    }
  }
}

// Create optimized API client instance
export const apiClient = new OptimizedAPIClient(
  import.meta.env.VITE_API_BASE || 'http://localhost:3500'
);

// Export cache instance for manual control
export { apiCache };
