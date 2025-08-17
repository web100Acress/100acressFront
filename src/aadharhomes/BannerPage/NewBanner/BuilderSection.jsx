import React from 'react';
import '../../../styles/newbanner/builder.css';

const BuilderSection = ({ builderName, builderdescription }) => {
  return (
    <div className="nb-builder-section">
      <div className="nb-builder-container">
        <div className="nb-section-header nb-builder-header">
          <div className="nb-section-lines">
            <div className="nb-section-line"></div>
            <span className="nb-section-subtitle">Builder</span>
            <div className="nb-section-line"></div>
          </div>
          <h4 className="nb-builder-title">About {builderName}</h4>
        </div>
        <div className="nb-builder-card">
          <div className="nb-builder-prose">
            <div dangerouslySetInnerHTML={{ __html: builderdescription }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderSection;
