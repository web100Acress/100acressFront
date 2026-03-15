import React, { useMemo } from 'react';
export const Copyright = () => {
  return (
    <div className="py-6 text-center text-sm text-gray-400 border-t border-white/10 bg-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Copyright */}
          <div className="text-center lg:text-left">
            <p>© 2026 100acress Dubai. All rights reserved.</p>
          </div>
          
          {/* Right Column - Policy Links */}
          <div className="flex justify-center lg:justify-end items-center gap-4">
            <a 
              href="/privacy-policy" 
              className="hover:text-gold transition-colors cursor-pointer relative z-10 block"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                window.open('/privacy-policy', '_blank', 'noopener,noreferrer');
              }}
            >
              Privacy Policy
            </a>
            <span className="text-gray-600">|</span>
            <a 
              href="/terms-of-service" 
              className="hover:text-gold transition-colors cursor-pointer relative z-10 block"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                window.open('/terms-of-service', '_blank', 'noopener,noreferrer');
              }}
            >
              Terms of Service
            </a>
            <span className="text-gray-600">|</span>
            <a 
              href="/cookie-policy" 
              className="hover:text-gold transition-colors cursor-pointer relative z-10 block"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                window.open('/cookie-policy', '_blank', 'noopener,noreferrer');
              }}
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
