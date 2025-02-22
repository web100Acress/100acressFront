import { position } from "@chakra-ui/react";
import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const Gallery = ({ images, OpenGallery, setOpenGallery }) => {

  const galleryImages = images.map((image) => ({
    original: image.url,
    thumbnail: image.thumbnail,
  }));

  const closeGallery = () => {
    //console.log("Close button clicked");
    setOpenGallery(false);
    //console.log("Gallery closed"); // Debugging log
  };

  return (
    <div>

      {/* Full Image Gallery */}
      {OpenGallery && (
        <div style={galleryOverlayStyle}>
          <div style={galleryContainerStyle}>
            <ImageGallery
              items={galleryImages}
              showThumbnails={true}
            />
            <button
                style={closeButtonStyle}
                onClick={(e) => {
                    e.stopPropagation();
                    closeGallery();
                }}>
                    ✖
                </button>
          </div>
        </div>
      )}
    </div>
  );
};


const galleryOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom:0,
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const galleryContainerStyle = {
    position:"relative",
    width: "90%",
    maxWidth: "95vw",
    height: "85vh",
    bottom:"1rem"
};

const closeButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    border: "none",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    fontSize: "20px",
    fontWeight: "bold",
    cursor: "pointer",
  };
  

export default Gallery;
