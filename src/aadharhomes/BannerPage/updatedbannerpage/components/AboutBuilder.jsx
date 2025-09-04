import React, { useState } from 'react';

const AboutBuilder = ({ 
  builderName = "Max Estates",
  description = [
    "Max Estates is committed to creating sustainable, Grade A developments in Delhi NCR, with a strong emphasis on well-being and holistic living. Each project is thoughtfully designed to balance functionality, aesthetics, and environmental responsibility, fostering spaces that encourage collaboration, innovation, and community.",
    "With developments spanning diverse asset classes and prime locations, Max Estates ensures a strategic mix of delivered, near-completion, and upcoming projects. Our vision is to become the most trusted and preferred real estate brand in the region, driven by the passion to elevate quality of life while setting new benchmarks in sustainable, wellness-focused urban development."
  ],
  onSubmit = (formData) => {
    console.log('Form submitted:', formData);
  }
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    message: '',
    authorized: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <section className="bg-black py-16 px-6 md:px-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 100L100 0L200 100L300 0L400 100V400H0V100Z" fill="white"/>
          <path d="M0 200L100 100L200 200L300 100L400 200V400H0V200Z" fill="white"/>
          <path d="M0 300L100 200L200 300L300 200L400 300V400H0V300Z" fill="white"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Column - Builder Content */}
          <div>
            {/* Section Title */}
            <div className="mb-6">
              <h2 className="text-orange-500 uppercase font-semibold tracking-wide text-xl mb-4">
                ABOUT BUILDER
              </h2>
              <div className="border-t border-orange-500 w-24 mt-2"></div>
            </div>

            {/* Sub-heading */}
            <h3 className="text-white text-2xl font-bold mb-6">
              About {builderName}
            </h3>

            {/* Description Paragraphs */}
            <div className="text-white/80 text-base leading-relaxed space-y-4">
              {description.map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <div className="border border-orange-500 p-8 bg-black/40">
              <form onSubmit={handleSubmit}>
                {/* Name Field */}
                <input
                  type="text"
                  name="name"
                  placeholder="NAME"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-gray-900 text-white p-3 mb-4 border-b border-orange-500 focus:outline-none placeholder-gray-400"
                  required
                />

                {/* Email Field */}
                <input
                  type="email"
                  name="email"
                  placeholder="EMAIL ID"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-900 text-white p-3 mb-4 border-b border-orange-500 focus:outline-none placeholder-gray-400"
                  required
                />

                {/* Contact Field */}
                <input
                  type="tel"
                  name="contact"
                  placeholder="CONTACT NO"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className="w-full bg-gray-900 text-white p-3 mb-4 border-b border-orange-500 focus:outline-none placeholder-gray-400"
                  required
                />

                {/* Message Field */}
                <textarea
                  name="message"
                  placeholder="MESSAGE"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full bg-gray-900 text-white p-3 mb-4 border-b border-orange-500 focus:outline-none placeholder-gray-400 resize-none"
                ></textarea>

                {/* Checkbox */}
                <div className="flex items-start gap-3 mb-6">
                  <input
                    type="checkbox"
                    name="authorized"
                    id="authorized"
                    checked={formData.authorized}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-orange-500 bg-gray-900 border-orange-500 rounded focus:ring-orange-500"
                  />
                  <label htmlFor="authorized" className="text-xs text-white/70">
                    I authorize company representatives to Call, SMS, Email or WhatsApp me about its products and offers. This consent overrides any registration for DNC/NDNC.
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="mt-6 w-full bg-orange-500 text-black font-semibold py-3 uppercase hover:bg-orange-600 transition"
                >
                  SUBMIT NOW
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBuilder;
