import { createPageData } from '../../core/types.js';

const gurugramData = createPageData('city/gurugram', {
  urlPattern: '/projects-in-gurugram',
  
  title: "Discover Premium Projects in Gurugram",
  description: "Explore the best residential and commercial projects in Gurugram with modern amenities, prime locations, and excellent connectivity. Find your dream home in India's Millennium City.",
  
  seo: {
    metaTitle: "Best Projects in Gurugram - Residential & Commercial Properties | 100acress",
    metaDescription: "Explore the best residential and commercial projects in Gurugram with modern amenities, prime locations, and excellent connectivity. Find your dream home in India's Millennium City.",
    canonical: "https://www.100acress.com/projects-in-gurugram/",
    keywords: "projects in gurugram, residential projects gurugram, commercial projects gurugram, gurugram real estate, gurugram properties"
  },
  
  hero: {
    title: "Discover Premium Projects in Gurugram",
    subtitle: "Find your perfect home in India's Millennium City with world-class amenities and prime locations"
  },
  
  h1: "Discover Premium Projects in Gurugram",
  subtitle: "India's Millennium City",
  
  faqs: [
    {
      question: "What are the best residential projects in Gurugram?",
      answer: "Top residential projects in Gurugram include DLF The Crest, M3M Golf Estate, Sobha International City, and Signature Global projects. These offer luxury amenities, prime locations, and excellent connectivity to Delhi and other major cities."
    },
    {
      question: "Which areas in Gurugram are best for investment?",
      answer: "Dwarka Expressway, Golf Course Road, Southern Peripheral Road (SPR), and New Gurugram sectors are the best investment areas. These locations offer high appreciation potential due to infrastructure development and connectivity."
    },
    {
      question: "What is the price range for properties in Gurugram?",
      answer: "Property prices in Gurugram range from ₹4,000 per sq ft in developing areas to ₹15,000+ per sq ft in prime locations like Golf Course Road. The average price for a 3BHK apartment is ₹1.5-3 Crores."
    },
    {
      question: "Are there any upcoming metro connectivity projects in Gurugram?",
      answer: "Yes, Gurugram Metro extension is planned to connect with Delhi Metro. The Rapid Metro already connects Cyber City to Delhi Metro, and more metro lines are being planned for better connectivity."
    },
    {
      question: "What amenities should I look for in Gurugram projects?",
      answer: "Look for projects with 24/7 security, power backup, swimming pool, gym, clubhouse, landscaped gardens, parking, and proximity to schools, hospitals, and shopping centers."
    }
  ],
  
  trustBoosters: [
    {
      icon: "🛡️",
      title: "RERA Approved",
      description: "All our projects are RERA registered ensuring legal compliance and transparency"
    },
    {
      icon: "🏆",
      title: "Trusted Partners",
      description: "Working with top developers like DLF, M3M, Sobha, and Signature Global"
    },
    {
      icon: "🏠",
      title: "Premium Properties",
      description: "Handpicked luxury properties with modern amenities and prime locations"
    }
  ],
  
  customFields: {
    cityName: "Gurugram",
    region: "Delhi NCR",
    popularLocalities: ["Golf Course Road", "Dwarka Expressway", "Sohna Road", "MG Road", "Cyber City"]
  }
});

export default gurugramData;
export { gurugramData };
