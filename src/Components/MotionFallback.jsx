import React, { useMemo } from 'react';

// Fallback component that provides basic CSS transitions
const MotionFallback = ({ 
  children, 
  className = '', 
  whileHover = {}, 
  whileTap = {}, 
  animate = {}, 
  initial = {}, 
  transition = {},
  ...props 
}) => {
  const style = {
    ...props.style,
    transition: 'all 0.3s ease',
    ...(animate.opacity !== undefined && { opacity: animate.opacity }),
    ...(animate.scale !== undefined && { transform: `scale(${animate.scale})` }),
    ...(animate.y !== undefined && { transform: `translateY(${animate.y}px)` }),
    ...(animate.x !== undefined && { transform: `translateX(${animate.x}px)` }),
  };

  const hoverStyle = {
    ...(whileHover.scale && { transform: `scale(${whileHover.scale})` }),
    ...(whileHover.opacity && { opacity: whileHover.opacity }),
  };

  return (
    <div 
      className={className}
      style={style}
      onMouseEnter={(e) => {
        Object.assign(e.target.style, hoverStyle);
      }}
      onMouseLeave={(e) => {
        Object.assign(e.target.style, style);
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default MotionFallback;
