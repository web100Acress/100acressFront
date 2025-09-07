import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const PropertyShowcase = ({ properties }) => {
  const scrollContainerRef = useRef(null);
  const autoScrollIntervalRef = useRef(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);
  const [featuredProperty, setFeaturedProperty] = useState(null);
  const [otherProperties, setOtherProperties] = useState([]);
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const [allProperties, setAllProperties] = useState([]);

  // Initialize properties and auto-scroll
  useEffect(() => {
    if (properties && properties.length > 0) {
      const propertiesSlice = properties.slice(0, 8); // Take first 8 properties
      setAllProperties(propertiesSlice);
      setFeaturedProperty(propertiesSlice[0]);
      setOtherProperties(propertiesSlice.slice(1));
      setCurrentFeaturedIndex(0);
    }
  }, [properties]);

  // Auto-scroll logic
  useEffect(() => {
    if (allProperties.length > 1) {
      // Clear any existing interval
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }

      // Start auto-scroll interval (5 seconds)
      autoScrollIntervalRef.current = setInterval(() => {
        setCurrentFeaturedIndex(prevIndex => {
          const nextIndex = (prevIndex + 1) % allProperties.length;
          return nextIndex;
        });
      }, 5000);

      // Cleanup interval on unmount
      return () => {
        if (autoScrollIntervalRef.current) {
          clearInterval(autoScrollIntervalRef.current);
        }
      };
    }
  }, [allProperties]);

  // Update featured property when index changes
  useEffect(() => {
    if (allProperties.length > 0) {
      setFeaturedProperty(allProperties[currentFeaturedIndex]);
      // Update other properties to exclude the current featured one
      const otherProps = allProperties.filter((_, index) => index !== currentFeaturedIndex);
      setOtherProperties(otherProps);
    }
  }, [currentFeaturedIndex, allProperties]);

  // Format price for display
  const formatPrice = (price) => {
    if (!price) return 'Price on Request';
    if (price >= 100) {
      return `₹${(price / 100).toFixed(2)} Cr`;
    } else {
      return `₹${price} L`;
    }
  };

  // Format location string (show more precise location if available)
  const formatLocation = (property) => {
    if (!property || typeof property !== 'object') return 'Location';

    // If a full address-like string exists, prefer it.
    const fullAddress =
      property.address ||
      property.fullAddress ||
      property.location_full ||
      property.locationString ||
      property.location_text ||
      property.project_address ||
      property.projectAddress;
    if (fullAddress && typeof fullAddress === 'string') {
      return fullAddress;
    }

    // Normalized field candidates
    const rawSector =
      property.sector ||
      property.sectorNo ||
      property.sector_no ||
      property.sector_number ||
      property.sectorName ||
      property.sector_name;
    let sector = '';
    if (rawSector) {
      const s = String(rawSector).trim();
      sector = /^(sector)\b/i.test(s) ? s : `Sector ${s}`;
    }

    const micro =
      property.microLocation ||
      property.micro_location ||
      property.locationName ||
      property.locality ||
      property.localityName ||
      property.subLocality ||
      property.sub_locality ||
      property.neighbourhood ||
      property.neighborhood ||
      property.landmark;

    const road =
      property.road ||
      property.roadName ||
      property.road_name ||
      property.expressway ||
      property.highway ||
      property.spr ||
      property.vicinity; // Southern Peripheral Road sometimes stored as 'spr'

    // area-like names
    const area =
      property.area ||
      property.areaName ||
      property.zone ||
      property.region ||
      property.district;

    // city-like names
    const city =
      property.city ||
      property.cityName ||
      property.town ||
      property.municipality;

    // address line candidates placed before city
    const line1 =
      property.address1 ||
      property.addressLine1 ||
      property.address_line1 ||
      property.projectLocation ||
      property.project_location ||
      (typeof property.location === 'string' ? property.location : property.location?.name);

    const parts = [sector, micro, road, line1, area, city].filter(Boolean);
    const text = parts.join(', ');
    return text || 'Location';
  };

  // Scroll functionality
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftScroll(scrollLeft > 5); // Small threshold to avoid flickering
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = 320; // Card width (300px) + gap (20px)
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
      
      // Update scroll position after animation
      setTimeout(() => {
        checkScrollPosition();
      }, 300);
    }
  };

  // Manual navigation functions
  const goToNextFeatured = () => {
    // Pause auto-scroll temporarily
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }
    
    setCurrentFeaturedIndex(prevIndex => {
      const nextIndex = (prevIndex + 1) % allProperties.length;
      return nextIndex;
    });
    
    // Restart auto-scroll after 10 seconds
    setTimeout(() => {
      if (allProperties.length > 1) {
        autoScrollIntervalRef.current = setInterval(() => {
          setCurrentFeaturedIndex(prevIndex => {
            const nextIndex = (prevIndex + 1) % allProperties.length;
            return nextIndex;
          });
        }, 5000);
      }
    }, 10000);
  };

  const goToPrevFeatured = () => {
    // Pause auto-scroll temporarily
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }
    
    setCurrentFeaturedIndex(prevIndex => {
      const prevIdx = prevIndex === 0 ? allProperties.length - 1 : prevIndex - 1;
      return prevIdx;
    });
    
    // Restart auto-scroll after 10 seconds
    setTimeout(() => {
      if (allProperties.length > 1) {
        autoScrollIntervalRef.current = setInterval(() => {
          setCurrentFeaturedIndex(prevIndex => {
            const nextIndex = (prevIndex + 1) % allProperties.length;
            return nextIndex;
          });
        }, 5000);
      }
    }, 10000);
  };

  // Set up scroll event listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition(); // Initial check
      return () => container.removeEventListener('scroll', checkScrollPosition);
    }
  }, [otherProperties]);



  if (!properties || properties.length === 0) {
    return null;
  }

  return (
    <ShowcaseContainer>
      <Header>
        <Title>100acress – Recommended</Title>
      </Header>

      <FeaturedGrid>
        {/* Featured Property (Left Side) */}
        {featuredProperty && (
          <FeaturedProperty>
            <Link to={`/${featuredProperty.project_url}`} style={{ textDecoration: 'none' }}>
              <FeaturedImageContainer>
                <PropertyImage 
                  src={featuredProperty.frontImage?.url || 'https://via.placeholder.com/800x600?text=Property+Image'} 
                  alt={featuredProperty.projectName}
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Available';
                  }}
                />
                <ImageOverlay />
                <FeaturedBadge>Featured</FeaturedBadge>
                {featuredProperty.minPrice && (
                  <PriceTag>
                    {featuredProperty.maxPrice 
                      ? `${formatPrice(featuredProperty.minPrice)} - ${formatPrice(featuredProperty.maxPrice)}`
                      : `From ${formatPrice(featuredProperty.minPrice)}`}
                  </PriceTag>
                )}
              </FeaturedImageContainer>
              <FeaturedDetails>
                <PropertyName>{featuredProperty.projectName}</PropertyName>
                <PropertyMeta>
                  <LocationText>
                    <FaMapMarkerAlt size={14} /> {formatLocation(featuredProperty)}
                  </LocationText>
                </PropertyMeta>
                <PropertyDescription>
                  {featuredProperty.description || 'Luxury living at its finest with modern amenities and premium finishes.'}
                </PropertyDescription>
                <ViewDetails>View Project Details →</ViewDetails>
              </FeaturedDetails>
            </Link>
          </FeaturedProperty>
        )}

        {/* Other Properties (Right Side) */}
        <OtherProperties>
          <ScrollContainer ref={scrollContainerRef}>
            {otherProperties.map((property, index) => (
              <SmallPropertyCard key={property._id || index}>
                <Link to={`/${property.project_url}`} style={{ textDecoration: 'none' }}>
                  <SmallImageContainer>
                    <PropertyImage 
                      src={property.frontImage?.url || 'https://via.placeholder.com/400x300?text=Property+Image'} 
                      alt={property.projectName}
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
                      }}
                    />
                    <ImageOverlay />
                    {property.minPrice && (
                      <PriceTag>
                        {property.maxPrice 
                          ? `${formatPrice(property.minPrice)} - ${formatPrice(property.maxPrice)}`
                          : `From ${formatPrice(property.minPrice)}`}
                      </PriceTag>
                    )}
                  </SmallImageContainer>
                  <SmallPropertyDetails>
                    <PropertyName>{property.projectName}</PropertyName>
                    <PropertyMeta>
                      <LocationText>
                        <FaMapMarkerAlt size={12} /> {formatLocation(property)}
                      </LocationText>
                    </PropertyMeta>
                  </SmallPropertyDetails>
                </Link>
              </SmallPropertyCard>
            ))}
          </ScrollContainer>
        </OtherProperties>
        
        {/* Navigation Arrows positioned outside the grid */}
        <ScrollButton 
          direction="left" 
          visible={showLeftScroll}
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          <FaChevronLeft />
        </ScrollButton>
        <ScrollButton 
          direction="right" 
          visible={showRightScroll}
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          <FaChevronRight />
        </ScrollButton>
      </FeaturedGrid>
    </ShowcaseContainer>
  );
};

// Styled Components
const ShowcaseContainer = styled.section`
  padding: 2rem 1.5rem 4rem;
  background: #ffffff;
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (min-width: 1024px) {
    padding: 3rem 2rem 5rem;
  }
`;

const Header = styled.div`
  margin-bottom: 2rem;
  text-align: center;
  
  @media (min-width: 768px) {
    text-align: left;
    padding: 0 1rem;
  }
`;

const Title = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 1.5rem;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #c8a45c, #e6c98c);
    border-radius: 2px;
    
    @media (min-width: 768px) {
      left: 0;
      transform: none;
    }
  }
  
  @media (min-width: 768px) {
    font-size: 2.2rem;
  }
`;

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  
  @media (min-width: 992px) {
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
    min-height: 500px;
    align-items: stretch; /* Ensure both columns are equal height */
  }
`;

const FeaturedProperty = styled.article`
  border-radius: 12px;
  overflow: hidden;
  background: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    
    img {
      transform: scale(1.05);
    }
  }
`;

const FeaturedImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 70%;
  overflow: hidden;
  
  @media (min-width: 992px) {
    padding-top: 75%;
  }
`;

const OtherProperties = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  padding: 0 0.5rem;
  
  @media (min-width: 992px) {
    padding: 0;
    height: 100%; /* Match featured column height */
    --v-gap: 1.75rem; /* vertical gap between small cards (keep in sync with ScrollContainer) */
  }
`;

const ScrollContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 1rem 0.5rem;
  margin: 0 -0.5rem;
  -ms-overflow-style: none;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  @media (min-width: 992px) {
    flex-direction: column;
    gap: 1rem;
    overflow-x: visible;
    overflow-y: auto;
    height: 100%;
    padding: 0;
    margin: 0;
    scrollbar-width: thin;
    scrollbar-color: #c8a45c #f1f1f1;
    
    &::-webkit-scrollbar {
      display: block;
      width: 6px;
    }
    
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 3px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: #c8a45c;
      border-radius: 3px;
      
      &:hover {
        background: #a88a4a;
      }
    }
  }
  
  @media (max-width: 991px) {
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
    padding-bottom: 1rem;
    
    &::after {
      content: '';
      flex: 0 0 1rem;
    }
  }
  
  @media (min-width: 992px) {
    flex-direction: column;
    gap: var(--v-gap, 1.75rem);
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    flex-wrap: nowrap;
  }
`;

const SmallPropertyCard = styled.article`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  height: 100%;
  min-width: 300px;
  flex-shrink: 0;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    
    img {
      transform: scale(1.05);
    }
  }
  
  @media (min-width: 768px) and (max-width: 991px) {
    min-height: 320px;
  }
  
  @media (min-width: 992px) {
    min-width: 100%;
    flex: 0 0 auto;
    height: calc((100% - var(--v-gap, 1.75rem)) / 2); /* two cards fill the column height */
  }
`;

const SmallImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
  
  @media (min-width: 768px) {
    height: 200px;
  }
  
  @media (min-width: 992px) {
    height: 90%; /* increase image area on desktop */
    flex-shrink: 0;
  }
`;

const PropertyImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.5s ease;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 40%);
  z-index: 1;
`;

const FeaturedBadge = styled.span`
  position: absolute;
  top: 20px;
  left: 20px;
  background: #c8a45c;
  color: white;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 2;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const PriceTag = styled.span`
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: rgba(255, 255, 255, 0.9);
  color: #1a1a1a;
  padding: 6px 14px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  z-index: 2;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
`;

const FeaturedDetails = styled.div`
  padding: 1.5rem;
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const PropertyName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
  color: #1a1a1a;
  
  @media (min-width: 768px) {
    font-size: 1.2rem;
  }
`;

const PropertyMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0.25rem 0;
  color: #666;
  font-size: 0.8rem;
  align-items: center;
`;

const LocationText = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: uppercase; /* match visual from reference */
  
  svg {
    color: #c8a45c;
  }
`;

const PropertyDescription = styled.p`
  color: #666;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0 0 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  
  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const ViewDetails = styled.span`
  color: #c8a45c;
  font-weight: 600;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: all 0.3s ease;
  
  &:hover {
    color: #a88a4a;
    gap: 8px;
  }
`;

const SmallPropertyDetails = styled.div`
  padding: 1rem 1.25rem 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  @media (min-width: 768px) and (max-width: 991px) {
    padding: 1rem 1.25rem 1.25rem;
  }
  
  @media (min-width: 992px) {
    padding: 0.4rem 0.75rem; /* ultra-compact to let image fill */
    gap: 0.2rem;
  }
`;

const ScrollButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ direction }) => (direction === 'left' ? 'left: -60px;' : 'right: -60px;')}
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid #e0e0e0;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  z-index: 3;
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  transition: all 0.3s ease;
  
  &:hover {
    background: #f8f8f8;
    border-color: #c8a45c;
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
  
  svg {
    color: #333;
    font-size: 1.4rem;
  }
  
  @media (max-width: 1200px) {
    ${({ direction }) => (direction === 'left' ? 'left: -50px;' : 'right: -50px;')}
    width: 45px;
    height: 45px;
  }
  
  @media (max-width: 768px) {
    ${({ direction }) => (direction === 'left' ? 'left: 10px;' : 'right: 10px;')}
    width: 40px;
    height: 40px;
  }
`;

export default PropertyShowcase;