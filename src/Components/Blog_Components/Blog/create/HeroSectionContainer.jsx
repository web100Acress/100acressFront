import React from 'react';
import HeroSection from './desktop/HeroSection';
import HeroSectionMobile from './mobile/HeroSectionMobile';

const HeroSectionContainer = ({ blog, blogLink, FALLBACK_IMG }) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024; // lg breakpoint
      setIsMobile(mobile);
      console.log('Screen width:', window.innerWidth, 'Is mobile:', mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  console.log('Rendering HeroSection, isMobile:', isMobile);

  if (isMobile) {
    console.log('Using Mobile HeroSection');
    return <HeroSectionMobile blog={blog} blogLink={blogLink} FALLBACK_IMG={FALLBACK_IMG} />;
  }

  console.log('Using Desktop HeroSection');
  return <HeroSection blog={blog} blogLink={blogLink} FALLBACK_IMG={FALLBACK_IMG} />;
};

export default HeroSectionContainer;
