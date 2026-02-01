import React, { useEffect, useRef, useState } from "react";
import { getApiBase } from "../../../../../config/apiBase";

/*
  FloatingShorts - Mobile Version
  - Optimized for mobile devices with touch-friendly controls
  - Compact design for mobile screens
  - Smart positioning to avoid mobile navigation
*/
const FloatingShortsMobile = ({ videoId = "" }) => {
  const [visible, setVisible] = useState(true);
  const [mini, setMini] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 375
  );
  const [windowHeight, setWindowHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 667
  );
  const [activeVideoId, setActiveVideoId] = useState("ouBwbuoqnU8");

  // Position state for mobile - start bottom-right
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragPosRef = useRef({ x: 0, y: 0 });
  const rafIdRef = useRef(null);
  const [dragState, setDragState] = useState(null);
  const dragOffsetRef = useRef(null);

  useEffect(() => {
    const update = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
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

    fetchId();
    const interval = setInterval(fetchId, 5000);

    const onFocus = () => fetchId();
    const onVisibility = () => { if (document.visibilityState === 'visible') fetchId(); };
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVisibility);

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

  useEffect(() => {
    if (videoId) setActiveVideoId(videoId);
  }, [videoId]);

  // Mobile-specific dimensions - very compact for mobile
  const dims = mini
    ? { w: 60, h: 107 }  // Very small mini size for mobile
    : { w: 100, h: 178 }; // Compact full size for mobile

  // Initialize position for mobile (bottom-right with safe area)
  useEffect(() => {
    const margin = 12;
    const safeAreaBottom = 100; // Account for mobile navigation and controls
    const x = Math.max(0, windowWidth - dims.w - margin);
    const y = Math.max(0, windowHeight - dims.h - safeAreaBottom);
    setPos((p) => ({ x: p.x === 0 && p.y === 0 ? x : Math.min(p.x, windowWidth - dims.w), y: p.y === 0 ? y : Math.min(p.y, windowHeight - dims.h) }));
    dragPosRef.current = { x, y };
  }, [windowWidth, windowHeight, dims.w, dims.h]);

  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

  const getPoint = (e) => {
    if (e.touches && e.touches[0]) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    return { x: e.clientX, y: e.clientY };
  };

  const startDrag = (e) => {
    const pt = getPoint(e);
    const offsets = { offsetX: pt.x - pos.x, offsetY: pt.y - pos.y };
    dragOffsetRef.current = offsets;
    setDragState(offsets);
    window.addEventListener("mousemove", onDrag, { passive: false });
    window.addEventListener("mouseup", endDrag);
    window.addEventListener("touchmove", onDrag, { passive: false });
    window.addEventListener("touchend", endDrag);
  };

  const onDrag = (e) => {
    e.preventDefault();
    if (!dragOffsetRef.current) return;
    const pt = getPoint(e);
    const { offsetX, offsetY } = dragOffsetRef.current;
    const x = clamp(pt.x - offsetX, 0, windowWidth - dims.w);
    const y = clamp(pt.y - offsetY, 0, windowHeight - dims.h);
    dragPosRef.current = { x, y };
    if (rafIdRef.current == null) {
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        setPos(dragPosRef.current);
      });
    }
  };

  const endDrag = () => {
    setDragState(null);
    dragOffsetRef.current = null;
    window.removeEventListener("mousemove", onDrag);
    window.removeEventListener("mouseup", endDrag);
    window.removeEventListener("touchmove", onDrag);
    window.removeEventListener("touchend", endDrag);
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  };

  if (!visible) return null;

  const embedSrc = `https://www.youtube.com/embed/${activeVideoId}?autoplay=1&mute=1&loop=1&playlist=${activeVideoId}&controls=0&modestbranding=1&playsinline=1&rel=0`;

  const containerStyle = {
    position: "fixed",
    left: 0,
    top: 0,
    width: dims.w,
    height: dims.h,
    zIndex: 9999,
    borderRadius: mini ? 6 : 10,
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
    backdropFilter: "blur(1px)",
    cursor: dragState ? "grabbing" : "grab",
    transition: dragState ? "none" : "width 200ms ease, height 200ms ease, transform 30ms linear",
    transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
    background: "#000",
    userSelect: "none",
    willChange: "transform",
    WebkitUserDrag: "none",
    touchAction: "none",
    border: mini ? "1px solid rgba(255,255,255,0.1)" : "none",
  };

  const btnBase = {
    position: "absolute",
    top: 4,
    width: mini ? 16 : 20,
    height: mini ? 16 : 20,
    borderRadius: mini ? 8 : 10,
    border: "none",
    background: "rgba(220, 38, 38, 0.9)",
    color: "#fff",
    fontSize: mini ? 10 : 12,
    lineHeight: mini ? "16px" : "20px",
    cursor: "pointer",
    zIndex: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
  };

  const closeBtnStyle = { ...btnBase, right: 4 };
  const miniBtnStyle = { ...btnBase, right: mini ? 24 : 28 };

  const frameWrapStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: mini ? "none" : "auto",
  };

  const iframeStyle = {
    width: "100%",
    height: "100%",
    border: "none",
    borderRadius: 0,
  };

  const dragHandleStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: mini ? 10 : 15,
    cursor: dragState ? "grabbing" : "grab",
    zIndex: 2,
    background: "transparent",
  };

  return (
    <div style={containerStyle}>
      {/* Drag handle for mobile - larger touch area */}
      <div style={dragHandleStyle} onMouseDown={startDrag} onTouchStart={startDrag} />
      
      {/* Control buttons - only show when not minimized */}
      {!mini && (
        <>
          <button 
            style={miniBtnStyle} 
            onClick={() => setMini(!mini)} 
            aria-label="Minimize"
            title="Minimize"
          >
            −
          </button>
          <button 
            style={closeBtnStyle} 
            onClick={() => setVisible(false)} 
            aria-label="Close"
            title="Close"
          >
            ×
          </button>
        </>
      )}

      {/* Mini mode restore button */}
      {mini && (
        <button 
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 24,
              height: 24,
              borderRadius: 12,
              border: "none",
              background: "rgba(0,0,0,0.8)",
              color: "#fff",
              fontSize: 12,
              cursor: "pointer",
              zIndex: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
            }}
            onClick={() => setMini(false)}
            aria-label="Expand"
            title="Expand"
          >
            □
          </button>
      )}

      {/* Video */}
      <div style={frameWrapStyle} onDragStart={(e) => e.preventDefault()} draggable={false}>
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

export default FloatingShortsMobile;
