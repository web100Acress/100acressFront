import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { MdLocationPin, MdFavorite, MdFavoriteBorder, MdStar, MdArrowForward } from "react-icons/md";
import { FaBed, FaRulerCombined } from 'react-icons/fa';
import axios from "axios";
import { Link } from "react-router-dom";

function ModernCard() {
  const [trendingProject, setTrendingProject] = useState([]);
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    if (!hasFetchedData) {
      const fetchData = async () => {
        try {
          const res = await axios.get('/api/property/buy/ViewAll');
          setTrendingProject(res.data.ResaleData);
          setHasFetchedData(true);
        } catch (error) {
          console.log(error || error.message);
        }
      }
      fetchData();
    }
  }, [hasFetchedData]);

  const toggleFavorite = (projectId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(projectId)) {
        newFavorites.delete(projectId);
      } else {
        newFavorites.add(projectId);
      }
      return newFavorites;
    });
  };

  const formatPrice = (price) => {
    if (!price) return "Price on request";
    return `₹${price} Cr`;
  };

  const truncateText = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  return (
    <Wrapper className="section">
      {trendingProject.map((item, index) => (
        <CardContainer
          key={index}
          className={`modern-card ${hoveredCard === item._id ? 'hovered' : ''}`}
          onMouseEnter={() => setHoveredCard(item._id)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Image Section */}
          <div className="image-section">
            <img
              src={item.frontImage?.url}
              alt={item.projectName}
              className="property-image"
              loading="lazy"
            />
            
            {/* Image Overlay */}
            <div className="image-overlay" />
            
            {/* Favorite Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(item._id);
              }}
              className="favorite-btn"
            >
              {favorites.has(item._id) ? 
                <MdFavorite className="text-red-500" /> : 
                <MdFavoriteBorder />
              }
            </button>

            {/* Price Badge */}
            <div className="price-badge">
              <span className="price-text">
                {formatPrice(item.price)}
              </span>
            </div>

            
          </div>

          {/* Content Section */}
          <div className="content-section">
            <div className="content-header">
              <h3 className="project-name">
                {truncateText(item.projectName, 4)}
              </h3>
              <div className="rating">
                <MdStar className="star-icon" />
                <span>4.8</span>
              </div>
            </div>

            <div className="location-info">
              <div className="location-item">
                <MdLocationPin className="location-icon" />
                <span>Delhi</span>
              </div>
            </div>

            <div className="price-info">
              <p className="price-label">Starting at</p>
              <p className="price-value">{formatPrice(item.price)}</p>
            </div>

            <Link to={`/property/${item._id}`} className="view-details-btn">
              <span>View Details</span>
              <MdArrowForward />
            </Link>
          </div>
        </CardContainer>
      ))}
    </Wrapper>
  );
}

export default ModernCard;

const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 1rem;
  
  @media (max-width: 768px) {
    gap: 1rem;
    padding: 0.5rem;
  }
`;

const CardContainer = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 400px;
  position: relative;
  flex: 1;
  min-width: 340px;
  max-width: 400px;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  .image-section {
    position: relative;
    height: 240px;
    overflow: hidden;

    .property-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .image-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to bottom,
        transparent 0%,
        transparent 60%,
        rgba(0, 0, 0, 0.3) 100%
      );
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .favorite-btn {
      position: absolute;
      top: 16px;
      right: 16px;
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.9);
      border: none;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      z-index: 10;
      color: #6b7280;

      &:hover {
        background: white;
        transform: scale(1.1);
        color: #ef4444;
      }
    }

    .price-badge {
      position: absolute;
      bottom: 16px;
      left: 16px;
      background: rgba(249, 115, 22, 0.95);
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-weight: 600;
      font-size: 14px;
      backdrop-filter: blur(10px);
    }

    .quick-info {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(10px);
      padding: 16px;
      transform: translateY(100%);
      transition: transform 0.3s ease;

      &.visible {
        transform: translateY(0);
      }

      .info-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;

        .info-item {
          display: flex;
          align-items: center;
          gap: 6px;
          color: white;
          font-size: 12px;

          .info-icon {
            color: #f97316;
          }
        }
      }
    }
  }

  .content-section {
    padding: 20px;

    .content-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;

      .project-name {
        font-size: 18px;
        font-weight: 700;
        color: #1f2937;
        line-height: 1.3;
        flex: 1;
        margin-right: 12px;
      }

      .rating {
        display: flex;
        align-items: center;
        gap: 4px;
        color: #f59e0b;
        font-weight: 600;
        font-size: 14px;

        .star-icon {
          font-size: 16px;
        }
      }
    }

    .location-info {
      margin-bottom: 16px;

      .location-item {
        display: flex;
        align-items: center;
        gap: 6px;
        color: #4b5563;
        font-size: 14px;

        .location-icon {
          color: #f97316;
          font-size: 16px;
        }
      }
    }

    .price-info {
      margin-bottom: 20px;

      .price-label {
        color: #6b7280;
        font-size: 14px;
        margin-bottom: 4px;
      }

      .price-value {
        color: #1f2937;
        font-size: 18px;
        font-weight: 700;
      }
    }

    .view-details-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      padding: 12px 24px;
      background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
      color: white;
      text-decoration: none;
      border-radius: 12px;
      font-weight: 600;
      transition: all 0.3s ease;
      border: none;
      cursor: pointer;

      &:hover {
        background: linear-gradient(135deg, #ea580c 0%, #dc2626 100%);
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(249, 115, 22, 0.3);
      }
    }
  }

  &:hover .image-section .property-image {
    transform: scale(1.1);
  }

  &:hover .image-section .image-overlay {
    opacity: 1;
  }

  @media (max-width: 768px) {
    min-width: 300px;
    max-width: 350px;

    .image-section {
      height: 200px;
    }

    .content-section {
      padding: 16px;

      .content-header .project-name {
        font-size: 16px;
      }

      .price-info .price-value {
        font-size: 16px;
      }
    }
  }

  @media (max-width: 480px) {
    min-width: 100%;
    max-width: 100%;
  }
`; 