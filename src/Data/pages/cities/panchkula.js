import { createPageData } from '../../core/types.js';

const panchkulaData = createPageData('city/panchkula', {
  urlPattern: '/projects-in-panchkula',
  
  title: "Discover Premium Projects in Panchkula",
  description: "Explore the best residential and commercial projects in Panchkula with modern amenities, excellent connectivity, and peaceful living. Find your dream home in this well-planned city.",
  
  seo: {
    metaTitle: "Best Projects in Panchkula - Residential & Commercial Properties | 100acress",
    metaDescription: "Explore the best residential and commercial projects in Panchkula with modern amenities, excellent connectivity, and peaceful living. Find your dream home in this well-planned city.",
    canonical: "https://www.100acress.com/projects-in-panchkula/",
    keywords: "projects in panchkula, residential projects panchkula, commercial projects panchkula, panchkula real estate, panchkula properties"
  },
  
  hero: {
    title: "Discover Premium Projects in Panchkula",
    subtitle: "Find your perfect home in Panchkula with modern amenities and peaceful living"
  },
  
  faqs: [
    {
      question: "What are the best residential projects in Panchkula?",
      answer: "Top residential projects in Panchkula include various housing options with modern amenities, good connectivity, and excellent investment potential."
    },
    {
      question: "Is Panchkula a good place for property investment?",
      answer: "Yes, Panchkula offers excellent investment opportunities due to its well-planned infrastructure, peaceful environment, and growing real estate market."
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
      title: "Well-Planned City",
      description: "Properties in a well-planned city with excellent infrastructure"
    }
  ],
  
  customFields: {
    cityName: "Panchkula",
    region: "Haryana"
  }
});

export default panchkulaData;
