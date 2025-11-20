import React from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, Mail, Globe, MapPin, MessageCircle,
  Linkedin, Twitter, Instagram, Facebook, Github, ExternalLink
} from 'lucide-react';
import QRCode from 'qrcode';

/**
 * Premium Card Template - Apple/Notion/Dribbble Quality Design
 * Features: Glassmorphism, soft shadows, perfect spacing, premium finish
 * Best for: High-end professionals, premium brands, luxury services
 */
const PremiumCard = ({ contactData, resolveMediaUrl, getInitials }) => {
  const brandColor = contactData.brandColor || '#6366F1';
  const [qrCodeUrl, setQrCodeUrl] = React.useState('');

  // Generate QR Code for vCard URL
  React.useEffect(() => {
    const generateQR = async () => {
      try {
        const cardUrl = `${window.location.origin}/hi/${contactData.slug}`;
        const qrUrl = await QRCode.toDataURL(cardUrl, {
          width: 200,
          margin: 1,
          color: {
            dark: brandColor,
            light: '#FFFFFF'
          }
        });
        setQrCodeUrl(qrUrl);
      } catch (err) {
        console.error('Error generating QR code:', err);
      }
    };
    generateQR();
  }, [contactData.slug, brandColor]);
  
  // Convert hex to RGB for gradients
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 99, g: 102, b: 241 };
  };

  const rgb = hexToRgb(brandColor);
  const brandGradient = `linear-gradient(135deg, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1) 0%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.05) 100%)`;

  const socialIcons = {
    linkedin: Linkedin,
    twitter: Twitter,
    instagram: Instagram,
    facebook: Facebook,
    github: Github,
    website: Globe
  };

  return (
    <div className="relative">
      {/* Main Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        style={{ boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)' }}
      >
        {/* Header Section with Banner */}
        <div className="relative h-40 overflow-hidden">
          {/* Banner Image with Overlay */}
          {contactData.banner_image_url ? (
            <div className="absolute inset-0">
              <img
                src={resolveMediaUrl(contactData.banner_image_url)}
                alt="Banner"
                className="w-full h-full object-cover"
              />
              <div 
                className="absolute inset-0"
                style={{ 
                  background: `linear-gradient(180deg, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3) 0%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6) 100%)`
                }}
              />
            </div>
          ) : (
            <div 
              className="absolute inset-0"
              style={{ 
                background: `linear-gradient(135deg, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8) 0%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.95) 100%)`
              }}
            />
          )}

          {/* Brand Color Accent Strip */}
          <div 
            className="absolute top-0 left-0 right-0 h-1"
            style={{ backgroundColor: brandColor }}
          />

          {/* Company Logo - Top Right */}
          {contactData.company_logo_url && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute top-4 right-4 rounded-xl p-2"
            >
              <img
                src={resolveMediaUrl(contactData.company_logo_url)}
                alt="Company Logo"
                className="h-10 w-auto max-w-28 object-contain drop-shadow-lg"
              />
            </motion.div>
          )}

          {/* Scannable QR Code - Top Left */}
          {qrCodeUrl && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute top-4 left-4 bg-white rounded-xl p-2 shadow-lg"
            >
              <img
                src={qrCodeUrl}
                alt="Scan QR Code"
                className="w-16 h-16 rounded-lg"
              />
            </motion.div>
          )}
        </div>

        {/* Profile Picture - Overlapping Banner */}
        <div className="relative -mt-16 flex justify-center px-6">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            className="relative"
          >
            {/* Glowing Border Effect */}
            <div 
              className="absolute inset-0 rounded-full blur-xl opacity-40 animate-pulse"
              style={{ backgroundColor: brandColor }}
            />
            
            {contactData.profile_image_url ? (
              <img
                src={resolveMediaUrl(contactData.profile_image_url)}
                alt={contactData.name}
                className="relative w-32 h-32 rounded-full object-cover border-6 border-white shadow-2xl"
              />
            ) : (
              <div 
                className="relative w-32 h-32 rounded-full border-6 border-white shadow-2xl flex items-center justify-center text-white text-3xl font-bold"
                style={{ background: `linear-gradient(135deg, ${brandColor}, ${brandColor}dd)` }}
              >
                {getInitials(contactData.name)}
              </div>
            )}
          </motion.div>
        </div>

        {/* Profile Information Section */}
        <div className="px-6 pt-4 pb-6 text-center">
          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-3xl font-bold text-gray-900 mb-2 tracking-tight"
            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}
          >
            {contactData.name}
          </motion.h1>

          {/* Designation Badge */}
          {contactData.designation && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="inline-block mb-2"
            >
              <div 
                className="px-6 py-2 rounded-full text-white text-sm font-semibold shadow-lg"
                style={{ 
                  background: `linear-gradient(135deg, ${brandColor}, ${brandColor}dd)`,
                  boxShadow: `0 4px 12px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`
                }}
              >
                {contactData.designation}
              </div>
            </motion.div>
          )}

          {/* Company Name */}
          {contactData.company && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-gray-600 text-base font-medium mb-3"
            >
              {contactData.company}
            </motion.p>
          )}

          {/* Bio */}
          {contactData.bio && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-gray-500 text-sm leading-relaxed max-w-md mx-auto mb-2"
            >
              {contactData.bio}
            </motion.p>
          )}
        </div>

        {/* Contact Information Section */}
        <div className="px-6 pb-6 space-y-2.5">
          {/* Phone */}
          <ContactBlock
            href={`tel:${contactData.phone}`}
            icon={Phone}
            label="Phone"
            value={contactData.phone}
            brandColor={brandColor}
            delay={0.9}
          />

          {/* WhatsApp */}
          {contactData.whatsapp && (
            <ContactBlock
              href={`https://wa.me/${contactData.whatsapp.replace(/\D/g, '')}`}
              icon={MessageCircle}
              label="WhatsApp"
              value={contactData.whatsapp}
              brandColor={brandColor}
              delay={1.0}
              external
            />
          )}

          {/* Email */}
          <ContactBlock
            href={`mailto:${contactData.email}`}
            icon={Mail}
            label="Email"
            value={contactData.email}
            brandColor={brandColor}
            delay={1.1}
          />

          {/* Website */}
          {contactData.website && (
            <ContactBlock
              href={contactData.website}
              icon={Globe}
              label="Website"
              value={contactData.website.replace(/^https?:\/\//, '')}
              brandColor={brandColor}
              delay={1.2}
              external
            />
          )}
        </div>

        {/* Social Media Section */}
        {contactData.socialLinks && Object.values(contactData.socialLinks).some(val => val) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="px-6 pb-6"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4" />
            
            <p className="text-center text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wider">
              Connect With Me
            </p>

            <div className="flex justify-center flex-wrap gap-3">
              {Object.entries(contactData.socialLinks).map(([platform, url]) => {
                if (!url) return null;
                const Icon = socialIcons[platform] || ExternalLink;
                
                return (
                  <motion.a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative"
                  >
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-xl"
                      style={{ 
                        background: brandGradient,
                        border: `2px solid rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`
                      }}
                    >
                      <Icon size={20} style={{ color: brandColor }} />
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Brand Color Accent Strip - Bottom */}
        <div 
          className="h-2"
          style={{ 
            background: `linear-gradient(90deg, ${brandColor}00 0%, ${brandColor} 50%, ${brandColor}00 100%)`
          }}
        />
      </motion.div>

      {/* Footer Credits */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-6 text-center"
      >
        <p className="text-gray-400 text-sm">
          Powered by{' '}
          <a
            href="https://100acress.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:text-gray-600 transition-colors"
            style={{ color: brandColor }}
          >
            100acress.com
          </a>
        </p>
      </motion.div>
    </div>
  );
};

// Contact Block Component
const ContactBlock = ({ href, icon: Icon, label, value, brandColor, delay, external = false }) => {
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 99, g: 102, b: 241 };
  };

  const rgb = hexToRgb(brandColor);

  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
      className="group block"
    >
      <div 
        className="relative overflow-hidden rounded-xl p-4 transition-all duration-300"
        style={{ 
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)'
        }}
      >
        {/* Hover Gradient Effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ 
            background: `linear-gradient(135deg, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.05) 0%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.02) 100%)`
          }}
        />

        <div className="relative flex items-center">
          {/* Icon Circle */}
          <div 
            className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-xl"
            style={{ 
              background: `linear-gradient(135deg, ${brandColor}, ${brandColor}dd)`,
              boxShadow: `0 4px 12px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.25)`
            }}
          >
            <Icon size={20} className="text-white" />
          </div>

          {/* Text Content */}
          <div className="ml-4 flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              {label}
            </p>
            <p className="text-sm font-semibold text-gray-900 truncate">
              {value}
            </p>
          </div>

          {/* Arrow Icon */}
          <div className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <ExternalLink size={18} style={{ color: brandColor }} />
          </div>
        </div>
      </div>
    </motion.a>
  );
};

export default PremiumCard;
