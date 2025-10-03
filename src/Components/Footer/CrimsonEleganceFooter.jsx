import { Phone, Mail, Linkedin, Facebook, Twitter, Youtube } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Link } from "react-router-dom";

const CrimsonEleganceFooter = () => {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us/" },
    { name: "Our Services", href: "/#our-services" },
    { name: "Luxury Properties", href: "/top-luxury-projects/" },
    { name: "Blog", href: "/blog/" },
    { name: "EMI Calculator", href: "/emi-calculator/" },
    { name: "Career", href: "/career-with-us/" },
    { name: "Contact", href: "/contact-us/" },
  ];

  const popularCities = [
    { name: "Flats in Gurugram", href: "/projects-in-gurugram/" },
    { name: "Flats in Delhi", href: "/project-in-delhi/" },
    { name: "Flats in Noida", href: "/project-in-noida/" },
    { name: "Flats in Goa", href: "/projects-in-goa/" },
    { name: "Flats in Ayodhya", href: "/projects-in-ayodhya/" },
    { name: "Flats in Mumbai", href: "/project-in-mumbai/" },
    { name: "Flats in Panipat", href: "/projects-in-panipat/" },
    { name: "Flats in Panchkula", href: "/projects-in-panchkula/" },
    { name: "Flats in Kasauli", href: "/projects-in-kasauli/" },
    { name: "Flats in Sonipat", href: "/projects-in-sonipat/" },
    { name: "Flats in Karnal", href: "/projects-in-karnal/" },
    { name: "Flats in Jalandhar", href: "/projects-in-jalandhar/" },
    { name: "Flats in Pushkar", href: "/projects-in-pushkar/" },
    { name: "Flats in Dubai", href: "/projects-in-dubai/" },
  ];

  const primeLocations = [
    { name: "Projects in Sohna Road", href: "/property-in-gurugram/sohna-road/" },
    { name: "Projects in Golf Course", href: "/property-in-gurugram/golf-course/" },
    { name: "Projects in Northern Peripheral Road", href: "/property-in-gurugram/northern-peripheral-road/" },
    { name: "Projects in Dwarka Expressway", href: "/property-in-gurugram/dwarka-expressway/" },
    { name: "Projects in New Gurgaon", href: "/property-in-gurugram/new-gurgaon/" },
    { name: "Projects in Southern Peripheral Road", href: "/property-in-gurugram/southern-peripheral-road/" },
    { name: "Projects in Golf Course Extn Road", href: "/property-in-gurugram/golf-course-extn-road/" },
  ];

  const toolsServices = [
    { name: "Square Meter to Feet", href: "/convert-square-meter-to-square-feet/" },
    { name: "Square Feet to Meter", href: "/convert-square-feet-to-square-meter/" },
    { name: "Acre to Square Feet", href: "/convert-acre-to-square-feet/" },
    { name: "Square Feet to Acre", href: "/convert-square-feet-to-acre/" },
    { name: "Buy Properties", href: "/buy-properties/" },
    { name: "Sell Properties", href: "/sell-properties/" },
    { name: "Rent Properties", href: "/rent-properties/" },
    { name: "Commercial", href: "/commercial-properties/" },
  ];

  return (
    <footer className="bg-gradient-elegant relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-gold rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-champagne rounded-full blur-3xl"></div>
      </div>
      
      {/* Main Footer Content */}
      <div className="relative z-10">
        {/* Top Section */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* About Section */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-accent bg-clip-text text-transparent">
                    100acres
                  </h2>
                  <p className="text-lg text-footer-text-muted font-medium">Real Estate Excellence</p>
                </div>
                <p className="text-footer-text leading-relaxed text-lg max-w-2xl">
                  100acres.com Real Estate Company specializes in providing premier property solutions 
                  tailored to meet your needs. We offer world-class luxury homes with stylish design, 
                  premium features, and top-class amenities for a truly exclusive lifestyle.
                </p>
              </div>
              
              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-footer-text hover:text-footer-accent transition-smooth">
                  <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="text-lg font-medium">+91 8500-900-100</span>
                </div>
                <div className="flex items-center gap-4 text-footer-text hover:text-footer-accent transition-smooth">
                  <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-lg font-medium">support@100acres.com</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-elegant">
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-bold text-footer-text">Get Instant Callback</h3>
                  <p className="text-footer-text-muted">Get expert advice on your property investment</p>
                </div>
                
                <div className="space-y-4">
                  <Input 
                    placeholder="Your Name" 
                    className="bg-white/20 border-white/30 text-footer-text placeholder:text-footer-text-muted backdrop-blur-sm h-12 text-lg"
                  />
                  <Input 
                    placeholder="Phone Number" 
                    className="bg-white/20 border-white/30 text-footer-text placeholder:text-footer-text-muted backdrop-blur-sm h-12 text-lg"
                  />
                  <Button className="w-full bg-gradient-accent hover:bg-rose-gold text-burgundy-dark font-semibold h-12 text-lg shadow-soft hover:shadow-elegant transition-all duration-300 hover:scale-[1.02]">
                    Contact
                  </Button>
                </div>
                
                <p className="text-sm text-footer-text-muted text-center">
                  Get expert advice on your property investment. Our team will contact you within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Links and Bottom Section - Combined */}
        <div className="bg-black/20 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Quick Links */}
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-footer-accent border-b border-footer-accent/30 pb-3">
                  Quick Links
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {quickLinks.map((link, index) => (
                    <Link
                      key={index}
                      to={link.href}
                      className="text-footer-text-muted hover:text-footer-accent transition-smooth hover:translate-x-1 duration-300"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Popular Cities */}
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-footer-accent border-b border-footer-accent/30 pb-3">
                  Popular Cities
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {popularCities.map((link, index) => (
                    <Link
                      key={index}
                      to={link.href}
                      className="text-footer-text-muted hover:text-footer-accent transition-smooth hover:translate-x-1 duration-300"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Prime Locations */}
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-footer-accent border-b border-footer-accent/30 pb-3">
                  Prime Locations
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {primeLocations.map((link, index) => (
                    <Link
                      key={index}
                      to={link.href}
                      className="text-footer-text-muted hover:text-footer-accent transition-smooth hover:translate-x-1 duration-300"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Tools & Services */}
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-footer-accent border-b border-footer-accent/30 pb-3">
                  Tools & Services
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {toolsServices.map((link, index) => (
                    <Link
                      key={index}
                      to={link.href}
                      className="text-footer-text-muted hover:text-footer-accent transition-smooth hover:translate-x-1 duration-300"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Large Brand Watermark */}
          <div className="relative flex items-center justify-center pointer-events-none py-8">
            <div className="text-[clamp(4rem,15vw,12rem)] font-bold text-footer-text-muted/10 select-none leading-none tracking-wider">
              100acress
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/10 pt-8">
            <div className="container mx-auto px-6 pb-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Copyright */}
                <div className="text-footer-text-muted text-center md:text-left">
                  © 2024 100acres.com. All rights reserved.
                </div>
                
                {/* Social Media */}
                <div className="flex items-center gap-4">
                  {[
                    { Icon: Linkedin, href: "https://www.linkedin.com/company/100acress/" },
                    { Icon: Facebook, href: "https://www.facebook.com/100Acress" },
                    { Icon: Twitter, href: "https://twitter.com/100acressdotcom" },
                    { Icon: Youtube, href: "https://www.youtube.com/@100acress" },
                  ].map(({ Icon, href }, index) => (
                    <a
                      key={index}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/10 hover:bg-footer-accent rounded-xl text-footer-text hover:text-burgundy-dark transition-all duration-300 hover:scale-110 hover:rotate-6"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CrimsonEleganceFooter;
