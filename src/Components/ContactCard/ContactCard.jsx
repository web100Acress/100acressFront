import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  Building,
  User,
  ExternalLink
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { getApiBase } from '../../config/apiBase';

const ContactCard = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [showQR, setShowQR] = useState(false);

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
    const url = window.location.href;
    const text = `Check out ${contactData.name}'s contact card`;
    
    try {
      // Track share
      await axios.post(
        `${getApiBase()}/api/contact-cards/public/${slug}/share`,
        { platform }
      );
      
      switch (platform) {
        case 'whatsapp':
          window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
          break;
        case 'email':
          window.open(`mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`, '_blank');
          break;
        case 'copy':
          await navigator.clipboard.writeText(url);
          toast.success('Link copied to clipboard!');
          break;
        default:
          break;
      }
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
    const iconProps = { size: 20, className: "text-white" };
    switch (platform) {
      case 'linkedin': return <Linkedin {...iconProps} />;
      case 'twitter': return <Twitter {...iconProps} />;
      case 'instagram': return <Instagram {...iconProps} />;
      case 'facebook': return <Facebook {...iconProps} />;
      default: return <ExternalLink {...iconProps} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading contact card...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Card Not Found</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  const themeColors = {
    light: 'bg-white',
    dark: 'bg-gray-900 text-white',
    gradient: 'bg-gradient-to-br from-purple-600 to-blue-600 text-white'
  };

  const cardBg = themeColors[contactData.theme] || themeColors.light;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Main Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`${cardBg} rounded-2xl shadow-xl overflow-hidden`}
          style={{ 
            borderColor: contactData.brandColor,
            borderWidth: '2px',
            borderStyle: 'solid'
          }}
        >
          {/* Header Section */}
          <div 
            className="px-6 py-8 text-center"
            style={{ backgroundColor: contactData.brandColor }}
          >
            {contactData.logo && (
              <div className="mb-4">
                <img
                  src={contactData.logo}
                  alt={`${contactData.company} logo`}
                  className="w-16 h-16 rounded-full mx-auto object-cover bg-white p-1"
                />
              </div>
            )}
            
            <h1 className={`text-2xl font-bold mb-2 ${contactData.fontStyle === 'bold' ? 'font-black' : contactData.fontStyle === 'elegant' ? 'font-light' : 'font-bold'} text-white`}>
              {contactData.name}
            </h1>
            
            {contactData.designation && (
              <p className="text-white/90 text-lg mb-1">{contactData.designation}</p>
            )}
            
            {contactData.company && (
              <div className="flex items-center justify-center text-white/80">
                <Building size={16} className="mr-2" />
                <span>{contactData.company}</span>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="p-6 space-y-4">
            {/* Bio */}
            {contactData.bio && (
              <div className="text-center mb-6">
                <p className="text-gray-600 leading-relaxed">{contactData.bio}</p>
              </div>
            )}

            {/* Contact Actions */}
            <div className="space-y-3">
              {/* Phone */}
              <motion.a
                href={`tel:${contactData.phone}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors group"
              >
                <div className="bg-green-500 p-3 rounded-full mr-4">
                  <Phone size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">Call</p>
                  <p className="text-green-600">{contactData.phone}</p>
                </div>
              </motion.a>

              {/* Email */}
              <motion.a
                href={`mailto:${contactData.email}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors group"
              >
                <div className="bg-blue-500 p-3 rounded-full mr-4">
                  <Mail size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">Email</p>
                  <p className="text-blue-600">{contactData.email}</p>
                </div>
              </motion.a>

              {/* Website */}
              {contactData.website && (
                <motion.a
                  href={contactData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors group"
                >
                  <div className="bg-purple-500 p-3 rounded-full mr-4">
                    <Globe size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">Website</p>
                    <p className="text-purple-600">Visit Website</p>
                  </div>
                </motion.a>
              )}

              {/* Address */}
              {contactData.address && Object.values(contactData.address).some(val => val) && (
                <div className="flex items-start p-4 bg-gray-50 rounded-xl">
                  <div className="bg-gray-500 p-3 rounded-full mr-4 mt-1">
                    <MapPin size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 mb-1">Address</p>
                    <div className="text-gray-600 text-sm space-y-1">
                      {contactData.address.street && <p>{contactData.address.street}</p>}
                      <p>
                        {[contactData.address.city, contactData.address.state, contactData.address.zipCode]
                          .filter(Boolean).join(', ')}
                      </p>
                      {contactData.address.country && <p>{contactData.address.country}</p>}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Social Links */}
            {contactData.socialLinks && Object.values(contactData.socialLinks).some(val => val) && (
              <div className="pt-4 border-t border-gray-200">
                <p className="font-semibold text-gray-800 mb-3 text-center">Connect with me</p>
                <div className="flex justify-center space-x-3">
                  {Object.entries(contactData.socialLinks).map(([platform, url]) => 
                    url && (
                      <motion.a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 rounded-full"
                        style={{ backgroundColor: contactData.brandColor }}
                      >
                        {getSocialIcon(platform)}
                      </motion.a>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 grid grid-cols-3 gap-3"
        >
          {/* Download vCard */}
          <motion.button
            onClick={handleDownloadVCard}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <Download size={24} className="text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-700">Save Contact</span>
          </motion.button>

          {/* Share */}
          <motion.button
            onClick={() => handleShare('copy')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <Share2 size={24} className="text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-700">Share</span>
          </motion.button>

          {/* QR Code */}
          <motion.button
            onClick={handleShowQR}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <QrCode size={24} className="text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-700">QR Code</span>
          </motion.button>
        </motion.div>

        {/* Share Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-4 flex justify-center space-x-4"
        >
          <motion.button
            onClick={() => handleShare('whatsapp')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <span className="mr-2">📱</span>
            WhatsApp
          </motion.button>
          
          <motion.button
            onClick={() => handleShare('email')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Mail size={16} className="mr-2" />
            Email
          </motion.button>
        </motion.div>

        {/* QR Code Modal */}
        {showQR && qrCode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowQR(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4">Scan QR Code</h3>
              <div className="mb-4">
                <img src={qrCode} alt="QR Code" className="mx-auto" />
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Scan this QR code to quickly access this contact card
              </p>
              <button
                onClick={() => setShowQR(false)}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* 100acress Branding */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-500 text-sm">
            Powered by{' '}
            <a
              href="https://100acress.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              100acress.com
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactCard;
