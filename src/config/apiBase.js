// Centralized API base URL configuration
// How to switch:
// - Option A: Set a persistent override in localStorage key 'apiBase'
// - Option B: Edit DEFAULT_BASE below and rebuild

// Prefer Vite env variable if present, fallback to localhost during development
const DEFAULT_BASE = (
  typeof import.meta !== 'undefined' &&
  import.meta.env &&
  import.meta.env.VITE_API_BASE
) || 'http://localhost:3500'; // local backend during development

export const getApiBase = () => {
  try {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem('apiBase') : null;
    return stored || DEFAULT_BASE;
  } catch {
    return DEFAULT_BASE;
  }
};

export const setApiBase = (url) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('apiBase', url);
  }
};

export const clearApiBaseOverride = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem('apiBase');
  }
};
