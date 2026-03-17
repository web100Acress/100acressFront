import React from 'react';
import { Helmet } from 'react-helmet-async';
import '../branded/BrandedResidences.css';

const UpcomingProjects = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": "Upcoming Projects in Gurgaon 2026",
    "description": "Explore verified upcoming projects in Gurgaon featuring luxury apartments, modern residences, and affordable housing options across Dwarka Expressway and New Gurgaon with world-class amenities.",
    "url": "https://www.100acress.com/projects/upcoming/",
    "provider": {
      "@type": "RealEstateAgent",
      "name": "100acress",
      "url": "https://www.100acress.com"
    },
    "address": {
      "@type": "Place",
      "name": "Gurgaon, Haryana, India"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/PreOrder",
      "priceCurrency": "INR",
      "description": "Pre-launch pricing and exclusive payment plans available"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.100acress.com/projects/upcoming/"
    }
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Upcoming Projects in Gurgaon 2026 | New Launches & Pre-Launch Offers | 100acress</title>
        <meta name="description" content="Explore verified upcoming projects in Gurgaon 2026 featuring luxury apartments, modern residences, and affordable housing options across Dwarka Expressway and New Gurgaon. Pre-launch pricing, RERA approved, world-class amenities." />
        <meta name="keywords" content="upcoming projects in Gurgaon 2026, new launches Gurgaon, pre-launch projects, future developments Gurgaon, Dwarka Expressway projects, New Gurgaon projects, luxury apartments Gurgaon, affordable housing Gurgaon, RERA approved projects, real estate investment Gurgaon" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://www.100acress.com/projects/upcoming/" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Upcoming Projects in Gurgaon 2026 | New Launches & Pre-Launch Offers" />
        <meta property="og:description" content="Discover verified upcoming projects in Gurgaon with exclusive pre-launch pricing. Luxury apartments, modern residences across Dwarka Expressway and New Gurgaon." />
        <meta property="og:url" content="https://www.100acress.com/projects/upcoming/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="100acress" />
        <meta property="og:image" content="https://www.100acress.com/images/upcoming-projects-gurgaon.jpg" />
        <meta property="og:image:alt" content="Upcoming Projects in Gurgaon 2026" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Upcoming Projects in Gurgaon 2026 | New Launches & Pre-Launch Offers" />
        <meta name="twitter:description" content="Explore verified upcoming projects in Gurgaon with exclusive pre-launch pricing. RERA approved projects across prime locations." />
        <meta name="twitter:image" content="https://www.100acress.com/images/upcoming-projects-gurgaon.jpg" />
        <meta name="twitter:image:alt" content="Upcoming Projects in Gurgaon 2026" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="author" content="100acress" />
        <meta name="language" content="English" />
        <meta name="geo.region" content="HR" />
        <meta name="geo.placename" content="Gurgaon" />
        <meta name="geo.position" content="28.4595;77.0266" />
        <meta name="ICBM" content="28.4595, 77.0266" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        
        {/* Additional Structured Data for Breadcrumbs */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.100acress.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Projects",
                "item": "https://www.100acress.com/projects"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Upcoming Projects",
                "item": "https://www.100acress.com/projects/upcoming/"
              }
            ]
          })}
        </script>
        
        {/* Hreflang Tags */}
        <link rel="alternate" hreflang="en" href="https://www.100acress.com/projects/upcoming/" />
        <link rel="alternate" hreflang="x-default" href="https://www.100acress.com/projects/upcoming/" />
      </Helmet>

      <div className="branded-residences-container">
        <header className="hero-section" style={{minHeight: '300px'}}>
          <div className="hero-content">
            <h1 className="hero-title">Upcoming Projects in Gurgaon 2026</h1>
            <p className="hero-subtitle">Future Developments & Pre-Launch Opportunities | RERA Approved</p>
          </div>
        </header>

        <main className="content-section">
          <div className="content-wrapper">
            <section className="text-center mb-6">
              <h2 className="section-title">Upcoming Projects in Gurgaon</h2>
              <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-4"></div>
              <p className="text-xl text-gray-600 max-w-5xl mx-auto leading-relaxed">
                Explore verified upcoming projects in Gurgaon featuring luxury apartments, modern residences, and affordable housing options across Dwarka Expressway and New Gurgaon. These upcoming residential projects in Gurgaon 2026 are designed with world-class amenities, excellent road and metro connectivity, and strong future appreciation potential.
              </p>
            </section>
            
            <div className="description-content">
              <article className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6">
                <h3 className="feature-title text-2xl font-bold text-gray-900 mb-3 text-center">
                  🚀 Why Is the Gurgaon Real Estate Market Booming?
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="description-paragraph text-base leading-relaxed">
                      Over the last decade, Gurgaon has transformed into one of India's fastest-growing real estate destinations. With the presence of leading MNCs, IT hubs, and commercial corridors, the demand for quality housing has increased significantly.
                    </p>
                  </div>
                  <div>
                    <p className="description-paragraph text-base leading-relaxed">
                      Key developments such as the Dwarka Expressway, Delhi-Mumbai Expressway, Metro expansion, and upcoming business districts are reshaping the city. These factors make upcoming projects in Gurgaon 2026 highly attractive for professionals, families, and long-term investors.
                    </p>
                  </div>
                </div>
              </article>

              <article className="bg-white rounded-xl shadow-lg p-4 mb-6 border border-gray-100">
                <h3 className="feature-title text-2xl font-bold text-gray-900 mb-4 text-center">
                  💎 Why Invest in Upcoming Projects in Gurgaon?
                </h3>
                <p className="description-paragraph text-base text-center mb-4 max-w-4xl mx-auto">
                  Investing in upcoming projects provides multiple advantages, especially in a high-growth market like Gurgaon:
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 border-l-4 border-blue-600">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm">🏘️</span>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900">Wide Property Choices</h4>
                    </div>
                    <p className="description-paragraph text-sm text-gray-700">
                      Upcoming projects in Gurgaon offer a diverse range of housing options, including smartly designed 2 BHK homes and expansive 3 & 4 BHK luxury residences, ensuring choices for different budgets and lifestyle needs.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 border-l-4 border-green-600">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm">🚇</span>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900">Infrastructure Growth</h4>
                    </div>
                    <p className="description-paragraph text-sm text-gray-700">
                      Improved road networks, metro connectivity, and new commercial hubs are driving property appreciation across Gurgaon's prime locations.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 border-l-4 border-purple-600">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm">📈</span>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900">High Appreciation Potential</h4>
                    </div>
                    <p className="description-paragraph text-sm text-gray-700">
                      Early investment in upcoming projects in 2026 often results in better price appreciation by possession, maximizing your returns.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3 border-l-4 border-orange-600">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm">💼</span>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900">Strong Rental Demand</h4>
                    </div>
                    <p className="description-paragraph text-sm text-gray-700">
                      Gurgaon's corporate ecosystem ensures consistent rental demand across major locations, providing steady income streams.
                    </p>
                  </div>
                </div>
              </article>

              <article className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 mb-6">
                <h3 className="feature-title text-2xl font-bold text-gray-900 mb-4 text-center">
                  📍 Top Locations for Upcoming Projects in Gurgaon
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-3 shadow hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-sm">🛣️</span>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900">Dwarka Expressway</h4>
                    </div>
                    <p className="description-paragraph text-sm text-gray-700">
                      One of the most promising real estate corridors, Dwarka Expressway offers excellent connectivity to Delhi and IGI Airport. Many luxury upcoming projects in Gurgaon are launching here with premium amenities.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3 shadow hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-sm">🏙️</span>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900">New Gurgaon</h4>
                    </div>
                    <p className="description-paragraph text-sm text-gray-700">
                      Known for planned infrastructure and peaceful surroundings, New Gurgaon is ideal for families seeking value-driven upcoming residential projects.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3 shadow hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-sm">⛳</span>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900">Golf Course Extension Road</h4>
                    </div>
                    <p className="description-paragraph text-sm text-gray-700">
                      This location is preferred for premium living, offering upscale apartments, social infrastructure, and strong appreciation prospects.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3 shadow hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-sm">🔄</span>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900">Southern Peripheral Road (SPR)</h4>
                    </div>
                    <p className="description-paragraph text-sm text-gray-700">
                      SPR connects key sectors of Gurgaon and hosts several upcoming projects in 2026 with a balance of lifestyle and investment benefits.
                    </p>
                  </div>
                </div>
              </article>

              <article className="bg-white rounded-xl shadow-lg p-4 mb-6 border border-gray-100">
                <h3 className="feature-title text-2xl font-bold text-gray-900 mb-4 text-center">
                  🏊 Amenities Offered in Upcoming Projects 2026
                </h3>
                <p className="description-paragraph text-base text-center mb-4 max-w-4xl mx-auto">
                  Most upcoming projects in Gurgaon are designed to deliver a modern lifestyle, featuring:
                </p>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { icon: '🏊', title: 'Clubhouse and Swimming Pool', desc: 'Modern recreational facilities' },
                    { icon: '💪', title: 'Gymnasium and Wellness Zones', desc: 'State-of-the-art fitness equipment' },
                    { icon: '🌳', title: 'Landscaped Gardens', desc: 'Beautifully designed green spaces' },
                    { icon: '🏃', title: 'Jogging Tracks', desc: 'Dedicated tracks for exercise' },
                    { icon: '🎮', title: 'Children\'s Play Areas', desc: 'Safe play zones for kids' },
                    { icon: '🛡️', title: '24×7 Security', desc: 'Advanced security systems' }
                  ].map((amenity, index) => (
                    <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-3 hover:shadow-md transition-shadow duration-300 border border-gray-200">
                      <div className="text-3xl mb-2 text-center">{amenity.icon}</div>
                      <h4 className="text-sm font-bold text-gray-900 mb-1 text-center">{amenity.title}</h4>
                      <p className="text-xs text-gray-600 text-center">{amenity.desc}</p>
                    </div>
                  ))}
                </div>
                
                <p className="description-paragraph text-base text-center mt-4 text-gray-700">
                  These amenities enhance both living comfort and property value, making these projects ideal for modern living.
                </p>
              </article>

              <article className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 mb-6">
                <h3 className="feature-title text-2xl font-bold text-gray-900 mb-4 text-center">
                  💡 Investment Tips for Upcoming Projects in Gurgaon
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-3 shadow border-l-4 border-yellow-500">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm">📋</span>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900">Check RERA Registration</h4>
                    </div>
                    <p className="description-paragraph text-sm text-gray-700">
                      Always verify that the upcoming project is RERA-approved for transparency and legal safety. This ensures compliance with regulatory standards.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3 shadow border-l-4 border-green-500">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm">🔍</span>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900">Understand the Offering</h4>
                    </div>
                    <p className="description-paragraph text-sm text-gray-700">
                      Review carpet area, project density, and amenities rather than relying only on brochures. Get detailed information about what you're investing in.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3 shadow border-l-4 border-blue-500">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm">🏗️</span>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900">Site Visit Matters</h4>
                    </div>
                    <p className="description-paragraph text-sm text-gray-700">
                      Visiting the project location helps evaluate connectivity, surroundings, and future growth potential. Make an informed decision by seeing the actual site.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3 shadow border-l-4 border-purple-500">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm">⏰</span>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900">Choose the Right Timing</h4>
                    </div>
                    <p className="description-paragraph text-sm text-gray-700">
                      Pre-launch and early-stage upcoming projects in 2026 usually offer better pricing, while near-possession projects suit buyers needing immediate occupancy.
                    </p>
                  </div>
                </div>
              </article>

              <footer className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-4 text-white text-center">
                <h3 className="feature-title text-2xl font-bold mb-3">
                  🤝 Why Choose 100acress for Upcoming Projects in Gurgaon?
                </h3>
                <p className="description-paragraph text-lg leading-relaxed max-w-4xl mx-auto">
                  100acress is a trusted real estate platform showcasing verified and RERA-approved upcoming projects in Gurgaon. We work with reputed developers and provide accurate project details, expert guidance, and personalized support to help you make confident property decisions.
                </p>
                <div className="mt-4">
                  <a 
                    href="https://www.100acress.com/projects/upcoming/" 
                    className="inline-flex items-center bg-white text-blue-600 px-6 py-2 rounded-lg font-bold text-base hover:bg-gray-100 transition-colors duration-300"
                    aria-label="Explore upcoming projects in Gurgaon"
                  >
                    <span className="mr-2">🏠</span>
                    Explore Premium Projects
                  </a>
                </div>
              </footer>
            </div>

            <aside className="features-grid mt-8">
              <div className="feature-card bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4">
                <div className="feature-icon text-3xl">🚀</div>
                <h3 className="feature-title text-lg font-bold">Early Bird Pricing</h3>
                <p className="feature-description text-sm">Get exclusive pre-launch discounts and special payment plans</p>
              </div>
              
              <div className="feature-card bg-gradient-to-br from-green-500 to-green-600 text-white p-4">
                <div className="feature-icon text-3xl">📈</div>
                <h3 className="feature-title text-lg font-bold">High Growth Prospects</h3>
                <p className="feature-description text-sm">High growth prospects and premium returns on investment</p>
              </div>
              
              <div className="feature-card bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4">
                <div className="feature-icon text-3xl">🔑</div>
                <h3 className="feature-title text-lg font-bold">Early Access</h3>
                <p className="feature-description text-sm">Be the first to book these premium properties</p>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </>
  );
};

export default UpcomingProjects;
