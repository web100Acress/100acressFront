import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import GlobalNavbar from '../src/country/modules/global/navbar/GlobalNavbar';
import GlobalFooter from '../src/country/modules/global/footer/GlobalFooter';
import { COUNTRIES } from '../src/country/config/countries';

interface HomePageProps {
  countries: Array<{
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
  }>;
}

const HomePage: NextPage<HomePageProps> = ({ countries }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <Head>
        <title>100acress Global - International Real Estate Platform</title>
        <meta name="description" content="Discover premium real estate properties across UK, USA, and Sri Lanka. Your trusted international property partner." />
        <meta name="keywords" content="international real estate, global property, UK homes, USA real estate, Sri Lanka property, 100acress" />
        <meta property="og:title" content="100acress Global - International Real Estate Platform" />
        <meta property="og:description" content="Discover premium real estate properties across UK, USA, and Sri Lanka." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://100acress.com" />
        <meta property="og:image" content="https://100acress.com/images/global-real-estate.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="100acress Global - International Real Estate Platform" />
        <meta name="twitter:description" content="Discover premium real estate properties across UK, USA, and Sri Lanka." />
        <meta name="twitter:image" content="https://100acress.com/images/global-real-estate.jpg" />
        <link rel="canonical" href="https://100acress.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "100acress Global",
              "description": "International real estate platform offering premium properties across UK, USA, and Sri Lanka",
              "url": "https://100acress.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://100acress.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-slate-50">
        <GlobalNavbar />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Find Your Dream Property
                <br />
                <span className="text-amber-400">Across the Globe</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Discover premium real estate properties in the UK, USA, and Sri Lanka. 
                Your trusted partner for international property investments.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/country/choose"
                  className="px-8 py-4 bg-amber-400 text-slate-900 font-bold rounded-lg hover:bg-amber-300 transition-all transform hover:scale-105"
                >
                  🌍 Choose Your Country
                </Link>
                <Link
                  href="/global/projects"
                  className="px-8 py-4 bg-white/20 backdrop-blur text-white font-bold rounded-lg hover:bg-white/30 transition-all border border-white/30"
                >
                  Browse All Projects
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Countries Section */}
        <section className="py-16 -mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Explore Properties by Country
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Select a country to explore local real estate opportunities
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {countries.map((country) => (
                <motion.div key={country.code} variants={itemVariants}>
                  <Link
                    href={`/country/${country.code}`}
                    className="group block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {/* Country Header */}
                    <div 
                      className="h-40 flex items-center justify-center"
                      style={{ 
                        background: `linear-gradient(135deg, ${country.colors.primary} 0%, ${country.colors.secondary} 100%)` 
                      }}
                    >
                      <span className="text-7xl">{country.flag}</span>
                    </div>
                    
                    {/* Country Info */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                          {country.name}
                        </h3>
                        <span className="text-sm font-medium px-3 py-1 bg-gray-100 rounded-full text-gray-600">
                          {country.shortName}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-6 line-clamp-2">
                        {country.seo.description}
                      </p>
                      
                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-slate-50 p-3 rounded-lg text-center">
                          <p className="text-xs text-gray-500 uppercase">Currency</p>
                          <p className="font-semibold text-gray-900">
                            {country.currencySymbol} {country.currency}
                          </p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg text-center">
                          <p className="text-xs text-gray-500 uppercase">Phone</p>
                          <p className="font-semibold text-gray-900">{country.phoneCode}</p>
                        </div>
                      </div>
                      
                      {/* CTA */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{country.domain}</span>
                        <span className="inline-flex items-center text-amber-600 font-semibold group-hover:translate-x-1 transition-transform">
                          Explore 
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose 100acress Global?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We provide comprehensive real estate services across multiple countries
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: '🌍',
                  title: 'Global Reach',
                  description: 'Access properties in UK, USA, Sri Lanka and more countries'
                },
                {
                  icon: '🏠',
                  title: 'Premium Properties',
                  description: 'Handpicked luxury properties in prime locations'
                },
                {
                  icon: '👥',
                  title: 'Expert Agents',
                  description: 'Local real estate experts with deep market knowledge'
                },
                {
                  icon: '🔒',
                  title: 'Secure Transactions',
                  description: 'Safe and transparent property transactions worldwide'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: '1800+', label: 'Properties' },
                { number: '175+', label: 'Cities' },
                { number: '3', label: 'Countries' },
                { number: '97%', label: 'Happy Clients' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <GlobalFooter />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const countries = Object.values(COUNTRIES).map(country => ({
    code: country.code,
    name: country.name,
    shortName: country.shortName,
    flag: country.flag,
    colors: country.colors,
    currency: country.currency,
    currencySymbol: country.currencySymbol,
    phoneCode: country.phoneCode,
    domain: country.domain,
    seo: country.seo
  }));

  return {
    props: {
      countries
    },
    revalidate: 3600 // Revalidate every hour
  };
};

export default HomePage;
