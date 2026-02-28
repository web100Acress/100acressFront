import { useState, useEffect } from "react";
import { Button } from "../../../../Components/ui/button";
import { Menu, X, Phone, ChevronDown, Globe } from "lucide-react";
import { cn } from "../../../../lib/utils";

// Logo URL
const LOGO = "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/white-logo.webp";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCountriesDropdownOpen, setIsCountriesDropdownOpen] = useState(false);

  const countries = [
    { name: "UAE", label: "UAE", path: "/global/projects-in-dubai-uae/" },
    { name: "UK", label: "United Kingdom", path: "/global/projects-in-london-uk/" },
    { name: "USA", label: "United States", path: "/country/usa/" },
    { name: "Sri Lanka", label: "Sri Lanka", path: "/global/projects-in-srilanka/" },
    { name: "India", label: "India", path: "/country/india/" },
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
      if (isCountriesDropdownOpen && !event.target.closest('.countries-dropdown')) {
        setIsCountriesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCountriesDropdownOpen]);

  const navLinks = [
    { name: "India Properties", href: "#properties" },
    { name: "Developers", href: "#developers" },
    { name: "Lifestyle", href: "#lifestyle" },
    { name: "Investment", href: "#investment" },
    { name: "Contact", href: "#contact" },
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
          ? "glass-effect shadow-luxury py-3"
          : "bg-transparent py-4"
      )}
    >
      <div className="container flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo with Countries Dropdown */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <a href="/country/india/" className="flex items-center space-x-2 sm:space-x-3">
            <img 
              src={LOGO}
              alt="100acress" 
              className="h-10 sm:h-14 md:h-16 w-auto object-contain"
            />
            <span className="hidden sm:block text-white font-bold text-lg sm:text-xl">100acress India</span>
          </a>
          {/* Countries Dropdown */}
          <div className="relative countries-dropdown hidden sm:block">
            <button
              onClick={() => setIsCountriesDropdownOpen(!isCountriesDropdownOpen)}
              className="flex items-center gap-2 text-white hover:text-gold transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden md:inline">India</span>
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform duration-200",
                isCountriesDropdownOpen && "rotate-180"
              )} />
            </button>

            {/* Dropdown Menu */}
            {isCountriesDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {countries.map((country) => (
                  <a
                    key={country.name}
                    href={country.path}
                    className={cn(
                      country.name === "India" 
                        ? "text-gold bg-gray-50 font-semibold" 
                        : "text-gray-700 hover:bg-gray-100 hover:text-gold",
                      "block px-4 py-2 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg"
                    )}
                    onClick={() => setIsCountriesDropdownOpen(false)}
                  >
                    {country.label}
                  </a>
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
              onClick={(e) => {
                if (link.isWhatsApp) {
                  e.preventDefault();
                  window.open("https://wa.me/919811750740?text=Hi! I'm interested in premium properties. Can you help me?", "_blank");
                } else {
                  handleSmoothScroll(e, link.href);
                }
              }}
              className={cn(
                "transition-colors duration-200 text-xs xl:text-sm uppercase tracking-wider font-medium cursor-pointer",
                link.name === 'India Properties'
                  ? "gradient-gold text-black px-3 py-1 rounded-full hover:shadow-gold"
                  : "text-white hover:text-gold"
              )}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
          <Button 
            variant="outline" 
            size="sm"
            className="border-gold text-gold hover:bg-gold hover:text-black transition-all duration-300"
            onClick={() => window.open("https://wa.me/919811750740?text=Hi! I'm interested in India properties. Can you help me?", "_blank")}
          >
            <Phone className="w-4 h-4 mr-2" />
            <span className="hidden xl:inline">Contact Us</span>
          </Button>
          <Button 
            size="sm"
            className="gradient-gold text-black hover:shadow-gold transition-all duration-300"
            onClick={() => window.open("tel:+919811750740", "_blank")}
          >
            <Phone className="w-4 h-4 mr-2" />
            <span className="hidden xl:inline">+91 9811 750 740</span>
            <span className="xl:hidden">Call</span>
          </Button>
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
            {/* Countries Dropdown Mobile */}
            <div className="sm:hidden pb-3 border-b border-white/10">
              <label className="block text-xs text-muted-foreground mb-2">Select Country</label>
              <select
                onChange={(e) => {
                  window.location.href = e.target.value;
                }}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-gold/50"
              >
                {countries.map((country) => (
                  <option key={country.name} value={country.path} className="bg-black">
                    {country.label}
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
                onClick={() => {
                  if (link.isWhatsApp) {
                    window.open("https://wa.me/919811750740?text=Hi! I'm interested in premium properties. Can you help me?", "_blank");
                  }
                  setIsMobileMenuOpen(false);
                }}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3">
              <a href="tel:+919811750740" className="w-full">
                <Button className="w-full gradient-gold text-black text-lg font-semibold">
                  <Phone className="h-5 w-5 mr-2" />
                  +91 9811 750 740
                </Button>
              </a>
              <Button 
                className="w-full mt-2 border-gold text-gold hover:bg-gold hover:text-black transition-all duration-300"
                variant="outline"
                onClick={() => window.open("https://wa.me/919811750740?text=Hi! I'm interested in India properties. Can you help me?", "_blank")}
              >
                <Phone className="h-5 w-5 mr-2" />
                WhatsApp
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
