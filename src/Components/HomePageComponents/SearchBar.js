import React from "react";
import styled from "styled-components";
import Search from "../../aadharhomes/Search";
import { Link } from "react-router-dom";
function SearchBar() {
  return (
    <Wrapper className="section">
      <div
        className="qsbWrapper pt-4 mr-auto ml-auto lg:mr-auto md:ml-auto md:mr-auto ml:ml-auto sm:mr-4 sm:ml-4  xs:py-2 lg:h-14 md:h-10 sm:h-8"
        style={{ maxWidth: "780px", marginTop: "110px" }}
      >
        <div className="SJDMls xl:h-14 lg:h-14 md:h-8 sm:h-8">
          <Link to='/buy-properties/best-resale-property-in-gurugram/'
            className="options active font-semibold hover:underline hover:underline-offset-8 cursor-pointer "
          >
            Buy
          </Link>
          <Link to='/rental-properties/best-rental-property-in-gurugram/'
            className="options font-semibold hover:underline hover:underline-offset-8 cursor-pointer "
          >
            Rent
          </Link>
          <Link to='/projects/upcoming-projects-in-gurgaon/'
            className="options font-semibold hover:underline  hover:underline-offset-8  cursor-pointer"
          >
             New Launch
          </Link>
          <Link to='/projects/commerial/'
            className="options font-semibold hover:underline hover:underline-offset-8 cursor-pointer"
          >  
            Commercial
          </Link>
          <Link to='/deendayal/plots/'
            className="options font-semibold hover:underline hover:underline-offset-8 cursor-pointer"
          >
            Land/Plots
          </Link>
          <Link to='/sco/plots/'
            className="options font-semibold hover:underline hover:underline-offset-8 cursor-pointer"
          >
           SCO
          </Link>
        </div>
        <Search />
      </div>
    </Wrapper>
  );
}

export default SearchBar;
const Wrapper = styled.section`
  font-weight: 400;
  line-height: 18px;
  div {
    box-sizing: border-box;
  }

  .qsbWrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .SJDMls {
    display: flex;
    box-shadow: 0 25px 60px rgba(113, 106, 147, 0.2);
    width: fit-content;
    border-radius: 20px 20px 0px 0px;
    background: #fff;
    margin-left: 32px;
  }
  .options {
    padding: 9px 30px 13px 30px;
    font-size: 16px;
  }
  // .options:hover {
  //   font-size: 18px;
  // }
  .SJDMls > div:hover {
    cursor: pointer;
  }
  .SJDMls > div.active {
    font-size: 20px;
    color: red;
  }
  @media screen and (max-width: 500px) {
    .SJDMls{
      display: none;
    }
  }
  @media screen and (max-width: 900px) {
    .qsbWrapper {
      margin: 8rem auto !important;
    }
    @media screen and (max-width: 640px) {
      .qsbWrapper {
        margin: 3rem auto !important;   
      }
    .suggestor-wrapper {
      width: 90%;
    }
    
  @media screen and (max-width: 500px) {
    .qsbWrapper {
      flex-direction: column-reverse;
      align-items: center;    
    }
  }
  @media screen and (max-width: 885px) and (min-width: 860px) {
    .qsbWrapper .qsb .keywordSugg .suggestor-box {
      width: 293px;
    }
  }
  @media screen and (max-width: 770px) and (min-width: 750px) {
    .qsbWrapper .qsb .keywordSugg .suggestor-box {
      width: 223px;
    }  
  }
  @media screen and (max-width: 1200px) and (min-width: 900px) {
    .qsbWrapper {
      margin: 10rem auto !important;
    }
  }
`;

// /** @format */

// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { Select, Input } from "@chakra-ui/react";
// import Locations from "./Locations";
// import Search from "../../aadharhomes/Search";
// //  replace all let with const
// function SearchBar() {
//   let [showText, setShowText] = useState(true);

//   useEffect(() => {
//     let divSelected = document.querySelectorAll(".options");
//     divSelected.forEach((div) => {
//       div.addEventListener("click", () => {
//         divSelected.forEach((div) => {
//           div.classList.remove("active");
//         });
//         div.classList.add("active");
//       });
//     });
//   }, []);

//   function setHandleState() {
//     setShowText(!showText);
//   }
//   return (
//     <Wrapper className='section'>
//       <div
//         className='qsbWrapper'
//         style={{ maxWidth: "800px", marginLeft: "auto", marginRight: "auto",marginTop:"130px" }}>
//         <div className='SJDMls'>
//           <div className='options active'>Buy</div>
//           <div className='options'>Rent</div>
//           <div className='options'>Sell</div>
//         </div>
//         <Search />
//       </div>
//     </Wrapper>
//   );
// }

// export default SearchBar;
// const Wrapper = styled.section`
//   font-weight: 400;
//   line-height: 18px;
//   font-family: "DM Sans", sans-serif;
//   div {
//     box-sizing: border-box;
//   }
//   .dsdwDD {
//     color: white;
//   }
//   .qsbWrapper {
//     display: flex;
//     justify-content: center;
//     flex-direction: column;

//   }
//   .qsbWrapper .qsb {
//     display: flex;
//     align-items: center;
//     padding: 12px 20px;
//     background: #fff;
//     box-sizing: border-box;
//     box-shadow: 0 0px 10px rgba(113, 106, 147, 0.2);
//     border-radius: 40px;
//   }
//   .qsbWrapper .qsb .searchIcon {
//     display: inline-block;
//     width: 24px;
//     height: 24px;
//     margin-right: 10px;
//   }
//   .qsbWrapper .qsb .suggestor-wrapper div:first-child div:first-child {
//     overflow-y: unset !important;
//   }
//   .qsbWrapper .qsb .suggestor-wrapper .suggestor-box {
//     border: none;
//     padding: unset;
//   }
//   .qsbWrapper .qsb .keywordSugg .suggestor-box {
//     width: 336.67px;
//   }
//   .suggestor-wrapper.active .suggestor-box {
//     border-color: #0078db !important;
//   }
//   .suggestor-wrapper .suggestor-box {
//     position: relative;
//     width: 100%;
//     border: 1px solid #dbdde6;
//     border-radius: 4px;
//     padding: 4px 12px;
//   }
//   .flex-wrap {
//     flex-wrap: wrap;
//   }
//   .flex-row {
//     display: flex;
//   }
//   .qsbWrapper .qsb .suggestor-wrapper .suggestor-box .suggestor-input {
//     font-weight: 500;
//     font-size: 18px;
//     line-height: 23px;
//     color: #121224;
//     font-family: "DM Sans", sans-serif;
//   }
//   input {
//     box-sizing: border-box;
//   }
//   .qsbWrapper .qsb .suggestor-wrapper .suggestor-box .suggestor-input {
//     font-weight: 500;
//     font-size: 18px;
//     line-height: 23px;
//     color: #121224;
//   }
//   .suggestor-wrapper .suggestor-box .suggestor-input {
//     border: none;
//     flex-grow: 1;
//     min-width: 145px;
//     font-size: 14px;
//     line-height: 20px;
//     color: #091e42;
//     padding: 8px 0;
//     font-weight: 500;
//   }
//   .qsbWrapper .qsb .verticalTrack {
//     background: none !important;
//     border-radius: 42px !important;
//   }
//   div .horizontalTrack,
//   div .verticalTrack {
//     opacity: 0 !important;
//     transition: all 0.3s !important;
//   }
//   .qsbWrapper .qsb .pipe {
//     border: 1px solid #e7e7f1;
//     height: 20px;
//     margin: 0 10px;
//     background-color: #e7e7f1;
//   }
//   .qsbExperience {
//     padding-top: 4px;
//     padding-left: 10px;
//     margin-right: 10px;
//   }
//   .qsbExperience .dropdownMainContainer {
//     border: none;
//     padding: 8px 0;
//   }
//   .dropdownMainContainer {
//     position: relative;
//     min-width: 50px;
//     min-height: 40px;
//     display: inline-block;
//     vertical-align: middle;
//     border: 1px solid #dcdcdc;
//     padding: 6px 10px;
//     background: #fff;
//   }
//   .qsbExperience .dropdownMainContainer #expereinceDD {
//     font-weight: 500;
//     font-size: 18px;
//     line-height: 23px;
//     color: #121224;
//     padding: 0;
//     width: 100%;
//     text-shadow: none;
//     font-family: "DM Sans", sans-serif;
//   }
//   input[type="text"] {
//     color: #000;
//     border: none;
//     outline: none;
//   }
//   .dropdownMainContainer input[type="text"] {
//     color: #000;
//     border: none;
//     outline: none;
//     box-sizing: border-box;
//     margin-bottom: 0;
//     padding: 4px 20px 4px 0;
//     text-overflow: ellipsis;
//     white-space: nowrap;
//     overflow: hidden;
//   }
//   .qsbExperience .dropdownMainContainer .dropArrowDD {
//     content: url("//static.naukimg.com/s/7/103/i/onethemearrow.47af214b.svg");
//     -webkit-transform: unset;
//     transform: unset;
//     width: unset;
//     height: unset;
//     color: #474d6a;
//     top: 13px;
//     right: 0;
//   }
//   .dropdownMainContainer span.dropArrowDD {
//     position: absolute;
//     font-size: 23px;
//     transform-origin: 0 0;
//     cursor: pointer;
//   }
//   .qsbExperience .dropdownMainContainer .dropDownPrimaryContainer {
//     width: 213px;
//     border-radius: 16px;
//     top: 51px;
//     left: -20px;
//     z-index: 1;
//   }
//   .dropdownMainContainer .dropDownPrimaryContainer {
//     display: none;
//     position: absolute;
//     top: 39px;
//     left: -1px;
//     background: #fff;
//     z-index: 99;
//     width: 100%;
//   }
//   .qsbExperience
//     .dropdownMainContainer
//     .dropDownPrimaryContainer
//     .dropdownContainer {
//     border-radius: 16px;
//     box-shadow: 0 6px 12px rgba(30, 10, 58, 0.04);
//     box-shadow: 0 6px 12px var(--Ev200, rgba(30, 10, 58, 0.04));
//   }
//   .dropdownMainContainer .dropdownContainer {
//     max-height: 300px;
//     overflow: hidden;
//     display: none;
//     min-width: 100%;
//     box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
//     position: relative;
//     top: 0;
//     border-top: 0;
//     border-left: 0;
//   }
//   .qsbExperience
//     .dropdownMainContainer
//     .dropDownPrimaryContainer
//     .dropdownContainer
//     .dropdownPrimary {
//     height: 58px !important;
//     width: 213px !important;
//     min-width: 213px !important;
//   }
//   .dropdownMainContainer .dropdownContainer .dropdownPrimary {
//     float: left;
//   }
//   .qsbWrapper .qsb .qsbSubmit {
//     margin-left: 44px;
//     padding: 10px 35px;
//     font-weight: 700;
//     font-size: 16px;
//     line-height: 20px;
//     background: red;
//     border-radius: 40px;
//     color: #fff;
//     cursor: pointer;
//   }
//   .qsbWrapper .qsb .locationSugg {
//     margin-left: 10px;
//   }
//   .qsbWrapper .qsb .suggestor-wrapper .suggestor-box .suggestor-input {
//     font-weight: 500;
//     font-size: 18px;
//     line-height: 23px;
//     color: #121224;
//   }
//   .qsbWrapper .qsb .locationSugg .suggestor-input {
//     min-width: 123px;
//   }
//   .qsbWrapper .errorMsg {
//     display: none;
//     margin-left: 33px;
//     margin-top: 4px;
//     font-weight: 500;
//     font-size: 12px;
//     line-height: 15px;
//     color: #f04141;
//   }
//   .qsbWrapper .qsb .qsbSubmit:active {
//     transform: scale(0.9);
//     transition: all 0.2s linear;
//   }
//   .qsbWrapper .qsb .qsbSubmit:not(:active) {
//     transform: scale(1);
//     transition: all 0.2s linear;
//   }
//   .SJDMls {
//     display: flex;
//     box-shadow: 0 25px 60px rgba(113, 106, 147, 0.2);
//     width: fit-content;
//     border-radius: 20px 20px 0px 0px;
//     background: #fff;
//     margin-left: 32px;
//   }
//   .options {
//     padding: 20px 30px 13px 30px;
//     font-size: 16px;
//   }
//   .options:hover {
//     font-size: 18px;
//   }
//   .dropdownMainContainer .dropDownPrimaryContainer.dropdownShow {
//     display: inline-block;
//   }
//   .dropdownMainContainer .dropdownContainer.dropdownShow {
//     display: inline-block;
//   }
//   .dropdownMainContainer .dropDownPrimaryContainer.dropdownShow {
//     display: inline-block;
//   }
//   .qsbExperience
//     .dropdownMainContainer
//     .dropDownPrimaryContainer
//     .dropdownContainer
//     .dropdownPrimary {
//     height: 100px !important;
//     width: 213px !important;
//     min-width: 213px !important;
//   }
//   .dropdownMainContainer .dropdownContainer .dropdownPrimary {
//     float: left;
//   }
//   .qsbExperience .dropdownMainContainer #sa-dd-scrollexpereinceDD {
//     max-height: 188px !important;
//   }
//   .dropdownMainContainer .dropdownContainer .dropdownPrimary > div > div {
//     box-sizing: content-box;
//     overflow-x: hidden !important;
//     margin-bottom: 0 !important;
//   }
//   .qsbExperience
//     .dropdownMainContainer
//     .dropDownPrimaryContainer
//     .dropdownContainer
//     .dropdownPrimary
//     .verticalTrack {
//     padding: 10px 0;
//   }
//   .dropdown {
//     margin: 0;
//     padding: 0;
//     background: #fff;
//   }
//   .qsbExperience
//     .dropdownMainContainer
//     .dropDownPrimaryContainer
//     .dropdownContainer
//     ul
//     li {
//     padding: 10px 12px;
//     font-weight: 500;
//     font-size: 14px;
//     line-height: 18px;
//     color: #121224;
//     margin-bottom: -8px;
//   }
//   .dropdown li {
//     padding: 10px;
//     font-size: 14px;
//     white-space: nowrap;
//     color: #4a4a4a;
//     text-overflow: ellipsis;
//   }
//   .dropdown,
//   .dropdown li {
//     width: inherit;
//     overflow: hidden;
//   }
//   .qsbExperience
//     .dropdownMainContainer
//     .dropDownPrimaryContainer
//     .dropdownContainer
//     ul
//     li.active {
//     color: #121224 !important;
//     background: #f7f7f9 !important;
//   }
//   .qsbExperience
//     .dropdownMainContainer
//     .dropDownPrimaryContainer
//     .dropdownContainer
//     ul
//     li.active {
//     color: #121224 !important;
//     background: #f7f7f9 !important;
//   }
//   .qsbExperience
//     .dropdownMainContainer
//     .dropDownPrimaryContainer
//     .dropdownContainer
//     ul
//     li
//     div {
//     cursor: pointer;
//   }
//   .qsbExperience
//     .dropdownMainContainer
//     .dropDownPrimaryContainer
//     .dropdownContainer
//     ul
//     li
//     .sublabel {
//     font-size: 12px;
//     line-height: 15px;
//     font-weight: 15px;
//     color: #717b9e;
//     margin-left: 6px;
//   }
//   .dropdown li span + span {
//     text-overflow: ellipsis;
//     white-space: nowrap;
//     overflow: hidden;
//     font-size: 14px;
//   }
//   span {
//     font-size: 15px !important;
//     padding-right: 2% !important;
//   }
//   .SJDMls > div:hover {
//     cursor: pointer;
//   }
//   .SJDMls > div.active {
//     font-size: 20px;
//     color: red;
//   }
//   @media screen and (max-width: 500px) {
//     .eEbfFv,
//     .SJDMls,
//     .qsbExperience,
//     .locationSugg,
//     .pipe {
//       display: none;
//     }
//     .qsb {
//       overflow: hidden;
//       width: 100%;
//     }
//     .keywordSugg {
//       width: 100%;
//       overflow: hidden;
//     }
//     .plMDJ12 {
//       overflow: hidden !important;
//     }
//     .qsbWrapper .qsb .qsbSubmit {
//       padding: 10px 10px !important;
//     }
//     .qsbWrapper .qsb .searchIcon {
//       display: none;
//     }
//     .qsbWrapper {
//       margin: 8% 3% 10% 5% !important;
//     }
//     .bVKmXz {
//       display: none;
//     }
//   }
//   @media screen and (max-width: 900px) {
//     .qsbWrapper {
//       margin: 8% 2% 10% 2% !important;
//     }
//     .suggestor-wrapper {
//       width: 90%;
//     }
//     .plMDJ12 {
//       overflow: hidden !important;
//     }
//     .qsbWrapper .qsb .keywordSugg .suggestor-box {
//       width: 223px;
//     }
//     .qsbWrapper .qsb .qsbSubmit {
//       padding: 15px 15px !important;
//     }
//   }
//   @media screen and (max-width: 885px) and (min-width: 860px) {
//     .qsbWrapper .qsb .keywordSugg .suggestor-box {
//       width: 293px;
//     }
//   }
//   @media screen and (max-width: 770px) and (min-width: 750px) {
//     .qsbWrapper .qsb .keywordSugg .suggestor-box {
//       width: 223px;
//     }
//     .qsbWrapper .qsb .qsbSubmit {
//       padding: 8px 8px !important;
//       margin-left: 0px !important;
//     }
//   }
//   @media screen and (max-width: 1200px) and (min-width: 900px) {
//     .qsbWrapper {
//       margin: 4.5em auto !important;
//     }
//   }
// `;
