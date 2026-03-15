import { createPageData } from '../../core/types.js';

const panipatData = createPageData('city/panipat', {
  urlPattern: '/projects-in-panipat',
  
  title: "Discover Premium Projects in Panipat",
  description: "Explore the best residential and commercial projects in Panipat with modern amenities, excellent connectivity to Delhi, and affordable pricing. Find your dream home in this historic city.",
  
  seo: {
    metaTitle: "Best Projects in Panipat - Residential & Commercial Properties | 100acress",
    metaDescription: "Explore the best residential and commercial projects in Panipat with modern amenities, excellent connectivity to Delhi, and affordable pricing. Find your dream home in this historic city.",
    canonical: "https://www.100acress.com/projects-in-panipat/",
    keywords: "projects in panipat, residential projects panipat, commercial projects panipat, panipat real estate, panipat properties"
  },
  
  hero: {
    title: "Discover Premium Projects in Panipat",
    subtitle: "Find your perfect home in Panipat with excellent connectivity to Delhi and modern amenities"
  },
  
  faqs: [
    {
      question: "What are the best residential projects in Panipat?",
      answer: "Top residential projects in Panipat include various housing options with modern amenities, good connectivity to Delhi, and excellent investment potential."
    },
    {
      question: "Is Panipat a good place for property investment?",
      answer: "Yes, Panipat offers excellent investment opportunities due to its proximity to Delhi, affordable property prices, and rapid infrastructure development."
    }
  ],
  
  trustBoosters: [
    {
      icon: "🛡️",
      title: "RERA Approved",
      description: "All our projects are RERA registered ensuring legal compliance"
    },
    {
      icon: "🏆",
      title: "Affordable Pricing",
      description: "Best value properties with modern amenities"
    }
  ],
  
  customFields: {
    cityName: "Panipat",
    region: "Haryana"
  }
});

export default panipatData;
