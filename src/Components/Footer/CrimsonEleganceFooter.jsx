import {
  Phone,
  Mail,
  Linkedin,
  Facebook,
  X,
  Youtube,
  Instagram,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/Input";
import { Link } from "react-router-dom";
import { useState } from "react";
import api from "../../config/apiClient";

const CrimsonEleganceFooter = () => {
  const [icName, setIcName] = useState("");
  const [icPhone, setIcPhone] = useState("");
  const [icSubmitting, setIcSubmitting] = useState(false);

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
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us/" },
    { name: "Our Services", href: "/about-us/" },
    { name: "Luxury Properties", href: "/top-luxury-projects/" },
    { name: "Blog", href: "/blog/" },
    { name: "Career", href: "/career-with-us/" },
    { name: "Contact", href: "/contact-us/" },
  ];

  const popularCities = [
    { name: "Flats in Gurugram", href: "/projects-in-gurugram/" },
    { name: "Flats in Delhi", href: "/project-in-delhi/" },
    { name: "Flats in Noida", href: "/project-in-noida/" },
    { name: "Flats in Goa", href: "/project-in-goa/" },
    { name: "Flats in Ayodhya", href: "/project-in-ayodhya/" },
    { name: "Flats in Mumbai", href: "/project-in-mumbai/" },
    { name: "Flats in Panipat", href: "/projects-in-panipat/" },
    { name: "Flats in Panchkula", href: "/project-in-panchkula/" },
    { name: "Flats in Kasauli", href: "/project-in-kasauli/" },
    { name: "Flats in Sonipat", href: "/projects-in-sonipat/" },
    { name: "Flats in Karnal", href: "/projects-in-karnal/" },
    { name: "Flats in Jalandhar", href: "/projects-in-jalandhar/" },
    { name: "Flats in Pushkar", href: "/projects-in-pushkar/" },
    { name: "Flats in Dubai", href: "/projects-in-dubai/" },
  ];

  const primeLocations = [
    {
      name: "Projects in Sohna Road",
      href: "/property-in-gurugram/sohna-road/",
    },
    {
      name: "Projects in Golf Course",
      href: "/property-in-gurugram/golf-course/",
    },
    {
      name: "Projects in Northern Peripheral Road",
      href: "/property-in-gurugram/northern-peripheral-road/",
    },
    {
      name: "Projects in Dwarka Expressway",
      href: "/property-in-gurugram/dwarka-expressway/",
    },
    {
      name: "Projects in New Gurgaon",
      href: "/property-in-gurugram/new-gurgaon/",
    },
    {
      name: "Projects in Southern Peripheral Road",
      href: "/property-in-gurugram/southern-peripheral-road/",
    },
    {
      name: "Projects in Golf Course Extn Road",
      href: "/property-in-gurugram/golf-course-extn-road/",
    },
  ];

  const toolsServices = [
    { name: "EMI Calculator", href: "/emi-calculator/" },
    {
      name: "Area Calculator",
      href: "/emi-calculator/",
    },
    { name: "Rasale Properties in Gurugram", href: "/buy-properties/best-resale-property-in-gurugram/" },
    { name: "Rental Properties in Gurugram", href: "/rental-properties/best-rental-property-in-gurugram/" },
    { name: "Privacy Policy", href: "/privacy-policy/" },
    { name: "Terms & Conditions", href: "/terms-and-conditions/" },
    { name: "Disclaimer", href: "/disclaimer"},
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
                {/* <div className="space-y-2">
                  <p className="text-lg text-footer-text-muted font-medium">
                    About{" "}
                    <Link
                      to="https://www.100acress.com/"
                      className="text-lg text-footer-text-muted font-medium hover:text-footer-accent transition-colors duration-300"
                    >
                      100acress.com
                    </Link>
                  </p>
                </div> */}
                <p className="text-footer-text leading-relaxed text-lg max-w-2xl">
                  <Link
                    to="https://www.100acress.com/"
                    className="hover:text-footer-accent transition-colors duration-300"
                  >
                    100acress.com
                  </Link>{" "}
                  Real Estate Company specializes in providing premier property
                  solutions tailored to meet your needs. We offer world-class
                  luxury homes with stylish design, premium features, and
                  top-class amenities for a truly exclusive lifestyle.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-footer-text hover:text-footer-accent transition-smooth">
                  <a
                    href="tel:+918500900100"
                    className="flex items-center gap-4 text-footer-text hover:text-footer-accent transition-smooth"
                  >
                    <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                      <Phone className="w-5 h-5" />
                    </div>
                    <span className="text-lg font-medium">
                      +91 8500-900-100
                    </span>
                  </a>
                </div>
                <a
                  href="mailto:support@100acress.com"
                  className="flex items-center gap-4 text-footer-text hover:text-footer-accent transition-smooth"
                >
                  <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-lg font-medium">
                    support@100acress.com
                  </span>
                </a>
                <a
                  href="https://wa.me/918500900100"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-footer-text hover:text-footer-accent transition-smooth"
                >
                  <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.966-.273-.099-.471-.148-.67.15-.197.297-.767.963-.94 1.16-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.795-1.484-1.781-1.66-2.08-.173-.297-.018-.458.13-.605.136-.133.296-.347.445-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.508-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.005-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.36-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.887-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.549 4.142 1.595 5.945L0 24l6.335-1.652a11.882 11.882 0 005.723 1.467h.006c6.554 0 11.89-5.335 11.89-11.893 0-3.18-1.259-6.19-3.548-8.464" />
                    </svg>
                  </div>
                  <span className="text-lg font-medium">+91 8500-900-100</span>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-elegant">
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-bold text-footer-text">
                    Get Instant Callback
                  </h3>
                  <p className="text-footer-text-muted">
                    Get expert advice on your property investment
                  </p>
                </div>

                <form onSubmit={handleInstantCallSubmit} className="space-y-4">
                  <Input
                    placeholder="Your Name"
                    value={icName}
                    onChange={(e) => setIcName(e.target.value)}
                    className="bg-white/20 border-white/30 text-footer-text placeholder:text-footer-text-muted backdrop-blur-sm h-12 text-lg"
                    required
                    minLength={2}
                  />
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    value={icPhone}
                    onChange={(e) => setIcPhone(e.target.value)}
                    className="bg-white/20 border-white/30 text-footer-text placeholder:text-footer-text-muted backdrop-blur-sm h-12 text-lg"
                    required
                    pattern="^([+]\d{2})?\d{10}$"
                    title="Please enter a valid 10-digit phone number"
                  />
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-accent hover:bg-rose-gold text-burgundy-dark font-semibold h-12 text-lg shadow-soft hover:shadow-elegant transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={icSubmitting}
                  >
                    {icSubmitting ? 'Submitting...' : 'Contact'}
                  </Button>
                </form>

                <p className="text-sm text-footer-text-muted text-center">
                  Get expert advice on your property investment. Our team will
                  contact you within 30 minutes.
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

          <div className="container mx-auto px-6 py-0">
            <div className="flex flex-wrap gap-2">
              {[
                "1 BHK Flats in Gurgaon",
                "2 BHK Flats in Gurgaon",
                "3 BHK Flats in Gurgaon",
                "4 BHK Flats in Gurgaon",
                "5 BHK Flats in Gurgaon",
                "Fully Furnished Flats in Gurgaon",
                "Penthouse in Gurgaon",
                "Semi Furnished Flats in Gurgaon",
                "Unfurnished Flats in Gurgaon",
                "Independent Floor for Sale in Gurgaon",
                "Independent Houses For Sale in Gurgaon",
                "Flats For Sale under 1 Cr in Gurgaon",
                "Flats For Sale under 5 Cr in Gurgaon",
                "Flats For Sale under 10 Cr in Gurgaon",
                "Flats For Sale under 20 Cr In Gurgaon",                
                "Affordable Homes in Gurgaon",
                "Farmhouse in Gurgaon",
                "Luxury Villas in Gurgaon",
              ].map((location, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg h-6 px-2 flex items-center justify-center hover:scale-105 transition-all duration-300 cursor-pointer min-w-max"
                >
                  <span className="text-red-900 font-medium text-sm text-center leading-tight whitespace-nowrap">
                    {location}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* </div> */}

          <div className="relative flex items-center justify-center py-8">
            <a
              href="https://www.100acress.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[clamp(2.5rem,10vw,8rem)] font-bold text-footer-text-muted/10 hover:text-footer-text-muted/20 select-none leading-none tracking-wider transition-opacity duration-300"
            >
              100acress.com
            </a>
          </div>
          {/* Bottom Section */}
          <div className="border-t border-white/10 pt-8">
            <div className="container mx-auto px-6 pb-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Copyright */}
                <div className="text-footer-text-muted text-center md:text-left">
                  © 2025{" "}
                  <a
                    href="https://www.100acress.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-footer-accent transition-colors duration-300"
                  >
                    100acress.com
                  </a>{" "}
                  All rights reserved.
                </div>

                {/* Social Media */}
                <div className="flex items-center gap-4">
                  {[
                    {
                      Icon: Facebook,
                      href: "https://www.facebook.com/100Acress",
                    },
                    {
                      Icon: Instagram,
                      href: "https://www.instagram.com/official100acress",
                    },
                    {
                      Icon: Youtube,
                      href: "https://www.youtube.com/@100acress",
                    },
                    {
                      Icon: Linkedin,
                      href: "https://www.linkedin.com/company/100acress/",
                    },
                   
                    { Icon: X, href: "https://twitter.com/100acressdotcom" },
                  
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
