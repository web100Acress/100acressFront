"use client"
import { Facebook, Twitter, Instagram, Youtube, Phone, MessageCircle, Mail, ArrowRight, Search, Linkedin } from "lucide-react"

const LuxuryFooter = () => {
  return (
    <footer className="relative w-full min-w-full bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-orange-400/20 to-yellow-400/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-32 right-20 w-32 h-32 bg-gradient-to-r from-orange-500/15 to-yellow-500/15 rounded-full blur-2xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-r from-orange-400/15 to-yellow-400/15 rounded-full blur-xl animate-float-delayed"></div>
        <div className="absolute bottom-32 right-1/3 w-16 h-16 bg-gradient-to-r from-orange-300/10 to-yellow-300/10 rounded-full blur-lg animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 w-28 h-28 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-full blur-2xl animate-float-slow"></div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-orange-500/5 w-full"></div>

      <div className="py-8 lg:py-12 max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="py-8 lg:py-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-4">
            {/* Brand Section */}
            <div className="lg:col-span-4 space-y-6">
              <div className="space-y-4">
                {/* Logo */}
                <div className="flex items-center space-x-4">
                  <div className="relative group cursor-pointer">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <div className="w-8 h-8 bg-white rounded-lg opacity-95 transition-transform duration-300 group-hover:rotate-12"></div>
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                  </div>
                  <div>
                    <div className="flex items-baseline space-x-1">
                      <span className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent tracking-wider">
                        100
                      </span>
                      <span className="text-3xl font-light text-gray-700 tracking-wide">ACRES</span>
                    </div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mt-1">
                      Luxury Living Redefined
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed max-w-md text-base">
                  Experience unparalleled luxury in the heart of the city. 100 Acres represents the pinnacle of modern
                  residential living, where sophisticated design meets exclusive lifestyle amenities.
                </p>

                {/* Social Media */}
                <div className="flex space-x-3">
                  {[
                    {
                      Icon: Facebook,
                      href: "https://www.facebook.com/100Acress",
                      label: "Facebook",
                      color: "hover:bg-blue-600",
                    },
                    {
                      Icon: Twitter,
                      href: "https://twitter.com/100acressdotcom",
                      label: "Twitter",
                      color: "hover:bg-sky-500",
                    },
                    {
                      Icon: Instagram,
                      href: "https://www.instagram.com/official100acress/",
                      label: "Instagram",
                      color: "hover:bg-pink-600",
                    },
                    { Icon: Linkedin, href: "https://www.linkedin.com/company/100acress/", label: "LinkedIn", color: "hover:bg-blue-600" },
                    { Icon: Youtube, href: "#", label: "YouTube", color: "hover:bg-red-600" },
                  ].map(({ Icon, href, label, color }, index) => (
                    <a
                      key={index}
                      href={href}
                      aria-label={label}
                      className={`group relative w-12 h-12 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 ${color} hover:text-white hover:border-transparent hover:scale-110 hover:shadow-lg transition-all duration-300`}
                    >
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-3">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 relative">
                  Quick Links
                  <div className="absolute -bottom-2 left-0 w-10 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full"></div>
                </h3>
                <nav className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:space-y-4 lg:gap-0">
                  {[
                    { label: "Home", href: "#" },
                    { label: "Luxury Properties", href: "#" },
                    { label: "Investment Blog", href: "#" },
                    // { label: "Contact Experts", href: "#" }, 
                    { label: "About Us", href: "#" },
                    // { label: "Careers", href: "#" },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="group flex items-center space-x-2 lg:space-x-3 text-gray-600 hover:text-orange-600 font-medium transition-all duration-300"
                    >
                      <ArrowRight
                        size={14}
                        className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-orange-500 flex-shrink-0"
                      />
                      <span className="relative text-sm lg:text-base">
                        {link.label}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                      </span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            {/* Property Search */}
            <div className="lg:col-span-5 space-y-3">
              <h3 className="text-xl font-semibold text-gray-800 relative">
                Find Your Dream Property
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full"></div>
              </h3>

              <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative group">
                  <div className="flex bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl">
                    <div className="relative flex-1">
                      <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search luxury properties..."
                        className="w-full pl-12 pr-4 py-4 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none"
                      />
                    </div>
                    <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 hover:shadow-lg">
                      Search
                    </button>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200">
                    <div className="text-2xl font-bold text-orange-600">500+</div>
                    <div className="text-sm text-gray-600">Premium Properties</div>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200">
                    <div className="text-2xl font-bold text-orange-600">50+</div>
                    <div className="text-sm text-gray-600">Prime Locations</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="w-full bg-white/80 backdrop-blur-lg rounded-3xl border border-gray-200 shadow-xl p-6 mb-3 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Contact Header */}
            <div className="lg:col-span-1">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Expert Assistance</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our luxury property specialists are here to help you find your perfect home, 24/7.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  Icon: Phone,
                  text: "+91 8500-900-100",
                  type: "tel",
                  label: "Call Us",
                  description: "Speak with our experts",
                  color: "text-green-600",
                  bgColor: "bg-green-50",
                },
                {
                  Icon: MessageCircle,
                  text: "+91 8500-900-100",
                  type: "tel",
                  label: "WhatsApp",
                  description: "Quick chat support",
                  color: "text-green-600",
                  bgColor: "bg-green-50",
                },
                {
                  Icon: Mail,
                  text: "support@100acress.com",
                  type: "mailto",
                  label: "Email Us",
                  description: "Detailed inquiries",
                  color: "text-blue-600",
                  bgColor: "bg-blue-50",
                },
              ].map(({ Icon, text, type, label, description, color, bgColor }) => (
                <a
                  key={text}
                  href={`${type}:${text.replace(/\s+/g, "")}`}
                  className="group flex items-start space-x-4 p-6 bg-white rounded-2xl border border-gray-200 hover:shadow-xl hover:border-orange-300 transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className={`p-3 rounded-xl ${bgColor} ${color} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="text-lg font-semibold text-gray-800 mb-1">{label}</div>
                    <div className="text-sm text-gray-600 mb-1">{text}</div>
                    <div className="text-xs text-gray-500">{description}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Cityscape Image */}
        <div className="relative mb-4 rounded-3xl overflow-hidden shadow-2xl max-w-7xl mx-auto w-full">
          <img src="/Images/footer-build.png" alt="Luxury cityscape" className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-yellow-500/20"></div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative z-10 bg-white/90 backdrop-blur-sm border-t border-gray-200 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <p>© 2025 100 Acres. All rights reserved.</p>
              <span className="hidden sm:inline">|</span>
              {/* <p className="font-medium text-orange-600">Luxury Redefined.</p> */}
            </div>
            <div className="flex flex-wrap justify-center sm:justify-end space-x-6 text-sm">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-gray-600 hover:text-orange-600 transition-colors duration-300 relative group"
                >
                  {link}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-yellow-500"></div>
    </footer>
  )
}

export default LuxuryFooter
