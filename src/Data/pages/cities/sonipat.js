import { createPageData } from '../../core/types.js';

const sonipatData = createPageData('city/sonipat', {
  urlPattern: '/projects-in-sonipat',
  
  title: "Discover Premium Projects in Sonipat",
  description: "Explore the best residential and commercial projects in Sonipat with modern amenities, excellent connectivity to Delhi, and affordable pricing. Find your dream home in this rapidly developing city.",
  
  seo: {
    metaTitle: "Best Projects in Sonipat - Residential & Commercial Properties | 100acress",
    metaDescription: "Explore the best residential and commercial projects in Sonipat with modern amenities, excellent connectivity to Delhi, and affordable pricing. Find your dream home in this rapidly developing city.",
    canonical: "https://www.100acress.com/projects-in-sonipat/",
    keywords: "projects in sonipat, residential projects sonipat, commercial projects sonipat, sonipat real estate, sonipat properties"
  },
  
  hero: {
    title: "Discover Premium Projects in Sonipat",
    subtitle: "Find your perfect home in Sonipat with excellent connectivity to Delhi and modern amenities"
  },
  
  faqs: [
    {
      question: "What are the best residential projects in Sonipat?",
      answer: "Top residential projects in Sonipat include various affordable housing options with modern amenities, good connectivity to Delhi, and excellent investment potential."
    },
    {
      question: "Is Sonipat a good place for property investment?",
      answer: "Yes, Sonipat offers excellent investment opportunities due to its proximity to Delhi, affordable property prices, and rapid infrastructure development."
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
    cityName: "Sonipat",
    region: "Haryana"
  }
});

export default sonipatData;
