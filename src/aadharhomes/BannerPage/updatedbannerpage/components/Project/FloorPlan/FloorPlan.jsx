import React, { useState, useRef, useEffect } from 'react';
import MobileFloorPlan from './mobileFloorPlan';
import DesktopFloorPlan from './desktopFloorPlan';

const FloorPlan = ({ floorPlans = [], bhkDetails = [], onShowCallback = () => {}, projectName = '' }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile width
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
    return <MobileFloorPlan 
      floorPlans={floorPlans}
      bhkDetails={bhkDetails}
      onShowCallback={onShowCallback}
      projectName={projectName}
    />;
  }

  return <DesktopFloorPlan 
    floorPlans={floorPlans}
    bhkDetails={bhkDetails}
    onShowCallback={onShowCallback}
    projectName={projectName}
  />;
};

export default FloorPlan;
