import React, { useState, useEffect } from 'react';
import PostProperty from './PostProperty';

const ResponsivePostProperty = () => {
  const [isMobile, setIsMobile] = useState(() => {
    // Initial detection
    return window.innerWidth <= 768;
  });

  useEffect(() => {
    // Handle window resize
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
    };

    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Render the responsive PostProperty component
  return <PostProperty />;
};

export default ResponsivePostProperty;
