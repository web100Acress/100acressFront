import { getApiBase, setApiBase, clearApiBaseOverride } from "../../config/apiBase";

// Centralized API routes. Use RELATIVE paths so global axios baseURL applies.
// This avoids hardcoding host/port in components.
export const API_ROUTES = {
  // Base helpers (if a component needs absolute URL for any reason)
  base: () => getApiBase(),
  // Return path-only (no leading slash). Axios baseURL will prefix this.
  projectsBase: () => `project`,

  // Users
  getAllUsers: "/postPerson/view/allusers",
  updateUserRole: (id) => `/postPerson/users/${id}/role`,
};

// Backward-compat named exports (avoid breaking older code paths)
// IMPORTANT: Path-only (no leading slash) so axios baseURL can prefix correctly.
export const API_ROUTES_PROJECTS = `project`;

// Helpers to manage base at runtime for the whole app
export const switchApiBase = (url) => {
  setApiBase(url);
};

export const resetApiBaseToDefault = () => {
  clearApiBaseOverride();
};