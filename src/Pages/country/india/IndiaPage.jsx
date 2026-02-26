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
import "./i18n/config"; 
import "./styles/theme.css";

const IndiaPageContent = () => {
  const { selectedEmirate, emirateConfig } = useDubai();

  // Update meta tags when emirate changes (but keep same page title)
  useEffect(() => {
    // Keep static page title since it's a single page
    document.title = "New & Upcoming Real Estate Projects in India 2026 | 100Acress";
    
    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "Explore 100+ verified New & upcoming real estate projects in India 2026, from affordable apartments to luxury villas. View Prices & Payment Plans Now.";
    
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
    updateMetaTag('og:description', "Explore 100+ verified New & upcoming real estate projects in India 2026, from affordable apartments to luxury villas. View Prices & Payment Plans Now.");
    updateMetaTag('og:url', "https://www.100acress.com/country/india/");

    // Add JSON-LD Schema (Breadcrumb and FAQ)
    let schemaScript = document.getElementById('india-schema');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'india-schema';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }
    schemaScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.100acress.com/country/india/#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.100acress.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "India",
              "item": "https://www.100acress.com/country/india/"
            }
          ]
        },
        {
          "@type": "FAQPage",
          "@id": "https://www.100acress.com/country/india/#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Where can I find affordable new housing projects in India?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Major cities like Delhi NCR, Mumbai, Pune, and Bangalore offer excellent affordable housing projects with premium amenities and competitive pricing."
              }
            },
            {
              "@type": "Question",
              "name": "Is India a good place for property investment?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, India offers excellent property investment opportunities with strong rental yields, capital appreciation, and government initiatives promoting real estate growth."
              }
            }
          ]
        }
      ]
    });
  }, [selectedEmirate]);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <NewHero />
        <PropertiesSection />
        <DevelopersSection />
        <LifestyleSection />
        <InvestmentSection />
        <ContactSection />
        <Copyright />
        <DubaiBottomNav />
      </div>
    </ThemeProvider>
  );
};

const IndiaPage = () => {
  return (
    <DubaiProvider>
      <IndiaPageContent />
    </DubaiProvider>
  );
};

// Helper function to update meta tags
function updateMetaTag(property, content) {
  let tag = document.querySelector(`meta[property="${property}"]`) || 
            document.querySelector(`meta[name="${property}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(property.startsWith('og:') ? 'property' : 'name', property);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

export default IndiaPage;
