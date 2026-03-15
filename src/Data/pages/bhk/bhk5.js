import { createPageData, applyTemplate, COMMON_TEMPLATES } from '../../core/types.js';

const template = COMMON_TEMPLATES.bhkListing;
const bhk = '5';

const bhk5Data = createPageData('bhk/5', {
  urlPattern: '/5-bhk-flats-in-gurgaon',
  
  // SEO
  metaTitle: '5 BHK Flats in Gurgaon | Palatial Residences & Penthouses 2024',
  metaDescription: 'Discover exclusive 5 BHK flats and penthouses in Gurgaon. Ultra-luxury residences with expansive spaces, premium amenities, and prestigious addresses.',
  canonical: 'https://www.100acress.com/5-bhk-flats-in-gurgaon/',
  keywords: '5 bhk flats gurgaon, 5 bedroom apartments gurgaon, penthouses gurgaon, ultra luxury penthouses, presidential suites gurgaon, luxury villas',
  
  // Hero
  hero: {
    ...applyTemplate(template, { bhk }),
    title: '5 BHK Flats in Gurgaon',
    subtitle: 'Palatial Living for the Elite'
  },
  
  // Content
  title: '5 BHK Flats in Gurgaon',
  h1: '5 BHK Flats in Gurgaon - Presidential Living',
  subtitle: 'The Ultimate in Luxury & Space',
  description: 'Experience the pinnacle of luxury with 5 BHK residences in Gurgaon. These palatial homes and penthouses offer unmatched space, exclusivity, and world-class amenities.',
  
  introText: `Enter the world of ultra-exclusive living with 5 BHK apartments in Gurgaon. 
    These presidential suites offer expansive spaces, multiple living areas, 
    private terraces with panoramic views, and amenities that rival 5-star hotels.`,
  
  highlights: [
    'Prices from ₹8 - 25 Crore',
    '3500-6000 sq ft palatial spaces',
    'Private elevator access',
    'Panoramic city views',
    'Bespoke concierge services'
  ],
  
  faqs: [
    {
      question: 'What defines a 5 BHK luxury residence?',
      answer: '5 BHK residences are ultra-luxury homes with 5 bedrooms, multiple living rooms, dining areas, home theater, gym, and extensive private outdoor spaces. They occupy entire floors or penthouses with exclusive access.'
    },
    {
      question: 'What is the investment value of 5 BHK?',
      answer: '5 BHK properties in premium Gurgaon locations offer exceptional appreciation, often 12-15% annually. They maintain value during market downturns due to limited supply and high demand from HNIs.'
    },
    {
      question: 'Which projects offer 5 BHK in Gurgaon?',
      answer: 'Ultra-luxury projects like DLF Camellias, DLF Magnolias, M3M Golf Estate, and Trump Towers offer 5 BHK configurations on Golf Course Road and Golf Course Extension.'
    },
    {
      question: 'What exclusive amenities come with 5 BHK?',
      answer: 'Exclusive amenities include private infinity pools, sky lounges, private theaters, spa & wellness centers, dedicated concierge, valet parking, and smart home systems controlling everything.'
    },
    {
      question: 'Who are the typical buyers of 5 BHK?',
      answer: '5 BHK buyers include business tycoons, celebrities, CXOs of MNCs, NRIs, and industrialists seeking the finest addresses in Gurgaon for primary residence or investment.'
    }
  ],
  
  filters: {
    priceRange: [
      { label: '₹8 - 12 Crore', value: '800-1200' },
      { label: '₹12 - 18 Crore', value: '1200-1800' },
      { label: '₹18 - 25 Crore', value: '1800-2500' },
      { label: 'Above ₹25 Crore', value: '2500+' }
    ],
    areaRange: [
      { label: '3500-4500 sq ft', value: '3500-4500' },
      { label: '4500-5500 sq ft', value: '4500-5500' },
      { label: '5500+ sq ft', value: '5500+' }
    ],
    locations: [
      'Golf Course Road', 'Golf Course Extension', 'MG Road',
      'Sector 42', 'Sector 57', 'Sector 65'
    ]
  },
  
  sortOptions: [
    { label: 'Exclusivity', value: 'exclusive' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Area: Large to Small', value: 'area-desc' },
    { label: 'Views & Location', value: 'views' }
  ],
  
  customFields: {
    badge: '5 BHK',
    badgeColor: '#DC2626',
    bhkType: '5',
    showPresidential: true,
    isUltraLuxury: true
  }
});

export default bhk5Data;
export { bhk5Data };
