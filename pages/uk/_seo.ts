import { SEOConfig, generateBreadcrumbSchema, generateRealEstateListingSchema } from '../../src/seo/meta';

export const UK_SEO: SEOConfig = {
  title: 'Luxury Properties in UK | Premium Real Estate | 100acress',
  description: 'Discover premium real estate properties across the UK. Buy luxury homes, apartments & investment properties in London, Manchester, Birmingham & more with 100acress.',
  keywords: [
    'UK real estate',
    'luxury properties UK',
    'London property',
    'Manchester homes',
    'Birmingham real estate',
    'UK investment property',
    'premium homes UK',
    '100acress UK',
    'buy property UK',
    'UK housing market'
  ],
  locale: 'en_GB',
  currency: 'GBP',
  ogImage: '/uk/og-image.jpg',
  canonical: 'https://100acress.com/uk',
  alternateUrls: [
    { hrefLang: 'en-gb', url: 'https://100acress.com/uk' },
    { hrefLang: 'en-us', url: 'https://100acress.com/usa' },
    { hrefLang: 'si-lk', url: 'https://100acress.com/srilanka' },
    { hrefLang: 'en', url: 'https://100acress.com' }
  ]
};

export const UK_CITY_SEO = {
  london: {
    title: 'Luxury Properties in London | Premium Real Estate | 100acress',
    description: 'Find exclusive properties in London. From Mayfair penthouses to Kensington homes, discover luxury London real estate with 100acress.',
    keywords: ['London property', 'luxury homes London', 'Mayfair real estate', 'Kensington properties', 'London investment property'],
    ogImage: '/uk/images/cities/london-og.jpg'
  },
  manchester: {
    title: 'Properties in Manchester | Modern Homes & Apartments | 100acress',
    description: 'Discover modern properties in Manchester. City centre apartments to family homes in Spinningfields, Didsbury & more with 100acress.',
    keywords: ['Manchester property', 'Manchester homes', 'Spinningfields apartments', 'Manchester real estate investment'],
    ogImage: '/uk/images/cities/manchester-og.jpg'
  },
  birmingham: {
    title: 'Birmingham Properties | Investment Opportunities | 100acress',
    description: 'Explore property investment opportunities in Birmingham. From Jewellery Quarter lofts to Edgbaston family homes with 100acress.',
    keywords: ['Birmingham property', 'Birmingham investment', 'Jewellery Quarter real estate', 'Edgbaston homes'],
    ogImage: '/uk/images/cities/birmingham-og.jpg'
  },
  bristol: {
    title: 'Bristol Properties | Harbourside Homes & Apartments | 100acress',
    description: 'Find beautiful properties in Bristol. Clifton apartments to harbourside townhouses with stunning views and great lifestyle.',
    keywords: ['Bristol property', 'Clifton homes', 'Bristol harbourside', 'Bristol real estate'],
    ogImage: '/uk/images/cities/bristol-og.jpg'
  }
};

export { generateBreadcrumbSchema, generateRealEstateListingSchema };

export const generateCitySEO = (citySlug: string, cityName: string) => {
  const citySEO = UK_CITY_SEO[citySlug as keyof typeof UK_CITY_SEO];
  
  return {
    title: citySEO?.title || `Properties in ${cityName} | Real Estate | 100acress`,
    description: citySEO?.description || `Discover premium properties in ${cityName}. Find your dream home with 100acress.`,
    keywords: citySEO?.keywords || [`${cityName} property`, `${cityName} real estate`, `100acress ${cityName}`],
    locale: 'en_GB' as const,
    currency: 'GBP' as const,
    ogImage: citySEO?.ogImage || `/uk/images/cities/${citySlug}-og.jpg`,
    canonical: `https://100acress.com/uk/cities/${citySlug}`
  };
};
