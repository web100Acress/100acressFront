import { createPageData } from '../../core/types.js';

const budget5To10CrData = createPageData('budget/5to10cr', {
  urlPattern: '/projects/5-10-cr',
  
  title: "Properties Between 5-10 Cr in Gurgaon - Luxury Homes",
  description: "Explore luxury properties between 5-10 crore in Gurgaon with premium amenities, prime locations, and exceptional lifestyle features. Perfect for discerning buyers seeking quality and exclusivity.",
  
  seo: {
    metaTitle: "Properties 5-10 Cr in Gurgaon - Luxury Homes | 100acress",
    metaDescription: "Explore luxury properties between 5-10 crore in Gurgaon with premium amenities, prime locations, and exceptional lifestyle features. Perfect for discerning buyers seeking quality and exclusivity.",
    canonical: "https://www.100acress.com/projects/5-10-cr/",
    keywords: "properties 5-10 cr, luxury homes gurgaon, 5-10 crore properties"
  },
  
  hero: {
    title: "Properties Between 5-10 Cr in Gurgaon",
    subtitle: "Luxury homes with premium amenities and prime locations"
  },
  
  faqs: [
    {
      question: "What types of luxury properties are available between 5-10 Cr?",
      answer: "Between 5-10 Cr, you can find premium 3BHK and 4BHK apartments, penthouses, and luxury villas in upscale areas like Golf Course Road, DLF Phase 1-5, and Southern Peripheral Road."
    },
    {
      question: "Which are the most prestigious areas for 5-10 Cr properties?",
      answer: "Prestigious locations include Golf Course Road, DLF Phase 1-5, Southern Peripheral Road, and MG Road. These areas offer luxury living with excellent connectivity."
    },
    {
      question: "What luxury amenities come with 5-10 Cr properties?",
      answer: "Luxury properties in this range offer concierge services, private elevators, rooftop pools, spa facilities, home automation, and exclusive club memberships."
    },
    {
      question: "Are these properties good for high-net-worth individuals?",
      answer: "Yes, these luxury properties cater to high-net-worth individuals seeking exclusive lifestyles, privacy, and premium amenities in Gurgaon's most sought-after locations."
    },
    {
      question: "What is the average size of luxury apartments in this range?",
      answer: "Luxury apartments between 5-10 Cr typically range from 2,500 sq ft to 4,000 sq ft, offering spacious layouts with premium finishes and modern architecture."
    }
  ],
  
  trustBoosters: [
    {
      icon: "👑",
      title: "Luxury Living",
      description: "Experience the pinnacle of luxury and exclusivity"
    },
    {
      icon: "🏆",
      title: "Prime Locations",
      description: "Properties in the most prestigious neighborhoods"
    },
    {
      icon: "⭐",
      title: "Premium Quality",
      description: "Highest standards of construction and finishing"
    }
  ],
  
  customFields: {
    budgetRange: "5to10cr",
    priceLabel: "₹5 - 10 Crore",
    badge: "Luxury",
    badgeColor: "#8B5CF6"
  }
});

export default budget5To10CrData;
