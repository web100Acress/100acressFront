import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const slideUp = keyframes`
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(-100%); opacity: 0.8; }
`;

const slideDown = keyframes`
  from { transform: translateY(-100%); opacity: 0.8; }
  to { transform: translateY(0); opacity: 1; }
`;

const slideLeft = keyframes`
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(-100%); opacity: 1; }
`;

const slideRight = keyframes`
  from { transform: translateX(100%); opacity: 1; }
  to { transform: translateX(0); opacity: 1; }
`;

const Container = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  gap: 2rem;
  position: relative;
  height: 500px;
  overflow: hidden;
`;

const LargeCard = styled.div`
  flex: 2;
  height: 100%;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease;
  cursor: pointer;
  
  ${props => props.animating === 'left' && css`
    animation: ${slideLeft} 0.5s ease-in-out forwards;
  `}
  
  ${props => props.animating === 'right' && css`
    animation: ${slideRight} 0.5s ease-in-out forwards;
  `}
`;

const SmallCard = styled.div`
  flex: 1;
  height: calc(33.333% - 1.33rem);
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease;
  cursor: pointer;
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  ${props => props.animating === 'up' && css`
    animation: ${slideUp} 0.5s ease-in-out forwards;
  `}
  
  ${props => props.animating === 'down' && css`
    animation: ${slideDown} 0.5s ease-in-out forwards;
  `}
`;

const CardImage = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
  transition: transform 0.3s ease;
  
  ${LargeCard}:hover &, ${SmallCard}:hover & {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
  
  h3 {
    margin: 0;
    font-size: ${props => props.large ? '1.8rem' : '1.1rem'};
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  p {
    margin: 0;
    font-size: ${props => props.large ? '1.1rem' : '0.9rem'};
    opacity: 0.9;
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }
`;

const PriceTag = styled.div`
  display: inline-block;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: ${props => props.large ? '1.1rem' : '0.8rem'};
  margin-top: 0.5rem;
`;

const RotatingCardCarousel = ({ cards = [], interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animation, setAnimation] = useState({});
  const navigate = useNavigate();

  // Create an extended array for infinite loop
  const extendedCards = [...cards, ...cards.slice(0, 4)];
  
  const getVisibleCards = useCallback(() => {
    return {
      large: extendedCards[currentIndex % cards.length],
      small1: extendedCards[(currentIndex + 1) % cards.length],
      small2: extendedCards[(currentIndex + 2) % cards.length],
      small3: extendedCards[(currentIndex + 3) % cards.length]
    };
  }, [currentIndex, cards.length]);

  const rotateCards = useCallback(() => {
    // Only rotate if we have enough cards
    if (cards.length <= 1) return;
    
    // Set animation states
    setAnimation({
      large: 'left',
      small1: 'up',
      small2: 'up',
      small3: 'up',
      smallNext: 'down'
    });

    // After animation completes, update index
    const animationTimeout = setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % cards.length);
      
      // Reset animation states after a short delay to allow for smooth transition
      const resetTimeout = setTimeout(() => {
        setAnimation({});
      }, 50);
      
      return () => clearTimeout(resetTimeout);
    }, 500);
    
    return () => clearTimeout(animationTimeout);
  }, [cards.length]);

  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotation effect
  useEffect(() => {
    if (cards.length <= 1) return;
    
    let timer;
    
    const startRotation = () => {
      timer = setInterval(() => {
        if (!isPaused) {
          rotateCards();
        }
      }, interval);
    };
    
    startRotation();
    return () => clearInterval(timer);
  }, [cards.length, interval, isPaused, rotateCards]);

  // Pause on hover
  const handleMouseEnter = useCallback(() => {
    setIsPaused(true);
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
  }, []);

  // Handle card click
  const handleCardClick = (card) => {
    if (card.link) {
      navigate(card.link);
    }
  };

  // Get currently visible cards
  const { large, small1, small2, small3 } = getVisibleCards();

  if (cards.length === 0) {
    return <div>Loading properties...</div>;
  }

  return (
    <Container 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Large Card */}
      {large && (
        <LargeCard 
          onClick={() => handleCardClick(large)}
          animating={animation.large}
        >
          <CardImage 
            style={{ backgroundImage: `url(${large.image})` }} 
            alt={large.title}
          />
          <CardContent large>
            <h3>{large.title}</h3>
            <p>{large.location}</p>
            {large.price && <PriceTag large>{large.price}</PriceTag>}
          </CardContent>
        </LargeCard>
      )}

      {/* Small Cards */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {[small1, small2, small3].map((card, idx) => (
          card && (
            <SmallCard 
              key={`${card.id}-${currentIndex + idx}`}
              onClick={() => handleCardClick(card)}
              animating={animation[`small${idx + 1}`]}
            >
              <CardImage 
                style={{ backgroundImage: `url(${card.image})` }} 
                alt={card.title}
              />
              <CardContent>
                <h3>{card.title}</h3>
                <p>{card.location}</p>
                {card.price && <PriceTag>{card.price}</PriceTag>}
              </CardContent>
            </SmallCard>
          )
        ))}
      </div>
    </Container>
  );
};

export default RotatingCardCarousel;
