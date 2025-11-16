import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  const footerLinks = {
    properties: [
      { label: "Luxury Apartments", href: "#" },
      { label: "Premium Villas", href: "#" },
      { label: "Exclusive Penthouses", href: "#" },
      { label: "Beachfront Properties", href: "#" },
    ],
    locations: [
      { label: "Downtown Dubai", href: "#" },
      { label: "Dubai Marina", href: "#" },
      { label: "Palm Jumeirah", href: "#" },
      { label: "Business Bay", href: "#" },
    ],
    resources: [
      { label: "Investment Guide", href: "#" },
      { label: "Market Reports", href: "#" },
      { label: "Property Laws", href: "#" },
      { label: "Buyer's Guide", href: "#" },
    ],
    company: [
      { label: "About Us", href: "#" },
      { label: "Our Team", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  };

  return (
    <footer className="relative bg-black border-t border-white/10">
      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="text-3xl font-display font-bold">
                <span className="text-white">100</span>
                <span className="text-gold">acress</span>
              </div>
              <span className="text-xs text-gold uppercase tracking-widest border-l border-gold pl-2 ml-2">
                Dubai
              </span>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">
              Your trusted partner for luxury real estate investments in Dubai. Discover premium properties in the world's most dynamic city.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-gold" />
                <a href="tel:+919811750740" className="text-muted-foreground hover:text-gold transition-colors">
                  +91 9811 750 740
                </a>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-gold" />
                <a href="mailto:info@100acress.com" className="text-muted-foreground hover:text-gold transition-colors">
                  info@100acress.com
                </a>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-gold" />
                <span className="text-muted-foreground">Business Bay, Dubai, UAE</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a
                href="https://www.facebook.com/100acress"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-effect border border-white/10 flex items-center justify-center text-white hover:text-gold hover:border-gold/50 transition-all"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/100acress"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-effect border border-white/10 flex items-center justify-center text-white hover:text-gold hover:border-gold/50 transition-all"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com/100acress"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-effect border border-white/10 flex items-center justify-center text-white hover:text-gold hover:border-gold/50 transition-all"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/100acress"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-effect border border-white/10 flex items-center justify-center text-white hover:text-gold hover:border-gold/50 transition-all"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Properties
            </h3>
            <ul className="space-y-3">
              {footerLinks.properties.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Locations
            </h3>
            <ul className="space-y-3">
              {footerLinks.locations.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2025 100acress Dubai. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-gold transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-gold transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-gold transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
