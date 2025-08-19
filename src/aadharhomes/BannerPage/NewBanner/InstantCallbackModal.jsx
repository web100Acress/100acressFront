import React from 'react';
import '../../../styles/newbanner/instant.css';

const InstantCallbackModal = ({
  open,
  sideDetails,
  handleChangeSide,
  debouncedSideSubmit,
  isLoading2,
  sideButtonText,
  handleClose
}) => {
  if (!open) return null;
  return (
    <div className="nb-instant-overlay" onClick={handleClose}>
      <div className="nb-instant-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={handleClose} className="nb-instant-close" aria-label="Close">
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="nb-instant-body">
          <div className="nb-instant-header">
            <div className="nb-instant-icon">
              <i className="fas fa-calendar-alt"></i>
            </div>
            <h2 className="nb-instant-title">Schedule Site Visit</h2>
            <p className="nb-instant-subtitle">Get in touch with us for a personalized site visit</p>
          </div>

          <form onSubmit={debouncedSideSubmit} className="nb-instant-form">
            <div>
              <input
                type="text"
                name="name"
                value={sideDetails.name}
                onChange={handleChangeSide}
                placeholder="Your Name*"
                required
                className="nb-instant-input"
              />
            </div>

            <div>
              <input
                type="tel"
                name="mobile"
                value={sideDetails.mobile}
                onChange={handleChangeSide}
                placeholder="Mobile Number*"
                required
                className="nb-instant-input"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={sideDetails.email}
                onChange={handleChangeSide}
                placeholder="Email Address"
                className="nb-instant-input"
              />
            </div>

            <button type="submit" disabled={isLoading2} className="nb-instant-submit">
              {sideButtonText}
            </button>
          </form>

          <p className="nb-instant-privacy">
            Your information will be kept strictly confidential and will not be shared.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InstantCallbackModal;
