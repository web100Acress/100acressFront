import { createPageData, applyTemplate, COMMON_TEMPLATES } from '../../core/types.js';

const template = COMMON_TEMPLATES.bhkListing;
const bhk = '4';

const bhk4Data = createPageData('bhk/4', {
  urlPattern: '/4-bhk-flats-in-gurgaon',
  
  // SEO
  metaTitle: '4 BHK Flats in Gurgaon | Ultra-Luxury Apartments 2024',
  metaDescription: 'Find exclusive 4 BHK flats in Gurgaon with expansive spaces, premium amenities, and prime locations. Ultra-luxury living for discerning homeowners.',
  canonical: 'https://www.100acress.com/4-bhk-flats-in-gurgaon/',
  keywords: '4 bhk flats gurgaon, 4 bedroom apartments gurgaon, luxury 4 bhk gurgaon, ultra luxury apartments gurgaon, premium 4bhk, spacious homes',
  
  // Hero
  hero: {
    ...applyTemplate(template, { bhk }),
    title: '4 BHK Flats in Gurgaon',
    subtitle: 'Ultra-Luxury Residences for Discerning Families'
  },
  
  // Content
  title: '4 BHK Flats in Gurgaon',
  h1: '4 BHK Flats in Gurgaon - Ultra-Luxury Living',
  subtitle: 'Expansive Spaces for Multi-Generational Living',
  description: 'Discover ultra-luxury 4 BHK flats in Gurgaon offering expansive living spaces, world-class amenities, and prestigious addresses. For those who demand the finest.',
  
  introText: `Experience the pinnacle of luxury living with 4 BHK apartments in Gurgaon. 
    These palatial homes offer multiple bedroom suites, grand living areas, 
    private terraces, and bespoke amenities that redefine opulent living.`,
  
  highlights: [
    'Prices from ₹3 - 8 Crore',
    '2000-3500 sq ft ultra-spacious',
    'Multiple bedroom suites',
    'Private terraces/balconies',
    'World-class amenities'
  ],
  
  faqs: [
    {
      question: 'Who should buy a 4 BHK in Gurgaon?',
      answer: '4 BHK is ideal for large families, multi-generational households, or those who desire extra space for home office, entertainment room, or guest quarters. It suits high-net-worth individuals seeking luxury.'
    },
    {
      question: 'What is the price range for 4 BHK?',
      answer: '4 BHK apartments range from ₹3 crores in premium sectors to ₹8+ crores in ultra-luxury projects on Golf Course Road and MG Road areas.'
    },
    {
      question: 'What luxury amenities come with 4 BHK?',
      answer: 'Luxury amenities include private elevators, infinity pools, home theaters, temperature-controlled wine cellars, concierge services, spa rooms, and smart home automation.'
    },
    {
      question: 'Which developers offer premium 4 BHK?',
      answer: 'Top developers include DLF (Camellias, Magnolias), M3M (Latitude), Trump Towers, and other premium brands on Golf Course Road and Golf Course Extension.'
    },
    {
      question: 'Is 4 BHK a good investment option?',
      answer: 'Yes, 4 BHK in prime Gurgaon locations appreciates strongly and maintains value. They\'re always in demand from HNIs and NRIs seeking luxury homes.'
    }
  ],
  
  filters: {
    priceRange: [
      { label: '₹3 - 4 Crore', value: '300-400' },
      { label: '₹4 - 5 Crore', value: '400-500' },
      { label: '₹5 - 7 Crore', value: '500-700' },
      { label: 'Above ₹7 Crore', value: '700+' }
    ],
    areaRange: [
      { label: '2000-2500 sq ft', value: '2000-2500' },
      { label: '2500-3000 sq ft', value: '2500-3000' },
      { label: '3000-4000 sq ft', value: '3000-4000' }
    ],
    locations: [
      'Golf Course Road', 'Golf Course Extension', 'MG Road',
      'Sector 42', 'Sector 57', 'Sector 65', 'Sector 67'
    ]
  },
  
  sortOptions: [
    { label: 'Luxury Rating', value: 'luxury' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Area: Large to Small', value: 'area-desc' },
    { label: 'Developer Brand', value: 'brand' }
  ],
  
  customFields: {
    badge: '4 BHK',
    badgeColor: '#EAB308',
    bhkType: '4',
    showUltraLuxury: true
  }
});

export default bhk4Data;
export { bhk4Data };
