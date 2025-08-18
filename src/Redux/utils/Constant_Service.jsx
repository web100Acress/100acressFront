import { getApiBase, setApiBase, clearApiBaseOverride } from "../../config/apiBase";

// Compute base once per import; consumers can call switchApiBase to change it at runtime
let BASE = getApiBase();

export const API_ROUTES = `${BASE}/`;
export const API_ROUTES_PROJECTS = `${BASE}/project`;

// Helpers to manage base at runtime for the whole app
export const switchApiBase = (url) => {
  setApiBase(url);
  BASE = getApiBase();
};

export const resetApiBaseToDefault = () => {
  clearApiBaseOverride();
  BASE = getApiBase();
};