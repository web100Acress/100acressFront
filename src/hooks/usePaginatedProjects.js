import { useState, useCallback, useEffect } from 'react';
import { getAllProjects } from '../Redux/utils/Api_Service';

export const usePaginatedProjects = (query, initialLimit = 10) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadProjects = useCallback(async (pageNum = 1, reset = false) => {
    setLoading(true);
    try {
      const response = await getAllProjects(query, initialLimit, pageNum);
      const newProjects = response.data || [];
      
      if (reset || pageNum === 1) {
        setProjects(newProjects);
      } else {
        setProjects(prev => [...prev, ...newProjects]);
      }
      
      // Check if there are more projects to load
      setHasMore(newProjects.length === initialLimit);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  }, [query, initialLimit]);

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadProjects(nextPage, false);
    }
  };

  // Initial load
  useEffect(() => {
    loadProjects(1, true);
  }, [loadProjects]);

  return {
    projects,
    loading,
    loadMore,
    hasMore,
    page
  };
};
