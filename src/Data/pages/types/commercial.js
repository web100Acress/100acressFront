import { createPageData } from '../../core/types.js';

const typeCommercialData = createPageData('type/commercial', {
  urlPattern: '/projects/commercial',
  
  title: "Commercial Properties in Gurugram",
  description: "Explore commercial properties in Gurugram with prime locations, modern amenities, and excellent connectivity. Find the ideal space for offices, retail, SCOs, and investments.",
  
  seo: {
    metaTitle: "Commercial Properties in Gurugram – Premium Business Spaces for Sale",
    metaDescription: "Explore commercial properties in Gurugram with prime locations, modern amenities, and excellent connectivity. Find the ideal space for offices, retail, SCOs, and investments.",
    canonical: "https://www.100acress.com/projects-type/commercial/",
    keywords: "commercial properties, office spaces, shops, retail spaces, commercial projects, business properties"
  },
  
  hero: {
    title: "Commercial Properties - Invest in Business Spaces",
    subtitle: "Looking for commercial properties in Gurugram? Here, you can explore premium office spaces, retail shops, SCO plots, and commercial floors designed for growth. With prime locations, strong connectivity, and modern infrastructure, Gurugram offers the perfect environment to start, expand, or invest in your business."
  },
  
  faqs: [
    {
      question: "What types of commercial properties are available?",
      answer: "We offer office spaces, shops, retail spaces, SCO plots, and commercial complexes across various business districts."
    },
    {
      question: "What should I consider when buying commercial property?",
      answer: "Consider location, connectivity, parking facilities, power backup, security, and proximity to business hubs and transportation."
    },
    {
      question: "What is the rental yield for commercial properties?",
      answer: "Commercial properties typically offer 6-12% rental yield depending on location and property type."
    }
  ],
  
  trustBoosters: [
    {
      icon: "💼",
      title: "Business Ready",
      description: "Properties designed for business success and growth"
    },
    {
      icon: "🚗",
      title: "Easy Access",
      description: "Excellent connectivity and parking facilities"
    },
    {
      icon: "💰",
      title: "High Returns",
      description: "Commercial properties offer excellent rental yields"
    }
  ],
  
  customFields: {
    propertyType: "commercial",
    badge: "Commercial",
    badgeColor: "#0EA5E9"
  }
});

export default typeCommercialData;
