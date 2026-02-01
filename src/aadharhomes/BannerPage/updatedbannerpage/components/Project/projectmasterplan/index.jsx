import React, { useState, useEffect } from 'react';
import MasterPlanDesktop from './MasterPlan.desktop';
import MasterPlanMobile from './MasterPlan.mobile';

const MasterPlan = (props) => {
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
    return <MasterPlanMobile {...props} />;
  }

  return <MasterPlanDesktop {...props} />;
};

export default MasterPlan;

// Also export individual components for direct use if needed
export { MasterPlanDesktop, MasterPlanMobile };
