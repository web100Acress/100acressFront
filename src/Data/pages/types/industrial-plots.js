import { createPageData } from '../../core/types.js';

const typeIndustrialPlotsData = createPageData('type/industrial-plots', {
  urlPattern: '/projects/industrial-plots',
  
  title: "Industrial Plots – Build, Expand & Grow Your Business",
  description: "Industrial plots for sale offering premium land ideal for warehousing, manufacturing, logistics, and large-scale business development in prime locations.",
  
  seo: {
    metaTitle: "Industrial Plots for Sale – Premium Land for Warehousing & Manufacturing",
    metaDescription: "Industrial plots for sale offering premium land ideal for warehousing, manufacturing, logistics, and large-scale business development in prime locations.",
    canonical: "https://www.100acress.com/projects/industrial-plots/",
    keywords: "industrial plots, industrial land for sale, warehousing land, manufacturing plots, logistics land, industrial property"
  },
  
  hero: {
    title: "Industrial Plots – Build, Expand & Grow Your Business",
    subtitle: "Looking for industrial plots to grow your business? Explore premium land options perfect for warehouses, manufacturing units, and logistics setups. With strong connectivity, reliable infrastructure, and high expansion potential, industrial plots offer the ideal foundation for long-term business growth."
  },
  
  faqs: [
    {
      question: "Why should I invest in an industrial plot?",
      answer: "Industrial plots provide long-term stability, space for expansion, and strong demand from warehousing, logistics, and manufacturing businesses."
    },
    {
      question: "What should I check before buying an industrial plot?",
      answer: "Check zoning approvals, road connectivity, power and water availability, legal clearances, and proximity to highways and transport hubs."
    },
    {
      question: "Are industrial plots suitable for warehousing and logistics?",
      answer: "Yes, most industrial plots are planned with wide roads, loading/unloading access, and connectivity that make them ideal for warehouses and logistics parks."
    }
  ],
  
  trustBoosters: [
    {
      icon: "🏭",
      title: "Business-Ready Land",
      description: "Plots planned for industrial, warehousing, and logistics use"
    },
    {
      icon: "🚚",
      title: "Strategic Connectivity",
      description: "Access to highways, transport hubs, and key industrial corridors"
    },
    {
      icon: "📈",
      title: "High Growth Potential",
      description: "Ideal for businesses planning expansion and long-term operations"
    }
  ],
  
  customFields: {
    propertyType: "industrial-plots",
    badge: "Industrial",
    badgeColor: "#6B7280"
  }
});

export default typeIndustrialPlotsData;
