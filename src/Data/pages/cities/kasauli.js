import { createPageData } from '../../core/types.js';

const kasauliData = createPageData('city/kasauli', {
  urlPattern: '/projects-in-kasauli',
  
  title: "Discover Premium Projects in Kasauli",
  description: "Explore the best residential and commercial projects in Kasauli with hill station living, modern amenities, and peaceful environment. Find your dream home in this beautiful hill station.",
  
  seo: {
    metaTitle: "Best Projects in Kasauli - Residential & Commercial Properties | 100acress",
    metaDescription: "Explore the best residential and commercial projects in Kasauli with hill station living, modern amenities, and peaceful environment. Find your dream home in this beautiful hill station.",
    canonical: "https://www.100acress.com/projects-in-kasauli/",
    keywords: "projects in kasauli, residential projects kasauli, commercial projects kasauli, kasauli real estate, kasauli properties"
  },
  
  hero: {
    title: "Discover Premium Projects in Kasauli",
    subtitle: "Find your perfect home in Kasauli with hill station living and peaceful environment"
  },
  
  faqs: [
    {
      question: "What are the best residential projects in Kasauli?",
      answer: "Top residential projects in Kasauli include various housing options with modern amenities, hill station living, and excellent investment potential."
    },
    {
      question: "Is Kasauli a good place for property investment?",
      answer: "Yes, Kasauli offers excellent investment opportunities due to its hill station location, peaceful environment, and growing tourism industry."
    }
  ],
  
  trustBoosters: [
    {
      icon: "🏔️",
      title: "Hill Station Living",
      description: "Properties in a beautiful hill station with peaceful environment"
    },
    {
      icon: "🏆",
      title: "Tourism Potential",
      description: "Growing tourism industry with excellent investment opportunities"
    }
  ],
  
  customFields: {
    cityName: "Kasauli",
    region: "Himachal Pradesh"
  }
});

export default kasauliData;
