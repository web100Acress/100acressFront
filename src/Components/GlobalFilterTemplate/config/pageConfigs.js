// Page configurations for different filter page types
import { getStaticData, getFAQData, getTrustBoosters } from './staticData.jsx';

export const pageConfigs = {
  // City Page Configuration
  city: {
    title: "Best Real Estate Projects",
    description: "Discover premium real estate projects in prime locations with modern amenities and exceptional value.",
    itemsPerPage: 18,
    projectTypes: [
      "Commercial Property", "Residential Flats", "SCO Plots", "Deen Dayal Plots",
      "Residential Plots", "Independent Floors", "Builder Floors", "Affordable Homes",
      "Villas", "Farm Housess", "Industrial Projects", "Industrial Plots"
    ],
    priceRanges: [
      { value: '<1', label: 'Under 1 Cr' },
      { value: '1-5', label: '1–5 Cr' },
      { value: '5-10', label: '5–10 Cr' },
      { value: '10-20', label: '10–20 Cr' },
      { value: '20-50', label: '20–50 Cr' },
      { value: '>50', label: 'Above 50 Cr' }
    ],
    badgeColor: 'bg-blue-500',
    badgeText: 'Premium',
    typeFilter: (project) => true // Show all projects for city pages
  },

  // Budget Page Configuration
  budget: {
    title: "Properties by Budget",
    description: "Find the perfect property within your budget range with our comprehensive price filters.",
    itemsPerPage: 18,
    projectTypes: [
      "Commercial Property", "Residential Flats", "SCO Plots", "Deen Dayal Plots",
      "Residential Plots", "Independent Floors", "Builder Floors", "Affordable Homes",
      "Villas", "Farm Houses", "Industrial Projects", "Industrial Plots"
    ],
    priceRanges: [
      { value: '<1', label: 'Under 1 Cr' },
      { value: '1-5', label: '1–5 Cr' },
      { value: '5-10', label: '5–10 Cr' },
      { value: '10-20', label: '10–20 Cr' },
      { value: '20-50', label: '20–50 Cr' },
      { value: '>50', label: 'Above 50 Cr' }
    ],
    badgeColor: 'bg-green-500',
    badgeText: 'Best Value',
    typeFilter: (project) => true // Show all projects for budget pages
  },

  // Project Status Page Configuration
  status: {
    title: "Projects by Status",
    description: "Explore projects based on their construction status - from upcoming to ready to move.",
    itemsPerPage: 18,
    projectTypes: [
      "Commercial Property", "Residential Flats", "SCO Plots", "Deen Dayal Plots",
      "Residential Plots", "Independent Floors", "Builder Floors", "Affordable Homes",
      "Villas", "Farm Houses", "Industrial Projects", "Industrial Plots"
    ],
    projectStatus: [
      "Upcoming Projects", "New Launch", "Under Construction", "Ready to Move"
    ],
    badgeColor: 'bg-orange-500',
    badgeText: 'Featured',
    typeFilter: (project) => true // Show all projects for status pages
  },

  // Project Type Page Configuration
  type: {
    title: "Projects by Type",
    description: "Browse properties by type - residential, commercial, plots, and more.",
    itemsPerPage: 18,
    projectTypes: [
      "Commercial Property", "Residential Flats", "SCO Plots", "Deen Dayal Plots",
      "Residential Plots", "Independent Floors", "Builder Floors", "Affordable Homes",
      "Villas", "Farm Houses", "Industrial Projects", "Industrial Plots"
    ],
    badgeColor: 'bg-purple-500',
    badgeText: 'New',
    typeFilter: (project) => true // Will be overridden by specific type filters
  }
};

// Specific project type configurations
export const projectTypeConfigs = {
  "sco-plots": {
    title: "SCO Plots in Gurugram",
    description: "Discover Premium SCO Plots in Gurugram – Your Gateway to Shop-Cum-Office Investment and Business Growth.",
    query: "scoplots",
    reduxKey: "scoplotsall",
    badgeColor: "bg-blue-500",
    badgeText: "SCO Plot",
    typeFilter: (project) => {
      return project.type?.toLowerCase().includes('sco') ||
             project.projectType?.toLowerCase().includes('sco') ||
             project.category?.toLowerCase().includes('sco') ||
             project.propertyType?.toLowerCase().includes('sco') ||
             project.projectName?.toLowerCase().includes('sco') ||
             project.description?.toLowerCase().includes('sco') ||
             project.projectName?.toLowerCase().includes('shop-cum-office') ||
             project.description?.toLowerCase().includes('shop-cum-office') ||
             project.projectName?.toLowerCase().includes('shop cum office') ||
             project.description?.toLowerCase().includes('shop cum office') ||
             project.projectName?.toLowerCase().includes('commercial') ||
             project.description?.toLowerCase().includes('commercial') ||
             true; // Show all for debugging
    }
  },
  "luxury-villas": {
    title: "India's Luxury Villas for Sale",
    description: "Discover Premium Luxury Villas Across India – Your Gateway to Exquisite Living and Prime Real Estate Investment.",
    query: "villas",
    reduxKey: "luxuryvillas",
    badgeColor: "bg-purple-500",
    badgeText: "Luxury Villa",
    typeFilter: (project) => {
      return project.type?.toLowerCase().includes('villa') ||
             project.projectType?.toLowerCase().includes('villa') ||
             project.category?.toLowerCase().includes('villa') ||
             project.propertyType?.toLowerCase().includes('villa') ||
             project.projectName?.toLowerCase().includes('villa') ||
             project.description?.toLowerCase().includes('villa');
    }
  },
  "plots-in-gurugram": {
    title: "Plots in Gurugram",
    description: "Discover Premium Plots in Gurugram – Your Gateway to Prime Real Estate Investment.",
    query: "plotsingurugram",
    reduxKey: "plotsingurugram",
    badgeColor: "bg-green-500",
    badgeText: "Plot",
    typeFilter: (project) => {
      return project.type?.toLowerCase().includes('plot') ||
             project.projectType?.toLowerCase().includes('plot') ||
             project.category?.toLowerCase().includes('plot') ||
             project.propertyType?.toLowerCase().includes('plot') ||
             project.projectName?.toLowerCase().includes('plot') ||
             project.description?.toLowerCase().includes('plot');
    }
  },
  "residential-projects": {
    title: "Residential Property",
    description: "Residential properties range from homes to apartments, each crafted to match unique lifestyles and comfort needs.",
    query: "residentiaProject",
    reduxKey: "residential",
    badgeColor: "bg-red-500",
    badgeText: "Residential",
    typeFilter: (project) => true // Show all residential projects
  },
  "independent-floors": {
    title: "Independent & Builder Floors",
    description: "Discover Premium Independent & Builder Floors – Curated Living Spaces in Top Cities.",
    query: "builderindepedentfloor",
    reduxKey: "builderindependentfloor",
    badgeColor: "bg-red-500",
    badgeText: "Independent Floor",
    typeFilter: (project) => true // Show all independent floor projects
  },
  "commercial-projects": {
    title: "Commercial Projects",
    description: "Discover Premium Commercial Projects – Your Gateway to Business Investment and Growth.",
    query: "commercial",
    reduxKey: "commercialProjectAll",
    badgeColor: "bg-orange-500",
    badgeText: "Commercial",
    typeFilter: (project) => {
      // More comprehensive filtering for commercial projects
      const isCommercial = 
        project.type?.toLowerCase().includes('commercial') ||
        project.projectType?.toLowerCase().includes('commercial') ||
        project.category?.toLowerCase().includes('commercial') ||
        project.propertyType?.toLowerCase().includes('commercial') ||
        project.projectName?.toLowerCase().includes('commercial') ||
        project.description?.toLowerCase().includes('commercial') ||
        project.projectName?.toLowerCase().includes('office') ||
        project.projectName?.toLowerCase().includes('business') ||
        project.projectName?.toLowerCase().includes('corporate') ||
        project.projectName?.toLowerCase().includes('tower') ||
        project.projectName?.toLowerCase().includes('centre') ||
        project.projectName?.toLowerCase().includes('street') ||
        project.projectName?.toLowerCase().includes('boulevard') ||
        project.projectName?.toLowerCase().includes('arena') ||
        project.projectName?.toLowerCase().includes('broadway') ||
        project.projectName?.toLowerCase().includes('vedatam') ||
        // Check if the project is explicitly marked as commercial in the database
        project.type === 'Commercial Property' ||
        project.projectType === 'Commercial Property' ||
        project.category === 'Commercial Property' ||
        project.propertyType === 'Commercial Property';
      
      console.log('Commercial filter check for:', project.projectName, 'Result:', isCommercial);
      return isCommercial;
    }
  },
  "farmhouse": {
    title: "Farm Houses Projects",
    description: "Discover Premium Farm Houses Projects – Your Gateway to Serene Living and Agricultural Investment.",
    query: "farmhouse",
    reduxKey: "farmhouse",
    canonical: "https://www.100acress.com/projects/farmhouse/",
    badgeColor: "bg-green-500",
    badgeText: "Farm Houses",
    typeFilter: (project) => {
      return project.type?.toLowerCase().includes('farm') ||
             project.projectType?.toLowerCase().includes('farm') ||
             project.category?.toLowerCase().includes('farm') ||
             project.propertyType?.toLowerCase().includes('farm') ||
             project.projectName?.toLowerCase().includes('farm') ||
             project.description?.toLowerCase().includes('farm') ||
             project.type === 'Farm Houses';
    }
  },
  "industrial-plots": {
    title: "Industrial Plots",
    description: "Discover Premium Industrial Plots – Your Gateway to Industrial Investment and Business Expansion.",
    query: "industrialplots",
    reduxKey: "industrialplots",
    badgeColor: "bg-gray-500",
    badgeText: "Industrial Plot",
    typeFilter: (project) => {
      return project.type?.toLowerCase().includes('industrial') ||
             project.projectType?.toLowerCase().includes('industrial') ||
             project.category?.toLowerCase().includes('industrial') ||
             project.propertyType?.toLowerCase().includes('industrial') ||
             project.projectName?.toLowerCase().includes('industrial') ||
             project.description?.toLowerCase().includes('industrial') ||
             project.type === 'Industrial Plots';
    }
  },
  "industrial-projects": {
    title: "Industrial Projects",
    description: "Discover Premium Industrial Projects – Your Gateway to Industrial Investment and Business Expansion.",
    query: "industrialprojects",
    reduxKey: "industrialprojects",
    badgeColor: "bg-gray-600",
    badgeText: "Industrial Project",
    typeFilter: (project) => {
      return project.type?.toLowerCase().includes('industrial') ||
             project.projectType?.toLowerCase().includes('industrial') ||
             project.category?.toLowerCase().includes('industrial') ||
             project.propertyType?.toLowerCase().includes('industrial') ||
             project.projectName?.toLowerCase().includes('industrial') ||
             project.description?.toLowerCase().includes('industrial') ||
             project.type === 'Industrial Projects';
    }
  }
};

// Status configurations for project status pages
export const statusConfigs = {
  upcoming: {
    title: "UpComing Projects in Gurgaon",
    description: "Explore best upcoming projects in Gurgaon with modern amenities. Find residential & commercial spaces customized to your lifestyle. Visit 100acress today!",
    badgeColor: "bg-blue-500",
    badgeText: "Upcoming"
  },
  underconstruction: {
    title: "Under Construction Projects in Gurgaon",
    description: "Under Construction Properties in Gurgaon include commercial and residential projects that will meet various requirements. These developments are equipped with modern amenities, great places close to business areas, as well as extensive green spaces. They're designed to meet the ever-changing demands of urban dwellers who want peace, convenience, and a vibrant lifestyle.",
    badgeColor: "bg-orange-500",
    badgeText: "Under Construction"
  },
  readytomove: {
    title: "Ready To Move Projects",
    description: "Explore ready to move properties in Gurgaon with modern amenities. Find residential & commercial spaces ready for immediate possession.",
    badgeColor: "bg-green-500",
    badgeText: "Ready to Move"
  },
  newlaunch: {
    title: "Projects in New Launch",
    description: "Explore new launch projects in Gurgaon with modern amenities. Find the latest residential & commercial spaces.",
    badgeColor: "bg-purple-500",
    badgeText: "New Launch"
  }
};

// City configurations
export const cityConfigs = {
  gurugram: {
    title: "Best Projects in Gurugram",
    description: "Value, Location, and Comfort — Discover premium projects in prime Gurugram locations.",
    badgeColor: "bg-blue-500",
    badgeText: "Gurugram"
  },
  delhi: {
    title: "Best Projects in Delhi",
    description: "Value, Location, and Comfort — Discover premium projects in prime Delhi locations.",
    badgeColor: "bg-red-500",
    badgeText: "Delhi"
  },
  noida: {
    title: "Best Projects in Noida",
    description: "Value, Location, and Comfort — Discover premium projects in prime Noida locations.",
    badgeColor: "bg-green-500",
    badgeText: "Noida"
  },
  alwar: {
    title: "Best Projects in Alwar",
    description: "Value, Location, and Comfort — Discover premium projects in prime Alwar locations.",
    badgeColor: "bg-yellow-500",
    badgeText: "Alwar"
  }
};

export default {
  pageConfigs,
  projectTypeConfigs,
  statusConfigs,
  cityConfigs
};
