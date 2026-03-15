import { createPageData } from '../../core/types.js';

const typeFarmhouseData = createPageData('type/farmhouse', {
  urlPattern: '/projects/farmhouse',
  
  title: "Farmhouses in Delhi NCR",
  description: "Find the best farmhouses in Delhi NCR. Explore exclusive listings, premium projects, investment opportunities, and verified property details.",
  
  seo: {
    metaTitle: "Farmhouses in Delhi NCR - Your Private Green Escape",
    metaDescription: "Find the best farmhouses in Delhi NCR. Explore exclusive listings, premium projects, investment opportunities, and verified property details.",
    canonical: "https://www.100acress.com/projects-type/farmhouse/",
    keywords: "farm houses, farm house properties, agricultural investment, serene living, farm house investment"
  },
  
  hero: {
    title: "Farm Houses - Serene Living and Agricultural Investment",
    subtitle: "Discover premium farm houses with modern amenities and agricultural opportunities"
  },
  
  faqs: [
    {
      question: "What are farm houses?",
      answer: "Farm houses are properties that combine residential living with agricultural land, offering a peaceful lifestyle with opportunities for farming and investment."
    },
    {
      question: "What amenities are available in farm houses?",
      answer: "Farm houses typically include modern homes, agricultural land, water facilities, and sometimes swimming pools, gardens, and security."
    },
    {
      question: "Are farm houses good for investment?",
      answer: "Yes, farm houses offer excellent investment potential due to land appreciation, agricultural income, and the growing demand for peaceful living."
    },
    {
      question: "What is the price range for farm houses?",
      answer: "Farm houses typically range from ₹1-10 crores depending on location, size, and amenities."
    }
  ],
  
  trustBoosters: [
    {
      icon: "🌾",
      title: "Agricultural Opportunity",
      description: "Properties with agricultural land for farming and investment"
    },
    {
      icon: "🏠",
      title: "Serene Living",
      description: "Peaceful living away from city hustle"
    },
    {
      icon: "💰",
      title: "Investment Potential",
      description: "Excellent appreciation and rental yields"
    }
  ],
  
  customFields: {
    propertyType: "farmhouse",
    badge: "Farmhouse",
    badgeColor: "#22C55E"
  }
});

export default typeFarmhouseData;
