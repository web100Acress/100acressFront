import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import styled from "styled-components";
import StarCard from "./Card";
import { useProductContext } from "../../Context/productContext";

function SimilarCarousel() {
  const{PreLuanchSimilarProperties} = useProductContext();
  
  let Elem =[...PreLuanchSimilarProperties];
  
  if (Elem.length === 0) {
    return (
      <Wrapper className="section">
        <div></div>
      </Wrapper>
    );
  }

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1200 }, items: 4 },
    desktop: { breakpoint: { max: 1200, min: 992 }, items: 3 },
    tablet: { breakpoint: { max: 992, min: 768 }, items: 2 },
    mobile: { breakpoint: { max: 768, min: 0 }, items: 1 }
  };

  return (
    <Wrapper className="section">
    <div className="caroStyle">
      <Carousel
        swipeable
        draggable
        arrows
        infinite={false}
        responsive={responsive}
        slidesToSlide={1}
        customTransition="transform 500ms ease"
        transitionDuration={500}
      >
        {Elem.map((elem)=>{
            return <StarCard key={elem.id} {...elem}/>
        })}
      </Carousel>
    </div>
    </Wrapper>
  );
}

export default SimilarCarousel;

const Wrapper=styled.section`
.caroStyle{
  width:88vw;
  margin:2% auto 5% auto;
}
.slMJOW{
  padding:8px 18px 14px 18px ;
  border-radius:100%;
  box-shadow: 0 0 30px 5px rgba(35,35,35,.5);
  z-index: 99!important;
  color:#0a9e88;
  font-size:23px;
  background:white;
}
.slMJOW:hover{
  cursor:pointer;
}
.styles-module_carousel-base__3keqD >div:nth-child(1){
  position: absolute;
    z-index: 99;
    top: 30%;
    left: -30px;
}
.styles-module_carousel-base__3keqD >div:nth-child(3){
  position: absolute;
    z-index: 99;
    top: 30%;
    right: -30px;
}
@media screen and (max-width:500px){
  .styles-module_carousel-base__3keqD >div:nth-child(1){
    left: -15px;
  }
  .styles-module_carousel-base__3keqD >div:nth-child(3){
    right: -15px;
  }
}

`