export const generateOrganizationSchema = (country: string, locale: string) => ({
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: `100acress ${country.toUpperCase()}`,
  alternateName: '100acress',
  url: `https://100acress.com/${country}`,
  logo: `https://100acress.com/${country}/images/logo.png`,
  description: `Premium real estate services in ${country}`,
  areaServed: {
    '@type': 'Country',
    name: country.toUpperCase(),
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: country.toUpperCase(),
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: getContactPhone(country),
    contactType: 'customer service',
    availableLanguage: getLanguage(locale),
  },
  sameAs: [
    `https://facebook.com/100acress${country}`,
    `https://twitter.com/100acress${country}`,
    `https://instagram.com/100acress${country}`,
  ],
});

export const generateRealEstateProjectSchema = (project: {
  name: string;
  description: string;
  price: string;
  currency: string;
  url: string;
  image: string;
  address: string;
  city: string;
  country: string;
  developer?: string;
  propertyType?: string;
  bedrooms?: number;
  area?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Residence',
  name: project.name,
  description: project.description,
  url: project.url,
  image: project.image,
  address: {
    '@type': 'PostalAddress',
    streetAddress: project.address,
    addressLocality: project.city,
    addressCountry: project.country,
  },
  offers: {
    '@type': 'Offer',
    price: project.price,
    priceCurrency: project.currency,
    availability: 'https://schema.org/InStock',
  },
  developer: project.developer ? {
    '@type': 'RealEstateAgent',
    name: project.developer,
  } : undefined,
  numberOfRooms: project.bedrooms,
  floorSize: {
    '@type': 'QuantitativeValue',
    value: project.area?.replace(/[^0-9]/g, ''),
    unitText: 'sqft',
  },
  additionalProperty: project.propertyType ? [
    {
      '@type': 'PropertyValue',
      name: 'Property Type',
      value: project.propertyType,
    },
  ] : [],
});

export const generateCitySchema = (city: string, country: string, properties: Array<{
  name: string;
  url: string;
  price: string;
}>) => ({
  '@context': 'https://schema.org',
  '@type': 'City',
  name: city,
  country: {
    '@type': 'Country',
    name: country,
  },
  containsPlace: properties.map(property => ({
    '@type': 'Residence',
    name: property.name,
    url: property.url,
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: getCurrency(country),
    },
  })),
});

// Helper functions
function getContactPhone(country: string): string {
  const phones: Record<string, string> = {
    uk: '+44 20 7123 4567',
    usa: '+1 (555) 123-4567',
    srilanka: '+94 11 234 5678',
  };
  return phones[country] || '+1 (555) 123-4567';
}

function getLanguage(locale: string): string[] {
  const languages: Record<string, string[]> = {
    'en_GB': ['English'],
    'en_US': ['English'],
    'si_LK': ['Sinhala', 'English', 'Tamil'],
  };
  return languages[locale] || ['English'];
}

function getCurrency(country: string): string {
  const currencies: Record<string, string> = {
    uk: 'GBP',
    usa: 'USD',
    srilanka: 'LKR',
  };
  return currencies[country] || 'USD';
}
