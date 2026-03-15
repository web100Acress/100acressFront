import React, { useMemo } from 'react';

// Fallback component when motion is loading
const MotionFallback = ({ children, className = '', ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

// Lazy load framer-motion
const MotionComponent = React.lazy(() => 
  import('framer-motion').then(module => ({
    default: module.motion
  }))
);

const AnimatePresenceComponent = React.lazy(() => 
  import('framer-motion').then(module => ({
    default: module.AnimatePresence
  }))
);

// Dynamic motion wrapper
export const Motion = React.forwardRef(({ children, as = 'div', className = '', ...props }, ref) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }););

  if (!isClient) {
    // Server-side rendering fallback
    const Component = as;
    return <Component ref={ref} className={className} {...props}>{children}</Component>;
  }

  return (
    <Suspense fallback={<MotionFallback className={className} {...props}>{children}</MotionFallback>}>
      <MotionComponent 
        as={as} 
        className={className} 
        ref={ref}
        {...props}
      >
        {children}
      </MotionComponent>
    </Suspense>
  );
});

Motion.displayName = 'Motion';

// Dynamic AnimatePresence wrapper
export const AnimatePresenceWrapper = ({ children, ...props }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }););

  if (!isClient) {
    return <>{children}</>;
  }

  return (
    <Suspense fallback={<>{children}</>}>
      <AnimatePresenceComponent {...props}>
        {children}
      </AnimatePresenceComponent>
    </Suspense>
  );
};

// Export a hook to get motion components
export const useMotion = () => {
  const [motion, setMotion] = useState(null);
  const [AnimatePresence, setAnimatePresence] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMotion = async () => {
      try {
        const framerMotion = await import('framer-motion');
        setMotion(() => framerMotion.motion);
        setAnimatePresence(() => framerMotion.AnimatePresence);
      }); catch (error) {
        console.warn('Failed to load framer-motion:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Load only when needed (on first user interaction)
    const handleUserInteraction = () => {
      loadMotion();
      document.removeEventListener('scroll', handleUserInteraction);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };

    document.addEventListener('scroll', handleUserInteraction, { once: true });
    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('keydown', handleUserInteraction, { once: true });
  });

  return { motion, AnimatePresence, isLoading };
};
