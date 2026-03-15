import { createPageData } from '../../core/types.js';

const typeSCOData = createPageData('type/sco', {
  urlPattern: '/projects/sco',
  
  title: "SCO Plots - Commercial Land Investment",
  description: "Invest in SCO (Sector Commercial Other) plots for commercial development. Find prime commercial land with excellent business potential.",
  
  seo: {
    metaTitle: "SCO Plots - Commercial Land Investment | 100acress",
    metaDescription: "Invest in SCO (Sector Commercial Other) plots for commercial development. Find prime commercial land with excellent business potential.",
    canonical: "https://www.100acress.com/sco/plots/",
    keywords: "SCO plots, commercial plots, commercial land, SCO investment, commercial development"
  },
  
  hero: {
    title: "SCO Plots - Commercial Land Investment",
    subtitle: "Invest in prime commercial land with excellent business potential"
  },
  
  faqs: [
    {
      question: "What are SCO plots?",
      answer: "SCO (Sector Commercial Other) plots are commercial land parcels designated for commercial development like shops, offices, and retail spaces."
    },
    {
      question: "What can I build on SCO plots?",
      answer: "You can build shops, offices, retail spaces, restaurants, and other commercial establishments as per local building regulations."
    },
    {
      question: "What is the investment potential of SCO plots?",
      answer: "SCO plots offer excellent investment potential with high rental yields and appreciation, especially in well-connected commercial areas."
    }
  ],
  
  trustBoosters: [
    {
      icon: "🏪",
      title: "Commercial Development",
      description: "Perfect for building shops, offices, and retail spaces"
    },
    {
      icon: "💰",
      title: "High Returns",
      description: "Excellent rental yields and appreciation potential"
    },
    {
      icon: "📍",
      title: "Prime Locations",
      description: "Located in well-connected commercial areas"
    }
  ],
  
  customFields: {
    propertyType: "sco",
    badge: "SCO",
    badgeColor: "#F59E0B"
  }
});

export default typeSCOData;
