import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { USANavbar } from '@/country/modules/country/navbar/USANavbar';
import { USAHero } from '@/country/modules/country/hero/USAHero';
import { USAFooter } from '@/country/modules/country/footer/USAFooter';
import { COUNTRIES, getCountryByCode } from '@/country/config/countries';

interface USAHomePageProps {
  country: {
    code: string;
    name: string;
    shortName: string;
    flag: string;
    colors: {
      primary: string;
      secondary: string;
    };
    currency: string;
    currencySymbol: string;
    phoneCode: string;
    domain: string;
    seo: {
      title: string;
      description: string;
      keywords: string[];
    };
    navigation: Array<{
      name: string;
      path: string;
    }>;
    contact: {
      phone: string;
      email: string;
      address: string;
    };
  };
}

const USAHomePage: NextPage<USAHomePageProps> = ({ country }) => {
  return (
    <>
      <Head>
        <title>{country.seo.title}</title>
        <meta name="description" content={country.seo.description} />
        <meta name="keywords" content={country.seo.keywords.join(', ')} />
        <meta property="og:title" content={country.seo.title} />
        <meta property="og:description" content={country.seo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://100acress.com/country/usa`} />
        <meta property="og:image" content={`https://100acress.com/images/usa-real-estate.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={country.seo.title} />
        <meta name="twitter:description" content={country.seo.description} />
        <meta name="twitter:image" content={`https://100acress.com/images/usa-real-estate.jpg`} />
        <link rel="canonical" href={`https://100acress.com/country/usa`} />
      </Head>

      <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary, #ffffff)' }}>
        <USANavbar />
        <USAHero />
        
        {/* Featured Properties */}
        <section className="py-16" style={{ backgroundColor: 'var(--bg-secondary, #fef2f2)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary, #1a202c)' }}>
                Featured Properties in {country.name}
              </h2>
              <p className="text-lg" style={{ color: 'var(--text-secondary, #4a5568)' }}>
                Discover our handpicked selection of premium USA properties
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: item * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div 
                    className="h-48 bg-cover bg-center"
                    style={{ 
                      backgroundImage: `url('/images/properties/usa-${item}.jpg')`,
                      backgroundColor: 'var(--accent-light, #fef2f2)'
                    }}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary, #1a202c)' }}>
                      Luxury Property {item}
                    </h3>
                    <p className="mb-4" style={{ color: 'var(--text-secondary, #4a5568)' }}>
                      Experience premium living in the heart of {country.name}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold" style={{ color: 'var(--accent-primary, #dc2626)' }}>
                        {country.currencySymbol}{(750000 + item * 150000).toLocaleString()}
                      </span>
                      <Link
                        href={`/properties/usa/${item}`}
                        className="inline-flex items-center px-4 py-2 rounded-lg font-semibold transition-colors"
                        style={{ 
                          backgroundColor: 'var(--accent-primary, #dc2626)',
                          color: 'var(--accent-text, #ffffff)'
                        }}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <USAFooter />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<USAHomePageProps> = async () => {
  const country = getCountryByCode('usa');
  
  if (!country) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      country: {
        code: country.code,
        name: country.name,
        shortName: country.shortName,
        flag: country.flag,
        colors: country.colors,
        currency: country.currency,
        currencySymbol: country.currencySymbol,
        phoneCode: country.phoneCode,
        domain: country.domain,
        seo: country.seo,
        navigation: country.navigation,
        contact: country.contact
      }
    },
    revalidate: 3600
  };
};

export default USAHomePage;
