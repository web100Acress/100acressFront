import React,{useState, useEffect} from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import styled from "styled-components";
import StarCard from "./Card";
import { MdLocationPin } from "react-icons/md";
function StarCarousel({ AllProjects = [] }) {
  const [number, setNumber] = useState(4);

  const updateNumber = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 480) {
      setNumber(1);
    } else if (screenWidth < 768) {
      setNumber(2);
    } else if (screenWidth < 992) {
      setNumber(3);
    } else {
      setNumber(4);
    }
  };

  useEffect(() => {
    updateNumber();
    window.addEventListener('resize', updateNumber);

    return () => {
      window.removeEventListener('resize', updateNumber);
    };
  }, []);

  return (
    <Wrapper className="section">
      <div className="caroStyle">
        <Carousel
          swipeable
          draggable
          arrows
          infinite={false}
          responsive={{
            superLargeDesktop: { breakpoint: { max: 4000, min: 1200 }, items: 4 },
            desktop: { breakpoint: { max: 1200, min: 992 }, items: 3 },
            tablet: { breakpoint: { max: 992, min: 768 }, items: 2 },
            mobile: { breakpoint: { max: 768, min: 0 }, items: 1 }
          }}
          slidesToSlide={1}
          customTransition="transform 500ms ease"
          transitionDuration={500}
        >
          {AllProjects && AllProjects.length > 0 ? (
            AllProjects.slice(0, 3).map((property, idx) => (
              <StarCard key={property._id || idx} {...property} />
            ))
          ) : (
            <div style={{ padding: 32, textAlign: 'center', width: '100%' }}>No similar properties found.</div>
          )}
        </Carousel>
      </div>
    </Wrapper>
  );
}

export default StarCarousel;

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