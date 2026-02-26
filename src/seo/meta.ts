import { Metadata } from 'next';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  locale: string;
  currency: string;
  ogImage?: string;
  canonical?: string;
  noindex?: boolean;
  alternateUrls?: Array<{
    hrefLang: string;
    url: string;
  }>;
}

export const generateMeta = (seo: SEOConfig): Metadata => {
  const meta: Metadata = {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords?.join(', '),
    authors: [{ name: '100acress' }],
    creator: '100acress',
    publisher: '100acress',
    robots: seo.noindex ? 'noindex,nofollow' : 'index,follow',
    
    openGraph: {
      type: 'website',
      locale: seo.locale,
      url: seo.canonical,
      title: seo.title,
      description: seo.description,
      siteName: '100acress',
      images: seo.ogImage ? [
        {
          url: seo.ogImage,
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ] : [],
    },
    
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: seo.ogImage ? [seo.ogImage] : [],
    },
    
    alternates: {
      canonical: seo.canonical,
      languages: seo.alternateUrls?.reduce((acc, alt) => {
        acc[alt.hrefLang] = alt.url;
        return acc;
      }, {} as Record<string, string>),
    },
  };

  return meta;
};

export const generateBreadcrumbSchema = (breadcrumbs: Array<{
  name: string;
  url: string;
}>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: crumb.url,
  })),
});

export const generateRealEstateListingSchema = (properties: Array<{
  name: string;
  description: string;
  price: string;
  currency: string;
  url: string;
  image?: string;
  address?: string;
}>) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  numberOfItems: properties.length,
  itemListElement: properties.map((property, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Product',
      name: property.name,
      description: property.description,
      url: property.url,
      image: property.image,
      offers: {
        '@type': 'Offer',
        price: property.price,
        priceCurrency: property.currency,
        availability: 'https://schema.org/InStock',
      },
      address: property.address ? {
        '@type': 'PostalAddress',
        addressCountry: property.address,
      } : undefined,
    },
  })),
});
