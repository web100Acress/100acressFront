import { createPageData } from '../../core/types.js';

const mumbaiData = createPageData('city/mumbai', {
  urlPattern: '/projects-in-mumbai',
  
  title: "Discover Premium Projects in Mumbai",
  description: "Explore the best residential and commercial projects in Mumbai with world-class amenities, excellent connectivity, and prime locations. Find your dream home in India's financial capital.",
  
  seo: {
    metaTitle: "Best Projects in Mumbai - Residential & Commercial Properties | 100acress",
    metaDescription: "Explore the best residential and commercial projects in Mumbai with world-class amenities, excellent connectivity, and prime locations. Find your dream home in India's financial capital.",
    canonical: "https://www.100acress.com/projects-in-mumbai/",
    keywords: "projects in mumbai, residential projects mumbai, commercial projects mumbai, mumbai real estate, mumbai properties"
  },
  
  hero: {
    title: "Discover Premium Projects in Mumbai",
    subtitle: "Find your perfect home in Mumbai with world-class amenities and excellent connectivity"
  },
  
  faqs: [
    {
      question: "What are the best residential areas in Mumbai?",
      answer: "Top residential areas in Mumbai include Bandra, Juhu, Powai, Andheri, Goregaon, and Thane. Each area offers unique advantages and connectivity."
    },
    {
      question: "What is the average property price in Mumbai?",
      answer: "Property prices in Mumbai vary significantly by location. Prime areas like South Mumbai can cost ₹50,000+ per sq ft, while suburban areas start from ₹8,000 per sq ft."
    }
  ],
  
  trustBoosters: [
    {
      icon: "🏙️",
      title: "Financial Capital",
      description: "Properties in India's financial capital with excellent opportunities"
    },
    {
      icon: "🚇",
      title: "Metro Connectivity",
      description: "Excellent metro and local train connectivity across the city"
    }
  ],
  
  customFields: {
    cityName: "Mumbai",
    region: "Maharashtra"
  }
});

export default mumbaiData;
