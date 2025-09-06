import React, { useState, useCallback } from 'react';
import api from '../../../../config/apiClient';
import { message } from 'antd';

const FooterForm = ({ builderName = "Premium" }) => {
  // Footer form state
  const [footerFormData, setFooterFormData] = useState({
    name: "",
    email: "",
    mobile: "",
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
      email: "",
      mobile: "",
    });
  };

  const handleFormSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (isSubmitting) {
      return;
    }
    const { mobile, name } = footerFormData;

    if (/^([+]\d{2})?\d{10}$/.test(mobile) && name.trim()) {
      setIsSubmitting(true);
      setButtonText("Submitting...");

      try {
        await api.post('userInsert', {
          ...footerFormData,
          projectName: builderName + " Projects",
          address: "Related Projects Section",
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

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black py-12 border-t border-gray-800">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get Exclusive Details
          </h3>
          <p className="text-gray-400 text-lg">
            Connect with our experts for personalized assistance and latest updates
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
          <form onSubmit={handleFormSubmit} className="grid md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div className="relative">
              <i className="fa-solid fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-400 text-lg"></i>
              <input
                className="peer w-full pl-12 pr-4 py-4 rounded-xl bg-gray-800/70 text-white focus:ring-2 focus:ring-amber-400 border border-gray-600 outline-none placeholder-transparent transition-all duration-300"
                type="text"
                name="name"
                placeholder="Full Name"
                value={footerFormData.name}
                onChange={handleFormChange}
                required
              />
              <span className="absolute left-12 top-4 px-2 bg-gray-800/70 text-gray-400 text-sm transition-all duration-300 transform origin-left pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:bg-transparent peer-focus:top-1 peer-focus:scale-75 peer-focus:bg-gray-800/70 peer-focus:text-amber-400">
                Full Name
              </span>
            </div>

            {/* Phone Field */}
            <div className="relative">
              <i className="fa-solid fa-phone absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-400 text-lg"></i>
              <input
                className="peer w-full pl-12 pr-4 py-4 rounded-xl bg-gray-800/70 text-white focus:ring-2 focus:ring-amber-400 border border-gray-600 outline-none placeholder-transparent transition-all duration-300"
                type="tel"
                name="mobile"
                placeholder="Contact Number"
                value={footerFormData.mobile}
                onChange={(e) => {
                  const value = e.target.value;
                  // Allow only numbers and ensure length is between 9 and 10 digits
                  if (/^\d*$/.test(value) && value.length <= 10) {
                    handleFormChange(e);
                  }
                }}
                required
              />
              <span className="absolute left-12 top-4 px-2 bg-gray-800/70 text-gray-400 text-sm transition-all duration-300 transform origin-left pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:bg-transparent peer-focus:top-1 peer-focus:scale-75 peer-focus:bg-gray-800/70 peer-focus:text-amber-400">
                Contact Number
              </span>
            </div>

            {/* Email Field */}
            <div className="relative">
              <i className="fa-solid fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-400 text-lg"></i>
              <input
                className="peer w-full pl-12 pr-4 py-4 rounded-xl bg-gray-800/70 text-white focus:ring-2 focus:ring-amber-400 border border-gray-600 outline-none placeholder-transparent transition-all duration-300"
                type="email"
                name="email"
                placeholder="Email Address"
                value={footerFormData.email}
                onChange={handleFormChange}
              />
              <span className="absolute left-12 top-4 px-2 bg-gray-800/70 text-gray-400 text-sm transition-all duration-300 transform origin-left pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:bg-transparent peer-focus:top-1 peer-focus:scale-75 peer-focus:bg-gray-800/70 peer-focus:text-amber-400">
                Email Address (Optional)
              </span>
            </div>

            {/* Submit Button */}
            <div className="flex items-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-amber-500/25 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center">
                  {buttonText}
                  <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </form>

          {/* Privacy Notice */}
          <p className="text-xs text-gray-400 mt-6 text-center">
            <i className="fa-solid fa-shield-halved text-amber-400 mr-2"></i>
            Your information is secure and will not be shared with third parties
          </p>
        </div>
      </div>
    </div>
  );
};

export default FooterForm;
