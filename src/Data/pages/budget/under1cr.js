import { createPageData } from '../../core/types.js';

const budgetUnder1CrData = createPageData('budget/under1cr', {
  urlPattern: '/projects/under-1-cr',
  
  title: "Properties Under 1 Cr in Gurgaon - Affordable Homes",
  description: "Find the best properties under 1 crore in Gurgaon with modern amenities, excellent connectivity, and great investment potential. Perfect for first-time buyers and budget-conscious investors.",
  
  seo: {
    metaTitle: "Properties Under 1 Cr in Gurgaon - Affordable Homes | 100acress",
    metaDescription: "Find the best properties under 1 crore in Gurgaon with modern amenities, excellent connectivity, and great investment potential. Perfect for first-time buyers and budget-conscious investors.",
    canonical: "https://www.100acress.com/projects/under-1-cr/",
    keywords: "properties under 1 cr, affordable homes gurgaon, budget properties, under 1 crore properties"
  },
  
  hero: {
    title: "Properties Under 1 Cr in Gurgaon",
    subtitle: "Affordable homes with modern amenities and excellent connectivity"
  },
  
  faqs: [
    {
      question: "What types of properties are available under 1 Cr in Gurgaon?",
      answer: "Under 1 Cr, you can find studio apartments, 1BHK apartments, and small 2BHK apartments in developing areas of Gurgaon like Sohna, New Gurgaon, and some parts of Dwarka Expressway."
    },
    {
      question: "Are properties under 1 Cr a good investment?",
      answer: "Yes, properties under 1 Cr in Gurgaon offer excellent investment potential due to the city's rapid development, infrastructure growth, and increasing demand for affordable housing."
    },
    {
      question: "Which areas in Gurgaon offer properties under 1 Cr?",
      answer: "Areas like Sohna, New Gurgaon sectors, and some parts of Dwarka Expressway offer properties under 1 Cr. These areas have good connectivity and are witnessing rapid development."
    },
    {
      question: "What amenities can I expect in budget properties?",
      answer: "Budget properties under 1 Cr typically offer essential amenities like 24/7 security, power backup, parking, and basic community facilities. Some projects also include swimming pools and gyms."
    },
    {
      question: "How can I finance a property under 1 Cr?",
      answer: "Most banks offer home loans for properties under 1 Cr with competitive interest rates. You can get up to 80-90% loan depending on your eligibility and the property value."
    }
  ],
  
  trustBoosters: [
    {
      icon: "💰",
      title: "Budget Friendly",
      description: "Quality properties within your budget range"
    },
    {
      icon: "📈",
      title: "High Appreciation",
      description: "Excellent potential for property value appreciation"
    },
    {
      icon: "🏠",
      title: "Modern Amenities",
      description: "Contemporary amenities at affordable prices"
    }
  ],
  
  customFields: {
    budgetRange: "under1cr",
    priceLabel: "Under ₹1 Crore",
    badge: "Budget",
    badgeColor: "#22C55E"
  }
});

export default budgetUnder1CrData;
