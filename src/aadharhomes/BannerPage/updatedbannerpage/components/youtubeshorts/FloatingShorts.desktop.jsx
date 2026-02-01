import React, { useEffect, useRef, useState } from "react";
import { getApiBase } from "../../../../../config/apiBase";

/*
  FloatingShorts - Desktop Version
  - Optimized for desktop devices
  - Larger dimensions and mouse-friendly controls
  - Enhanced positioning for desktop screens
*/
const FloatingShortsDesktop = ({ videoId = "" }) => {
  const [visible, setVisible] = useState(true);
  const [mini, setMini] = useState(false);
  const [moveMode, setMoveMode] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1920
  );
  const [windowHeight, setWindowHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 1080
  );
  const [activeVideoId, setActiveVideoId] = useState("ouBwbuoqnU8");

  // Position state for desktop
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

  // Desktop-specific dimensions
  const dims = mini
    ? { w: 110, h: 195 }  // Mini size for desktop
    : { w: 240, h: 426 }; // Full size for desktop

  // Initialize position for desktop (bottom-right)
  useEffect(() => {
    const margin = 16;
    const x = Math.max(0, windowWidth - dims.w - margin);
    const y = Math.max(0, windowHeight - dims.h - 96);
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
    if (moveMode) setMoveMode(false);
  };

  if (!visible) return null;

  const embedSrc = `https://www.youtube.com/embed/${activeVideoId}?autoplay=1&mute=1&loop=1&playlist=${activeVideoId}&controls=0&modestbranding=1&playsinline=1&rel=0`;

  const containerStyle = {
    position: "fixed",
    left: 0,
    top: 0,
    width: dims.w,
    height: dims.h,
    zIndex: 10001,
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
    WebkitUserDrag: "none",
    touchAction: "none",
  };

  const btnBase = {
    position: "absolute",
    top: 6,
    width: 26,
    height: 26,
    borderRadius: 13,
    border: "none",
    background: "rgba(0,0,0,0.55)",
    color: "#fff",
    fontSize: 15,
    lineHeight: "26px",
    cursor: "pointer",
    zIndex: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const closeBtnStyle = { ...btnBase, right: 6 };
  const miniBtnStyle = { ...btnBase, right: 38 };
  const moveBtnStyle = { ...btnBase, right: 70, background: moveMode ? "rgba(0,0,0,0.75)" : "rgba(0,0,0,0.55)" };

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
    height: moveMode ? "100%" : 40,
    cursor: dragState || moveMode ? "grabbing" : "grab",
    zIndex: moveMode ? 4 : 2,
    background: moveMode ? "rgba(0,0,0,0.1)" : "transparent",
  };

  return (
    <div style={containerStyle}>
      {/* Drag handle for desktop */}
      <div style={dragHandleStyle} onMouseDown={startDrag} onTouchStart={startDrag} />
      
      {/* Control buttons */}
      <button 
        style={moveBtnStyle} 
        onClick={() => setMoveMode(!moveMode)} 
        aria-label="Toggle move mode"
        title={moveMode ? "Exit move mode" : "Enter move mode"}
      >
        ⇄
      </button>
      <button style={miniBtnStyle} onClick={() => setMini(!mini)} aria-label="Minimize">
        {mini ? "□" : "—"}
      </button>
      <button style={closeBtnStyle} onClick={() => setVisible(false)} aria-label="Close">
        ×
      </button>

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

export default FloatingShortsDesktop;
