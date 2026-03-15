import { createPageData, applyTemplate, COMMON_TEMPLATES } from '../../core/types.js';

const template = COMMON_TEMPLATES.bhkListing;
const bhk = '1';

const bhk1Data = createPageData('bhk/1', {
  urlPattern: '/1-bhk-flats-in-gurgaon',
  
  // SEO
  metaTitle: '1 BHK Flats in Gurgaon | Buy Affordable Apartments 2024',
  metaDescription: 'Find budget-friendly 1 BHK flats in Gurgaon starting from ₹35 Lakhs. Perfect for bachelors, working professionals, and small families. Explore verified listings.',
  canonical: 'https://www.100acress.com/1-bhk-flats-in-gurgaon/',
  keywords: '1 bhk flats gurgaon, 1 bedroom apartments gurgaon, affordable 1 bhk gurgaon, bachelor apartments gurgaon, single room flats gurgaon, budget 1 bhk',
  
  // Hero
  hero: {
    ...applyTemplate(template, { bhk }),
    title: '1 BHK Flats in Gurgaon',
    subtitle: 'Affordable Living for Singles & Couples'
  },
  
  // Content
  title: '1 BHK Flats in Gurgaon',
  h1: '1 BHK Flats in Gurgaon - Your Perfect Starter Home',
  subtitle: 'Compact Living, Maximum Value',
  description: 'Discover affordable 1 BHK flats in Gurgaon perfect for working professionals, bachelors, and young couples. Prices starting from ₹35 lakhs with modern amenities.',
  
  introText: `Start your homeownership journey with a 1 BHK apartment in Gurgaon. 
    These compact yet efficient homes offer everything you need - a comfortable bedroom, 
    functional living space, and modern amenities - at an entry-level budget.`,
  
  highlights: [
    'Prices from ₹35-75 Lakhs',
    '450-650 sq ft area',
    'Perfect for working professionals',
    'Good rental potential (₹12-20K/month)',
    'Easy maintenance & utilities'
  ],
  
  faqs: [
    {
      question: 'What is the average price of 1 BHK in Gurgaon?',
      answer: '1 BHK flats in Gurgaon range from ₹35 lakhs to ₹75 lakhs depending on location, builder, and amenities. Emerging sectors like 95, 92, and Sohna offer the best value.'
    },
    {
      question: 'Which areas have affordable 1 BHK flats?',
      answer: 'Sector 95, Sector 92, Sector 37D, Sohna Road, and New Gurgaon areas offer affordable 1 BHK options with good connectivity and future appreciation potential.'
    },
    {
      question: 'Is 1 BHK a good investment in Gurgaon?',
      answer: 'Yes, 1 BHK flats offer 3-4% rental yield and steady appreciation. They\'re always in demand from working professionals, making them excellent for rental income.'
    },
    {
      question: 'What amenities come with 1 BHK apartments?',
      answer: 'Standard amenities include security, parking, power backup, lifts, and maintenance services. Premium projects may add gyms, pools, and clubhouses.'
    },
    {
      question: 'What is the typical size of 1 BHK in Gurgaon?',
      answer: '1 BHK apartments typically range from 450 to 650 sq ft carpet area. Efficient designs maximize usable space with modern layouts.'
    }
  ],
  
  filters: {
    priceRange: [
      { label: '₹35 - 45 Lakhs', value: '35-45' },
      { label: '₹45 - 55 Lakhs', value: '45-55' },
      { label: '₹55 - 65 Lakhs', value: '55-65' },
      { label: '₹65 - 75 Lakhs', value: '65-75' }
    ],
    areaRange: [
      { label: '450-500 sq ft', value: '450-500' },
      { label: '500-600 sq ft', value: '500-600' },
      { label: '600-650 sq ft', value: '600-650' }
    ],
    locations: [
      'Sector 95', 'Sector 92', 'Sector 37D', 'Sector 70',
      'Sohna Road', 'New Gurgaon'
    ]
  },
  
  sortOptions: [
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Area: Small to Large', value: 'area-asc' },
    { label: 'Possession Date', value: 'possession' },
    { label: 'Rental Yield', value: 'rental' }
  ],
  
  customFields: {
    badge: '1 BHK',
    badgeColor: '#F97316',
    bhkType: '1',
    showCompactBadge: true
  }
});

export default bhk1Data;
export { bhk1Data };
