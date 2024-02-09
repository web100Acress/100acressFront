import React from "react";
import styled from "styled-components";

function TopElemProg() {
  return (
    <Wrapper className='section'>
      <div class='main-container'>
        <div class='steps-container'>
          <div class='step completed'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'>
              <path d='M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z' />
            </svg>
            <div class='label completed'>Prospect</div>
            <div class='icon completed'>
              <i class='far fa-handshake'></i>
            </div>
          </div>
          <div class='line completed'></div>
          <div class='step completed'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'>
              <path d='M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z' />
            </svg>
            <div class='label completed'>Tour</div>
            <div class='icon completed'>
              <i class='far fa-map'></i>
            </div>
          </div>
          <div class='line next-step-in-progress'></div>
          <div class='step in-progress'>
            <div class='preloader'></div>
            <div class='label loading'>Offer</div>
            <div class='icon in-progress'>
              <i class='far fa-money-bill-alt'></i>
            </div>
          </div>
          <div class='line prev-step-in-progress'></div>
          <div class='step'>
            <div class='label'>Contract</div>
            <div class='icon'>
              <i class='far fa-newspaper'></i>
            </div>
          </div>
          <div class='line'></div>
          <div class='step'>
            <div class='label'>Settled</div>
            <div class='icon'>
              <i class='fas fa-home'></i>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default TopElemProg;
const Wrapper = styled.section`

  * {
    box-sizing: border-box;
  }

  body {
    font-family: "DM Sans", sans-serif;
    background: #fff;
    padding: 0;
    margin: 0;
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  input[type="checkbox"] {
    height: 0;
    width: 0;
    visibility: hidden;
  }

  input[type="checkbox"]:checked + label {
    background: #13cb8f;
  }

  input[type="checkbox"]:checked + label:after {
    left: calc(100% - 2px);
    transform: translateX(-100%);
  }

  label {
    cursor: pointer;
    width: 75px;
    height: 34px;
    background: #d2d3d8;
    display: block;
    border-radius: 40px;
    position: relative;
  }

  label:after {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 30px;
    height: 30px;
    background: #fff;
    border-radius: 40px;
    transition: 0.3s;
  }

  .main-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: all 200ms ease;
    background: #fff;
    height: 220px;
    min-width: 420px;
    max-width: 750px;
    flex-grow: 1;
    border-radius: 5px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.14);
  }

  .steps-container {
    padding: 40px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .step {
    z-index: 1;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 200ms ease;
    flex-grow: 0;
    height: 15px;
    width: 15px;
    border: 4px solid #d2d3d8;
    border-radius: 50%;
  }

  .step.completed {
    width: 18px;
    height: 18px;
    background: #5c6174;
    border: none;
  }

  .step.completed svg {
    transition: all 200ms ease;
    display: block;
    height: 10px;
    width: 10px;
    fill: #fff;
  }

  .step.in-progress {
    width: 18px;
    height: 18px;
    background: #13cb8f;
    border: none;
  }

  .step.in-progress .preloader {
    display: block;
    height: 10px;
    width: 10px;
    border: 2px solid #fff;
    border-radius: 50%;
    border-left-color: transparent;
    animation-name: spin;
    animation-duration: 2000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  .step .label {
    position: absolute;
    top: 30px;
    filter: none;
    z-index: 2000;
    color: #d3d3d8;
    transition: all 200ms ease;
    font-weight: 700;
  }

  .step.completed .label {
    color: #5c6174;
  }

  .step.in-progress .label {
    color: #13cb8f;
  }

  .step .icon {
    font-size: 40px;
    position: absolute;
    top: -60px;
    color: #d2d3d8;
    transition: color 200ms ease;
  }

  .step.completed .icon {
    color: #5c6174;
  }

  .step.in-progress .icon {
    color: #13cb8f;
  }

  .line {
    transition: all 200ms ease;
    height: 2px;
    flex-grow: 1;
    max-width: 120px;
    background: #d2d3d8;
  }

  .line.completed {
    background: #5c6174;
  }

  .line.next-step-uncomplete {
    background: linear-gradient(
      to right,
      #5c6174,
      d2d3d8
    );
  }

  .line.next-step-in-progress {
    background: linear-gradient(
      to right,
      #5c6174,
      #13cb8f
    );
  }

  .line.prev-step-in-progress {
    background: linear-gradient(
      to right,
      #13cb8f,
      #d2d3d8
    );
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
