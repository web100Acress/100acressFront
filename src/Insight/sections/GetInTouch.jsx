import React, { useState } from 'react';
import { CheckCircle, Instagram, Linkedin, Facebook } from 'lucide-react';

const LuxuryRealEstateContact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    phone: '',
    email: '',
    inquiryType: 'General',
    message: '',
    newsletter: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleInquiryType = (type) => {
    setFormData({
      ...formData,
      inquiryType: type
    });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        country: '',
        phone: '',
        email: '',
        inquiryType: 'General',
        message: '',
        newsletter: false
      });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-700 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md">
          <CheckCircle className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
          <h3 className="text-3xl font-light text-gray-900 mb-3">Thank You!</h3>
          <p className="text-gray-600 text-lg">
            We've received your inquiry and will get back to you within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-700 relative overflow-hidden">
      {/* Enhanced Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/80 via-slate-700/70 to-slate-600/60"></div>
      </div>

      <div className="relative z-10 flex flex-col xl:flex-row min-h-screen">
        {/* Enhanced Left Content Section */}
        <div className="xl:w-1/2 p-8 lg:p-16 xl:p-20 text-white flex flex-col justify-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-extralight mb-8 leading-[0.9] tracking-tight">
              You Have Questions,<br />
              <span className="text-slate-200">We Have Answers</span>
            </h1>
            <p className="text-xl lg:text-2xl text-slate-200 font-light leading-relaxed mb-16 max-w-lg">
              Discover experiences you won't find anywhere else — thoughtfully designed to immerse you in the heart of the destination. Soulful stories waiting to be lived.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-2xl">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-light mb-6 text-slate-100">Location</h3>
                <div className="space-y-2 text-slate-300 leading-relaxed">
                  <p className="font-medium text-white">Anantara Oceanfront Resort</p>
                  <p>123 Serenity Bay Road</p>
                  <p>Koh Samui, Thailand 84320</p>
                  <div className="pt-4 border-t border-slate-600 mt-6">
                    <p className="text-white font-medium">Monday - Sunday</p>
                    <p>08:00 - 22:00 (local time)</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-light mb-6 text-slate-100">Email</h3>
                <p className="text-slate-200 text-lg">stay@anantaresort.com</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-light mb-6 text-slate-100">Social Media</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Instagram className="w-5 h-5 text-slate-300" />
                    <span className="text-slate-300">Instagram</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Linkedin className="w-5 h-5 text-slate-300" />
                    <span className="text-slate-300">LinkedIn</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Facebook className="w-5 h-5 text-slate-300" />
                    <span className="text-slate-300">Facebook</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-slate-300 rounded-sm flex items-center justify-center">
                      <span className="text-slate-700 text-xs font-bold">T</span>
                    </div>
                    <span className="text-slate-300">TikTok</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-light mb-6 text-slate-100">Contact</h3>
                <p className="text-slate-200 text-lg">+66 77 123 456</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Right Form Section */}
        <div className="xl:w-1/2 p-8 lg:p-16 xl:p-20 flex items-center justify-center">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-10 w-full max-w-2xl border border-white/20">
            <div className="mb-10">
              <h2 className="text-3xl font-light text-gray-900 mb-3">
                Tell Us What You Need
              </h2>
              <p className="text-gray-600 text-lg">
                Our team is ready to assist you with every detail, big or small.
              </p>
            </div>

            <div className="space-y-6">
              {/* Enhanced Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    className="w-full px-6 py-4 bg-gray-50/80 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all text-lg"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    className="w-full px-6 py-4 bg-gray-50/80 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all text-lg"
                  />
                </div>
              </div>

              {/* Enhanced Country and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Country"
                  className="w-full px-6 py-4 bg-gray-50/80 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all text-lg"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  className="w-full px-6 py-4 bg-gray-50/80 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all text-lg"
                />
              </div>

              {/* Enhanced Email */}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                className="w-full px-6 py-4 bg-gray-50/80 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all text-lg"
              />

              {/* Enhanced Inquiry Type */}
              <div>
                <p className="text-gray-800 mb-4 text-lg font-medium">Type of Inquiry</p>
                <div className="flex flex-wrap gap-3">
                  {['Booking', 'General', 'Wedding', 'Corporate', 'Others'].map((type) => (
                    <button
                      key={type}
                      onClick={() => handleInquiryType(type)}
                      className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-200 ${
                        formData.inquiryType === type
                          ? 'bg-slate-900 text-white shadow-lg scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Enhanced Message */}
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Message"
                rows="5"
                className="w-full px-6 py-4 bg-gray-50/80 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all resize-none text-lg"
              />

              {/* Enhanced Newsletter Checkbox */}
              <div className="flex items-start space-x-4 py-2">
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleInputChange}
                  className="w-5 h-5 mt-1 text-slate-600 bg-gray-100 border-gray-300 rounded focus:ring-slate-500 focus:ring-2"
                />
                <label className="text-gray-700 text-lg leading-relaxed">
                  I'd like to receive exclusive offers and updates
                </label>
              </div>

              {/* Enhanced Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-5 px-8 rounded-2xl transition-all duration-200 text-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LuxuryRealEstateContact;