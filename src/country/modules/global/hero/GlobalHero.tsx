import React, { useState, useEffect } from 'react';
import { useCountry } from '../../../providers';
import MobileGlobalHero from './MobileGlobalHero';
import DesktopGlobalHero from './DesktopGlobalHero';

const GlobalHero: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add event listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return <MobileGlobalHero />;
  }

  return <DesktopGlobalHero />;
};

export default GlobalHero;
