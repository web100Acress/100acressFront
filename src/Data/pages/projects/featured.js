import { createPageData, applyTemplate, COMMON_TEMPLATES } from '../../core/types.js';

const template = COMMON_TEMPLATES.projectListing;
const type = 'Featured';

const featuredData = createPageData('projects/featured', {
  urlPattern: '/projects/featured',
  
  // SEO
  metaTitle: 'Featured Projects in Gurgaon | Premium Properties 2024',
  metaDescription: 'Discover featured residential projects in Gurgaon from top developers. Handpicked premium properties with exclusive amenities and prime locations.',
  canonical: 'https://www.100acress.com/projects/featured/',
  keywords: 'featured projects gurgaon, premium properties gurgaon, best residential projects gurgaon, top developers projects, handpicked properties',
  
  // Hero
  hero: {
    ...applyTemplate(template, { type }),
    title: 'Featured Projects in Gurgaon',
    subtitle: 'Handpicked Premium Properties by Top Developers'
  },
  
  // Content
  title: 'Featured Projects in Gurgaon',
  h1: 'Featured Projects in Gurgaon - Premium Selection',
  subtitle: 'Curated Collection of Best Residential Properties',
  description: 'Explore our handpicked selection of featured projects in Gurgaon. These premium properties are chosen for their location, amenities, builder reputation, and investment potential.',
  
  introText: `Our featured projects represent the finest residential developments in Gurgaon. 
    Each property is carefully evaluated for construction quality, amenities, location advantages, 
    and value proposition by our real estate experts.`,
  
  highlights: [
    'Handpicked by real estate experts',
    'Top-rated developers only',
    'Prime locations across Gurgaon',
    'Premium amenities & features',
    'High appreciation potential'
  ],
  
  faqs: [
    {
      question: 'How are featured projects selected?',
      answer: 'Our experts evaluate projects based on developer reputation, construction quality, location advantages, amenities, legal compliance, customer reviews, and market demand.'
    },
    {
      question: 'Do featured projects have any special offers?',
      answer: 'Yes, many featured projects offer exclusive deals through 100acress including special pricing, flexible payment plans, and additional amenities.'
    },
    {
      question: 'Are featured projects RERA registered?',
      answer: 'Absolutely. All featured projects are fully RERA registered and legally compliant. We verify all documentation before featuring any project.'
    },
    {
      question: 'Can I get priority booking for featured projects?',
      answer: 'Yes, our relationship with developers allows us to offer priority booking and early access to featured projects. Contact us for exclusive previews.'
    },
    {
      question: 'Which developers are featured on 100acress?',
      answer: 'We feature projects from reputed developers like DLF, M3M, Signature Global, Godrej Properties, Adani Realty, Tata Housing, and other top brands.'
    }
  ],
  
  filters: {
    priceRange: [
      { label: 'Under 1 Crore', value: '0-100' },
      { label: '1 - 3 Crore', value: '100-300' },
      { label: '3 - 5 Crore', value: '300-500' },
      { label: 'Above 5 Crore', value: '500+' }
    ],
    bhkOptions: ['2', '3', '4', '5'],
    locations: [
      'Golf Course Road', 'Dwarka Expressway', 'Sohna Road',
      'Sector 57', 'Sector 67', 'Sector 79', 'Sector 84'
    ]
  },
  
  sortOptions: [
    { label: 'Featured First', value: 'featured' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Developer Rating', value: 'rating' }
  ],
  
  customFields: {
    badge: 'Featured',
    badgeColor: '#F59E0B',
    showExpertPick: true,
    showDeveloperRating: true
  }
});

export default featuredData;
export { featuredData };
