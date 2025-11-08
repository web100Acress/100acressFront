import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MessageSquare, User, Send, CheckCircle } from "lucide-react";
import { Button } from "../../../../Components/ui/button";

const DubaiProjectContact = ({ project }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    interestedIn: "General Inquiry"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          interestedIn: "General Inquiry"
        });
      }, 3000);
    }, 1500);
  };

  const projectName = project?.projectName || "This Property";
  const contactPhone = "+971 50 123 4567";
  const contactEmail = "info@100acress.com";

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase mb-4 block">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Contact Us
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold to-gold/50 mx-auto mb-6" />
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Ready to make {projectName} your new home? Get in touch with our team
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">
              Let's Discuss Your Dream Home
            </h3>
            
            <div className="space-y-6 mb-8">
              {/* Phone */}
              <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl hover:border-gold/50 transition-colors">
                <div className="flex-shrink-0 w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">Call Us</p>
                  <a href={`tel:${contactPhone}`} className="text-white text-lg font-semibold hover:text-gold transition-colors">
                    {contactPhone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl hover:border-gold/50 transition-colors">
                <div className="flex-shrink-0 w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">Email Us</p>
                  <a href={`mailto:${contactEmail}`} className="text-white text-lg font-semibold hover:text-gold transition-colors">
                    {contactEmail}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl hover:border-gold/50 transition-colors">
                <div className="flex-shrink-0 w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">WhatsApp</p>
                  <a 
                    href={`https://wa.me/971501234567?text=Hi, I'm interested in ${encodeURIComponent(projectName)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-lg font-semibold hover:text-gold transition-colors"
                  >
                    Chat with us
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="p-6 bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/30 rounded-xl">
              <h4 className="text-lg font-semibold text-white mb-4">
                Why Choose 100acress?
              </h4>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />
                  Expert guidance throughout your journey
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />
                  Exclusive deals and offers
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />
                  Complete transparency in transactions
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />
                  Post-sales support and assistance
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              {isSubmitted ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                  <p className="text-white/70">
                    We've received your inquiry. Our team will contact you shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-white/70 text-sm mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-gold focus:outline-none transition-colors"
                        placeholder="Enter your name"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-white/70 text-sm mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-gold focus:outline-none transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-white/70 text-sm mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-gold focus:outline-none transition-colors"
                        placeholder="+971 XX XXX XXXX"
                      />
                    </div>
                  </div>

                  {/* Interested In */}
                  <div>
                    <label className="block text-white/70 text-sm mb-2">
                      I'm Interested In
                    </label>
                    <select
                      name="interestedIn"
                      value={formData.interestedIn}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-gold focus:outline-none transition-colors"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Site Visit">Schedule Site Visit</option>
                      <option value="Price Details">Price Details</option>
                      <option value="Payment Plan">Payment Plan</option>
                      <option value="Brochure">Download Brochure</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-white/70 text-sm mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-gold focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full gradient-gold text-black hover:shadow-gold py-6 text-lg font-semibold"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send className="w-5 h-5" />
                        Send Inquiry
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DubaiProjectContact;
