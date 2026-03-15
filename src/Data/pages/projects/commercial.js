import { createPageData, applyTemplate, COMMON_TEMPLATES } from '../../core/types.js';

const template = COMMON_TEMPLATES.projectListing;
const type = 'Commercial';

const commercialData = createPageData('projects/commercial', {
  urlPattern: '/projects/commercial',
  
  // SEO
  metaTitle: 'Commercial Projects in Gurgaon | Office & Retail Spaces 2024',
  metaDescription: 'Explore commercial projects in Gurgaon offering premium office spaces, retail shops, and SCO plots. Invest in high-ROI commercial properties with excellent connectivity.',
  canonical: 'https://www.100acress.com/projects/commercial/',
  keywords: 'commercial projects gurgaon, office spaces gurgaon, retail shops gurgaon, commercial property investment, SCO plots gurgaon, business spaces',
  
  // Hero
  hero: {
    ...applyTemplate(template, { type }),
    title: 'Commercial Projects in Gurgaon',
    subtitle: 'Premium Office, Retail & Business Spaces'
  },
  
  // Content
  title: 'Commercial Projects in Gurgaon',
  h1: 'Commercial Projects in Gurgaon - Business Spaces',
  subtitle: 'Strategic Investment in Commercial Real Estate',
  description: 'Discover lucrative commercial projects in Gurgaon including office spaces, retail shops, and SCO plots. Perfect for business owners and investors seeking high rental yields.',
  
  introText: `Gurgaon's commercial real estate offers exceptional investment opportunities. 
    With multinational companies, thriving startups, and a growing consumer base, 
    commercial properties here deliver impressive ROI and steady rental income.`,
  
  highlights: [
    'High rental yields: 6-10% annually',
    'Proximity to corporate hubs',
    'Metro connectivity advantage',
    'Growing consumer market',
    'Flexible space options'
  ],
  
  faqs: [
    {
      question: 'What types of commercial properties are available?',
      answer: 'Gurgaon offers diverse commercial options including office spaces (Grade A & B), retail shops, food courts, SCO (Shop-Cum-Office) plots, multiplex spaces, and mixed-use developments.'
    },
    {
      question: 'What is the ROI on commercial properties in Gurgaon?',
      answer: 'Commercial properties in prime Gurgaon locations typically offer rental yields of 6-10% annually, significantly higher than residential properties (2-3%). Capital appreciation is also strong.'
    },
    {
      question: 'Which locations are best for commercial investment?',
      answer: 'Prime commercial locations include Golf Course Road, MG Road, Cyber Hub, Sector 29, Sohna Road, and areas along the Dwarka Expressway for upcoming business districts.'
    },
    {
      question: 'Can I get a loan for commercial property?',
      answer: 'Yes, commercial property loans are available from all major banks. Interest rates typically range from 9-11%, and loan tenure can extend up to 15 years depending on your profile.'
    },
    {
      question: 'Are commercial properties leasehold or freehold?',
      answer: 'Most commercial properties in Gurgaon are freehold, especially in newer developments. Some older commercial spaces may be on leasehold land with 99-year terms.'
    }
  ],
  
  filters: {
    propertyType: [
      { label: 'Office Spaces', value: 'office' },
      { label: 'Retail Shops', value: 'retail' },
      { label: 'SCO Plots', value: 'sco' },
      { label: 'Food Court', value: 'food-court' },
      { label: 'Multiplex', value: 'multiplex' }
    ],
    priceRange: [
      { label: '₹50 Lakhs - 1 Crore', value: '50-100' },
      { label: '₹1 - 3 Crore', value: '100-300' },
      { label: '₹3 - 5 Crore', value: '300-500' },
      { label: 'Above ₹5 Crore', value: '500+' }
    ],
    areaRange: [
      { label: '250-500 sq ft', value: '250-500' },
      { label: '500-1000 sq ft', value: '500-1000' },
      { label: '1000-2000 sq ft', value: '1000-2000' },
      { label: 'Above 2000 sq ft', value: '2000+' }
    ],
    locations: [
      'MG Road', 'Cyber Hub', 'Golf Course Road', 'Sector 29',
      'Sohna Road', 'Dwarka Expressway', 'NH-8'
    ]
  },
  
  sortOptions: [
    { label: 'ROI Potential', value: 'roi' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Location Premium', value: 'location' }
  ],
  
  customFields: {
    badge: 'Commercial',
    badgeColor: '#0EA5E9',
    showROICalculator: true,
    showRentalYield: true,
    investmentFocused: true
  }
});

export default commercialData;
export { commercialData };
