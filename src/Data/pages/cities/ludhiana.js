import { createPageData } from '../../core/types.js';

const ludhianaData = createPageData('city/ludhiana', {
  urlPattern: '/projects-in-ludhiana',
  
  title: "Discover Premium Projects in Ludhiana",
  description: "Explore the best residential and commercial projects in Ludhiana with modern amenities, excellent connectivity to Delhi and other cities, and affordable pricing. Find your dream home in this industrial hub.",
  
  seo: {
    metaTitle: "Best Projects in Ludhiana - Residential & Commercial Properties | 100acress",
    metaDescription: "Explore the best residential and commercial projects in Ludhiana with modern amenities, excellent connectivity to Delhi and other cities, and affordable pricing. Find your dream home in this industrial hub.",
    canonical: "https://www.100acress.com/projects-in-ludhiana/",
    keywords: "projects in ludhiana, residential projects ludhiana, commercial projects ludhiana, ludhiana real estate, ludhiana properties"
  },
  
  hero: {
    title: "Discover Premium Projects in Ludhiana",
    subtitle: "Find your perfect home in Ludhiana with excellent connectivity and modern amenities"
  },
  
  faqs: [
    {
      question: "What are the best residential projects in Ludhiana?",
      answer: "Top residential projects in Ludhiana include various housing options with modern amenities, good connectivity, and excellent investment potential."
    },
    {
      question: "Is Ludhiana a good place for property investment?",
      answer: "Yes, Ludhiana offers excellent investment opportunities due to its industrial growth, proximity to Delhi, and developing real estate market."
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
      title: "Industrial Hub",
      description: "Properties in Punjab's industrial capital with excellent opportunities"
    }
  ],
  
  customFields: {
    cityName: "Ludhiana",
    region: "Punjab"
  }
});

export default ludhianaData;
