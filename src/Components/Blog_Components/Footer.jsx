import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Github, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-900 border-t border-white/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,theme(colors.white/5),transparent_50%)]" />
      
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-white/20 to-white/5 rounded-xl flex items-center justify-center border border-white/10">
                <span className="text-white font-serif font-bold text-xl">1</span>
              </div>
              <div>
                <h2 className="font-serif font-bold text-2xl text-white">100acress</h2>
                <p className="text-gray-400 font-sans text-sm">Real Estate Insights</p>
              </div>
            </div>
            <p className="text-gray-400 font-sans leading-relaxed max-w-sm">
              Discover premium properties and expert insights in the NCR region. Your trusted partner in real estate excellence.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <Twitter className="h-4 w-4 text-gray-400" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <Linkedin className="h-4 w-4 text-gray-400" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <Instagram className="h-4 w-4 text-gray-400" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-serif text-xl font-bold text-white">Explore</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors duration-200 font-sans">
                  All Stories
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-400 hover:text-white transition-colors duration-200 font-sans">
                  Featured Projects
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-200 font-sans">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-200 font-sans">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            <h3 className="font-serif text-xl font-bold text-white">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/blog/category/market-trends" className="text-gray-400 hover:text-white transition-colors duration-200 font-sans">
                  Market Trends
                </Link>
              </li>
              <li>
                <Link to="/blog/category/investment" className="text-gray-400 hover:text-white transition-colors duration-200 font-sans">
                  Investment Tips
                </Link>
              </li>
              <li>
                <Link to="/blog/category/property-guides" className="text-gray-400 hover:text-white transition-colors duration-200 font-sans">
                  Property Guides
                </Link>
              </li>
              <li>
                <Link to="/blog/category/ncr-insights" className="text-gray-400 hover:text-white transition-colors duration-200 font-sans">
                  NCR Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="font-serif text-xl font-bold text-white">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400 font-sans">+91 98XXX XXXXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400 font-sans">info@100acress.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400 font-sans">Gurgaon, India</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm font-sans">
                © {currentYear} 100acress. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <Link to="/privacy" className="text-gray-500 hover:text-gray-300 text-xs font-sans transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-gray-300 text-xs font-sans transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
