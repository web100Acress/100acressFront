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
        <button onClick={scrollToTop} style={styles.button} className="bg-red-600 border-white text-white px-3 py-3  flex items-center rounded-full animate-bounce">
          <i className="fa-solid fa-arrow-up  transform rotate-360" />
        </button>
      )}
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
    borderRadius: "50px",
    cursor: "pointer",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)",
  },
};

export default BackToTopButton;
