import React, { useState, useEffect } from 'react';
import FAQSectionDesktop from './FAQSection.desktop';
import FAQSectionMobile from './FAQSection.mobile';

const FAQSection = (props) => {
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
    return <FAQSectionMobile {...props} />;
  }

  return <FAQSectionDesktop {...props} />;
};

export default FAQSection;

// Also export individual components for direct use if needed
export { FAQSectionDesktop, FAQSectionMobile };
