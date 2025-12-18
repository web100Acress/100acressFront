import React, { useState, useEffect } from "react";
import Footer from "../Components/Actual_Components/Footer";
import FinalNavBar from "../Components/HomePageComponents/NavBar";
import axios from "axios";
import { Helmet } from "react-helmet";
import { FaWhatsapp, FaMapMarkerAlt, FaShieldAlt, FaHeadset, FaCheckCircle, FaPhone, FaEnvelope, FaClock, FaGift, FaPercent, FaCalendarAlt, FaRocket } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const EnquireNow = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    city: "",
    budget: "",
    propertyType: "",
    message: "",
  });

  const [formValidationErrors, setFormValidationErrors] = useState({
    name: "",
    mobile: "",
    email: "",
    city: "",
    budget: "",
    propertyType: "",
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
    "Under 50 Lakhs",
    "50 Lakhs - 1 Crore", 
    "1 Crore - 2 Crores",
    "2 Crores - 5 Crores",
    "Above 5 Crores"
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
      case "email":
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errorMessage = "Please enter a valid email address";
        }
        break;
      case "city":
        if (!value) {
          errorMessage = "City is required";
        }
        break;
      case "budget":
        if (!value) {
          errorMessage = "Budget range is required";
        }
        break;
      case "propertyType":
        if (!value) {
          errorMessage = "Property type is required";
        }
        break;
      case "message":
        if (!value) {
          errorMessage = "Message is required";
        } else if (value.length < 10) {
          errorMessage = "Message must be at least 10 characters long";
        }
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
    const hasAllRequiredFields = Object.values(formData).every(value => 
      value !== "" && value.trim() !== ""
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
      const response = await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/enquiry/end-of-year-sale`, {
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
          email: "",
          city: "",
          budget: "",
          propertyType: "",
          message: "",
        });
        setFormValidationErrors({
          name: "",
          mobile: "",
          email: "",
          city: "",
          budget: "",
          propertyType: "",
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

  
      
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 text-white">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="flex justify-center mb-4">
                <FaGift className="w-12 h-12 text-yellow-300" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                End of Year Sale
              </h1>
              <p className="text-xl md:text-2xl mb-2 text-red-100">
                Exclusive Property Deals - Limited Time Only!
              </p>
            
              <div className="flex justify-center gap-4 mt-6">
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <FaCalendarAlt className="w-4 h-4" />
                  <span className="text-sm font-medium">Valid until Dec 31, 2025</span>
                </div>
                
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Left Column - Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose Our End of Year Sale?
              </h2>
              
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

              {/* Contact Info */}
              <div className="mt-8 p-6 bg-red-50 rounded-lg border border-red-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Immediate Assistance?</h3>
                <div className="space-y-3">
                  <a href="tel:918500900100" className="flex items-center gap-3 text-gray-700 hover:text-red-600 transition-colors">
                    <FaPhone className="w-5 h-5 text-red-600" />
                    <span>+91 85009 00100</span>
                  </a>
                  <a href="https://wa.me/918500900100" className="flex items-center gap-3 text-gray-700 hover:text-red-600 transition-colors">
                    <FaWhatsapp className="w-5 h-5 text-green-600" />
                    <span>Chat on WhatsApp</span>
                  </a>
                  <div className="flex items-center gap-3 text-gray-700">
                    <FaEnvelope className="w-5 h-5 text-red-600" />
                    <span>sales@100acress.com</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Enquiry Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-8">
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

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => handleFieldFocus("email")}
                      onBlur={() => handleFieldBlur("email")}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                        formValidationErrors.email 
                          ? "border-red-500" 
                          : focusedField === "email" 
                          ? "border-red-500" 
                          : "border-gray-300"
                      }`}
                      placeholder="Enter your email address"
                    />
                    {formValidationErrors.email && (
                      <p className="mt-1 text-sm text-red-600">{formValidationErrors.email}</p>
                    )}
                  </div>

                  {/* City Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred City *
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      onFocus={() => handleFieldFocus("city")}
                      onBlur={() => handleFieldBlur("city")}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                        formValidationErrors.city 
                          ? "border-red-500" 
                          : focusedField === "city" 
                          ? "border-red-500" 
                          : "border-gray-300"
                      }`}
                    >
                      <option value="">Select City</option>
                      {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    {formValidationErrors.city && (
                      <p className="mt-1 text-sm text-red-600">{formValidationErrors.city}</p>
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

                  {/* Property Type Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Type *
                    </label>
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleInputChange}
                      onFocus={() => handleFieldFocus("propertyType")}
                      onBlur={() => handleFieldBlur("propertyType")}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                        formValidationErrors.propertyType 
                          ? "border-red-500" 
                          : focusedField === "propertyType" 
                          ? "border-red-500" 
                          : "border-gray-300"
                      }`}
                    >
                      <option value="">Select Property Type</option>
                      {propertyTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {formValidationErrors.propertyType && (
                      <p className="mt-1 text-sm text-red-600">{formValidationErrors.propertyType}</p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onFocus={() => handleFieldFocus("message")}
                      onBlur={() => handleFieldBlur("message")}
                      rows={4}
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

                <div className="mt-6 text-center text-sm text-gray-600">
                  <p>By submitting this form, you agree to be contacted by our team regarding your property enquiry.</p>
                </div>
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
