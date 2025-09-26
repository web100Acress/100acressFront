  import React, { useState } from 'react';
  import { CheckCircle } from 'lucide-react';

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
        <div className="min-h-screen bg-gray-600 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-md">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600">
              We've received your inquiry and will get back to you within 24 hours.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-600 relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')"
          }}
        >
          <div className="absolute inset-0 bg-gray-700 bg-opacity-70"></div>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
          {/* Left Content Section */}
          <div className="lg:w-1/2 p-8 lg:p-16 text-white flex flex-col justify-between min-h-screen">
            <div className="flex-1 flex flex-col justify-center">
              <h1 className="text-4xl lg:text-5xl font-light mb-6 leading-tight">
                You Have Questions,<br />
                We Have Answers
              </h1>
              <p className="text-lg lg:text-xl opacity-90 mb-12 font-light max-w-md">
                Discover experiences you won't find anywhere else — thoughtfully designed to immerse you in the heart of the destination. Soulful stories waiting to be lived.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div>
                <h3 className="text-xl font-medium mb-4">Location</h3>
                <div className="space-y-1 text-sm opacity-90">
                  <p>Anantara Oceanfront Resort</p>
                  <p>123 Serenity Bay Road</p>
                  <p>Koh Samui, Thailand 84320</p>
                  <p className="mt-3">Monday - Sunday | 08:00 - 22:00</p>
                  <p>(local time)</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-4">Social Media</h3>
                <div className="space-y-2 text-sm opacity-90">
                  <p>Instagram</p>
                  <p>LinkedIn</p>
                  <p>Facebook</p>
                  <p>TikTok</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-4">Email</h3>
                <p className="text-sm opacity-90">stay@anantaresort.com</p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-4">Contact</h3>
                <p className="text-sm opacity-90">+66 77 123 456</p>
              </div>
            </div>
          </div>

          {/* Right Form Section */}
          <div className="lg:w-1/2 p-8 lg:p-16 flex items-center justify-center">
            <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-lg">
              <h2 className="text-2xl font-medium text-gray-900 mb-2">
                Tell Us What You Need
              </h2>
              <p className="text-gray-600 mb-8 text-sm">
                Our team is ready to assist you with every detail, big or small.
              </p>

              <div className="space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-gray-300 transition-all"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-gray-300 transition-all"
                  />
                </div>

                {/* Country and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Country"
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-gray-300 transition-all"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-gray-300 transition-all"
                  />
                </div>

                {/* Email */}
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-gray-300 transition-all"
                />

                {/* Inquiry Type */}
                <div>
                  <p className="text-gray-700 mb-3 text-sm">Type of Inquiry</p>
                  <div className="flex flex-wrap gap-2">
                    {['Booking', 'General', 'Wedding', 'Corporate', 'Others'].map((type) => (
                      <button
                        key={type}
                        onClick={() => handleInquiryType(type)}
                        className={`px-4 py-2 rounded-full text-sm transition-all ${
                          formData.inquiryType === type
                            ? 'bg-gray-900 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Message"
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-gray-300 transition-all resize-none"
                />

                {/* Newsletter Checkbox */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500"
                  />
                  <label className="ml-3 text-sm text-gray-600">
                    I'd like to receive exclusive offers and updates
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-4 px-6 rounded-lg transition-colors duration-200"
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