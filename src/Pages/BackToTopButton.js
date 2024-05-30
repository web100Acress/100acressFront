import React, { useState, useEffect } from "react";
import { GoMoveToTop } from "react-icons/go";
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
        <button onClick={scrollToTop} style={styles.button}>
          {/* ↑ Back to Top */}
          <img
            className="rounded-full shadow-2xl bg-red-300"
            src="../../Images/original-8096d806c5d10d8eaa5c3e575a457e80.gif"
            style={{ width: "40px", height: "40px" }}
          />
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
    // padding: '10px 20px',
    fontSize: "18px",
    // backgroundColor: '#C04952',
    color: "#fff",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)",
  },
};

export default BackToTopButton;
