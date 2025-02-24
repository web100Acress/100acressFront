import React, { useState } from "react";
import styled from "styled-components";
import { GiVillage } from "react-icons/gi";
import { HiBars3 } from "react-icons/hi2";
import { ABOUT, BLOG, ROOT, PROPERTIES } from "../../lib/route";
import { Link, Navigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { BsTelephone } from "react-icons/bs"
import { FiPhoneCall } from "react-icons/fi"

function CurrentNavBar() {
  const [showNav, setShowNav] = useState(false);
  const URL="/projects"
  return (
    <Wrapper className='section'>
      <div className='Mflx'>
      
        <div className='1euNB' style={{cursor:"pointer"}}>
        <Link to={ROOT}>
          <img src="../../Images/mainLogo.png" alt='' className="imgMustLgogo" />
        </Link>
        </div>
        
        <div
          className='barDotMenu'
          style={{ width: "fit-content", marginBottom: "5px",marginTop: "5px" }}>
          <span style={{paddingRight:"5px"}} className="phoneIconAnimation"><FiPhoneCall strokeWidth={3} color="white" size={18}/></span>
          <span>
          <a href="tel:+4733378901"  className="p-1" style={{color:"white",fontSize:"18px"}}>9811750130</a>
          </span>
          <HiBars3 size={35} color='white' onClick={() => setShowNav(!showNav)} />
        </div>

        {showNav && (
          <div
            className='position-absolute h-100 '
            style={{
              background: "red",
              zIndex: "999",
              width: "100%",
            }}>
            <div className='d-flex align-items-center justify-content-between  pr-3'>
              <div className='1euNB'>
                <img src="../../Images/mainLogo.png" alt='' width='200' />
              </div>
              <div
                className='barDotMenu'
                style={{ width: "fit-content", marginBottom: "10px" }}>
                <RxCross2
                  size={30}
                  color='white'
                  onClick={() => setShowNav(!showNav)}
                />
              </div>
            </div>
            <div className='MBflx' style={{background:"red"}}>
          <ul className='ulfx _1grx flex-column'>
            <li>
              <Link to={ROOT} className='linkEl' onClick={() => setShowNav(!showNav)}>
                Home
              </Link>
            </li>
            <li>
              <Link to={ABOUT} className='linkEl' onClick={() => setShowNav(!showNav)}>
                About
              </Link>
            </li>
            
            <li className='_3px49x'>
               <Link to={URL} className='linkEl' onClick={() => setShowNav(!showNav)}>
                Projects
               </Link>
            </li>

            <li>
              <Link to={BLOG} className='linkEl' onClick={() => setShowNav(!showNav)}>
                Blog
              </Link>
            </li>
            
          </ul>
          
        </div>
          </div>
        )}
        <div className='NBflx'>
          <ul className='ulfx _1grx' style={{marginTop:"8px"}}>

            <li>
              <Link to={ROOT} className='linkEl'>
                Home
              </Link>
            </li>
            <li>
              <Link to={ABOUT} className='linkEl'>
                About
              </Link>
            </li>
            
            <li className='_3px49x'>
              <span className='pxrETXT'>
                <a>Projects</a>
              </span>
              <ul className='_2emBLM _nEXRT'>
                <li className='_3emBLMe'>
                  <ul className='_3euEM _1uef'>
                    <li className='_lmxE pplf'>
                      <div className='amidd'>
                        <GiVillage size='40' />
                      </div>
                      <Link to={URL} relative="path">
                      <div className='exori'>
                        <p className='_2hduom'>View All Projects</p>
                        <span className='_2hskbj'>
                          Glimpse of All Listed ones
                        </span>
                      </div>
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>

            <li>
              <Link to={BLOG} className='linkEl'>
                Blog
              </Link>
            </li>
          </ul>
          <ul className='ulfx _2grx'>
            <span style={{paddingRight:"5px"}} className="phoneIconAnimation"><FiPhoneCall strokeWidth={3}/></span>
            <span style={{fontWeight:"bold"}}>9811750130</span>
          </ul>
        </div>
      </div>
    </Wrapper>
  );
}

export default CurrentNavBar;
const Wrapper = styled.section`
position:sticky;
top:0px;
.imgMustLgogo{
  width:200px;
}
z-index:999;
  .ieuNB {
    display: flex;
  }
  
  ._2hskbj{
    color:black !important;
  }
  ._2hskbj:hover{
    color:red !important;
  }
  .ulfx {
    list-style: none;
    display: flex;
    align-items: center;
    font-size: large;
    height: 100%;
    margin-bottom: 5px;
    margin-top: 0px;
    color:white;
  }
  .NBflx {
    display: flex;
    color: red;
    width: 100%;
  }
  .Mflx {
    display: flex;
    align-items: center;
    background:red;
  }
  hr{
    color:black !important;
  }
  ._1grx > li,
  ._2grx > li {
    position: relative;
    padding: 0px 12px;
  }
  ._2grx {
    justify-content: flex-end;
    flex-grow: 1;
    padding-right: 20px;
    margin-top: 8px;
  }
  .linkEl {
    color: inherit;
    display: inherit;
    align-items: inherit;
  }
  ._1grx > li > ul {
    opacity: 0;
    visibility: hidden;
    transition-timing-function: ease-in-out;
    transition-duration: 0.15s;
    transition-property: visibility;
    transition-delay: 0s;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    font-weight: 500;
    height: auto;
    left: -12px;
    padding: 8px;
    position: absolute;
    top: 140%;
    z-index: 20;
  }
  .phoneIconAnimation{
    animation:shake 0.8s linear infinite;
  }
  @-webkit-keyframes shake{
    0% {-webkit-transform: none;transform: none;}
    15% {-webkit-transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);}
    30% {-webkit-transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);}
    45% {-webkit-transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);}
    60% {-webkit-transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);}
    75% {-webkit-transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);}
    100% {-webkit-transform: none;transform: none;}
  }
  ._2emBLM li {
    align-items: inherit;
    min-width: 220px;
    width: auto;
  }
  ._2emBLM {
    background-color: white;
    box-shadow: 0 4px 16px 0 rgba(11, 17, 52, 0.2);
  }
  ._2kdSPM {
    font-size: small;
    font-weight: 600;
    color: red;
    padding: 8px 10px;
  }
  ._3euEM {
    display: block;
    padding-left: 0px;
  }
  ._3emBLMe li {
    list-style-type: none;
  }
  ._3euEM > li {
    padding: 10px;
    color: black;
    font-size: 15px;
    margin-right: 10px;
  }
  ._3euEM > li:hover {
    background-color: pink;
    color: red;
    border-radius: 10px;
    cursor: pointer;
  }
  ._2uef {
    padding-left: 10px;
  }
  ._2emBLM {
    list-style-type: none;
  }
  .ulfx {
    position: relative;
  }
  .pxrE {
    height: 100%;
  }
  .ulfx > li:after {
    content: "";
    height: 3px;
    width: 50%;
    background-color: red;
    position: absolute;
    left: 25%;
    right: 25%;
    bottom: -10px;
    opacity: 0;
    border-radius: 40px;
  }
  .ulfx > li:hover:after {
    opacity: 1;
    cursor: pointer;
  }
   
  .MBflx .pxrETXT,.MBflx .linkEl{
    font-size:25px;
  }
  
  .pxrETXT:hover + ._2emBLM,
  ._2emBLM:hover {
    opacity: 1;
    cursor: pointer;
    visibility: visible;
  }
  .ulfx:hover {
    cursor: pointer;
  }
  ._exJRE {
    border-right: 1px solid white;
  }
  .MBflx{
    display:flex;
    flex-direction:column;
  }
  ._elm {
    color: red;
    font-size: small;
  }
  ._lmxE {
    display: flex;
    align-items: center;
  }
  ._2hduom {
    margin-bottom: 0px;
    color:black;
  }
  ._2hduom:hover{
    color:red;
  }
  .amidd {
    padding-top: 5px;
    padding-right: 10px;
  }
  ul {
    padding-left: 5px !important;
  }
  ._2hduom {
    font-size: large;
  }
  .main1 {
    width: 100%;
    height: auto;
  }
  
  .pxiArt {
    width: 100%;
    position: center;
    height: 700px;
    position: relative;
  }
  .dbcsjn {
    position: absolute;
    left: 17%;
    bottom: 20px;
  }
  .main5 {
    margin-top: 8%;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  ._nEXRT li {
    align-items: inherit;
    min-width: 340px;
    width: auto;
  }
  ._6bnYTum {
    display: inline;
    background-color: white;
    color: red;
    border-radius: 8px;
  }
  ._73exMP {
    background-color: red;
    color: white;
    padding: 1px 3px;
    font-size: small;
    border-radius: 5px;
  }
  .barDotMenu {
    display: none;
  }
  .mob_view_sde {
    display: none;
  }
  @media screen and (max-width: 1100px) and (min-width: 400px) {
    .NBflx {
      display: none !important;
    }
    .barDotMenu {
      display: block;
    }
    .Mflx {
      justify-content: space-between;
    }
  }
  @media screen and (max-width: 400px) {
    .imgMustLgogo{
      width:150px !important;
    }
    .NBflx {
      display: none !important;
    }
    .barDotMenu {
      display: block;
    }
    .Mflx {
      justify-content: space-between;
    }
    
  }
`;
