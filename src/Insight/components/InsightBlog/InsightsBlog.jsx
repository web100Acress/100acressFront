import React, { useEffect, useState } from 'react';
import DesktopInsightBlog from './desktopinsightblog';
import MobileInsightBlog from './mobileinsightblog';

const InsightsBlog = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return isDesktop ? <DesktopInsightBlog /> : <MobileInsightBlog />;
};

export default InsightsBlog;
