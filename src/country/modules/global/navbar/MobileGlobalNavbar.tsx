import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCountry } from '../../../providers';
import { ChevronDown, Building, Home, Users, Star, ArrowRight, Search, X, Menu, Globe, MapPin, TrendingUp } from 'lucide-react';

interface MegaMenuLink {
  label: string;
  href: string;
  featured?: boolean;
  badge?: string;
}

interface MegaMenuCategory {
  category: string;
  icon: any;
  links: MegaMenuLink[];
}

interface MegaMenuSection {
  title: string;
  icon: any;
  items: MegaMenuCategory[];
}

const MobileGlobalNavbar: React.FC = () => {
  const router = useNavigate();
  const { setGlobalMode, allCountries } = useCountry();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  const isActive = (path: string): boolean => location.pathname === path;

  const megaMenuData: Record<string, MegaMenuSection> = {
    properties: {
      title: 'Properties',
      icon: Building,
      items: [
        {
          category: 'Residential',
          icon: Home,
          links: [
            { label: 'Luxury Apartments', href: '/global/properties/residential/apartments', featured: true, badge: 'HOT' },
            { label: 'Houses & Villas', href: '/global/properties/residential/houses' },
            { label: 'Penthouses', href: '/global/properties/residential/penthouses' },
            { label: 'Townhouses', href: '/global/properties/residential/townhouses' },
            { label: 'Beachfront Properties', href: '/global/properties/residential/beachfront', featured: true }
          ]
        },
        {
          category: 'Commercial',
          icon: Building,
          links: [
            { label: 'Office Spaces', href: '/global/properties/commercial/office', badge: 'NEW' },
            { label: 'Retail Properties', href: '/global/properties/commercial/retail' },
            { label: 'Industrial & Warehouses', href: '/global/properties/commercial/industrial' },
            { label: 'Hotels & Hospitality', href: '/global/properties/commercial/hotels' },
            { label: 'Mixed-Use Buildings', href: '/global/properties/commercial/mixed' }
          ]
        },
        {
          category: 'Investment',
          icon: TrendingUp,
          links: [
            { label: 'Off-Plan Properties', href: '/global/properties/investment/offplan', featured: true, badge: 'ROI 8%' },
            { label: 'Buy-to-Let', href: '/global/properties/investment/buylet' },
            { label: 'Student Housing', href: '/global/properties/investment/student' },
            { label: 'Holiday Homes', href: '/global/properties/investment/holiday' },
            { label: 'REIT Investments', href: '/global/properties/investment/reit' }
          ]
        }
      ]
    },
    countries: {
      title: 'Countries',
      icon: Globe,
      items: [
        {
          category: 'Middle East',
          icon: MapPin,
          links: [
            { label: 'UAE - Dubai & Abu Dhabi', href: '/country/ae', featured: true, badge: 'Tax Free' },
            { label: 'Saudi Arabia', href: '/country/sa', badge: 'Vision 2030' },
            { label: 'Qatar', href: '/country/qa' },
            { label: 'Oman', href: '/country/om' },
            { label: 'Bahrain', href: '/country/bh' }
          ]
        },
        {
          category: 'Europe',
          icon: MapPin,
          links: [
            { label: 'United Kingdom', href: '/country/uk', featured: true, badge: 'Golden Visa' },
            { label: 'Germany', href: '/country/de' },
            { label: 'France', href: '/country/fr' },
            { label: 'Spain', href: '/country/es' },
            { label: 'Portugal', href: '/country/pt', badge: 'Popular' }
          ]
        },
        {
          category: 'Asia Pacific',
          icon: MapPin,
          links: [
            { label: 'Singapore', href: '/country/sg', featured: true, badge: 'Stable' },
            { label: 'Malaysia', href: '/country/my' },
            { label: 'Thailand', href: '/country/th' },
            { label: 'India', href: '/country/in' },
            { label: 'Japan', href: '/country/jp' }
          ]
        },
        {
          category: 'Americas',
          icon: MapPin,
          links: [
            { label: 'USA', href: '/country/us', featured: true, badge: 'EB-5 Visa' },
            { label: 'Canada', href: '/country/ca' },
            { label: 'Brazil', href: '/country/br' },
            { label: 'Mexico', href: '/country/mx' },
            { label: 'Panama', href: '/country/pa', badge: 'Tax Haven' }
          ]
        }
      ]
    },
    services: {
      title: 'Services',
      icon: Users,
      items: [
        {
          category: 'For Buyers',
          icon: Home,
          links: [
            { label: 'Property Search', href: '/global/services/buyers/search', featured: true, badge: 'AI Powered' },
            { label: 'Virtual Tours', href: '/global/services/buyers/virtual' },
            { label: 'Mortgage Assistance', href: '/global/services/buyers/mortgage' },
            { label: 'Legal Services', href: '/global/services/buyers/legal' },
            { label: 'Property Inspection', href: '/global/services/buyers/inspection' }
          ]
        },
        {
          category: 'For Sellers',
          icon: TrendingUp,
          links: [
            { label: 'Property Valuation', href: '/global/services/sellers/valuation', badge: 'Free' },
            { label: 'Marketing & Listing', href: '/global/services/sellers/marketing' },
            { label: 'International Buyers', href: '/global/services/sellers/international' },
            { label: 'Premium Services', href: '/global/services/sellers/premium', featured: true },
            { label: 'Auction Services', href: '/global/services/sellers/auction' }
          ]
        },
        {
          category: 'Additional',
          icon: Star,
          links: [
            { label: 'Property Management', href: '/global/services/additional/management' },
            { label: 'Relocation Services', href: '/global/services/additional/relocation', featured: true, badge: 'End-to-End' },
            { label: 'Interior Design', href: '/global/services/additional/interior' },
            { label: 'Renovation Services', href: '/global/services/additional/renovation' },
            { label: 'Insurance Services', href: '/global/services/additional/insurance' }
          ]
        }
      ]
    },
    locations: {
      title: 'Locations',
      icon: MapPin,
      items: [
        {
          category: 'Trending Cities',
          icon: TrendingUp,
          links: [
            { label: 'Dubai, UAE', href: '/global/locations/dubai', featured: true, badge: 'Top Choice' },
            { label: 'London, UK', href: '/global/locations/london' },
            { label: 'New York, USA', href: '/global/locations/newyork' },
            { label: 'Singapore', href: '/global/locations/singapore' },
            { label: 'Miami, USA', href: '/global/locations/miami', badge: 'Hot Market' }
          ]
        },
        {
          category: 'Emerging Markets',
          icon: Globe,
          links: [
            { label: 'Istanbul, Turkey', href: '/global/locations/istanbul' },
            { label: 'Bangkok, Thailand', href: '/global/locations/bangkok' },
            { label: 'Lisbon, Portugal', href: '/global/locations/lisbon', featured: true, badge: 'Golden Visa' },
            { label: 'Mexico City', href: '/global/locations/mexicocity' },
            { label: 'Dubai Marina', href: '/global/locations/dubaimarina' }
          ]
        },
        {
          category: 'By Lifestyle',
          icon: Star,
          links: [
            { label: 'Beachfront Living', href: '/global/locations/beachfront', featured: true },
            { label: 'City Centers', href: '/global/locations/city' },
            { label: 'Suburban Areas', href: '/global/locations/suburban' },
            { label: 'Golf Communities', href: '/global/locations/golf' },
            { label: 'Student Areas', href: '/global/locations/student' }
          ]
        }
      ]
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router(`/global/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50">
      <div className="px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={setGlobalMode}>
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold text-slate-900">100</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold">acress</span>
              <span className="text-xs text-amber-400">GLOBAL</span>
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="p-2 text-gray-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="bg-slate-800 border-t border-slate-700">
          <div className="px-4 py-6 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search properties, locations..."
                className="flex-1 px-4 py-2 rounded-l-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-r-lg transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>

            {/* Mobile Navigation with Expandable Sections */}
            <div className="space-y-2">
              {/* Countries Section */}
              <div className="bg-slate-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('countries')}
                  className="w-full flex items-center justify-between px-4 py-3 text-white hover:bg-slate-600 transition-colors"
                >
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 mr-3 text-amber-400" />
                    <span className="font-medium">Countries</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${
                    expandedSection === 'countries' ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {expandedSection === 'countries' && (
                  <div className="px-4 py-3 space-y-3">
                    {megaMenuData.countries.items.map((category, index) => (
                      <div key={index}>
                        <h5 className="text-xs font-semibold text-amber-400 mb-2 uppercase tracking-wider">
                          {category.category}
                        </h5>
                        <div className="space-y-1">
                          {category.links.map((link, linkIndex) => (
                            <Link
                              key={linkIndex}
                              to={link.href}
                              className="flex items-center justify-between text-sm text-gray-300 hover:text-white py-1"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <div className="flex items-center">
                                {link.featured && <Star className="w-3 h-3 mr-2 text-yellow-500" />}
                                <span>{link.label}</span>
                              </div>
                              {link.badge && (
                                <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-xs font-medium">
                                  {link.badge}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Properties Section */}
              <div className="bg-slate-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('properties')}
                  className="w-full flex items-center justify-between px-4 py-3 text-white hover:bg-slate-600 transition-colors"
                >
                  <div className="flex items-center">
                    <Building className="w-4 h-4 mr-3 text-amber-400" />
                    <span className="font-medium">Properties</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${
                    expandedSection === 'properties' ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {expandedSection === 'properties' && (
                  <div className="px-4 py-3 space-y-3">
                    {megaMenuData.properties.items.map((category, index) => (
                      <div key={index}>
                        <h5 className="text-xs font-semibold text-amber-400 mb-2 uppercase tracking-wider">
                          {category.category}
                        </h5>
                        <div className="space-y-1">
                          {category.links.map((link, linkIndex) => (
                            <Link
                              key={linkIndex}
                              to={link.href}
                              className="flex items-center justify-between text-sm text-gray-300 hover:text-white py-1"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <div className="flex items-center">
                                {link.featured && <Star className="w-3 h-3 mr-2 text-yellow-500" />}
                                <span>{link.label}</span>
                              </div>
                              {link.badge && (
                                <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-xs font-medium">
                                  {link.badge}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Services Section */}
              <div className="bg-slate-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('services')}
                  className="w-full flex items-center justify-between px-4 py-3 text-white hover:bg-slate-600 transition-colors"
                >
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-3 text-amber-400" />
                    <span className="font-medium">Services</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${
                    expandedSection === 'services' ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {expandedSection === 'services' && (
                  <div className="px-4 py-3 space-y-3">
                    {megaMenuData.services.items.map((category, index) => (
                      <div key={index}>
                        <h5 className="text-xs font-semibold text-amber-400 mb-2 uppercase tracking-wider">
                          {category.category}
                        </h5>
                        <div className="space-y-1">
                          {category.links.map((link, linkIndex) => (
                            <Link
                              key={linkIndex}
                              to={link.href}
                              className="flex items-center justify-between text-sm text-gray-300 hover:text-white py-1"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <div className="flex items-center">
                                {link.featured && <Star className="w-3 h-3 mr-2 text-yellow-500" />}
                                <span>{link.label}</span>
                              </div>
                              {link.badge && (
                                <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-xs font-medium">
                                  {link.badge}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Locations Section */}
              <div className="bg-slate-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('locations')}
                  className="w-full flex items-center justify-between px-4 py-3 text-white hover:bg-slate-600 transition-colors"
                >
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-3 text-amber-400" />
                    <span className="font-medium">Locations</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${
                    expandedSection === 'locations' ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {expandedSection === 'locations' && (
                  <div className="px-4 py-3 space-y-3">
                    {megaMenuData.locations.items.map((category, index) => (
                      <div key={index}>
                        <h5 className="text-xs font-semibold text-amber-400 mb-2 uppercase tracking-wider">
                          {category.category}
                        </h5>
                        <div className="space-y-1">
                          {category.links.map((link, linkIndex) => (
                            <Link
                              key={linkIndex}
                              to={link.href}
                              className="flex items-center justify-between text-sm text-gray-300 hover:text-white py-1"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <div className="flex items-center">
                                {link.featured && <Star className="w-3 h-3 mr-2 text-yellow-500" />}
                                <span>{link.label}</span>
                              </div>
                              {link.badge && (
                                <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-xs font-medium">
                                  {link.badge}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Country Selector */}
            <div className="border-t border-slate-600 pt-4">
              <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Quick Country Access
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {allCountries.slice(0, 4).map((country) => (
                  <Link
                    key={country.code}
                    to={`/country/${country.code}`}
                    className="flex items-center px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="text-lg mr-2">{country.flag}</span>
                    {country.name}
                  </Link>
                ))}
              </div>
              <Link
                to="/country/choose"
                className="block mt-3 px-4 py-2 text-center text-amber-400 hover:text-amber-300 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                View All Countries →
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MobileGlobalNavbar;
