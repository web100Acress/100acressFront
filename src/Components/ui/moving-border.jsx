import React from "react";

// Reusable moving-border Button (transform-based animation for maximum compatibility)
// Usage: <Button borderRadius="1rem" className="extra-classes">Label</Button>
export function Button({ children, borderRadius = "1rem", className = "", bgColor = "#ffffff", ringColor = "#ef4444", ...props }) {
  return (
    <div className="mb-outer" style={{ borderRadius, "--ring-color": ringColor }}>
      {/* actual button */}
      <button className={`mb-inner ${className}`} style={{ borderRadius: `calc(${borderRadius} - 3px)`, background: bgColor }} {...props}>
        {children}
      </button>
      {/* cutout layer to hide the middle (more robust than CSS masks) */}
      <span className="mb-cut" aria-hidden="true" style={{ background: bgColor, borderRadius: `calc(${borderRadius} - 3px)` }} />
      <style>{`
        .mb-outer {
          position: relative;
          display: inline-block;
          padding: 3px; /* ring thickness */
          isolation: isolate;
          overflow: hidden; /* ensure rotating gradient is clipped */
          /* 3D drop shadow around the outer ring */
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.12)) drop-shadow(0 6px 16px rgba(0,0,0,0.08));
        }
        /* rotating ring using masked ::before so only the border shows */
        .mb-outer::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: conic-gradient(
            from 0deg,
            rgba(239,68,68,0.0) 0deg,
            var(--ring-color) 30deg,
            rgba(239,68,68,0.0) 60deg,
            var(--ring-color) 90deg,
            rgba(239,68,68,0.0) 120deg,
            var(--ring-color) 150deg,
            rgba(239,68,68,0.0) 180deg,
            var(--ring-color) 210deg,
            rgba(239,68,68,0.0) 240deg,
            var(--ring-color) 270deg,
            rgba(239,68,68,0.0) 300deg,
            var(--ring-color) 330deg,
            rgba(239,68,68,0.0) 360deg
          );
          animation: mb-spin 3s linear infinite !important;
          pointer-events: none;
          z-index: 0;
        }
        /* Inner cutout that hides the gradient center (browser-safe) */
        .mb-cut {
          position: absolute;
          inset: 3px; /* must match outer padding */
          /* background is provided inline to support custom bgColor */
          z-index: 0; /* keep behind the button */
          pointer-events: none;
        }
        .mb-inner {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem 1rem;
          /* background is provided inline to support custom bgColor */
          color: #111;
          border: 0;
          font-weight: 600;
          line-height: 1;
          cursor: pointer;
          /* 3D bevel look: subtle inner highlight + bottom shadow */
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.65), /* top inner highlight */
            inset 0 -1px 0 rgba(0,0,0,0.06),     /* bottom inner edge */
            0 2px 0 rgba(0,0,0,0.05),            /* base edge */
            0 6px 12px rgba(0,0,0,0.08);         /* soft shadow */
          transition: transform 120ms ease, box-shadow 120ms ease;
        }
        /* glossy highlight stripe */
        .mb-inner::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(180deg, rgba(255,255,255,0.55), rgba(255,255,255,0) 45%);
          pointer-events: none;
          mix-blend-mode: screen;
        }
        .mb-inner:hover {
          transform: translateY(-1px);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.7),
            inset 0 -1px 0 rgba(0,0,0,0.07),
            0 3px 0 rgba(0,0,0,0.05),
            0 10px 18px rgba(0,0,0,0.10);
        }
        .mb-inner:active {
          transform: translateY(0);
          box-shadow:
            inset 0 2px 0 rgba(0,0,0,0.06),
            inset 0 -1px 0 rgba(255,255,255,0.4),
            0 1px 0 rgba(0,0,0,0.04),
            0 4px 10px rgba(0,0,0,0.08);
        }
        @keyframes mb-spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
