import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { Button } from "../../Components/ui/button";
import { Input } from "../../Components/ui/Input";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare, 
  Building2,
  Users,
  Award,
  CheckCircle
} from "lucide-react";
import { DubaiProvider } from "./context/DubaiContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./i18n/config";
import "./styles/theme.css";

const ContactPageContent = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    propertyType: "residential"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        propertyType: "residential"
      });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 9811 750 740"],
      action: "tel:+919811750740"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@100acress.com"],
      action: "mailto:info@100acress.com"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["Business Bay", "Dubai, UAE"],
      action: null
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Mon - Sat: 9:00 AM - 8:00 PM", "Sunday: 10:00 AM - 6:00 PM"],
      action: null
    }
  ];

  const services = [
    {
      icon: Building2,
      title: "Property Investment",
      description: "Expert guidance on Dubai real estate investments"
    },
    {
      icon: Users,
      title: "Consultation Services",
      description: "Personalized property consultation and advice"
    },
    {
      icon: Award,
      title: "Premium Properties",
      description: "Access to exclusive luxury properties in Dubai"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/10 via-transparent to-black" />
        <div className="absolute top-20 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        
        <div className="container relative px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6 animate-fade-in">
            <span className="text-gold text-xs sm:text-sm font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase">
              Get In Touch
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white">
              Contact Our Dubai
              <span className="block text-gold">Property Experts</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to invest in Dubai's luxury real estate? Our expert team is here to guide you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 sm:py-16">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {contactInfo.map((info, index) => (
              <div
                key={info.title}
                className="p-6 glass-effect rounded-xl border border-white/10 text-center animate-fade-in-scale hover:border-gold/30 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-sm text-gray-300">
                      {info.action ? (
                        <a 
                          href={info.action} 
                          className="hover:text-gold transition-colors"
                        >
                          {detail}
                        </a>
                      ) : (
                        detail
                      )}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-12 sm:py-16">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
                  Send Us a Message
                </h2>
                <p className="text-gray-300 text-base sm:text-lg">
                  Fill out the form below and our Dubai property experts will get back to you within 24 hours.
                </p>
              </div>

              {submitStatus === "success" && (
                <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <p className="text-green-400">Message sent successfully! We'll get back to you soon.</p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <p className="text-red-400">Failed to send message. Please try again.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-gold/50 h-12"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-gold/50 h-12"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-gold/50 h-12"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Property Type
                    </label>
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleInputChange}
                      className="w-full h-12 px-4 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold/50 transition-colors"
                    >
                      <option value="residential" className="bg-black">Residential</option>
                      <option value="commercial" className="bg-black">Commercial</option>
                      <option value="luxury" className="bg-black">Luxury Properties</option>
                      <option value="investment" className="bg-black">Investment Properties</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subject *
                  </label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-gold/50 h-12"
                    placeholder="What can we help you with?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:border-gold/50 transition-colors resize-none"
                    placeholder="Tell us about your property requirements, budget, preferred location, or any questions you have..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full gradient-gold text-black hover:shadow-gold transition-all duration-300 h-12 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Services & Info */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  Why Choose 100acress Dubai?
                </h3>
                <p className="text-gray-300 text-base sm:text-lg">
                  We are your trusted partner for luxury real estate investments in Dubai, offering unparalleled expertise and personalized service.
                </p>
              </div>

              <div className="space-y-6">
                {services.map((service, index) => (
                  <div
                    key={service.title}
                    className="p-6 glass-effect rounded-xl border border-white/10 animate-fade-in-scale hover:border-gold/30 transition-all duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <service.icon className="h-5 w-5 text-gold" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">{service.title}</h4>
                        <p className="text-gray-300 text-sm">{service.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Contact */}
              <div className="p-6 glass-effect rounded-xl border border-gold/20 bg-gold/5">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="h-6 w-6 text-gold" />
                  <h4 className="text-lg font-semibold text-white">Need Immediate Assistance?</h4>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  For urgent inquiries or immediate property viewing appointments, call us directly.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    asChild
                    className="gradient-gold text-black hover:shadow-gold flex-1"
                  >
                    <a href="tel:+919811750740">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-gold text-gold hover:bg-gold hover:text-black flex-1"
                  >
                    <a href="https://wa.me/919811750740" target="_blank" rel="noopener noreferrer">
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

const ContactPage = () => {
  return (
    <ThemeProvider>
      <DubaiProvider>
        <ContactPageContent />
      </DubaiProvider>
    </ThemeProvider>
  );
};

export default ContactPage;
