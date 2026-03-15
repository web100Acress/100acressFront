import { createPageData } from '../../core/types.js';

const alwarData = createPageData('city/alwar', {
  urlPattern: '/projects-in-alwar',
  
  title: "Discover Premium Projects in Alwar",
  description: "Explore the best residential and commercial projects in Alwar with modern amenities, rich cultural heritage, and excellent connectivity. Find your dream home in this historic city of Rajasthan.",
  
  seo: {
    metaTitle: "Best Projects in Alwar - Residential & Commercial Properties | 100acress",
    metaDescription: "Explore the best residential and commercial projects in Alwar with modern amenities, rich cultural heritage, and excellent connectivity. Find your dream home in this historic city of Rajasthan.",
    canonical: "https://www.100acress.com/projects-in-alwar/",
    keywords: "projects in alwar, residential projects alwar, commercial projects alwar, alwar real estate, alwar properties, alwar homes"
  },
  
  hero: {
    title: "Discover Premium Projects in Alwar",
    subtitle: "Find your perfect home in Rajasthan's historic city with modern amenities and rich heritage"
  },
  
  faqs: [
    {
      question: "What are the best areas to buy property in Alwar?",
      answer: "Prime areas in Alwar include Alwar Bypass, Rajgarh Road, Bhiwadi, Neemrana, and Alwar-Jaipur Highway. These areas offer good connectivity, modern infrastructure, and potential for appreciation."
    },
    {
      question: "What is the price range for properties in Alwar?",
      answer: "Property prices in Alwar range from ₹2,500 per sq ft in developing areas to ₹5,500+ per sq ft in prime locations. The average price for a 3BHK apartment is ₹30-70 Lakhs, making it an affordable option compared to other Rajasthan cities."
    },
    {
      question: "Is Alwar a good place for real estate investment?",
      answer: "Yes, Alwar offers excellent investment potential due to its proximity to Delhi NCR (150 km), industrial growth, tourism, and upcoming infrastructure projects like the Delhi-Mumbai Expressway. The city is part of the National Capital Region (NCR) and Delhi-Mumbai Industrial Corridor (DMIC)."
    },
    {
      question: "What are the major attractions in Alwar?",
      answer: "Alwar is known for its rich heritage with attractions like Alwar Fort (Bala Quila), City Palace, Sariska Tiger Reserve, Siliserh Lake Palace, and Bhangarh Fort. The city offers a blend of history, culture, and natural beauty."
    },
    {
      question: "What are the transportation options in Alwar?",
      answer: "Alwar is well-connected by road and rail. The city has its own railway station with good connectivity to Delhi, Jaipur, and other major cities. The Delhi-Mumbai Expressway will further improve connectivity. Local transport includes buses, auto-rickshaws, and taxis."
    }
  ],
  
  trustBoosters: [
    {
      icon: "🏰",
      title: "Heritage City",
      description: "Rich cultural heritage with modern infrastructure and amenities"
    },
    {
      icon: "🏭",
      title: "Industrial Growth",
      description: "Part of DMIC with growing industrial and economic development"
    },
    {
      icon: "🌄",
      title: "Scenic Beauty",
      description: "Nestled in the Aravalli range with beautiful landscapes and lakes"
    }
  ],
  
  customFields: {
    cityName: "Alwar",
    region: "Rajasthan"
  }
});

export default alwarData;
