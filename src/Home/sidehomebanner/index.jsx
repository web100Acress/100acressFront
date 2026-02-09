import React, { useEffect, useState } from "react";
import DynamicSideBannerMobile from "./DynamicSideBanner.mobile";
import DynamicSideBannerDesktop from "./DynamicSideBanner.desktop";

/*
  DynamicSideBanner - Responsive Component
  - Automatically renders mobile or desktop version based on screen size
  - Handles responsive switching between mobile and desktop layouts
*/
const DynamicSideBanner = () => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Render appropriate component based on screen size
  if (isMobile) {
    return <DynamicSideBannerMobile />;
  } else {
    return <DynamicSideBannerDesktop />;
  }
};

export default DynamicSideBanner;
export { default as DynamicSideBannerMobile } from './DynamicSideBanner.mobile';
export { default as DynamicSideBannerDesktop } from './DynamicSideBanner.desktop';
