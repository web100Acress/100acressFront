import { createPageData, applyTemplate, COMMON_TEMPLATES } from '../../core/types.js';

const template = COMMON_TEMPLATES.bhkListing;
const bhk = '3';

const bhk3Data = createPageData('bhk/3', {
  urlPattern: '/3-bhk-flats-in-gurgaon',
  
  // SEO
  metaTitle: '3 BHK Flats in Gurgaon | Premium Apartments for Families 2024',
  metaDescription: 'Buy spacious 3 BHK flats in Gurgaon with modern amenities, secure gated societies, and great connectivity. Premium 3 bedroom apartments from ₹1 Crore.',
  canonical: 'https://www.100acress.com/3-bhk-flats-in-gurgaon/',
  keywords: '3 bhk flats gurgaon, 3 bedroom apartments gurgaon, premium 3 bhk gurgaon, luxury 3bhk gurgaon, family apartments gurgaon, spacious 3 bhk',
  
  // Hero
  hero: {
    ...applyTemplate(template, { bhk }),
    title: '3 BHK Flats in Gurgaon',
    subtitle: 'Spacious Living for Modern Families'
  },
  
  // Content
  title: '3 BHK Flats in Gurgaon',
  h1: '3 BHK Flats in Gurgaon - Premium Family Living',
  subtitle: 'Luxurious Space for Your Growing Family',
  description: 'Discover premium 3 BHK flats in Gurgaon offering spacious living, modern amenities, and excellent locations. Perfect for families seeking comfort and luxury.',
  
  introText: `Elevate your lifestyle with a 3 BHK apartment in Gurgaon. 
    These premium homes offer generous space for master bedroom, kids\' rooms, 
    guest room or home office, plus expansive living areas for quality family time.`,
  
  highlights: [
    'Prices from ₹1 - 3 Crore',
    '1200-2000 sq ft area options',
    'Master bedroom with attached bath',
    'Spacious living & dining',
    'Premium amenities & facilities'
  ],
  
  faqs: [
    {
      question: 'What makes 3 BHK a good choice for families?',
      answer: '3 BHK offers dedicated master bedroom, children\'s room, plus flexible third room for guests, home office, or study. It provides space for privacy while keeping family connected.'
    },
    {
      question: 'What is the typical price for 3 BHK in Gurgaon?',
      answer: '3 BHK flats range from ₹1 crore in emerging sectors to ₹3+ crores in premium locations like Golf Course Road, Sector 57, and Golf Course Extension.'
    },
    {
      question: 'What amenities come with 3 BHK projects?',
      answer: '3 BHK projects typically include clubhouse, swimming pool, gym, landscaped gardens, children\'s play area, sports facilities, 24/7 security, and power backup.'
    },
    {
      question: 'Which areas are best for 3 BHK purchase?',
      answer: 'Sector 57, 65, 67, 79, Golf Course Extension, Dwarka Expressway, and Sohna Road offer excellent 3 BHK options with good schools, hospitals, and connectivity nearby.'
    },
    {
      question: 'Is 3 BHK good for long-term investment?',
      answer: 'Yes, 3 BHK has strong resale value and rental demand from affluent tenants. They appreciate well and suit the evolving needs of growing families.'
    }
  ],
  
  filters: {
    priceRange: [
      { label: '₹1 - 1.5 Crore', value: '100-150' },
      { label: '₹1.5 - 2 Crore', value: '150-200' },
      { label: '₹2 - 2.5 Crore', value: '200-250' },
      { label: '₹2.5 - 3 Crore', value: '250-300' }
    ],
    areaRange: [
      { label: '1200-1500 sq ft', value: '1200-1500' },
      { label: '1500-1800 sq ft', value: '1500-1800' },
      { label: '1800-2200 sq ft', value: '1800-2200' }
    ],
    locations: [
      'Sector 57', 'Sector 65', 'Sector 67', 'Sector 79',
      'Golf Course Extension', 'Dwarka Expressway', 'Sohna Road'
    ]
  },
  
  sortOptions: [
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Area: Small to Large', value: 'area-asc' },
    { label: 'Premium First', value: 'premium' },
    { label: 'Possession Date', value: 'possession' }
  ],
  
  customFields: {
    badge: '3 BHK',
    badgeColor: '#8B5CF6',
    bhkType: '3',
    showPremiumBadge: true
  }
});

export default bhk3Data;
export { bhk3Data };
