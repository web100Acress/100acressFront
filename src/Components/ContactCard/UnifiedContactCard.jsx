import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  Download, Share2, QrCode, Copy, MessageCircle, Mail, X
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { getApiBase } from '../../config/apiBase';
import { getContactCardUrl } from '../../Utils/urlUtils';

// Import all templates
import ExecutiveTemplate from './templates/ExecutiveCard';
import MinimalistTemplate from './templates/MinimalistCard';
import CreativeTemplate from './templates/CreativeCard';
import PremiumTemplate from './templates/PremiumCard';
import GlassmorphismTemplate from './templates/GlassmorphismCard';
import ModernContactCard from './ModernContactCard';

/**
 * Unified Contact Card Component
 * Dynamically loads the appropriate template based on contactData.template
 */
const UnifiedContactCard = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

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
      setError(err.response?.status === 404 ? 'Contact card not found' : 'Failed to load contact card');
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
    const shareUrl = getContactCardUrl(slug);
    const text = `Check out ${contactData.name}'s contact card`;
    
    try {
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

  const resolveMediaUrl = (url) => {
    if (!url) return url;
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
      return url;
    }
    if (url.startsWith('/uploads/')) {
      return `${getApiBase()}${url}`;
    }
    return url;
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading contact card...</p>
        </motion.div>
      </div>
    );
  }

  // Error State
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
          <p className="text-gray-600 mb-8">{error}</p>
          <motion.button
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg"
          >
            Go to Homepage
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // Check if we should use Modern template (which is a complete component)
  const template = contactData?.template || 'modern';
  
  // If modern template, use the full ModernContactCard component
  if (template === 'modern') {
    return <ModernContactCard />;
  }

  const metaTags = {
    title: `${contactData.name}${contactData.designation ? ` - ${contactData.designation}` : ''} | 100acress`,
    description: `Connect with ${contactData.name}${contactData.designation ? `, ${contactData.designation}` : ''}${contactData.company ? ` at ${contactData.company}` : ''}`,
    image: resolveMediaUrl(contactData.profile_image_url || contactData.company_logo_url || "/favicon.ico"),
    url: getContactCardUrl(contactData.slug)
  };

  return (
    <>
      <Helmet>
        <title>{metaTags.title}</title>
        <meta name="description" content={metaTags.description} />
        <meta property="og:title" content={metaTags.title} />
        <meta property="og:description" content={metaTags.description} />
        <meta property="og:image" content={metaTags.image} />
        <meta property="og:url" content={metaTags.url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="theme-color" content={contactData?.brandColor || "#6366f1"} />
      </Helmet>

      <div className="min-h-screen py-8 px-4">
        <div className="max-w-lg mx-auto">
          {/* Render Selected Template */}
          {template === 'executive' && <ExecutiveTemplate contactData={contactData} resolveMediaUrl={resolveMediaUrl} getInitials={getInitials} />}
          {template === 'minimalist' && <MinimalistTemplate contactData={contactData} resolveMediaUrl={resolveMediaUrl} getInitials={getInitials} />}
          {template === 'creative' && <CreativeTemplate contactData={contactData} resolveMediaUrl={resolveMediaUrl} getInitials={getInitials} />}
          {template === 'premium' && <PremiumTemplate contactData={contactData} resolveMediaUrl={resolveMediaUrl} getInitials={getInitials} />}
          {template === 'glassmorphism' && <GlassmorphismTemplate contactData={contactData} resolveMediaUrl={resolveMediaUrl} getInitials={getInitials} />}

          {/* Action Buttons - Universal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 grid grid-cols-3 gap-3"
          >
            <ActionButton onClick={handleDownloadVCard} icon={Download} label="Save" />
            <ActionButton onClick={() => setShowShareMenu(!showShareMenu)} icon={Share2} label="Share" />
            <ActionButton onClick={handleShowQR} icon={QrCode} label="QR Code" />
          </motion.div>

          {/* Share Menu */}
          <AnimatePresence>
            {showShareMenu && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                className="mt-4 bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-gray-200"
              >
                <div className="grid grid-cols-3 gap-3">
                  <ShareButton onClick={() => handleShare('whatsapp')} icon={MessageCircle} label="WhatsApp" color="green" />
                  <ShareButton onClick={() => handleShare('email')} icon={Mail} label="Email" color="blue" />
                  <ShareButton onClick={() => handleShare('copy')} icon={Copy} label="Copy" color="gray" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Branding */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-500 text-sm">
              Powered by{' '}
              <a href="https://100acress.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                100acress.com
              </a>
            </p>
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
                className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Scan QR Code</h3>
                  <button onClick={() => setShowQR(false)} className="p-2 hover:bg-gray-100 rounded-full">
                    <X size={24} className="text-gray-400" />
                  </button>
                </div>
                <div className="mb-6 bg-gray-50 p-4 rounded-2xl">
                  <img src={qrCode} alt="QR Code" className="mx-auto" />
                </div>
                <p className="text-gray-600 text-sm mb-6">Scan to access this contact card</p>
                <button
                  onClick={() => setShowQR(false)}
                  className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

// Action Button Component
const ActionButton = ({ onClick, icon: Icon, label }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
    className="flex flex-col items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-200"
  >
    <Icon size={24} className="text-indigo-600 mb-2" />
    <span className="text-xs font-medium text-gray-700">{label}</span>
  </motion.button>
);

// Share Button Component
const ShareButton = ({ onClick, icon: Icon, label, color }) => {
  const colorClasses = {
    green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
    blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    gray: 'from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700'
  };

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex flex-col items-center p-3 bg-gradient-to-br ${colorClasses[color]} text-white rounded-xl transition-all shadow-lg`}
    >
      <Icon size={22} className="mb-1" />
      <span className="text-xs font-medium">{label}</span>
    </motion.button>
  );
};

export default UnifiedContactCard;
