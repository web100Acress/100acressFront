import React, { useEffect, useState } from "react";
import { getShortsVideoId } from "../config/siteSettings";

/*
  FloatingShorts
  - Shows a floating YouTube Shorts player fixed on the right; supports mobile and desktop
  - Autoplays muted, loops, minimal UI, with a close (X) button
  - Usage: <FloatingShorts videoId="XJbjxK0pQx0" />
*/
const FloatingShorts = ({ videoId = "" }) => {
  const [visible, setVisible] = useState(true);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  const [activeVideoId, setActiveVideoId] = useState(() => getShortsVideoId("ouBwbuoqnU8"));

  useEffect(() => {
    const update = () => setWindowWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    // Listen to settings changes from other tabs/pages
    const onStorage = (e) => {
      if (e.key === 'homeShortsVideoId') {
        setActiveVideoId(getShortsVideoId(activeVideoId));
      }
    };
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  // If prop is provided, it takes precedence
  useEffect(() => {
    if (videoId) setActiveVideoId(videoId);
  }, [videoId]);

  if (!visible) return null;

  const embedSrc = `https://www.youtube.com/embed/${activeVideoId}?autoplay=1&mute=1&loop=1&playlist=${activeVideoId}&controls=0&modestbranding=1&playsinline=1&rel=0`;

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;
  const containerDynamicStyle = {
    position: "fixed",
    right: isMobile ? 8 : 16,
    bottom: isMobile ? 80 : 96, // keep clear of sticky CTAs
    width: isMobile ? 180 : isTablet ? 220 : 300,
    height: isMobile ? 320 : isTablet ? 392 : 534, // approx 9:16
    zIndex: 9999,
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
    backdropFilter: "blur(2px)",
  };

  const closeBtnStyle = {
    position: "absolute",
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    border: "none",
    background: "rgba(0,0,0,0.55)",
    color: "#fff",
    fontSize: 20,
    lineHeight: "32px",
    cursor: "pointer",
    zIndex: 2,
  };

  const frameWrapStyle = {
    width: "100%",
    height: "100%",
    background: "#000",
  };

  const iframeStyle = {
    width: "100%",
    height: "100%",
    border: 0,
    display: "block",
  };

  return (
    <div style={containerDynamicStyle}>
      <button aria-label="Close video" onClick={() => setVisible(false)} style={closeBtnStyle}>
        ×
      </button>
      <div style={frameWrapStyle}>
        <iframe
          title="YouTube Shorts"
          src={embedSrc}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          style={iframeStyle}
        />
      </div>
    </div>
  );
};

export default FloatingShorts;
