import React,{useState, useEffect} from "react";
import { Carousel } from "@trendyol-js/react-carousel";
import styled from "styled-components";
import StarCard from "./Card";
import { MdLocationPin } from "react-icons/md";
function StarCarousel() {
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
          swiping={true}
          show={number}
          leftArrow={<div className="slMJOW">{"←"}</div>}
          rightArrow={<div className="slMJOW">{"→"}</div>}
          slide={1}
          transition={0.5}
        >
          {/* {[...Array(number)].map((_, index) => (
            <StarCard key={index} />
          ))} */}

<div className='w9HDn0'>
        <div className='sQoIH w-100 h-auto'>
          <div className='xjNJ w-100'>
            <img
              src='https://media.istockphoto.com/id/1281554848/photo/dream-home-luxury-house-success-suburban-house.jpg?s=612x612&w=0&k=20&c=TpI1wOZx5-v0GlIfNORAHV7z6Hfd_TRrHKKzxO5nvwI='
              alt='image'
              className="w-100 h-100"
            />
          </div>
          <div className='eoiU d-flex align-items-center'>
            <div className='dsfds43 d-flex align-items-center'>
              <div className='q2jam'>
                <MdLocationPin size={14} color='#0a9e88' />
              </div>
              <div style={{ fontWeight: "600", fontSize: "14px" }}>Delhi</div>
            </div>
          </div>
        </div>
        <div className='w238N'>
          <h2>Project Name</h2>
          <p style={{ margin: "0", marginTop: "14px" }}>
            Starting at <span>₹ 3Cr CR/-</span>
          </p>
        </div>
      </div>

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