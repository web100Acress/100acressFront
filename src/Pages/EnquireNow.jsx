import React, { useState, useEffect } from "react";
import Footer from "../Components/Actual_Components/Footer";
import Navbar from "../aadharhomes/navbar/Navbar";
import axios from "axios";
import { getApiBase } from "../config/apiBase";
import { Helmet } from "react-helmet";
import { FaWhatsapp, FaMapMarkerAlt, FaShieldAlt, FaHeadset, FaCheckCircle, FaPhone, FaEnvelope, FaClock, FaGift, FaPercent, FaCalendarAlt, FaRocket } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const EnquireNow = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    budget: "",
    message: "",
  });

  const [formValidationErrors, setFormValidationErrors] = useState({
    name: "",
    mobile: "",
    budget: "",
    message: ""
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  const propertyTypes = [
    "Residential Apartment",
    "Villa/Independent House", 
    "Plot/Land",
    "Commercial Office",
    "Retail Shop",
    "Studio Apartment"
  ];

  const budgetRanges = [
    "Under 1 Crore",
    "1 Crore - 5 Crore", 
    "5 Crore - 10 Crores",
    "10 Crores - 20 Crores",
    "20 Crores - 50 Crores",
    "Above 50 Crores"
  ];

  const cities = [
    "Gurugram",
    "Delhi", 
    "Noida",
    "Faridabad",
    "Ghaziabad",
    "Other"
  ];

  const validateField = (name, value) => {
    let errorMessage = "";
    
    switch (name) {
      case "name":
        if (!value) {
          errorMessage = "Name is required";
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          errorMessage = "Please enter a valid full name";
        }
        break;
      case "mobile":
        if (!value) {
          errorMessage = "Mobile number is required";
        } else if (!/^\d{10}$/.test(value)) {
          errorMessage = "Please enter a valid 10-digit mobile number";
        }
        break;
      case "budget":
        if (!value) {
          errorMessage = "Budget range is required";
        }
        break;
      case "message":
        // Message is optional - no validation required
        break;
      default:
        break;
    }
    return errorMessage;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Handle mobile number input
    if (name === "mobile") {
      const numericValue = value.replace(/\D/g, "").slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: numericValue }));
      
      const error = validateField(name, numericValue);
      setFormValidationErrors(prev => ({ ...prev, [name]: error }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      
      const error = validateField(name, value);
      setFormValidationErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleFieldFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleFieldBlur = (fieldName) => {
    setFocusedField("");
  };

  useEffect(() => {
    const errors = Object.values(formValidationErrors);
    const hasErrors = errors.some(error => error !== "");
    // Check all required fields
    const requiredFields = ['name', 'mobile', 'budget'];
    const hasAllRequiredFields = requiredFields.every(field => 
      formData[field] && formData[field].trim() !== ""
    );
    
    setIsFormValid(!hasErrors && hasAllRequiredFields);
  }, [formData, formValidationErrors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const errors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) errors[key] = error;
    });
    
    if (Object.keys(errors).length > 0) {
      setFormValidationErrors(errors);
      toast.error("Please fix all validation errors");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await axios.post(`${getApiBase()}/api/enquiry/end-of-year-sale`, {
        ...formData,
        enquiryType: "end_of_year_sale",
        timestamp: new Date().toISOString(),
        source: "enquire-now-page"
      });

      if (response.data.success) {
        setShowSuccess(true);
        toast.success("Enquiry submitted successfully!");
        
        // Reset form
        setFormData({
          name: "",
          mobile: "",
          budget: "",
          message: "",
        });
        setFormValidationErrors({
          name: "",
          mobile: "",
          budget: "",
          message: ""
        });
      } else {
        toast.error(response.data.message || "Failed to submit enquiry");
      }
    } catch (error) {
      console.error("Enquiry submission error:", error);
      toast.error("Failed to submit enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-6">
            Your enquiry has been submitted successfully. Our team will contact you within 24 hours with exclusive end-of-year offers!
          </p>
          <button
            onClick={() => setShowSuccess(false)}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Submit Another Enquiry
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>End of Year Sale - Exclusive Property Deals | 100acress.com</title>
        <meta name="description" content="Don't miss out on exclusive end-of-year property deals! Limited time offers on residential and commercial properties. Submit your enquiry now!" />
        <meta name="keywords" content="end of year sale, property deals, exclusive offers, real estate discounts, limited time offers" />
      </Helmet>

      <Navbar transparentWhiteText={true} />

  
      
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0">
            {/* Mobile Image */}
            <img 
              src="https://d16gdc5rm7f21b.cloudfront.net/uploads/1766044910223-end-year-sale-mobile.webp" 
              alt="End of Year Sale"
              className="w-full h-full object-cover lg:hidden"
            />
            {/* Desktop Image */}
            <img 
              src="https://d16gdc5rm7f21b.cloudfront.net/uploads/1766044083906-end-year-sale.webp" 
              alt="End of Year Sale"
              className="w-full h-full object-cover hidden lg:block"
            />
          </div>
          <div className="relative h-96"></div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 pt-0">
          {/* Common Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Left Column - Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              {/* Contact Info */}
              
              
              <div className="space-y-4">
                {[
                  { icon: FaGift, title: "Exclusive Offers", desc: "Limited-time deals not available elsewhere" },
                  { icon: FaShieldAlt, title: "Assured Quality", desc: "Verified properties with clear documentation" },
                  { icon: FaRocket, title: "Quick Possession", desc: "Ready-to-move and near-completion projects" },
                  { icon: FaHeadset, title: "Expert Support", desc: "Dedicated relationship manager for each enquiry" },
                  { icon: FaCalendarAlt, title: "Limited Period", desc: "Offers valid only until December 31, 2025" }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    className="flex gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <benefit.icon className="w-5 h-5 text-red-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                      <p className="text-gray-600 text-sm">{benefit.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              
            </motion.div>

            {/* Right Column - Enquiry Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="block"
            >
              <div className="bg-white rounded-2xl shadow-2xl shadow-red-900/20 p-8 border-2 border-red-500">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Submit Your Enquiry
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => handleFieldFocus("name")}
                      onBlur={() => handleFieldBlur("name")}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                        formValidationErrors.name 
                          ? "border-red-500" 
                          : focusedField === "name" 
                          ? "border-red-500" 
                          : "border-gray-300"
                      }`}
                      placeholder="Enter your full name"
                    />
                    {formValidationErrors.name && (
                      <p className="mt-1 text-sm text-red-600">{formValidationErrors.name}</p>
                    )}
                  </div>

                  {/* Mobile Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      onFocus={() => handleFieldFocus("mobile")}
                      onBlur={() => handleFieldBlur("mobile")}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                        formValidationErrors.mobile 
                          ? "border-red-500" 
                          : focusedField === "mobile" 
                          ? "border-red-500" 
                          : "border-gray-300"
                      }`}
                      placeholder="Enter 10-digit mobile number"
                      maxLength="10"
                    />
                    {formValidationErrors.mobile && (
                      <p className="mt-1 text-sm text-red-600">{formValidationErrors.mobile}</p>
                    )}
                  </div>



                  {/* Budget Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget Range *
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      onFocus={() => handleFieldFocus("budget")}
                      onBlur={() => handleFieldBlur("budget")}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                        formValidationErrors.budget 
                          ? "border-red-500" 
                          : focusedField === "budget" 
                          ? "border-red-500" 
                          : "border-gray-300"
                      }`}
                    >
                      <option value="">Select Budget Range</option>
                      {budgetRanges.map(range => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                    {formValidationErrors.budget && (
                      <p className="mt-1 text-sm text-red-600">{formValidationErrors.budget}</p>
                    )}
                  </div>


                  {/* Message Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onFocus={() => handleFieldFocus("message")}
                      onBlur={() => handleFieldBlur("message")}
                      rows={2}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none ${
                        formValidationErrors.message 
                          ? "border-red-500" 
                          : focusedField === "message" 
                          ? "border-red-500" 
                          : "border-gray-300"
                      }`}
                      placeholder="Tell us about your property requirements..."
                    />
                    {formValidationErrors.message && (
                      <p className="mt-1 text-sm text-red-600">{formValidationErrors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all ${
                      isFormValid && !isSubmitting
                        ? "bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      "Submit Enquiry"
                    )}
                  </button>
                </form>

                
                
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default EnquireNow;
