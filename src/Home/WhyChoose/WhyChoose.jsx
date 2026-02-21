import React, { useState, useEffect } from "react";
import MobileWhyChoose from "./mobileWhyChoose";
import DesktopWhyChoose from "./desktopWhyChoose";

function WhyChoose() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <MobileWhyChoose /> : <DesktopWhyChoose />;
}

export default WhyChoose;
