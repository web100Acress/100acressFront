"use client"
import { Facebook, Twitter, Instagram, Youtube, Phone, MessageCircle, Mail, ArrowRight, Search, Linkedin, Sparkles, Star } from "lucide-react"
import { motion } from "framer-motion"

const LuxuryFooter = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
  }

  return (
    <>
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(3deg); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 15px rgba(251, 146, 60, 0.2); }
          50% { box-shadow: 0 0 25px rgba(251, 146, 60, 0.4); }
        }
        .animate-shimmer {
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%);
          background-size: 200% 100%;
          animation: shimmer 2s infinite linear;
        }
        .animate-float-subtle {
          animation: float 4s ease-in-out infinite;
        }
        .animate-glow-subtle {
          animation: glow 3s ease-in-out infinite;
        }
      `}</style>
      <motion.footer
        className="relative w-full min-w-full bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={footerVariants}
      >
        {/* Subtle Background Gradients and Orbs */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-1/4 w-40 h-40 bg-gradient-to-r from-orange-400/20 to-yellow-400/20 rounded-full blur-2xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-1/4 w-52 h-52 bg-gradient-to-r from-orange-500/15 to-yellow-500/15 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        </div>

        {/* Textured Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23a1a1aa\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm10 10v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm10 10v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM24 10v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm10 10v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

        <div className="relative z-10 py-12 lg:py-12 w-full px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-8 ">
            {/* Brand Section */}
            <motion.div
              className="lg:col-span-4 space-y-6"
              variants={itemVariants}
            >
              <div className="space-y-4">
                {/* Enhanced Logo */}
                <div className="flex items-center space-x-4">
                  <div className="relative group cursor-pointer animate-glow-subtle">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-orange-500/30">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                        <Sparkles size={20} className="text-orange-600" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-baseline space-x-1">
                      <span className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent tracking-wide drop-shadow-sm">
                        100
                      </span>
                      <span className="text-3xl font-light text-gray-700 tracking-wider">ACRESS</span>
                      <Star size={18} className="text-orange-500 animate-float-subtle ml-1" />
                    </div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-[0.25em] mt-1">
                      Rishto Ki Shuruwat
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed max-w-md text-base mt-2">
                  Experience unparalleled luxury in the heart of the city. We offer the pinnacle of modern
                  residential living, where sophisticated design meets exclusive lifestyle amenities.
                </p>

                {/* Enhanced Social Media */}
                <div className="flex space-x-2">
                  {[
                    { Icon: Facebook, href: "#", label: "Facebook", color: "hover:bg-blue-600" },
                    { Icon: Twitter, href: "#", label: "Twitter", color: "hover:bg-sky-500" },
                    { Icon: Instagram, href: "#", label: "Instagram", color: "hover:bg-pink-600" },
                    { Icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:bg-blue-700" },
                    { Icon: Youtube, href: "#", label: "YouTube", color: "hover:bg-red-600" },
                  ].map(({ Icon, href, label, color }, index) => (
                    <motion.a
                      key={index}
                      href={href}
                      aria-label={label}
                      className={`group relative w-10 h-10 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full flex items-center justify-center text-gray-600 ${color} hover:text-white hover:border-transparent hover:scale-110 hover:shadow-lg transition-all duration-300 overflow-hidden`}
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      whileTap={{ scale: 0.95 }}
                      variants={itemVariants}
                    >
                      <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100"></div>
                      <Icon size={20} className="relative z-10" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Enhanced Quick Links */}
            <motion.div
              className="lg:col-span-3"
              variants={itemVariants}
            >
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 relative pb-2">
                  Quick Links
                  <span className="absolute -bottom-0.5 left-0 w-12 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full"></span>
                </h3>
                <nav className="grid grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-3 text-sm">
                  {[
                    { label: "Home", href: "#" },
                    { label: "Luxury Properties", href: "#" },
                    { label: "Investment Blog", href: "#" },
                    { label: "About Us", href: "#" },
                    { label: "Contact Us", href: "#" },
                    { label: "Our Services", href: "#" },
                  ].map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.href}
                      className="group flex items-center space-x-2 py-2 px-3 rounded-lg text-gray-600 hover:text-orange-600 hover:bg-orange-50/50 transition-colors duration-300 relative overflow-hidden"
                      whileHover={{ x: 5 }}
                      variants={itemVariants}
                    >
                      <ArrowRight size={16} className="text-orange-400 group-hover:scale-110 transition-transform duration-300" />
                      <span className="font-medium relative z-10">{link.label}</span>
                    </motion.a>
                  ))}
                </nav>
              </div>
            </motion.div>

            {/* Enhanced Property Search */}
            <motion.div
              className="lg:col-span-5 space-y-4"
              variants={itemVariants}
            >
              <h3 className="text-xl font-semibold text-gray-800 relative pb-2">
                Find Your Dream Property
                <span className="absolute -bottom-0.5 left-0 w-12 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full"></span>
              </h3>
              <div className="space-y-4">
                {/* Enhanced Search Bar */}
                <div className="relative group">
                  <div className="flex bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:shadow-orange-500/10">
                    <motion.input
                      type="text"
                      placeholder="Search luxury properties..."
                      className="w-full pl-12 pr-4 py-3 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none rounded-l-xl"
                      whileFocus={{ boxShadow: "0 0 0 2px rgba(251, 146, 60, 0.2)" }}
                    />
                    <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <motion.button
                      className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-r-xl hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 relative overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100"></div>
                      <span className="relative z-10">Search</span>
                    </motion.button>
                  </div>
                </div>

                {/* Enhanced Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-300 group relative overflow-hidden cursor-pointer"
                    whileHover={{ scale: 1.05, borderColor: "rgba(251, 146, 60, 0.5)" }}
                    variants={itemVariants}
                  >
                    <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 rounded-xl"></div>
                    <div className="text-2xl font-bold text-orange-600 drop-shadow-sm relative z-10">500+</div>
                    <div className="text-sm text-gray-600 relative z-10">Premium Properties</div>
                  </motion.div>
                  <motion.div
                    className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-300 group relative overflow-hidden cursor-pointer"
                    whileHover={{ scale: 1.05, borderColor: "rgba(251, 146, 60, 0.5)" }}
                    variants={itemVariants}
                  >
                    <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 rounded-xl"></div>
                    <div className="text-2xl font-bold text-orange-600 drop-shadow-sm relative z-10">50+</div>
                    <div className="text-sm text-gray-600 relative z-10">Prime Locations</div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Unified Content Section - Contact + Image */}
          <motion.div
            className="w-full bg-white/60 backdrop-blur-lg rounded-3xl border border-gray-200/60 shadow-xl p-6 lg:p-18 mb-0 hover:shadow-2xl transition-all duration-500"
            variants={itemVariants}
          >
            {/* Contact Section */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 mb-6">
              <div className="lg:col-span-1">
                <h3 className="text-2xl font-bold text-gray-800 mb-3 drop-shadow-sm">Expert Assistance</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our luxury property specialists are here to help you find your perfect home, 24/7.
                </p>
              </div>

              <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {[
                  { Icon: Phone, text: "+91 8500-900-100", type: "tel", label: "Call Us", description: "Speak with our experts", color: "text-green-600", bgColor: "bg-green-50" },
                  { Icon: MessageCircle, text: "+91 8500-900-100", type: "tel", label: "WhatsApp", description: "Quick chat support", color: "text-green-600", bgColor: "bg-green-50" },
                  { Icon: Mail, text: "support@100acress.com", type: "mailto", label: "Email Us", description: "Detailed inquiries", color: "text-blue-600", bgColor: "bg-blue-50" },
                ].map(({ Icon, text, type, label, description, color, bgColor }, index) => (
                  <motion.a
                    key={index}
                    href={`${type}:${text.replace(/\s+/g, "")}`}
                    className="group flex items-start space-x-4 p-4 lg:p-5 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 hover:shadow-lg hover:border-orange-300/60 transition-all duration-300 hover:translate-y-[-2px]"
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`p-2 lg:p-3 rounded-xl ${bgColor} ${color} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="text-base lg:text-lg font-semibold text-gray-800 drop-shadow-sm">{label}</div>
                      <div className="text-sm text-gray-600">{text}</div>
                      <div className="text-xs text-gray-500 hidden sm:block">{description}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Integrated Cityscape Image */}
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-lg w-full group cursor-pointer"
              variants={itemVariants}
            >
              {/* <img src="/Images/footer-build.png" alt="Luxury cityscape" className="w-full h-32 lg:h-40 object-cover object-center transition-transform duration-700 group-hover:scale-105" /> */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 group-hover:from-orange-500/20 group-hover:to-yellow-500/20 transition-all duration-500"></div>
              <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-medium text-gray-700 shadow-md group-hover:scale-105 transition-transform duration-300">
                Luxury Properties
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-white text-2xl lg:text-3xl font-bold tracking-wider text-center drop-shadow-lg">
                  Explore More
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Bottom Section */}
        <motion.div
          className="relative z-10 bg-white/80 backdrop-blur-sm border-t border-gray-200/60 w-full"
          variants={itemVariants}
        >
          <div className="py-6 w-full px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <p className="drop-shadow-sm">© 2025 100 Acress. All rights reserved.</p>
              </div>
              <div className="flex flex-wrap justify-center sm:justify-end space-x-4 lg:space-x-6 text-sm">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="text-gray-600 hover:text-orange-600 transition-colors duration-300 relative group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.footer>
    </>
  )
}

export default LuxuryFooter;