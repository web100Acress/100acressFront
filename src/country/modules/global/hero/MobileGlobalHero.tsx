import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCountry } from '../../../providers';
import { Globe, Building, ArrowRight } from 'lucide-react';

const MobileGlobalHero: React.FC = () => {
  const { allCountries } = useCountry();

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen flex items-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 animate-pulse">
          <div className="w-16 h-16 bg-amber-500/20 rounded-full blur-2xl"></div>
        </div>
        <div className="absolute top-1/3 right-10 animate-pulse delay-1000">
          <div className="w-12 h-12 bg-blue-500/20 rounded-full blur-2xl"></div>
        </div>
        <div className="absolute bottom-20 left-1/4 animate-pulse delay-2000">
          <div className="w-8 h-8 bg-purple-500/20 rounded-full blur-2xl"></div>
        </div>
      </div>

      <div className="relative z-10 w-full px-4 py-12">
        <div className="text-center max-w-md mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-3 py-2 bg-amber-500/10 backdrop-blur-md rounded-full mb-6 border border-amber-500/20"
          >
            <Globe className="w-4 h-4 mr-2 text-amber-400" />
            <span className="text-amber-400 text-sm font-medium">🌍 International</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold text-white mb-4 leading-tight"
          >
            Find Your Dream
            <span className="block text-amber-400 text-2xl">Worldwide</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-300 mb-8 max-w-sm mx-auto leading-relaxed"
          >
            Discover premium real estate across the globe with expert guidance.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-3 justify-center items-center mb-12"
          >
            <Link
              to="/country/choose"
              className="group relative px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              <span className="flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                Choose Country
              </span>
              <ArrowRight className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/global/projects"
              className="group relative px-6 py-3 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-bold rounded-lg transition-all duration-300 border border-white/20"
            >
              <span className="flex items-center">
                <Building className="w-4 h-4 mr-2" />
                Browse Projects
              </span>
              <ArrowRight className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
              <div className="text-center bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                <div className="text-2xl font-bold text-amber-400 mb-1">50+</div>
                <div className="text-xs text-gray-400">Countries</div>
              </div>
              <div className="text-center bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                <div className="text-2xl font-bold text-amber-400 mb-1">10K+</div>
                <div className="text-xs text-gray-400">Properties</div>
              </div>
              <div className="text-center bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                <div className="text-2xl font-bold text-amber-400 mb-1">24/7</div>
                <div className="text-xs text-gray-400">Support</div>
              </div>
              <div className="text-center bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                <div className="text-2xl font-bold text-amber-400 mb-1">98%</div>
                <div className="text-xs text-gray-400">Satisfaction</div>
              </div>
            </div>
          </motion.div>

          {/* Mobile Country Quick Access */}
          <motion.div
            initial={{ opacity: 0, y: 90 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-2 gap-3 max-w-xs mx-auto"
          >
            {allCountries.slice(0, 4).map((country, index) => (
              <Link
                key={country.code}
                to={`/country/${country.code}`}
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg p-3 transition-all duration-300 border border-white/20"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{country.flag}</div>
                  <h4 className="text-sm font-bold text-white">{country.name}</h4>
                </div>
              </Link>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          >
            <div className="animate-bounce">
              <ArrowRight className="w-5 h-5 text-white/60 rotate-90" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MobileGlobalHero;
