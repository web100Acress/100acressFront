import React from 'react';
import { motion } from 'framer-motion';

const MovingBorder = ({ children, className, containerClassName, as: Component = 'button', ...props }) => {
  return (
    <Component
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-lg ${containerClassName || ''}`}
      style={{
        background: 'linear-gradient(90deg, #e53e3e 0%, #f56565 50%, #e53e3e 100%)',
        backgroundSize: '200% 200%',
        padding: '2px',
      }}
    >
      <div
        className={`bg-white dark:bg-slate-900 text-black dark:text-white px-4 py-2 rounded-md ${className || ''}`}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          position: 'relative',
          zIndex: 1,
        }}
        {...props}
      >
        {children}
      </div>
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, #e53e3e 0%, #f56565 50%, #e53e3e 100%)',
          backgroundSize: '200% 200%',
          borderRadius: 'inherit',
          zIndex: -1,
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </Component>
  );
};

export default MovingBorder;
