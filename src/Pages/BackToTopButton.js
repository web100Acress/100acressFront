
import React, { useState, useEffect } from "react";

const BackToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {showButton && (
        <button
          onClick={scrollToTop}
          style={styles.button}
          className="bg-red-600 text-white p-3 w-9 h-9 flex items-center justify-center opacity-100 z-50 animate-bounceUpDown"
        >
          <span style={{ transform: 'rotate(-45deg)' }}>
            <i className="fa-solid fa-chevron-up"></i>
          </span>
        </button>
      )}
      <style jsx>{`
        @layer utilities {
          @keyframes bounceUpDown {
            0%, 100% {
              transform: translateY(0) rotate(45deg);
            }
            50% {
              transform: translateY(-10px) rotate(45deg);
            }
          }

          .animate-bounceUpDown {
            animation: bounceUpDown 1s infinite;
          }
        }
      `}</style>
    </>
  );
};

const styles = {
  button: {
    position: "fixed",
    bottom: "50px",
    right: "50px",
    fontSize: "18px",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)",
    transform: "rotate(45deg)", // Ensure initial rotation is applied
  },
};

export default BackToTopButton;