import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { UKNavbar } from '@/country/modules/country/navbar/UKNavbar';
import { UKHero } from '@/country/modules/country/hero/UKHero';
import { UKFooter } from '@/country/modules/country/footer/UKFooter';
import { UK_SEO } from './_seo';
import { UK_HOME_CONTENT } from '@/content/uk/home';
import { generateBreadcrumbSchema, generateRealEstateListingSchema } from '../../src/seo/meta';
import { generateOrganizationSchema } from '../../src/seo/jsonld/organization';

interface UKHomePageProps {
  seo: typeof UK_SEO;
  content: typeof UK_HOME_CONTENT;
}

const UKHomePage: NextPage<UKHomePageProps> = ({ seo, content }) => {
  const breadcrumbs = [
    { name: 'Home', url: 'https://100acress.com' },
    { name: 'UK', url: 'https://100acress.com/uk' }
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const organizationSchema = generateOrganizationSchema('uk', 'en_GB');
  const listingSchema = generateRealEstateListingSchema(
    content.featuredProperties.properties.map(property => ({
      name: property.name,
      description: property.description,
      price: property.price,
      currency: 'GBP',
      url: `https://100acress.com/uk/projects/${property.id}`,
      image: property.image,
      address: property.location
    }))
  );

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords?.join(', ') || ''} />
        
        {/* Open Graph */}
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seo.canonical} />
        <meta property="og:image" content={`https://100acress.com${seo.ogImage}`} />
        <meta property="og:locale" content={seo.locale} />
        <meta property="og:site_name" content="100acress UK" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={`https://100acress.com${seo.ogImage}`} />
        <meta name="twitter:site" content="@100acressUK" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={seo.canonical} />
        
        {/* Hreflang for international SEO */}
        {seo.alternateUrls?.map((alt: { hrefLang: string; url: string }) => (
          <link
            key={alt.hrefLang}
            rel="alternate"
            hrefLang={alt.hrefLang}
            href={alt.url}
          />
        ))}
        
        {/* Additional SEO meta tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="100acress UK" />
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content="United Kingdom" />
        <meta name="geo.position" content="54.0;-2.0" />
        <meta name="ICBM" content="54.0,-2.0" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(listingSchema) }}
        />
        
        {/* Additional structured data for UK real estate */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: '100acress UK',
              url: 'https://100acress.com/uk',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://100acress.com/uk/search?q={search_term_string}',
                'query-input': 'required name=search_term_string'
              },
              mainEntity: {
                '@type': 'RealEstateAgent',
                name: '100acress UK',
                url: 'https://100acress.com/uk',
                address: {
                  '@type': 'PostalAddress',
                  addressCountry: 'GB',
                  addressLocality: 'London'
                },
                telephone: '+44 20 7123 4567',
                email: 'uk@100acress.com'
              }
            })
          }}
        />
      </Head>

      <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary, #ffffff)' }}>
        <UKNavbar />
        <UKHero />
        
        {/* Featured Properties Section */}
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
                {content.featuredProperties.title}
              </h2>
              <p className="text-lg" style={{ color: 'var(--text-secondary, #4a5568)' }}>
                {content.featuredProperties.subtitle}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.featuredProperties.properties.map((property, index) => (
                <motion.article
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div 
                    className="h-48 bg-cover bg-center"
                    style={{ 
                      backgroundImage: `url(${property.image})`,
                      backgroundColor: 'var(--accent-light, #eff6ff)'
                    }}
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary, #1a202c)' }}>
                        {property.name}
                      </h3>
                      <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                        {property.bedrooms} Beds
                      </span>
                    </div>
                    <p className="text-sm mb-3" style={{ color: 'var(--text-secondary, #4a5568)' }}>
                      📍 {property.location}
                    </p>
                    <p className="text-sm mb-4" style={{ color: 'var(--text-secondary, #4a5568)' }}>
                      {property.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold" style={{ color: 'var(--accent-primary, #1e40af)' }}>
                        {property.price}
                      </span>
                      <span className="text-sm" style={{ color: 'var(--text-secondary, #4a5568)' }}>
                        {property.area}
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
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Cities Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary, #1a202c)' }}>
                {content.cities.title}
              </h2>
              <p className="text-lg" style={{ color: 'var(--text-secondary, #4a5568)' }}>
                {content.cities.subtitle}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.cities.cities.map((city, index) => (
                <motion.div
                  key={city.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/uk/cities/${city.slug}`}>
                    <div className="group cursor-pointer">
                      <div 
                        className="h-40 bg-cover bg-center rounded-xl mb-4 group-hover:shadow-lg transition-shadow duration-300"
                        style={{ backgroundImage: `url(${city.image})` }}
                      >
                        <div className="h-full bg-gradient-to-t from-black/60 to-transparent rounded-xl flex items-end p-4">
                          <div className="text-white">
                            <h3 className="text-xl font-bold">{city.name}</h3>
                            <p className="text-sm opacity-90">{city.propertyCount} Properties</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm mb-2" style={{ color: 'var(--text-secondary, #4a5568)' }}>
                        {city.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold" style={{ color: 'var(--accent-primary, #1e40af)' }}>
                          {city.avgPrice}
                        </span>
                        <span className="text-sm text-blue-600 group-hover:text-blue-800 transition-colors">
                          Explore →
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
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
                {content.services.title}
              </h2>
              <p className="text-lg" style={{ color: 'var(--text-secondary, #4a5568)' }}>
                {content.services.subtitle}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {content.services.services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary, #1a202c)' }}>
                    {service.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary, #4a5568)' }}>
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {Object.entries(content.stats).map(([key, value], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl md:text-5xl font-bold mb-2">
                    {value}
                  </div>
                  <div className="text-blue-100 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <UKFooter />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<UKHomePageProps> = async () => {
  return {
    props: {
      seo: UK_SEO,
      content: UK_HOME_CONTENT
    },
    revalidate: 3600 // Revalidate every hour
  };
};

export default UKHomePage;
