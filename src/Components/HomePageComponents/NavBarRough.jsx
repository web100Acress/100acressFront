import React, { useState } from "react";
import styled from "styled-components";
import { GiVillage } from "react-icons/gi";
import { HiBars3 } from "react-icons/hi2";
import { ABOUT, BLOG, ROOT, PROPERTIES } from "../../lib/route";
import { Link, Navigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { BsTelephone } from "react-icons/bs"
import { FiPhoneCall, FiChevronDown } from "react-icons/fi"

function CurrentNavBar() {
  const [showNav, setShowNav] = useState(false);
  const URL="/projects"
  return (
    <Wrapper className='section'>
      <div className='navbar-container'>
        
        {/* Left Section - Search Projects */}
        <div className='left-section'>
          <span className='search-projects-trigger' onClick={() => setShowNav(!showNav)}>
            <HiBars3 size={20} className='menu-icon' />
            <span className='search-text'>SEARCH PROJECTS</span>
          </span>
        </div>

        {/* Center Section - Logo */}
        <div className='center-section'>
          <Link to={ROOT} className='logo-link'>
            <span className='logo-text'>100acress</span>
          </Link>
        </div>

        {/* Right Section - Profile & List Property */}
        <div className='right-section'>
          <div className='profile-circle'>
            <span className='profile-icon'>👤</span>
          </div>
          <button className='list-property-btn'>
            LIST PROPERTY
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {showNav && (
          <div className='mobile-menu-overlay'>
            <div className='mobile-menu-header'>
              <Link to={ROOT}>
                <span className='logo-text'>100acress</span>
              </Link>
              <RxCross2
                size={30}
                className='close-icon'
                onClick={() => setShowNav(!showNav)}
              />
            </div>
            <div className='mobile-menu-content'>
              <ul className='mobile-menu-list'>
                <li>
                  <Link to={ROOT} className='mobile-link' onClick={() => setShowNav(!showNav)}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to={ABOUT} className='mobile-link' onClick={() => setShowNav(!showNav)}>
                    About
                  </Link>
                </li>
                <li>
                  <Link to={URL} className='mobile-link' onClick={() => setShowNav(!showNav)}>
                    Projects
                  </Link>
                </li>
                <li>
                  <Link to={BLOG} className='mobile-link' onClick={() => setShowNav(!showNav)}>
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </Wrapper>
  );
}

export default CurrentNavBar;
const Wrapper = styled.section`
  position: sticky;
  top: 0px;
  z-index: 9999;
  background-color: white;
  border-bottom: 1px solid #e0e0e0;

  .navbar-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 12px 20px;
    background-color: white;
  }

  /* Left Section - Search Projects */
  .left-section {
    display: flex;
    align-items: center;
  }

  .search-projects-trigger {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 6px;
    transition: background-color 0.2s;
  }

  .search-projects-trigger:hover {
    background-color: #f5f5f5;
  }

  .menu-icon {
    color: #333;
  }

  .search-text {
    font-weight: 500;
    color: #333;
    font-size: 14px;
    letter-spacing: 0.5px;
  }

  /* Center Section - Logo */
  .center-section {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .logo-link {
    text-decoration: none;
  }

  .logo-text {
    font-size: 28px;
    font-weight: bold;
    color: #e53e3e;
    text-decoration: none;
  }

  /* Right Section - Profile & List Property */
  .right-section {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .profile-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .profile-circle:hover {
    background-color: #e0e0e0;
  }

  .profile-icon {
    font-size: 18px;
    color: #666;
  }

  .list-property-btn {
    background-color: transparent;
    border: 2px solid #e53e3e;
    color: #e53e3e;
    padding: 8px 16px;
    border-radius: 6px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.5px;
  }

  .list-property-btn:hover {
    background-color: #e53e3e;
    color: white;
  }

  /* Mobile Menu Overlay */
  .mobile-menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: #e53e3e;
    z-index: 10000;
    display: flex;
    flex-direction: column;
  }

  .mobile-menu-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }

  .mobile-menu-header .logo-text {
    color: white;
  }

  .close-icon {
    color: white;
    cursor: pointer;
  }

  .mobile-menu-content {
    flex: 1;
    padding: 20px;
  }

  .mobile-menu-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .mobile-menu-list li {
    margin-bottom: 20px;
  }

  .mobile-link {
    color: white;
    text-decoration: none;
    font-size: 24px;
    font-weight: 500;
    display: block;
    padding: 10px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .mobile-link:hover {
    color: #ffcccc;
  }

  /* Responsive Design */
  @media screen and (max-width: 768px) {
    .navbar-container {
      padding: 10px 15px;
    }

    .search-text {
      display: none;
    }

    .logo-text {
      font-size: 24px;
    }

    .list-property-btn {
      padding: 6px 12px;
      font-size: 12px;
    }

    .profile-circle {
      width: 35px;
      height: 35px;
    }
  }

  @media screen and (max-width: 480px) {
    .right-section {
      gap: 10px;
    }

    .list-property-btn {
      display: none;
    }
  }
`;
