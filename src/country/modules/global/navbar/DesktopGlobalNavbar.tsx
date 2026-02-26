import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCountry } from '../../../providers';
import { COUNTRIES } from '../../../config/countries';
import { ChevronDown, Building, Home, Users, Star, ArrowRight, Search, X, Globe, MapPin, TrendingUp } from 'lucide-react';

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

const DesktopGlobalNavbar: React.FC = () => {
  const router = useNavigate();
  const { setGlobalMode, allCountries } = useCountry();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const isActive = (path: string): boolean => location.pathname === path;

  const handleMenuClick = (menu: string) => {
    if (activeMenu === menu) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menu);
    }
  };

  const handleMenuMouseEnter = (menu: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMenu(menu);
  };

  const handleMenuMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router(`/global/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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
          category: 'Featured Countries',
          icon: MapPin,
          links: [
            { label: 'UAE - Dubai & Abu Dhabi', href: '/country/ae', featured: true, badge: 'Tax Free' },
            { label: 'USA', href: '/country/us', featured: true, badge: 'EB-5 Visa' },
            { label: 'India', href: '/country/in', featured: true, badge: 'Emerging' },
            { label: 'Sri Lanka', href: '/country/lk', badge: 'Island Paradise' }
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

  return (
    <nav className="bg-white text-slate-900 fixed top-0 left-0 right-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Countries Mega Menu */}
            <div 
              className="relative"
              onMouseEnter={() => handleMenuMouseEnter('countries')}
              onMouseLeave={handleMenuMouseLeave}
            >
              <button 
                onClick={() => handleMenuClick('countries')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                  activeMenu === 'countries' 
                    ? 'bg-amber-500 text-white' 
                    : 'hover:text-amber-600 hover:bg-gray-50'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span className="font-medium">Countries</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                  activeMenu === 'countries' ? 'rotate-180' : ''
                }`} />
              </button>
              
              {activeMenu === 'countries' && (
                <div className="absolute top-full left-0 mt-2 w-screen max-w-4xl bg-white rounded-lg shadow-xl text-gray-900 border border-gray-100">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="text-base font-bold text-slate-900 flex items-center">
                          <Globe className="w-4 h-4 mr-1.5 text-amber-500" />
                          Explore Countries
                        </h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">50+ Countries</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Golden Visa</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {megaMenuData.countries.items.map((category, index) => (
                        <div key={index} className="bg-gray-50 rounded p-1.5 hover:bg-gray-100 transition-colors">
                          <h4 className="font-semibold text-slate-900 mb-1.5 flex items-center text-xs">
                            <MapPin className="w-2 h-2 mr-1 text-amber-500" />
                            {category.category}
                          </h4>
                          <ul className="space-y-1">
                            {category.links.map((link, linkIndex) => (
                              <li key={linkIndex}>
                                <Link
                                  to={link.href}
                                  className="flex items-center justify-between text-xs text-gray-600 hover:text-amber-600 transition-colors group p-1 rounded hover:bg-white"
                                >
                                  <div className="flex items-center">
                                    {link.featured && <Star className="w-1 h-1 mr-1 text-yellow-500" />}
                                    <span>{link.label}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    {link.badge && (
                                      <span className="px-1 py-0.5 bg-amber-100 text-amber-800 rounded text-xs font-medium">
                                        {link.badge}
                                      </span>
                                    )}
                                    <ArrowRight className="w-1 h-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-200">
                      <div className="flex items-center justify-end">
                        <div className="flex items-center space-x-2">
                          <Link
                            to="/country/choose"
                            className="bg-amber-500 hover:bg-amber-600 text-white px-2 py-1 rounded text-xs font-medium transition-colors flex items-center"
                          >
                            Browse All
                            <ArrowRight className="w-2 h-2 ml-1" />
                          </Link>
                          <Link
                            to="/global/consultation"
                            className="border border-amber-500 text-amber-500 hover:bg-amber-50 px-2 py-1 rounded text-xs font-medium transition-colors flex items-center"
                          >
                            Get Help
                            <ArrowRight className="w-2 h-2 ml-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Properties Mega Menu */}
            <div 
              className="relative"
              onMouseEnter={() => handleMenuMouseEnter('properties')}
              onMouseLeave={handleMenuMouseLeave}
            >
              <button 
                onClick={() => handleMenuClick('properties')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                  activeMenu === 'properties' 
                    ? 'bg-amber-500 text-white' 
                    : 'hover:text-amber-600 hover:bg-gray-50'
                }`}
              >
                <Building className="w-4 h-4" />
                <span className="font-medium">Properties</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                  activeMenu === 'properties' ? 'rotate-180' : ''
                }`} />
              </button>
              
              {activeMenu === 'properties' && (
                <div className="absolute top-full left-0 mt-2 w-screen max-w-4xl bg-white rounded-lg shadow-xl text-gray-900 border border-gray-100">
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="text-base font-bold text-slate-900 flex items-center">
                          <Building className="w-4 h-4 mr-1.5 text-amber-500" />
                          Find Your Property
                        </h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">10,000+ Properties</span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">Verified</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {megaMenuData.properties.items.map((category, index) => (
                        <div key={index} className="bg-gray-50 rounded p-1.5 hover:bg-gray-100 transition-colors">
                          <h4 className="font-semibold text-slate-900 mb-1.5 flex items-center text-xs">
                            {React.createElement(category.icon, { className: "w-2 h-2 mr-1 text-amber-500" })}
                            {category.category}
                          </h4>
                          <ul className="space-y-1">
                            {category.links.map((link, linkIndex) => (
                              <li key={linkIndex}>
                                <Link
                                  to={link.href}
                                  className="flex items-center justify-between text-xs text-gray-600 hover:text-amber-600 transition-colors group p-1 rounded hover:bg-white"
                                >
                                  <div className="flex items-center">
                                    {link.featured && <Star className="w-1 h-1 mr-1 text-yellow-500" />}
                                    <span>{link.label}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    {link.badge && (
                                      <span className="px-1 py-0.5 bg-amber-100 text-amber-800 rounded text-xs font-medium">
                                        {link.badge}
                                      </span>
                                    )}
                                    <ArrowRight className="w-1 h-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-200">
                      <div className="flex items-center justify-end">
                        <Link
                          to="/global/properties/search"
                          className="bg-amber-500 hover:bg-amber-600 text-white px-2 py-1 rounded text-xs font-medium transition-colors flex items-center"
                        >
                          Search Properties
                          <ArrowRight className="w-2 h-2 ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Services Mega Menu */}
            <div 
              className="relative"
              onMouseEnter={() => handleMenuMouseEnter('services')}
              onMouseLeave={handleMenuMouseLeave}
            >
              <button 
                onClick={() => handleMenuClick('services')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                  activeMenu === 'services' 
                    ? 'bg-amber-500 text-white' 
                    : 'hover:text-amber-600 hover:bg-gray-50'
                }`}
              >
                <Users className="w-4 h-4" />
                <span className="font-medium">Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                  activeMenu === 'services' ? 'rotate-180' : ''
                }`} />
              </button>
              
              {activeMenu === 'services' && (
                <div className="absolute top-full left-0 mt-2 w-screen max-w-4xl bg-white rounded-lg shadow-xl text-gray-900 border border-gray-100">
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="text-base font-bold text-slate-900 flex items-center">
                          <Users className="w-4 h-4 mr-1.5 text-amber-500" />
                          Professional Services
                        </h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">24/7 Support</span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Expert Team</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {megaMenuData.services.items.map((category, index) => (
                        <div key={index} className="bg-gray-50 rounded p-1.5 hover:bg-gray-100 transition-colors">
                          <h4 className="font-semibold text-slate-900 mb-1.5 flex items-center text-xs">
                            {React.createElement(category.icon, { className: "w-2 h-2 mr-1 text-amber-500" })}
                            {category.category}
                          </h4>
                          <ul className="space-y-1">
                            {category.links.map((link, linkIndex) => (
                              <li key={linkIndex}>
                                <Link
                                  to={link.href}
                                  className="flex items-center justify-between text-xs text-gray-600 hover:text-amber-600 transition-colors group p-1 rounded hover:bg-white"
                                >
                                  <div className="flex items-center">
                                    {link.featured && <Star className="w-1 h-1 mr-1 text-yellow-500" />}
                                    <span>{link.label}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    {link.badge && (
                                      <span className="px-1 py-0.5 bg-amber-100 text-amber-800 rounded text-xs font-medium">
                                        {link.badge}
                                      </span>
                                    )}
                                    <ArrowRight className="w-1 h-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-200">
                      <div className="flex items-center justify-end">
                        <Link
                          to="/global/services/consultation"
                          className="bg-slate-800 hover:bg-slate-700 text-white px-2 py-1 rounded text-xs font-medium transition-colors flex items-center"
                        >
                          Book Consultation
                          <ArrowRight className="w-2 h-2 ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Locations Mega Menu */}
            <div 
              className="relative"
              onMouseEnter={() => handleMenuMouseEnter('locations')}
              onMouseLeave={handleMenuMouseLeave}
            >
              <button 
                onClick={() => handleMenuClick('locations')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                  activeMenu === 'locations' 
                    ? 'bg-amber-500 text-white' 
                    : 'hover:text-amber-600 hover:bg-gray-50'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span className="font-medium">Locations</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                  activeMenu === 'locations' ? 'rotate-180' : ''
                }`} />
              </button>
              
              {activeMenu === 'locations' && (
                <div className="absolute top-full left-0 mt-2 w-screen max-w-4xl bg-white rounded-lg shadow-xl text-gray-900 border border-gray-100">
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="text-base font-bold text-slate-900 flex items-center">
                          <MapPin className="w-4 h-4 mr-1.5 text-amber-500" />
                          Prime Locations
                        </h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Trending</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Premium</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {megaMenuData.locations.items.map((category, index) => (
                        <div key={index} className="bg-gray-50 rounded p-1.5 hover:bg-gray-100 transition-colors">
                          <h4 className="font-semibold text-slate-900 mb-1.5 flex items-center text-xs">
                            {React.createElement(category.icon, { className: "w-2 h-2 mr-1 text-amber-500" })}
                            {category.category}
                          </h4>
                          <ul className="space-y-1">
                            {category.links.map((link, linkIndex) => (
                              <li key={linkIndex}>
                                <Link
                                  to={link.href}
                                  className="flex items-center justify-between text-xs text-gray-600 hover:text-amber-600 transition-colors group p-1 rounded hover:bg-white"
                                >
                                  <div className="flex items-center">
                                    {link.featured && <Star className="w-1 h-1 mr-1 text-yellow-500" />}
                                    <span>{link.label}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    {link.badge && (
                                      <span className="px-1 py-0.5 bg-amber-100 text-amber-800 rounded text-xs font-medium">
                                        {link.badge}
                                      </span>
                                    )}
                                    <ArrowRight className="w-1 h-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-200">
                      <div className="flex items-center justify-end">
                        <Link
                          to="/global/locations/map"
                          className="bg-amber-500 hover:bg-amber-600 text-white px-2 py-1 rounded text-xs font-medium transition-colors flex items-center"
                        >
                          View Map
                          <ArrowRight className="w-2 h-2 ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search properties, locations..."
                    className="w-64 px-4 py-2 pr-10 rounded-lg bg-gray-50 text-slate-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-2 text-gray-500 hover:text-slate-900"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-gray-600 hover:text-slate-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Country Selector Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors">
                <Globe className="w-4 h-4" />
                <span className="font-medium">Select Country</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                <div className="py-2">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Choose Your Country
                  </div>
                  {allCountries.slice(0, 6).map((country) => (
                    <Link
                      key={country.code}
                      to={`/country/${country.code}`}
                      className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-2xl mr-3">{country.flag}</span>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{country.name}</p>
                        <p className="text-xs text-gray-500">{country.domain}</p>
                      </div>
                    </Link>
                  ))}
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <Link
                      to="/country/choose"
                      className="block px-4 py-2 text-sm text-amber-600 hover:text-amber-700 font-medium text-center"
                    >
                      View All Countries →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DesktopGlobalNavbar;
