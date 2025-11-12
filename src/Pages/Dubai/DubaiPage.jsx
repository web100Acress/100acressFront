import { useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { PropertiesSection } from "./components/PropertiesSection";
import { DevelopersSection } from "./components/DevelopersSection";
import { LifestyleSection } from "./components/LifestyleSection";
import { InvestmentSection } from "./components/InvestmentSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { DubaiProvider, useDubai } from "./context/DubaiContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./i18n/config"; // Initialize i18n
import "./styles/theme.css"; // Theme styles

const DubaiPageContent = () => {
  const { selectedEmirate, emirateConfig } = useDubai();

  // Update document title when emirate changes
  useEffect(() => {
    document.title = `${emirateConfig.headline} | 100acress`;
  }, [selectedEmirate, emirateConfig]);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Header />
      <Hero />
      {/* Spacer to allow scrolling over fixed hero */}
      <div className="h-screen" />
      {/* Content sections with relative positioning */}
      <div className="relative z-10 bg-black">
        <PropertiesSection />
        <DevelopersSection />
        <LifestyleSection />
        <InvestmentSection />
        <ContactSection />
        <Footer />
      </div>
      <WhatsAppButton />
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
