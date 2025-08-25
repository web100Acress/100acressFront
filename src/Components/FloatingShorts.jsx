import React, { useEffect, useState } from "react";
import { getApiBase } from "../config/apiBase";

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
  const [activeVideoId, setActiveVideoId] = useState("ouBwbuoqnU8");

  useEffect(() => {
    const update = () => setWindowWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);

    let cancelled = false;
    let channel;

    const fetchId = async () => {
      try {
        const res = await fetch(`${getApiBase()}/settings/shorts-video-id`);
        if (!res.ok) return;
        const data = await res.json();
        const value = data?.value;
        if (!cancelled && value && value !== activeVideoId) {
          setActiveVideoId(value);
        }
      } catch (_) {
        // ignore
      }
    };

    // Initial fetch and polling
    fetchId();
    const interval = setInterval(fetchId, 5000); // 5s

    // Also refresh when tab gains focus or becomes visible
    const onFocus = () => fetchId();
    const onVisibility = () => { if (document.visibilityState === 'visible') fetchId(); };
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVisibility);

    // Instant updates within same browser using BroadcastChannel
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      channel = new BroadcastChannel('shorts-settings');
      channel.onmessage = (ev) => {
        if (!ev?.data) return;
        const { type, value } = ev.data;
        if (type === 'shorts-update') {
          if (value !== undefined) setActiveVideoId(value || "");
        }
      };
    }

    return () => {
      cancelled = true;
      window.removeEventListener("resize", update);
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVisibility);
      clearInterval(interval);
      if (channel) {
        try { channel.close(); } catch (_) {}
      }
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
    // On mobile/tablet place on left, desktop on right
    right: isMobile || isTablet ? "auto" : 8,
    left: isMobile || isTablet ? 8 : "auto",
    width: isMobile || isTablet ? 36 : 32,
    height: isMobile || isTablet ? 36 : 32,
    borderRadius: 18,
    border: "none",
    background: "rgba(0,0,0,0.55)",
    color: "#fff",
    fontSize: isMobile || isTablet ? 22 : 20,
    lineHeight: isMobile || isTablet ? "36px" : "32px",
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
