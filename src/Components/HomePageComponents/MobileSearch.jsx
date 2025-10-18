import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiSearch, FiX } from 'react-icons/fi';

const MobileSearch = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);

  // Handle click outside to collapse
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        if (isExpanded) {
          handleCollapse();
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
    setSearchQuery('');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Handle search functionality here
      console.log('Searching for:', searchQuery);
      // You can add your search logic here
    }
  };

  return (
    <SearchContainer ref={searchRef} className={isExpanded ? 'expanded' : ''}>
      <SearchButton 
        type="button" 
        onClick={isExpanded ? null : handleExpand}
        aria-label="Search"
      >
        {isExpanded ? (
          <SearchInputWrapper>
            <SearchInput
              type="text"
              placeholder="Search here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
            />
            <CloseButton onClick={handleCollapse} aria-label="Close search">
              <FiX size={18} />
            </CloseButton>
          </SearchInputWrapper>
        ) : (
          <FiSearch size={20} />
        )}
      </SearchButton>
    </SearchContainer>
  );
};

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
`;

const SearchContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  transition: all 0.3s ease-in-out;
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const SearchButton = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #e53e3e;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease-in-out;
  padding: 0;
  position: relative;
  overflow: hidden;
  
  &:hover {
    background: #c53030;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
  
  svg {
    transition: opacity 0.2s ease;
  }
`;

const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 16px;
  animation: ${fadeIn} 0.2s ease-out;
`;

const SearchInput = styled.input`
  flex: 1;
  height: 36px;
  border: none;
  background: transparent;
  color: white;
  font-size: 16px;
  outline: none;
  padding: 0 8px;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.8);
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  margin-left: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  &:active {
    background: rgba(255, 255, 255, 0.3);
  }
`;

export default MobileSearch;
