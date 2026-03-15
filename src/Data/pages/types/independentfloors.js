import { createPageData } from '../../core/types.js';

const typeIndependentFloorsData = createPageData('type/independentfloors', {
  urlPattern: '/projects/independent-floors',
  
  title: "Independent Floors - Your Own Space",
  description: "Explore the best independent floors with modern amenities, privacy, and excellent connectivity. Find your perfect independent floor for comfortable living.",
  
  seo: {
    metaTitle: "Independent Floors - Your Own Space | 100acress",
    metaDescription: "Explore the best independent floors with modern amenities, privacy, and excellent connectivity. Find your perfect independent floor for comfortable living.",
    canonical: "https://www.100acress.com/projects/independent-floors/",
    keywords: "independent floors, builder floors, independent houses, independent properties, independent living"
  },
  
  hero: {
    title: "Independent Floors - Your Own Space",
    subtitle: "Find your perfect independent floor with modern amenities and privacy"
  },
  
  faqs: [
    {
      question: "What are independent floors?",
      answer: "Independent floors are single-floor units in multi-story buildings, offering privacy and independence while sharing common amenities like parking and security."
    },
    {
      question: "What are the benefits of independent floors?",
      answer: "Independent floors offer privacy, no shared walls, independent entry, and often come with parking and garden space, making them ideal for families."
    },
    {
      question: "What amenities can I expect in independent floors?",
      answer: "You can expect parking, security, power backup, and sometimes shared amenities like gym, clubhouse, and landscaped gardens."
    }
  ],
  
  trustBoosters: [
    {
      icon: "🏠",
      title: "Your Own Space",
      description: "Complete privacy and independence in your own floor"
    },
    {
      icon: "🛡️",
      title: "RERA Approved",
      description: "All our projects are RERA registered ensuring legal compliance"
    },
    {
      icon: "🏆",
      title: "Modern Amenities",
      description: "Contemporary amenities for comfortable living"
    }
  ],
  
  customFields: {
    propertyType: "independent-floors",
    badge: "Independent",
    badgeColor: "#8B5CF6"
  }
});

export default typeIndependentFloorsData;
