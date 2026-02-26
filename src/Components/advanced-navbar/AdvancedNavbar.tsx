'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  Home, 
  Search, 
  Building, 
  Phone, 
  User, 
  Menu, 
  X,
  ArrowRight,
  Star,
  Globe,
  Users,
  Mail
} from 'lucide-react';

interface NavItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  children?: NavItem[];
  badge?: string;
  featured?: boolean;
}

const navigationData: NavItem[] = [
  {
    label: 'Home',
    href: '/',
    icon: <Home className="w-4 h-4" />,
    children: [
      {
        label: 'Quick Links',
        children: [
          {
            label: 'Dashboard',
            children: [
              { label: 'My Profile', href: '/dashboard/profile', featured: true },
              { label: 'Saved Properties', href: '/dashboard/saved' },
              { label: 'Search History', href: '/dashboard/history' }
            ]
          }
        ]
      }
    ]
  },
  {
    label: 'Properties',
    icon: <Building className="w-4 h-4" />,
    children: [
      {
        label: 'Buy Property',
        children: [
          {
            label: 'Residential',
            children: [
              { label: 'Apartments', href: '/properties/apartments', featured: true },
              { label: 'Houses & Villas', href: '/properties/houses' }
            ]
          }
        ]
      }
    ]
  },
  {
    label: 'Countries',
    icon: <Globe className="w-4 h-4" />,
    children: [
      {
        label: 'UK Properties',
        children: [
          {
            label: 'London',
            children: [
              { label: 'Central London', href: '/uk/london/central', featured: true }
            ]
          }
        ]
      }
    ]
  },
  {
    label: 'Projects',
    icon: <Building className="w-4 h-4" />,
    children: [
      {
        label: 'All Projects',
        children: [
          {
            label: 'Featured',
            children: [
              { label: 'Luxury Villas', href: '/projects/luxury-villas', featured: true }
            ]
          }
        ]
      }
    ]
  },
  {
    label: 'About',
    icon: <Users className="w-4 h-4" />,
    children: [
      {
        label: 'Company',
        children: [
          {
            label: 'About Us',
            children: [
              { label: 'Our Story', href: '/about/story', featured: true }
            ]
          }
        ]
      }
    ]
  }
];

function MegaMenu(props: any) {
  const { item, isOpen, onClose } = props;

  if (!item.children || item.children.length === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.1 }}
          className="absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-gray-200 z-50"
        >
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-3 gap-8">
              {item.children.map((subItem: any, subIndex: number) => (
                <div key={subIndex} className="space-y-6">
                  {subItem.children && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">
                        {subItem.label}
                      </h4>
                      <ul className="space-y-2">
                        {subItem.children.map((child: any, childIndex: number) => (
                          <li key={childIndex}>
                            <a
                              href={child.href}
                              className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors group"
                            >
                              {child.featured && <Star className="w-3 h-3 mr-2 text-yellow-500" />}
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function AdvancedNavbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu(null);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleMenuEnter = (menuLabel: string) => {
    setActiveMenu(menuLabel);
  };

  const handleMenuLeave = () => {
    setActiveMenu(null);
  };

  const navbarClass = isScrolled 
    ? "fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-lg"
    : "fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-white shadow-md";

  return (
    <div>
      <nav className={navbarClass}>
        <div className="max-w-7xl mx-auto">
          <div className="border-b border-gray-200">
            <div className="px-4 py-2 flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <a href="tel:+442071234567" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                  <Phone className="w-4 h-4 mr-1" />
                  +44 20 7123 4567
                </a>
                <a href="mailto:info@100acress.com" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                  <Mail className="w-4 h-4 mr-1" />
                  info@100acress.com
                </a>
              </div>
            </div>
          </div>

          <div className="px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <a href="/" className="text-2xl font-bold text-blue-600">
                  100acress
                </a>
              </div>

              <div className="hidden lg:flex items-center space-x-1">
                {navigationData.map((item) => (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => handleMenuEnter(item.label)}
                    onMouseLeave={handleMenuLeave}
                  >
                    <button className="flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors text-gray-700 hover:text-blue-600 hover:bg-gray-50">
                      {item.icon && <span className="mr-2">{item.icon}</span>}
                      {item.label}
                      {item.children && (
                        <ChevronDown className="w-4 h-4 ml-1" />
                      )}
                    </button>

                    {item.children && (
                      <MegaMenu
                        item={item}
                        isOpen={activeMenu === item.label}
                        onClose={() => setActiveMenu(null)}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Search className="w-5 h-5" />
                </button>
                
                <button className="hidden md:flex items-center px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
                  <User className="w-4 h-4 mr-2" />
                  Login
                </button>

                <button
                  className="lg:hidden p-2 text-gray-600"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="h-20" />
    </div>
  );
}
