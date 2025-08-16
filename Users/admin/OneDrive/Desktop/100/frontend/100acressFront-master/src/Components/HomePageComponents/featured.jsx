/** @format */

import React from "react";
import { styled } from "styled-components";
import { useProductContext } from "../../Context/productContext";
import { Link } from "react-router-dom";

function FeaturedSection() {
  const {PreLuanchByBuilder} =useProductContext();
  
  return (
    <Wrapper className='section'>
      <div className="Hayein">
        <div className='sshdNBC d-flex justify-content-around align-items-center flex-wrap'>
        {PreLuanchByBuilder.map((elem)=>{
          const URL=`/${elem.url}/`
          const name=elem.builderName.charAt(0).toUpperCase() + elem.builderName.slice(1);
          const Status=elem.status.charAt(0).toUpperCase() + elem.status.slice(1);
          const CityUpper = elem.city.charAt(0).toUpperCase() + elem.city.slice(1);
          const Configurations = elem.configuration.replaceAll("-",",")
          return (
            <div className='flex1 mt-3 mb-3'>
            <Link to={URL} target="_blank">
            <div className='dkMMCKpP'>
              <img
                src={elem.photo[0].url}
                alt='builder Image'
                className='rounded'
              />
            </div>
            <div className='pad'>
              <p className='ft-sz-25 _2rhE-'>{elem.projectName}</p>
              <p className='ft-cl-gr'>{CityUpper} · {elem.location} </p>
              <div className="_1Hy63 d-flex justify-content-between align-items-center">
              <div style={{width:"fit-content"}}> 
                <p className='smallText _2rhE- li-ht-22'>{name} · {Status}</p>
                <p className='smallText _2rhE- li-ht-22'>{Configurations}</p>
              </div>
              </div>
            </div>
            </Link>
          </div>
          )
        })}
          
          </div>
      </div>
    </Wrapper>
  );
}

export default FeaturedSection;
const Wrapper = styled.section`
  .pad {
    padding: 24px;
  }
  .ft-sz-25 {
    font-size: 25px;
  }
  .ft-cl-gr {
    color: #787d9c;
  }
  .li-ht-22{
  line-height: 22px;
  }
  ._31INB {
    padding: 24px;
  }
  p {
    margin-top: 0px;
    margin-bottom: 0px;
  }
  .Hayein{
    margin: 20px 80px 50px;
  }
  .dkMMCKpP {
    width: 544px;
    height: 272px;
  }
  .dkMMCKpP img {
    width: 100%;
    height: 100%;
    border-radius: 16px 16px 0px 0px !important;
  }
  ._1Hy63 {
    margin-top: 12px;
    white-space: pre-wrap;
}
.JSJBSm img{
  width:100%;
  height:100%;
}
  .flex1:hover {
    cursor: pointer;
    transform:scale(1.02);
    transition: all .5s;
  }
  .flex1:not(:hover) {
    transform:scale(1);
    transition: all .5s;
  }
  ._2rhE- {
    color: #1a2258;
  }
  .smallText {
    font-size: medium;
  }
  .flex1 {
    box-shadow: 0 0 30px 0 #0000001a;
    border-radius: 16px;
    width: 544px;
  }
  @media screen and (max-width: 600px) {
    margin: 8% auto;
    .dkMMCKpP{
      width:100%;
    }
    .flex1 {
      width: 350px;
    }
    .Hayein{
      margin:0px;
    }
  }
  @media screen and (max-width: 370px) {
    margin: 8% auto;
    .flex1 {
      width: 320px;
    }
    .Hayein{
      margin:0px;
    }
  }
`;
