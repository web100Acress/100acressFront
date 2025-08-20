const DEFAULT_BASE = 'https://api.100acress.com';  

// const DEFAULT_BASE = 'http://localhost:3500';


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
