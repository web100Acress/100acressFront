import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCountry } from '../../../providers';
import { Globe, MapPin, Home, Building, TrendingUp, ArrowRight } from 'lucide-react';

const DesktopGlobalHero: React.FC = () => {
  const { allCountries } = useCountry();

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-[90vh] flex items-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 animate-pulse">
          <div className="w-32 h-32 bg-amber-500/20 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute top-1/4 right-20 animate-pulse delay-1000">
          <div className="w-24 h-24 bg-blue-500/20 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute bottom-32 left-1/3 animate-pulse delay-2000">
          <div className="w-16 h-16 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>
        
        {/* Grid Pattern for Desktop */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      <div className="relative z-10 w-full px-8 py-20">
        <div className="text-center max-w-7xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-6 py-3 bg-amber-500/10 backdrop-blur-md rounded-full mb-8 border border-amber-500/20"
          >
            <Globe className="w-5 h-5 mr-3 text-amber-400" />
            <span className="text-amber-400 text-base font-medium">🌍 International Real Estate</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-tight"
          >
            Find Your Dream Property
            <span className="block text-amber-400 text-4xl lg:text-5xl xl:text-6xl">Worldwide</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Discover premium real estate across the globe. From London to New York, 
            Dubai to Singapore - your dream home awaits with expert guidance.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link
              href="/country/choose"
              className="group relative px-8 py-4 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl text-base"
            >
              <span className="flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Choose Your Country
              </span>
              <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/global/projects"
              className="group relative px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-bold rounded-lg transition-all duration-300 border border-white/20 text-base"
            >
              <span className="flex items-center">
                <Building className="w-5 h-5 mr-2" />
                Browse All Projects
              </span>
              <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <div className="grid grid-cols-4 gap-6 max-w-6xl mx-auto">
              <div className="text-center bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <div className="text-3xl lg:text-4xl font-bold text-amber-400 mb-2">50+</div>
                <div className="text-sm text-gray-400">Countries</div>
              </div>
              <div className="text-center bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <div className="text-3xl lg:text-4xl font-bold text-amber-400 mb-2">10K+</div>
                <div className="text-sm text-gray-400">Premium Properties</div>
              </div>
              <div className="text-center bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <div className="text-3xl lg:text-4xl font-bold text-amber-400 mb-2">24/7</div>
                <div className="text-sm text-gray-400">Expert Support</div>
              </div>
              <div className="text-center bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <div className="text-3xl lg:text-4xl font-bold text-amber-400 mb-2">98%</div>
                <div className="text-sm text-gray-400">Client Satisfaction</div>
              </div>
            </div>
          </motion.div>

          {/* Country Preview - Enhanced for Desktop */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <MapPin className="w-6 h-6 mr-3 text-amber-400" />
                Popular Destinations
              </h3>
              <div className="grid grid-cols-3 gap-6">
                {allCountries.slice(0, 6).map((country, index) => (
                  <Link
                    key={country.code}
                    href={`/country/${country.code}`}
                    className="group bg-white/10 hover:bg-white/20 rounded-xl p-6 transition-all duration-300 border border-white/20"
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-3">{country.flag}</div>
                      <h4 className="text-lg font-bold text-white mb-2">{country.name}</h4>
                      <p className="text-sm text-gray-400 mb-4 line-clamp-2">{country.seo.description}</p>
                      <div className="flex items-center justify-center text-amber-400 font-semibold group-hover:translate-x-1 transition-transform">
                        Explore
                        <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-6">
                <Link
                  href="/country/choose"
                  className="inline-flex items-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  View All Countries
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          >
            <div className="animate-bounce">
              <ArrowRight className="w-6 h-6 text-white/60 rotate-90" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DesktopGlobalHero;
