// ConfettiAllCorners.jsx
import React, { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";

const ConfettiAllCorners = () => {
  const [visible, setVisible] = useState(true);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Small delay to ensure canvas is ready
    const initDelay = setTimeout(() => {
    const myConfetti = confetti.create(canvasRef.current, {
      resize: true,
      useWorker: true,
    });

    const commonColors = [
      "#FF6B35", "#FFD23F", "#06FFA5", "#4ECDC4", "#FF6B9D",
      "#FF1744", "#00BCD4", "#FF9800", "#9C27B0", "#4CAF50",
      "#E91E63", "#2196F3", "#FFC107", "#795548", "#607D8B",
      "#F44336", "#3F51B5", "#009688", "#FF5722", "#673AB7"
    ];

    // Top-left burst
    myConfetti({
      particleCount: 350, // Increased particles
      angle: 60, // Slightly adjusted angle
      spread: 120, // Slightly adjusted spread
      origin: { x: 0, y: 0 },
      colors: commonColors,
      scalar: 2,
      startVelocity: 45, // Slightly increased velocity
      gravity: 0.9,
      ticks: 100,
    });

    // Top-right burst
    myConfetti({
      particleCount: 350, // Increased particles
      angle: 120, // Slightly adjusted angle
      spread: 120, // Slightly adjusted spread
      origin: { x: 1, y: 0 },
      colors: commonColors,
      scalar: 2,
      startVelocity: 45, // Slightly increased velocity
      gravity: 0.9,
      ticks: 100,
    });

    // Bottom-left burst
    myConfetti({
      particleCount: 350,
      angle: 120, // Shooting upwards and right
      spread: 120,
      origin: { x: 0, y: 1 },
      colors: commonColors,
      scalar: 2,
      startVelocity: 45,
      gravity: 0.9,
      ticks: 100,
    });

    // Bottom-right burst
    myConfetti({
      particleCount: 350,
      angle: 60, // Shooting upwards and left
      spread: 120,
      origin: { x: 1, y: 1 },
      colors: commonColors,
      scalar: 2,
      startVelocity: 45,
      gravity: 0.9,
      ticks: 100,
    });

    // Center top burst - massive explosion
    const centerBurstDelay = 300 + Math.random() * 200; // Random delay between 300ms and 500ms
    const timer = setTimeout(() => {
      myConfetti({
        particleCount: 1000, // Significantly increased particles
        angle: 90,
        spread: 360,
        origin: { x: 0.5, y: 0 },
        colors: commonColors,
        scalar: 2.5, // Slightly larger particles
        startVelocity: 60, // Increased velocity for a more powerful burst
        gravity: 1.1, // Slightly more gravity for faster fall
                 ticks: 100, // Further reduced duration for faster cleanup
        drift: 0,
      });
    }, centerBurstDelay);

    // Clean up - further reduced duration
    const hideDelay = 2000 + Math.random() * 300; // Random hide delay between 2s and 2.3s
    const hideTimer = setTimeout(() => setVisible(false), hideDelay);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
      clearTimeout(initDelay);
    };
    }, 100); // Small delay to ensure canvas is ready
  }, []);

  if (!visible) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none"
      style={{ top: 0, left: 0, width: '100vw', height: '100vh' }} // Ensure canvas covers full screen
    />
  );
};

export default ConfettiAllCorners;