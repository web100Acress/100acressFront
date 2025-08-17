import React, { useState } from "react";
import Image from "../../Images/100acress.png";
import { BsFolder } from "react-icons/bs";
import styled from "styled-components";
import { GiFamilyHouse } from "react-icons/gi";
import { MdStoreMallDirectory } from "react-icons/md";
import { MdRocketLaunch } from "react-icons/md";
import { GiSpectacles } from "react-icons/gi";
import { GiVillage } from "react-icons/gi";
import { HiBars3 } from "react-icons/hi2";
import { ABOUT, BLOG, KNOWABOUT, LOGIN, ROOT } from "../../lib/route";
import { Link, Navigate } from "react-router-dom";
import AuthModal from "../AuthModal";
import { RxCross2 } from "react-icons/rx";

function FinalNavBar() {
  const [showNav, setShowNav] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const URL="/projects"
  return (
    <Wrapper className='section'>
      
      
      <div className='Mflx'>
      
        <div className='1euNB' style={{cursor:"pointer"}}>
          <Link to={ROOT}>
            <img src="../../Images/mainLogo.png" alt='' width='200' loading="lazy"/>
            
            
          </Link>
        </div>
        <div
          className='barDotMenu'
          style={{ width: "fit-content", marginBottom: "5px",marginTop: "5px" }}>
          <HiBars3 size={35} color='white' onClick={() => setShowNav(!showNav)} />
        </div>

        {showNav && (
          <div
            className='position-absolute h-100 '
            style={{
              background: "#e53e3e",
              zIndex: "999",
              width: "97%",
            }}>
            <div className='d-flex align-items-center justify-content-between  pr-3'>
              <div className='1euNB'>
                <img src="../../Images/mainLogo.png" alt='' width='200' loading="lazy"/>
                
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
            <div className='MBflx' style={{background:"#e53e3e"}}>
          <ul className='ulfx _1grx flex-column'>
            <li className='pxrE el1'>
              <span className='pxrETXT'>
                <a>Buy</a>
              </span>
            </li>
            <li>
              <span className='pxrETXT'>
                <a>Rent</a>
              </span>
              
            </li>
            <li className='_3px49x '>
              <span className='pxrETXT'>
                <a>Sell</a>
              </span>
            </li>

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
                <a>New Launches</a>
              </span>
              
            </li>
            <li className='_3px49x'>
              <span className='pxrETXT'>
                <a>Properties</a>
              </span>
            </li>

            {/* Inserted primary nav links */}
            <li>
              <Link to="/rental" className='linkEl'>Rental</Link>
            </li>
            <li>
              <Link to="/resale" className='linkEl'>Resale</Link>
            </li>

            <li>
              <Link to={BLOG} className='linkEl'>
                Blog
              </Link>
            </li>
          </ul>
          <ul className='ulfx _2grx flex-column'>
            <li className='_6bnYTum' role="button" aria-label="List Property">
              <span className='_lpText'>LIST PROPERTY</span>
              <span className='_73exMP'>FREE</span>
            </li>
            <li>
              <Link to="/rental" className='linkEl'>Rental</Link>
            </li>
            <li>
              <Link to="/resale" className='linkEl'>Resale</Link>
            </li>
            <li>
              <a className='linkEl' onClick={() => setShowAuth(true)} role="button">Login</a>
            </li>
          </ul>
        </div>
          </div>
        )}
        <div className='NBflx'>
          <ul className='ulfx _1grx' style={{marginTop:"8px"}}>
            <li className='pxrE el1'>
              <span className='pxrETXT'>
                <a>Buy</a>
              </span>
              <ul className='_2emBLM'>
                <li className='_3emBLMe'>
                  <span className='_2kdSPM'>RESIDENCIAL</span>
                  <ul className='_3euEM _1uef'>
                    <li>Villas for Sale</li>
                    <li>Duplex for Sale</li>
                    <li>Houses for Sale</li>
                    <li>Bungalow for Sale</li>
                    <li>Apartments for Sale</li>

                    <hr style={{ margin: "7px 0px" }} />
                    <li>All Residencial for Sale</li>
                  </ul>
                </li>
                <li className='_3emBLMe'>
                  <span className='_2kdSPM'>COMMERCIAL</span>
                  <ul className='_3euEM _2uef'>
                    <li>Retail for Sale</li>
                    <li>Offices for Sale</li>
                    <li>Industrial for Sale</li>
                    <li>Warehouses for Sale</li>
                    <li>Shophouses for Sale</li>
                    <hr style={{ margin: "7px 0px" }} />
                    <li>All Commercial for Sale</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <span className='pxrETXT'>
                <a>Rent</a>
              </span>
              <ul className='_2emBLM'>
                <li className='_3emBLMe'>
                  <span className='_2kdSPM'>RESIDENCIAL</span>
                  <ul className='_3euEM _1uef'>
                    <li>Villas for Rent</li>
                    <li>Duplex for Rent</li>
                    <li>Houses for Rent</li>
                    <li>Bungalow for Rent</li>
                    <li>Apartments for Rent</li>

                    <hr style={{ margin: "7px 0px" }} />
                    <li>All Residencial for Rent</li>
                  </ul>
                </li>
                <li className='_3emBLMe'>
                  <span className='_2kdSPM'>COMMERCIAL</span>
                  <ul className='_3euEM _2uef'>
                    <li>Retail for Rent</li>
                    <li>Offices for Rent</li>
                    <li>Industrial for Rent</li>
                    <li>Warehouses for Rent</li>
                    <li>Shophouses for Rent</li>
                    <hr style={{ margin: "7px 0px" }} />
                    <li>All Commercial for Rent</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className='_3px49x _exJRE'>
              <span className='pxrETXT'>
                <a>Sell</a>
              </span>
              <ul className='_2emBLM'>
                <li className='_3emBLMe'>
                  <span className='_2kdSPM _elm'>Post as Owner</span>
                  <ul className='_3euEM _1uef'>
                    <li className='_lmxE pplf'>
                      <div className='amidd'>
                        <GiFamilyHouse size='40' />
                      </div>
                      <div className='exori'>
                        <p className='_2hduom'>Residencial</p>
                        <span className='_2hskbj'>Houses, Complexes</span>
                      </div>
                    </li>
                    <li className='_lmxE pplf'>
                      <div className='amidd'>
                        <MdStoreMallDirectory size='40' />
                      </div>
                      <div className='exori'>
                        <p className='_2hduom'>Commercial</p>
                        <span className='_2hskbj'>Offices, Shops</span>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>

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
                <a>New Launches</a>
              </span>
              <ul className='_2emBLM _nEXRT'>
                <li className='_3emBLMe'>
                  <ul className='_3euEM _1uef'>
                    <li className='_lmxE pplf'>
                      <div className='amidd'>
                        <MdRocketLaunch size='35' />
                      </div>
                      <div className='exori'>
                        <p className='_2hduom'>New Launches In Gurgaon</p>
                        <span className='_2hskbj'>
                          See the Most recent to hit the market
                        </span>
                      </div>
                    </li>

                    <li className='_lmxE pplf'>
                      <Link to={KNOWABOUT} className='linkEl'>
                        <div className='amidd'>
                          <GiSpectacles size='35' />
                        </div>

                        <div className='exori'>
                          <p className='_2hduom'>New Launches Knowabouts</p>
                          <span className='_2hskbj'>
                            Drive into the Collections
                          </span>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
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
            <li>
              <BsFolder />
            </li>
            <li className='_6bnYTum' role="button" aria-label="List Property">
              <span className='_lpText'>LIST PROPERTY</span>
              <span className='_73exMP'>FREE</span>
            </li>
            <li>
              <Link to="/rental" className='linkEl'>Rental</Link>
            </li>
            <li>
              <Link to="/resale" className='linkEl'>Resale</Link>
            </li>
            <li>
              <a className='linkEl' onClick={() => setShowAuth(true)} role="button">Login</a>
            </li>
          </ul>
        </div>
      </div>
      {/* Auth Modal */}
      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} defaultView="register" />
    </Wrapper>
  );
}

export default FinalNavBar;
const Wrapper = styled.section`
position:sticky;
top:0px;
z-index:9999;
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
  /* Ensure right action links are visible on desktop (white header bg) */
  .NBflx ._2grx .linkEl {
    color: #e53e3e !important;
    font-weight: 600;
  }
  .NBflx ._2grx .linkEl:hover {
    color: #b91c1c !important;
  }
  /* Keep mobile drawer links white on red background */
  .MBflx ._2grx.flex-column .linkEl {
    color: #ffffff !important;
  }
  .Mflx {
    display: flex;
    align-items: center;
    background:red;
    padding: 0px 10px;
    border-radius:0px 0px 10px 10px;
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
  /* List Property pill */
  ._6bnYTum {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 22px 6px 14px; /* extra right space for badge */
    color: #e53e3e;
    border: 1.6px solid #e53e3e;
    background: #ffffff; /* ensure contrast on red navbar */
    border-radius: 9999px;
    font-weight: 600;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    overflow: visible; /* allow badge to show */
    z-index: 3;
  }
  ._6bnYTum:hover {
    box-shadow: 0 6px 16px rgba(229, 62, 62, 0.15);
    background: #ffffff;
  }
  ._lpText {
    letter-spacing: 0.4px;
    font-size: 12px;
  }
  /* FREE badge */
  ._73exMP {
    position: static; /* inline inside pill */
    background-color: #facc15; /* yellow-400 */
    color: #111827; /* gray-900 */
    padding: 2px 6px;
    font-size: 10px;
    font-weight: 800;
    border-radius: 4px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
    line-height: 1;
    margin-left: 6px;
    pointer-events: none; /* do not block clicks */
  }
  /* Ensure nav items don't clip the badge */
  .ulfx._2grx li,
  .ulfx._2grx.flex-column li {
    overflow: visible;
    position: relative;
  }
  .barDotMenu {
    display: none;
  }
  .mob_view_sde {
    display: none;
  }
  @media screen and (max-width: 1100px) and (min-width: 400px) {
    .NBflx {
      display: none;
    }
    .barDotMenu {
      display: block;
    }
    .Mflx {
      justify-content: space-between;
    }
  }
  @media screen and (max-width: 400px) {
    .NBflx {
      display: none;
    }
    .barDotMenu {
      display: block;
    }
    .Mflx {
      justify-content: space-between;
    }
  }
`;
