import { createPageData } from '../../core/types.js';

const typeResidentialData = createPageData('type/residential', {
  urlPattern: '/projects/residential',
  
  title: "Residential Properties - Find Your Dream Home",
  description: "Explore the best residential properties with modern amenities, prime locations, and excellent connectivity. Find your perfect home from apartments to villas.",
  
  seo: {
    metaTitle: "Residential Properties - Apartments, Villas & Homes | 100acress",
    metaDescription: "Explore the best residential properties with modern amenities, prime locations, and excellent connectivity. Find your perfect home from apartments to villas.",
    canonical: "https://www.100acress.com/projects/residential/",
    keywords: "residential properties, apartments, villas, homes, residential flats, residential projects"
  },
  
  hero: {
    title: "Residential Properties - Find Your Dream Home",
    subtitle: "Explore the best residential properties with modern amenities and prime locations"
  },
  
  faqs: [
    {
      question: "What types of residential properties are available?",
      answer: "We offer apartments, villas, independent floors, builder floors, and plots across various price ranges and locations."
    },
    {
      question: "What amenities should I look for in residential properties?",
      answer: "Look for 24/7 security, power backup, swimming pool, gym, clubhouse, landscaped gardens, parking, and proximity to schools and hospitals."
    },
    {
      question: "What is the average price for a 3BHK apartment?",
      answer: "The price varies by location. In prime areas, 3BHK apartments start from ₹1.5 Crores, while in developing areas, they start from ₹80 Lakhs."
    }
  ],
  
  trustBoosters: [
    {
      icon: "🏠",
      title: "Home Sweet Home",
      description: "Find the perfect home that matches your lifestyle and budget"
    },
    {
      icon: "🏢",
      title: "Modern Amenities",
      description: "Contemporary amenities for comfortable living"
    },
    {
      icon: "📍",
      title: "Prime Locations",
      description: "Properties in well-connected and developed areas"
    }
  ],
  
  customFields: {
    propertyType: "residential",
    badge: "Residential",
    badgeColor: "#3B82F6"
  }
});

export default typeResidentialData;
