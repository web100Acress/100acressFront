import React, { useEffect, useRef, useState } from 'react';
import '../../../styles/newbanner/HighlightsSection.css';

const HighlightsSection = ({ projectViewDetails, highlight = [], handleShowInstantcallBack }) => {
  // Refs to measure heights
  const imageCardRef = useRef(null);
  const pointsRef = useRef(null);
  const textCardRef = useRef(null);
  const viewMoreRef = useRef(null);

  // State for clamping and modal
  const [isClamped, setIsClamped] = useState(false);
  const [maxPointsHeight, setMaxPointsHeight] = useState(null);
  const [isHighlightsModalOpen, setIsHighlightsModalOpen] = useState(false);
  const [textCardHeight, setTextCardHeight] = useState(null);
  const [viewMoreHeight, setViewMoreHeight] = useState(64);

  // Measure and decide clamp
  useEffect(() => {
    const measure = () => {
      const imgEl = imageCardRef.current;
      const listEl = pointsRef.current;
      const cardEl = textCardRef.current;
      const vmEl = viewMoreRef.current;
      if (!imgEl || !listEl) return;
      const imgH = imgEl.clientHeight || imgEl.offsetHeight || 0;
      const listScrollH = listEl.scrollHeight || 0;

      // Compute available list height inside the text card:
      // image height minus card paddings and a reserve space for the Show More button area
      let padTop = 32, padBottom = 32; // fallback
      let borderTop = 0, borderBottom = 0;
      if (cardEl) {
        const cs = window.getComputedStyle(cardEl);
        padTop = parseInt(cs.paddingTop || '32', 10);
        padBottom = parseInt(cs.paddingBottom || '32', 10);
        borderTop = parseInt(cs.borderTopWidth || '0', 10);
        borderBottom = parseInt(cs.borderBottomWidth || '0', 10);
      }
      const buttonReserve = vmEl ? vmEl.offsetHeight : viewMoreHeight; // actual height for button + gap
      setViewMoreHeight(buttonReserve || 64);
      const allowance = padTop + padBottom + (buttonReserve || 64); // total non-list vertical space

      if (listScrollH > imgH - allowance && imgH > 0) {
        setIsClamped(true);
        setMaxPointsHeight(Math.max(120, imgH - allowance));
      } else {
        setIsClamped(false);
        setMaxPointsHeight(null);
      }

      // Match card height to image height only on desktop layout
      if (typeof window !== 'undefined' && window.innerWidth >= 1024 && imgH > 0) {
        const borderTotal = borderTop + borderBottom;
        setTextCardHeight(Math.max(0, imgH - borderTotal));
      } else {
        setTextCardHeight(null);
      }
    };

    measure();
    window.addEventListener('resize', measure);
    const t = setTimeout(measure, 0);
    return () => {
      window.removeEventListener('resize', measure);
      clearTimeout(t);
    };
  }, [projectViewDetails?.highlightImage?.url, highlight]);

  // Prevent background scroll when modal open
  useEffect(() => {
    if (!isHighlightsModalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev || 'unset';
    };
  }, [isHighlightsModalOpen]);

  const openHighlightsModal = () => setIsHighlightsModalOpen(true);
  const closeHighlightsModal = () => setIsHighlightsModalOpen(false);

  return (
    <div className="nb-highlights-section">
      <div className="nb-highlights-inner">
        <div className="nb-section-header">
          <div className="nb-section-lines" style={{ marginBottom: '16px' }}>
            <div className="nb-section-line"></div>
            <span className="nb-section-subtitle">Highlights</span>
            <div className="nb-section-line"></div>
          </div>
          <h2 className="nb-section-title">
            {projectViewDetails.projectName}
            <div className="nb-section-underline" style={{ marginTop: '12px' }}></div>
          </h2>
        </div>

        <div className="nb-highlights-grid">
          <div className="nb-highlights-left">
            <div className="nb-highlights-image-card" ref={imageCardRef}>
              {projectViewDetails?.highlightImage?.url && (
                <>
                  <img
                    src={projectViewDetails?.highlightImage?.url}
                    alt={`${projectViewDetails.projectName}`}
                    className="nb-highlights-image"
                  />
                  <div className="nb-highlights-overlay-r"></div>
                  <div className="nb-highlights-overlay-t"></div>
                  <div className="nb-highlight-cta-desktop">
                    <button
                      onClick={() => {
                        const url = projectViewDetails?.projectBrochure?.url;
                        if (url) window.open(url, '_blank'); else handleShowInstantcallBack?.();
                      }}
                      className="nb-brochure-btn-alt"
                    >
                      <i className="fas fa-download"></i>
                      <span>Download Brochure</span>
                    </button>
                  </div>
                </>
              )}
            </div>
            <div className="nb-highlight-cta-mobile">
              {/* <button
                onClick={() => {
                  const url = projectViewDetails?.projectBrochure?.url;
                  if (url) window.open(url, '_blank'); else handleShowInstantcallBack?.();
                }}
                className="nb-brochure-btn-mobile"
              >
                <i className="fas fa-download"></i>
                <span>Download Brochure</span>
              </button> */}
            </div>
          </div>

          <div className="nb-highlights-right">
            <div
              ref={textCardRef}
              className={`nb-highlights-text-card ${isClamped ? 'nb-hl-card--clamped' : ''}`}
              style={Object.assign(
                textCardHeight ? { height: `${textCardHeight}px` } : {},
                isClamped ? { ['--nb-hl-vmbh']: `${viewMoreHeight}px`, ['--nb-hl-fade']: `${Math.max(36, Math.min(viewMoreHeight, 64))}px` } : {}
              )}
            >
              <div
                ref={pointsRef}
                className={`nb-highlight-points ${isClamped ? 'nb-highlight-points--clamped' : ''}`}
                style={isClamped && maxPointsHeight ? { ['--nb-hl-maxh']: `${maxPointsHeight}px` } : undefined}
              >
                {Array.isArray(highlight) && highlight.length > 0 &&
                  highlight.map((item, index) => (
                    <div key={index} className="nb-highlight-item">
                      <div className="nb-highlight-dot"></div>
                      <p className="nb-highlight-text">{item.highlight_Point}</p>
                    </div>
                  ))}
              </div>
              {isClamped && (
                <div className="nb-hl-viewmore-wrap" ref={viewMoreRef}>
                  <button className="nb-hl-viewmore-btn" onClick={openHighlightsModal}>
                    Show More
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {isHighlightsModalOpen && (
          <div className="nb-hl-modal-overlay" onClick={closeHighlightsModal}>
            <div className="nb-hl-modal-container" onClick={(e) => e.stopPropagation()}>
              <button className="nb-hl-modal-close" onClick={closeHighlightsModal} aria-label="Close">
                <i className="fas fa-times"></i>
              </button>
              <div className="nb-hl-modal-header">
                <h3 className="nb-hl-modal-title">Project Highlights</h3>
                <p className="nb-hl-modal-sub">All the key features at a glance</p>
              </div>
              <div className="nb-hl-modal-body">
                <div className="nb-highlight-points nb-highlight-points--full">
                  {Array.isArray(highlight) && highlight.length > 0 &&
                    highlight.map((item, index) => (
                      <div key={index} className="nb-highlight-item">
                        <div className="nb-highlight-dot"></div>
                        <p className="nb-highlight-text">{item.highlight_Point}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HighlightsSection;
