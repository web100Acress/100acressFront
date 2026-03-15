import { createPageData, applyTemplate, COMMON_TEMPLATES } from '../../core/types.js';

const template = COMMON_TEMPLATES.projectListing;
const type = 'Upcoming';

const upcomingData = createPageData('projects/upcoming', {
  urlPattern: '/projects/upcoming',
  
  // SEO
  metaTitle: 'Upcoming Projects in Gurgaon 2024-25 | New Launch Properties',
  metaDescription: 'Explore upcoming residential projects in Gurgaon. Discover new launch properties with modern amenities, pre-launch prices, and early bird offers. Book your dream home today.',
  canonical: 'https://www.100acress.com/projects/upcoming/',
  keywords: 'upcoming projects gurgaon, new launch properties gurgaon, pre launch projects gurgaon, upcoming residential projects, new projects gurgaon 2024',
  
  // Hero
  hero: applyTemplate(template, { type }),
  
  // Content
  title: 'Upcoming Projects in Gurgaon',
  h1: 'Upcoming Projects in Gurgaon - New Launch Properties',
  subtitle: 'Discover Pre-Launch & Newly Launched Residential Projects',
  description: 'Find the best upcoming residential projects in Gurgaon with pre-launch pricing. Get early access to new launches, exclusive offers, and priority booking options.',
  
  // Custom Content
  introText: `Gurgaon's real estate market is booming with exciting upcoming projects from top developers. 
    These new launch properties offer contemporary designs, smart home features, and world-class amenities 
    at competitive pre-launch prices.`,
  
  highlights: [
    'Pre-launch pricing advantages',
    'Early bird discounts & offers',
    'Priority unit selection',
    'Flexible payment plans',
    'Modern amenities & designs'
  ],
  
  // FAQs
  faqs: [
    {
      question: 'What are the benefits of investing in upcoming projects?',
      answer: 'Upcoming projects offer pre-launch pricing (10-15% lower), customization options, choice of preferred units/floors, flexible payment plans, and higher appreciation potential.'
    },
    {
      question: 'How to book a unit in an upcoming project?',
      answer: 'Contact our experts at 100acress to get early access. We provide priority booking assistance, site visits, and help you secure the best deals with top developers.'
    },
    {
      question: 'Are upcoming projects RERA registered?',
      answer: 'All our listed upcoming projects are either RERA registered or in the process. We verify all legal documents and RERA compliance before listing.'
    },
    {
      question: 'What payment plans are available for upcoming projects?',
      answer: 'Most upcoming projects offer construction-linked plans, down payment plans with discounts, and flexible EMI options. Pre-launch bookings often require just 10-20% initial payment.'
    },
    {
      question: 'Which developers have upcoming projects in Gurgaon?',
      answer: 'Top developers like DLF, M3M, Signature Global, Godrej, and Adani have exciting upcoming projects across prime Gurgaon locations.'
    }
  ],
  
  // Filter Options
  filters: {
    priceRange: [
      { label: 'Under 50 Lakhs', value: '0-50' },
      { label: '50 Lakhs - 1 Crore', value: '50-100' },
      { label: '1 - 2 Crore', value: '100-200' },
      { label: '2 - 5 Crore', value: '200-500' },
      { label: 'Above 5 Crore', value: '500+' }
    ],
    bhkOptions: ['1', '2', '3', '4', '5'],
    locations: [
      'Sector 37D', 'Sector 70', 'Dwarka Expressway', 
      'Sohna Road', 'Golf Course Extension', 'New Gurgaon'
    ]
  },
  
  // Sort Options
  sortOptions: [
    { label: 'Featured', value: 'featured' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Newest First', value: 'newest' },
    { label: 'Possession Date', value: 'possession' }
  ],
  
  customFields: {
    badge: 'New Launch',
    badgeColor: '#10B981',
    showCountdown: true,
    showPreLaunchBanner: true
  }
});

export default upcomingData;
export { upcomingData };
