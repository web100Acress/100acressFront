import { useRef, useState, useEffect } from "react";
  import { motion, AnimatePresence } from "framer-motion";

  const PostPropertyButton = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [clickEffect, setClickEffect] = useState(false);
    const divRef = useRef(null);
    const [dimensions, setDimensions] = useState({
      width: 0,
      height: 0,
      top: 0,
      left: 0,
    });

    useEffect(() => {
      if (!divRef.current) return;
      const { width, height, top, left } = divRef.current.getBoundingClientRect();
      setDimensions({ width, height, top, left });
    }, []);

    const handleClick = (e) => {
      if (!isAuthenticated) {
        e.preventDefault();
        setShowAuthModal(true);
        setClickEffect(true);
        setTimeout(() => setClickEffect(false), 600);
      }
    };

    const toggleAuth = () => setIsAuthenticated(!isAuthenticated);

    return (
      <div className="aman">
        <div className="space-y-1">

          {/* Enhanced Post Property Button */}
          <div ref={divRef} className="container">
            <motion.div
              className="button-wrapper"
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                className="enhanced-button"
                onClick={handleClick}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {/* Background Effects */}
                <div className="button-bg"></div>
                <div className="gradient-overlay"></div>
                
                {/* Animated Border */}
                <div className="animated-border"></div>
                
                {/* Hover Glow */}
                <motion.div
                  className="hover-glow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Click Ripple Effect */}
                <AnimatePresence>
                  {clickEffect && (
                    <motion.div
                      className="click-ripple"
                      initial={{ scale: 0, opacity: 0.8 }}
                      animate={{ scale: 4, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  )}
                </AnimatePresence>
                
                {/* Button Content */}
                <div className="button-content" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexDirection: 'row' }}>
                  <motion.div
                    className="icon-container"
                    animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="icon">
                      <path
                        d="M12 2L2 7L12 12L22 7L12 2Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 17L12 22L22 17"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 12L12 17L22 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                  
                  <span className="button-text" style={{ whiteSpace: 'nowrap' }}>Post Property</span>
                  
                  <motion.div
                    className="free-badge"
                    animate={isHovered ? { scale: 1.1, y: -2 } : { scale: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    FREE
                    <div className="free-badge-glow"></div>
                  </motion.div>
                </div>
                
                {/* Floating Particles */}
                <div className="particles">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="particle"
                      style={{
                        left: `${10 + i * 15}%`,
                        animationDelay: `${i * 0.2}s`,
                      }}
                      animate={isHovered ? { y: [-10, -20, -10] } : { y: 0 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  ))}
                </div>
              </button>
            </motion.div>

            {/* Enhanced SVG Border */}
            <motion.svg
              className="svg-border-enhanced"
              width={dimensions.width + 40}
              height={dimensions.height + 40}
              viewBox={`0 0 ${dimensions.width + 40} ${dimensions.height + 40}`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff6b6b" />
                  <stop offset="25%" stopColor="#4ecdc4" />
                  <stop offset="50%" stopColor="#45b7d1" />
                  <stop offset="75%" stopColor="#96ceb4" />
                  <stop offset="100%" stopColor="#ff6b6b" />
                </linearGradient>
                
                <filter id="neonGlow" filterUnits="userSpaceOnUse">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                  <feColorMatrix
                    in="blur"
                    type="matrix"
                    values="1 0 0 0 0  0 0.8 0.8 0 0  0 0.4 1 0 0  0 0 0 1 0"
                    result="glow"
                  />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <motion.rect
                x="20"
                y="20"
                width={dimensions.width}
                height={dimensions.height}
                rx="12"
                ry="12"
                stroke="url(#borderGradient)"
                strokeWidth="2"
                fill="none"
                filter="url(#neonGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.svg>

            {/* Auth Modal */}
            {/*  */}
          </div>

        </div>

        <style jsx>{`
         
           .container {
            display: inline-flex;
            position: relative;
            align-items: center;
            justify-content: center;
            margin-right: -60px;
              margin-top: -45px;
            
            }
            }

            .button-wrapper {
              position: relative;
            perspective: 1000px;
          }

          .enhanced-button {
            position: relative;
            padding: 10px 8px;
            background: transparent;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            overflow: hidden;
            z-index: 2;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            font-weight: 600;
            font-size: 14px;
            color: white;
            min-width: 160px;
            height: 48px;
          }

          .button-bg {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 10px;
            z-index: -4;
          }

          .gradient-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.1) 100%);
            border-radius: 12px;
            z-index: -3;
          }

          .animated-border {
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: conic-gradient(from 0deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ff6b6b);
            border-radius: 14px;
            z-index: -5;
            animation: spin 3s linear infinite;
          }

          .hover-glow {
            position: absolute;
            top: -10px;
            left: -10px;
            right: -10px;
            bottom: -10px;
            background: radial-gradient(circle, rgba(102, 126, 234, 0.4) 0%, transparent 70%);
            border-radius: 20px;
            z-index: -2;
            filter: blur(15px);
          }

          .click-ripple {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: -1;
          }

          .button-content {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            position: relative;
            z-index: 1;
          }

          .icon-container {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .icon {
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
          }

          .button-text {
            font-size: 16px;
            font-weight: 600;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
            letter-spacing: 0.5px;
          }

          .free-badge {
            position: relative;
            background: linear-gradient(135deg, #ffd700, #ffed4e);
            color: #1a1a1a;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            box-shadow: 0 4px 12px rgba(255, 215, 0, 0.4);
            border: 1px solid rgba(255,255,255,0.3);
          }

          .free-badge-glow {
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg, #ffd700, #ffed4e);
            border-radius: 22px;
            z-index: -1;
            filter: blur(8px);
            opacity: 0.6;
          }

          .particles {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            z-index: -1;
          }

          .particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, #4ecdc4, transparent);
            border-radius: 50%;
            top: 50%;
            animation: float 3s ease-in-out infinite;
          }

          .svg-border-enhanced {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: -6;
          }

          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
          }

          .auth-modal {
            background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 20px;
            padding: 32px;
            width: 400px;
            color: white;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
          }

          .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
          }

          .modal-header h2 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
          }

          .close-btn {
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.2s;
          }

          .close-btn:hover {
            background: rgba(255,255,255,0.1);
          }

          .modal-content p {
            margin-bottom: 24px;
            color: rgba(255,255,255,0.8);
          }

          .modal-buttons {
            display: flex;
            gap: 12px;
          }

          .login-btn, .signup-btn {
            flex: 1;
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
          }

          .login-btn {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
          }

          .signup-btn {
            background: transparent;
            color: white;
            border: 1px solid rgba(255,255,255,0.3);
          }

          .login-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
          }

          .signup-btn:hover {
            background: rgba(255,255,255,0.1);
          }

          .secondary-button-container {
            display: flex;
            justify-content: center;
          }

          .secondary-button {
            position: relative;
            padding: 14px 28px;
            background: transparent;
            border: 2px solid rgba(255,255,255,0.2);
            border-radius: 50px;
            cursor: pointer;
            overflow: hidden;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            font-weight: 500;
            font-size: 15px;
            color: white;
            transition: all 0.3s ease;
          }

          .secondary-button:hover {
            border-color: rgba(255,255,255,0.4);
            box-shadow: 0 8px 32px rgba(255,255,255,0.1);
          }

          .secondary-bg {
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
            transition: left 0.6s ease;
          }

          .secondary-button:hover .secondary-bg {
            left: 100%;
          }

          .secondary-content {
            display: flex;
            align-items: center;
            gap: 8px;
            position: relative;
            z-index: 1;
          }

          .arrow-icon {
            opacity: 0.8;
          }

          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px) scale(0.8); opacity: 0.3; }
            50% { transform: translateY(-10px) scale(1); opacity: 0.8; }
          }
            
        `}</style>
      </div>
    );
  };

  export default PostPropertyButton;

          
      `}</style>
    </div>
  );
};

export default PostPropertyButton;
          z-index: 1;
        }

        .arrow-icon {
          opacity: 0.8;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(0.8); opacity: 0.3; }
          50% { transform: translateY(-10px) scale(1); opacity: 0.8; }
        }
          
      `}</style>
    </div>
  );
};

export default PostPropertyButton;