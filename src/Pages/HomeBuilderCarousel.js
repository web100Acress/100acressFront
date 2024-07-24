import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styled from "styled-components";
import { GrPrevious, GrNext } from "react-icons/gr";
const responsive = {
  desktop: {
    breakpoint: { max: 1440, min: 1024 },
    items: 8,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 6,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 1,
  },
};

const CustomLeftArrow = ({ onClick }) => {
  return (
    <button
      className="custom-arrow custom-arrow-left text-black"
      onClick={onClick}
    >
      <span className="text-white text-2xl p-2 rounded-full bg-black">
        <GrPrevious size={25} />
      </span>
    </button>
  );
};

const CustomRightArrow = ({ onClick }) => {
  return (
    <button
      className="custom-arrow custom-arrow-right text-black"
      onClick={onClick}
    >
      <span className="text-white text-2xl p-2 rounded-full bg-black ">
        <GrNext size={25} />
      </span>
    </button>
  );
};
const HomeBuilderCarousel = (props) => {

  return (
    <Wrapper>
      <div className="mx-10 mt-12 ">
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={false}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="transform 3s linear"
          transitionDuration={3000}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          deviceType={props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
        >
          <div>
            <img src="../BuilderImage/aarize.webp" alt="aarize" />
          </div>
          <div>
            <img src="../BuilderImage/adani-realty.webp" alt="adani-realty" />
          </div>
          <div>
            <img src="../BuilderImage/aipl.webp" alt="AIPL" />
          </div>
          {/* <div>
            <img src="../BuilderImage/amb.webp" alt="BPTP" />
          </div> */}
          <div>
            <img src="../BuilderImage/ambience.webp" alt="ambience" />
          </div>
          <div>
            <img src="../BuilderImage/ashiana.webp" alt="ashiana" />
          </div>
          {/* <div>
            <img src="../BuilderImage/ats.webp" alt="ats" />
          </div> */}
          {/* <div>
            <img src="../BuilderImage/bestech.webp" alt="bestech" />
          </div> */}
          <div>
            <img src="../BuilderImage/bptp.webp" alt="bptp" />
          </div>
          <div>
            <img src="../BuilderImage/central-park.webp" alt="central-park" />
          </div>
          <div>
            <img src="../BuilderImage/conscient.webp" alt="conscient" />
          </div>

          <div>
            <img src="../BuilderImage/dlf.webp" alt="dlf" />
          </div>
          <div>
            <img src="../BuilderImage/elan.webp" alt="elan" />
          </div>
          <div>
            <img src="../BuilderImage/eldeco.webp" alt="eldeco" />
          </div>
          <div>
            <img src="../BuilderImage/emaar.webp" alt="emaar" />
          </div>
          <div>
            <img src="../BuilderImage/experion.webp" alt="experion" />
          </div>
          <div>
            <img src="../BuilderImage/ganga.webp" alt="ganga" />
          </div>
          <div>
            <img
              src="../BuilderImage/godrej-properties.webp"
              alt="godrej-properties"
            />
          </div>
          <div>
            <img src="../BuilderImage/herohomes.webp" alt="herohomes" />
          </div>
          <div>
            <img src="../BuilderImage/hines.webp" alt="hines" />
          </div>
          <div>
            <img src="../BuilderImage/krisumi.webp" alt="krisumi" />
          </div>
          <div>
            <img src="../BuilderImage/m3m.webp" alt="m3m" />
          </div>

          <div>
            <img
              src="../BuilderImage/mahindra-lifespaces.webp"
              alt="mahindra-lifespaces"
            />
          </div>
          <div>
            <img
              src="../BuilderImage/max-realestate.webp"
              alt="max-realestate"
            />
          </div>
          <div>
            <img src="../BuilderImage/microtek.webp" alt="microtek" />
          </div>
          <div>
            <img src="../BuilderImage/mrg-world.webp" alt="mrg-world" />
          </div>
          <div>
            <img src="../BuilderImage/navraj.webp" alt="navraj" />
          </div>
          <div>
            <img src="../BuilderImage/orris.webp" alt="orris" />
          </div>
          <div>
            <img
              src="../BuilderImage/paras-buildtech.webp"
              alt="paras-buildtech"
            />
          </div>
          <div>
            <img
              src="../BuilderImage/puri-constructions.webp"
              alt="puri-constructions"
            />
          </div>
          <div>
            <img
              src="../BuilderImage/pyramid-infratech.webp"
              alt="pyramid-infratech"
            />
          </div>
          <div>
            <img src="../BuilderImage/raheja.webp" alt="raheja" />
          </div>
          <div>
            <img src="../BuilderImage/reach-group.webp" alt="reach-group" />
          </div>

          <div>
            <img src="../BuilderImage/aarize.webp" alt="Adani" />
          </div>
          <div>
            <img src="../BuilderImage/risland.webp" alt="risland" />
          </div>
          <div>
            <img
              src="../BuilderImage/shapoorji-pallonji.webp"
              alt="shapoorji-pallonji"
            />
          </div>
          <div>
            <img
              src="../BuilderImage/signature-global.webp"
              alt="signature-global"
            />
          </div>
          <div>
            <img src="../BuilderImage/smartworld.webp" alt="smartworld" />
          </div>
          <div>
            <img
              src="../BuilderImage/sobha-developers.webp"
              alt="sobha-developers"
            />
          </div>
          <div>
            <img src="../BuilderImage/spaze.webp" alt="spaze" />
          </div>
          <div>
            <img src="../BuilderImage/tarc.webp" alt="tarc" />
          </div>
          <div>
            <img src="../BuilderImage/tata-housing.webp" alt="tata-housing" />
          </div>
          <div>
            <img src="../BuilderImage/trevoc.webp" alt="trevoc" />
          </div>
          {/* Trinitry */}
          <div className="mt-4">
            <img src="../BuilderImage/Trinitry.jpg"  alt="trinitry" />
          </div>

          <div>
            <img src="../BuilderImage/vatika.webp" alt="vatika" />
          </div>

          <div>
            <img src="../BuilderImage/whiteland.webp" alt="whiteland" />
          </div>
        </Carousel>
      </div>
    </Wrapper>
  );
};

export default HomeBuilderCarousel;

const Wrapper = styled.section`
  position: relative;
  .custom-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 30px;
    height: 30px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 1;
  }

  .custom-arrow-left {
    left: 10px;
  }

  .custom-arrow-right {
    right: 10px;
  }

  .custom-arrow span {
    color: white;
    font-size: 16px;
  }

  .custom-arrow {
    position: absolute;
    top: 30%;
    transform: translateY(-50%);
    z-index: 1;
    background: transparent;
    border: none;
    cursor: pointer;
  }

  .custom-arrow-left {
    left: 10px;
  }

  .custom-arrow-right {
    right: 10px;
  }
`;
