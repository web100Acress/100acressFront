import React, { useState, useEffect } from 'react';
import RelatedProjectsDesktop from './RelatedProjects.desktop';
import RelatedProjectsMobile from './RelatedProjects.mobile';

const RelatedProjects = (props) => {
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
    return <RelatedProjectsMobile {...props} />;
  }

  return <RelatedProjectsDesktop {...props} />;
};

export default RelatedProjects;

// Also export individual components for direct use if needed
export { RelatedProjectsDesktop, RelatedProjectsMobile };
