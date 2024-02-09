import React from 'react';
import { styled } from 'styled-components';

function Cities() {
  return (
    <Wrapper className="section ">
      <div className="dffasPL">
        <p className="px-10 font-semibold text-xl xl:text-4xl lg:text-3xl pt-4 md:text-2xl">Gurgaon Prime Locations</p>

        <div className="gdmJO d-flex justify-content-between px-4 text-center align-items-center">
          <div className="cvBMLN text-justify">
            <div className="asdDRsfVN bg-one ">
              <p className='items-center'>Sohna Road</p>
            </div>
          </div>
          <div className="cvBMLN">
            <div className="asdDRsfVN bg-two">
              <p>Golf Course</p>
            </div>
          </div>
          <div className="cvBMLN">
            <div className="asdDRsfVN bg-three">
              <p>MG Road</p>
            </div>
          </div>
          <div className="cvBMLN">
            <div className="asdDRsfVN bg-four ">
              <p className=''>Sikanderpur</p>
            </div>
          </div>
          <div className="cvBMLN text-justify">
            <div className="asdDRsfVN bg-five ">
              <p className='items-center'>Dwarka Expressway</p>
            </div>
          </div>
          <div className="cvBMLN">
            <div className="asdDRsfVN bg-six">
              <p>New Gurgaon</p>
            </div>
          </div>
          <div className="cvBMLN">
            <div className="asdDRsfVN bg-seven">
              <p>Central Gurgaon</p>
            </div>
          </div>
          <div className="cvBMLN">
            <div className="asdDRsfVN bg-eight ">
              <p className=''> Peripheral Road</p>
            </div>
          </div>
          <div className="cvBMLN text-justify">
            <div className="asdDRsfVN bg-nine ">
              <p className='items-center'>NH-48</p>
            </div>
          </div>
          <div className="cvBMLN">
            <div className="asdDRsfVN bg-ten">
              <p>Golf Course Road</p>
            </div>
          </div>
        </div>
     
      </div>
    </Wrapper>
  );
}

export default Cities;

const Wrapper = styled.section`
  .dffasPL {
    background-color: #F1F1FE;
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
    background-image: url(../../OtherImages/sohnaRoad.png);
    background-position: center;
  }

  .bg-two {
    background-image: url(../../OtherImages/golfCourse.jpg);
    background-position: center;
  }

  .bg-three {
    background-image: url(../../OtherImages/mgRoad.jpg);
    background-position: center;
  }

  .bg-four {
    background-image: url(../../OtherImages/sikanderpur.jpg);
    background-position: center;
  }

  .bg-five {
    background-image: url(../../OtherImages/capture1.PNG);
    background-position: center;
  }


  .bg-six {
    background-image: url(../../OtherImages/capture2.PNG);
    background-position: center;
  }

  .bg-seven {
    background-image: url(../../OtherImages/capture3.PNG);
    background-position: center;
  }

  .bg-eight {
    background-image: url(../../OtherImages/capture4.PNG);
    background-position: center;
  }

  .bg-nine {
    background-image: url(../../OtherImages/capture5.PNG);
    background-position: center;
  }

  .bg-ten {
    background-image: url(../../OtherImages/capture6.PNG);
    background-position: center;
  }
  .bg-one:hover,
  .bg-two:hover,
  .bg-three:hover,
  .bg-four:hover {
    filter: grayscale(0.60);
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
