import { createPageData } from '../../core/types.js';

const pushkarData = createPageData('city/pushkar', {
  urlPattern: '/projects-in-pushkar',
  
  title: "Discover Premium Projects in Pushkar",
  description: "Explore the best residential and commercial projects in Pushkar with spiritual ambiance, cultural heritage, and peaceful living. Find your dream home in this sacred city.",
  
  seo: {
    metaTitle: "Best Projects in Pushkar - Residential & Commercial Properties | 100acress",
    metaDescription: "Explore the best residential and commercial projects in Pushkar with spiritual ambiance, cultural heritage, and peaceful living. Find your dream home in this sacred city.",
    canonical: "https://www.100acress.com/projects-in-pushkar/",
    keywords: "projects in pushkar, residential projects pushkar, commercial projects pushkar, pushkar real estate, pushkar properties"
  },
  
  hero: {
    title: "Discover Premium Projects in Pushkar",
    subtitle: "Find your perfect home in Pushkar with spiritual ambiance and peaceful living"
  },
  
  faqs: [
    {
      question: "What are the best residential projects in Pushkar?",
      answer: "Top residential projects in Pushkar include various housing options with modern amenities, spiritual ambiance, and excellent investment potential."
    },
    {
      question: "Is Pushkar a good place for property investment?",
      answer: "Yes, Pushkar offers excellent investment opportunities due to its tourism potential, spiritual significance, and growing real estate market."
    }
  ],
  
  trustBoosters: [
    {
      icon: "🛡️",
      title: "Spiritual Ambiance",
      description: "Peaceful living in a sacred city"
    },
    {
      icon: "🏆",
      title: "Tourism Potential",
      description: "Growing tourism industry with investment opportunities"
    }
  ],
  
  customFields: {
    cityName: "Pushkar",
    region: "Rajasthan"
  }
});

export default pushkarData;
