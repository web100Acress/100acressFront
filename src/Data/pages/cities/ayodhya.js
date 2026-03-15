import { createPageData } from '../../core/types.js';

const ayodhyaData = createPageData('city/ayodhya', {
  urlPattern: '/projects-in-ayodhya',
  
  title: "Discover Premium Projects in Ayodhya",
  description: "Explore the best residential and commercial projects in Ayodhya with spiritual ambiance, cultural heritage, and modern amenities. Find your dream home in this sacred city.",
  
  seo: {
    metaTitle: "Best Projects in Ayodhya - Residential & Commercial Properties | 100acress",
    metaDescription: "Explore the best residential and commercial projects in Ayodhya with spiritual ambiance, cultural heritage, and modern amenities. Find your dream home in this sacred city.",
    canonical: "https://www.100acress.com/projects-in-ayodhya/",
    keywords: "projects in ayodhya, residential projects ayodhya, commercial projects ayodhya, ayodhya real estate, ayodhya properties"
  },
  
  hero: {
    title: "Discover Premium Projects in Ayodhya",
    subtitle: "Find your perfect home in Ayodhya with spiritual ambiance and modern amenities"
  },
  
  faqs: [
    {
      question: "What are the best residential projects in Ayodhya?",
      answer: "Top residential projects in Ayodhya include various housing options with modern amenities, spiritual ambiance, and excellent investment potential."
    },
    {
      question: "Is Ayodhya a good place for property investment?",
      answer: "Yes, Ayodhya offers excellent investment opportunities due to its spiritual significance, cultural heritage, and growing real estate market."
    }
  ],
  
  trustBoosters: [
    {
      icon: "🛡️",
      title: "Spiritual Ambiance",
      description: "Peaceful living in a sacred city with rich cultural heritage"
    },
    {
      icon: "🏆",
      title: "Cultural Heritage",
      description: "Properties in a city with rich cultural and spiritual significance"
    }
  ],
  
  customFields: {
    cityName: "Ayodhya",
    region: "Uttar Pradesh"
  }
});

export default ayodhyaData;
