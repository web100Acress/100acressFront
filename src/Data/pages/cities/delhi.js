import { createPageData } from '../../core/types.js';

const delhiData = createPageData('city/delhi', {
  urlPattern: '/projects-in-delhi',
  
  title: "Discover Premium Projects in Delhi",
  description: "Explore the best residential and commercial projects in Delhi with modern amenities, excellent connectivity, and rich cultural heritage. Find your dream home in India's capital city.",
  
  seo: {
    metaTitle: "Best Projects in Delhi - Residential & Commercial Properties | 100acress",
    metaDescription: "Explore the best residential and commercial projects in Delhi with modern amenities, excellent connectivity, and rich cultural heritage. Find your dream home in India's capital city.",
    canonical: "https://www.100acress.com/projects-in-delhi/",
    keywords: "projects in delhi, residential projects delhi, commercial projects delhi, delhi real estate, delhi properties"
  },
  
  hero: {
    title: "Discover Premium Projects in Delhi",
    subtitle: "Find your perfect home in India's capital with rich heritage and modern amenities"
  },
  
  faqs: [
    {
      question: "What are the best residential areas in Delhi?",
      answer: "Top residential areas in Delhi include Lutyens Delhi, South Delhi (Vasant Kunj, Saket), East Delhi (Mayur Vihar, Preet Vihar), and West Delhi (Rajouri Garden, Janakpuri). Each area offers unique advantages."
    },
    {
      question: "What is the average property price in Delhi?",
      answer: "Property prices in Delhi vary significantly by location. Prime areas like Lutyens Delhi can cost ₹50,000+ per sq ft, while developing areas start from ₹8,000 per sq ft. Average 3BHK costs ₹1-5 Crores."
    },
    {
      question: "Are there any new metro lines planned for Delhi?",
      answer: "Yes, Delhi Metro is continuously expanding with new lines planned for better connectivity. Phase 4 expansion includes new corridors to improve connectivity across the city."
    }
  ],
  
  trustBoosters: [
    {
      icon: "🏛️",
      title: "Heritage Location",
      description: "Properties in India's capital with rich cultural heritage and modern amenities"
    },
    {
      icon: "🚇",
      title: "Metro Connectivity",
      description: "Excellent metro connectivity to all major areas of Delhi and NCR"
    },
    {
      icon: "🏠",
      title: "Prime Properties",
      description: "Luxury properties in the heart of India's capital city"
    }
  ],
  
  customFields: {
    cityName: "Delhi",
    region: "Delhi NCR"
  }
});

export default delhiData;
