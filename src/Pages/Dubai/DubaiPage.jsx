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
    document.title = "Top Projects in Dubai UAE | Luxury & Investment Properties | 100Acress";
    
    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "Explore the best projects in Dubai UAE including luxury apartments, villas, and off-plan properties. Discover top investment opportunities in Dubai.";
    
    // Update or create canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = "https://www.100acress.com/global/projects-in-dubai-uae/";
    
    // Update Open Graph meta tags for social sharing
    updateMetaTag('og:title', "Top Projects in Dubai UAE | Luxury & Investment Properties | 100Acress");
    updateMetaTag('og:description', "Explore the best projects in Dubai UAE including luxury apartments, villas, and off-plan properties. Discover top investment opportunities in Dubai.");
    updateMetaTag('og:url', "https://www.100acress.com/global/projects-in-dubai-uae/");

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
          "@id": "https://www.100acress.com/global/projects-in-dubai-uae/#breadcrumb",
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
              "item": "https://www.100acress.com/global/projects-in-dubai-uae/"
            }
          ]
        },
        {
          "@type": "FAQPage",
          "@id": "https://www.100acress.com/global/projects-in-dubai-uae/#faq",
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
                "text": "The best real estate projects currently underway in Dubai include major developments by Binghatti, Danube, and DAMAC, known for high construction quality."
              }
            },
            {
              "@type": "Question",
              "name": "What are the top luxury waterfront real estate properties in Dubai?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Top luxury waterfront developments are located in Dubai Islands and Palm Jebel Ali, representing the best upcoming real estate properties in Dubai for coastal living."
              }
            },
            {
              "@type": "Question",
              "name": "How many real estate projects are currently available in Dubai?",
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
              "name": "How do I identify the best upcoming Dubai real estate projects?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Focus on projects near transit hubs. 100acress lists the best upcoming real estate projects in Dubai with detailed ROI insights."
              }
            }
          ]
        },
        {
          "@type": "Product",
          "name": "Top Projects in Dubai UAE",
          "description": "Explore the best projects in Dubai UAE including luxury apartments, villas, and off-plan properties. Discover top investment opportunities in Dubai.",
          "sku": "projects-in-dubai-uae",
          "image": "https://www.100acress.com/Images/mainog.png",
          "brand": {
            "@type": "Brand",
            "name": "Dubai RealEstate"
          },
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "INR",
            "lowPrice": "15600000",
            "availability": "https://schema.org/InStock",
            "url": "https://www.100acress.com/global/projects-in-dubai-uae/"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "2084"
          },
          "url": "https://www.100acress.com/global/projects-in-dubai-uae/"
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
