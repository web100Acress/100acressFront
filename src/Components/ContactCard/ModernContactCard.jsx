import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  Download, 
  Share2, 
  QrCode,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Github,
  Building,
  User,
  ExternalLink,
  Copy,
  MessageCircle,
  X
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { getApiBase } from '../../config/apiBase';
import { getContactCardUrl, getBaseUrl } from '../../Utils/urlUtils';

const ModernContactCard = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Detect system theme
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    
    const handleThemeChange = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleThemeChange);
    
    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, []);

  useEffect(() => {
    if (slug) {
      fetchContactCard();
    }
  }, [slug]);

  const fetchContactCard = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${getApiBase()}/api/contact-cards/public/${slug}`
      );
      
      if (response.data.success) {
        setContactData(response.data.data);
      } else {
        setError('Contact card not found');
      }
    } catch (err) {
      console.error('Error fetching contact card:', err);
      if (err.response?.status === 404) {
        setError('Contact card not found');
      } else {
        setError('Failed to load contact card');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadVCard = async () => {
    try {
      const response = await axios.get(
        `${getApiBase()}/api/contact-cards/public/${slug}/download`,
        { responseType: 'blob' }
      );
      
      const blob = new Blob([response.data], { type: 'text/vcard' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${contactData.name.replace(/\s+/g, '-')}.vcf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success('Contact saved to your device!');
    } catch (err) {
      console.error('Error downloading vCard:', err);
      toast.error('Failed to download contact');
    }
  };

  const handleShare = async (platform) => {
    // Use utility function for consistent URL generation
    const shareUrl = getContactCardUrl(slug);
    const text = `Check out ${contactData.name}'s contact card`;
    
    try {
      // Track share
      await axios.post(
        `${getApiBase()}/api/contact-cards/public/${slug}/share`,
        { platform }
      );
      
      switch (platform) {
        case 'whatsapp':
          window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + shareUrl)}`, '_blank');
          break;
        case 'email':
          window.open(`mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(shareUrl)}`, '_blank');
          break;
        case 'copy':
          await navigator.clipboard.writeText(shareUrl);
          toast.success('Link copied to clipboard!');
          break;
        default:
          break;
      }
      setShowShareMenu(false);
    } catch (err) {
      console.error('Error sharing:', err);
      if (platform === 'copy') {
        toast.error('Failed to copy link');
      }
    }
  };

  const handleShowQR = async () => {
    if (!qrCode) {
      try {
        const response = await axios.get(
          `${getApiBase()}/api/contact-cards/public/${slug}/qr`
        );
        
        if (response.data.success) {
          setQrCode(response.data.data.qrCode);
        }
      } catch (err) {
        console.error('Error generating QR code:', err);
        toast.error('Failed to generate QR code');
        return;
      }
    }
    setShowQR(!showQR);
  };

  const getSocialIcon = (platform) => {
    const iconProps = { size: 18, className: "text-white" };
    switch (platform) {
      case 'linkedin': return <Linkedin {...iconProps} />;
      case 'twitter': return <Twitter {...iconProps} />;
      case 'instagram': return <Instagram {...iconProps} />;
      case 'facebook': return <Facebook {...iconProps} />;
      case 'github': return <Github {...iconProps} />;
      case 'website': return <Globe {...iconProps} />;
      default: return <ExternalLink {...iconProps} />;
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Generate dynamic meta tags based on contact data
  const generateMetaTags = () => {
    if (!contactData) {
      return {
        title: "Contact Card | 100acress",
        description: "Digital contact card powered by 100acress.com",
        image: "/favicon.ico",
        url: getContactCardUrl(slug)
      };
    }

    const title = `${contactData.name}${contactData.designation ? ` - ${contactData.designation}` : ''} | 100acress`;
    const description = `Connect with ${contactData.name}${contactData.designation ? `, ${contactData.designation}` : ''}${contactData.company ? ` at ${contactData.company}` : ''}. Digital contact card powered by 100acress.com`;
    const image = contactData.profile_image_url || contactData.company_logo_url || "/favicon.ico";
    const url = getContactCardUrl(contactData.slug);

    return { title, description, image, url };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-400 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <p className="text-gray-600 font-medium">Loading contact card...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-pink-50">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <div className="text-6xl mb-6">🚫</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Card Not Found</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">{error}</p>
          <motion.button
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Go to Homepage
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const backgroundStyle = isDarkMode 
    ? 'bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900'
    : 'bg-gradient-to-br from-indigo-50 via-white to-purple-50';

  const metaTags = generateMetaTags();

  return (
    <>
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{metaTags.title}</title>
        <meta name="description" content={metaTags.description} />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={metaTags.title} />
        <meta property="og:description" content={metaTags.description} />
        <meta property="og:image" content={metaTags.image} />
        <meta property="og:url" content={metaTags.url} />
        <meta property="og:type" content="profile" />
        <meta property="og:site_name" content="100acress" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTags.title} />
        <meta name="twitter:description" content={metaTags.description} />
        <meta name="twitter:image" content={metaTags.image} />
        
        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content={contactData?.name || "100acress"} />
        <link rel="canonical" href={metaTags.url} />
        
        {/* Theme color */}
        <meta name="theme-color" content={contactData?.brandColor || "#6366f1"} />
        
        {/* Structured Data for Contact Information */}
        {contactData && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": contactData.name,
              "jobTitle": contactData.designation,
              "worksFor": contactData.company ? {
                "@type": "Organization",
                "name": contactData.company
              } : undefined,
              "email": contactData.email,
              "telephone": contactData.phone,
              "url": contactData.website,
              "image": contactData.profile_image_url,
              "address": contactData.address ? {
                "@type": "PostalAddress",
                "streetAddress": contactData.address.street,
                "addressLocality": contactData.address.city,
                "addressRegion": contactData.address.state,
                "postalCode": contactData.address.zipCode,
                "addressCountry": contactData.address.country
              } : undefined,
              "sameAs": contactData.socialLinks ? Object.values(contactData.socialLinks).filter(Boolean) : undefined
            })}
          </script>
        )}
      </Helmet>
      
      <div className={`min-h-screen ${backgroundStyle} relative overflow-hidden`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -100, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, -150, 0],
            y: [0, 100, 0],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Main Glassmorphism Card */}
          <div className="backdrop-blur-xl bg-white/30 border border-white/40 rounded-3xl shadow-2xl overflow-hidden">
            {/* Profile Header */}
            <div className="relative p-6 pb-4 text-center">
              {/* Gradient Background */}
              <div 
                className="absolute inset-0 opacity-90"
                style={{
                  background: `linear-gradient(135deg, ${contactData.brandColor || '#6366f1'}, ${contactData.brandColor ? contactData.brandColor + '80' : '#8b5cf6'})`
                }}
              />
                  
                  {/* Company Logo - Top Right */}
                  {contactData.company_logo_url && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="absolute top-3 left-3 z-20"
                    >
                      <img
                        src={contactData.company_logo_url}
                        alt={contactData.company || '100acress'}
                        className="h-10 w-auto max-w-24 object-contain drop-shadow-lg opacity-90"
                      />
                    </motion.div>
                  )}
                  
                  <div className="relative z-10 pt-8">
                    {/* Profile Picture */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                      className="mb-6"
                    >
                      {contactData.profile_image_url ? (
                        <img
                          src={contactData.profile_image_url}
                          alt={contactData.name}
                          className="w-36 h-36 rounded-full mx-auto object-cover border-4 border-white/40 shadow-2xl ring-4 ring-white/20"
                        />
                      ) : (
                        <div className="w-36 h-36 rounded-full mx-auto bg-white/30 border-4 border-white/40 shadow-2xl ring-4 ring-white/20 flex items-center justify-center">
                          <span className="text-4xl font-bold text-white">
                            {getInitials(contactData.name)}
                          </span>
                        </div>
                      )}
                    </motion.div>

                    {/* Name and Title */}
                    <motion.h1 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-3xl font-bold text-white mb-2 drop-shadow-lg"
                    >
                      {contactData.name}
                    </motion.h1>

                    {contactData.designation && (
                      <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-white/95 text-lg font-medium mb-2 drop-shadow"
                      >
                        {contactData.designation}
                      </motion.p>
                    )}

                    {/* Company Name */}
                    {contactData.company && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="flex items-center justify-center"
                      >
                        <span className="text-white/90 font-medium text-base drop-shadow">
                          {contactData.company}
                        </span>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="p-4 space-y-3">
                  {/* Bio */}
                  {contactData.bio && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="text-center mb-4 p-3 backdrop-blur-sm bg-white/20 border border-white/30 rounded-xl"
                    >
                      <p className="text-gray-700 leading-relaxed font-medium text-sm">{contactData.bio}</p>
                    </motion.div>
                  )}

                  {/* Contact Actions */}
                  <div className="space-y-1">
                    {/* Phone */}
                    <motion.a
                      href={`tel:${contactData.phone}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center p-3 backdrop-blur-sm bg-white/40 border border-white/30 rounded-xl hover:bg-white/50 transition-all duration-300 group shadow-md hover:shadow-lg"
                    >
                      <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl mr-4 shadow-lg group-hover:shadow-xl transition-shadow">
                        <Phone size={22} className="text-white" />
                      </div>
                      <div className="flex-1 space-y-0 leading-tight">
                        <p className="font-semibold text-gray-800 text-base">Call</p>
                        <p className="text-green-600 font-medium text-lg">{contactData.phone}</p>
                      </div>
                    </motion.a>

                    {/* Email */}
                    <motion.a
                      href={`mailto:${contactData.email}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.0 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center p-3 backdrop-blur-sm bg-white/40 border border-white/30 rounded-xl hover:bg-white/50 transition-all duration-300 group shadow-md hover:shadow-lg"
                    >
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl mr-4 shadow-lg group-hover:shadow-xl transition-shadow">
                        <Mail size={22} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 text-sm">Email</p>
                        <p className="text-blue-600 font-medium text-base truncate">{contactData.email}</p>
                      </div>
                    </motion.a>

                    {/* Website */}
                    {contactData.website && (
                      <motion.a
                        href={contactData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.1 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center p-3 backdrop-blur-sm bg-white/40 border border-white/30 rounded-xl hover:bg-white/50 transition-all duration-300 group shadow-md hover:shadow-lg"
                      >
                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl mr-4 shadow-lg group-hover:shadow-xl transition-shadow">
                          <Globe size={22} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800 text-sm">Website</p>
                          <p className="text-purple-600 font-medium text-base">Visit Website</p>
                        </div>
                      </motion.a>
                    )}

                    {/* Address */}
                    {contactData.address && Object.values(contactData.address).some(val => val) && (
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 }}
                        className="flex items-start p-4 backdrop-blur-sm bg-white/40 border border-white/30 rounded-2xl shadow-md"
                      >
                        <div className="bg-gradient-to-br from-gray-500 to-gray-600 p-3 rounded-xl mr-4 mt-1 shadow-lg">
                          <MapPin size={22} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800 mb-1 text-sm">Address</p>
                          <div className="text-gray-700 text-sm space-y-1 leading-relaxed">
                            {contactData.address.street && <p>{contactData.address.street}</p>}
                            <p>
                              {[contactData.address.city, contactData.address.state, contactData.address.zipCode]
                                .filter(Boolean).join(', ')}
                            </p>
                            {contactData.address.country && <p>{contactData.address.country}</p>}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Social Links */}
                  {contactData.socialLinks && Object.values(contactData.socialLinks).some(val => val) && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3 }}
                      className="pt-6 border-t border-white/30"
                    >
                      <p className="font-semibold text-gray-800 mb-4 text-center">Connect with me</p>
                      <div className="flex justify-center space-x-3">
                        {Object.entries(contactData.socialLinks).map(([platform, url]) => 
                          url && (
                            <motion.a
                              key={platform}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.15, y: -5 }}
                              whileTap={{ scale: 0.95 }}
                              className="p-3.5 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                              style={{ backgroundColor: contactData.brandColor || '#6366f1' }}
                            >
                              {getSocialIcon(platform)}
                            </motion.a>
                          )
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="p-4 pt-0"
            >
              <div className="grid grid-cols-3 gap-3">
                {/* Download vCard */}
                <motion.button
                  onClick={handleDownloadVCard}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center p-4 backdrop-blur-sm bg-white/50 border border-white/40 rounded-2xl hover:bg-white/60 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <Download size={26} className="text-indigo-600 mb-2" />
                  <span className="text-sm font-semibold text-gray-700">Save</span>
                </motion.button>

                {/* Share */}
                <motion.button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center p-4 backdrop-blur-sm bg-white/50 border border-white/40 rounded-2xl hover:bg-white/60 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <Share2 size={26} className="text-green-600 mb-2" />
                  <span className="text-sm font-semibold text-gray-700">Share</span>
                </motion.button>

                {/* QR Code */}
                <motion.button
                  onClick={handleShowQR}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center p-4 backdrop-blur-sm bg-white/50 border border-white/40 rounded-2xl hover:bg-white/60 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <QrCode size={26} className="text-purple-600 mb-2" />
                  <span className="text-sm font-semibold text-gray-700">QR Code</span>
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Share Menu */}
          <AnimatePresence>
            {showShareMenu && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                className="mt-4 backdrop-blur-xl bg-white/30 border border-white/40 rounded-2xl p-4 shadow-2xl"
              >
                <div className="grid grid-cols-3 gap-3">
                  <motion.button
                    onClick={() => handleShare('whatsapp')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center p-3 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    <MessageCircle size={22} className="mb-1" />
                    <span className="text-xs font-medium">WhatsApp</span>
                  </motion.button>
                  
                  <motion.button
                    onClick={() => handleShare('email')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center p-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    <Mail size={22} className="mb-1" />
                    <span className="text-xs font-medium">Email</span>
                  </motion.button>

                  <motion.button
                    onClick={() => handleShare('copy')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center p-3 bg-gradient-to-br from-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    <Copy size={22} className="mb-1" />
                    <span className="text-xs font-medium">Copy Link</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 100acress Branding */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-600 text-sm font-medium">
              Powered by{' '}
              <a
                href="https://100acress.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
              >
                100acress.com
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQR && qrCode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowQR(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="backdrop-blur-xl bg-white/95 border border-white/40 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Scan QR Code</h3>
                <button
                  onClick={() => setShowQR(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="mb-6 p-4 bg-white rounded-2xl shadow-inner">
                <img src={qrCode} alt="QR Code" className="mx-auto rounded-xl" />
              </div>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                Scan this QR code with your phone camera to quickly access this contact card
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </>
  );
};

export default ModernContactCard;