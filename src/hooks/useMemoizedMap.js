import React, { useMemo } from 'react';
import { useMemo } from 'react';

/**
 * Hook to memoize expensive map operations
 * @param {Array} items - Array to map over
 * @param {Function} mapFn - Mapping function
 * @param {Array} deps - Dependency array for useMemo
 * @returns {Array} - Mapped array
 */
export const useMemoizedMap = (items, mapFn, deps = []) => {
  return useMemo(() => {
    if (!Array.isArray(items)) return [];
    return items.map(mapFn);
  }, [items, ...deps]);
};

/**
 * Hook to memoize filtered and mapped operations
 * @param {Array} items - Array to filter and map
 * @param {Function} filterFn - Filter function
 * @param {Function} mapFn - Mapping function
 * @param {Array} deps - Dependency array
 * @returns {Array} - Filtered and mapped array
 */
export const useMemoizedFilterMap = (items, filterFn, mapFn, deps = []) => {
  return useMemo(() => {
    if (!Array.isArray(items)) return [];
    return useMemo(() => items.filter(filterFn).map(mapFn), [items]);
  }, [items, ...deps]);
};

/**
 * Hook to memoize sorted operations
 * @param {Array} items - Array to sort
 * @param {Function} sortFn - Sort function
 * @param {Array} deps - Dependency array
 * @returns {Array} - Sorted array
 */
export const useMemoizedSort = (items, sortFn, deps = []) => {
  return useMemo(() => {
    if (!Array.isArray(items)) return [];
    return [...items].sort(sortFn);
  }, [items, ...deps]);
};

/**
 * Hook to memoize search/filter operations
 * @param {Array} items - Array to search
 * @param {string} searchTerm - Search term
 * @param {Function} searchFn - Search function
 * @param {Array} deps - Additional dependencies
 * @returns {Array} - Filtered array
 */
export const useMemoizedSearch = (items, searchTerm, searchFn, deps = []) => {
  return useMemo(() => {
    if (!Array.isArray(items) || !searchTerm) return items;
    return items.filter(item => searchFn(item, searchTerm));
  }, [items, searchTerm, ...deps]);
};

/**
 * Hook to memoize grouped operations
 * @param {Array} items - Array to group
 * @param {Function} groupFn - Grouping function
 * @param {Array} deps - Dependency array
 * @returns {Object} - Grouped object
 */
export const useMemoizedGroup = (items, groupFn, deps = []) => {
  return useMemo(() => {
    if (!Array.isArray(items)) return {};
    return items.reduce((groups, item) => {
      const key = groupFn(item);
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
      return groups;
    }, {});
  }, [items, ...deps]);
};

/**
 * Hook to memoize paginated data
 * @param {Array} items - Array to paginate
 * @param {number} page - Current page
 * @param {number} itemsPerPage - Items per page
 * @param {Array} deps - Additional dependencies
 * @returns {Object} - Paginated data
 */
export const useMemoizedPagination = (items, page, itemsPerPage, deps = []) => {
  return useMemo(() => {
    if (!Array.isArray(items)) return { paginatedItems: [], totalPages: 0 };
    
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = items.slice(startIndex, endIndex);
    const totalPages = Math.ceil(items.length / itemsPerPage);
    
    return { paginatedItems, totalPages };
  }, [items, page, itemsPerPage, ...deps]);
};

/**
 * Hook to memoize unique operations
 * @param {Array} items - Array to get unique values from
 * @param {Function} keyFn - Function to get unique key
 * @param {Array} deps - Dependency array
 * @returns {Array} - Array of unique items
 */
export const useMemoizedUnique = (items, keyFn, deps = []) => {
  return useMemo(() => {
    if (!Array.isArray(items)) return [];
    
    const seen = new Set();
    return items.filter(item => {
      const key = keyFn(item);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [items, ...deps]);
};
