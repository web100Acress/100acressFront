import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MdLocationPin, MdStar, MdArrowForward, MdVerified } from 'react-icons/md';
import Api_Service from '../../Redux/utils/Api_Service';

const EnhancedRecommendedSection = () => {
  const container = useRef();
  const spotlight = useSelector(store => store?.project?.spotlight);
  const { getSpotlight } = Api_Service();

  useEffect(() => {
    getSpotlight();
  }, [getSpotlight]);

  const properties = spotlight?.slice(0, 8) || [];
  const [cards, setCards] = useState(properties);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    if (properties.length > 0) {
      setCards(properties);
      setStartIndex(0);
    }
  }, [spotlight]); // Re-run when spotlight data changes

  // Auto-rotate visible cards every 1.5 seconds (no GSAP)
  useEffect(() => {
    const len = cards?.length || 0;
    if (len < 4) return;
    const interval = setInterval(() => {
      setStartIndex(prev => (prev + 1) % len);
    }, 1500);
    return () => clearInterval(interval);
  }, [cards.length]);

  // No GSAP animations: static rendering only

  const renderCard = (project, type, index) => {
    if (!project) return null;
    return (
      <PropertyCard className={`property-card ${type}-card`} type={type}>
        <img src={project.frontImage.url} alt={project.projectName} className="card-image" loading="lazy" decoding="async" />
        <div className="card-overlay" />
        <div className="card-content">
          <h3>{project.projectName}</h3>
          <p><MdLocationPin /> {project.area}</p>
        </div>
        {type === 'large' && (
          <div className="card-price">₹{project.minPrice} Cr</div>
        )}
      </PropertyCard>
    );
  };

  return (
    <SectionWrapper ref={container}>
      <div className="section-header">
        <h2 className="section-title">
          <span className="highlight-text">Premium</span> Properties
        </h2>
        <p className="section-subtitle">
          A curated selection of the finest properties with exceptional value.
        </p>
      </div>
      {cards.length < 4 ? (
        <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#4a5568' }}>Loading Properties...</p>
      ) : (
        <LayoutWrapper>
          <LeftColumn>
            {renderCard(cards[startIndex % cards.length], 'large', 0)}
          </LeftColumn>
          <RightColumn>
            {renderCard(cards[(startIndex + 1) % cards.length], 'small', 1)}
            {renderCard(cards[(startIndex + 2) % cards.length], 'small', 2)}
            {renderCard(cards[(startIndex + 3) % cards.length], 'small', 3)}
          </RightColumn>
        </LayoutWrapper>
      )}
    </SectionWrapper>
  );

};

const SectionWrapper = styled.section`
  padding: 4rem 1rem;
  background-color: #f0f2f5;
  overflow: hidden;
  .section-header {
    text-align: center;
    margin-bottom: 3rem;
    .section-title {
      font-size: 2.5rem;
      font-weight: 800;
      color: #1a202c;
      .highlight-text {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    .section-subtitle {
      font-size: 1.1rem;
      color: #4a5568;
      max-width: 600px;
      margin: 0.5rem auto 0;
    }
  }
`;

const LayoutWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  height: 600px;

  @media (max-width: 992px) {
    flex-direction: column;
    height: auto;
  }
`;

const LeftColumn = styled.div`
  flex: 2;
  position: relative;
`;

const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;

  @media (max-width: 992px) {
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 1rem;
    &::-webkit-scrollbar { display: none; }
    -ms-overflow-style: none; 
    scrollbar-width: none; 
  }
`;

const PropertyCard = styled.div`
  position: absolute; /* Changed for GSAP positioning */
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5rem;
  
  &.small-card {
    position: relative; /* Overridden for right column */
    height: calc((100% - 3rem) / 3);
    @media (max-width: 992px) {
      min-width: 250px;
      height: 200px;
    }
  }

  .card-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
    transition: transform 0.4s ease;
  }

  .card-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%);
    z-index: 2;
  }

  .card-content {
    position: relative;
    z-index: 3;
    h3 {
      font-size: ${props => props.type === 'large' ? '2rem' : '1.2rem'};
      font-weight: 700;
      margin: 0 0 0.5rem 0;
    }
    p {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: ${props => props.type === 'large' ? '1rem' : '0.9rem'};
      opacity: 0.9;
    }
  }

  .card-price {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    background: rgba(0,0,0,0.5);
    padding: 0.5rem 1rem;
    border-radius: 12px;
    font-size: 1.2rem;
    font-weight: 600;
    z-index: 3;
  }

  &:hover .card-image {
    transform: scale(1.05);
  }
`;

export default EnhancedRecommendedSection;