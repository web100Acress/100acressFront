import React, { useState } from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
function Cities() {
  const [selectedRoad, setSelectedRoad] = useState(null); 

  const handleClick = (roadName) => {
    setSelectedRoad(roadName);
  };
  
  return (
    <Wrapper className="section ">
      <div className="dffasPL">
      <div className="flex items-center pt-2">
            <h1 className="text-xl xl:text-4xl lg:text-3xl md:text-2xl  text-center ml-12 sm:text-left ">
            Gurugram Prime Locations
            </h1>
          </div>
        <div className="gdmJO d-flex justify-content-between px-4 text-center align-items-center">
          <div className="cvBMLN text-justify">
            <Link to={`/property-in-gurugram/sohna-road/`} target="_top">
              <div
                className={`asdDRsfVN bg-one ${
                  selectedRoad === "Sohna Road" ? "selected" : ""
                }`}
                onClick={() => handleClick("Sohna Road")}
              >
                <p className="items-center">Sohna Road</p>
              </div>
            </Link>
          </div>

          <div className="cvBMLN">
            <Link to={`/property-in-gurugram/golf-course/`} target="_top">
              <div
                className={`asdDRsfVN bg-two ${
                  selectedRoad === "Golf Course" ? "selected" : ""
                }`}
                onClick={() => handleClick("Golf Course")}
              >
                <p>Golf Course Road</p>
              </div>
            </Link>
          </div>

          <div className="cvBMLN">
            <Link to={`/property-in-gurugram/mg-road/`} target="_top">
              <div
                className={`asdDRsfVN bg-three  ${
                  selectedRoad === "MG Road" ? "selected" : ""
                }`}
                onClick={() => handleClick("MG Road")}
              >
                <p>MG Road</p>
              </div>
            </Link>
          </div>

          <div className="cvBMLN">
            <Link to={`/property-in-gurugram/northern-peripheral-road/`} target="_top">
              <div
                className={`asdDRsfVN bg-four ${
                  selectedRoad === "Northern Peripheral Road" ? "selected" : ""
                }`}
                onClick={() => handleClick("Northern Peripheral Road/")}
              >
                <p className="">Northern Peripheral Road</p>
              </div>
            </Link>
          </div>

          <div className="cvBMLN text-justify">
            <Link to={`/property-in-gurugram/dwarka-expressway/`} target="_top">
              <div
                className={`asdDRsfVN bg-five ${
                  selectedRoad === "Dwarka Expressway" ? "selected" : ""
                }`}
                onClick={() => handleClick("Dwarka Expressway")}
              >
                <p className="items-center">Dwarka Expressway</p>
              </div>
            </Link>
          </div>

          <div className="cvBMLN">
            <Link to={`/property-in-gurugram/new-gurgaon/`} target="_top">
              <div
                className={`asdDRsfVN bg-six  ${
                  selectedRoad === "New Gurgaon" ? "selected" : ""
                } `}
                onClick={() => handleClick("New Gurgaon")}
              >
                <p>New Gurgaon</p>
              </div>
            </Link>
          </div>

          <div className="cvBMLN">
            <Link to={`/property-in-gurugram/sohna/`} target="_top">
              <div
                className={`asdDRsfVN bg-seven  ${
                  selectedRoad === "Sohna" ? "selected" : ""
                }`}
                onClick={() => handleClick("Sohna")}
              >
                <p>Sohna</p>
              </div>
            </Link>
          </div>

          <div className="cvBMLN">
            <Link to={`/property-in-gurugram/southern-peripheral-road/`} target="_top">
              <div
                className={`asdDRsfVN bg-eight ${
                  selectedRoad === "Southern Peripheral Road" ? "selected" : ""
                }`}
                onClick={() => handleClick("Southern Peripheral Road")}
              >
                <p>Southern Peripheral Road</p>
              </div>
            </Link>
          </div>

          <div className="cvBMLN text-justify">
            <Link to={`/property-in-gurugram/nh-48/`} target="_top">
              <div
                className={`asdDRsfVN bg-nine ${
                  selectedRoad === "NH-48" ? "selected" : ""
                }`}
                onClick={() => handleClick("NH-48")}
              >
                <p className="items-center">NH-48</p>
              </div>
            </Link>
          </div>

          <div className="cvBMLN">
            <Link to={`/property-in-gurugram/golf-course-extn-road/`} target="_top">
              <div
                className={`asdDRsfVN bg-ten ${
                  selectedRoad === "Golf Course Extn Road" ? "selected" : ""
                }`}
                onClick={() => handleClick("Golf Course Extn Road")}
              >
                <p>Golf Course Extn Road</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Cities;

const Wrapper = styled.section`
  .dffasPL {
    background-color: #f1f1fe;
    padding-top: 10px;
    padding-bottom: 20px;
  }

  .bc-rd-23 {
    border-radius: 23px;
  }

  .bc-rd-15 {
    border-radius: 15px;
  }

  .ft-sz-15 {
    font-size: 15px;
  }

  .ft-sz-30 {
    font-size: 30px;
  }

  .ft-sz-25 {
    font-size: 25px;
  }

  .gdmJO {
    flex-wrap: wrap;
    max-width: 1500px;
    margin-left: auto;
    margin-right: auto;
    justify-content: space-between;
  }

  .cvBMLN {
    width: calc(20% - 20px); /* Adjusted width and margin */
    margin: 10px;
    height: 250px;
    border: 3px solid #eee;
    overflow: hidden;
    position: relative;
    float: left;
    display: inline-block;
    cursor: pointer;
    border-radius: 13px;
    text-align: center;
  }

  .asdDRsfVN {
    height: 100%;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
  }

  .bg-one {
    background-image: url(../../OtherImages/sohnaroad.webp);
    background-position: center;
  }

  .bg-two {
    background-image: url(../../OtherImages/golfcourse.webp);
    background-position: center;
  }

  .bg-three {
    background-image: url(../../OtherImages/mgroad.webp);
    background-position: center;
  }

  .bg-four {
    background-image: url(../../OtherImages/sikanderpur.webp);
    background-position: center;
  }

  .bg-five {
    background-image: url(../../OtherImages/capture1.webp);
    background-position: center;
  }

  .bg-six {
    background-image: url(../../OtherImages/capture2.webp);
    background-position: center;
  }

  .bg-seven {
    background-image: url(../../OtherImages/capture3.webp);
    background-position: center;
  }

  .bg-eight {
    background-image: url(../../OtherImages/bgseven.webp);
    background-position: center;
  }

  .bg-nine {
    background-image: url(../../OtherImages/capture5.webp);
    background-position: center;
  }

  .bg-ten {
    background-image: url(../../OtherImages/capture6.webp);
    background-position: center;
  }
  .bg-one:hover,
  .bg-two:hover,
  .bg-three:hover,
  .bg-four:hover,
  .bg-five:hover,
  .bg-six:hover,
  .bg-seven:hover,
  .bg-eight:hover,
  .bg-nine:hover,
  .bg-ten:hover {
    // filter: grayscale(0.80);
    opacity: 1;
    // filter: brightness(90%);
    filter: gray saturate(0%) brightness(70%) contrast(1000%);
  }

  .cvBMLN:hover .asdDRsfVN,
  .cvBMLN:focus .asdDRsfVN {
    -ms-transform: scale(1.2);
    -moz-transform: scale(1.2);
    -webkit-transform: scale(1.2);
    -o-transform: scale(1.2);
    transform: scale(1.2);
  }

  .cvBMLN p {
    position: absolute;
    bottom: 0px;
    left: 10%;
    right: 10%;
    font-weight: bold;
    color: white;
    transition: 0.5s;
  }

  .cvBMLN:hover p {
    bottom: 35%;
  }

  @media screen and (max-width: 900px) {
    .cvBMLN {
      width: calc(45% - 10px); /* Adjusted width for tablet screens */
    }
  }

  @media screen and (max-width: 425px) {
    .cvBMLN {
      width: 100%;
    }
  }
`;
