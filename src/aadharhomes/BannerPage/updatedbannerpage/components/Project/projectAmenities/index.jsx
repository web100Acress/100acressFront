import React, { useState, useEffect } from 'react';
import AmenitiesSectionDesktop from './AmenitiesSection.desktop';
import AmenitiesSectionMobile from './AmenitiesSection.mobile';

const AmenitiesSection = (props) => {
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
    return <AmenitiesSectionMobile {...props} />;
  }

  return <AmenitiesSectionDesktop {...props} />;
};

export default AmenitiesSection;

// Also export individual components for direct use if needed
export { AmenitiesSectionDesktop, AmenitiesSectionMobile };
