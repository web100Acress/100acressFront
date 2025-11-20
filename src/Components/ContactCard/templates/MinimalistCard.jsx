import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Globe, MapPin, MessageCircle } from 'lucide-react';

/**
 * Minimalist Card Template - Clean, Simple Design
 * Features: White background, subtle shadows, clean typography
 * Best for: Modern professionals, startups, tech companies
 */
const MinimalistCard = ({ contactData, resolveMediaUrl, getInitials }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
      {/* Simple Header */}
      <div className="p-8 text-center bg-gradient-to-br from-gray-50 to-white">
        {/* Profile Photo - Minimal */}
        <div className="relative inline-block mb-6">
          {contactData.profile_image_url ? (
            <img 
              src={resolveMediaUrl(contactData.profile_image_url)} 
              alt={contactData.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 border-4 border-white shadow-lg flex items-center justify-center">
              <span className="text-3xl font-bold text-gray-600">{getInitials(contactData.name)}</span>
            </div>
          )}
        </div>

        {/* Name - Clean Typography */}
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{contactData.name}</h1>
        
        {/* Designation */}
        {contactData.designation && (
          <p className="text-base text-gray-600 font-medium mb-1">{contactData.designation}</p>
        )}
        
        {/* Company */}
        {contactData.company && (
          <p className="text-sm text-gray-500">{contactData.company}</p>
        )}
      </div>

      {/* Bio - Minimal */}
      {contactData.bio && (
        <div className="px-8 py-6 bg-gray-50 border-y border-gray-100">
          <p className="text-gray-700 text-center text-sm leading-relaxed">{contactData.bio}</p>
        </div>
      )}

      {/* Contact Info - Clean List */}
      <div className="p-8 space-y-2">
        <MinimalContactButton href={`tel:${contactData.phone}`} icon={Phone} text={contactData.phone} />
        {contactData.whatsapp && (
          <MinimalContactButton href={`https://wa.me/${contactData.whatsapp.replace(/\D/g, '')}`} icon={MessageCircle} text={contactData.whatsapp} external />
        )}
        <MinimalContactButton href={`mailto:${contactData.email}`} icon={Mail} text={contactData.email} />
        {contactData.website && (
          <MinimalContactButton href={contactData.website} icon={Globe} text="Visit Website" external />
        )}
      </div>

      {/* Address - Minimal */}
      {contactData.address && Object.values(contactData.address).some(val => val) && (
        <div className="px-8 pb-8">
          <div className="flex items-start p-4 bg-gray-50 rounded-xl">
            <MapPin size={18} className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
            <div className="text-gray-600 text-sm space-y-0.5">
              {contactData.address.street && <p>{contactData.address.street}</p>}
              <p>{[contactData.address.city, contactData.address.state, contactData.address.zipCode].filter(Boolean).join(', ')}</p>
              {contactData.address.country && <p>{contactData.address.country}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const MinimalContactButton = ({ href, icon: Icon, text, external }) => (
  <motion.a
    href={href}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    whileHover={{ scale: 1.01, x: 2 }}
    whileTap={{ scale: 0.99 }}
    className="flex items-center p-3 bg-white hover:bg-gray-50 rounded-xl transition-all border border-gray-200 hover:border-gray-300 group"
  >
    <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-gray-200 mr-3 transition-colors">
      <Icon size={18} className="text-gray-600" />
    </div>
    <p className="text-gray-800 font-medium text-sm flex-1 truncate">{text}</p>
  </motion.a>
);

export default MinimalistCard;
