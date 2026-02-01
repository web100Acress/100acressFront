import React, { useState, useCallback } from 'react';
import api from '../../../../../../config/apiClient';
import { showToast } from '../../../../../../Utils/toastUtils';
import { message } from 'antd';
import CountryCodeSelector from '../../../../../../Components/Actual_Components/CountryCodeSelector';
import { motion } from 'framer-motion';

const FooterFormMobile = ({ builderName = "Premium", projectViewDetails = {}, projectTitle = "", location = "" }) => {
  // Footer form state
  const [footerFormData, setFooterFormData] = useState({
    name: "",
    mobile: "",
    countryCode: "+91",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [buttonText, setButtonText] = useState("Get Details Now");

  // Footer form handlers
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFooterFormData({ ...footerFormData, [name]: value });
  };

  const resetFormData = () => {
    setFooterFormData({
      name: "",
      mobile: "",
      countryCode: "+91",
    });
  };

  const handleCountryCodeChange = (countryCode) => {
    setFooterFormData({ ...footerFormData, countryCode });
  };

  const handlePhoneNumberChange = (mobile) => {
    setFooterFormData({ ...footerFormData, mobile });
  };

  const handleFormSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (isSubmitting) {
      return;
    }
    const { mobile, name, countryCode } = footerFormData;
    const fullPhoneNumber = `${countryCode}${mobile}`;

    if (mobile && mobile.length >= 7 && name.trim()) {
      setIsSubmitting(true);
      setButtonText("Submitting...");

      try {
        await api.post('userInsert', {
          ...footerFormData,
          mobile: fullPhoneNumber,
          projectName: projectViewDetails.projectName || projectTitle || "100acress Property Inquiry",
          address: projectViewDetails.projectAddress || location || "Related Projects Section",
        });
        showToast.success(showToast.successMessages.formSubmitted, {
          duration: 3000 // 3 seconds for enquiry forms
        });
        resetFormData();
        setButtonText("Get Details Now");
      } catch (error) {
        console.error("Error:", error.message);
        showToast.error("Error: " + error.message);
        setButtonText("Get Details Now");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      showToast.error("Please fill in valid name and mobile number");
    }
  }, [isSubmitting, footerFormData, builderName]);

  // Phone number logic: backend number determines footer display
  const getFooterPhoneNumbers = () => {
    const backendNumber = Number(projectViewDetails?.mobileNumber);
    
    if (backendNumber === 9811750130) {
      return { dialNumber: '8527134491', displayNumber: '+91 8527-134-491' };
    } else if (backendNumber === 9355990063) {
      return { dialNumber: '9315375335', displayNumber: '+91 9315-375-335' };
    } else if (backendNumber === 9811750740) {
      return { dialNumber: '9811750130', displayNumber: '+91 9811-750-130' };
    } else {
      // Fallback to default
      return { dialNumber: '8527134491', displayNumber: '+91 8527-134-491' };
    }
  };
  
  const { dialNumber, displayNumber } = getFooterPhoneNumbers();

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black py-8 md:py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Mobile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <motion.div 
            className="inline-flex items-center px-3 py-1.5 bg-amber-500/10 rounded-full border border-amber-500/20 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <svg className="w-3 h-3 text-amber-400 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="text-amber-300 text-xs font-medium">Trusted by 10,000+ Customers</span>
          </motion.div>
          
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Enquire Now
          </motion.h2>
        </motion.div>

        {/* Mobile Call Now Section */}
        <motion.div 
          className="p-4 bg-gradient-to-r from-amber-500/10 to-amber-600/5 rounded-2xl border border-amber-500/20 mb-6"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <motion.div 
              className="flex-shrink-0"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.55.57 1 1 0 011 1v3.61a1 1 0 01-.91 1A16 16 0 014 5.92 1 1 0 015 5h3.61a1 1 0 011 1 11.36 11.36 0 00.57 3.55 1 1 0 01-.24 1.01l-2.32 2.23z"/>
                </svg>
              </div>
            </motion.div>
            <motion.a
              href={`tel:+91${dialNumber}`}
              className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-amber-400 font-bold hover:text-amber-300 transition-all duration-300 transform hover:scale-105 text-xl md:text-2xl"
              aria-label={`Call +91${displayNumber}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="font-extrabold tracking-wide leading-none">{displayNumber.replace('+91 ', '')}</span>
            </motion.a>
          </div>
        </motion.div>

        {/* Mobile Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <motion.div 
            className="p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700/50 backdrop-blur-sm"
            whileHover={{ scale: 1.01 }}
          >
            <h3 className="text-xl font-bold text-white mb-4">Get Property Details</h3>
            
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="flex flex-col space-y-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={footerFormData.name}
                    onChange={handleFormChange}
                    placeholder="Enter your name"
                    className="w-full px-3 py-2.5 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Mobile Number</label>
                  <CountryCodeSelector
                    selectedCountryCode={footerFormData.countryCode}
                    onCountryCodeChange={handleCountryCodeChange}
                    phoneNumber={footerFormData.mobile}
                    onPhoneNumberChange={(value) => handleFormChange({ target: { name: 'mobile', value } })}
                    placeholder="Enter mobile number"
                    className="w-full"
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-black font-bold py-3 px-4 rounded-lg hover:from-amber-500 hover:to-amber-400 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  buttonText
                )}
              </motion.button>
            </form>

            <div className="mt-4 pt-4 border-t border-gray-700/50">
              <p className="text-center text-gray-400 text-xs">
                By submitting, you agree to our Terms & Conditions
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Mobile Trust Indicators */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          {[
            {
              icon: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z",
              color: "green",
              title: "100% Secure",
              description: "Bank-level security"
            },
            {
              icon: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z",
              color: "blue",
              title: "Quick Response",
              description: "5 min callback"
            },
            {
              icon: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
              color: "amber",
              title: "Expert Support",
              description: "Dedicated manager"
            },
            {
              icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
              color: "purple",
              title: "Verified Listings",
              description: "RERA registered"
            }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="flex items-start space-x-3 p-3 bg-gray-800/30 rounded-xl border border-gray-700/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
            >
              <div className={`flex-shrink-0 w-8 h-8 bg-${item.color}-500/10 rounded-lg flex items-center justify-center`}>
                <svg className={`w-4 h-4 text-${item.color}-400`} fill="currentColor" viewBox="0 0 24 24">
                  <path d={item.icon}/>
                </svg>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1 text-sm">{item.title}</h4>
                <p className="text-gray-400 text-xs">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Disclaimer Section */}
        <div className="mt-8">
          <div className="w-full px-4 py-6">
            <div className="bg-gray-800/30 rounded-xl p-4">
              <h4 className="text-amber-400 font-semibold text-xs uppercase tracking-[0.1em] mb-2">Disclaimer</h4>
              <p className="text-white font-semibold text-base md:text-lg leading-snug">
                The information provided on this project page is shared only for general awareness and user understanding. It does not represent any offer, commitment, warranty, or endorsement. Project details are gathered from publicly available sources such as State RERA websites, official builder portals, and documents shared by authorized channel partners, including brochures, price lists, and payment plans. The platform presents this information in a simplified format to help users with research and comparison. It does not own or control the content. Buyers are strongly advised to verify all project details, approvals, pricing, and terms directly with the builder or promoter before making any purchase decision.
              </p>
            </div>
          </div>
        </div>

        {/* Copyright Section - Mobile */}
        <div className="border-t border-white/20">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <p className="text-center text-gray-400 text-xs">
              Copyright © 2026. {projectViewDetails?.projectName || projectTitle || "100acress"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterFormMobile;
