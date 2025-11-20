import React from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, Mail, MessageCircle, Globe, MapPin,
  Linkedin, Twitter, Instagram, ExternalLink
} from 'lucide-react';

/**
 * Glassmorphism Card Template - Modern Mobile-First Design
 * Features: Neon gradient background, frosted glass, premium animations
 * Best for: Mobile networking, modern professionals, tech-savvy users
 */
const GlassmorphismCard = ({ contactData, resolveMediaUrl, getInitials }) => {
  const brandColor = contactData.brandColor || '#6366F1';

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Animated Neon Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-400 to-purple-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 100, 0],
            y: [0, -100, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full blur-3xl"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Glassmorphism Card */}
          <div 
            className="relative backdrop-blur-2xl bg-white/10 rounded-[35px] p-8 shadow-2xl border border-white/20"
            style={{
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 0 60px rgba(255, 255, 255, 0.1)',
            }}
          >
            {/* White Glow Border Effect */}
            <div className="absolute inset-0 rounded-[35px] bg-gradient-to-br from-white/30 via-transparent to-white/30 opacity-50 pointer-events-none" />

            {/* Profile Section */}
            <div className="relative flex flex-col items-center -mt-20 mb-6">
              {/* Profile Picture with Glow */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="relative"
              >
                {/* Outer Glow Ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-white/10 blur-xl animate-pulse" />
                
                {/* Profile Image */}
                <div className="relative">
                  {contactData.profile_image_url ? (
                    <img
                      src={resolveMediaUrl(contactData.profile_image_url)}
                      alt={contactData.name}
                      className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-white/30 shadow-2xl"
                    />
                  ) : (
                    <div 
                      className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-white/30 shadow-2xl flex items-center justify-center text-white text-3xl sm:text-4xl font-bold"
                      style={{ 
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      {getInitials(contactData.name)}
                    </div>
                  )}
                  
                  {/* Initials Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="absolute -right-2 -bottom-2 w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-lg border-2 border-white/30"
                  >
                    {getInitials(contactData.name)}
                  </motion.div>
                </div>
              </motion.div>

              {/* Name and Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center mt-6"
              >
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">
                  {contactData.name}
                </h1>
                <p className="text-white/80 text-base sm:text-lg font-light">
                  {contactData.designation}
                  {contactData.company && (
                    <span className="block text-sm sm:text-base text-white/60 mt-1">
                      {contactData.company}
                    </span>
                  )}
                </p>
              </motion.div>
            </div>

            {/* Contact Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6"
            >
              {/* Call Button */}
              <a
                href={`tel:${contactData.phone}`}
                className="group"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                  style={{
                    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)'
                  }}
                >
                  <Phone size={18} />
                  <span className="text-sm">Call</span>
                </motion.div>
              </a>

              {/* Email Button */}
              <a
                href={`mailto:${contactData.email}`}
                className="group"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                  style={{
                    boxShadow: '0 4px 15px rgba(168, 85, 247, 0.4)'
                  }}
                >
                  <Mail size={18} />
                  <span className="text-sm">Email</span>
                </motion.div>
              </a>

              {/* WhatsApp Button */}
              {contactData.whatsapp && (
                <a
                  href={`https://wa.me/${contactData.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                    style={{
                      boxShadow: '0 4px 15px rgba(34, 197, 94, 0.4)'
                    }}
                  >
                    <MessageCircle size={18} />
                    <span className="text-sm">WhatsApp</span>
                  </motion.div>
                </a>
              )}
            </motion.div>

            {/* Bio Section */}
            {contactData.bio && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="mb-6"
              >
                <div 
                  className="backdrop-blur-xl bg-white/5 rounded-3xl p-5 border border-white/10"
                  style={{
                    boxShadow: 'inset 0 2px 10px rgba(255, 255, 255, 0.05)'
                  }}
                >
                  <p className="text-white/90 text-sm sm:text-base leading-relaxed text-center">
                    {contactData.bio}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Website & Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="space-y-3 mb-6"
            >
              {/* Website */}
              {contactData.website && (
                <a
                  href={contactData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-xl">
                      <Globe size={18} />
                    </div>
                    <span className="text-sm sm:text-base truncate flex-1">
                      {contactData.website.replace(/^https?:\/\//, '')}
                    </span>
                    <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                </a>
              )}

              {/* Location */}
              {contactData.address && (
                <div className="flex items-center gap-3 text-white/80">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-xl">
                    <MapPin size={18} />
                  </div>
                  <span className="text-sm sm:text-base">
                    {contactData.address}
                  </span>
                </div>
              )}
            </motion.div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6" />

            {/* Social Icons */}
            {contactData.socialLinks && Object.values(contactData.socialLinks).some(val => val) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="flex justify-center items-center gap-4"
              >
                {contactData.socialLinks.linkedin && (
                  <SocialIcon 
                    href={contactData.socialLinks.linkedin}
                    icon={Linkedin}
                    label="LinkedIn"
                  />
                )}
                {contactData.socialLinks.twitter && (
                  <SocialIcon 
                    href={contactData.socialLinks.twitter}
                    icon={Twitter}
                    label="Twitter"
                  />
                )}
                {contactData.socialLinks.instagram && (
                  <SocialIcon 
                    href={contactData.socialLinks.instagram}
                    icon={Instagram}
                    label="Instagram"
                  />
                )}
              </motion.div>
            )}
          </div>

          {/* Powered By Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="text-center mt-6"
          >
            <p className="text-white/60 text-xs sm:text-sm">
              Powered by{' '}
              <a
                href="https://100acress.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/90 font-semibold hover:text-white transition-colors"
              >
                100acress.com
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// Social Icon Component
const SocialIcon = ({ href, icon: Icon, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.2, y: -4 }}
    whileTap={{ scale: 0.9 }}
    className="group relative"
  >
    <div 
      className="w-12 h-12 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all shadow-lg"
      style={{
        boxShadow: '0 4px 15px rgba(255, 255, 255, 0.1)'
      }}
    >
      <Icon size={20} />
    </div>
    
    {/* Tooltip */}
    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-xl text-gray-900 text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
      {label}
    </div>
  </motion.a>
);

export default GlassmorphismCard;
