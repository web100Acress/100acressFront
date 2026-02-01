import React, { useState, useEffect } from 'react';
import AboutBuilderDesktop from './AboutBuilder.desktop';
import AboutBuilderMobile from './AboutBuilder.mobile';

const AboutBuilder = (props) => {
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
    return <AboutBuilderMobile {...props} />;
  }

  return <AboutBuilderDesktop {...props} />;
};

export default AboutBuilder;

// Also export individual components for direct use if needed
export { AboutBuilderDesktop, AboutBuilderMobile };
