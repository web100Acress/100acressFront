import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCountry } from '../../../providers';

interface NavItem {
  name: string;
  path: string;
}

const UKNavbar: React.FC = () => {
  const router = useRouter();
  const { currentCountry, setGlobalMode } = useCountry();
  
  const isActive = (path: string): boolean => router.pathname === path;

  const navigation: NavItem[] = currentCountry?.navigation || [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50" style={{ backgroundColor: 'var(--bg-primary, #ffffff)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ 
                background: 'linear-gradient(135deg, var(--accent-primary, #1e40af) 0%, var(--accent-secondary, #3b82f6) 100%)' 
              }}
            >
              <span className="text-xl font-bold text-white">100</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold" style={{ color: 'var(--text-primary, #1a202c)' }}>
                acress
              </span>
              <span className="text-xs font-semibold" style={{ color: 'var(--accent-primary, #1e40af)' }}>
                {currentCountry?.shortName || 'UK'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link 
                key={item.path}
                href={item.path} 
                className={`transition-colors font-medium ${
                  isActive(item.path) 
                    ? 'text-amber-600' 
                    : 'hover:text-amber-600'
                }`}
                style={{ 
                  color: isActive(item.path) 
                    ? 'var(--accent-primary, #1e40af)' 
                    : 'var(--text-primary, #1a202c)'
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/country/choose"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors"
              style={{ 
                borderColor: 'var(--accent-primary, #1e40af)',
                color: 'var(--accent-primary, #1e40af)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-primary, #1e40af)';
                e.currentTarget.style.color = 'var(--accent-text, #ffffff)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--accent-primary, #1e40af)';
              }}
            >
              <span>🌍</span>
              <span>Global</span>
            </Link>
            
            <button
              className="px-6 py-2 rounded-lg font-semibold text-white transition-colors"
              style={{ 
                backgroundColor: 'var(--accent-primary, #1e40af)',
                color: 'var(--accent-text, #ffffff)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-secondary, #3b82f6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-primary, #1e40af)';
              }}
            >
              List Property
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" style={{ color: 'var(--text-primary, #1a202c)' }}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export { UKNavbar };
