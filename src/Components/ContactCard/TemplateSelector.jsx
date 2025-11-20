import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Briefcase, Minimize2, Palette } from 'lucide-react';

/**
 * Template Selector Component
 * Allows users to choose from different card templates
 */
const TemplateSelector = ({ selectedTemplate, onSelect }) => {
  const [hoveredTemplate, setHoveredTemplate] = useState(null);

  const templates = [
    {
      id: 'modern',
      name: 'Modern Glassmorphism',
      description: 'Sleek glassmorphism design with smooth animations',
      icon: Sparkles,
      preview: '/templates/modern-preview.png',
      color: 'from-indigo-500 to-purple-500',
      features: ['Glassmorphism UI', 'Auto Dark Mode', 'Smooth Animations'],
      bestFor: 'General professionals, tech companies'
    },
    {
      id: 'executive',
      name: 'Executive Premium',
      description: 'Elegant dark theme with gold accents',
      icon: Briefcase,
      preview: '/templates/executive-preview.png',
      color: 'from-slate-700 to-amber-600',
      features: ['Dark Theme', 'Gold Accents', 'Premium Feel'],
      bestFor: 'C-level executives, senior management'
    },
    {
      id: 'minimalist',
      name: 'Minimalist Clean',
      description: 'Simple, clean design with white background',
      icon: Minimize2,
      preview: '/templates/minimalist-preview.png',
      color: 'from-gray-400 to-gray-600',
      features: ['Clean Layout', 'White Background', 'Simple Typography'],
      bestFor: 'Startups, modern professionals'
    },
    {
      id: 'creative',
      name: 'Creative Colorful',
      description: 'Vibrant gradients with playful animations',
      icon: Palette,
      preview: '/templates/creative-preview.png',
      color: 'from-pink-500 via-purple-500 to-blue-500',
      features: ['Vibrant Colors', 'Animated Blobs', 'Bold Design'],
      bestFor: 'Designers, marketers, creative professionals'
    }
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Choose Card Template</h3>
        <p className="text-sm text-gray-600">Select a design template that matches your professional style</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => {
          const Icon = template.icon;
          const isSelected = selectedTemplate === template.id;
          const isHovered = hoveredTemplate === template.id;

          return (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setHoveredTemplate(template.id)}
              onHoverEnd={() => setHoveredTemplate(null)}
              onClick={() => onSelect(template.id)}
              className={`relative cursor-pointer rounded-2xl p-5 transition-all duration-300 ${
                isSelected
                  ? 'bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-500 shadow-lg'
                  : 'bg-white border-2 border-gray-200 hover:border-indigo-300 shadow-md hover:shadow-lg'
              }`}
            >
              {/* Selection Indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Check size={18} className="text-white" />
                </motion.div>
              )}

              {/* Template Icon */}
              <div className={`inline-flex p-3 rounded-xl mb-3 bg-gradient-to-br ${template.color}`}>
                <Icon size={24} className="text-white" />
              </div>

              {/* Template Info */}
              <h4 className="text-lg font-bold text-gray-800 mb-1">{template.name}</h4>
              <p className="text-sm text-gray-600 mb-3">{template.description}</p>

              {/* Features */}
              <div className="space-y-1.5 mb-3">
                {template.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-xs text-gray-600">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></div>
                    {feature}
                  </div>
                ))}
              </div>

              {/* Best For */}
              <div className="pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  <span className="font-semibold">Best for:</span> {template.bestFor}
                </p>
              </div>

              {/* Hover Effect */}
              {isHovered && !isSelected && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-2xl pointer-events-none"
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Template Preview Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Sparkles size={20} className="text-blue-600" />
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-blue-900 mb-1">Template Preview</h4>
            <p className="text-xs text-blue-700 leading-relaxed">
              After creating your card, you can preview it at <code className="bg-blue-100 px-1.5 py-0.5 rounded">100acress.com/hi/your-slug</code>. 
              You can change the template anytime from the admin panel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
