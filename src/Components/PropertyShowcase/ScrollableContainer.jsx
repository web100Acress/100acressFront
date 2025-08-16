import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ScrollableContainer = ({ children }) => {
  const scrollContainerRef = useRef(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      // Initial check
      checkScrollPosition();
      return () => container.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);

  return (
    <Container>
      <ScrollContent ref={scrollContainerRef}>
        {children}
      </ScrollContent>
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
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const ScrollContent = styled.div`
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 1rem 0.5rem;
  margin: 0 -0.5rem;
  -ms-overflow-style: none;  /* Hide scrollbar for IE and Edge */
  scrollbar-width: none;  /* Hide scrollbar for Firefox */
  
  &::-webkit-scrollbar {
    display: none;  /* Hide scrollbar for Chrome, Safari and Opera */
  }
`;

const ScrollButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ direction }) => (direction === 'left' ? 'left: 10px;' : 'right: 10px;')}
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 2;
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  transition: all 0.3s ease;
  
  &:hover {
    background: #f5f5f5;
    transform: translateY(-50%) scale(1.05);
  }
  
  svg {
    color: #333;
    font-size: 1.2rem;
  }
  
  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
  }
`;

export default ScrollableContainer;
