// Centralized dynamic filter configuration for HeroWithFilters and related pages

export const CATEGORIES = [
  { value: "Residential", label: "Residential" },
  { value: "Commercial", label: "Commercial" },
];

export const PROPERTY_TYPES_BY_CATEGORY = {
  Residential: [
    { value: "Apartment", label: "Apartment" },
    { value: "Villa", label: "Villa" },
    { value: "Plot", label: "Plot" },
  ],
  Commercial: [
    { value: "Office", label: "Office" },
    { value: "Retail", label: "Retail" },
    { value: "Warehouse", label: "Warehouse" },
  ],
};

export const CITIES = [
  { value: "gurgaon", label: "Gurgaon" },
  { value: "noida", label: "Noida" },
  { value: "dwarka-expressway", label: "Dwarka Expressway" },
  { value: "gurugram", label: "Gurugram" },
];

export const BEDROOMS = ["1+", "2+", "3+"].map((v) => ({ value: v, label: v }));
export const BATHROOMS = ["1+", "2+", "3+"].map((v) => ({ value: v, label: v }));
export const FURNISHING = [
  { value: "Unfurnished", label: "Unfurnished" },
  { value: "Semi-furnished", label: "Semi-furnished" },
  { value: "Furnished", label: "Furnished" },
];
export const RERA = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
];

// Quick links presets, can be extended or localized
export const QUICK_LINKS = [
  {
    label: "Buy",
    category: (sel) => sel.category || "Residential",
    type: (sel) => sel.propertyType || "Apartment",
    city: (sel) => sel.city || "gurgaon",
    path: "/buy",
  },
  {
    label: "Rent",
    category: () => "Residential",
    type: () => "Apartment",
    city: (sel) => sel.city || "noida",
    path: "/rent",
  },
  {
    label: "Commercial",
    category: () => "Commercial",
    type: () => "Office",
    city: (sel) => sel.city || "gurgaon",
    path: "/commercial",
  },
  { label: "Apartments", category: () => "Residential", type: () => "Apartment", city: (sel) => sel.city || "gurgaon", path: "/buy" },
  { label: "Villas", category: () => "Residential", type: () => "Villa", city: (sel) => sel.city || "gurgaon", path: "/buy" },
  { label: "Plots", category: () => "Residential", type: () => "Plot", city: (sel) => sel.city || "gurgaon", path: "/buy" },
  { label: "Offices", category: () => "Commercial", type: () => "Office", city: (sel) => sel.city || "gurgaon", path: "/commercial" },
  { label: "Gurgaon", category: (sel) => sel.category || "Residential", type: (sel) => sel.propertyType || "Apartment", city: () => "gurgaon", path: "/buy" },
  { label: "Noida", category: (sel) => sel.category || "Residential", type: (sel) => sel.propertyType || "Apartment", city: () => "noida", path: "/buy" },
  { label: "Dwarka Expressway", category: (sel) => sel.category || "Residential", type: (sel) => sel.propertyType || "Apartment", city: () => "dwarka-expressway", path: "/buy" },
];

export function buildSearchHref(basePath, paramsObj) {
  const params = new URLSearchParams();
  Object.entries(paramsObj).forEach(([k, v]) => {
    if (v !== undefined && v !== null && `${v}`.length > 0) params.set(k, v);
  });
  return `${basePath}?${params.toString()}`;
}

export function sanitizeSelections(selections) {
  // If propertyType isn't available for the selected category, clear it
  const types = PROPERTY_TYPES_BY_CATEGORY[selections.category] || [];
  const validTypeValues = new Set(types.map((t) => t.value));
  const next = { ...selections };
  if (next.propertyType && !validTypeValues.has(next.propertyType)) {
    next.propertyType = "";
  }
  return next;
}
