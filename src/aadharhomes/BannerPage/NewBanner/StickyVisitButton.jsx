import React from 'react';
import '../../../styles/newbanner/sticky.css';

const StickyVisitButton = ({ onClick }) => {
  return (
    <div className="nb-sticky-visit">
      <button className="nb-sticky-visit-btn" onClick={onClick} style={{ boxShadow: '0 -2px 16px 0 rgba(212, 175, 55, 0.25)' }}>
        <svg xmlns="http://www.w3.org/2000/svg" className="nb-sticky-visit-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <rect x="3" y="4" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        Schedule Site Visit
      </button>
    </div>
  );
};

export default StickyVisitButton;
