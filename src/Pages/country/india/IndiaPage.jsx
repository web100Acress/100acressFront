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

const IndiaPageContent = () => {
  // Update meta tags for India page
  useEffect(() => {
    document.title = "New & Upcoming Real Estate Projects in India 2026 | 100Acress";
    
    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "Explore premium real estate projects in India 2026. From Delhi apartments to Mumbai homes. View prices, payment plans and exclusive deals.";
    
    // Update or create canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = "https://www.100acress.com/country/india/";
    
    // Update Open Graph meta tags for social sharing
    updateMetaTag('og:title', "New & Upcoming Real Estate Projects in India 2026 | 100Acress");
    updateMetaTag('og:description', "Explore premium real estate projects in India 2026. From Delhi apartments to Mumbai homes. View prices, payment plans and exclusive deals.");
    updateMetaTag('og:url', "https://www.100acress.com/country/india/");

    // Add JSON-LD Schema
    let schemaScript = document.getElementById('india-schema');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.type = 'application/ld+json';
      schemaScript.id = 'india-schema';
      document.head.appendChild(schemaScript);
    }
    
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Real Estate Projects in India",
      "url": "https://www.100acress.com/country/india/",
      "description": "Explore premium real estate projects in India 2026. From Delhi apartments to Mumbai homes.",
      "mainEntity": {
        "@type": "RealEstateListing",
        "name": "India Property Projects",
        "description": "Premium residential and commercial properties in India"
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
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <NewHero 
          title="Premium Real Estate in India"
          subtitle="Discover exclusive properties across Delhi, Mumbai, Bangalore and more"
          backgroundImage="https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=1920&q=85"
        />
        <PropertiesSection 
          title="Featured India Properties"
          subtitle="Handpicked selection of premium residential and commercial properties"
          country="india"
        />
        <DevelopersSection 
          title="Trusted Indian Developers"
          subtitle="Partner with renowned Indian and international developers"
        />
        <LifestyleSection 
          title="India Lifestyle & Living"
          subtitle="Experience the best of Indian living with world-class amenities"
        />
        <InvestmentSection 
          title="Investment Opportunities"
          subtitle="High-return investment opportunities in India's growing property market"
        />
        <ContactSection 
          title="Start Your India Property Journey"
          subtitle="Our experts are here to help you find your perfect property"
        />
        <Footer />
        <Copyright />
      </div>
    </ThemeProvider>
  );
};

const IndiaPage = () => {
  return <IndiaPageContent />;
};

export default IndiaPage;
