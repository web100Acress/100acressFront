import { createPageData } from '../../core/types.js';

const dubaiData = createPageData('city/dubai', {
  urlPattern: '/projects-in-dubai',
  
  title: "Discover Premium Projects in Dubai",
  description: "Explore the best residential and commercial projects in Dubai with world-class amenities, luxury living, and excellent investment potential. Find your dream home in this global city.",
  
  seo: {
    metaTitle: "Best Projects in Dubai - Residential & Commercial Properties | 100acress",
    metaDescription: "Explore the best residential and commercial projects in Dubai with world-class amenities, luxury living, and excellent investment potential. Find your dream home in this global city.",
    canonical: "https://www.100acress.com/united-arab-emirates/",
    keywords: "projects in dubai, residential projects dubai, commercial projects dubai, dubai real estate, dubai properties"
  },
  
  hero: {
    title: "Discover Premium Projects in Dubai",
    subtitle: "Find your perfect home in Dubai with world-class amenities and luxury living"
  },
  
  faqs: [
    {
      question: "What are the best residential projects in Dubai?",
      answer: "Top residential projects in Dubai include luxury apartments, villas, and penthouses with world-class amenities, prime locations, and excellent investment potential."
    },
    {
      question: "Is Dubai a good place for property investment?",
      answer: "Yes, Dubai offers excellent investment opportunities due to its tax-free environment, high rental yields, and strong economic growth."
    }
  ],
  
  trustBoosters: [
    {
      icon: "🛡️",
      title: "Tax-Free Investment",
      description: "No capital gains tax on property investments"
    },
    {
      icon: "🏆",
      title: "Luxury Living",
      description: "World-class amenities and luxury lifestyle"
    }
  ],
  
  customFields: {
    cityName: "Dubai",
    region: "UAE"
  }
});

export default dubaiData;
