import React, { useState, useEffect } from "react";
import Footer from "../Components/Actual_Components/Footer";
import axios from "axios";
import { Helmet } from "react-helmet";
import { HandShakeIcon, HeadPhoneIcon, PlayButtonIcon } from "../Assets/icons";
import { FaWhatsapp, FaMapMarkerAlt, FaShieldAlt, FaHeadset, FaCheckCircle, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
import { toast } from "react-hot-toast";
const ContactUs = () => {
  const [formDataInquiry, setFormDataInquiry] = useState({
    name: "",
    mobile: "",
    message: "",
    status: "",
  });

  const [responseFillData, setResponsefillData] = useState("");
  const [formValidationErrors, setFormValidationErrors] = useState({
    name: "",
    mobile: "",
    message: ""
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState("");


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
      default:
        break;
    }
    return errorMessage;
  };

  useEffect(() => {
    const { name, mobile } = formDataInquiry;
    const noErrors = Object.values(formValidationErrors).every(error => error === "");
    if ((!name || !mobile) || !noErrors) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [formDataInquiry, formValidationErrors]);

  const handleInquiryDataChange = (e) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormDataInquiry(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate and set error
    const errorMessage = validateField(name, value);
    setFormValidationErrors(prev => ({
      ...prev,
      [name]: errorMessage
    }));
  };

  const resetData = () => {
    setFormDataInquiry({
      name: "",
      mobile: "",
      message: "",
      status: "",
    });
    setResponsefillData("");
    setIsSubmitting(false);
    setShowSuccess(false);
  };

  const handleInquirySubmitData = async (e) => {
    e.preventDefault();
    const { name, mobile, message } = formDataInquiry;
    
    if (!name || !mobile) {
      toast.error("Please fill out all required fields.");
      return;
    }
    setIsSubmitting(true);
    try {
      await axios.post(
        "/contact_Insert",
        formDataInquiry
      );
      setShowSuccess(true);
      toast.success("Message sent successfully! We'll get back to you soon.");
      resetData();
    } catch (error) {
      if (error.response) {
        console.error("Server error:", error.response.data);
        toast.error("Server error. Please try again.");
      } else if (error.request) {
        console.error("Request error:", error.request);
        toast.error("Network error. Please check your connection.");
      } else {
        console.error("Error:", error.message);
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="overflow-x-hidden min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <Helmet>
        <title>Contact Us | Reach Out to 100acress.com Experts Guidance</title>
        <meta
          name="description"
          content="Have questions or need assistance? Contact the 100acress.com team for support with property listings, buying, selling, or renting. We're here to help!"
        />
        <link
          rel="canonical"
          href="https://www.100acress.com/contact-us/"
        />
      </Helmet>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 space-y-4">
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/919999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center"
        >
          <FaWhatsapp className="text-2xl" />
          <span className="ml-2 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            WhatsApp
          </span>
        </a>

        {/* Call Now Button */}
        <a
          href="tel:+919999999999"
          className="group bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center"
        >
          <FaPhone className="text-xl" />
          <span className="ml-2 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Call Now
          </span>
        </a>
      </div>

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gradient-to-r from-gray-600 to-gray-800 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <FaPhone className="mr-2 animate-pulse" />
            Get In Touch
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{fontFamily: "'Poppins', sans-serif"}}>
            <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
              Let's Connect
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" style={{fontFamily: "'Inter', sans-serif"}}>
            Ready to find your dream property? Our expert team is here to guide you every step of the way.
          </p>
        </div>

        {/* How Can We Help Section */}
        <div className="max-w-7xl mx-auto mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center" style={{fontFamily: "'Poppins', sans-serif"}}>
            How Can We Help?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sales Card */}
            <div className="group relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-102 hover:-translate-y-2 border border-gray-200 overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full -translate-y-10 translate-x-10 opacity-50"></div>
              <div className="relative">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-br from-gray-600 to-gray-700 p-3 rounded-2xl mr-4 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                    <HandShakeIcon />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>
                    Sales & Properties
                  </h4>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed" style={{fontFamily: "'Inter', sans-serif"}}>
                  Find your perfect property with our expert guidance and personalized service.
                </p>
                <button className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Start Your Search
                </button>
              </div>
            </div>

            {/* Help & Support Card */}
            <div className="group relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-102 hover:-translate-y-2 border border-gray-200 overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full -translate-y-10 translate-x-10 opacity-50"></div>
              <div className="relative">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-3 rounded-2xl mr-4 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                    <HeadPhoneIcon />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>
                    Customer Support
                  </h4>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed" style={{fontFamily: "'Inter', sans-serif"}}>
                  Get instant help with your queries, property details, and technical support.
                </p>
                <button className="w-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Get Help Now
                </button>
              </div>
            </div>

            {/* Media & Press Card */}
            <div className="group relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-102 hover:-translate-y-2 border border-gray-200 overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full -translate-y-10 translate-x-10 opacity-50"></div>
              <div className="relative">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-3 rounded-2xl mr-4 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                    <PlayButtonIcon />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>
                    Media & Press
                  </h4>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed" style={{fontFamily: "'Inter', sans-serif"}}>
                  Access our latest news, press releases, and media resources.
                </p>
                <button className="w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  View Resources
                </button>
              </div>
            </div>
          </div>
        </div>


      {/* Visit Our Office Section */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 mb-20">
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Map */}
          <div className="h-96 lg:h-full">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4344.905143305603!2d77.03664807615228!3d28.42470899348659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d199798fbf30b%3A0x6bed77c5ce67ba8a!2s100acress.com!5e1!3m2!1sen!2sin!4v1760247585064!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{border: 0}} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="100acress.com Office Location"
            />
          </div>
          
          {/* Contact Form */}
          <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6" style={{fontFamily: "'Poppins', sans-serif"}}>
              Visit Our Office
            </h3>
            
            <form onSubmit={handleInquirySubmitData} className="space-y-4">
              {/* Name Field */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="name">
                  Full Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter your full name"
                    onChange={handleInquiryDataChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField('')}
                            className={`w-full px-4 py-3 pl-10 rounded-xl border-2 transition-all duration-300 ${
                              focusedField === 'name' 
                                ? 'border-gray-600 shadow-lg ring-2 ring-gray-200 bg-white' 
                                : 'border-gray-200 hover:border-gray-300 bg-white'
                            } focus:outline-none focus:ring-2 focus:ring-gray-200`}
                    value={formDataInquiry.name}
                  />
                  <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                {formValidationErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{formValidationErrors.name}</p>
                )}
              </div>

              {/* Mobile Field */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="mobile">
                  Mobile Number *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="mobile"
                    id="mobile"
                    placeholder="Enter your mobile number"
                    onChange={handleInquiryDataChange}
                    onFocus={() => setFocusedField('mobile')}
                    onBlur={() => setFocusedField('')}
                            className={`w-full px-4 py-3 pl-10 rounded-xl border-2 transition-all duration-300 ${
                              focusedField === 'mobile' 
                                ? 'border-gray-600 shadow-lg ring-2 ring-gray-200 bg-white' 
                                : 'border-gray-200 hover:border-gray-300 bg-white'
                            } focus:outline-none focus:ring-2 focus:ring-gray-200`}
                    value={formDataInquiry.mobile}
                  />
                  <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                {formValidationErrors.mobile && (
                  <p className="text-red-500 text-sm mt-1">{formValidationErrors.mobile}</p>
                )}
              </div>

              {/* Message Field */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  placeholder="Tell us about your property requirements..."
                  rows={3}
                  onChange={handleInquiryDataChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField('')}
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 resize-none ${
                            focusedField === 'message' 
                              ? 'border-gray-600 shadow-lg ring-2 ring-gray-200 bg-white' 
                              : 'border-gray-200 hover:border-gray-300 bg-white'
                          } focus:outline-none focus:ring-2 focus:ring-gray-200`}
                  value={formDataInquiry.message}
                />
                {formValidationErrors.message && (
                  <p className="text-red-500 text-sm mt-1">{formValidationErrors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                        className={`w-full py-3 px-6 rounded-xl font-bold transition-all duration-300 transform ${
                          !isFormValid || isSubmitting
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 hover:scale-105 shadow-lg hover:shadow-xl'
                        } text-white`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Contact Details Cards */}
      <div className="max-w-6xl mx-auto mb-20">
        <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center" style={{fontFamily: "'Poppins', sans-serif"}}>
          Get In Touch
        </h3>
        
        <div className="grid md:grid-cols-3 gap-8">
                  {/* Phone Card */}
                  <a href="tel:+919999999999" className="group flex items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
                    <div className="bg-gray-100 p-4 rounded-xl mr-4 group-hover:bg-gray-200 transition-colors duration-300">
                      <FaPhone className="text-gray-600 text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1" style={{fontFamily: "'Poppins', sans-serif"}}>Call Us</h4>
                      <p className="text-gray-600 font-semibold" style={{fontFamily: "'Inter', sans-serif"}}>+91 99999 99999</p>
                    </div>
                  </a>

                  {/* Email Card */}
                  <a href="mailto:info@100acress.com" className="group flex items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
                    <div className="bg-gray-100 p-4 rounded-xl mr-4 group-hover:bg-gray-200 transition-colors duration-300">
                      <FaEnvelope className="text-gray-600 text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1" style={{fontFamily: "'Poppins', sans-serif"}}>Email Us</h4>
                      <p className="text-gray-600 font-semibold" style={{fontFamily: "'Inter', sans-serif"}}>info@100acress.com</p>
                    </div>
                  </a>

                  {/* Address Card */}
                  <div className="group flex items-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                    <div className="bg-gray-100 p-4 rounded-xl mr-4">
                      <FaMapMarkerAlt className="text-gray-600 text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1" style={{fontFamily: "'Poppins', sans-serif"}}>Our Address</h4>
                      <p className="text-gray-600 font-semibold" style={{fontFamily: "'Inter', sans-serif"}}>100acress.com Office<br />Gurgaon, Haryana, India</p>
                    </div>
                  </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-2" style={{fontFamily: "'Poppins', sans-serif"}}>
            Why Choose 100acress?
          </h3>
          <p className="text-gray-600" style={{fontFamily: "'Inter', sans-serif"}}>
            Trusted by thousands of property seekers across India
          </p>
        </div>
        
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center group">
                    <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 group-hover:bg-gray-200 transition-colors duration-300">
                      <FaShieldAlt className="text-2xl text-gray-600 mx-auto" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2" style={{fontFamily: "'Poppins', sans-serif"}}>
                      Verified Listings
                    </h4>
                    <p className="text-gray-600 text-sm" style={{fontFamily: "'Inter', sans-serif"}}>
                      All properties are verified and authentic
                    </p>
                  </div>
                  
                  <div className="text-center group">
                    <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 group-hover:bg-gray-200 transition-colors duration-300">
                      <FaHeadset className="text-2xl text-gray-600 mx-auto" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2" style={{fontFamily: "'Poppins', sans-serif"}}>
                      Expert Support
                    </h4>
                    <p className="text-gray-600 text-sm" style={{fontFamily: "'Inter', sans-serif"}}>
                      Professional guidance from real estate experts
                    </p>
                  </div>
                  
                  <div className="text-center group">
                    <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 group-hover:bg-gray-200 transition-colors duration-300">
                      <FaClock className="text-2xl text-gray-600 mx-auto" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2" style={{fontFamily: "'Poppins', sans-serif"}}>
                      24x7 Assistance
                    </h4>
                    <p className="text-gray-600 text-sm" style={{fontFamily: "'Inter', sans-serif"}}>
                      Round-the-clock support for all your needs
                    </p>
                  </div>
                </div>
      </div>
    </main>
    
    <Footer />
  </div>
);
};

export default ContactUs;
