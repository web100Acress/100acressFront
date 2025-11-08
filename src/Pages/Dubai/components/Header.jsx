import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../../Components/ui/button";
import { Menu, X, Globe, Phone, ChevronDown, Sun, Moon } from "lucide-react";
import { cn } from "../../../lib/utils";
import { useDubai } from "../context/DubaiContext";
import { useTheme } from "../context/ThemeContext";

// Logo URLs for different themes
const LOGO_DARK = "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/white-logo.webp";
const LOGO_LIGHT = "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/red-logo.webp";

export const Header = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEmiratesDropdownOpen, setIsEmiratesDropdownOpen] = useState(false);
  const { selectedEmirate, setSelectedEmirate } = useDubai();
  const { theme, toggleTheme } = useTheme();
  
  // Get current language from i18n
  const currentLanguage = i18n.language.toUpperCase();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    
    // Change language using i18next
    i18n.changeLanguage(newLang);
    
    // Update document direction for RTL support
    if (newLang === "ar") {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');
    }
    
    // Language preference is automatically saved to localStorage by i18next
  };

  const emirates = [
    { name: "Dubai", label: "Dubai" },
    { name: "Abu Dhabi", label: "Abu Dhabi" },
    { name: "Sharjah", label: "Sharjah" },
    { name: "Ajman", label: "Ajman" },
    { name: "Ras Al Khaimah", label: "Ras Al Khaimah" },
    { name: "Fujairah", label: "Fujairah" },
    { name: "Umm Al Quwain", label: "Umm Al Quwain" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isEmiratesDropdownOpen && !event.target.closest('.emirates-dropdown')) {
        setIsEmiratesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isEmiratesDropdownOpen]);

  const navLinks = [
    { label: t('nav.properties'), href: "#properties" },
    { label: t('nav.developers'), href: "#developers" },
    { label: t('nav.insights'), href: "#insights" },
    { label: t('nav.lifestyle'), href: "#lifestyle" },
    { label: t('nav.contact'), href: "#contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "glass-effect shadow-luxury py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo with Emirates Dropdown */}
        <div className="flex items-center space-x-3">
          <a href="/" className="flex items-center space-x-3 group">
            <img 
              src={theme === "dark" ? LOGO_DARK : LOGO_LIGHT}
              alt="100acress" 
              className="h-8 w-auto object-contain transition-all duration-300 group-hover:scale-105"
            />
          </a>
          
          {/* Emirates Dropdown */}
          <div className="relative emirates-dropdown">
            <button
              onClick={() => setIsEmiratesDropdownOpen(!isEmiratesDropdownOpen)}
              className="flex items-center space-x-1 text-xs text-gold uppercase tracking-widest border-l border-gold pl-3 hover:text-gold/80 transition-colors"
            >
              <span>{selectedEmirate}</span>
              <ChevronDown className={cn(
                "h-3 w-3 transition-transform duration-200",
                isEmiratesDropdownOpen && "rotate-180"
              )} />
            </button>

            {/* Dropdown Menu */}
            {isEmiratesDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 glass-effect border border-white/10 rounded-lg shadow-luxury overflow-hidden z-50 animate-fade-in">
                {emirates.map((emirate) => (
                  <button
                    key={emirate.name}
                    onClick={() => {
                      setSelectedEmirate(emirate.name);
                      setIsEmiratesDropdownOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-4 py-3 text-sm transition-colors",
                      selectedEmirate === emirate.name
                        ? "bg-gold/20 text-gold font-semibold"
                        : "text-white hover:bg-white/10 hover:text-gold"
                    )}
                  >
                    {emirate.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white hover:text-gold transition-colors duration-200 text-sm uppercase tracking-wider font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="text-white hover:text-gold hover:bg-white/10"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="text-white hover:text-gold hover:bg-white/10"
          >
            <Globe className="h-4 w-4 mr-2" />
            {currentLanguage} / {currentLanguage === "EN" ? "AR" : "EN"}
          </Button>
          
          <Button size="sm" className="gradient-gold text-black hover:shadow-gold">
            <Phone className="h-4 w-4 mr-2" />
            {t('nav.getExpertHelp')}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass-effect mt-4 border-t border-white/10">
          <nav className="container py-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-white hover:text-gold transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 space-y-2 border-t border-white/10">
              {/* Theme Toggle Mobile */}
              <Button
                variant="outline"
                onClick={toggleTheme}
                className="w-full border-white text-white hover:bg-white hover:text-black"
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="h-4 w-4 mr-2" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4 mr-2" />
                    Dark Mode
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                onClick={toggleLanguage}
                className="w-full border-white text-white hover:bg-white hover:text-black"
              >
                <Globe className="h-4 w-4 mr-2" />
                {currentLanguage} / {currentLanguage === "EN" ? "AR" : "EN"}
              </Button>
              <Button className="w-full gradient-gold text-black">
                <Phone className="h-4 w-4 mr-2" />
                {t('nav.getExpertHelp')}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
