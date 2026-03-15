import { createPageData } from '../../core/types.js';

const typeLuxuryVillasData = createPageData('type/luxury-villas', {
  urlPattern: '/projects/villas',
  
  title: "Luxury Villas - Premium Living",
  description: "Explore the best luxury villas with world-class amenities, spacious layouts, and prime locations. Find your perfect luxury villa for an exceptional lifestyle.",
  
  seo: {
    metaTitle: "Luxury Villas - Premium Living | 100acress",
    metaDescription: "Explore the best luxury villas with world-class amenities, spacious layouts, and prime locations. Find your perfect luxury villa for an exceptional lifestyle.",
    canonical: "https://www.100acress.com/projects-type/villas/",
    keywords: "luxury villas, premium villas, luxury homes, villa properties, luxury living"
  },
  
  hero: {
    title: "Luxury Villas - Premium Living",
    subtitle: "Find your perfect luxury villa with world-class amenities and spacious layouts"
  },
  
  faqs: [
    {
      question: "What are luxury villas?",
      answer: "Luxury villas are premium standalone homes with spacious layouts, private gardens, modern amenities, and often include features like private pools, home theaters, and premium finishes."
    },
    {
      question: "What amenities are available in luxury villas?",
      answer: "Luxury villas typically include private gardens, swimming pools, home theaters, gyms, premium finishes, smart home features, and concierge services."
    },
    {
      question: "What is the price range for luxury villas?",
      answer: "Luxury villas typically range from ₹2-10+ crores depending on location, size, and amenities. Prime locations command higher prices."
    }
  ],
  
  trustBoosters: [
    {
      icon: "👑",
      title: "Luxury Living",
      description: "Experience the finest in luxury living with world-class amenities"
    },
    {
      icon: "🏆",
      title: "Premium Brand",
      description: "Properties by renowned developers with excellent track records"
    },
    {
      icon: "💰",
      title: "High Returns",
      description: "Luxury villas offer excellent appreciation and rental yields"
    }
  ],
  
  customFields: {
    propertyType: "villas",
    badge: "Luxury Villas",
    badgeColor: "#EAB308"
  }
});

export default typeLuxuryVillasData;
