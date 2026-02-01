import React, { useState, useEffect } from 'react';
import ProjectHeroDesktop from './ProjectHero.desktop';
import ProjectHeroMobile from './ProjectHero.mobile';

const ProjectHero = (props) => {
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
    return <ProjectHeroMobile {...props} />;
  }

  return <ProjectHeroDesktop {...props} />;
};

export default ProjectHero;

// Also export individual components for direct use if needed
export { ProjectHeroDesktop, ProjectHeroMobile };
