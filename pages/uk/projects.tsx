import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { UKNavbar } from '@/country/modules/country/navbar/UKNavbar';
import { UKFooter } from '@/country/modules/country/footer/UKFooter';
import { useFilters, buildApiQuery, UK_FILTER_OPTIONS } from '@/hooks/useFilters';
import { useOverlay } from '@/hooks/useOverlay';
import FilterOverlay from '@/components/filters/FilterOverlay';
import SearchOverlay from '@/components/search/SearchOverlay';
import FilterButton, { MobileFilterPills, DesktopFilterBar } from '@/components/filters/FilterButton';
import { UK_SEO } from './_seo';
import { generateBreadcrumbSchema, generateRealEstateListingSchema } from '../../src/seo/meta';
import { generateOrganizationSchema } from '../../src/seo/jsonld/organization';

// Mock property data - in real app, this would come from API
const MOCK_PROPERTIES = [
  {
    id: 'london-luxury-penthouse-1',
    name: 'Luxury Penthouse Mayfair',
    location: 'Mayfair, London',
    price: '£2,500,000',
    bedrooms: 3,
    bathrooms: 2,
    area: '2,100 sq ft',
    type: 'penthouse',
    city: 'london',
    image: '/uk/images/properties/london-penthouse.jpg',
    description: 'Stunning penthouse in the heart of Mayfair with panoramic city views',
    status: 'sale',
    featured: true
  },
  {
    id: 'manchester-city-apartment-1',
    name: 'Modern City Apartment',
    location: 'City Centre, Manchester',
    price: '£450,000',
    bedrooms: 2,
    bathrooms: 1,
    area: '950 sq ft',
    type: 'apartment',
    city: 'manchester',
    image: '/uk/images/properties/manchester-apartment.jpg',
    description: 'Contemporary apartment in Manchester\'s vibrant city centre',
    status: 'sale',
    featured: false
  },
  {
    id: 'birmingham-family-home-1',
    name: 'Family Home Edgbaston',
    location: 'Edgbaston, Birmingham',
    price: '£750,000',
    bedrooms: 4,
    bathrooms: 3,
    area: '1,800 sq ft',
    type: 'house',
    city: 'birmingham',
    image: '/uk/images/properties/birmingham-home.jpg',
    description: 'Spacious family home in prestigious Edgbaston area',
    status: 'sale',
    featured: false
  },
  {
    id: 'london-villa-kensington-1',
    name: 'Kensington Luxury Villa',
    location: 'Kensington, London',
    price: '£3,200,000',
    bedrooms: 5,
    bathrooms: 4,
    area: '3,500 sq ft',
    type: 'villa',
    city: 'london',
    image: '/uk/images/properties/kensington-villa.jpg',
    description: 'Elegant villa in prestigious Kensington with private garden',
    status: 'sale',
    featured: true
  },
  {
    id: 'bristol-harbourside-1',
    name: 'Harbourside Apartment',
    location: 'Harbourside, Bristol',
    price: '£380,000',
    bedrooms: 2,
    bathrooms: 2,
    area: '1,100 sq ft',
    image: '/uk/images/properties/bristol-harbourside.jpg',
    description: 'Modern apartment with stunning harbourside views',
    type: 'apartment',
    city: 'bristol',
    status: 'sale',
    featured: false
  },
  {
    id: 'london-studio-covent-garden-1',
    name: 'Covent Garden Studio',
    location: 'Covent Garden, London',
    price: '£320,000',
    bedrooms: 1,
    bathrooms: 1,
    area: '550 sq ft',
    type: 'studio',
    city: 'london',
    image: '/uk/images/properties/covent-garden-studio.jpg',
    description: 'Compact studio in the heart of Covent Garden',
    status: 'sale',
    featured: false
  }
];

interface UKProjectsPageProps {
  seo: typeof UK_SEO;
  initialProperties: typeof MOCK_PROPERTIES;
}

const UKProjectsPage: NextPage<UKProjectsPageProps> = ({ seo, initialProperties }) => {
  const router = useRouter();
  const { filters, hasActiveFilters, generateSeoUrl } = useFilters();
  const { overlay, openOverlay, closeOverlay } = useOverlay();
  const [properties, setProperties] = useState(initialProperties);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter properties based on URL parameters
  useEffect(() => {
    const filteredProperties = initialProperties.filter(property => {
      if (filters.city && property.city !== filters.city) return false;
      if (filters.type && property.type !== filters.type) return false;
      if (filters.bedrooms && property.bedrooms.toString() !== filters.bedrooms) return false;
      if (filters.status && property.status !== filters.status) return false;
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          property.name.toLowerCase().includes(searchLower) ||
          property.location.toLowerCase().includes(searchLower) ||
          property.description.toLowerCase().includes(searchLower)
        );
      }
      if (filters.price) {
        const [min, max] = filters.price.split('-').map(p => p.replace('+', ''));
        const priceNum = parseInt(property.price.replace(/[^0-9]/g, ''));
        
        if (min && priceNum < parseInt(min)) return false;
        if (max && priceNum > parseInt(max)) return false;
      }
      
      return true;
    });

    setProperties(filteredProperties);
  }, [filters, initialProperties]);

  // Generate dynamic SEO based on filters
  const generateDynamicSeo = () => {
    const { city, type, search } = filters;
    let title = 'Properties in UK | Real Estate | 100acress';
    let description = 'Discover premium properties across the UK. Find your dream home with 100acress.';
    
    if (city && type) {
      title = `${type.charAt(0).toUpperCase() + type.slice(1)}s in ${city.charAt(0).toUpperCase() + city.slice(1)} | UK Properties | 100acress`;
      description = `Find ${type} properties in ${city}. Browse our selection of premium ${type}s in ${city} with 100acress.`;
    } else if (city) {
      title = `Properties in ${city.charAt(0).toUpperCase() + city.slice(1)} | UK Real Estate | 100acress`;
      description = `Discover premium properties in ${city}. Find your dream home in ${city} with 100acress.`;
    } else if (type) {
      title = `${type.charAt(0).toUpperCase() + type.slice(1)}s for Sale in UK | 100acress`;
      description = `Browse ${type} properties for sale across the UK. Find your perfect ${type} with 100acress.`;
    } else if (search) {
      title = `Search Results for "${search}" | UK Properties | 100acress`;
      description = `Find properties matching "${search}" in the UK. Search results from 100acress.`;
    }
    
    return { title, description };
  };

  const dynamicSeo = generateDynamicSeo();
  const breadcrumbs = [
    { name: 'Home', url: 'https://100acress.com' },
    { name: 'UK', url: 'https://100acress.com/uk' },
    { name: 'Properties', url: 'https://100acress.com/uk/projects' }
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const organizationSchema = generateOrganizationSchema('uk', 'en_GB');
  const listingSchema = generateRealEstateListingSchema(
    properties.map(property => ({
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
        <title>{dynamicSeo.title}</title>
        <meta name="description" content={dynamicSeo.description} />
        <meta name="keywords" content={seo.keywords?.join(', ') || ''} />
        
        {/* Open Graph */}
        <meta property="og:title" content={dynamicSeo.title} />
        <meta property="og:description" content={dynamicSeo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://100acress.com/uk/projects${generateSeoUrl()}`} />
        <meta property="og:image" content={`https://100acress.com${seo.ogImage}`} />
        <meta property="og:locale" content={seo.locale} />
        
        {/* Canonical URL with filters */}
        <link rel="canonical" href={`https://100acress.com/uk/projects${generateSeoUrl()}`} />
        
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
      </Head>

      <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary, #ffffff)' }}>
        <UKNavbar />
        
        {/* Page Header */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {hasActiveFilters ? 'Filtered Properties' : 'All UK Properties'}
              </h1>
              <p className="text-lg opacity-90">
                {hasActiveFilters 
                  ? `Showing ${properties.length} properties matching your criteria`
                  : `Discover ${properties.length} premium properties across the UK`
                }
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter Bar */}
        <DesktopFilterBar 
          onFilterClick={() => openOverlay('filters')}
          onSearchClick={() => openOverlay('search')}
        />

        {/* Mobile Filter Pills */}
        {isMobile && (
          <MobileFilterPills 
            onFilterClick={() => openOverlay('filters')}
            onSearchClick={() => openOverlay('search')}
          />
        )}

        {/* Properties Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-gray-600">Loading properties...</p>
              </div>
            ) : properties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div 
                      className="h-48 bg-cover bg-center relative"
                      style={{ 
                        backgroundImage: `url(${property.image})`,
                        backgroundColor: 'var(--accent-light, #eff6ff)'
                      }}
                    >
                      {property.featured && (
                        <span className="absolute top-4 left-4 px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-semibold rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {property.name}
                        </h3>
                        <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                          {property.bedrooms} Beds
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">
                        📍 {property.location}
                      </p>
                      
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {property.description}
                      </p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-blue-600">
                          {property.price}
                        </span>
                        <span className="text-sm text-gray-600">
                          {property.area}
                        </span>
                      </div>
                      
                      <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={() => openOverlay('filters')}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Adjust Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Overlays */}
        <FilterOverlay 
          isOpen={overlay.isOpen && overlay.type === 'filters'}
          onClose={closeOverlay}
          isMobile={isMobile}
        />
        
        <SearchOverlay 
          isOpen={overlay.isOpen && overlay.type === 'search'}
          onClose={closeOverlay}
          isMobile={isMobile}
        />

        <UKFooter />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<UKProjectsPageProps> = async () => {
  return {
    props: {
      seo: UK_SEO,
      initialProperties: MOCK_PROPERTIES
    },
    revalidate: 3600 // Revalidate every hour
  };
};

export default UKProjectsPage;
