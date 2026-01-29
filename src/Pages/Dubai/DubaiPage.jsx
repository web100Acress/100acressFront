import { useEffect } from "react";
import { Header } from "./components/Header";
import { NewHero } from "./components/NewHero";
import { PropertiesSection } from "./components/PropertiesSection";
import { DevelopersSection } from "./components/DevelopersSection";
import { LifestyleSection } from "./components/LifestyleSection";
import { InvestmentSection } from "./components/InvestmentSection";
import { ContactSection } from "./components/ContactSection";
import { Copyright } from "./components/Copyright";
import DubaiBottomNav from "./components/DubaiBottomNav";
import { DubaiProvider, useDubai } from "./context/DubaiContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./i18n/config"; // Initialize i18n
import "./styles/theme.css"; // Theme styles

const DubaiPageContent = () => {
  const { selectedEmirate, emirateConfig } = useDubai();

  // Update meta tags when emirate changes (but keep same page title)
  useEffect(() => {
    // Keep static page title since it's a single page
    document.title = "Premium Real Estate Projects in Dubai | UAE Properties";
    
    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "Explore premium Dubai real estate projects by trusted developers. Discover luxury homes, high-return investments, and residential locations across the UAE.";
    
    // Update or create canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = "https://www.100acress.com/united-arab-emirates/";
    
    // Update Open Graph meta tags for social sharing
    updateMetaTag('og:title', "Premium Real Estate Projects in Dubai | UAE Properties");
    updateMetaTag('og:description', "Explore premium Dubai real estate projects by trusted developers. Discover luxury homes, high-return investments, and residential locations across the UAE.");
    updateMetaTag('og:url', "https://www.100acress.com/united-arab-emirates/");
    
  }, [selectedEmirate, emirateConfig]);

  // Helper function to update meta tags
  const updateMetaTag = (property, content) => {
    let metaTag = document.querySelector(`meta[property="${property}"]`) || 
                  document.querySelector(`meta[name="${property}"]`);
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute(property.includes('og:') ? 'property' : 'name', property);
      document.head.appendChild(metaTag);
    }
    metaTag.content = content;
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Header />
      <NewHero />
      {/* Spacer to push content below the fixed hero */}
      <div className="h-screen"></div>
      {/* Content sections that will scroll over the fixed hero */}
      <div className="relative z-10">
        <PropertiesSection />
        <DevelopersSection />
        <LifestyleSection />
        <InvestmentSection />
        <ContactSection />
      </div>
      <DubaiBottomNav />
      <Copyright />
    </div>
  );
};

const DubaiPage = () => {
  return (
    <ThemeProvider>
      <DubaiProvider>
        <DubaiPageContent />
      </DubaiProvider>
    </ThemeProvider>
  );
};

export default DubaiPage;
