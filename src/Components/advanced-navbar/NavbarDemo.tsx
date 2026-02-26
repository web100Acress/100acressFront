'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdvancedNavbar from './AdvancedNavbar';
import { Building, MapPin, TrendingUp, Star, Phone, Mail, Globe } from 'lucide-react';

export default function NavbarDemo() {
  const [showInstructions, setShowInstructions] = useState(true);

  return (
    <>
      <AdvancedNavbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-blue-100 rounded-full">
                <Building className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Advanced
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {' '}Navbar
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Experience the next-generation navigation with smooth transitions, 
              keyboard support, and intuitive mega menus
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Explore Properties
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Watch Demo
              </motion.button>
            </div>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <FeatureCard
              icon={<Globe className="w-6 h-6" />}
              title="Multi-Level Navigation"
              description="Nested menus with smooth transitions and hover effects"
            />
            <FeatureCard
              icon={<Star className="w-6 h-6" />}
              title="Keyboard Support"
              description="Full keyboard navigation with arrow keys and shortcuts"
            />
            <FeatureCard
              icon={<TrendingUp className="w-6 h-6" />}
              title="Performance Optimized"
              description="Lightning fast with minimal re-renders and smooth animations"
            />
          </motion.div>
        </div>

        {/* Instructions Toggle */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={() => setShowInstructions(!showInstructions)}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm text-gray-600 hover:bg-white transition-colors"
        >
          {showInstructions ? 'Hide' : 'Show'} Instructions
        </motion.button>
      </section>

      {/* Instructions Panel */}
      <AnimatePresence>
        {showInstructions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-30 max-w-md w-full mx-4"
          >
            <div className="bg-white rounded-xl shadow-2xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Keyboard Navigation</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Navigate menus</span>
                  <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">↑↓</kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Expand/Collapse</span>
                  <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">→←</kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Select item</span>
                  <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Enter</kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Close menus</span>
                  <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Esc</kbd>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">Mouse Navigation</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Hover over menu items to expand</li>
                  <li>• Click to toggle mobile menu</li>
                  <li>• Smooth transitions on all interactions</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Demo Content Sections */}
      <DemoSection
        title="Properties Section"
        description="Browse our extensive collection of premium properties"
        icon={<Building className="w-8 h-8" />}
      />
      
      <DemoSection
        title="Locations Section"
        description="Find properties in your preferred locations"
        icon={<MapPin className="w-8 h-8" />}
        bgColor="bg-gray-50"
      />
      
      <DemoSection
        title="Services Section"
        description="Comprehensive real estate services at your fingertips"
        icon={<Star className="w-8 h-8" />}
      />
    </>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
    >
      <div className="flex justify-center mb-4 text-blue-600">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </motion.div>
  );
}

interface DemoSectionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor?: string;
}

function DemoSection({ title, description, icon, bgColor = 'bg-white' }: DemoSectionProps) {
  return (
    <section className={`py-20 ${bgColor}`}>
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-blue-100 rounded-full text-blue-600">
              {icon}
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: item * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
            >
              <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-400"></div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Premium Property {item}
                </h3>
                <p className="text-gray-600 mb-4">
                  Experience luxury living with our exclusive properties
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">
                    £{item * 250},000
                  </span>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
