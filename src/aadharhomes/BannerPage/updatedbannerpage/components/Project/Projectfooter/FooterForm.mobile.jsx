import React, { useState, useCallback } from 'react';
import api from '../../../../../../config/apiClient';
import { showToast } from '../../../../../../Utils/toastUtils';
import CountryCodeSelector from '../../../../../../Components/Actual_Components/CountryCodeSelector';
import { motion } from 'framer-motion';
import './FooterForm.mobile.css';

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
    <div className="footer-form-mobile" style={{ paddingTop: '120px', zIndex: 1, position: 'relative' }}>
      <div className="footer-form-mobile-content">
        
        {/* Mobile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="footer-form-mobile-header"
        >
          <motion.div 
            className="footer-form-mobile-trust-badge"
            whileHover={{ scale: 1.05 }}
          >
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="footer-form-mobile-trust-badge-text">Trusted by 10,000+ Customers</span>
          </motion.div>
          
          <motion.h2 
            className="footer-form-mobile-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Enquire Now
          </motion.h2>
        </motion.div>

        {/* Mobile Call Now Section */}
        <motion.div 
          className="footer-form-mobile-call-section"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="footer-form-mobile-call-content">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <div className="footer-form-mobile-call-icon">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.55.57 1 1 0 011 1v3.61a1 1 0 01-.91 1A16 16 0 014 5.92 1 1 0 015 5h3.61a1 1 0 011 1 11.36 11.36 0 00.57 3.55 1 1 0 01-.24 1.01l-2.32 2.23z"/>
                </svg>
              </div>
            </motion.div>
            <motion.a
              href={`tel:+91${dialNumber}`}
              className="footer-form-mobile-call-link"
              aria-label={`Call +91${displayNumber}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="footer-form-mobile-call-number">{displayNumber.replace('+91 ', '')}</span>
            </motion.a>
          </div>
        </motion.div>

        {/* Mobile Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="footer-form-mobile-form-wrapper"
        >
          <motion.div 
            className="footer-form-mobile-form-container"
            whileHover={{ scale: 1.01 }}
          >
            <h3 className="footer-form-mobile-form-title">Get Property Details</h3>
            
            <form onSubmit={handleFormSubmit} className="footer-form-mobile-form">
              <div className="footer-form-mobile-form-fields">
                <div className="footer-form-mobile-form-group">
                  <label className="footer-form-mobile-form-label">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={footerFormData.name}
                    onChange={handleFormChange}
                    placeholder="Enter your name"
                    className="footer-form-mobile-form-input"
                    required
                  />
                </div>

                <div className="footer-form-mobile-form-group">
                  <label className="footer-form-mobile-form-label">Mobile Number</label>
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
                className="footer-form-mobile-submit-button"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <span className="footer-form-mobile-submit-button-content">
                    <svg className="footer-form-mobile-submit-spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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

            <div className="footer-form-mobile-form-footer">
              <p className="footer-form-mobile-form-footer-text">
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
          className="footer-form-mobile-trust-indicators"
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
              className="footer-form-mobile-trust-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
            >
              <div className={`footer-form-mobile-trust-icon ${item.color}`}>
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d={item.icon}/>
                </svg>
              </div>
              <div>
                <h4 className="footer-form-mobile-trust-title">{item.title}</h4>
                <p className="footer-form-mobile-trust-description">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Disclaimer Section */}
        <div className="footer-form-mobile-disclaimer-section">
          <div className="footer-form-mobile-disclaimer-container">
            <div className="footer-form-mobile-disclaimer-content">
              <h4 className="footer-form-mobile-disclaimer-title">Disclaimer</h4>
              <p className="footer-form-mobile-disclaimer-text">
                The information provided on this project page is shared only for general awareness and user understanding. It does not represent any offer, commitment, warranty, or endorsement. Project details are gathered from publicly available sources such as State RERA websites, official builder portals, and documents shared by authorized channel partners, including brochures, price lists, and payment plans. The platform presents this information in a simplified format to help users with research and comparison. It does not own or control the content. Buyers are strongly advised to verify all project details, approvals, pricing, and terms directly with the builder or promoter before making any purchase decision.
              </p>
            </div>
          </div>
        </div>

        {/* Copyright Section - Mobile */}
        <div className="footer-form-mobile-copyright-section">
          <div className="footer-form-mobile-copyright-content">
            <p className="footer-form-mobile-copyright-text">
              Copyright © 2026. {projectViewDetails?.projectName || projectTitle || "100acress"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterFormMobile;
