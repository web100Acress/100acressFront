import { useState, useCallback, useRef, useEffect } from 'react';

export const useCampaignManager = () => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [overlayPosition, setOverlayPosition] = useState({ top: '50%', left: '50%' });
  const hoverTimeoutRef = useRef(null);
  const isHoveringRef = useRef(false);

  // Global click handler to close overlay
  useEffect(() => {
    const handleGlobalClick = (event) => {
      if (isOverlayVisible && !event.target.closest('.campaign-overlay') && !event.target.closest('.insights-button')) {
        setIsOverlayVisible(false);
        isHoveringRef.current = false;
      }
    };

    if (isOverlayVisible) {
      document.addEventListener('click', handleGlobalClick);
      return () => document.removeEventListener('click', handleGlobalClick);
    }
  }, [isOverlayVisible]);

  const showOverlay = useCallback((position = { top: '50%', left: '50%' }) => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    // Show overlay after a short delay for better UX
    hoverTimeoutRef.current = setTimeout(() => {
      if (isHoveringRef.current) {
        // Adjust position to ensure overlay is fully visible
        const adjustedPosition = {
          top: Math.min(position.top, window.innerHeight - 280), // Ensure 280px height fits
          left: Math.max(200, Math.min(position.left, window.innerWidth - 200)) // Keep within bounds for 400px width
        };
        setOverlayPosition(adjustedPosition);
        setIsOverlayVisible(true);
      }
    }, 300); // Slightly longer delay for smoother feel
  }, []);

  const hideOverlay = useCallback(() => {
    isHoveringRef.current = false;
    
    // Clear timeout if it exists
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    // Hide overlay with longer delay for smoother experience
    setTimeout(() => {
      if (!isHoveringRef.current) {
        setIsOverlayVisible(false);
      }
    }, 800); // Longer delay for smooth close
  }, []);

  const handleMouseEnter = useCallback((event) => {
    isHoveringRef.current = true;
    
    // Calculate position relative to viewport
    const rect = event.currentTarget.getBoundingClientRect();
    const position = {
      top: Math.min(rect.bottom + 10, window.innerHeight - 300),
      left: rect.left + rect.width / 2
    };
    
    showOverlay(position);
  }, [showOverlay]);

  const handleMouseLeave = useCallback(() => {
    hideOverlay();
  }, [hideOverlay]);

  const handleOverlayMouseEnter = useCallback(() => {
    isHoveringRef.current = true;
  }, []);

  const handleOverlayMouseLeave = useCallback(() => {
    // Don't immediately hide on mouse leave - let user come back
    setTimeout(() => {
      if (!isHoveringRef.current) {
        setIsOverlayVisible(false);
      }
    }, 1000); // Give more time to come back to overlay
  }, []);

  const closeOverlay = useCallback(() => {
    setIsOverlayVisible(false);
    isHoveringRef.current = false;
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  }, []);

  // Cleanup on unmount
  const cleanup = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  }, []);

  return {
    isOverlayVisible,
    overlayPosition,
    handleMouseEnter,
    handleMouseLeave,
    handleOverlayMouseEnter,
    handleOverlayMouseLeave,
    closeOverlay,
    cleanup
  };
};
