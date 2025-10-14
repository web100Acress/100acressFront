import React from 'react';
import Slider from 'react-slick';
import '../../../styles/newbanner/FloorPlanSection.css';
import { BackwardIcon, ForwardIcon } from '../../../Assets/icons';

const FloorPlanSection = ({
  projectViewDetails,
  sliderImages = [],
  slideRefs,
  sliderSettings,
  BhK_Details = [],
  openModalfloor,
  isModalOpenFloor,
  closeModalfloor,
  selectedImagefloor,
}) => {
  if (!Array.isArray(sliderImages) || sliderImages.length === 0) return null;
  return (
    <>
      <div className="nb-floor-section">
        <div className="nb-floor-inner">
          <div className="nb-section-header" style={{ marginBottom: '24px' }}>
            <div className="nb-section-lines" style={{ marginBottom: '16px' }}>
              <div className="nb-section-line"></div>
              <span className="nb-section-subtitle">Floor Plan</span>
              <div className="nb-section-line"></div>
            </div>
            <h2 className="nb-section-title">
              {projectViewDetails.projectName}
              <span className="block font-serif" style={{ color: '#B8985A', marginTop: 8 }}>Floor Plans</span>
            </h2>
            <div className="nb-section-underline" style={{ width: 96 }}></div>
          </div>
        </div>
      </div>

      <div className='nb-floor-slider-wrap'>
        <article className="nb-floor-article">
          <div className="nb-floor-slider">
            {Array.isArray(sliderImages) && sliderImages.length > 0 && (
              <>
                <button
                  onClick={() => slideRefs.current?.slickPrev()}
                  className="nb-floor-prev"
                  aria-label="Previous floor plan"
                >
                  <BackwardIcon />
                </button>
                <button
                  onClick={() => slideRefs.current?.slickNext()}
                  className="nb-floor-next"
                  aria-label="Next floor plan"
                >
                  <ForwardIcon />
                </button>
              </>
            )}
            <Slider ref={slideRefs} {...sliderSettings}>
              {Array.isArray(sliderImages) && sliderImages.length > 0 &&
                sliderImages.map((image, index) => (
                  <div key={index} className="nb-floor-slide">
                    <div className="nb-floor-card">
                      <img
                        src={image.url}
                        alt={`${projectViewDetails.projectName} floor plan ${index + 1}`}
                        className="nb-floor-img"
                        onClick={() => openModalfloor(image.url)}
                      />
                      <div className="nb-floor-caption">
                        <h4 className="nb-floor-caption-title">
                          {BhK_Details[index]?.bhk_type || BhK_Details[0]?.bhk_type}
                        </h4>
                        <p className="nb-floor-caption-sub">{BhK_Details[index]?.bhk_Area || BhK_Details[0]?.bhk_Area}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </Slider>
          </div>
        </article>

        {isModalOpenFloor && (
          <div className="nb-floor-modal-overlay">
            <div className="nb-floor-modal-container">
              <button
                onClick={closeModalfloor}
                className="nb-floor-modal-close"
                aria-label="Close floor plan modal"
              >
                ✕
              </button>
              <div className="nb-floor-modal-body">
                <img src={selectedImagefloor} alt="Floor Plan" className="nb-floor-modal-img" />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FloorPlanSection;
