import { createPageData, applyTemplate, COMMON_TEMPLATES } from '../../core/types.js';

const template = COMMON_TEMPLATES.projectListing;
const type = 'Budget';

const budgetHomesData = createPageData('projects/budget-homes', {
  urlPattern: '/projects/budget-homes',
  
  // SEO
  metaTitle: 'Budget Homes in Gurgaon Under 50 Lakhs | Affordable Housing 2024',
  metaDescription: 'Find budget homes in Gurgaon under 50 lakhs. Affordable apartments and flats perfect for first-time buyers with easy EMI and home loan options available.',
  canonical: 'https://www.100acress.com/projects/budget-homes/',
  keywords: 'budget homes gurgaon, homes under 50 lakhs gurgaon, affordable housing gurgaon, cheap flats gurgaon, first time buyer homes, low budget apartments',
  
  // Hero
  hero: {
    ...applyTemplate(template, { type }),
    title: 'Budget Homes in Gurgaon',
    subtitle: 'Quality Living Under ₹50 Lakhs'
  },
  
  // Content
  title: 'Budget Homes in Gurgaon',
  h1: 'Budget Homes in Gurgaon Under ₹50 Lakhs',
  subtitle: 'Affordable Housing for First-Time Buyers',
  description: 'Discover budget-friendly homes in Gurgaon under 50 lakhs. These affordable apartments offer essential amenities, good connectivity, and value for money for first-time homebuyers.',
  
  introText: `Your dream of owning a home in Gurgaon is within reach. 
    Our budget homes collection brings you quality properties under ₹50 lakhs 
    with easy EMI options, government subsidies, and flexible payment plans.`,
  
  highlights: [
    'Prices starting under ₹50 Lakhs',
    'PMAY subsidy eligible projects',
    'Easy home loan approvals',
    'Essential amenities included',
    'Growing neighborhood value'
  ],
  
  faqs: [
    {
      question: 'Can I really buy a home in Gurgaon under 50 lakhs?',
      answer: 'Yes! Areas like Sector 95, 92, 37D, and Sohna offer quality 1-2 BHK apartments under 50 lakhs. These are RERA-registered projects with essential amenities and good future potential.'
    },
    {
      question: 'What size apartments are available under 50 lakhs?',
      answer: 'You can find 1 BHK (450-600 sq ft) and compact 2 BHK (650-800 sq ft) apartments in this budget. These are well-designed for small families and working professionals.'
    },
    {
      question: 'Am I eligible for PMAY subsidy on budget homes?',
      answer: 'Yes, many budget projects are PMAY (Pradhan Mantri Awas Yojana) eligible. First-time buyers can get subsidy up to ₹2.67 lakhs on interest, significantly reducing EMI burden.'
    },
    {
      question: 'What will be my approximate EMI for a 50 lakh home?',
      answer: 'With 20% down payment (₹10 lakhs), loan of ₹40 lakhs at 8.5% for 20 years gives approximately ₹35,000 monthly EMI. With PMAY subsidy, this can reduce further.'
    },
    {
      question: 'Which banks provide loans for budget homes?',
      answer: 'All major banks - SBI, HDFC, ICICI, Axis, PNB Housing - provide loans for RERA-registered budget projects. Most developers also have tie-ups for easier processing.'
    }
  ],
  
  filters: {
    priceRange: [
      { label: 'Under ₹35 Lakhs', value: '0-35' },
      { label: '₹35 - 45 Lakhs', value: '35-45' },
      { label: '₹45 - 50 Lakhs', value: '45-50' }
    ],
    bhkOptions: ['1', '2'],
    locations: [
      'Sector 95', 'Sector 92', 'Sector 37D', 'Sector 70',
      'Sohna', 'Sector 104', 'Sector 108'
    ]
  },
  
  sortOptions: [
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Area Efficiency', value: 'efficiency' },
    { label: 'Possession Date', value: 'possession' },
    { label: 'PMAY Eligible First', value: 'pmay' }
  ],
  
  customFields: {
    badge: 'Under 50L',
    badgeColor: '#22C55E',
    showEMICalculator: true,
    showPMAYInfo: true,
    budgetFocus: true
  }
});

export default budgetHomesData;
export { budgetHomesData };
