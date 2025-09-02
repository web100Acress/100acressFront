import React, { useEffect, useRef, useState } from "react";
import { getApiBase } from "../config/apiBase";

/*
  FloatingShorts
  - Shows a floating YouTube Shorts player fixed on the screen; supports mobile and desktop
  - Autoplays muted, loops, minimal UI, with close (X) and minimize (—) buttons
  - Draggable via mouse or touch; position is clamped to viewport
  - Usage: <FloatingShorts videoId="XJbjxK0pQx0" />
*/
const FloatingShorts = ({ videoId = "" }) => {
  const [visible, setVisible] = useState(true);
  const [mini, setMini] = useState(false);
  const [moveMode, setMoveMode] = useState(false); // full-card drag toggle
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  const [windowHeight, setWindowHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 768
  );
  const [activeVideoId, setActiveVideoId] = useState("ouBwbuoqnU8");

  // Position state (top-left). We'll render using transform for smoother drag.
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragPosRef = useRef({ x: 0, y: 0 });
  const rafIdRef = useRef(null);
  const [dragState, setDragState] = useState(null); // {offsetX, offsetY}

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

  // Compute responsive size (smaller than before) and tiny minimized size
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const dims = (() => {
    if (mini) {
      // very small thumb (approx 9:16)
      return isMobile
        ? { w: 84, h: 150 }
        : isTablet
        ? { w: 96, h: 171 }
        : { w: 110, h: 195 };
    }
    // default smaller than earlier
    return isMobile
      ? { w: 150, h: 266 }
      : isTablet
      ? { w: 180, h: 320 }
      : { w: 240, h: 426 };
  })();

  // Initialize to bottom-right with a margin when size or window changes
  useEffect(() => {
    const margin = isMobile ? 8 : 16;
    const x = Math.max(0, windowWidth - dims.w - margin);
    const y = Math.max(0, windowHeight - dims.h - (isMobile ? 80 : 96));
    setPos((p) => ({ x: p.x === 0 && p.y === 0 ? x : Math.min(p.x, windowWidth - dims.w), y: p.y === 0 ? y : Math.min(p.y, windowHeight - dims.h) }));
    dragPosRef.current = { x, y };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowWidth, windowHeight, dims.w, dims.h, isMobile]);

  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

  const getPoint = (e) => {
    if (e.touches && e.touches[0]) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    return { x: e.clientX, y: e.clientY };
  };

  const startDrag = (e) => {
    const pt = getPoint(e);
    setDragState({ offsetX: pt.x - pos.x, offsetY: pt.y - pos.y });
    window.addEventListener("mousemove", onDrag, { passive: false });
    window.addEventListener("mouseup", endDrag);
    window.addEventListener("touchmove", onDrag, { passive: false });
    window.addEventListener("touchend", endDrag);
  };

  // rAF-batched drag handler
  const onDrag = (e) => {
    e.preventDefault();
    if (!dragState) return;
    const pt = getPoint(e);
    const x = clamp(pt.x - dragState.offsetX, 0, windowWidth - dims.w);
    const y = clamp(pt.y - dragState.offsetY, 0, windowHeight - dims.h);
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
    window.removeEventListener("mousemove", onDrag);
    window.removeEventListener("mouseup", endDrag);
    window.removeEventListener("touchmove", onDrag);
    window.removeEventListener("touchend", endDrag);
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    // Auto exit move mode on drop for convenience
    if (moveMode) setMoveMode(false);
  };

  if (!visible) return null;

  const embedSrc = `https://www.youtube.com/embed/${activeVideoId}?autoplay=1&mute=1&loop=1&playlist=${activeVideoId}&controls=0&modestbranding=1&playsinline=1&rel=0`;

  const containerDynamicStyle = {
    position: "fixed",
    left: 0,
    top: 0,
    width: dims.w,
    height: dims.h,
    zIndex: 9999,
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
    backdropFilter: "blur(2px)",
    cursor: dragState || moveMode ? "grabbing" : "grab",
    transition: dragState ? "none" : "width 150ms ease, height 150ms ease, transform 40ms linear",
    transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
    background: "#000",
    userSelect: "none",
    willChange: "transform",
  };

  const btnBase = {
    position: "absolute",
    top: 6,
    width: isMobile || isTablet ? 28 : 26,
    height: isMobile || isTablet ? 28 : 26,
    borderRadius: 15,
    border: "none",
    background: "rgba(0,0,0,0.55)",
    color: "#fff",
    fontSize: isMobile || isTablet ? 16 : 15,
    lineHeight: isMobile || isTablet ? "28px" : "26px",
    cursor: "pointer",
    zIndex: 3,
  };

  const closeBtnStyle = { ...btnBase, right: 6 };
  const miniBtnStyle = { ...btnBase, right: (isMobile || isTablet) ? 40 : 38 };
  const moveBtnStyle = { ...btnBase, right: (isMobile || isTablet) ? 74 : 70, background: moveMode ? "rgba(0,0,0,0.75)" : "rgba(0,0,0,0.55)" };

  // Drag handle and full-card overlay when move mode is active
  const handleStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 28,
    zIndex: 2,
    background: "linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.05))",
    cursor: dragState ? "grabbing" : "grab",
    WebkitTapHighlightColor: "transparent",
  };

  const overlayStyle = {
    position: "absolute",
    inset: 0,
    zIndex: 2,
    background: "transparent",
    cursor: dragState ? "grabbing" : "grab",
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
    // Disable clicks when tiny or when moving to allow dragging over the whole card
    pointerEvents: mini || moveMode || !!dragState ? "none" : "auto",
  };

  return (
    <div style={containerDynamicStyle}>
      {/* Drag handle (always available) */}
      <div style={handleStyle} onMouseDown={startDrag} onTouchStart={startDrag} />

      {/* Move toggle (full-card drag) */}
      <button aria-label="Move video" title="Move" onClick={(e) => { e.stopPropagation(); setMoveMode((m) => !m); }} style={moveBtnStyle}>
        ⇔
      </button>

      {/* Controls */}
      <button aria-label="Minimize video" onClick={(e) => { e.stopPropagation(); setMini((m) => !m); }} style={miniBtnStyle}>
        {mini ? "▢" : "–"}
      </button>
      <button aria-label="Close video" onClick={(e) => { e.stopPropagation(); setVisible(false); }} style={closeBtnStyle}>
        ×
      </button>

      {/* Full-card overlay when moving */}
      {moveMode && (
        <div style={overlayStyle} onMouseDown={startDrag} onTouchStart={startDrag} />
      )}

      {/* Video */}
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
