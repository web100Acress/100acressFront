import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { UKNavbar } from '@/country/modules/country/navbar/UKNavbar';
import { UKFooter } from '@/country/modules/country/footer/UKFooter';
import { UK_CITIES } from '@/content/uk/cities';
import { generateCitySEO, generateBreadcrumbSchema, generateRealEstateListingSchema } from '../_seo';
import { generateMeta } from '../../../src/seo/meta';
import { generateCitySchema } from '../../../src/seo/jsonld/organization';

interface CityPageProps {
  city: {
    name: string;
    slug: string;
    description: string;
    shortDescription: string;
    propertyCount: number;
    avgPrice: string;
    priceRange: string;
    population: string;
    area: string;
    image: string;
    ogImage: string;
    featuredProperties: Array<{
      id: string;
      name: string;
      price: string;
      bedrooms: number;
      image: string;
    }>;
    neighborhoods: string[];
    transport: {
      airports?: string[];
      trains?: string[];
      trams?: string[];
      motorways?: string[];
      buses?: string[];
    };
    landmarks: string[];
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    locale: string;
    currency: string;
    ogImage: string;
    canonical: string;
  };
}

const CityPage: NextPage<CityPageProps> = ({ city, seo }) => {
  const breadcrumbs = [
    { name: 'Home', url: 'https://100acress.com' },
    { name: 'UK', url: 'https://100acress.com/uk' },
    { name: city.name, url: seo.canonical }
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const citySchema = generateCitySchema(
    city.name, 
    'UK', 
    city.featuredProperties.map(property => ({
      name: property.name,
      price: property.price,
      url: `https://100acress.com/uk/projects/${property.id}`
    }))
  );
  const listingSchema = generateRealEstateListingSchema(
    city.featuredProperties.map(property => ({
      name: property.name,
      description: `Premium property in ${city.name}`,
      price: property.price,
      currency: 'GBP',
      url: `https://100acress.com/uk/projects/${property.id}`,
      image: property.image,
      address: city.name
    }))
  );

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords.join(', ')} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seo.canonical} />
        <meta property="og:image" content={`https://100acress.com${seo.ogImage}`} />
        <meta property="og:locale" content={seo.locale} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={`https://100acress.com${seo.ogImage}`} />
        <link rel="canonical" href={seo.canonical} />
        
        {/* Hreflang tags */}
        <link rel="alternate" hrefLang="en-gb" href={`https://100acress.com/uk/cities/${city.slug}`} />
        <link rel="alternate" hrefLang="en-us" href={`https://100acress.com/usa/cities/${city.slug}`} />
        <link rel="alternate" hrefLang="si-lk" href={`https://100acress.com/srilanka/cities/${city.slug}`} />
        <link rel="alternate" hrefLang="en" href={`https://100acress.com/uk/cities/${city.slug}`} />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(citySchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(listingSchema) }}
        />
      </Head>

      <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary, #ffffff)' }}>
        <UKNavbar />
        
        {/* City Hero */}
        <section className="relative h-96 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${city.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
          </div>
          
          <div className="relative z-10 h-full flex items-center justify-center text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Properties in {city.name}
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                {city.description}
              </p>
              
              {/* City Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">{city.propertyCount}+</div>
                  <div className="text-sm">Properties</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">{city.avgPrice}</div>
                  <div className="text-sm">Average Price</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">{city.population}</div>
                  <div className="text-sm">Population</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">{city.area}</div>
                  <div className="text-sm">Area</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Properties */}
        <section className="py-16" style={{ backgroundColor: 'var(--bg-secondary, #f8f9fa)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary, #1a202c)' }}>
                Featured Properties in {city.name}
              </h2>
              <p className="text-lg" style={{ color: 'var(--text-secondary, #4a5568)' }}>
                Handpicked premium properties in {city.name}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {city.featuredProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div 
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${property.image})` }}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary, #1a202c)' }}>
                      {property.name}
                    </h3>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold" style={{ color: 'var(--accent-primary, #1e40af)' }}>
                        {property.price}
                      </span>
                      <span className="text-gray-600">
                        {property.bedrooms} Bedrooms
                      </span>
                    </div>
                    <Link
                      href={`/uk/projects/${property.id}`}
                      className="inline-flex items-center px-4 py-2 rounded-lg font-semibold transition-colors w-full justify-center"
                      style={{ 
                        backgroundColor: 'var(--accent-primary, #1e40af)',
                        color: 'var(--accent-text, #ffffff)'
                      }}
                    >
                      View Details
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* City Information */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Neighborhoods */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary, #1a202c)' }}>
                  Popular Neighborhoods
                </h3>
                <div className="space-y-3">
                  {city.neighborhoods.map((neighborhood) => (
                    <Link
                      key={neighborhood}
                      href={`/uk/cities/${city.slug}/${neighborhood.toLowerCase()}`}
                      className="block p-3 rounded-lg border border-gray-200 hover:border-blue-400 transition-colors"
                    >
                      <div className="font-medium" style={{ color: 'var(--text-primary, #1a202c)' }}>
                        {neighborhood}
                      </div>
                      <div className="text-sm" style={{ color: 'var(--text-secondary, #4a5568)' }}>
                        Explore properties
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Transport */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary, #1a202c)' }}>
                  Transportation
                </h3>
                <div className="space-y-4">
                  {city.transport.airports && (
                    <div>
                      <h4 className="font-semibold mb-2">Airports</h4>
                      <div className="space-y-1">
                        {city.transport.airports.map((airport) => (
                          <div key={airport} className="text-sm" style={{ color: 'var(--text-secondary, #4a5568)' }}>
                            ✈️ {airport}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {city.transport.trains && (
                    <div>
                      <h4 className="font-semibold mb-2">Train Stations</h4>
                      <div className="space-y-1">
                        {city.transport.trains.map((train) => (
                          <div key={train} className="text-sm" style={{ color: 'var(--text-secondary, #4a5568)' }}>
                            🚂 {train}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Landmarks */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary, #1a202c)' }}>
                  Landmarks
                </h3>
                <div className="space-y-2">
                  {city.landmarks.map((landmark) => (
                    <div key={landmark} className="text-sm" style={{ color: 'var(--text-secondary, #4a5568)' }}>
                      🏛️ {landmark}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <UKFooter />
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = UK_CITIES.map((city) => ({
    params: { city: city.slug }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<CityPageProps> = async ({ params }) => {
  const citySlug = params?.city as string;
  const city = UK_CITIES.find(c => c.slug === citySlug);

  if (!city) {
    return {
      notFound: true
    };
  }

  const seo = generateCitySEO(citySlug, city.name);

  return {
    props: {
      city,
      seo
    },
    revalidate: 3600 // Revalidate every hour
  };
};

export default CityPage;
