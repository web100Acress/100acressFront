import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Globe, MapPin, MessageCircle, Sparkles } from 'lucide-react';

/**
 * Creative Card Template - Bold, Colorful Design
 * Features: Vibrant gradients, playful animations, modern UI
 * Best for: Creative professionals, designers, marketers
 */
const CreativeCard = ({ contactData, resolveMediaUrl, getInitials }) => {
  const brandColor = contactData.brandColor || '#E31E24';
  
  return (
    <div className="relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 50, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-br from-pink-400/30 to-purple-400/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, -50, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl"
        />
      </div>

      <div className="relative backdrop-blur-xl bg-white/80 rounded-3xl shadow-2xl overflow-hidden border border-white/50">
        {/* Colorful Top Wave */}
        <div className="h-32 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${brandColor}, ${brandColor}dd)` }}>
          <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 120" fill="none">
            <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" fill="rgba(255,255,255,0.8)"/>
          </svg>
          
          {/* Floating Sparkles */}
          <motion.div
            animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-4 right-4"
          >
            <Sparkles size={24} className="text-white/70" />
          </motion.div>
        </div>

        {/* Profile Section - Overlapping */}
        <div className="relative -mt-16 text-center px-8">
          {/* Profile Photo with Colorful Ring */}
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 rounded-full blur-lg opacity-40 animate-pulse"></div>
            {contactData.profile_image_url ? (
              <img 
                src={resolveMediaUrl(contactData.profile_image_url)} 
                alt={contactData.name}
                className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-2xl ring-4 ring-white/50"
              />
            ) : (
              <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 border-4 border-white shadow-2xl ring-4 ring-white/50 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">{getInitials(contactData.name)}</span>
              </div>
            )}
          </div>

          {/* Name with Gradient */}
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            {contactData.name}
          </h1>
          
          {/* Designation with Badge */}
          {contactData.designation && (
            <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full mb-2">
              <p className="text-sm font-semibold text-purple-700">{contactData.designation}</p>
            </div>
          )}
          
          {/* Company */}
          {contactData.company && (
            <p className="text-sm text-gray-600 font-medium">{contactData.company}</p>
          )}
        </div>

        {/* Bio - Colorful Box */}
        {contactData.bio && (
          <div className="mx-8 my-6 p-4 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-2xl border border-purple-100">
            <p className="text-gray-700 text-center text-sm leading-relaxed">{contactData.bio}</p>
          </div>
        )}

        {/* Contact Info - Colorful Cards */}
        <div className="px-8 pb-8 space-y-3">
          <CreativeContactButton href={`tel:${contactData.phone}`} icon={Phone} text={contactData.phone} gradient="from-green-400 to-emerald-500" />
          {contactData.whatsapp && (
            <CreativeContactButton href={`https://wa.me/${contactData.whatsapp.replace(/\D/g, '')}`} icon={MessageCircle} text={contactData.whatsapp} gradient="from-green-400 to-teal-500" external />
          )}
          <CreativeContactButton href={`mailto:${contactData.email}`} icon={Mail} text={contactData.email} gradient="from-blue-400 to-cyan-500" />
          {contactData.website && (
            <CreativeContactButton href={contactData.website} icon={Globe} text="Visit Website" gradient="from-purple-400 to-pink-500" external />
          )}
        </div>

        {/* Colorful Bottom Wave */}
        <div className="h-2 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400"></div>
      </div>
    </div>
  );
};

const CreativeContactButton = ({ href, icon: Icon, text, gradient, external }) => (
  <motion.a
    href={href}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    whileHover={{ scale: 1.03, y: -2 }}
    whileTap={{ scale: 0.97 }}
    className="flex items-center p-4 bg-white hover:bg-gray-50 rounded-2xl transition-all shadow-md hover:shadow-lg border border-gray-100 group"
  >
    <div className={`bg-gradient-to-br ${gradient} p-3 rounded-xl mr-4 shadow-md group-hover:shadow-lg transition-shadow`}>
      <Icon size={20} className="text-white" />
    </div>
    <p className="text-gray-800 font-semibold text-base flex-1 truncate">{text}</p>
  </motion.a>
);

export default CreativeCard;
