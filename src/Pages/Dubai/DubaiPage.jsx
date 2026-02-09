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

const DubaiPageContent = () => {
  const { selectedEmirate, emirateConfig } = useDubai();

  // Update meta tags when emirate changes (but keep same page title)
  useEffect(() => {
    // Keep static page title since it's a single page
    document.title = "New & Upcoming Real Estate Projects in Dubai 2026 | 100Acress";
    
    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "Explore 100+ verified New & upcoming real estate projects in Dubai 2026, from affordable JVC apartments to luxury waterfront villas. View Prices & Payment Plans Now.";
    
    // Update or create canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = "https://www.100acress.com/united-arab-emirates/";
    
    // Update Open Graph meta tags for social sharing
    updateMetaTag('og:title', "New & Upcoming Real Estate Projects in Dubai 2026 | 100Acress");
    updateMetaTag('og:description', "Explore 100+ verified New & upcoming real estate projects in Dubai 2026, from affordable JVC apartments to luxury waterfront villas. View Prices & Payment Plans Now.");
    updateMetaTag('og:url', "https://www.100acress.com/united-arab-emirates/");

    // Add JSON-LD Schema (Breadcrumb and FAQ)
    let schemaScript = document.getElementById('dubai-schema');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'dubai-schema';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }
    schemaScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.100acress.com/united-arab-emirates/#breadcrumb",
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
              "name": "Dubai Real Estate",
              "item": "https://www.100acress.com/united-arab-emirates/"
            }
          ]
        },
        {
          "@type": "FAQPage",
          "@id": "https://www.100acress.com/united-arab-emirates/#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Where can I find affordable new housing projects in Dubai?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "JVC, Arjan, and Dubai South are the best locations for affordable latest real estate projects in Dubai, offering premium amenities and competitive pricing."
              }
            },
            {
              "@type": "Question",
              "name": "What are the latest off-plan developments in prime locations?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Business Bay and Downtown feature many new upcoming real estate projects. Object 1 real estate projects for sale in Dubai are highly sought after for their strategic positioning."
              }
            },
            {
              "@type": "Question",
              "name": "Which are the best real estate developments currently underway in Dubai?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The best real estate projects in Dubai currently underway include major developments by Binghatti, Danube, and DAMAC, known for high construction quality."
              }
            },
            {
              "@type": "Question",
              "name": "What are the top luxury waterfront real estate projects in Dubai?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Top luxury waterfront developments are located in Dubai Islands and Palm Jebel Ali, representing the best upcoming real estate projects in Dubai for coastal living."
              }
            },
            {
              "@type": "Question",
              "name": "How many real estate projects in Dubai are currently available?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "While hundreds of developments exist, 100acress provides a verified list of 100+ top projects to help investors navigate the vast Dubai market."
              }
            },
            {
              "@type": "Question",
              "name": "What can we expect from upcoming real estate projects in Dubai 2026?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Upcoming real estate projects in Dubai 2026 focus on AI-integrated smart homes and sustainability, with many new upcoming real estate projects launching this year."
              }
            },
            {
              "@type": "Question",
              "name": "How do I identify the best upcoming real estate projects in Dubai?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Focus on projects near transit hubs. 100acress lists the best upcoming real estate projects in Dubai 2026 with detailed ROI insights."
              }
            }
          ]
        }
      ]
    });

    return () => {
      // Cleanup schema script on unmount
      if (schemaScript) {
        schemaScript.remove();
      }
    };
    
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
