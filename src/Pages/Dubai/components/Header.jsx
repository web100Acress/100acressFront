import { useState, useEffect } from "react";
import { Button } from "../../../Components/ui/button";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { cn } from "../../../lib/utils";
import { useDubai } from "../context/DubaiContext";

// Logo URL
const LOGO = "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/white-logo.webp";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEmiratesDropdownOpen, setIsEmiratesDropdownOpen] = useState(false);
  const { selectedEmirate, setSelectedEmirate, currency, setCurrency } = useDubai();

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
    { label: "Properties", href: "/projects-in-dubai" },
    { label: "Developers", href: "/dubai/developers" },
    { label: "Insights", href: "/dubai/insights" },
    { label: "Contact", href: "/dubai/contact" },
    { label: "India", href: "/" },
  ];

  // Smooth scroll function
  const handleSmoothScroll = (e, href) => {
    // Only handle hash links, let regular links work normally
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const headerHeight = 80; // Account for fixed header
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "glass-effect shadow-luxury py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="container flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo with Emirates Dropdown */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <a href="/united-arab-emirates" className="flex items-center space-x-2 sm:space-x-3">
            <img 
              src={LOGO}
              alt="100acress" 
              className="h-10 sm:h-14 md:h-16 w-auto object-contain"
            />
          </a>
          
          {/* Emirates Dropdown */}
          <div className="relative emirates-dropdown hidden sm:block">
            <button
              onClick={() => setIsEmiratesDropdownOpen(!isEmiratesDropdownOpen)}
              className="flex items-center space-x-1 text-xs text-gold uppercase tracking-widest border-l border-gold pl-2 sm:pl-3 hover:text-gold/80 transition-colors"
            >
              <span className="hidden md:inline">{selectedEmirate}</span>
              <span className="md:hidden">{selectedEmirate.substring(0, 3)}</span>
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
        <nav className="hidden lg:flex items-center space-x-4 xl:space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className={cn(
                "transition-colors duration-200 text-xs xl:text-sm uppercase tracking-wider font-medium cursor-pointer",
                link.label === 'India'
                  ? "gradient-gold text-black px-3 py-1 rounded-full hover:shadow-gold"
                  : "text-white hover:text-gold"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
          {/* Currency Toggle - Visual Icons */}
          <div className="flex items-center gap-0.5 px-1.5 xl:px-2 py-1 rounded-full glass-effect border border-white/20">
            <button
              onClick={() => setCurrency("INR")}
              className={cn(
                "p-1 xl:p-1.5 rounded-full transition-all duration-300",
                currency === "INR" 
                  ? "bg-gold text-black scale-110" 
                  : "text-white/60 hover:text-gold hover:bg-white/10"
              )}
              title="Indian Rupee"
            >
              <span className="text-sm xl:text-base font-bold">₹</span>
            </button>
            <button
              onClick={() => setCurrency("AED")}
              className={cn(
                "p-1 xl:p-1.5 rounded-full transition-all duration-300",
                currency === "AED" 
                  ? "bg-gold text-black scale-110" 
                  : "text-white/60 hover:text-gold hover:bg-white/10"
              )}
              title="UAE Dirham"
            >
              <span className="text-xs xl:text-sm font-bold">د.إ</span>
            </button>
            <button
              onClick={() => setCurrency("USD")}
              className={cn(
                "p-1 xl:p-1.5 rounded-full transition-all duration-300",
                currency === "USD" 
                  ? "bg-gold text-black scale-110" 
                  : "text-white/60 hover:text-gold hover:bg-white/10"
              )}
              title="US Dollar"
            >
              <span className="text-sm xl:text-base font-bold">$</span>
            </button>
          </div>
          
          <a href="tel:+919811750740">
            <Button size="sm" className="gradient-gold text-black hover:shadow-gold text-xs xl:text-base font-semibold px-3 xl:px-4 py-2">
              <Phone className="h-4 w-4 xl:h-5 xl:w-5 mr-1 xl:mr-2" />
              <span className="hidden xl:inline">+91 9811 750 740</span>
              <span className="xl:hidden">Call</span>
            </Button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white p-2 hover:text-gold transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          ) : (
            <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass-effect mt-4 border-t border-white/10 animate-fade-in">
          <nav className="container py-4 space-y-3 px-4 sm:px-6">
            {/* Emirates Dropdown Mobile */}
            <div className="sm:hidden pb-3 border-b border-white/10">
              <label className="block text-xs text-muted-foreground mb-2">Select Emirate</label>
              <select
                value={selectedEmirate}
                onChange={(e) => setSelectedEmirate(e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-gold/50"
              >
                {emirates.map((emirate) => (
                  <option key={emirate.name} value={emirate.name} className="bg-black">
                    {emirate.label}
                  </option>
                ))}
              </select>
            </div>
            
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "block transition-colors py-2 text-sm sm:text-base",
                  link.label === 'India'
                    ? "gradient-gold text-black rounded-lg px-3"
                    : "text-white hover:text-gold"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 space-y-3 border-t border-white/10">
              {/* Currency Toggle Mobile - Visual Icons */}
              <div className="flex items-center justify-center gap-2 p-3 rounded-lg glass-effect border border-white/20">
                <button
                  onClick={() => setCurrency("INR")}
                  className={cn(
                    "flex-1 p-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2",
                    currency === "INR" 
                      ? "bg-gold text-black font-bold" 
                      : "text-white/60 hover:text-gold hover:bg-white/10"
                  )}
                >
                  <span className="text-xl font-bold">₹</span>
                  <span className="text-xs">INR</span>
                </button>
                <button
                  onClick={() => setCurrency("AED")}
                  className={cn(
                    "flex-1 p-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2",
                    currency === "AED" 
                      ? "bg-gold text-black font-bold" 
                      : "text-white/60 hover:text-gold hover:bg-white/10"
                  )}
                >
                  <span className="text-lg font-bold">د.إ</span>
                  <span className="text-xs">AED</span>
                </button>
                <button
                  onClick={() => setCurrency("USD")}
                  className={cn(
                    "flex-1 p-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2",
                    currency === "USD" 
                      ? "bg-gold text-black font-bold" 
                      : "text-white/60 hover:text-gold hover:bg-white/10"
                  )}
                >
                  <span className="text-xl font-bold">$</span>
                  <span className="text-xs">USD</span>
                </button>
              </div>
              
              <a href="tel:+919811750740" className="w-full">
                <Button className="w-full gradient-gold text-black text-lg font-semibold">
                  <Phone className="h-5 w-5 mr-2" />
                  +91 9811 750 740
                </Button>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
