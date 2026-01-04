import React, { useState, useCallback } from 'react';
import api from '../../../../config/apiClient';
import { message } from 'antd';
import CountryCodeSelector from '../../../../Components/Actual_Components/CountryCodeSelector';

const FooterForm = ({ builderName = "Premium", projectViewDetails = {}, projectTitle = "", location = "" }) => {
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
        message.success("Details Submitted Successfully", 3);
        resetFormData();
        setButtonText("Get Details Now");
      } catch (error) {
        console.error("Error:", error.message);
        message.error("Error: " + error.message);
        setButtonText("Get Details Now");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      message.error("Please fill in valid name and mobile number");
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
    <div className="bg-gradient-to-b from-gray-900 to-black py-8 md:py-2 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
          
          {/* Left Side - Credible Text Content */}
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-amber-500/10 rounded-full border border-amber-500/20">
                <svg className="w-4 h-4 text-amber-400 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="text-amber-300 text-sm font-medium">Trusted by 10,000+ Customers</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Enquire Now
              </h2>
              
            </div>

            {/* Call Now Section - Moved from bottom */}
            <div className="p-3 md:p-4 bg-gradient-to-r from-amber-500/10 to-amber-600/5 rounded-2xl border border-amber-500/20">
              <div className="flex items-center gap-0">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.55.57 1 1 0 011 1v3.61a1 1 0 01-.91 1A16 16 0 014 5.92 1 1 0 015 5h3.61a1 1 0 011 1 11.36 11.36 0 00.57 3.55 1 1 0 01-.24 1.01l-2.32 2.23z"/>
                    </svg>
                  </div>
                </div>
                <a
                  href={`tel:+91${dialNumber}`}
                  className="inline-flex items-center justify-center gap-0 px-3 py-2  rounded-xl text-amber-400 font-bold hover:text-amber-300 transition-all duration-300 transform hover:scale-105 text-2xl md:text-4xl"
                  aria-label={`Call +91${displayNumber}`}
                >
                  <span className="font-extrabold tracking-wide leading-none -translate-y-1">{displayNumber.replace('+91 ', '')}</span>
                </a>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div className="flex items-start space-x-3 md:space-x-4 p-3 md:p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-400 text-lg md:text-xl" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1 text-sm md:text-base">100% Secure</h4>
                  <p className="text-gray-400 text-xs md:text-sm">Your data is protected with bank-level security</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 md:space-x-4 p-3 md:p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-400 text-lg md:text-xl" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1 text-sm md:text-base">Quick Response</h4>
                  <p className="text-gray-400 text-xs md:text-sm">Get callback within 5 minutes</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 md:space-x-4 p-3 md:p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-amber-500/10 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-amber-400 text-lg md:text-xl" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1 text-sm md:text-base">Expert Guidance</h4>
                  <p className="text-gray-400 text-xs md:text-sm">Certified property consultants</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 md:space-x-4 p-3 md:p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-400 text-lg md:text-xl" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1 text-sm md:text-base">Premium Service</h4>
                  <p className="text-gray-400 text-xs md:text-sm">Exclusive property deals & insights</p>
                </div>
              </div>
            </div>

            {/* Statistics */}
            {/* <div className="flex items-center justify-center sm:justify-start space-x-4 sm:space-x-8 pt-4">
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-amber-400">10K+</div>
                <div className="text-gray-400 text-xs md:text-sm">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-green-400">500+</div>
                <div className="text-gray-400 text-xs md:text-sm">Properties Sold</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-blue-400">15+</div>
                <div className="text-gray-400 text-xs md:text-sm">Years Experience</div>
              </div>
            </div> */}
          </div>

          {/* Right Side - Contact Form */}
          <div className="lg:pl-8">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50 shadow-2xl">
              <div className="mb-6">
                <div className="text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Get Started Today</h3>
                  <p className="text-gray-400 text-sm md:text-base">Fill out the form and we'll contact you shortly</p>
                </div>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4 md:space-y-6">
                {/* Name Field */}
                <div className="relative">
                  
                  <svg className="w-4 h-4 text-amber-400 absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-base md:text-lg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  <input
                    className="peer w-full pl-10 md:pl-12 pr-4 py-3 md:py-4 rounded-xl bg-gray-800/70 text-white focus:ring-2 focus:ring-amber-400 border border-gray-600 outline-none placeholder-transparent transition-all duration-300 text-sm md:text-base"
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={footerFormData.name}
                    onChange={handleFormChange}
                    required
                  />
                  <span className="absolute left-10 md:left-12 top-3 md:top-4 px-2 bg-gray-800/70 text-gray-400 text-xs md:text-sm transition-all duration-300 transform origin-left pointer-events-none
                  peer-placeholder-shown:top-3 md:peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:bg-transparent
                  peer-focus:top-1 peer-focus:scale-75 peer-focus:bg-gray-800/70 peer-focus:text-amber-400
                  peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:bg-gray-800/70 peer-[:not(:placeholder-shown)]:text-gray-400">
                    Full Name
                  </span>
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                 
                  <CountryCodeSelector
                    selectedCountryCode={footerFormData.countryCode}
                    onCountryCodeChange={handleCountryCodeChange}
                    phoneNumber={footerFormData.mobile}
                    onPhoneNumberChange={handlePhoneNumberChange}
                    placeholder="Enter phone number"
                    className="w-full"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex items-center pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-amber-500/25 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {buttonText}
                      <svg className="w-4 h-4 md:w-5 md:h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              </form>

              {/* Privacy Notice */}
              <p className="text-xs text-gray-400 mt-6 text-center">
                <svg className="w-3 h-3 text-amber-400 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                </svg>
                Your information is secure and will not be shared with third parties
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer Section */}
      <div className="bg-gradient-to-b from-gray-900 to-black py-8 px-4 border-t border-gray-800 mt-8">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-sm text-gray-300 leading-relaxed text-justify">
            <p className="mb-4">
              <strong>Disclaimer:</strong> The information provided on this project page is shared only for general awareness and user understanding. It does not represent any offer, commitment, warranty, or endorsement. Project details are gathered from publicly available sources such as State RERA websites, official builder portals, and documents shared by authorized channel partners, including brochures, price lists, and payment plans. The platform presents this information in a simplified format to help users with research and comparison. It does not own or control the content. Buyers are strongly advised to verify all project details, approvals, pricing, and terms directly with the builder or promoter before making any purchase decision.
            </p>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-white/20">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <p className="text-center text-gray-400 text-sm">
            Copyright © 2026. {projectViewDetails?.projectName || projectTitle || "100acress"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FooterForm;
