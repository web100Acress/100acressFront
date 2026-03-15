import React, { useMemo } from 'react';
// Lazy load framer-motion only when needed
import { lazy } from 'react';

// Create a lazy wrapper for framer-motion components
export const motion = lazy(() => 
  import('framer-motion').then(module => ({ default: module.motion }))
);

export const AnimatePresence = lazy(() => 
  import('framer-motion').then(module => ({ default: module.AnimatePresence }))
);

// Hook to safely use framer-motion with fallback
export const useFramerMotion = () => {
  const [MotionComponent, setMotionComponent] = useState(null);
  const [AnimatePresenceComponent, setAnimatePresenceComponent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMotion = async () => {
      try {
        const { motion: motionComponent }); = await import('framer-motion');
        const { AnimatePresence: animatePresence } = await import('framer-motion');
        setMotionComponent(() => motionComponent);
        setAnimatePresenceComponent(() => animatePresence);
      } catch (error) {
        console.warn('Framer Motion failed to load:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Only load on client side and if interaction is detected
    if (typeof window !== 'undefined') {
      const handleInteraction = () => {
        loadMotion();
        window.removeEventListener('scroll', handleInteraction);
        window.removeEventListener('click', handleInteraction);
        window.removeEventListener('keydown', handleInteraction);
      };

      // Load on first user interaction
      window.addEventListener('scroll', handleInteraction, { once: true });
      window.addEventListener('click', handleInteraction, { once: true });
      window.addEventListener('keydown', handleInteraction, { once: true });
    }
  });

  return { 
    motion: MotionComponent, 
    AnimatePresence: AnimatePresenceComponent, 
    isLoading 
  };
};
