import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Globe, MapPin, Briefcase, Award, MessageCircle } from 'lucide-react';

/**
 * Executive Card Template - Premium, Professional Design
 * Features: Dark theme, gold accents, elegant layout
 * Best for: C-level executives, senior management
 */
const ExecutiveCard = ({ contactData, resolveMediaUrl, getInitials }) => {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-amber-500/20">
      {/* Gold Top Bar */}
      <div className="h-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600"></div>
      
      {/* Header */}
      <div className="relative p-8 pb-6">
        {contactData.company_logo_url && (
          <div className="absolute top-6 right-6">
            <img src={resolveMediaUrl(contactData.company_logo_url)} alt="Logo" className="h-10 w-auto opacity-90" />
          </div>
        )}

        <div className="text-center pt-4">
          {/* Profile Photo with Gold Ring */}
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
            {contactData.profile_image_url ? (
              <img src={resolveMediaUrl(contactData.profile_image_url)} alt={contactData.name}
                className="relative w-36 h-36 rounded-full object-cover border-4 border-amber-500 shadow-2xl ring-4 ring-amber-500/20" />
            ) : (
              <div className="relative w-36 h-36 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border-4 border-amber-500 shadow-2xl ring-4 ring-amber-500/20 flex items-center justify-center">
                <span className="text-4xl font-bold text-amber-400">{getInitials(contactData.name)}</span>
              </div>
            )}
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">{contactData.name}</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full mb-3"></div>
          
          {contactData.designation && (
            <div className="flex items-center justify-center text-amber-400 text-lg font-medium mb-2">
              <Briefcase size={18} className="mr-2" />
              {contactData.designation}
            </div>
          )}
        </div>
      </div>

      {/* Bio */}
      {contactData.bio && (
        <div className="px-8 py-6 bg-slate-800/50 border-y border-amber-500/10">
          <div className="flex items-start">
            <Award size={20} className="text-amber-500 mr-3 mt-1 flex-shrink-0" />
            <p className="text-gray-300 text-base leading-relaxed italic">"{contactData.bio}"</p>
          </div>
        </div>
      )}

      {/* Contact Info */}
      <div className="p-8 space-y-3">
        <ContactButton href={`tel:${contactData.phone}`} icon={Phone} text={contactData.phone} color="green" />
        {contactData.whatsapp && (
          <ContactButton href={`https://wa.me/${contactData.whatsapp.replace(/\D/g, '')}`} icon={MessageCircle} text={contactData.whatsapp} color="green" external />
        )}
        <ContactButton href={`mailto:${contactData.email}`} icon={Mail} text={contactData.email} color="blue" />
        {contactData.website && (
          <ContactButton href={contactData.website} icon={Globe} text="Visit Website" color="purple" external />
        )}
      </div>

      {/* Gold Bottom Bar */}
      <div className="h-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600"></div>
    </div>
  );
};

const ContactButton = ({ href, icon: Icon, text, color, external }) => (
  <motion.a
    href={href}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    whileHover={{ scale: 1.02, x: 5 }}
    whileTap={{ scale: 0.98 }}
    className="flex items-center p-4 bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl hover:from-slate-600 hover:to-slate-700 transition-all border border-amber-500/20 hover:border-amber-500/40 group"
  >
    <div className={`bg-gradient-to-br from-${color}-500 to-${color}-600 p-3 rounded-xl mr-4 shadow-lg group-hover:shadow-${color}-500/50 transition-shadow`}>
      <Icon size={20} className="text-white" />
    </div>
    <p className={`text-${color}-400 font-semibold text-lg flex-1 truncate`}>{text}</p>
  </motion.a>
);

export default ExecutiveCard;
