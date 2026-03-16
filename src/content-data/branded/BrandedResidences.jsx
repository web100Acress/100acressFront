import React from 'react';
import { Helmet } from 'react-helmet-async';
import './BrandedResidences.css';

const BrandedResidences = () => {
  return (
    <>
      <Helmet>
        <title>Branded Residences in India | Luxury Homes by Global Brands</title>
        <meta name="description" content="Explore branded residences in prime locations, like Gurugram and Noida, where developers collaborate with global brands, creating luxury homes with premium amenities. Discover premium branded residences offering luxury living with world-class amenities and exclusive lifestyle features." />
        <meta name="keywords" content="branded residences, luxury homes, branded apartments, premium residences, luxury living gurgaon" />
        <link rel="canonical" href="https://www.100acress.com/branded-residences/" />
      </Helmet>

      <div className="branded-residences-container">
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Branded Residences in India</h1>
            <p className="hero-subtitle">Luxury Homes by Global Brands</p>
          </div>
        </div>

        <div className="content-section">
          <div className="content-wrapper">
            <h2 className="section-title">Branded Residences</h2>
            
            <div className="description-content">
              <p className="description-paragraph">
                Branded residences represent a new chapter in modern luxury living. These homes are created when experienced real estate developers collaborate with globally recognized design and lifestyle partners. The result is a residence where architecture, interiors, and everyday comfort are thoughtfully planned together.
              </p>
              
              <p className="description-paragraph">
                From carefully selected materials to elegant layouts, every detail reflects a refined standard of living. Compared to conventional housing, branded homes are aimed at design consistency, high-quality construction, and well curated lifestyle experience.
              </p>
              
              <p className="description-paragraph">
                Premium services, caring services and serene living conditions are usually taken by the residents to enable them to live in comfort and privacy. These residences are being developed in Gurugram and Noida, cities known for their modern skyline and growing demand for premium residential living.
              </p>
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🏗️</div>
                <h3 className="feature-title">Global Partnerships</h3>
                <p className="feature-description">Collaboration with world-renowned design and lifestyle brands</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">🎨</div>
                <h3 className="feature-title">Design Excellence</h3>
                <p className="feature-description">Thoughtfully planned architecture and elegant interiors</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">⭐</div>
                <h3 className="feature-title">Premium Living</h3>
                <p className="feature-description">High-quality construction and refined lifestyle experience</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">🏙️</div>
                <h3 className="feature-title">Prime Locations</h3>
                <p className="feature-description">Developed in Gurugram and Noida's modern skyline</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandedResidences;
