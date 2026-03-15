import React, { useMemo } from 'react';
import { useEffect } from "react";
import { Header } from "./components/Header";
import { NewHero } from "./components/NewHero";
import { PropertiesSection } from "./components/PropertiesSection";
import { DevelopersSection } from "./components/DevelopersSection";
import { LifestyleSection } from "./components/LifestyleSection";
import { InvestmentSection } from "./components/InvestmentSection";
import { ContactSection } from "./components/ContactSection";
import { Copyright } from "./components/Copyright";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import "./i18n/config"; 
import "./styles/theme.css";

const SrilankaPageContent = () => {
  // Update meta tags for Sri Lanka page
  useEffect(() => {
    document.title = "New & Upcoming Real Estate Projects in Sri Lanka 2026 | 100Acress";
    
    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "Explore premium real estate projects in Sri Lanka 2026. From Colombo apartments to beachfront villas. View prices, payment plans and exclusive deals.";
    
    // Update or create canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = "https://www.100acress.com/country/srilanka/";
    
    // Update Open Graph meta tags for social sharing
    updateMetaTag('og:title', "New & Upcoming Real Estate Projects in Sri Lanka 2026 | 100Acress");
    updateMetaTag('og:description', "Explore premium real estate projects in Sri Lanka 2026. From Colombo apartments to beachfront villas. View prices, payment plans and exclusive deals.");
    updateMetaTag('og:url', "https://www.100acress.com/country/srilanka/");

    // Add JSON-LD Schema
    let schemaScript = document.getElementById('srilanka-schema');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.type = 'application/ld+json';
      schemaScript.id = 'srilanka-schema';
      document.head.appendChild(schemaScript);
    }
    
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Real Estate Projects in Sri Lanka",
      "url": "https://www.100acress.com/country/srilanka/",
      "description": "Explore premium real estate projects in Sri Lanka 2026. From Colombo apartments to beachfront villas.",
      "mainEntity": {
        "@type": "RealEstateListing",
        "name": "Sri Lanka Property Projects",
        "description": "Premium residential and commercial properties in Sri Lanka"
      }
    };
    
    schemaScript.textContent = JSON.stringify(schemaData);

    function updateMetaTag(property, content) {
      let tag = document.querySelector(`meta[property="${property}"]`) || 
                document.querySelector(`meta[name="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(property.startsWith('og:') ? 'property' : 'name', property);
        document.head.appendChild(tag);
      }
      tag.content = content;
    }
  });

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <NewHero 
          title="Premium Real Estate in Sri Lanka"
          subtitle="Discover exclusive properties across Colombo, Kandy, Galle and coastal areas"
          backgroundImage="https://images.unsplash.com/photo-1549688836-3c4a0838e327?w=1920&q=85"
        />
        <PropertiesSection 
          title="Featured Sri Lanka Properties"
          subtitle="Handpicked selection of premium residential and commercial properties"
          country="srilanka"
        />
        <DevelopersSection 
          title="Trusted Sri Lankan Developers"
          subtitle="Partner with renowned local and international developers"
        />
        <LifestyleSection 
          title="Sri Lanka Lifestyle & Living"
          subtitle="Experience tropical paradise living with modern amenities"
        />
        <InvestmentSection 
          title="Investment Opportunities"
          subtitle="High-return investment opportunities in Sri Lanka's growing property market"
        />
        <ContactSection 
          title="Start Your Sri Lanka Property Journey"
          subtitle="Our experts are here to help you find your perfect property"
        />
        <Footer />
        <Copyright />
      </div>
    </ThemeProvider>
  );
};

const SrilankaPage = () => {
  return <SrilankaPageContent />;
};

export default SrilankaPage;
