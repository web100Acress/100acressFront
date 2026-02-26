import { useState, useCallback, useEffect } from 'react';

export interface OverlayState {
  isOpen: boolean;
  type: 'filters' | 'search' | 'sort' | null;
}

export function useOverlay(initialState: OverlayState = { isOpen: false, type: null }) {
  const [overlay, setOverlay] = useState<OverlayState>(initialState);

  const openOverlay = useCallback((type: 'filters' | 'search' | 'sort') => {
    setOverlay({ isOpen: true, type });
    // Prevent body scroll when overlay is open
    document.body.style.overflow = 'hidden';
  }, []);

  const closeOverlay = useCallback(() => {
    setOverlay({ isOpen: false, type: null });
    // Restore body scroll
    document.body.style.overflow = '';
  }, []);

  const toggleOverlay = useCallback((type: 'filters' | 'search' | 'sort') => {
    if (overlay.isOpen && overlay.type === type) {
      closeOverlay();
    } else {
      openOverlay(type);
    }
  }, [overlay.isOpen, overlay.type, openOverlay, closeOverlay]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return {
    overlay,
    openOverlay,
    closeOverlay,
    toggleOverlay,
  };
}

// Mobile-specific overlay hook
export function useMobileOverlay() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const openBottomSheet = useCallback(() => {
    setIsBottomSheetOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeBottomSheet = useCallback(() => {
    setIsBottomSheetOpen(false);
    document.body.style.overflow = '';
  }, []);

  return {
    isBottomSheetOpen,
    openBottomSheet,
    closeBottomSheet,
  };
}

// Keyboard navigation support
export function useOverlayKeyboard(onClose: () => void) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);
}
