import { createPageData, applyTemplate, COMMON_TEMPLATES } from '../../core/types.js';

const template = COMMON_TEMPLATES.projectListing;
const type = 'Affordable';

const affordableData = createPageData('projects/affordable-homes', {
  urlPattern: '/projects/affordable-homes',
  
  // SEO
  metaTitle: 'Affordable Homes in Gurgaon | Budget-Friendly Housing Options',
  metaDescription: 'Explore affordable homes in Gurgaon offering practical layouts, essential amenities, and good connectivity. Ideal for first-time buyers and families. Starting from ₹35 Lakhs.',
  canonical: 'https://www.100acress.com/projects/affordable-homes/',
  keywords: 'affordable homes gurgaon, budget homes gurgaon, affordable housing gurgaon, low-cost apartments gurgaon, economic flats gurgaon, first time buyer homes',
  
  // Hero
  hero: applyTemplate(template, { type }),
  
  // Content
  title: 'Affordable Homes in Gurgaon',
  h1: 'Affordable Homes in Gurgaon - Budget-Friendly Housing',
  subtitle: 'Quality Living Within Your Budget',
  description: 'Find affordable homes in Gurgaon with practical layouts, essential amenities, and excellent connectivity. Perfect for first-time homebuyers and budget-conscious families.',
  
  introText: `Discover budget-friendly housing options in Gurgaon that don't compromise on quality. 
    Our affordable homes collection features properties from ₹35 lakhs to ₹80 lakhs, 
    offering essential amenities, good construction quality, and promising locations.`,
  
  highlights: [
    'Prices starting from ₹35 Lakhs',
    'RERA approved projects',
    'Easy EMI options available',
    'Good rental yield potential',
    'Growing neighborhood infrastructure'
  ],
  
  faqs: [
    {
      question: 'What is the price range for affordable homes in Gurgaon?',
      answer: 'Affordable homes in Gurgaon typically range from ₹35 lakhs to ₹80 lakhs depending on location, size, and amenities. Areas like Sector 95, 92, and Sohna Road offer the best value.'
    },
    {
      question: 'Which areas in Gurgaon have affordable housing projects?',
      answer: 'Sector 95, Sector 92, Sector 37D, Sohna Road, and New Gurgaon areas offer the most affordable housing options with good connectivity and future growth potential.'
    },
    {
      question: 'Are affordable homes in Gurgaon a good investment?',
      answer: 'Yes, affordable homes offer good rental yields (3-4% annually) and appreciation potential as infrastructure develops. They\'re ideal for first-time investors with limited budgets.'
    },
    {
      question: 'What amenities can I expect in affordable housing projects?',
      answer: 'Standard amenities include security, power backup, parking, lifts, parks, and community spaces. Some projects also offer clubhouses, gyms, and swimming pools.'
    },
    {
      question: 'Is home loan available for affordable homes?',
      answer: 'Yes, all major banks and NBFCs provide home loans for RERA-registered affordable housing projects. Interest rates typically range from 8.5% to 9.5%.'
    }
  ],
  
  filters: {
    priceRange: [
      { label: '₹35 - 50 Lakhs', value: '35-50' },
      { label: '₹50 - 65 Lakhs', value: '50-65' },
      { label: '₹65 - 80 Lakhs', value: '65-80' }
    ],
    bhkOptions: ['1', '2', '3'],
    locations: [
      'Sector 95', 'Sector 92', 'Sector 37D',
      'Sohna Road', 'New Gurgaon', 'Sector 70'
    ]
  },
  
  sortOptions: [
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Area: Small to Large', value: 'area-asc' },
    { label: 'Possession Date', value: 'possession' }
  ],
  
  customFields: {
    badge: 'Budget Friendly',
    badgeColor: '#3B82F6',
    showEMICalculator: true,
    showLoanBanner: true
  }
});

export default affordableData;
export { affordableData };
