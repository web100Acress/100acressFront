import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCountry } from '../../../providers';

const UKHero: React.FC = () => {
  const { currentCountry } = useCountry();

  return (
    <section 
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, var(--accent-primary, #1e40af) 0%, var(--accent-secondary, #3b82f6) 100%)` 
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-3xl">{currentCountry?.flag || '🇬🇧'}</span>
              <span className="text-white text-lg font-semibold">
                {currentCountry?.name || 'United Kingdom'}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Find Your Dream
              <br />
              <span className="text-amber-300">Property in the UK</span>
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Discover premium properties across the United Kingdom. From London's 
              vibrant apartments to countryside estates, find your perfect home with 
              100acress UK.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href="/properties"
                className="px-8 py-4 bg-amber-400 text-slate-900 font-bold rounded-lg hover:bg-amber-300 transition-all transform hover:scale-105 text-center"
              >
                Browse Properties
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-white/20 backdrop-blur text-white font-bold rounded-lg hover:bg-white/30 transition-all text-center border border-white/30"
              >
                Talk to Expert
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-300">500+</div>
                <div className="text-blue-100 text-sm">Properties</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-300">50+</div>
                <div className="text-blue-100 text-sm">Cities</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-300">98%</div>
                <div className="text-blue-100 text-sm">Happy Clients</div>
              </div>
            </div>
          </motion.div>

          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div 
                className="h-96 bg-cover bg-center"
                style={{ 
                  backgroundImage: `url('/images/uk-property-hero.jpg')`,
                  backgroundColor: '#1e40af'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute bottom-6 left-6 right-6 bg-white rounded-lg p-4 shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500">Featured Property</div>
                    <div className="font-bold text-gray-900">London Luxury Apartment</div>
                    <div className="text-2xl font-bold text-blue-600">£850,000</div>
                  </div>
                  <Link
                    href="/properties/london-luxury-apartment"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { UKHero };
