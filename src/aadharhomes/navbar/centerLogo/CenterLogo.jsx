import React from "react";
import { Link } from "react-router-dom";

export default function CenterLogo({ colorChange, isSearchOpen, centerOnCompact = false, isHome }) {
  return (
    <div
      style={{
        order: 2,
        justifyContent: "center",
        flex: "initial",
        position: "relative",
        zIndex: 10000,
        display: window.innerWidth < 768 && isSearchOpen ? 'none' : 'flex',
        pointerEvents: "auto",
        flexShrink: 0,
        alignItems: "center",
        height: "100%"
      }}
      className="center-logo-container"
    >
      <Link to="/" style={{ textDecoration: 'none' }}>
        <img
          src={
            isHome 
              ? "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/logowhite.webp.webp"
              : (colorChange 
                ? "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/logowhite.webp.webp"
                : "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/red.100acresslogo.webp")
          }
          alt="100acress logo"
          style={{
            height: window.innerWidth >= 768 ? '60px' : '45px',
            minHeight: window.innerWidth >= 768 ? '60px' : '45px',
            maxHeight: window.innerWidth >= 768 ? '60px' : '45px',
            width: window.innerWidth >= 768 ? '225.38px' : '169.04px',
            minWidth: window.innerWidth >= 768 ? '225.38px' : '169.04px',
            maxWidth: window.innerWidth >= 768 ? '225.38px' : '169.04px',
            objectFit: "contain",
            draggable: false,
            transition: "opacity 200ms ease",
            flexShrink: 0
          }}
          className="center-logo-image"
        />
      </Link> 
      
    </div>
  );
}