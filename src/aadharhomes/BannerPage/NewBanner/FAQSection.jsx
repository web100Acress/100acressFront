import React from 'react';
import { Collapse } from 'antd';
import '../../../styles/newbanner/faq.css';

const FAQSection = ({ title, items }) => {
  return (
    <div className="nb-faq-section">
      <div className="nb-faq-container">
        <div className="nb-section-header nb-faq-header">
          <div className="nb-section-lines">
            <div className="nb-section-line"></div>
            <span className="nb-section-subtitle">F.A.Q</span>
            <div className="nb-section-line"></div>
          </div>
          <h4 className="nb-faq-title">{title}</h4>
        </div>
        <div className='nb-faq-card'>
          <Collapse items={items} />
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
