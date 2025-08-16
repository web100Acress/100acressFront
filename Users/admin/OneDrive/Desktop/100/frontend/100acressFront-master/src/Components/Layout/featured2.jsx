/** @format */

import React from "react";
import { styled } from "styled-components";

export default function Featured2() {
  return (
    <Wrapper className='section'>
    <div className="d-flex justify-content-center w-100" style={{height: "100vh",backgroundColor: "rgba(191, 201, 255, 0.2)"}}>
      <div className='heading'>
        <h3>Listed Collections</h3>
        <p>Check Out Some of the collections we Suggest:-</p>
        <div className='_jdOM'>
          <div class='sLMSSf6 div1'>
            <div className='_sdk'>
              <span>Residential</span>
              <span className='_pok'>Residential category description</span>
            </div>
          </div>
          <div class='sLMSSf6 div2'>
            <div className='_sdk'>
              <span>Commercial</span>
              <span className="_pok">Commercial Category description</span>
            </div>
          </div>
          <div class='sLMSSf6 div3'>
            <div className='_sdk'>
            <span>Apartments</span>
            <span className="_pok">Select from a variety of aparments</span>
            </div>
          </div>
          <div class='sLMSSf6 div4'>
            <div className='_sdk'>
            <span>Villa's</span>
            <span className="_pok">Pick from a lot of premium housing.</span>
            </div>
          </div>
          <div class='sLMSSf6 div5'>
            <div className='_sdk'>
            <span>Lowrise Independent Floor</span>
            <span className="_pok">Wide Range of fully furnished independent floors within your budget.</span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`

  .heading {
    margin-left: 5vw;
    margin-right: 5vw;
    margin-top: 5vh;
  }
  ._jdOM {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 2%;
    grid-row-gap: 5%;
    width: 100%;
  }
  h3 {
    font-size: x-large;
    font-weight: 600;
  }
  p {
    font-weight: 300;
  }
  div {
    width: 100%;
    height: 200px;
  }
  .div1 {
    grid-area: 1 / 1 / 2 / 3;
  }
  .div2 {
    grid-area: 1 / 3 / 2 / 5;
  }
  .div3 {
    grid-area: 1 / 5 / 2 / 7;
  }
  .div4 {
    grid-area: 2 / 1 / 3 / 4;
  }
  .div5 {
    grid-area: 2 / 4 / 3 / 7;
  }

  span {
    color: white;
    font-size: large;
    font-weight: 600;
  }
  ._pok {
    font-size: medium;
    font-weight: 300;
  }
  ._sdk{
    background-image: linear-gradient(
        to Bottom,
        rgba(0, 0, 0, 0.1),
        rgba(0, 0, 0, 0.5)
    ),
    url("https://q-xx.bstatic.com/xdata/images/hotel/840x460/110279260.jpg?k=a31cbb3d30a02873463c0e3305d4cf63f1a2d9483aac99c92f481ee44bd28714&o=");
    background-position: center;
    background-size: cover;
    border-radius: 10px;
    display:flex;
    flex-direction:column;
    padding:20px;
    justify-content:end;
  }
  ._sdk{
    width:100%;
  }
  .div1:hover,.div2:hover,.div3:hover,.div4:hover,.div5:hover ._sdk{
    transform:scale(1.05);
    transition: all .7s;
    cursor:pointer;
  }
  .div1:not(:hover),.div2:not(:hover),.div3:not(:hover),.div4:not(:hover),.div5:not(:hover){
    transition:all .7s;
  }
  @media screen and (max-width:790px){
    ._jdOM{
      display:flex;
      flex-wrap:wrap;
      align-items:center;
    }
    .sLMSSf6{
      width:260px;
      height:200px;
    }
  }
  @media screen and (max-width:450px){
    .sLMSSf6{
      width:100%;
    }
  }
`;
