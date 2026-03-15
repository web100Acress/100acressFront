import { createPageData } from '../../core/types.js';

const karnalData = createPageData('city/karnal', {
  urlPattern: '/projects-in-karnal',
  
  title: "Discover Premium Projects in Karnal",
  description: "Explore the best residential and commercial projects in Karnal with modern amenities, excellent connectivity, and affordable pricing. Find your dream home in this historic city.",
  
  seo: {
    metaTitle: "Best Projects in Karnal - Residential & Commercial Properties | 100acress",
    metaDescription: "Explore the best residential and commercial projects in Karnal with modern amenities, excellent connectivity, and affordable pricing. Find your dream home in this historic city.",
    canonical: "https://www.100acress.com/projects-in-karnal/",
    keywords: "projects in karnal, residential projects karnal, commercial projects karnal, karnal real estate, karnal properties"
  },
  
  hero: {
    title: "Discover Premium Projects in Karnal",
    subtitle: "Find your perfect home in Karnal with excellent connectivity and modern amenities"
  },
  
  faqs: [
    {
      question: "What are the best residential projects in Karnal?",
      answer: "Top residential projects in Karnal include various housing options with modern amenities, good connectivity, and excellent investment potential."
    },
    {
      question: "Is Karnal a good place for property investment?",
      answer: "Yes, Karnal offers excellent investment opportunities due to its strategic location, affordable property prices, and development potential."
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
      title: "Strategic Location",
      description: "Prime location with excellent connectivity"
    }
  ],
  
  customFields: {
    cityName: "Karnal",
    region: "Haryana"
  }
});

export default karnalData;
