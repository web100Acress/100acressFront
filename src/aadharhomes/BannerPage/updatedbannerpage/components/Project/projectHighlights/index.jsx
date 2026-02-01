import React, { useState, useEffect } from 'react';
import HighlightsSectionDesktop from './HighlightsSection.desktop';
import HighlightsSectionMobile from './HighlightsSection.mobile';

const HighlightsSection = (props) => {
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
    return <HighlightsSectionMobile {...props} />;
  }

  return <HighlightsSectionDesktop {...props} />;
};

export default HighlightsSection;

// Also export individual components for direct use if needed
export { HighlightsSectionDesktop, HighlightsSectionMobile };
