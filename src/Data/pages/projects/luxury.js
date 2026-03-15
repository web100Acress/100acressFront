import { createPageData, applyTemplate, COMMON_TEMPLATES } from '../../core/types.js';

const template = COMMON_TEMPLATES.projectListing;
const type = 'Luxury';

const luxuryData = createPageData('projects/luxury', {
  urlPattern: '/projects/luxury',
  
  // SEO
  metaTitle: 'Luxury Projects in Gurgaon | Ultra-Premium Residences 2024',
  metaDescription: 'Discover luxury residential projects in Gurgaon featuring world-class amenities, premium finishes, and exclusive locations. Experience ultra-luxury living.',
  canonical: 'https://www.100acress.com/projects/luxury/',
  keywords: 'luxury projects gurgaon, ultra luxury residences gurgaon, premium properties gurgaon, high end apartments gurgaon, luxury villas gurgaon, 5 star living',
  
  // Hero
  hero: {
    ...applyTemplate(template, { type }),
    title: 'Luxury Projects in Gurgaon',
    subtitle: 'Ultra-Premium Residences for Discerning Homeowners'
  },
  
  // Content
  title: 'Luxury Projects in Gurgaon',
  h1: 'Luxury Projects in Gurgaon - Ultra-Premium Living',
  subtitle: 'Experience World-Class Luxury & Exclusivity',
  description: 'Explore Gurgaon\'s finest luxury residential projects featuring premium amenities, sophisticated designs, and exclusive locations. For those who seek the extraordinary.',
  
  introText: `Step into a world of luxury with Gurgaon's most prestigious residential developments. 
    These ultra-premium properties offer expansive living spaces, bespoke amenities, 
    and an address that defines success.`,
  
  highlights: [
    'Premium locations: Golf Course, MG Road',
    'World-class amenities & services',
    'Spacious 3/4/5 BHK configurations',
    'Imported fittings & finishes',
    'Concierge & lifestyle services'
  ],
  
  faqs: [
    {
      question: 'What defines a luxury project in Gurgaon?',
      answer: 'Luxury projects feature prime locations (Golf Course Road, MG Road), low-density development, large unit sizes (3000+ sq ft), premium imported materials, 5-star amenities, and personalized services like concierge and valet.'
    },
    {
      question: 'What is the price range for luxury projects?',
      answer: 'Luxury projects in Gurgaon typically start from ₹5 Crore and can go up to ₹25+ Crore for penthouses and exclusive villas. Price depends on location, size, and brand value.'
    },
    {
      question: 'What amenities are offered in luxury projects?',
      answer: 'Luxury amenities include infinity pools, private theaters, temperature-controlled wine cellars, sky lounges, spa & wellness centers, private elevators, smart home automation, and dedicated concierge services.'
    },
    {
      question: 'Which are the top luxury developers in Gurgaon?',
      answer: 'Leading luxury developers include DLF (Camellias, Magnolias), M3M (St. Andrews, Latitude), Trump Towers (partnered with M3M), and Signature Global\'s premium collections.'
    },
    {
      question: 'Is luxury real estate a good investment in Gurgaon?',
      answer: 'Luxury real estate in prime Gurgaon locations has shown consistent appreciation of 8-12% annually. These properties also maintain value during market downturns and offer exclusivity that\'s always in demand.'
    }
  ],
  
  filters: {
    priceRange: [
      { label: '₹5 - 10 Crore', value: '500-1000' },
      { label: '₹10 - 15 Crore', value: '1000-1500' },
      { label: '₹15 - 25 Crore', value: '1500-2500' },
      { label: 'Above ₹25 Crore', value: '2500+' }
    ],
    bhkOptions: ['3', '4', '5', '6'],
    locations: [
      'Golf Course Road', 'Golf Course Extension', 'MG Road',
      'Sector 57', 'Sector 65', 'Sector 67', 'Sector 42'
    ]
  },
  
  sortOptions: [
    { label: 'Luxury Rating', value: 'luxury' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Area: Large to Small', value: 'area-desc' },
    { label: 'Developer Premium', value: 'brand' }
  ],
  
  customFields: {
    badge: 'Luxury',
    badgeColor: '#8B5CF6',
    showLuxuryBadge: true,
    showAmenityIcons: true,
    premiumLayout: true
  }
});

export default luxuryData;
export { luxuryData };
