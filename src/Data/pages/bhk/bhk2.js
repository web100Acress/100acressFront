import { createPageData, applyTemplate, COMMON_TEMPLATES } from '../../core/types.js';

const template = COMMON_TEMPLATES.bhkListing;
const bhk = '2';

const bhk2Data = createPageData('bhk/2', {
  urlPattern: '/2-bhk-flats-in-gurgaon',
  
  // SEO
  metaTitle: '2 BHK Flats in Gurgaon | Spacious Apartments for Families 2024',
  metaDescription: 'Explore 2 BHK flats in Gurgaon for comfortable family living. Find 2 bedroom apartments with modern amenities in prime locations. Prices from ₹50 Lakhs.',
  canonical: 'https://www.100acress.com/2-bhk-flats-in-gurgaon/',
  keywords: '2 bhk flats gurgaon, 2 bedroom apartments gurgaon, family flats gurgaon, spacious 2 bhk gurgaon, affordable 2 bhk, 2bhk properties',
  
  // Hero
  hero: {
    ...applyTemplate(template, { bhk }),
    title: '2 BHK Flats in Gurgaon',
    subtitle: 'Perfect Homes for Small Families'
  },
  
  // Content
  title: '2 BHK Flats in Gurgaon',
  h1: '2 BHK Flats in Gurgaon - Ideal for Growing Families',
  subtitle: 'Comfortable Living for 3-4 Family Members',
  description: 'Find spacious 2 BHK flats in Gurgaon perfect for small families. These 2 bedroom apartments offer the right balance of space, amenities, and affordability across prime Gurgaon locations.',
  
  introText: `The 2 BHK is India\'s favorite home configuration - and for good reason. 
    It offers just the right amount of space for a nuclear family, 
    with dedicated rooms for parents and children, plus comfortable living areas.`,
  
  highlights: [
    'Prices from ₹50 Lakhs - 1.5 Crore',
    '750-1200 sq ft area options',
    'Perfect for nuclear families',
    'Excellent rental demand (₹20-35K)',
    'Future-proof investment'
  ],
  
  faqs: [
    {
      question: 'What is the ideal size for a 2 BHK in Gurgaon?',
      answer: 'A comfortable 2 BHK typically ranges from 850-1200 sq ft carpet area. This provides spacious bedrooms, a functional living room, kitchen, and 1-2 bathrooms.'
    },
    {
      question: 'What is the price range for 2 BHK in Gurgaon?',
      answer: '2 BHK flats range from ₹50 lakhs in emerging sectors to ₹1.5+ crores in premium locations like Golf Course Extension and Dwarka Expressway.'
    },
    {
      question: 'Which locations are best for 2 BHK investment?',
      answer: 'Sector 70, 84, 92, 95, Dwarka Expressway, and Sohna Road offer the best combination of current value and future appreciation for 2 BHK investments.'
    },
    {
      question: 'Can I get a home loan easily for 2 BHK?',
      answer: 'Yes, banks readily finance 2 BHK purchases with loans up to 80-90% of property value. Interest rates range from 8.5-9.5% depending on your credit profile.'
    },
    {
      question: 'Is 2 BHK better than 1 BHK for investment?',
      answer: '2 BHK generally offers better rental yields (3.5-4.5%) and broader resale market. It appeals to both small families and working professionals sharing accommodation.'
    }
  ],
  
  filters: {
    priceRange: [
      { label: '₹50 - 70 Lakhs', value: '50-70' },
      { label: '₹70 - 90 Lakhs', value: '70-90' },
      { label: '₹90 Lakhs - 1.2 Cr', value: '90-120' },
      { label: '₹1.2 - 1.5 Cr', value: '120-150' }
    ],
    areaRange: [
      { label: '750-900 sq ft', value: '750-900' },
      { label: '900-1100 sq ft', value: '900-1100' },
      { label: '1100-1300 sq ft', value: '1100-1300' }
    ],
    locations: [
      'Sector 70', 'Sector 84', 'Sector 92', 'Sector 95',
      'Dwarka Expressway', 'Sohna Road', 'New Gurgaon', 'Sector 37D'
    ]
  },
  
  sortOptions: [
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Area: Small to Large', value: 'area-asc' },
    { label: 'Possession Date', value: 'possession' },
    { label: 'Family Friendly', value: 'family' }
  ],
  
  customFields: {
    badge: '2 BHK',
    badgeColor: '#3B82F6',
    bhkType: '2',
    showFamilyBadge: true
  }
});

export default bhk2Data;
export { bhk2Data };
