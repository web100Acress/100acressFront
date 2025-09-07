import React from 'react';
import { styled } from 'styled-components';

const PerformantLoadingSpinner = ({ 
  size = 'medium', 
  color = '#3b82f6', 
  fullScreen = true,
  message = 'Loading...'
}) => {
  const sizeMap = {
    small: '24px',
    medium: '40px',
    large: '56px'
  };

  if (fullScreen) {
    return (
      <FullScreenContainer>
        <ContentWrapper>
          <Spinner size={sizeMap[size]} color={color} />
          <Message>{message}</Message>
        </ContentWrapper>
      </FullScreenContainer>
    );
  }

  return (
    <InlineContainer>
      <Spinner size={sizeMap[size]} color={color} />
      <Message>{message}</Message>
    </InlineContainer>
  );
};

const FullScreenContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  z-index: 9999;
  
  /* Optimize for performance */
  will-change: opacity;
  transform: translateZ(0);
`;

const InlineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  min-height: 200px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Spinner = styled.div`
  width: ${props => props.size};
  height: ${props => props.size};
  border: 3px solid rgba(59, 130, 246, 0.1);
  border-top: 3px solid ${props => props.color};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  /* Performance optimizations */
  will-change: transform;
  transform: translateZ(0);
  
  @keyframes spin {
    0% { 
      transform: rotate(0deg) translateZ(0);
    }
    100% { 
      transform: rotate(360deg) translateZ(0);
    }
  }
`;

const Message = styled.p`
  margin: 0;
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
  text-align: center;
`;

// Skeleton loader for content placeholders
export const SkeletonLoader = ({ 
  width = '100%', 
  height = '20px', 
  borderRadius = '4px',
  className = ''
}) => (
  <SkeletonContainer 
    width={width} 
    height={height} 
    borderRadius={borderRadius}
    className={className}
  />
);

const SkeletonContainer = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: ${props => props.borderRadius};
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  
  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

// Card skeleton for property cards
export const PropertyCardSkeleton = () => (
  <CardSkeletonContainer>
    <SkeletonLoader height="200px" borderRadius="8px 8px 0 0" />
    <CardContent>
      <SkeletonLoader height="24px" width="80%" />
      <SkeletonLoader height="16px" width="60%" />
      <SkeletonLoader height="20px" width="40%" />
    </CardContent>
  </CardSkeletonContainer>
);

const CardSkeletonContainer = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  background: white;
`;

const CardContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export default PerformantLoadingSpinner;
