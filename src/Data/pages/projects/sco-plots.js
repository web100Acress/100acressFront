import { createPageData, applyTemplate, COMMON_TEMPLATES } from '../../core/types.js';

const template = COMMON_TEMPLATES.projectListing;
const type = 'SCO Plots';

const scoPlotsData = createPageData('projects/sco-plots', {
  urlPattern: '/projects/sco-plots',
  
  // SEO
  metaTitle: 'SCO Plots in Gurgaon | Shop-Cum-Office Spaces for Sale 2024',
  metaDescription: 'Explore SCO plots in Gurgaon - perfect for retail shops with office space. Invest in Shop-Cum-Office plots on prime locations with high rental potential.',
  canonical: 'https://www.100acress.com/projects/sco-plots/',
  keywords: 'SCO plots gurgaon, shop cum office plots gurgaon, SCO property gurgaon, retail office space gurgaon, SCO investment gurgaon, commercial plots',
  
  // Hero
  hero: {
    ...applyTemplate(template, { type }),
    title: 'SCO Plots in Gurgaon',
    subtitle: 'Shop-Cum-Office Spaces for Business & Investment'
  },
  
  // Content
  title: 'SCO Plots in Gurgaon',
  h1: 'SCO Plots in Gurgaon - Shop-Cum-Office Investment',
  subtitle: 'Ground Floor Retail + Upper Floor Office Space',
  description: 'Discover SCO (Shop-Cum-Office) plots in Gurgaon - versatile commercial properties combining ground-floor retail with upper-floor office space. Ideal for business owners and investors.',
  
  introText: `SCO plots offer the best of both worlds - ground floor visibility for retail/showroom 
    and upper floors for office operations. These versatile commercial properties 
    are in high demand along Gurgaon's major commercial corridors.`,
  
  highlights: [
    'Ground + 4 floors configuration',
    'Road-facing visibility advantage',
    'High rental yields: 8-12%',
    'Perfect for retail + office combo',
    'Growing demand from businesses'
  ],
  
  faqs: [
    {
      question: 'What is an SCO plot?',
      answer: 'SCO stands for Shop-Cum-Office. It\'s a commercial plot where you can build ground floor retail/showroom space with upper floors (typically 3-4) for office use. It offers road-facing visibility and flexible usage.'
    },
    {
      question: 'What is the typical plot size for SCO?',
      answer: 'SCO plots in Gurgaon typically range from 100 to 300 sq yards. The built-up area can be 4000-15000 sq ft depending on the plot size and floor area ratio (FAR) allowed.'
    },
    {
      question: 'What are the best locations for SCO plots?',
      answer: 'Prime SCO locations include Golf Course Extension Road, Sohna Road, Dwarka Expressway, NH-8 corridor, and sectors 70, 84, 92, and 109 where commercial activity is booming.'
    },
    {
      question: 'What is the investment potential of SCO plots?',
      answer: 'SCO plots offer excellent returns with rental yields of 8-12% and strong appreciation. They\'re ideal for both self-use by business owners and as pure investment properties.'
    },
    {
      question: 'Which developers offer SCO plots in Gurgaon?',
      answer: 'Leading developers with SCO offerings include DLF, M3M, Signature Global, Vatika, Bestech, and Ashiana. Each offers plots in different locations with varying amenities.'
    }
  ],
  
  filters: {
    plotSize: [
      { label: '100-150 sq yards', value: '100-150' },
      { label: '150-200 sq yards', value: '150-200' },
      { label: '200-300 sq yards', value: '200-300' },
      { label: 'Above 300 sq yards', value: '300+' }
    ],
    priceRange: [
      { label: '₹2 - 4 Crore', value: '200-400' },
      { label: '₹4 - 6 Crore', value: '400-600' },
      { label: '₹6 - 10 Crore', value: '600-1000' },
      { label: 'Above ₹10 Crore', value: '1000+' }
    ],
    locations: [
      'Golf Course Extension', 'Sohna Road', 'Dwarka Expressway',
      'NH-8', 'Sector 70', 'Sector 84', 'Sector 92', 'Sector 109'
    ]
  },
  
  sortOptions: [
    { label: 'Location Premium', value: 'location' },
    { label: 'Plot Size', value: 'size' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Developer Reputation', value: 'brand' }
  ],
  
  customFields: {
    badge: 'SCO',
    badgeColor: '#14B8A6',
    showPlotMap: true,
    showDevelopmentTimeline: true,
    commercialType: 'sco'
  }
});

export default scoPlotsData;
export { scoPlotsData };
