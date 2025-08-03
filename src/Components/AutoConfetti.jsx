import React, { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";

const AutoConfetti = () => {
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
        particleCount: 350,
        angle: 60,
        spread: 120,
        origin: { x: 0, y: 0 },
        colors: commonColors,
        scalar: 2,
        startVelocity: 45,
        gravity: 0.9,
        ticks: 250,
      });

      // Top-right burst
      myConfetti({
        particleCount: 350,
        angle: 120,
        spread: 120,
        origin: { x: 1, y: 0 },
        colors: commonColors,
        scalar: 2,
        startVelocity: 45,
        gravity: 0.9,
        ticks: 250,
      });

      // Bottom-left burst
      myConfetti({
        particleCount: 350,
        angle: 120,
        spread: 120,
        origin: { x: 0, y: 1 },
        colors: commonColors,
        scalar: 2,
        startVelocity: 45,
        gravity: 0.9,
        ticks: 250,
      });

      // Bottom-right burst
      myConfetti({
        particleCount: 350,
        angle: 60,
        spread: 120,
        origin: { x: 1, y: 1 },
        colors: commonColors,
        scalar: 2,
        startVelocity: 45,
        gravity: 0.9,
        ticks: 250,
      });

      // Center top burst - massive explosion
      const centerBurstDelay = 800 + Math.random() * 400;
      const timer = setTimeout(() => {
        myConfetti({
          particleCount: 1000,
          angle: 90,
          spread: 360,
          origin: { x: 0.5, y: 0 },
          colors: commonColors,
          scalar: 2.5,
          startVelocity: 60,
          gravity: 1.1,
          ticks: 400,
          drift: 0,
        });
      }, centerBurstDelay);

      // Clean up
      const hideDelay = 5000 + Math.random() * 1000;
      const hideTimer = setTimeout(() => setVisible(false), hideDelay);

      return () => {
        clearTimeout(timer);
        clearTimeout(hideTimer);
        clearTimeout(initDelay);
      };
    }, 100);

    return () => clearTimeout(initDelay);
  }, []);

  if (!visible) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none"
      style={{ top: 0, left: 0, width: '100vw', height: '100vh' }}
    />
  );
};

export default AutoConfetti; 