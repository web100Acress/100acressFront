import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import axios from "axios";

const Footer = () => {
  const [callbackData, setCallbackData] = useState({
    name: "",
    phone: "",
  });

  const handleCallbackSubmit = async (e) => {
    e.preventDefault();
    const { name, phone } = callbackData;
    
    if (!name || !phone) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      await axios.post("contact_Insert", {
        name: name.trim(),
        mobile: phone.trim(),
        email: "",
        projectName: "Footer Instant Callback",
        address: window.location.pathname,
        source: "footer_instant_callback",
      });
      alert("Callback requested successfully");
      setCallbackData({ name: "", phone: "" });
    } catch (error) {
      console.error("Error submitting callback:", error);
      alert("Failed to submit callback. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCallbackData({ ...callbackData, [name]: value });
  };

  return (
    <footer className="w-full bg-gray-900 text-white">
      {/* About & Instant Callback Section */}
      <div style={{background: 'linear-gradient(to right, #8D0101, #680101)'}}>
        <div className="w-full px-6 py-8">
          <div className="flex flex-col lg:flex-row items-start justify-between space-y-8 lg:space-y-0 lg:space-x-20">
            {/* Left: About 100acress.com */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-6">
                About 100acress.com
              </h2>
              <div className="space-y-5">
                <p className="text-white/90 text-base leading-relaxed">
                  100acress.com Real Estate Company specializes in providing premier property solutions tailored to meet your needs. We offer world-class luxury homes with stylish design, premium features, and top-class amenities for a truly exclusive lifestyle.
                </p>
                
              </div>
              <div className="flex flex-col space-y-3 mt-6">
                <div className="flex items-center space-x-3">
                  <IoCall className="text-white" size={18} />
                  <span className="text-white text-sm font-medium">+91 8500-900-100</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-white text-sm font-medium">support@100acress.com</span>
             </div>
             </div>
           </div>

            {/* Right: Instant Callback Form */}
            <div className="flex-1 max-w-lg">
              <h3 className="text-xl font-bold text-white mb-4">Get Instant Callback</h3>
              <p className="text-white/90 text-sm mb-6">Get expert advice on your property investment</p>
              <form onSubmit={handleCallbackSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={callbackData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white transition-all"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={callbackData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white transition-all"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-white py-3 px-6 rounded-lg hover:bg-gray-100 transition-all font-semibold shadow-lg"
                  style={{color: '#8D0101'}}
                 >
                   Contact
                </button>
                <p className="text-white/70 text-xs text-center">
                  Get expert advice on your property investment. Our team will contact you within 24 hours.
                </p>
              </form>
            </div>
          </div>
            </div>
          </div>

      {/* Main Footer Content */}
      <div style={{backgroundColor: '#8D0101'}}>
        <div className="w-full px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Quick Links */}
            <div className="rounded-2xl p-8 transition-all duration-300" style={{backgroundColor: '#680101'}}>
              <h3 className="text-lg font-bold text-white mb-6 relative pb-3 border-b border-white/30">
                Quick Links
              </h3>
              <div className="flex flex-wrap gap-2">
                <Link to="/" className="text-white hover:text-white hover:underline transition-all duration-200 text-sm px-3 py-1 rounded-full" style={{backgroundColor: '#8D0101'}}>Home</Link>
                <Link to="/about-us/" className="text-white hover:text-white hover:underline transition-all duration-200 text-sm px-3 py-1 rounded-full" style={{backgroundColor: '#8D0101'}}>About Us</Link>
                <Link to="/#our-services" className="text-white hover:text-white hover:underline transition-all duration-200 text-sm px-3 py-1 rounded-full" style={{backgroundColor: '#8D0101'}}>Our Services</Link>
                <Link to="/top-luxury-projects/" className="text-white hover:text-white hover:underline transition-all duration-200 text-sm px-3 py-1 rounded-full" style={{backgroundColor: '#8D0101'}}>Luxury Properties</Link>
                <Link to="/blog/" className="text-white hover:text-white hover:underline transition-all duration-200 text-sm px-3 py-1 rounded-full" style={{backgroundColor: '#8D0101'}}>Blog</Link>
                <Link to="/emi-calculator/" className="text-white hover:text-white hover:underline transition-all duration-200 text-sm px-3 py-1 rounded-full" style={{backgroundColor: '#8D0101'}}>EMI Calculator</Link>
                <Link to="/career-with-us/" className="text-white hover:text-white hover:underline transition-all duration-200 text-sm px-3 py-1 rounded-full" style={{backgroundColor: '#8D0101'}}>Career</Link>
                <Link to="/contact-us/" className="text-white hover:text-white hover:underline transition-all duration-200 text-sm px-3 py-1 rounded-full" style={{backgroundColor: '#8D0101'}}>Contact</Link>
              </div>
            </div>

            {/* Popular Cities */}
            <div className="rounded-2xl p-8 transition-all duration-300" style={{backgroundColor: '#680101'}}>
              <h3 className="text-lg font-bold text-white mb-6 relative pb-3 border-b border-white/30">
                Popular Cities
              </h3>
              <div className="flex flex-wrap gap-2">
                <Link to="/projects-in-gurugram/" className="text-white hover:text-white hover:underline transition-all duration-200 text-sm px-3 py-1 rounded-full" style={{backgroundColor: '#8D0101'}}>Flats in Gurugram</Link>
                <Link to="/project-in-delhi/" className="text-white hover:text-white hover:underline transition-all duration-200 text-sm px-3 py-1 rounded-full" style={{backgroundColor: '#8D0101'}}>Flats in Delhi</Link>
                <Link to="/project-in-noida/" className="text-white hover:text-white hover:underline transition-all duration-200 text-sm px-3 py-1 rounded-full" style={{backgroundColor: '#8D0101'}}>Flats in Noida</Link>
                <Link to="/projects-in-goa/" className="text-white hover:text-white hover:underline transition-all duration-200 text-sm px-3 py-1 rounded-full" style={{backgroundColor: '#8D0101'}}>Flats in Goa</Link>
                <Link to="/projects-in-ayodhya/" className="text-white hover:text-white hover:underline transition-all duration-200 text-sm px-3 py-1 rounded-full" style={{backgroundColor: '#8D0101'}}>Flats in Ayodhya</Link>
                <Link to="/project-in-mumbai/" className="text-white hover:text-white hover:underline transition-all duration-200 text-sm px-3 py-1 rounded-full" style={{backgroundColor: '#8D0101'}}>Flats in Mumbai</Link>
                <Link to="/projects-in-panipat/" className="text-white hover:text-white hover:underline transition-all duration-200 text-sm px-3 py-1 rounded-full" style={{backgroundColor: '#8D0101'}}>Flats in Panipat</Link>
                <Link to="/projects-in-panchkula/" className="text-white hover:text-white hover:underline transition-all duration-200 text-sm px-3 py-1 rounded-full" style={{backgroundColor: '#8D0101'}}>Flats in Panchkula</Link>
                <Link to="/projects-in-kasauli/" className="text-white hover:text-white hover:underline transition-all duration-200 text-sm px-3 py-1 rounded-full" style={{backgroundColor: '#8D0101'}}>Flats in Kasauli</Link>
                <Link to="/projects-in-sonipat/" className="text-white hover:text-white hover:underline transition-all duration-200 text-sm px-3 py-1 rounded-full" style={{backgroundColor: '#8D0101'}}>Flats in Sonipat</Link>
                <Link to="/projects-in-karnal/" className="text-white hover:text-white hover:underline transition-all duration-200 text-sm px-3 py-1 rounded-full" style={{backgroundColor: '#8D0101'}}>Flats in Karnal</Link>
                <Link to="/projects-in-jalandhar/" className="text-white hover:text-white hover:underline transition-all duration-200 text-sm px-3 py-1 rounded-full" style={{backgroundColor: '#8D0101'}}>Flats in Jalandhar</Link>
                <Link to="/projects-in-pushkar/" className="text-white hover:text-white hover:underline transition-all duration-200 text-sm px-3 py-1 rounded-full" style={{backgroundColor: '#8D0101'}}>Flats in Pushkar</Link>
                <Link to="/united-arab-emirates/" className="text-white hover:text-white hover:underline transition-all duration-200 text-sm px-3 py-1 rounded-full" style={{backgroundColor: '#8D0101'}}>Flats in Dubai</Link>
              </div>
            </div>

            {/* Prime Locations */}
            <div className="rounded-2xl p-8 transition-all duration-300" style={{backgroundColor: '#680101'}}>
              <h3 className="text-lg font-bold text-white mb-6 relative pb-3 border-b border-white/30">
                Prime Locations
              </h3>
              <div className="flex flex-wrap gap-2">
                <Link to="/property-in-gurugram/sohna-road/" className="text-white hover:text-white hover:underline transition-all duration-200 text-sm px-3 py-1 rounded-full" style={{backgroundColor: '#8D0101'}}>Projects in Sohna Road</Link>
                <Link to="/property-in-gurugram/golf-course/" className="text-white hover:text-white hover:underline transition-all duration-200 text-sm px-3 py-1 rounded-full" style={{backgroundColor: '#8D0101'}}>Projects in Golf Course</Link>
                <Link to="/property-in-gurugram/northern-peripheral-road/" className="text-white hover:text-white hover:underline transition-all duration-200 text-sm px-3 py-1 rounded-full" style={{backgroundColor: '#8D0101'}}>Projects in Northern Peripheral Road</Link>
                <Link to="/property-in-gurugram/dwarka-expressway/" className="text-white hover:text-white hover:underline transition-all duration-200 text-sm px-3 py-1 rounded-full" style={{backgroundColor: '#8D0101'}}>Projects in Dwarka Expressway</Link>
                <Link to="/property-in-gurugram/new-gurgaon/" className="text-white hover:text-white hover:underline transition-all duration-200 text-sm px-3 py-1 rounded-full" style={{backgroundColor: '#8D0101'}}>Projects in New Gurgaon</Link>
                <Link to="/property-in-gurugram/southern-peripheral-road/" className="text-white hover:text-white hover:underline transition-all duration-200 text-sm px-3 py-1 rounded-full" style={{backgroundColor: '#8D0101'}}>Projects in Southern Peripheral Road</Link>
                <Link to="/property-in-gurugram/golf-course-extn-road/" className="text-white hover:text-white hover:underline transition-all duration-200 text-sm px-3 py-1 rounded-full" style={{backgroundColor: '#8D0101'}}>Projects in Golf Course Extn Road</Link>
              </div>
            </div>

            {/* Tools & Services */}
            <div className="rounded-2xl p-8 transition-all duration-300" style={{backgroundColor: '#680101'}}>
              <h3 className="text-lg font-bold text-white mb-6 relative pb-3 border-b border-white/30">
                Tools & Services
              </h3>
              <div className="flex flex-wrap gap-2">
                <Link to="/convert-square-meter-to-square-feet/" className="text-white hover:text-white hover:underline transition-all duration-200 text-sm px-3 py-1 rounded-full" style={{backgroundColor: '#8D0101'}}>Square Meter to Feet</Link>
                <Link to="/convert-square-feet-to-square-meter/" className="text-white hover:text-white hover:underline transition-all duration-200 text-sm px-3 py-1 rounded-full" style={{backgroundColor: '#8D0101'}}>Square Feet to Meter</Link>
                <Link to="/convert-acre-to-square-feet/" className="text-white hover:text-white hover:underline transition-all duration-200 text-sm px-3 py-1 rounded-full" style={{backgroundColor: '#8D0101'}}>Acre to Square Feet</Link>
                <Link to="/convert-square-feet-to-acre/" className="text-white hover:text-white hover:underline transition-all duration-200 text-sm px-3 py-1 rounded-full" style={{backgroundColor: '#8D0101'}}>Square Feet to Acre</Link>
                <Link to="/buy-properties/" className="text-white hover:text-white hover:underline transition-all duration-200 text-sm px-3 py-1 rounded-full" style={{backgroundColor: '#8D0101'}}>Buy Properties</Link>
                <Link to="/sell-properties/" className="text-white hover:text-white hover:underline transition-all duration-200 text-sm px-3 py-1 rounded-full" style={{backgroundColor: '#8D0101'}}>Sell Properties</Link>
                <Link to="/rent-properties/" className="text-white hover:text-white hover:underline transition-all duration-200 text-sm px-3 py-1 rounded-full" style={{backgroundColor: '#8D0101'}}>Rent Properties</Link>
                <Link to="/commercial-properties/" className="text-white hover:text-white hover:underline transition-all duration-200 text-sm px-3 py-1 rounded-full" style={{backgroundColor: '#8D0101'}}>Commercial</Link>
              </div>
            </div>
  </div>
</div>
</div>

      {/* Bottom Bar */}
      <div className="border-t" style={{backgroundColor: '#680101', borderColor: '#8D0101'}}>
        <div className="w-full px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Left: Company Name */}
            <div className="font-semibold text-lg text-white">
              100acress
            </div>

            {/* Center: Copyright */}
            <div className="text-sm text-white">
              © 2024 100acress.com. All rights reserved.
            </div>

            {/* Right: Social Media Icons */}
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/100acress/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300" style={{backgroundColor: '#8D0101', color: 'white'}}>
                <FaLinkedin size={16} />
              </a>
              <a href="https://www.facebook.com/100Acress" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300" style={{backgroundColor: '#8D0101', color: 'white'}}>
                <FaFacebook size={16} />
              </a>
              <a href="https://twitter.com/100acressdotcom" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300" style={{backgroundColor: '#8D0101', color: 'white'}}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@100acress" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300" style={{backgroundColor: '#8D0101', color: 'white'}}>
                <FaYoutube size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
