import { createPageData } from '../../core/types.js';

const goaData = createPageData('city/goa', {
  urlPattern: '/projects-in-goa',
  
  title: "Discover Premium Projects in Goa",
  description: "Explore the best residential and commercial projects in Goa with beachside living, modern amenities, and excellent connectivity. Find your dream home in this paradise destination.",
  
  seo: {
    metaTitle: "Best Projects in Goa - Residential & Commercial Properties | 100acress",
    metaDescription: "Explore the best residential and commercial projects in Goa with beachside living, modern amenities, and excellent connectivity. Find your dream home in this paradise destination.",
    canonical: "https://www.100acress.com/projects-in-goa/",
    keywords: "projects in goa, residential projects goa, commercial projects goa, goa real estate, goa properties"
  },
  
  hero: {
    title: "Discover Premium Projects in Goa",
    subtitle: "Find your perfect home in Goa with beachside living and modern amenities"
  },
  
  faqs: [
    {
      question: "What are the best residential projects in Goa?",
      answer: "Top residential projects in Goa include beachside apartments, luxury villas, and gated communities with modern amenities and excellent connectivity."
    },
    {
      question: "Is Goa a good place for property investment?",
      answer: "Yes, Goa offers excellent investment opportunities due to its tourism potential, beautiful beaches, and growing real estate market."
    }
  ],
  
  trustBoosters: [
    {
      icon: "🏖️",
      title: "Beachside Living",
      description: "Properties near beautiful beaches with modern amenities"
    },
    {
      icon: "🏆",
      title: "Tourism Potential",
      description: "Growing tourism industry with excellent investment opportunities"
    }
  ],
  
  customFields: {
    cityName: "Goa",
    region: "Goa"
  }
});

export default goaData;
