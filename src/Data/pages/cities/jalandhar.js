import { createPageData } from '../../core/types.js';

const jalandharData = createPageData('city/jalandhar', {
  urlPattern: '/projects-in-jalandhar',
  
  title: "Discover Premium Projects in Jalandhar",
  description: "Explore the best residential and commercial projects in Jalandhar with modern amenities, excellent connectivity, and rich cultural heritage. Find your dream home in this vibrant city.",
  
  seo: {
    metaTitle: "Best Projects in Jalandhar - Residential & Commercial Properties | 100acress",
    metaDescription: "Explore the best residential and commercial projects in Jalandhar with modern amenities, excellent connectivity, and rich cultural heritage. Find your dream home in this vibrant city.",
    canonical: "https://www.100acress.com/projects-in-jalandhar/",
    keywords: "projects in jalandhar, residential projects jalandhar, commercial projects jalandhar, jalandhar real estate, jalandhar properties"
  },
  
  hero: {
    title: "Discover Premium Projects in Jalandhar",
    subtitle: "Find your perfect home in Jalandhar with excellent connectivity and modern amenities"
  },
  
  faqs: [
    {
      question: "What are the best residential projects in Jalandhar?",
      answer: "Top residential projects in Jalandhar include various housing options with modern amenities, good connectivity, and excellent investment potential."
    },
    {
      question: "Is Jalandhar a good place for property investment?",
      answer: "Yes, Jalandhar offers excellent investment opportunities due to its industrial growth, affordable property prices, and development potential."
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
      title: "Industrial Growth",
      description: "Growing industrial hub with excellent opportunities"
    }
  ],
  
  customFields: {
    cityName: "Jalandhar",
    region: "Punjab"
  }
});

export default jalandharData;
