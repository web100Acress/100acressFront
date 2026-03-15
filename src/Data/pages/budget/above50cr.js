import { createPageData } from '../../core/types.js';

const budgetAbove50CrData = createPageData('budget/above50cr', {
  urlPattern: '/projects/above-50-cr',
  
  title: "Properties Above 50 Cr in Gurgaon - Ultra Elite Luxury Homes",
  description: "Discover ultra-elite luxury properties above 50 crore in Gurgaon with palatial designs, extraordinary amenities, and unmatched exclusivity. For those who seek perfection.",
  
  seo: {
    metaTitle: "Properties Above 50 Cr in Gurgaon - Ultra Elite Luxury | 100acress",
    metaDescription: "Discover ultra-elite luxury properties above 50 crore in Gurgaon with palatial designs, extraordinary amenities, and unmatched exclusivity. For those who seek perfection.",
    canonical: "https://www.100acress.com/projects/above-50-cr/",
    keywords: "properties above 50 cr, ultra elite luxury homes gurgaon, above 50 crore properties"
  },
  
  hero: {
    title: "Properties Above 50 Cr in Gurgaon",
    subtitle: "Ultra-elite luxury homes with palatial designs and unmatched exclusivity"
  },
  
  faqs: [
    {
      question: "What defines ultra-elite properties above 50 Cr?",
      answer: "Ultra-elite properties feature palatial mansions, premium estates, and bespoke luxury homes with architectural masterpieces, rare materials, and extraordinary craftsmanship."
    },
    {
      question: "Where are the most exclusive above 50 Cr properties located?",
      answer: "Exclusive locations include ultra-premium gated communities, private estates in DLF Phase 1-5, and select areas offering maximum privacy, security, and prestige."
    },
    {
      question: "What palatial amenities do these properties offer?",
      answer: "Palatial properties offer grand ballrooms, private theaters, multiple swimming pools, spa retreats, wine cellars, art galleries, and access to world-class concierge services."
    },
    {
      question: "Who typically purchases above 50 Cr properties?",
      answer: "These properties attract global business leaders, international investors, celebrities, and ultra-high-net-worth individuals seeking the pinnacle of luxury living."
    },
    {
      question: "What makes these properties exceptional investments?",
      answer: "Ultra-elite properties offer unmatched prestige, limited availability, and exceptional appreciation potential in Gurgaon's luxury real estate market."
    }
  ],
  
  trustBoosters: [
    {
      icon: "👑",
      title: "Ultra Elite",
      description: "The absolute pinnacle of luxury and exclusivity"
    },
    {
      icon: "🏰",
      title: "Palatial Estates",
      description: "Magnificent properties with extraordinary architecture"
    },
    {
      icon: "💎",
      title: "Prestigious Investment",
      description: "Exceptional value appreciation and global appeal"
    }
  ],
  
  customFields: {
    budgetRange: "above50cr",
    priceLabel: "Above ₹50 Crore",
    badge: "Ultra Elite",
    badgeColor: "#7C3AED"
  }
});

export default budgetAbove50CrData;
