"use client"
import React, { useState } from "react";
import api from "../../config/apiClient";
import { motion } from "framer-motion"
import { Facebook, Instagram, Youtube, Phone, MessageCircle, Mail, ArrowRight, Linkedin, Sparkles, Star, Twitter } from "lucide-react"
import { Link } from "react-router-dom";

const LuxuryFooter = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
  }

  // Instant Call form state
  const [icName, setIcName] = useState("");
  const [icPhone, setIcPhone] = useState("");
  const [icSubmitting, setIcSubmitting] = useState(false);

  // EMI Calculator state
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [emi, setEmi] = useState(0);

  // EMI Calculator function
  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 12 / 100;
    const tenure = parseFloat(loanTenure) * 12;
    
    if (principal && rate && tenure) {
      const emiValue = (principal * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1);
      setEmi(Math.round(emiValue));
    } else {
      setEmi(0);
    }
  };

  const handleInstantCallSubmit = async (e) => {
    e.preventDefault();
    if (icSubmitting) return;

    const phoneOk = /^([+]\d{2})?\d{10}$/.test(icPhone.trim());
    const nameOk = icName.trim().length >= 2;
    if (!nameOk || !phoneOk) {
      alert("Please enter a valid name and 10-digit mobile number");
      return;
    }
    try {
      setIcSubmitting(true);
      // Align with NewBanner payload shape
      await api.post("/userInsert", {
        name: icName.trim(),
        mobile: icPhone.trim(),
        email: "",
        projectName: "Footer Instant Call",
        address: (typeof window !== 'undefined' ? window.location.pathname : ""),
        source: "footer_instant_call",
      });
      alert("Callback requested successfully");
      setIcName("");
      setIcPhone("");
    } catch (err) {
      const status = err?.response?.status;
      const msg = err?.response?.data?.message || err?.message;
      alert(status ? `Request failed (${status})${msg ? ": " + msg : ""}` : (msg || "Failed to submit. Please try again."));
    } finally {
      setIcSubmitting(false);
    }
  };

  return (
    <>
      <motion.footer
        className="relative w-full min-w-full bg-gradient-to-br from-red-600 via-red-200 to-white overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={footerVariants}
      >
        {/* Background image - lazy loaded since footer is below fold */}
        <img 
          src="/Images/1.png"
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover -z-10"
          aria-hidden="true"
        />
        {/* Subtle Background Gradients and Orbs */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-1/4 w-40 h-40 bg-gradient-to-r from-red-400/20 to-red-300/20 rounded-full blur-2xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-1/4 w-52 h-52 bg-gradient-to-r from-red-500/15 to-red-400/15 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        </div>

        {/* Textured Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23a1a1aa\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm10 10v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm10 10v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM24 10v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm10 10v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM24 10v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm10 10v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM24 10v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm10 10v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-4-4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

        <div className="relative z-10 py-12 lg:py-12 w-full px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-2 ">
            {/* Brand Section */}
            <motion.div
              className="lg:col-span-4 space-y-6"
              variants={itemVariants}
            >
              <div className="space-y-4">
                {/* Enhanced Logo */}
                <div className="flex items-center space-x-4">
                  <div className="relative group cursor-pointer animate-glow-subtle">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-500 rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-red-500/30">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                        <Sparkles size={20} className="text-red-600" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-baseline space-x-1">
                      <span className="text-4xl font-bold bg-gradient-to-r from-red-700 to-red-500 bg-clip-text text-transparent tracking-wide drop-shadow-sm">
                        100acress
                      </span>
            
                      <Star size={18} className="text-red-500 animate-float-subtle ml-1" />
                    </div>

                    <p className="text-xs font-medium text-gray-500 uppercase tracking-[0.25em] mt-1">
                      Rishto Ki Shuruwat
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed max-w-md text-base mt-2">
                Enjoy world-class luxury homes in the center of the city. Get the best modern apartments with stylish design, premium features, and top-class amenities for a truly exclusive lifestyle.
                </p>

                {/* Enhanced Social Media */}
                <div className="flex space-x-3 mt-4">
                  {[
                    { 
                      Icon: Facebook, 
                      href: "https://www.facebook.com/100Acress/", 
                      label: "Facebook",
                      bgColor: "bg-blue-600 hover:bg-blue-700"
                    },
                    {
                      Icon: () => (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 1200 1227"
                          className="w-5 h-5 fill-white"
                        >
                          <path d="M714.163 519.284L1160.89 0H1055.53L669.235 
                          450.887L356.757 0H0L468.293 681.821L0 1226.37H105.365
                          L511.974 751.618L843.243 1226.37H1200L714.137 
                          519.284H714.163ZM567.04 686.983L517.956 
                          617.523L143.44 79.694H305.697L602.006 
                          503.675L651.09 573.135L1056.12 
                          1169.74H893.863L567.04 686.983Z" />
                        </svg>
                      ),
                      href: "https://x.com/100acressdotcom",
                      label: "X",
                      bgColor: "bg-black hover:bg-gray-800"
                    },
                    
                    { 
                      Icon: Instagram, 
                      href: "https://www.instagram.com/official100acress/", 
                      label: "Instagram",
                      bgColor: "bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90"
                    },
                    { 
                      Icon: Linkedin, 
                      href: "https://www.linkedin.com/company/100acress/", 
                      label: "LinkedIn",
                      bgColor: "bg-blue-700 hover:bg-blue-800"
                    },
                    { 
                      Icon: Youtube, 
                      href: "https://www.youtube.com/@100acress", 
                      label: "YouTube",
                      bgColor: "bg-red-600 hover:bg-red-700"
                    },
                  ].map(({ Icon, href, label, bgColor }, index) => (
                    <motion.a
                      key={index}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        ${bgColor} text-white
                        shadow-md hover:shadow-lg
                        transition-all duration-300
                      `}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Icon size={18} />
                    </motion.a>
                  ))}
                </div>
  

              </div>
            </motion.div>

            {/* Enhanced Quick Links */}
            <motion.div className="lg:col-span-3" variants={itemVariants}>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 relative pb-2">
                  Quick Links
                  <span className="absolute -bottom-0.5 left-0 w-12 h-0.5 bg-gradient-to-r from-red-600 to-red-400 rounded-full"></span>
                </h3>

                <nav className="grid grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-3 text-sm">
                  {[
                    { label: "Home", href: "/" },
                    { label: "About Us", href: "/about-us/" },
                    { label: "Our Services", href: "/#our-services" },
                    { label: "Luxury Properties", href: "/top-luxury-projects/" },
                    { label: "Blog", href: "/blog/" },
                    { label: "EMI Calculator", href: "/emi-calculator/" },
                    { label: "Career", href: "/career-with-us/"},
                    { label: "Contact", href: "/contact-us/" },
                    
                  ].map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.href}
                      className="group flex items-center space-x-2 py-2 px-3 rounded-lg text-gray-700 hover:text-red-600 transition-colors duration-300 relative overflow-hidden hover:underline underline-offset-4 decoration-red-500"
                      whileHover={{ x: 5 }}
                      variants={itemVariants}
                    >
                      <ArrowRight size={16} className="text-red-400 group-hover:scale-110 transition-transform duration-300" />
                      <span className="font-medium relative z-10">{link.label}</span>
                    </motion.a>
                  ))}
                </nav>
              </div>
            </motion.div>

            {/* Instant Call Form (replaces search) */}
            <motion.div
              className="lg:col-span-5 space-y-4"
              variants={itemVariants}
            >
              <h3 className="text-xl font-semibold text-gray-800 relative pb-2">
                Instant Callback
                <span className="absolute -bottom-0.5 left-0 w-12 h-0.5 bg-gradient-to-r from-red-600 to-red-400 rounded-full"></span>
              </h3>
              <div className="space-y-4">
                {/* Elegant Instant Call Form */}
                <form
                  className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white/95 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-4"
                  onSubmit={handleInstantCallSubmit}
                >
                  <motion.input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={icName}
                    onChange={(e) => setIcName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-200 placeholder-gray-400 text-gray-700"
                    whileFocus={{ boxShadow: "0 0 0 2px rgba(220, 38, 38, 0.15)" }}
                  />
                  <motion.input
                    type="tel"
                    required
                    placeholder="Phone Number"
                    value={icPhone}
                    onChange={(e) => setIcPhone(e.target.value)}
                    pattern="[0-9+\-()\s]{7,}"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-200 placeholder-gray-400 text-gray-700"
                    whileFocus={{ boxShadow: "0 0 0 2px rgba(220, 38, 38, 0.15)" }}
                  />
                  <motion.button
                    type="submit"
                    disabled={icSubmitting}
                    className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-xl hover:from-red-700 hover:to-red-600 transition-all duration-300 relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                    whileHover={{ scale: icSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: icSubmitting ? 1 : 0.98 }}
                  >
                    <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100"></div>
                    {icSubmitting ? "Submitting..." : "Request Call"}
                  </motion.button>
                </form>

                {/* Quick Stats - red accents */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-300 group relative overflow-hidden cursor-pointer"
                    whileHover={{ scale: 1.05, borderColor: "rgba(220, 38, 38, 0.5)" }}
                    variants={itemVariants}
                  >
                    <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 rounded-xl"></div>
                    <div className="text-2xl font-bold text-red-600 drop-shadow-sm relative z-10">500+</div>
                    <div className="text-sm text-gray-600 relative z-10">Premium Properties</div>
                  </motion.div>
                  <motion.div
                    className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-300 group relative overflow-hidden cursor-pointer"
                    whileHover={{ scale: 1.05, borderColor: "rgba(220, 38, 38, 0.5)" }}
                    variants={itemVariants}
                  >
                    <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 rounded-xl"></div>
                    <div className="text-2xl font-bold text-red-600 drop-shadow-sm relative z-10">50+</div>
                    <div className="text-sm text-gray-600 relative z-10">Prime Locations</div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Unified Content Section - Contact + Image */}
          {false && (
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
                    { Icon: Phone, text: "+91 8500-900-100", type: "tel", label: "Call Us", description: "Speak with our experts", color: "text-red-600", bgColor: "bg-white" },
                    { Icon: MessageCircle, text: "+91 8500-900-100", type: "tel", label: "WhatsApp", description: "Quick chat support", color: "text-red-600", bgColor: "bg-white" },
                    { Icon: Mail, text: "support@100acress.com", type: "mailto", label: "Email Us", description: "Detailed inquiries", color: "text-red-600", bgColor: "bg-white" },
                  ].map(({ Icon, text, type, label, description, color, bgColor }, index) => (
                    <motion.a
                      key={index}
                      href={`${type}:${text.replace(/\s+/g, "")}`}
                      className="group flex items-start space-x-4 p-4 lg:p-5 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 hover:shadow-lg hover:border-red-300/60 transition-all duration-300 hover:translate-y-[-2px]"
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
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-red-400/10 group-hover:from-red-600/20 group-hover:to-red-400/20 transition-all duration-500"></div>
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
          )}
        </div>

        {/* Enhanced Bottom Section */}
        <motion.div
          className="relative z-10 bg-red-600 w-full"
          variants={itemVariants}
        >
          <div className="py-4 sm:py-6 w-full px-4 sm:px-6 lg:px-8 pb-16 sm:pb-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 items-center w-full text-xs sm:text-sm gap-3 sm:gap-0 text-center sm:text-left whitespace-normal overflow-visible">
              {/* Left: Copyright */}
              <div className="justify-self-center sm:justify-self-start text-white flex items-center">
                <p className="drop-shadow-sm">© 2000 - 2026 100acress. All Rights Reserved.</p>
              </div>

              {/* Center: Contact (single line) */}
              <div className="justify-self-center text-white">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-6">
                  <a href="tel:+918500900100" className="flex items-center hover:text-white/90 transition-colors">
                    <Phone size={16} className="mr-1" />
                    +91 8500-900-100
                  </a>
                  <a href="mailto:support@100acress.com" className="flex items-center hover:text-white/90 transition-colors break-all sm:break-normal">
                    <Mail size={16} className="mr-1" />
                    support@100acress.com
                  </a>
                </div>
              </div>

              {/* Right: Policy Links */}
              <div className="justify-self-center sm:justify-self-end flex items-center">
  <div className="flex flex-wrap justify-center sm:justify-end space-x-4 lg:space-x-6 text-xs sm:text-sm">
    {/* Privacy Policy React Router Link */}
    <Link
      to="/privacy-policy/"
      className="text-white hover:text-white/90 transition-colors duration-300 relative group hover:underline underline-offset-4 decoration-white"
      target="_top"
      style={{ color: "#ffffff" }}
    >
      Privacy Policy
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
    </Link>

    {/* Terms of Service */}
    <motion.a
      href="#"
      className="text-white hover:text-white/90 transition-colors duration-300 relative group hover:underline underline-offset-4 decoration-white"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Terms of Service
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
    </motion.a>

    {/* Cookie Policy */}
    <motion.a
      href="#"
      className="text-white hover:text-white/90 transition-colors duration-300 relative group hover:underline underline-offset-4 decoration-white"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Cookie Policy
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
    </motion.a>
  </div>
</div>

            </div>
          </div>
        </motion.div>

      </motion.footer>
    </>
  );
}

export default LuxuryFooter;