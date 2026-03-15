import { createPageData } from '../../core/types.js';

const noidaData = createPageData('city/noida', {
  urlPattern: '/projects-in-noida',
  
  title: "Discover Premium Projects in Noida",
  description: "Explore the best residential and commercial projects in Noida with modern amenities, excellent infrastructure, and great connectivity to Delhi. Find your dream home in this planned city.",
  
  seo: {
    metaTitle: "Best Projects in Noida - Residential & Commercial Properties | 100acress",
    metaDescription: "Explore the best residential and commercial projects in Noida with modern amenities, excellent infrastructure, and great connectivity to Delhi. Find your dream home in this planned city.",
    canonical: "https://www.100acress.com/projects-in-noida/",
    keywords: "projects in noida, residential projects noida, commercial projects noida, noida real estate, noida properties"
  },
  
  hero: {
    title: "Discover Premium Projects in Noida",
    subtitle: "Find your perfect home in this well-planned city with excellent infrastructure"
  },
  
  faqs: [
    {
      question: "What are the best sectors in Noida for investment?",
      answer: "Sectors 62, 63, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200 are the best for investment with good connectivity and infrastructure."
    },
    {
      question: "What is the price range for properties in Noida?",
      answer: "Property prices in Noida range from ₹3,500 per sq ft in developing sectors to ₹12,000+ per sq ft in prime locations. The average price for a 3BHK apartment is ₹1-2.5 Crores."
    }
  ],
  
  trustBoosters: [
    {
      icon: "🏗️",
      title: "Planned City",
      description: "Well-planned infrastructure with wide roads and green spaces"
    },
    {
      icon: "🚇",
      title: "Metro Connected",
      description: "Direct metro connectivity to Delhi and other NCR cities"
    },
    {
      icon: "🏠",
      title: "Modern Properties",
      description: "Contemporary properties with modern amenities and facilities"
    }
  ],
  
  customFields: {
    cityName: "Noida",
    region: "Delhi NCR"
  }
});

export default noidaData;
