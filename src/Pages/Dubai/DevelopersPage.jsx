import React, { useEffect } from "react";
import { Header } from "./components/Header";
import { DevelopersSection } from "./components/DevelopersSection";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";
import DubaiBottomNav from "./components/DubaiBottomNav";
import { DubaiProvider, useDubai } from "./context/DubaiContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./i18n/config";
import "./styles/theme.css";

const DevelopersPageContent = () => {
  const { emirateConfig } = useDubai();

  useEffect(() => {
    document.title = `${emirateConfig?.headline || "Dubai"} Developers | 100acress`;
  }, [emirateConfig]);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Header />
      {/* Spacer under fixed header */}
      <div className="h-24" />

      <main className="relative z-10 bg-black">
        <DevelopersSection />
        <Footer />
      </main>

      <WhatsAppButton />
      <DubaiBottomNav />
    </div>
  );
};

const DevelopersPage = () => (
  <ThemeProvider>
    <DubaiProvider>
      <DevelopersPageContent />
    </DubaiProvider>
  </ThemeProvider>
);

export default DevelopersPage;
