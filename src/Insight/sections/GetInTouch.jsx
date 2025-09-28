import React, { useState } from 'react';
import { CheckCircle, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';

const LuxuryRealEstateContact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    inquiryType: 'General',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleInquiryType = (type) => {
    setFormData({
      ...formData,
      inquiryType: type
    });
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Phone validation (basic Indian mobile number)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s+/g, ''))) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }

    try {
      const base = import.meta.env.VITE_API_BASE || '';
      const url = base ? `${base}/api/contact` : '/api/contact';

      console.log('Submitting to:', url);
      console.log('Form data:', formData);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (response.ok) {
        const responseData = await response.json();
        console.log('Success response:', responseData);
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            inquiryType: 'General',
            message: '',
          });
        }, 2000);
      } else {
        let errorData;
        const responseText = await response.text();
        console.log('Response text:', responseText);

        try {
          errorData = JSON.parse(responseText);
        } catch (parseError) {
          console.error('Failed to parse response as JSON:', parseError);
          errorData = {
            message: `Server error (${response.status}): ${responseText.substring(0, 200)}...`
          };
        }

        console.error('Error response:', response.status, errorData);
        alert(`Failed to submit contact form: ${errorData.message || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Network or fetch error:', error);

      if (error.name === 'AbortError') {
        alert('Request timed out. Please check your connection and try again.');
      } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        alert('Network error. Please check if the server is running and try again.');
      } else {
        alert(`Error: ${error.message || 'Unknown error occurred'}`);
      }
    }
  };

  if (isSubmitted) {
    return (
      <div className="w-full max-w-5xl mx-auto bg-gradient-to-br from-slate-900 to-slate-700 rounded-3xl p-8 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 text-center border border-white/20">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-light text-white mb-2">Thank You!</h3>
          <p className="text-white/70">We'll get back to you within 24 hours.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br via-white to-blue-50 py-2">
      {/* Desktop Layout with Sidebar Space */}
      <div className="md:ml-[260px] flex justify-center">
        <div className="w-full max-w-7xl px-6 lg:px-12 py-2">
          {/* Header Section */}
          <div className="text-center mb-2">
            <h1 className="text-3xl lg:text-4xl font-light text-slate-900 mb-2 tracking-tight">
              Get In
              <span className="block font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Touch With Us
              </span>
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
              Connect with our expert team for personalized real estate guidance and premium property solutions.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-2">
            {/* Contact Information Section */}
            <div className="lg:col-span-1 space-y-4">
              {/* Company Info Card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white">
                {/* <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div> */}
                {/* <h3 className="text-xl font-semibold mb-2">100Acress</h3> */}
                <p className="text-white/80 text-sm mb-4 leading-relaxed">
                  Your trusted partner in premium real estate solutions across India.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                      <Mail className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs uppercase tracking-wide">Email</p>
                      <p className="text-white text-sm">support@100acress.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                      <Phone className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs uppercase tracking-wide">Phone</p>
                      <p className="text-white text-sm">+91 85009 00100</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs uppercase tracking-wide">Location</p>
                      <p className="text-white text-sm">Gurugram, India</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact Options */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Contact</h4>
                <div className="space-y-3">
                  <button
                    onClick={() => window.open('mailto:support@100acress.com', '_self')}
                    className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 rounded-xl transition-all duration-200 group"
                  >
                    <Mail className="w-5 h-5 text-blue-600 group-hover:text-blue-700" />
                    <span className="text-gray-700 group-hover:text-gray-900 font-medium">Send Email</span>
                  </button>
                  <button
                    onClick={() => window.open('tel:+918500900100', '_self')}
                    className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-xl transition-all duration-200 group"
                  >
                    <Phone className="w-5 h-5 text-green-600 group-hover:text-green-700" />
                    <span className="text-gray-700 group-hover:text-gray-900 font-medium">Call Now</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Form Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 lg:p-6">
                <div className="mb-3">
                  <h2 className="text-2xl lg:text-3xl font-light text-gray-900 mb-2">
                    Send us a Message
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Fill out the form below and we'll get back to you within 24 hours with expert guidance.
                  </p>
                </div>

                <div className="space-y-3">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('firstName')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="First Name"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                      />
                      {focusedField === 'firstName' && (
                        <div className="absolute -bottom-0.5 left-4 right-4 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('lastName')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Last Name"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                      />
                      {focusedField === 'lastName' && (
                        <div className="absolute -bottom-0.5 left-4 right-4 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                      )}
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Email Address"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                      />
                      {focusedField === 'email' && (
                        <div className="absolute -bottom-0.5 left-4 right-4 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Phone Number"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                      />
                      {focusedField === 'phone' && (
                        <div className="absolute -bottom-0.5 left-4 right-4 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                      )}
                    </div>
                  </div>

                  {/* Inquiry Type */}
                  <div>
                    <label className="block text-gray-700 mb-3 font-medium">Inquiry Type</label>
                    <div className="flex flex-wrap gap-3">
                      {['General', 'Booking', 'Support', 'Partnership'].map((type) => (
                        <button
                          key={type}
                          onClick={() => handleInquiryType(type)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                            formData.inquiryType === type
                              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-400/25'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Tell us about your requirements..."
                      rows="4"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 resize-none"
                    />
                    {focusedField === 'message' && (
                      <div className="absolute -bottom-0.5 left-4 right-4 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg shadow-blue-400/25 hover:shadow-xl hover:shadow-blue-400/40 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 group"
                  >
                    <span>Send Message</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LuxuryRealEstateContact;