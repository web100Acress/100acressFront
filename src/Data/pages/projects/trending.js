import { createPageData, applyTemplate, COMMON_TEMPLATES } from '../../core/types.js';

const template = COMMON_TEMPLATES.projectListing;
const type = 'Trending';

const trendingData = createPageData('projects/trending', {
  urlPattern: '/projects/trending',
  
  // SEO
  metaTitle: 'Trending Projects in Gurgaon | Most Popular Properties 2024',
  metaDescription: 'Explore trending residential projects in Gurgaon that are in high demand. Discover the most popular properties with best amenities and investment potential.',
  canonical: 'https://www.100acress.com/projects/trending/',
  keywords: 'trending projects gurgaon, popular properties gurgaon, most searched projects gurgaon, high demand properties, trending residential projects',
  
  // Hero
  hero: {
    ...applyTemplate(template, { type }),
    title: 'Trending Projects in Gurgaon',
    subtitle: 'Most Popular & High-Demand Properties'
  },
  
  // Content
  title: 'Trending Projects in Gurgaon',
  h1: 'Trending Projects in Gurgaon - Most Sought After Properties',
  subtitle: 'Properties That Everyone is Talking About',
  description: 'Discover the most trending residential projects in Gurgaon. These properties are in high demand due to their location, pricing, amenities, and investment potential.',
  
  introText: `Stay ahead of the market with our trending projects section. 
    These properties are generating maximum interest among homebuyers and investors 
    due to their unique value propositions and market positioning.`,
  
  highlights: [
    'High buyer demand & interest',
    'Fast-selling inventory',
    'Competitive pricing',
    'Best locations & connectivity',
    'Strong investment potential'
  ],
  
  faqs: [
    {
      question: 'How do you determine trending projects?',
      answer: 'Trending status is based on search volume, inquiry rates, site visits, booking velocity, social media engagement, and market buzz around specific projects.'
    },
    {
      question: 'Should I invest in trending projects?',
      answer: 'Trending projects often indicate strong market confidence, but you should still evaluate based on your budget, requirements, and investment goals. Contact our advisors for personalized guidance.'
    },
    {
      question: 'Do trending projects sell out quickly?',
      answer: 'Yes, trending projects typically have faster sales velocity. Popular configurations and prime units sell first. Early engagement is recommended to secure preferred choices.'
    },
    {
      question: 'Are trending projects more expensive?',
      answer: 'Not necessarily. Trending status is based on demand, not just price. Many affordable projects trend due to value-for-money propositions and location advantages.'
    },
    {
      question: 'How often is the trending list updated?',
      answer: 'Our trending list is updated weekly based on real-time market data, search analytics, and customer engagement metrics.'
    }
  ],
  
  filters: {
    priceRange: [
      { label: 'Under 75 Lakhs', value: '0-75' },
      { label: '75 Lakhs - 1.5 Crore', value: '75-150' },
      { label: '1.5 - 3 Crore', value: '150-300' },
      { label: 'Above 3 Crore', value: '300+' }
    ],
    bhkOptions: ['1', '2', '3', '4'],
    locations: [
      'Sector 37D', 'Sector 70', 'Sector 84', 'Sector 92',
      'Dwarka Expressway', 'Sohna Road', 'Golf Course Extension'
    ]
  },
  
  sortOptions: [
    { label: 'Trending', value: 'trending' },
    { label: 'Most Viewed', value: 'views' },
    { label: 'Newest Added', value: 'newest' },
    { label: 'Price: Low to High', value: 'price-asc' }
  ],
  
  customFields: {
    badge: '🔥 Trending',
    badgeColor: '#EF4444',
    showTrendIndicator: true,
    showViewCount: true,
    updateFrequency: 'weekly'
  }
});

export default trendingData;
export { trendingData };
