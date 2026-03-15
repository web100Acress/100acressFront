import React, { memo, useMemo, useCallback, useState, useEffect, useRef } from 'react';
import { useMemoizedMap, useMemoizedFilterMap, useMemoizedSearch } from '../hooks/useMemoizedMap';

/**
 * Virtualized list component for large datasets
 * Renders only visible items to improve performance
 */
const VirtualizedList = memo(({
  items = [],
  itemHeight = 50,
  containerHeight = 400,
  renderItem,
  searchTerm = '',
  filterFn,
  overscan = 5,
  ...props
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);

  // Memoize filtered items
  const filteredItems = useMemoizedFilterMap(
    items,
    filterFn || ((item) => true),
    (item) => item,
    [items, searchTerm]
  );

  // Memoize searched items
  const searchedItems = useMemoizedSearch(
    filteredItems,
    searchTerm,
    (item, term) => {
      if (!term) return true;
      const searchStr = term.toLowerCase();
      return JSON.stringify(item).toLowerCase().includes(searchStr);
    },
    [filteredItems]
  );

  // Calculate visible range
  const visibleRange = useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
      searchedItems.length,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );
    return { startIndex, endIndex };
  }, [scrollTop, itemHeight, containerHeight, searchedItems.length, overscan]);

  // Memoize visible items
  const visibleItems = useMemo(() => {
    return searchedItems.slice(visibleRange.startIndex, visibleRange.endIndex);
  }, [searchedItems, visibleRange]);

  // Handle scroll
  const handleScroll = useCallback((e) => {
    setScrollTop(e.target.scrollTop);
  });

  // Memoize total height
  const totalHeight = useMemo(() => {
    return searchedItems.length * itemHeight;
  }, [searchedItems.length, itemHeight]);

  return (
    <div
      ref={containerRef}
      style={{
        height: containerHeight,
        overflow: 'auto',
        position: 'relative'
      }}
      onScroll={handleScroll}
      {...props}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems.map((item, index) => {
          const actualIndex = visibleRange.startIndex + index;
          return (
            <div
              key={actualIndex}
              style={{
                position: 'absolute',
                top: actualIndex * itemHeight,
                height: itemHeight,
                width: '100%'
              }}
            >
              {renderItem(item, actualIndex)}
            </div>
          );
        })}
      </div>
    </div>
  );
});

VirtualizedList.displayName = 'VirtualizedList';

/**
 * Optimized list component with memoization
 */
const OptimizedList = memo(({
  items = [],
  renderItem,
  keyExtractor,
  searchTerm = '',
  filterFn,
  sortFn,
  emptyMessage = 'No items found',
  loading = false,
  loadingComponent = <div>Loading...</div>,
  ...props
}) => {
  // Memoize filtered and sorted items
  const processedItems = useMemo(() => {
    let result = items || [];
    
    // Apply filter
    if (filterFn) {
      result = result.filter(filterFn);
    }
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(item =>
        JSON.stringify(item).toLowerCase().includes(term)
      );
    }
    
    // Apply sort
    if (sortFn) {
      result = [...result].sort(sortFn);
    }
    
    return result;
  }, [items, filterFn, searchTerm, sortFn]);

  // Memoize rendered items
  const renderedItems = useMemoizedMap(
    processedItems,
    (item, index) => {
      const key = keyExtractor ? keyExtractor(item, index) : index;
      return (
        <React.Fragment key={key}>
          {renderItem(item, index)}
        </React.Fragment>
      );
    },
    [processedItems, renderItem, keyExtractor]
  );

  if (loading) {
    return loadingComponent;
  }

  if (processedItems.length === 0) {
    return <div>{emptyMessage}</div>;
  }

  return (
    <div {...props}>
      {renderedItems}
    </div>
  );
});

OptimizedList.displayName = 'OptimizedList';

/**
 * Debounced search input component
 */
const DebouncedSearch = memo(({
  value,
  onChange,
  debounceMs = 300,
  placeholder = 'Search...',
  ...props
}) => {
  const [inputValue, setInputValue] = useState(value || '');
  const timeoutRef = useRef(null);

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  const handleChange = useCallback((e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      onChange(newValue);
    }, debounceMs);
  }, [onChange, debounceMs]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  });

  return (
    <input
      type="text"
      value={inputValue}
      onChange={handleChange}
      placeholder={placeholder}
      {...props}
    />
  );
});

DebouncedSearch.displayName = 'DebouncedSearch';

/**
 * Infinite scroll component
 */
const InfiniteScroll = memo(({
  items,
  renderItem,
  onLoadMore,
  hasMore,
  loading,
  loadingComponent = <div>Loading more...</div>,
  threshold = 100,
  ...props
}) => {
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loading) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasMore, loading, onLoadMore]);

  return (
    <div {...props}>
      {items.map((item, index) => renderItem(item, index))}
      {hasMore && (
        <div ref={loaderRef}>
          {loading ? loadingComponent : null}
        </div>
      )}
    </div>
  );
});

InfiniteScroll.displayName = 'InfiniteScroll';

export {
  VirtualizedList,
  OptimizedList,
  DebouncedSearch,
  InfiniteScroll
};
