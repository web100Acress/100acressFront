import React, { useState, useEffect } from 'react';
import GalleryDesktop from './Gallery.desktop';
import GalleryMobile from './Gallery.mobile';

const Gallery = (props) => {
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
    return <GalleryMobile {...props} />;
  }

  return <GalleryDesktop {...props} />;
};

export default Gallery;

// Also export individual components for direct use if needed
export { GalleryDesktop, GalleryMobile };
