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

const UkPageContent = () => {
  // Update meta tags for UK page
  useEffect(() => {
    document.title = "New & Upcoming Real Estate Projects in UK 2026 | 100Acress";
    
    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "Explore premium real estate projects in UK 2026. From London apartments to Manchester homes. View prices, payment plans and exclusive deals.";
    
    // Update or create canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = "https://www.100acress.com/country/uk/";
    
    // Update Open Graph meta tags for social sharing
    updateMetaTag('og:title', "New & Upcoming Real Estate Projects in UK 2026 | 100Acress");
    updateMetaTag('og:description', "Explore premium real estate projects in UK 2026. From London apartments to Manchester homes. View prices, payment plans and exclusive deals.");
    updateMetaTag('og:url', "https://www.100acress.com/country/uk/");

    // Add JSON-LD Schema
    let schemaScript = document.getElementById('uk-schema');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.type = 'application/ld+json';
      schemaScript.id = 'uk-schema';
      document.head.appendChild(schemaScript);
    }
    
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Real Estate Projects in UK",
      "url": "https://www.100acress.com/country/uk/",
      "description": "Explore premium real estate projects in UK 2026. From London apartments to Manchester homes.",
      "mainEntity": {
        "@type": "RealEstateListing",
        "name": "UK Property Projects",
        "description": "Premium residential and commercial properties in United Kingdom"
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
          title="Premium Real Estate in United Kingdom"
          subtitle="Discover exclusive properties across London, Manchester, Birmingham and more"
          backgroundImage="https://images.unsplash.com/photo-15130933843-5c6132b1e5d5?w=1920&q=85"
        />
        <PropertiesSection 
          title="Featured UK Properties"
          subtitle="Handpicked selection of premium residential and commercial properties"
          country="uk"
        />
        <DevelopersSection 
          title="Trusted UK Developers"
          subtitle="Partner with renowned British and international developers"
        />
        <LifestyleSection 
          title="UK Lifestyle & Living"
          subtitle="Experience the best of British living with world-class amenities"
        />
        <InvestmentSection 
          title="Investment Opportunities"
          subtitle="High-return investment opportunities in UK's growing property market"
        />
        <ContactSection 
          title="Start Your UK Property Journey"
          subtitle="Our experts are here to help you find your perfect property"
        />
        <Footer />
        <Copyright />
      </div>
    </ThemeProvider>
  );
};

const UkPage = () => {
  return <UkPageContent />;
};

export default UkPage;
