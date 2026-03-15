import { createPageData } from '../../core/types.js';

const statusUpcomingData = createPageData('status/upcoming', {
  urlPattern: '/projects/upcoming',
  
  title: "Upcoming Projects in Gurgaon with Luxury & Comfort",
  description: "Find luxury homes in Gurgaon's upcoming projects featuring spacious apartments, designer villas, and world-class facilities for families and investors.",
  
  seo: {
    metaTitle: "Upcoming Projects in Gurgaon with Luxury & Comfort | 100acress",
    metaDescription: "Find luxury homes in Gurgaon's upcoming projects featuring spacious apartments, designer villas, and world-class facilities for families and investors.",
    canonical: "https://www.100acress.com/projects/upcoming/",
    keywords: "upcoming projects, upcoming projects in gurgaon, upcoming residential projects, upcoming commercial projects, property launches"
  },
  
  hero: {
    title: "Explore Upcoming Projects with High Investment Potential",
    subtitle: "From premium apartments to budget-friendly homes, Gurgaon has it all in upcoming projects."
  },
  
  faqs: [
    {
      question: "What are the top upcoming projects in Gurgaon?",
      answer: "Some of the most sought-after upcoming projects in Gurgaon include Trident Realty 104, Satya Group 104, Central Park 104, AIPL Lake City, ArtTech The Story House, Max Estate 361, and Elan Sohna Road."
    },
    {
      question: "Which locations in Gurgaon are best for upcoming residential projects?",
      answer: "Prime locations for upcoming projects include Dwarka Expressway, Southern Peripheral Road (SPR), Golf Course Extension Road, Sohna Road, and New Gurgaon, all offering strong connectivity and growth potential."
    },
    {
      question: "Are there affordable options among Gurgaon's upcoming projects?",
      answer: "Yes, projects like Satya Group 104, ArtTech The Story House, and Wal Pravah Senior Living provide budget-friendly housing options while maintaining modern amenities."
    },
    {
      question: "What amenities do upcoming projects in Gurgaon usually offer?",
      answer: "Most new launches come with swimming pools, clubhouses, gyms, landscaped gardens, sports courts, children's play areas, 24x7 security, and parking facilities, ensuring a premium lifestyle."
    },
    {
      question: "Which upcoming projects in Gurgaon offer luxury living?",
      answer: "Luxury options include Trident Realty 104, Central Park 104, Elan Sohna Road, and Oberoi Realty Gurgaon, featuring spacious layouts, high-end amenities, and premium architecture."
    },
    {
      question: "What is the typical possession timeline for upcoming projects in Gurgaon?",
      answer: "Most projects aim for possession within 3–4 years of launch. Buyers should always check the RERA-approved completion date before investing."
    },
    {
      question: "Why invest in upcoming projects in Gurgaon?",
      answer: "Investing in upcoming projects in Gurgaon offers pre-launch pricing, modern amenities, strong connectivity, and excellent long-term appreciation, making them ideal for both homebuyers and investors."
    }
  ],
  
  trustBoosters: [
    {
      icon: "🚀",
      title: "Early Bird Advantage",
      description: "Get the best prices and payment plans by investing early in upcoming projects"
    },
    {
      icon: "📈",
      title: "High Appreciation",
      description: "Upcoming projects in prime locations offer excellent appreciation potential"
    },
    {
      icon: "🏠",
      title: "Modern Amenities",
      description: "Latest projects come with contemporary amenities and smart home features"
    }
  ],
  
  customFields: {
    query: "allupcomingproject",
    badge: "Upcoming",
    badgeColor: "#10B981"
  }
});

export default statusUpcomingData;
