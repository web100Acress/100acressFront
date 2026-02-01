import React, { useState, useEffect } from 'react';
import PricingSectionDesktop from './PricingSection.desktop';
import PricingSectionMobile from './PricingSection.mobile';

const PricingSection = (props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's md breakpoint
    };

    // Initial check
    checkMobile();

    // Add event listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Render mobile version on mobile devices, desktop version otherwise
  if (isMobile) {
    return <PricingSectionMobile {...props} />;
  }

  return <PricingSectionDesktop {...props} />;
};

export default PricingSection;

// Also export individual components for direct use if needed
export { PricingSectionDesktop, PricingSectionMobile };
