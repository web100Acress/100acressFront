import React, { useEffect, useState } from "react";
import FloatingShortsMobile from "./FloatingShorts.mobile";
import FloatingShortsDesktop from "./FloatingShorts.desktop";
const FloatingShorts = ({ videoId = "" }) => {
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
    return <FloatingShortsMobile videoId={videoId} />;
  } else {
    return <FloatingShortsDesktop videoId={videoId} />;
  }
};

export default FloatingShorts;
export { default as FloatingShortsMobile } from './FloatingShorts.mobile';
export { default as FloatingShortsDesktop } from './FloatingShorts.desktop';
