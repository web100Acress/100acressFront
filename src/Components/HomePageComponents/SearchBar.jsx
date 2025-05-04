import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Search from "../../aadharhomes/Search";
import { Link } from "react-router-dom";
import { TopLocalitesIcon, LeftArrowIcon, RightArrowIcon } from "../../Assets/icons";
import Slider from "react-slick";
import Typewriter from "typewriter-effect";
import { imageSrc,phoneSrc} from "../../Pages/datafeed/Desiredorder";
import { useMediaQuery } from "@chakra-ui/react";


function SearchBar() {
  const [activeLink, setActiveLink] = useState("Buy");
  const [data, setData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentindeximgae, setCurrentImageIndex] = useState(0);

  const [isSmallerThan500] =  useMediaQuery("(max-width: 500px)");


  const handleLinkClick = (linkName) => {
  
    switch (linkName) {
      case "Rent":
        window.open(window.location.origin + "/buy-properties/best-resale-property-in-gurugram/", '_blank',);
        break;

      case "New Launch":
        window.open(window.location.origin + "/projects-in-newlaunch/", '_blank',);
        break;

      case "Commercial":
        window.open(window.location.origin + "/projects/commercial/", '_blank',);
        break;

      case "Plots":
        window.open(window.location.origin + "/plots-in-gurugram/", '_blank',);
        break;

      case "SCO":
        window.open(window.location.origin + "/sco/plots/", '_blank',);
        break;

    }
    setActiveLink(linkName);
    setData(`${linkName}`);
  };

  const localities = [
    { name: "Sohna Road", link: "/property-in-gurugram/sohna-road/" },
    { name: "Golf Course Road", link: "/property-in-gurugram/golf-course/" },
    { name: "MG Road", link: "/property-in-gurugram/mg-road/" },
    { name: "Northern Peripheral Road", link: "/property-in-gurugram/northern-peripheral-road/" },
    { name: "Dwarka Expressway", link: "/property-in-gurugram/dwarka-expressway/" },
    { name: "New Gurgaon", link: "/property-in-gurugram/new-gurgaon/" },
    { name: "Sohna", link: "/property-in-gurugram/sohna/" },
    { name: "Southern Peripheral Road", link: "/property-in-gurugram/southern-peripheral-road/" },
    { name: "NH-48", link: "/property-in-gurugram/nh-48/" },
    { name: "Golf Course Extn Road", link: "/property-in-gurugram/golf-course-extn-road/" },
  ];

  const itemsPerPage = 7;
  const nextpage = 1;

  const visibleLocalities = localities.slice(currentIndex, currentIndex + itemsPerPage);

  const handleNext = () => {
    if (currentIndex + itemsPerPage < localities.length) {
      setCurrentIndex((prev) => prev + nextpage);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - nextpage);
    }
  };

  // useEffect(() => {
  //   const updateImageSrc = () => {
  //     if (window.innerWidth <= 600) {
  //       setImageSrc(['../../Imgaes/mobile.png']);
  //     } else if (window.innerWidth <= 1024) {
  //       setImageSrc(['https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/banner/t1.webp']);
  //     } else {
  //       setImageSrc(['https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/banner/t1.webp']);
  //     }
  //   };

  //   updateImageSrc();
  //   window.addEventListener('resize', updateImageSrc);

  //   return () => {
  //     window.removeEventListener('resize', updateImageSrc);
  //   };
  // }, []);


  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    customPaging: (i) => (
      <button
        className={`rounded-full mt-4 mr-2 ${i === currentindeximgae ? 'bg-gray-800 h-2 w-5' : 'bg-gray-400 h-3 w-3'}`}
      ></button>
    ),
    afterChange: (index) => setCurrentImageIndex(index),
  };

  const phonesettings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    customPaging: (i) => (
      <button
        className={`rounded-full mt-4 mr-2 ${i === currentindeximgae ? 'bg-gray-800 h-2 w-5' : 'bg-gray-400 h-3 w-3'}`}
      ></button>
    ),
    afterChange: (index) => setCurrentImageIndex(index),
  };
  const [flickerIndex, setFlickerIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlickerIndex((prevIndex) => (prevIndex + 1) % visibleLocalities.length);
    }, 2000); 

    return () => clearInterval(interval); 
  }, [visibleLocalities.length]);

  return (
    <Wrapper className="section" >
      <div className="qsbWrapper pt-0 px-2 lg:px-10 xl:px-10 md:px-4 sm:px-10 mr-auto ml-auto lg:mr-auto lg:pb-0 md:pb-0 md:ml-auto md:mr-auto sm:mr-4 sm:ml-4 xs:py-2 lg:h-14 md:h-14 sm:h-8 md:-mt-32 lg:mb-0 sm:mb-0 mb-0 md:mb-4 lg:mt-0 " style={{ maxWidth: '860px' }}>
      <div
      className="sjdmkls  w-80 md:w-auto lg:w-auto h-20 lg:h-8 md:h-8 text-center text-white text-3xl mb-4 bg-gradient-to-r from-purple-900 via-pink-500 to-yellow-400 bg-clip-text text-transparent animate-gradient bg-[length:200%] bg-[0%_center] flex items-center justify-center"
    >
      <Typewriter
        options={{
          strings: ['<span style="font-family: Gluten, sans-serif;">Find Your Perfect Place to Call Home</span>',
                '<span style="font-family: Gluten, sans-serif;">Discover the Ideal Spot to Make Your Own</span>',
                '<span style="font-family: Gluten, sans-serif;">The Perfect Address Awaits—Claim It Now</span>'],
          autoStart: true,
          loop: true,
          deleteSpeed: 50,
          pauseFor: 2000,
          cursor: ".",
        }}
      />
      
    </div>
        <div className="SJDMls xl:h-12 lg:h-12 md:h-10 sm:h-8 lg:p-0 sm:p-0 md:p-0">
          {["Buy", "Rent", "New Launch", "Commercial", "Plots", "SCO"].map((linkName) => (
            <Link
              key={linkName}
              className={`options hidden sm:block   hover:rounded-t-lg  cursor-pointer whitespace-nowrap ease-in-out ${activeLink === linkName
                ? "active bg-[#FFFFFF] rounded-t-lg"
                : "text-[#FFFFFF] hover:underline hover:bg-[#FAF9F6] hover:underline-offset-8"
                }`}
              onClick={() => handleLinkClick(linkName)}
            >
              {linkName}
            </Link>
          ))}
        </div>

        <div className="mb-0 ">
          <Search data1={data} />
        </div>

        <div className=" flex justify-start mt-3 flex-nowrap w-160 md:w-112 lg:w-200 ">
          <span className="text-[#FFFFFF] text-xs md:text-xs whitespace-nowrap mt-2">
            <TopLocalitesIcon /> {!isSmallerThan500? `Top Localities:`: ""}
          </span>

          <div className=" flex flex-nowrap align-center ml-2 w-[330px] md:w-[600px] lg:w-[660px] scroll-smooth">
            <button onClick={handlePrev} disabled={currentIndex === 0} className={`cursor-pointer mt-2 ${currentIndex === 0 ? 'opacity-50 pointer-events-none' : ''}`}>
              <LeftArrowIcon />
            </button>
            <div className="flex space-x-2 flex-nowrap w-full md-w-96 overflow-x-auto no-scrollbar pt-2">
              {visibleLocalities.map((locality, index) => (
                <Link to={locality.link} target="_blank" key={index} className="cvBMLN">
                  <button
                    className={`SDFEDVx text-white text-[10px] px-2 py-1 border border-[#9F9F9F] shadow-sm rounded-xl whitespace-nowrap snap-center hover:bg-white hover:text-black transition flex flex-nowrap overflow-x-auto hover:shadow-lg hover:scale-105 duration-500 ease-in-out ${flickerIndex === index ? 'moving-text' : ''
                      }`}
                  >
                    {locality.name}
                  </button>
                </Link>
              ))}
            </div>
            <button onClick={handleNext} disabled={currentIndex + itemsPerPage >= localities.length} className={`cursor-pointer mt-2 ${currentIndex + itemsPerPage >= localities.length ? 'opacity-50 pointer-events-none' : ''}`}>
              <RightArrowIcon />
            </button>
          </div>
        </div>

        <div className="hidden md:block mt-2 lg:w-[750px] lg:h-[132px] md:h-[132px] md:w-[650px] mx-auto">
          <Wrapper className="section">
            <Slider {...settings}>
              {imageSrc.map((src, index) => (
                <div key={index}>
                  <img src={src.image} onClick={() => window.open(src.link, "_self")} alt={`Slide ${index}`} className="w-full h-auto cursor-pointer rounded-lg" loading="lazy"/>
                </div>
              ))}
            </Slider>
          </Wrapper>
        </div>
        <div className="block sm:hidden w-[360px] h-[198px] mt-8">
          <Wrapper className="section">
            <Slider {...phonesettings}>
              {phoneSrc.map((src, index) => (
                <div key={index}>
                  <img
                    src={src.image}
                    alt={`Slide ${index}`}
                    onClick={() => window.open(src.link, "_self")}
                    class="w-full h-full object-cover rounded-lg cursor-pointer"
                    loading="lazy"
                  />
                </div>
              ))}
            </Slider>
          </Wrapper>


        </div>
      </div>
    </Wrapper>
  );
}

export default SearchBar;

const Wrapper = styled.section`
  font-weight: 400;
  line-height: 1.5;

  div {
    box-sizing: border-box;
  }

  /* Desktop and large screens */
  @media screen and (min-width: 1024px) {
    .qsbWrapper {
      display: flex;
      justify-content: center;
      flex-direction: column;
    }
  }

  /* Tablet screens */
  @media screen and (max-width: 1024px) {
    .SJDMls {
      width: 80%; /* Adjust width for tablet */
    }
  }

  /* Medium screens */
  @media screen and (max-width: 900px) {
    .SJDMls {
      width: 90%; /* Adjust width for medium screens */
    }
  }

  /* Small screens and mobile */
  @media screen and (max-width: 770px) {
    .SJDMls {
      width: 100%;
      flex-wrap: wrap; /* Allow wrapping for better alignment */
      justify-content: center; /* Center the options */
      margin-bottom: 10px; /* Add margin at the bottom */
    }

    .options {
      padding: 9px 15px; /* Reduce padding on smaller screens */
      font-size: 14px; /* Smaller font size for better fit */
    }
  }

  /* Extra small screens (mobile) */
  @media screen and (max-width: 500px) {
    .SJDMls {
      display: flex; /* Show SJDMls on small screens */
      flex-wrap: wrap; /* Allow wrapping */
      justify-content: center; /* Center the options */

    }

    .options {
      font-size: 12px; /* Further reduce font size for extra small screens */
      padding: 8px 12px; /* Reduce padding for extra small screens */
    }

    .flex-nowrap {
      flex-wrap: wrap; /* Allow wrapping on smaller screens */
    }
  }

  .SJDMls {
    display: flex;
    box-shadow: 0 25px 60px rgba(113, 106, 147, 0.2);
    width: auto;
    border-radius: 20px 20px 0px 0px;
    background: rgba(111, 110, 110, 0.31);
    margin-left: 30px;
    margin-right: 30px;
  }
  
  .sjdmkls{
   font-family: 'Gluten';
  }

  .SDFEDVx {
    background: rgba(111, 110, 110, 0.31);
  }

  .options {
    padding: 9px 30px;
    font-size: 16px;
    transition: color 0.3s ease;
  }

  .options:hover {
    color: red;
  }

  .options.active {
    font-size: 18px;
    color: red;
  }

  .suggestor-wrapper {
    width: 90%;
  }
`;

